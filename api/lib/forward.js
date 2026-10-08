'use strict'
const crypto = require('node:crypto')

/**
 * Reenvío del lead a un webhook propio (n8n → GoHighLevel en el ecosistema BLISS). Apagado por defecto.
 *
 * El archivo de leads sigue siendo la copia autoritativa y el correo la alerta: esto es un tercer canal que NUNCA
 * puede afectar la respuesta al visitante ni el guardado. Si el receptor falla se reintenta con retroceso (en memoria:
 * un reinicio del proceso los descarta) y, si se agotan, queda `LEAD NOT FORWARDED` en el log. Lo que no llegó se
 * vuelve a mandar con `node tools/forward-leads.js --since AAAA-MM-DD`; la clave de idempotencia lo hace seguro.
 *
 * Seguridad:
 *  - la URL la fija el operador por variable de entorno; solo https (o http hacia localhost para pruebas) y sin
 *    usuario:contraseña dentro (se rechaza al arrancar para que la clave no termine en un log)
 *  - cada envío va firmado: X-Signature = sha256=HMAC(secreto, `${timestamp}.${cuerpo}`) y X-Timestamp en segundos;
 *    el receptor debe verificar la firma y rechazar timestamps de más de 5 minutos
 *  - X-Idempotency-Key = lead_id: el receptor ignora repetidos
 *  - no se siguen redirecciones; no se envían IP ni navegador (quedan en el archivo como prueba de consentimiento)
 *  - un 4xx permanente (salvo 408, 425 y 429) no se reintenta: reintentar un 401 o un 404 no lo arregla
 */

const SOURCE = 'shinetogo-web'
const LOCALHOST = new Set(['localhost', '127.0.0.1', '[::1]'])
const RETRIABLE_4XX = new Set([408, 425, 429])

function webhookConfig(env) {
  const url = (env.LEAD_WEBHOOK_URL || '').trim()
  if (!url) return null
  let parsed
  try { parsed = new URL(url) } catch { throw new Error('LEAD_WEBHOOK_URL is not a valid URL') }
  if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && LOCALHOST.has(parsed.hostname))) {
    throw new Error('LEAD_WEBHOOK_URL must be https (http is only allowed toward localhost)')
  }
  if (parsed.username || parsed.password) throw new Error('LEAD_WEBHOOK_URL must not embed credentials (user:password@); use LEAD_WEBHOOK_SECRET')
  const secret = (env.LEAD_WEBHOOK_SECRET || '').trim()
  if (secret.length < 16) throw new Error('LEAD_WEBHOOK_SECRET is required (16+ characters) when LEAD_WEBHOOK_URL is set')
  return { url, secret }
}

function buildPayload(lead) {
  const { consent = {}, ...rest } = lead
  return {
    event: 'lead.created',
    version: 1,
    source: SOURCE,
    sent_at: new Date().toISOString(),
    // `verified: false`: el formulario no puede probar que quien marcó la casilla es el dueño de ese número.
    // Confirmarlo en el primer contacto (o con doble confirmación) antes de automatizar mensajes.
    lead: { ...rest, consent: { sms: !!consent.sms, version: consent.version || '', at: consent.at || '', verified: false } },
  }
}

const signBody = (secret, timestamp, body) => crypto.createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex')

/** Un solo intento. Resuelve con 2xx; si no, lanza (con `permanent: true` si reintentar no ayuda). */
function createSender({ url, secret, timeoutMs = 5000 }) {
  return async function send(lead) {
    const body = JSON.stringify(buildPayload(lead))
    const ts = String(Math.floor(Date.now() / 1000))
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        method: 'POST',
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Timestamp': ts,
          'X-Signature': `sha256=${signBody(secret, ts, body)}`,
          'X-Idempotency-Key': lead.lead_id,
        },
        body,
      })
      if (res.status < 200 || res.status >= 300) {
        const err = new Error(`receiver answered ${res.status}`)
        err.permanent = res.status >= 300 && res.status < 500 && !RETRIABLE_4XX.has(res.status)
        throw err
      }
    } catch (e) {
      // Nada de la URL (puede llevar un token en la ruta) debe terminar en un log.
      if (!e.permanent && e.message) e.message = e.message.split(url).join('<webhook>')
      throw e
    } finally {
      clearTimeout(timer)
    }
  }
}

/**
 * @returns {(lead: object) => void} dispara el envío y vuelve al instante (no espera al receptor).
 */
function createForwarder({ url, secret, retryDelayMs = 30000, maxAttempts = 4, timeoutMs = 5000, log = () => {} }) {
  const send = createSender({ url, secret, timeoutMs })

  function run(lead, n = 1) {
    send(lead).then(
      () => log('info', 'lead forwarded', { lead_id: lead.lead_id, attempt: n }),
      (e) => {
        if (e.permanent || n >= maxAttempts) {
          log('error', 'LEAD NOT FORWARDED', { lead_id: lead.lead_id, error: e.message })
          return
        }
        log('error', 'lead forward failed', { lead_id: lead.lead_id, attempt: n, error: e.message })
        const t = setTimeout(() => run(lead, n + 1), retryDelayMs * 3 ** (n - 1))
        t.unref()
      },
    )
  }
  return run
}

module.exports = { webhookConfig, buildPayload, signBody, createSender, createForwarder }
