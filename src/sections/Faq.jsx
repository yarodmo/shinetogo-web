import { useState } from 'react'
import { useI18n } from '../i18n'
import { track } from '../lib/track'

// Las dudas se resuelven ANTES del formulario (agua y luz, tiempos, marinas, pago, productos, tint y cerámico).
const FAQ_KEYS = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6']

export default function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="section section-dark">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-head">
          <h2 className="section-title">{t('faqTitle')}</h2>
        </div>
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
