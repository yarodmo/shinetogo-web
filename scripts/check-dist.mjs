/**
 * Verifica dist/ después de `npm run build`. Sale con código 1 si algo del SEO técnico se rompió.
 *   - un solo <h1>, <title> y meta description con largo razonable
 *   - canonical apunta a la propia URL; hreflang en/es/x-default y recíproco entre idiomas
 *   - JSON-LD válido; sin placeholders %VITE_ ni localhost
 *   - todo href/src interno existe en dist; toda <img> tiene alt
 *   - peso total de dist dentro del presupuesto
 *   - frases que cumplimiento vetó (ver CLAIMS)
 * Uso: node scripts/check-dist.mjs [carpeta=dist]
 */
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve(process.argv[2] || 'dist')
const SITE = (process.env.VITE_SITE_URL || 'https://shinetogomobiledetailing.com').replace(/\/+$/, '')
const BUDGET_MB = 14 // 9 MB hoy; el video se baja solo al reproducirlo
const problems = []
const fail = (page, msg) => problems.push(`${page}: ${msg}`)

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name)
  return e.isDirectory() ? walk(p) : [p]
})
const files = walk(DIST)
const pages = files.filter((f) => f.endsWith('.html')).map((f) => {
  const rel = '/' + path.relative(DIST, f).replace(/index\.html$/, '')
  return { file: f, url: rel, html: fs.readFileSync(f, 'utf8') }
})

const exists = (ref) => {
  const clean = decodeURIComponent(ref.split('#')[0].split('?')[0])
  if (!clean || clean === '/') return true
  const target = path.join(DIST, clean)
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true
  return fs.existsSync(path.join(target, 'index.html'))
}
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1]
const byUrl = new Map(pages.map((p) => [SITE + p.url, p]))

for (const pg of pages) {
  const { html, url } = pg
  const h1 = (html.match(/<h1[\s>]/g) || []).length
  if (h1 !== 1) fail(url, `${h1} etiquetas <h1> (debe haber 1)`)

  const decode = (x) => x.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '')
  if (title.length < 20 || title.length > 65) fail(url, `<title> de ${title.length} caracteres`)
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '')
  if (desc.length < 70 || desc.length > 160) fail(url, `meta description de ${desc.length} caracteres`)

  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1]
  if (canonical !== SITE + url) fail(url, `canonical ${canonical} ≠ ${SITE + url}`)

  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]])
  const langs = new Set(alts.map(([l]) => l))
  for (const l of ['en', 'es', 'x-default']) if (!langs.has(l)) fail(url, `falta hreflang="${l}"`)
  for (const [l, href] of alts) {
    const other = byUrl.get(href)
    if (!other) { fail(url, `hreflang ${l} apunta a una página que no existe: ${href}`); continue }
    const back = [...other.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => m[2])
    if (!back.includes(SITE + url)) fail(url, `hreflang no recíproco con ${href}`)
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]) } catch (e) { fail(url, `JSON-LD inválido: ${e.message}`) }
  }
  if (/%VITE_/.test(html)) fail(url, 'quedó un placeholder %VITE_')
  // Un solo formulario en todo el sitio: el de la home (React). Las páginas estáticas mandan allí con el servicio elegido.
  if (/<form[\s>]/.test(html)) fail(url, 'tiene un <form>: toda cotización se hace en el formulario de la home')
  // Texto que no debe llegar al público: zonas que no se atienden, plantillas sin resolver, pendientes del dueño.
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, '')
  if (/\bTampa\b/.test(visible)) fail(url, 'aparece «Tampa» (no es zona de servicio)')
  if (/\{brand\}|\[CONFIRMAR|\{\{|undefined|\[object Object\]/.test(visible)) fail(url, 'quedó un placeholder o un valor sin resolver')
  if (/\bProtection\b|tint_ceramic/.test(visible)) fail(url, 'menciona una «Protection» o el servicio combinado que ya no existe')
  if (/\bDetailShine\b/.test(html)) fail(url, 'aparece el nombre «DetailShine»')
  // Páginas en español no deben enlazar a rutas en inglés (ni al revés a las de /es/ salvo el cambio de idioma).
  if (url.startsWith('/es/')) {
    for (const a of html.match(/<a [^>]*>/g) || []) {
      if (/href="\/(window-tint|ceramic-coating|privacy)\//.test(a) && !/hreflang=/.test(a)) fail(url, `enlace a una ruta en inglés dentro de la versión en español: ${a.slice(0, 70)}`)
    }
  }
  // El FAQPage del JSON-LD debe coincidir con las preguntas visibles.
  const faqVisible = (html.match(/<details class="faq">/g) || []).length
  const faqLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { try { return JSON.parse(m[1])['@graph'] || [] } catch { return [] } }).find((n) => n['@type'] === 'FAQPage')
  if ((url === '/' || url === '/es/') && !faqLd) fail(url, 'la home no trae FAQPage en el HTML servido (los rastreadores sin JavaScript no verían las preguntas)')
  if (faqLd && faqLd.mainEntity.length !== faqVisible) fail(url, `FAQPage tiene ${faqLd.mainEntity.length} preguntas y la página muestra ${faqVisible}`)
  // Cada landing habla solo de su servicio: la de cerámica no menciona polarizado fuera del enlace cruzado.
  if (/^\/(es\/)?(ceramic-coating|recubrimiento-ceramico)\//.test(url)) {
    const body = html.replace(/<form[\s\S]*?<\/form>/, '').replace(/<details class="faq"><summary>[^<]*(together|juntos)[^<]*<\/summary>[\s\S]*?<\/details>/gi, '').replace(/<a [^>]*href="\/(es\/)?(window-tint|polarizado-de-vidrios)\/"[^>]*>[\s\S]*?<\/a>/g, '').replace(/<script[\s\S]*?<\/script>/g, '')
    if (/\btint(ed|ing)?\b|polarizad/i.test(body.replace(/<(head|nav|footer)[\s\S]*?<\/\1>/g, ''))) fail(url, 'la landing de cerámica menciona el polarizado')
  }
  if (/localhost/.test(html)) fail(url, 'aparece localhost')

  for (const m of html.matchAll(/\s(?:href|src|imagesrcset|srcset)="([^"]+)"/g)) {
    for (const piece of m[1].split(',')) {
      const ref = piece.trim().split(/\s+/)[0]
      if (!ref.startsWith('/') || ref.startsWith('//')) continue
      if (!exists(ref)) fail(url, `referencia rota: ${ref}`)
    }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (attr(m[0], 'alt') === undefined) fail(url, `<img> sin alt: ${m[0].slice(0, 80)}`)
  }
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (!new RegExp(`id="${m[1]}"`).test(html)) fail(url, `ancla interna sin destino: #${m[1]}`)
  }
}

for (const f of ['sitemap.xml', 'robots.txt', 'llms.txt', '.htaccess']) {
  if (!fs.existsSync(path.join(DIST, f))) fail('dist', `falta ${f}`)
}
// .htaccess redirige al host canónico: debe ser el mismo que VITE_SITE_URL (si el dominio cambia y esto no, todo redirige al viejo).
const htaccess = fs.existsSync(path.join(DIST, '.htaccess')) ? fs.readFileSync(path.join(DIST, '.htaccess'), 'utf8') : ''
if (htaccess && !htaccess.includes(`${SITE}%{REQUEST_URI}`)) fail('.htaccess', `no redirige a ${SITE}`)
const sitemap = fs.existsSync(path.join(DIST, 'sitemap.xml')) ? fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8') : ''
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) if (!byUrl.has(m[1])) fail('sitemap.xml', `URL sin página: ${m[1]}`)

// Frases que cumplimiento vetó (revisión del 5-oct-2026): se buscan en las páginas generadas y en el texto de la home
// (src/i18n.jsx y src/content/*.js, sin comentarios), porque la home se pinta en el navegador y no está en el HTML.
const CLAIMS = [
  [/\bevery window\b|\ball the glass\b|todos los (vidrios|cristales)/i, 'dice «todos los vidrios»: el parabrisas completo no se puede (F.S. 316.2952)'],
  [/no surprises|sin sorpresas/i, 'promete «sin sorpresas» junto a un rango de precio (publicidad de cebo)'],
  [/most popular|most requested|más popular|más solicitado/i, 'insignia de popularidad sin dato que la respalde'],
  [/self-sufficient|autosuficientes?|showroom/i, 'absoluto o promesa de resultado sin respaldo'],
  [/\bexempt\b|\bexentos?\b/i, 'dice «exento»: no está confirmado cómo le aplica la orden de agua al servicio móvil'],
  [/within (about )?a day|en (más o menos )?un día|dentro de un día/i, 'lovebugs «en un día»: la fuente (UF/IFAS IN204) dice varios días'],
  [/\bclear strip\b/i, 'la ley dice «transparent strip», no «clear»'],
  [/UV protection|protección UV|100% mobile|100 % móvil/i, 'claim de producto o de servicio móvil sin confirmar'],
  [/\bluneta\b/i, 'en el sitio se dice «vidrio trasero»'],
  [/certified (applicator|installer)|aplicador certificado/i, 'sin certificado del fabricante no se dice'],
]
const stripComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/ .*$/gm, '')
const dirFiles = (dir, ext) => fs.readdirSync(dir).filter((f) => f.endsWith(ext)).map((f) => `${dir}/${f}`)
const sources = ['src/i18n.jsx', 'src/App.jsx', ...dirFiles('src/content', '.js'), ...dirFiles('src/sections', '.jsx'), ...dirFiles('src/components', '.jsx')]
const copyBlobs = [
  ...pages.map((p) => [p.url, p.html.replace(/<script[\s\S]*?<\/script>/g, '')]),
  ['/llms.txt', fs.existsSync(path.join(DIST, 'llms.txt')) ? fs.readFileSync(path.join(DIST, 'llms.txt'), 'utf8') : ''],
  ...sources.filter((f) => fs.existsSync(f)).map((f) => [f, stripComments(fs.readFileSync(f, 'utf8'))]),
]
for (const [where, text] of copyBlobs) {
  for (const [re, why] of CLAIMS) {
    const m = text.match(re)
    if (m) fail(where, `«${m[0]}»: ${why}`)
  }
}

// La cabecera de las páginas estáticas debe ser la misma que la de la home (src/App.jsx): mismos enlaces, mismo orden, mismos textos.
// Y la home y las landings deben seguir leyendo los mismos tokens de marca (src/tokens.css).
{
  const i18n = fs.readFileSync('src/i18n.jsx', 'utf8')
  const [enBlock, esBlock] = i18n.split(/\n  es: \{/)
  const services = fs.readFileSync('src/content/services.js', 'utf8')
  const [svcEn, svcEs] = services.split(/\n  es: \{/)
  const text = (block, extra, key) => (block.match(new RegExp(`\\b${key}: '((?:[^'\\\\\\n]|\\\\.)*)'`)) || extra.match(new RegExp(`\\b${key}: '((?:[^'\\\\\\n]|\\\\.)*)'`)) || [])[1]
  const expected = (lang) => ['navServices', 'navTint', 'navCeramic', 'navPricing', 'navGallery', 'navContact'].map((k) => text(lang === 'es' ? esBlock : enBlock, lang === 'es' ? svcEs : svcEn, k))
  for (const { url, html } of pages) {
    const nav = html.match(/<nav class="nav-links"[\s\S]*?<\/nav>/)
    if (!nav) continue
    const links = [...nav[0].matchAll(/<a [^>]*>([^<]*)<\/a>/g)].map((m) => m[1])
    const want = expected(url.startsWith('/es/') ? 'es' : 'en')
    if (JSON.stringify(links) !== JSON.stringify(want)) fail(url, `el menú no coincide con el de la home: ${links.join(' | ')} (debería ser ${want.join(' | ')})`)
  }
  for (const css of ['src/index.css', 'src/landing.css']) {
    if (!/@import\s+['"]\.\/tokens\.css['"]/.test(fs.readFileSync(css, 'utf8'))) fail(css, 'no importa src/tokens.css: los tokens de marca deben ser los mismos que en la otra hoja')
  }
}

const totalMb = files.reduce((n, f) => n + fs.statSync(f).size, 0) / 1024 / 1024
if (totalMb > BUDGET_MB) fail('dist', `pesa ${totalMb.toFixed(1)} MB (presupuesto ${BUDGET_MB} MB)`)

console.log(`${pages.length} páginas revisadas · dist ${totalMb.toFixed(1)} MB`)
if (problems.length) {
  console.error(`\n${problems.length} problema(s):\n- ${problems.join('\n- ')}`)
  process.exit(1)
}
console.log('check-dist OK')
