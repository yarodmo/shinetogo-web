import { useI18n } from '../i18n'
import { AREAS, AREA_COPY } from '../lib/site'
import Icon from '../components/Icon'

// Zonas reales del dueño, de una sola fuente (src/content/business.js). Sin páginas por ciudad.
// La nota de tint/cerámico va solo aquí: las páginas estáticas comparten AREA_COPY y la de cerámico no nombra el polarizado.
export default function Areas() {
  const { t, lang } = useI18n()
  return (
    <section id="areas" className="section section-white">
      <div className="container">
        <div className="section-head" style={{ marginBottom: '32px' }}>
          <h2 className="section-title">{t('areasTitle')}</h2>
          <p className="section-sub">{AREA_COPY[lang]}</p>
        </div>
        <ul className="area-chips">
          {AREAS.map((a) => (
            <li key={a}><Icon name="pin" size={16} />{a}</li>
          ))}
        </ul>
        <p className="section-sub" style={{ textAlign: 'center', marginTop: '24px' }}>{t('areasNote')}</p>
      </div>
    </section>
  )
}
