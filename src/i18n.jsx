import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { services } from './content/services'
const base = {
  en: {
    // Navbar
    navServices: 'Services',
    navPricing: 'Pricing',
    navGallery: 'Gallery',
    navAbout: 'About',
    navContact: 'Contact',
    navBook: 'Get a quote',


    // Hero
    heroTag: 'SARASOTA · BRADENTON · VENICE · ST. PETE',
    heroTitle: 'Car and boat detailing, window tint and ceramic coating',
    heroSub: 'Detailing at your home, office or marina, plus window tint and ceramic coating for cars. Send a photo and we reply with a price range.',
    heroCta1: 'Request a quote',
    heroCta2: 'Chat on WhatsApp',
    heroBadge1: 'Cars and boats',
    heroBadge2: 'Detailing at home, office or marina',
    heroBadge3: 'Price range by photo',
    whyEyebrow: 'Southwest Florida',
    whyTitle: 'Florida is hard on a finish',
    why1Title: 'Lovebugs',
    why1Desc: 'Their remains are slightly acidic. Left on the paint for several days, they can etch it, so wash them off soon.',
    why2Title: 'Salt air',
    why2Desc: 'Salt dries on gelcoat, metal and paint. On boats we wash it off at the marina.',
    why3Title: 'Price before we start',
    why3Desc: 'You get a price range first, and we confirm the final price with you before we begin.',
    svcQuote: 'Get a quote',
    svcMore: 'See details',
    areasTitle: 'Where we work',
    areasNote: 'For window tint and ceramic coating, confirm your area when you ask for a quote.',


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
    svc1Title: 'Car detailing',
    svc1Desc: 'Exterior and interior wash, clay bar, polish and wax.',
    svc1F1: 'Complete exterior wash', svc1F2: 'Deep interior cleaning', svc1F3: 'Clay bar and polish', svc1F4: 'Wax and finish',
    svc1Btn: 'See packages',
    svc1Badge: 'Cars',
    svc2Title: 'Boat detailing',
    svc2Desc: 'Hull and deck washing, desalination, gelcoat polish and vinyl care for boats.',
    svc2F1: 'Wash and desalination', svc2F2: 'Gelcoat polish', svc2F3: 'Marine sealant', svc2F4: 'Vinyl and upholstery care',
    svc2Btn: 'Quote my boat',
    svc2Badge: 'Boats',









    // Pricing
    pricingHeadline: 'Car detailing packages',
    pricingBadgeText: 'INSIDE AND OUT',
    pricingSub: 'Times are for a standard car. The final price depends on size and condition; send a photo for a range.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Exterior wash', pkg1F2: 'Wheels and glass', pkg1F3: 'Basic vacuum',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Everything in Express', pkg2F2: 'Deep interior cleaning', pkg2F3: 'Conditioning & protection',
    pkg3Title: 'Premium', pkg3Time: '3–4 hours', pkg3F1: 'Everything in Full', pkg3F2: 'Clay bar treatment', pkg3F3: '1-step polish and wax',
    pkgSelect: 'Quote this package',
    pkgHelp: 'Not sure which one?',
    pkgHelpCta: 'Send a photo and we’ll tell you which fits.',

    // Process
    processHeadline: 'How it works',
    proc1Title: 'Request a quote', proc1Desc: 'Photos on WhatsApp, a call or the form.',
    proc2Title: 'We arrive', proc2Desc: 'At the place and time we agreed.',
    proc3Title: 'We do the work', proc3Desc: 'We do what we quoted.',
    proc4Title: 'Check and pay', proc4Desc: 'We go over it together, then you pay.',
    processCta: 'Want a quote?',
    processCtaSub: 'Send a photo on WhatsApp.',

    // Boats







    // Gallery
    galleryTitle: 'Gallery',
    gallerySub: 'Detailing for cars and boats.',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Quick answers',
    faq1Q: 'Do I need to provide water or electricity?',
    faq1A: 'No. We bring our own water tanks and generators.',
    faq2Q: 'How long do the detailing packages take?',
    faq2A: 'Package times range from 45 minutes for Express to 3–4 hours for Premium.',
    faq3Q: 'Do you service marinas and condos?',
    faq3A: 'Yes. We coordinate access with marina and condo management. Tell us the location when you request the quote.',
    faq4Q: 'What payment methods do you accept?',
    faq4A: 'We accept credit and debit cards, Zelle and cash. Payment is due upon service completion.',
    faq5Q: 'Are your products safe for my vehicle?',
    faq5A: 'We choose the product for your paint and surfaces and tell you which one before we start.',
    faq6Q: 'Do you also do window tint and ceramic coating?',
    faq6A: 'Yes, for cars. Pick the service in the form below and we reply with a price range. If you want to read more first, see the Window Tint and Ceramic pages in the menu.',

    // Contact
    contactTitle: 'Get your quote',
    contactSub: 'Tell us the vehicle, the service and your ZIP code. We reply with a price range.',
    formName: 'Name',
    formPhone: 'Phone / WhatsApp',
    formEmail: 'Email',
    formDate: 'Preferred date',
    formTime: 'Preferred time',
    timeMorning: 'Morning',
    timeAfternoon: 'Afternoon',
    formVehicle: 'Vehicle type',
    formService: 'Service you need',
    formMsg: 'Anything else? (optional)',
    formSubmit: 'Send request',
    formWhatsapp: 'WhatsApp',
    formWhatsappSub: 'Send photos and we reply with a quote.',
    formWhatsappCta: 'Open WhatsApp',
    formCallTitle: 'Call us',
    formCallSub: 'Talk to us now.',
    formPrivacy: 'We use your details only to answer your request.',

    // Footer
    footerAbout: 'Mobile detailing for cars and boats, plus window tint and ceramic coating for cars. Sarasota, Bradenton and surrounding areas.',
    footerServices: 'Services',
    footerAreas: 'Where we work',
    footerContact: 'Contact',


    // Sticky
    stickyCall: 'Call',
    stickyWhatsapp: 'WhatsApp',
    whatsappText: 'Hi, I’d like a quote.'
  },
  es: {
    // Navbar
    navServices: 'Servicios',
    navPricing: 'Paquetes',
    navGallery: 'Galería',
    navAbout: 'Nosotros',
    navContact: 'Contacto',
    navBook: 'Cotizar',


    // Hero
    heroTag: 'SARASOTA · BRADENTON · VENICE · ST. PETE',
    heroTitle: 'Detallado de carros y botes, polarizado y recubrimiento cerámico',
    heroSub: 'Detallado en tu casa, oficina o marina, además de polarizado y recubrimiento cerámico para carros. Manda una foto y te respondemos con un rango de precio.',
    heroCta1: 'Pedir cotización',
    heroCta2: 'Escríbenos por WhatsApp',
    heroBadge1: 'Carros y botes',
    heroBadge2: 'Detallado en casa, oficina o marina',
    heroBadge3: 'Rango de precio por foto',
    whyEyebrow: 'Suroeste de Florida',
    whyTitle: 'En Florida, el acabado sufre',
    why1Title: 'Lovebugs',
    why1Desc: 'Sus restos son un poco ácidos. Si se quedan varios días sobre la pintura, pueden dañarla; conviene lavarlos pronto.',
    why2Title: 'Aire salado',
    why2Desc: 'La sal se seca sobre el gelcoat, el metal y la pintura. En los botes la quitamos en la marina.',
    why3Title: 'Precio antes de empezar',
    why3Desc: 'Primero recibes un rango de precio y confirmamos contigo el precio final antes de empezar.',
    svcQuote: 'Cotizar',
    svcMore: 'Ver detalles',
    areasTitle: 'Dónde trabajamos',
    areasNote: 'Para polarizado y cerámico, confírmanos tu zona al pedir la cotización.',


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
    svc1Title: 'Detallado de carros',
    svc1Desc: 'Lavado exterior e interior, clay bar, pulido y cera.',
    svc1F1: 'Lavado exterior completo', svc1F2: 'Limpieza profunda interior', svc1F3: 'Clay bar y pulido', svc1F4: 'Cera y acabado',
    svc1Btn: 'Ver paquetes',
    svc1Badge: 'Carros',
    svc2Title: 'Detallado de botes',
    svc2Desc: 'Lavado de casco y cubierta, desalinización, pulido de gelcoat y cuidado de vinil para botes.',
    svc2F1: 'Lavado y quitar la sal', svc2F2: 'Pulido de gelcoat', svc2F3: 'Sellador marino', svc2F4: 'Cuidado de vinil e interiores',
    svc2Btn: 'Cotizar mi bote',
    svc2Badge: 'Botes',









    // Pricing
    pricingHeadline: 'Paquetes de detallado de carros',
    pricingBadgeText: 'POR DENTRO Y POR FUERA',
    pricingSub: 'Los tiempos son para un carro estándar. El precio final depende del tamaño y el estado; manda una foto y te damos un rango.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Lavado exterior', pkg1F2: 'Rines y vidrios', pkg1F3: 'Aspirado básico',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Todo en Express', pkg2F2: 'Limpieza interior profunda', pkg2F3: 'Acondicionamiento y protección',
    pkg3Title: 'Premium', pkg3Time: '3–4 horas', pkg3F1: 'Todo en Full', pkg3F2: 'Clay bar', pkg3F3: 'Pulido de un paso y cera',
    pkgSelect: 'Cotizar este paquete',
    pkgHelp: '¿No sabes cuál?',
    pkgHelpCta: 'Manda una foto y te decimos cuál va.',

    // Process
    processHeadline: 'Cómo funciona',
    proc1Title: 'Pide tu cotización', proc1Desc: 'Fotos por WhatsApp, una llamada o el formulario.',
    proc2Title: 'Llegamos', proc2Desc: 'Al lugar y la hora que acordamos.',
    proc3Title: 'Hacemos el trabajo', proc3Desc: 'Hacemos lo que cotizamos.',
    proc4Title: 'Revisión y pago', proc4Desc: 'Lo revisamos juntos y luego pagas.',
    processCta: '¿Quieres una cotización?',
    processCtaSub: 'Mándanos una foto por WhatsApp.',

    // Boats







    // Gallery
    galleryTitle: 'Galería',
    gallerySub: 'Detallado de carros y botes.',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Preguntas frecuentes',
    faq1Q: '¿Necesito proveer agua o electricidad?',
    faq1A: 'No. Traemos nuestros propios tanques de agua y generadores.',
    faq2Q: '¿Cuánto toman los paquetes de detallado?',
    faq2A: 'Los tiempos van de 45 minutos para el Express a 3–4 horas para el Premium.',
    faq3Q: '¿Atienden marinas y condominios?',
    faq3A: 'Sí. Coordinamos el acceso con la administración de la marina o del condominio. Dinos el lugar cuando pidas la cotización.',
    faq4Q: '¿Qué métodos de pago aceptan?',
    faq4A: 'Aceptamos tarjetas de crédito y débito, Zelle y efectivo. Pago al completar el servicio.',
    faq5Q: '¿Sus productos son seguros para mi vehículo?',
    faq5A: 'Elegimos el producto según tu pintura y tus superficies, y te decimos cuál antes de empezar.',
    faq6Q: '¿También hacen polarizado y recubrimiento cerámico?',
    faq6A: 'Sí, para carros. Elige el servicio en el formulario de abajo y te respondemos con un rango de precio. Si quieres leer más antes, mira las páginas de Polarizado y Cerámico en el menú.',

    // Contact
    contactTitle: 'Pide tu cotización',
    contactSub: 'Dinos el vehículo, el servicio y tu ZIP code. Te respondemos con un rango de precio.',
    formName: 'Nombre',
    formPhone: 'Teléfono / WhatsApp',
    formEmail: 'Email',
    formDate: 'Fecha que prefieres',
    formTime: 'Horario',
    timeMorning: 'Mañana',
    timeAfternoon: 'Tarde',
    formVehicle: 'Tipo de vehículo',
    formService: 'Servicio que necesitas',
    formMsg: '¿Algo más? (opcional)',
    formSubmit: 'Enviar solicitud',
    formWhatsapp: 'Por WhatsApp',
    formWhatsappSub: 'Manda fotos y te respondemos con una cotización.',
    formWhatsappCta: 'Abrir WhatsApp',
    formCallTitle: 'Llámanos',
    formCallSub: 'Habla con nosotros ahora.',
    formPrivacy: 'Usamos tus datos solo para responder tu solicitud.',

    // Footer
    footerAbout: 'Detallado móvil de carros y botes, además de polarizado y recubrimiento cerámico para carros. Sarasota, Bradenton y alrededores.',
    footerServices: 'Servicios',
    footerAreas: 'Zonas',
    footerContact: 'Contacto',


    // Sticky
    stickyCall: 'Llamar',
    stickyWhatsapp: 'WhatsApp',
    whatsappText: 'Hola, quiero una cotización.'
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
