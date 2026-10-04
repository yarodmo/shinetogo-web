require('dotenv').config()
/**
 * Lead Capture API
 * ─────────────────────────────────────────────────
 * Recibe POST /api/book desde el sitio, guarda el lead en un archivo NDJSON
 * (copia autoritativa) y avisa al dueño por correo SMTP.
 *
 * La lógica vive en app.js y lib/ para poder probarla sin SMTP real (npm test).
 * Este archivo solo lee la configuración, arma el transporte y escucha.
 */
const os = require('node:os')
const path = require('node:path')
const nodemailer = require('nodemailer')
const { createApp } = require('./app')

const PORT = process.env.PORT || 6544
const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465')
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const RECIPIENT = process.env.RECIPIENT || SMTP_USER
const BRAND_NAME = process.env.BRAND_NAME || 'ShineToGo'
// Fuera de ~/app/api: el deploy sincroniza esa carpeta con rsync --delete.
const LEADS_FILE = process.env.LEADS_FILE || path.join(os.homedir(), 'data', 'leads.ndjson')
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:3000')
  .split(',').map((s) => s.trim()).filter(Boolean)

// En producción un .env incompleto no debe arrancar "a medias" (CORS a localhost, SMTP vacío):
// se cae en seco, PM2 lo reintenta, el health check falla y el deploy sale en rojo.
if (process.env.NODE_ENV === 'production' && !(process.env.ALLOWED_ORIGINS && SMTP_HOST && SMTP_USER && SMTP_PASS)) {
  console.error('FATAL: faltan ALLOWED_ORIGINS / SMTP_HOST / SMTP_USER / SMTP_PASS en producción')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // SSL en 465, STARTTLS en 587
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  tls: { rejectUnauthorized: false }, // el servidor de correo del panel usa certificado propio
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
})

const app = createApp({
  transporter,
  leadsFile: LEADS_FILE,
  recipient: RECIPIENT,
  smtpUser: SMTP_USER,
  brandName: BRAND_NAME,
  allowedOrigins: ALLOWED_ORIGINS,
})

transporter.verify()
  .then(() => console.log(`✅ SMTP connected → ${SMTP_HOST}:${SMTP_PORT} as ${SMTP_USER}`))
  .catch((err) => console.error('❌ SMTP connection failed:', err.message))

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Lead API running on port ${PORT}`)
  console.log(`   Health:  http://localhost:${PORT}/api/health`)
  console.log(`   Leads:   ${LEADS_FILE}`)
  console.log(`   Notify:  ${RECIPIENT}\n`)
})

// Cierre ordenado: deja terminar las solicitudes en curso antes de que PM2 reinicie.
const shutdown = () => {
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(0), 8000).unref()
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
