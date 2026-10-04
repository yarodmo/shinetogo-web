import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { protection } from './content/protection'
const base = {
  en: {
    // Navbar
    navServices: 'Services',
    navPricing: 'Pricing',
    navGallery: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    navBook: 'Book Now',


    // Hero
    heroTag: 'MOBILE DETAILING • CERAMIC COATING • WINDOW TINT • MARINE SPECIALIST',
    heroTitle: 'Premium car wash & boat detailing service that comes to you',
    heroCta1: 'Book Your Service',
    heroCta2: 'Chat on WhatsApp',
    heroBadge1: 'Professional',
    heroBadge1b: '& Careful',
    heroBadge2: 'We Come',
    heroBadge2b: 'To You',
    heroBadge3: 'Quotes',
    heroBadge3b: 'By Photo',


    // About
    aboutText: 'We\'re a professional team specializing in mobile detailing for cars and boats. Showroom-level standards delivered at your location — careful and obsessively precise.',
    aboutCard1: 'Professional Detailing',
    aboutCard1d: 'Showroom-quality finish with professional techniques and professional-grade products.',
    aboutCard2: '100% Mobile',
    aboutCard2d: 'We come to your home, office, or marina and confirm the time with you.',
    aboutCard3: 'Reliable & Transparent',
    aboutCard3d: 'We tell you what the job includes and confirm the details before we start.',
    aboutCard4: 'Careful Products',
    aboutCard4d: 'Professional-grade products chosen for your vehicle’s paint and surfaces.',

    // Services
    svcHeadline: 'Asset Preservation for Land and Sea. Executed at Your Coordinates.',
    svc1Title: 'Auto Detailing',
    svc1Desc: 'Exterior/interior wash, clay bar, polish, wax and ceramic protection. A showroom-level finish.',
    svc1F1: 'Complete exterior wash', svc1F2: 'Deep interior cleaning', svc1F3: 'Clay bar and polish', svc1F4: 'Ceramic coating available',
    svc1Btn: 'View Packages →',
    svc1Badge: 'Most Popular',
    svc2Title: 'Boat Detailing',
    svc2Desc: 'Hull and deck washing, desalination, gelcoat polish, UV protection and vinyl care for marine vessels.',
    svc2F1: 'Wash and desalination', svc2F2: 'Gelcoat polish and restoration', svc2F3: 'UV protection sealant', svc2F4: 'Vinyl and upholstery care',
    svc2Btn: 'Marine Services →',
    svc2Badge: 'Marine Specialty',



    svc4Title: 'Window Tint & Ceramic Coating',
    svc4Desc: 'Ceramic and carbon window film, plus ceramic coating for your paint. Free quote by photo.',
    svc4F1: 'Ceramic and carbon window film', svc4F2: 'Florida tint limits explained per window', svc4F3: 'Ceramic coating for paint', svc4F4: 'Quote by photo',
    svc4Btn: 'See Options →',
    svc4Badge: 'New',

    // Pricing
    pricingHeadline: 'Auto Detailing Packages',
    pricingBadgeText: 'MOST REQUESTED',
    pricingSub: 'Choose the package that fits your vehicle. Exact pricing is based on your vehicle’s evaluation.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Exterior wash', pkg1F2: 'Wheels and glass', pkg1F3: 'Basic vacuum',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Everything in Express', pkg2F2: 'Deep interior cleaning', pkg2F3: 'Conditioning & protection',
    pkg3Title: 'Premium', pkg3Time: '3–4 hours', pkg3F1: 'Everything in Full', pkg3F2: 'Clay bar treatment', pkg3F3: '1-step polish and wax',
    pkg4Title: 'Ceramic', pkg4Time: 'By appointment', pkg4F1: 'Complete paint prep', pkg4F2: 'Professional ceramic coating', pkg4F3: 'Protection time depends on product and care',
    pkgSelect: 'Select',
    pkgSeeOptions: 'See options',
    pkgHelp: 'Not sure which service you need?',
    pkgHelpCta: 'Contact us for personalized consultation',

    // Process
    processHeadline: 'A simple 4-step process for mobile detailing',
    proc1Title: 'Book Service', proc1Desc: 'Call us, WhatsApp or use our form to schedule your appointment',
    proc2Title: 'We Arrive', proc2Desc: 'Our team arrives on time with all necessary equipment',
    proc3Title: 'Detailing', proc3Desc: 'We perform the complete service with professional products',
    proc4Title: 'Inspection & Payment', proc4Desc: 'We review together and process payment. Ready to shine!',
    processCta: 'Ready for That Showroom Shine?',
    processCtaSub: 'Schedule your service today and experience the difference',

    // Boats







    // Gallery
    galleryTitle: 'Our Projects',
    gallerySub: 'Our work in Florida',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Everything you need to know about our mobile detailing service',
    faq1Q: 'Do I need to provide water or electricity?',
    faq1A: 'No! We are completely self-sufficient. We bring our own water tanks and power generators.',
    faq2Q: 'How long does each service take?',
    faq2A: 'Service times range from 45 minutes for Express to 4 hours for Premium Detail. Ceramic coating and window tint are quoted individually.',
    faq3Q: 'Do you service marinas and condos?',
    faq3A: 'Yes! We coordinate access with marina and condo management. Just provide the location details.',
    faq4Q: 'What payment methods do you accept?',
    faq4A: 'We accept all major credit/debit cards, Zelle and cash. Payment is due upon service completion.',
    faq5Q: 'Are your products safe for my vehicle?',
    faq5A: 'We use professional-grade products chosen for your paint and surface. Tell us about your car and we’ll confirm.',

    // Contact
    contactTitle: 'Request Quote',
    contactSub: 'Tell us what you need and we’ll get back to you with a quote. Photos on WhatsApp make it faster.',
    formName: 'Full Name',
    formPhone: 'Phone / WhatsApp',
    formEmail: 'Email',
    formDate: 'Preferred Date',
    formTime: 'Preferred Time...',
    timeMorning: 'Morning',
    timeAfternoon: 'Afternoon',
    formVehicle: 'Vehicle Type...',
    formService: 'Service of Interest...',
    formMsg: 'Additional Details (optional)',
    formSubmit: 'Send Request',
    formWhatsapp: 'Direct WhatsApp',
    formWhatsappSub: 'Send photos and get an instant quote.',
    formWhatsappCta: 'Chat Now',
    formCallTitle: 'Direct Call',
    formCallSub: 'Speak directly with our team.',
    formPrivacy: 'We use your details only to answer your request.',

    // Footer
    footerAbout: 'Professional mobile car and boat detailing services. We bring premium care to your location.',
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
    navBook: 'Reservar',


    // Hero
    heroTag: 'DETAILING MÓVIL • RECUBRIMIENTO CERÁMICO • POLARIZADO • ESPECIALISTA MARINO',
    heroTitle: 'Servicio premium de lavado de autos y detallado de botes que va a ti',
    heroCta1: 'Reserva Tu Servicio',
    heroCta2: 'Chat por WhatsApp',
    heroBadge1: 'Profesionales',
    heroBadge1b: '& Cuidadosos',
    heroBadge2: 'Vamos',
    heroBadge2b: 'A Ti',
    heroBadge3: 'Cotiza',
    heroBadge3b: 'Por Foto',


    // About
    aboutText: 'Somos un equipo profesional especializado en detallado móvil para autos y botes. Estándares de nivel showroom entregados en tu ubicación — cuidadosos y obsesivamente precisos.',
    aboutCard1: 'Detallado Profesional',
    aboutCard1d: 'Acabado de showroom con técnicas profesionales y productos de grado profesional.',
    aboutCard2: '100% Móvil',
    aboutCard2d: 'Vamos a tu casa, oficina o marina. Y confirmamos la hora contigo.',
    aboutCard3: 'Confiables & Transparentes',
    aboutCard3d: 'Te decimos qué incluye el trabajo y confirmamos los detalles antes de empezar.',
    aboutCard4: 'Productos Cuidadosos',
    aboutCard4d: 'Productos de grado profesional elegidos para la pintura y las superficies de tu vehículo.',

    // Services
    svcHeadline: 'Preservación Patrimonial por Tierra y Mar. Ejecutado en tus Coordenadas.',
    svc1Title: 'Auto Detailing',
    svc1Desc: 'Lavado exterior/interior, clay bar, pulido, cera y protección cerámica. Un acabado de nivel showroom.',
    svc1F1: 'Lavado exterior completo', svc1F2: 'Limpieza profunda interior', svc1F3: 'Clay bar y pulido', svc1F4: 'Recubrimiento cerámico disponible',
    svc1Btn: 'Ver Paquetes →',
    svc1Badge: 'Más Popular',
    svc2Title: 'Detallado de Botes',
    svc2Desc: 'Lavado de casco y cubierta, desalinización, pulido de gelcoat, protección UV y cuidado de vinil.',
    svc2F1: 'Lavado y desalinización', svc2F2: 'Pulido de gelcoat', svc2F3: 'Sellador de protección UV', svc2F4: 'Cuidado de vinil e interiores',
    svc2Btn: 'Servicios Marinos →',
    svc2Badge: 'Especialidad Marina',



    svc4Title: 'Polarizado y Cerámico',
    svc4Desc: 'Película cerámica y de carbono para los vidrios, más recubrimiento cerámico para la pintura. Cotización gratis por foto.',
    svc4F1: 'Película cerámica y de carbono', svc4F2: 'Límites de Florida explicados por ventana', svc4F3: 'Cerámico para la pintura', svc4F4: 'Cotización por foto',
    svc4Btn: 'Ver Opciones →',
    svc4Badge: 'Nuevo',

    // Pricing
    pricingHeadline: 'Paquetes de Auto Detailing',
    pricingBadgeText: 'MÁS SOLICITADO',
    pricingSub: 'Elige el paquete que va con tu vehículo. El precio exacto se basa en la evaluación.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Lavado exterior', pkg1F2: 'Rines y vidrios', pkg1F3: 'Aspirado básico',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Todo en Express', pkg2F2: 'Limpieza interior profunda', pkg2F3: 'Acondicionamiento y protección',
    pkg3Title: 'Premium', pkg3Time: '3–4 horas', pkg3F1: 'Todo en Full', pkg3F2: 'Tratamiento de arcilla', pkg3F3: 'Pulido a máquina',
    pkg4Title: 'Cerámico', pkg4Time: 'Con cita', pkg4F1: 'Preparación de pintura total', pkg4F2: 'Recubrimiento cerámico profesional', pkg4F3: 'La duración depende del producto y el cuidado',
    pkgSelect: 'Seleccionar',
    pkgSeeOptions: 'Ver opciones',
    pkgHelp: '¿No sabes qué servicio necesitas?',
    pkgHelpCta: 'Contáctanos para una consulta personalizada',

    // Process
    processHeadline: 'Un proceso simple de 4 pasos para tu detallado móvil',
    proc1Title: 'Reserva', proc1Desc: 'Llámanos, WhatsApp o usa nuestro formulario para agendar',
    proc2Title: 'Llegamos', proc2Desc: 'Nuestro equipo llega a tiempo con todo el equipo necesario',
    proc3Title: 'Detallado', proc3Desc: 'Realizamos el servicio completo con productos profesionales',
    proc4Title: 'Inspección y Pago', proc4Desc: 'Revisamos juntos y procesamos el pago. ¡Listo para brillar!',
    processCta: '¿Listo Para Ese Brillo de Exhibición?',
    processCtaSub: 'Agenda tu servicio hoy y experimenta la diferencia',

    // Boats







    // Gallery
    galleryTitle: 'Nuestros Proyectos',
    gallerySub: 'Nuestro trabajo en Florida',

    // Reviews

    // CTA Banner


    // FAQ
    faqTitle: 'Todo lo que necesitas saber sobre nuestro servicio de detallado móvil',
    faq1Q: '¿Necesito proveer agua o electricidad?',
    faq1A: '¡No! Somos completamente autosuficientes. Traemos nuestros propios tanques de agua y generadores.',
    faq2Q: '¿Cuánto toma cada servicio?',
    faq2A: 'Los tiempos van desde 45 min para Express hasta 4 horas para Premium Detail. El cerámico y el polarizado se cotizan de forma individual.',
    faq3Q: '¿Atienden marinas y condominios?',
    faq3A: '¡Sí! Coordinamos acceso con la administración de marina y condominio.',
    faq4Q: '¿Qué métodos de pago aceptan?',
    faq4A: 'Aceptamos todas las tarjetas principales, Zelle y efectivo. Pago al completar el servicio.',
    faq5Q: '¿Sus productos son seguros para mi vehículo?',
    faq5A: 'Usamos productos de grado profesional elegidos para tu pintura y tus superficies. Cuéntanos de tu auto y lo confirmamos.',

    // Contact
    contactTitle: 'Solicitar Cotización',
    contactSub: 'Cuéntanos qué necesitas y te respondemos con una cotización. Las fotos por WhatsApp lo hacen más rápido.',
    formName: 'Nombre Completo',
    formPhone: 'Teléfono / WhatsApp',
    formEmail: 'Email',
    formDate: 'Fecha Deseada',
    formTime: 'Horario Preferido...',
    timeMorning: 'Mañana',
    timeAfternoon: 'Tarde',
    formVehicle: 'Tipo de Vehículo...',
    formService: 'Servicio de Interés...',
    formMsg: 'Detalles adicionales (opcional)',
    formSubmit: 'Enviar Solicitud',
    formWhatsapp: 'WhatsApp Directo',
    formWhatsappSub: 'Envía fotos y obtén una cotización al instante.',
    formWhatsappCta: 'Chatear Ahora',
    formCallTitle: 'Llamada Directa',
    formCallSub: 'Habla directamente con nuestro equipo.',
    formPrivacy: 'Usamos tus datos solo para responder tu solicitud.',

    // Footer
    footerAbout: 'Servicios profesionales de detallado móvil de autos y botes. Llevamos cuidado premium a tu ubicación.',
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
  en: { ...base.en, ...protection.en },
  es: { ...base.es, ...protection.es },
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
