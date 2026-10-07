# Marca, datos del negocio y registro de afirmaciones

Fuente de verdad para quien escriba copy, diseñe creativos, configure Google Business Profile o pague anuncios.
Si algo aquí cambia, cambia en el código en un solo lugar (se indica dónde).

## 1. Nombre comercial (decidido por el dueño, 5 oct 2026)

**ShineToGo Mobile Detailing** (dominio `shinetogomobiledetailing.com`). Es el nombre en el sitio, el correo, el JSON-LD, el consentimiento, la política de privacidad, Google Business Profile, Google Ads y la Página de Meta. En los títulos de página se usa la forma corta **ShineToGo** solo porque el nombre completo no cabe en ~60 caracteres.

- Mezclar variantes (ShineToGo / ShineToGo Mobile Car Wash / DetailShine) es motivo de rechazo en Google Ads por tergiversación y rompe la señal de entidad para buscadores y asistentes de IA.
- **El logotipo dice «Mobile Car Wash»** y el Instagram es `@shinetogomobilecarwash`. El negocio hace detallado, polarizado y cerámico, no solo lavado: conviene un logotipo con «Mobile Detailing». Mientras tanto el nombre legal/comercial registrado (nombre ficticio, F.S. 865.09) debe coincidir con el que se usa en Google Business Profile.
- **Cómo cambiarlo:** `BRAND_FULL` y `BRAND_SHORT` en `src/content/business.js`, o las variables `VITE_BRAND_NAME` (sitio) y `BRAND_NAME` (API) del repositorio.

## 2. NAP (nombre, dirección, teléfono) y zonas

- **Teléfono y WhatsApp:** (941) 422-4405 · `+19414224405` → `src/content/business.js`
- **Dirección:** negocio de servicio a domicilio, **sin dirección pública**. No inventar calle ni código postal. En Google Business Profile marcar «Área de servicio» y ocultar la dirección.
- **Zonas donde opera de verdad** (dichas por el dueño): Sarasota, Bradenton, Manatee County, Venice, St. Petersburg, Brandon, Lido Key (Lido Beach), Longboat Key, Siesta Key «y alrededores». **Tampa no está en la lista y no debe aparecer** (el verificador `check-dist` falla si vuelve a salir).
  - Una sola lista en `PLACES` de `src/content/business.js`. De ahí salen el pie, el JSON-LD (`areaServed` con City/Place y su condado) y `llms.txt`. La frase que ve el público («Trabajamos en Sarasota y Bradenton…») es `AREA_COPY` en el mismo archivo.
  - «Alrededores» no se puede expresar en datos estructurados sin un límite; queda solo en el texto. Palmetto, Osprey, Nokomis, Anna Maria, etc. entran en «alrededores» solo si el dueño lo confirma (ver `docs/OPEN-QUESTIONS.md`).
  - **No se hace una página por zona** (36 páginas casi iguales serían «doorway pages» para Google). El vehículo para zonas es Google Business Profile (hasta 20 áreas de servicio). Más adelante, una página por zona solo con trabajos reales, logística propia, demanda comprobada en Search Console y ≥300 palabras únicas.
- Sin horario publicado. El texto «24/7» y «respuesta en 2 horas» se retiraron por no estar respaldados.

## 2b. Dos servicios distintos (decisión del dueño, 5 oct 2026)

**Window Tint y Ceramic Coating NO son una sola línea «Protection».** Cada uno tiene su contenido: menú, tarjeta de la home, página informativa, preguntas y esquema. **El formulario es uno solo, el de la home** (decisión del 5-oct-2026: es la misma empresa, los mismos formularios y los mismos estilos; el objetivo es retener el lead en la página principal). Las páginas de polarizado y cerámico son informativas (resultados, proceso, límites legales) y mandan a la cotización de la home con el servicio ya elegido: `/?service=tint#contact`. Ninguno se vende como complemento del otro, no hay opción «Tint + Cerámico» ni pregunta «¿ambos juntos?». Quien quiere los dos hace dos cotizaciones (o lo escribe en el mensaje).

| | Window Tint / Polarizado de vidrios | Ceramic Coating / Recubrimiento cerámico |
|---|---|---|
| Qué es | Película de carbono o cerámica en **todos los vidrios** del carro: laterales, trasero, franja del parabrisas, sunroof | **Todos los tratamientos cerámicos**: pintura, vidrios, rines y calipers, molduras y plásticos de afuera, interior |
| Contenido | `src/content/tint.js` | `src/content/ceramic.js` |
| Formulario pide | vidrios (chips), película, «tengo polarizado que quitar» | superficies a cubrir (chips) |
| Voz | práctica, de conductor a conductor; la ley de Florida ventana por ventana | de oficio, superficie por superficie; la preparación primero |
| Vocabulario ES | polarizado, **polarizado de carbono / polarizado cerámico** (nunca «película» ni «film»: suena a traducción), vidrios (títulos) y ventanas (límites), sunroof (quemacocos) | recubrimiento cerámico (corto: «cerámico»), rines (aros), molduras |

- En la página de polarizado, «cerámico» siempre acompaña a «polarizado» (polarizado cerámico). En inglés: «carbon tint / ceramic tint», no «film». «Paint protection film» sí se queda: es el nombre de otro producto.
- **Cerámico: lista de superficies.** La página cubre las cinco que cubren los detallistas de la zona (pintura, vidrios, rines y calipers, molduras y plásticos de afuera, interior). **El dueño debe confirmar cuáles hace de verdad** (y si hace faros, capotas, escapes); lo que no haga se quita de la página, la tabla, los chips y el esquema.
- Competencia local de referencia (Sarasota): Ceramic Pro, Detail M.D., DRK Customs, Sharkey's Detailing & Tint, My Detail Guy, Alset Custom, 941 Mobile Detailing. Varias prometen «9H», «de por vida» o garantías de 10 años; este sitio no, y esa franqueza es parte de su voz.

### Vocabulario en español de Florida (criterio, no volumen de búsqueda)
**carro** (no «coche»; «auto» solo en una mención por bloque o en la meta), **polarizado** («tint» entre paréntesis una vez; «tinte» en una pregunta), **vidrios / ventanas**, **cotización**, **rines (aros)**, **sunroof (quemacocos)**, **ZIP code**, sentence case (no «Reserva Tu Servicio»), «y» en vez de «&», sin calcos («cabina», «rechazo de calor», «jamba», «excremento de aves», «golpes de piedra»). Hay hispanos en Manatee (19,2 %) y Sarasota (11,5 %) según QuickFacts (verificar antes de citar); predomina el origen mexicano, centroamericano y puertorriqueño, así que se eligen palabras que crucen. No hay datos de volumen de búsqueda: la consulta a Google Trends no devolvió resultados; validar con Keyword Planner o Search Console.

## 3. Identidad visual

| Token | Valor | Uso |
|---|---|---|
| `--bg-dark` / `--bg-card` | `#0a0e1a` / `#111827` | fondos oscuros |
| `--brand-blue` | `#0ea5e9` | botones y acentos sobre oscuro |
| `--brand-blue-text` | `#0369a1` | texto azul sobre fondo claro (cumple AA) |
| `--brand-green` / WhatsApp | `#10b981` / `#25d366` | confirmaciones y botón de WhatsApp |
| `--apex-amber` | `#d4af37` | marcas de verificación y detalles premium |
| `--ink` | `#04121c` | texto sobre los colores brillantes de marca (el blanco no alcanza contraste AA sobre ellos) |
| Tipografía | Outfit 800/900 (títulos) · Inter 400–700 (texto) | `src/index.css` |

Reglas: estética premium sobria; fotos reales antes que ilustraciones; diagramas esquemáticos cuando no hay foto (`src/assets/protection/`, ES y EN); nunca cifras inventadas dentro de un gráfico; botones con texto oscuro sobre azul/verde brillante.

### Estándar común: home y páginas estáticas (decidido el 5-oct-2026)
La home (React, `src/index.css`) es la referencia porque es la identidad que el cliente ya aprobó; las landings y la privacidad (HTML generado, `src/landing.css`) la siguen. Una landing que se vea distinta a la home es un error.

| Elemento | Regla |
|---|---|
| Tokens | Un solo archivo, `src/tokens.css`, importado por las dos hojas. `check-dist` falla si una deja de importarlo |
| Cabecera | Blanca arriba y oscura al bajar 80 px; 80 px de alto; logo de 60 px sin nombre al lado; menú idéntico (Services · Window Tint · Ceramic · Pricing · Projects · Contact, textos de `src/i18n.jsx`); botón de idioma «ES»/«EN»; CTA azul «Get a quote». `check-dist` compara el menú de cada página con el de la home |
| Botones | Radio 12, Outfit 700, texto oscuro. Principal = azul (cotización por formulario). WhatsApp = `#25d366`. Teléfono = enlace o botón de contorno, nunca el CTA principal |
| Hero | Fondo blanco, titular Outfit 900 en `#0f172a`, etiqueta azul `--brand-blue-text`, dos botones (azul + WhatsApp) |
| Ritmo | Hero claro y después las secciones alternan oscuro / claro, como la home. Los componentes leen `--fg`, `--muted`, `--surface`, `--line`, `--link`: funcionan en los dos tonos |
| Diagramas | Siempre en su propio panel oscuro (`.diagram`), sea cual sea el tono de la sección |
| Contenedor | 1200 px con 24 px de margen |
| Pie | Fondo `#0a0e1a`, cuatro columnas (marca + Instagram · Servicios · Zonas · Contacto), línea de derechos igual |
| Formulario | Uno solo, el de la home. Las páginas estáticas no tienen `<form>`: su botón lleva a `/?service=tint#contact` (o `ceramic`). `check-dist` falla si aparece un formulario fuera de la home |
| Cuatro tarjetas | 4 columnas en pantalla ancha, 2×2 en media, 1 en móvil. Nunca una sola en la segunda fila |
| Ilustraciones | Dibujos propios del mismo trazo, no fotos de stock presentadas como trabajos |

## 4. Voz

Premium, directa, concreta y bilingüe (EN y ES con la misma información). Frases cortas. Primero la respuesta, luego el detalle. Hablar de lo que se hace, no de superlativos. Español neutro de EE. UU., "tú".

## 5. Registro de afirmaciones

**Publicadas y respaldadas por el propio código/proceso:** cotización por foto; se confirma el tono legal por ventana antes de instalar; películas cerámica y de carbono; recubrimiento cerámico no es a prueba de rayones.

**Retiradas del sitio por no tener respaldo (volver a poner SOLO con evidencia):**

| Afirmación retirada | Qué se necesita para volver a ponerla |
|---|---|
| "Certificados por IDA", "licenciados" | Certificado / licencia (copia) |
| "Insured" / "Asegurados" (y el seguro de "$2M") | Certificado de seguro (COI) vigente a nombre de la entidad, con monto. Se retiró la palabra de la home (insignia, «Nosotros») hasta tenerlo |
| "Eco-friendly", productos "biodegradables", "seguros para todo tipo de pintura", "el mejor servicio" | Fichas de producto / evidencia. Reemplazados por texto neutro |
| 4 reseñas con nombre, "98 %", "1000+ clientes", "5.0" | Reseñas reales con permiso y enlace de origen (GBP/Facebook); cifras auditables. **El código y las claves se borraron** (no solo se ocultaron); si se agregan reseñas reales, deben cumplir la regla de reseñas de la FTC (16 CFR 465) |
| "Real results from real clients" (galería) | Ahora dice "Our work in Florida". Confirmar que todas las fotos y videos son trabajos propios |
| "Same-day appointments" y pedir la matrícula del vehículo | Retirados (sin respaldo / dato innecesario) |
| "24/7", "respuesta en 2 horas" | Política real de atención |
| "Nunca compartimos tus datos" | Reemplazado por la política de privacidad |
| Garantías o duración del recubrimiento ("1 a 5 años") | Producto, ficha técnica y garantía por escrito |
| Servicios de jets privados | Confirmar si se ofrece |
| Fecha "FULL" (escasez falsa) en el formulario | Solo con calendario real |
| Cifras de rechazo de calor / UV / TSER, porcentajes comerciales | Ficha técnica del fabricante por modelo de película |

**Lista de "no decir":** de por vida / lifetime · 9H · a prueba de rayones · "el mejor" · precios sin lista aprobada · garantías sin documento · "bloquea 99 % UV" sin ficha · "sin fecha disponible" falso · reseñas copiadas de otro negocio.

**"Legal" en polarizado (veto de cumplimiento):** la legalidad la determina la **ventana terminada** (vidrio + película, medida en ese vehículo), no la película. Prohibido: «películas legales», «tono legal», «solo instalamos dentro de la ley», «legal en Florida» como promesa. Permitido: «te explicamos los límites de Florida por ventana», «el mínimo legal de cada ventana es…». Decir que se *mide* cada ventana solo si el negocio de verdad usa un medidor y deja constancia.

### Contexto local que sí se usa (con fuente y fecha)
| Dato | Fuente | Dónde |
|---|---|---|
| Lovebugs: unas cuatro semanas en abril–mayo y otra vez en agosto–septiembre; los restos son ligeramente ácidos y, si se dejan varios días, la acidez aumenta y graba la pintura. **No decir «un día»: la fuente dice varios días** (corregido el 5-oct-2026 tras la revisión de cumplimiento) | UF/IFAS IN204 (ask.ifas.ufl.edu/publication/IN204) | Cerámico, módulo «Lovebugs» y FAQ |
| Temporada de lluvias: 15-may a 15-oct en el suroeste de Florida (25-may a 10-oct en el resto del centro-oeste); el texto dice «de mediados o finales de mayo a mediados de octubre» | National Weather Service Tampa Bay (weather.gov/tbw/rainyseason) | Cerámico, módulo de vidrios |
| Orden de escasez de agua del SWFWMD (comunicado del 22-sep-2026, hasta el 31-mar-2027): lavar un carro **en casa (sin fines comerciales)** solo en tu día de riego y con boquilla de cierre; cubre 11 condados completos y partes de otros (entre ellos Manatee, Sarasota, Hillsborough y Pinellas). **Las fuentes no dicen nada de servicios comerciales o móviles: prohibido escribir «exentos» o «cumplimos la orden» hasta que el dueño lea la orden completa o llame al Distrito (OPEN-QUESTIONS #6).** | swfwmd.state.fl.us (verificado el 5-oct-2026) | Cerámico; el generador la omite sola solo si se hace un build después de esa fecha (el sitio es estático) |
### Cerámico: evidencia por superficie antes de decir «ayuda»
Hoy **no hay ninguna ficha técnica en carpeta** (OPEN-QUESTIONS #13 y #14), así que solo sale el texto neutro de abajo. «Ayuda» baja el tamaño de la promesa pero no quita la obligación de tener el respaldo (FTC, sustentación de publicidad; FDUTPA 501.204). Conservar la ficha mientras el texto esté publicado y tres años después. No decir «certified applicator» sin certificado del fabricante.

| Superficie | Texto publicado hoy (neutro) | Se puede decir «ayuda a…» cuando la ficha lo respalde | Nunca (sin datos) |
|---|---|---|---|
| Pintura | «ayuda a que la tierra, lo que dejan los pájaros y las manchas de agua se quiten más fácil al lavar» | TDS con hidrofobia / limpieza fácil (ángulo de contacto o prueba equivalente) | sol, sal, UV, anticorrosión, dureza, resistencia a rayones, duración |
| Vidrios | «ayuda a que el agua de lluvia forme gotas y corra. No sustituye los limpiaparabrisas» | TDS para vidrio automotriz; compatible con limpiaparabrisas, sensor de lluvia y cámaras. No usar un producto de pintura en el parabrisas | mejor visibilidad o seguridad al manejar con lluvia |
| Rines y calipers | «hecho para rines y calipers, aplicado después de limpiar y descontaminar» + «ayuda a que el polvo de los frenos se pegue menos» | TDS de rines/calipers con rango térmico; acabados compatibles; procedimiento que excluya discos y pastillas | sal, arena, salpicadura |
| Molduras y plásticos | «todavía están oscuros; un recubrimiento no devuelve el color perdido» | (no recomendado) ensayo de envejecimiento acelerado del fabricante | evita o frena el descoloramiento |
| Interior | «confirmamos el producto para cada material antes de empezar» | Ficha por material (tela, cuero, vinil, plástico), SDS (COV, olor, piel), instrucción sobre airbags laterales y asientos con calefacción; confirmar que es realmente cerámico (SiO2 o SiC) | derrames repelidos, bloqueador solar. Si no hay producto, quitar «Interior» de todo el sitio |

Se descartaron por no verificables o decorativos: arena de Siesta Key «99 % cuarzo», cifras de UV, «tormentas todas las tardes», marea roja, reglas de HOA para lavar en la entrada.

## 6. Texto legal que no se toca sin abogado

- **Polarizado en Florida** (F.S. 316.2951–316.2957 y 316.29545). Verificado contra el texto de los estatutos (revisión de cumplimiento, 4-oct-2026):

  | Dato | Valor | Fuente |
  |---|---|---|
  | Laterales delanteros | ≥ 28 % de luz visible (reflectividad ≤ 25 %) | 316.2953 |
  | Laterales traseros y vidrio trasero, auto de pasajeros | ≥ 15 % (reflectividad ≤ 35 %) | 316.2954(1)(a) |
  | Multipropósito (chasis de camión o rasgos off-road, ≤ 10 personas), atrás | ≥ 6 % | 316.2951, 316.2954(1)(a) |
  | Parabrisas | solo franja **transparente** arriba, sin invadir AS-1 | 316.2952(2)(b) |
  | Medición | sobre el vidrio **ya terminado** (vidrio + película) | 316.2953, 316.2954 |
  | Etiqueta | marco interior de la puerta izquierda; afirma que la película cumple, con nombre comercial de la película y del instalador | 316.2955(1) |
  | Tolerancia | ±3 % en toda medición (no está en el copy) | 316.2955(2) |
  | Definición de «window» | excluye los dispositivos de visión montados en el techo: **los porcentajes no aplican al sunroof**; no ponerle límite ni decir que está «dentro de la ley» | 316.2951(6) |
  | Exención médica | la emite el FLHSMV por vehículo (VIN), intransferible; **no fija un porcentaje**, así que no escribir «instalamos según el certificado» | 316.29545 (no 316.2957, que es de fabricantes) |
  | Sanciones | infracción no moviente para el conductor; delito menor de segundo grado para quien instala o vende fuera de la norma (el copy solo habla del conductor y **no dice que haya que quitar la película**: el estatuto no lo establece) | 316.2956(1) y (3), cotejado con el texto literal |

  Las pickups se tratan con el criterio más estricto (15 %) hasta confirmar su clasificación; no se encontró una clasificación oficial de FLHSMV (su página dio 404). **Revisión por un abogado de Florida antes de gastar en anuncios.**
- **Mensajes (TCPA / FTSA, F.S. 501.059):** casilla de consentimiento separada y SIN marcar; el texto nombra al negocio y dice "sistema automatizado". Versión por idioma (`v2-en`, `v2-es`) archivada en `docs/CONSENT-TEXT.md`; cada lead guarda versión, fecha, IP y navegador. La FTSA da acción privada de US$500 por mensaje: **no enviar mensajes automatizados hasta que el abogado confirme el texto**, o limitarse a contacto manual y a responder dentro de conversaciones iniciadas por la persona.
- **Política de privacidad:** borrador en `/privacy/` y `/es/privacidad/` (generado por `scripts/build-landings.mjs`). Revisión legal pendiente. **Compromisos operativos que crea el texto:** conservar solicitudes sin trabajo 24 meses, clientes hasta 7 años y registros de consentimiento 5 años; responder solicitudes en 30 días. **Faltan datos del cliente:** razón social, dirección postal (puede ser apartado postal) y correo de contacto para solicitudes.
- **Cookies / analítica:** los scripts de Google/Meta se cargan solo después de "Aceptar" y los eventos no entran a la cola antes. Sí ocurren antes de elegir: Google Fonts (declarado en la política) y el guardado local de atribución (utm/gclid, 90 días). Aceptar y Rechazar son idénticos; el enlace «Opciones de privacidad» del pie reabre el aviso (solo si hay IDs de analítica).

## 7. Inventario de activos

| Activo | Ubicación | Notas |
|---|---|---|
| Originales pesados (fotos de cámara, MOV) | `assets-src/` | No se despliegan. Se regeneran los derivados con `scripts/optimize-assets.cjs` |
| Derivados web (WebP, MP4 + póster) | `public/img`, `public/video` | Generados; ~9 MB en total, el video solo baja al reproducirlo |
| Diagramas de protección ES/EN | `src/assets/protection/` | 5 diagramas, sin cifras salvo los porcentajes legales (revisar con abogado) |
| Creativos de campaña y OG | `marketing/creatives/` | Ver `MANIFEST` de esa carpeta; reglas de texto del punto 5 aplican igual |

**Foto del video "Ceramic Coating Finish":** en realidad muestra el interior de un auto; ahora se llama "Interior Detail Walkthrough". Sigue haciendo falta un video real de gotas de agua sobre cerámico.

## 8. Fotografía que falta (sesión de fotos para el cliente)

1. Película aplicándose en una ventana (manos y herramienta, sin rostro identificable del cliente).
2. Medidor de VLT marcando una ventana ya instalada (prueba de cumplimiento).
3. Etiqueta del instalador en la jamba de la puerta.
4. Antes/después de cabina bajo el sol (misma hora, mismo encuadre).
5. Gotas de agua sobre pintura con recubrimiento (macro, luz natural).
6. Equipo y vehículo de trabajo en un cliente real (con permiso).
7. Rollo de película con la marca visible (si el cliente autoriza mostrar la marca).

Reglas: fotos reales; quitar metadatos de ubicación (EXIF); alt descriptivo y específico; sin placas visibles.
