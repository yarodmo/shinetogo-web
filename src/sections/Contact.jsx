import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { prefill, prefillFromUrl } from '../lib/prefill'
import { submitLead, newLeadId } from '../lib/leads'
import { track } from '../lib/track'
import { FORM } from '../content/forms'
import { BRAND_NAME, PHONE_DISPLAY, PHONE_TEL, waLink } from '../lib/site'

const FAQ_KEYS = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5']

const VEHICLES = [
  { id: 'car', en: 'Car / Sedan', es: 'Carro / Sedán' },
  { id: 'suv', en: 'SUV / Truck', es: 'SUV / Camioneta' },
  { id: 'exotic', en: 'Exotic / Luxury', es: 'Exótico / Lujo' },
  { id: 'rv', en: 'RV / Camper', es: 'RV / Camper' },
  { id: 'boat', en: 'Boat / Yacht', es: 'Bote / Yate' },
]

const SERVICE_LABELS = {
  express: { en: 'Express Wash', es: 'Lavado Express' },
  full: { en: 'Full Detail', es: 'Full Detail' },
  premium: { en: 'Premium Detail', es: 'Premium Detail' },
  tint: { en: 'Window Tint', es: 'Polarizado de vidrios' },
  ceramic: { en: 'Ceramic Coating', es: 'Recubrimiento cerámico' },
  boat: { en: 'Boat Detailing', es: 'Detallado de Botes' },
}
// Tint y cerámico son dos servicios distintos y solo para autos; los botes tienen su propio servicio.
const AUTO_SERVICES = ['express', 'full', 'premium', 'tint', 'ceramic']
// v2: texto reescrito tras la revisión de cumplimiento; una versión por idioma (docs/CONSENT-TEXT.md).
const consentVersion = (lang) => `v2-${lang}`
// La fecha mínima es la de hoy en la zona del visitante (toISOString usa UTC y a la noche ya marca mañana).
const todayLocal = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const PROTECTION_SERVICES = ['tint', 'ceramic']

const EMPTY = {
  name: '', phone: '', email: '', vehicle_type: '', vehicle: '', service: '', date: '', time: '',
  message: '', zip: '', coverage: [], ceramic_areas: [], film: '', has_old_tint: false, consent_sms: false, company_url: '',
}

export default function Contact() {
  const { t, lang } = useI18n()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorKind, setErrorKind] = useState('')
  const [result, setResult] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const leadId = useRef(newLeadId())
  const started = useRef(false)

  const isBoat = form.vehicle_type === 'boat'
  // Tint y cerámico son solo para autos de pasajeros: ni botes ni RV.
  const serviceOptions = isBoat ? ['boat'] : form.vehicle_type === 'rv' ? AUTO_SERVICES.filter((id) => !PROTECTION_SERVICES.includes(id)) : AUTO_SERVICES
  const wantsTint = form.service === 'tint'
  const wantsCeramic = form.service === 'ceramic'
  const options = FORM[lang]
  const label = (id) => SERVICE_LABELS[id]?.[lang] || id
  const vehicleLabel = (id) => VEHICLES.find((v) => v.id === id)?.[lang] || ''
  const privacyHref = lang === 'es' ? '/es/privacidad/' : '/privacy/'

  // Los paquetes de Pricing pre-seleccionan el servicio.
  useEffect(() => {
    const apply = (p) => {
      if (!p.service && !p.film) return
      setForm((f) => ({
        ...f,
        service: p.service || f.service,
        film: p.film || f.film,
        vehicle_type: f.vehicle_type === 'boat' && p.service !== 'boat' ? '' : f.vehicle_type,
      }))
    }
    prefillFromUrl()
    apply(prefill.get())
    return prefill.subscribe(apply)
  }, [])

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))
  const toggleIn = (field, id) =>
    set({ [field]: form[field].includes(id) ? form[field].filter((c) => c !== id) : [...form[field], id] })

  const msgs = {
    phone: lang === 'en' ? 'Enter a valid 10-digit number' : 'Ingresa un teléfono válido de 10 dígitos',
    email: lang === 'en' ? 'Enter a valid email or leave it blank' : 'Ingresa un email válido o déjalo vacío',
    required: lang === 'en' ? 'Required' : 'Obligatorio',
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = msgs.required
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = msgs.phone
    if (form.email.trim() && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(form.email.trim())) e.email = msgs.email
    if (!form.vehicle_type) e.vehicle_type = msgs.required
    if (!form.service) e.service = msgs.required
    setErrors(e)
    const first = ['name', 'phone', 'email', 'vehicle_type', 'service'].find((k) => e[k])
    if (first) {
      // En móvil los errores quedan fuera de pantalla: se lleva el foco al primer campo inválido.
      const target = document.getElementById({ vehicle_type: 'f-vehicle-type' }[first] || `f-${first}`)
      if (target) target.focus()
    }
    return !first
  }

  const submit = async (ev) => {
    ev.preventDefault()
    if (status === 'sending') return
    if (!validate()) { setStatus('error'); setErrorKind('validation'); return }
    setStatus('sending')
    setErrorKind('')
    try {
      const data = await submitLead({
        lead_id: leadId.current,
        name: form.name, phone: form.phone, email: form.email,
        service: form.service, vehicle_type: form.vehicle_type, vehicle: form.vehicle,
        coverage: wantsTint ? form.coverage : [], ceramic_areas: wantsCeramic ? form.ceramic_areas : [], film: wantsTint ? form.film : '',
        has_old_tint: wantsTint ? form.has_old_tint : false,
        zip: form.zip, date: form.date, time: form.time, message: form.message,
        lang, consent_sms: form.consent_sms, consent_text_version: consentVersion(lang),
        company_url: form.company_url,
      })
      setResult(data)
      setStatus('success')
      track('lead_submit', { lead_id: data.lead_id, service: form.service, vehicle_type: form.vehicle_type, language: lang })
    } catch (err) {
      setStatus('error')
      setErrorKind(err.kind || 'server')
      if (err.kind === 'validation' && err.fields) {
        const fe = {}
        for (const k of Object.keys(err.fields)) fe[k] = k === 'phone' ? msgs.phone : k === 'email' ? msgs.email : msgs.required
        setErrors(fe)
      }
      track('form_error', { kind: err.kind || 'server', location: 'home' })
    }
  }

  const ref = (result?.lead_id || leadId.current).slice(0, 4).toUpperCase()
  const waAfter = waLink(
    lang === 'en'
      ? `Hi! I just sent a quote request (Ref ${ref}). Service: ${label(form.service)}.${form.vehicle ? ` Car: ${form.vehicle}.` : ''} I'll send photos here.`
      : `¡Hola! Acabo de enviar una solicitud de cotización (Ref ${ref}). Servicio: ${label(form.service)}.${form.vehicle ? ` Auto: ${form.vehicle}.` : ''} Te envío las fotos por aquí.`
  )

  const inputCls = 'form-input form-input-light'
  const fieldErr = (k) => errors[k] && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors[k]}</span>

  return (
    <>
      {/* CONTACT */}
      <section id="contact" className="section section-light" style={{ paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="animated-fade-in" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-dark)' }}>
              {t('contactTitle')}
            </h2>
            <p className="animated-fade-in" style={{ marginTop: '12px', color: 'var(--text-body)', fontSize: '17px' }}>
              {t('contactSub')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>
            {/* FORM */}
            {status !== 'success' ? (
              <form onSubmit={submit} noValidate className="light-card animated-fade-in" aria-busy={status === 'sending'}
                onFocusCapture={() => { if (!started.current) { started.current = true; track('form_start') } }}
                style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
                  <div>
                    <input id="f-name" type="text" maxLength={80} autoComplete="name" placeholder={t('formName')} aria-label={t('formName')}
                      aria-invalid={errors.name ? 'true' : undefined} className={`${inputCls} ${errors.name ? 'input-error' : ''}`} value={form.name} onChange={(e) => set({ name: e.target.value })} />
                    {fieldErr('name')}
                  </div>
                  <div>
                    <input id="f-phone" type="tel" inputMode="tel" maxLength={30} autoComplete="tel" placeholder={t('formPhone')} aria-label={t('formPhone')}
                      aria-invalid={errors.phone ? 'true' : undefined} className={`${inputCls} ${errors.phone ? 'input-error' : ''}`} value={form.phone} onChange={(e) => set({ phone: e.target.value })} />
                    {fieldErr('phone')}
                  </div>
                </div>

                <div>
                  <input id="f-email" type="email" maxLength={120} autoComplete="email" placeholder={t('formEmail')} aria-label={t('formEmail')}
                    aria-invalid={errors.email ? 'true' : undefined} className={`${inputCls} ${errors.email ? 'input-error' : ''}`} value={form.email} onChange={(e) => set({ email: e.target.value })} />
                  {fieldErr('email')}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
                  <div>
                    <select id="f-vehicle-type" aria-label={t('formVehicle')} aria-invalid={errors.vehicle_type ? 'true' : undefined} className={`${inputCls} ${errors.vehicle_type ? 'input-error' : ''}`}
                      style={{ appearance: 'none' }} value={form.vehicle_type}
                      onChange={(e) => {
                        const v = e.target.value
                        set({ vehicle_type: v, service: v === 'boat' ? 'boat' : (form.service === 'boat' || (v === 'rv' && PROTECTION_SERVICES.includes(form.service)) ? '' : form.service) })
                      }}>
                      <option value="" disabled hidden>{t('formVehicle')}</option>
                      {VEHICLES.map((v) => <option key={v.id} value={v.id}>{v[lang]}</option>)}
                    </select>
                    {fieldErr('vehicle_type')}
                  </div>
                  <div>
                    <select id="f-service" aria-label={t('formService')} aria-invalid={errors.service ? 'true' : undefined} className={`${inputCls} ${errors.service ? 'input-error' : ''}`}
                      style={{ appearance: 'none' }} value={form.service} onChange={(e) => set({ service: e.target.value })}>
                      <option value="" disabled hidden>{t('formService')}</option>
                      {serviceOptions.map((id) => <option key={id} value={id}>{label(id)}</option>)}
                    </select>
                    {fieldErr('service')}
                  </div>
                </div>

                <input id="f-vehicle" type="text" maxLength={80} placeholder={t('formVehicleText')} aria-label={t('formVehicleText')}
                  className={inputCls} value={form.vehicle} onChange={(e) => set({ vehicle: e.target.value })} />

                {wantsTint && (
                  <details className="form-details" open>
                    <summary>{t('formDetails')}</summary>
                    <div className="form-details-body">
                      <div>
                        <span className="form-group-label">{options.windowsLabel}</span>
                        <div className="chip-row">
                          {options.windows.map(([id, text]) => (
                            <label key={id} className="chip-opt">
                              <input type="checkbox" checked={form.coverage.includes(id)} onChange={() => toggleIn('coverage', id)} />{text}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="form-group-label">{options.filmLabel}</span>
                        <div className="chip-row">
                          {options.films.map(([id, text]) => (
                            <label key={id} className="chip-opt">
                              <input type="radio" name="film" checked={form.film === id} onChange={() => set({ film: id })} />{text}
                            </label>
                          ))}
                        </div>
                      </div>
                      <label className="chip-opt" style={{ alignSelf: 'start' }}>
                        <input type="checkbox" checked={form.has_old_tint} onChange={(e) => set({ has_old_tint: e.target.checked })} />{options.oldTint}
                      </label>
                    </div>
                  </details>
                )}

                {wantsCeramic && (
                  <details className="form-details" open>
                    <summary>{t('formDetails')}</summary>
                    <div className="form-details-body">
                      <div>
                        <span className="form-group-label">{options.areasLabel}</span>
                        <div className="chip-row">
                          {options.areas.map(([id, text]) => (
                            <label key={id} className="chip-opt">
                              <input type="checkbox" checked={form.ceramic_areas.includes(id)} onChange={() => toggleIn('ceramic_areas', id)} />{text}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '16px' }}>
                  <input id="f-zip" type="text" maxLength={10} inputMode="numeric" autoComplete="postal-code" placeholder={t('formZip')} aria-label={t('formZip')}
                    className={inputCls} value={form.zip} onChange={(e) => set({ zip: e.target.value })} />
                  <input id="f-date" type="date" aria-label={t('formDate')} className={inputCls}
                    min={todayLocal()} value={form.date} onChange={(e) => set({ date: e.target.value })}
                    style={{ color: form.date ? 'inherit' : '#64748b' }} />
                  <select id="f-time" aria-label={t('formTime')} className={inputCls} style={{ appearance: 'none' }}
                    value={form.time} onChange={(e) => set({ time: e.target.value })}>
                    <option value="">{t('formTime')}</option>
                    <option value="Morning">{t('timeMorning')}</option>
                    <option value="Afternoon">{t('timeAfternoon')}</option>
                  </select>
                </div>
                <p className="form-note" style={{ marginTop: '-6px' }}>{t('formAvailability')}</p>

                <textarea id="f-message" placeholder={t('formMsg')} aria-label={t('formMsg')} className={inputCls} rows={3} maxLength={1000}
                  style={{ resize: 'none', fontFamily: 'inherit' }} value={form.message} onChange={(e) => set({ message: e.target.value })} />

                {/* Trampa para bots: las personas no lo ven ni lo llenan */}
                <div className="hp-field" aria-hidden="true">
                  <label>Company URL<input type="text" name="company_url" tabIndex={-1} autoComplete="off" value={form.company_url} onChange={(e) => set({ company_url: e.target.value })} /></label>
                </div>

                <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <input type="checkbox" id="f-consent" checked={form.consent_sms} onChange={(e) => set({ consent_sms: e.target.checked })}
                    style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: 'var(--brand-blue)', flexShrink: 0 }} />
                  <span className="form-note">
                    {t('formConsent').replace('{brand}', BRAND_NAME)}{' '}
                    <a href={privacyHref} style={{ color: 'var(--brand-blue-text)', textDecoration: 'underline' }}>{t('formPrivacyLink')}</a>
                    {' · '}
                    <a href={`${privacyHref}#messaging`} style={{ color: 'var(--brand-blue-text)', textDecoration: 'underline' }}>{t('formMessagingLink')}</a>
                  </span>
                </label>

                {status === 'error' && (
                  <div className="form-alert" role="alert">
                    <strong>{errorKind === 'validation' ? t('formErrFields') : t('formErrTitle')}</strong>{' '}
                    {errorKind !== 'validation' && t('formErrBody')}
                    {errorKind !== 'validation' && (
                      <span style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                        <a href={waLink(lang === 'en' ? 'Hi! I tried to send a quote request on your website.' : '¡Hola! Intenté enviar una solicitud de cotización en su sitio.')}
                          target="_blank" rel="noopener noreferrer" className="btn btn-green" style={{ padding: '10px 18px', fontSize: '13px' }}
                          data-track="whatsapp_click" data-location="form_error">💬 WhatsApp</a>
                        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline" style={{ padding: '10px 18px', fontSize: '13px', color: 'var(--text-dark)', borderColor: 'var(--border-light)' }}
                          data-track="call_click" data-location="form_error">{PHONE_DISPLAY}</a>
                      </span>
                    )}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}
                  style={{ width: '100%', padding: '18px', fontSize: '15px', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? t('formSending') : status === 'error' && errorKind !== 'validation' ? t('formRetry') : t('formSubmit')}
                </button>
                <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-body)', marginTop: '4px' }}>{t('formPrivacy')}</p>
              </form>
            ) : (
              <div className="light-card animated-fade-in" role="status" style={{ textAlign: 'center', padding: '64px 32px', border: '2px solid var(--brand-green)' }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }} aria-hidden="true">✅</div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-dark)', marginBottom: '12px' }}>{t('successTitle')}</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '16px', lineHeight: 1.6, marginBottom: '8px' }}>{t('successBody')}</p>
                <p className="form-note" style={{ marginBottom: '24px' }}>{t('successRef')}: <strong>{ref}</strong></p>
                <a href={waAfter} target="_blank" rel="noopener noreferrer" className="btn btn-green" style={{ padding: '16px 36px' }}
                  data-track="whatsapp_click" data-location="post_form" data-service={form.service}>
                  💬 {t('successWhatsapp')}
                </a>
              </div>
            )}

            {/* SIDEBAR — WhatsApp + Call */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="light-card animated-fade-in" style={{ padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }} aria-hidden="true">💬</div>
                <h3 style={{ fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>{t('formWhatsapp')}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-body)', marginBottom: '16px', lineHeight: 1.5 }}>{t('formWhatsappSub')}</p>
                <a href={waLink(t('whatsappText'))} target="_blank" rel="noopener noreferrer" className="btn btn-green" style={{ width: '100%' }}
                  data-track="whatsapp_click" data-location="contact_card">
                  {t('formWhatsappCta')}
                </a>
              </div>

              <div className="light-card animated-fade-in" style={{ padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }} aria-hidden="true">📞</div>
                <h3 style={{ fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>{t('formCallTitle')}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-body)', marginBottom: '16px' }}>{t('formCallSub')}</p>
                <a href={`tel:${PHONE_TEL}`} className="btn btn-outline" style={{ width: '100%', color: 'var(--text-dark)', borderColor: 'var(--border-light)' }}
                  data-track="call_click" data-location="contact_card">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section section-dark" style={{ paddingTop: '60px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="animated-fade-in" style={{ textAlign: 'center', fontSize: 'clamp(22px, 3vw, 36px)', color: '#fff', marginBottom: '48px' }}>
            {t('faqTitle')}
          </h2>

          {FAQ_KEYS.map((key, i) => (
            <div key={key} style={{ borderBottom: '1px solid var(--border-dark)', padding: '20px 0' }}>
              <button type="button" id={`faq-q-${i}`} aria-expanded={openFaq === i} aria-controls={`faq-a-${i}`} onClick={() => {
                setOpenFaq(openFaq === i ? null : i)
                if (openFaq !== i) track('faq_open', { faq_id: key })
              }} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: '16px', padding: 0, textAlign: 'left'
              }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '16px' }}>{t(`${key}Q`)}</span>
                <span aria-hidden="true" style={{
                  color: 'var(--brand-blue)', fontSize: '22px', flexShrink: 0,
                  transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s'
                }}>+</span>
              </button>
              {/* La respuesta siempre está en el DOM (buscadores y asistentes la leen); solo se oculta a la vista. */}
              <p id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={openFaq !== i}
                style={{ marginTop: '14px', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, paddingRight: '40px' }}>{t(`${key}A`)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
