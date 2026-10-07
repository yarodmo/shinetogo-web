/**
 * Textos de la home (React) que pertenecen a los servicios nuevos y al formulario de cotización, en EN y ES.
 * Se mezclan con los de src/i18n.jsx. Módulo de datos puro (lo lee también el generador de páginas).
 * La copia de cada landing vive aparte: src/content/tint.js y src/content/ceramic.js.
 *
 * Reglas (docs/BRAND.md): sin cifras de calor/UV, precios, garantías ni plazos que no estén respaldados;
 * nunca «legal» como cualidad de una película; en español: carro, polarizado, cotización.
 */
export const services = {
  en: {
    navTint: 'Window Tint',
    navCeramic: 'Ceramic',

    // Tarjetas de servicio de la home (cada una abre su propia página)
    svc4Title: 'Window Tint',
    svc4Desc: 'Carbon or ceramic film for your car’s side windows, back window, windshield strip and sunroof. Quote by photo.',
    svc4Alt: 'The Shine to Go van in a driveway, with a technician beside a black SUV and a table of window tint tools',
    svc4F1: 'Front and rear side windows', svc4F2: 'Back window and windshield strip', svc4F3: 'Sunroof', svc4F4: 'Carbon or ceramic film',
    svc4Btn: 'See window tint', svc4Badge: 'New',
    svc5Title: 'Ceramic Coating',
    svc5Desc: 'Ceramic coating for paint, glass, wheels, trim and interior. Quote by photo.',
    svc5Alt: 'Technician in black gloves applying ceramic coating to a car with a foam applicator, with a bottle of ceramic coating in view',
    photoBeadingAlt: 'Water beading and running off a dark, glossy surface',
    photoBeadingCaption: 'Illustration of water beading on a coated surface.',
    photoSpongeAlt: 'Gloved hand pressing a foam applicator onto a car hood',
    svc5F1: 'Paint', svc5F2: 'Glass', svc5F3: 'Wheels and calipers', svc5F4: 'Trim and interior',
    svc5Btn: 'See ceramic coating', svc5Badge: 'New',

    // Formulario de la home
    formVehicleText: 'Year, make, model',
    formDetails: 'Add details for a faster quote (optional)',
    formZip: 'ZIP code',
    formConsent: 'I agree that {brand} may text me, message me on WhatsApp and call me at the number above about my quote and appointment, including with an automated system. I understand I do not have to agree to this to get a quote or to buy anything. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.',
    formPrivacyLink: 'Privacy policy',
    formMessagingLink: 'Messaging terms',
    formSending: 'Sending…',
    formErrTitle: 'We couldn’t send your request.',
    formErrBody: 'Your details are still here. Try again, or message us on WhatsApp or call.',
    formErrFields: 'Check the highlighted fields.',
    formRetry: 'Try again',
    successTitle: 'Got it, thanks.',
    successBody: 'We’ll reply with a price range. For the fastest quote, send photos on WhatsApp.',
    successWhatsapp: 'Send photos on WhatsApp',
    successRef: 'Your reference',
    formAvailability: 'We’ll reply to let you know if we have room for the day you want.',

    consentTitle: 'Your privacy choices',
    consentBody: 'With your permission we use cookies and pixels to measure visits and ads. Your quote request works the same either way.',
    consentAccept: 'Accept',
    consentReject: 'Reject',
    consentMore: 'Privacy policy',
    footerPrivacy: 'Privacy',
    footerPrivacyChoices: 'Privacy choices',
    footerIg: 'Follow us on Instagram',
  },
  es: {
    navTint: 'Polarizado',
    navCeramic: 'Cerámico',

    svc4Title: 'Polarizado de vidrios',
    svc4Desc: 'Película de carbono o cerámica para las ventanas, el vidrio trasero, la franja del parabrisas y el sunroof de tu carro. Cotiza con fotos.',
    svc4Alt: 'La furgoneta de Shine to Go en una entrada de casa, con un técnico junto a una SUV negra y una mesa con herramientas de polarizado',
    svc4F1: 'Ventanas de adelante y de atrás', svc4F2: 'Vidrio trasero y franja del parabrisas', svc4F3: 'Sunroof (quemacocos)', svc4F4: 'Carbono o cerámica',
    svc4Btn: 'Ver polarizado', svc4Badge: 'Nuevo',
    svc5Title: 'Recubrimiento cerámico',
    svc5Desc: 'Cerámico para pintura, vidrios, rines, molduras e interior. Cotiza con fotos.',
    svc5Alt: 'Técnico con guantes negros aplicando recubrimiento cerámico a un carro con una esponja, con un frasco de cerámico a la vista',
    photoBeadingAlt: 'Agua formando gotas y escurriendo sobre una superficie oscura y brillante',
    photoBeadingCaption: 'Ilustración de agua perlando sobre una superficie con recubrimiento.',
    photoSpongeAlt: 'Mano con guante presionando una esponja aplicadora sobre el capó de un carro',
    svc5F1: 'Pintura', svc5F2: 'Vidrios', svc5F3: 'Rines y calipers', svc5F4: 'Molduras e interior',
    svc5Btn: 'Ver recubrimiento cerámico', svc5Badge: 'Nuevo',

    formVehicleText: 'Año, marca, modelo',
    formDetails: 'Agrega detalles para cotizar más rápido (opcional)',
    formZip: 'ZIP code',
    formConsent: 'Acepto que {brand} me envíe mensajes de texto, me escriba por WhatsApp y me llame al número indicado sobre mi cotización y mi cita, incluso con un sistema automatizado. Entiendo que no tengo que aceptar esto para recibir una cotización ni para comprar nada. La frecuencia de los mensajes varía. Pueden aplicar tarifas de mensajes y datos. Responde STOP para dejar de recibirlos o HELP para ayuda.',
    formPrivacyLink: 'Política de privacidad',
    formMessagingLink: 'Términos de mensajería',
    formSending: 'Enviando…',
    formErrTitle: 'No pudimos enviar tu solicitud.',
    formErrBody: 'Tus datos siguen aquí. Inténtalo de nuevo, o escríbenos por WhatsApp o llámanos.',
    formErrFields: 'Revisa los campos marcados.',
    formRetry: 'Intentar de nuevo',
    successTitle: 'Recibido, gracias.',
    successBody: 'Te respondemos con un rango de precio. Para cotizar más rápido, manda fotos por WhatsApp.',
    successWhatsapp: 'Mandar fotos por WhatsApp',
    successRef: 'Tu referencia',
    formAvailability: 'Te respondemos si tenemos espacio para el día que pides.',

    consentTitle: 'Tus opciones de privacidad',
    consentBody: 'Con tu permiso usamos cookies y píxeles para medir visitas y anuncios. Tu solicitud de cotización funciona igual en ambos casos.',
    consentAccept: 'Aceptar',
    consentReject: 'Rechazar',
    consentMore: 'Política de privacidad',
    footerPrivacy: 'Privacidad',
    footerPrivacyChoices: 'Opciones de privacidad',
    footerIg: 'Síguenos en Instagram',
  },
}
