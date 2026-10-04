/**
 * Genera el HTML estático que necesitan buscadores y asistentes de IA:
 *   index.html, es/index.html            → cascarón de la SPA (metadatos, JSON-LD, texto visible sin JS)
 *   window-tint/, ceramic-coating/       → landings EN
 *   es/polarizado-de-vidrios/, es/recubrimiento-ceramico/ → landings ES
 *   privacy/, es/privacidad/             → política de privacidad
 *   public/sitemap.xml, robots.txt, llms.txt
 *
 * Los textos de Protection salen de src/content/protection.js (misma fuente que la home).
 * Uso: node scripts/build-landings.mjs   (npm run build lo ejecuta antes de vite build)
 * Variables: VITE_SITE_URL, VITE_BRAND_NAME.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { protection } from '../src/content/protection.js'
import { PHONE_DISPLAY, PHONE_TEL, WA_NUMBER as WA, CITIES, COUNTIES, AREAS } from '../src/content/business.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Vite lee .env al compilar; el generador también, para que la marca y la URL sean las mismas en las páginas estáticas.
// Una variable ya definida en el entorno (CI) gana sobre el archivo.
for (const name of ['.env', '.env.local', '.env.production', '.env.production.local']) {
  const file = path.join(ROOT, name)
  if (!fs.existsSync(file)) continue
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*(VITE_[A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^(['"`])(.*)\1$/, '$2')
  }
}
const SITE = (process.env.VITE_SITE_URL || 'https://shinetogomobiledetailing.com').replace(/\/+$/, '')
const BRAND = process.env.VITE_BRAND_NAME || 'ShineToGo'
const PRIVACY_UPDATED = '2026-10-04'
const HAS_TRACKING = Boolean(process.env.VITE_GTM_ID || process.env.VITE_GA4_ID || process.env.VITE_META_PIXEL_ID)
const LOGO = `${SITE}/img/brand/logo-512.jpg`
// Las fuentes cargan sin bloquear el primer render (display=swap muestra texto de inmediato).
const FONTS = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@700;800;900&display=swap'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const write = (rel, content) => {
  const file = path.join(ROOT, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}
const svg = (name, lang) => {
  const f = path.join(ROOT, 'src/assets/protection', `${name}.${lang}.svg`)
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : ''
}
const waLink = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
// Imágenes OG de marketing/creatives (copiadas a public/img/og). Si falta una, se usa el logotipo.
const OG_NAMES = { home: 'og-default', privacy: 'og-default', tint: 'og-window-tint', ceramic: 'og-ceramic-coating' }
const ogImage = (id, lang) => {
  const file = `${OG_NAMES[id]}_${lang}.jpg`
  return fs.existsSync(path.join(ROOT, 'public/img/og', file)) ? `${SITE}/img/og/${file}` : LOGO
}

/* ───────────────────────── mapa de URLs (hreflang) ───────────────────────── */
const URLS = {
  home: { en: '/', es: '/es/' },
  tint: { en: '/window-tint/', es: '/es/polarizado-de-vidrios/' },
  ceramic: { en: '/ceramic-coating/', es: '/es/recubrimiento-ceramico/' },
  privacy: { en: '/privacy/', es: '/es/privacidad/' },
}

/* ───────────────────────── textos propios de las landings ───────────────────────── */
const PAGES = {
  tint: {
    en: {
      title: 'Window Tint in Sarasota, Bradenton & Tampa | Ceramic & Carbon',
      desc: 'Ceramic and carbon window tint for cars on Florida’s Gulf Coast. We explain the legal limit for every window before we start. Free quote by photo.',
      eyebrow: 'WINDOW TINT · CERAMIC & CARBON FILM',
      h1: 'Ceramic and carbon window tint for cars on Florida’s Gulf Coast',
      answer: 'In Florida, tint on a passenger car must let at least 28% of light through the front side windows and 15% through the rear windows. We install ceramic and carbon film on cars in Sarasota, Bradenton, Tampa and nearby, explain the legal limit for every window before we start, and quote from photos.',
      service: 'Window Tint',
      serviceType: 'Automotive window tinting',
      crumb: 'Window Tint',
      related: 'ceramic',
      relatedText: 'Protect the paint too: ceramic coating',
    },
    es: {
      title: 'Polarizado de Vidrios en Sarasota y Tampa | Cerámico y Carbono',
      desc: 'Polarizado cerámico y de carbono para autos en Florida. Te explicamos el límite legal de cada ventana antes de empezar. Cotización gratis por foto.',
      eyebrow: 'POLARIZADO · PELÍCULA CERÁMICA Y DE CARBONO',
      h1: 'Polarizado cerámico y de carbono para autos en la costa del Golfo de Florida',
      answer: 'En Florida, el polarizado de un auto de pasajeros debe dejar pasar al menos 28% de la luz por los vidrios laterales delanteros y 15% por los traseros. Instalamos película cerámica y de carbono en autos de Sarasota, Bradenton, Tampa y alrededores, te explicamos el límite legal de cada ventana antes de empezar y cotizamos por foto.',
      service: 'Polarizado de vidrios',
      serviceType: 'Polarizado de vidrios automotriz',
      crumb: 'Polarizado de vidrios',
      related: 'ceramic',
      relatedText: 'Protege también la pintura: recubrimiento cerámico',
    },
  },
  ceramic: {
    en: {
      title: 'Ceramic Coating for Cars in Sarasota, Bradenton & Tampa',
      desc: 'Ceramic coating for your car’s paint: careful wash, polish and a hard, slick layer that helps resist sun, salt and water spots. Free quote by photo.',
      eyebrow: 'CERAMIC COATING · PAINT PROTECTION',
      h1: 'Ceramic coating for your car’s paint',
      answer: 'A ceramic coating is a hard, slick layer bonded to your car’s clear coat. It helps paint resist sun, salt, bird droppings and water spots and makes washing easier, but it does not make paint scratch-proof. We wash, polish and coat cars in Sarasota, Bradenton and Tampa, and confirm timing and aftercare in your quote.',
      service: 'Ceramic Coating',
      serviceType: 'Automotive ceramic coating',
      crumb: 'Ceramic Coating',
      related: 'tint',
      relatedText: 'Cooler cabin too: ceramic and carbon window tint',
    },
    es: {
      title: 'Recubrimiento Cerámico para Autos en Sarasota y Tampa',
      desc: 'Recubrimiento cerámico para tu auto: lavado, pulido y una capa dura y lisa que ayuda a resistir sol, sal y manchas de agua. Cotización gratis por foto.',
      eyebrow: 'RECUBRIMIENTO CERÁMICO · PROTECCIÓN DE PINTURA',
      h1: 'Recubrimiento cerámico para la pintura de tu auto',
      answer: 'El recubrimiento cerámico es una capa dura y lisa adherida al barniz de tu auto. Ayuda a que la pintura resista sol, sal, excremento de aves y manchas de agua, y facilita el lavado, pero no la vuelve a prueba de rayones. Lavamos, pulimos y recubrimos autos en Sarasota, Bradenton y Tampa, y confirmamos tiempos y cuidados en tu cotización.',
      service: 'Recubrimiento cerámico',
      serviceType: 'Recubrimiento cerámico automotriz',
      crumb: 'Recubrimiento cerámico',
      related: 'tint',
      relatedText: 'Cabina más fresca también: polarizado cerámico y de carbono',
    },
  },
}

// Preguntas que solo viven en las landings (el resto sale de protection.js).
const EXTRA_FAQ = {
  en: {
    faqLastQ: 'How long does a ceramic coating last?',
    faqLastA: 'It depends on the product, how the paint is prepared and how the car is washed and kept. We don’t promise a number. We confirm the product, its written warranty terms and aftercare in your quote.',
    faqBothQ: 'Can I get window tint and ceramic coating together?',
    faqBothA: 'Yes. Ask for both in one quote. We confirm how the work is scheduled and any combined timing when we reply.',
  },
  es: {
    faqLastQ: '¿Cuánto dura un recubrimiento cerámico?',
    faqLastA: 'Depende del producto, de cómo se prepare la pintura y de cómo se lave y se cuide el auto. No prometemos una cifra. Confirmamos el producto, los términos escritos de su garantía y los cuidados en tu cotización.',
    faqBothQ: '¿Puedo contratar polarizado y cerámico juntos?',
    faqBothA: 'Sí. Pídelos en una sola cotización. Al responderte confirmamos cómo se programa el trabajo y los tiempos combinados.',
  },
}

const FAQ_KEYS = {
  tint: ['faqTintLegal', 'faqFilm', 'faqTimeTint', 'faqWarranty', 'faqBoth', 'faqQuote'],
  ceramic: ['faqScratch', 'faqLast', 'faqTimeCer', 'faqWarranty', 'faqBoth', 'faqQuoteCer'],
}

const UI = {
  en: {
    skip: 'Skip to content', home: 'Home', services: 'Services', gallery: 'Gallery', contact: 'Contact',
    altContact: 'Prefer WhatsApp or a call?', call: 'Call', whatsapp: 'WhatsApp', quoteCta: 'Request a quote', free: 'Free quote by photo',
    pill1: 'Florida limits explained per window', pill2: 'Ceramic and carbon films', pill3: 'Quote by photo',
    areasTitle: 'Where we work', areasBody: 'We serve', areasNote: 'Tell us your ZIP code and we confirm we cover your area.',
    faqTitle: 'Questions, answered', diagrams: 'What you get', how: 'How the quote works',
    formTitle: 'Get your quote', formLead: 'Tell us about your car. We reply with a price range and next steps.',
    name: 'Full name', phone: 'Phone / WhatsApp', email: 'Email (optional)', vehicleType: 'Vehicle type', vehicleTypeChoose: 'Choose…',
    car: 'Car / Sedan', suv: 'SUV / Truck', exotic: 'Exotic / Luxury', rv: 'RV / Camper',
    service: 'Service', tint: 'Window Tint', ceramic: 'Ceramic Coating', tint_ceramic: 'Window Tint + Ceramic Coating',
    zip: 'ZIP code (optional)', send: 'Send request', required: 'This field is required.', phoneBad: 'Enter a phone number with at least 10 digits.', emailBad: 'Enter a valid email or leave it blank.',
    more: 'More', privacy: 'Privacy policy', lang: 'Español', langLabel: 'Ver en español',
    footerLine: 'Mobile car and boat detailing, window tint and ceramic coating for cars.', rights: 'All rights reserved.',
    breadcrumbHome: 'Home', waPhotos: 'Hi! Sending photos for my quote. Ref:',
  },
  es: {
    skip: 'Saltar al contenido', home: 'Inicio', services: 'Servicios', gallery: 'Galería', contact: 'Contacto',
    altContact: '¿Prefieres WhatsApp o una llamada?', call: 'Llamar', whatsapp: 'WhatsApp', quoteCta: 'Pedir cotización', free: 'Cotización gratis por foto',
    pill1: 'Límites de Florida explicados por ventana', pill2: 'Películas cerámica y de carbono', pill3: 'Cotización por foto',
    areasTitle: 'Dónde trabajamos', areasBody: 'Atendemos', areasNote: 'Dinos tu código postal y confirmamos que cubrimos tu zona.',
    faqTitle: 'Preguntas y respuestas', diagrams: 'Lo que obtienes', how: 'Cómo es la cotización',
    formTitle: 'Pide tu cotización', formLead: 'Cuéntanos de tu auto. Te respondemos con un rango de precio y los siguientes pasos.',
    name: 'Nombre completo', phone: 'Teléfono / WhatsApp', email: 'Email (opcional)', vehicleType: 'Tipo de vehículo', vehicleTypeChoose: 'Elige…',
    car: 'Auto / Sedán', suv: 'SUV / Camioneta', exotic: 'Exótico / Lujo', rv: 'RV / Camper',
    service: 'Servicio', tint: 'Polarizado', ceramic: 'Recubrimiento cerámico', tint_ceramic: 'Polarizado + Cerámico',
    zip: 'Código postal (opcional)', send: 'Enviar solicitud', required: 'Este campo es obligatorio.', phoneBad: 'Escribe un teléfono con al menos 10 dígitos.', emailBad: 'Escribe un email válido o déjalo vacío.',
    more: 'Más', privacy: 'Política de privacidad', lang: 'English', langLabel: 'View in English',
    footerLine: 'Detallado móvil de autos y botes, polarizado y recubrimiento cerámico para autos.', rights: 'Todos los derechos reservados.',
    breadcrumbHome: 'Inicio', waPhotos: '¡Hola! Envío fotos para mi cotización. Ref:',
  },
}

/* ───────────────────────── piezas HTML ───────────────────────── */
const absolute = (p) => `${SITE}${p}`

function alternates(key) {
  const u = URLS[key]
  return [
    ['en', absolute(u.en)],
    ['es', absolute(u.es)],
    ['x-default', absolute(u.en)],
  ]
}

function head({ lang, title, desc, key, ogImg, jsonld, entry }) {
  const self = absolute(URLS[key][lang])
  const alts = alternates(key).map(([l, h]) => `  <link rel="alternate" hreflang="${l}" href="${h}" />`).join('\n')
  // Facebook no lista es_US; para español usa es_LA.
  const locale = lang === 'es' ? 'es_LA' : 'en_US'
  const otherLocale = lang === 'es' ? 'en_US' : 'es_LA'
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="theme-color" content="#0a0e1a" />
  <link rel="canonical" href="${self}" />
${alts}
  <link rel="icon" type="image/png" sizes="48x48" href="/img/brand/favicon-48.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/img/brand/favicon-192.png" />
  <link rel="apple-touch-icon" href="/img/brand/apple-touch-icon-180.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(BRAND)}" />
  <meta property="og:url" content="${self}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${ogImg}" />
  <meta property="og:locale" content="${locale}" />
  <meta property="og:locale:alternate" content="${otherLocale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="${FONTS}" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="${FONTS}" /></noscript>
${jsonld ? `  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n` : ''}${entry.head || ''}</head>`
}

function businessNode(lang) {
  return {
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    '@id': `${SITE}/#business`,
    name: BRAND,
    url: SITE + '/',
    telephone: PHONE_TEL,
    image: LOGO,
    logo: LOGO,
    description: lang === 'es'
      ? 'Detallado móvil de autos y botes, más polarizado y recubrimiento cerámico para autos, en la costa del Golfo de Florida.'
      : 'Mobile car and boat detailing, plus window tint and ceramic coating for cars, on Florida’s Gulf Coast.',
    address: { '@type': 'PostalAddress', addressRegion: 'FL', addressCountry: 'US' },
    areaServed: [
      ...CITIES.map((n) => ({ '@type': 'City', name: `${n}, FL` })),
      ...COUNTIES.map((n) => ({ '@type': 'AdministrativeArea', name: `${n}, FL` })),
    ],
    knowsLanguage: ['en', 'es'],
  }
}

function header(lang, key) {
  const u = UI[lang]
  const alt = lang === 'es' ? 'en' : 'es'
  const home = URLS.home[lang]
  return `<a class="skip" href="#main">${u.skip}</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="${home}" aria-label="${esc(BRAND)} — ${u.home}">
      <img src="/img/brand/logo-120.webp" width="40" height="40" alt="" />
      <span>${esc(BRAND)}</span>
    </a>
    <nav class="nav" aria-label="Primary">
      <a href="${home}#services">${u.services}</a>
      <a href="${home}#gallery">${u.gallery}</a>
      <a href="${home}#contact">${u.contact}</a>
      <a class="lang" href="${URLS[key][alt]}" hreflang="${alt}" lang="${alt}" title="${esc(u.langLabel)}">${u.lang}</a>
    </nav>
    <div class="bar-cta">
      <a class="btn btn-ghost" href="tel:${PHONE_TEL}" data-track="call_click" data-location="landing_header">${u.call}</a>
    </div>
  </div>
</header>`
}

function footer(lang, key) {
  const u = UI[lang]
  const alt = lang === 'es' ? 'en' : 'es'
  return `<footer class="site-footer">
  <div class="wrap foot">
    <div>
      <strong>${esc(BRAND)}</strong>
      <p>${u.footerLine}</p>
      <p><a href="tel:${PHONE_TEL}" data-track="call_click" data-location="landing_footer">${PHONE_DISPLAY}</a> · <a href="${waLink('')}" rel="noopener" target="_blank" data-track="whatsapp_click" data-location="landing_footer">WhatsApp</a></p>
      <p class="muted">${AREAS.join(' · ')}, FL</p>
    </div>
    <ul>
      <li><a href="${URLS.home[lang]}">${u.home}</a></li>
      <li><a href="${URLS.tint[lang]}">${PAGES.tint[lang].crumb}</a></li>
      <li><a href="${URLS.ceramic[lang]}">${PAGES.ceramic[lang].crumb}</a></li>
      <li><a href="${URLS.privacy[lang]}">${u.privacy}</a></li>${HAS_TRACKING ? `\n      <li><button type="button" class="linklike" data-open-consent>${esc(protection[lang].footerPrivacyChoices)}</button></li>` : ''}
      <li><a href="${URLS[key][alt]}" hreflang="${alt}" lang="${alt}">${u.lang}</a></li>
    </ul>
  </div>
  <p class="wrap legal">© ${new Date().getFullYear()} ${esc(BRAND)}. ${u.rights}</p>
</footer>`
}

function figure(name, lang, label) {
  const markup = svg(name, lang)
  return markup ? `<figure class="diagram" role="group" aria-label="${esc(label)}">${markup}</figure>` : ''
}

function leadForm(lang, id) {
  const u = UI[lang]
  const p = protection[lang]
  const def = id === 'tint' ? 'tint' : 'ceramic'
  const opts = ['tint', 'ceramic', 'tint_ceramic'].map((s) => `<option value="${s}"${s === def ? ' selected' : ''}>${u[s]}</option>`).join('')
  const veh = ['car', 'suv', 'exotic'].map((v) => `<option value="${v}">${u[v]}</option>`).join('')
  const film = [['carbon', p.filmCarbon], ['ceramic', p.filmCeramic], ['unsure', p.filmUnsure]]
    .map(([v, l], i) => `<label class="chip"><input type="radio" name="film" value="${v}"${i === 2 ? ' checked' : ''} /><span>${esc(l)}</span></label>`).join('')
  // Oculto hasta que cargue el JS: sin JS el navegador lo enviaría por GET y pondría los datos en la URL.
  return `<form id="quote-form" class="lead-form" novalidate hidden>
  <h2 id="quote-h">${u.formTitle}</h2>
  <p class="lead">${u.formLead}</p>
  <div class="grid2">
    <label>${u.name}<input name="name" autocomplete="name" required maxlength="80" /></label>
    <label>${u.phone}<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="30" /></label>
    <label>${u.email}<input name="email" type="email" autocomplete="email" maxlength="120" /></label>
    <label>${u.vehicleType}<select name="vehicle_type" required><option value="">${u.vehicleTypeChoose}</option>${veh}</select></label>
    <label>${esc(p.formVehicleText)}<input name="vehicle" maxlength="80" /></label>
    <label>${u.service}<select name="service" required>${opts}</select></label>
    <label>${u.zip}<input name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="10" /></label>
  </div>
  <fieldset class="film" data-needs="tint"><legend>${esc(p.formFilm)}</legend><div class="chips">${film}</div></fieldset>
  <div class="hp" aria-hidden="true"><label>Company URL<input name="company_url" tabindex="-1" autocomplete="off" /></label></div>
  <label class="consent"><input type="checkbox" name="consent_sms" /><span>${esc(p.formConsent.replace('{brand}', BRAND))} <a href="${URLS.privacy[lang]}">${esc(p.formPrivacyLink)}</a> · <a href="${URLS.privacy[lang]}#messaging">${esc(p.formMessagingLink)}</a></span></label>
  <button type="submit" class="btn btn-primary">${u.send}</button>
  <p class="note">${esc(p.formAvailability)}</p>
  <div id="form-status" role="status" aria-live="polite"></div>
</form>`
}

function l10nBlob(lang, id) {
  const p = protection[lang]
  const u = UI[lang]
  return `<script type="application/json" id="l10n">${JSON.stringify({
    lang, page: id,
    required: u.required, phoneBad: u.phoneBad, emailBad: u.emailBad, send: u.send,
    sending: p.formSending, errTitle: p.formErrTitle, errBody: p.formErrBody, errFields: p.formErrFields, retry: p.formRetry,
    okTitle: p.successTitle, okBody: p.successBody, okWa: p.successWhatsapp, okRef: p.successRef, waPhotos: u.waPhotos,
    consentTitle: p.consentTitle, consentBody: p.consentBody, consentAccept: p.consentAccept, consentReject: p.consentReject,
    consentMore: p.consentMore, privacy: URLS.privacy[lang],
    callLabel: u.call,
  })}</script>`
}

/* ───────────────────────── landing de servicio ───────────────────────── */
function landing(id, lang) {
  const p = protection[lang]
  const u = UI[lang]
  const page = PAGES[id][lang]
  const extra = { ...p, ...Object.fromEntries(Object.entries(EXTRA_FAQ[lang])) }
  const faq = FAQ_KEYS[id].map((k) => ({ q: extra[`${k}Q`], a: extra[`${k}A`] }))
  const url = absolute(URLS[id][lang])
  const wa = waLink(id === 'tint' ? p.waTint : p.waCeramic)
  const benefit = id === 'tint' ? 'protB' : 'cerB' // cada landing muestra solo los beneficios de su servicio
  const pills = id === 'tint' ? [u.pill1, u.pill2, u.pill3] : [u.free, p.cerS1, p.cerS2]

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      businessNode(lang),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.service,
        serviceType: page.serviceType,
        description: page.answer,
        provider: { '@id': `${SITE}/#business` },
        areaServed: businessNode(lang).areaServed,
        inLanguage: lang,
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: u.breadcrumbHome, item: absolute(URLS.home[lang]) },
          { '@type': 'ListItem', position: 2, name: page.crumb, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }

  const tintBody = `
    <section class="band" aria-labelledby="cmp-h">
      <div class="wrap two">
        <div>
          <h2 id="cmp-h">${esc(p.cmpTitle)}</h2>
          <p class="lead">${esc(p.tintLead)}</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th scope="col"><span class="sr-only">${esc(p.cmpTitle)}</span></th><th scope="col">${esc(p.cmpHead1)}</th><th scope="col">${esc(p.cmpHead2)}</th></tr></thead>
            <tbody>${[1, 2, 3, 4].map((n) => `<tr><th scope="row">${esc(p[`cmpR${n}`])}</th><td>${esc(p[`cmpR${n}a`])}</td><td>${esc(p[`cmpR${n}b`])}</td></tr>`).join('')}</tbody>
          </table></div>
          <p class="muted small">${esc(p.cmpNote)}</p>
        </div>
        <div class="visuals">
          ${figure('film-layers', lang, p.cmpTitle)}
          ${figure('heat-path', lang, p.protB1T)}
        </div>
      </div>
    </section>
    <section class="band alt" id="legal" aria-labelledby="legal-h">
      <div class="wrap two">
        <div>
          <h2 id="legal-h">${esc(p.legalTitle)}</h2>
          <p class="lead">${esc(p.legalLead)}</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th scope="col">${esc(p.legalTblWin)}</th><th scope="col">${esc(p.legalTblCar)}</th><th scope="col">${esc(p.legalTblMpv)}</th></tr></thead>
            <tbody>
              <tr><th scope="row">${esc(p.legalRowFront)}</th><td>28%</td><td>28%</td></tr>
              <tr><th scope="row">${esc(p.legalRowRear)}</th><td>15%</td><td>6%</td></tr>
              <tr><th scope="row">${esc(p.legalRowBack)}</th><td>15%</td><td>6%</td></tr>
              <tr><th scope="row">${esc(p.legalRowWind)}</th><td colspan="2">${esc(p.legalWindCell)}</td></tr>
            </tbody>
          </table></div>
          <p class="muted small">${esc(p.legalTblNote)}</p>
          <p>${esc(p.legalP1)}</p>
          <p>${esc(p.legalP2)}</p>
          <p>${esc(p.legalP3)}</p>
          <p class="muted">${esc(p.legalP4)}</p>
          <p class="muted small">${esc(p.legalChecked)} ${esc(p.legalSource)}: <a class="textlink" href="https://www.flsenate.gov/Laws/Statutes/2025/316.2953" rel="noopener">F.S. 316.2953</a> · <a class="textlink" href="https://www.flsenate.gov/Laws/Statutes/2025/316.2954" rel="noopener">316.2954</a></p>
        </div>
        <div class="visuals">
          ${figure('fl-windows-map', lang, p.legalTitle)}
          ${figure('vlt-scale', lang, 'VLT')}
        </div>
      </div>
    </section>`

  const ceramicBody = `
    <section class="band" aria-labelledby="cer-h">
      <div class="wrap two">
        <div>
          <h2 id="cer-h">${esc(p.ceramicH)}</h2>
          <p class="lead">${esc(p.ceramicLead)}</p>
          <p>${esc(p.ceramicHonest)}</p>
          <ul class="checks">${['cerS1', 'cerS2', 'cerS3'].map((k) => `<li>${esc(p[k])}</li>`).join('')}</ul>
        </div>
        <div class="visuals">
          ${figure('ceramic-layers', lang, p.ceramicH)}
        </div>
      </div>
    </section>`

  return `${head({
    lang, title: page.title, desc: page.desc, key: id, ogImg: ogImage(id, lang), jsonld,
    entry: { head: '' },
  })}
<body>
${header(lang, id)}
<main id="main">
  <nav class="crumbs wrap" aria-label="Breadcrumb"><a href="${URLS.home[lang]}">${u.breadcrumbHome}</a><span aria-hidden="true"> › </span><span aria-current="page">${page.crumb}</span></nav>
  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">${page.eyebrow}</p>
      <h1>${esc(page.h1)}</h1>
      <p class="answer">${esc(page.answer)}</p>
      <div class="cta-row">
        <a class="btn btn-green" href="${wa}" target="_blank" rel="noopener" data-track="whatsapp_click" data-location="landing_hero" data-service="${id}"><span aria-hidden="true">💬</span> ${esc(p.ctaWhatsapp)}</a>
        <a class="btn btn-primary" href="#quote" data-track="cta_click" data-location="landing_hero" data-service="${id}">${u.quoteCta}</a>
        <a class="btn btn-ghost" href="tel:${PHONE_TEL}" data-track="call_click" data-location="landing_hero">${u.call} ${PHONE_DISPLAY}</a>
      </div>
      <ul class="pills">${pills.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
  </section>
  <section class="band" aria-labelledby="ben-h">
    <div class="wrap">
      <h2 id="ben-h">${u.diagrams}</h2>
      <div class="cards">${[1, 2, 3].map((n) => `<article class="card"><h3>${esc(p[`${benefit}${n}T`])}</h3><p>${esc(p[`${benefit}${n}D`])}</p></article>`).join('')}</div>
    </div>
  </section>
  ${id === 'tint' ? tintBody : ceramicBody}
  <section class="band" aria-labelledby="how-h">
    <div class="wrap two">
      <div>
        <h2 id="how-h">${u.how}</h2>
        <h3>${esc(p.ctaPhotosTitle)}</h3>
        <p>${esc(id === 'tint' ? p.ctaPhotosTint : p.ctaPhotosCeramic)}</p>
        <p class="muted">${esc(p.ctaWhere)}</p>
        <h3>${u.areasTitle}</h3>
        <p>${u.areasBody} ${AREAS.join(', ')}. ${u.areasNote}</p>
        <p><a class="textlink" href="${URLS[page.related][lang]}">${page.relatedText} →</a></p>
      </div>
      <div id="quote">
        ${leadForm(lang, id)}
        <p class="alt-contact">${u.altContact} <a href="${wa}" target="_blank" rel="noopener" data-track="whatsapp_click" data-location="landing_form" data-service="${id}">WhatsApp</a> · <a href="tel:${PHONE_TEL}" data-track="call_click" data-location="landing_form">${PHONE_DISPLAY}</a></p>
      </div>
    </div>
  </section>
  <section class="band alt" aria-labelledby="faq-h">
    <div class="wrap narrow">
      <h2 id="faq-h">${u.faqTitle}</h2>
      ${faq.map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n      ')}
    </div>
  </section>
</main>
<div class="sticky-cta">
  <a class="btn btn-green" href="${wa}" target="_blank" rel="noopener" data-track="whatsapp_click" data-location="landing_sticky" data-service="${id}"><span aria-hidden="true">💬</span> WhatsApp</a>
  <a class="btn btn-primary" href="#quote" data-track="cta_click" data-location="landing_sticky" data-service="${id}">${u.quoteCta}</a>
</div>
${footer(lang, id)}
${l10nBlob(lang, id)}
<script type="module" src="/src/landing.js"></script>
</body>
</html>
`
}

/* ───────────────────────── privacidad ───────────────────────── */
const PRIVACY = {
  en: {
    title: 'Privacy Policy',
    desc: `How ${BRAND} collects, uses and protects the information you send us when you request a quote.`,
    updated: 'Last updated',
    sections: [
      ['Who we are', [`${BRAND} provides mobile car and boat detailing, window tint and ceramic coating on Florida’s Gulf Coast. You can reach us at ${PHONE_DISPLAY} (call, text or WhatsApp).`]],
      ['What we collect', [
        'When you request a quote we collect the details you type: name, phone number, email (optional), vehicle type and description, service and film choice, ZIP code, preferred date and time, and your message.',
        'We also record how you reached us (the page, the referring site, and campaign tags such as utm_source or ad click IDs), the language you used, your choice about text and WhatsApp messages with the date, time and the exact wording you saw, and the IP address and browser information that came with the request.',
        'If you message us on WhatsApp or call, we keep what you send us to answer you.',
      ]],
      ['Why we use it', [
        'To prepare and send your quote, schedule work, contact you about it, and keep a record of the request. To protect the form from abuse. To understand which pages and ads bring quote requests, but only if you accept analytics and advertising cookies.',
      ]],
      ['Text and WhatsApp messages', [
        `If you check the consent box on our form, you agree that ${BRAND} may text you, message you on WhatsApp and call you at the number you gave about your quote and appointment, including with an automated system. Consent is not required to get a quote or to buy anything. Message frequency varies. Message and data rates may apply. Reply STOP to opt out (you can also tell us in any reasonable way, for example “don’t text me anymore”) and HELP for help. We stop messaging you as soon as we receive your request. Messages sent over WhatsApp are also governed by WhatsApp’s own terms and privacy policy. We do not share your phone number with third parties for their marketing.`,
      ], 'messaging'],
      ['Cookies, analytics and advertising', [
        'Before you choose, this site loads fonts from Google Fonts (Google receives your IP address and browser details to serve them) and keeps in your browser’s storage a small record of how you arrived (campaign tags and the page you entered on, kept up to 90 days) and of your choice (stg_consent_v1). Nothing else is loaded.',
        'Analytics and advertising tools (Google Tag Manager, Google Analytics, Google Ads and the Meta Pixel) load only after you press Accept in our privacy banner. If you press Reject they are not loaded. If you accept, Google and Meta receive data about your visit under their own policies. You can change your choice with the “Privacy choices” link in the footer, and manage ad personalization in Google Ads Settings (adssettings.google.com), Meta Ad Preferences (facebook.com/adpreferences) or the Digital Advertising Alliance (optout.aboutads.info).',
      ]],
      ['Who sees your information', [
        'Our own team and the service providers that help us run the site and contact you: web hosting, email delivery, and WhatsApp (Meta) when you message us there. If you accept analytics, the providers listed above also receive usage data. We do not sell your personal information for money.',
      ]],
      ['How long we keep it', [
        'Quote requests that do not turn into a job: 24 months. Customer records: as long as accounting and tax rules require (up to 7 years). Records of your messaging consent: 5 years from the date you gave it. We keep copies in our lead file, in the notification emails we receive, and in backups. Ask us and we will delete your request sooner, except what the law requires us to keep.',
      ]],
      ['Your choices', [
        `Contact us at ${PHONE_DISPLAY} or by WhatsApp to see, correct or delete the information we hold about you, or to stop messages. We answer within 30 days. To protect your information we verify the request comes from the phone number or email you gave us. Reply STOP to any text to stop texts.`,
      ]],
      ['Children', ['This site is for adults. We do not knowingly collect information from children.']],
      ['Changes', ['If we change this policy we update the date at the top of this page.']],
    ],
  },
  es: {
    title: 'Política de privacidad',
    desc: `Cómo ${BRAND} recopila, usa y protege la información que nos envías al pedir una cotización.`,
    updated: 'Última actualización',
    sections: [
      ['Quiénes somos', [`${BRAND} ofrece detallado móvil de autos y botes, polarizado y recubrimiento cerámico en la costa del Golfo de Florida. Puedes contactarnos al ${PHONE_DISPLAY} (llamada, texto o WhatsApp).`]],
      ['Qué recopilamos', [
        'Cuando pides una cotización recopilamos lo que escribes: nombre, teléfono, email (opcional), tipo y descripción del vehículo, servicio y película elegidos, código postal, fecha y hora preferidas, y tu mensaje.',
        'También registramos cómo llegaste a nosotros (la página, el sitio de referencia y etiquetas de campaña como utm_source o identificadores de clics de anuncios), el idioma que usaste, tu decisión sobre mensajes de texto y WhatsApp con la fecha, la hora y el texto exacto que viste, y la dirección IP y los datos del navegador que acompañaron la solicitud.',
        'Si nos escribes por WhatsApp o nos llamas, guardamos lo que nos envías para responderte.',
      ]],
      ['Para qué lo usamos', [
        'Para preparar y enviarte la cotización, programar el trabajo, contactarte al respecto y conservar un registro de la solicitud. Para proteger el formulario contra abusos. Para entender qué páginas y anuncios generan solicitudes, pero solo si aceptas las cookies de analítica y publicidad.',
      ]],
      ['Mensajes de texto y WhatsApp', [
        `Si marcas la casilla de consentimiento del formulario, aceptas que ${BRAND} te envíe mensajes de texto, te escriba por WhatsApp y te llame al número que diste sobre tu cotización y tu cita, incluso con un sistema automatizado. El consentimiento no es necesario para recibir una cotización ni para comprar nada. La frecuencia de los mensajes varía. Pueden aplicar tarifas de mensajes y datos. Responde STOP para dejar de recibirlos (también puedes decírnoslo de cualquier forma razonable, por ejemplo “ya no me escriban”) y HELP para ayuda. Dejamos de escribirte en cuanto recibimos tu solicitud. Los mensajes por WhatsApp se rigen además por los términos y la política de privacidad de WhatsApp. No compartimos tu teléfono con terceros para su publicidad.`,
      ], 'messaging'],
      ['Cookies, analítica y publicidad', [
        'Antes de que elijas, este sitio carga fuentes de Google Fonts (Google recibe tu dirección IP y datos del navegador para entregarlas) y guarda en el almacenamiento de tu navegador un pequeño registro de cómo llegaste (etiquetas de campaña y la página de entrada, hasta 90 días) y de tu decisión (stg_consent_v1). No se carga nada más.',
        'Las herramientas de analítica y publicidad (Google Tag Manager, Google Analytics, Google Ads y el píxel de Meta) se cargan solo después de que presionas Aceptar en nuestro aviso de privacidad. Si presionas Rechazar no se cargan. Si aceptas, Google y Meta reciben datos de tu visita bajo sus propias políticas. Puedes cambiar tu decisión con el enlace “Opciones de privacidad” del pie de página, y administrar la personalización de anuncios en la Configuración de anuncios de Google (adssettings.google.com), las Preferencias de anuncios de Meta (facebook.com/adpreferences) o la Digital Advertising Alliance (optout.aboutads.info).',
      ]],
      ['Quién ve tu información', [
        'Nuestro equipo y los proveedores que nos ayudan a operar el sitio y contactarte: alojamiento web, envío de correo y WhatsApp (Meta) cuando nos escribes allí. Si aceptas la analítica, los proveedores indicados arriba también reciben datos de uso. No vendemos tu información personal por dinero.',
      ]],
      ['Cuánto tiempo la guardamos', [
        'Solicitudes de cotización que no se convierten en trabajo: 24 meses. Registros de clientes: el tiempo que exijan las reglas contables y fiscales (hasta 7 años). Registros de tu consentimiento de mensajes: 5 años desde la fecha en que lo diste. Conservamos copias en nuestro archivo de solicitudes, en los correos de aviso que recibimos y en respaldos. Si lo pides, borramos tu solicitud antes, salvo lo que la ley nos obligue a conservar.',
      ]],
      ['Tus opciones', [
        `Contáctanos al ${PHONE_DISPLAY} o por WhatsApp para ver, corregir o borrar la información que tenemos de ti, o para dejar de recibir mensajes. Respondemos en un máximo de 30 días. Para proteger tu información verificamos que la solicitud venga del teléfono o el correo que nos diste. Responde STOP a cualquier texto para detener los textos.`,
      ]],
      ['Menores', ['Este sitio es para adultos. No recopilamos información de menores a sabiendas.']],
      ['Cambios', ['Si cambiamos esta política, actualizamos la fecha al inicio de esta página.']],
    ],
  },
}

function privacy(lang) {
  const t = PRIVACY[lang]
  const u = UI[lang]
  return `${head({ lang, title: `${t.title} | ${BRAND}`, desc: t.desc, key: 'privacy', ogImg: ogImage('privacy', lang), jsonld: null, entry: { head: '' } })}
<body>
<!-- BORRADOR: revisión de un abogado de Florida pendiente antes de campañas pagadas (TCPA/FTSA, cookies). -->
${header(lang, 'privacy')}
<main id="main" class="wrap narrow doc">
  <h1>${t.title}</h1>
  <p class="muted">${t.updated}: ${PRIVACY_UPDATED}</p>
  ${t.sections.map(([h, ps, id]) => `<h2${id ? ` id="${id}"` : ''}>${esc(h)}</h2>\n  ${ps.map((x) => `<p>${esc(x)}</p>`).join('\n  ')}`).join('\n  ')}
</main>
${footer(lang, 'privacy')}
${l10nBlob(lang, 'privacy')}
<script type="module" src="/src/landing.js"></script>
</body>
</html>
`
}

// Textos de la home (src/i18n.jsx) para el cascarón estático: una sola fuente, sin duplicarlos a mano.
const i18nSource = fs.readFileSync(path.join(ROOT, 'src/i18n.jsx'), 'utf8')
const i18nText = (lang, key) => {
  const block = lang === 'es' ? i18nSource.split(/\n  es: \{/)[1] : i18nSource.split(/\n  es: \{/)[0]
  const m = block.match(new RegExp(`\\b${key}: '((?:[^'\\\\\\n]|\\\\.)*)'`))
  if (!m) throw new Error(`falta la clave ${key} (${lang}) en src/i18n.jsx`)
  return m[1].replace(/\\'/g, "'")
}

/* ───────────────────────── cascarón de la SPA (home) ───────────────────────── */
const HOME = {
  en: {
    title: `Mobile Car & Boat Detailing in Sarasota & Tampa | ${BRAND}`,
    desc: 'Mobile car and boat detailing, plus ceramic and carbon window tint and ceramic coating for cars. Sarasota, Bradenton, Tampa, Venice. Free quote by photo.',
    h1: 'Premium car wash & boat detailing service that comes to you',
    lead: `${BRAND} brings mobile car and boat detailing to your home, office or marina in ${AREAS.join(', ')}. We also install ceramic and carbon window tint and apply ceramic coating on cars.`,
    list: [['Auto detailing', '/#services'], ['Boat detailing', '/#services'], ['Window tint', URLS.tint.en], ['Ceramic coating', URLS.ceramic.en]],
    contact: 'Call', quote: 'or request a free quote by photo on WhatsApp.',
  },
  es: {
    title: `Detallado Móvil de Autos y Botes en Sarasota y Tampa | ${BRAND}`,
    desc: 'Detallado móvil de autos y botes, más polarizado cerámico y de carbono y recubrimiento cerámico para autos en Sarasota, Bradenton y Tampa. Cotiza por foto.',
    h1: 'Servicio premium de lavado de autos y detallado de botes que va a ti',
    lead: `${BRAND} lleva el detallado móvil de autos y botes a tu casa, oficina o marina en ${AREAS.join(', ')}. También instalamos polarizado cerámico y de carbono y aplicamos recubrimiento cerámico en autos.`,
    list: [['Detallado de autos', '/es/#services'], ['Detallado de botes', '/es/#services'], ['Polarizado de vidrios', URLS.tint.es], ['Recubrimiento cerámico', URLS.ceramic.es]],
    contact: 'Llama al', quote: 'o pide una cotización gratis por foto en WhatsApp.',
  },
}

function spaShell(lang) {
  const h = HOME[lang]
  const u = UI[lang]
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...businessNode(lang),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: lang === 'es' ? 'Servicios' : 'Services',
          itemListElement: [
            lang === 'es' ? 'Detallado de autos' : 'Auto detailing',
            lang === 'es' ? 'Detallado de botes' : 'Boat detailing',
            PAGES.tint[lang].service,
            PAGES.ceramic[lang].service,
          ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
        },
      },
      { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE + '/', name: BRAND, inLanguage: ['en', 'es'], publisher: { '@id': `${SITE}/#business` } },
    ],
  }
  const preload = `  <link rel="preload" as="image" href="/img/brand/logo-120.webp" imagesrcset="/img/brand/logo-120.webp 1x, /img/brand/logo-240.webp 2x" fetchpriority="high" />\n`
    + `  <link rel="preload" as="image" href="/img/hero/finish-640.webp" imagesrcset="/img/hero/finish-640.webp 640w, /img/hero/finish-1080.webp 1080w" imagesizes="(max-width: 900px) 100vw, 560px" fetchpriority="high" />\n`
  const inlineLang = lang === 'es' ? `  <script>window.__LANG__='es'</script>\n` : ''
  const html = `${head({
    lang, title: h.title, desc: h.desc, key: 'home', ogImg: ogImage('home', lang), jsonld,
    entry: { head: preload + inlineLang },
  })}
<body>
  <div id="root">
    <main id="seo-shell" style="max-width:760px;margin:0 auto;padding:110px 24px 48px">
      <h1>${esc(h.h1)}</h1>
      <p>${esc(h.lead)}</p>
      <ul>${h.list.map(([n, href]) => `<li><a href="${href}">${esc(n)}</a></li>`).join('')}</ul>
      <h2>${esc(u.services)}</h2>
      ${['svc1', 'svc2', 'svc4'].map((k) => `<h3>${esc(i18nText(lang, `${k}Title`))}</h3>\n      <p>${esc(i18nText(lang, `${k}Desc`))}</p>`).join('\n      ')}
      <h2>${esc(u.areasTitle)}</h2>
      <p>${AREAS.join(', ')}.</p>
      <p>${h.contact} <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> ${h.quote}</p>
      <p><a href="${URLS.privacy[lang]}">${u.privacy}</a> · <a href="${URLS.home[lang === 'es' ? 'en' : 'es']}" hreflang="${lang === 'es' ? 'en' : 'es'}">${u.lang}</a></p>
    </main>
  </div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
`
  return html
}

/* ───────────────────────── archivos de búsqueda ───────────────────────── */
function sitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const entry = (key) => {
    const links = alternates(key).map(([l, h]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${h}" />`).join('\n')
    return ['en', 'es'].map((lang) => `  <url>\n    <loc>${absolute(URLS[key][lang])}</loc>\n    <lastmod>${today}</lastmod>\n${links}\n  </url>`).join('\n')
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${['home', 'tint', 'ceramic'].map(entry).join('\n')}
</urlset>
`
}

const ROBOTS = `# Todo el contenido público es rastreable, incluidos los rastreadores de asistentes de IA.
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`

const LLMS = `# ${BRAND}

> Mobile car and boat detailing on Florida's Gulf Coast, plus ceramic and carbon window tint and ceramic coating for cars. Serving ${AREAS.join(', ')}. Quotes by photo on WhatsApp or by form.

## Services
- [Window tint (ceramic and carbon film, cars)](${absolute(URLS.tint.en)}): what each film is, Florida tint limits by window, how quotes work.
- [Ceramic coating (cars)](${absolute(URLS.ceramic.en)}): process, what it does and does not do, how quotes work.
- [Home](${absolute(URLS.home.en)}): auto detailing, boat detailing, gallery, contact form.

## Español
- [Polarizado de vidrios](${absolute(URLS.tint.es)})
- [Recubrimiento cerámico](${absolute(URLS.ceramic.es)})

## Contact
- Phone and WhatsApp: ${PHONE_DISPLAY}
- Privacy: ${absolute(URLS.privacy.en)}
`

/* ───────────────────────── salida ───────────────────────── */
const wordCount = (s) => s.trim().split(/\s+/).length
for (const id of ['tint', 'ceramic']) {
  for (const lang of ['en', 'es']) {
    const n = wordCount(PAGES[id][lang].answer)
    if (n < 40 || n > 65) console.warn(`  ! bloque de respuesta ${id}/${lang}: ${n} palabras (objetivo 40–60)`)
  }
}

write('index.html', spaShell('en'))
write('es/index.html', spaShell('es'))
for (const id of ['tint', 'ceramic']) {
  for (const lang of ['en', 'es']) write(`${URLS[id][lang].slice(1)}index.html`, landing(id, lang))
}
for (const lang of ['en', 'es']) write(`${URLS.privacy[lang].slice(1)}index.html`, privacy(lang))
write('public/sitemap.xml', sitemap())
write('public/robots.txt', ROBOTS)
write('public/llms.txt', LLMS)

console.log(`Páginas generadas para ${SITE} (marca: ${BRAND})`)
