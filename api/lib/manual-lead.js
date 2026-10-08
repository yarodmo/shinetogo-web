'use strict'
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const { SERVICES, clean } = require('./lead')
const { parseAt } = require('./outcomes')

/**
 * Alta manual de un lead que NO pasó por el formulario: una conversación de WhatsApp, una llamada, alguien en persona
 * o un referido. Sin esto el reporte solo ve el formulario, y el canal principal del negocio (fotos por WhatsApp,
 * llamadas) queda fuera de toda medición.
 *
 * No pide datos personales (nombre y teléfono son opcionales) y NUNCA declara consentimiento de mensajes: ese
 * consentimiento solo existe cuando la persona marca la casilla del formulario.
 */
const CHANNELS = ['whatsapp', 'call', 'walkin', 'referral', 'other']

function addManualLead(leadsFile, { channel, service, lang = 'en', source, medium, name, phone, note, at, now = new Date() } = {}) {
  if (!CHANNELS.includes(channel)) throw new Error(`Invalid channel "${channel}". Use one of: ${CHANNELS.join(', ')}`)
  if (!Object.prototype.hasOwnProperty.call(SERVICES, service)) throw new Error(`Invalid service "${service}". Use one of: ${Object.keys(SERVICES).join(', ')}`)
  if (!['en', 'es'].includes(lang)) throw new Error('Invalid lang. Use en or es')

  let when = now
  if (at !== undefined) {
    when = at instanceof Date ? at : parseAt(at)
    if (when.getTime() > now.getTime() + 60000) throw new Error('--at is in the future')
  }

  const lead = {
    lead_id: crypto.randomUUID(),
    created_at: when.toISOString(),
    channel,
    manual: true,
    name: clean(name, 80),
    phone: clean(phone, 30),
    email: '',
    service,
    vehicle_type: '',
    vehicle: '',
    coverage: [],
    ceramic_areas: [],
    film: '',
    has_old_tint: false,
    zip: '',
    date: '',
    time: '',
    message: clean(note, 300),
    lang,
    attribution: {
      ...(source && { utm_source: clean(source, 60).toLowerCase() }),
      ...(medium && { utm_medium: clean(medium, 60).toLowerCase() }),
    },
    consent: { sms: false, version: '', at: '', ip: '', user_agent: '' },
  }
  fs.mkdirSync(path.dirname(leadsFile), { recursive: true, mode: 0o700 })
  fs.appendFileSync(leadsFile, JSON.stringify(lead) + '\n', { mode: 0o600 })
  return { lead_id: lead.lead_id, short_id: lead.lead_id.slice(0, 8) }
}

module.exports = { CHANNELS, addManualLead }
