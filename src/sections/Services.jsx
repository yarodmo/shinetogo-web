import { useI18n } from '../i18n'

// Dos de las cuatro tarjetas son servicios aparte (window tint y cerámico) y abren su propia página.
// En la tarjeta de tint se muestra el esquema del calor (no hay foto de tint todavía); la de cerámico usa
// la foto real de un pulido, que es la preparación de la pintura.
const heatDiagrams = import.meta.glob('../assets/protection/heat-path.*.svg', { query: '?raw', import: 'default', eager: true })

// La insignia «Nuevo» de los dos servicios nuevos se retira sola a los seis meses (2027-04-05).
const NEW_UNTIL = Date.parse('2027-04-05')

const SERVICES = [
  { key: 'svc1', img: '/img/services/auto-800.webp', color: 'var(--brand-gold)', href: '#pricing' },
  { key: 'svc2', img: '/img/services/boat-800.webp', color: 'var(--brand-blue)', href: '#contact' },
  { key: 'svc4', isNew: true, diagram: true, color: 'var(--brand-green)', href: { en: '/window-tint/', es: '/es/polarizado-de-vidrios/' } },
  { key: 'svc5', isNew: true, img: '/img/hero/polish-1024.webp', color: 'var(--brand-green)', href: { en: '/ceramic-coating/', es: '/es/recubrimiento-ceramico/' } },
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

        <div className="services-grid cards-4">
          {SERVICES.map((svc) => {
            const href = typeof svc.href === 'string' ? svc.href : svc.href[lang]
            const diagram = svc.diagram ? heatDiagrams[`../assets/protection/heat-path.${lang}.svg`] : null
            return (
              <div key={svc.key} className="light-card animated-fade-in" style={{
                display: 'flex', flexDirection: 'column', overflow: 'hidden'
              }}>
                {/* Imagen */}
                <div style={{
                  height: '220px', width: '100%', position: 'relative',
                  background: svc.img ? `url(${svc.img}) center/cover no-repeat` : 'var(--bg-card)'
                }}>
                  {diagram && <div className="svc-diagram" dangerouslySetInnerHTML={{ __html: diagram }} />}
                  {(!svc.isNew || Date.now() < NEW_UNTIL) && (
                    <div className="badge" style={{
                      position: 'absolute', top: '16px', right: '16px',
                      background: svc.color, color: 'var(--ink)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                      {t(`${svc.key}Badge`)}
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '12px' }}>
                    {t(`${svc.key}Title`)}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '20px' }}>
                    {t(`${svc.key}Desc`)}
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
                    {[1, 2, 3, 4].map(n => (
                      <li key={n} style={{
                        fontSize: '15px', display: 'flex', gap: '10px',
                        color: 'var(--text-dark)', fontWeight: 500
                      }}>
                        <span style={{ color: 'var(--brand-green)', flexShrink: 0 }} aria-hidden="true">✓</span>
                        {t(`${svc.key}F${n}`)}
                      </li>
                    ))}
                  </ul>
                  <a href={href} className="btn btn-primary" style={{ width: '100%', borderRadius: '99px', padding: '16px' }}
                    data-track="service_card_click" data-location="services" data-service={svc.key}>
                    {t(`${svc.key}Btn`)}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
