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
    heroTag: 'MOBILE DETAILING • WINDOW TINT • CERAMIC COATING',
    heroTitle: 'Premium car wash & boat detailing service that comes to you',
    heroSub: 'Detailing at your home, office or marina, plus window tint and ceramic coating for cars. Send a photo and we reply with a price range.',
    heroCta1: 'Request a quote',
    heroCta2: 'Chat on WhatsApp',
    heroBadge1: 'Mobile Detailing',
    heroBadge2: 'Cars & Boats',
    heroBadge3: 'Price by Photo',
    protSub: 'Two separate services, quoted in the same form.',
    protHeadline: 'Also for your car: window tint and ceramic coating',
    heroBadge3b: 'Range before we start',
    heroBadge2b: 'Plus tint & ceramic',
    heroBadge1b: 'Home, office or marina',
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
    svcHeadline: 'Asset Preservation for Land and Sea. Executed at Your Coordinates.',
    svc1Title: 'Auto Detailing',
    svc1Desc: 'Exterior/interior wash, clay bar, polish and wax for cars, SUVs and trucks.',
    svc1F1: 'Complete exterior wash', svc1F2: 'Deep interior cleaning', svc1F3: 'Clay bar and polish', svc1F4: 'Ceramic coating available',
    svc1Btn: 'View Packages →',
    svc1Badge: 'Cars & SUVs',
    svc2Title: 'Boat Detailing',
    svc2Desc: 'Hull and deck washing, desalination, gelcoat polish and vinyl care for marine vessels.',
    svc2F1: 'Wash and desalination', svc2F2: 'Gelcoat polish', svc2F3: 'Marine sealant', svc2F4: 'Vinyl and upholstery care',
    svc2Btn: 'Quote My Boat →',
    svc2Badge: 'Marine Specialty',









    // Pricing
    pricingHeadline: 'Auto Detailing Packages',
    pricingBadgeText: 'INSIDE AND OUT',
    pricingSub: 'Times are for a standard car. The final price depends on size and condition; send a photo for a range.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Exterior wash', pkg1F2: 'Wheels and glass', pkg1F3: 'Basic vacuum',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Everything in Express', pkg2F2: 'Deep interior cleaning', pkg2F3: 'Conditioning & protection',
    pkg3Title: 'Premium', pkg3Time: '3–4 hours', pkg3F1: 'Everything in Full', pkg3F2: 'Clay bar treatment', pkg3F3: '1-step polish and wax',
    pkgSelect: 'Select',
    pkgHelp: 'Not sure which service you need?',
    pkgHelpCta: 'Send us a photo and we’ll tell you which fits',

    // Process
    processHeadline: 'A simple 4-step process to get your car or boat detailed',
    proc1Title: 'Book Service', proc1Desc: 'Call us, WhatsApp or use our form to request your quote',
    proc2Title: 'We Arrive', proc2Desc: 'Our team arrives at the agreed time with all the equipment',
    proc3Title: 'Detailing', proc3Desc: 'We perform the service we quoted, with professional products',
    proc4Title: 'Inspection & Payment', proc4Desc: 'We review the work together, then you pay. Ready to shine!',
    processCta: 'Ready for That Shine?',
    processCtaSub: 'Send us a photo and we reply with a price range.',

    // Boats







    // Gallery
    galleryTitle: 'Gallery',
    gallerySub: 'Detailing for cars and boats.',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Everything you need to know about our mobile detailing service',
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
    contactTitle: 'Request Quote',
    contactSub: 'Tell us the vehicle, the service and your ZIP code. We reply with a price range.',
    formName: 'Full Name',
    formPhone: 'Phone / WhatsApp',
    formEmail: 'Email',
    formDate: 'Preferred date',
    formTime: 'Preferred Time...',
    timeMorning: 'Morning',
    timeAfternoon: 'Afternoon',
    formVehicle: 'Vehicle Type...',
    formService: 'Service of Interest...',
    formMsg: 'Additional Details (optional)',
    formSubmit: 'Send Request',
    formWhatsapp: 'Direct WhatsApp',
    formWhatsappSub: 'Send photos and we reply with a quote.',
    formWhatsappCta: 'Chat Now',
    formCallTitle: 'Direct Call',
    formCallSub: 'Speak directly with our team.',
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
    heroTag: 'DETALLADO MÓVIL • POLARIZADO • RECUBRIMIENTO CERÁMICO',
    heroTitle: 'Servicio premium de lavado de carros y detallado de botes que va a ti',
    heroSub: 'Detallado en tu casa, oficina o marina, además de polarizado y recubrimiento cerámico para carros. Manda una foto y te respondemos con un rango de precio.',
    heroCta1: 'Pedir cotización',
    heroCta2: 'Escríbenos por WhatsApp',
    heroBadge1: 'Detallado Móvil',
    heroBadge2: 'Carros y Botes',
    heroBadge3: 'Precio por Foto',
    protSub: 'Dos servicios aparte, que se cotizan en el mismo formulario.',
    protHeadline: 'También para tu carro: polarizado y recubrimiento cerámico',
    heroBadge3b: 'Rango antes de empezar',
    heroBadge2b: 'Además polarizado y cerámico',
    heroBadge1b: 'Casa, oficina o marina',
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
    svcHeadline: 'Preservación Patrimonial por Tierra y Mar. Ejecutado en tus Coordenadas.',
    svc1Title: 'Detallado de Carros',
    svc1Desc: 'Lavado exterior/interior, clay bar, pulido y cera para carros, SUV y camionetas.',
    svc1F1: 'Lavado exterior completo', svc1F2: 'Limpieza profunda interior', svc1F3: 'Clay bar y pulido', svc1F4: 'Recubrimiento cerámico disponible',
    svc1Btn: 'Ver Paquetes →',
    svc1Badge: 'Carros y SUV',
    svc2Title: 'Detallado de Botes',
    svc2Desc: 'Lavado de casco y cubierta, desalinización, pulido de gelcoat y cuidado de vinil.',
    svc2F1: 'Lavado y quitar la sal', svc2F2: 'Pulido de gelcoat', svc2F3: 'Sellador marino', svc2F4: 'Cuidado de vinil e interiores',
    svc2Btn: 'Cotizar Mi Bote →',
    svc2Badge: 'Especialidad Marina',









    // Pricing
    pricingHeadline: 'Paquetes de Detallado de Carros',
    pricingBadgeText: 'POR DENTRO Y POR FUERA',
    pricingSub: 'Los tiempos son para un carro estándar. El precio final depende del tamaño y el estado; manda una foto y te damos un rango.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Lavado exterior', pkg1F2: 'Rines y vidrios', pkg1F3: 'Aspirado básico',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Todo en Express', pkg2F2: 'Limpieza interior profunda', pkg2F3: 'Acondicionamiento y protección',
    pkg3Title: 'Premium', pkg3Time: '3–4 horas', pkg3F1: 'Todo en Full', pkg3F2: 'Clay bar', pkg3F3: 'Pulido de un paso y cera',
    pkgSelect: 'Seleccionar',
    pkgHelp: '¿No sabes qué servicio necesitas?',
    pkgHelpCta: 'Mándanos una foto y te decimos cuál te conviene',

    // Process
    processHeadline: 'Un proceso simple de 4 pasos para el detallado de tu carro o bote',
    proc1Title: 'Cotiza', proc1Desc: 'Llámanos, escríbenos por WhatsApp o usa el formulario',
    proc2Title: 'Llegamos', proc2Desc: 'Nuestro equipo llega a la hora acordada con todo el equipo',
    proc3Title: 'Detallado', proc3Desc: 'Hacemos el servicio que cotizamos, con productos profesionales',
    proc4Title: 'Inspección y Pago', proc4Desc: 'Revisamos el trabajo juntos y luego pagas. ¡Listo para brillar!',
    processCta: '¿Listo Para Ese Brillo?',
    processCtaSub: 'Mándanos una foto y te respondemos con un rango de precio.',

    // Boats







    // Gallery
    galleryTitle: 'Galería',
    gallerySub: 'Detallado de carros y botes.',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Todo lo que necesitas saber sobre nuestro servicio de detallado móvil',
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
    contactTitle: 'Solicitar Cotización',
    contactSub: 'Dinos el vehículo, el servicio y tu ZIP code. Te respondemos con un rango de precio.',
    formName: 'Nombre Completo',
    formPhone: 'Teléfono / WhatsApp',
    formEmail: 'Email',
    formDate: 'Fecha que prefieres',
    formTime: 'Horario Preferido...',
    timeMorning: 'Mañana',
    timeAfternoon: 'Tarde',
    formVehicle: 'Tipo de Vehículo...',
    formService: 'Servicio de Interés...',
    formMsg: 'Detalles adicionales (opcional)',
    formSubmit: 'Enviar Solicitud',
    formWhatsapp: 'WhatsApp Directo',
    formWhatsappSub: 'Manda fotos y te respondemos con una cotización.',
    formWhatsappCta: 'Chatear Ahora',
    formCallTitle: 'Llamada Directa',
    formCallSub: 'Habla directamente con nuestro equipo.',
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
