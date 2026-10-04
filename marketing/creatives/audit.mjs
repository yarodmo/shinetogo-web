#!/usr/bin/env node
/**
 * Audits every creative from the real rendered DOM + pixels (no dependencies):
 *   - fonts: Outfit and Inter actually loaded (not the system fallback)
 *   - WCAG contrast of every text box against the REAL background pixels (page rendered with the text made
 *     transparent, then the worst 2nd-percentile pixel behind each text box is compared with the text color)
 *   - text area (union of text boxes / canvas) for the ~20 % Meta guideline
 *   - safe zone for stories (y 250..1670), canvas bounds, side margins, text/text overlaps
 *   - copy lint: banned phrases (legality claims about films/shades, "Tampa Bay", a 5 % VLT sample) in copy.mjs, templates and the web SVGs
 * Writes out/audit.json and prints a table. Exit code 1 if any hard failure.
 *
 *   node marketing/creatives/audit.mjs [--only c1|c2|c3|og]
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { variants, buildHtml, screenshot, pool, CHROME, OUT, BUILD, HERE } from './render.mjs';

const MEASURE = `
<script>
(async () => {
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 400));
  const out = { fonts: { outfit: document.fonts.check('800 40px Outfit'), inter: document.fonts.check('600 28px Inter') }, text: [], boxes: [] };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const t = n.textContent.trim();
    if (!t) continue;
    const el = n.parentElement;
    if (['SCRIPT', 'STYLE', 'TITLE'].includes(el.tagName)) continue;
    const cs = getComputedStyle(el);
    const range = document.createRange();
    range.selectNodeContents(n);
    const rects = [...range.getClientRects()].filter(r => r.width > 1 && r.height > 1).map(r => [r.left, r.top, r.right, r.bottom]);
    if (!rects.length) continue;
    out.text.push({ t: t.slice(0, 60), rects, color: (el instanceof SVGElement) ? cs.fill : cs.color, size: parseFloat(cs.fontSize), weight: cs.fontWeight, family: cs.fontFamily.split(',')[0].replace(/['"]/g, '') });
  }
  document.querySelectorAll('.badge').forEach(b => { const r = b.getBoundingClientRect(); if (r.width) out.boxes.push({ name: 'badge', r: [r.left, r.top, r.right, r.bottom] }); });
  const pre = document.createElement('pre');
  pre.id = 'audit';
  pre.textContent = JSON.stringify(out);
  document.body.appendChild(pre);
})();
</script>`;

const HIDE_TEXT = `<style>*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}svg text,svg tspan{fill:transparent!important}</style>`;

function dumpDom(htmlFile, w, h, profile) {
  return new Promise((resolve) => {
    const p = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profile}`, '--virtual-time-budget=6000', `--window-size=${w},${h}`, '--dump-dom', pathToFileURL(htmlFile).href], { stdio: ['ignore', 'pipe', 'ignore'] });
    let out = '';
    const t = setTimeout(() => { p.kill('SIGKILL'); resolve(out); }, 90000);
    p.stdout.on('data', (d) => { out += d; if (out.includes('</html>')) { clearTimeout(t); p.kill('SIGKILL'); resolve(out); } });
    p.on('close', () => { clearTimeout(t); resolve(out); });
  });
}

function decodePng(buf) {
  let pos = 8, w, h, ct;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); ct = data[9]; if (data[8] !== 8 || data[12] !== 0) throw new Error('unsupported PNG'); }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const bpp = { 0: 1, 2: 3, 4: 2, 6: 4 }[ct];
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * bpp;
  const px = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    const src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[y * stride + x - bpp] : 0;
      const b = y > 0 ? px[(y - 1) * stride + x] : 0;
      const c = x >= bpp && y > 0 ? px[(y - 1) * stride + x - bpp] : 0;
      let v = src[x];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      px[y * stride + x] = v & 255;
    }
  }
  return { w, h, bpp, px };
}

const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
const parseColor = (s) => { const m = (s || '').match(/[\d.]+/g); return m ? m.map(Number) : [255, 255, 255, 1]; };

function contrastFor(img, rect, color) {
  const [x0, y0, x1, y1] = rect.map((v, i) => Math.max(0, Math.min(i % 2 ? img.h : img.w, Math.round(v))));
  const [tr, tg, tb, ta = 1] = parseColor(color);
  const tl = lum(tr, tg, tb);
  const ratios = [];
  for (let y = y0; y < y1; y += 2) {
    for (let x = x0; x < x1; x += 2) {
      const i = (y * img.w + x) * img.bpp;
      const r = img.px[i], g = img.px[i + 1], b = img.px[i + 2];
      // composite translucent text over this pixel
      const cr = tr * ta + r * (1 - ta), cg = tg * ta + g * (1 - ta), cb = tb * ta + b * (1 - ta);
      ratios.push(ratio(lum(cr, cg, cb), lum(r, g, b)));
    }
  }
  if (!ratios.length) return null;
  ratios.sort((a, b) => a - b);
  return { min: ratios[0], p2: ratios[Math.floor(ratios.length * 0.02)] };
}

const tight = (r, size) => { const c = (r[1] + r[3]) / 2, h = size * 0.8; return [r[0], c - h / 2, r[2], c + h / 2]; };

function unionArea(rectsList, W, H) {
  const s = 2, gw = Math.ceil(W / s), gh = Math.ceil(H / s);
  const g = new Uint8Array(gw * gh);
  for (const [l, t, r, b] of rectsList) {
    for (let y = Math.max(0, Math.floor(t / s)); y < Math.min(gh, Math.ceil(b / s)); y++)
      for (let x = Math.max(0, Math.floor(l / s)); x < Math.min(gw, Math.ceil(r / s)); x++) g[y * gw + x] = 1;
  }
  let c = 0;
  for (let i = 0; i < g.length; i++) c += g[i];
  return (c * s * s) / (W * H);
}

async function auditOne(v, profile) {
  const base = path.join(BUILD, `audit-${v.id}`);
  fs.mkdirSync(BUILD, { recursive: true });
  const html = buildHtml(v);
  const fMeasure = `${base}.measure.html`;
  const fHide = `${base}.hide.html`;
  fs.writeFileSync(fMeasure, html.replace('</body>', `${MEASURE}</body>`));
  fs.writeFileSync(fHide, html.replace('</head>', `${HIDE_TEXT}</head>`));

  const dom = await dumpDom(fMeasure, v.w, v.h, profile);
  const m = dom.match(/<pre id="audit">([\s\S]*?)<\/pre>/);
  if (!m) return { id: v.id, failures: ['audit script produced no output'], warnings: [] };
  const data = JSON.parse(m[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'));

  const png = `${base}.hide.png`;
  if (!(await screenshot(fHide, png, v.w, v.h, profile))) return { id: v.id, failures: ['no text-hidden screenshot'], warnings: [] };
  const img = decodePng(fs.readFileSync(png));

  const failures = [], warnings = [];
  if (!data.fonts.outfit || !data.fonts.inter) failures.push(`fonts not loaded (Outfit=${data.fonts.outfit}, Inter=${data.fonts.inter})`);

  let worst = { ratio: 99, t: '' };
  const allRects = [];
  for (const t of data.text) {
    if (!/^(Outfit|Inter)$/.test(t.family)) warnings.push(`font "${t.family}" on "${t.t}"`);
    for (const r of t.rects) {
      allRects.push(r);
      const c = contrastFor(img, r, t.color);
      if (c && c.p2 < worst.ratio) worst = { ratio: c.p2, t: t.t, size: t.size };
      const large = t.size >= 24 || (t.size >= 18.66 && Number(t.weight) >= 700);
      const need = large ? 3 : 4.5;
      if (c && c.p2 < 4.5) {
        // stricter than WCAG for large text: we want 4.5:1 everywhere, 3:1 is only tolerated for large display text
        (c.p2 < need ? failures : warnings).push(`contrast ${c.p2.toFixed(2)}:1 "${t.t}" (${t.size}px)`);
      }
      const [l, tp, rr, b] = r;
      if (l < -1 || tp < -1 || rr > v.w + 1 || b > v.h + 1) failures.push(`text outside canvas: "${t.t}"`);
      else if (l < 40 || rr > v.w - 40) warnings.push(`tight side margin (${Math.round(Math.min(l, v.w - rr))}px): "${t.t}"`);
      if (v.fmt === 'story' && (tp < 250 || b > 1670)) failures.push(`story safe zone: "${t.t}" y=${Math.round(tp)}..${Math.round(b)}`);
    }
  }
  if (v.fmt === 'story') for (const bx of data.boxes) if (bx.r[1] < 250 || bx.r[3] > 1670) failures.push(`story safe zone: logo badge y=${Math.round(bx.r[1])}..${Math.round(bx.r[3])}`);

  // text/text overlaps between different strings
  for (let i = 0; i < data.text.length; i++) for (let j = i + 1; j < data.text.length; j++)
    for (const a of data.text[i].rects) for (const b of data.text[j].rects) {
      // compare glyph-height bands (0.8 em, centred in the line box), not the taller CSS content boxes
      const ta = tight(a, data.text[i].size), tb = tight(b, data.text[j].size);
      const ox = Math.min(ta[2], tb[2]) - Math.max(ta[0], tb[0]), oy = Math.min(ta[3], tb[3]) - Math.max(ta[1], tb[1]);
      if (ox > 2 && oy > 2) failures.push(`text overlap: "${data.text[i].t}" / "${data.text[j].t}"`);
    }

  const area = unionArea(allRects, v.w, v.h);
  if (area > 0.2) failures.push(`text area ${(area * 100).toFixed(1)}% > 20%`);
  return { id: v.id, kind: v.kind, textAreaPct: +(area * 100).toFixed(1), minContrast: +worst.ratio.toFixed(2), minContrastText: worst.t, minFontPx: Math.min(...data.text.map((t) => t.size)), fonts: data.fonts, failures: [...new Set(failures)], warnings: [...new Set(warnings)] };
}


// ---------- compliance lint (round 2: no "legal films / legal shade", no "Tampa Bay", no 5 % VLT sample) ----------
const BANNED = [
  [/legal\s+films?/i, 'legal films'],
  [/pel[ií]culas?\s+legales?/i, 'películas legales'],
  [/tono\s+legal/i, 'tono legal'],
  [/legal\s+shade/i, 'legal shade'],
  [/tampa\s+bay/i, '"Tampa Bay"'],
];
function lint() {
  const out = [];
  const files = [path.join(HERE, 'copy.mjs')];
  const tpl = path.join(HERE, 'templates');
  for (const f of fs.readdirSync(tpl)) files.push(path.join(tpl, f));
  const svgDir = path.resolve(HERE, '..', '..', 'src', 'assets', 'protection');
  if (fs.existsSync(svgDir)) for (const f of fs.readdirSync(svgDir)) if (f.endsWith('.svg')) files.push(path.join(svgDir, f));
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8').split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');
    for (const [re, name] of BANNED) if (re.test(text)) out.push(`${path.relative(HERE, f)}: banned phrase ${name}`);
    if (/vlt-scale/.test(f) && /(^|[^0-9])5(\u00a0| )?%/.test(text.replace(/<desc[\s\S]*?<\/desc>/, ''))) out.push(`${path.relative(HERE, f)}: still contains a 5 % sample`);
  }
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
  const todo = variants().filter((v) => !only || v.concept === only);
  const tmpBase = fs.mkdtempSync(path.join(process.env.CREATIVES_TMP || os.tmpdir(), 'audit-'));
  const results = [];
  await pool(todo, Number(process.env.CONCURRENCY || 3), async (v, i, wi) => {
    results[i] = await auditOne(v, path.join(tmpBase, `p${wi}`));
  });
  fs.rmSync(tmpBase, { recursive: true, force: true });
  fs.rmSync(BUILD, { recursive: true, force: true });

  let bad = 0;
  const lintFails = lint();
  console.log(lintFails.length ? 'COPY LINT: FAIL' : 'COPY LINT: ok (no banned phrases in copy.mjs, templates, web SVGs)');
  for (const f of lintFails) { bad++; console.log('    FAIL', f); }
  console.log('id'.padEnd(46), 'text%'.padStart(6), 'minCR'.padStart(7), 'minPx'.padStart(6), ' result');
  for (const r of results) {
    const status = r.failures.length ? 'FAIL' : r.warnings.length ? 'warn' : 'ok';
    if (r.failures.length) bad++;
    console.log(r.id.padEnd(46), String(r.textAreaPct ?? '-').padStart(6), String(r.minContrast ?? '-').padStart(7), String(r.minFontPx ?? '-').padStart(6), ' ' + status);
    for (const f of r.failures) console.log('    FAIL', f);
    for (const w of r.warnings) console.log('    warn', w);
  }
  if (!only) fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(results, null, 2) + '\n');
  process.exit(bad ? 1 : 0);
}

main();
