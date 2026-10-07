import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { services } from './content/services'
const base = {
  en: {
    // Navbar
    navServices: 'Services',
    navPricing: 'Packages',
    navGallery: 'Gallery',
    navAbout: 'About',
    navContact: 'Contact',
    navBook: 'Get a quote',


    // Hero
    heroTag: 'MOBILE DETAILING · SARASOTA AND BRADENTON',
    heroTitle: 'See your car or boat looking new again.',
    heroSub: 'Leave it in our hands. We’ll tell you up front how close we can get.',
    heroCheck1: 'At your home, office or marina',
    heroCheck2: 'Cars and boats, plus tint and ceramic for cars',
    heroCheck3: 'A price range before we start',
    heroCta1: 'Get a quote',
    heroCta2: 'Chat on WhatsApp',
    protSub: 'Two separate services, quoted in the same form.',
    protHeadline: 'Also for your car: window tint and ceramic coating',
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
    areasTitle: 'Do we reach you?',
    areasNote: 'For window tint and ceramic coating, put your ZIP code in the quote.',


    // About
    aboutText: 'We detail cars and boats at your home, office or marina. Before we start, you know what the job includes and roughly what it will cost.',
    aboutCard1: 'Cars and boats',
    aboutCard1d: 'Wash, polish and interior work for cars, and hull, deck and gelcoat care for boats.',
    aboutCard2: 'We come to you',
    aboutCard2d: 'For car and boat detailing, we come to your home, office or marina and confirm the time with you.',
    aboutCard3: 'Clear from the start',
    aboutCard3d: 'You know what the job includes before we start, and we confirm the final price with you before we begin.',
    aboutCard4: 'A product chosen for each surface',
    aboutCard4d: 'We choose the product for your paint and surfaces, and tell you which one before we start.',

    // Services
    svcHeadline: 'Cars, boats, window tint and ceramic coating, all quoted in one place.',
    svc1Title: 'Car detailing',
    svc1Desc: 'A wash inside and out, with polish and wax when the paint needs it. For cars, SUVs and trucks.',
    svc1F1: 'Complete exterior wash', svc1F2: 'Deep interior cleaning', svc1F3: 'Clay bar and polish', svc1F4: 'Wax and finish',
    svc1Btn: 'See packages →',
    svc1Badge: 'Cars',
    svc2Title: 'Boat detailing',
    svc2Desc: 'We wash the hull and deck, rinse off the salt, polish the gelcoat and care for vinyl and upholstery.',
    svc2F1: 'Wash and salt removal', svc2F2: 'Gelcoat polish', svc2F3: 'Marine sealant', svc2F4: 'Vinyl and upholstery care',
    svc2Btn: 'Quote my boat →',
    svc2Badge: 'Boats',









    // Pricing
    pricingHeadline: 'Auto Detailing Packages',
    pricingBadgeText: 'INSIDE AND OUT',
    pricingSub: 'Times are for an average-size car. Size and condition set the price: send a photo and we reply with a range.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Exterior wash', pkg1F2: 'Wheels and glass', pkg1F3: 'Basic vacuum',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Everything in Express', pkg2F2: 'Deep interior cleaning', pkg2F3: 'Interior conditioning',
    pkg3Title: 'Premium', pkg3Time: '3–4 hours', pkg3F1: 'Everything in Full', pkg3F2: 'Clay bar treatment', pkg3F3: '1-step polish and wax',
    pkgSelect: 'Quote this package',
    pkgHelp: 'Not sure which one?',
    pkgHelpCta: 'Send a photo and we’ll tell you which fits.',

    // Process
    processHeadline: 'From the first photo to the final check',
    proc1Title: 'Send a photo', proc1Desc: 'On WhatsApp. Or ask for a quote in the form and send the photos after.',
    proc2Title: 'We reply with a range', proc2Desc: 'And agree on a day and place with you.',
    proc3Title: 'We do the work', proc3Desc: 'We do what we quoted.',
    proc4Title: 'Check and pay', proc4Desc: 'We go over it together, then you pay.',
    processCta: 'Want a quote?',
    processCtaSub: 'Send a photo on WhatsApp and we reply with a price range.',

    // Boats







    // Gallery
    galleryTitle: 'Gallery',
    gallerySub: 'Detailing, up close.',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Before you ask for a quote',
    faq1Q: 'Do I need to give you water or power?',
    faq1A: 'For detailing, no: we bring our own water tanks and generators. For tint and ceramic coating, we tell you what we need when we set the day and place.',
    faq2Q: 'How long does it take?',
    faq2A: 'Car detailing packages run from 45 minutes (Express) to 3–4 hours (Premium) for an average-size car. For boats, tint and ceramic coating, ask when you request the quote.',
    faq3Q: 'Can you come to a marina or condo?',
    faq3A: 'For detailing, yes: we coordinate access with marina and condo management, so tell us the location when you request the quote. For tint and ceramic coating, we agree on the place with you.',
    faq4Q: 'How do I pay?',
    faq4A: 'Ask us how you can pay when you request the quote.',
    faq5Q: 'What do you use on my paint?',
    faq5A: 'We choose the product for your paint and surfaces and tell you which one before we start.',
    faq6Q: 'Do you do window tint and ceramic coating?',
    faq6A: 'Yes, on cars (not boats). Pick it in the form and we reply with a price range. To read more first, open the Window Tint and Ceramic pages from the menu.',

    // Contact
    contactTitle: 'Ask for your quote',
    contactSub: 'Tell us the vehicle, the service and your ZIP code and we reply with a price range.',
    formName: 'Name',
    formPhone: 'Phone / WhatsApp',
    formEmail: 'Email',
    formDate: 'Preferred date',
    formTime: 'Morning or afternoon?',
    timeMorning: 'Morning',
    timeAfternoon: 'Afternoon',
    formVehicle: 'What do you have?',
    formService: 'What do you need?',
    formMsg: 'Anything else? (optional)',
    formSubmit: 'Ask for my quote',
    formWhatsapp: 'WhatsApp',
    formWhatsappSub: 'Send photos and we reply with a price range.',
    formWhatsappCta: 'Open WhatsApp',
    formCallTitle: 'Prefer to talk?',
    formCallSub: 'Call us.',
    formPrivacy: 'We use your details to answer your request.',

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
    heroTag: 'DETALLADO MÓVIL · SARASOTA Y BRADENTON',
    heroTitle: 'Vuelve a ver tu carro o bote como nuevo.',
    heroSub: 'Déjalo en nuestras manos. Desde el principio te decimos hasta dónde podemos llegar.',
    heroCheck1: 'En tu casa, tu oficina o tu marina',
    heroCheck2: 'Carros y botes, además polarizado y cerámico para carros',
    heroCheck3: 'Un rango de precio antes de empezar',
    heroCta1: 'Cotizar',
    heroCta2: 'Escríbenos por WhatsApp',
    protSub: 'Dos servicios aparte, que se cotizan en el mismo formulario.',
    protHeadline: 'También para tu carro: polarizado y recubrimiento cerámico',
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
    areasTitle: '¿Llegamos a tu zona?',
    areasNote: 'Para polarizado y cerámico, pon tu ZIP code en la cotización.',


    // About
    aboutText: 'Detallamos carros y botes en tu casa, tu oficina o tu marina. Antes de empezar sabes qué incluye el trabajo y más o menos cuánto cuesta.',
    aboutCard1: 'Carros y botes',
    aboutCard1d: 'Lavado, pulido e interior para carros, y cuidado de casco, cubierta y gelcoat para botes.',
    aboutCard2: 'Vamos a ti',
    aboutCard2d: 'El detallado de carros y botes lo hacemos en tu casa, oficina o marina, y confirmamos la hora contigo.',
    aboutCard3: 'Claro desde el inicio',
    aboutCard3d: 'Sabes qué incluye el trabajo antes de empezar, y confirmamos contigo el precio final antes de empezar.',
    aboutCard4: 'Un producto elegido para cada superficie',
    aboutCard4d: 'Elegimos el producto según tu pintura y tus superficies, y te decimos cuál antes de empezar.',

    // Services
    svcHeadline: 'Carros, botes, polarizado y cerámico: lo cotizas todo en un solo lugar.',
    svc1Title: 'Detallado de carros',
    svc1Desc: 'Lavado por dentro y por fuera, con pulido y cera cuando la pintura lo pide. Para carros, SUV y camionetas.',
    svc1F1: 'Lavado exterior completo', svc1F2: 'Limpieza profunda interior', svc1F3: 'Clay bar y pulido', svc1F4: 'Cera y acabado',
    svc1Btn: 'Ver paquetes →',
    svc1Badge: 'Carros',
    svc2Title: 'Detallado de botes',
    svc2Desc: 'Lavamos casco y cubierta, enjuagamos la sal, pulimos el gelcoat y cuidamos el vinil y la tapicería.',
    svc2F1: 'Lavado y remoción de sal', svc2F2: 'Pulido de gelcoat', svc2F3: 'Sellador marino', svc2F4: 'Cuidado de vinil y tapicería',
    svc2Btn: 'Cotizar mi bote →',
    svc2Badge: 'Botes',









    // Pricing
    pricingHeadline: 'Paquetes de detallado de carros',
    pricingBadgeText: 'POR DENTRO Y POR FUERA',
    pricingSub: 'Tiempos para un carro de tamaño normal. El tamaño y el estado fijan el precio: manda una foto y te damos un rango.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Lavado exterior', pkg1F2: 'Rines y vidrios', pkg1F3: 'Aspirado básico',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Todo en Express', pkg2F2: 'Limpieza interior profunda', pkg2F3: 'Acondicionamiento del interior',
    pkg3Title: 'Premium', pkg3Time: '3–4 horas', pkg3F1: 'Todo en Full', pkg3F2: 'Clay bar', pkg3F3: 'Pulido de un paso y cera',
    pkgSelect: 'Cotizar este paquete',
    pkgHelp: '¿No sabes cuál?',
    pkgHelpCta: 'Manda una foto y te decimos cuál te conviene.',

    // Process
    processHeadline: 'De la primera foto a la revisión final',
    proc1Title: 'Mandas una foto', proc1Desc: 'Por WhatsApp. O pide la cotización en el formulario y manda las fotos después.',
    proc2Title: 'Te damos un rango', proc2Desc: 'Y quedamos contigo en el día y el lugar.',
    proc3Title: 'Hacemos el trabajo', proc3Desc: 'Hacemos lo que cotizamos.',
    proc4Title: 'Revisas y pagas', proc4Desc: 'Lo revisamos juntos y luego pagas.',
    processCta: '¿Quieres una cotización?',
    processCtaSub: 'Manda una foto por WhatsApp y te damos un rango de precio.',

    // Boats







    // Gallery
    galleryTitle: 'Galería',
    gallerySub: 'Detallado de cerca.',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Antes de pedir tu cotización',
    faq1Q: '¿Tengo que darles agua o luz?',
    faq1A: 'En el detallado, no: traemos nuestros tanques de agua y generadores. Para polarizado y cerámico, te decimos qué necesitamos al fijar el día y el lugar.',
    faq2Q: '¿Cuánto tardan?',
    faq2A: 'Los paquetes de carros van de 45 minutos (Express) a 3–4 horas (Premium) para un carro de tamaño normal. En botes, polarizado y cerámico, pregúntanos al cotizar.',
    faq3Q: '¿Pueden ir a una marina o a un condominio?',
    faq3A: 'En el detallado, sí: coordinamos el acceso con la administración de la marina o del condominio; dinos el lugar al pedir la cotización. Para polarizado y cerámico, quedamos contigo en el lugar.',
    faq4Q: '¿Cómo se paga?',
    faq4A: 'Pregúntanos cómo puedes pagar al pedir la cotización.',
    faq5Q: '¿Qué le ponen a mi pintura?',
    faq5A: 'Elegimos el producto según tu pintura y tus superficies, y te decimos cuál antes de empezar.',
    faq6Q: '¿Hacen polarizado y cerámico?',
    faq6A: 'Sí, en carros (en botes no). Elígelo en el formulario y te respondemos con un rango de precio. Si quieres leer más antes, abre las páginas de Polarizado y Cerámico desde el menú.',

    // Contact
    contactTitle: 'Pide tu cotización',
    contactSub: 'Dinos el vehículo, el servicio y tu ZIP code y te respondemos con un rango de precio.',
    formName: 'Nombre',
    formPhone: 'Teléfono / WhatsApp',
    formEmail: 'Email',
    formDate: 'Fecha que prefieres',
    formTime: '¿Mañana o tarde?',
    timeMorning: 'Mañana',
    timeAfternoon: 'Tarde',
    formVehicle: '¿Qué vehículo tienes?',
    formService: '¿Qué necesitas?',
    formMsg: '¿Algo más? (opcional)',
    formSubmit: 'Pedir mi cotización',
    formWhatsapp: 'WhatsApp',
    formWhatsappSub: 'Manda fotos y te respondemos con un rango de precio.',
    formWhatsappCta: 'Abrir WhatsApp',
    formCallTitle: '¿Prefieres hablar?',
    formCallSub: 'Llámanos.',
    formPrivacy: 'Usamos tus datos para responder tu solicitud.',

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
