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
    meta: `Carbon tint or ceramic tint for your car in Sarasota and Bradenton, with Florida’s limits explained. Send photos on WhatsApp for a price range.`,
    eyebrow: `WINDOW TINT · SARASOTA AND BRADENTON`,
    h1: `Is your car an oven in the sun? Tint it.`,
    heroLine: `Send photos and we reply with a price range.`,
    answer: `We tint your car’s side windows, the back window and the strip across the top of the windshield, with carbon tint or ceramic tint, and the sunroof when the car allows it. Florida’s limit changes from one window to another, and we go over each one with you before we cut. Send photos on WhatsApp and we reply with a price range.`,
    pills: [`Carbon or ceramic tint`, `Quote by photo`, `Florida limits, explained`],
    crumb: `Window Tint`,
    service: `Window Tint`,
    serviceType: `Automotive window tinting`,
    serviceDescription: `Carbon or ceramic window tint for a car’s side windows, back window and windshield strip, plus the sunroof when the car allows it, in Sarasota, Bradenton and nearby.`,

    windows: {
      title: `Which windows we tint`,
      items: [
        { h: `Side windows`, p: `Front and rear. Florida lets the rear ones go darker than the front ones.` },
        { h: `Back window`, p: `Done the same way as the sides. If your car already has dark factory glass back there, there may be little room to add tint, and we tell you before we start.` },
        { h: `Windshield top strip`, p: `On the windshield, Florida only allows the transparent strip above the AS-1 line printed on the glass. The rest stays as it is.` },
        { h: `Sunroof`, p: `Send us a photo of it with the rest of the car and we’ll tell you if it can be tinted.` },
      ],
    },

    why: {
      title: `Why people tint their cars here`,
      items: [
        { h: `The car is an oven when you get back.`, p: `Heat-rejecting tint helps keep a car from getting so hot after an afternoon in a Florida parking lot, and it reduces glare. How much depends on the tint; the maker’s spec sheet has the numbers.` },
        { h: `The sun goes after the dash and the seats.`, p: `If the car sleeps outside, the dash and the seats are the first things to fade. Tint that filters UV helps slow that down; the maker’s spec sheet says how much.` },
        { h: `A little privacy.`, p: `Behind the driver the law lets you go darker than up front, and that is where most of the privacy comes from.` },
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

    limits: {
      title: `Florida tint limits, window by window`,
      lead: `Florida doesn’t measure the tint on its own. It measures the finished window, glass and tint together, so the number on the box isn’t the one that counts. Before you choose, we go over the minimum for each window of your car.`,
      head: [`Window`, `Passenger car`, `SUV, van or truck that counts as multipurpose*`],
      rows: [
        { label: `Front side windows`, cells: [`28%`] },
        { label: `Rear side windows and back window`, cells: [`15%`, `6%`] },
        { label: `Windshield`, cells: [`Transparent strip across the top, above the AS-1 line`] },
      ],
      note: `*Minimum visible light that has to get through. “Multipurpose” is the law’s word for a vehicle built to carry 10 people or fewer that is made on a truck chassis or has special features for occasional off-road use. If we can’t tell how yours is classified, we use the passenger car limit.`,
      paragraphs: [
        `Reflectivity is capped too, at 25% on the front side windows and 35% behind the driver, so most mirrored tints won’t pass. The installer has to put a label on the inside of the left door jamb with the tint’s name and the installer’s business name, where the installer certifies that the material complies. The law still measures the finished window.`,
        `If a window ends up darker than the law allows, the ticket goes to whoever is driving (a non-moving violation in Florida). That’s why we go over each window’s minimum with you before we cut.`,
        `Medical exemptions: the Florida Department of Highway Safety and Motor Vehicles issues a certificate for one vehicle, and it can’t be moved to another. If you have one for this car, tell us before you order and show it to us. We don’t give medical advice or file exemptions.`,
      ],
      foot: `Summary based on Florida Statutes 316.2951 to 316.2957 and 316.29545, checked October 5, 2026. It is not legal advice. Rules change, so confirm with the state before you order.`,
      sourceLabel: `Statute text`,
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
      { q: `How dark can I go?`, a: `It depends on the window: the rear ones can go darker than the front ones. The limits are in the “Florida tint limits, window by window” section of this page. If you drive an SUV or a truck, tell us which, because the rule changes with how the vehicle is classified.` },
      { q: `Can you tint the whole windshield?`, a: `No. Florida only allows a transparent strip across the top, above the AS-1 line printed on the glass. That strip we can do.` },
      { q: `What about the sunroof and the back window?`, a: `The back window, yes. For the sunroof, send us a photo and we’ll tell you.` },
      { q: `Is there a warranty?`, a: `Tint makers write their own warranties, and the terms differ from brand to brand. Before you decide, read the terms for the exact tint we quote you.` },
      { q: `How much does it cost?`, a: `There isn’t one price. It depends on how many windows, the tint, and whether old tint has to come off. Send photos and you’ll get a range; the final price is set once we see the car.` },
    ],

    cta: { whatsapp: `Send photos`, form: `Request a quote`, limitsLink: `Florida limits by window` },
    wa: `Hi! I’d like a window tint quote. Car (year, make, model): `,
    form: {
      title: `Get your tint quote`,
      lead: `Tell us about your car and which windows. We’ll reply with a price range.`,
    },
  },

  es: {
    title: `Polarizado de vidrios en Sarasota y Bradenton | {brand}`,
    meta: `Polarizado de carbono o polarizado cerámico para tu carro en Sarasota y Bradenton. Te explicamos los límites de Florida. Manda fotos por WhatsApp.`,
    eyebrow: `POLARIZADO · SARASOTA Y BRADENTON`,
    h1: `¿Tu carro es un horno al sol? Polarízalo.`,
    heroLine: `Manda fotos y te damos un rango de precio.`,
    answer: `Polarizamos las ventanas de los lados, el vidrio de atrás y la franja de arriba del parabrisas, con polarizado de carbono o cerámico, y el sunroof cuando el carro lo permite. El límite de Florida cambia de una ventana a otra y lo repasamos contigo antes de cortar. Manda fotos por WhatsApp y te respondemos con un rango de precio.`,
    pills: [`Polarizado de carbono o cerámico`, `Cotización por foto`, `Límites de Florida explicados`],
    crumb: `Polarizado de vidrios`,
    service: `Polarizado de vidrios`,
    serviceType: `Polarizado de vidrios para carros`,
    serviceDescription: `Polarizado de carbono o cerámico para las ventanas, el vidrio trasero y la franja del parabrisas de un carro, y el sunroof cuando el carro lo permite, en Sarasota, Bradenton y alrededores.`,

    windows: {
      title: `Qué vidrios polarizamos`,
      items: [
        { h: `Ventanas de los lados`, p: `Las de adelante y las de atrás. En Florida las de atrás pueden ir más oscuras que las de adelante.` },
        { h: `Vidrio trasero`, p: `Se hace igual que los lados. Si tu carro ya trae ese vidrio oscuro de fábrica, puede que quede poco margen para agregar más; te lo decimos antes de empezar.` },
        { h: `Franja del parabrisas`, p: `Del parabrisas, Florida solo permite la franja transparente de arriba, sobre la línea AS-1 que trae el vidrio. El resto se queda como está.` },
        { h: `Sunroof (quemacocos)`, p: `Mándanos una foto junto con las del resto del carro y te decimos si se le puede poner.` },
      ],
    },

    why: {
      title: `Por qué la gente polariza aquí`,
      items: [
        { h: `Vuelves al carro y es un horno.`, p: `Un polarizado hecho para el calor ayuda a que el carro no se caliente tanto después de una tarde estacionado al sol en Florida, y reduce el resplandor. Cuánto depende del polarizado; la ficha del fabricante trae los números.` },
        { h: `El sol se ensaña con el tablero y los asientos.`, p: `Si el carro duerme afuera, el tablero y los asientos son lo primero que se descolora. Un polarizado que filtra rayos UV ayuda a frenarlo; la ficha del fabricante dice cuánto.` },
        { h: `Un poco de privacidad.`, p: `Atrás la ley deja ir más oscuro que adelante, y de ahí sale casi toda la privacidad.` },
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

    limits: {
      title: `Los límites de Florida, ventana por ventana`,
      lead: `Florida no mide el polarizado solo. Mide el vidrio ya terminado, el del carro más el polarizado, así que el porcentaje de la caja no es el que cuenta. Antes de que escojas, repasamos contigo el mínimo de cada ventana de tu carro.`,
      head: [`Ventana`, `Carro de pasajeros`, `SUV, van o camioneta que cuenta como multipropósito*`],
      rows: [
        { label: `Ventanas de adelante`, cells: [`28 %`] },
        { label: `Ventanas de atrás y vidrio trasero`, cells: [`15 %`, `6 %`] },
        { label: `Parabrisas`, cells: [`Solo una franja transparente arriba, sobre la línea AS-1`] },
      ],
      note: `*Luz visible mínima que tiene que pasar. «Multipropósito» es como la ley llama a un vehículo para 10 personas o menos hecho sobre chasis de camión o con características para uso todoterreno ocasional. Si no podemos saber cómo está clasificado el tuyo, usamos el límite de carro de pasajeros.`,
      paragraphs: [
        `También hay tope de reflejo: 25 % en las de adelante y 35 % detrás del conductor, así que la mayoría de los polarizados espejo no pasan. El instalador tiene que pegar una etiqueta en el marco interior de la puerta izquierda con el nombre del polarizado y el del negocio que lo puso, donde el instalador certifica que el material cumple. La ley mide la ventana terminada.`,
        `Si una ventana queda más oscura de lo que permite la ley, la multa le llega a quien maneje (es una infracción no moviente). Por eso repasamos contigo el mínimo de cada ventana antes de cortar.`,
        `Exención médica: el Departamento de Seguridad en las Carreteras y Vehículos Motorizados de Florida (FLHSMV) da un certificado para un solo vehículo, y no se puede pasar a otro. Si tienes uno para este carro, avísanos antes de pedir y muéstranoslo. No damos consejo médico ni tramitamos exenciones.`,
      ],
      foot: `Resumen basado en los Estatutos de Florida 316.2951 a 316.2957 y 316.29545, revisado el 5 de octubre de 2026. No es asesoría legal. Las reglas cambian: confírmalas con el estado antes de hacerte el trabajo.`,
      sourceLabel: `Texto del estatuto`,
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
      { q: `¿Qué tan oscuro lo puedo poner?`, a: `Depende de la ventana: atrás se puede más oscuro que adelante. Los límites están en la sección «Los límites de Florida, ventana por ventana» de esta página. Si tu carro es SUV o camioneta, dinos cuál es, porque la regla cambia según cómo esté clasificado.` },
      { q: `¿Se puede polarizar todo el parabrisas? ¿Y el sunroof?`, a: `El parabrisas completo no: Florida solo deja la franja transparente de arriba, sobre la línea AS-1, y esa sí la hacemos. El vidrio de atrás también. Del sunroof (quemacocos), mándanos una foto y te decimos.` },
      { q: `¿Tiene garantía?`, a: `Cada marca de polarizado escribe la suya y los términos cambian. Antes de decidir, lee los del polarizado exacto que te cotizamos.` },
      { q: `¿Cuánto cuesta?`, a: `No hay un precio único: depende de cuántos vidrios, del tipo de polarizado y de si hay que quitar uno viejo. Manda fotos y te damos un rango; el precio final se fija cuando vemos el carro.` },
    ],

    cta: { whatsapp: `Manda fotos`, form: `Pedir cotización`, limitsLink: `Límites de Florida por ventana` },
    wa: `¡Hola! Quiero cotizar el polarizado de mi carro. Es un (año, marca y modelo): `,
    form: {
      title: `Pide tu cotización de polarizado`,
      lead: `Cuéntanos de tu carro y qué vidrios. Te respondemos con un rango de precio.`,
    },
  },
}
