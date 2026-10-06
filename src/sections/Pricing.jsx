import { useI18n } from '../i18n'
import { prefill } from '../lib/prefill'
import Icon from '../components/Icon'

const PKGS = [
  { key: 'pkg1', service: 'express' },
  { key: 'pkg2', service: 'full', featured: true },
  { key: 'pkg3', service: 'premium' },
]

export default function Pricing() {
  const { t } = useI18n()

  return (
    <section id="pricing" className="section section-white">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{t('pricingHeadline')}</h2>
          <p className="section-sub">{t('pricingSub')}</p>
        </div>

        <div className="pricing-grid cards-3">
          {PKGS.map((pkg) => (
            <div key={pkg.key} className={`card card--plan${pkg.featured ? ' is-featured' : ''}`}>
              {pkg.featured && <span className="svc-badge svc-badge--gold">{t('pricingBadgeText')}</span>}
              <h3 style={{ fontSize: '22px', marginBottom: '4px' }}>{t(`${pkg.key}Title`)}</h3>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-body)', marginBottom: '24px' }}>{t(`${pkg.key}Time`)}</span>
              <ul className="check-list" style={{ flex: 1, marginBottom: '28px' }}>
                {[1, 2, 3].map((n) => (
                  <li key={n}><Icon name="check" size={16} strokeWidth={2.25} />{t(`${pkg.key}F${n}`)}</li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${pkg.featured ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}
                data-track="package_select" data-location="pricing" data-service={pkg.service}
                onClick={() => prefill.set({ service: pkg.service })}>
                {t('pkgSelect')}
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '36px', color: 'var(--text-body)', fontSize: '15px' }}>
          {t('pkgHelp')}{' '}
          <a href="#contact" className="link-more">{t('pkgHelpCta')}</a>
        </p>
      </div>
    </section>
  )
}
