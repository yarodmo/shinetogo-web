import { useI18n } from '../i18n'
import { waLink } from '../lib/site'
import StepArt from '../components/StepArt'

const STEPS = [
  { key: 'proc1', n: 1, num: '01' },
  { key: 'proc2', n: 2, num: '02' },
  { key: 'proc3', n: 3, num: '03' },
  { key: 'proc4', n: 4, num: '04' },
]

export default function Process() {
  const { t } = useI18n()

  return (
    <section className="section section-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blue" style={{ top: '50%', left: '-5%', transform: 'translateY(-50%)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="animated-fade-in" style={{
          textAlign: 'center', fontSize: 'clamp(24px, 3.5vw, 40px)',
          color: '#fff', maxWidth: '700px', margin: '0 auto 72px'
        }}>
          {t('processHeadline')}
        </h2>

        <div className="process-grid cards-4">
          {STEPS.map((s, i) => (
            <div key={i} className="animated-fade-in" style={{
              textAlign: 'center', padding: '32px 22px 36px',
              background: 'rgba(255,255,255,0.03)', borderRadius: '20px',
              border: '1px solid var(--border-dark)',
              position: 'relative'
            }}>
              <span className="step-num" data-num={s.num} aria-hidden="true" />
              <StepArt n={s.n} />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                {t(`${s.key}Title`)}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t(`${s.key}Desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="animated-fade-in" style={{
          marginTop: '72px', textAlign: 'center',
          padding: '60px 40px',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(139,92,246,0.08) 100%)',
          borderRadius: '24px', border: '1px solid rgba(14,165,233,0.15)'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
            {t('processCta')}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '32px' }}>
            {t('processCtaSub')}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary" style={{ padding: '16px 36px' }}
              data-track="cta_click" data-location="process">
              {t('heroCta1')}
            </a>
            <a href={waLink(t('whatsappText'))} target="_blank" rel="noopener noreferrer"
              className="btn btn-green" style={{ padding: '16px 36px' }}
              data-track="whatsapp_click" data-location="process">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
