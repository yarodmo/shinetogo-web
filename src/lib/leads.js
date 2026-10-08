import { API_URL } from './site'
import { getAttribution } from './track'

export function newLeadId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  // Respaldo para navegadores antiguos (formato UUID v4)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/**
 * Envía el lead y solo resuelve cuando el servidor lo confirmó (200).
 * Reusar el mismo lead_id en un reintento evita duplicados.
 */
export async function submitLead(payload) {
  const body = { ...payload, attribution: getAttribution() }
  let res
  try {
    res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined,
    })
  } catch (cause) {
    const err = new Error('network')
    err.kind = 'network'
    err.cause = cause
    throw err
  }
  let data = {}
  try { data = await res.json() } catch { /* respuesta sin JSON */ }
  if (!res.ok || !data.success) {
    const err = new Error(data.error || `http_${res.status}`)
    err.kind = res.status === 400 ? 'validation' : res.status === 429 ? 'rate' : 'server'
    err.fields = data.fields || {}
    throw err
  }
  return data
}
