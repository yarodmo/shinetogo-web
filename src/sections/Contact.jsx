import { useState } from 'react'
import { useI18n } from '../i18n'

const WA = '19419528758'

const FAQ_KEYS = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5']

export default function Contact() {
  const { t, lang } = useI18n()
  const [form, setForm] = useState({ name: '', phone: '', email: '', vehicle: '', service: '', date: '', time: '', msg: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const vehicles = lang === 'en'
    ? ['Car / Sedan', 'SUV / Truck', 'Exotic / Luxury', 'Boat / Yacht', 'RV / Camper']
    : ['Auto / Sedán', 'SUV / Camioneta', 'Exótico / Lujo', 'Bote / Yate', 'RV / Camper']

  const allServices = lang === 'en'
    ? ['Express Wash', 'Full Detail', 'Premium Detail', 'Ceramic Coating', 'Boat Detailing']
    : ['Lavado Express', 'Full Detail', 'Premium Detail', 'Revestimiento Cerámico', 'Detallado de Botes']

  const isBoat = form.vehicle === 'Boat / Yacht' || form.vehicle === 'Bote / Yate';
  const services = allServices.filter(s => {
    if (isBoat) return s.includes('Boat') || s.includes('Bote') || s.includes('Ceramic') || s.includes('Cerámico');
    return !s.includes('Boat') && !s.includes('Bote');
  });

  const submit = async (e) => {
    e.preventDefault()

    // 🛡️ FRONTEND VALIDATION (Apex Standard)
    const newErrors = {};
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      newErrors.phone = lang === 'en' ? 'Enter a valid 10-digit number' : 'Ingresa un teléfono válido de 10 dígitos';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSent(true)

    // Send data to APEX Backend (Silently, without blocking UX window.open)
    try {
      const endpoint = import.meta.env.DEV 
        ? 'http://localhost:6015/api/book' 
        : 'https://api.detailshine2go.com/api/book';
        
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }).catch(err => console.error("Backend Gateway skipped mode:", err));
    } catch (e) { }

    setTimeout(() => {
      const msg = lang === 'en'
        ? `Hi! I'm ${form.name}. I'd like a quote.${form.service ? ` Service: ${form.service}` : ''}${form.vehicle ? ` Vehicle: ${form.vehicle}` : ''}${form.date ? ` Date: ${form.date}` : ''}${form.time ? ` Time: ${form.time}` : ''}`
        : `¡Hola! Soy ${form.name}. Me gustaría una cotización.${form.service ? ` Servicio: ${form.service}` : ''}${form.vehicle ? ` Vehículo: ${form.vehicle}` : ''}${form.date ? ` Fecha: ${form.date}` : ''}${form.time ? ` Hora: ${form.time}` : ''}`
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
    }, 2500)
  }

  // Logic: Scarcity Neuromarketing
  const getDaysFromToday = (dateStr) => {
    if (!dateStr) return null;
    const selectedObj = new Date(dateStr + 'T00:00:00');
    selectedObj.setHours(0, 0, 0, 0);
    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);
    return Math.floor((selectedObj - todayObj) / (1000 * 60 * 60 * 24));
  }
  const diffDays = getDaysFromToday(form.date);
  const morningDisabled = diffDays === 1 || diffDays === 2 || diffDays === 3;
  const afternoonDisabled = diffDays === 3;

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    const days = getDaysFromToday(newDate);
    let newTime = form.time;
    if (newTime === 'Morning' && (days === 1 || days === 2 || days === 3)) newTime = '';
    if (newTime === 'Afternoon' && days === 3) newTime = '';
    setForm({ ...form, date: newDate, time: newTime });
  };

  const inputCls = 'form-input form-input-light'

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
            {!sent ? (
              <form onSubmit={submit} className="light-card animated-fade-in" style={{
                padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <input type="text" placeholder={t('formName')} required className={inputCls}
                      onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <input type="tel" placeholder={t('formPhone')} required 
                      className={`${inputCls} ${errors.phone ? 'input-error' : ''}`}
                      onChange={e => setForm({ ...form, phone: e.target.value })} 
                      style={{ borderColor: errors.phone ? '#dc2626' : undefined }} />
                    {errors.phone && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                  </div>
                </div>
                <input type="email" placeholder={t('formEmail')} className={inputCls}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <select required className={inputCls} style={{ appearance: 'none' }}
                    onChange={e => {
                      const newVehicle = e.target.value;
                      const willBeBoat = newVehicle === 'Boat / Yacht' || newVehicle === 'Bote / Yate';
                      setForm(prev => ({ 
                        ...prev, 
                        vehicle: newVehicle,
                        service: (isBoat !== willBeBoat) ? '' : prev.service 
                      }));
                    }}>
                    <option value="" disabled selected hidden>{t('formVehicle')}</option>
                    {vehicles.map((v, i) => <option key={i}>{v}</option>)}
                  </select>
                  <select required className={inputCls} style={{ appearance: 'none' }}
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="" disabled hidden>{t('formService')}</option>
                    {services.map((s, i) => <option key={i}>{s}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input type="date" required className={inputCls} min={new Date().toISOString().split('T')[0]}
                    onChange={handleDateChange}
                    style={{ color: form.date ? 'inherit' : 'var(--text-muted)' }} />
                  <select required className={inputCls} style={{ appearance: 'none' }} value={form.time}
                    onChange={e => setForm({ ...form, time: e.target.value })}>
                    <option value="" disabled hidden>{t('formTime')}</option>
                    <option value="Morning" disabled={morningDisabled}>
                      {t('timeMorning')} {morningDisabled ? '- FULL' : ''}
                    </option>
                    <option value="Afternoon" disabled={afternoonDisabled}>
                      {t('timeAfternoon')} {afternoonDisabled ? '- FULL' : ''}
                    </option>
                  </select>
                </div>
                {diffDays === 3 && (
                  <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: 600, textAlign: 'center', marginTop: '-4px' }}>
                    {lang === 'en' ? '⚠️ This day is completely booked due to high demand.' : '⚠️ Este día está completamente reservado debido a alta demanda.'}
                  </div>
                )}

                <textarea placeholder={t('formMsg')} className={inputCls} rows={3}
                  style={{ resize: 'none', fontFamily: 'inherit' }}
                  onChange={e => setForm({ ...form, msg: e.target.value })} />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '15px' }}>
                  {t('formSubmit')}
                </button>
                <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-body)', marginTop: '4px' }}>
                  {t('formPrivacy')}
                </p>
              </form>
            ) : (
              <div className="light-card animated-fade-in" style={{
                textAlign: 'center', padding: '80px 40px',
                border: '2px solid var(--brand-green)'
              }}>
                <div style={{ fontSize: '56px', marginBottom: '20px' }}>✅</div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-dark)', marginBottom: '12px' }}>
                  {t('formSuccessTitle') || 'Request Sent!'}
                </h3>
                <p style={{ color: 'var(--text-body)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                  {t('formSuccessDesc') || 'A specialist is preparing your quote. Check your WhatsApp.'}
                </p>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
                  className="btn btn-green" style={{ padding: '16px 36px' }}>
                  💬 {t('formWhatsappCta')}
                </a>
              </div>
            )}

            {/* SIDEBAR — WhatsApp + Call */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* WhatsApp Card */}
              <div className="light-card animated-fade-in" style={{ padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>💬</div>
                <h4 style={{ fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>{t('formWhatsapp')}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-body)', marginBottom: '16px', lineHeight: 1.5 }}>
                  {t('formWhatsappSub')}
                </p>
                <a href={`https://wa.me/${WA}?text=${encodeURIComponent(t('whatsappText'))}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-green" style={{ width: '100%' }}>
                  {t('formWhatsappCta')}
                </a>
              </div>

              {/* Call Card */}
              <div className="light-card animated-fade-in" style={{ padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📞</div>
                <h4 style={{ fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>{t('formCallTitle')}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-body)', marginBottom: '16px' }}>
                  {t('formCallSub')}
                </p>
                <a href="tel:+19419528758" className="btn btn-outline" style={{
                  width: '100%', color: 'var(--text-dark)', borderColor: 'var(--border-light)'
                }}>
                  (941) 952-8758
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-dark" style={{ paddingTop: '60px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="animated-fade-in" style={{
            textAlign: 'center', fontSize: 'clamp(22px, 3vw, 36px)',
            color: '#fff', marginBottom: '48px'
          }}>
            {t('faqTitle')}
          </h2>

          {FAQ_KEYS.map((key, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border-dark)', padding: '20px 0' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: '16px', padding: 0, textAlign: 'left'
              }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '16px' }}>{t(`${key}Q`)}</span>
                <span style={{
                  color: 'var(--brand-blue)', fontSize: '22px', flexShrink: 0,
                  transform: openFaq === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s'
                }}>+</span>
              </button>
              {openFaq === i && (
                <p style={{
                  marginTop: '14px', fontSize: '15px', color: 'var(--text-muted)',
                  lineHeight: 1.6, paddingRight: '40px'
                }}>{t(`${key}A`)}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
