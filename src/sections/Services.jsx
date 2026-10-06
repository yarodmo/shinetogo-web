import { useI18n } from '../i18n'
import { prefill } from '../lib/prefill'
import Icon from '../components/Icon'

// Cuatro servicios, una sola tarjeta. El botón principal de TODAS es cotizar aquí mismo (el lead se queda en la home),
// con el servicio ya elegido en el formulario. "Ver detalles/paquetes" es un enlace secundario.
// Tint y cerámico usan esquemas (no hay fotos propias de esos trabajos todavía; ver docs/OPEN-QUESTIONS #21 y #43).
const diagrams = import.meta.glob('../assets/protection/{heat-path,ceramic-layers}.*.svg', { query: '?raw', import: 'default', eager: true })

// La insignia «Nuevo» de los dos servicios nuevos se retira sola a los seis meses (2027-04-05).
const NEW_UNTIL = Date.parse('2027-04-05')

const SERVICES = [
  { key: 'svc1', img: '/img/services/auto-800.webp', badgeTone: 'gold', more: { href: '#pricing', label: 'svc1Btn' }, prefill: {} },
  { key: 'svc2', img: '/img/services/boat-800.webp', badgeTone: 'blue', prefill: { service: 'boat', vehicle_type: 'boat' } },
  { key: 'svc4', isNew: true, diagram: 'heat-path', badgeTone: 'green', more: { href: { en: '/window-tint/', es: '/es/polarizado-de-vidrios/' }, label: 'svcMore' }, prefill: { service: 'tint' } },
  { key: 'svc5', isNew: true, diagram: 'ceramic-layers', badgeTone: 'green', more: { href: { en: '/ceramic-coating/', es: '/es/recubrimiento-ceramico/' }, label: 'svcMore' }, prefill: { service: 'ceramic' } },
]

export default function Services() {
  const { t, lang } = useI18n()

  return (
    <section id="services" className="section section-light">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{t('svcHeadline')}</h2>
        </div>

        <div className="services-grid cards-4">
          {SERVICES.map((svc) => {
            const diagram = svc.diagram ? diagrams[`../assets/protection/${svc.diagram}.${lang}.svg`] : null
            const moreHref = svc.more && (typeof svc.more.href === 'string' ? svc.more.href : svc.more.href[lang])
            const showBadge = !svc.isNew || Date.now() < NEW_UNTIL
            return (
              <article key={svc.key} className="card card--media">
                <div className="svc-media">
                  {diagram
                    ? <div className="svc-diagram" dangerouslySetInnerHTML={{ __html: diagram }} />
                    : <img src={svc.img} alt="" width="800" height="560" loading="lazy" decoding="async" />}
                  {showBadge && <span className={`svc-badge svc-badge--${svc.badgeTone}`}>{t(`${svc.key}Badge`)}</span>}
                </div>
                <div className="card-body">
                  <h3>{t(`${svc.key}Title`)}</h3>
                  <p style={{ marginBottom: '18px' }}>{t(`${svc.key}Desc`)}</p>
                  <ul className="check-list" style={{ marginBottom: '24px', flex: 1 }}>
                    {[1, 2, 3, 4].map((n) => (
                      <li key={n}><Icon name="check" size={16} strokeWidth={2.25} />{t(`${svc.key}F${n}`)}</li>
                    ))}
                  </ul>
                  <div className="card-actions">
                    <a href="#contact" className="btn btn-primary"
                      onClick={() => prefill.set(svc.prefill)}
                      data-track="service_card_click" data-location="services" data-service={svc.key}>
                      {t('svcQuote')}
                    </a>
                    {svc.more && (
                      <a href={moreHref} className="link-more"
                        data-track="service_more_click" data-location="services" data-service={svc.key}>
                        {t(svc.more.label)} <Icon name="arrow" size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
