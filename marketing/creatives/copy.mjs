// Single source of truth for every string used by the creatives and the MANIFEST.
// RULES (legal veto): no numeric claims (heat rejection, UV, warranty years, hardness, counts, prices),
// no false scarcity, cars only, no brand name as text (the brand appears only through the logo).
// The only percentages allowed anywhere in the package live in the web SVGs fl-windows-map and vlt-scale (legal review).
// Round 2 (compliance veto): NEVER say the film, shade or installation is "legal" (legality belongs to the finished window).
// Approved process wording only: we EXPLAIN Florida's limits per window. Zone wording: "Sarasota · Bradenton · Tampa" (optionally "and nearby"), never with a trailing "Bay".

export const DOMAIN = 'shinetogomobiledetailing.com';
export const PHONE = '(941) 422-4405';

export const COMMON = {
  en: {
    domain: DOMAIN,
    phone: PHONE,
    area: 'Sarasota · Bradenton · Tampa',
    free: 'Free quote · Appointments subject to availability',
    films: "We explain Florida's tint limits for each window.",
    legalNote: 'Rules per F.S. 316.2951–316.2957 and 316.29545. Verify current law.',
  },
  es: {
    domain: DOMAIN,
    phone: PHONE,
    area: 'Sarasota · Bradenton · Tampa',
    free: 'Cotización gratis · Citas sujetas a disponibilidad',
    films: 'Te explicamos los límites de polarizado de Florida por ventana.',
    legalNote: 'Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente.',
  },
};

export const CONCEPTS = {
  c1: {
    slug: 'florida-sun',
    title: { en: 'Florida sun, handled', es: 'El sol de Florida, bajo control' },
    copy: {
      en: {
        h1a: 'Florida sun,',
        h1b: 'handled.',
        sub: 'Window tint for your car',
        cta: 'Get a quote by photo on WhatsApp',
      },
      es: {
        h1a: 'El sol de Florida,',
        h1b: 'bajo control.',
        sub: 'Polarizado para tu auto',
        cta: 'Cotiza por foto en WhatsApp',
      },
    },
  },
  c2: {
    slug: 'legal-tint',
    title: { en: 'Which window tint is legal in Florida?', es: '¿Qué polarizado es legal en Florida?' },
    copy: {
      en: {
        h1a: 'Which window tint',
        h1b: 'is legal in Florida?',
        chipFront: 'Front sides',
        chipRear: 'Rear sides',
        chipRw: 'Rear window',
        chipWs1: 'Windshield',
        chipWs2: 'transparent strip at the top',
        cta: "Tell us your car and we'll explain the limits",
      },
      es: {
        h1a: '¿Qué polarizado es',
        h1b: 'legal en Florida?',
        chipFront: 'Laterales delanteros',
        chipRear: 'Laterales traseros',
        chipRw: 'Luneta',
        chipWs1: 'Parabrisas',
        chipWs2: 'franja transparente superior',
        cta: 'Dinos tu auto y te explicamos los límites',
      },
    },
  },
  c3: {
    slug: 'detail-protect',
    title: { en: 'Detail it. Then protect it.', es: 'Detállalo. Luego protégelo.' },
    copy: {
      en: {
        h1a: 'Detail it.',
        h1b: 'Then protect it.',
        sub: 'Window tint + ceramic coating for your car',
        cta: 'Book your quote',
      },
      es: {
        h1a: 'Detállalo.',
        h1b: 'Luego protégelo.',
        sub: 'Polarizado + recubrimiento cerámico para tu auto',
        cta: 'Agenda tu cotización',
      },
    },
  },
};

export const FORMATS = {
  feed: { w: 1080, h: 1350, label: 'Feed 4:5' },
  story: { w: 1080, h: 1920, label: 'Story/Reel 9:16' },
  link: { w: 1200, h: 628, label: 'Enlace 1.91:1' },
};

export const OG = {
  default: {
    en: { h: 'Mobile car detailing', sub: 'Sarasota · Bradenton · Tampa & nearby' },
    es: { h: 'Detallado móvil de autos', sub: 'Sarasota · Bradenton · Tampa y alrededores' },
  },
  'window-tint': {
    en: { h: 'Window tint for your car', sub: 'Free quote by photo · Florida tint limits explained' },
    es: { h: 'Polarizado para tu auto', sub: 'Cotización gratis por foto · Límites de Florida explicados' },
  },
  'ceramic-coating': {
    en: { h: 'Ceramic coating for your car', sub: 'Free quote by photo · Sarasota, Bradenton, Tampa & nearby' },
    es: { h: 'Recubrimiento cerámico para tu auto', sub: 'Cotización gratis por foto · Sarasota, Bradenton, Tampa y alrededores' },
  },
};

// Ad copy sets (Meta/Google). Limits: primary <=125 chars, headline <=40, description <=30.
export const ADS = {
  c1: {
    en: {
      primary: [
        "Take the edge off the Florida sun. Window tint for your car. We explain Florida's limits per window. Free quote by photo.",
        'Sarasota, Bradenton, Tampa and nearby: send a photo of your car on WhatsApp for a free tint quote. Subject to availability.',
        'Glare, heat, sun: Florida driving is a lot. Ask about window tint for your car. Free quote by photo.',
      ],
      headline: ['Florida sun, handled', "Window tint: know Florida's limits", 'Get a tint quote by photo'],
      description: 'Free quote by photo',
      cta: 'Get a quote by photo on WhatsApp',
      metaButton: 'Send WhatsApp Message',
    },
    es: {
      primary: [
        'El sol de Florida, bajo control. Polarizado para tu auto. Te explicamos los límites por ventana. Cotización gratis por foto.',
        'Sarasota, Bradenton, Tampa y alrededores: manda la foto de tu auto por WhatsApp y cotizamos gratis. Sujeto a disponibilidad.',
        'Calor, reflejo y sol de Florida a diario. Pregunta por el polarizado para tu auto. Cotización gratis por foto.',
      ],
      headline: ['El sol de Florida, bajo control', 'Polarizado: conoce los límites', 'Cotiza tu polarizado por foto'],
      description: 'Cotización gratis por foto',
      cta: 'Cotiza por foto en WhatsApp',
      metaButton: 'Enviar mensaje de WhatsApp',
    },
  },
  c2: {
    en: {
      primary: [
        "Which window tint is legal in Florida? It depends on the window. Tell us your car and we'll explain the limits.",
        "Florida has different tint limits for front, rear and windshield glass. Send your car's details and we'll guide you.",
        "Not sure what the limits are for your car? Message us on WhatsApp. Free quote by photo. Subject to availability.",
      ],
      headline: ['Which tint is legal in Florida?', "Tell us your car, we explain limits", "Know your car's tint limits"],
      description: 'Free quote by photo',
      cta: "Tell us your car and we'll explain the limits",
      metaButton: 'Send WhatsApp Message',
    },
    es: {
      primary: [
        '¿Qué polarizado es legal en Florida? Depende de la ventana. Dinos tu auto y te explicamos los límites.',
        'Florida tiene límites distintos para ventanas delanteras, traseras y parabrisas. Cuéntanos de tu auto y te orientamos.',
        '¿Dudas cuáles son los límites de tu auto? Escríbenos por WhatsApp. Cotización gratis por foto. Sujeto a disponibilidad.',
      ],
      headline: ['¿Qué polarizado es legal?', 'Dinos tu auto, te explicamos', 'Conoce los límites de tu auto'],
      description: 'Cotización gratis por foto',
      cta: 'Dinos tu auto y te explicamos los límites',
      metaButton: 'Enviar mensaje de WhatsApp',
    },
  },
  c3: {
    en: {
      primary: [
        "Detail it. Then protect it. Add window tint or ceramic coating to your car's care. Free quote by photo.",
        'Sarasota, Bradenton & Tampa: get it clean, then protect it. Ask about window tint and ceramic coating. Free quote.',
        'Window tint and ceramic coating for your car. Free quote by photo. Subject to availability.',
      ],
      headline: ['Detail it. Then protect it.', 'Tint + ceramic coating quote', 'Protection for your car'],
      description: 'Free quote by photo',
      cta: 'Book your quote',
      metaButton: 'Get Quote',
    },
    es: {
      primary: [
        'Detállalo. Luego protégelo. Polarizado y recubrimiento cerámico para tu auto. Cotización gratis por foto.',
        'Sarasota, Bradenton y Tampa: primero lo dejamos limpio, luego lo protegemos. Pregunta por polarizado y cerámico.',
        'Polarizado y recubrimiento cerámico para tu auto. Cotización gratis por foto. Sujeto a disponibilidad.',
      ],
      headline: ['Detállalo. Luego protégelo.', 'Polarizado y cerámico: cotiza', 'Protección para tu auto'],
      description: 'Cotización gratis por foto',
      cta: 'Agenda tu cotización',
      metaButton: 'Solicitar cotización',
    },
  },
};
