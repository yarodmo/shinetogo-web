#!/usr/bin/env node
'use strict'
/**
 * Anota qué pasó con un lead. Cierra el circuito para saber qué fuente y qué servicio traen clientes.
 *
 *   node tools/lead-outcome.js <id> contacted                      # ahora mismo
 *   node tools/lead-outcome.js <id> contacted --at "2026-10-05 14:03"   # una llamada que ya pasó (hora de Florida)
 *   node tools/lead-outcome.js <id> quoted
 *   node tools/lead-outcome.js <id> booked
 *   node tools/lead-outcome.js <id> won --value 450
 *   node tools/lead-outcome.js <id> lost --reason price --note "quería cerámico por la mitad"
 *
 * <id> = los 8 primeros caracteres del asunto del correo: [ab12cd34].
 * La velocidad de respuesta del reporte sale de la hora de "contacted": anótalo cuando ocurre o usa --at.
 * Motivos de pérdida: price, no_reply, timing, out_of_area, not_a_fit, went_elsewhere, other.
 * Opciones: --leads <archivo> (por defecto LEADS_FILE o ~/data/leads.ndjson).
 */
require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env') })
const os = require('node:os')
const path = require('node:path')
const { parseArgs } = require('./args')
const { recordOutcome } = require('../lib/outcomes')

const { flags, positional } = parseArgs(process.argv.slice(2))
const [id, stage] = positional
if (!id || !stage || flags.help) {
  console.error('Uso: node tools/lead-outcome.js <id de 8 caracteres> <contacted|quoted|booked|won|lost> [--value USD] [--reason motivo] [--at "AAAA-MM-DD HH:MM"] [--note texto] [--leads archivo]')
  process.exit(flags.help ? 0 : 2)
}
const leadsFile = typeof flags.leads === 'string' ? flags.leads : process.env.LEADS_FILE || path.join(os.homedir(), 'data', 'leads.ndjson')
try {
  for (const k of ['value', 'reason', 'at']) if (flags[k] === true) throw new Error(`--${k} needs a value`)
  const value = flags.value === undefined ? undefined : Number(flags.value)
  const r = recordOutcome(leadsFile, id, { stage, value, reason: flags.reason, at: flags.at, note: typeof flags.note === 'string' ? flags.note : undefined })
  console.log(`Anotado: ${r.lead_id.slice(0, 8)} → ${r.stage}${r.value_usd !== undefined ? ` ($${r.value_usd})` : ''}${r.reason ? ` (${r.reason})` : ''} · ${r.at}`)
} catch (e) {
  console.error(`No se anotó: ${e.message}`)
  process.exit(1)
}
