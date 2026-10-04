'use strict'

/**
 * Formatea pares CLAVE=valor para un archivo .env que dotenv lee igual que el valor original.
 * Un valor sin comillas pierde todo desde "#", y el shell remoto se come $, comillas y backticks;
 * por eso el deploy genera el archivo aquí y no con `echo` en el servidor.
 *  - sin comilla simple: 'valor'   (dotenv no interpreta nada dentro)
 *  - con comilla simple pero sin backtick: `valor`
 *  - con ambas, o con saltos de línea: error (mejor fallar el deploy que corromper un secreto)
 */
function quote(key, value) {
  const v = String(value ?? '')
  if (v === '') return ''
  if (/[\r\n]/.test(v)) throw new Error(`${key}: el valor tiene saltos de línea`)
  if (!v.includes("'")) return `'${v}'`
  if (!v.includes('`')) return `\`${v}\``
  throw new Error(`${key}: el valor mezcla comilla simple y backtick`)
}

function formatEnv(pairs) {
  return pairs
    .map(([key, value]) => {
      if (!/^[A-Z][A-Z0-9_]*$/.test(key)) throw new Error(`nombre de variable inválido: ${key}`)
      return `${key}=${quote(key, value)}`
    })
    .join('\n') + '\n'
}

module.exports = { formatEnv }
