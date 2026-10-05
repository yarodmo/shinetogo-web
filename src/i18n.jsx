import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { services } from './content/services'
const base = {
  en: {
    // Navbar
    navServices: 'Services',
    navPricing: 'Pricing',
    navGallery: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    navBook: 'Get a quote',


    // Hero
    heroTag: 'MOBILE DETAILING • WINDOW TINT • CERAMIC COATING • BOATS',
    heroTitle: 'Car wash and boat detailing that comes to you',
    heroCta1: 'Request a quote',
    heroCta2: 'Chat on WhatsApp',
    heroBadge1: 'Professional',
    heroBadge1b: '& Careful',
    heroBadge2: 'We Come',
    heroBadge2b: 'To You',
    heroBadge3: 'Quotes',
    heroBadge3b: 'By Photo',


    // About
    aboutText: 'We detail cars and boats at your home, office or marina. We tell you what the job includes before we start.',
    aboutCard1: 'Cars and boats',
    aboutCard1d: 'Wash, polish and interior work for cars, and hull, deck and gelcoat care for boats.',
    aboutCard2: 'We come to you',
    aboutCard2d: 'For car and boat detailing, we come to your home, office or marina and confirm the time with you.',
    aboutCard3: 'Clear from the start',
    aboutCard3d: 'We tell you what the job includes before we start. If the final price falls outside the range, we tell you before we begin and you decide.',
    aboutCard4: 'Products picked for your vehicle',
    aboutCard4d: 'Products chosen for your vehicle’s paint and surfaces.',

    // Services
    svcHeadline: 'What we do',
    svc1Title: 'Auto Detailing',
    svc1Desc: 'Exterior and interior wash, clay bar, polish and wax.',
    svc1F1: 'Complete exterior wash', svc1F2: 'Deep interior cleaning', svc1F3: 'Clay bar and polish', svc1F4: 'Wax and finish',
    svc1Btn: 'See packages',
    svc1Badge: 'Cars',
    svc2Title: 'Boat Detailing',
    svc2Desc: 'Hull and deck washing, desalination, gelcoat polish and vinyl care for boats.',
    svc2F1: 'Wash and desalination', svc2F2: 'Gelcoat polish', svc2F3: 'Marine sealant', svc2F4: 'Vinyl and upholstery care',
    svc2Btn: 'Quote my boat',
    svc2Badge: 'Boats',









    // Pricing
    pricingHeadline: 'Auto Detailing Packages',
    pricingBadgeText: 'INSIDE AND OUT',
    pricingSub: 'Choose the package that fits your vehicle. Exact pricing is based on your vehicle’s evaluation.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Exterior wash', pkg1F2: 'Wheels and glass', pkg1F3: 'Basic vacuum',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Everything in Express', pkg2F2: 'Deep interior cleaning', pkg2F3: 'Conditioning & protection',
    pkg3Title: 'Premium', pkg3Time: '3–4 hours', pkg3F1: 'Everything in Full', pkg3F2: 'Clay bar treatment', pkg3F3: '1-step polish and wax',
    pkgSelect: 'Select',
    pkgHelp: 'Not sure which service you need?',
    pkgHelpCta: 'Contact us for personalized consultation',

    // Process
    processHeadline: 'How it works',
    proc1Title: 'Request a quote', proc1Desc: 'Call, message us on WhatsApp or fill in the form.',
    proc2Title: 'We Arrive', proc2Desc: 'We arrive with the equipment and products for the job.',
    proc3Title: 'Detailing', proc3Desc: 'We perform the complete service with professional products',
    proc4Title: 'Inspection and payment', proc4Desc: 'We go over the result together and you pay.',
    processCta: 'Want a quote?',
    processCtaSub: 'Send a photo on WhatsApp.',

    // Boats







    // Gallery
    galleryTitle: 'Our Projects',
    gallerySub: 'Our work in Florida',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Quick answers',
    faq1Q: 'Do I need to provide water or electricity?',
    faq1A: 'No. We bring our own water tanks and generators.',
    faq2Q: 'How long do the detailing packages take?',
    faq2A: 'Package times range from 45 minutes for Express to 4 hours for Premium Detail.',
    faq3Q: 'Do you service marinas and condos?',
    faq3A: 'Yes! We coordinate access with marina and condo management. Just provide the location details.',
    faq4Q: 'What payment methods do you accept?',
    faq4A: 'We accept credit and debit cards, Zelle and cash. Payment is due upon service completion.',
    faq5Q: 'Are your products safe for my vehicle?',
    faq5A: 'We use professional-grade products chosen for your paint and surface. Tell us about your car and we’ll confirm.',

    // Contact
    contactTitle: 'Request a quote',
    contactSub: 'Tell us what you need and we’ll get back to you with a quote. Photos on WhatsApp make it faster.',
    formName: 'Full Name',
    formPhone: 'Phone / WhatsApp',
    formEmail: 'Email',
    formDate: 'Preferred Date',
    formTime: 'Preferred Time...',
    timeMorning: 'Morning',
    timeAfternoon: 'Afternoon',
    formVehicle: 'Vehicle type',
    formService: 'Service you need',
    formMsg: 'Additional Details (optional)',
    formSubmit: 'Send request',
    formWhatsapp: 'Direct WhatsApp',
    formWhatsappSub: 'Send photos and we reply with a quote.',
    formWhatsappCta: 'Chat Now',
    formCallTitle: 'Direct call',
    formCallSub: 'Talk to us directly.',
    formPrivacy: 'We use your details only to answer your request.',

    // Footer
    footerAbout: 'Professional mobile car and boat detailing. We come to you.',
    footerServices: 'Services',
    footerAreas: 'Service Areas',
    footerContact: 'Contact Us',


    // Sticky
    stickyCall: 'Call',
    stickyWhatsapp: 'WhatsApp',
    whatsappText: 'Hello, I\'m interested in your mobile detailing service.'
  },
  es: {
    // Navbar
    navServices: 'Servicios',
    navPricing: 'Paquetes',
    navGallery: 'Proyectos',
    navAbout: 'Nosotros',
    navContact: 'Contacto',
    navBook: 'Cotizar',


    // Hero
    heroTag: 'DETALLADO MÓVIL • POLARIZADO • RECUBRIMIENTO CERÁMICO • BOTES',
    heroTitle: 'Lavado de carros y detallado de botes a domicilio',
    heroCta1: 'Pedir cotización',
    heroCta2: 'Escríbenos por WhatsApp',
    heroBadge1: 'Profesionales',
    heroBadge1b: 'y cuidadosos',
    heroBadge2: 'Vamos',
    heroBadge2b: 'A Ti',
    heroBadge3: 'Cotiza',
    heroBadge3b: 'Por Foto',


    // About
    aboutText: 'Lavamos y detallamos carros y botes en tu casa, tu oficina o tu marina. Antes de empezar te decimos qué incluye el trabajo.',
    aboutCard1: 'Carros y botes',
    aboutCard1d: 'Lavado, pulido e interior para carros, y cuidado de casco, cubierta y gelcoat para botes.',
    aboutCard2: 'Vamos a ti',
    aboutCard2d: 'El detallado de carros y botes lo hacemos en tu casa, oficina o marina, y confirmamos la hora contigo.',
    aboutCard3: 'Claro desde el inicio',
    aboutCard3d: 'Te decimos qué incluye el trabajo antes de empezar. Si el precio final queda fuera del rango, te lo decimos antes de empezar y tú decides.',
    aboutCard4: 'Productos para tu vehículo',
    aboutCard4d: 'Productos elegidos para la pintura y las superficies de tu vehículo.',

    // Services
    svcHeadline: 'Lo que hacemos',
    svc1Title: 'Auto Detailing',
    svc1Desc: 'Lavado exterior e interior, clay bar, pulido y cera.',
    svc1F1: 'Lavado exterior completo', svc1F2: 'Limpieza profunda interior', svc1F3: 'Clay bar y pulido', svc1F4: 'Cera y acabado',
    svc1Btn: 'Ver paquetes',
    svc1Badge: 'Carros',
    svc2Title: 'Detallado de Botes',
    svc2Desc: 'Lavado de casco y cubierta, desalinización, pulido de gelcoat y cuidado de vinil para botes.',
    svc2F1: 'Lavado y quitar la sal', svc2F2: 'Pulido de gelcoat', svc2F3: 'Sellador marino', svc2F4: 'Cuidado de vinil e interiores',
    svc2Btn: 'Cotizar mi bote',
    svc2Badge: 'Botes',









    // Pricing
    pricingHeadline: 'Paquetes de Auto Detailing',
    pricingBadgeText: 'POR DENTRO Y POR FUERA',
    pricingSub: 'Elige el paquete que va con tu vehículo. El precio exacto se basa en la evaluación.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Lavado exterior', pkg1F2: 'Rines y vidrios', pkg1F3: 'Aspirado básico',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Todo en Express', pkg2F2: 'Limpieza interior profunda', pkg2F3: 'Acondicionamiento y protección',
    pkg3Title: 'Premium', pkg3Time: '3–4 horas', pkg3F1: 'Todo en Full', pkg3F2: 'Tratamiento de arcilla', pkg3F3: 'Pulido de un paso y cera',
    pkgSelect: 'Seleccionar',
    pkgHelp: '¿No sabes qué servicio necesitas?',
    pkgHelpCta: 'Contáctanos para una consulta personalizada',

    // Process
    processHeadline: 'Cómo funciona',
    proc1Title: 'Pide tu cotización', proc1Desc: 'Llámanos, escríbenos por WhatsApp o llena el formulario.',
    proc2Title: 'Llegamos', proc2Desc: 'Llegamos con el equipo y los productos para el trabajo.',
    proc3Title: 'Detallado', proc3Desc: 'Realizamos el servicio completo con productos profesionales',
    proc4Title: 'Inspección y pago', proc4Desc: 'Revisamos el resultado juntos y cobramos.',
    processCta: '¿Quieres una cotización?',
    processCtaSub: 'Mándanos una foto por WhatsApp.',

    // Boats







    // Gallery
    galleryTitle: 'Nuestros trabajos',
    gallerySub: 'Nuestro trabajo en Florida',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Preguntas frecuentes',
    faq1Q: '¿Necesito proveer agua o electricidad?',
    faq1A: 'No. Traemos nuestros propios tanques de agua y generadores.',
    faq2Q: '¿Cuánto toman los paquetes de detallado?',
    faq2A: 'Los tiempos van de 45 minutos para el Express a 4 horas para el Premium Detail.',
    faq3Q: '¿Atienden marinas y condominios?',
    faq3A: '¡Sí! Coordinamos acceso con la administración de marina y condominio.',
    faq4Q: '¿Qué métodos de pago aceptan?',
    faq4A: 'Aceptamos tarjetas de crédito y débito, Zelle y efectivo. Pago al completar el servicio.',
    faq5Q: '¿Sus productos son seguros para mi vehículo?',
    faq5A: 'Usamos productos de grado profesional elegidos para tu pintura y tus superficies. Cuéntanos de tu auto y lo confirmamos.',

    // Contact
    contactTitle: 'Pide tu cotización',
    contactSub: 'Cuéntanos qué necesitas y te respondemos con una cotización. Las fotos por WhatsApp lo hacen más rápido.',
    formName: 'Nombre completo',
    formPhone: 'Teléfono / WhatsApp',
    formEmail: 'Email',
    formDate: 'Fecha Deseada',
    formTime: 'Horario Preferido...',
    timeMorning: 'Mañana',
    timeAfternoon: 'Tarde',
    formVehicle: 'Tipo de vehículo',
    formService: 'Servicio que necesitas',
    formMsg: 'Detalles adicionales (opcional)',
    formSubmit: 'Enviar solicitud',
    formWhatsapp: 'WhatsApp Directo',
    formWhatsappSub: 'Manda fotos y te respondemos con una cotización.',
    formWhatsappCta: 'Chatear Ahora',
    formCallTitle: 'Llamada directa',
    formCallSub: 'Habla directamente con nosotros.',
    formPrivacy: 'Usamos tus datos solo para responder tu solicitud.',

    // Footer
    footerAbout: 'Detallado móvil profesional de carros y botes. Vamos a ti.',
    footerServices: 'Servicios',
    footerAreas: 'Áreas de Servicio',
    footerContact: 'Contáctanos',


    // Sticky
    stickyCall: 'Llamar',
    stickyWhatsapp: 'WhatsApp',
    whatsappText: 'Hola, estoy interesado en su servicio de detallado móvil.'
  }
}
const translations = {
  en: { ...base.en, ...services.en },
  es: { ...base.es, ...services.es },
}
const I18nContext = createContext()

// El idioma lo define la URL (/es/ o ?lang=es), no solo un estado interno,
// para que español e inglés tengan direcciones propias que se puedan indexar.
function initialLang() {
  if (typeof window === 'undefined') return 'en'
  if (window.__LANG__ === 'es' || window.__LANG__ === 'en') return window.__LANG__
  const q = new URLSearchParams(window.location.search).get('lang')
  if (q === 'es' || q === 'en') return q
  return window.location.pathname.startsWith('/es') ? 'es' : 'en'
}
export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const t = useCallback((key) => translations[lang]?.[key] || translations.en[key] || key, [lang])
  // Cambiar de idioma lleva a la página equivalente (/ <-> /es/): así el título, la descripción y el
  // hreflang que ven buscadores y compartidos son los del idioma elegido, y se conservan utm y ancla.
  const toggle = useCallback(() => {
    const next = lang === 'en' ? 'es' : 'en'
    const params = new URLSearchParams(window.location.search)
    params.delete('lang')
    const query = params.toString()
    window.location.assign((next === 'es' ? '/es/' : '/') + (query ? `?${query}` : '') + window.location.hash)
  }, [lang])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return (
    <I18nContext.Provider value={{ lang, t, toggle }}>
      {children}
    </I18nContext.Provider>
  )
}
export function useI18n() {
  return useContext(I18nContext)
}
