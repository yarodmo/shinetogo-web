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
