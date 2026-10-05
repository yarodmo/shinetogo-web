// Datos del negocio en un solo lugar. Cambiar aquí cambia el sitio entero.
import { BRAND_FULL, WA_NUMBER } from '../content/business.js'
export { PHONE_DISPLAY, PHONE_TEL, WA_NUMBER, AREAS, AREA_COPY, BRAND_SHORT } from '../content/business.js'

const env = import.meta.env

export const BRAND_NAME = env.VITE_BRAND_NAME || BRAND_FULL

export const API_URL = env.DEV
  ? (env.VITE_API_URL || 'http://localhost:6544/api/book')
  : (env.VITE_API_URL || 'https://api.shinetogomobiledetailing.com/api/book')

export const TRACKING = {
  gtm: env.VITE_GTM_ID || '',
  ga4: env.VITE_GA4_ID || '',
  metaPixel: env.VITE_META_PIXEL_ID || '',
}
export const HAS_TRACKING = Boolean(TRACKING.gtm || TRACKING.ga4 || TRACKING.metaPixel)

export function waLink(text) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
