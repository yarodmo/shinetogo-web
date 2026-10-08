'use strict'
const fs = require('node:fs')
const path = require('node:path')

const DEFAULT_MAX_BYTES = 50 * 1024 * 1024

/**
 * Guarda un lead como una línea JSON (NDJSON). Es la copia autoritativa:
 * el correo es solo la alerta. La carpeta debe estar FUERA de ~/app/api,
 * porque el deploy sincroniza esa carpeta con rsync --delete.
 * - fsync antes de responder: un reinicio brusco no pierde un lead ya confirmado.
 * - Tope de tamaño: un volcado de basura no llena el disco del host compartido (D-018).
 */
async function appendLead(file, record, { maxBytes = DEFAULT_MAX_BYTES } = {}) {
  await fs.promises.mkdir(path.dirname(file), { recursive: true, mode: 0o700 })
  const stat = await fs.promises.stat(file).catch(() => null)
  if (stat && stat.size >= maxBytes) throw new Error(`leads file over cap (${stat.size} bytes)`)
  const handle = await fs.promises.open(file, 'a', 0o600)
  try {
    await handle.appendFile(JSON.stringify(record) + '\n')
    await handle.sync()
  } finally {
    await handle.close()
  }
}

module.exports = { appendLead, DEFAULT_MAX_BYTES }
