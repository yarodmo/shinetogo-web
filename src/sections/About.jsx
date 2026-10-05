import { useI18n } from '../i18n'

const CARDS = [
  { key: 'aboutCard1', icon: '🎯' },
  { key: 'aboutCard2', icon: '🚚' },
  { key: 'aboutCard3', icon: '📋' },
  { key: 'aboutCard4', icon: '🧴' },
]

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blue" style={{ top: '20%', right: '-10%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="sr-only">{t('navAbout')}</h2>
        <p className="animated-fade-in" style={{
          fontSize: 'clamp(18px, 2.5vw, 22px)', color: 'var(--text-light)',
          fontWeight: 500, lineHeight: 1.7, maxWidth: '800px',
          margin: '0 auto 72px', textAlign: 'center'
        }}>
          {t('aboutText')}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {CARDS.map((c, i) => (
            <div key={i} className="glass-card animated-fade-in" style={{
              padding: '40px 32px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '20px' }}>{c.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                {t(c.key)}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t(`${c.key}d`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
