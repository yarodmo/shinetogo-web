import { TRACKING, HAS_TRACKING } from './site'

const CONSENT_KEY = 'stg_consent_v1'
const FIRST_KEY = 'stg_first_touch_v1'
const LAST_KEY = 'stg_last_touch_v1'
const ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid']
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000

const safe = (fn, fallback = null) => { try { return fn() } catch { return fallback } }

/* ───────── atribución ───────── */
function readTouch() {
  const params = new URLSearchParams(window.location.search)
  const touch = {}
  for (const k of ATTR_KEYS) {
    const v = params.get(k)
    if (v) touch[k] = v.slice(0, 200)
  }
  const ref = document.referrer
  if (ref && !ref.startsWith(window.location.origin)) touch.referrer = ref.slice(0, 200)
  touch.landing = window.location.pathname
  return touch
}

export function captureAttribution() {
  const now = Date.now()
  const touch = readTouch()
  const hasCampaign = ATTR_KEYS.some((k) => touch[k])
  const first = safe(() => JSON.parse(localStorage.getItem(FIRST_KEY)))
  if (!first || now - first.at > NINETY_DAYS) {
    safe(() => localStorage.setItem(FIRST_KEY, JSON.stringify({ at: now, touch })))
  }
  // La última visita con campaña manda; sin campaña se conserva la anterior de esta sesión.
  if (hasCampaign || !safe(() => sessionStorage.getItem(LAST_KEY))) {
    safe(() => sessionStorage.setItem(LAST_KEY, JSON.stringify(touch)))
  }
}

export function getAttribution() {
  const first = safe(() => JSON.parse(localStorage.getItem(FIRST_KEY)))?.touch || {}
  const last = safe(() => JSON.parse(sessionStorage.getItem(LAST_KEY))) || {}
  // Una sola visita completa: la última si trajo campaña, si no la primera.
  // Nunca se mezclan campos (utm_source de hoy con utm_medium de hace meses falsearía la atribución).
  const source = ATTR_KEYS.some((k) => last[k]) ? last : first
  return { ...source, page: window.location.pathname + window.location.hash }
}

/* ───────── consentimiento ───────── */
export const getConsent = () => safe(() => localStorage.getItem(CONSENT_KEY))
export function setConsent(value) {
  const before = getConsent()
  safe(() => localStorage.setItem(CONSENT_KEY, value))
  track('consent_choice', { choice: value })
  if (value === 'granted') loadVendors()
  window.dispatchEvent(new CustomEvent('stg:consent', { detail: value }))
  // Retirar el permiso no descarga lo ya cargado en esta página: se recarga para que quede sin ello.
  if (before === 'granted' && value === 'denied') window.location.reload()
}

// "Opciones de privacidad" del pie: vuelve a mostrar el aviso para cambiar la decisión.
export const openConsent = () => window.dispatchEvent(new CustomEvent('stg:consent-open'))

/* ───────── eventos ───────── */
window.dataLayer = window.dataLayer || []

export function track(event, params = {}) {
  // Sin aceptar, ningún evento entra a la cola: GTM la procesaría completa al cargarse después de Aceptar.
  if (getConsent() !== 'granted') return
  window.dataLayer.push({ event, ...params })
  // Respaldo si hay GA4 / Pixel directos sin GTM.
  if (!TRACKING.gtm && window.gtag) window.gtag('event', event, params)
  if (window.fbq) {
    if (event === 'lead_submit') window.fbq('track', 'Lead', {}, { eventID: params.lead_id })
    if (event === 'whatsapp_click' || event === 'call_click') window.fbq('trackCustom', event, params)
  }
}

let loaded = false
function addScript(src, attrs = {}) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v))
  document.head.appendChild(s)
}

function loadVendors() {
  if (loaded || !HAS_TRACKING) return
  loaded = true
  if (TRACKING.gtm) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    addScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(TRACKING.gtm)}`)
  } else if (TRACKING.ga4) {
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', TRACKING.ga4, { anonymize_ip: true })
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(TRACKING.ga4)}`)
  }
  if (TRACKING.metaPixel) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', TRACKING.metaPixel)
    window.fbq('track', 'PageView')
  }
}

/* ───────── arranque ───────── */
let started = false
export function initTracking() {
  if (started) return
  started = true
  captureAttribution()
  if (getConsent() === 'granted') loadVendors()

  // Clics: se identifican por atributo, nunca por el texto (el idioma cambia el texto).
  document.addEventListener('click', (e) => {
    const el = e.target.closest?.('[data-track]')
    if (!el) return
    const { track: name, location, service, film } = el.dataset
    track(name, { location, ...(service && { service }), ...(film && { film }) })
  })

  // Profundidad de scroll: una vez por carga.
  let sent75 = false
  window.addEventListener('scroll', () => {
    if (sent75) return
    const doc = document.documentElement
    if ((window.scrollY + window.innerHeight) / doc.scrollHeight >= 0.75) {
      sent75 = true
      track('scroll_75')
    }
  }, { passive: true })
}
