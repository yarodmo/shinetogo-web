import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'

// Miniaturas y versiones grandes generadas por scripts/optimize-assets.cjs.
// Los videos no se descargan hasta que alguien los reproduce (preload="none" + póster).
const ITEMS = [
  { type: 'image', thumb: '/img/gallery/mobile-car-detailing-florida-exterior-wash-640.webp', src: '/img/gallery/mobile-car-detailing-florida-exterior-wash-1400.webp',
    label: { en: 'Exterior wash', es: 'Lavado exterior' }, tag: { en: 'Exterior', es: 'Exterior' } },
  // Este video se publicaba como "Ceramic Coating Finish", pero muestra un recorrido del interior de un auto.
  { type: 'video', src: '/video/ceramic-water-beading.mp4', poster: '/video/ceramic-water-beading-poster.webp',
    label: { en: 'Interior walkthrough', es: 'Recorrido del interior' }, tag: { en: 'Interior', es: 'Interior' } },
  { type: 'video', src: '/video/snow-foam-wash.mp4', poster: '/video/snow-foam-wash-poster.webp',
    label: { en: 'Foam wash', es: 'Lavado con espuma' }, tag: { en: 'Exterior', es: 'Exterior' } },
  { type: 'image', thumb: '/img/gallery/interior-car-cleaning-deep-shampoo-640.webp', src: '/img/gallery/interior-car-cleaning-deep-shampoo-1400.webp',
    label: { en: 'Gloss and reflections', es: 'Brillo y reflejos' }, tag: { en: 'Exterior', es: 'Exterior' } },
  { type: 'image', thumb: '/img/gallery/team-at-work-640.webp', src: '/img/gallery/team-at-work-1195.webp',
    label: { en: 'Our team at work', es: 'Nuestro equipo trabajando' }, tag: { en: 'Mobile', es: 'Móvil' } },
  { type: 'image', thumb: '/img/gallery/boat-detailing-gelcoat-polishing-640.webp', src: '/img/gallery/boat-detailing-gelcoat-polishing-1400.webp',
    label: { en: 'Boat gelcoat polish', es: 'Pulido de gelcoat' }, tag: { en: 'Boats', es: 'Botes' } },
]

const FOCUSABLE = 'button, [href], video[controls], [tabindex]:not([tabindex="-1"])'

export default function Gallery() {
  const { t, lang } = useI18n()
  const [active, setActive] = useState(null)
  const dialogRef = useRef(null)

  // Lightbox accesible: Escape cierra, el foco entra al diálogo y no se escapa con Tab,
  // el fondo no se desplaza y el foco vuelve al elemento que lo abrió.
  useEffect(() => {
    if (active === null) return undefined
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('button')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') { setActive(null); return }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
      if (!items.length) { e.preventDefault(); return }
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (opener && opener.focus) opener.focus()
    }
  }, [active])

  const current = active === null ? null : ITEMS[active]

  return (
    <>
      {/* GALLERY */}
      <section id="gallery" className="section section-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="animated-fade-in" style={{
              fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-dark)'
            }}>{t('galleryTitle')}</h2>
            <p className="animated-fade-in" style={{ marginTop: '12px', color: 'var(--text-body)', fontSize: '17px' }}>
              {t('gallerySub')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
            {ITEMS.map((item, i) => (
              <div key={item.src} className="light-card animated-fade-in" style={{ overflow: 'hidden' }}>
                <button type="button" onClick={() => setActive(i)}
                  aria-label={`${item.type === 'video' ? 'Video: ' : ''}${item.label[lang]}`}
                  style={{ display: 'block', width: '100%', padding: 0, border: 0, background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ position: 'relative', paddingTop: '70%', background: '#f1f5f9' }}>
                    {item.type === 'video' ? (
                      <>
                        <video src={item.src} poster={item.poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
                          onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                          onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span aria-hidden="true" style={{ position: 'absolute', right: 12, bottom: 12, background: 'rgba(0,0,0,.6)', color: '#fff', borderRadius: 99, padding: '4px 10px', fontSize: 12, fontWeight: 700 }}>▶ Video</span>
                      </>
                    ) : (
                      <img src={item.thumb} alt={item.label[lang]} width="640" height="448" loading="lazy" decoding="async"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                </button>
                <div style={{ padding: '20px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, color: 'var(--brand-blue-text)',
                    textTransform: 'uppercase', letterSpacing: '0.08em'
                  }}>{item.tag[lang]}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginTop: '4px' }}>
                    {item.label[lang]}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {current && (
        <div ref={dialogRef} onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-label={current.label[lang]}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}>
          <button type="button" onClick={() => setActive(null)} aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer', minWidth: '44px', minHeight: '44px' }}>✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', width: '90%' }}>
            {current.type === 'video' ? (
              <video src={current.src} poster={current.poster} controls autoPlay playsInline
                style={{ width: '100%', maxHeight: '75vh', borderRadius: '16px' }} />
            ) : (
              <img src={current.src} alt={current.label[lang]}
                style={{ width: '100%', maxHeight: '75vh', borderRadius: '16px', objectFit: 'contain' }} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
