# Automatización de leads: qué hay, cómo se usa y qué NO hace

Código en `api/`. Tres piezas, todas probadas (78 pruebas en `api/test/`) y auditadas de forma adversarial; los hallazgos de la auditoría están corregidos con pruebas que antes fallaban. Nada está desplegado: un merge a `main`
despliega al VPS compartido (regla D-018), así que estas piezas esperan una ventana controlada.

## 1. Aviso al dueño con respuesta de un toque

Cada lead sigue llegando por correo, pero ahora el correo está hecho para responder en segundos:

- **Asunto** con lo necesario para decidir desde la pantalla de bloqueo: `[ab12cd34] Window Tint · ES · 34236: Ana (google)`
  (servicio · idioma de respuesta · ZIP · fuente).
- **Dos botones arriba**: *Call* (`tel:`) y *Reply on WhatsApp* (`wa.me`), con el primer mensaje ya escrito en el idioma del cliente, con su
  nombre y la referencia del lead. El texto pide fotos y **no promete precio, plazo ni descuento**. El dueño lo puede editar antes de enviar.
- **Consentimiento a la vista, sin afirmar de más**: con la casilla marcada dice `box ticked, number not verified`, porque el formulario no puede probar que
  quien la marcó es el dueño del número; confírmalo en tu primer mensaje antes de mandar nada automático. Sin casilla: responder por llamada o mensaje
  uno a uno a la persona que escribió, sin envíos automáticos ni masivos.

El número sin `+` se acepta solo si es norteamericano válido (10 dígitos, o 11 con un 1). Con `+` se acepta uno internacional. Un teléfono con extensión o con
formato dudoso **no genera botones**: el correo dice `Verify the number` en vez de llamar o escribir a un número equivocado.

## 2. Alta manual, resultados de cada lead y reporte

El archivo de leads dice quién llegó y de dónde; no dice qué pasó después. Sin eso no se sabe qué fuente ni qué servicio traen clientes. Y hay un hueco más grande:
**el canal principal del negocio (fotos por WhatsApp y llamadas) no pasa por el formulario**, así que no entraba a ningún archivo. `lead:add` lo da de alta a mano:

```bash
cd api
npm run lead:add -- --channel whatsapp --service tint --lang es --source google      # imprime el id de 8 caracteres
npm run lead:add -- --channel call --service ceramic --source gbp --at "2026-10-05 14:03" --note "pidió precio"
```

Canales: `whatsapp`, `call`, `walkin`, `referral`, `other`. Nombre y teléfono son opcionales (no se piden datos personales para medir). **Un alta manual nunca declara consentimiento de mensajes**: ese consentimiento solo existe cuando la persona marca la casilla del formulario.
El reporte separa los canales y mide la calidad del formulario (casilla, ZIP, correo, fecha) solo sobre los leads del formulario.

```bash
cd api
npm run outcome -- ab12cd34 contacted                       # ahora mismo
npm run outcome -- ab12cd34 contacted --at "2026-10-05 14:03"  # una llamada que ya pasó (hora de Florida)
npm run outcome -- ab12cd34 quoted
npm run outcome -- ab12cd34 won --value 450
npm run outcome -- ab12cd34 lost --reason price --note "quería cerámico por la mitad"
npm run report                     # todo
npm run report -- --from 2026-10-01 --to 2026-10-31
npm run report -- --json
```

- `ab12cd34` son los 8 primeros caracteres del asunto del correo. Si coinciden con dos leads, la herramienta lo dice y pide más.
- Motivos de pérdida: `price`, `no_reply`, `timing`, `out_of_area`, `not_a_fit`, `went_elsewhere`, `other`.
- El archivo `lead-outcomes.ndjson` queda junto al de leads, **solo se agrega al final**: si anotaste `won` por error, anota `lost` (o al revés): para el desenlace manda el último `won`/`lost`.
- **La velocidad de respuesta sale de la hora de `contacted`**, y esa hora es la de anotarlo. Anótalo cuando ocurre o usa `--at`; no puede ser anterior al lead ni futura. Cotizar o ganar días
  después no se cuenta como "primer contacto", y el reporte avisa de los leads que llegaron a cotizado o ganado sin un `contacted` anotado.
- Los días del reporte (`--from`, `--to`, formato `AAAA-MM-DD`, estricto) se cuentan en hora de Florida, no en UTC.
- Como toda cotización se hace en el formulario de la home, el reporte también cuenta **qué página informativa vio el visitante antes de cotizar** (`via`, p. ej. `/window-tint/`; `(none)` = llegó directo a la home).
- El reporte da: embudo (leads → atendidos → cotizados → agendados → ganados), ingreso, **velocidad de primera respuesta** (mediana y % dentro de 5, 15 y 60 minutos;
  el denominador son los leads con al menos esa edad y uno que nunca se atendió cuenta en contra), y por fuente, servicio, idioma y página de entrada.
- **Con menos de 30 leads avisa que no hay conclusiones, y marca "n bajo" cualquier fila de menos de 20.** No tomes decisiones de presupuesto con n bajo.
- Lista los leads con más de 48 h sin ningún resultado: o no se atendieron o no se anotó.

Es la solución sin proveedores. Para un equipo, lo sostenible es que esta etapa viva en el CRM (ver el punto 3) y el reporte salga de allí.

## 3. Reenvío firmado a n8n → GoHighLevel (apagado por defecto)

Con `LEAD_WEBHOOK_URL` y `LEAD_WEBHOOK_SECRET` (16+ caracteres) cada lead aceptado se manda a tu webhook **después** de guardarse. Nunca cambia lo que ve el visitante: si el receptor
falla, se reintenta con retroceso (4 intentos, en memoria: un reinicio del proceso los descarta) y, si se agotan, queda `LEAD NOT FORWARDED` en el log. Un 4xx permanente (400, 401, 404...) no se reintenta.
El lead sigue a salvo en el archivo y se vuelve a mandar con:

```bash
cd api
node tools/forward-leads.js --since 2026-10-01          # SIMULACRO (por defecto): lista lo que mandaría
node tools/forward-leads.js --since 2026-10-01 --yes    # manda de verdad (idempotente por lead_id)
node tools/forward-leads.js --lead ab12cd34 --yes       # uno solo
```
Manda datos personales a un tercero: sin `--yes` no manda nada, y se confirma con quien manda en el negocio antes de repetir con `--yes`.

Qué recibe el webhook (`POST`, JSON):

```json
{ "event": "lead.created", "version": 1, "source": "shinetogo-web", "sent_at": "...",
  "lead": { "lead_id": "...", "name": "...", "phone": "...", "service": "tint", "lang": "es",
            "attribution": { "utm_source": "google", "landing": "/es/polarizado-de-vidrios/" },
            "consent": { "sms": true, "version": "v2-es", "at": "...", "verified": false } } }
```

No se envían IP ni navegador (quedan solo en el archivo como prueba del consentimiento). `verified: false` siempre: el formulario no prueba que quien marcó la casilla es el dueño del número.

Cabeceras: `X-Timestamp` (segundos), `X-Signature: sha256=<HMAC-SHA256(secreto, "timestamp.cuerpo")>` y `X-Idempotency-Key: <lead_id>`.
**El receptor debe verificar la firma, rechazar timestamps de más de 5 minutos e ignorar un `lead_id` repetido.** Ejemplo para un nodo *Code* de n8n:

```js
const crypto = require('crypto')
const item = $input.first().json
const raw = JSON.stringify(item.body)                  // usa el cuerpo CRUDO si tu webhook lo expone: el HMAC va sobre esos bytes
const ts = Number(item.headers['x-timestamp'])
const expected = Buffer.from('sha256=' + crypto.createHmac('sha256', $env.SHINETOGO_SECRET).update(`${item.headers['x-timestamp']}.${raw}`).digest('hex'))
const got = Buffer.from(String(item.headers['x-signature'] || ''))
const fresh = Number.isFinite(ts) && Math.abs(Date.now() / 1000 - ts) <= 300
if (!fresh || got.length !== expected.length || !crypto.timingSafeEqual(got, expected)) throw new Error('bad signature')
```

No sigue redirecciones. Solo acepta `https` (o `http` hacia localhost para pruebas) y sin `usuario:contraseña@` dentro de la URL. El deploy rechaza una configuración inválida antes de publicar.
En GitHub Actions la URL y el secreto van como **secretos**, no como variables (las variables salen en los logs y la URL de un webhook suele llevar un token).

**Antes de activarlo:** n8n/GHL pasan a ser un proveedor que recibe datos personales. Hay que nombrarlo en la política de privacidad (sección *Quién ve tu información*) y alinear qué se hace con el consentimiento (ver `docs/CONSENT-TEXT.md`).

## Lo que esto NO hace (a propósito)

- **No manda SMS ni WhatsApp automáticos.** El consentimiento vigente (v2) cubre «mi cotización y mi cita»; recordatorios de mantenimiento, ofertas, reseñas y referidos
  necesitan otra casilla (borrador v3 en `docs/CONSENT-TEXT.md`, sujeto a abogado). Tampoco hay proveedor de SMS contratado.
- No cuenta clics de WhatsApp ni de llamada cuando la persona rechaza la analítica. Ver `docs/LEAD-CAPTURE-RETENTION-REPORT.md` para la decisión pendiente.
