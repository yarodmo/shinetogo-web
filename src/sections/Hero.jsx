import { useState, useEffect, useCallback } from 'react'
import { useI18n } from '../i18n'
import { waLink } from '../lib/site'
import Icon from '../components/Icon'

// Versiones 640/1080 (4:3) generadas por scripts/optimize-assets.cjs.
const SLIDES = [
  { base: '/img/hero/van', wide: 1080, label: { en: 'Mobile detailing', es: 'Detallado móvil' } },
  { base: '/img/hero/finish', wide: 1080, label: { en: 'Exterior Finish', es: 'Acabado Exterior' } },
  // La foto del pulido (polish-*) se retiró: matrícula británica legible y logo que no es el real (docs/OPEN-QUESTIONS #43).
  { base: '/img/hero/action', wide: 1080, label: { en: 'Snow Foam Wash', es: 'Lavado con Espuma' } },
]

const CHECKS = ['heroCheck1', 'heroCheck2', 'heroCheck3']

// Mismo hero que las páginas de polarizado y cerámico (src/shared.css): foto a todo el ancho, titular corto, una línea, botones y tres marcas.
export default function Hero() {
  const { t, lang } = useI18n()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="hero" className="hero hero-dark tone-dark">
      <div className="hero-media">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.base}
            src={`${slide.base}-1080.webp`}
            srcSet={`${slide.base}-640.webp 640w, ${slide.base}-${slide.wide}.webp ${slide.wide}w`}
            sizes="100vw"
            width="1080" height="810"
            alt={slide.label[lang]}
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={current === i ? '' : 'is-off'}
            aria-hidden={current === i ? undefined : 'true'}
          />
        ))}
        <div className="hero-dots">
          {SLIDES.map((s, i) => (
            <button key={s.base} type="button" onClick={() => setCurrent(i)} aria-label={s.label[lang]} aria-current={current === i} />
          ))}
        </div>
      </div>
      <div className="container hero-inner">
        <p className="eyebrow">{t('heroTag')}</p>
        <h1>{t('heroTitle')}</h1>
        <p className="hero-line">{t('heroSub')}</p>
        <div className="cta-row">
          <a href="#contact" className="btn btn-primary" data-track="cta_click" data-location="hero">{t('heroCta1')}</a>
          <a href={waLink(t('whatsappText'))} target="_blank" rel="noopener noreferrer" className="btn btn-green btn-icon"
            aria-label={t('heroCta2')} title={t('heroCta2')} data-track="whatsapp_click" data-location="hero">
            <Icon name="whatsapp" size={24} />
          </a>
        </div>
        <ul className="hero-checks">
          {CHECKS.map((k) => <li key={k}>{t(k)}</li>)}
        </ul>
      </div>
    </section>
  )
}
