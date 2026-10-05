// Mensajería mínima entre las secciones y el formulario (sin dependencias).
let state = {}
const listeners = new Set()

export const prefill = {
  set(next) {
    state = { ...state, ...next }
    listeners.forEach((fn) => fn(state))
  },
  get: () => state,
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}

const SERVICES = ['express', 'full', 'premium', 'tint', 'ceramic', 'boat']
const FILMS = ['carbon', 'ceramic', 'unsure']

/**
 * Las páginas informativas (polarizado, cerámico) mandan a la cotización de la home con el servicio ya elegido:
 *   /?service=tint#contact      /es/?service=ceramic&film=ceramic#contact
 * Solo se aceptan valores conocidos; cualquier otra cosa se ignora.
 */
export function prefillFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search)
    const service = params.get('service')
    const film = params.get('film')
    if (SERVICES.includes(service)) prefill.set({ service, ...(FILMS.includes(film) && { film }) })
  } catch { /* sin URL legible: no hay nada que preseleccionar */ }
}
