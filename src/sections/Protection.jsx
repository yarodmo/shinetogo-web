import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { prefill } from '../lib/prefill'
import { waLink } from '../lib/site'

// Gráficos esquemáticos de marca (SVG propios, sin cifras). Se incrustan para heredar la tipografía de la página.
const svgs = import.meta.glob('../assets/protection/*.svg', { query: '?raw', import: 'default', eager: true })

function Diagram({ name, lang, label }) {
  const raw = svgs[`../assets/protection/${name}.${lang}.svg`]
  if (!raw) return null
  return <div className="prot-diagram" role="group" aria-label={label} dangerouslySetInnerHTML={{ __html: raw }} />
}

const FILMS = ['carbon', 'ceramic']

export default function Protection() {
  const { t, lang } = useI18n()
  const [tab, setTab] = useState('tint')

  // #tint / #ceramic abren su panel (enlaces desde anuncios y pie de página).
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace('#', '')
      if (h === 'tint' || h === 'ceramic') setTab(h)
    }
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [])

  const choose = (id) => {
    setTab(id)
    try { window.history.replaceState(null, '', `#${id}`) } catch { /* sin historial */ }
  }

  const quote = (service, film) => () => prefill.set({ service, film: film || '' })
  const waText = tab === 'tint' ? t('waTint') : t('waCeramic')
  const benefit = tab === 'tint' ? 'protB' : 'cerB' // cada servicio muestra solo sus propios beneficios

  const rows = [
    ['cmpR1', 'cmpR1a', 'cmpR1b'],
    ['cmpR2', 'cmpR2a', 'cmpR2b'],
    ['cmpR3', 'cmpR3a', 'cmpR3b'],
    ['cmpR4', 'cmpR4a', 'cmpR4b'],
  ]

  return (
    <section id="protection" className="section section-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blue" style={{ top: '10%', left: '-8%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-blue)', letterSpacing: '0.18em', marginBottom: '16px' }}>
            {t('protEyebrow')}
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff', marginBottom: '16px' }}>{t('protTitle')}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.7 }}>{t('protSub')}</p>
        </div>

        <div className="prot-tabs" role="group" aria-label={t('protGroupLabel')}>
          {[['tint', 'protTabTint'], ['ceramic', 'protTabCeramic']].map(([id, key]) => (
            <button key={id} type="button" aria-pressed={tab === id} onClick={() => choose(id)}
              className={tab === id ? 'prot-tab is-active' : 'prot-tab'}>
              {t(key)}
            </button>
          ))}
        </div>

        <div className="prot-benefits">
          {[1, 2, 3].map((n) => (
            <div key={`${tab}-${n}`} className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{t(`${benefit}${n}T`)}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t(`${benefit}${n}D`)}</p>
            </div>
          ))}
        </div>

        {/* ───────── Window tint ───────── */}
        <div id="tint" hidden={tab !== 'tint'} className="prot-panel" aria-labelledby="tint-h">
          <div className="prot-grid">
            <div>
              <h3 id="tint-h" style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>{t('tintH')}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>{t('tintLead')}</p>

              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-light)', margin: '0 0 10px', letterSpacing: '0.04em' }}>{t('cmpTitle')}</h4>
              <div className="prot-table-wrap">
                <table className="prot-table">
                  <thead>
                    <tr><th scope="col"><span className="sr-only">{t('cmpTitle')}</span></th><th scope="col">{t('cmpHead1')}</th><th scope="col">{t('cmpHead2')}</th></tr>
                  </thead>
                  <tbody>
                    {rows.map(([a, b, c]) => (
                      <tr key={a}><th scope="row">{t(a)}</th><td>{t(b)}</td><td>{t(c)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '10px 0 20px' }}>{t('cmpNote')}</p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {FILMS.map((f) => (
                  <a key={f} href="#contact" className="btn btn-outline" style={{ padding: '10px 18px', fontSize: '13px' }}
                    data-track="tint_film_select" data-film={f} data-service="tint" onClick={quote('tint', f)}>
                    {t('cmpUse')}: {t(f === 'carbon' ? 'cmpHead1' : 'cmpHead2')}
                  </a>
                ))}
              </div>
            </div>
            <div className="prot-visuals">
              <Diagram name="heat-path" lang={lang} label={t('protB1T')} />
              <Diagram name="film-layers" lang={lang} label={t('cmpTitle')} />
            </div>
          </div>

          <details className="prot-legal" id="legal">
            <summary>{t('legalTitle')}</summary>
            <div className="prot-legal-body">
              <div>
                <p>{t('legalP1')}</p>
                <p>{t('legalP2')}</p>
                <p>{t('legalP3')}</p>
                <p style={{ color: 'var(--text-muted)' }}>{t('legalP4')}</p>
              </div>
              <div className="prot-visuals">
                <Diagram name="fl-windows-map" lang={lang} label={t('legalTitle')} />
                <Diagram name="vlt-scale" lang={lang} label="VLT" />
              </div>
            </div>
          </details>
        </div>

        {/* ───────── Ceramic coating ───────── */}
        <div id="ceramic" hidden={tab !== 'ceramic'} className="prot-panel" aria-labelledby="ceramic-h">
          <div className="prot-grid">
            <div>
              <h3 id="ceramic-h" style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>{t('ceramicH')}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px' }}>{t('ceramicLead')}</p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.7, marginBottom: '22px', fontSize: '15px' }}>{t('ceramicHonest')}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {['cerS1', 'cerS2', 'cerS3'].map((k) => (
                  <li key={k} style={{ display: 'flex', gap: '10px', color: 'var(--text-light)', fontSize: '15px' }}>
                    <span style={{ color: 'var(--apex-amber)', flexShrink: 0 }} aria-hidden="true">✓</span>{t(k)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="prot-visuals">
              <Diagram name="ceramic-layers" lang={lang} label={t('ceramicH')} />
            </div>
          </div>
        </div>

        {/* ───────── Llamado a la acción común ───────── */}
        <div className="prot-cta">
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{t('ctaPhotosTitle')}</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t(tab === 'tint' ? 'ctaPhotosTint' : 'ctaPhotosCeramic')}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>{t('ctaWhere')}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className="btn btn-green" style={{ padding: '14px 24px' }}
              data-track="whatsapp_click" data-location={`protection_${tab}`} data-service={tab}>
              💬 {t('ctaWhatsapp')}
            </a>
            <a href="#contact" className="btn btn-primary" style={{ padding: '14px 24px' }} onClick={quote(tab)}
              data-track="package_select" data-location={`protection_${tab}`} data-service={tab}>
              {t('ctaForm')}
            </a>
            <a href={tab === 'tint' ? (lang === 'es' ? '/es/polarizado-de-vidrios/' : '/window-tint/') : (lang === 'es' ? '/es/recubrimiento-ceramico/' : '/ceramic-coating/')}
              className="btn btn-outline" style={{ padding: '14px 24px' }} data-track="guide_click" data-location={`protection_${tab}`} data-service={tab}>
              {t('protGuide')} →
            </a>
            {tab === 'tint' && (
              <a href="#legal" className="btn btn-outline" style={{ padding: '14px 24px' }}
                onClick={() => { const d = document.getElementById('legal'); if (d) d.open = true }}>
                {t('ctaLegal')}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
