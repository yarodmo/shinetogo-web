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

async function main() {
  console.log('Hero (4:3)')
  await webp(path.join(SRC, 'hero-finish.jpg'), path.join(OUT_IMG, 'hero/finish'), [[640, 480], [1080, 810]])
  await webp(path.join(SRC, 'hero-foam.jpg'), path.join(OUT_IMG, 'hero/foam'), [[640, 480], [1080, 810]])
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
    ['florida-mobile-detailers-in-action.mov', 'mobile-detailers-in-action', 848, 1100],
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
