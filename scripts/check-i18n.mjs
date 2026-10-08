/**
 * Falla si el código pide una clave de traducción que no existe (la home mostraría la clave cruda, p. ej. «protTabTint»).
 * Mira t('clave') literales en src/**\/*.jsx contra las claves de src/i18n.jsx y src/content/services.js, en EN y ES,
 * y que ambos idiomas tengan las mismas claves. Las claves dinámicas (t(`${x}Title`)) no se pueden comprobar aquí.
 * Uso: node scripts/check-i18n.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { services } from '../src/content/services.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const i18n = fs.readFileSync(path.join(ROOT, 'src/i18n.jsx'), 'utf8')
const [enBlock, esBlock] = i18n.split(/\n  es: \{/)
const keysOf = (block) => new Set([...block.matchAll(/\b([A-Za-z][A-Za-z0-9]*): '/g)].map((m) => m[1]))
const en = new Set([...keysOf(enBlock), ...Object.keys(services.en)])
const es = new Set([...keysOf(esBlock), ...Object.keys(services.es)])

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
const used = new Map()
for (const file of walk(path.join(ROOT, 'src')).filter((f) => f.endsWith('.jsx'))) {
  for (const m of fs.readFileSync(file, 'utf8').matchAll(/\bt\('([A-Za-z0-9]+)'\)/g)) used.set(m[1], path.relative(ROOT, file))
}

const problems = []
for (const [key, file] of used) {
  if (!en.has(key)) problems.push(`${file}: la clave «${key}» no existe en inglés`)
  if (!es.has(key)) problems.push(`${file}: la clave «${key}» no existe en español`)
}
for (const key of en) if (!es.has(key)) problems.push(`la clave «${key}» está en inglés pero falta en español`)
for (const key of es) if (!en.has(key)) problems.push(`la clave «${key}» está en español pero falta en inglés`)

console.log(`${used.size} claves usadas · ${en.size} en EN · ${es.size} en ES`)
if (problems.length) {
  console.error(`\n${problems.length} problema(s):\n- ${problems.join('\n- ')}`)
  process.exit(1)
}
console.log('check-i18n OK')
