# Plan: «antes y después» con barra deslizante

Estado: **POSPUESTO al siguiente sprint** (decisión del usuario, 2026-10-07: primero consolidar lo visual y lo ya definido; además faltan pares reales de fotos). Propuesta, sin código. Fecha: 2026-10-07. Referencia revisada: `projects/10psicarwash` (`src/components/BeforeAfter.jsx`, bloque `.ba*` de `src/index.css`, uso en `src/sections/Hero.jsx`).

## 1. Cómo lo hace 10PSI (código real)

- Un componente de React (≈55 líneas) y ≈45 líneas de CSS. Sin librerías.
- Dos imágenes apiladas, mismo tamaño (4:3). La de «antes» va encima, recortada con `clip-path: inset(0 X% 0 0)`; X cambia al arrastrar.
- Manija central: línea blanca de 3 px y un círculo de 44 px con flechas ‹ ›. Etiquetas ANTES / DESPUÉS en píldoras oscuras abajo.
- Se arrastra con ratón y con el dedo (`touch-action: pan-y`: no bloquea el scroll vertical).
- Lo usan como imagen principal del hero.

**Lo que le falta y haremos mejor:** no se maneja con teclado ni lo anuncian los lectores de pantalla; el texto alternativo es genérico («After detailing»); no mide si alguien lo usa; no reserva alto antes de cargar. Además, sus dos fotos se llaman `express_wash` y `wax_apli`: no se ve que sean el mismo carro, así que como ejemplo de **prueba real** no sirve; solo copiamos la técnica.

## 2. Qué construiríamos

**Componente `BeforeAfter`** (mismo mecanismo, con mejoras):
- Un `<input type="range">` invisible encima: da teclado (flechas), foco visible y nombre accesible gratis, y sigue funcionando con ratón y dedo.
- Texto alternativo por par («Capó antes de lavar» / «Capó después de lavar»), etiquetas ANTES/DESPUÉS en EN y ES.
- `aspect-ratio` fijo, `width/height` en las imágenes y carga diferida: sin saltos de página.
- Un evento de medición (`before_after_use`) la primera vez que alguien lo mueve, para saber si funciona.
- Pie fijo bajo la imagen: «Fotos reales del mismo carro, misma luz. Los resultados varían.» (ver §5).

**Datos en un archivo** (`src/content/work.js`): lista de pares `{ servicio, antes, después, alt, fecha }`. **Si la lista está vacía, la sección no se dibuja**: así no puede salir nada falso por descuido.

**Una portada con selector** (lo que pidió): un solo slider grande y, debajo, pastillas pequeñas para cambiar de par: **Lavado · Polarizado · Cerámico · Bote**. Cada pastilla solo aparece si ese servicio tiene un par real.

## 3. Dónde ponerlo (recomendación)

| Opción | Dónde | Veredicto |
|---|---|---|
| A | Hero de la home, como 10PSI | **No ahora.** Es lo que el cliente aprobó, y el hero de 10PSI funciona porque su par es fuerte; sin par real nuestro hero quedaría peor. |
| **B** | **Galería de la home: el slider con selector como portada, y las miniaturas debajo** | **Recomendada.** Es donde se espera ver trabajos; no toca el resto del diseño. |
| C | Páginas de polarizado y cerámico: un slider propio de ese servicio bajo el hero | **Segunda fase**, cuando haya pares de esos servicios. |

## 4. Lo que bloquea: no tenemos ni un par real

Con lo que hay en el repositorio no se puede armar un «antes y después» honesto: hay fotos sueltas de carros limpios, ninguna del mismo carro sucio y limpio. **No usaremos imágenes generadas con IA para esto**: un antes y después es una prueba de resultado, y mostrar uno inventado como si fuera real es engañoso aunque el resto de las imágenes ilustrativas no lo sean.

**Lo que hay que pedirle al dueño** (por par, lo mínimo es uno de lavado):
1. Mismo carro, mismo ángulo, misma altura de cámara y misma luz (con el celular apoyado o una marca en el piso), primero **antes** y luego **después**.
2. Horizontal, buena luz de día, 4:3, sin matrícula visible ni personas; con permiso del dueño del carro.
3. Qué pares rinden más: capó o lateral con suciedad visible → limpio; rines con polvo de frenos → limpios; asiento o alfombra manchados → limpios; casco de bote opaco → pulido; vidrio con y sin polarizado (misma ventana, por fuera y por dentro).
4. Para cerámico: media pieza tratada y media sin tratar, con la fecha. Solo si el dueño confirma qué producto usó (ver #13 y #14 de las preguntas abiertas).

Al subirlos quitamos los datos de ubicación del archivo, igual que con las fotos actuales.

## 5. Cumplimiento (se revisa con `bliss-compliance` antes de publicar)

- Solo fotos reales del negocio, mismo vehículo y misma luz; sin retoque más allá de recorte y compresión.
- Pie «Los resultados varían» y nada de prometer duración, protección ni garantía en el rótulo.
- Cada par con permiso del dueño del vehículo.
- Sin cifras en los rótulos (ni «99 % más limpio», ni «protección por X años»).

## 6. Pasos y orden

1. **Componente y estilos** con selector, accesibilidad y medición (medio día).
2. **Datos y textos EN/ES**; sección oculta si no hay pares.
3. **Integrar en la Galería** de la home sin tocar lo demás.
4. **Vista local de demostración** solo para aprobar el movimiento y el diseño: con una bandera que **no entra en el sitio publicado**, y con las fotos marcadas «DEMO». Nunca se despliega.
5. Verificar: verificadores, pruebas, anchos de pantalla, teclado y lector de pantalla.
6. Revisión de cumplimiento.
7. Cuando lleguen los primeros pares reales: cargarlos, quitar la bandera y publicar.

## 7. Decisiones que necesito de usted

1. ¿Opción B (galería de la home) como primer paso, y C después?
2. ¿Con selector de servicio (Lavado · Polarizado · Cerámico · Bote) o un solo par al inicio?
3. ¿Hago la vista de demostración local para que lo vea moverse antes de tener fotos reales?
4. ¿Quién le pide las fotos al dueño, y quiere que le prepare el mensaje con el paso a paso para él?
