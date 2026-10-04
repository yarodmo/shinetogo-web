import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

// Páginas HTML de entrada. Las genera scripts/build-landings.mjs (npm run build las regenera).
const PAGES = {
  main: 'index.html',
  es: 'es/index.html',
  windowTint: 'window-tint/index.html',
  ceramicCoating: 'ceramic-coating/index.html',
  polarizado: 'es/polarizado-de-vidrios/index.html',
  recubrimientoCeramico: 'es/recubrimiento-ceramico/index.html',
  privacy: 'privacy/index.html',
  privacidad: 'es/privacidad/index.html',
}

const input = Object.fromEntries(
  Object.entries(PAGES).map(([name, file]) => {
    const abs = resolve(import.meta.dirname, file)
    if (!existsSync(abs)) throw new Error(`Falta ${file}. Ejecuta: node scripts/build-landings.mjs`)
    return [name, abs]
  }),
)

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: { input },
  }
})
