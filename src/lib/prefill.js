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
