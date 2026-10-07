/**
 * Genera los assets web optimizados a partir de los originales en assets-src/.
 * Los originales (fotos de cámara de hasta 8064x6048 px y videos MOV) NO se despliegan:
 * solo se despliega lo que este script escribe en public/img y public/video.
 *
 * Uso (sharp no es dependencia del proyecto, se instala solo para correr esto):
 *   npm i --no-save sharp && node scripts/optimize-assets.cjs
 * Los videos se convierten con avconvert (macOS, incluido en el sistema).
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'assets-src')
const OUT_IMG = path.join(ROOT, 'public', 'img')
const OUT_VID = path.join(ROOT, 'public', 'video')

const q = { quality: 76, effort: 5 }
const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0) + ' KB'

async function webp(srcFile, outBase, sizes, { fit = 'cover', position = 'centre' } = {}) {
  for (const [w, h] of sizes) {
    const out = `${outBase}-${w}.webp`
    fs.mkdirSync(path.dirname(out), { recursive: true })
    await sharp(srcFile)
      .rotate() // respeta la orientación EXIF de las fotos de celular
      .resize({ width: w, height: h || undefined, fit: h ? fit : 'inside', position, withoutEnlargement: true })
      .webp(q)
      .toFile(out)
    console.log('  ', path.relative(ROOT, out), kb(out))
  }
}

// Recorte por proporción y centro (cx, cy en 0..1) o por región; sirve para fotos horizontales y verticales.
async function webpCrop(srcFile, outBase, sizes, { ratio, cx = 0.5, cy = 0.5, region } = {}) {
  const upright = await sharp(srcFile).rotate().toBuffer()
  const { width: W, height: H } = await sharp(upright).metadata()
  let crop = { left: 0, top: 0, width: W, height: H }
  if (region) {
    crop = { left: Math.round(W * region.left), top: Math.round(H * region.top), width: Math.round(W * region.width), height: Math.round(H * region.height) }
  } else if (ratio) {
    if (W / H > ratio) { const w = Math.round(H * ratio); crop = { left: Math.round((W - w) * cx), top: 0, width: w, height: H } }
    else { const h = Math.round(W / ratio); crop = { left: 0, top: Math.round((H - h) * cy), width: W, height: h } }
  }
  for (const w of sizes) {
    const out = `${outBase}-${w}.webp`
    fs.mkdirSync(path.dirname(out), { recursive: true })
    await sharp(upright).extract(crop).resize({ width: w, withoutEnlargement: true }).webp(q).toFile(out)
    console.log('  ', path.relative(ROOT, out), kb(out))
  }
}

// La furgoneta de esta imagen muestra teléfonos que no son los del negocio: se difuminan al generar la versión web.
// El original en assets-src no se modifica. region en píxeles del original.
async function webpBlurred(srcFile, outBase, sizes, regions, { ratio, cx = 0.5, cy = 0.5 } = {}) {
  const upright = await sharp(srcFile).rotate().toBuffer()
  const patches = []
  for (const r of regions) {
    patches.push({ input: await sharp(upright).extract(r).blur(9).toBuffer(), left: r.left, top: r.top })
  }
  const base = await sharp(upright).composite(patches).toBuffer()
  const { width: W, height: H } = await sharp(base).metadata()
  let crop = { left: 0, top: 0, width: W, height: H }
  if (ratio) {
    if (W / H > ratio) { const w = Math.round(H * ratio); crop = { left: Math.round((W - w) * cx), top: 0, width: w, height: H } }
    else { const h = Math.round(W / ratio); crop = { left: 0, top: Math.round((H - h) * cy), width: W, height: h } }
  }
  for (const w of sizes) {
    const out = `${outBase}-${w}.webp`
    fs.mkdirSync(path.dirname(out), { recursive: true })
    await sharp(base).extract(crop).resize({ width: w, withoutEnlargement: true }).webp(q).toFile(out)
    console.log('  ', path.relative(ROOT, out), kb(out))
  }
}

async function main() {
  console.log('Hero (4:3)')
  await webp(path.join(SRC, 'hero-finish.jpg'), path.join(OUT_IMG, 'hero/finish'), [[640, 480], [1080, 810]])
  // Furgoneta lavando con espuma (oct 2026): reemplaza a hero-foam. 4:3 exacto, sin recorte; se ocultan los teléfonos que no son del negocio.
  const PHONES = [{ left: 796, top: 384, width: 112, height: 40 }]
  await webpBlurred(path.join(SRC, 'protection/service-van-foam-wash-action.jpg'), path.join(OUT_IMG, 'hero/action'), [640, 1080], PHONES, { ratio: 4 / 3 })
  await webp(path.join(SRC, 'hero-polish.png'), path.join(OUT_IMG, 'hero/polish'), [[640, 480], [1024, 768]])

  console.log('Services')
  await webp(path.join(SRC, 'hero-auto.jpg'), path.join(OUT_IMG, 'services/auto'), [[800, 480]])
  await webp(path.join(SRC, 'gallery/boat-detailing-gelcoat-polishing.jpeg'), path.join(OUT_IMG, 'services/boat'), [[800, 480]])

  console.log('Galeria (miniatura 10:7 + version grande para lightbox)')
  const gallery = [
    'mobile-car-detailing-florida-exterior-wash',
    'interior-car-cleaning-deep-shampoo',
    'boat-detailing-gelcoat-polishing',
  ]
  for (const slug of gallery) {
    const f = path.join(SRC, 'gallery', slug + '.jpeg')
    await webp(f, path.join(OUT_IMG, 'gallery', slug), [[640, 448]], { position: 'attention' })
    await webp(f, path.join(OUT_IMG, 'gallery', slug), [[1400, 0]], { fit: 'inside' })
  }

  // Ilustraciones de oct 2026 (assets-src/protection): la furgoneta en el hero, y las de tint y cerámico.
  // carbon-fiber-water-beading.jpg queda sin publicar hasta definir si «carbono» es película de vidrio o un tratamiento aparte.
  console.log('Furgoneta y servicios nuevos')
  const PR = path.join(SRC, 'protection')
  await webpCrop(path.join(PR, 'hero-van-detailing-range-rover.jpg'), path.join(OUT_IMG, 'hero/van'), [640, 1080], { ratio: 4 / 3 })
  await webpCrop(path.join(PR, 'tint-van-mobile-station.jpg'), path.join(OUT_IMG, 'protection/tint-van'), [640, 1080], { ratio: 4 / 3, cx: 0.62 })
  await webpCrop(path.join(PR, 'ceramic-applying-bottle-label.jpg'), path.join(OUT_IMG, 'protection/ceramic-bottle'), [640, 1024], {})
  // Esponja sobre el capó: solo la mitad izquierda, sin el frasco, cuya etiqueta sale deformada.
  await webpCrop(path.join(PR, 'ceramic-applying-sponge-hood.jpg'), path.join(OUT_IMG, 'protection/ceramic-sponge'), [640, 960], { region: { left: 0, top: 0.36, width: 0.7, height: 0.48 } })
  await webpCrop(path.join(PR, 'ceramic-water-beading-pour.jpg'), path.join(OUT_IMG, 'protection/ceramic-beading'), [800, 1400], {})

  await webpBlurred(path.join(SRC, 'protection/service-van-foam-wash-action.jpg'), path.join(OUT_IMG, 'gallery/team-at-work'), [640], PHONES, { ratio: 10 / 7 })
  await webpBlurred(path.join(SRC, 'protection/service-van-foam-wash-action.jpg'), path.join(OUT_IMG, 'gallery/team-at-work'), [1195], PHONES, {})

  console.log('Marca')
  const logo = path.join(SRC, 'logo-shinetogo.jpg')
  await webp(logo, path.join(OUT_IMG, 'brand/logo'), [[120, 120], [240, 240]], { fit: 'contain' })
  await sharp(logo).resize(512, 512).jpeg({ quality: 86 }).toFile(path.join(OUT_IMG, 'brand/logo-512.jpg'))
  for (const [n, s] of [['favicon-48.png', 48], ['favicon-192.png', 192], ['apple-touch-icon-180.png', 180]]) {
    await sharp(logo).resize(s, s).png({ compressionLevel: 9 }).toFile(path.join(OUT_IMG, 'brand', n))
  }
  await webp(path.join(SRC, 'shinetogomobilecarwash_qr.png'), path.join(OUT_IMG, 'brand/ig-qr'), [[192, 192]], { fit: 'contain' })
  for (const f of fs.readdirSync(path.join(OUT_IMG, 'brand'))) console.log('  ', 'public/img/brand/' + f, kb(path.join(OUT_IMG, 'brand', f)))

  console.log('Videos (MP4 H.264 720p + poster)')
  fs.mkdirSync(OUT_VID, { recursive: true })
  // [archivo origen, slug, lado largo máx. en px, bitrate en kbps]
  const videos = [
    ['ceramic-coating-water-beading-proof.mov', 'ceramic-water-beading', 960, 1500],
    ['mobile-detailing-snow-foam-wash-video.MOV', 'snow-foam-wash', 960, 1500],
  ]
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'qlthumb-'))
  for (const [file, slug, maxLong, kbps] of videos) {
    const input = path.join(SRC, 'gallery', file)
    const out = path.join(OUT_VID, slug + '.mp4')
    execFileSync('swift', [path.join(__dirname, 'transcode-video.swift'), input, out, String(maxLong), String(kbps)], { stdio: 'pipe' })
    console.log('  ', path.relative(ROOT, out), kb(out))
    execFileSync('qlmanage', ['-t', '-s', '1000', '-o', tmp, input], { stdio: 'pipe' })
    const thumb = path.join(tmp, path.basename(input) + '.png')
    await sharp(thumb).resize({ width: 640 }).webp(q).toFile(path.join(OUT_VID, slug + '-poster.webp'))
    console.log('  ', path.relative(ROOT, path.join(OUT_VID, slug + '-poster.webp')), kb(path.join(OUT_VID, slug + '-poster.webp')))
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
