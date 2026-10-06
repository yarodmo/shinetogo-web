import { useI18n } from '../i18n'
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
    <section id="process" className="section section-light">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{t('processHeadline')}</h2>
        </div>

        <ol className="process-grid cards-4" style={{ listStyle: 'none' }}>
          {STEPS.map((s) => (
            <li key={s.key} className="card" style={{ textAlign: 'center', position: 'relative' }}>
              <span className="step-num" data-num={s.num} aria-hidden="true" />
              <StepArt n={s.n} />
              <h3>{t(`${s.key}Title`)}</h3>
              <p>{t(`${s.key}Desc`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
