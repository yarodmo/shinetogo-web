# Reglas de mensajería automática (seguimiento, reseñas, retención, referidos)

Estado a **2026-10-05**. Resumen de una investigación de cumplimiento en fuentes primarias (flsenate.gov, eCFR, FTC, FCC, Google, Meta, CTIA, Twilio).
**No es asesoría legal**: la lista de lo que debe ver un abogado de Florida está al final. Etiquetas: `[HECHO]` leído en la fuente, `[INFERENCIA]` conclusión nuestra,
`[NO VERIFICADO]` no se pudo confirmar. Quien automatice algo debe leer este archivo primero.

## Lo esencial en seis líneas

1. El consentimiento vigente (**v2**) cubre texto, WhatsApp y llamadas **«sobre mi cotización y mi cita»**. Sostiene el acuse de recibo y la confirmación y recordatorio de cita, y con límites los seguimientos de la cotización.
2. **No sostiene** recordatorios de mantenimiento, ofertas, referidos ni, con claridad, pedir una reseña. Eso necesita otra casilla (v3, borrador en `docs/CONSENT-TEXT.md`, sin usar).
3. Quien **no marcó** la casilla no consintió texto ni WhatsApp automáticos. Toda automatización debe comprobar `consent.version` antes de enviar. El correo se rige por CAN-SPAM, no por la casilla.
4. La casilla **no prueba que quien la marcó sea el dueño del número**. Por eso el lead sale como `verified: false` hacia el CRM y el correo al dueño lo dice. Confirmarlo en el primer contacto.
5. **Horario y tope no están donde creíamos:** el horario 8:00–20:00 y el máximo de 3 llamadas en 24 h están en **F.S. 501.616(6)** (Ley de Telemercadeo, 2021), no en 501.059. Que apliquen a mensajes de texto es `[NO VERIFICADO]` (el texto dice «llamadas»). Se diseña como si aplicaran.
6. **Meta no entrega hoy plantillas de marketing a números de EE. UU. (+1)** `[HECHO en documentación; fecha de levantamiento NO VERIFICADA]`. Ofertas y recordatorios comerciales por WhatsApp no son una opción hoy; el correo y el texto con v3 sí lo serían.

## Estado de las normas

| Regla | Estado | Fuente |
|---|---|---|
| FTSA, consentimiento | «Prior express written consent»: acuerdo firmado (marcar una casilla vale) que autoriza texto, llamada o voicemail con sistema automatizado, con el número y el aviso de que no es condición de compra | F.S. 501.059(1)(g),(h) |
| FTSA, alcance | Bienes o servicios de consumo. La prohibición de llamadas automatizadas cubre solo las **no solicitadas**; es solicitada la que responde a una petición expresa, a un contrato en curso o a una «relación comercial previa o existente» (sin definición en el estatuto) | 501.059(1)(c),(k),(8)(a) |
| FTSA, bajas | Quien dijo que no quiere mensajes no puede ser contactado de nuevo. Para demandar por textos debe haber respondido STOP y pasar 15 días | 501.059(5),(10)(c) |
| FTSA, sanciones | Acción privada: US$500 o el daño real (lo mayor); hasta 3 veces si es doloso; honorarios a la parte vencedora. Más penalidades del Estado | 501.059(9)–(11) |
| FTSA, vigencia | La edición 2026 es igual en fondo a la reforma de 2023 (ch. 2023-150). SB 134 (2026) murió en comisión el 2026-03-13. El 2026-09-17 el Fiscal General propuso una «Florida Anti-Spam Communications Act»: solo propuesta | flsenate.gov |
| Telemercadeo FL | 8:00–20:00 hora de quien recibe y máx. 3 llamadas en 24 h por el mismo asunto. Penalidad civil hasta US$10,000 por infracción | 501.616(6), 501.619 |
| TCPA | Autodialer o voz grabada a celular: consentimiento previo; si es publicidad, **por escrito**. US$500 por violación, hasta 3 veces si es doloso | 47 CFR 64.1200(a); 47 USC 227(b)(3) |
| Regla FCC «uno a uno» | **Sigue anulada** (11.º Circuito, Insurance Marketing Coalition v. FCC, 2025-01-24). Aun así CTIA y WhatsApp piden un opt-in del remitente concreto y no transferible | eCFR 2026-10-01 |
| Revocación | Cualquier medio razonable; stop, quit, end, revoke, opt out, cancel y unsubscribe valen siempre; se honra en máx. 10 días hábiles; un solo texto de confirmación. El 2026-09-30 la FCC adoptó una orden que cambia detalles (medio exclusivo de baja, baja total en marketing): `[NO VERIFICADO el texto final ni su publicación]` | 47 CFR 64.1200(a)(10) |
| CAN-SPAM | 7 requisitos para correo comercial (encabezado y asunto veraces, identificar el anuncio, dirección postal, baja visible, honrar la baja en 10 días hábiles). Hasta US$53,088 por correo. El correo **transaccional** queda casi exento | 16 CFR 316.3 |
| Reseñas (FTC) | 16 CFR 465, vigente desde 2024-10-21: sin reseñas falsas, sin incentivos condicionados al sentimiento, sin supresión. Hasta US$53,088 por violación | eCFR |
| Reseñas (Google) | Prohíbe incentivos de cualquier tipo, desalentar las negativas y pedir solo a los contentos («review gating») | Política de contenido de Maps |

`[INFERENCIA]` Lo que más exige a un abogado: la revocación (punto del 2026-09-30), 501.616(6) aplicado a texto, y qué es una «relación comercial previa».

## Reglas transversales (valen para toda automatización)

- **Horario:** enviar entre 08:00 y 20:00 hora de **quien recibe** (marketing: 09:00–19:00). Si el lead llega de noche, el correo sale ya y el texto espera a la mañana. Con celular de otro estado, usar la zona del código de área.
- **Tope:** nunca más de 3 mensajes automáticos por persona en 24 h, sumando todas las automatizaciones (copia el tope de 501.616(6)). Cotización sin respuesta: 2. Cita: 3. Marketing: 4 al mes y 1 por día.
- **Identificación:** cada mensaje empieza con el nombre comercial; un solo número comercial, el mismo de la web, que conteste si lo llaman. Primer mensaje de cada flujo: marca, STOP y HELP.
- **Baja:** STOP o cualquier lenguaje natural razonable corta todo, inmediatamente, con **un** mensaje de confirmación. Tratar cualquier baja, en cualquier canal, como baja total (no designar un «medio exclusivo»). Lista de supresión permanente con fecha y canal.
- **SMS desde un número comercial:** registro 10DLC (marca y campaña) ante The Campaign Registry vía el proveedor; sin registro se bloquea el envío `[HECHO · documentación de Twilio]`. El registro pide el texto del consentimiento y la política de privacidad: guardar capturas de ambos.
- **WhatsApp:** opt-in para todo mensaje; ventana de 24 h desde el último mensaje de la persona (dentro, texto libre; fuera, solo plantillas aprobadas). Categorías: utility (ligada a una transacción o solicitud de la persona, sin tono promocional), marketing y authentication; un contenido mixto se clasifica como marketing.
- **Correo:** confirmación de cita = transaccional. Recordatorio de mantenimiento, oferta, reseña y referido = tratarlos como comerciales.

## Veredicto por automatización

| Automatización | Con v2 | Requiere v3 | Abogado | No hacer |
|---|---|---|---|---|
| (a) Acuse inmediato del lead | **Sí**, solo si marcó la casilla (texto/WhatsApp); correo sin casilla | No | Revisión rutinaria | Mandarlo sin casilla; añadir cupón o promoción |
| (b) Aviso al dueño | No aplica (el destinatario es el negocio) | No | No | Meter fotos o el certificado de exención médica en SMS/WhatsApp |
| (c) Recordatorios si no responde | **Depende**: máx. 2 en 3–5 días, solo sobre la cotización, sin descuento ni urgencia, se detienen con STOP, respuesta o cita | Sí, para cadenas largas, ofertas o reactivar leads viejos | **Sí** (dónde acaba «sobre mi cotización») | Goteo indefinido; «última oportunidad»; seguir tras STOP |
| (d) Confirmación y recordatorio de cita | **Sí**: logística pura, hasta 3 por cita | No | Opcional | Venta cruzada o cupón; enviar de noche |
| (e) Pedir reseña en Google | Tratar como **no** (el trabajo ya terminó) | Sí si va por texto/WhatsApp; **QR en persona y correo no** | **Sí** | Incentivos; filtrar por satisfacción; pedir «5 estrellas» |
| (f) Mantenimiento, recompra, ofertas | **No** | **Sí** | **Sí** | Enviar a la base existente sin v3; re-suscribir por texto |
| (g) Referidos | **No** | Sí, para invitar al cliente existente | **Sí** | Escribir al referido sin su propio opt-in; «enviar a un amigo» automático; recompensa atada a reseñas |

## Reseñas: texto seguro (BORRADOR, sujeto a abogado)

- EN: «Hi {first_name}, thanks for choosing {brand}. If you would like to share your experience, you can leave an honest review here: {link}. Questions about your service? Call us at {phone}. Reply STOP to opt out.»
- ES: «Hola {nombre}, gracias por elegir a {brand}. Si quieres contarnos cómo te fue, puedes dejar tu opinión sincera aquí: {enlace}. ¿Dudas sobre tu servicio? Llámanos al {teléfono}. Responde STOP para dejar de recibir mensajes.»
- El **mismo mensaje a todos** los clientes con trabajo terminado, sin filtrar por satisfacción (nada de «del 1 al 5» antes de mandar el enlace). Sin recompensa, sorteo, descuento ni «5 estrellas». Un recordatorio como máximo, a los 7 días.
- **Camino más seguro hoy, sin v3:** un código QR del perfil de Google entregado en persona, sin presión, y el correo con baja visible.

## Referidos: diseño seguro

- El mensaje al cliente que refiere es de marketing: necesita v3, debe decir quién lo envía, qué gana, las condiciones y STOP. Una recompensa por recomendar es una «conexión material» que quien recomienda debe divulgar de forma clara (16 CFR 255.5).
- **Al referido nunca se le escribe primero.** Su consentimiento es suyo y no se puede dar por él (FCC 15-72 párr. 49; CTIA 5.1.2.2; FTSA habla del «called party»). El cliente comparte su propio enlace o código desde su teléfono, y el referido llega al formulario y marca su casilla.
- La recompensa no puede ir atada a reseñas ni a su sentimiento.

## Cambios que pediría la política de privacidad si se activa v3 o un proveedor nuevo

Marketing y su base (consentimiento aparte); separar mensajes de servicio y de marketing con frecuencia, tarifas, STOP/HELP y que darse de baja de marketing no cancela un servicio contratado; que los datos de opt-in móvil no se comparten con terceros para su marketing; registro del consentimiento v3 y del historial de servicios; el proveedor de SMS, WhatsApp, correo y CRM/automatización en *Quién ve tu información*; lista de supresión indefinida; bajas por canal; secciones nuevas de reseñas y referidos; fecha y versión. El texto en español debe decir lo mismo que el inglés. `scripts/build-landings.mjs`, sección `PRIVACY`.

## Lo que debe ver un abogado de Florida

1. ¿v2 es consentimiento suficiente para seguimientos de la cotización y dónde está el límite de «sobre mi cotización»?
2. ¿Pedir una reseña es publicidad / «llamada de venta»? ¿Qué canal usar?
3. ¿La «relación comercial previa» (501.059(1)(k)3, sin definición) permite marketing a clientes sin v3? Un fallo del M.D. Fla. (Specht v. Lee Health, 2026-08-11) dejó seguir una demanda FTSA pese a una supuesta relación comercial `[secundario]`.
4. ¿Aplica 501.616(6) a textos? ¿Hace falta licencia o afidávit de exención de la Parte IV?
5. Efecto de la orden de la FCC del 2026-09-30 sobre bajas, cuando se publique.
6. Términos del programa de referidos y de la recompensa (FDUTPA, impuestos).
7. Contratos con proveedores (SMS, WhatsApp, correo, CRM).
8. Equivalencia legal de las versiones en inglés y español de v2, v3 y la política.

## Límites de esta investigación

No se leyó el texto final de la orden de la FCC del 2026-09-30 (solo el borrador del 2026-09-09 y reportes de bufetes). No se confirmó en Meta la fecha en que termina la pausa de marketing a +1. No se abrieron páginas de CTIA posteriores a mayo de 2023. Los requisitos de 10DLC se citan de la documentación de Twilio, no de los operadores.
