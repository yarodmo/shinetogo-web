'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { recordOutcome, readLeads, readOutcomes, buildReport, sourceOf, resolveLeadId, outcomesPathFor, parseAt } = require('../lib/outcomes')

const T0 = Date.parse('2026-10-05T14:00:00Z')
const iso = (minutesAfter) => new Date(T0 + minutesAfter * 60000).toISOString()
const mk = (n, over = {}) => ({
  lead_id: `${String(n).padStart(8, '0')}-0000-4000-8000-000000000000`,
  created_at: iso(0),
  name: `Lead ${n}`, phone: '9415550142', email: '', service: 'tint', lang: 'en', zip: '', date: '',
  attribution: {}, consent: { sms: false },
  ...over,
})

function setup(leads, outcomes = []) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'outcomes-'))
  const leadsFile = path.join(dir, 'leads.ndjson')
  fs.writeFileSync(leadsFile, leads.map((l) => JSON.stringify(l)).join('\n') + '\n')
  const outFile = outcomesPathFor(leadsFile)
  if (outcomes.length) fs.writeFileSync(outFile, outcomes.map((o) => JSON.stringify(o)).join('\n') + '\n')
  return { dir, leadsFile, outFile }
}

test('outcomesPathFor: el archivo de resultados vive junto al de leads', () => {
  assert.equal(outcomesPathFor('/x/data/leads.ndjson'), '/x/data/lead-outcomes.ndjson')
})

test('sourceOf: utm_source manda; si no, gclid es google, fbclid es meta, luego el dominio de referencia, luego directo', () => {
  assert.equal(sourceOf(mk(1, { attribution: { utm_source: 'Google', utm_medium: 'cpc' } })), 'google / cpc')
  assert.equal(sourceOf(mk(1, { attribution: { gclid: 'abc' } })), 'google / (gclid)')
  assert.equal(sourceOf(mk(1, { attribution: { fbclid: 'abc' } })), 'meta / (fbclid)')
  assert.equal(sourceOf(mk(1, { attribution: { referrer: 'https://www.instagram.com/p/xyz' } })), 'instagram.com / referral')
  assert.equal(sourceOf(mk(1)), 'direct')
})

test('resolveLeadId: acepta los 8 primeros caracteres del asunto del correo; rechaza ambiguos e inexistentes', () => {
  const leads = [mk(1), mk(2), { ...mk(3), lead_id: '00000001-ffff-4000-8000-000000000000' }]
  assert.equal(resolveLeadId(leads, '00000002'), leads[1].lead_id)
  assert.throws(() => resolveLeadId(leads, '00000001'), /ambig/i)
  assert.throws(() => resolveLeadId(leads, 'zzzzzzzz'), /no existe|not found/i)
  assert.throws(() => resolveLeadId(leads, '000'), /8/)
})

test('recordOutcome: valida la etapa, exige motivo al perder y valor numérico al ganar', () => {
  const { leadsFile } = setup([mk(1)])
  assert.throws(() => recordOutcome(leadsFile, '00000001', { stage: 'maybe' }), /stage/i)
  assert.throws(() => recordOutcome(leadsFile, '00000001', { stage: 'lost' }), /reason/i)
  assert.throws(() => recordOutcome(leadsFile, '00000001', { stage: 'lost', reason: 'cosmic-rays' }), /reason/i)
  assert.throws(() => recordOutcome(leadsFile, '00000001', { stage: 'won', value: 'mucho' }), /value/i)
  assert.throws(() => recordOutcome(leadsFile, '00000001', { stage: 'won', value: -5 }), /value/i)
  const r = recordOutcome(leadsFile, '00000001', { stage: 'won', value: 450, now: new Date(T0 + 60000) })
  assert.equal(r.stage, 'won')
  assert.equal(r.value_usd, 450)
  assert.equal(readOutcomes(outcomesPathFor(leadsFile)).items.length, 1)
})

test('readLeads / readOutcomes: una línea dañada se cuenta y se salta, no tumba el reporte', () => {
  const { leadsFile } = setup([mk(1)])
  fs.appendFileSync(leadsFile, '{esto no es json\n')
  const r = readLeads(leadsFile)
  assert.equal(r.items.length, 1)
  assert.equal(r.skipped, 1)
})

test('buildReport: embudo acumulado, velocidad de respuesta y dinero por fuente', () => {
  const leads = [
    mk(1, { attribution: { utm_source: 'google', utm_medium: 'cpc' }, consent: { sms: true }, zip: '34236', email: 'a@b.co', service: 'tint' }),
    mk(2, { attribution: { utm_source: 'google', utm_medium: 'cpc' }, service: 'ceramic', lang: 'es' }),
    mk(3, { service: 'full' }),
    mk(4, { attribution: { fbclid: 'x' }, service: 'tint' }),
  ]
  const o = (n, stage, minutes, extra = {}) => ({ lead_id: leads[n - 1].lead_id, stage, at: iso(minutes), ...extra })
  const { dir, leadsFile } = setup(leads, [
    o(1, 'contacted', 4), o(1, 'quoted', 30), o(1, 'won', 600, { value_usd: 500 }),
    o(2, 'contacted', 120), o(2, 'lost', 200, { reason: 'price' }),
    o(3, 'contacted', 10),
  ])
  const rep = buildReport({ leadsFile, now: new Date(T0 + 3 * 24 * 3600000) })
  fs.rmSync(dir, { recursive: true, force: true })

  assert.equal(rep.totals.leads, 4)
  assert.equal(rep.totals.consent_pct, 25)
  assert.equal(rep.totals.with_zip_pct, 25)
  assert.equal(rep.totals.with_email_pct, 25)
  assert.deepEqual(rep.funnel, { leads: 4, contacted: 3, quoted: 1, booked: 1, won: 1, lost: 1 })
  assert.equal(rep.revenue_usd, 500)
  assert.equal(rep.response.median_minutes, 10)
  assert.equal(rep.response.never_contacted, 1)
  // el denominador son todos los leads con más de 5 minutos de edad: el que nunca se contactó cuenta en contra
  assert.equal(rep.response.within_5_min_pct, 25)
  const google = rep.by_source.find((r) => r.key === 'google / cpc')
  assert.equal(google.leads, 2)
  assert.equal(google.won, 1)
  assert.equal(google.revenue_usd, 500)
  assert.equal(rep.by_service.find((r) => r.key === 'tint').leads, 2)
  assert.equal(rep.by_lang.find((r) => r.key === 'es').leads, 1)
  assert.deepEqual(rep.lost_reasons, { price: 1 })
  assert.equal(rep.unworked.length, 1)
  assert.equal(rep.unworked[0].lead_id, leads[3].lead_id)
})

test('buildReport: con pocos leads advierte que no hay conclusiones y marca n bajo', () => {
  const { dir, leadsFile } = setup([mk(1), mk(2)])
  const rep = buildReport({ leadsFile, now: new Date(T0 + 3600000) })
  fs.rmSync(dir, { recursive: true, force: true })
  assert.match(rep.warnings.join(' '), /muy pocos|too few/i)
  assert.ok(rep.by_source.every((r) => r.low_n === true))
})

test('buildReport: un resultado para un lead que ya no está en el archivo se cuenta como huérfano', () => {
  const { dir, leadsFile } = setup([mk(1)], [{ lead_id: 'deadbeef-0000-4000-8000-000000000000', stage: 'won', at: iso(5), value_usd: 100 }])
  const rep = buildReport({ leadsFile, now: new Date(T0 + 3600000) })
  fs.rmSync(dir, { recursive: true, force: true })
  assert.equal(rep.orphan_outcomes, 1)
  assert.equal(rep.revenue_usd, 0)
})

test('buildReport: filtra por rango de fechas', () => {
  const { dir, leadsFile } = setup([mk(1), mk(2, { created_at: '2026-09-01T10:00:00Z' })])
  const rep = buildReport({ leadsFile, from: '2026-10-01', now: new Date(T0 + 3600000) })
  fs.rmSync(dir, { recursive: true, force: true })
  assert.equal(rep.totals.leads, 1)
})

test('REGRESIÓN: el último won/lost manda; un won anotado por error se corrige con lost (y al revés)', () => {
  const l = mk(1)
  const o = (stage, minutes, extra = {}) => ({ lead_id: l.lead_id, stage, at: iso(minutes), ...extra })
  const run = (events) => {
    const { dir, leadsFile } = setup([l], events)
    const rep = buildReport({ leadsFile, now: new Date(T0 + 24 * 3600000) })
    fs.rmSync(dir, { recursive: true, force: true })
    return rep
  }
  const wonThenLost = run([o('contacted', 2), o('won', 60, { value_usd: 900 }), o('lost', 90, { reason: 'price' })])
  assert.equal(wonThenLost.funnel.won, 0)
  assert.equal(wonThenLost.funnel.lost, 1)
  assert.equal(wonThenLost.revenue_usd, 0)
  const lostThenWon = run([o('contacted', 2), o('lost', 60, { reason: 'timing' }), o('won', 90, { value_usd: 300 })])
  assert.equal(lostThenWon.funnel.won, 1)
  assert.equal(lostThenWon.funnel.lost, 0)
  assert.equal(lostThenWon.revenue_usd, 300)
})

test('REGRESIÓN: la velocidad de respuesta sale de "contacted", no de cualquier etapa anotada después', () => {
  const l = mk(1)
  const { dir, leadsFile } = setup([l], [{ lead_id: l.lead_id, stage: 'won', at: iso(4320), value_usd: 200 }])
  const rep = buildReport({ leadsFile, now: new Date(T0 + 5 * 24 * 3600000) })
  fs.rmSync(dir, { recursive: true, force: true })
  assert.equal(rep.response.median_minutes, null, 'no se inventa una respuesta de 3 días')
  assert.equal(rep.response.never_contacted, 0, 'sí fue atendido (ganó)')
  assert.match(rep.warnings.join(' '), /sin un .contacted./i)
})

test('REGRESIÓN: 5 min 29 s no cuenta como "dentro de 5 minutos"', () => {
  const l = mk(1)
  const { dir, leadsFile } = setup([l], [{ lead_id: l.lead_id, stage: 'contacted', at: new Date(T0 + 5 * 60000 + 29000).toISOString() }])
  const rep = buildReport({ leadsFile, now: new Date(T0 + 3600000) })
  fs.rmSync(dir, { recursive: true, force: true })
  assert.equal(rep.response.within_5_min_pct, 0)
  assert.equal(rep.response.within_15_min_pct, 100)
})

test('parseAt: sin zona se lee en hora de Florida (verano e invierno); con zona se respeta', () => {
  assert.equal(parseAt('2026-10-05 14:03').toISOString(), '2026-10-05T18:03:00.000Z')
  assert.equal(parseAt('2026-12-05T14:03').toISOString(), '2026-12-05T19:03:00.000Z')
  assert.equal(parseAt('2026-10-05T14:03:00Z').toISOString(), '2026-10-05T14:03:00.000Z')
  assert.equal(parseAt('2026-10-05T14:03:00-04:00').toISOString(), '2026-10-05T18:03:00.000Z')
  assert.throws(() => parseAt('ayer a las 3'), /--at/)
})

test('recordOutcome con at: puede anotar una llamada que ya pasó, pero no antes del lead ni en el futuro', () => {
  const { dir, leadsFile } = setup([mk(1)])
  const now = new Date(T0 + 600 * 60000)
  const r = recordOutcome(leadsFile, '00000001', { stage: 'contacted', at: new Date(T0 + 3 * 60000).toISOString(), now })
  assert.equal(r.at, iso(3))
  assert.throws(() => recordOutcome(leadsFile, '00000001', { stage: 'contacted', at: new Date(T0 - 3600000).toISOString(), now }), /before|antes/i)
  assert.throws(() => recordOutcome(leadsFile, '00000001', { stage: 'contacted', at: new Date(T0 + 900 * 60000).toISOString(), now }), /future|futuro/i)
  fs.rmSync(dir, { recursive: true, force: true })
})

test('filtro de fechas: formato estricto y el día se corta en hora de Florida, no en UTC', () => {
  const late = mk(1, { created_at: '2026-11-01T01:30:00Z' }) // 31-oct 21:30 en Florida
  const { dir, leadsFile } = setup([late, mk(2, { created_at: '2026-11-01T14:00:00Z' })])
  const oct = buildReport({ leadsFile, from: '2026-10-01', to: '2026-10-31', now: new Date('2026-11-05T00:00:00Z') })
  assert.equal(oct.totals.leads, 1)
  assert.throws(() => buildReport({ leadsFile, from: '2026-10-6' }), /YYYY-MM-DD/)
  assert.throws(() => buildReport({ leadsFile, to: 'mañana' }), /YYYY-MM-DD/)
  fs.rmSync(dir, { recursive: true, force: true })
})

test('una línea "null" o un arreglo en el archivo de leads se salta como dañada', () => {
  const { dir, leadsFile } = setup([mk(1)])
  fs.appendFileSync(leadsFile, 'null\n[1,2]\n')
  const r = readLeads(leadsFile)
  assert.equal(r.items.length, 1)
  assert.equal(r.skipped, 2)
  assert.doesNotThrow(() => resolveLeadId(r.items, '00000001'))
  fs.rmSync(dir, { recursive: true, force: true })
})
