import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n'

const REVIEWS = [
  { name: 'Carlos M.', initials: 'CM', vehicle: 'BMW X5', en: 'Incredible detail work! My X5 looks brand new. The ceramic coating was worth every penny.', es: '¡Trabajo increíble de detallado! Mi X5 se ve como nuevo. El cerámico valió cada centavo.' },
  { name: 'Maria L.', initials: 'ML', vehicle: 'Range Rover', en: 'Best experience in Florida. They came to my house, professional, and spotless results. Customer for life!', es: 'La mejor experiencia en Florida. Vinieron a mi casa, profesionales, y resultados impecables. ¡Cliente de por vida!' },
  { name: 'James R.', initials: 'JR', vehicle: 'G-Wagon', en: 'They handled my G-Wagon with extreme care. Engine bay looks brand new. Can\'t beat their full detail.', es: 'Trataron mi G-Wagon con un cuidado extremo. Todo luce nuevo. Una calidad fenomenal.' },
  { name: 'Sofia P.', initials: 'SP', vehicle: 'Tesla Model S', en: 'The ceramic sealant is incredible. After 4 months, water still beads off perfectly. Worth every dollar.', es: 'El sellador cerámico es increíble. Después de 4 meses, el agua sigue resbalando perfecto.' },
  { name: 'David K.', initials: 'DK', vehicle: 'Porsche 911', en: 'I\'ve used 5 detailers in Miami. These guys are on another level. My 911 has never looked this good.', es: 'He usado 5 detailers en Miami. Estos están en otro nivel. Mi 911 nunca se ha visto así.' },
]

export default function SocialProof() {
  const { t, lang } = useI18n()
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let pos = 0
    const speed = 0.5
    let paused = false
    let raf

    const scroll = () => {
      if (!paused) {
        pos += speed
        if (pos >= el.scrollWidth / 2) pos = 0
        el.scrollLeft = pos
      }
      raf = requestAnimationFrame(scroll)
    }

    el.addEventListener('mouseenter', () => { paused = true })
    el.addEventListener('mouseleave', () => { paused = false })
    raf = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(raf)
  }, [])

  const TRUST = [
    { icon: '🛡️', title: t('trustInsurance'), desc: t('trustInsuranceDesc') },
    { icon: '📜', title: t('trustIDA'), desc: t('trustIDADesc') },
    { icon: '⭐', title: t('trustGoogle'), desc: t('trustGoogleDesc') },
    { icon: '🚚', title: t('trustMobile'), desc: t('trustMobileDesc') },
  ]

  return (
    <section style={{ background: '#fff', padding: '100px 0 80px', overflow: 'hidden' }}>
      <div className="container">
        <h2 className="animated-fade-in" style={{
          textAlign: 'center',
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 900,
          color: '#0F172A',
          letterSpacing: '-0.04em',
          marginBottom: '60px'
        }}>
          {t('reviewsHeadline')}
        </h2>
      </div>

      {/* AUTO-SCROLL REVIEW CAROUSEL */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflow: 'hidden',
          paddingBottom: '8px',
          cursor: 'grab',
          paddingLeft: '5%'
        }}
      >
        {[...REVIEWS, ...REVIEWS].map((r, i) => (
          <div key={i} style={{
            minWidth: '380px',
            maxWidth: '380px',
            background: '#F8FAFC',
            border: '1px solid #F1F5F9',
            borderRadius: '24px',
            padding: '36px 32px',
            flexShrink: 0
          }}>
            <div style={{ color: '#F59E0B', fontSize: '16px', marginBottom: '20px', letterSpacing: '2px' }}>★★★★★</div>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#1E293B', fontWeight: 500, marginBottom: '28px', minHeight: '80px' }}>
              "{lang === 'es' ? r.es : r.en}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'var(--brand-ocean)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '14px'
              }}>{r.initials}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>{r.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--brand-ocean)', fontWeight: 600 }}>{r.vehicle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TRUST STRIP */}
      <div className="container" style={{ marginTop: '80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {TRUST.map((item, i) => (
            <div key={i} className="animated-fade-in" style={{
              textAlign: 'center',
              padding: '32px 24px',
              background: '#F8FAFC',
              borderRadius: '20px',
              border: '1px solid #F1F5F9'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
              <div style={{ fontWeight: 800, fontSize: '16px', color: '#0F172A', marginBottom: '8px' }}>{item.title}</div>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#contact" className="btn-premium btn-outline" style={{ fontSize: '15px' }}>
            {t('reviewsCta')}
          </a>
        </div>
      </div>
    </section>
  )
}
