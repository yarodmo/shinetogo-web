import { useI18n } from '../i18n'

const SERVICES = [
  { key: 'svc1', img: '/img/services/auto-800.webp', color: 'var(--brand-gold)', href: '#contact' },
  { key: 'svc2', img: '/img/services/boat-800.webp', color: 'var(--brand-blue)', href: '#contact' },
  { key: 'svc4', img: '/img/hero/polish-1024.webp', color: 'var(--brand-green)', href: '#protection' },
]

export default function Services() {
  const { t } = useI18n()

  return (
    <section id="services" className="section section-light">
      <div className="container">
        <h2 className="animated-fade-in" style={{
          textAlign: 'center', fontSize: 'clamp(28px, 4vw, 44px)',
          color: 'var(--text-dark)', maxWidth: '700px',
          margin: '0 auto 64px'
        }}>
          {t('svcHeadline')}
        </h2>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '28px'
        }}>
          {SERVICES.map((svc, i) => (
            <div key={i} className="light-card animated-fade-in" style={{
              display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}>
              {/* Image */}
              <div style={{
                height: '240px', width: '100%', position: 'relative',
                background: `url(${svc.img}) center/cover no-repeat`
              }}>
                <div className="badge" style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: svc.color, color: 'var(--ink)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  {t(`${svc.key}Badge`)}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '12px' }}>
                  {t(`${svc.key}Title`)}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '24px' }}>
                  {t(`${svc.key}Desc`)}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1 }}>
                  {[1, 2, 3, 4].map(n => (
                    <li key={n} style={{
                      fontSize: '15px', display: 'flex', gap: '10px',
                      color: 'var(--text-dark)', fontWeight: 500
                    }}>
                      <span style={{ color: 'var(--brand-green)', flexShrink: 0 }}>✓</span>
                      {t(`${svc.key}F${n}`)}
                    </li>
                  ))}
                </ul>
                <a href={svc.href} className="btn btn-primary" style={{ width: '100%', borderRadius: '99px', padding: '16px' }}>
                  {t(`${svc.key}Btn`)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
