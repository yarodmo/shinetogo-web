/**
 * Genera el HTML estático que necesitan buscadores y asistentes de IA:
 *   index.html, es/index.html            → cascarón de la SPA (metadatos, JSON-LD, texto visible sin JS)
 *   window-tint/, es/polarizado-de-vidrios/        → landing de Window Tint (servicio 1)
 *   ceramic-coating/, es/recubrimiento-ceramico/   → landing de Ceramic Coating (servicio 2)
 *   privacy/, es/privacidad/             → política de privacidad
 *   public/sitemap.xml, robots.txt, llms.txt
 *
 * Window Tint y Ceramic Coating son dos servicios distintos: cada uno con su contenido (src/content/tint.js y
 * ceramic.js), su plantilla, su formulario y su esquema. Lo único compartido es el negocio (src/content/business.js).
 * Uso: node scripts/build-landings.mjs   (npm run build lo ejecuta antes de vite build)
 * Variables: VITE_SITE_URL, VITE_BRAND_NAME, VITE_GTM_ID / VITE_GA4_ID / VITE_META_PIXEL_ID (solo para el enlace de privacidad).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { tint } from '../src/content/tint.js'
import { ceramic } from '../src/content/ceramic.js'
import { services } from '../src/content/services.js'
import {
  BRAND_FULL, BRAND_SHORT, PHONE_DISPLAY, PHONE_TEL, WA_NUMBER as WA, INSTAGRAM_URL, PLACES, COUNTIES, AREAS, AREA_COPY,
} from '../src/content/business.js'

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
const BRAND = process.env.VITE_BRAND_NAME || BRAND_FULL
const PRIVACY_UPDATED = '2026-10-05'
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
const titleOf = (template) => template.replace('{brand}', BRAND_SHORT)
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
const PAGES = { tint, ceramic }
const other = { tint: 'ceramic', ceramic: 'tint' }

/* ───────────────────────── textos de la interfaz de las páginas estáticas ───────────────────────── */
const UI = {
  en: {
    skip: 'Skip to content', home: 'Home', services: 'Services',
    call: 'Call', orCall: 'Or call',
    quoteCardLead: 'Quotes are requested in the form on our main page, with {service} already selected. You can also send photos on WhatsApp.',
    areasTitle: 'Where we work', faqTitle: 'Questions', otherServices: 'Other services',
    privacy: 'Privacy policy', lang: 'Español', langLabel: 'Ver en español', breadcrumbHome: 'Home',
  },
  es: {
    skip: 'Saltar al contenido', home: 'Inicio', services: 'Servicios',
    call: 'Llamar', orCall: 'O llama al',
    quoteCardLead: 'La cotización se pide en el formulario de nuestra página principal, con {service} ya seleccionado. También puedes mandar fotos por WhatsApp.',
    areasTitle: 'Dónde trabajamos', faqTitle: 'Preguntas', otherServices: 'Otros servicios',
    privacy: 'Política de privacidad', lang: 'English', langLabel: 'View in English', breadcrumbHome: 'Inicio',
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

// Zonas reales del dueño. «Alrededores» no se puede expresar en datos estructurados sin un límite: va solo en el texto.
function areaServedNodes() {
  return [
    ...PLACES.map((p) => ({
      '@type': p.type,
      name: p.name,
      ...(p.county && { containedInPlace: { '@type': 'AdministrativeArea', name: p.county } }),
      ...(p.city && { containedInPlace: { '@type': 'City', name: p.city } }),
    })),
    ...COUNTIES.map((name) => ({ '@type': 'AdministrativeArea', name })),
  ]
}

function businessNode(lang) {
  return {
    '@type': 'AutomotiveBusiness',
    '@id': `${SITE}/#business`,
    name: BRAND,
    url: SITE + '/',
    telephone: PHONE_TEL,
    image: LOGO,
    logo: LOGO,
    description: lang === 'es'
      ? 'Lavado y detallado móvil de carros y botes en el suroeste de Florida. Polarizado de vidrios y recubrimiento cerámico como servicios aparte, solo para carros.'
      : 'Mobile car and boat detailing in Southwest Florida. Window tint and ceramic coating as separate services, for cars only.',
    // Negocio de servicio a domicilio: sin calle ni código postal. Región y país sí son ciertos.
    address: { '@type': 'PostalAddress', addressRegion: 'FL', addressCountry: 'US' },
    areaServed: areaServedNodes(),
    sameAs: [INSTAGRAM_URL],
    knowsLanguage: ['en', 'es'],
  }
}

// La cotización vive en la home: /?service=tint#contact (y /es/?service=ceramic#contact). Cualquier otra página cae en #contact.
const quoteHref = (lang, key) => (key === 'tint' || key === 'ceramic' ? `${URLS.home[lang]}?service=${key}#contact` : `${URLS.home[lang]}#contact`)

// Cabecera y pie: MISMO contenido, textos y estilo que la home (src/App.jsx y src/index.css). Los textos salen de src/i18n.jsx.
const IG_HANDLE = `@${new URL(INSTAGRAM_URL).pathname.replace(/\//g, '')}`
// Mismos iconos de línea que la home (src/components/Icon.jsx), en vez de emojis.
const svgIcon = (d, size = 18) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`
const ICON_WA = svgIcon('<path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6Z"/><path d="M9 8.6c0 3.6 2.8 6.4 6.4 6.4l1.3-1.6-2.2-1.1-1 1c-1.2-.5-2.1-1.4-2.6-2.6l1-1-1.1-2.2Z"/>')
const ICON_PHONE = svgIcon('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>')
const LOGO_SRCSET = '/img/brand/logo-120.webp 1x, /img/brand/logo-240.webp 2x'

function header(lang, key) {
  const u = UI[lang]
  const alt = lang === 'es' ? 'en' : 'es'
  const home = URLS.home[lang]
  const t = (k) => i18nText(lang, k)
  const quote = quoteHref(lang, key)
  return `<a class="skip" href="#main">${u.skip}</a>
<header class="site-header" id="site-header">
  <div class="bar">
    <a class="brand" href="${home}" aria-label="${esc(BRAND)}: ${u.home}">
      <img src="/img/brand/logo-120.webp" srcset="${LOGO_SRCSET}" width="60" height="60" alt="" />
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="${home}#services">${esc(t('navServices'))}</a>
      <a href="${URLS.tint[lang]}"${key === 'tint' ? ' aria-current="page"' : ''}>${esc(t('navTint'))}</a>
      <a href="${URLS.ceramic[lang]}"${key === 'ceramic' ? ' aria-current="page"' : ''}>${esc(t('navCeramic'))}</a>
      <a href="${home}#pricing">${esc(t('navPricing'))}</a>
      <a href="${home}#gallery">${esc(t('navGallery'))}</a>
      <a href="${home}#contact">${esc(t('navContact'))}</a>
    </nav>
    <div class="nav-end">
      <a class="lang-btn" href="${URLS[key][alt]}" hreflang="${alt}" lang="${alt}" title="${esc(u.langLabel)}">${alt.toUpperCase()}</a>
      <a class="btn btn-primary" href="${quote}" data-track="cta_click" data-location="landing_header">${esc(t('navBook'))}</a>
    </div>
  </div>
</header>`
}

function footer(lang, key) {
  const u = UI[lang]
  const alt = lang === 'es' ? 'en' : 'es'
  const home = URLS.home[lang]
  const t = (k) => i18nText(lang, k)
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <img class="footer-logo" src="/img/brand/logo-120.webp" srcset="${LOGO_SRCSET}" width="44" height="44" loading="lazy" alt="${esc(BRAND)}" />
      <p>${esc(t('footerAbout'))}</p>
      <div class="ig">
        <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer"><img src="/img/brand/ig-qr-192.webp" width="64" height="64" loading="lazy" alt="Instagram QR" /></a>
        <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer"><strong>${esc(IG_HANDLE)}</strong><span>${esc(t('footerIg'))}</span></a>
      </div>
    </div>
    <div class="col">
      <h3>${esc(t('footerServices'))}</h3>
      <a href="${home}#services">${esc(t('svc1Title'))}</a>
      <a href="${home}#services">${esc(t('svc2Title'))}</a>
      <a href="${URLS.tint[lang]}">${esc(t('navTint'))}</a>
      <a href="${URLS.ceramic[lang]}">${esc(t('navCeramic'))}</a>
    </div>
    <div class="col">
      <h3>${esc(t('footerAreas'))}</h3>
      ${AREAS.map((a) => `<span>${esc(a)}</span>`).join('\n      ')}
    </div>
    <div class="col">
      <h3>${esc(t('footerContact'))}</h3>
      <a href="tel:${PHONE_TEL}" data-track="call_click" data-location="landing_footer">${ICON_PHONE} ${PHONE_DISPLAY}</a>
      <a class="wa" href="${waLink('')}" rel="noopener noreferrer" target="_blank" data-track="whatsapp_click" data-location="landing_footer">${ICON_WA} WhatsApp</a>
      <a href="${URLS.privacy[lang]}">${esc(t('footerPrivacy'))}</a>${HAS_TRACKING ? `\n      <button type="button" class="linklike" data-open-consent>${esc(t('footerPrivacyChoices'))}</button>` : ''}
    </div>
  </div>
  <p class="wrap legal">© ${new Date().getFullYear()} ${esc(BRAND)}. Designed by Bliss Systems LLC.</p>
</footer>`
}

function figure(name, lang, label) {
  const markup = svg(name, lang)
  return markup ? `<figure class="diagram" role="group" aria-label="${esc(label)}">${markup}</figure>` : ''
}

// Toda cotización se hace en el formulario de la home. Estas páginas son informativas: la tarjeta lleva ahí con el servicio ya elegido.
function quoteCard(lang, id) {
  const u = UI[lang]
  const c = PAGES[id][lang]
  const href = quoteHref(lang, id)
  return `<div id="quote" class="quote-card">
  <h2>${esc(c.form.title)}</h2>
  <p class="lead">${esc(u.quoteCardLead.replace('{service}', c.service))}</p>
  <div class="cta-row">
    <a class="btn btn-primary" href="${href}" data-track="cta_click" data-location="landing_quote" data-service="${id}">${esc(i18nText(lang, 'heroCta1'))}</a>
    <a class="btn btn-green" href="${waLink(c.wa)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-location="landing_quote" data-service="${id}">${ICON_WA} ${esc(c.cta.whatsapp)}</a>
  </div>
  <p class="alt-contact">${u.orCall} <a href="tel:${PHONE_TEL}" data-track="call_click" data-location="landing_quote" data-service="${id}">${PHONE_DISPLAY}</a></p>
</div>`
}

function l10nBlob(lang, id) {
  const sv = services[lang]
  return `<script type="application/json" id="l10n">${JSON.stringify({
    lang, page: id,
    consentTitle: sv.consentTitle, consentBody: sv.consentBody, consentAccept: sv.consentAccept, consentReject: sv.consentReject,
    consentMore: sv.consentMore, privacy: URLS.privacy[lang],
  })}</script>`
}

const sourceLink = (src) => (src ? ` <a class="textlink" href="${src.url}" rel="noopener">${esc(src.label)}</a>` : '')

/* ───────────────────────── plantillas: una por servicio ───────────────────────── */

function tintBody(lang) {
  const c = tint[lang]
  const rowHtml = (row) => (row.cells.length === 1
    ? `<tr><th scope="row">${esc(row.label)}</th><td colspan="2">${esc(row.cells[0])}</td></tr>`
    : `<tr><th scope="row">${esc(row.label)}</th>${row.cells.map((x) => `<td>${esc(x)}</td>`).join('')}</tr>`)
  return `
  <section class="band" aria-labelledby="win-h">
    <div class="wrap">
      <h2 id="win-h">${esc(c.windows.title)}</h2>
      <div class="tiles">${c.windows.items.map((w) => `<article class="tile"><h3>${esc(w.h)}</h3><p>${esc(w.p)}</p></article>`).join('')}</div>
    </div>
  </section>
  <section class="band alt" aria-labelledby="why-h">
    <div class="wrap two">
      <div>
        <h2 id="why-h">${esc(c.why.title)}</h2>
        <ul class="plain">${c.why.items.map((w) => `<li><strong>${esc(w.h)}</strong> ${esc(w.p)}</li>`).join('')}</ul>
      </div>
      <div class="visuals">${figure('heat-path', lang, c.why.title)}</div>
    </div>
  </section>
  <section class="band" aria-labelledby="film-h">
    <div class="wrap two">
      <div>
        <h2 id="film-h">${esc(c.film.title)}</h2>
        <p class="lead">${esc(c.film.lead)}</p>
        <div class="tbl-wrap"><table class="tbl">
          <caption class="sr-only">${esc(c.film.title)}</caption>
          <thead><tr>${c.film.head.map((h) => `<th scope="col">${h ? esc(h) : `<span class="sr-only">${esc(c.film.title)}</span>`}</th>`).join('')}</tr></thead>
          <tbody>${c.film.rows.map(([label, a, b]) => `<tr><th scope="row">${esc(label)}</th><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</tbody>
        </table></div>
        <p class="muted small">${esc(c.film.note)}</p>
      </div>
      <div class="visuals">${figure('film-layers', lang, c.film.title)}</div>
    </div>
  </section>
  <section class="band alt" id="limits" aria-labelledby="lim-h">
    <div class="wrap two">
      <div>
        <h2 id="lim-h">${esc(c.limits.title)}</h2>
        <p class="lead">${esc(c.limits.lead)}</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr>${c.limits.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${c.limits.rows.map(rowHtml).join('')}</tbody>
        </table></div>
        <p class="muted small">${esc(c.limits.note)}</p>
        ${c.limits.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
        <p class="muted small">${esc(c.limits.foot)} ${esc(c.limits.sourceLabel)}: <a class="textlink" href="https://www.flsenate.gov/Laws/Statutes/2026/316.2953" rel="noopener">F.S. 316.2953</a> · <a class="textlink" href="https://www.flsenate.gov/Laws/Statutes/2026/316.2954" rel="noopener">316.2954</a></p>
      </div>
      <div class="visuals">${figure('fl-windows-map', lang, c.limits.title)}</div>
    </div>
  </section>`
}

function ceramicBody(lang) {
  const c = ceramic[lang]
  const today = new Date().toISOString().slice(0, 10)
  // La nota de la orden de agua tiene fecha de vencimiento: pasada esa fecha, el generador la omite.
  const localItems = c.local.items.filter((it) => !it.until || today <= it.until)
  return `
  <section class="band" id="surfaces" aria-labelledby="ch-h">
    <div class="wrap two">
      <div>
        <h2 id="ch-h">${esc(c.choose.title)}</h2>
        <p class="lead">${esc(c.choose.lead)}</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr>${c.choose.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${c.choose.rows.map((r) => `<tr><th scope="row">${esc(r.name)}</th><td>${esc(r.does)}</td><td>${esc(r.send)}</td></tr>`).join('')}</tbody>
        </table></div>
      </div>
      <div class="visuals">${figure('ceramic-layers', lang, c.choose.title)}</div>
    </div>
  </section>
  <section class="band alt" aria-label="${esc(c.choose.title)}">
    <div class="wrap">
      <div class="modules">${c.modules.map((m) => `<article class="module" id="${m.id}"><h3>${esc(m.h)}</h3><p>${esc(m.p)}${sourceLink(m.source)}</p></article>`).join('')}</div>
    </div>
  </section>
  <section class="band" aria-labelledby="prep-h">
    <div class="wrap two">
      <div>
        <h2 id="prep-h">${esc(c.prep.title)}</h2>
        <p>${esc(c.prep.p)}</p>
      </div>
      <div>
        <h2>${esc(c.doesnt.title)}</h2>
        <p>${esc(c.doesnt.p)}</p>
      </div>
    </div>
  </section>
  ${localItems.length ? `<section class="band alt" aria-labelledby="loc-h">
    <div class="wrap narrow">
      <h2 id="loc-h">${esc(c.local.title)}</h2>
      <ul class="plain">${localItems.map((it) => `<li><strong>${esc(it.h)}</strong> ${esc(it.p)}${sourceLink(it.source)}</li>`).join('')}</ul>
    </div>
  </section>` : ''}`
}

// Mismo ritmo que la home: hero claro, y después las secciones alternan oscuro / claro.
function rhythm(html) {
  let i = 0
  return html.replace(/<section class="band(?: alt)?"/g, () => `<section class="band ${i++ % 2 === 0 ? 'tone-dark' : 'tone-light'}"`)
}

function landing(id, lang) {
  const c = PAGES[id][lang]
  const u = UI[lang]
  const url = absolute(URLS[id][lang])
  const wa = waLink(c.wa)
  const offerNames = id === 'tint' ? c.windows.items.map((w) => w.h) : c.choose.rows.map((r) => r.name)
  const o = PAGES[other[id]][lang]

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      businessNode(lang),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: c.service,
        serviceType: c.serviceType,
        description: c.serviceDescription,
        provider: { '@id': `${SITE}/#business` },
        areaServed: areaServedNodes(),
        inLanguage: lang,
        url,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.service,
          itemListElement: offerNames.map((name) => ({ '@type': 'Service', name })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: u.breadcrumbHome, item: absolute(URLS.home[lang]) },
          { '@type': 'ListItem', position: 2, name: c.crumb, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }

  const mainHtml = rhythm(`<main id="main">
  <section class="hero tone-light">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${URLS.home[lang]}">${u.breadcrumbHome}</a><span aria-hidden="true"> › </span><span aria-current="page">${esc(c.crumb)}</span></nav>
      <p class="eyebrow">${esc(c.eyebrow)}</p>
      <h1>${esc(c.h1)}</h1>
      <p class="answer">${esc(c.answer)}</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="${quoteHref(lang, id)}" data-track="cta_click" data-location="landing_hero" data-service="${id}">${esc(i18nText(lang, 'heroCta1'))}</a>
        <a class="btn btn-green" href="${wa}" target="_blank" rel="noopener" data-track="whatsapp_click" data-location="landing_hero" data-service="${id}">${ICON_WA} ${esc(c.cta.whatsapp)}</a>
      </div>
      <p class="cta-text">${u.orCall} <a class="textlink" href="tel:${PHONE_TEL}" data-track="call_click" data-location="landing_hero" data-service="${id}">${PHONE_DISPLAY}</a></p>
      <ul class="pills">${c.pills.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
  </section>
  ${id === 'tint' ? tintBody(lang) : ceramicBody(lang)}
  <section class="band" aria-labelledby="how-h">
    <div class="wrap two">
      <div>
        <h2 id="how-h">${esc(c.quote.title)}</h2>
        <ol class="steps">${c.quote.steps.map((st) => `<li><strong>${esc(st.h)}</strong><span>${esc(st.p)}</span></li>`).join('')}</ol>
        <h3>${u.areasTitle}</h3>
        <p>${esc(AREA_COPY[lang])}</p>
      </div>
      <div>
        ${quoteCard(lang, id)}
      </div>
    </div>
  </section>
  <section class="band" aria-labelledby="faq-h">
    <div class="wrap narrow">
      <h2 id="faq-h">${u.faqTitle}</h2>
      ${c.faq.map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n      ')}
      <p class="other">${u.otherServices}: <a class="textlink" href="${URLS[other[id]][lang]}">${esc(o.crumb)}</a></p>
    </div>
  </section>
</main>`)

  return `${head({
    lang, title: titleOf(c.title), desc: c.meta, key: id, ogImg: ogImage(id, lang), jsonld,
    entry: { head: '' },
  })}
<body>
${header(lang, id)}
${mainHtml}
<div class="sticky-cta">
  <a class="btn btn-ghost" href="tel:${PHONE_TEL}" data-track="call_click" data-location="landing_sticky" data-service="${id}">${ICON_PHONE} ${u.call}</a>
  <a class="btn btn-green" href="${wa}" target="_blank" rel="noopener" data-track="whatsapp_click" data-location="landing_sticky" data-service="${id}">${ICON_WA} WhatsApp</a>
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
      ['Who we are', [`${BRAND} provides mobile car and boat detailing in Southwest Florida, and window tint and ceramic coating as separate services for cars. You can reach us at ${PHONE_DISPLAY} (call, text or WhatsApp).`]],
      ['What we collect', [
        'When you request a quote we collect the details you type: name, phone number, email (optional), vehicle type and description, the service you ask for and its details (which windows and film for tint, which surfaces for ceramic coating), ZIP code, preferred date and time, and your message.',
        'We also record how you reached us (the page, the referring site, and campaign tags such as utm_source or ad click IDs), the language you used, your choice about text and WhatsApp messages with the date, time and the exact wording you saw, and the IP address and browser information that came with the request.',
        'If you message us on WhatsApp or call, we keep what you send us to answer you. That includes the photos of your vehicle you send for a quote and, if you show us one, a medical-exemption certificate for the vehicle.',
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
      ['Quiénes somos', [`${BRAND} ofrece lavado y detallado móvil de carros y botes en el suroeste de Florida, y polarizado de vidrios y recubrimiento cerámico como servicios aparte para carros. Puedes contactarnos al ${PHONE_DISPLAY} (llamada, texto o WhatsApp).`]],
      ['Qué recopilamos', [
        'Cuando pides una cotización recopilamos lo que escribes: nombre, teléfono, email (opcional), tipo y descripción del vehículo, el servicio que pides y sus detalles (qué vidrios y qué película en el polarizado, qué superficies en el recubrimiento cerámico), código postal, fecha y hora preferidas, y tu mensaje.',
        'También registramos cómo llegaste a nosotros (la página, el sitio de referencia y etiquetas de campaña como utm_source o identificadores de clics de anuncios), el idioma que usaste, tu decisión sobre mensajes de texto y WhatsApp con la fecha, la hora y el texto exacto que viste, y la dirección IP y los datos del navegador que acompañaron la solicitud.',
        'Si nos escribes por WhatsApp o nos llamas, guardamos lo que nos envías para responderte. Eso incluye las fotos de tu vehículo que mandas para la cotización y, si nos lo muestras, un certificado de exención médica del vehículo.',
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
  return `${head({ lang, title: `${t.title} | ${BRAND_SHORT}`, desc: t.desc, key: 'privacy', ogImg: ogImage('privacy', lang), jsonld: null, entry: { head: '' } })}
<body>
<!-- BORRADOR: revisión de un abogado de Florida pendiente antes de campañas pagadas (TCPA/FTSA, cookies). -->
${header(lang, 'privacy')}
<main id="main" class="tone-light doc">
  <div class="wrap narrow">
  <h1>${t.title}</h1>
  <p class="muted">${t.updated}: ${PRIVACY_UPDATED}</p>
  ${t.sections.map(([h, ps, id]) => `<h2${id ? ` id="${id}"` : ''}>${esc(h)}</h2>\n  ${ps.map((x) => `<p>${esc(x)}</p>`).join('\n  ')}`).join('\n  ')}
  </div>
</main>
${footer(lang, 'privacy')}
${l10nBlob(lang, 'privacy')}
<script type="module" src="/src/landing.js"></script>
</body>
</html>
`
}

/* ───────────────────────── cascarón de la SPA (home) ───────────────────────── */
const HOME = {
  en: {
    title: `Detailing, Window Tint & Ceramic Coating in Sarasota | ${BRAND_SHORT}`,
    desc: 'Mobile car and boat detailing in Sarasota, Bradenton, Venice and St. Pete. Window tint and ceramic coating for cars. Send photos on WhatsApp for a quote.',
    h1: 'Car and boat detailing, window tint and ceramic coating',
    lead: `${BRAND} washes and details cars and boats at your home, office or marina. Window tint and ceramic coating are separate services, for cars only.`,
    list: [['Window tint', URLS.tint.en], ['Ceramic coating', URLS.ceramic.en]],
    contact: 'Call', quote: 'or send photos on WhatsApp for a quote.',
  },
  es: {
    title: `Detallado, polarizado y cerámico en Sarasota | ${BRAND_SHORT}`,
    desc: 'Lavado y detallado móvil de carros y botes en Sarasota, Bradenton, Venice y St. Pete. Polarizado y cerámico para carros. Cotiza con fotos por WhatsApp.',
    h1: 'Detallado de carros y botes, polarizado y recubrimiento cerámico',
    lead: `${BRAND} lava y detalla carros y botes en tu casa, tu oficina o tu marina. El polarizado y el recubrimiento cerámico son servicios aparte, solo para carros.`,
    list: [['Polarizado de vidrios', URLS.tint.es], ['Recubrimiento cerámico', URLS.ceramic.es]],
    contact: 'Llama al', quote: 'o manda fotos por WhatsApp para cotizar.',
  },
}

// Textos de la home (src/i18n.jsx y src/content/services.js) para el cascarón estático: una sola fuente.
const i18nSource = fs.readFileSync(path.join(ROOT, 'src/i18n.jsx'), 'utf8')
const i18nText = (lang, key) => {
  if (services[lang][key]) return services[lang][key]
  const block = lang === 'es' ? i18nSource.split(/\n  es: \{/)[1] : i18nSource.split(/\n  es: \{/)[0]
  const m = block.match(new RegExp(`\\b${key}: '((?:[^'\\\\\\n]|\\\\.)*)'`))
  if (!m) throw new Error(`falta la clave ${key} (${lang}) en src/i18n.jsx`)
  return m[1].replace(/\\'/g, "'")
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
          name: u.services,
          itemListElement: [
            { '@type': 'Service', name: i18nText(lang, 'svc1Title') },
            { '@type': 'Service', name: i18nText(lang, 'svc2Title') },
            { '@type': 'Service', name: tint[lang].service, url: absolute(URLS.tint[lang]) },
            { '@type': 'Service', name: ceramic[lang].service, url: absolute(URLS.ceramic[lang]) },
          ],
        },
      },
      { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE + '/', name: BRAND, inLanguage: lang, publisher: { '@id': `${SITE}/#business` } },
    ],
  }
  const preload = `  <link rel="preload" as="image" href="/img/brand/logo-120.webp" imagesrcset="/img/brand/logo-120.webp 1x, /img/brand/logo-240.webp 2x" fetchpriority="high" />\n`
    + `  <link rel="preload" as="image" href="/img/hero/finish-640.webp" imagesrcset="/img/hero/finish-640.webp 640w, /img/hero/finish-1080.webp 1080w" imagesizes="(max-width: 900px) 100vw, 560px" fetchpriority="high" />\n`
  const inlineLang = lang === 'es' ? `  <script>window.__LANG__='es'</script>\n` : ''
  return `${head({
    lang, title: h.title, desc: h.desc, key: 'home', ogImg: ogImage('home', lang), jsonld,
    entry: { head: preload + inlineLang },
  })}
<body>
  <div id="root">
    <main id="seo-shell" style="max-width:760px;margin:0 auto;padding:110px 24px 48px">
      <h1>${esc(h.h1)}</h1>
      <p>${esc(h.lead)}</p>
      <h2>${esc(u.services)}</h2>
      ${['svc1', 'svc2'].map((k) => `<h3>${esc(i18nText(lang, `${k}Title`))}</h3>\n      <p>${esc(i18nText(lang, `${k}Desc`))}</p>`).join('\n      ')}
      <h3><a href="${URLS.tint[lang]}">${esc(i18nText(lang, 'svc4Title'))}</a></h3>
      <p>${esc(i18nText(lang, 'svc4Desc'))}</p>
      <h3><a href="${URLS.ceramic[lang]}">${esc(i18nText(lang, 'svc5Title'))}</a></h3>
      <p>${esc(i18nText(lang, 'svc5Desc'))}</p>
      <h2>${esc(u.areasTitle)}</h2>
      <p>${esc(AREA_COPY[lang])}</p>
      <p>${h.contact} <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> ${h.quote}</p>
      <p><a href="${URLS.privacy[lang]}">${u.privacy}</a> · <a href="${URLS.home[lang === 'es' ? 'en' : 'es']}" hreflang="${lang === 'es' ? 'en' : 'es'}">${u.lang}</a></p>
    </main>
  </div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
`
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

> Mobile car and boat detailing in Southwest Florida: Sarasota, Bradenton, Venice, St. Petersburg, Brandon, Lido Key, Siesta Key, Longboat Key and nearby. Window tint and ceramic coating are separate services, for cars only. Quotes by photo on WhatsApp or by form.

## Services
- [Window tint](${absolute(URLS.tint.en)}): carbon or ceramic film for a car’s side windows, back window, windshield strip and sunroof; Florida tint limits window by window.
- [Ceramic coating](${absolute(URLS.ceramic.en)}): paint, glass, wheels and calipers, exterior trim and interior; what a coating does and does not do.
- [Home](${absolute(URLS.home.en)}): car wash and boat detailing, gallery, contact form.

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
