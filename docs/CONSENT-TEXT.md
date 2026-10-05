# Archivo del texto de consentimiento (mensajes de texto, WhatsApp y llamadas)

Cada lead guarda `consent.version` (junto con fecha, IP y navegador). Si cambia una sola palabra del texto
visible, hay que **crear una versión nueva** aquí y en el código (`consentVersion` en `src/sections/Contact.jsx`
y `CONSENT_VERSION` en `src/landing.js`), para que el registro histórico siga respaldando lo que la persona vio.
Guardar este archivo al menos 5 años después de la última versión que se haya usado.

Casilla: **sin marcar por defecto**, separada del botón de envío, con enlaces a la política de privacidad y a los
términos de mensajería (`/privacy/#messaging`, `/es/privacidad/#messaging`). No es condición para cotizar ni comprar.

## v2-en (desde 2026-10-04)

> I agree that {brand} may text me, message me on WhatsApp and call me at the number above about my quote and appointment, including with an automated system. I understand I do not have to agree to this to get a quote or to buy anything. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.  Privacy policy · Messaging terms

## v2-es (desde 2026-10-04)

> Acepto que {brand} me envíe mensajes de texto, me escriba por WhatsApp y me llame al número indicado sobre mi cotización y mi cita, incluso con un sistema automatizado. Entiendo que no tengo que aceptar esto para recibir una cotización ni para comprar nada. La frecuencia de los mensajes varía. Pueden aplicar tarifas de mensajes y datos. Responde STOP para dejar de recibirlos o HELP para ayuda.  Política de privacidad · Términos de mensajería

`{brand}` se reemplaza por el nombre comercial vigente (`VITE_BRAND_NAME`) al mostrarse.

## v1 (anterior, retirada)

> I agree to receive text, WhatsApp messages and automated calls from this business about my quote, at the number I gave. Not a condition of purchase. Message frequency varies and rates may apply. Reply STOP to cancel, HELP for help.

Motivo del cambio (revisión de cumplimiento, 2026-10-04): no nombraba al vendedor, no decía expresamente "sistema automatizado" para textos y mensajes (F.S. 501.059), y la fórmula de "no es condición de compra" era incompleta.

## Reglas operativas que acompañan al texto

- Cualquier "STOP" y también "no me escriban más", "ALTO", "PARAR" o "CANCELAR" cortan los mensajes de inmediato (no esperar plazos).
- Respetar horarios razonables de envío (no de noche) y la lista interna de "no contactar".
- Si se usa una plataforma de mensajería masiva (SMS/WhatsApp Business), registrar la campaña con **este mismo texto** como prueba de consentimiento.
- Un seguimiento comercial distinto de la cotización y la cita (promociones) necesita una segunda casilla propia, aparte.

## v3 (marketing): BORRADOR, NO ESTÁ EN USO

Para recordatorios de mantenimiento, ofertas de temporada, solicitudes de opinión e invitaciones al programa de referidos. **No usar en producción sin revisión de un
abogado de Florida** (ver `docs/MESSAGING-RULES.md`). Nada de lo que está en la web hoy la necesita; solo hace falta si se activa una automatización de marketing por texto o correo.

Condiciones de diseño:
- Casilla **propia**, sin marcar, separada de v2 y del botón de envío. Enviar el formulario no depende de ella.
- Se guarda aparte (`consent_marketing.version`, fecha, IP y navegador). No se importa a clientes o leads anteriores ni se les pide por texto que se suscriban.
- Mensaje de confirmación de suscripción (doble opt-in) antes de cualquier envío.
- **WhatsApp se quita del texto mientras Meta no entregue plantillas de marketing a números +1** (ver reglas): no prometer lo que no se entrega.
- Los corchetes son datos que el dueño debe confirmar (frecuencia real y canales).

**v3-en (borrador)**

> [ ] Send me offers and reminders too (optional). I agree that {brand} may send me marketing text messages [and emails] at the mobile number [and email] I entered above, such as maintenance and service reminders, seasonal offers, promotions, requests to review our service and invitations to our referral program, and that these messages may be sent using an automated system to select and dial numbers. This is separate from messages about my quote and appointment. I do not have to agree to this to get a quote or to buy any goods or services. Up to [4] messages per month. Message and data rates may apply. Reply STOP at any time to unsubscribe, or tell us in any other reasonable way; reply HELP for help. We do not share your number with third parties for their marketing. Privacy policy · Messaging terms

**v3-es (borrador)**

> [ ] Quiero recibir también ofertas y recordatorios (opcional). Acepto que {brand} me envíe mensajes de texto [y correos] de marketing al número móvil [y correo] indicados arriba, por ejemplo recordatorios de mantenimiento y de servicio, ofertas de temporada, promociones, solicitudes de opinión sobre nuestro servicio e invitaciones a nuestro programa de referidos, y que esos mensajes se envíen con un sistema automatizado para seleccionar y marcar números. Esto es independiente de los mensajes sobre mi cotización y mi cita. No tengo que aceptarlo para recibir una cotización ni para comprar ningún bien o servicio. Hasta [4] mensajes al mes. Pueden aplicar tarifas de mensajes y datos. Responde STOP en cualquier momento para darte de baja (también puedes pedírnoslo de cualquier otra forma razonable) o HELP para ayuda. No compartimos tu número con terceros para su publicidad. Política de privacidad · Términos de mensajería

**Mensaje de confirmación de suscripción**
- EN: «{brand}: you are subscribed to offers and reminders (up to [4] msgs/mo). Msg and data rates may apply. Reply HELP for help, STOP to cancel. {url}»
- ES: «{brand}: ya estás suscrito a ofertas y recordatorios (hasta [4] msj/mes). Pueden aplicar tarifas. Responde HELP para ayuda o STOP para cancelar. {url}»

Si se aprueba, hay que cambiar a la vez: el texto aquí, `consentVersion` en `src/sections/Contact.jsx`, `CONSENT_VERSION` en `src/landing.js`, un campo nuevo en la API (`consent_marketing`), y la política de privacidad.
