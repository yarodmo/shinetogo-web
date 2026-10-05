#!/usr/bin/env node
'use strict'
/**
 * Reporte de leads: de dónde llegan, qué tan rápido se atienden y cuáles terminan en dinero.
 *   node tools/leads-report.js                      # todo
 *   node tools/leads-report.js --from 2026-10-01 --to 2026-10-31
 *   node tools/leads-report.js --json               # para otra herramienta
 * Lee el archivo de leads y, si existe, lead-outcomes.ndjson (ver tools/lead-outcome.js).
 * Los días se cuentan en hora de Florida (America/New_York), no en UTC.
 */
require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env') })
const os = require('node:os')
const path = require('node:path')
const { parseArgs } = require('./args')
const { buildReport } = require('../lib/outcomes')

const { flags } = parseArgs(process.argv.slice(2))
const leadsFile = typeof flags.leads === 'string' ? flags.leads : process.env.LEADS_FILE || path.join(os.homedir(), 'data', 'leads.ndjson')
for (const k of ['from', 'to']) {
  if (flags[k] === true) { console.error(`--${k} necesita una fecha AAAA-MM-DD`); process.exit(2) }
}
let report
try {
  report = buildReport({ leadsFile, from: flags.from, to: flags.to })
} catch (e) {
  console.error(e.message)
  process.exit(2)
}

if (flags.json) {
  console.log(JSON.stringify(report, null, 2))
  process.exit(0)
}

const pad = (s, n) => String(s).padEnd(n)
const num = (s, n) => String(s).padStart(n)
const money = (n) => (n ? `$${n.toLocaleString('en-US')}` : '—')
const table = (title, rows) => {
  console.log(`\n${title}`)
  console.log(`  ${pad('', 26)}${num('leads', 6)}${num('atend.', 8)}${num('cotiz.', 8)}${num('ganados', 9)}${num('perdidos', 10)}${num('ingreso', 10)}`)
  for (const r of rows) {
    console.log(`  ${pad(r.key.slice(0, 25), 26)}${num(r.leads, 6)}${num(r.contacted, 8)}${num(r.quoted, 8)}${num(r.won, 9)}${num(r.lost, 10)}${num(money(r.revenue_usd), 10)}${r.low_n ? '  (n bajo)' : ''}`)
  }
}

const f = report.funnel
console.log(`LEADS ${report.range.from || 'desde el inicio'} → ${report.range.to || 'hoy'}`)
console.log(`  leads ${f.leads} · atendidos ${f.contacted} · cotizados ${f.quoted} · agendados ${f.booked} · ganados ${f.won} · perdidos ${f.lost} · ingreso ${money(report.revenue_usd)}`)
console.log(`  del formulario: casilla de mensajes marcada ${report.totals.consent_pct}% · con ZIP ${report.totals.with_zip_pct}% · con correo ${report.totals.with_email_pct}% · con fecha ${report.totals.with_date_pct}%  (${report.totals.manual_leads} lead(s) dados de alta a mano no cuentan aquí)`)
const r = report.response
console.log(`\nVELOCIDAD DE RESPUESTA (primer contacto anotado)`)
const p = (v) => (v === null ? '—' : `${v}%`)
console.log(`  mediana ${r.median_minutes === null ? '—' : `${r.median_minutes} min`} · dentro de 5 min ${p(r.within_5_min_pct)} · 15 min ${p(r.within_15_min_pct)} · 60 min ${p(r.within_60_min_pct)} · nunca atendidos ${r.never_contacted}`)
table('POR FUENTE', report.by_source)
table('POR SERVICIO', report.by_service)
table('POR CANAL (formulario, WhatsApp, llamada...)', report.by_channel)
table('POR IDIOMA', report.by_lang)
table('POR PÁGINA DE ENTRADA', report.by_landing)
table('POR PÁGINA QUE VIO ANTES DE COTIZAR (none = directo a la home)', report.by_via)
if (Object.keys(report.lost_reasons).length) console.log(`\nPOR QUÉ SE PIERDEN\n  ${Object.entries(report.lost_reasons).map(([k, v]) => `${k}: ${v}`).join(' · ')}`)
if (report.unworked.length) {
  console.log(`\nSIN RESULTADO ANOTADO (más de 48 h)`)
  for (const u of report.unworked.slice(0, 10)) console.log(`  [${u.lead_id.slice(0, 8)}] ${u.created_at.slice(0, 10)} · ${u.service} · ${u.source}`)
}
if (report.warnings.length) console.log(`\nOJO\n${report.warnings.map((w) => `  - ${w}`).join('\n')}`)
