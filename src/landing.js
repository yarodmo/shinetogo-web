// Comportamiento de las páginas estáticas (landings y privacidad): analítica con consentimiento,
// banner de privacidad y el formulario de cotización. Sin React para mantener la página ligera.
import './landing.css'
import { initTracking, track, getConsent, setConsent, openConsent } from './lib/track'
import { submitLead, newLeadId } from './lib/leads'
import { HAS_TRACKING, PHONE_TEL, waLink } from './lib/site'

initTracking()

const L = JSON.parse(document.getElementById('l10n')?.textContent || '{}')
// v2: texto reescrito tras la revisión de cumplimiento; una versión por idioma (docs/CONSENT-TEXT.md).
const CONSENT_VERSION = `v2-${L.lang}`

/* ───────── banner de privacidad (solo si hay IDs de analítica y aún no eligió) ───────── */
function showConsentBanner(force = false) {
  if (!HAS_TRACKING || (!force && getConsent())) return
  if (document.querySelector('.consent-banner')) return
  const box = document.createElement('div')
  box.className = 'consent-banner'
  box.setAttribute('role', 'dialog')
  box.setAttribute('aria-label', L.consentTitle)

  const h = document.createElement('h4')
  h.textContent = L.consentTitle
  const p = document.createElement('p')
  p.textContent = L.consentBody
  const row = document.createElement('div')
  row.className = 'row'

  const choose = (value) => () => { setConsent(value); box.remove() }
  const reject = document.createElement('button')
  reject.type = 'button'
  reject.className = 'btn btn-ghost'
  reject.textContent = L.consentReject
  reject.addEventListener('click', choose('denied'))
  const accept = document.createElement('button')
  accept.type = 'button'
  accept.className = 'btn btn-ghost'
  accept.textContent = L.consentAccept
  accept.addEventListener('click', choose('granted'))
  const more = document.createElement('a')
  more.href = L.privacy
  more.textContent = L.consentMore

  row.append(reject, accept, more)
  box.append(h, p, row)
  document.body.append(box)
}
showConsentBanner()
window.addEventListener('stg:consent-open', () => showConsentBanner(true))
document.querySelectorAll('[data-open-consent]').forEach((el) => el.addEventListener('click', openConsent))

/* ───────── formulario de cotización ───────── */
document.querySelectorAll('details.faq').forEach((d) => d.addEventListener('toggle', () => {
  if (d.open) track('faq_open', { faq_id: d.querySelector('summary').textContent.trim().slice(0, 60), location: 'landing', page: L.page })
}))

const form = document.getElementById('quote-form')
if (form) {
  form.hidden = false // el HTML lo trae oculto: sin JavaScript el envío por GET dejaría los datos en la URL
  const status = document.getElementById('form-status')
  const leadId = newLeadId()
  let started = false
  let sending = false

  // Cada página es un solo servicio (tint o ceramic): el servicio viene fijo en el formulario.
  const service = form.dataset.service
  const checked = (name) => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((el) => el.value)

  form.addEventListener('focusin', () => {
    if (started) return
    started = true
    track('form_start', { location: 'landing', page: L.page })
  })

  const fieldError = (name, message) => {
    const input = form.elements[name]
    input.classList.toggle('input-error', Boolean(message))
    input.setAttribute('aria-invalid', message ? 'true' : 'false')
    let note = input.parentElement.querySelector('.err')
    if (message && !note) {
      note = document.createElement('span')
      note.className = 'err'
      input.parentElement.append(note)
    }
    if (note) {
      if (message) note.textContent = message
      else note.remove()
    }
  }

  const validate = () => {
    let first = null
    const check = (name, ok, message) => {
      fieldError(name, ok ? '' : message)
      if (!ok && !first) first = form.elements[name]
    }
    check('name', form.elements.name.value.trim().length > 0, L.required)
    check('phone', form.elements.phone.value.replace(/\D/g, '').length >= 10, L.phoneBad)
    const email = form.elements.email.value.trim()
    check('email', !email || /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email), L.emailBad)
    check('vehicle_type', Boolean(form.elements.vehicle_type.value), L.required)
    if (first) first.focus()
    return !first
  }

  const showError = (kind, fields) => {
    status.replaceChildren()
    const box = document.createElement('div')
    box.className = 'form-alert'
    const strong = document.createElement('strong')
    strong.textContent = kind === 'validation' ? L.errFields : L.errTitle
    box.append(strong)
    if (kind !== 'validation') {
      const body = document.createElement('p')
      body.textContent = L.errBody
      const call = document.createElement('a')
      call.href = `tel:${PHONE_TEL}`
      call.textContent = L.callLabel
      call.className = 'textlink'
      box.append(body, call)
    }
    status.append(box)
    if (fields) for (const k of Object.keys(fields)) if (form.elements[k]) fieldError(k, k === 'phone' ? L.phoneBad : k === 'email' ? L.emailBad : L.required)
  }

  const showSuccess = (data) => {
    const wrap = document.createElement('div')
    wrap.className = 'form-ok'
    wrap.setAttribute('tabindex', '-1')
    const h = document.createElement('h2')
    h.textContent = L.okTitle
    const p = document.createElement('p')
    p.textContent = L.okBody
    const ref = document.createElement('p')
    ref.className = 'muted'
    const short = String(data.lead_id || leadId).slice(0, 8)
    ref.textContent = `${L.okRef}: ${short}`
    const wa = document.createElement('a')
    wa.className = 'btn btn-green'
    wa.target = '_blank'
    wa.rel = 'noopener'
    wa.href = waLink(`${L.waPhotos} ${short}`)
    wa.textContent = `💬 ${L.okWa}`
    wa.dataset.track = 'whatsapp_click'
    wa.dataset.location = 'landing_success'
    wrap.append(h, p, ref, wa)
    form.replaceWith(wrap)
    wrap.focus()
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    if (sending || !validate()) return
    sending = true
    const btn = form.querySelector('button[type="submit"]')
    btn.disabled = true
    btn.textContent = L.sending
    status.replaceChildren()

    const f = form.elements
    const isTint = service === 'tint'
    try {
      const data = await submitLead({
        lead_id: leadId,
        name: f.name.value, phone: f.phone.value, email: f.email.value,
        service, vehicle_type: f.vehicle_type.value, vehicle: f.vehicle.value,
        coverage: isTint ? checked('coverage') : [],
        film: isTint ? (checked('film')[0] || '') : '',
        has_old_tint: isTint ? Boolean(form.querySelector('input[name="has_old_tint"]')?.checked) : false,
        ceramic_areas: isTint ? [] : checked('ceramic_areas'),
        zip: f.zip.value,
        lang: L.lang, consent_sms: f.consent_sms.checked, consent_text_version: CONSENT_VERSION,
        company_url: f.company_url.value,
      })
      track('lead_submit', { lead_id: data.lead_id, service, vehicle_type: f.vehicle_type.value, language: L.lang, location: 'landing', page: L.page })
      showSuccess(data)
    } catch (err) {
      track('form_error', { kind: err.kind || 'server', location: 'landing', page: L.page })
      showError(err.kind || 'server', err.kind === 'validation' ? err.fields : null)
      btn.disabled = false
      btn.textContent = L.send
      sending = false
    }
  })
}
