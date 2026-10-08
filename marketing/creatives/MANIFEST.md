# MANIFEST — Creativos de Window Tint y Ceramic Coating (servicios separados, solo autos)

Generado por `manifest.mjs` a partir de `copy.mjs`, `out/` y `out/audit.json`. Fecha de generación: 2026-10-05. **Ronda 3** (aclaraciones de la dueña: zona de servicio real, tint y cerámico como dos servicios distintos).

**Negocio:** ShineToGo Mobile Detailing. Zona: Sarasota, Bradenton, Manatee County, Venice, St. Petersburg, Brandon, Lido Key, Siesta Key, Longboat Key y alrededores. En las imágenes la franja dice "Sarasota · Bradenton · Venice · St. Pete" (+ "& nearby / y alrededores" donde cuadra).

**Marca:** el nombre de la marca NO aparece como texto en ningún creativo (el logo en insignia blanca ya lo lleva). Sí se escriben el dominio `shinetogomobiledetailing.com` y el teléfono/WhatsApp `(941) 422-4405`.

## 1. Estado de cumplimiento (resumen)

| Estado | Qué |
|---|---|
| **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR** | Los 6 PNG del concepto C2 (`c2-tint-limits_*`); el SVG web `src/assets/protection/fl-windows-map.{en,es}.svg` (28 %, 15 %, 6 %); y `src/assets/protection/vlt-scale.{en,es}.svg` (20/35/50/70 % con dónde sería legal cada tono). |
| Aprobable | C1 (tint, 6 PNG), C3 (cerámico, 6 PNG) y las 6 imágenes OG: sin cifras de calor/UV/dureza/duración, sin garantías, sin precios, sin urgencia ni escasez, sin fotos de autos, sin antes/después, sin frases de legalidad de la película. |
| Eliminado | El concepto C3 anterior ("Detail it. Then protect it."): mezclaba servicios y usaba la foto `hero-finish.jpg` (origen sin confirmar). Sus 6 PNG, su plantilla y su copy se borraron; `hero-finish.jpg` ya no existe en `assets/` ni se usa en ningún creativo. |
| Verificado | Lint (frases vetadas, ciudad fuera de zona, separación de servicios, sin claims de dureza/garantía); fuentes Outfit/Inter cargadas; contraste medido sobre el píxel real; texto < 20 % del área; zonas seguras de Story; dimensiones exactas; OG < 250 KB. Ver sección 6. |

## 2. Cambios de la ronda 3

1. **Zona**: la franja de las imágenes y los textos usan solo las ciudades de la zona de servicio. Se retiró la ciudad que no es zona de servicio de imágenes, copy, OG y plantillas. `audit.mjs` hace FALLAR el lint si esa ciudad reaparece en cualquier forma en copy, plantillas o SVG.
2. **Concepto C3 anterior eliminado** (PNG de `out/`, plantilla `c3-detail-protect.html`, entradas del manifiesto, copy). `hero-finish.jpg` borrada de `assets/`; el lint falla si reaparece o se referencia.
3. **C1 (tint)**: titular concreto "Window tint for your car / Carbon or ceramic film." (ES "Polarizado para tu carro / Película de carbono o cerámica."). Se quitó «every window / todos los vidrios» y «Sunroof included» por revisión de cumplimiento del 5-oct-2026 (el parabrisas completo no se puede y el sunroof depende del vidrio). Se mantiene el esquema sol → vidrio con película. Línea de imagen: "We explain Florida's tint limits for each window." / "Te explicamos los límites de polarizado de Florida por ventana." CTA "Quote my tint on WhatsApp" / "Cotiza tu polarizado por WhatsApp". Pie: dominio + (941) 422-4405 + "Appointments subject to availability" / "Citas sujetas a disponibilidad". Archivos: `c1-tint-windows_*`.
4. **C2 (tint, límites de Florida)**: sin cambios de fondo. En español "auto" pasa a "carro" en el CTA ("Dinos tu carro y te explicamos los límites"). Ningún texto promete que la película sea legal. Archivos renombrados a `c2-tint-limits_*` (sin "legal tint" en el nombre).
5. **C3 NUEVO (cerámico)**: "Ceramic coating, not only for the paint" / "Cerámico, y no solo para la pintura". Seis fichas: Paint · Glass · Wheels and calipers · Trim · Interior (ES Pintura · Vidrios · Rines y calipers · Molduras · Interior) y la ficha de proceso "Prep first, coating after." / "Primero la preparación, luego el recubrimiento." Iconos simples, sin fotos. CTA "Quote my coating on WhatsApp" / "Cotiza tu recubrimiento por WhatsApp". Mismos formatos (feed, story, enlace; EN y ES) y mismo pie. Archivos: `c3-ceramic-surfaces_*`.
6. **Copy de anuncios reescrito**: cada texto habla de UN solo servicio (C1 y C2 tint; C3 cerámico), con tono de la zona y sin aperturas épicas. En español: "carro", "polarizado", "vidrios/ventanas", "cotización", "rines", "sunroof (quemacocos)"; "película cerámica" solo para el tint y "recubrimiento cerámico" para el servicio de cerámico. Sin "legal" en ningún texto de anuncio, sin precios, garantías, urgencia ni escasez.
7. **OG (6 JPG)** actualizados: default "Car wash and boat detailing that comes to you" / "Lavado de carros y detallado de botes a domicilio" + zonas; window-tint "Window tint for your car’s side and back windows" / "Polarizado para las ventanas y el vidrio trasero de tu carro"; ceramic-coating "Ceramic coating for paint, glass, wheels, trim and interior" / "Recubrimiento cerámico para pintura, vidrios, rines, molduras e interior". Todos con logo, dominio y teléfono.
8. `audit.mjs`: el lint ahora también falla ante "9H", "de por vida/lifetime", "a prueba de rayones", garantías, `hero-finish`, "legal" en cualquier texto de anuncio y mezcla de servicios (palabras de cerámico en un creativo de tint o viceversa).

## 3. Archivos de `out/`

| Archivo | Concepto / servicio | Formato | Idioma | Claims que usa | Nota de cumplimiento | Dónde usar | Texto % área | Contraste mín. |
|---|---|---|---|---|---|---|---|---|
| `out/c1-tint-windows_feed-1080x1350_en.png` (425 KB) | C1 · Window tint for your car · Window Tint | Feed 4:5 1080×1350 | EN | Ninguno numérico (cualitativo: esquema de reflejo) | Servicio único: Window Tint (ventanas laterales y vidrio trasero; sin prometer el sunroof ni «todos» los vidrios). Esquema cualitativo sol → vidrio con película, sin cifras. Dice "Te explicamos los límites de polarizado de Florida por ventana" (proceso, no resultado legal). Sin fotos de autos, sin antes/después, sin urgencia. | Meta feed (FB/IG 4:5); orgánico FB/IG | 17.1 % | 6.59:1 |
| `out/c1-tint-windows_feed-1080x1350_es.png` (429 KB) | C1 · Polarizado para tu carro · Window Tint | Feed 4:5 1080×1350 | ES | Ninguno numérico (cualitativo: esquema de reflejo) | Servicio único: Window Tint (ventanas laterales y vidrio trasero; sin prometer el sunroof ni «todos» los vidrios). Esquema cualitativo sol → vidrio con película, sin cifras. Dice "Te explicamos los límites de polarizado de Florida por ventana" (proceso, no resultado legal). Sin fotos de autos, sin antes/después, sin urgencia. | Meta feed (FB/IG 4:5); orgánico FB/IG | 16.3 % | 6.59:1 |
| `out/c1-tint-windows_story-1080x1920_en.png` (542 KB) | C1 · Window tint for your car · Window Tint | Story/Reel 9:16 1080×1920 | EN | Ninguno numérico (cualitativo: esquema de reflejo) | Servicio único: Window Tint (ventanas laterales y vidrio trasero; sin prometer el sunroof ni «todos» los vidrios). Esquema cualitativo sol → vidrio con película, sin cifras. Dice "Te explicamos los límites de polarizado de Florida por ventana" (proceso, no resultado legal). Sin fotos de autos, sin antes/después, sin urgencia. | Stories y portada de Reels (FB/IG); orgánico. Zona segura 250 px respetada | 15.8 % | 6.17:1 |
| `out/c1-tint-windows_story-1080x1920_es.png` (544 KB) | C1 · Polarizado para tu carro · Window Tint | Story/Reel 9:16 1080×1920 | ES | Ninguno numérico (cualitativo: esquema de reflejo) | Servicio único: Window Tint (ventanas laterales y vidrio trasero; sin prometer el sunroof ni «todos» los vidrios). Esquema cualitativo sol → vidrio con película, sin cifras. Dice "Te explicamos los límites de polarizado de Florida por ventana" (proceso, no resultado legal). Sin fotos de autos, sin antes/después, sin urgencia. | Stories y portada de Reels (FB/IG); orgánico. Zona segura 250 px respetada | 14.6 % | 6.6:1 |
| `out/c1-tint-windows_link-1200x628_en.png` (200 KB) | C1 · Window tint for your car · Window Tint | Enlace 1.91:1 1200×628 | EN | Ninguno numérico (cualitativo: esquema de reflejo) | Servicio único: Window Tint (ventanas laterales y vidrio trasero; sin prometer el sunroof ni «todos» los vidrios). Esquema cualitativo sol → vidrio con película, sin cifras. Dice "Te explicamos los límites de polarizado de Florida por ventana" (proceso, no resultado legal). Sin fotos de autos, sin antes/después, sin urgencia. | Meta anuncio de enlace (FB feed); Google Display / Demand Gen 1.91:1; orgánico (enlaces) | 16.6 % | 6.67:1 |
| `out/c1-tint-windows_link-1200x628_es.png` (204 KB) | C1 · Polarizado para tu carro · Window Tint | Enlace 1.91:1 1200×628 | ES | Ninguno numérico (cualitativo: esquema de reflejo) | Servicio único: Window Tint (ventanas laterales y vidrio trasero; sin prometer el sunroof ni «todos» los vidrios). Esquema cualitativo sol → vidrio con película, sin cifras. Dice "Te explicamos los límites de polarizado de Florida por ventana" (proceso, no resultado legal). Sin fotos de autos, sin antes/después, sin urgencia. | Meta anuncio de enlace (FB feed); Google Display / Demand Gen 1.91:1; orgánico (enlaces) | 15.5 % | 6.67:1 |
| `out/c2-tint-limits_feed-1080x1350_en.png` (182 KB) | C2 · Which window tint is legal in Florida? · Window Tint (límites de Florida) | Feed 4:5 1080×1350 | EN | Ninguno numérico (solo cita F.S. 316.2951–316.2957 y 316.29545 como referencia) | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Servicio único: Window Tint. Mapa esquemático SIN porcentajes; parabrisas "franja transparente superior"; nota visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." El titular formula la pregunta "¿Qué polarizado es legal en Florida?" (no afirma que la película o el tono sea legal) y el CTA promete explicar los límites. Sin fotos. | Meta feed (FB/IG 4:5); orgánico FB/IG | 17.5 % | 5.55:1 |
| `out/c2-tint-limits_feed-1080x1350_es.png` (190 KB) | C2 · ¿Qué polarizado es legal en Florida? · Window Tint (límites de Florida) | Feed 4:5 1080×1350 | ES | Ninguno numérico (solo cita F.S. 316.2951–316.2957 y 316.29545 como referencia) | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Servicio único: Window Tint. Mapa esquemático SIN porcentajes; parabrisas "franja transparente superior"; nota visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." El titular formula la pregunta "¿Qué polarizado es legal en Florida?" (no afirma que la película o el tono sea legal) y el CTA promete explicar los límites. Sin fotos. | Meta feed (FB/IG 4:5); orgánico FB/IG | 17.5 % | 5.54:1 |
| `out/c2-tint-limits_story-1080x1920_en.png` (210 KB) | C2 · Which window tint is legal in Florida? · Window Tint (límites de Florida) | Story/Reel 9:16 1080×1920 | EN | Ninguno numérico (solo cita F.S. 316.2951–316.2957 y 316.29545 como referencia) | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Servicio único: Window Tint. Mapa esquemático SIN porcentajes; parabrisas "franja transparente superior"; nota visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." El titular formula la pregunta "¿Qué polarizado es legal en Florida?" (no afirma que la película o el tono sea legal) y el CTA promete explicar los límites. Sin fotos. | Stories y portada de Reels (FB/IG); orgánico. Zona segura 250 px respetada | 14.4 % | 5.61:1 |
| `out/c2-tint-limits_story-1080x1920_es.png` (218 KB) | C2 · ¿Qué polarizado es legal en Florida? · Window Tint (límites de Florida) | Story/Reel 9:16 1080×1920 | ES | Ninguno numérico (solo cita F.S. 316.2951–316.2957 y 316.29545 como referencia) | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Servicio único: Window Tint. Mapa esquemático SIN porcentajes; parabrisas "franja transparente superior"; nota visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." El titular formula la pregunta "¿Qué polarizado es legal en Florida?" (no afirma que la película o el tono sea legal) y el CTA promete explicar los límites. Sin fotos. | Stories y portada de Reels (FB/IG); orgánico. Zona segura 250 px respetada | 14 % | 5.61:1 |
| `out/c2-tint-limits_link-1200x628_en.png` (136 KB) | C2 · Which window tint is legal in Florida? · Window Tint (límites de Florida) | Enlace 1.91:1 1200×628 | EN | Ninguno numérico (solo cita F.S. 316.2951–316.2957 y 316.29545 como referencia) | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Servicio único: Window Tint. Mapa esquemático SIN porcentajes; parabrisas "franja transparente superior"; nota visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." El titular formula la pregunta "¿Qué polarizado es legal en Florida?" (no afirma que la película o el tono sea legal) y el CTA promete explicar los límites. Sin fotos. | Meta anuncio de enlace (FB feed); Google Display / Demand Gen 1.91:1; orgánico (enlaces) | 17.2 % | 5.66:1 |
| `out/c2-tint-limits_link-1200x628_es.png` (139 KB) | C2 · ¿Qué polarizado es legal en Florida? · Window Tint (límites de Florida) | Enlace 1.91:1 1200×628 | ES | Ninguno numérico (solo cita F.S. 316.2951–316.2957 y 316.29545 como referencia) | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Servicio único: Window Tint. Mapa esquemático SIN porcentajes; parabrisas "franja transparente superior"; nota visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." El titular formula la pregunta "¿Qué polarizado es legal en Florida?" (no afirma que la película o el tono sea legal) y el CTA promete explicar los límites. Sin fotos. | Meta anuncio de enlace (FB feed); Google Display / Demand Gen 1.91:1; orgánico (enlaces) | 17.1 % | 5.66:1 |
| `out/c3-ceramic-surfaces_feed-1080x1350_en.png` (327 KB) | C3 · Ceramic coating, not only for the paint · Ceramic Coating | Feed 4:5 1080×1350 | EN | Ninguno numérico (lista de superficies y proceso "primero la preparación") | Servicio único: Ceramic Coating (pintura, vidrios, rines y calipers, molduras, interior), solo esquema con iconos simples. Sin fotos de autos, sin claims de desempeño ("9H", duración, garantías, "a prueba de rayones"). | Meta feed (FB/IG 4:5); orgánico FB/IG | 16.3 % | 5.98:1 |
| `out/c3-ceramic-surfaces_feed-1080x1350_es.png` (330 KB) | C3 · Cerámico, y no solo para la pintura · Ceramic Coating | Feed 4:5 1080×1350 | ES | Ninguno numérico (lista de superficies y proceso "primero la preparación") | Servicio único: Ceramic Coating (pintura, vidrios, rines y calipers, molduras, interior), solo esquema con iconos simples. Sin fotos de autos, sin claims de desempeño ("9H", duración, garantías, "a prueba de rayones"). | Meta feed (FB/IG 4:5); orgánico FB/IG | 14.9 % | 5.98:1 |
| `out/c3-ceramic-surfaces_story-1080x1920_en.png` (411 KB) | C3 · Ceramic coating, not only for the paint · Ceramic Coating | Story/Reel 9:16 1080×1920 | EN | Ninguno numérico (lista de superficies y proceso "primero la preparación") | Servicio único: Ceramic Coating (pintura, vidrios, rines y calipers, molduras, interior), solo esquema con iconos simples. Sin fotos de autos, sin claims de desempeño ("9H", duración, garantías, "a prueba de rayones"). | Stories y portada de Reels (FB/IG); orgánico. Zona segura 250 px respetada | 12.7 % | 6.66:1 |
| `out/c3-ceramic-surfaces_story-1080x1920_es.png` (411 KB) | C3 · Cerámico, y no solo para la pintura · Ceramic Coating | Story/Reel 9:16 1080×1920 | ES | Ninguno numérico (lista de superficies y proceso "primero la preparación") | Servicio único: Ceramic Coating (pintura, vidrios, rines y calipers, molduras, interior), solo esquema con iconos simples. Sin fotos de autos, sin claims de desempeño ("9H", duración, garantías, "a prueba de rayones"). | Stories y portada de Reels (FB/IG); orgánico. Zona segura 250 px respetada | 11.8 % | 6.66:1 |
| `out/c3-ceramic-surfaces_link-1200x628_en.png` (183 KB) | C3 · Ceramic coating, not only for the paint · Ceramic Coating | Enlace 1.91:1 1200×628 | EN | Ninguno numérico (lista de superficies y proceso "primero la preparación") | Servicio único: Ceramic Coating (pintura, vidrios, rines y calipers, molduras, interior), solo esquema con iconos simples. Sin fotos de autos, sin claims de desempeño ("9H", duración, garantías, "a prueba de rayones"). | Meta anuncio de enlace (FB feed); Google Display / Demand Gen 1.91:1; orgánico (enlaces) | 18.4 % | 6.88:1 |
| `out/c3-ceramic-surfaces_link-1200x628_es.png` (183 KB) | C3 · Cerámico, y no solo para la pintura · Ceramic Coating | Enlace 1.91:1 1200×628 | ES | Ninguno numérico (lista de superficies y proceso "primero la preparación") | Servicio único: Ceramic Coating (pintura, vidrios, rines y calipers, molduras, interior), solo esquema con iconos simples. Sin fotos de autos, sin claims de desempeño ("9H", duración, garantías, "a prueba de rayones"). | Meta anuncio de enlace (FB feed); Google Display / Demand Gen 1.91:1; orgánico (enlaces) | 17.6 % | 6.88:1 |
| `out/og/og-default_en.jpg` (128 KB) | OG · default | Open Graph 1200×630 JPG | EN | Ninguno numérico | Marca (no es la sección Protection): "Car wash and boat detailing that comes to you" / "Lavado de carros y detallado de botes a domicilio" + zonas. Logo, dominio y teléfono. Menciona botes por indicación expresa; el alcance "solo autos" aplica a las piezas de Protection. | og:image / twitter:image de la home y páginas genéricas; previsualización de enlaces (WhatsApp, iMessage, FB, LinkedIn) | 18.8 % | 8.53:1 |
| `out/og/og-default_es.jpg` (128 KB) | OG · default | Open Graph 1200×630 JPG | ES | Ninguno numérico | Marca (no es la sección Protection): "Car wash and boat detailing that comes to you" / "Lavado de carros y detallado de botes a domicilio" + zonas. Logo, dominio y teléfono. Menciona botes por indicación expresa; el alcance "solo autos" aplica a las piezas de Protection. | og:image / twitter:image de la home y páginas genéricas; previsualización de enlaces (WhatsApp, iMessage, FB, LinkedIn) | 17.5 % | 8.53:1 |
| `out/og/og-window-tint_en.jpg` (128 KB) | OG · window-tint | Open Graph 1200×630 JPG | EN | Ninguno numérico | Solo Window Tint. Subtítulo de proceso: "Free quote by photo · Florida tint limits explained" / "Cotización gratis por foto · Límites de Florida explicados". Logo, dominio y teléfono. | og:image de /window-tint/ y /es/polarizado-de-vidrios/ (y de la sección #protection, parte tint) | 19.8 % | 7.89:1 |
| `out/og/og-window-tint_es.jpg` (129 KB) | OG · window-tint | Open Graph 1200×630 JPG | ES | Ninguno numérico | Solo Window Tint. Subtítulo de proceso: "Free quote by photo · Florida tint limits explained" / "Cotización gratis por foto · Límites de Florida explicados". Logo, dominio y teléfono. | og:image de /window-tint/ y /es/polarizado-de-vidrios/ (y de la sección #protection, parte tint) | 19.6 % | 7.89:1 |
| `out/og/og-ceramic-coating_en.jpg` (126 KB) | OG · ceramic-coating | Open Graph 1200×630 JPG | EN | Ninguno numérico | Solo Ceramic Coating (pintura, vidrios, rines, molduras, interior). Sin cifras de dureza, años ni "a prueba de rayones". Logo, dominio y teléfono. | og:image de /ceramic-coating/ y /es/recubrimiento-ceramico/ | 17.9 % | 8.53:1 |
| `out/og/og-ceramic-coating_es.jpg` (135 KB) | OG · ceramic-coating | Open Graph 1200×630 JPG | ES | Ninguno numérico | Solo Ceramic Coating (pintura, vidrios, rines, molduras, interior). Sin cifras de dureza, años ni "a prueba de rayones". Logo, dominio y teléfono. | og:image de /ceramic-coating/ y /es/recubrimiento-ceramico/ | 18.9 % | 8.53:1 |

### Gráficos web (`src/assets/protection/`, SVG inline; sin cambios en la ronda 3)

| Archivo | Servicio | Qué muestra | Claims | Nota de cumplimiento |
|---|---|---|---|---|
| `film-layers.{en,es}.svg` | Tint | Corte esquemático de la película (vidrio, adhesivo, capa de control solar carbono/cerámica, poliéster, "Hard coat") | Ninguno numérico | Sin promesa de resistencia al rayado. |
| `heat-path.{en,es}.svg` | Tint | Sol → vidrio → cabina, con y sin película (flechas gruesas vs finas, reflejo) | Ninguno numérico | Solo "más calor / menos calor" cualitativo. |
| `vlt-scale.{en,es}.svg` | Tint | 4 muestras de tono: 20, 35, 50, 70 % VLT con dónde sería legal sin exención (auto de pasajeros) | **Sí: porcentajes de VLT y de legalidad por ventana** | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Lleva "Escala de referencia, no asesoría legal". |
| `fl-windows-map.{en,es}.svg` | Tint | Sedán visto desde arriba con VLT mínimo por ventana (28 % / 15 %; parabrisas franja transparente superior; multipropósito traseras desde 6 % si está clasificado así; "Se mide en el vidrio terminado") | **Sí: porcentajes de ley** | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Lleva visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." |
| `ceramic-layers.{en,es}.svg` | Cerámico | Corte esquemático de pintura + recubrimiento cerámico; agua y suciedad se quitan más fácil | Ninguno numérico | Sin años ni dureza ("9H"). |

## 4. Copy de anuncio (por concepto e idioma)

Límites aplicados: textos principales ≤ 125 caracteres, titulares ≤ 40, descripción ≤ 30 (los números entre paréntesis son el conteo real). Cada concepto vende UN servicio. Ningún texto afirma que la película o el tono sea "legal"; ningún texto lleva el nombre de la marca.

### C1 · Window Tint · Window tint for your car · EN

Textos principales:
1. Florida sun is no joke. Carbon or ceramic window film for your car. Send a photo on WhatsApp for a quote. (105)
2. Window tint in Sarasota, Bradenton, Venice and St. Pete. Send a photo of your car for a free quote. (99)
3. Carbon or ceramic film for your side and back windows. We explain Florida's tint limits for each one. (101)

Titulares:
1. Window tint for your car (24)
2. Carbon or ceramic film (22)
3. Quote your window tint by photo (31)

Descripción: Free quote by photo (19)

CTA (en la imagen): **Quote my tint on WhatsApp** · Botón de plataforma sugerido: Send WhatsApp Message

### C1 · Window Tint · Polarizado para tu carro · ES

Textos principales:
1. El sol de Florida no perdona. Película de carbono o cerámica para tu carro. Cotiza por foto en WhatsApp. (104)
2. Polarizado en Sarasota, Bradenton, Venice y St. Pete. Manda una foto de tu carro y te cotizamos gratis. (103)
3. Película de carbono o cerámica para las ventanas y el vidrio trasero. Te explicamos los límites de Florida por ventana. (119)

Titulares:
1. Polarizado para tu carro (24)
2. Película de carbono o cerámica (30)
3. Cotiza tu polarizado por foto (29)

Descripción: Cotización gratis por foto (26)

CTA (en la imagen): **Cotiza tu polarizado por WhatsApp** · Botón de plataforma sugerido: Enviar mensaje de WhatsApp

### C2 · Window Tint (límites de Florida) · Which window tint is legal in Florida? · EN — REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR

Textos principales:
1. What tint can your car have in Florida? It changes by window. Tell us your car and we'll explain the limits. (108)
2. Front windows, back windows and windshield each have their own tint limits in Florida. We explain yours. (104)
3. Not sure what your car can have? Message us the year and model on WhatsApp. Appointments subject to availability. (113)

Titulares:
1. Florida window tint limits (26)
2. Know your car's tint limits (27)
3. Tint limits, window by window (29)

Descripción: Free quote by photo (19)

CTA (en la imagen): **Tell us your car and we'll explain the limits** · Botón de plataforma sugerido: Send WhatsApp Message

### C2 · Window Tint (límites de Florida) · ¿Qué polarizado es legal en Florida? · ES — REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR

Textos principales:
1. ¿Qué polarizado puede llevar tu carro en Florida? Cambia por ventana. Dinos tu carro y te explicamos los límites. (113)
2. Ventanas de adelante, de atrás y parabrisas: cada una tiene sus límites en Florida. Te explicamos los de tu carro. (114)
3. ¿No sabes qué puede llevar tu carro? Escríbenos por WhatsApp con el año y modelo. Citas sujetas a disponibilidad. (113)

Titulares:
1. Límites de polarizado en Florida (32)
2. Conoce los límites de tu carro (30)
3. Límites por ventana, explicados (31)

Descripción: Cotización gratis por foto (26)

CTA (en la imagen): **Dinos tu carro y te explicamos los límites** · Botón de plataforma sugerido: Enviar mensaje de WhatsApp

### C3 · Ceramic Coating · Ceramic coating, not only for the paint · EN

Textos principales:
1. Ceramic coating isn't only for the paint. Glass, wheels and calipers, exterior trim and the interior can be coated too. (119)
2. Ceramic coating in Sarasota, Bradenton, Venice and St. Pete. Prep first, coating after. Send photos for a free quote. (117)
3. Paint, glass, wheels, trim, interior: tell us what you want coated and send photos on WhatsApp for a quote. (107)

Titulares:
1. Ceramic coating, not only paint (31)
2. Coat the glass, wheels and interior (35)
3. Quote your coating by photo (27)

Descripción: Free quote by photo (19)

CTA (en la imagen): **Quote my coating on WhatsApp** · Botón de plataforma sugerido: Send WhatsApp Message

### C3 · Ceramic Coating · Cerámico, y no solo para la pintura · ES

Textos principales:
1. El recubrimiento cerámico no es solo para la pintura. También vidrios, rines y calipers, molduras e interior. (109)
2. Recubrimiento cerámico en Sarasota, Bradenton, Venice y St. Pete. Primero la preparación, luego el recubrimiento. (113)
3. Pintura, vidrios, rines, molduras, interior: dinos qué quieres recubrir y manda fotos por WhatsApp para cotizar. (112)

Titulares:
1. Recubrimiento cerámico, no solo pintura (39)
2. Vidrios, rines e interior también (33)
3. Cotiza tu recubrimiento por foto (32)

Descripción: Cotización gratis por foto (26)

CTA (en la imagen): **Cotiza tu recubrimiento por WhatsApp** · Botón de plataforma sugerido: Enviar mensaje de WhatsApp

## 5. Reglas aplicadas

- **Dos servicios distintos, nunca mezclados**: Window Tint = ventanas, vidrio trasero, franja del parabrisas y sunroof (según foto) (C1, C2, OG window-tint). Ceramic Coating = todos los tratamientos: pintura, vidrios, rines y calipers, molduras y plásticos de afuera, interior (C3, OG ceramic-coating). El lint lo verifica.
- Cero cifras de rechazo de calor, TSER, UV, durabilidad, años de garantía, "de por vida", "9H", "a prueba de rayones", porcentajes de satisfacción, número de clientes o reseñas. Cero precios.
- Ninguna frase afirma que la película, el tono o la instalación sean "legales": se afirma un proceso ("te explicamos los límites por ventana"). La legalidad es de la ventana terminada (vidrio + película). Única excepción deliberada: la PREGUNTA del titular de la imagen C2.
- Sin fotos de autos ni antes/después en ningún creativo (no hay fotos aprobadas). Imágenes = esquemas e iconos.
- Sin escasez ni urgencia. Pie: "Appointments subject to availability" / "Citas sujetas a disponibilidad".
- Zona de servicio exacta (ver arriba). Parabrisas descrito como "franja transparente superior".
- Terminología en español: "carro", "polarizado", "vidrios/ventanas", "cotización", "rines", "sunroof (quemacocos)"; "película cerámica" (tint) vs "recubrimiento cerámico" (servicio de cerámico).
- Los únicos porcentajes del paquete están en los SVG web `fl-windows-map` y `vlt-scale`, ambos en revisión legal. Las piezas C2 no llevan porcentajes.

## 6. Verificaciones realizadas

- **Lint de copy** (`audit.mjs`): `copy.mjs`, plantillas y SVG web sin frases vetadas de legalidad de película/tono, sin la ciudad fuera de zona (cualquier forma), sin `hero-finish`, sin claims de dureza/duración/garantía, sin muestra de 5 % en `vlt-scale`, sin "legal" en textos de anuncio, sin mezcla de servicios.
- Render con Chrome headless, Outfit e Inter desde Google Fonts (`display=swap`) y `--virtual-time-budget`; `audit.mjs` confirma `document.fonts` (Outfit 800 e Inter 600 cargadas) en las 24 piezas.
- Contraste WCAG medido sobre el píxel real: cada caja de texto se compara con el fondo renderizado SIN texto (percentil 2 del peor píxel). Resultado: mínimo 5.54:1 (criterio del paquete 4.5:1 en todo el texto).
- Área de texto (unión de cajas de línea, incluye CTA, dominio y notas): máximo 19.8 % (límite orientativo de Meta: 20 %). El texto del logo no se cuenta.
- Story: ningún texto ni el logo fuera de y = 250..1670 px. Dimensiones exactas verificadas en cada PNG; OG < 250 KB.
- Revisión visual manual de las imágenes principales de cada concepto y formato (textos cortados, solapes, fuentes de respaldo, iconos legibles).

## 7. Pendiente de revisión legal y riesgos

1. **Pendiente de revisión legal**: C2 (6 PNG), `fl-windows-map` y `vlt-scale` (SVG web): dónde sería legal cada tono, texto de multipropósito/clasificación, cita de F.S. 316.2951–316.2957 y 316.29545. El titular de C2 conserva la pregunta "¿Qué polarizado es legal en Florida?"; si Cumplimiento la prefiere sin "legal", se cambia en `copy.mjs`.
2. **OG default menciona botes** ("boat detailing / detallado de botes") por indicación expresa; es una imagen de marca, no de la sección Protection (alcance solo autos).
3. **Texto dentro del logo**: el logo contiene el nombre de la marca en su lettering; es el logo, no texto de los creativos. Meta puede contarlo en su estimación de texto.
4. **CTA "en WhatsApp"** (C1 y C3): requiere que `(941) 422-4405` esté activo en WhatsApp Business y que el mensaje prellenado pida fotos del vehículo.
5. **Términos**: el sitio actual usa "Revestimiento cerámico" (hero) mientras estos creativos usan "recubrimiento cerámico". Unificar con la landing. En español se usa "Luneta" (vidrio trasero) en C2; el sitio dice "carro" en otras partes.
6. El azul de texto en C2 sobre fondo claro es `#0062c4` (versión más oscura del azul profundo `#0077ff`) para cumplir AA; el resto de colores son los tokens de `src/index.css`.
7. Los OG de ventana y cerámico prometen "cotización gratis por foto"; deben apuntar a páginas donde ese flujo exista. Las fichas de C3 (iconos) son abstractas: si hay fotos reales aprobadas más adelante, se pueden sumar sin cambiar el copy.

## 8. Regenerar

```bash
node marketing/creatives/render.mjs      # 18 PNG + 6 JPG en out/ (necesita Chrome e internet para las fuentes)
node marketing/creatives/audit.mjs       # lint, fuentes, contraste, % de texto, zonas seguras -> out/audit.json
node marketing/creatives/manifest.mjs    # regenera este archivo
```

Estructura: `templates/*.html` + `templates/base.css` (una plantilla por concepto: `c1-tint-windows`, `c2-tint-limits`, `c3-ceramic-surfaces`, y `og`), `assets/logo.jpg`, `render.mjs`, `audit.mjs`, `manifest.mjs`, `out/` y `out/og/`. Para cambiar un texto, edítalo SOLO en `copy.mjs`.
