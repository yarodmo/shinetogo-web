/**
 * Ceramic Coating: contenido de la landing (EN y ES). Módulo de datos puro que lee scripts/build-landings.mjs.
 * Es una línea de servicio aparte del window tint: no comparte tarjetas, preguntas ni formulario con él.
 * Superficies: las que cubre un recubrimiento cerámico en autos (pintura, vidrios, rines y calipers, molduras y
 * plásticos de afuera, interior). Sin cifras, duraciones, precios ni garantías; el único modal de eficacia es «ayuda».
 * Lo que dependa del dueño (producto, garantía, faros) no se publica hasta tenerlo; ver docs/OPEN-QUESTIONS.md.
 * `{brand}` se reemplaza por el nombre corto en los títulos.
 */
export const ceramic = {
  en: {
    title: `Ceramic Coating in Sarasota & Bradenton | {brand}`,
    meta: `Ceramic coating for your car’s paint, glass, wheels, trim and interior in Sarasota and Bradenton. Prep first. Send photos on WhatsApp for a price range.`,
    eyebrow: `CERAMIC COATING · SARASOTA AND BRADENTON`,
    h1: `Dull paint? Bring back the shine.`,
    heroLine: `Almost always, we polish the paint first, as far as the paint allows. Then the coating helps dirt and water spots wash off more easily.`,
    answer: `A ceramic coating is a thin, slick layer that bonds to the surface under it and helps dirt and water let go more easily. We do paint, glass, wheels and calipers, exterior trim and the interior. It isn’t scratch-proof, and the prep underneath is part of the job. Send photos on WhatsApp and we reply with a price range.`,
    pills: [`Paint, glass, wheels, trim, interior`, `Quote by photo`, `Prep comes first`],
    crumb: `Ceramic Coating`,
    service: `Ceramic Coating`,
    serviceType: `Automotive ceramic coating`,
    serviceDescription: `Ceramic coating for a car’s paint, glass, wheels and calipers, exterior trim and interior, in Sarasota, Bradenton and nearby.`,

    choose: {
      title: `What do you want covered?`,
      lead: `Pick the parts you want and send one photo of each.`,
      rows: [
        { id: `paint`, i: `paint`, name: `Paint`, does: `Helps dirt, bird droppings and water spots come off more easily when you wash.` },
        { id: `glass`, i: `glass`, name: `Glass`, does: `Helps rain bead up and run off. It doesn’t replace your wipers.` },
        { id: `wheels`, i: `wheels`, name: `Wheels and calipers`, does: `Helps brake dust stick less and come off more easily when you wash. Tell us if they’re painted, polished or chrome.` },
        { id: `trim`, i: `trim`, name: `Exterior trim`, does: `For black plastic and rubber that is still dark. A coating can’t bring back color that has already faded.` },
        { id: `interior`, i: `interior`, name: `Interior`, does: `Seats, leather, fabric and plastics. We confirm the product for each material before we start.` },
      ],
    },

    prep: {
      title: `The prep comes first`,
      p: `A coating seals in whatever is under it, scratches included. So the paint is washed, decontaminated and, almost always, polished first.`,
    },

    doesnt: {
      title: `What a coating doesn’t do`,
      p: `It isn’t armor: scratches and rock chips can still happen, and the car still needs washing. We don’t put a number on how long it lasts; that depends on the product, the prep and how you wash.`,
    },

    local: {
      title: `Two things about washing your car here`,
      items: [
        {
          h: `Lovebugs.`,
          p: `They fly about four weeks in April–May and again in August–September. Their remains are slightly acidic and can etch the paint if left for several days, so wash them off soon. A coating gives them a slicker surface, which helps the wash; it doesn’t stop them.`,
          source: { label: `UF/IFAS`, url: `https://ask.ifas.ufl.edu/publication/IN204` },
        },
        {
          h: `If you wash it yourself.`,
          p: `Under the Southwest Florida Water Management District’s water-shortage order (news release of September 22, 2026, in effect through March 31, 2027), washing a car at home (non-commercial) is allowed only on your lawn watering day, with a hose that has a shutoff nozzle. It covers Manatee, Sarasota, Hillsborough and Pinellas counties, among others. Rules can change; check the District’s page.`,
          source: { label: `SWFWMD`, url: `https://www.swfwmd.state.fl.us/the-newsroom/2026/district-extends-modified-phase-iii-water-shortage-0` },
          until: `2027-03-31`,
        },
      ],
    },

    quote: {
      title: `How the quote works`,
      steps: [
        { h: `You send photos`, p: `Hood, roof and sides in daylight, and the paint color. If you want glass, wheels, trim or the interior, one photo of each, and tell us which.` },
        { h: `We reply with a range`, p: `A price range, the product we’d use and how to care for it. The final price is set once we see the paint. If it falls outside the range, we tell you before we begin and you decide.` },
        { h: `Then we set the day`, p: `We pick a day and confirm it with you.` },
      ],
    },

    faq: [
      { q: `Is a ceramic coating scratch-proof?`, a: `No. It’s a thin, slick layer on top of the clear coat. Scratches, swirls and rock chips can still happen. What changes is how easily dirt, bird droppings and water spots come off.` },
      { q: `Which parts of the car can you coat?`, a: `Paint, glass, wheels and calipers, exterior trim and plastics, and the interior. Tell us which ones you want and send a photo of each.` },
      { q: `Does the paint get polished first?`, a: `Almost always. A coating seals in what’s under it, so the paint is washed, decontaminated and polished first. How far we go depends on the paint.` },
      { q: `How long does a coating last?`, a: `We don’t put a number on it here. It depends on the product, how the paint was prepared and how the car is washed. The warranty belongs to the product, so ask for its exact terms with your quote.` },
      { q: `Salt, lovebugs, sprinkler water: does the coating stop them?`, a: `No coating stops them, and we don’t promise anything about salt or sprinkler water. With lovebugs, a slicker surface helps when you wash; still, try not to leave them on the paint for days.` },
      { q: `How much does it cost?`, a: `There isn’t one price. It depends on how many parts you cover, the size of the car and the state of the paint. Send photos and you’ll get a range; the final price is set once we see the car.` },
    ],

    cta: { whatsapp: `Send photos`, form: `Request a quote` },
    wa: `Hi! I’d like a ceramic coating quote. Car (year, make, model): `,
    form: {
      title: `Get your ceramic coating quote`,
      lead: `Tell us about your car and what you want covered.`,
    },
  },

  es: {
    title: `Recubrimiento cerámico en Sarasota y Bradenton | {brand}`,
    meta: `Recubrimiento cerámico para la pintura, los vidrios, los rines, las molduras y el interior de tu carro en Sarasota y Bradenton. Manda fotos por WhatsApp.`,
    eyebrow: `RECUBRIMIENTO CERÁMICO · SARASOTA Y BRADENTON`,
    h1: `¿Pintura opaca? Devuélvele el brillo.`,
    heroLine: `Casi siempre pulimos la pintura primero, hasta donde la pintura lo permita. Después, el cerámico ayuda a que la tierra y las manchas de agua se quiten más fácil al lavar.`,
    answer: `El recubrimiento cerámico (ceramic coating) es una capa fina y lisa que se pega a la superficie y ayuda a que la tierra y el agua se suelten más fácil. Lo hacemos en pintura, vidrios, rines y calipers, molduras de afuera e interior. No evita los rayones, y la preparación es parte del trabajo. Manda fotos por WhatsApp y te damos un rango.`,
    pills: [`Pintura, vidrios, rines, molduras, interior`, `Cotización por foto`, `Primero la preparación`],
    crumb: `Recubrimiento cerámico`,
    service: `Recubrimiento cerámico`,
    serviceType: `Recubrimiento cerámico para carros`,
    serviceDescription: `Recubrimiento cerámico para la pintura, los vidrios, los rines y calipers, las molduras de afuera y el interior de un carro, en Sarasota, Bradenton y alrededores.`,

    choose: {
      title: `¿Qué quieres cubrir?`,
      lead: `Escoge las partes que quieres y manda una foto de cada una.`,
      rows: [
        { id: `paint`, i: `paint`, name: `Pintura`, does: `Ayuda a que la tierra, lo que dejan los pájaros y las manchas de agua se quiten más fácil al lavar.` },
        { id: `glass`, i: `glass`, name: `Vidrios`, does: `Ayuda a que el agua de lluvia forme gotas y corra. No sustituye los limpiaparabrisas.` },
        { id: `wheels`, i: `wheels`, name: `Rines (aros) y calipers`, does: `Ayuda a que el polvo de los frenos se pegue menos y salga más fácil al lavar. Dinos si son pintados, pulidos o cromados.` },
        { id: `trim`, i: `trim`, name: `Molduras de afuera`, does: `Para plástico y goma negros que todavía están oscuros. Un recubrimiento no devuelve el color que ya se perdió.` },
        { id: `interior`, i: `interior`, name: `Interior`, does: `Asientos, cuero, tela y plásticos. Antes de empezar confirmamos el producto para cada material.` },
      ],
    },

    prep: {
      title: `Primero la preparación`,
      p: `El recubrimiento sella lo que haya debajo, rayones incluidos. Por eso la pintura se lava, se descontamina y, casi siempre, se pule primero.`,
    },

    doesnt: {
      title: `Lo que un recubrimiento no hace`,
      p: `No es una armadura: los rayones y las piedritas de la carretera todavía pueden pasar, y el carro se sigue lavando. No ponemos una cifra de cuánto dura; depende del producto, de la preparación y de cómo lo laves.`,
    },

    local: {
      title: `Dos cosas de lavar tu carro aquí`,
      items: [
        {
          h: `Lovebugs.`,
          p: `Vuelan unas cuatro semanas en abril–mayo y otra vez en agosto–septiembre. Sus restos son un poco ácidos y pueden dañar la pintura si se quedan varios días, así que conviene lavarlos pronto. El recubrimiento les da una superficie más lisa y eso ayuda al lavado; no los frena.`,
          source: { label: `UF/IFAS`, url: `https://ask.ifas.ufl.edu/publication/IN204` },
        },
        {
          h: `Si lo lavas tú.`,
          p: `Según la orden de escasez de agua del Distrito de Manejo de Aguas del Suroeste de Florida (comunicado del 22 de septiembre de 2026, vigente hasta el 31 de marzo de 2027), lavar un carro en casa (sin fines comerciales) solo se permite en tu día de riego y con una manguera con boquilla de cierre. Cubre, entre otros, los condados de Manatee, Sarasota, Hillsborough y Pinellas. Las reglas pueden cambiar: revisa la página del Distrito.`,
          source: { label: `SWFWMD`, url: `https://www.swfwmd.state.fl.us/the-newsroom/2026/district-extends-modified-phase-iii-water-shortage-0` },
          until: `2027-03-31`,
        },
      ],
    },

    quote: {
      title: `Cómo funciona la cotización`,
      steps: [
        { h: `Tú mandas fotos`, p: `Capó, techo y laterales con luz de día, y el color de la pintura. Si quieres vidrios, rines, molduras o interior, una foto de cada uno y dinos cuáles.` },
        { h: `Te respondemos con un rango`, p: `Un rango de precio, el producto que usaríamos y cómo cuidarlo. El precio final se fija cuando vemos la pintura. Si queda fuera del rango, te avisamos antes de empezar y tú decides.` },
        { h: `Después fijamos el día`, p: `Escogemos el día y te lo confirmamos.` },
      ],
    },

    faq: [
      { q: `¿El recubrimiento cerámico evita los rayones?`, a: `No. Es una capa fina y lisa encima del barniz. Los rayones, los remolinos y las piedritas de la carretera pueden seguir pasando. Lo que cambia es lo fácil que se quitan la tierra, lo que dejan los pájaros y las manchas de agua.` },
      { q: `¿Qué partes del carro se pueden cubrir?`, a: `Pintura, vidrios, rines y calipers, molduras y plásticos de afuera, e interior. Dinos cuáles quieres y manda una foto de cada una.` },
      { q: `¿Hay que pulir la pintura antes?`, a: `Casi siempre. El recubrimiento sella lo que tenga debajo, así que primero se lava, se descontamina y se pule. Hasta dónde llegamos depende de la pintura.` },
      { q: `¿Cuánto dura?`, a: `No ponemos una cifra aquí. Depende del producto, de cómo se preparó la pintura y de cómo lavas el carro. La garantía es la del producto, así que pide sus términos exactos con tu cotización.` },
      { q: `Sal, lovebugs, agua de aspersor: ¿el recubrimiento los frena?`, a: `Ningún recubrimiento los frena, y no prometemos nada sobre la sal ni el agua de aspersor. Con los lovebugs, una superficie más lisa ayuda al lavar; aun así, intenta no dejarlos varios días sobre la pintura.` },
      { q: `¿Cuánto cuesta?`, a: `No hay un precio único. Depende de cuántas partes cubras, del tamaño del carro y del estado de la pintura. Manda fotos y te damos un rango; el precio final se fija cuando vemos el carro.` },
    ],

    cta: { whatsapp: `Manda fotos`, form: `Pedir cotización` },
    wa: `¡Hola! Quiero cotizar un recubrimiento cerámico. Mi carro es un (año, marca y modelo): `,
    form: {
      title: `Pide tu cotización de recubrimiento cerámico`,
      lead: `Cuéntanos de tu carro y qué quieres cubrir.`,
    },
  },
}
