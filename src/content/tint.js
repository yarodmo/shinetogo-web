/**
 * Window Tint: contenido de la landing (EN y ES). Módulo de datos puro que lee scripts/build-landings.mjs.
 * El español está escrito para el sur-oeste de Florida (carro, polarizado, vidrios/ventanas, cotización),
 * no traducido del inglés. Reglas de docs/BRAND.md: sin cifras de calor/UV, precios, garantías ni duraciones
 * que no estén respaldados; "legal" nunca describe al polarizado (la ley mide el vidrio ya terminado).
 * Las cifras de la ley viven SOLO en la tabla y en el mapa (F.S. 316.2951-316.2957 y 316.29545).
 * `{brand}` se reemplaza por el nombre corto en los títulos.
 */
export const tint = {
  en: {
    title: `Window Tint in Sarasota & Bradenton | {brand}`,
    meta: `Carbon or ceramic window tint for your car’s side windows, back window, windshield strip and sunroof. Quote by photo on WhatsApp. Sarasota and Bradenton.`,
    eyebrow: `WINDOW TINT · CARBON AND CERAMIC`,
    h1: `Window tint for your car’s side windows, back window, windshield strip and sunroof`,
    answer: `We tint the front and rear side windows, the back window, the transparent strip on top of the windshield and the sunroof (send a photo and we’ll tell you if tint fits). Carbon or ceramic tint, your pick. Florida sets a different minimum for each window, and we go over each one with you before we cut. Send photos on WhatsApp for a quote.`,
    pills: [`Carbon and ceramic tint`, `Quote by photo`],
    crumb: `Window Tint`,
    service: `Window Tint`,
    serviceType: `Automotive window tinting`,
    serviceDescription: `Carbon or ceramic window tint for a car’s side windows, back window, windshield strip and sunroof, in Sarasota, Bradenton and nearby.`,

    windows: {
      title: `Which windows`,
      items: [
        { h: `Side windows`, p: `Front and rear. The ones up front can’t go as dark as the ones behind the driver.` },
        { h: `Back window`, p: `Same tint as the sides, cut for the rear glass. If your car already has dark factory glass back there, there may be little room to add tint; we tell you before we start.` },
        { h: `Windshield top strip`, p: `Florida only allows the transparent strip above the AS-1 line printed on the glass. The rest of the windshield stays bare.` },
        { h: `Sunroof`, p: `Send a photo of it with the rest of the car and we’ll tell you if tint fits it.` },
      ],
    },

    why: {
      title: `Why people do it here`,
      items: [
        { h: `Parked in the sun.`, p: `Heat-rejecting tint helps keep a car that sits in a Florida parking lot all afternoon from getting so hot, and it reduces glare. How much depends on the tint; the maker’s spec sheet has the numbers.` },
        { h: `Dash and seats.`, p: `If the car sleeps outside, the dash and the seats are the first things the sun fades. UV-blocking tint helps slow that down.` },
        { h: `Some privacy.`, p: `Behind the driver the law lets you go darker than up front, and that is where most of the privacy comes from.` },
      ],
    },

    film: {
      title: `Carbon or ceramic tint?`,
      lead: `If you only want to know which to pick: carbon for the everyday car, ceramic for the car that sits in the sun all day. The table says why.`,
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
      lead: `Florida measures the finished window, glass and tint together. A tint’s own rating isn’t the number that counts, so before you pick we go over the minimum for each window of your car.`,
      head: [`Window`, `Passenger car`, `SUV, van or truck that counts as multipurpose*`],
      rows: [
        { label: `Front side windows`, cells: [`28%`] },
        { label: `Rear side windows and back window`, cells: [`15%`, `6%`] },
        { label: `Windshield`, cells: [`Transparent strip across the top, above the AS-1 line`] },
      ],
      note: `*Minimum visible light that has to get through. “Multipurpose” is the law’s word for a vehicle built to carry 10 people or fewer that is made on a truck chassis or has special features for occasional off-road use. If we can’t tell how yours is classified, we use the passenger car limit.`,
      paragraphs: [
        `Reflectivity is capped too, at 25% on the front side windows and 35% behind the driver, so most mirrored tints won’t pass. The installer has to put a label on the inside of the left door jamb that says the tint complies, with the tint’s name and the installer’s business name.`,
        `Tint that is too dark can mean a ticket for the driver (a non-moving violation in Florida).`,
        `Medical exemptions: the Florida Department of Highway Safety and Motor Vehicles issues a certificate for one vehicle, and it can’t be moved to another. If you have one for this car, tell us before you order and show it to us. We don’t give medical advice or file exemptions.`,
      ],
      foot: `Summary based on Florida Statutes 316.2951 to 316.2957 and 316.29545, checked October 5, 2026. It is not legal advice. Rules change, so confirm with the state before you order.`,
      sourceLabel: `Statute text`,
    },

    quote: {
      title: `How the quote works`,
      steps: [
        { h: `You send`, p: `Photos of the car from both sides and the back, one of the sunroof if it has one, and one of any tint you already have. In the message: year, make, model and your ZIP code.` },
        { h: `You get back`, p: `A price range, the tint we’d use and the limit for each window. The final price is set once we see the car. If it falls outside the range, we tell you before we begin and you decide.` },
        { h: `Then`, p: `If it works for you, we pick a day and confirm it with you.` },
      ],
    },

    faq: [
      { q: `Carbon or ceramic: which one should I get?`, a: `Carbon is the everyday choice and looks a little matte. Ceramic usually turns away more heat and is clearer to look through, which matters most on a car that sits in the sun. Send photos and tell us how you use the car, and we’ll point you to one.` },
      { q: `How dark can I go?`, a: `It depends on the window, and the rear ones can go darker than the front ones. The limits are in the ‘Florida tint limits, window by window’ section of this page. If you drive an SUV or a truck, tell us which, because the rule changes with how the vehicle is classified.` },
      { q: `Can you tint the whole windshield?`, a: `No. Florida only allows a transparent strip across the top, above the AS-1 line printed on the glass. That strip we can do.` },
      { q: `What about the sunroof and the back window?`, a: `The back window, yes. For the sunroof, send us a photo and we’ll tell you if tint fits it.` },
      { q: `Is there a warranty?`, a: `Tint makers write their own warranties, and the terms differ from brand to brand. Before you decide, read the terms for the exact tint we quote you.` },
      { q: `How much does it cost?`, a: `There isn’t one price. It depends on how many windows, the tint, and whether old tint has to come off. Send photos and you’ll get a range; the final price is set once we see the car.` },
    ],

    cta: { whatsapp: `Quote my tint on WhatsApp`, form: `Request a quote`, limitsLink: `Florida limits by window` },
    wa: `Hi! I’d like a window tint quote. Car (year, make, model): `,
    form: {
      title: `Get your tint quote`,
      lead: `Tell us about your car and which windows. We’ll reply with a price range.`,
    },
  },

  es: {
    title: `Polarizado de vidrios en Sarasota y Bradenton | {brand}`,
    meta: `Polarizado de carbono o cerámico para las ventanas, el vidrio trasero y el sunroof de tu carro. Cotiza con fotos por WhatsApp. Sarasota, Bradenton y Venice.`,
    eyebrow: `POLARIZADO (TINT) · CARBONO Y CERÁMICO`,
    h1: `Polarizado para las ventanas, el vidrio trasero, la franja del parabrisas y el sunroof de tu carro`,
    answer: `Polarizamos las ventanas de adelante y de atrás, el vidrio trasero, la franja transparente de arriba del parabrisas y el sunroof (quemacocos; mándanos una foto y te decimos si el polarizado le va). Carbono o cerámico, tú escoges. Florida pone un mínimo distinto para cada ventana y lo repasamos contigo antes de cortar. Manda fotos por WhatsApp y te cotizamos.`,
    pills: [`Polarizado de carbono y cerámico`, `Cotización por foto`],
    crumb: `Polarizado de vidrios`,
    service: `Polarizado de vidrios`,
    serviceType: `Polarizado de vidrios para carros`,
    serviceDescription: `Polarizado de carbono o cerámico para las ventanas, el vidrio trasero, la franja del parabrisas y el sunroof de un carro, en Sarasota, Bradenton y alrededores.`,

    windows: {
      title: `Qué vidrios`,
      items: [
        { h: `Ventanas de los lados`, p: `Las de adelante y las de atrás. Las de adelante no pueden ir tan oscuras como las de atrás.` },
        { h: `Vidrio trasero`, p: `El mismo polarizado que los lados, cortada para el vidrio de atrás. Si tu carro ya trae ese vidrio oscuro de fábrica, puede haber poco margen para agregar más polarizado; te lo decimos antes de empezar.` },
        { h: `Franja del parabrisas`, p: `En Florida solo se permite la franja transparente sobre la línea AS-1 que trae el vidrio. El resto del parabrisas queda sin polarizar.` },
        { h: `Sunroof (quemacocos)`, p: `Mándanos una foto junto con las del resto del carro y te decimos si el polarizado le va.` },
      ],
    },

    why: {
      title: `Por qué lo hace la gente aquí`,
      items: [
        { h: `Estacionado al sol.`, p: `El polarizado que rechaza calor ayuda a que un carro que pasa la tarde estacionado al sol en Florida no se ponga tan caliente, y baja el resplandor. Cuánto, depende del polarizado; la ficha del fabricante trae los números.` },
        { h: `Tablero y asientos.`, p: `Si el carro duerme afuera, el tablero y los asientos son lo primero que se descolora con el sol. El polarizado que bloquea los rayos UV ayuda a frenarlo.` },
        { h: `Algo de privacidad.`, p: `Atrás la ley deja ir más oscuro que adelante, y de ahí sale casi toda la privacidad.` },
      ],
    },

    film: {
      title: `¿Polarizado de carbono o cerámico?`,
      lead: `Si solo quieres saber cuál escoger: carbono para el carro de todos los días, cerámica para el que pasa el día al sol. La tabla dice por qué.`,
      head: [``, `Polarizado de carbono`, `Polarizado cerámico`],
      rows: [
        [`Calor`, `Le baja el golpe`, `Normalmente deja pasar menos. Los números exactos están en la ficha de cada modelo`],
        [`Cómo se ve`, `Oscura y un poco mate`, `Neutra, y se ve más clara desde adentro`],
        [`Para quién`, `El carro de diario`, `El carro que pasa el día al sol`],
      ],
      note: `Cada marca de polarizado escribe su propia garantía. Lee los términos del polarizado exacto antes de decidir.`,
    },

    limits: {
      title: `Los límites de Florida, ventana por ventana`,
      lead: `Florida mide el vidrio ya terminado: el del carro más el polarizado, juntos. El porcentaje que trae el polarizado no es el que cuenta, así que antes de que escojas repasamos contigo el mínimo de cada ventana de tu carro.`,
      head: [`Ventana`, `Carro de pasajeros`, `SUV, van o camioneta que cuenta como multipropósito*`],
      rows: [
        { label: `Ventanas de adelante`, cells: [`28 %`] },
        { label: `Ventanas de atrás y vidrio trasero`, cells: [`15 %`, `6 %`] },
        { label: `Parabrisas`, cells: [`Solo una franja transparente arriba, sobre la línea AS-1`] },
      ],
      note: `*Luz visible mínima que tiene que pasar. «Multipropósito» es como la ley llama a un vehículo para 10 personas o menos hecho sobre chasis de camión o con características para uso todoterreno ocasional. Si no podemos saber cómo está clasificado el tuyo, usamos el límite de carro de pasajeros.`,
      paragraphs: [
        `También hay tope de reflejo: 25 % en las de adelante y 35 % detrás del conductor, así que la mayoría de los polarizados espejo no pasan. El instalador tiene que pegar una etiqueta en el marco interior de la puerta izquierda que diga que el polarizado cumple, con el nombre del polarizado y el del negocio que la puso.`,
        `Si queda más oscuro de lo permitido, te pueden multar a ti, que eres el que maneja (es una infracción no moviente).`,
        `Exención médica: el Departamento de Seguridad en las Carreteras y Vehículos Motorizados de Florida (FLHSMV) da un certificado para un solo vehículo, y no se puede pasar a otro. Si tienes uno para este carro, avísanos antes de pedir y muéstranoslo. No damos consejo médico ni tramitamos exenciones.`,
      ],
      foot: `Resumen basado en los Estatutos de Florida 316.2951 a 316.2957 y 316.29545, revisado el 5 de octubre de 2026. No es asesoría legal. Las reglas cambian: confírmalas con el estado antes de hacerte el trabajo.`,
      sourceLabel: `Texto del estatuto`,
    },

    quote: {
      title: `Cómo funciona la cotización`,
      steps: [
        { h: `Tú mandas`, p: `Fotos del carro por los dos lados y por atrás, una del sunroof si tiene y una del polarizado que tengas ahora. En el mensaje: año, marca, modelo y tu ZIP code.` },
        { h: `Tú recibes`, p: `Un rango de precio, el polarizado que te pondríamos y el límite de cada ventana. El precio final se fija cuando vemos el carro. Si queda fuera del rango, te lo decimos antes de empezar y tú decides.` },
        { h: `Después`, p: `Si te funciona, fijamos el día y te lo confirmamos.` },
      ],
    },

    faq: [
      { q: `Polarizado, tinte, tint: ¿es lo mismo?`, a: `Sí. Polarizado, tinte o tint, todos hablan de lo mismo: lo que se le pone a los vidrios del carro. Lo de «polarizado» no es técnicamente exacto, pero así lo conoce todo el mundo.` },
      { q: `¿Carbono o cerámica? ¿Cuál me conviene?`, a: `El carbono es el de todos los días y se ve un poco mate. La cerámica normalmente deja pasar menos calor y se ve más clara desde adentro, algo que se nota más en un carro que pasa el día al sol. Mándanos fotos y dinos cómo usas el carro, y te decimos cuál va mejor.` },
      { q: `¿Qué tan oscuro lo puedo poner?`, a: `Depende de la ventana, y atrás se puede más oscuro que adelante. Los límites están en la sección «Los límites de Florida, ventana por ventana» de esta página. Si tu carro es SUV o camioneta, dinos cuál es, porque la regla cambia según cómo esté clasificado.` },
      { q: `¿Se puede polarizar todo el parabrisas? ¿Y el sunroof?`, a: `El parabrisas completo no: Florida solo deja una franja transparente arriba, sobre la línea AS-1. Esa franja sí la hacemos. El vidrio de atrás sí. Del sunroof (quemacocos) mándanos una foto y te decimos si el polarizado le va.` },
      { q: `¿Tiene garantía?`, a: `Cada marca de polarizado escribe la suya y los términos cambian. Antes de decidir, lee los del polarizado exacto que te cotizamos.` },
      { q: `¿Cuánto cuesta?`, a: `No hay un precio único. Depende de cuántos vidrios, del tipo de polarizado y de si hay que quitar uno viejo. Manda fotos y te damos un rango; el precio final se fija cuando vemos el carro.` },
    ],

    cta: { whatsapp: `Cotiza tu polarizado por WhatsApp`, form: `Pedir cotización`, limitsLink: `Límites de Florida por ventana` },
    wa: `¡Hola! Quiero cotizar el polarizado de mi carro. Es un (año, marca y modelo): `,
    form: {
      title: `Pide tu cotización de polarizado`,
      lead: `Cuéntanos de tu carro y qué vidrios. Te respondemos con un rango de precio.`,
    },
  },
}
