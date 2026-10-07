// Comportamiento de las páginas estáticas (polarizado, cerámico y privacidad): analítica con consentimiento,
// banner de privacidad, cabecera y eventos. NO hay formulario aquí: toda cotización se hace en el formulario de la
// home (el botón lleva con el servicio ya elegido). Sin React para mantener la página ligera.
import './landing.css'
import { initTracking, track, getConsent, setConsent, openConsent } from './lib/track'
import { HAS_TRACKING } from './lib/site'

initTracking()

/* ───────── cabecera: clara arriba y oscura al bajar 80 px, igual que la home ───────── */
const siteHeader = document.getElementById('site-header')
if (siteHeader) {
  const sync = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 80)
  sync()
  window.addEventListener('scroll', sync, { passive: true })
}

/* ───────── barra fija móvil: aparece al bajar 500 px, igual que en la home ───────── */
const stickyBar = document.querySelector('.sticky-cta')
if (stickyBar) {
  const sync = () => stickyBar.classList.toggle('is-visible', window.scrollY > 500)
  sync()
  window.addEventListener('scroll', sync, { passive: true })
}

const L = JSON.parse(document.getElementById('l10n')?.textContent || '{}')

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

/* ───────── preguntas frecuentes: evento al abrir ───────── */
document.querySelectorAll('details.faq').forEach((d) => d.addEventListener('toggle', () => {
  if (d.open) track('faq_open', { faq_id: d.querySelector('summary').textContent.trim().slice(0, 60), location: 'landing', page: L.page })
}))
