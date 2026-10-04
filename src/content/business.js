/**
 * Datos del negocio que deben ser idénticos en TODOS lados (sitio, landings, datos estructurados,
 * correo, Google Business Profile). Módulo de datos puro: lo importan la app y el generador de páginas.
 * Cambiar una lista o un número aquí cambia el sitio entero. Ver docs/BRAND.md.
 */
export const PHONE_DISPLAY = '(941) 422-4405'
export const PHONE_TEL = '+19414224405'
export const WA_NUMBER = '19414224405'

// Ciudades de servicio publicadas hoy en el sitio. Pendiente de confirmar con el cliente (docs/BRAND.md).
export const CITIES = ['Sarasota', 'Bradenton', 'Tampa', 'Venice', 'St. Petersburg']
export const COUNTIES = ['Manatee County']
export const AREAS = [...CITIES, ...COUNTIES]
