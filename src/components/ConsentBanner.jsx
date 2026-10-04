import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { HAS_TRACKING } from '../lib/site'
import { getConsent, setConsent } from '../lib/track'

// Solo aparece si hay herramientas de medición configuradas y aún no se eligió
// (o si la persona lo reabre desde "Opciones de privacidad" en el pie).
// Aceptar y Rechazar son idénticos en tamaño, estilo y jerarquía.
export default function ConsentBanner() {
  const { t, lang } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(HAS_TRACKING && getConsent() === null)
    const open = () => setShow(HAS_TRACKING)
    window.addEventListener('stg:consent-open', open)
    return () => window.removeEventListener('stg:consent-open', open)
  }, [])
  if (!show) return null

  const choose = (value) => { setConsent(value); setShow(false) }

  return (
    <div className="consent-banner" role="dialog" aria-modal="false" aria-label={t('consentTitle')}>
      <h4>{t('consentTitle')}</h4>
      <p>{t('consentBody')}</p>
      <div className="row">
        <button type="button" className="btn btn-ghost" onClick={() => choose('denied')}>{t('consentReject')}</button>
        <button type="button" className="btn btn-ghost" onClick={() => choose('granted')}>{t('consentAccept')}</button>
      </div>
      <p style={{ margin: '12px 0 0' }}>
        <a href={lang === 'es' ? '/es/privacidad/' : '/privacy/'}>{t('consentMore')}</a>
      </p>
    </div>
  )
}
