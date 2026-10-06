import { useState } from 'react'
import { useI18n } from '../i18n'
import { track } from '../lib/track'

// Mismas preguntas que el JSON-LD FAQPage de index.html (agua y luz, tiempos, marinas, pago, productos, tint y cerámico).
const FAQ_KEYS = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6']

export default function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="section section-dark" style={{ paddingTop: '60px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="animated-fade-in" style={{
          textAlign: 'center', fontSize: 'clamp(22px, 3vw, 36px)',
          color: '#fff', marginBottom: '48px'
        }}>
          {t('faqTitle')}
        </h2>
        {FAQ_KEYS.map((key, i) => (
          <div key={key} className="faq-item">
            <button type="button" id={`faq-q-${i}`} aria-expanded={open === i} aria-controls={`faq-a-${i}`} onClick={() => {
              setOpen(open === i ? null : i)
              if (open !== i) track('faq_open', { faq_id: key })
            }}>
              <span>{t(`${key}Q`)}</span>
              <span className="plus" aria-hidden="true" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {/* La respuesta siempre está en el DOM (buscadores y asistentes la leen); solo se oculta a la vista. */}
            <p id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={open !== i}>{t(`${key}A`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
