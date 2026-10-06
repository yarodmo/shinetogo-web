import { useI18n } from '../i18n'
import { AREAS, AREA_COPY } from '../lib/site'

// Zonas reales del dueño, de una sola fuente (src/content/business.js). Sin páginas por ciudad.
// Ocupa el lugar de la antigua sección de reseñas (se retiró: no eran reseñas verificables).
// La nota de tint/cerámico va solo aquí: las páginas estáticas comparten AREA_COPY y la de cerámico no nombra el polarizado.
export default function Areas() {
  const { t, lang } = useI18n()
  return (
    <section id="areas" className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blue" style={{ top: '10%', left: '-10%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="animated-fade-in" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff' }}>
            {t('areasTitle')}
          </h2>
          <p className="animated-fade-in" style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.7 }}>
            {AREA_COPY[lang]}
          </p>
        </div>
        <ul className="area-chips">
          {AREAS.map((a) => <li key={a}>{a}</li>)}
        </ul>
        <p style={{ textAlign: 'center', marginTop: '28px', color: 'var(--text-muted)', fontSize: '14px' }}>{t('areasNote')}</p>
      </div>
    </section>
  )
}
