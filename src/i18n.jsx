import { createContext, useContext, useState, useCallback } from 'react'

const translations = {
  en: {
    // Navbar
    navHome: 'Home',
    navServices: 'Services',
    navPricing: 'Pricing',
    navGallery: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    navBook: 'Book Now',
    navCall: '(941) 952-8758',

    // Hero
    heroTag: 'MOBILE DETAILING • CERAMIC COATING • MARINE SPECIALIST',
    heroTitle: 'Premium car wash & boat detailing service that comes to you',
    heroCta1: 'Book Your Service',
    heroCta2: 'Chat on WhatsApp',
    heroBadge1: 'Licensed',
    heroBadge1b: '& Insured',
    heroBadge2: 'Same Day',
    heroBadge2b: 'Available',
    heroBadge3: '1000+',
    heroBadge3b: 'Happy Clients',
    heroScroll: 'Scroll to explore',

    // About
    aboutText: 'We\'re a professional team specializing in mobile detailing for cars and boats. Showroom-level standards delivered at your location — insured, eco-friendly, and obsessively precise.',
    aboutCard1: 'Professional Detailing',
    aboutCard1d: 'Showroom-quality finish with professional techniques and IDA-certified products.',
    aboutCard2: '100% Mobile',
    aboutCard2d: 'We come to your home, office, or marina. On-time, every time.',
    aboutCard3: 'Insured & Reliable',
    aboutCard3d: 'Fully licensed team with $2M comprehensive insurance coverage.',
    aboutCard4: 'Eco-Friendly',
    aboutCard4d: 'Biodegradable products and responsible water management practices.',

    // Services
    svcHeadline: 'Asset Preservation for Land and Sea. Executed at Your Coordinates.',
    svc1Title: 'Auto Detailing',
    svc1Desc: 'Exterior/interior wash, clay bar, polish, wax and ceramic protection. Showroom finish every time.',
    svc1F1: 'Complete exterior wash', svc1F2: 'Deep interior cleaning', svc1F3: 'Clay bar and polish', svc1F4: 'Ceramic coating available',
    svc1Btn: 'View Packages →',
    svc1Badge: 'Most Popular',
    svc2Title: 'Boat Detailing',
    svc2Desc: 'Hull and deck washing, desalination, gelcoat polish, UV protection and vinyl care for marine vessels.',
    svc2F1: 'Wash and desalination', svc2F2: 'Gelcoat polish and restoration', svc2F3: 'UV protection sealant', svc2F4: 'Vinyl and upholstery care',
    svc2Btn: 'Marine Services →',
    svc2Badge: 'Marine Specialty',
    svc3Title: 'Fleet Wash',
    svc3Desc: 'Monthly corporate plans for fleets. Cars, vans, light trucks with flexible schedules and invoicing.',
    svc3F1: 'Monthly corporate plans', svc3F2: 'Commercial invoicing', svc3F3: 'Off-peak scheduling', svc3F4: 'Service level agreements',
    svc3Btn: 'Get Quote →',
    svc3Badge: 'Corporate',

    // Pricing
    pricingHeadline: 'Auto Detailing Packages',
    pricingBadgeText: 'MOST REQUESTED',
    pricingSub: 'Choose the perfect package for your vehicle. Exact pricing based on vehicle evaluation.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Exterior wash', pkg1F2: 'Wheels and glass', pkg1F3: 'Basic vacuum',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Everything in Express', pkg2F2: 'Deep interior cleaning', pkg2F3: 'Conditioning & protection',
    pkg3Title: 'Premium', pkg3Time: '3–4 hours', pkg3F1: 'Everything in Full', pkg3F2: 'Clay bar treatment', pkg3F3: '1-step polish and wax',
    pkg4Title: 'Ceramic', pkg4Time: 'By appointment', pkg4F1: 'Complete paint prep', pkg4F2: 'Professional ceramic coating', pkg4F3: '1–5 year protection',
    pkgSelect: 'Select',
    pkgHelp: 'Not sure which service you need?',
    pkgHelpCta: 'Contact us for personalized consultation',

    // Process
    processHeadline: 'A simple 4-step process to get the best mobile detailing service',
    proc1Title: 'Book Service', proc1Desc: 'Call us, WhatsApp or use our form to schedule your appointment',
    proc2Title: 'We Arrive', proc2Desc: 'Our team arrives on time with all necessary equipment',
    proc3Title: 'Detailing', proc3Desc: 'We perform the complete service with professional products',
    proc4Title: 'Inspection & Payment', proc4Desc: 'We review together and process payment. Ready to shine!',
    processCta: 'Ready for That Showroom Shine?',
    processCtaSub: 'Schedule your service today and experience the difference',

    // Boats
    boatHeadline: 'Expert Boat & Marine Detailing',
    boatSub: 'Professional washing, desalination, gelcoat polish and UV protection. We coordinate marina access and provide everything needed.',
    boatF1: 'Hull and Deck Washing', boatF1d: 'Complete salt removal',
    boatF2: 'Gelcoat Polish', boatF2d: 'Restores and protects finish',
    boatF3: 'UV Protection', boatF3d: 'Marine-grade sealers',
    boatF4: 'Vinyl & Upholstery', boatF4d: 'Deep cleaning and conditioning',
    boatNote: 'Marina Access: We coordinate with marina management and provide all water and power equipment. We service boats up to 40 feet.',

    // Gallery
    galleryTitle: 'Our Projects',
    gallerySub: 'Real results from real clients across Florida',

    // Reviews
    reviewsTitle: 'What Our Clients Say',
    reviewsSub: 'Real reviews from satisfied customers across South Florida',
    reviewsStat1: '98%', reviewsStat1d: 'Satisfaction Rate',
    reviewsStat2: '1000+', reviewsStat2d: 'Happy Clients',
    reviewsStat3: '5.0', reviewsStat3d: 'Average Rating',

    // CTA Banner
    ctaTitle: 'Ready for a Showroom Shine?',
    ctaSub: 'Book your mobile detailing service today. Same-day appointments available.',

    // FAQ
    faqTitle: 'Everything you need to know about our mobile detailing service',
    faq1Q: 'Do I need to provide water or electricity?',
    faq1A: 'No! We are completely self-sufficient. We bring our own water tanks and power generators.',
    faq2Q: 'How long does each service take?',
    faq2A: 'Service times range from 45 minutes for Express to 4 hours for Premium Detail or ceramic coating.',
    faq3Q: 'Do you service marinas and condos?',
    faq3A: 'Yes! We coordinate access with marina and condo management. Just provide the location details.',
    faq4Q: 'What payment methods do you accept?',
    faq4A: 'We accept all major credit/debit cards, Zelle and cash. Payment is due upon service completion.',
    faq5Q: 'Are your products safe for my vehicle?',
    faq5A: 'Absolutely! We use only professional-grade, pH-neutral products safe for all paint types and finishes.',

    // Contact
    contactTitle: 'Request Quote',
    contactSub: 'We\'ll contact you within the next 2 hours. Available 24/7.',
    formName: 'Full Name',
    formPhone: 'Phone / WhatsApp',
    formEmail: 'Email',
    formDate: 'Preferred Date',
    formTime: 'Preferred Time...',
    timeMorning: 'Morning',
    timeAfternoon: 'Afternoon',
    formVehicle: 'Vehicle Type...',
    formService: 'Service of Interest...',
    formPlate: 'License Plate (for smart assessment)',
    formMsg: 'Additional Details (optional)',
    formSubmit: 'Send Request',
    formWhatsapp: 'Direct WhatsApp',
    formWhatsappSub: 'Send photos and get an instant quote.',
    formWhatsappCta: 'Chat Now',
    formCallTitle: 'Direct Call',
    formCallSub: 'Speak directly with our team.',
    formPrivacy: '🛡️ Your data is protected. We never share your information.',

    // Footer
    footerAbout: 'Professional mobile car and boat detailing services. We bring premium care to your location.',
    footerServices: 'Services',
    footerAreas: 'Service Areas',
    footerContact: 'Contact Us',
    footerHours: 'Available 24/7',
    footerRights: '© 2026 ShineToGo Mobile Car Wash. Designed by Bliss Systems LLC.',

    // Sticky
    stickyCta: 'Book Now',
    whatsappText: 'Hello, I\'m interested in your mobile detailing service.'
  },
  es: {
    // Navbar
    navHome: 'Inicio',
    navServices: 'Servicios',
    navPricing: 'Paquetes',
    navGallery: 'Proyectos',
    navAbout: 'Nosotros',
    navContact: 'Contacto',
    navBook: 'Reservar',
    navCall: '(941) 952-8758',

    // Hero
    heroTag: 'DETAILING MÓVIL • REVESTIMIENTO CERÁMICO • ESPECIALISTA MARINO',
    heroTitle: 'Servicio premium de lavado de autos y detallado de botes que va a ti',
    heroCta1: 'Reserva Tu Servicio',
    heroCta2: 'Chat por WhatsApp',
    heroBadge1: 'Licenciados',
    heroBadge1b: '& Asegurados',
    heroBadge2: 'Mismo Día',
    heroBadge2b: 'Disponible',
    heroBadge3: '1000+',
    heroBadge3b: 'Clientes Felices',
    heroScroll: 'Explora más',

    // About
    aboutText: 'Somos un equipo profesional especializado en detallado móvil para autos y botes. Estándares de nivel showroom entregados en tu ubicación — asegurados, eco-friendly y obsesivamente precisos.',
    aboutCard1: 'Detallado Profesional',
    aboutCard1d: 'Acabado de showroom con técnicas profesionales y productos certificados IDA.',
    aboutCard2: '100% Móvil',
    aboutCard2d: 'Vamos a tu casa, oficina o marina. A tiempo, siempre.',
    aboutCard3: 'Asegurados & Confiables',
    aboutCard3d: 'Equipo con licencia y seguro de responsabilidad integral de $2M.',
    aboutCard4: 'Eco-Friendly',
    aboutCard4d: 'Productos biodegradables y prácticas responsables de agua.',

    // Services
    svcHeadline: 'Preservación Patrimonial por Tierra y Mar. Ejecutado en tus Coordenadas.',
    svc1Title: 'Auto Detailing',
    svc1Desc: 'Lavado exterior/interior, clay bar, pulido, cera y protección cerámica. Acabado de showroom.',
    svc1F1: 'Lavado exterior completo', svc1F2: 'Limpieza profunda interior', svc1F3: 'Clay bar y pulido', svc1F4: 'Revestimiento cerámico disponible',
    svc1Btn: 'Ver Paquetes →',
    svc1Badge: 'Más Popular',
    svc2Title: 'Detallado de Botes',
    svc2Desc: 'Lavado de casco y cubierta, desalinización, pulido de gelcoat, protección UV y cuidado de vinil.',
    svc2F1: 'Lavado y desalinización', svc2F2: 'Pulido de gelcoat', svc2F3: 'Sellador de protección UV', svc2F4: 'Cuidado de vinil e interiores',
    svc2Btn: 'Servicios Marinos →',
    svc2Badge: 'Especialidad Marina',
    svc3Title: 'Lavado de Flotas',
    svc3Desc: 'Planes corporativos mensuales para flotas con horarios flexibles y facturación.',
    svc3F1: 'Planes corporativos mensuales', svc3F2: 'Facturación comercial', svc3F3: 'Horarios flexibles', svc3F4: 'Acuerdos de nivel de servicio',
    svc3Btn: 'Cotizar →',
    svc3Badge: 'Corporativo',

    // Pricing
    pricingHeadline: 'Paquetes de Auto Detailing',
    pricingBadgeText: 'MÁS SOLICITADO',
    pricingSub: 'Elige el paquete perfecto para tu vehículo. Precio exacto basado en evaluación.',
    pkg1Title: 'Express', pkg1Time: '45–60 min', pkg1F1: 'Lavado exterior', pkg1F2: 'Rines y vidrios', pkg1F3: 'Aspirado básico',
    pkg2Title: 'Full Detail', pkg2Time: '90–120 min', pkg2F1: 'Todo en Express', pkg2F2: 'Limpieza interior profunda', pkg2F3: 'Acondicionamiento y protección',
    pkg3Title: 'Premium', pkg3Time: '3–4 horas', pkg3F1: 'Todo en Full', pkg3F2: 'Tratamiento de arcilla', pkg3F3: 'Pulido a máquina',
    pkg4Title: 'Cerámico', pkg4Time: 'Con cita', pkg4F1: 'Preparación de pintura total', pkg4F2: 'Revestimiento cerámico profesional', pkg4F3: 'Protección 1–5 años',
    pkgSelect: 'Seleccionar',
    pkgHelp: '¿No sabes qué servicio necesitas?',
    pkgHelpCta: 'Contáctanos para una consulta personalizada',

    // Process
    processHeadline: 'Un simple proceso de 4 pasos para obtener el mejor servicio de detallado móvil',
    proc1Title: 'Reserva', proc1Desc: 'Llámanos, WhatsApp o usa nuestro formulario para agendar',
    proc2Title: 'Llegamos', proc2Desc: 'Nuestro equipo llega a tiempo con todo el equipo necesario',
    proc3Title: 'Detallado', proc3Desc: 'Realizamos el servicio completo con productos profesionales',
    proc4Title: 'Inspección y Pago', proc4Desc: 'Revisamos juntos y procesamos el pago. ¡Listo para brillar!',
    processCta: '¿Listo Para Ese Brillo de Exhibición?',
    processCtaSub: 'Agenda tu servicio hoy y experimenta la diferencia',

    // Boats
    boatHeadline: 'Detallado Experto de Botes y Marinos',
    boatSub: 'Lavado profesional, desalinización, pulido de gelcoat y protección UV. Coordinamos acceso a marina.',
    boatF1: 'Lavado de Casco y Cubierta', boatF1d: 'Remoción completa de sal',
    boatF2: 'Pulido de Gelcoat', boatF2d: 'Restaura y protege el acabado',
    boatF3: 'Protección UV', boatF3d: 'Selladores de grado marino',
    boatF4: 'Vinil e Interiores', boatF4d: 'Limpieza profunda y acondicionamiento',
    boatNote: 'Acceso a Marina: Coordinamos con la administración de la marina. Servimos botes hasta 40 pies.',

    // Gallery
    galleryTitle: 'Nuestros Proyectos',
    gallerySub: 'Resultados reales de clientes reales en Florida',

    // Reviews
    reviewsTitle: 'Lo Que Dicen Nuestros Clientes',
    reviewsSub: 'Reseñas reales de clientes satisfechos en Florida',
    reviewsStat1: '98%', reviewsStat1d: 'Tasa de Satisfacción',
    reviewsStat2: '1000+', reviewsStat2d: 'Clientes Felices',
    reviewsStat3: '5.0', reviewsStat3d: 'Calificación Promedio',

    // CTA Banner
    ctaTitle: '¿Listo Para un Brillo de Exhibición?',
    ctaSub: 'Reserva tu servicio de detallado móvil hoy. Citas para el mismo día disponibles.',

    // FAQ
    faqTitle: 'Todo lo que necesitas saber sobre nuestro servicio de detallado móvil',
    faq1Q: '¿Necesito proveer agua o electricidad?',
    faq1A: '¡No! Somos completamente autosuficientes. Traemos nuestros propios tanques de agua y generadores.',
    faq2Q: '¿Cuánto toma cada servicio?',
    faq2A: 'Los tiempos van desde 45 min para Express hasta 4 horas para Premium Detail o cerámico.',
    faq3Q: '¿Atienden marinas y condominios?',
    faq3A: '¡Sí! Coordinamos acceso con la administración de marina y condominio.',
    faq4Q: '¿Qué métodos de pago aceptan?',
    faq4A: 'Aceptamos todas las tarjetas principales, Zelle y efectivo. Pago al completar el servicio.',
    faq5Q: '¿Sus productos son seguros para mi vehículo?',
    faq5A: '¡Absolutamente! Usamos solo productos profesionales pH-neutral seguros para todo tipo de pintura.',

    // Contact
    contactTitle: 'Solicitar Cotización',
    contactSub: 'Te contactamos en las próximas 2 horas. Disponible 24/7.',
    formName: 'Nombre Completo',
    formPhone: 'Teléfono / WhatsApp',
    formEmail: 'Email',
    formDate: 'Fecha Deseada',
    formTime: 'Horario Preferido...',
    timeMorning: 'Mañana',
    timeAfternoon: 'Tarde',
    formVehicle: 'Tipo de Vehículo...',
    formService: 'Servicio de Interés...',
    formPlate: 'Matrícula (para evaluación inteligente)',
    formMsg: 'Detalles adicionales (opcional)',
    formSubmit: 'Enviar Solicitud',
    formWhatsapp: 'WhatsApp Directo',
    formWhatsappSub: 'Envía fotos y obtén una cotización al instante.',
    formWhatsappCta: 'Chatear Ahora',
    formCallTitle: 'Llamada Directa',
    formCallSub: 'Habla directamente con nuestro equipo.',
    formPrivacy: '🛡️ Tus datos están protegidos. Nunca compartimos tu información.',

    // Footer
    footerAbout: 'Servicios profesionales de detallado móvil de autos y botes. Llevamos cuidado premium a tu ubicación.',
    footerServices: 'Servicios',
    footerAreas: 'Áreas de Servicio',
    footerContact: 'Contáctanos',
    footerHours: 'Disponible 24/7',
    footerRights: '© 2026 ShineToGo Mobile Car Wash. Designed by Bliss Systems LLC.',

    // Sticky
    stickyCta: 'Reservar',
    whatsappText: 'Hola, estoy interesado en su servicio de detallado móvil.'
  }
}

const I18nContext = createContext()

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = useCallback((key) => translations[lang]?.[key] || translations.en[key] || key, [lang])
  const toggle = useCallback(() => setLang(l => l === 'en' ? 'es' : 'en'), [])
  return (
    <I18nContext.Provider value={{ lang, t, toggle }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
