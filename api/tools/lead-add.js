#!/usr/bin/env node
'use strict'
/**
 * Da de alta un lead que NO pasó por el formulario (WhatsApp, llamada, en persona, referido) para que cuente en el reporte.
 *
 *   node tools/lead-add.js --channel whatsapp --service tint --lang es --source google
 *   node tools/lead-add.js --channel call --service ceramic --source gbp --at "2026-10-05 14:03" --note "pidió precio de cerámico"
 *
 * Canales: whatsapp, call, walkin, referral, other. Servicios: express, full, premium, ceramic, tint, boat, other.
 * --source / --medium: de dónde vino (google, gbp, instagram, facebook, referral, direct...). Nombre y teléfono son opcionales.
 * Imprime el id de 8 caracteres para anotar después qué pasó: node tools/lead-outcome.js <id> contacted
 * Nunca declara consentimiento de mensajes: ese consentimiento solo existe cuando la persona marca la casilla del formulario.
 */
require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env') })
const os = require('node:os')
const path = require('node:path')
const { parseArgs } = require('./args')
const { addManualLead } = require('../lib/manual-lead')

const { flags } = parseArgs(process.argv.slice(2))
if (flags.help || !flags.channel || !flags.service) {
  console.error('Uso: node tools/lead-add.js --channel <whatsapp|call|walkin|referral|other> --service <tint|ceramic|express|full|premium|boat|other> [--lang en|es] [--source texto] [--medium texto] [--name texto] [--phone texto] [--note texto] [--at "AAAA-MM-DD HH:MM"] [--leads archivo]')
  process.exit(flags.help ? 0 : 2)
}
const leadsFile = typeof flags.leads === 'string' ? flags.leads : process.env.LEADS_FILE || path.join(os.homedir(), 'data', 'leads.ndjson')
try {
  for (const k of ['channel', 'service', 'lang', 'source', 'medium', 'name', 'phone', 'note', 'at']) if (flags[k] === true) throw new Error(`--${k} needs a value`)
  const r = addManualLead(leadsFile, { channel: flags.channel, service: flags.service, lang: flags.lang, source: flags.source, medium: flags.medium, name: flags.name, phone: flags.phone, note: flags.note, at: flags.at })
  console.log(`Alta: [${r.short_id}] ${flags.channel} · ${flags.service}. Para anotar qué pasó: node tools/lead-outcome.js ${r.short_id} contacted`)
} catch (e) {
  console.error(`No se dio de alta: ${e.message}`)
  process.exit(1)
}
