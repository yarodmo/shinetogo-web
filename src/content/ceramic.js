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
    meta: `Ceramic coating for paint, glass, wheels, trim and interior. Prep first, coating after. Send photos on WhatsApp for a quote. Sarasota and Bradenton.`,
    eyebrow: `CERAMIC COATING`,
    h1: `Ceramic coating for paint, glass, wheels, trim and interior`,
    answer: `A ceramic coating is a hard, slick layer that bonds to the surface under it and helps dirt and water let go more easily. We do paint, glass, wheels and calipers, exterior trim and the interior. It isn’t scratch-proof, and the prep underneath is part of the job. Send photos on WhatsApp for a quote.`,
    pills: [`Paint, glass, wheels, trim, interior`, `Quote by photo`],
    crumb: `Ceramic Coating`,
    service: `Ceramic Coating`,
    serviceType: `Automotive ceramic coating`,
    serviceDescription: `Ceramic coating for a car’s paint, glass, wheels and calipers, exterior trim and interior, in Sarasota, Bradenton and nearby.`,

    choose: {
      title: `What do you want covered?`,
      lead: `A coating isn’t only for the paint. Pick the parts you want, and send one photo of each.`,
      head: [`Surface`, `What it does`, `What to send`],
      rows: [
        { id: `paint`, name: `Paint`, does: `Helps dirt, bird droppings and water spots come off more easily when you wash`, send: `Hood, roof and sides in daylight, plus the color` },
        { id: `glass`, name: `Glass`, does: `Helps rain bead up and run off`, send: `A photo of the windshield from outside` },
        { id: `wheels`, name: `Wheels and calipers`, does: `A coating for wheels and calipers, put on after cleaning and decontamination`, send: `A photo of the wheels and the calipers` },
        { id: `trim`, name: `Exterior trim and plastics`, does: `Black plastic and rubber trim that is still dark. A coating can’t bring back color that has already faded.`, send: `A photo of the trim` },
        { id: `interior`, name: `Interior`, does: `Seats, leather, fabric and plastics. We confirm the product for each material before we start.`, send: `A photo of the seats and the dash` },
      ],
    },

    modules: [
      { id: `paint`, h: `Paint`, p: `The coating goes on the clear coat after a wash, decontamination and a polish to whatever level the paint needs. It helps dirt, bird droppings and water spots come off more easily when you wash.` },
      { id: `glass`, h: `Glass`, p: `A coating for the windshield and windows that helps rain bead up and run off. It doesn’t replace your wipers. Rainy season here runs from about mid-to-late May to mid-October.`, source: { label: `National Weather Service`, url: `https://www.weather.gov/tbw/rainyseason` } },
      { id: `wheels`, h: `Wheels and calipers`, p: `Wheels take the brake dust and the road grime. A coating made for wheels and calipers helps brake dust stick less and makes it easier to wash off. Tell us if the wheels are painted, polished or chrome.` },
      { id: `trim`, h: `Exterior trim and plastics`, p: `The sun turns black plastic and rubber gray. This coating goes on trim that is still dark; it can’t bring back color that has already faded. If yours has faded, send a photo and we tell you what to expect before we start.` },
      { id: `interior`, h: `Interior`, p: `Sand and sunscreen get into everything. Tell us what you want covered (seats, leather, fabric, plastics) and send a photo; we tell you which product fits each one.` },
    ],

    prep: {
      title: `The prep comes first`,
      p: `A coating seals in whatever is under it, scratches included. That is why the paint is washed, decontaminated and polished to the level it needs before anything goes on, and why the other surfaces get cleaned first too.`,
    },

    doesnt: {
      title: `What a coating doesn’t do`,
      p: `It isn’t armor. A scratch is still a scratch and a rock chip is still a rock chip; paint protection film is a different product for that. You will still wash the car. How long a coating lasts depends on the product, the prep and how you wash, so we don’t print a number.`,
    },

    local: {
      title: `Two things about washing your car here`,
      items: [
        {
          h: `Lovebugs.`,
          p: `They fly for about four weeks in April–May and again in August–September. Their remains are slightly acidic, and if they stay on the paint for several days they can etch it, so wash them off as soon as you can. A coating gives them a slicker surface, which helps that wash; it does not stop them.`,
          source: { label: `UF/IFAS`, url: `https://ask.ifas.ufl.edu/publication/IN204` },
        },
        {
          h: `If you wash it yourself at home.`,
          p: `Under the Southwest Florida Water Management District’s water-shortage order (news release of September 22, 2026), washing a car at home (non-commercial) is allowed only on your lawn watering day and with a hose that has a shutoff nozzle. The order runs through March 31, 2027, and covers Manatee, Sarasota, Hillsborough and Pinellas counties, among others. Rules can change; check the District’s page for the current ones.`,
          source: { label: `SWFWMD`, url: `https://www.swfwmd.state.fl.us/the-newsroom/2026/district-extends-modified-phase-iii-water-shortage-0` },
          until: `2027-03-31`,
        },
      ],
    },

    quote: {
      title: `How the quote works`,
      steps: [
        { h: `You send`, p: `Hood, roof and sides in daylight, and the paint color. If you want glass, wheels, trim or the interior, one photo of each, and tell us which.` },
        { h: `You get back`, p: `A price range, the product we’d use and how to care for it. The final price is set once we see the paint. If it falls outside the range, we tell you before we begin and you decide.` },
        { h: `Then`, p: `We pick a day and confirm it with you.` },
      ],
    },

    faq: [
      { q: `Is a ceramic coating scratch-proof?`, a: `No. It’s a hard, slick layer on top of the clear coat. Scratches, swirls and rock chips can still happen. What changes is how easily dirt, bird droppings and water spots come off.` },
      { q: `Which parts of the car can you coat?`, a: `Paint, glass, wheels and calipers, exterior trim and plastics, and the interior. Tell us which ones you want and send a photo of each.` },
      { q: `Does the paint get polished first?`, a: `Almost always. A coating seals in what’s under it, so the paint is washed, decontaminated and polished first. How far we go depends on the paint.` },
      { q: `How long does a coating last?`, a: `We won’t give a number here. It depends on the product, how the paint was prepared and how the car is washed. The warranty belongs to the product, so ask for its exact terms with your quote.` },
      { q: `Salt, lovebugs, sprinkler water: does the coating stop them?`, a: `No coating stops them. A coating gives them a slicker surface, so they can come off more easily when you wash. The lovebug rule still holds: don’t leave them on the paint for days.` },
      { q: `How much does it cost?`, a: `There isn’t one price. It depends on how many parts you cover, the size of the car and the state of the paint. Send photos and you’ll get a range; the final price is set once we see the car.` },
    ],

    cta: { whatsapp: `Quote my coating on WhatsApp`, form: `Request a quote` },
    wa: `Hi! I’d like a ceramic coating quote. Car (year, make, model): `,
    form: {
      title: `Get your ceramic coating quote`,
      lead: `Tell us about your car and what you want covered.`,
    },
  },

  es: {
    title: `Recubrimiento cerámico en Sarasota y Bradenton | {brand}`,
    meta: `Recubrimiento cerámico para pintura, vidrios, rines, molduras e interior. Cotiza con fotos por WhatsApp. Sarasota, Bradenton y Venice.`,
    eyebrow: `RECUBRIMIENTO CERÁMICO`,
    h1: `Recubrimiento cerámico para pintura, vidrios, rines, molduras e interior`,
    answer: `El recubrimiento cerámico (ceramic coating) es una capa dura y lisa que se pega a la superficie y ayuda a que la tierra y el agua se suelten más fácil. Lo hacemos en pintura, vidrios, rines y calipers, molduras de afuera e interior. No evita los rayones, y la preparación es parte del trabajo. Manda fotos por WhatsApp y te cotizamos.`,
    pills: [`Pintura, vidrios, rines, molduras, interior`, `Cotización por foto`],
    crumb: `Recubrimiento cerámico`,
    service: `Recubrimiento cerámico`,
    serviceType: `Recubrimiento cerámico para carros`,
    serviceDescription: `Recubrimiento cerámico para la pintura, los vidrios, los rines y calipers, las molduras de afuera y el interior de un carro, en Sarasota, Bradenton y alrededores.`,

    choose: {
      title: `¿Qué quieres cubrir?`,
      lead: `El recubrimiento no es solo para la pintura. Escoge las partes que quieres y manda una foto de cada una.`,
      head: [`Superficie`, `Para qué sirve`, `Qué mandar`],
      rows: [
        { id: `paint`, name: `Pintura`, does: `Ayuda a que la tierra, lo que dejan los pájaros y las manchas de agua se quiten más fácil al lavar`, send: `Capó, techo y laterales con luz de día, y el color` },
        { id: `glass`, name: `Vidrios`, does: `Ayuda a que el agua de lluvia forme gotas y corra`, send: `Foto del parabrisas por fuera` },
        { id: `wheels`, name: `Rines (aros) y calipers`, does: `Un recubrimiento para rines y calipers, aplicado después de limpiarlos y descontaminarlos`, send: `Foto de los rines y de los calipers` },
        { id: `trim`, name: `Molduras y plásticos de afuera`, does: `Plástico y goma negros que todavía están oscuros. Un recubrimiento no devuelve el color que ya se perdió.`, send: `Foto de las molduras` },
        { id: `interior`, name: `Interior`, does: `Asientos, cuero, tela y plásticos. Antes de empezar confirmamos el producto para cada material.`, send: `Foto de los asientos y del tablero` },
      ],
    },

    modules: [
      { id: `pintura`, h: `Pintura`, p: `El recubrimiento va sobre la capa transparente (clear coat) después de lavar, descontaminar y pulir hasta el nivel que pida la pintura. Ayuda a que la tierra, lo que dejan los pájaros y las manchas de agua se quiten más fácil al lavar.` },
      { id: `vidrios`, h: `Vidrios`, p: `Un recubrimiento para el parabrisas y las ventanas que ayuda a que el agua de lluvia forme gotas y corra. No sustituye los limpiaparabrisas. La temporada de lluvias de aquí va más o menos de mediados o finales de mayo a mediados de octubre.`, source: { label: `National Weather Service`, url: `https://www.weather.gov/tbw/rainyseason` } },
      { id: `rines`, h: `Rines (aros) y calipers`, p: `Los rines reciben el polvo de los frenos y la mugre de la calle. Un recubrimiento hecho para rines y calipers ayuda a que el polvo de los frenos se pegue menos y salga más fácil al lavar. Dinos si los rines son pintados, pulidos o cromados.` },
      { id: `molduras`, h: `Molduras y plásticos de afuera`, p: `El sol pone grises el plástico y la goma negros. Este recubrimiento se aplica en molduras que todavía están oscuras; no devuelve el color que ya se perdió. Si las tuyas ya se destiñeron, mándanos una foto y te decimos qué esperar antes de empezar.` },
      { id: `interior`, h: `Interior`, p: `La arena y el bloqueador se meten en todo. Dinos qué quieres cubrir (asientos, cuero, tela, plásticos) y manda una foto; te decimos qué producto va en cada material.` },
    ],

    prep: {
      title: `Primero la preparación`,
      p: `El recubrimiento sella lo que haya debajo, rayones incluidos. Por eso la pintura se lava, se descontamina y se pule hasta el nivel que necesita antes de ponerle nada, y las demás superficies también se limpian primero.`,
    },

    doesnt: {
      title: `Lo que un recubrimiento no hace`,
      p: `No es una armadura. Un rayón sigue siendo un rayón y una piedrita de la carretera sigue picando la pintura; para eso existe otro producto, la película de protección de pintura. El carro se sigue lavando. Cuánto dura depende del producto, de la preparación y de cómo lo laves, así que no ponemos una cifra.`,
    },

    local: {
      title: `Dos cosas de lavar tu carro aquí`,
      items: [
        {
          h: `Lovebugs.`,
          p: `Vuelan unas cuatro semanas en abril–mayo y otra vez en agosto–septiembre. Sus restos son un poco ácidos y, si se quedan varios días sobre la pintura, pueden dañarla; por eso conviene lavarlos cuanto antes. El recubrimiento les da una superficie más lisa y eso ayuda a ese lavado; no los frena.`,
          source: { label: `UF/IFAS`, url: `https://ask.ifas.ufl.edu/publication/IN204` },
        },
        {
          h: `Si lo lavas tú en casa.`,
          p: `Según la orden de escasez de agua del Distrito de Manejo de Aguas del Suroeste de Florida (SWFWMD), publicada el 22 de septiembre de 2026, lavar un carro en casa (sin fines comerciales) solo se permite en tu día de riego y con una manguera con boquilla de cierre. La orden llega hasta el 31 de marzo de 2027 y cubre, entre otros, los condados de Manatee, Sarasota, Hillsborough y Pinellas. Las reglas pueden cambiar: revisa la página del Distrito para ver las vigentes.`,
          source: { label: `SWFWMD`, url: `https://www.swfwmd.state.fl.us/the-newsroom/2026/district-extends-modified-phase-iii-water-shortage-0` },
          until: `2027-03-31`,
        },
      ],
    },

    quote: {
      title: `Cómo funciona la cotización`,
      steps: [
        { h: `Tú mandas`, p: `Capó, techo y laterales con luz de día, y el color de la pintura. Si quieres vidrios, rines, molduras o interior, una foto de cada uno y dinos cuáles.` },
        { h: `Tú recibes`, p: `Un rango de precio, el producto que usaríamos y cómo cuidarlo. El precio final se fija cuando vemos la pintura. Si queda fuera del rango, te lo decimos antes de empezar y tú decides.` },
        { h: `Después`, p: `Fijamos el día y te lo confirmamos.` },
      ],
    },

    faq: [
      { q: `¿El recubrimiento cerámico evita los rayones?`, a: `No. Es una capa dura y lisa encima del barniz. Los rayones, los remolinos y las piedritas de la carretera pueden seguir pasando. Lo que cambia es lo fácil que se quitan la tierra, lo que dejan los pájaros y las manchas de agua.` },
      { q: `¿Qué partes del carro se pueden cubrir?`, a: `Pintura, vidrios, rines y calipers, molduras y plásticos de afuera, e interior. Dinos cuáles quieres y manda una foto de cada una.` },
      { q: `¿Hay que pulir la pintura antes?`, a: `Casi siempre. El recubrimiento sella lo que tenga debajo, así que primero se lava, se descontamina y se pule. Hasta dónde llegamos depende de la pintura.` },
      { q: `¿Cuánto dura?`, a: `Aquí no te damos una cifra. Depende del producto, de cómo se preparó la pintura y de cómo lavas el carro. La garantía es la del producto, así que pide sus términos exactos con tu cotización.` },
      { q: `Sal, lovebugs, agua de aspersor: ¿el recubrimiento los frena?`, a: `Ningún recubrimiento los frena. Lo que hace es darles una superficie más lisa, y por eso pueden salir más fácil al lavar. La regla de los lovebugs sigue igual: no los dejes varios días sobre la pintura.` },
      { q: `¿Cuánto cuesta?`, a: `No hay un precio único. Depende de cuántas partes cubras, del tamaño del carro y del estado de la pintura. Manda fotos y te damos un rango; el precio final se fija cuando vemos el carro.` },
    ],

    cta: { whatsapp: `Cotiza tu recubrimiento por WhatsApp`, form: `Pedir cotización` },
    wa: `¡Hola! Quiero cotizar un recubrimiento cerámico. Mi carro es un (año, marca y modelo): `,
    form: {
      title: `Pide tu cotización de recubrimiento cerámico`,
      lead: `Cuéntanos de tu carro y qué quieres cubrir.`,
    },
  },
}
