#!/usr/bin/env node
/**
 * Renders the ad creatives (18 PNG) and Open Graph images (6 JPG) with headless Chrome.
 * No npm dependencies. Output: marketing/creatives/out/ and out/og/.
 *
 *   node marketing/creatives/render.mjs              # everything
 *   node marketing/creatives/render.mjs --only c2    # one concept (c1|c2|c3|og)
 *   node marketing/creatives/render.mjs --keep       # keep out/_build (filled HTML) for debugging
 *
 * Env: CHROME_PATH (default: macOS Google Chrome), CREATIVES_TMP (scratch dir for Chrome profiles),
 *      CONCURRENCY (default 3).
 * Templates (templates/*.html) use {{placeholders}} filled from copy.mjs. Fonts: Outfit + Inter from
 * Google Fonts (display=swap); each page is captured only after document.fonts reports them loaded
 * (--virtual-time-budget gives the network time to deliver them).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CONCEPTS, FORMATS, COMMON, OG } from './copy.mjs';

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const OUT = path.join(HERE, 'out');
export const BUILD = path.join(OUT, '_build');
export const ROOT = pathToFileURL(HERE).href.replace(/\/$/, '');
export const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TEMPLATES = { og: 'og.html' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Every creative to produce, with the values its template needs. */
export function variants() {
  const list = [];
  for (const [cid, c] of Object.entries(CONCEPTS)) {
    for (const [fmt, f] of Object.entries(FORMATS)) {
      for (const lang of ['en', 'es']) {
        const id = `${cid}-${c.slug}_${fmt}-${f.w}x${f.h}_${lang}`;
        list.push({
          id, kind: 'ad', concept: cid, tpl: c.template, lang, fmt, w: f.w, h: f.h,
          out: path.join(OUT, `${id}.png`),
          vars: { ...COMMON[lang], ...c.copy[lang], lang, fmt, ROOT, W: f.w, H: f.h },
        });
      }
    }
  }
  for (const [type, byLang] of Object.entries(OG)) {
    for (const lang of ['en', 'es']) {
      const id = `og-${type}_${lang}`;
      list.push({
        id, kind: 'og', concept: 'og', tpl: TEMPLATES.og, lang, fmt: 'og', w: 1200, h: 630, ogType: type,
        out: path.join(OUT, 'og', `${id}.jpg`),
        vars: { ...COMMON[lang], h: byLang[lang].h, sub: byLang[lang].sub, lang, fmt: 'og', type, ROOT, W: 1200, H: 630 },
      });
    }
  }
  return list;
}

export function fillTemplate(html, vars) {
  return html.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in vars)) throw new Error(`Template placeholder {{${k}}} has no value`);
    return k === 'ROOT' ? vars[k] : esc(vars[k]);
  });
}

export function buildHtml(v) {
  const tpl = fs.readFileSync(path.join(HERE, 'templates', v.tpl), 'utf8');
  return fillTemplate(tpl, v.vars);
}

/** Headless Chrome screenshot. Resolves true when the PNG exists and has stopped growing. */
export async function screenshot(htmlFile, pngFile, w, h, profileDir, budget = 5000) {
  try { fs.unlinkSync(pngFile); } catch { /* none */ }
  fs.mkdirSync(path.dirname(pngFile), { recursive: true });
  const args = [
    '--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--user-data-dir=${profileDir}`, `--virtual-time-budget=${budget}`, `--window-size=${w},${h}`,
    `--screenshot=${pngFile}`, pathToFileURL(htmlFile).href,
  ];
  const p = spawn(CHROME, args, { stdio: 'ignore' });
  const start = Date.now();
  let last = -1, stable = 0, ok = false;
  while (Date.now() - start < 120000) {
    await new Promise((r) => setTimeout(r, 350));
    if (fs.existsSync(pngFile)) {
      const s = fs.statSync(pngFile).size;
      if (s > 0 && s === last) { if (++stable >= 3) { ok = true; break; } } else stable = 0;
      last = s;
    }
  }
  p.kill('SIGKILL');
  return ok;
}

export function pngSize(file) {
  const b = fs.readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

function toJpeg(png, jpg, maxBytes = 250 * 1024) {
  fs.mkdirSync(path.dirname(jpg), { recursive: true });
  for (const q of [85, 82, 78, 74, 70]) {
    const r = spawnSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(q), png, '--out', jpg], { stdio: 'ignore' });
    if (r.status !== 0) throw new Error('sips failed (macOS only). Convert PNG to JPG manually.');
    if (fs.statSync(jpg).size <= maxBytes) return q;
  }
  return -1;
}

export async function pool(items, n, fn) {
  const q = [...items.entries()];
  await Promise.all(Array.from({ length: n }, async (_, wi) => {
    while (q.length) { const [i, it] = q.shift(); await fn(it, i, wi); }
  }));
}

async function main() {
  const args = process.argv.slice(2);
  const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
  const keep = args.includes('--keep');
  const conc = Number(process.env.CONCURRENCY || 3);
  if (!fs.existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME} (set CHROME_PATH)`);

  const todo = variants().filter((v) => !only || v.concept === only);
  fs.mkdirSync(path.join(OUT, 'og'), { recursive: true });
  fs.mkdirSync(BUILD, { recursive: true });
  const tmpBase = fs.mkdtempSync(path.join(process.env.CREATIVES_TMP || os.tmpdir(), 'creatives-'));

  const failures = [];
  await pool(todo, conc, async (v, i, wi) => {
    const html = path.join(BUILD, `${v.id}.html`);
    fs.writeFileSync(html, buildHtml(v));
    const profile = path.join(tmpBase, `p${wi}`);
    const png = v.kind === 'og' ? path.join(BUILD, `${v.id}.png`) : v.out;
    const ok = await screenshot(html, png, v.w, v.h, profile);
    if (!ok) { failures.push(`${v.id}: no screenshot`); return; }
    const sz = pngSize(png);
    if (sz.w !== v.w || sz.h !== v.h) { failures.push(`${v.id}: got ${sz.w}x${sz.h}, expected ${v.w}x${v.h}`); return; }
    let note = `${sz.w}x${sz.h}`;
    if (v.kind === 'og') {
      const q = toJpeg(png, v.out);
      note += ` jpg q${q} ${(fs.statSync(v.out).size / 1024).toFixed(0)} KB`;
      if (q < 0) failures.push(`${v.id}: JPG over 250 KB`);
    }
    console.log(`[${String(i + 1).padStart(2)}/${todo.length}] ${v.id} ${note}`);
  });

  fs.rmSync(tmpBase, { recursive: true, force: true });
  if (!keep) fs.rmSync(BUILD, { recursive: true, force: true });
  if (failures.length) { console.error('FAILURES:\n' + failures.join('\n')); process.exit(1); }
  console.log(`done: ${todo.length} files`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
