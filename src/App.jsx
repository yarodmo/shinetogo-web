import { useState, useEffect } from 'react'
import { useI18n } from './i18n'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Pricing from './sections/Pricing'
import Process from './sections/Process'
import Gallery from './sections/Gallery'
import Contact from './sections/Contact'

/* ═══════ NAVBAR — Adapts from Light Hero to Dark Scroll ═══════ */
function Navbar() {
  const { t, lang, toggle } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Colors adapt: light on hero, dark after scroll
  const navBg = scrolled ? 'rgba(10, 14, 26, 0.98)' : 'rgba(255, 255, 255, 0.95)'
  const textColor = scrolled ? '#fff' : '#0f172a'
  const linkColor = scrolled ? '#94a3b8' : '#475569'
  const borderColor = scrolled ? 'rgba(255,255,255,0.1)' : '#e2e8f0'

  return (
    <nav className="navbar-glass" style={{
      background: navBg,
      borderBottom: `1px solid ${borderColor}`
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/logo-shinetogo.jpg" alt="ShineToGo Detail" style={{ height: '60px', width: 'auto', borderRadius: '6px' }} />
      </a>

      <div className="nav-links">
        {[['#hero', 'navHome'], ['#about', 'navAbout'], ['#services', 'navServices'], ['#pricing', 'navPricing'], ['#gallery', 'navGallery'], ['#contact', 'navContact']].map(([href, key]) => (
          <a key={key} href={href} style={{ color: linkColor }}>{t(key)}</a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button onClick={toggle} style={{
          fontWeight: 700, fontSize: '12px', background: 'none',
          color: linkColor, border: `1.5px solid ${borderColor}`,
          padding: '6px 14px', borderRadius: '8px', cursor: 'pointer'
        }}>
          {lang === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}
        </button>
        <a href="#contact" className="btn btn-primary" style={{
          padding: '10px 24px', fontSize: '13px'
        }}>
          {t('navBook')}
        </a>
      </div>
    </nav>
  )
}

/* ═══════ STICKY CTA — Mobile ═══════ */
function StickyCta() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="sticky-cta">
      <a href="#contact" className="btn btn-primary" style={{
        width: '100%', maxWidth: '400px', padding: '14px', fontSize: '14px'
      }}>
        {t('stickyCta')}
      </a>
    </div>
  )
}

/* ═══════ APP — Showroom Grade Funnel ═══════ */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Process />
        <Gallery />
        <Contact />
      </main>
      <footer style={{
        background: 'var(--bg-dark)', padding: '48px 0',
        borderTop: '1px solid var(--border-dark)'
      }}>
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px'
        }}>
          <div>
            <img src="/logo-shinetogo.jpg" alt="ShineToGo Detail" style={{ height: '44px', width: 'auto', borderRadius: '4px', marginBottom: '16px' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
              Professional mobile car and boat detailing services. We bring premium care to your location.
            </p>
            <div style={{ marginTop: '24px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '320px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="https://www.instagram.com/shinetogomobilecarwash?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
                <img src="/shinetogomobilecarwash_qr.png" alt="Instagram QR" style={{ width: '64px', height: '64px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
              </a>
              <div>
                <a href="https://www.instagram.com/shinetogomobilecarwash?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px' }}>
                      📸
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#fff' }}>@shinetogomobilecarwash</div>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Síguenos para trabajos diarios</div>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#services" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Auto Detailing</a>
              <a href="#services" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Boat Detailing</a>
              <a href="#pricing" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Ceramic Coating</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Areas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Sarasota</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Bradenton</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Tampa Bay</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>St. Petersburg</span>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="tel:+19419528758" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>📞 (941) 952-8758</a>
              <a href="https://wa.me/19419528758" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'var(--brand-green)' }}>💬 WhatsApp</a>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Available 24/7</span>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-dark)' }}>
          <p style={{ fontSize: '13px', color: '#334155', textAlign: 'center' }}>
            © 2026 ShineToGo Mobile Car Wash. Designed by Bliss Systems LLC.
          </p>
        </div>
      </footer>
      <StickyCta />
    </>
  )
}
