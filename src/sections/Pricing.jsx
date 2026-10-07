import { useI18n } from '../i18n'
import { waLink } from '../lib/site'
import { prefill } from '../lib/prefill'

const PKGS = [
  { key: 'pkg1', service: 'express', accent: 'var(--titanium)' },
  { key: 'pkg2', service: 'full', accent: 'var(--apex-amber)', popular: true },
  { key: 'pkg3', service: 'premium', accent: 'var(--titanium)' },
]

export default function Pricing() {
  const { t } = useI18n()

  return (
    <section id="pricing" className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="animated-fade-in" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff' }}>
            {t('pricingHeadline')}
          </h2>
          <p className="animated-fade-in" style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '17px' }}>
            {t('pricingSub')}
          </p>
        </div>

        <div className="pricing-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '20px', alignItems: 'stretch'
        }}>
          {PKGS.map((pkg) => (
            <div key={pkg.key} className="glass-card animated-fade-in" style={{
              display: 'flex', flexDirection: 'column', padding: '36px 28px',
              borderTop: `3px solid ${pkg.accent}`,
              position: 'relative'
            }}>
              {pkg.popular && (
                <div className="badge" style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'var(--apex-amber)', color: '#000', fontSize: '10px'
                }}>{t('pricingBadgeText')}</div>
              )}

              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {t(`${pkg.key}Title`)}
              </h3>
              <span style={{
                fontSize: '13px', color: pkg.accent, fontWeight: 700,
                marginBottom: '24px', display: 'block'
              }}>
                {t(`${pkg.key}Time`)}
              </span>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, marginBottom: '28px' }}>
                {[1, 2, 3].map(n => (
                  <li key={n} style={{
                    fontSize: '14px', display: 'flex', gap: '10px',
                    color: 'var(--text-light)', fontWeight: 500
                  }}>
                    <span aria-hidden="true" style={{ color: pkg.accent, flexShrink: 0 }}>✓</span>
                    {t(`${pkg.key}F${n}`)}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="btn btn-outline" style={{
                width: '100%', borderColor: pkg.accent, color: pkg.accent
              }}
                onClick={() => prefill.set({ service: pkg.service })}
                data-track="package_select" data-location="pricing" data-service={pkg.service}>
                {t('pkgSelect')}
              </a>
            </div>
          ))}
        </div>

        {/* Help prompt */}
        <div className="animated-fade-in" style={{
          textAlign: 'center', marginTop: '48px',
          padding: '24px', background: 'rgba(14, 165, 233, 0.06)',
          borderRadius: '16px', border: '1px solid rgba(14, 165, 233, 0.1)'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            {t('pkgHelp')}{' '}
            <a href={waLink(t('whatsappText'))} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-location="pricing_help" style={{ color: 'var(--brand-blue-text)', fontWeight: 700 }}>{t('pkgHelpCta')}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
