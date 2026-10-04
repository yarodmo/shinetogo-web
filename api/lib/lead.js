'use strict'
const crypto = require('node:crypto')

const SERVICES = {
  express: 'Express Wash',
  full: 'Full Detail',
  premium: 'Premium Detail',
  ceramic: 'Ceramic Coating',
  tint: 'Window Tint',
  tint_ceramic: 'Window Tint + Ceramic Coating',
  boat: 'Boat Detailing',
  other: 'Other',
}
const FILMS = ['carbon', 'ceramic', 'unsure']
const COVERAGE = ['sides', 'rear', 'windshield_strip', 'sunroof', 'full_car']
const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'gclid', 'gbraid', 'wbraid', 'fbclid', 'referrer', 'landing', 'page',
]
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// Quita caracteres de control y recorta. Nunca devuelve null.
// Los campos de una línea colapsan saltos de línea (evitan filas falsas en el correo);
// solo `message` conserva los suyos.
function clean(value, max, { multiline = false } = {}) {
  if (value === null || value === undefined) return ''
  let text = String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  if (!multiline) text = text.replace(/[\r\n\t\u2028\u2029]+/g, ' ')
  return text.trim().slice(0, max)
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const truthy = (v) => v === true || v === 'true' || v === 1 || v === '1'

/**
 * Valida y normaliza el cuerpo recibido. Solo pasan los campos conocidos.
 * @returns {{ok: true, lead: object} | {ok: false, fields: Record<string,string>}}
 */
function normalizeLead(body, { now = new Date(), ip = '', userAgent = '' } = {}) {
  const b = body && typeof body === 'object' ? body : {}
  const fields = {}

  const name = clean(b.name, 80)
  if (!name) fields.name = 'required'

  const phone = clean(b.phone, 30)
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) fields.phone = 'invalid'

  const email = clean(b.email, 120)
  if (email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) fields.email = 'invalid'

  let service = clean(b.service, 80)
  let serviceRaw = ''
  if (!service) {
    fields.service = 'required'
  } else if (Object.prototype.hasOwnProperty.call(SERVICES, service.toLowerCase())) {
    service = service.toLowerCase()
  } else {
    // Navegadores con la versión anterior del sitio mandaban el texto traducido.
    serviceRaw = service
    service = 'other'
  }

  // Tint y cerámico son solo para autos: un bote no puede pedirlos.
  if (clean(b.vehicle_type, 20) === 'boat' && ['tint', 'ceramic', 'tint_ceramic'].includes(service)) fields.service = 'invalid'

  if (Object.keys(fields).length) return { ok: false, fields }

  const attribution = {}
  const rawAttr = b.attribution && typeof b.attribution === 'object' ? b.attribution : {}
  for (const k of ATTRIBUTION_KEYS) {
    const v = clean(rawAttr[k], 200)
    if (v) attribution[k] = v
  }

  const coverage = Array.isArray(b.coverage) ? b.coverage.map((c) => clean(c, 30)).filter((c) => COVERAGE.includes(c)) : []
  const film = clean(b.film, 20)
  const leadId = UUID.test(String(b.lead_id || '')) ? String(b.lead_id).toLowerCase() : crypto.randomUUID()

  const lead = {
    lead_id: leadId,
    created_at: now.toISOString(),
    name,
    phone,
    email,
    service,
    ...(serviceRaw && { service_raw: serviceRaw }),
    vehicle_type: clean(b.vehicle_type, 20),
    vehicle: clean(b.vehicle, 80),
    coverage,
    film: FILMS.includes(film) ? film : '',
    has_old_tint: truthy(b.has_old_tint),
    zip: clean(b.zip, 12),
    date: /^\d{4}-\d{2}-\d{2}$/.test(clean(b.date, 10)) ? clean(b.date, 10) : '',
    time: clean(b.time, 20),
    // `msg` era el nombre que usaba el formulario anterior; se acepta como alias.
    message: clean(b.message ?? b.msg, 1000, { multiline: true }),
    lang: clean(b.lang, 2).toLowerCase() === 'es' ? 'es' : 'en',
    attribution,
    consent: {
      sms: truthy(b.consent_sms),
      version: clean(b.consent_text_version, 20),
      at: truthy(b.consent_sms) ? now.toISOString() : '',
      ip: clean(ip, 64),
      user_agent: clean(userAgent, 200),
    },
  }
  return { ok: true, lead }
}

const label = (k) => k.replace(/_/g, ' ')

function rows(lead, brand) {
  const attr = Object.entries(lead.attribution).map(([k, v]) => [label(k), v])
  return {
    main: [
      ['Name', lead.name],
      ['Phone', lead.phone],
      ['Email', lead.email || '—'],
      ['Service', SERVICES[lead.service] + (lead.service_raw ? ` (${lead.service_raw})` : '')],
      ['Vehicle', [lead.vehicle_type, lead.vehicle].filter(Boolean).join(' · ') || '—'],
      ['Windows', lead.coverage.length ? lead.coverage.map(label).join(', ') : '—'],
      ['Film', lead.film || '—'],
      ['Old tint to remove', lead.has_old_tint ? 'Yes' : 'No'],
      ['ZIP / city', lead.zip || '—'],
      ['Preferred date', lead.date || '—'],
      ['Preferred time', lead.time || '—'],
      ['Language', lead.lang === 'es' ? 'Español' : 'English'],
      ['Text/WhatsApp consent', lead.consent.sms ? `YES (${lead.consent.version || 'no version'}, ${lead.consent.at})` : 'No'],
      ['Message', lead.message || '—'],
    ],
    attribution: attr,
    brand,
  }
}

/** Correo para el dueño. Todo valor del usuario se escapa en el HTML. */
function renderEmail(lead, { brand = 'ShineToGo' } = {}) {
  const { main, attribution } = rows(lead, brand)
  const ref = lead.lead_id.slice(0, 8)
  const source = lead.attribution.utm_source || (lead.attribution.gclid ? 'google' : lead.attribution.fbclid ? 'meta' : 'direct')
  const subject = `[${ref}] ${SERVICES[lead.service]}: ${lead.name} (${source})`

  const text = [
    `NEW LEAD ${ref} · ${SERVICES[lead.service]}`,
    '',
    ...main.map(([k, v]) => `${k}: ${v}`),
    '',
    'ATTRIBUTION',
    ...(attribution.length ? attribution.map(([k, v]) => `${k}: ${v}`) : ['(none)']),
    '',
    `lead_id: ${lead.lead_id}`,
    `Received: ${lead.created_at}`,
  ].join('\n')

  const tr = ([k, v]) =>
    `<tr><td style="padding:8px 12px;color:#64748b;white-space:nowrap;vertical-align:top;border-bottom:1px solid #e2e8f0">${esc(k)}</td>` +
    `<td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0">${esc(v)}</td></tr>`
  const html =
    `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">` +
    `<div style="background:#0a0e1a;color:#fff;padding:16px 20px"><strong>${esc(brand)}</strong> · New lead <code>${esc(ref)}</code> · ${esc(SERVICES[lead.service])}</div>` +
    `<table style="width:100%;border-collapse:collapse;font-size:14px">${main.map(tr).join('')}</table>` +
    `<div style="background:#f8fafc;padding:10px 20px;font-size:12px;color:#475569">Attribution</div>` +
    `<table style="width:100%;border-collapse:collapse;font-size:13px">${(attribution.length ? attribution : [['(none)', '']]).map(tr).join('')}</table>` +
    `<div style="padding:10px 20px;font-size:11px;color:#94a3b8">lead_id ${esc(lead.lead_id)} · ${esc(lead.created_at)}</div></div>`

  return { subject, text, html }
}

module.exports = { SERVICES, normalizeLead, renderEmail, esc, clean }
