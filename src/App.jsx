import { useState, useEffect } from 'react'
import { useI18n } from './i18n'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Pricing from './sections/Pricing'
import Process from './sections/Process'
import Gallery from './sections/Gallery'
import Contact from './sections/Contact'
import Areas from './sections/Areas'
import Faq from './sections/Faq'
import Icon from './components/Icon'
import ConsentBanner from './components/ConsentBanner'
import { AREAS, BRAND_NAME, HAS_TRACKING, PHONE_DISPLAY, PHONE_TEL, waLink } from './lib/site'
import { openConsent } from './lib/track'

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
        <img src="/img/brand/logo-120.webp" srcSet="/img/brand/logo-120.webp 1x, /img/brand/logo-240.webp 2x" width="60" height="60" alt={BRAND_NAME} style={{ height: '60px', width: 'auto', borderRadius: '6px' }} />
      </a>

      <div className="nav-links">
        {[
          ['#services', 'navServices'],
          [lang === 'es' ? '/es/polarizado-de-vidrios/' : '/window-tint/', 'navTint'],
          [lang === 'es' ? '/es/recubrimiento-ceramico/' : '/ceramic-coating/', 'navCeramic'],
          ['#pricing', 'navPricing'],
          ['#gallery', 'navGallery'],
          ['#contact', 'navContact'],
        ].map(([href, key]) => (
          <a key={key} href={href} style={{ color: linkColor }}>{t(key)}</a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button onClick={toggle} aria-label={lang === 'en' ? 'Ver en español' : 'View in English'} lang={lang === 'en' ? 'es' : 'en'} style={{
          fontWeight: 700, fontSize: '12px', background: 'none',
          color: linkColor, border: `1.5px solid ${borderColor}`,
          padding: '6px 14px', borderRadius: '8px', cursor: 'pointer'
        }}>
          {lang === 'en' ? 'ES' : 'EN'}
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

/* ═══════ STICKY CTA — Mobile: Llamar | WhatsApp | Cotizar (la misma barra en las páginas de detalle) ═══════ */
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
      <a href={`tel:${PHONE_TEL}`} className="btn btn-secondary" data-track="call_click" data-location="sticky">
        <Icon name="phone" size={18} /> {t('stickyCall')}
      </a>
      <a href={waLink(t('whatsappText'))} target="_blank" rel="noopener noreferrer" className="btn btn-green"
        data-track="whatsapp_click" data-location="sticky">
        <Icon name="whatsapp" size={18} /> {t('stickyWhatsapp')}
      </a>
      <a href="#contact" className="btn btn-primary" data-track="cta_click" data-location="sticky">
        {t('navBook')}
      </a>
    </div>
  )
}

/* ═══════ APP — Showroom Grade Funnel ═══════ */
export default function App() {
  const { t, lang } = useI18n()
  const es = lang === 'es'
  // La página se dibuja con JS: el navegador no encuentra #ancla al cargar, así que se salta aquí.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return undefined
    const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }), 120)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Orden de producción; Zonas ocupa el lugar de las reseñas retiradas y FAQ sigue al formulario. */}
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Process />
        <Gallery />
        <Areas />
        <Contact />
        <Faq />
      </main>
      <footer style={{
        background: 'var(--bg-dark)', padding: '48px 0',
        borderTop: '1px solid var(--border-dark)'
      }}>
        <div className="container footer-grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px'
        }}>
          <div>
            <img src="/img/brand/logo-120.webp" srcSet="/img/brand/logo-120.webp 1x, /img/brand/logo-240.webp 2x" width="44" height="44" loading="lazy" alt={BRAND_NAME} style={{ height: '44px', width: 'auto', borderRadius: '4px', marginBottom: '16px' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
              {t('footerAbout')}
            </p>
            <div style={{ marginTop: '24px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '320px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="https://www.instagram.com/shinetogomobilecarwash?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
                <img src="/img/brand/ig-qr-192.webp" width="64" height="64" loading="lazy" alt="Instagram QR" style={{ width: '64px', height: '64px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
              </a>
              <div>
                <a href="https://www.instagram.com/shinetogomobilecarwash?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#fff' }}>@shinetogomobilecarwash</div>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{t('footerIg')}</div>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('footerServices')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#services" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{t('svc1Title')}</a>
              <a href="#services" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{t('svc2Title')}</a>
              <a href={es ? '/es/polarizado-de-vidrios/' : '/window-tint/'} style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{t('navTint')}</a>
              <a href={es ? '/es/recubrimiento-ceramico/' : '/ceramic-coating/'} style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{t('navCeramic')}</a>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('footerAreas')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AREAS.map((a) => (
                <span key={a} style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{a}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('footerContact')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={`tel:${PHONE_TEL}`} data-track="call_click" data-location="footer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted)' }}><Icon name="phone" size={16} /> {PHONE_DISPLAY}</a>
              <a href={waLink('')} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--brand-green)' }} data-track="whatsapp_click" data-location="footer"><Icon name="whatsapp" size={16} /> WhatsApp</a>
              <a href={es ? '/es/privacidad/' : '/privacy/'} style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{t('footerPrivacy')}</a>
              {HAS_TRACKING && (
                <button type="button" onClick={openConsent} style={{ fontSize: '14px', color: 'var(--text-muted)', background: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>
                  {t('footerPrivacyChoices')}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-dark)' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
            © {new Date().getFullYear()} {BRAND_NAME}. Designed by Bliss Systems LLC.
          </p>
        </div>
      </footer>
      <StickyCta />
      <ConsentBanner />
    </>
  )
}
