import { useI18n } from '../i18n'
import { prefill } from '../lib/prefill'

// Auto y bote son los protagonistas (tarjetas grandes con foto). Polarizado y cerámico van debajo,
// en un segundo nivel más compacto: son servicios aparte, con su página de detalle, y se cotizan en el mismo formulario.
// Los esquemas de calor y capas viven en las páginas de detalle, donde hay espacio para leerlos.
const SERVICES = [
  { key: 'svc1', img: '/img/services/auto-800.webp', color: 'var(--brand-gold)', href: '#pricing', prefill: null },
  { key: 'svc2', img: '/img/services/boat-800.webp', color: 'var(--brand-blue)', href: '#contact', prefill: { service: 'boat', vehicle_type: 'boat' } },
]

const PROTECTION = [
  { key: 'svc4', img: '/img/protection/tint-van', pos: '70% 50%', service: 'tint', href: { en: '/window-tint/', es: '/es/polarizado-de-vidrios/' } },
  { key: 'svc5', img: '/img/protection/ceramic-bottle', pos: '50% 40%', service: 'ceramic', href: { en: '/ceramic-coating/', es: '/es/recubrimiento-ceramico/' } },
]

export default function Services() {
  const { t, lang } = useI18n()

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '28px'
        }}>
          {SERVICES.map((svc) => (
            <div key={svc.key} className="light-card animated-fade-in" style={{
              display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}>
              {/* Image */}
              <div role="img" aria-label={t(`${svc.key}Title`)} style={{
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
                      <span aria-hidden="true" style={{ color: 'var(--brand-green)', flexShrink: 0 }}>✓</span>
                      {t(`${svc.key}F${n}`)}
                    </li>
                  ))}
                </ul>
                <a href={svc.href} className="btn btn-primary" style={{ width: '100%', borderRadius: '99px', padding: '16px' }}
                  onClick={() => svc.prefill && prefill.set(svc.prefill)}
                  data-track="service_card_click" data-location="services" data-service={svc.key}>
                  {t(`${svc.key}Btn`)}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* POLARIZADO Y CERÁMICO — segundo nivel */}
        <div style={{ marginTop: '72px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 className="animated-fade-in" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', fontWeight: 800, color: 'var(--text-dark)' }}>
              {t('protHeadline')}
            </h3>
            <p className="animated-fade-in" style={{ marginTop: '10px', color: 'var(--text-body)', fontSize: '16px' }}>
              {t('protSub')}
            </p>
          </div>

          <div className="prot-grid">
            {PROTECTION.map((p) => (
              <div key={p.key} className="light-card prot-card animated-fade-in">
                <div className="svc-diagram-wrap">
                  <img className="prot-img" src={`${p.img}-640.webp`} alt={t(`${p.key}Alt`)} width="640" height={p.key === 'svc4' ? 480 : 640}
                    loading="lazy" decoding="async" style={{ objectPosition: p.pos }} />
                </div>
                <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-dark)' }}>{t(`${p.key}Title`)}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6 }}>{t(`${p.key}Desc`)}</p>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '6px' }}>
                    <a href="#contact" className="btn btn-primary" style={{ padding: '11px 22px', fontSize: '13px' }}
                      onClick={() => prefill.set({ service: p.service })}
                      data-track="service_card_click" data-location="services" data-service={p.key}>
                      {t('svcQuote')}
                    </a>
                    <a href={p.href[lang]} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-blue-text)' }}
                      data-track="service_more_click" data-location="services" data-service={p.key}>
                      {t('svcMore')} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
