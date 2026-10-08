#!/usr/bin/env node
/**
 * Generates MANIFEST.md from copy.mjs, the files in out/ and out/audit.json (run render.mjs and audit.mjs first).
 *   node marketing/creatives/manifest.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { variants, HERE, OUT } from './render.mjs';
import { CONCEPTS, ADS } from './copy.mjs';

const audit = fs.existsSync(path.join(OUT, 'audit.json')) ? JSON.parse(fs.readFileSync(path.join(OUT, 'audit.json'), 'utf8')) : [];
const A = Object.fromEntries(audit.map((r) => [r.id, r]));

const LANG = { en: 'EN', es: 'ES' };
const WHERE = {
  feed: 'Meta feed (FB/IG 4:5); orgánico FB/IG',
  story: 'Stories y portada de Reels (FB/IG); orgánico. Zona segura 250 px respetada',
  link: 'Meta anuncio de enlace (FB feed); Google Display / Demand Gen 1.91:1; orgánico (enlaces)',
};
const FMT_LABEL = { feed: 'Feed 4:5', story: 'Story/Reel 9:16', link: 'Enlace 1.91:1' };
const SERVICE = { c1: 'Window Tint', c2: 'Window Tint (límites de Florida)', c3: 'Ceramic Coating' };
const CONCEPT_NOTE = {
  c1: 'Servicio único: Window Tint (ventanas laterales y vidrio trasero; sin prometer el sunroof ni «todos» los vidrios). Esquema cualitativo sol → vidrio con película, sin cifras. Dice "Te explicamos los límites de polarizado de Florida por ventana" (proceso, no resultado legal). Sin fotos de autos, sin antes/después, sin urgencia.',
  c2: '**REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Servicio único: Window Tint. Mapa esquemático SIN porcentajes; parabrisas "franja transparente superior"; nota visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." El titular formula la pregunta "¿Qué polarizado es legal en Florida?" (no afirma que la película o el tono sea legal) y el CTA promete explicar los límites. Sin fotos.',
  c3: 'Servicio único: Ceramic Coating (pintura, vidrios, rines y calipers, molduras, interior), solo esquema con iconos simples. Sin fotos de autos, sin claims de desempeño ("9H", duración, garantías, "a prueba de rayones").',
};
const CLAIMS = {
  c1: 'Ninguno numérico (cualitativo: esquema de reflejo)',
  c2: 'Ninguno numérico (solo cita F.S. 316.2951–316.2957 y 316.29545 como referencia)',
  c3: 'Ninguno numérico (lista de superficies y proceso "primero la preparación")',
};
const OG_WHERE = {
  default: 'og:image / twitter:image de la home y páginas genéricas; previsualización de enlaces (WhatsApp, iMessage, FB, LinkedIn)',
  'window-tint': 'og:image de /window-tint/ y /es/polarizado-de-vidrios/ (y de la sección #protection, parte tint)',
  'ceramic-coating': 'og:image de /ceramic-coating/ y /es/recubrimiento-ceramico/',
};
const OG_NOTE = {
  default: 'Marca (no es la sección Protection): "Car wash and boat detailing that comes to you" / "Lavado de carros y detallado de botes a domicilio" + zonas. Logo, dominio y teléfono. Menciona botes por indicación expresa; el alcance "solo autos" aplica a las piezas de Protection.',
  'window-tint': 'Solo Window Tint. Subtítulo de proceso: "Free quote by photo · Florida tint limits explained" / "Cotización gratis por foto · Límites de Florida explicados". Logo, dominio y teléfono.',
  'ceramic-coating': 'Solo Ceramic Coating (pintura, vidrios, rines, molduras, interior). Sin cifras de dureza, años ni "a prueba de rayones". Logo, dominio y teléfono.',
};

const kb = (f) => (fs.existsSync(f) ? `${(fs.statSync(f).size / 1024).toFixed(0)} KB` : 'falta');
const rel = (f) => path.relative(HERE, f).split(path.sep).join('/');

let md = '';
const push = (s = '') => (md += s + '\n');

push('# MANIFEST — Creativos de Window Tint y Ceramic Coating (servicios separados, solo autos)');
push();
push('Generado por `manifest.mjs` a partir de `copy.mjs`, `out/` y `out/audit.json`. Fecha de generación: ' + new Date().toISOString().slice(0, 10) + '. **Ronda 3** (aclaraciones de la dueña: zona de servicio real, tint y cerámico como dos servicios distintos).');
push();
push('**Negocio:** ShineToGo Mobile Detailing. Zona: Sarasota, Bradenton, Manatee County, Venice, St. Petersburg, Brandon, Lido Key, Siesta Key, Longboat Key y alrededores. En las imágenes la franja dice "Sarasota · Bradenton · Venice · St. Pete" (+ "& nearby / y alrededores" donde cuadra).');
push();
push('**Marca:** el nombre de la marca NO aparece como texto en ningún creativo (el logo en insignia blanca ya lo lleva). Sí se escriben el dominio `shinetogomobiledetailing.com` y el teléfono/WhatsApp `(941) 422-4405`.');
push();
push('## 1. Estado de cumplimiento (resumen)');
push();
push('| Estado | Qué |');
push('|---|---|');
push('| **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR** | Los 6 PNG del concepto C2 (`c2-tint-limits_*`); el SVG web `src/assets/protection/fl-windows-map.{en,es}.svg` (28 %, 15 %, 6 %); y `src/assets/protection/vlt-scale.{en,es}.svg` (20/35/50/70 % con dónde sería legal cada tono). |');
push('| Aprobable | C1 (tint, 6 PNG), C3 (cerámico, 6 PNG) y las 6 imágenes OG: sin cifras de calor/UV/dureza/duración, sin garantías, sin precios, sin urgencia ni escasez, sin fotos de autos, sin antes/después, sin frases de legalidad de la película. |');
push('| Eliminado | El concepto C3 anterior ("Detail it. Then protect it."): mezclaba servicios y usaba la foto `hero-finish.jpg` (origen sin confirmar). Sus 6 PNG, su plantilla y su copy se borraron; `hero-finish.jpg` ya no existe en `assets/` ni se usa en ningún creativo. |');
push('| Verificado | Lint (frases vetadas, ciudad fuera de zona, separación de servicios, sin claims de dureza/garantía); fuentes Outfit/Inter cargadas; contraste medido sobre el píxel real; texto < 20 % del área; zonas seguras de Story; dimensiones exactas; OG < 250 KB. Ver sección 6. |');
push();

push('## 2. Cambios de la ronda 3');
push();
push('1. **Zona**: la franja de las imágenes y los textos usan solo las ciudades de la zona de servicio. Se retiró la ciudad que no es zona de servicio de imágenes, copy, OG y plantillas. `audit.mjs` hace FALLAR el lint si esa ciudad reaparece en cualquier forma en copy, plantillas o SVG.');
push('2. **Concepto C3 anterior eliminado** (PNG de `out/`, plantilla `c3-detail-protect.html`, entradas del manifiesto, copy). `hero-finish.jpg` borrada de `assets/`; el lint falla si reaparece o se referencia.');
push('3. **C1 (tint)**: titular concreto "Window tint for your car / Carbon or ceramic film." (ES "Polarizado para tu carro / Película de carbono o cerámica."). Se quitó «every window / todos los vidrios» y «Sunroof included» por revisión de cumplimiento del 5-oct-2026 (el parabrisas completo no se puede y el sunroof depende del vidrio). Se mantiene el esquema sol → vidrio con película. Línea de imagen: "We explain Florida\'s tint limits for each window." / "Te explicamos los límites de polarizado de Florida por ventana." CTA "Quote my tint on WhatsApp" / "Cotiza tu polarizado por WhatsApp". Pie: dominio + (941) 422-4405 + "Appointments subject to availability" / "Citas sujetas a disponibilidad". Archivos: `c1-tint-windows_*`.');
push('4. **C2 (tint, límites de Florida)**: sin cambios de fondo. En español "auto" pasa a "carro" en el CTA ("Dinos tu carro y te explicamos los límites"). Ningún texto promete que la película sea legal. Archivos renombrados a `c2-tint-limits_*` (sin "legal tint" en el nombre).');
push('5. **C3 NUEVO (cerámico)**: "Ceramic coating, not only for the paint" / "Cerámico, y no solo para la pintura". Seis fichas: Paint · Glass · Wheels and calipers · Trim · Interior (ES Pintura · Vidrios · Rines y calipers · Molduras · Interior) y la ficha de proceso "Prep first, coating after." / "Primero la preparación, luego el recubrimiento." Iconos simples, sin fotos. CTA "Quote my coating on WhatsApp" / "Cotiza tu recubrimiento por WhatsApp". Mismos formatos (feed, story, enlace; EN y ES) y mismo pie. Archivos: `c3-ceramic-surfaces_*`.');
push('6. **Copy de anuncios reescrito**: cada texto habla de UN solo servicio (C1 y C2 tint; C3 cerámico), con tono de la zona y sin aperturas épicas. En español: "carro", "polarizado", "vidrios/ventanas", "cotización", "rines", "sunroof (quemacocos)"; "película cerámica" solo para el tint y "recubrimiento cerámico" para el servicio de cerámico. Sin "legal" en ningún texto de anuncio, sin precios, garantías, urgencia ni escasez.');
push('7. **OG (6 JPG)** actualizados: default "Car wash and boat detailing that comes to you" / "Lavado de carros y detallado de botes a domicilio" + zonas; window-tint "Window tint for your car’s side and back windows" / "Polarizado para las ventanas y el vidrio trasero de tu carro"; ceramic-coating "Ceramic coating for paint, glass, wheels, trim and interior" / "Recubrimiento cerámico para pintura, vidrios, rines, molduras e interior". Todos con logo, dominio y teléfono.');
push('8. `audit.mjs`: el lint ahora también falla ante "9H", "de por vida/lifetime", "a prueba de rayones", garantías, `hero-finish`, "legal" en cualquier texto de anuncio y mezcla de servicios (palabras de cerámico en un creativo de tint o viceversa).');
push();

push('## 3. Archivos de `out/`');
push();
push('| Archivo | Concepto / servicio | Formato | Idioma | Claims que usa | Nota de cumplimiento | Dónde usar | Texto % área | Contraste mín. |');
push('|---|---|---|---|---|---|---|---|---|');
for (const v of variants().filter((x) => x.kind === 'ad')) {
  const a = A[v.id];
  push(`| \`${rel(v.out)}\` (${kb(v.out)}) | ${v.concept.toUpperCase()} · ${CONCEPTS[v.concept].title[v.lang]} · ${SERVICE[v.concept]} | ${FMT_LABEL[v.fmt]} ${v.w}×${v.h} | ${LANG[v.lang]} | ${CLAIMS[v.concept]} | ${CONCEPT_NOTE[v.concept]} | ${WHERE[v.fmt]} | ${a ? a.textAreaPct + ' %' : '—'} | ${a ? a.minContrast + ':1' : '—'} |`);
}
for (const v of variants().filter((x) => x.kind === 'og')) {
  const a = A[v.id];
  push(`| \`${rel(v.out)}\` (${kb(v.out)}) | OG · ${v.ogType} | Open Graph 1200×630 JPG | ${LANG[v.lang]} | Ninguno numérico | ${OG_NOTE[v.ogType]} | ${OG_WHERE[v.ogType]} | ${a ? a.textAreaPct + ' %' : '—'} | ${a ? a.minContrast + ':1' : '—'} |`);
}
push();

push('### Gráficos web (`src/assets/protection/`, SVG inline; sin cambios en la ronda 3)');
push();
push('| Archivo | Servicio | Qué muestra | Claims | Nota de cumplimiento |');
push('|---|---|---|---|---|');
push('| `film-layers.{en,es}.svg` | Tint | Corte esquemático de la película (vidrio, adhesivo, capa de control solar carbono/cerámica, poliéster, "Hard coat") | Ninguno numérico | Sin promesa de resistencia al rayado. |');
push('| `heat-path.{en,es}.svg` | Tint | Sol → vidrio → cabina, con y sin película (flechas gruesas vs finas, reflejo) | Ninguno numérico | Solo "más calor / menos calor" cualitativo. |');
push('| `vlt-scale.{en,es}.svg` | Tint | 4 muestras de tono: 20, 35, 50, 70 % VLT con dónde sería legal sin exención (auto de pasajeros) | **Sí: porcentajes de VLT y de legalidad por ventana** | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Lleva "Escala de referencia, no asesoría legal". |');
push('| `fl-windows-map.{en,es}.svg` | Tint | Sedán visto desde arriba con VLT mínimo por ventana (28 % / 15 %; parabrisas franja transparente superior; multipropósito traseras desde 6 % si está clasificado así; "Se mide en el vidrio terminado") | **Sí: porcentajes de ley** | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Lleva visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." |');
push('| `ceramic-layers.{en,es}.svg` | Cerámico | Corte esquemático de pintura + recubrimiento cerámico; agua y suciedad se quitan más fácil | Ninguno numérico | Sin años ni dureza ("9H"). |');
push();

push('## 4. Copy de anuncio (por concepto e idioma)');
push();
push('Límites aplicados: textos principales ≤ 125 caracteres, titulares ≤ 40, descripción ≤ 30 (los números entre paréntesis son el conteo real). Cada concepto vende UN servicio. Ningún texto afirma que la película o el tono sea "legal"; ningún texto lleva el nombre de la marca.');
push();
for (const [cid, c] of Object.entries(CONCEPTS)) {
  for (const lang of ['en', 'es']) {
    const ad = ADS[cid][lang];
    const flag = cid === 'c2' ? ' — REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR' : '';
    push(`### ${cid.toUpperCase()} · ${SERVICE[cid]} · ${c.title[lang]} · ${LANG[lang]}${flag}`);
    push();
    push('Textos principales:');
    ad.primary.forEach((p, i) => push(`${i + 1}. ${p} (${p.length})`));
    push();
    push('Titulares:');
    ad.headline.forEach((p, i) => push(`${i + 1}. ${p} (${p.length})`));
    push();
    push(`Descripción: ${ad.description} (${ad.description.length})`);
    push();
    push(`CTA (en la imagen): **${ad.cta}** · Botón de plataforma sugerido: ${ad.metaButton}`);
    push();
  }
}

push('## 5. Reglas aplicadas');
push();
push('- **Dos servicios distintos, nunca mezclados**: Window Tint = ventanas, vidrio trasero, franja del parabrisas y sunroof (según foto) (C1, C2, OG window-tint). Ceramic Coating = todos los tratamientos: pintura, vidrios, rines y calipers, molduras y plásticos de afuera, interior (C3, OG ceramic-coating). El lint lo verifica.');
push('- Cero cifras de rechazo de calor, TSER, UV, durabilidad, años de garantía, "de por vida", "9H", "a prueba de rayones", porcentajes de satisfacción, número de clientes o reseñas. Cero precios.');
push('- Ninguna frase afirma que la película, el tono o la instalación sean "legales": se afirma un proceso ("te explicamos los límites por ventana"). La legalidad es de la ventana terminada (vidrio + película). Única excepción deliberada: la PREGUNTA del titular de la imagen C2.');
push('- Sin fotos de autos ni antes/después en ningún creativo (no hay fotos aprobadas). Imágenes = esquemas e iconos.');
push('- Sin escasez ni urgencia. Pie: "Appointments subject to availability" / "Citas sujetas a disponibilidad".');
push('- Zona de servicio exacta (ver arriba). Parabrisas descrito como "franja transparente superior".');
push('- Terminología en español: "carro", "polarizado", "vidrios/ventanas", "cotización", "rines", "sunroof (quemacocos)"; "película cerámica" (tint) vs "recubrimiento cerámico" (servicio de cerámico).');
push('- Los únicos porcentajes del paquete están en los SVG web `fl-windows-map` y `vlt-scale`, ambos en revisión legal. Las piezas C2 no llevan porcentajes.');
push();

push('## 6. Verificaciones realizadas');
push();
push('- **Lint de copy** (`audit.mjs`): `copy.mjs`, plantillas y SVG web sin frases vetadas de legalidad de película/tono, sin la ciudad fuera de zona (cualquier forma), sin `hero-finish`, sin claims de dureza/duración/garantía, sin muestra de 5 % en `vlt-scale`, sin "legal" en textos de anuncio, sin mezcla de servicios.');
push('- Render con Chrome headless, Outfit e Inter desde Google Fonts (`display=swap`) y `--virtual-time-budget`; `audit.mjs` confirma `document.fonts` (Outfit 800 e Inter 600 cargadas) en las 24 piezas.');
push('- Contraste WCAG medido sobre el píxel real: cada caja de texto se compara con el fondo renderizado SIN texto (percentil 2 del peor píxel). Resultado: mínimo ' + (audit.length ? Math.min(...audit.map((r) => r.minContrast)).toFixed(2) : '—') + ':1 (criterio del paquete 4.5:1 en todo el texto).');
push('- Área de texto (unión de cajas de línea, incluye CTA, dominio y notas): máximo ' + (audit.length ? Math.max(...audit.map((r) => r.textAreaPct)).toFixed(1) : '—') + ' % (límite orientativo de Meta: 20 %). El texto del logo no se cuenta.');
push('- Story: ningún texto ni el logo fuera de y = 250..1670 px. Dimensiones exactas verificadas en cada PNG; OG < 250 KB.');
push('- Revisión visual manual de las imágenes principales de cada concepto y formato (textos cortados, solapes, fuentes de respaldo, iconos legibles).');
push();

push('## 7. Pendiente de revisión legal y riesgos');
push();
push('1. **Pendiente de revisión legal**: C2 (6 PNG), `fl-windows-map` y `vlt-scale` (SVG web): dónde sería legal cada tono, texto de multipropósito/clasificación, cita de F.S. 316.2951–316.2957 y 316.29545. El titular de C2 conserva la pregunta "¿Qué polarizado es legal en Florida?"; si Cumplimiento la prefiere sin "legal", se cambia en `copy.mjs`.');
push('2. **OG default menciona botes** ("boat detailing / detallado de botes") por indicación expresa; es una imagen de marca, no de la sección Protection (alcance solo autos).');
push('3. **Texto dentro del logo**: el logo contiene el nombre de la marca en su lettering; es el logo, no texto de los creativos. Meta puede contarlo en su estimación de texto.');
push('4. **CTA "en WhatsApp"** (C1 y C3): requiere que `(941) 422-4405` esté activo en WhatsApp Business y que el mensaje prellenado pida fotos del vehículo.');
push('5. **Términos**: el sitio actual usa "Revestimiento cerámico" (hero) mientras estos creativos usan "recubrimiento cerámico". Unificar con la landing. En español se usa "Luneta" (vidrio trasero) en C2; el sitio dice "carro" en otras partes.');
push('6. El azul de texto en C2 sobre fondo claro es `#0062c4` (versión más oscura del azul profundo `#0077ff`) para cumplir AA; el resto de colores son los tokens de `src/index.css`.');
push('7. Los OG de ventana y cerámico prometen "cotización gratis por foto"; deben apuntar a páginas donde ese flujo exista. Las fichas de C3 (iconos) son abstractas: si hay fotos reales aprobadas más adelante, se pueden sumar sin cambiar el copy.');
push();

push('## 8. Regenerar');
push();
push('```bash');
push('node marketing/creatives/render.mjs      # 18 PNG + 6 JPG en out/ (necesita Chrome e internet para las fuentes)');
push('node marketing/creatives/audit.mjs       # lint, fuentes, contraste, % de texto, zonas seguras -> out/audit.json');
push('node marketing/creatives/manifest.mjs    # regenera este archivo');
push('```');
push();
push('Estructura: `templates/*.html` + `templates/base.css` (una plantilla por concepto: `c1-tint-windows`, `c2-tint-limits`, `c3-ceramic-surfaces`, y `og`), `assets/logo.jpg`, `render.mjs`, `audit.mjs`, `manifest.mjs`, `out/` y `out/og/`. Para cambiar un texto, edítalo SOLO en `copy.mjs`.');

fs.writeFileSync(path.join(HERE, 'MANIFEST.md'), md);
console.log('MANIFEST.md written,', md.split('\n').length, 'lines');
