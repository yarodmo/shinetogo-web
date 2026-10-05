import { useState, useEffect, useCallback } from 'react'
import { useI18n } from '../i18n'
import { waLink } from '../lib/site'

// Versiones 640/1080 (4:3) generadas por scripts/optimize-assets.cjs.
const SLIDES = [
  { base: '/img/hero/finish', wide: 1080, label: { en: 'Exterior detail', es: 'Detallado exterior' } },
  { base: '/img/hero/polish', wide: 1024, label: { en: 'Precision Polish', es: 'Pulido de Precisión' } },
  { base: '/img/hero/foam', wide: 1080, label: { en: 'Snow Foam Wash', es: 'Lavado con Espuma' } },
]

const BADGES = [
  { key: 'heroBadge1', sub: 'heroBadge1b', icon: '🛡️' },
  { key: 'heroBadge2', sub: 'heroBadge2b', icon: '⚡' },
  { key: 'heroBadge3', sub: 'heroBadge3b', icon: '📷' },
]

export default function Hero() {
  const { t, lang } = useI18n()
  const [current, setCurrent] = useState(0)

  const waUrl = waLink(t('whatsappText'))

  // Auto-advance every 4 seconds
  const next = useCallback(() => {
    setCurrent(c => (c + 1) % SLIDES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
      paddingTop: '80px', background: '#fff'
    }}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '48px', alignItems: 'center', padding: '40px 24px',
        flex: 1
      }}>

        {/* LEFT — Content */}
        <div className="hero-content">
          <div className="animated-fade-in" style={{
            fontSize: '11px', fontWeight: 700, color: 'var(--brand-blue-text)',
            letterSpacing: '0.18em', marginBottom: '20px'
          }}>
            {t('heroTag')}
          </div>

          <h1 className="animated-fade-in" style={{
            fontSize: 'clamp(30px, 4.5vw, 52px)', fontWeight: 900,
            color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.04em',
            marginBottom: '24px'
          }}>
            {t('heroTitle')}
          </h1>

          <div className="animated-fade-in hero-ctas" style={{
            display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px'
          }}>
            <a href="#contact" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '14px' }}
              data-track="cta_click" data-location="hero">
              {t('heroCta1')}
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-green" style={{ padding: '16px 32px', fontSize: '14px' }}
              data-track="whatsapp_click" data-location="hero">
              💬 {t('heroCta2')}
            </a>
          </div>
        </div>

        {/* RIGHT — Image Slider */}
        <div className="hero-slider animated-fade-in" style={{
          position: 'relative', borderRadius: '24px', overflow: 'hidden',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.2)',
          aspectRatio: '4/3'
        }}>
          {SLIDES.map((slide, i) => (
            <img
              key={slide.base}
              src={`${slide.base}-640.webp`}
              srcSet={`${slide.base}-640.webp 640w, ${slide.base}-${slide.wide}.webp ${slide.wide}w`}
              sizes="(max-width: 900px) 100vw, 560px"
              width="1080" height="810"
              alt={slide.label[lang]}
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: current === i ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: current === i ? 2 : 1
              }}
            />
          ))}

          {/* Slide label overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
            padding: '40px 24px 20px', zIndex: 3,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
          }}>
            <span style={{
              fontSize: '14px', fontWeight: 700, color: '#fff',
              background: 'rgba(14,165,233,0.9)', padding: '6px 14px',
              borderRadius: '8px'
            }}>
              {SLIDES[current].label[lang]}
            </span>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {SLIDES.map((_, i) => (
                <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={SLIDES[i].label[lang]}
                  aria-current={current === i} style={{
                  // Punto de 8 px dentro de un área táctil de 24 px (WCAG 2.5.8)
                  width: current === i ? '40px' : '24px', height: '24px', padding: '8px',
                  backgroundClip: 'content-box',
                  borderRadius: '99px', border: 'none', cursor: 'pointer',
                  background: current === i ? '#fff' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.3s ease'
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BADGES */}
      <div className="animated-fade-in" style={{
        width: '100%', padding: '24px 0',
        borderTop: '1px solid #f1f5f9',
        background: '#fafbfc'
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'center', gap: '16px 40px',
          flexWrap: 'wrap' /* en pantallas angostas baja a dos filas en vez de recortar la primera insignia */
        }}>
          {BADGES.map((b, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              flexShrink: 0 /* Prevent shrinking */
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: '#f0f9ff', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px', flexShrink: 0
              }}>{b.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', lineHeight: 1.2, whiteSpace: 'nowrap' }}>{t(b.key)}</div>
                <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap' }}>{t(b.sub)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
