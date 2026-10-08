// Single source of truth for every string used by the creatives and the MANIFEST.
// RULES (legal veto + owner clarifications, round 3):
//  - No numeric claims (heat rejection, UV, warranty years, hardness, counts, prices). No "9H", "lifetime", "scratch-proof".
//  - Never say the film, shade or installation is "legal" (legality belongs to the finished window). Process wording only:
//    we EXPLAIN Florida's limits per window. (Only the C2 image headline asks the question.)
//  - Window Tint and Ceramic Coating are two COMPLETELY SEPARATE services: no creative mixes them.
//      tint     = every glass on the car, sunroof included (C1, C2)
//      ceramic  = every treatment: paint, glass, wheels and calipers, exterior trim and plastics, interior (C3)
//  - Service area: Sarasota, Bradenton, Manatee County, Venice, St. Petersburg, Brandon, Lido Key, Siesta Key,
//    Longboat Key and nearby. Strip text: "Sarasota · Bradenton · Venice · St. Pete" (+ "& nearby / y alrededores").
//    One more city is NOT in the service area and must not appear anywhere (audit.mjs lint fails on it).
//  - No false scarcity or urgency; no prices; no brand name as text (the logo carries it).
//  - No photos of cars: the only approved imagery is schematic (no hero-finish.jpg, no gallery photos).
//  - Spanish: "carro", "polarizado", "vidrios/ventanas", "cotización", "rines", "sunroof (quemacocos)";
//    "película cerámica" for the tint film, "recubrimiento cerámico" for the ceramic service.

export const DOMAIN = 'shinetogomobiledetailing.com';
export const PHONE = '(941) 422-4405';

export const COMMON = {
  en: {
    domain: DOMAIN,
    phone: PHONE,
    area: 'Sarasota · Bradenton · Venice · St. Pete',
    free: 'Appointments subject to availability',
    films: "We explain Florida's tint limits for each window.",
    legalNote: 'Rules per F.S. 316.2951–316.2957 and 316.29545. Verify current law.',
  },
  es: {
    domain: DOMAIN,
    phone: PHONE,
    area: 'Sarasota · Bradenton · Venice · St. Pete',
    free: 'Citas sujetas a disponibilidad',
    films: 'Te explicamos los límites de polarizado de Florida por ventana.',
    legalNote: 'Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente.',
  },
};

export const CONCEPTS = {
  c1: {
    service: 'tint',
    slug: 'tint-windows',
    template: 'c1-tint-windows.html',
    title: { en: 'Window tint for your car', es: 'Polarizado para tu carro' },
    copy: {
      en: { h1a: 'Window tint for your car', h1b: 'Carbon or ceramic film.', cta: 'Quote my tint on WhatsApp' },
      es: { h1a: 'Polarizado para tu carro', h1b: 'Película de carbono o cerámica.', cta: 'Cotiza tu polarizado por WhatsApp' },
    },
  },
  c2: {
    service: 'tint',
    slug: 'tint-limits',
    template: 'c2-tint-limits.html',
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
        chipRw: 'Vidrio trasero',
        chipWs1: 'Parabrisas',
        chipWs2: 'franja transparente superior',
        cta: 'Dinos tu carro y te explicamos los límites',
      },
    },
  },
  c3: {
    service: 'ceramic',
    slug: 'ceramic-surfaces',
    template: 'c3-ceramic-surfaces.html',
    title: { en: 'Ceramic coating, not only for the paint', es: 'Cerámico, y no solo para la pintura' },
    copy: {
      en: {
        h1a: 'Ceramic coating,',
        h1b: 'not only for the paint',
        s1: 'Paint',
        s2: 'Glass',
        s3: 'Wheels and calipers',
        s4: 'Trim',
        s5: 'Interior',
        prep: 'Prep first, coating after.',
        cta: 'Quote my coating on WhatsApp',
      },
      es: {
        h1a: 'Cerámico,',
        h1b: 'y no solo para la pintura',
        s1: 'Pintura',
        s2: 'Vidrios',
        s3: 'Rines y calipers',
        s4: 'Molduras',
        s5: 'Interior',
        prep: 'Primero la preparación, luego el recubrimiento.',
        cta: 'Cotiza tu recubrimiento por WhatsApp',
      },
    },
  },
};

export const FORMATS = {
  feed: { w: 1080, h: 1350, label: 'Feed 4:5' },
  story: { w: 1080, h: 1920, label: 'Story/Reel 9:16' },
  link: { w: 1200, h: 628, label: 'Enlace 1.91:1' },
};

// Open Graph. "\n" = line break in the subtitle. Every OG shows logo, domain and phone.
export const OG = {
  default: {
    service: 'brand',
    en: { h: 'Car wash and boat detailing that comes to you', sub: 'Sarasota · Bradenton · Venice\nSt. Pete & nearby' },
    es: { h: 'Lavado de carros y detallado de botes a domicilio', sub: 'Sarasota · Bradenton · Venice\nSt. Pete y alrededores' },
  },
  'window-tint': {
    service: 'tint',
    en: { h: 'Window tint for your car’s side and back windows', sub: 'Free quote by photo\nFlorida tint limits explained' },
    es: { h: 'Polarizado para las ventanas y el vidrio trasero de tu carro', sub: 'Cotización gratis por foto\nLímites de Florida explicados' },
  },
  'ceramic-coating': {
    service: 'ceramic',
    en: { h: 'Ceramic coating for paint, glass, wheels, trim and interior', sub: 'Free quote by photo\nPrep first, coating after.' },
    es: { h: 'Recubrimiento cerámico para pintura, vidrios, rines, molduras e interior', sub: 'Cotización gratis por foto\nPrimero la preparación, luego el recubrimiento.' },
  },
};

// Ad copy sets (Meta/Google), one service per concept. Limits: primary <=125 chars, headline <=40, description <=30.
// C1 and C2 sell Window Tint; C3 sells Ceramic Coating. No "legal" applied to film/shade in any ad text.
export const ADS = {
  c1: {
    en: {
      primary: [
        'Florida sun is no joke. Carbon or ceramic window film for your car. Send a photo on WhatsApp for a quote.',
        'Window tint in Sarasota, Bradenton, Venice and St. Pete. Send a photo of your car for a free quote.',
        "Carbon or ceramic film for your side and back windows. We explain Florida's tint limits for each one.",
      ],
      headline: ['Window tint for your car', 'Carbon or ceramic film', 'Quote your window tint by photo'],
      description: 'Free quote by photo',
      cta: 'Quote my tint on WhatsApp',
      metaButton: 'Send WhatsApp Message',
    },
    es: {
      primary: [
        'El sol de Florida no perdona. Película de carbono o cerámica para tu carro. Cotiza por foto en WhatsApp.',
        'Polarizado en Sarasota, Bradenton, Venice y St. Pete. Manda una foto de tu carro y te cotizamos gratis.',
        'Película de carbono o cerámica para las ventanas y el vidrio trasero. Te explicamos los límites de Florida por ventana.',
      ],
      headline: ['Polarizado para tu carro', 'Película de carbono o cerámica', 'Cotiza tu polarizado por foto'],
      description: 'Cotización gratis por foto',
      cta: 'Cotiza tu polarizado por WhatsApp',
      metaButton: 'Enviar mensaje de WhatsApp',
    },
  },
  c2: {
    en: {
      primary: [
        "What tint can your car have in Florida? It changes by window. Tell us your car and we'll explain the limits.",
        'Front windows, back windows and windshield each have their own tint limits in Florida. We explain yours.',
        'Not sure what your car can have? Message us the year and model on WhatsApp. Appointments subject to availability.',
      ],
      headline: ['Florida window tint limits', "Know your car's tint limits", 'Tint limits, window by window'],
      description: 'Free quote by photo',
      cta: "Tell us your car and we'll explain the limits",
      metaButton: 'Send WhatsApp Message',
    },
    es: {
      primary: [
        '¿Qué polarizado puede llevar tu carro en Florida? Cambia por ventana. Dinos tu carro y te explicamos los límites.',
        'Ventanas de adelante, de atrás y parabrisas: cada una tiene sus límites en Florida. Te explicamos los de tu carro.',
        '¿No sabes qué puede llevar tu carro? Escríbenos por WhatsApp con el año y modelo. Citas sujetas a disponibilidad.',
      ],
      headline: ['Límites de polarizado en Florida', 'Conoce los límites de tu carro', 'Límites por ventana, explicados'],
      description: 'Cotización gratis por foto',
      cta: 'Dinos tu carro y te explicamos los límites',
      metaButton: 'Enviar mensaje de WhatsApp',
    },
  },
  c3: {
    en: {
      primary: [
        "Ceramic coating isn't only for the paint. Glass, wheels and calipers, exterior trim and the interior can be coated too.",
        'Ceramic coating in Sarasota, Bradenton, Venice and St. Pete. Prep first, coating after. Send photos for a free quote.',
        'Paint, glass, wheels, trim, interior: tell us what you want coated and send photos on WhatsApp for a quote.',
      ],
      headline: ['Ceramic coating, not only paint', 'Coat the glass, wheels and interior', 'Quote your coating by photo'],
      description: 'Free quote by photo',
      cta: 'Quote my coating on WhatsApp',
      metaButton: 'Send WhatsApp Message',
    },
    es: {
      primary: [
        'El recubrimiento cerámico no es solo para la pintura. También vidrios, rines y calipers, molduras e interior.',
        'Recubrimiento cerámico en Sarasota, Bradenton, Venice y St. Pete. Primero la preparación, luego el recubrimiento.',
        'Pintura, vidrios, rines, molduras, interior: dinos qué quieres recubrir y manda fotos por WhatsApp para cotizar.',
      ],
      headline: ['Recubrimiento cerámico, no solo pintura', 'Vidrios, rines e interior también', 'Cotiza tu recubrimiento por foto'],
      description: 'Cotización gratis por foto',
      cta: 'Cotiza tu recubrimiento por WhatsApp',
      metaButton: 'Enviar mensaje de WhatsApp',
    },
  },
};
