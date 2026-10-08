'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { addManualLead, CHANNELS } = require('../lib/manual-lead')
const { readLeads, recordOutcome, buildReport } = require('../lib/outcomes')

const tmp = () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'manual-'))
  return { dir, leadsFile: path.join(dir, 'data', 'leads.ndjson') }
}
const NOW = new Date('2026-10-05T18:00:00Z')

test('CHANNELS: los canales que no pasan por el formulario', () => {
  assert.deepEqual(CHANNELS, ['whatsapp', 'call', 'walkin', 'referral', 'other'])
})

test('addManualLead: guarda un lead de WhatsApp sin datos personales obligatorios y devuelve el id de 8 caracteres', () => {
  const { dir, leadsFile } = tmp()
  const r = addManualLead(leadsFile, { channel: 'whatsapp', service: 'tint', lang: 'es', source: 'google', medium: 'cpc', now: NOW })
  assert.match(r.lead_id, /^[0-9a-f-]{36}$/)
  assert.equal(r.short_id, r.lead_id.slice(0, 8))
  const { items } = readLeads(leadsFile)
  assert.equal(items.length, 1)
  assert.equal(items[0].channel, 'whatsapp')
  assert.equal(items[0].manual, true)
  assert.equal(items[0].service, 'tint')
  assert.equal(items[0].lang, 'es')
  assert.equal(items[0].created_at, NOW.toISOString())
  assert.equal(items[0].name, '')
  assert.deepEqual(items[0].attribution, { utm_source: 'google', utm_medium: 'cpc' })
  assert.equal(items[0].consent.sms, false, 'un alta manual nunca declara consentimiento')
  fs.rmSync(dir, { recursive: true, force: true })
})

test('addManualLead: valida canal, servicio e idioma, y no acepta una hora futura ni basura en el nombre', () => {
  const { dir, leadsFile } = tmp()
  assert.throws(() => addManualLead(leadsFile, { channel: 'form', service: 'tint', now: NOW }), /channel/)
  assert.throws(() => addManualLead(leadsFile, { channel: 'call', service: 'masaje', now: NOW }), /service/)
  assert.throws(() => addManualLead(leadsFile, { channel: 'call', service: 'tint', lang: 'fr', now: NOW }), /lang/)
  assert.throws(() => addManualLead(leadsFile, { channel: 'call', service: 'tint', at: '2099-01-01 10:00', now: NOW }), /future/)
  const r = addManualLead(leadsFile, { channel: 'call', service: 'tint', name: 'Ana\n{"x":1}', now: NOW })
  assert.equal(readLeads(leadsFile).items.length, 1, 'el nombre con salto de línea no fabrica un segundo registro')
  assert.equal(readLeads(leadsFile).items[0].name.includes('\n'), false)
  assert.ok(r.lead_id)
  fs.rmSync(dir, { recursive: true, force: true })
})

test('un alta manual recibe resultados y entra al reporte por canal, sin ensuciar las métricas del formulario', () => {
  const { dir, leadsFile } = tmp()
  const form = { lead_id: 'aaaaaaaa-0000-4000-8000-000000000000', created_at: '2026-10-05T14:00:00Z', name: 'F', phone: '9415550142', email: 'a@b.co', service: 'tint', lang: 'en', zip: '34236', date: '', attribution: {}, consent: { sms: true } }
  fs.mkdirSync(path.dirname(leadsFile), { recursive: true })
  fs.writeFileSync(leadsFile, JSON.stringify(form) + '\n')
  const wa = addManualLead(leadsFile, { channel: 'whatsapp', service: 'ceramic', lang: 'es', source: 'instagram', now: new Date('2026-10-05T15:00:00Z') })
  recordOutcome(leadsFile, wa.short_id, { stage: 'contacted', at: '2026-10-05T15:04:00Z', now: NOW })
  recordOutcome(leadsFile, wa.short_id, { stage: 'won', value: 800, now: NOW })
  const rep = buildReport({ leadsFile, now: new Date('2026-10-06T00:00:00Z') })
  assert.equal(rep.totals.leads, 2)
  assert.equal(rep.totals.manual_leads, 1)
  assert.equal(rep.totals.consent_pct, 100, 'las métricas de calidad del formulario cuentan solo leads de formulario')
  assert.equal(rep.totals.with_zip_pct, 100)
  assert.deepEqual(rep.by_channel.map((r) => r.key).sort(), ['form', 'whatsapp'])
  assert.equal(rep.by_channel.find((r) => r.key === 'whatsapp').won, 1)
  assert.equal(rep.revenue_usd, 800)
  assert.equal(rep.response.median_minutes, 4)
  fs.rmSync(dir, { recursive: true, force: true })
})
