'use strict'
const { test, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { createApp } = require('../app')

const ORIGIN = 'https://shinetogomobiledetailing.com'
const GOOD = { name: 'Ana Pérez', phone: '(941) 555-0142', service: 'tint', vehicle: '2022 Tesla Model Y' }

let server, base, dir, sent, failMail

function fakeTransporter() {
  return {
    sendMail: async (msg) => {
      if (failMail) throw new Error('smtp down')
      sent.push(msg)
      return { messageId: 'x' }
    },
  }
}

async function start(overrides = {}) {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'leads-test-'))
  const app = createApp({
    transporter: fakeTransporter(),
    leadsFile: path.join(dir, 'data', 'leads.ndjson'),
    recipient: 'owner@example.com',
    smtpUser: 'contact@example.com',
    allowedOrigins: [ORIGIN],
    rateLimitMax: 1000,
    retryDelayMs: 60000, // largo a propósito: solo la prueba de reintento lo acorta, así no hay envíos fantasma entre pruebas
    log: () => {},
    ...overrides,
  })
  await new Promise((resolve) => { server = app.listen(0, '127.0.0.1', resolve) })
  base = `http://127.0.0.1:${server.address().port}`
}

const post = (body, headers = {}) =>
  fetch(`${base}/api/book`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: ORIGIN, ...headers }, body: JSON.stringify(body) })

const readLeads = () => {
  const f = path.join(dir, 'data', 'leads.ndjson')
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []
}

beforeEach(async () => { sent = []; failMail = false; await start() })
afterEach(async () => {
  await new Promise((r) => server.close(r))
  fs.rmSync(dir, { recursive: true, force: true })
})

test('health responde ok', async () => {
  const r = await fetch(`${base}/api/health`)
  assert.equal(r.status, 200)
  assert.equal((await r.json()).status, 'ok')
})

test('rechaza lead sin nombre, teléfono válido o servicio, y dice qué campo', async () => {
  const r = await post({ name: '', phone: '123', service: '' })
  assert.equal(r.status, 400)
  const j = await r.json()
  assert.equal(j.success, false)
  assert.deepEqual(Object.keys(j.fields).sort(), ['name', 'phone', 'service'])
  assert.equal(sent.length, 0)
  assert.equal(readLeads().length, 0)
})

test('lead válido: guarda, envía correo y responde lead_id', async () => {
  const r = await post({ ...GOOD, lang: 'es', consent_sms: true, consent_text_version: 'v1' })
  assert.equal(r.status, 200)
  const j = await r.json()
  assert.equal(j.success, true)
  assert.match(j.lead_id, /^[0-9a-f-]{36}$/)
  assert.equal(j.notified, true)
  assert.equal(sent.length, 1)
  assert.equal(sent[0].to, 'owner@example.com')
  assert.match(sent[0].subject, /Window Tint/)
  const [saved] = readLeads()
  assert.equal(saved.lead_id, j.lead_id)
  assert.equal(saved.lang, 'es')
  assert.equal(saved.consent.sms, true)
  assert.equal(saved.consent.version, 'v1')
  assert.ok(saved.consent.at)
})

test('REGRESIÓN: msg, date y time llegan al correo y al registro (antes se perdían)', async () => {
  const r = await post({ ...GOOD, msg: 'Quiero el sunroof también', date: '2026-11-03', time: 'Morning' })
  assert.equal(r.status, 200)
  assert.match(sent[0].text, /Quiero el sunroof también/)
  assert.match(sent[0].text, /2026-11-03/)
  assert.match(sent[0].text, /Morning/)
  const [saved] = readLeads()
  assert.equal(saved.message, 'Quiero el sunroof también')
  assert.equal(saved.date, '2026-11-03')
  assert.equal(saved.time, 'Morning')
})

test('escapa HTML del usuario en el correo al dueño', async () => {
  const evil = '<img src=x onerror=alert(1)><script>alert(2)</script>'
  await post({ ...GOOD, name: evil, message: evil, vehicle: evil })
  const { html } = sent[0]
  assert.ok(!html.includes('<script>'))
  assert.ok(!html.includes('<img src=x'))
  assert.match(html, /&lt;script&gt;/)
})

test('guarda atribución (utm, gclid) y la muestra en el correo', async () => {
  await post({ ...GOOD, attribution: { utm_source: 'google', utm_campaign: 'goog_search_tint_srq_en', gclid: 'abc123', landing: '/window-tint/', evil_key: 'x' } })
  const [saved] = readLeads()
  assert.equal(saved.attribution.gclid, 'abc123')
  assert.equal(saved.attribution.evil_key, undefined)
  assert.match(sent[0].text, /goog_search_tint_srq_en/)
  assert.match(sent[0].subject, /google/)
})

test('idempotencia: reenviar el mismo lead_id no duplica correo ni registro', async () => {
  const id = '3f2b7a52-1c64-4f0c-8b8e-0a1b2c3d4e5f'
  const a = await (await post({ ...GOOD, lead_id: id })).json()
  const b = await (await post({ ...GOOD, lead_id: id })).json()
  assert.equal(a.lead_id, id)
  assert.equal(b.lead_id, id)
  assert.equal(sent.length, 1)
  assert.equal(readLeads().length, 1)
})

test('servicio desconocido (cliente viejo con texto traducido) se guarda como other', async () => {
  const r = await post({ ...GOOD, service: 'Revestimiento Cerámico' })
  assert.equal(r.status, 200)
  const [saved] = readLeads()
  assert.equal(saved.service, 'other')
  assert.equal(saved.service_raw, 'Revestimiento Cerámico')
})

test('si el correo falla, el lead queda guardado, responde 200 notified:false y reintenta', async () => {
  await new Promise((r) => server.close(r))
  fs.rmSync(dir, { recursive: true, force: true })
  await start({ retryDelayMs: 150 })
  failMail = true
  const r = await post(GOOD)
  assert.equal(r.status, 200)
  const j = await r.json()
  assert.equal(j.success, true)
  assert.equal(j.notified, false)
  assert.equal(readLeads().length, 1)
  failMail = false // SMTP vuelve antes de que dispare el reintento
  await new Promise((res) => setTimeout(res, 400))
  assert.equal(sent.length, 1, 'el reintento envía el correo cuando SMTP vuelve')
})

test('si falla el guardado pero el correo sale, responde 200', async () => {
  await new Promise((r) => server.close(r))
  fs.rmSync(dir, { recursive: true, force: true })
  // el archivo de leads apunta a una ruta imposible de crear (un archivo hace de "directorio")
  const blocker = path.join(os.tmpdir(), 'leads-blocker-' + Date.now())
  fs.writeFileSync(blocker, 'x')
  await start({ leadsFile: path.join(blocker, 'sub', 'leads.ndjson') })
  const r = await post(GOOD)
  fs.rmSync(blocker, { force: true })
  assert.equal(r.status, 200)
  assert.equal(sent.length, 1)
})

test('si fallan guardado y correo, responde 500 (el cliente debe poder reintentar)', async () => {
  await new Promise((r) => server.close(r))
  fs.rmSync(dir, { recursive: true, force: true })
  const blocker = path.join(os.tmpdir(), 'leads-blocker2-' + Date.now())
  fs.writeFileSync(blocker, 'x')
  await start({ leadsFile: path.join(blocker, 'sub', 'leads.ndjson') })
  failMail = true
  const r = await post(GOOD)
  fs.rmSync(blocker, { force: true })
  assert.equal(r.status, 500)
  assert.equal((await r.json()).success, false)
})

test('honeypot: un bot que llena "website" recibe 200 pero no se guarda ni se envía nada', async () => {
  const r = await post({ ...GOOD, website: 'http://spam.example' })
  assert.equal(r.status, 200)
  assert.equal(sent.length, 0)
  assert.equal(readLeads().length, 0)
})

test('CORS: origen no permitido recibe 403 JSON, no un 500 HTML', async () => {
  const r = await post(GOOD, { Origin: 'https://evil.example' })
  assert.equal(r.status, 403)
  assert.equal((await r.json()).success, false)
})

test('cuerpo demasiado grande recibe 413 JSON', async () => {
  const r = await post({ ...GOOD, message: 'x'.repeat(20000) })
  assert.equal(r.status, 413)
  assert.equal((await r.json()).success, false)
})

test('límite de solicitudes: la solicitud 3 recibe 429 con max=2', async () => {
  await new Promise((r) => server.close(r))
  fs.rmSync(dir, { recursive: true, force: true })
  await start({ rateLimitMax: 2 })
  assert.equal((await post(GOOD)).status, 200)
  assert.equal((await post({ ...GOOD, name: 'Otro' })).status, 200)
  assert.equal((await post({ ...GOOD, name: 'Tercero' })).status, 429)
})

/* ───────── Auditoría de seguridad (F-04, F-05, F-07 a F-10, F-17) ───────── */
async function restart(overrides) {
  await new Promise((r) => server.close(r))
  fs.rmSync(dir, { recursive: true, force: true })
  await start(overrides)
}

test('servicio con nombre de propiedad del prototipo (constructor, __proto__) se guarda como other', async () => {
  for (const service of ['constructor', '__proto__', 'toString']) {
    const r = await post({ ...GOOD, service, name: `Lead ${service}` })
    assert.equal(r.status, 200)
  }
  const saved = readLeads()
  assert.equal(saved.length, 3)
  for (const lead of saved) assert.equal(lead.service, 'other')
  assert.ok(sent.every((m) => !/native code|\[object Object\]/.test(m.subject)), 'el asunto no muestra el prototipo')
})

test('saltos de línea en campos de una línea no fabrican filas en el correo de texto', async () => {
  const r = await post({ ...GOOD, name: 'Bob\r\nPhone: 999-FALSE', vehicle: 'Ford\nF-150', message: 'línea 1\nlínea 2' })
  assert.equal(r.status, 200)
  const [saved] = readLeads()
  assert.equal(saved.name, 'Bob Phone: 999-FALSE')
  assert.equal(saved.vehicle, 'Ford F-150')
  assert.equal(saved.message, 'línea 1\nlínea 2', 'el mensaje conserva sus saltos')
  assert.ok(!/^Phone: 999-FALSE/m.test(sent[0].text))
})

test('el mismo lead_id con contenido distinto NO se descarta: se guarda con un id nuevo', async () => {
  const id = '3f2b7a52-1c64-4f0c-8b8e-0a1b2c3d4e5f'
  const a = await (await post({ ...GOOD, lead_id: id })).json()
  const b = await (await post({ ...GOOD, lead_id: id, name: 'Otra Persona', phone: '(813) 555-0101' })).json()
  assert.equal(a.lead_id, id)
  assert.notEqual(b.lead_id, id)
  assert.equal(readLeads().length, 2)
  assert.equal(sent.length, 2)
})

test('si SMTP tarda en volver, el aviso se reintenta con retroceso hasta que sale', async () => {
  await restart({ retryDelayMs: 20 }) // reintentos a 20 ms, 100 ms y 600 ms
  failMail = true
  assert.equal((await (await post(GOOD)).json()).notified, false)
  await new Promise((res) => setTimeout(res, 60))
  failMail = false // vuelve después del primer reintento fallido
  await new Promise((res) => setTimeout(res, 350))
  assert.equal(sent.length, 1, 'el segundo reintento envía el correo')
})

test('honeypot: el campo company_url (y el website anterior) descartan el lead', async () => {
  assert.equal((await post({ ...GOOD, company_url: 'http://spam.example' })).status, 200)
  assert.equal((await post({ ...GOOD, website: 'http://spam.example' })).status, 200)
  assert.equal(sent.length, 0)
  assert.equal(readLeads().length, 0)
})

test('límite por visitante: usa la IP de X-Forwarded-For que añade el proxy en loopback', async () => {
  await restart({ rateLimitMax: 2 })
  const from = (ip) => ({ 'X-Forwarded-For': ip })
  assert.equal((await post(GOOD, from('203.0.113.1'))).status, 200)
  assert.equal((await post({ ...GOOD, name: 'B' }, from('203.0.113.1'))).status, 200)
  assert.equal((await post({ ...GOOD, name: 'C' }, from('203.0.113.1'))).status, 429)
  assert.equal((await post({ ...GOOD, name: 'D' }, from('203.0.113.2'))).status, 200, 'otro visitante no se ve afectado')
})

test('límite global: aunque cambie la IP en cada solicitud, el total por minuto tiene techo', async () => {
  await restart({ globalLimitMax: 3 })
  const codes = []
  for (let i = 1; i <= 5; i += 1) {
    codes.push((await post({ ...GOOD, name: `Lead ${i}` }, { 'X-Forwarded-For': `198.51.100.${i}` })).status)
  }
  assert.deepEqual(codes, [200, 200, 200, 429, 429])
})

test('el archivo de leads tiene tope: al llegar a él se avisa por correo y se registra el error', async () => {
  const errors = []
  await restart({ maxLeadsFileBytes: 300, log: (level, msg) => { if (level === 'error') errors.push(msg) } })
  assert.equal((await post(GOOD)).status, 200)
  assert.equal((await post({ ...GOOD, name: 'Segundo' })).status, 200)
  assert.equal(readLeads().length, 1, 'el segundo ya no cabe en el archivo')
  assert.equal(sent.length, 2, 'pero el dueño recibe el correo de los dos')
  assert.ok(errors.includes('lead persist failed'))
})

test('el archivo de leads se crea con permisos privados (0600 en carpeta 0700)', { skip: process.platform === 'win32' }, async () => {
  await post(GOOD)
  const file = path.join(dir, 'data', 'leads.ndjson')
  assert.equal(fs.statSync(file).mode & 0o777, 0o600)
  assert.equal(fs.statSync(path.dirname(file)).mode & 0o777, 0o700)
})

test('tint y cerámica no se aceptan para un bote (solo autos)', async () => {
  const r = await post({ ...GOOD, vehicle_type: 'boat', service: 'tint' })
  assert.equal(r.status, 400)
  assert.deepEqual(Object.keys((await r.json()).fields), ['service'])
  assert.equal((await post({ ...GOOD, vehicle_type: 'boat', service: 'boat' })).status, 200)
  assert.equal((await post({ ...GOOD, vehicle_type: 'suv', service: 'tint' })).status, 200)
})

/* ───────── Dos servicios distintos: tint por ventanas, cerámico por tipo de tratamiento ───────── */
test('cerámico: guarda las zonas pedidas (solo valores conocidos) y las muestra en el correo', async () => {
  const r = await post({ ...GOOD, service: 'ceramic', ceramic_areas: ['paint', 'wheels', 'glass', 'hacker', '<b>x</b>'] })
  assert.equal(r.status, 200)
  const [saved] = readLeads()
  assert.deepEqual(saved.ceramic_areas, ['paint', 'wheels', 'glass'])
  assert.match(sent[0].text, /Ceramic areas: paint, wheels, glass/)
})

test('tint: las ventanas se guardan en coverage y el tint no arrastra zonas de cerámico', async () => {
  const r = await post({ ...GOOD, service: 'tint', coverage: ['front_sides', 'rear_sides', 'back_window', 'sunroof', 'bogus'], ceramic_areas: ['paint'] })
  assert.equal(r.status, 200)
  const [saved] = readLeads()
  assert.deepEqual(saved.coverage, ['front_sides', 'rear_sides', 'back_window', 'sunroof'])
  assert.deepEqual(saved.ceramic_areas, [], 'un lead de tint no lleva zonas de cerámico')
})

test('clientes con el servicio combinado anterior (tint_ceramic) siguen funcionando', async () => {
  const r = await post({ ...GOOD, service: 'tint_ceramic' })
  assert.equal(r.status, 200)
  assert.equal(readLeads()[0].service, 'tint_ceramic')
})
