#!/usr/bin/env node
/**
 * Escribe en stdout el .env de producción de la API con las variables que recibe del entorno
 * (GitHub Actions las pasa vía `env:`). Falla si falta alguna requerida.
 * Uso: node scripts/write-env.cjs > api.env
 */
const { formatEnv } = require('../api/lib/envfile')

const REQUIRED = ['PORT', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'RECIPIENT', 'ALLOWED_ORIGINS']
const OPTIONAL = ['BRAND_NAME', 'LEADS_FILE']

const missing = REQUIRED.filter((k) => !process.env[k])
if (missing.length) {
  console.error(`Faltan variables para el .env: ${missing.join(', ')}`)
  process.exit(1)
}
const origins = process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim())
if (origins.some((o) => !/^https?:\/\/[^/\s]+$/.test(o))) {
  console.error('ALLOWED_ORIGINS debe ser una lista de orígenes https://dominio separados por coma, sin barra final ni ruta')
  process.exit(1)
}

const pairs = [['NODE_ENV', 'production'], ...REQUIRED.map((k) => [k, process.env[k]]), ...OPTIONAL.map((k) => [k, process.env[k]]).filter(([, v]) => v)]
process.stdout.write(formatEnv(pairs))
