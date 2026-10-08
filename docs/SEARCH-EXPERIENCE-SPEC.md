# Especificación de búsqueda y experiencia (SEO · GEO · AEO · AIO · SXO)

Qué se construyó, por qué, y cómo comprobar que sigue funcionando. Aplica a **Window Tint** y a **Ceramic Coating**, dos servicios distintos y solo para carros (los botes no entran en esta fase). Negocio: ShineToGo Mobile Detailing; zonas en `docs/BRAND.md` §2.

## 1. Qué significa cada sigla aquí

| Sigla | Pregunta que responde | Palanca principal en este sitio |
|---|---|---|
| **SEO** | ¿Aparezco en Google para "window tint Sarasota"? | Páginas propias por servicio e idioma, HTML estático, canonical, hreflang, sitemap |
| **GEO** (local / generativo) | ¿Me recomiendan en mapas y en respuestas de IA para mi zona? | Misma entidad (nombre, teléfono, zonas) en sitio, JSON-LD y Google Business Profile |
| **AEO** | ¿Me citan como respuesta directa? | Bloque de respuesta de 40–60 palabras al inicio, tablas, preguntas y respuestas visibles |
| **AIO** | ¿Los asistentes de IA pueden leerme y confiar en mí? | robots.txt que permite sus rastreadores, texto en HTML (no solo JS), datos estructurados, `llms.txt` (opcional, sin eficacia comprobada) |
| **SXO** | ¿Quien llega convierte? | Cotización por foto, formulario corto, WhatsApp/llamada en un toque, rapidez, accesibilidad |

## 2. Mapa de URLs

| Página | EN | ES |
|---|---|---|
| Inicio | `/` | `/es/` |
| Polarizado (window tint) | `/window-tint/` | `/es/polarizado-de-vidrios/` |
| Recubrimiento cerámico | `/ceramic-coating/` | `/es/recubrimiento-ceramico/` |
| Privacidad | `/privacy/` | `/es/privacidad/` |

- Todo se genera con `node scripts/build-landings.mjs` (lo ejecuta `npm run build`). Cada servicio tiene su contenido y su plantilla: `src/content/tint.js` y `src/content/ceramic.js`. Lo compartido es el negocio (`src/content/business.js`: nombre, teléfono, zonas), los tokens de marca (`src/tokens.css`) y las opciones del formulario (`forms.js`). Las páginas de servicio NO tienen formulario: su botón lleva a la cotización de la home con el servicio ya elegido (`/?service=tint#contact`), para que todos los leads se atiendan en un solo lugar. La home muestra una tarjeta por servicio que abre su página informativa.
- `hreflang` (en, es, x-default) recíproco en cada página; `canonical` apunta a la propia URL; host canónico `https://shinetogomobiledetailing.com` (sin www, https) forzado en `public/.htaccess`.
- `sitemap.xml` lista las 6 páginas comerciales con sus alternativas de idioma. `robots.txt` permite a todos (incluidos GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended).
- La home sigue siendo una aplicación React; para que los rastreadores que no ejecutan JavaScript vean algo, el HTML trae un cascarón con H1, descripción, enlaces y teléfono que React reemplaza al cargar.

## 3. Entidad y datos estructurados

- **Un negocio, un `@id`:** `https://…/#business` (`AutomotiveBusiness`, subtipo de `LocalBusiness`) con el nombre completo, teléfono, logo, `sameAs` (Instagram) e idiomas. `areaServed` lista las zonas reales como `City` (Sarasota, Bradenton, Venice, St. Petersburg, Longboat Key) o `Place` (Siesta Key, Lido Key, Brandon) con su condado en `containedInPlace`, más Manatee County. «Alrededores» no se expresa (no hay forma sin un límite). **Sin calle ni código postal** (negocio de servicio a domicilio) y **sin `aggregateRating`** (no hay reseñas verificadas). Eliminado el domicilio falso "Mobile Service" y el horario 24 h que había. Si el dueño autoriza una ciudad base, se agrega `addressLocality`.
- Cada landing: `Service` propio (proveedor = el negocio; `hasOfferCatalog` con los vidrios del tint o las superficies del cerámico, sin precios), `BreadcrumbList` y `FAQPage` con las mismas preguntas que se ven en la página (el script de verificación compara cuántas hay). Google dejó de mostrar el resultado enriquecido de FAQ desde el 7 de mayo de 2026 (documentación oficial); el marcado sigue siendo válido y lo leen otros consumidores. La «Prueba de resultados enriquecidos» ya no valida FAQ: usar validator.schema.org.
- Regla: todo lo que está en el JSON-LD debe estar visible en la página.

## 4. Contenido que los motores quieren citar

Cada servicio con su propia estructura (no una plantilla clonada):
- **Window Tint:** respuesta de 40–60 palabras → qué vidrios (laterales, trasero, franja del parabrisas, sunroof) → por qué lo hace la gente aquí → película de carbono o cerámica (tabla corta) → **límites de Florida ventana por ventana** (las cifras viven solo en la tabla y en el mapa) → cómo funciona la cotización → preguntas (6, solo de tint).
- **Ceramic Coating:** respuesta de 40–60 palabras → «¿qué quieres cubrir?» (tabla por superficie) → un módulo por superficie (con ancla) → la preparación primero y lo que un recubrimiento NO hace (una sola vez) → contexto local con fuente y fecha (lovebugs, lavar en casa con la orden de agua) → cotización → preguntas (6, solo de cerámico).
- **Una página por servicio, no una por superficie ni por zona** (Google trata variantes casi iguales como «doorway pages»). Criterio para separar después: ficha del producto, ≥3 fotos propias, ≥300 palabras únicas e impresiones en Search Console durante 4–8 semanas.
- **Enlace entre servicios:** solo el menú, el pie y una línea «Otros servicios» al final. No se venden uno como complemento del otro.

**Voz:** escrita para una persona de Siesta Key o Brandon con el celular, no para un buscador. Se mide: «We confirm»/«Ask for» pasó de 9 y 7 repeticiones por página a 0 y 1; la cifra 28 % de 8 a 1 en el texto (más 3 en el mapa); cada hecho se dice una vez. `check-dist` ya no deja pasar «Tampa», plantillas sin resolver ni la palabra «Protection».

Pendiente de contenido real (no inventar): marca/modelo de película, garantía por escrito, lugar de instalación (¿móvil o taller?), tiempos, precios o rangos, fotos reales y reseñas.

## 5. Rendimiento y accesibilidad (medido)

Lighthouse 12, perfil móvil simulado (4G lento, CPU 4x más lenta), build de producción servido en local con `vite preview` (4 oct 2026, máquina con poca carga):

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP |
|---|---|---|---|---|---|
| `/` y `/es/` (home) | 91 | 100 | 100 | 100 | 3.5 s |
| `/window-tint/` | 100 | 100 | 100 | 100 | 0.9 s |
| `/ceramic-coating/` | 100 | 100 | 100 | 100 | 0.9 s |
| `/es/polarizado-de-vidrios/` | 100 | 100 | 100 | 100 | 0.9 s |
| `/es/recubrimiento-ceramico/` | 100 | 100 | 100 | 100 | 0.9 s |

Lectura honesta:
- La home es una aplicación que se dibuja en el navegador: su LCP (la foto principal) depende de que cargue y ejecute el JavaScript; varía entre 3.5 y 5 s según la carga de la máquina que mide. **Las landings son HTML estático y por eso llegan a 0.9 s: dirigir los anuncios a ellas, no a la home.** Prerenderizar la home (`vite-react-ssg`) es la mejora pendiente. Se probó dividir el JS por secciones y no mejoró lo medido, así que no se dejó.
- `vite preview` comprime el JavaScript; **el Apache de producción hoy NO lo comprime** (medido en el sitio actual: 186 KB crudos). `public/.htaccess` ahora incluye `text/javascript` en DEFLATE; confirmar con `curl -sI -H 'Accept-Encoding: gzip' https://…/assets/<archivo>.js | grep -i content-encoding` tras el primer deploy. Sin compresión, la home medida baja a ~75 de rendimiento y el LCP sube ~1 s.
- Es laboratorio, no datos de usuarios reales. Los datos reales llegan con Search Console y el informe de experiencia de Chrome tras unas semanas. No es una medición de capacidad ni de carga del servidor.
- No hay pruebas automáticas del frontend (se probó a mano en 320/375/768/1280 px); un smoke test con Playwright en CI es el siguiente paso recomendado.

Peso: sitio completo ≈ 9 MB (antes 129 MB). Primera carga de la home ≈ 830 KiB, de los cuales el JavaScript es 75 KiB comprimido. Presupuesto en `scripts/check-dist.mjs` (14 MB en total). Siguiente mejora si hace falta: prerenderizar la home (`vite-react-ssg`).

## 6. Medición y eventos

Los eventos pasan por `window.dataLayer` **solo después de Aceptar** (antes de elegir no entra ninguno a la cola, para que GTM no procese eventos previos al consentimiento). Los scripts de Google/Meta también se cargan solo después de Aceptar y solo si hay IDs configurados (`VITE_GTM_ID`, `VITE_GA4_ID`, `VITE_META_PIXEL_ID`). Con los IDs vacíos no aparece el aviso de cookies. El enlace «Opciones de privacidad» del pie reabre el aviso; retirar el permiso recarga la página.

| Evento | Cuándo | Parámetros |
|---|---|---|
| `form_start` | primer foco en el formulario | `location`, `page` |
| `lead_submit` | el servidor confirmó el lead (200) | `lead_id`, `service`, `vehicle_type`, `language` |
| `form_error` | falló el envío | `kind` |
| `whatsapp_click`, `call_click`, `cta_click`, `package_select`, `service_card_click` | clic en elementos con `data-track` | `location`, `service` |
| `faq_open`, `scroll_75`, `consent_choice` | interacción / consentimiento | — |

Atribución: se guarda primer toque (90 días) y último toque (sesión) con `utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid` y página de entrada, y viaja con cada lead. Marcar `lead_submit` como conversión en GA4 y como evento "Lead" en Meta (ya envía `eventID` para deduplicar con la API de conversiones).

## 7. Tareas fuera del código (las hace el cliente o el equipo)

1. **Google Business Profile:** categoría principal "Window tinting service" (o la que corresponda), servicios y descripción con el mismo nombre/teléfono; área de servicio, dirección oculta; fotos reales; enlace a las landings con `?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
2. **Search Console:** verificar el dominio, enviar `sitemap.xml`, pedir indexación de las 6 URLs, revisar cobertura a los 7 y 28 días.
3. **Citas consistentes** (mismo nombre, teléfono, áreas): Apple Business Connect, Bing Places, Yelp, Facebook, Instagram, directorios de Florida.
4. **Reseñas:** pedir reseñas a clientes reales después del servicio con un enlace directo a GBP; nunca incentivar con pago ni filtrar solo las positivas.
5. **Certificado SSL:** vence el 2026-12-06; confirmar la renovación automática hacia el 6 de noviembre.
6. **Abogado de Florida:** texto legal de polarizado, política de privacidad y consentimiento de mensajes (ver `docs/BRAND.md` §6).

## 8. Pruebas de aceptación

Automáticas (CI en cada PR y antes de cada deploy):

```bash
npm --prefix api test          # 30 pruebas de la API de leads y del generador de .env
npm run build                  # genera páginas + vite build
node scripts/check-dist.mjs    # h1 único, title/description, canonical, hreflang recíproco, JSON-LD válido,
                               # enlaces e imágenes internas, alt, sin placeholders, peso total
```

Manuales antes de pagar anuncios: validator.schema.org en las 4 landings (la prueba de resultados enriquecidos de Google ya no valida FAQ) · Search Console sin errores de cobertura · enviar un lead real desde móvil y confirmar correo + archivo de respaldo · WhatsApp abre con el texto correcto · `curl -I http://www.…` redirige a `https://…` en un solo salto.
