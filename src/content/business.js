/**
 * Datos del negocio que deben ser idénticos en TODOS lados (sitio, landings, datos estructurados,
 * correo, Google Business Profile). Módulo de datos puro: lo importan la app y el generador de páginas.
 * Cambiar una lista o un número aquí cambia el sitio entero. Ver docs/BRAND.md.
 */
export const BRAND_FULL = 'ShineToGo Mobile Detailing' // nombre del negocio (dominio shinetogomobiledetailing.com)
export const BRAND_SHORT = 'ShineToGo' // solo para títulos de página, donde el nombre completo no cabe

export const PHONE_DISPLAY = '(941) 422-4405'
export const PHONE_TEL = '+19414224405'
export const WA_NUMBER = '19414224405'
export const INSTAGRAM_URL = 'https://www.instagram.com/shinetogomobilecarwash'

// Zonas donde opera de verdad (confirmadas por el dueño el 5 oct 2026). "Alrededores" no se puede expresar
// en datos estructurados sin un límite: va solo en el texto.
export const PLACES = [
  { name: 'Sarasota', type: 'City', county: 'Sarasota County' },
  { name: 'Bradenton', type: 'City', county: 'Manatee County' },
  { name: 'Venice', type: 'City', county: 'Sarasota County' },
  { name: 'St. Petersburg', type: 'City', county: 'Pinellas County' },
  { name: 'Longboat Key', type: 'City' }, // el pueblo abarca los condados de Manatee y Sarasota: sin condado único
  { name: 'Siesta Key', type: 'Place', county: 'Sarasota County' },
  { name: 'Lido Key', type: 'Place', city: 'Sarasota' },
  { name: 'Brandon', type: 'Place', county: 'Hillsborough County' },
]
export const COUNTIES = ['Manatee County']
export const CITIES = PLACES.map((p) => p.name)
export const AREAS = [...CITIES, ...COUNTIES]

// Frase de "dónde trabajamos" como la diría una persona; las listas secas viven en el pie y en el esquema.
export const AREA_COPY = {
  en: 'We work around Sarasota and Bradenton and across Manatee County, down to Venice, out on Lido Key, Siesta Key and Longboat Key, and farther north in St. Petersburg and Brandon. If you’re not sure we reach you, send your ZIP code and we’ll tell you.',
  es: 'Trabajamos en Sarasota y Bradenton y por todo Manatee County, hasta Venice por el sur, en Lido Key, Siesta Key y Longboat Key, y más al norte en St. Petersburg y Brandon. Si no sabes si llegamos a tu zona, mándanos tu ZIP code y te decimos.',
}
