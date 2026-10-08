/**
 * Window Tint: contenido de la landing (EN y ES). Módulo de datos puro que lee scripts/build-landings.mjs.
 * El español está escrito para el sur-oeste de Florida (carro, polarizado, vidrios/ventanas, cotización),
 * no traducido del inglés. Reglas de docs/BRAND.md: sin cifras de calor/UV, precios, garantías ni duraciones
 * que no estén respaldados; "legal" nunca describe al polarizado (la ley mide el vidrio ya terminado).
 * Las cifras de la ley viven SOLO en la tabla y en el mapa (F.S. 316.2951-316.2957 y 316.29545).
 * Voz: de conductor a conductor. El gancho parte del problema (el carro convertido en horno), no de la lista de vidrios.
 * `{brand}` se reemplaza por el nombre corto en los títulos.
 */
export const tint = {
  en: {
    title: `Window Tint in Sarasota & Bradenton | {brand}`,
    meta: `Carbon tint or ceramic tint for your car in Sarasota and Bradenton. We go over each window’s limit with you. Send photos on WhatsApp.`,
    eyebrow: `WINDOW TINT · SARASOTA AND BRADENTON`,
    h1: `Your car, your space: more private, cooler, with less glare.`,
    heroLine: `Good tint helps with all three. And tint that filters UV helps your dash and seats too.`,
    answer: `We tint your car’s side windows, the back window and the strip across the top of the windshield, with carbon tint or ceramic tint, and the sunroof when the car allows it. Florida’s limit changes from one window to another, and we go over each one with you before we cut. Send photos on WhatsApp and we reply with a price range.`,
    pills: [`Carbon or ceramic tint`, `Quote by photo`, `We go over each window’s limit`],
    crumb: `Window Tint`,
    service: `Window Tint`,
    serviceType: `Automotive window tinting`,
    serviceDescription: `Carbon or ceramic window tint for a car’s side windows, back window and windshield strip, plus the sunroof when the car allows it, in Sarasota, Bradenton and nearby.`,

    windows: {
      title: `Which windows we tint`,
      items: [
        { i: `side`, h: `Side windows`, p: `Front and rear. The rear ones can go darker.` },
        { i: `back`, h: `Back window`, p: `Same as the sides. If it’s already dark from the factory, we tell you before we start.` },
        { i: `strip`, h: `Windshield top strip`, p: `Only the transparent strip above the AS-1 line. The rest stays as it is.` },
        { i: `roof`, h: `Sunroof`, p: `Send a photo and we tell you if it can be tinted.` },
      ],
    },

    why: {
      title: `Why people tint their cars here`,
      items: [
        { i: `heat`, h: `A cooler cabin`, p: `Heat-rejecting tint helps keep the car from heating up so much and reduces glare. The maker’s spec sheet has the numbers.` },
        { i: `sun`, h: `Kinder to the dash and seats`, p: `Tint that filters UV helps slow fading. The spec sheet says how much.` },
        { i: `lock`, h: `A little privacy`, p: `Behind the driver the law lets you go darker than up front.` },
      ],
    },

    film: {
      title: `Carbon tint or ceramic tint?`,
      lead: `Short version: carbon tint for the everyday car, ceramic tint for the car that sits in the sun all day. The table says why.`,
      head: [``, `Carbon tint`, `Ceramic tint`],
      rows: [
        [`Heat`, `Takes the edge off`, `Usually turns away more. Exact numbers are on each tint’s spec sheet`],
        [`Look`, `Dark, a little matte`, `Neutral, clearer from the inside`],
        [`Suits`, `The everyday car`, `The car that sits in the sun`],
      ],
      note: `Every tint brand writes its own warranty. Read the terms for the exact tint before you decide.`,
    },

    quote: {
      title: `How the quote works`,
      steps: [
        { h: `You send photos`, p: `Both sides and the back of the car, one of the sunroof if it has one, and one of any tint you have now. In the message: year, make, model and your ZIP code.` },
        { h: `We reply with a range`, p: `A price range, the tint we’d use and the limit for each window. The final price is set once we see the car. If it falls outside the range, we tell you before we begin and you decide.` },
        { h: `Then we set the day`, p: `If it works for you, we pick a day and confirm it with you.` },
      ],
    },

    faq: [
      { q: `Carbon tint or ceramic tint: which one should I get?`, a: `Carbon tint is the everyday choice and looks a little matte. Ceramic tint usually turns away more heat and looks clearer from the inside, which matters most on a car that sits in the sun. Send photos, tell us how you use the car, and we’ll point you to one.` },
      { q: `How dark can I go?`, a: `It depends on the window: the rear ones can go darker than the front ones. We tell you the limit for each one before we cut. If you drive an SUV or a truck, tell us which, because the rule changes with how the vehicle is classified.` },
      { q: `Can you tint the whole windshield?`, a: `Not the whole thing. Florida only allows a transparent strip across the top, above the AS-1 line printed on the glass, and that strip we can do.` },
      { q: `Is there a warranty?`, a: `Tint makers write their own warranties, and the terms differ from brand to brand. Before you decide, read the terms for the exact tint we quote you.` },
      { q: `How much does it cost?`, a: `There isn’t one price. It depends on how many windows, the tint, and whether old tint has to come off. Send photos and you’ll get a range; the final price is set once we see the car.` },
    ],

    cta: { whatsapp: `Send photos`, form: `Request a quote` },
    wa: `Hi! I’d like a window tint quote. Car (year, make, model): `,
    form: {
      title: `Get your tint quote`,
      lead: `Tell us about your car and which windows. We’ll reply with a price range.`,
    },
  },

  es: {
    title: `Polarizado de vidrios en Sarasota y Bradenton | {brand}`,
    meta: `Polarizado de carbono o polarizado cerámico para tu carro en Sarasota y Bradenton. Te decimos el límite de cada ventana. Manda fotos por WhatsApp.`,
    eyebrow: `POLARIZADO · SARASOTA Y BRADENTON`,
    h1: `Tu carro, tu espacio: más privado, más fresco y con menos resplandor.`,
    heroLine: `Un buen polarizado ayuda con las tres. Y si filtra rayos UV, también ayuda a tu tablero y tus asientos.`,
    answer: `Polarizamos las ventanas de los lados, el vidrio de atrás y la franja de arriba del parabrisas, con polarizado de carbono o cerámico, y el sunroof cuando el carro lo permite. El límite de Florida cambia de una ventana a otra y lo repasamos contigo antes de cortar. Manda fotos por WhatsApp y te respondemos con un rango de precio.`,
    pills: [`Polarizado de carbono o cerámico`, `Cotización por foto`, `Repasamos el límite de cada ventana`],
    crumb: `Polarizado de vidrios`,
    service: `Polarizado de vidrios`,
    serviceType: `Polarizado de vidrios para carros`,
    serviceDescription: `Polarizado de carbono o cerámico para las ventanas, el vidrio trasero y la franja del parabrisas de un carro, y el sunroof cuando el carro lo permite, en Sarasota, Bradenton y alrededores.`,

    windows: {
      title: `Qué vidrios polarizamos`,
      items: [
        { i: `side`, h: `Ventanas de los lados`, p: `Adelante y atrás. Las de atrás pueden ir más oscuras.` },
        { i: `back`, h: `Vidrio trasero`, p: `Igual que los lados. Si ya viene oscuro de fábrica, te lo decimos antes de empezar.` },
        { i: `strip`, h: `Franja del parabrisas`, p: `Solo la franja transparente sobre la línea AS-1. El resto se queda como está.` },
        { i: `roof`, h: `Sunroof (quemacocos)`, p: `Mándanos una foto y te decimos si se le puede poner.` },
      ],
    },

    why: {
      title: `Por qué la gente polariza aquí`,
      items: [
        { i: `heat`, h: `Un carro más fresco por dentro`, p: `Un polarizado hecho para el calor ayuda a que el carro no se caliente tanto y reduce el resplandor. La ficha del fabricante trae los números.` },
        { i: `sun`, h: `Más amable con el tablero y los asientos`, p: `Un polarizado que filtra rayos UV ayuda a frenar el descoloramiento. La ficha dice cuánto.` },
        { i: `lock`, h: `Un poco de privacidad`, p: `Atrás la ley deja ir más oscuro que adelante.` },
      ],
    },

    film: {
      title: `¿Polarizado de carbono o cerámico?`,
      lead: `Si no quieres leer la tabla: polarizado de carbono para el carro de todos los días, polarizado cerámico para el que se pasa el día al sol.`,
      head: [``, `Polarizado de carbono`, `Polarizado cerámico`],
      rows: [
        [`Calor`, `Le baja el golpe`, `Normalmente deja pasar menos. Los números exactos están en la ficha de cada modelo`],
        [`Cómo se ve`, `Oscuro y un poco mate`, `Neutro, y se ve más claro desde adentro`],
        [`Para quién`, `El carro de todos los días`, `El carro que se pasa el día al sol`],
      ],
      note: `Cada marca de polarizado escribe su propia garantía. Lee los términos del polarizado exacto antes de decidir.`,
    },

    quote: {
      title: `Cómo funciona la cotización`,
      steps: [
        { h: `Tú mandas fotos`, p: `Del carro por los dos lados y por atrás, una del sunroof si tiene, y una del polarizado que tengas ahora. En el mensaje: año, marca, modelo y tu ZIP code.` },
        { h: `Te respondemos con un rango`, p: `Un rango de precio, el polarizado que te pondríamos y el límite de cada ventana. El precio final se fija cuando vemos el carro. Si queda fuera del rango, te avisamos antes de empezar y tú decides.` },
        { h: `Después fijamos el día`, p: `Si te funciona, escogemos el día y te lo confirmamos.` },
      ],
    },

    faq: [
      { q: `Polarizado, tinte, tint: ¿es lo mismo?`, a: `Sí, es lo mismo: lo que se le pone a los vidrios del carro. «Polarizado» no es el nombre técnico, pero así lo conoce todo el mundo.` },
      { q: `¿Polarizado de carbono o cerámico? ¿Cuál me conviene?`, a: `El de carbono es el de todos los días y se ve un poco mate. El polarizado cerámico normalmente deja pasar menos calor y se ve más claro desde adentro, y eso se nota más en un carro que se pasa el día al sol. Mándanos fotos, cuéntanos cómo usas el carro y te decimos cuál va mejor.` },
      { q: `¿Qué tan oscuro lo puedo poner?`, a: `Depende de la ventana: atrás se puede más oscuro que adelante. Te decimos el límite de cada una antes de cortar. Si tu carro es SUV o camioneta, dinos cuál es, porque la regla cambia según cómo esté clasificado.` },
      { q: `¿Se puede polarizar todo el parabrisas? ¿Y el sunroof?`, a: `El parabrisas completo no: Florida solo deja la franja transparente de arriba, sobre la línea AS-1, y esa sí la hacemos. El vidrio de atrás también. Del sunroof (quemacocos), mándanos una foto y te decimos.` },
      { q: `¿Tiene garantía?`, a: `Cada marca de polarizado escribe la suya y los términos cambian. Antes de decidir, lee los del polarizado exacto que te cotizamos.` },
      { q: `¿Cuánto cuesta?`, a: `No hay un precio único: depende de cuántos vidrios, del tipo de polarizado y de si hay que quitar uno viejo. Manda fotos y te damos un rango; el precio final se fija cuando vemos el carro.` },
    ],

    cta: { whatsapp: `Manda fotos`, form: `Pedir cotización` },
    wa: `¡Hola! Quiero cotizar el polarizado de mi carro. Es un (año, marca y modelo): `,
    form: {
      title: `Pide tu cotización de polarizado`,
      lead: `Cuéntanos de tu carro y qué vidrios. Te respondemos con un rango de precio.`,
    },
  },
}
