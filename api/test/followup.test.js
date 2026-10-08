'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { normalizeLead, renderEmail, replyLinks, toE164 } = require('../lib/lead')

const lead = (over = {}) => {
  const r = normalizeLead({ name: 'Ana Pérez', phone: '(941) 555-0142', service: 'tint', vehicle: '2022 Tesla Model Y', lang: 'en', consent_sms: true, consent_text_version: 'v2-en', ...over })
  assert.equal(r.ok, true)
  return r.lead
}

test('toE164: 10 dígitos de EE. UU., 11 con 1 delante, formato con signos y número internacional', () => {
  assert.equal(toE164('(941) 555-0142'), '19415550142')
  assert.equal(toE164('1-941-555-0142'), '19415550142')
  assert.equal(toE164('+1 941 555 0142'), '19415550142')
  assert.equal(toE164('+52 55 1234 5678'), '525512345678')
})

test('REGRESIÓN toE164: una extensión o un número que no es claramente NANP/internacional NO produce un destino equivocado', () => {
  assert.equal(toE164('941-555-0142 ext 5'), null, 'antes daba +94155501425 (Sri Lanka)')
  assert.equal(toE164('1234567890'), null, 'código de área que empieza en 1')
  assert.equal(toE164('(941) 155-0142'), null, 'central que empieza en 1')
  assert.equal(toE164('+1 123 456 7890'), null)
  assert.equal(toE164('+44 20 7946 0958'), '442079460958')
  assert.equal(toE164('+1 941 555 0142'), '19415550142')
})

test('replyLinks: con un teléfono dudoso no hay enlaces de llamar ni de WhatsApp', () => {
  const l = lead({ phone: '941-555-0142 ext 5' })
  assert.deepEqual(replyLinks(l, { brand: 'B' }), { tel: null, wa: null })
})

test('correo: con un teléfono dudoso avisa que lo verifiques y no pone botones', () => {
  const { text, html } = renderEmail(lead({ phone: '941-555-0142 ext 5' }), { brand: 'B' })
  assert.doesNotMatch(html, /wa\.me|href="tel:/)
  assert.doesNotMatch(text, /wa\.me|tel:/)
  assert.match(text, /Verify the number/)
  assert.match(html, /Verify the number/)
})

test('replyLinks: tel y WhatsApp apuntan al teléfono del cliente, con texto ya escrito en su idioma', () => {
  const l = lead()
  const { tel, wa } = replyLinks(l, { brand: 'ShineToGo Mobile Detailing' })
  assert.equal(tel, 'tel:+19415550142')
  assert.match(wa, /^https:\/\/wa\.me\/19415550142\?text=/)
  const text = decodeURIComponent(wa.split('?text=')[1])
  assert.match(text, /^Hi Ana,/)
  assert.match(text, /ShineToGo Mobile Detailing/)
  assert.match(text, new RegExp(l.lead_id.slice(0, 8)))
  assert.match(text, /Window Tint/)
})

test('replyLinks: lead en español recibe el mensaje en español y el nombre del servicio en español', () => {
  const l = lead({ lang: 'es', service: 'ceramic', consent_text_version: 'v2-es' })
  const text = decodeURIComponent(replyLinks(l, { brand: 'ShineToGo Mobile Detailing' }).wa.split('?text=')[1])
  assert.match(text, /^Hola Ana,/)
  assert.match(text, /recubrimiento cerámico/i)
})

test('replyLinks: el mensaje no promete precio, plazo ni descuento', () => {
  for (const service of ['express', 'full', 'premium', 'tint', 'ceramic', 'tint_ceramic', 'boat', 'other']) {
    for (const lang of ['en', 'es']) {
      const text = decodeURIComponent(replyLinks(lead({ service, lang }), { brand: 'X' }).wa.split('?text=')[1])
      assert.doesNotMatch(text, /\$|\d+\s?%|gratis|free|discount|descuento|today|hoy|minutes|minutos/i, `${service}/${lang}: ${text}`)
    }
  }
})

test('replyLinks: un nombre malicioso no rompe el enlace ni inyecta parámetros', () => {
  const l = lead({ name: 'Ana"><script>alert(1)</script>&text=evil' })
  const { wa } = replyLinks(l, { brand: 'B' })
  assert.equal(wa.split('?').length, 2, 'un solo ?')
  assert.equal([...wa.matchAll(/[?&]text=/g)].length, 1, 'un solo parámetro text')
  assert.doesNotMatch(wa, /[<>"]/)
})

test('correo: el asunto trae servicio, idioma, ZIP y fuente para triar desde la pantalla de bloqueo', () => {
  const l = lead({ lang: 'es', zip: '34236', attribution: { utm_source: 'google' } })
  const { subject } = renderEmail(l, { brand: 'B' })
  assert.match(subject, /Window Tint/)
  assert.match(subject, /\bES\b/)
  assert.match(subject, /34236/)
  assert.match(subject, /google/)
})

test('correo: arriba van los botones de llamar y responder por WhatsApp, y el consentimiento queda a la vista (sin afirmarlo como verificado)', () => {
  const l = lead()
  const { text, html } = renderEmail(l, { brand: 'B' })
  assert.match(html, /href="tel:\+19415550142"/)
  assert.match(html, /href="https:\/\/wa\.me\/19415550142\?text=[^"]+"/)
  assert.match(text, /tel:\+19415550142/)
  assert.match(text, /https:\/\/wa\.me\/19415550142\?text=/)
  assert.ok(text.indexOf('Call:') < text.indexOf('Name:'), 'los enlaces van antes de la tabla')
  assert.match(text, /Text OK: box ticked/)
  assert.match(text, /not verified/i)
})

test('correo: sin casilla de consentimiento lo dice y recuerda responder a mano, una persona a la vez', () => {
  const { text, html } = renderEmail(lead({ consent_sms: false }), { brand: 'B' })
  assert.match(text, /Text OK: NO/)
  assert.match(text, /one-to-one/i)
  assert.match(html, /No texting consent/)
})

test('correo: el HTML escapa el nombre dentro del href y del texto', () => {
  const { html } = renderEmail(lead({ name: 'Ana"><img src=x onerror=alert(1)>' }), { brand: 'B' })
  assert.doesNotMatch(html, /<img src=x/)
  assert.doesNotMatch(html, /href="[^"]*"[^>]*onerror/)
})

test('la página previa (via) se guarda con la atribución y sale en el correo', () => {
  const l = lead({ attribution: { via: '/window-tint/', landing: '/' } })
  assert.equal(l.attribution.via, '/window-tint/')
  assert.match(renderEmail(l, { brand: 'B' }).text, /via: \/window-tint\//)
})
