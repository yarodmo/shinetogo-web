'use strict'
const { test, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const crypto = require('node:crypto')
const fs = require('node:fs')
const http = require('node:http')
const os = require('node:os')
const path = require('node:path')
const { createApp } = require('../app')
const { webhookConfig, buildPayload, signBody, createForwarder, createSender } = require('../lib/forward')

const ORIGIN = 'https://shinetogomobiledetailing.com'
const SECRET = 'a-long-shared-secret-123'
const GOOD = { name: 'Ana Pérez', phone: '(941) 555-0142', service: 'tint', vehicle: '2022 Tesla Model Y', consent_sms: true, consent_text_version: 'v2-en', zip: '34236' }

let receiver, receiverUrl, received, receiverStatus, appServer, appBase, dir

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const until = async (fn, ms = 2000) => { const t = Date.now(); while (Date.now() - t < ms) { if (fn()) return true; await sleep(10) } return false }

beforeEach(async () => {
  received = []
  receiverStatus = 200
  receiver = http.createServer((req, res) => {
    let body = ''
    req.on('data', (c) => { body += c })
    req.on('end', () => { received.push({ headers: req.headers, body, url: req.url }); res.statusCode = typeof receiverStatus === 'function' ? receiverStatus(received.length) : receiverStatus; res.end('ok') })
  })
  await new Promise((r) => receiver.listen(0, '127.0.0.1', r))
  receiverUrl = `http://127.0.0.1:${receiver.address().port}/webhook/leads`
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fwd-'))
})
afterEach(async () => {
  await new Promise((r) => receiver.close(r))
  if (appServer) await new Promise((r) => appServer.close(r))
  appServer = null
  fs.rmSync(dir, { recursive: true, force: true })
})

async function startApp(forward) {
  const app = createApp({
    transporter: { sendMail: async () => ({}) },
    leadsFile: path.join(dir, 'leads.ndjson'),
    recipient: 'o@example.com', smtpUser: 'c@example.com',
    allowedOrigins: [ORIGIN], rateLimitMax: 1000, retryDelayMs: 60000, log: () => {},
    forward,
  })
  await new Promise((r) => { appServer = app.listen(0, '127.0.0.1', r) })
  appBase = `http://127.0.0.1:${appServer.address().port}`
}
const post = (body) => fetch(`${appBase}/api/book`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: ORIGIN }, body: JSON.stringify(body) })

test('webhookConfig: apagado por defecto; con URL exige secreto largo y https (o localhost)', () => {
  assert.equal(webhookConfig({}), null)
  assert.throws(() => webhookConfig({ LEAD_WEBHOOK_URL: 'https://n8n.example.com/hook' }), /SECRET/)
  assert.throws(() => webhookConfig({ LEAD_WEBHOOK_URL: 'https://n8n.example.com/hook', LEAD_WEBHOOK_SECRET: 'corto' }), /SECRET/)
  assert.throws(() => webhookConfig({ LEAD_WEBHOOK_URL: 'http://n8n.example.com/hook', LEAD_WEBHOOK_SECRET: SECRET }), /https/i)
  assert.throws(() => webhookConfig({ LEAD_WEBHOOK_URL: 'no es una url', LEAD_WEBHOOK_SECRET: SECRET }), /LEAD_WEBHOOK_URL/)
  assert.deepEqual(webhookConfig({ LEAD_WEBHOOK_URL: 'https://n8n.example.com/hook', LEAD_WEBHOOK_SECRET: SECRET }), { url: 'https://n8n.example.com/hook', secret: SECRET })
  assert.ok(webhookConfig({ LEAD_WEBHOOK_URL: 'http://127.0.0.1:5678/hook', LEAD_WEBHOOK_SECRET: SECRET }))
})

test('REGRESIÓN: una URL con usuario:contraseña se rechaza al arrancar (antes rompía cada envío y filtraba la clave al log)', () => {
  assert.throws(() => webhookConfig({ LEAD_WEBHOOK_URL: 'https://admin:S3cr3t@n8n.example.com/hook', LEAD_WEBHOOK_SECRET: SECRET }), /credentials/i)
  assert.throws(() => webhookConfig({ LEAD_WEBHOOK_URL: 'https://admin@n8n.example.com/hook', LEAD_WEBHOOK_SECRET: SECRET }), /credentials/i)
})

test('buildPayload: manda el lead sin IP ni navegador, con la versión del consentimiento (sin verificar)', () => {
  const lead = { lead_id: 'abc', name: 'Ana', phone: '9415550142', lang: 'en', service: 'tint', consent: { sms: true, version: 'v2-en', at: 'T', ip: '1.2.3.4', user_agent: 'UA' }, attribution: { utm_source: 'google' } }
  const p = buildPayload(lead)
  assert.equal(p.event, 'lead.created')
  assert.equal(p.source, 'shinetogo-web')
  // El formulario no puede probar que quien marcó la casilla es el dueño del número: el receptor no debe tratarlo como verificado.
  assert.deepEqual(p.lead.consent, { sms: true, version: 'v2-en', at: 'T', verified: false })
  assert.equal(JSON.stringify(p).includes('1.2.3.4'), false)
  assert.equal(JSON.stringify(p).includes('"UA"'), false)
  assert.equal(p.lead.attribution.utm_source, 'google')
})

test('signBody: HMAC-SHA256 hex sobre "timestamp.cuerpo"', () => {
  const sig = signBody(SECRET, '1700000000', '{"a":1}')
  assert.equal(sig, crypto.createHmac('sha256', SECRET).update('1700000000.{"a":1}').digest('hex'))
})

test('el lead se reenvía firmado, con clave de idempotencia, y la firma se puede verificar', async () => {
  await startApp(createForwarder({ url: receiverUrl, secret: SECRET, retryDelayMs: 10, log: () => {} }))
  const r = await post(GOOD)
  assert.equal(r.status, 200)
  const { lead_id } = await r.json()
  assert.ok(await until(() => received.length === 1), 'llegó al receptor')
  const got = received[0]
  assert.equal(got.url, '/webhook/leads')
  assert.equal(got.headers['x-idempotency-key'], lead_id)
  const ts = got.headers['x-timestamp']
  assert.equal(got.headers['x-signature'], `sha256=${signBody(SECRET, ts, got.body)}`)
  assert.equal(JSON.parse(got.body).lead.lead_id, lead_id)
  assert.ok(Math.abs(Date.now() / 1000 - Number(ts)) < 30, 'el timestamp es de ahora (en segundos)')
})

test('si el receptor falla, el cliente igual recibe 200 y se reintenta hasta que entra (2xx)', async () => {
  const statuses = []
  receiverStatus = (n) => { const code = n <= 2 ? 503 : 200; statuses.push(code); return code }
  const logs = []
  await startApp(createForwarder({ url: receiverUrl, secret: SECRET, retryDelayMs: 10, log: (l, m) => logs.push(m) }))
  const r = await post(GOOD)
  assert.equal(r.status, 200)
  assert.ok(await until(() => logs.includes('lead forwarded')), 'terminó entregado')
  assert.deepEqual(statuses, [503, 503, 200])
  assert.equal(new Set(received.map((x) => x.headers['x-idempotency-key'])).size, 1, 'siempre el mismo lead_id')
})

test('un 4xx permanente (400/401/404) no se reintenta y queda LEAD NOT FORWARDED en el log', async () => {
  receiverStatus = 400
  const logs = []
  await startApp(createForwarder({ url: receiverUrl, secret: SECRET, retryDelayMs: 10, log: (l, m) => logs.push(m) }))
  await post(GOOD)
  assert.ok(await until(() => logs.includes('LEAD NOT FORWARDED')))
  await sleep(100)
  assert.equal(received.length, 1)
})

test('createSender: resuelve con 2xx y rechaza con el estado si no (para el reenvío manual)', async () => {
  const send = createSender({ url: receiverUrl, secret: SECRET })
  const lead = { lead_id: '11111111-1111-4111-8111-111111111111', name: 'Ana', phone: '9415550142', service: 'tint', lang: 'en', consent: { sms: false } }
  await send(lead)
  assert.equal(received.length, 1)
  receiverStatus = 500
  await assert.rejects(() => send(lead), /500/)
})

test('un receptor caído (puerto cerrado) no tumba la captura ni el correo', async () => {
  await startApp(createForwarder({ url: 'http://127.0.0.1:9/hook', secret: SECRET, retryDelayMs: 10, timeoutMs: 200, log: () => {} }))
  const r = await post(GOOD)
  assert.equal(r.status, 200)
  assert.equal((await r.json()).success, true)
  assert.equal(fs.readFileSync(path.join(dir, 'leads.ndjson'), 'utf8').trim().split('\n').length, 1)
})

test('no sigue redirecciones (el destino lo fija el operador, no el servidor remoto)', async () => {
  const hits = []
  const evil = http.createServer((req, res) => { hits.push(req.url); res.end('x') })
  await new Promise((r) => evil.listen(0, '127.0.0.1', r))
  receiver.removeAllListeners('request')
  receiver.on('request', (req, res) => { res.statusCode = 302; res.setHeader('Location', `http://127.0.0.1:${evil.address().port}/steal`); res.end() })
  await startApp(createForwarder({ url: receiverUrl, secret: SECRET, retryDelayMs: 10, log: () => {}, maxAttempts: 1 }))
  let hit = 0
  receiver.removeAllListeners('request')
  receiver.on('request', (req, res) => { hit += 1; res.statusCode = 302; res.setHeader('Location', `http://127.0.0.1:${evil.address().port}/steal`); res.end() })
  await post(GOOD)
  assert.ok(await until(() => hit >= 1), 'el reenviador sí llamó al receptor')
  await sleep(150)
  await new Promise((r) => evil.close(r))
  assert.deepEqual(hits, [])
})

test('sin LEAD_WEBHOOK_URL no sale nada y todo funciona igual', async () => {
  await startApp(undefined)
  const r = await post(GOOD)
  assert.equal(r.status, 200)
  await sleep(50)
  assert.equal(received.length, 0)
})

test('un honeypot no se reenvía', async () => {
  await startApp(createForwarder({ url: receiverUrl, secret: SECRET, retryDelayMs: 10, log: () => {} }))
  await post({ ...GOOD, company_url: 'http://spam.example' })
  await sleep(100)
  assert.equal(received.length, 0)
})
