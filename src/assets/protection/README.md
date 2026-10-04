# Protection SVGs (Window Tint + Ceramic Coating, cars only)
Five diagrams, each in `.en.svg` and `.es.svg`: `film-layers`, `heat-path`, `vlt-scale`, `fl-windows-map`, `ceramic-layers`. `vlt-scale` and `fl-windows-map` carry percentages: LEGAL REVIEW before publishing.
Embed INLINE, never as `<img>` (fonts and CSS variables come from the page): Vite `import svg from './film-layers.en.svg?raw'` then `<div dangerouslySetInnerHTML={{ __html: svg }} />`, or paste the markup into static HTML.
They are themed with the site tokens (`--brand-blue`, `--brand-gold`, `--apex-amber`, `--titanium`, `--text-light`, `--text-muted`, `--bg-card`, `--bg-dark`), each with a hex fallback, and use real `<text>` in Outfit/Inter.
No fixed width/height: size them from the container (`svg { width: 100%; height: auto }`). Ids are unique per file, so EN and ES can be inlined together.
