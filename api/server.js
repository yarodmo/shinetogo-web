require('dotenv').config()
/**
 * ShineToGo — Lead Capture API (APEX Standard)
 * ─────────────────────────────────────────────────
 * Microservicio SMTP ultraligero para captura de leads.
 * Recibe POST JSON desde el formulario React y envía
 * el email formateado vía SMTP autenticado.
 *
 * Arquitectura:  React → POST /api/book → Nodemailer → SMTP → info@detailshine2go.com
 * Seguridad:     CORS whitelist + Rate limiting (10 req/15min por IP)
 */

const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const rateLimit = require('express-rate-limit')

const app = express()
const PORT = process.env.PORT || 6544

// ── CONFIG ──────────────────────────────────────────
const SMTP_HOST = process.env.SMTP_HOST || 'mail.detailshine2go.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465')
const SMTP_USER = process.env.SMTP_USER || 'info@detailshine2go.com'
const SMTP_PASS = process.env.SMTP_PASS || ''
const RECIPIENT = process.env.RECIPIENT || 'info@detailshine2go.com'
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,https://detailshine2go.com,https://www.detailshine2go.com').split(',')

// ── MIDDLEWARE ───────────────────────────────────────
app.use(express.json({ limit: '10kb' }))

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, mobile apps, server-side)
    if (!origin) return callback(null, true)
    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    callback(new Error('CORS: Origin not allowed'))
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))

// Anti-spam: Max 10 submissions per IP per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
})

// ── SMTP TRANSPORTER ────────────────────────────────
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // SSL for 465, STARTTLS for 587
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certs (cPanel default)
  },
})

// Verify SMTP connection on startup
transporter.verify()
  .then(() => console.log(`✅ SMTP connected → ${SMTP_HOST}:${SMTP_PORT} as ${SMTP_USER}`))
  .catch((err) => console.error(`❌ SMTP connection failed:`, err.message))

// ── HEALTH CHECK ────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'shinetogo-api', timestamp: new Date().toISOString() })
})

// ── CONTACT ENDPOINT ────────────────────────────────
app.post('/api/book', contactLimiter, async (req, res) => {
  try {
    const { name, phone, email, vehicle, service, message } = req.body

    // Validation
    if (!name || !phone || !service) {
      return res.status(400).json({
        success: false,
        error: 'Name, phone, and service are required.',
      })
    }

    // Build professional HTML email
    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e0e0e0; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #D4AF37, #8e95a5); padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 22px; color: #111;">🚗 New Booking — ShineToGo</h1>
          <p style="margin: 4px 0 0; color: rgba(17,17,17,0.8); font-size: 14px;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
        </div>
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 12px 0; color: #a78bfa; font-weight: 600; width: 120px;">👤 Name</td>
              <td style="padding: 12px 0; color: #fff;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 12px 0; color: #a78bfa; font-weight: 600;">📞 Phone</td>
              <td style="padding: 12px 0; color: #fff;"><a href="tel:${phone}" style="color: #a78bfa; text-decoration: none;">${phone}</a></td>
            </tr>
            ${email ? `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 12px 0; color: #a78bfa; font-weight: 600;">📧 Email</td>
              <td style="padding: 12px 0; color: #fff;"><a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a></td>
            </tr>` : ''}
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 12px 0; color: #a78bfa; font-weight: 600;">🚙 Vehicle</td>
              <td style="padding: 12px 0; color: #fff;">${vehicle || 'Not specified'}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 12px 0; color: #a78bfa; font-weight: 600;">🧼 Service</td>
              <td style="padding: 12px 0; color: #fff; font-weight: 600;">${service}</td>
            </tr>
            ${message ? `
            <tr>
              <td colspan="2" style="padding: 16px 0 0;">
                <div style="background: rgba(124,58,237,0.15); border-left: 4px solid #a855f7; padding: 16px; border-radius: 8px; margin-top: 8px;">
                  <p style="margin: 0 0 6px; color: #a78bfa; font-weight: 600; font-size: 13px;">💬 Message</p>
                  <p style="margin: 0; color: #e0e0e0; line-height: 1.5;">${message}</p>
                </div>
              </td>
            </tr>` : ''}
          </table>
        </div>
        <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); text-align: center; font-size: 12px; color: rgba(255,255,255,0.4);">
          ShineToGo — Booking System · Powered by <a href="https://blissystems.com" style="color: #D4AF37; text-decoration: none;">Bliss Systems</a>
        </div>
      </div>
    `

    // Plain text fallback
    const textBody = [
      `🚗 New Booking — ShineToGo`,
      `──────────────────────────`,
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      email ? `📧 Email: ${email}` : '',
      `🚙 Vehicle: ${vehicle || 'Not specified'}`,
      `🧼 Service: ${service}`,
      message ? `💬 Message: ${message}` : '',
      ``,
      `Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`,
    ].filter(Boolean).join('\n')

    // Send email
    await transporter.sendMail({
      from: `"ShineToGo Bookings" <${SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: email || undefined,
      subject: `🚗 New Quote: ${service} — ${name}`,
      text: textBody,
      html: htmlBody,
    })

    console.log(`✅ Lead captured: ${name} | ${service} | ${phone}`)

    res.json({ success: true, message: 'Your request has been sent successfully!' })

  } catch (err) {
    console.error('❌ Email send failed:', err.message)
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try calling us directly.',
    })
  }
})

// ── START ────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 ShineToGo API running on port ${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health`)
  console.log(`   Contact: POST http://localhost:${PORT}/api/book`)
  console.log(`   Recipient: ${RECIPIENT}\n`)
})
