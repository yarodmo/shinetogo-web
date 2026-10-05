#!/usr/bin/env node
'use strict'
/**
 * Vuelve a mandar al webhook (n8n/GHL) los leads que no llegaron: el servidor estaba reiniciándose, el receptor
 * estaba caído, o aparece LEAD NOT FORWARDED en el log. Es seguro repetirlo: cada envío lleva X-Idempotency-Key = lead_id.
 *
 *   node tools/forward-leads.js --since 2026-10-01 --dry-run     # solo lista
 *   node tools/forward-leads.js --since 2026-10-01               # manda
 *   node tools/forward-leads.js --lead ab12cd34                  # uno solo (8 primeros caracteres)
 *
 * Usa LEAD_WEBHOOK_URL y LEAD_WEBHOOK_SECRET del .env de la API. Los días se cuentan en hora de Florida.
 */
require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env') })
const os = require('node:os')
const path = require('node:path')
const { parseArgs } = require('./args')
const { webhookConfig, createSender } = require('../lib/forward')
const { readLeads, resolveLeadId, BUSINESS_TZ } = require('../lib/outcomes')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const dayOf = (iso) => new Intl.DateTimeFormat('en-CA', { timeZone: BUSINESS_TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso))

async function main() {
  const { flags } = parseArgs(process.argv.slice(2))
  if (flags.help || (!flags.since && !flags.lead)) {
    console.error('Uso: node tools/forward-leads.js (--since AAAA-MM-DD | --lead <8 caracteres>) [--dry-run] [--leads archivo]')
    return flags.help ? 0 : 2
  }
  const leadsFile = typeof flags.leads === 'string' ? flags.leads : process.env.LEADS_FILE || path.join(os.homedir(), 'data', 'leads.ndjson')
  const { items } = readLeads(leadsFile)
  const seen = new Set()
  let leads = items.filter((l) => l.lead_id && !seen.has(l.lead_id) && seen.add(l.lead_id))

  if (flags.lead) {
    const id = resolveLeadId(leads, flags.lead === true ? '' : flags.lead)
    leads = leads.filter((l) => l.lead_id === id)
  } else {
    if (typeof flags.since !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(flags.since)) throw new Error('--since must be a date like YYYY-MM-DD')
    leads = leads.filter((l) => dayOf(l.created_at) >= flags.since)
  }
  console.log(`${leads.length} lead(s) para reenviar${flags['dry-run'] ? ' (simulacro: no se manda nada)' : ''}`)
  if (flags['dry-run']) {
    for (const l of leads) console.log(`  [${l.lead_id.slice(0, 8)}] ${l.created_at} · ${l.service}`)
    return 0
  }

  const cfg = webhookConfig(process.env)
  if (!cfg) throw new Error('LEAD_WEBHOOK_URL is not set')
  const send = createSender(cfg)
  let failed = 0
  for (const l of leads) {
    try {
      await send(l)
      console.log(`  ok   [${l.lead_id.slice(0, 8)}]`)
    } catch (e) {
      failed += 1
      console.error(`  FALLÓ [${l.lead_id.slice(0, 8)}] ${e.message}`)
    }
    await sleep(300) // no saturar al receptor
  }
  console.log(failed ? `${failed} fallaron: revisa el receptor y repite el comando` : 'Listo')
  return failed ? 1 : 0
}

main().then((code) => process.exit(code), (e) => { console.error(e.message); process.exit(2) })
