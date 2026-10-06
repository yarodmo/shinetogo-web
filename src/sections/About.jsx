import { useI18n } from '../i18n'
import Icon from '../components/Icon'

// Por qué importa aquí: lo que el clima de Florida le hace al acabado, y cómo damos el precio.
// Los datos de lovebugs vienen de UF/IFAS IN204 (docs/BRAND.md): restos ligeramente ácidos, daño tras varios días.
const CARDS = [
  { key: 'why1', icon: 'bug' },
  { key: 'why2', icon: 'waves' },
  { key: 'why3', icon: 'receipt' },
]

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="section section-dark">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('whyEyebrow')}</span>
          <h2 className="section-title">{t('whyTitle')}</h2>
        </div>
        <div className="cards-3">
          {CARDS.map((c) => (
            <div key={c.key} className="card">
              <div className="icon-pill"><Icon name={c.icon} size={24} /></div>
              <h3>{t(`${c.key}Title`)}</h3>
              <p>{t(`${c.key}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
