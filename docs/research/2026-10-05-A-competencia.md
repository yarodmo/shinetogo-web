# Investigación A — Competidores locales (SW Florida): detailing móvil, window tint, cerámico, botes

Fecha de consulta de todo el informe: **2026-10-05**. Solo lectura de páginas públicas (GET). No se contactó a nadie ni se envió ningún formulario.

Convención de evidencia: **[HECHO + fuente + 2026-10-05]**, **[INFERENCIA]**, **[NO VERIFICADO]**. Las URLs de sitios de competidores son las páginas consultadas. Salvo que se indique otra cosa, "Maps" = dataset Apify (ver sección 1).

---

## 0. Resumen ejecutivo

1. **La reputación en este nicho se compra con volumen de reseñas, no con calificación.** 73 de 114 perfiles con calificación tienen exactamente 5.0 y el 82% tiene 4.9 o más; la calificación no distingue. Lo que distingue es el conteo (mediana 67; los 17 negocios con 200 o más reseñas tienen todos sitio web). [HECHO + dataset Apify 3EVvsMJhjpx0ITaWw + 2026-10-05]
2. **Casi nadie cubre español, WhatsApp ni precios.** En 80 homepages leídas: 1 tiene versión en español, 3 mencionan WhatsApp, ~13 muestran algún precio en la home. [HECHO, ver sección 4]
3. **Los especialistas de tint móvil no hacen cerámico, y los detailers móviles con cerámico no hacen tint** (con una excepción pequeña en Bradenton). Hueco claro para un operador móvil con dos páginas separadas. [HECHO parcial + INFERENCIA]
4. **Las afirmaciones legalmente delicadas abundan**: "lifetime" sin términos visibles, "permanent", "10-Year Warranted" sin condiciones, "never wax again". No se encontró "9H" en ninguna de las 80 homepages. [HECHO]
5. **ShineToGo parte de casi cero reseñas** (un perfil "Shine to Go Mobile Car Wash" aparece con 3 reseñas; ver 1.4). El primer trabajo es un sistema de reseñas, no el diseño de la web.

---

## 1. Fuente de datos y método

### 1.1 Apify (Google Maps Scraper)
- Actor: `compass/crawler-google-places` (634 224 usuarios totales, 38 766 mensuales según fetch-actor-details). Schema leído **antes** de correr. [HECHO + Apify fetch-actor-details + 2026-10-05]
- Una sola corrida (runId `cufuiHPbZCEJTKsY6`, dataset `3EVvsMJhjpx0ITaWw`) con las 6 búsquedas pedidas, `maxCrawledPlacesPerSearch=20`, país `us`, idioma `en`, `maxReviews=0`, `maxImages=0`, sin enriquecimiento de contactos, sin detail page. Estado SUCCEEDED en 167 s, 120 ítems (20 por búsqueda). Sin expiración; **no hizo falta WebSearch como respaldo del scraping**.
- **Costo real: no lo devuelve la API de la herramienta [NO VERIFICADO].** Estimación con precio de lista del actor, tier FREE: 120 lugares x 0.004 USD = 0.48 USD más evento de arranque (0.00005 por GB) [INFERENCIA]. Muy por debajo del techo de 2 USD (se fijó `maxTotalChargeUsd=1.5`).
- WebSearch se usó solo de forma **complementaria** (español, ley de tint, precios), no como respaldo.
- Archivos de trabajo (scratchpad): `maps_raw.json`, `maps_details.json`, `census_google_maps_2026-10-05.csv` (censo completo de 117 negocios únicos con nombre, categoría, calificación, reseñas, web, teléfono, horario, atributos Planning/Service options).

### 1.2 Lectura de sitios
- Los 8 sitios top por reseñas se visitaron con WebFetch **y** se verificaron con GET crudo de HTML (curl) porque WebFetch resume con un modelo pequeño y trunca páginas largas (devolvió contenido vacío o truncado para Kingdom Clean y Suncoast, y datos que luego contradijo el HTML en otros casos). Todo dato de sitio abajo salió del HTML crudo salvo que diga "WebFetch".
- **Suncoast Window Films y Xclusive Auto Salon devuelven 403 a peticiones automáticas (curl).** No se intentó esquivar la protección. Para Suncoast solo hay teléfono y email; para Xclusive hay datos de WebFetch de una sola fuente.
- Escaneo de homepages de los 91 sitios web del censo: 80 respondieron 200; 11 fallaron (5 con 403, 2 con 404, 2 sin conexión, 1 redirección, 1 error 526). Escaneo por regex sobre texto de la homepage únicamente: **es un piso, no un techo** (no ve subpáginas ni contenido cargado por JavaScript).

### 1.3 Limitación importante del dato de Maps
- El dataset **no trae** botón de mensajes ni de reservas: `servicesLink` y `reserveTableUrl` son null en los 120 ítems. Eso significa "campo no extraído", no "el perfil no los tiene". **Mensajería/reservas en el perfil de Maps = [NO VERIFICADO].**
- Sí trae horario semanal: 115 de 117 negocios únicos lo listan. 38 muestran el atributo de cita ("Appointment required" o "recommended") y 34 el de "Onsite services". Solo 4 se marcan "Latino-owned" (Exotic Car Detailing & Ceramic Coating, Autodetailing Hand A-1, The Detail Guys, Liberty Mobile Auto Detailing).

### 1.4 Dato que el cliente debe confirmar
- En la búsqueda "mobile car detailing Sarasota FL" aparece **"Shine to Go Mobile Car Wash"**, web detailshine2go.com, tel (941) 952-8758, 5.0 con 3 reseñas, posición 19 de 20. [HECHO + Maps + 2026-10-05] **[INFERENCIA]**: probablemente es el perfil previo del propio negocio. Confirmar y no crear un perfil duplicado.

---

## 2. Censo (resumen de 117 negocios únicos; detalle en el CSV)

| Métrica | Valor |
|---|---|
| Filas / únicos por teléfono / con calificación | 120 / 117 / 114 |
| Calificación media simple (114) | 4.91; 73 con 5.0; 82% con 4.9 o más |
| Reseñas: mediana | 67 (35 negocios con menos de 30) |
| Con sitio web / sin sitio | 91 / 26 |
| Mediana de reseñas con sitio vs sin sitio | 86 vs 28 |
| Negocios con 100 o más reseñas | 38 (35 con web); con 200 o más: 17 (17 con web) |
| Mediana de reseñas por búsqueda | tint 108; cerámico 92; detailing Bradenton 67; St. Pete 60; detailing Sarasota 55; botes 27 |
| Categoría Maps | 82 "Car detailing service" (cerámico y mucho tint viven aquí), 20 de tint, 13 de bote, resto otros |
| Anuncio pagado visible | 1 (Lakewood Ranch Tint) |
| Perfiles duplicados | Kingdom Clean (363 y 3 reseñas), Sarasota Mobile Detail (2 filas), Ithiel (2 filas) |

Top 30 por reseñas (Maps; "T" = tint, "C" = cerámico, "D" = detailing móvil, "B" = bote):

| # | Negocio | Cat. | Cal. | Reseñas | Web | Horario | Cita/Onsite (Maps) |
|---|---|---|---|---|---|---|---|
| 1 | Solar Vision Window Tinting | T | 4.9 | 454 | solarvisionfl.com | sí | requerida / onsite |
| 2 | Suncoast Window Films (3M) | T | 5.0 | 435 | suncoastwindowfilms.com | sí | no indicado |
| 3 | Classy Customs | T/C | 5.0 | 420 | classycustoms.com | sí | onsite |
| 4 | Car X Mobile Detailing | D | 5.0 | 405 | carxmobiledetailing.com | sí | requerida y recomendada |
| 5 | Kingdom Clean Mobile Detailing | D/C | 5.0 | 363 | kingdomcleanmobiledetailing.com | sí (sitio) | no indicado |
| 6 | Detailers of Sarasota | D/C | 5.0 | 350 | detailersofsarasota.com | sí | requerida |
| 7 | Ceramic Pro Sarasota | C/T | 4.7 | 334 | ceramicprosarasota.com | sí | recomendada / onsite |
| 8 | Xclusive Auto Salon | C/T/D | 5.0 | 319 | xclusiveautosalon.com | sí | requerida y recomendada |
| 9 | Auto Armour Mobile Window Tint | T | 5.0 | 282 | autoarmourfl.com | sí | requerida |
| 10 | 77 Mobile Car Detailing | D | 5.0 | 266 | 77autodetailing.com | sí | requerida |
| 11 | Fantastic Customs | T | 5.0 | 247 | fantasticcustoms.com | sí | requerida |
| 12 | Liquid Shine Elite Mobile Detailing | D | 5.0 | 240 | liquid-shine.com | sí | no indicado |
| 13 | Redline Detailing St. Petersburg | D | 4.8 | 230 | redlinedetailingstpete.com | sí | no indicado |
| 14 | Absolute Perfection Mobile Detailing | D/B | 4.9 | 227 | absoluteperfectionmobiledetailing.com | sí | no indicado |
| 15 | The Detail Guys | D/B | 4.9 | 218 | thedetailguysfl.com | sí | requerida y recomendada |
| 16 | Sharkey's Detailing & Tint | C/T | 5.0 | 213 | sharkeysdetailingandtint.com | sí | no indicado |
| 17 | AAA Tint Stop | T | 4.7 | 209 | aaatintstop.com | sí | requerida |
| 18 | Tint SRQ | T | 5.0 | 185 | tintsrq.com | sí | requerida |
| 19 | Tony's Mobile Detailing | D | 5.0 | 180 | tonydetailing.com | sí | requerida y recomendada |
| 20 | Ceramic Tint Pros and Detailing | T/D | 5.0 | 177 | sarasotaceramictint.com | sí | no indicado |
| 21-30 | Remarkable Detailing (177), Tommy Tints (175), 941 Mobile Detailing (175), St Pete Auto Detail (161), DRK Customs (153), 2 Zero Car Studio (152), Jonesy Auto Detailing (149), Blackout Tinting (146), Sarasota Mobile Detail (145), Showshine (142) | | | | | | |

[HECHO + Apify dataset 3EVvsMJhjpx0ITaWw + 2026-10-05]. Teléfonos y mensajería: ver CSV; mensajería/reservas en Maps = [NO VERIFICADO].

---

## 3. Los 8 sitios top (por reseñas) con evidencia, más 7 complementarios

Los 8 primeros son exactamente el top 8 por número de reseñas del censo. Los complementarios se añadieron porque son el competidor más cercano al modelo de ShineToGo (tint móvil, todo-en-uno, bilingüe, botes).

### 3.1 Solar Vision Window Tinting (454 reseñas, 4.9) — solarvisionfl.com
- **Contacto:** teléfono con enlace de llamada y formulario "Request a Free Quote" con selector de categoría (General, Auto, Residencial, Comercial, Decorativo, Seguridad, Solar shades, Escuelas). Sin SMS, sin WhatsApp, sin widget de reservas. Promete responder en 24 h en días hábiles. Pago aceptado: efectivo, cheques y money order; no lista tarjetas. [HECHO + https://solarvisionfl.com/contact-us/ + 2026-10-05]
- **Precios:** ninguno. **Páginas por servicio:** sí (Auto, Residencial, Comercial, Decorativas, Seguridad, Solar shades, Escuelas); **no hay página de cerámico**. [HECHO + https://solarvisionfl.com/]
- **Español:** no. **Móvil:** no indicado (taller en 2227 University Pkwy). **Horario:** L-V 8:30-4:30.
- **Prueba social:** un solo testimonio, insignias de directorios (BBB, Yelp, Foursquare, etc.), "30 000 instalaciones" y negocio desde 1985. Imágenes de producto e instalación, sin galería dedicada a la vista. Pie de página con año 2021 (señal de abandono).
- **Garantía/riesgo:** la página de tint auto afirma garantía de por vida en todas las películas, sin condiciones visibles; "99% UV". [HECHO + https://solarvisionfl.com/services/auto-window-tinting/]
- **Planes de mantenimiento:** ninguno.

### 3.2 Suncoast Window Films, 3M (435 reseñas, 5.0) — suncoastwindowfilms.com
- Sitio responde 403 a automatización y WebFetch devolvió contenido truncado. Solo se obtuvo teléfono (941) 417-4000 y email. Todo lo demás (formularios, precios, español, garantías, prueba social) = **[NO VERIFICADO]**. El título del perfil indica distribuidor autorizado 3M. [HECHO + Maps + WebFetch parcial + 2026-10-05]

### 3.3 Classy Customs (420 reseñas, 5.0) — classycustoms.com
- **Contacto:** teléfono con enlace de llamada; botones "Free Estimate / Get Quote" a páginas de formulario. El formulario de tint (`/services-free-estimate`) tiene **más de 10 campos**: nombre, email, teléfono, marca, modelo, año, puertas, remoción de tint viejo, zonas a polarizar, tipo de servicio, cómo nos conoció. Sin SMS, WhatsApp ni reservas. [HECHO + https://www.classycustoms.com/services-free-estimate + 2026-10-05]
- **Precios:** ninguno. **Páginas separadas:** sí, para tint (`/auto-window-tinting-services`), cerámico (`/car-ceramic-coating-services`), PPF, wraps, detailing, corrección de pintura, tint comercial y residencial, tint de faros. [HECHO + https://www.classycustoms.com/]
- **Español:** no. **Móvil:** no (taller). **Horario:** mar-sáb 9-6.
- **Prueba social:** más de 15 testimonios, galería, distribuidor LLumar SelectPro.
- **Garantía:** garantía limitada de por vida del fabricante que cubre película e instalación y viaja con el título del vehículo; con asterisco: solo EE. UU. y Canadá, con restricciones. Es una afirmación **calificada** (mejor práctica entre los de "lifetime"). [HECHO + https://www.classycustoms.com/llumar-window-film-manufacturers-lifetime-warranty]
- **Riesgo:** en la página de cerámico dice que ya no hace falta encerar ("obsoleto") y habla de superficie autolimpiante y "muchos años"; es lenguaje absoluto sin condiciones. [HECHO + https://www.classycustoms.com/car-ceramic-coating-services] Enlaza una página de leyes de tint (bien).

### 3.4 Car X Mobile Detailing (405 reseñas, 5.0) — carxmobiledetailing.com (Wix)
- **Contacto:** teléfono con enlace de llamada, email, página de contacto, y **reserva online por servicio** (calendario de Wix, botones "Book Now" / "Request to Book"). Sin WhatsApp ni SMS. [HECHO + https://www.carxmobiledetailing.com/ + 2026-10-05]
- **Precios publicados "desde"** para 13 servicios: lavado express desde 100 USD, detail clásico 250, premium 300, platinum 350, interior 200, exterior 150, RV 500, sobrepintura industrial 300, avión 250, inundación 1 000, **cerámico desde 1 500 USD** (trabajo hecho en su garaje, 2-3 días, no en casa del cliente). El texto aclara que el precio depende del tamaño y condición. [HECHO + https://www.carxmobiledetailing.com/services-book-online y /service-page/ceramic-coating]
- **Membresías:** sí. Express Maintenance 100 USD/mes; Premium 300 USD/mes más 100 USD de alta. [HECHO + https://www.carxmobiledetailing.com/pricing-plans/plans-pricing]
- **Tint:** sin página. **Español:** no. **Horario:** todos los días 8-6. **Zonas:** Sarasota, Bradenton, Lakewood Ranch, Siesta Key, Longboat Key, Venice, Palmetto.
- **Prueba social:** enlace a reseñas de Google y galería; sin testimonios en la home. **Garantía:** ninguna visible. **Legal:** incluye un waiver (no responsable de rayones previos ni objetos) que lee como cobertura de riesgo razonable.

### 3.5 Kingdom Clean Mobile Detailing (363 reseñas, 5.0) — kingdomcleanmobiledetailing.com
- **Contacto:** teléfono con enlace de llamada; "Get a Quote" lleva a `/contact-us`, cuyo HTML estático solo muestra horario y zona (el formulario no se vio, **[NO VERIFICADO]**). Texto invita a llamar o escribir. Sin WhatsApp (no hay enlace wa.me). [HECHO + https://kingdomcleanmobiledetailing.com/ + /contact-us + 2026-10-05]
- **Precios:** ninguno. **Páginas por servicio:** hay una sección de servicios (corrección de pintura, paquetes completos/exterior/interior, cerámico, add-ons) y **páginas por ciudad** (Bradenton, Palmetto, Lakewood Ranch, Sarasota, Parrish, Longboat Key, Anna Maria). Sin tint (menciona recubrimiento de ventanas, no película).
- **Español:** no. **Horario:** L-V 7-8 pm, sáb 7-6, dom cerrado.
- **Prueba social:** muestra el conteo (363) en el sitio, galería y reseñas de Google embebidas con fechas; destaca un reconocimiento local de 2026 como mejor detailer móvil de Bradenton (sin verificar el origen del premio).
- **Garantía/riesgo:** ofrece cerámico en opciones de 10, 6 y 3 años sin explicar si es durabilidad o garantía. [HECHO + HTML crudo de la home]
- **Nota:** perfil de Maps duplicado (363 y 3 reseñas).

### 3.6 Detailers of Sarasota (350 reseñas, 5.0) — detailersofsarasota.com (Wix)
- **Contacto:** teléfono con enlace de llamada, botones "Send Us Text" (llevan a la página de contacto; **no hay enlace sms:**), formulario de **6 campos** (nombre, apellido, email, teléfono, vehículo, comentarios) y **reserva online con Housecall Pro**. Confirmación automática por texto y email y aviso de "voy en camino" con ETA. [HECHO + https://www.detailersofsarasota.com/ y /contact-us + 2026-10-05]
- **Precios:** ninguno; FAQ dice que se cotiza por contacto; acepta efectivo, tarjetas, Zelle y cheques. **Páginas separadas:** cerámico (`/ceramic-coating-sarasota`), detailing (`/mobile-car-detailing-sarasota`), corrección de pintura; **sin tint**; sin español.
- **Planes:** su detail nivel 1 es "mantenimiento" semanal, quincenal o mensual con prioridad de agenda; 10% por 5 o más autos el mismo día; tarjetas de regalo.
- **Prueba social:** "300+" reseñas de 5 estrellas, 12+ años, 10 000+ vehículos, testimonios con fecha.
- **Garantía/riesgo:** etiqueta "10-Year Warranted" sin términos visibles; el FAQ dice que una capa dura mínimo 3 años y varias 7-10; titula sus recubrimientos como "permanentes", dice que no se quitan con agua y que son hasta 5 veces más duros que el barniz de fábrica. [HECHO + https://www.detailersofsarasota.com/ceramic-coating-sarasota] Es el ejemplo más claro de lenguaje absoluto.
- **Inconsistencia:** teléfono del sitio (941) 307-5069 vs Maps (941) 307-5096.

### 3.7 Ceramic Pro Sarasota (334 reseñas, 4.7) — ceramicprosarasota.com
- **Contacto:** teléfono del sitio (941) 773-9500 (Maps muestra otro: (941) 200-0194); "Get a Free Quote" a `/quick-quote/` (formulario WPForms, campos no visibles en HTML estático, **[NO VERIFICADO]**). Sin SMS/WhatsApp. [HECHO + https://ceramicprosarasota.com/quick-quote/ + 2026-10-05]
- **Precios:** ninguno. **Páginas separadas:** sí y muy completas (`/window-tint/`, `/ceramic-coating/`, `/boat-ceramic-coating/`, `/paint-protection-film/`, Tesla, detailing, wrap, body shop). Dos puntos útiles: tiene página de **cerámico en botes**; la página de tint afirma que cumple las regulaciones de tint de Florida. [HECHO + https://ceramicprosarasota.com/window-tint/]
- **Español:** no hay versión; solo enlaces a redes en configuración regional hispana. **Móvil:** no (taller). **Horario:** L-V 8-5.
- **Prueba social:** testimonios y sello Elite Dealer; sin conteo ni fotos antes/después en la home.
- **Garantía:** no hay sección propia; solo un testimonio habla de garantía de por vida en PPF.
- **Dato interesante:** es la marca más grande y tiene la calificación **más baja** del top 8 (4.7).

### 3.8 Xclusive Auto Salon (319 reseñas, 5.0) — xclusiveautosalon.com
- Sitio bloquea a curl (403); datos de WebFetch de **una sola fuente**, no verificados con HTML crudo.
- **Contacto:** formulario con unos 7 campos (nombre, email, teléfono, marca, modelo, año, servicio) según WebFetch; botón "Book Now". Se leyeron resultados contradictorios sobre si muestra teléfono. [NO VERIFICADO el teléfono visible]
- **Precios (WebFetch, una fuente):** tint de sedán entre 99.99 y 449.99 USD, camioneta/SUV entre 99.99 y 474.99 según paquete y zonas; películas Autobahn Black, Hitek Carbon IR y Hitek Ceramic IR; rechazo infrarrojo 13-72% y 99% UV. Sin garantía en la página de tint. [WebFetch + https://xclusiveautosalon.com/window-tinting + 2026-10-05]
- **Páginas separadas:** sí (cerámico, tint, detailing, **mobile-detailing**, corrección). **Español:** no. **Planes:** programa VIP de descuentos. **Prueba social:** "100+" reseñas de 5 estrellas, 9 testimonios con foto y fecha. **Horario:** L-V 9-4:30, sáb solo con cita.

### 3.9 Complementarios (verificados con HTML crudo salvo indicación)

**Auto Armour Mobile Window Tint (282; 5.0) — autoarmourfl.com (Wix).** Tint 100% móvil. Formulario `/getaquote` con nombre, apellido, email, teléfono, tipo de auto, mensaje y **carga de archivo/foto hasta 15 MB**. Cuatro gamas de película (sin precios). Páginas por ciudad. Hace "tint cerámico" pero **no recubrimiento cerámico de pintura**. Lenguaje de legalidad: "lo más oscuro legal", sección de FAQ de regulaciones. Garantía: de por vida limitada del fabricante (calificada). Afirma que la película está recomendada por una fundación de cáncer de piel (atribución a la película; sin documentar en la página). **Defecto verificado:** el botón superior "Schedule Now" marca 941-465-7548, mientras que el número real del resto de la página y de Maps es 941-465-7458 (dígitos invertidos). Pie con año 2035 (error) y "Boca Raton" aunque opera en Sarasota. [HECHO + https://www.autoarmourfl.com/ y /getaquote y /faq + 2026-10-05]

**Sharkey's Detailing, Tint, Ceramic Coating & PPF (213 en Maps) — sharkeysdetailingandtint.com.** Todo-en-uno de taller. **Publica precios de tint "desde": película carbón 300, nano cerámica 425, súper cerámica 550 USD**, con porcentajes de rechazo infrarrojo (50/85/96%) como afirmación absoluta. Formulario con 6 campos más **dos casillas de consentimiento SMS** (GoHighLevel). Garantías diferenciadas y concretas: tint de por vida del fabricante, PPF 12 años, **cerámico 3 y 5 años**. Contradicciones en la misma home: "4.9 con 1 394 reseñas" frente a "158 reseñas" y "200+" (Maps: 213); declara 4 años de experiencia. Teléfono del sitio (941) 275-9850 distinto del de Maps. [HECHO + https://www.sharkeysdetailingandtint.com/sarasota-window-tinting y /contact-us + 2026-10-05]

**Ceramic Tint Pros and Detailing (177) — sarasotaceramictint.com.** Tint móvil y detailing; formulario/chat con GoHighLevel; horario publicado L-V 8 am a 10 pm; afirma "tintes aprobados en Florida" y "cumplimos las leyes de Florida", "protección UV garantizada"; garantía solo descrita como "varía"; sin precios; sin español; widget con 151 reseñas. [HECHO + https://sarasotaceramictint.com/ + 2026-10-05]

**Absolute Perfection Mobile Detailing (227) — absoluteperfectionmobiledetailing.com.** Detailing móvil de autos, **botes y RV** con **lista de precios completa** (esenciales 50 USD autos y 60 camionetas; detail desde 100/120; completo desde 160/170; corrección de pintura desde 300/400; pulido de rines 10; limpieza de vapor 100/125) y **planes de mantenimiento semanales, mensuales y trimestrales** (sin precio). Páginas separadas incluyendo bote, RV y cerámico (marca Jade); estudio aparte para PPF y cerámico en taller. Garantía de satisfacción; el cerámico se describe como "escudo permanente". Sin español ni tint. [HECHO + https://www.absoluteperfectionmobiledetailing.com/pricing/ + 2026-10-05]

**ELC Detailing Sarasota (bote; 91 en Maps) — elcdetailing.com.** Muestra 5.0 con 567 reseñas en su propio sitio (Maps trae 91; fuentes de conteo distintas, **[NO VERIFICADO] el origen**). Llamada, enlace SMS y cotización gratis; plan de "Annual Boat Management" (365 días); páginas por ciudad (Bradenton, Longboat Key, Siesta Key, Anna Maria); sin precios; sin español. **Defecto verificado:** el enlace de llamada del encabezado marca un número con un dígito de menos. [HECHO + https://elcdetailing.com/ + 2026-10-05]

**Detailed Mobile Car Clean (Bradenton; 54 en Maps, 36 en su widget) — detailedmobilecarclean.com.** **El único con versión en español verificada** (`/es/`, HTTP 200, hreflang es; traducción parcial con encabezados en inglés). Usa **WhatsApp (enlace wa.me)** para cotizar tint (2 ventanas, 4 ventanas, parabrisas, luneta; "el precio varía por vehículo"). Reserva online en 4 pasos con pago y precio automático por tipo de vehículo (sedán vs SUV/camioneta). Los testimonios son de clientes con apellidos hispanos. Las páginas de tint no existen: el tint vive dentro de la lista de servicios del detailer. [HECHO + https://detailedmobilecarclean.com/ y /es/ + 2026-10-05] Es el competidor que más se acerca al ángulo "español + WhatsApp + tint dentro de detailing"; no está en el top de reseñas.

**The Window Wizard (thewindowwiz.com).** No salió en el scraping (no entró en el top 20 de la búsqueda); lo encontró WebSearch. Tint 100% móvil en Bradenton/Sarasota, "30+ años", **precios publicados: completo desde 320, dos frontales desde 100, parabrisas 150, luneta 90, visera 60, remoción desde 100 USD**, y su mecanismo de cotización es por texto con foto ("Just text a photo, get a price."). Su FAQ simplifica la ley (28% frontal, 15% atrás, sin mencionar la excepción de SUV/van). Dice que el film es "SPF 1000" (afirmación absoluta). Sin español verificado. [HECHO + https://thewindowwiz.com/ + 2026-10-05]
**Implicación:** el hueco "rangos de precio y cotización por foto" **no está vacío en tint móvil**; sí lo está en cerámico y en detailing móvil bilingüe.

### 3.10 Matriz comparativa rápida (de los 8 + complementarios clave)

| Negocio | Llamar | Texto/SMS | WhatsApp | Form (campos) | Reserva | Precios | Pág. tint | Pág. cerámico | Español | Membresía | Garantía |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Solar Vision | sí | no | no | sí (selector) | no | no | sí | no | no | no | lifetime sin términos |
| Suncoast | sí | NV | NV | NV | NV | NV | NV | NV | NV | NV | NV |
| Classy Customs | sí | no | no | 10+ | no | no | sí | sí | no | no | lifetime calificada |
| Car X | sí | no | no | sí | sí (calendario) | sí, "desde" | no | sí | no | sí (100/300 al mes) | ninguna |
| Kingdom Clean | sí | NV | no | NV | NV | no | no | sí | no | no | 3/6/10 años, ambiguo |
| Detailers of Sarasota | sí | etiqueta, sin sms: | no | 6 | sí (Housecall Pro) | no | no | sí | no | mantenimiento y 10% multi-auto | 10 años sin términos |
| Ceramic Pro | sí | no | no | NV | no | no | sí | sí (+ bote) | no | no | no visible |
| Xclusive | NV | NV | no | ~7 (WebFetch) | "Book Now" | rango tint (WebFetch) | sí | sí | no | VIP | no visible |
| Auto Armour | sí (1 enlace roto) | no | no | 6 + foto | no | no | n/a (solo tint) | no | no | no | lifetime calificada |
| Sharkey's | sí | consentimiento SMS | no | 6 + 2 casillas | no | sí, tint "desde" | sí | sí | no | no | 3/5 años cerámico, lifetime tint |
| Detailed Mobile Car Clean | sí | no | **sí** | sí | **sí con pago** | parcial | integrado | integrado | **sí** | no | satisfacción |
| Window Wizard | sí | **sí, con foto** | no | n/d | no | **sí** | sí | no | no | no | no verificada |

NV = [NO VERIFICADO] (sitio bloqueado, truncado o formulario no visible en HTML estático).

---

## 4. Patrones en las 80 homepages leídas (91 sitios; 11 no respondieron)

[HECHO + escaneo de texto de homepages vía GET + 2026-10-05]. Es un piso (no ve subpáginas ni JavaScript).

| Señal | Sitios de 80 | Comentario |
|---|---|---|
| Teléfono con enlace de llamada | 61 | Canal universal |
| Texto/SMS o "llama o escribe" | 9 | Poco común |
| WhatsApp | 3 (Detailed Mobile Car Clean, Hernandez Premium Boat Detailing, QnR Auto Care) | Casi inexistente |
| Versión en español verificada | 1 | Detailed Mobile Car Clean |
| Algún precio en la home | ~13 | Casi todos detailing; el tint/cerámico de taller casi nunca |
| "Lifetime" aplicado a tint/PPF | 5 (Classy, Sharkey's, Auto Armour, Quality Window Tint Sarasota, Ceramic Pro por testimonio) | Quality Window Tint lo dice sin calificar |
| "9H" | 0 | No hay evidencia de que se use en la zona |
| "Permanente" aplicado a recubrimientos | Detailers of Sarasota y Absolute Perfection (en subpáginas) | Lenguaje absoluto |
| Mención de ley de tint de Florida | 3 en home (Ceramic Tint Pros, Auto Armour, Classy); más en subpáginas | |
| Planes/membresías de mantenimiento | ~12 (Car X, Island Shines, All Seasons, D3 Boomin, Captain Casey's, Soap Ops, Lush, Absolute Perfection, Octoshine, The Detail Guys, Wheelhouse, Detailers) | Precio visible solo en Car X |
| Reserva online evidente | ~47 con alguna señal de "book now" o proveedor (GoHighLevel 11, Housecall Pro 3, Square 3, Booksy 1, Shopmonkey 1, vcita 1) | Señal amplia, incluye botones que solo llevan a un formulario |

Otros hallazgos con evidencia:
- **Datos de contacto con errores:** de los 14 sitios revisados a fondo, 3 tienen teléfono distinto entre sitio y Maps (Ceramic Pro, Detailers of Sarasota, Sharkey's) y 2 tienen enlaces de llamada rotos (Auto Armour, ELC). [HECHO + HTML crudo + 2026-10-05]
- **Conteos de reseñas inconsistentes en la misma página** (Sharkey's: tres cifras distintas; ELC: 567 en su web vs 91 en Maps). [HECHO]
- **Pies de página obsoletos o con errores** (Solar Vision 2021, Kingdom 2023, Auto Armour 2035).

### Datos legales verificados (para no copiar errores)
- La ley de Florida sobre ventanas laterales delanteras exige transmitancia de luz de al menos 28% y reflectancia máxima del 25% (§ 316.2953, leg.state.fl.us). [HECHO + http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0316/Sections/0316.2953.html + 2026-10-05]
- Los límites traseros (15% para sedán, 6% para SUV/van/camioneta) los repiten fuentes secundarias de WebSearch, **no verificados contra el estatuto**. [INFERENCIA; verificar con § 316.2954 antes de publicar cualquier cifra]
- Window Wizard simplifica la ley (omite la excepción de SUV/van); copiarla sin matiz sería un riesgo.

---

## 5. Conclusiones

### 5.1 Qué comparten los de mejor reputación (200 o más reseñas, 17 negocios)
1. **Todos tienen sitio web** y lo usan como prueba: muestran el conteo de reseñas (Kingdom 363, Detailers 300+, Auto Armour 270+, Sharkey's 200+). [HECHO]
2. **Narrativa de dueño o familia y antigüedad** (desde 1985, 12+ años, 10 000+ vehículos, "family owned"). [HECHO]
3. **Páginas por servicio y por ciudad** en los que más reseñas tienen (Classy, Ceramic Pro, Kingdom, Auto Armour, ELC). [HECHO]
4. **Una especialidad clara** (tint, o detailing con cerámico, o taller multiservicio con páginas separadas), no una mezcla genérica en una sola página.
5. **Baja fricción de contacto en los móviles que más crecen**: Detailers (reserva Housecall Pro más SMS automáticos con ETA), Car X (calendario y planes), Auto Armour (formulario corto con foto). [HECHO]
6. **Los precios no son requisito de reputación**: 5 de los 8 primeros no publican nada, y Ceramic Pro, con 334 reseñas, ni siquiera lo hace. [INFERENCIA]. Aun así, los que sí lo hacen (Car X, Xclusive, Sharkey's) compiten por transparencia.

### 5.2 Qué hace mal casi todo el mundo
- **Español y WhatsApp casi ausentes** (1 y 3 de 80).
- **Formularios largos o ciegos**: Classy con más de 10 campos; varios sin saber si el formulario existe o llega (Kingdom, Ceramic Pro, no verificado).
- **Enlaces de llamada y teléfonos con errores** (5 casos en 14 sitios).
- **Garantías absolutas sin términos** y promesas de "permanente" o "para siempre".
- **Mezcla confusa de tint y cerámico**: los de tint móvil no hacen cerámico de pintura; los de cerámico móvil no hacen tint; los talleres que hacen ambos no van a casa del cliente.
- **Precios ocultos** (≈80% de homepages sin cifra) y **cotizaciones sin mecanismo claro**.
- **Descuido de mantenimiento del sitio** (años de pie de página desactualizados) y **perfiles de Maps duplicados**.
- **Bote**: mediana de solo 27 reseñas y 19 resultados, muchos con presencia web mínima (2 sin sitio). Segmento menos competido por reputación. [HECHO + dataset]

### 5.3 Cinco huecos concretos para ShineToGo

1. **Español real de punta a punta, con WhatsApp.** Solo Detailed Mobile Car Clean tiene `/es/` y WhatsApp, y su tint se cotiza por WhatsApp sin página propia; nadie tiene una página de tint o cerámico en español. Un sitio bilingüe con páginas de servicio traducidas (no solo la home) y un botón de WhatsApp con mensaje precargado ocupa un espacio casi vacío, sobre todo en Sarasota, Venice y St. Petersburg. [HECHO + INFERENCIA]. Nota: no hay cifras propias de demanda hispana en este informe; no se inventó ninguna.
2. **Rangos "desde" por tamaño de vehículo en cerámico, más cotización por foto en tint y cerámico.** En tint móvil, Window Wizard ya publica precios y pide foto por texto; Auto Armour acepta foto en el formulario. En **cerámico** casi nadie publica (Car X desde 1 500 USD en su garaje; Clear Vision desde 250 con opciones de 1 a 7 años). ShineToGo puede publicar rangos con los factores que los mueven, y copiar el mecanismo de foto sin los errores de los demás. [HECHO]
3. **Dos páginas de servicio separadas (tint y cerámico) con operación móvil real.** Los especialistas móviles de tint no ofrecen cerámico de pintura, y los detailers móviles con cerámico no ofrecen tint. Ser el único móvil con ambos y con páginas independientes (como ya tiene el sitio nuevo) es un posicionamiento defendible. [HECHO parcial: se verificó ausencia en Auto Armour, Window Wizard, Kingdom, Detailers, Absolute Perfection; no se verificó la oferta completa de todos los 117]. Cobertura geográfica en las homepages leídas (80): Bradenton 42, Venice 25, Siesta Key 22, Longboat Key 19, St. Petersburg 16, Manatee 10, Tampa 7, **Lido Key 3, Brandon 1**. Las zonas de ShineToGo menos nombradas por los competidores (Lido Key, Brandon) son páginas de área casi sin competencia textual [HECHO + escaneo de texto + 2026-10-05]; que no estén nombradas no prueba que no haya servicio ni demanda [INFERENCIA]. Brandon, además, no tuvo búsqueda propia en Apify; conviene una corrida adicional.
4. **Garantía y legalidad explícitas y verificables.** Mientras los competidores prometen "lifetime", "permanente" o "10 años" sin términos, ShineToGo puede publicar qué cubre la garantía del fabricante de la película, qué cubre la mano de obra, la tabla de VLT de Florida citando el estatuto y qué no se promete (no usar 9H ni "permanente"). Convierte el riesgo del sector en confianza. [INFERENCIA con evidencia de la sección 3 y 4]
5. **Captura de lead de baja fricción más plan de mantenimiento tras el servicio.** Formularios de 5 campos o menos (el estándar observado va de 6 a más de 10), botón de llamada correcto, confirmación inmediata por texto con ETA (Detailers) y un plan simple de lavados de mantenimiento para autos con cerámico (solo ~12 de 80 sitios lo ofrecen y solo Car X publica precio). Además, un sistema de solicitud de reseña por texto con enlace directo, porque el volumen de reseñas es el foso competitivo. [HECHO + INFERENCIA]

### 5.4 Qué copiar, qué evitar

**Copiar:**
- Reserva con confirmación automática y aviso de llegada (Detailers).
- Formulario corto con carga de foto (Auto Armour) y cotización por texto con foto (Window Wizard).
- Precios "desde" con aclaración de que dependen del tamaño y condición (Car X, Sharkey's).
- Garantías diferenciadas por servicio y calificadas (Classy, Sharkey's: cerámico 3 y 5 años en lugar de promesas inflables).
- Páginas por ciudad y por servicio (Kingdom, ELC, Classy).
- Waiver de rayones y objetos previos (Car X).

**Evitar:**
- "Lifetime", "permanent", "10-Year Warranted" sin términos; "never wax again"; "waxing is obsolete"; "SPF 1000"; "Florida's #1"; "99% UV" sin fuente; cifras de infrarrojo sin ficha técnica.
- Copiar la ley de tint de competidores (simplificada); verificar el estatuto.
- Números de contacto inconsistentes o enlaces de llamada sin probar; conteos de reseñas que se contradicen en la misma página.
- Formularios de más de 6 campos para la primera captura.
- Perfiles de Maps duplicados (revisar el de "Shine to Go Mobile Car Wash").

---

## 6. Límites y lo que falta (honestidad de evidencia)

- **No verificado:** costo real de Apify; mensajería/reservas en los perfiles de Maps; formularios de Kingdom Clean, Ceramic Pro y Xclusive; todo el contenido de Suncoast; si la reserva de "Book Now" de Xclusive abre un calendario o un formulario; origen del conteo 567 de ELC.
- **Una sola fuente:** precios de tint de Xclusive (WebFetch). Ceramic Tint Pros: cerámico de pintura no confirmado (su oferta verificada es tint y detailing).
- **Sesgo del muestreo:** 6 búsquedas x 20 resultados en Google Maps; el orden de Maps depende de la ubicación del scraper, y 11 de 91 sitios no se pudieron leer. Hay negocios relevantes fuera de la muestra (por ejemplo Window Wizard no salió en Maps pero existe).
- **Segmentos poco cubiertos:** Venice, Lido Key, Siesta Key y Longboat Key no tuvieron búsqueda propia; Brandon solo se cubre indirectamente.
- **Sin datos de tráfico ni de conversión de ningún competidor;** todo lo anterior son señales públicas, no rendimiento.
- Seguridad: solo GET de páginas públicas; no se envió ningún formulario, mensaje ni se contactó a ningún negocio; no se esquivó ninguna protección anti-bot.
