# Marca, datos del negocio y registro de afirmaciones

Fuente de verdad para quien escriba copy, diseñe creativos, configure Google Business Profile o pague anuncios.
Si algo aquí cambia, cambia en el código en un solo lugar (se indica dónde).

## 1. Nombre comercial (decisión pendiente del cliente)

| Evidencia a favor de **ShineToGo** | Evidencia a favor de **DetailShine** |
|---|---|
| Dominio `shinetogomobiledetailing.com`, logotipo, Instagram `@shinetogomobilecarwash`, repositorio, API | Copy original clonado de DetailShine (título y descripción del sitio antes de este cambio) |

**Estado:** el sitio usa **ShineToGo** por defecto. Un solo nombre en TODO lugar (sitio, correo, JSON-LD, Google Business Profile, anuncios); mezclarlos es motivo de rechazo en Google Ads por tergiversación y rompe la señal de entidad para buscadores y asistentes de IA.
**Cómo cambiarlo:** variables del repositorio `VITE_BRAND_NAME` (sitio) y `BRAND_NAME` (API); luego un deploy. El logotipo es una imagen y hay que reemplazarlo aparte si cambia el nombre.

## 2. NAP (nombre, dirección, teléfono)

- **Teléfono y WhatsApp:** (941) 422-4405 · `+19414224405` → `src/content/business.js`
- **Dirección:** negocio de servicio a domicilio, **sin dirección pública**. No inventar calle ni código postal. En Google Business Profile marcar "Área de servicio" y ocultar la dirección.
- **Áreas de servicio publicadas hoy** (`src/content/business.js`): Sarasota, Bradenton, Tampa, Venice, St. Petersburg, Manatee County. **Pendiente confirmar con el cliente** cuáles atiende de verdad; la lista debe ser idéntica en sitio, GBP y anuncios.
- Sin horario publicado. El texto "24/7" y "respuesta en 2 horas" se retiraron por no estar respaldados.

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

## 6. Texto legal que no se toca sin abogado

- **Polarizado en Florida** (F.S. 316.2951–316.2957 y 316.29545). Verificado contra el texto de los estatutos (revisión de cumplimiento, 4-oct-2026):

  | Dato | Valor | Fuente |
  |---|---|---|
  | Laterales delanteros | ≥ 28 % de luz visible (reflectividad ≤ 25 %) | 316.2953 |
  | Laterales traseros y vidrio trasero, auto de pasajeros | ≥ 15 % (reflectividad ≤ 35 %) | 316.2954(1)(a) |
  | Multipropósito (chasis de camión o rasgos off-road, ≤ 10 personas), atrás | ≥ 6 % | 316.2951, 316.2954(1)(a) |
  | Parabrisas | solo franja **transparente** arriba, sin invadir AS-1 | 316.2952(2)(b) |
  | Medición | sobre el vidrio **ya terminado** (vidrio + película) | 316.2953, 316.2954 |
  | Etiqueta | jamba izquierda, con nombre comercial de la película y del instalador | 316.2955(1) |
  | Exención médica | certificado por vehículo (VIN), intransferible | 316.29545 (no 316.2957, que es de fabricantes) |
  | Sanciones | infracción no moviente para el conductor; delito menor para quien instala o vende fuera de la norma | 316.2956 (cotejar texto literal) |

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
