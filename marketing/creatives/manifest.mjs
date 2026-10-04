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
const BLOCK = '**NO PUBLICAR hasta confirmar origen real de la foto, permiso de la persona y placa visible.**';
const CONCEPT_NOTE = {
  c1: 'Esquema cualitativo (sol, vidrio con película, cabina; flechas gruesas/finas, sin cifras). Dice "Te explicamos los límites de polarizado de Florida por ventana" (proceso, no resultado legal), "Cotización gratis" y "Citas sujetas a disponibilidad". Sin antes/después, sin urgencia.',
  c2: '**REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Mapa esquemático SIN porcentajes; rotula el parabrisas como "franja transparente superior" y lleva visible la nota "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." El titular formula la pregunta "¿Qué polarizado es legal en Florida?" (no afirma que algo sea legal); el CTA promete explicar los límites.',
  c3: `${BLOCK} Foto usada solo como ambiente (auto detallado + furgoneta de marca), no como resultado de tint/cerámico ni antes/después. "Cotización gratis" y "Citas sujetas a disponibilidad" visibles.`,
};
const CLAIMS = {
  c1: 'Ninguno numérico (afirmaciones cualitativas: "bajo control", esquema de reflejo)',
  c2: 'Ninguno numérico (solo cita el estatuto F.S. 316.2951–316.2957 y 316.29545 como referencia)',
  c3: 'Ninguno numérico (afirmación cualitativa: "protégelo")',
};
const OG_WHERE = {
  default: 'og:image / twitter:image de la home y páginas genéricas; previsualización de enlaces (WhatsApp, iMessage, FB, LinkedIn)',
  'window-tint': 'og:image de /window-tint/ y /es/polarizado-de-vidrios/ (y de la sección #protection)',
  'ceramic-coating': 'og:image de /ceramic-coating/ y /es/recubrimiento-ceramico/',
};
const OG_NOTE = {
  default: 'Sobria: titular corto, logo en insignia, dominio. Zona "Sarasota · Bradenton · Tampa & nearby" / "y alrededores". Sin claims de producto.',
  'window-tint': 'Sobria: titular corto, logo, dominio. Subtítulo de proceso: "Free quote by photo · Florida tint limits explained" / "Cotización gratis por foto · Límites de Florida explicados". Sin frases de legalidad de películas.',
  'ceramic-coating': 'Sobria: titular corto, logo, dominio. Sin cifras de dureza, años ni "anti-rayones".',
};

const kb = (f) => (fs.existsSync(f) ? `${(fs.statSync(f).size / 1024).toFixed(0)} KB` : 'falta');
const rel = (f) => path.relative(HERE, f).split(path.sep).join('/');

let md = '';
const push = (s = '') => (md += s + '\n');

push('# MANIFEST — Paquete de creativos "Protection" (Window Tint + Ceramic Coating, solo autos)');
push();
push('Generado por `manifest.mjs` a partir de `copy.mjs`, `out/` y `out/audit.json`. Fecha de generación: ' + new Date().toISOString().slice(0, 10) + '. **Ronda 2** (veto de cumplimiento a las frases de legalidad de películas, zona sin "Bay", ajustes de SVG).');
push();
push('**Marca:** el nombre de la marca NO aparece como texto en ningún creativo (decisión pendiente); la marca aparece solo mediante el logo en insignia blanca. Sí se escriben el dominio `shinetogomobiledetailing.com` y el teléfono/WhatsApp `(941) 422-4405`.');
push();
push('## 1. Estado de cumplimiento (resumen)');
push();
push('| Estado | Qué |');
push('|---|---|');
push('| **NO PUBLICAR hasta confirmar origen real de la foto, permiso de la persona y placa visible** | Los 6 PNG del concepto C3 (`c3-detail-protect_*`), que usan `hero-finish.jpg`. Re-renderizados con el copy nuevo, pero BLOQUEADOS. |');
push('| **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR** | Los 6 PNG del concepto C2 (`c2-legal-tint_*`); el SVG web `src/assets/protection/fl-windows-map.{en,es}.svg` (28 %, 15 %, 6 %); y `src/assets/protection/vlt-scale.{en,es}.svg` (20/35/50/70 % con dónde sería legal cada tono). |');
push('| Aprobable sin cifras | C1 y las 6 imágenes OG: ninguna cifra de calor/UV/durabilidad/garantía/dureza, sin precios, sin conteos de clientes o reseñas, sin escasez ni urgencia, sin botes, sin antes/después, sin frases de legalidad de la película. |');
push('| Verificado | Lint de frases prohibidas; fuentes Outfit/Inter cargadas (no respaldo) en las 24 piezas; contraste mínimo medido sobre el píxel real; texto < 20 % del área; zonas seguras de Story; dimensiones exactas; OG < 250 KB. Ver sección 6. |');
push();

push('## 2. Cambios de la ronda 2');
push();
push('1. **Eliminada toda la familia de frases vetadas** que presentaban la película, el tono o la instalación como "legales" (en inglés y en español) de imágenes, copy de anuncios, OG, plantillas y SVG (la legalidad es de la ventana terminada, no de la película). Sustitutos de proceso aprobados: línea de imagen C1 "We explain Florida\'s tint limits for each window." / "Te explicamos los límites de polarizado de Florida por ventana."; textos principales y titulares de C1, C2 y C3; CTA de C2 "Tell us your car and we\'ll explain the limits" / "Dinos tu auto y te explicamos los límites"; OG window-tint "Free quote by photo · Florida tint limits explained" / "Cotización gratis por foto · Límites de Florida explicados".');
push('2. Pie de las imágenes: "Free quote · Appointments subject to availability" / "Cotización gratis · Citas sujetas a disponibilidad". El estatuto de las notas de C2 pasa a "F.S. 316.2951–316.2957 y 316.29545" para coincidir con el mapa web.');
push('3. **Zona**: ya no aparece la variante de la zona terminada en "Bay" en imágenes ni textos. Franja superior: "Sarasota · Bradenton · Tampa"; OG y copy: "Sarasota, Bradenton, Tampa y alrededores / and nearby" donde cuadra.');
push('4. **vlt-scale** (web): sin la muestra de 5 %. Quedan 20/35/50/70 % VLT y bajo cada una dónde sería legal sin exención en un auto de pasajeros: 35, 50 y 70 % en todas las ventanas laterales y la trasera (el parabrisas no entra: solo lleva franja superior); 20 % solo detrás del conductor. Pie "Escala de referencia, no asesoría legal".');
push('5. **fl-windows-map** (web): parabrisas "franja transparente superior (sobre la línea AS-1)"; multipropósito "ventanas traseras desde 6 %, si el vehículo está clasificado así. Confirmamos el tuyo."; se quita el texto de pickups; nueva línea "Se mide en el vidrio terminado (vidrio + película)."; estatuto "F.S. 316.2951–316.2957 y 316.29545".');
push('6. **film-layers** (web): sin cambios por mí; ya dice "Hard coat / Capa dura (hard coat)" (edición de Cumplimiento/coordinación, respetada).');
push('7. **C3 bloqueado** hasta confirmar la procedencia de la foto (ver sección 1). `audit.mjs` ahora incluye un lint que falla si reaparece una de las frases vetadas, la variante de zona con "Bay" o una muestra de 5 % en `vlt-scale`.');
push();

push('## 3. Archivos de `out/`');
push();
push('| Archivo | Concepto | Formato | Idioma | Claims que usa | Nota de cumplimiento | Dónde usar | Texto % área | Contraste mín. |');
push('|---|---|---|---|---|---|---|---|---|');
for (const v of variants().filter((x) => x.kind === 'ad')) {
  const a = A[v.id];
  push(`| \`${rel(v.out)}\` (${kb(v.out)}) | ${v.concept.toUpperCase()} · ${CONCEPTS[v.concept].title[v.lang]} | ${FMT_LABEL[v.fmt]} ${v.w}×${v.h} | ${LANG[v.lang]} | ${CLAIMS[v.concept]} | ${CONCEPT_NOTE[v.concept]} | ${WHERE[v.fmt]} | ${a ? a.textAreaPct + ' %' : '—'} | ${a ? a.minContrast + ':1' : '—'} |`);
}
for (const v of variants().filter((x) => x.kind === 'og')) {
  const a = A[v.id];
  push(`| \`${rel(v.out)}\` (${kb(v.out)}) | OG · ${v.ogType} | Open Graph 1200×630 JPG | ${LANG[v.lang]} | Ninguno numérico | ${OG_NOTE[v.ogType]} | ${OG_WHERE[v.ogType]} | ${a ? a.textAreaPct + ' %' : '—'} | ${a ? a.minContrast + ':1' : '—'} |`);
}
push();

push('### Gráficos web (`src/assets/protection/`, SVG inline)');
push();
push('| Archivo | Qué muestra | Claims | Nota de cumplimiento |');
push('|---|---|---|---|');
push('| `film-layers.{en,es}.svg` | Corte esquemático de la película (vidrio, adhesivo, capa de control solar carbono/cerámica, poliéster, "Hard coat" / "Capa dura (hard coat)") | Ninguno numérico | Sin promesa de resistencia al rayado. |');
push('| `heat-path.{en,es}.svg` | Sol → vidrio → cabina, con y sin película (flechas gruesas vs finas, reflejo) | Ninguno numérico | Solo "más calor / menos calor" cualitativo. |');
push('| `vlt-scale.{en,es}.svg` | 4 muestras de tono: 20, 35, 50, 70 % VLT, cada una con dónde sería legal sin exención (auto de pasajeros) | **Sí: porcentajes de VLT y de legalidad por ventana** | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Lleva "Escala de referencia, no asesoría legal". "Legal en todas las ventanas laterales y la trasera" excluye el parabrisas. |');
push('| `fl-windows-map.{en,es}.svg` | Sedán visto desde arriba con VLT mínimo por ventana (28 % / 15 %; parabrisas franja transparente superior sobre la línea AS-1; multipropósito traseras desde 6 % si está clasificado así; "Se mide en el vidrio terminado") | **Sí: porcentajes de ley** | **REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR.** Lleva visible "Reglas según F.S. 316.2951–316.2957 y 316.29545. Verifica la ley vigente." |');
push('| `ceramic-layers.{en,es}.svg` | Corte esquemático de pintura + recubrimiento cerámico; agua y suciedad resbalan | Ninguno numérico | Sin años ni dureza ("9H"). |');
push();

push('## 4. Copy de anuncio (por concepto e idioma)');
push();
push('Límites aplicados: textos principales ≤ 125 caracteres visibles, titulares ≤ 40, descripción ≤ 30. Los números entre paréntesis son el conteo real de caracteres. Ningún texto afirma que la película o el tono sea "legal": solo se explican los límites por ventana. Ningún texto lleva el nombre de la marca ni la variante de zona con "Bay".');
push();
for (const [cid, c] of Object.entries(CONCEPTS)) {
  for (const lang of ['en', 'es']) {
    const ad = ADS[cid][lang];
    const flag = cid === 'c2' ? ' — REQUIERE REVISIÓN LEGAL ANTES DE PUBLICAR' : cid === 'c3' ? ' — NO PUBLICAR hasta confirmar la foto (ver sección 1)' : '';
    push(`### ${cid.toUpperCase()} · ${c.title[lang]} · ${LANG[lang]}${flag}`);
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

push('## 5. Reglas aplicadas (veto legal)');
push();
push('- Cero cifras de rechazo de calor, TSER, UV, durabilidad, años de garantía, "de por vida", "9H", "anti-rayones", porcentajes de satisfacción, número de clientes o reseñas. Cero precios.');
push('- **Ninguna frase afirma que la película, el tono o la instalación sean "legales"**: se afirma un proceso ("te explicamos los límites por ventana"). La legalidad es de la ventana terminada (vidrio + película).');
push('- Cero renders o fotos fabricados de autos con tint/cerámico presentados como trabajo del cliente; cero antes/después. Los gráficos son esquemáticos.');
push('- Sin escasez ni urgencia ("últimos cupos", contadores). Se usa "Citas sujetas a disponibilidad" / "Appointments subject to availability" (en el copy de anuncio se conserva "Sujeto a disponibilidad" donde la redacción aprobada lo trae).');
push('- Sin botes ni embarcaciones: alcance solo automóviles. Sin película de parabrisas completo: el parabrisas se describe como "franja transparente superior".');
push('- Los únicos porcentajes del paquete están en los SVG web `fl-windows-map` y `vlt-scale`, ambos en revisión legal. Las piezas C2 no llevan porcentajes.');
push('- Terminología: "película cerámica" (vidrios) frente a "recubrimiento cerámico" (pintura), sin mezclarlos; en español "polarizado". Zona: "Sarasota · Bradenton · Tampa" (+ "y alrededores / and nearby").');
push();

push('## 6. Verificaciones realizadas');
push();
push('- **Lint de copy** (`audit.mjs`): `copy.mjs`, plantillas y SVG web sin las frases vetadas de legalidad de película/tono, sin la variante de zona con "Bay" y sin muestra de 5 % en `vlt-scale`.');
push('- Render con Chrome headless, Outfit e Inter desde Google Fonts (`display=swap`) y `--virtual-time-budget`; `audit.mjs` confirma `document.fonts` (Outfit 800 e Inter 600 cargadas) en las 24 piezas.');
push('- Contraste WCAG medido sobre el píxel real: cada caja de texto se compara con el fondo renderizado SIN texto (percentil 2 del peor píxel). Resultado: mínimo ' + (audit.length ? Math.min(...audit.map((r) => r.minContrast)).toFixed(2) : '—') + ':1 (criterio del paquete 4.5:1 en todo el texto; AA exige 3:1 para texto grande).');
push('- Área de texto (unión de cajas de línea, incluye CTA, dominio y notas): máximo ' + (audit.length ? Math.max(...audit.map((r) => r.textAreaPct)).toFixed(1) : '—') + ' % (límite orientativo de Meta: 20 %). El texto del logo no se cuenta.');
push('- Story: ningún texto ni el logo fuera de y = 250..1670 px. Dimensiones exactas verificadas en cada PNG; OG < 250 KB.');
push('- SVG web incrustados en una página de prueba sobre #0a0e1a a 320 px y 1000 px: sin solapes de texto, sin trazos sobre texto, nada fuera del viewBox, texto ≥ 12 px a 320 px.');
push('- Revisión visual manual de las imágenes tras los cambios (textos cortados, solapes, fuentes de respaldo).');
push();

push('## 7. Pendiente de revisión legal y riesgos');
push();
push('1. **Pendiente de revisión legal**: C2 (6 PNG), `fl-windows-map` y `vlt-scale` (SVG web). Incluye la afirmación de dónde sería legal cada tono, el texto de multipropósito/clasificación del vehículo y la cita de F.S. 316.2951–316.2957 y 316.29545. El titular de C2 conserva la pregunta "¿Qué polarizado es legal en Florida?" (es la pregunta del cliente, no una promesa); si Cumplimiento la prefiere sin la palabra "legal", se cambia en `copy.mjs`.');
push('2. **C3 BLOQUEADO**: **NO PUBLICAR hasta confirmar origen real de la foto, permiso de la persona y placa visible.** `hero-finish.jpg` tiene rasgos de imagen sintética o muy retocada (matrícula con caracteres deformados, luz estilizada) y muestra a una persona identificable con uniforme de marca y una placa. Confirmar procedencia (etiquetado de contenido generado con IA en Meta) o sustituir por foto de un trabajo real.');
push('3. **Texto dentro del logo**: el logo contiene el nombre de la marca en su lettering; es el logo, no texto de los creativos. Meta puede contarlo en su estimación de texto.');
push('4. **CTA "en WhatsApp"**: requiere que `(941) 422-4405` esté activo en WhatsApp Business y que el mensaje prellenado pida fotos del vehículo.');
push('5. **Términos**: el sitio actual usa "Revestimiento cerámico" (hero) mientras el plan usa "recubrimiento cerámico"; estos creativos usan "recubrimiento cerámico". Unificar con la landing. En español se usa "Luneta" (vidrio trasero) y "polarizado".');
push('6. El azul de texto en C2 sobre fondo claro es `#0062c4` (versión más oscura del azul profundo `#0077ff`) para cumplir AA; el resto de colores son los tokens de `src/index.css`.');
push('7. Los OG de ventana y cerámico prometen "cotización gratis por foto"; deben apuntar a páginas donde ese flujo exista.');
push();

push('## 8. Regenerar');
push();
push('```bash');
push('node marketing/creatives/render.mjs      # 18 PNG + 6 JPG en out/ (necesita Chrome e internet para las fuentes)');
push('node marketing/creatives/audit.mjs       # lint, fuentes, contraste, % de texto, zonas seguras -> out/audit.json');
push('node marketing/creatives/manifest.mjs    # regenera este archivo');
push('```');
push();
push('Estructura: `templates/*.html` + `templates/base.css` (una plantilla por concepto, placeholders desde `copy.mjs`), `assets/` (copia reducida con `sips -Z 1600` y logo), `render.mjs`, `audit.mjs`, `manifest.mjs`, `out/` y `out/og/`. Para cambiar un texto, edítalo SOLO en `copy.mjs`.');

fs.writeFileSync(path.join(HERE, 'MANIFEST.md'), md);
console.log('MANIFEST.md written,', md.split('\n').length, 'lines');
