'use strict'
const crypto = require('node:crypto')
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const { normalizeLead, renderEmail, SERVICES, clean } = require('./lib/lead')
const { appendLead, DEFAULT_MAX_BYTES } = require('./lib/store')

// Campos trampa para bots. `website` es el nombre anterior; los gestores de contraseñas lo rellenan a veces.
const HONEYPOT_FIELDS = ['company_url', 'website']

const defaultLog = (level, message, meta) => {
  const line = meta ? `${message} ${JSON.stringify(meta)}` : message
  ;(level === 'error' ? console.error : console.log)(line)
}

/**
 * Fábrica de la app. Recibe sus dependencias para poder probarla sin SMTP real.
 * Contrato de /api/book: 200 solo cuando el lead quedó guardado o el correo salió.
 * Si fallan ambos responde 500 y el cliente puede reintentar con el mismo lead_id.
 */
function createApp({
  transporter,
  leadsFile,
  recipient,
  smtpUser,
  brandName = 'ShineToGo Mobile Detailing',
  allowedOrigins = [],
  rateLimitMax = 10,
  globalLimitMax = 60,
  maxLeadsFileBytes = DEFAULT_MAX_BYTES,
  retryDelayMs = 60000,
  mailTimeoutMs = 5000,
  forward = null, // (lead) => void; reenvío opcional a un webhook propio (ver lib/forward.js). Nunca bloquea.
  log = defaultLog,
}) {
  const app = express()
  // Detrás del proxy del panel (.htaccess -> 127.0.0.1:PORT) todas las solicitudes
  // llegan desde loopback; confiar solo en ese salto hace que el límite use la IP real.
  app.set('trust proxy', 'loopback')

  app.use(cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true) // curl, apps, servidor a servidor
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error('CORS: Origin not allowed'))
    },
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }))
  app.use(express.json({ limit: '16kb' }))

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests. Please try again later.' },
  })
  // Techo total por minuto: protege el buzón y el disco aunque alguien falsifique la IP en cada solicitud
  // (si el proxy no sobrescribe X-Forwarded-For el límite por IP se puede esquivar).
  const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: globalLimitMax,
    keyGenerator: () => 'global',
    standardHeaders: false,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests. Please try again later.' },
  })

  const sendMail = (message) => {
    let timer
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error('mail timeout')), mailTimeoutMs)
      timer.unref()
    })
    return Promise.race([transporter.sendMail(message), timeout]).finally(() => clearTimeout(timer))
  }

  // Un lead en curso o ya procesado se responde igual si el cliente reintenta con su lead_id Y el mismo
  // contenido. Si el contenido cambia, es otra persona: se guarda con un id nuevo en vez de descartarlo.
  const processed = new Map()
  const remember = (id, entry) => {
    processed.set(id, entry)
    if (processed.size > 1000) processed.delete(processed.keys().next().value)
  }
  const fingerprint = (lead) => crypto.createHash('sha256').update(JSON.stringify([
    lead.name, lead.phone, lead.email, lead.service, lead.service_raw, lead.vehicle_type, lead.vehicle,
    lead.coverage, lead.film, lead.has_old_tint, lead.zip, lead.date, lead.time, lead.message,
  ])).digest('hex')

  // El correo es la única alerta: si falla, se reintenta con retroceso (retryDelayMs x 1, 5 y 30).
  // Si todo falla queda una línea clara en el log; el lead sigue a salvo en el archivo.
  const retryDelays = [retryDelayMs, retryDelayMs * 5, retryDelayMs * 30]
  const retryMail = (message, lead, attempt = 0) => {
    if (attempt >= retryDelays.length) {
      log('error', 'LEAD NOT NOTIFIED', { lead_id: lead.lead_id })
      return
    }
    const timer = setTimeout(() => {
      sendMail(message)
        .then(() => log('info', 'lead email retry ok', { lead_id: lead.lead_id, attempt: attempt + 1 }))
        .catch((e) => {
          log('error', 'lead email retry failed', { lead_id: lead.lead_id, attempt: attempt + 1, error: e.message })
          retryMail(message, lead, attempt + 1)
        })
    }, retryDelays[attempt])
    timer.unref()
  }

  async function handleLead(lead, record) {
    let stored = false
    try {
      await appendLead(leadsFile, record, { maxBytes: maxLeadsFileBytes })
      stored = true
    } catch (err) {
      log('error', 'lead persist failed', { lead_id: lead.lead_id, error: err.message })
    }

    const email = renderEmail(lead, { brand: brandName })
    const message = {
      from: `"${brandName} Leads" <${smtpUser}>`,
      to: recipient,
      replyTo: lead.email || undefined,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }
    let notified = false
    try {
      await sendMail(message)
      notified = true
    } catch (err) {
      log('error', 'lead email failed', { lead_id: lead.lead_id, error: err.message })
      retryMail(message, lead)
    }

    if (!stored && !notified) return { status: 500, body: { success: false, error: 'Could not save your request. Please try again or call us.' } }
    log('info', 'lead captured', { lead_id: lead.lead_id, service: lead.service, notified })
    // Tercer canal, después de que el lead ya quedó aceptado: si falla, no cambia lo que ve el visitante.
    if (forward) {
      try { forward(lead) } catch (err) { log('error', 'lead forward threw', { lead_id: lead.lead_id, error: err.message }) }
    }
    return { status: 200, body: { success: true, lead_id: lead.lead_id, notified } }
  }

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'shinetogo-api', timestamp: new Date().toISOString() })
  })

  app.post('/api/book', globalLimiter, limiter, async (req, res, next) => {
    try {
      // Trampa para bots: estos campos están ocultos para las personas.
      if (HONEYPOT_FIELDS.some((field) => clean(req.body && req.body[field], 200))) {
        log('info', 'honeypot hit', { ip: req.ip })
        return res.json({ success: true, lead_id: crypto.randomUUID(), notified: true })
      }
      const parsed = normalizeLead(req.body, { ip: req.ip, userAgent: req.get('user-agent') })
      if (!parsed.ok) return res.status(400).json({ success: false, error: 'Check the highlighted fields.', fields: parsed.fields })

      const { lead } = parsed
      const hash = fingerprint(lead)
      const known = processed.get(lead.lead_id)
      if (known && known.hash !== hash) lead.lead_id = crypto.randomUUID()
      let entry = known && known.hash === hash ? known : null
      if (!entry) {
        entry = { hash, job: handleLead(lead, lead) }
        remember(lead.lead_id, entry)
      }
      const result = await entry.job
      if (result.status !== 200) processed.delete(lead.lead_id) // permitir reintento
      res.status(result.status).json(result.body)
    } catch (err) {
      next(err)
    }
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err && /^CORS/.test(err.message)) return res.status(403).json({ success: false, error: 'Origin not allowed.' })
    if (err && err.type === 'entity.too.large') return res.status(413).json({ success: false, error: 'Request too large.' })
    if (err && err.type === 'entity.parse.failed') return res.status(400).json({ success: false, error: 'Invalid JSON.' })
    log('error', 'unhandled error', { error: err && err.message })
    res.status(500).json({ success: false, error: 'Unexpected error.' })
  })

  return app
}

module.exports = { createApp, SERVICES }
