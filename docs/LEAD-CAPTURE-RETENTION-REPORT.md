# Captación y retención de leads: qué funciona, qué no y qué automatizar

ShineToGo Mobile Detailing · 5 de octubre de 2026 · Sarasota, Bradenton, Venice, St. Petersburg, Brandon, Lido, Siesta y Longboat Key

Este informe junta cuatro investigaciones independientes (competencia, demanda, evidencia de captación y retención, reglas de mensajería), una auditoría del embudo real del portal y el código de automatización que salió de ello. Cada afirmación lleva su calidad de evidencia: **hecho** (leído en la fuente), **inferencia** (conclusión nuestra) o **no verificado**. Los informes completos con sus fuentes están en `docs/research/`.

## 1. Veredicto

1. **El portal no puede decir hoy qué le trae clientes.** Medía formularios, pero el canal principal del negocio (fotos por WhatsApp y llamadas) quedaba fuera de todo registro, y nadie anotaba qué pasaba después con cada lead. Ya está construido el circuito que lo cierra (alta manual, resultados, reporte). Hace falta usarlo de 8 a 12 semanas antes de sacar conclusiones.
2. **En este nicho se gana con volumen de reseñas, no con calificación.** 73 de 114 perfiles tienen exactamente 5.0 y el 82 % tiene 4.9 o más; lo que distingue es el conteo (mediana 67; los 17 negocios con 200 o más reseñas tienen todos sitio web). ShineToGo aparece con 3. El primer trabajo de retención es un sistema de reseñas que cumpla las reglas de Google y de la FTC.
3. **El hueco competitivo es real pero estrecho:** español, WhatsApp y páginas separadas de tint y cerámico. De 80 sitios de la competencia, 1 tiene versión en español y 3 mencionan WhatsApp. Que ese hueco mueva dinero **no está probado**: no hay datos de conversión de nadie.
4. **La automatización de mensajes está limitada por el consentimiento actual.** Cubre «mi cotización y mi cita»: sostiene el acuse de recibo y la confirmación de cita. No sostiene recordatorios de mantenimiento, ofertas ni referidos; eso necesita otra casilla (borrador v3) y un abogado de Florida. Además, Meta no entrega hoy plantillas de marketing a números de EE. UU.
5. **Antes de gastar en anuncios hay dos cosas más importantes que cualquier automatización:** arreglar el perfil de Google (el teléfono y el sitio no coinciden con la web nueva) y desplegar la web nueva, porque la producción sigue sirviendo la versión antigua.

## 2. Qué sabemos y qué no

| Tema | Qué hay | Calidad |
|---|---|---|
| Tráfico y conversión propios | Ninguno. El sitio nuevo no está desplegado y la analítica sigue apagada hasta que existan los IDs de GTM, GA4 y Meta | Sin dato |
| Google Trends | Falló: el conector respondió «not subscribed» y «Too many requests», y trends.google.com dio 429. **No hay ninguna cifra de Trends en este informe** | Sin dato |
| Volumen de búsquedas | Estimaciones de blogs de herramientas SEO, sin fecha ni fuente primaria en varios casos | Débil |
| Competencia | Censo de 117 negocios de Google Maps y lectura de 80 portadas. Ningún dato de tráfico ni de conversión de los competidores | Buena para qué hacen; nula para cómo les va |
| Velocidad de respuesta, canal, fotos, membresías | Casi todo viene de proveedores con interés comercial. No hay un estudio independiente para detallado o servicios locales pequeños | Débil |
| Cifras que circulan | «El 78 % compra al primero que responde», «391 %», «22 % de retención», «3,2x con membresías», «98 % de apertura de SMS»: no se encontró fuente primaria | **No se usan** |

## 3. El mercado

### 3.1 Competencia (hecho, consultado el 2026-10-05)

- **Reputación:** la calificación no distingue; el volumen sí. Los 17 negocios con 200 o más reseñas tienen sitio web.
- **Español y WhatsApp:** 1 de 80 portadas tiene versión en español (Detailed Mobile Car Clean, Bradenton) y 3 de 80 mencionan WhatsApp.
- **Precios:** unos 13 de 80 muestran alguno en la portada; 5 de los 8 primeros no publican ninguno. No son requisito para tener 300 o más reseñas.
- **Garantías:** abundan «lifetime» sin condiciones, «permanente» y «10 años» sin términos. Ninguna portada usa «9H».
- **Servicios:** los especialistas de tint móvil no hacen cerámico y los detallistas móviles con cerámico no hacen tint (con una excepción pequeña en Bradenton). Una página aparte por servicio con operación móvil es un hueco.
- **Contacto roto:** en 14 sitios revisados a fondo hay 3 teléfonos distintos entre el sitio y Maps y 2 enlaces de llamada rotos.
- **Mecánica de captación de los mejores:** Detailers of Sarasota usa Housecall Pro con reserva y texto de aviso de llegada; Car X tiene calendario y planes mensuales de mantenimiento (100 y 300 dólares al mes según su sitio); Auto Armour acepta una foto en un formulario de 6 campos; Window Wizard cotiza el tint por texto con foto y publica precios.
- **Planes de mantenimiento:** unos 12 de 80 sitios ofrecen alguno.
- **Referencias de precio publicadas (hecho):** Window Wizard, tint móvil en Bradenton y Sarasota: completo desde 320 dólares, dos frontales desde 100, remoción desde 100. Car X: cerámico desde 1.500 dólares, **hecho en su garaje en 2 o 3 días, no en casa del cliente**. Es un dato para la pregunta 28: el cerámico rara vez se hace de verdad «a domicilio».

**Cinco huecos para ShineToGo:** (1) español de verdad con WhatsApp; (2) rangos «desde» y cotización por foto, sobre todo en cerámico, donde casi nadie publica; (3) dos páginas separadas con operación móvil; (4) garantías y límites legales verificables, con el estatuto citado; (5) captación de baja fricción más plan de mantenimiento y sistema de reseñas.

### 3.2 Demanda, idioma y temporada

- **Qué se busca (inferencia, evidencia débil):** window tint tiene el mayor estanque de búsquedas «cerca de mí» en EE. UU. (la fuente da un rango de 100.000 a 1.000.000 al mes, sin fecha ni origen), seguido de detallado en general (368.000 a 450.000, incluye talleres fijos), detallado móvil (22.000 a 49.500) y botes (9.900). Cerámico: sin cifra. **No hay volumen en español ni curva mensual real.**
- **Público hispano (hecho, Censo ACS 2020-2024):** Hillsborough 30,4 %, Manatee 18,3 %, Pinellas 11,2 %, Sarasota 10,7 %. Por ciudad: Brandon 30,9 %, Bradenton 20,9 %, Sarasota 17,9 %, pero Venice 6,0 %, Siesta Key 3,8 % y Longboat Key 3,1 %.
- **Lectura (inferencia):** hay dos mercados casi opuestos. Brandon, Bradenton y Hillsborough: más jóvenes, todo el año, mucho público hispano. Las islas y Venice: mayor edad, temporada, casi todo en inglés, con 50 % de las viviendas de uso estacional en Siesta y Longboat. El español pesa en el primero, no en el segundo.
- **Temporada (hecho, usando indicadores oficiales como sustituto, no búsquedas):** en el condado de Sarasota, de enero a abril se concentra cerca del 49-50 % del impuesto de hospedaje anual; marzo es el pico (3,6 a 3,9 veces septiembre); agosto y septiembre son los más débiles. Octubre de 2024 cayó 32 % tras los huracanes Helene y Milton. Es una medida de visitantes, **no de demanda de detallado**.
- **Calendario que importa a las operaciones:** lovebugs en dos oleadas (abril-mayo y agosto-septiembre, UF/IFAS); temporada de lluvias del 15 de mayo al 15 de octubre (NWS); temporada de huracanes del 1 de junio al 30 de noviembre con pico el 10 de septiembre (NHC).
- **Botes registrados en 2025 (hecho, FLHSMV):** Sarasota 25.278, Manatee 27.403, Pinellas 51.042, Hillsborough 42.528. Manatee tiene la mayor densidad (6,4 por cada 100 habitantes).

## 4. Qué funciona y qué no en este portal

| Pieza | Veredicto | Evidencia | Qué hacer |
|---|---|---|---|
| Captura del formulario | **Funciona** | Guarda primero y avisa después, sin duplicar ni perder el lead; 4 campos obligatorios; 78 pruebas. **Sin medir a escala** | Medir con tráfico real |
| Formulario corto | **Bien, sin prueba fuerte** | Los competidores van de 6 a más de 10 campos. La evidencia de que menos campos suba la conversión es débil (HubSpot, 40.000 páginas: efecto menor al esperado) | No tocar; medir |
| WhatsApp como CTA | **Diferencia real, estaba sin medir** | Lo usa el 56 % de los adultos hispanos de EE. UU. (Pew, 2025); nadie en la competencia lo ofrece. Pero sus clics solo se registraban con consentimiento de analítica y esos leads no entraban a ningún archivo | Resuelto con `lead:add` (sección 5) |
| Español | **Diferencia real, enfocada** | 1 de 80 competidores lo tiene; el peso hispano varía de 3 % a 31 % según la ciudad | Anuncios en español para Brandon (Hillsborough) y Bradenton (Manatee); inglés para las islas y Venice |
| Dos servicios separados | **Hueco real** | Nadie combina tint y cerámico móvil con páginas propias | Mantener |
| Cotización por rango y foto | **Pendiente de decisión** | Window Wizard ya lo hace en tint; en cerámico casi nadie publica precio | Decisión del dueño (preguntas 19 y 25) |
| Honestidad en garantías | **Diferencia, sin prueba de que convierta** | Los líderes prometen «lifetime» sin términos. Nuestro sitio evita todo absoluto | Mantener; es también protección legal |
| Prueba social | **La mayor debilidad** | 3 reseñas frente a una mediana de 67. Quitamos las reseñas falsas de la versión anterior y no hay reales aún | Sistema de reseñas (sección 6) |
| Velocidad de respuesta | **Operación, no código** | 40 % de 466 empresas del hogar nunca respondió (ConXpros 2019); 26 % de 1.333 despachos nunca (Hennessey 2025). Responder ya es diferencia | Estándar interno medido |
| Analítica | **Apagada, y con límite** | Los eventos solo entran si la persona acepta; quien rechaza es invisible | Medir los leads en primera parte (sección 5) |
| Perfil de Google | **Falla** | Muestra otro teléfono (941) 952-8758 y el sitio antiguo `detailshine2go.com` | Pregunta 34 y 35 |
| Páginas de aterrizaje | **Funcionan** | Landings con LCP de 0,9 s; la home, 3,5 s (laboratorio, no usuarios reales) | Dirigir los anuncios a las landings |
| Producción | **Desactualizada** | Sigue sirviendo el título antiguo «DetailShine … Tampa» | Desplegar en ventana (D-018) |

## 5. Automatización

### 5.1 Qué se construyó (rama `feat/lead-followup-automation`, 78 pruebas, auditoría adversarial aplicada)

1. **Aviso al dueño con respuesta de un toque.** El asunto trae servicio, idioma, ZIP y fuente; dos botones (llamar y WhatsApp) con el primer mensaje ya escrito en el idioma del cliente, que pide fotos y no promete precio, plazo ni descuento. Un teléfono dudoso no genera botones, y la línea de consentimiento dice «casilla marcada, número no verificado».
2. **`lead:add`: alta manual** de lo que no pasa por el formulario (WhatsApp, llamada, en persona, referido), sin datos personales obligatorios y sin declarar jamás consentimiento.
3. **`outcome` y `report`:** se anota contactado, cotizado, agendado, ganado o perdido (con motivo y valor), y el reporte da el embudo, la velocidad de primera respuesta, y el ingreso por fuente, servicio, idioma, canal y página de entrada. Con menos de 30 leads avisa que no hay conclusiones.
4. **Reenvío firmado a n8n / GoHighLevel**, apagado por defecto, después de guardar el lead y sin poder afectar al visitante; con herramienta para repetir lo que no llegó.

Ver `docs/LEAD-AUTOMATION.md`. Los hallazgos de la auditoría (un `won` anotado por error no se podía corregir, la velocidad medía cuándo se anotaba y no cuándo se atendía, una URL con credenciales se filtraba al log, un teléfono con extensión mandaba a otro número) están corregidos con pruebas que antes fallaban.

### 5.2 Flujo recomendado

Visitante → formulario, WhatsApp o llamada → el lead queda guardado → correo al dueño con botones → respuesta del dueño en el estándar interno → `lead:add` si no vino del formulario → `outcome` en cada etapa → `report` cada semana.

### 5.3 Qué falta y por qué no se construyó

| Automatización | Estado | Por qué |
|---|---|---|
| Acuse inmediato por texto o WhatsApp | No construida | Es legal con la casilla marcada, pero exige un proveedor de SMS con registro 10DLC o WhatsApp Business, que no hay contratados. Hoy el acuse es la pantalla de éxito y la oferta de mandar fotos |
| Confirmación y recordatorio de cita | No construida | Legal con la casilla (hasta 3 por cita, solo logística). Depende del mismo proveedor y de una agenda real |
| Seguimiento si no responde | No construida | Máximo 2 en 3 a 5 días, solo sobre la cotización. La frontera de «sobre mi cotización» la debe fijar un abogado |
| Reseña, mantenimiento, ofertas, referidos | No construida | Necesitan la casilla v3 y revisión legal. WhatsApp de marketing a números +1 está bloqueado por Meta |

### 5.4 Reglas que no se negocian

Solo con la casilla marcada; entre 8:00 y 20:00 de quien recibe; nunca más de 3 mensajes automáticos en 24 h; STOP corta todo de inmediato; nunca escribir primero a un referido; nunca incentivos ni filtros en reseñas. Detalle y fuentes en `docs/MESSAGING-RULES.md`.

## 6. Retención

**La evidencia es débil y casi toda viene de proveedores.** No hay un estudio independiente de membresías en detallado móvil, y las cifras de retención que circulan no tienen fuente primaria. Por eso el plan se apoya en lo que sí está documentado y en pilotos medibles.

1. **Reseñas primero.** Pedirlas a todos los clientes con trabajo terminado, sin incentivos ni filtros, con enlace directo o código QR del perfil de Google entregado en persona. Es la vía más segura hoy porque no requiere casilla nueva. Responder todas las reseñas.
2. **La cerámica es el eje natural de retención** *(hecho para estas marcas; falta saber cuál usa el dueño)*. Ceramic Pro y XPEL exigen una inspección anual con instalador certificado o la garantía se acorta o se anula, y Ceramic Pro recomienda un detallista móvil para los lavados mensuales. Eso da una razón legítima para volver a escribir al cliente: recordatorios 45 y 15 días antes del aniversario, por correo ahora y por texto solo con v3. Opti-Coat y el tint de LLumar no exigen mantenimiento: no inventar una membresía de tint.
3. **Piloto de lavado de mantenimiento mensual** con 10 a 20 clientes de cerámica antes de ofrecerlo a todos. Medir cuántos aceptan y cuántos se quedan.
4. **Referidos de bajo riesgo:** el cliente comparte su propio enlace desde su teléfono; el referido llega al formulario y marca su propia casilla; sin recompensa atada a reseñas. Nunca se le escribe primero a un referido.
5. **Temporada (inferencia):** el pico de enero a abril pide capacidad y una lista de espera; agosto y septiembre son la ventana para el piloto de mantenimiento y para trabajos de cerámica. Los lovebugs (abril-mayo, agosto-septiembre) son un tema de contenido legítimo si no se promete que el recubrimiento los detiene.

## 7. Cómo medir sin engañarse

- **Lo que importa:** ganados por semana e ingreso. **Lo que lo adelanta:** mediana de tiempo a primer contacto, porcentaje atendido en 15 minutos, leads por canal y fuente, y de cotizado a ganado.
- **Tamaños de muestra:** con menos de 30 leads no se sacan conclusiones por fuente o servicio. Una prueba A/B del cierre pide unas 350 cotizaciones por variante (30 % contra 40 %); con pocos leads solo sirve comparar por periodos.
- **Rutina semanal:** `npm run report` desde `api/`. Anotar el contacto cuando ocurre o con `--at`.
- **Qué NO concluir:** que una fuente es mala con n bajo; que el español «funciona» porque llegó un lead; que las cifras de blogs sobre velocidad aplican a este negocio.

## 8. Hoja de ruta

**Antes de pautar (esta semana):** confirmar el teléfono y el perfil de Google; redirigir `detailshine2go.com`; fijar la ventana de despliegue; crear los IDs de GTM, GA4 y Meta; contestar las preguntas 25 a 42 de `docs/OPEN-QUESTIONS.md`; imprimir el código QR de reseñas.

**Primeros 30 días:** `lead:add` y `outcome` en cada lead; estándar de respuesta; reseñas a todos; primera lectura del reporte (con n bajo).

**60 a 90 días:** decidir proveedor de SMS o CRM (GoHighLevel); llevar a un abogado el borrador v3 y los textos; programa de aniversario de cerámica; piloto de mantenimiento mensual.

**Hipótesis a probar, no hechos:** foto opcional en la cotización (no hay evidencia cuantitativa); etiqueta de origen en el mensaje de WhatsApp; anuncios en español solo a Brandon y Bradenton.

## 9. Decisiones que solo puede tomar el dueño

1. ¿Cuál es el teléfono correcto y el perfil de Google es suyo? (34 y 35)
2. ¿Qué estándar de respuesta puede cumplir? (38)
3. ¿Qué marca de cerámica usa y qué garantía y mantenimiento exige? (39)
4. ¿Acepta registrar a mano los leads de WhatsApp y de llamadas durante 8 a 12 semanas? (41)
5. ¿Qué proveedor de SMS o CRM tiene o quiere? (42)
6. ¿Da rangos de precio por foto? (19)
7. ¿Cuántas cotizaciones por mes espera? (40)
8. ¿Quiere llevar el borrador v3 a un abogado de Florida? (`docs/MESSAGING-RULES.md`)

## 10. Fuentes y límites

Informes completos con sus fuentes: `docs/research/` (competencia, demanda, evidencia de captación y retención) y `docs/MESSAGING-RULES.md` (reglas de mensajería). El censo de Google Maps se hizo con un actor de Apify, con tope de 20 lugares por búsqueda y sin reseñas ni imágenes (costo estimado alrededor de 0,50 dólares, el real no lo devuelve la herramienta).

**Límites:** sin datos de tráfico ni conversión de nadie; Google Trends sin datos; Brandon, Venice y los cayos no tuvieron búsqueda propia en Maps; 11 de 91 sitios no se pudieron leer; el texto final de la orden de la FCC del 30 de septiembre y la fecha en que Meta reactiva marketing a +1 no se pudieron confirmar; las reglas legales son una investigación, no asesoría de un abogado.
