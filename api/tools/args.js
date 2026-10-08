'use strict'
// Lector mínimo de argumentos: --clave valor, --bandera, y posicionales. Sin dependencias.
function parseArgs(argv) {
  const flags = {}
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) { positional.push(a); continue }
    const key = a.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) flags[key] = true
    else { flags[key] = next; i++ }
  }
  return { flags, positional }
}
module.exports = { parseArgs }
