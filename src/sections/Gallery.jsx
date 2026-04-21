import { useState } from 'react'
import { useI18n } from '../i18n'

const ITEMS = [
  { src: '/gallery/ceramic-coating-water-beading-proof.mov', type: 'video', label: 'Ceramic Coating Finish', tag: 'Ceramic Coating' },
  { src: '/gallery/mobile-car-detailing-florida-exterior-wash.jpeg', type: 'image', label: 'Premium Exterior Wash', tag: 'Premium Wash' },
  { src: '/gallery/mobile-detailing-snow-foam-wash-video.MOV', type: 'video', label: 'Snow Foam Luxury Wash', tag: 'Foam Wash' },
  { src: '/gallery/interior-car-cleaning-deep-shampoo.jpeg', type: 'image', label: 'Interior Deep Clean', tag: 'Interior Detail' },
  { src: '/gallery/florida-mobile-detailers-in-action.mov', type: 'video', label: 'Detailing Process', tag: 'Mobile Service' },
  { src: '/gallery/boat-detailing-gelcoat-polishing.jpeg', type: 'image', label: 'Boat Gelcoat Polish', tag: 'Marine' },
]

const REVIEWS = [
  { name: 'Michael J.', role: 'Boat Owner', en: 'Exceptional service! They came to my marina and left my boat looking brand new. Professional, punctual, and meticulous.', es: '¡Servicio excepcional! Vinieron a mi marina y dejaron mi bote como nuevo.' },
  { name: 'Jennifer S.', role: 'Business Owner', en: 'Best mobile detailing in Florida! My car looks better than when I bought it. Attention to detail is impressive.', es: 'El mejor detailing móvil de Florida. Mi auto se ve mejor que cuando lo compré.' },
]

export default function Gallery() {
  const { t, lang } = useI18n()
  const [active, setActive] = useState(null)

  return (
    <>
      {/* GALLERY */}
      <section id="gallery" className="section section-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="animated-fade-in" style={{
              fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-dark)'
            }}>{t('galleryTitle')}</h2>
            <p className="animated-fade-in" style={{ marginTop: '12px', color: 'var(--text-body)', fontSize: '17px' }}>
              {t('gallerySub')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {ITEMS.map((item, i) => (
              <div key={i} className="light-card animated-fade-in"
                onClick={() => setActive(i)}
                style={{ cursor: 'pointer', overflow: 'hidden' }}>
                <div style={{ position: 'relative', paddingTop: '70%', background: '#f1f5f9' }}>
                  {item.type === 'video' ? (
                    <video
                      src={`${item.src}#t=0.5`} muted loop playsInline preload="auto"
                      onMouseEnter={e => { e.target.currentTime = 0; e.target.play() }}
                      onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0.5 }}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img src={item.src} alt={item.label} loading="lazy"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, color: 'var(--brand-blue)',
                    textTransform: 'uppercase', letterSpacing: '0.08em'
                  }}>{item.tag}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginTop: '4px' }}>
                    {item.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blue" style={{ bottom: '-20%', left: '20%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="animated-fade-in" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff' }}>
              {t('reviewsTitle')}
            </h2>
            <p className="animated-fade-in" style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '17px' }}>
              {t('reviewsSub')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="glass-card animated-fade-in" style={{ padding: '36px 28px' }}>
                <div style={{ color: 'var(--brand-gold)', fontSize: '16px', marginBottom: '20px', letterSpacing: '3px' }}>★★★★★</div>
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-light)', marginBottom: '28px', fontWeight: 500 }}>
                  "{lang === 'es' ? r.es : r.en}"
                </p>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#fff' }}>{r.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--brand-blue)' }}>{r.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="animated-fade-in" style={{
            display: 'flex', gap: '48px', justifyContent: 'center', marginTop: '56px',
            flexWrap: 'wrap'
          }}>
            {['reviewsStat1', 'reviewsStat2', 'reviewsStat3'].map(key => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--brand-blue)' }}>{t(key)}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>{t(`${key}d`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {active !== null && (
        <div onClick={() => setActive(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)'
        }}>
          <button onClick={() => setActive(null)} style={{
            position: 'absolute', top: '24px', right: '24px',
            background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer'
          }}>✕</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '90%' }}>
            {ITEMS[active].type === 'video' ? (
              <video src={ITEMS[active].src} controls autoPlay playsInline
                style={{ width: '100%', maxHeight: '75vh', borderRadius: '16px' }} />
            ) : (
              <img src={ITEMS[active].src} alt={ITEMS[active].label}
                style={{ width: '100%', maxHeight: '75vh', borderRadius: '16px', objectFit: 'contain' }} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
