'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { clean } = require('./lead')

/**
 * Resultados de cada lead (cerrar el circuito): el archivo de leads dice QUIÉN llegó y DE DÓNDE; este módulo
 * guarda QUÉ PASÓ después (contactado, cotizado, agendado, ganado, perdido) y arma el reporte que dice qué fuente
 * y qué servicio traen clientes de verdad, no solo formularios.
 *
 * Archivo de resultados: solo se agrega al final (NDJSON), junto al de leads. Nunca se edita ni se borra una línea:
 * si te equivocas, anotas el resultado correcto después. Para el desenlace manda el último won/lost.
 */

const STAGES = ['contacted', 'quoted', 'booked', 'won', 'lost']
const LOST_REASONS = ['price', 'no_reply', 'timing', 'out_of_area', 'not_a_fit', 'went_elsewhere', 'other']
// Un lead cuenta como atendido en cuanto hay cualquiera de estas etapas.
const RESPONSE_STAGES = ['contacted', 'quoted', 'booked', 'won']
// Con menos leads que esto, las tasas por fuente o servicio son ruido.
const MIN_LEADS_FOR_CONCLUSIONS = 30
const LOW_N = 20
const UNWORKED_AFTER_HOURS = 48

// Florida: los días del reporte y las horas que se anotan a mano se leen en hora del negocio, no en UTC.
const BUSINESS_TZ = 'America/New_York'

const outcomesPathFor = (leadsFile) => path.join(path.dirname(leadsFile), 'lead-outcomes.ndjson')

const tzParts = (utcMs, timeZone) => Object.fromEntries(
  new Intl.DateTimeFormat('en-US', { timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    .formatToParts(new Date(utcMs)).map((p) => [p.type, p.value]),
)
const tzOffsetMs = (utcMs, timeZone) => {
  const p = tzParts(utcMs, timeZone)
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(utcMs / 1000) * 1000
}
/** Día calendario (YYYY-MM-DD) de un instante, en hora de Florida. */
const dayInBusinessTz = (iso) => new Intl.DateTimeFormat('en-CA', { timeZone: BUSINESS_TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso))

/**
 * Hora para --at. Con zona (Z o ±hh:mm) se respeta; sin zona ("2026-10-05 14:03") se lee en hora de Florida.
 */
function parseAt(text) {
  const str = String(text || '').trim()
  if (/(Z|[+-]\d{2}:?\d{2})$/.test(str) && !Number.isNaN(Date.parse(str))) return new Date(str)
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/)
  if (!m) throw new Error('--at must look like "2026-10-05 14:03" (Florida time) or include a zone like 2026-10-05T14:03:00-04:00')
  const [y, mo, d, h, mi] = m.slice(1).map(Number)
  const guess = Date.UTC(y, mo - 1, d, h, mi)
  let t = guess - tzOffsetMs(guess, BUSINESS_TZ)
  t = guess - tzOffsetMs(t, BUSINESS_TZ)
  return new Date(t)
}

function checkDay(label, value) {
  if (value === undefined) return
  const ok = /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(`${value}T00:00:00Z`).toISOString().startsWith(value)
  if (!ok) throw new Error(`${label} must be a date like YYYY-MM-DD (got "${value}")`)
}

function readNdjson(file) {
  if (!fs.existsSync(file)) return { items: [], skipped: 0 }
  const items = []
  let skipped = 0
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue
    try {
      const v = JSON.parse(line)
      if (v && typeof v === 'object' && !Array.isArray(v)) items.push(v)
      else skipped += 1
    } catch { skipped += 1 }
  }
  return { items, skipped }
}
const readLeads = readNdjson
const readOutcomes = readNdjson

/** Acepta el id completo o los primeros 8 caracteres (los que van entre corchetes en el asunto del correo). */
function resolveLeadId(leads, prefix) {
  const p = String(prefix || '').trim().toLowerCase()
  if (p.length < 8) throw new Error('Use at least the first 8 characters of the lead id (the [xxxxxxxx] in the email subject).')
  const ids = [...new Set(leads.map((l) => String(l.lead_id || '').toLowerCase()))].filter((id) => id.startsWith(p))
  if (ids.length === 0) throw new Error(`Lead not found: ${p}`)
  if (ids.length > 1) throw new Error(`Ambiguous id ${p}: matches ${ids.length} leads, use more characters`)
  return ids[0]
}

function recordOutcome(leadsFile, idOrPrefix, { stage, value, reason, note, at, now = new Date() } = {}) {
  if (!STAGES.includes(stage)) throw new Error(`Invalid stage "${stage}". Use one of: ${STAGES.join(', ')}`)
  if (stage === 'lost' && !LOST_REASONS.includes(reason)) throw new Error(`A lost lead needs a reason: ${LOST_REASONS.join(', ')}`)
  if (stage !== 'lost' && reason) throw new Error('reason only applies to stage "lost"')
  if (value !== undefined && stage !== 'won') throw new Error('value only applies to stage "won"')
  if (value !== undefined && !(typeof value === 'number' && Number.isFinite(value) && value >= 0)) throw new Error('value must be a number of dollars, 0 or more')

  const leads = readLeads(leadsFile).items
  const leadId = resolveLeadId(leads, idOrPrefix)
  // `at` deja anotar una llamada que ya pasó. Sin él, la hora es la de ahora: la velocidad de respuesta del reporte
  // sale de aquí, así que anota el contacto cuando ocurre o usa --at.
  let when = now
  if (at !== undefined) {
    when = at instanceof Date ? at : parseAt(at)
    const created = Date.parse(leads.find((l) => l.lead_id === leadId).created_at)
    if (when.getTime() < created - 60000) throw new Error('--at is before the lead arrived')
    if (when.getTime() > now.getTime() + 60000) throw new Error('--at is in the future')
  }
  const record = {
    lead_id: leadId,
    stage,
    at: when.toISOString(),
    ...(value !== undefined && { value_usd: value }),
    ...(reason && { reason }),
    ...(note && { note: clean(note, 300) }),
  }
  const file = outcomesPathFor(leadsFile)
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 })
  fs.appendFileSync(file, JSON.stringify(record) + '\n', { mode: 0o600 })
  return record
}

function sourceOf(lead) {
  const a = lead.attribution || {}
  const medium = a.utm_medium ? String(a.utm_medium).toLowerCase() : ''
  if (a.utm_source) return `${String(a.utm_source).toLowerCase()} / ${medium || '(none)'}`
  if (a.gclid || a.gbraid || a.wbraid) return 'google / (gclid)'
  if (a.fbclid) return 'meta / (fbclid)'
  if (a.referrer) {
    try { return `${new URL(a.referrer).hostname.replace(/^www\./, '')} / referral` } catch { /* referrer ilegible */ }
  }
  return 'direct'
}

const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0)
const median = (xs) => {
  if (!xs.length) return null
  const s = [...xs].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2)
}

function buildReport({ leadsFile, outcomesFile = outcomesPathFor(leadsFile), from, to, now = new Date() } = {}) {
  checkDay('--from', from)
  checkDay('--to', to)
  const { items: rawLeads, skipped: skippedLeads } = readLeads(leadsFile)
  const { items: rawOutcomes, skipped: skippedOutcomes } = readOutcomes(outcomesFile)

  const seen = new Set()
  const allLeads = rawLeads.filter((l) => l && l.lead_id && !seen.has(l.lead_id) && seen.add(l.lead_id))
  const leads = allLeads.filter((l) => {
    const day = dayInBusinessTz(l.created_at)
    return !(from && day < from) && !(to && day > to)
  })

  const known = new Set(allLeads.map((l) => l.lead_id))
  const byLead = new Map()
  let orphans = 0
  for (const o of rawOutcomes) {
    if (!o || !STAGES.includes(o.stage)) continue
    if (!known.has(o.lead_id)) { orphans += 1; continue }
    if (!byLead.has(o.lead_id)) byLead.set(o.lead_id, [])
    byLead.get(o.lead_id).push(o)
  }
  for (const list of byLead.values()) list.sort((a, b) => Date.parse(a.at) - Date.parse(b.at))

  const nowMs = now.getTime()
  const rows = leads.map((l) => {
    const events = byLead.get(l.lead_id) || []
    const stages = new Set(events.map((e) => e.stage))
    // Estado final: manda el último won/lost anotado (un error se corrige anotando lo contrario).
    const terminal = [...events].reverse().find((e) => e.stage === 'won' || e.stage === 'lost')
    const won = !!terminal && terminal.stage === 'won'
    const booked = won || stages.has('booked')
    const quoted = booked || stages.has('quoted')
    const contacted = quoted || stages.has('contacted')
    // La velocidad de respuesta sale SOLO de la etapa "contacted": cotizar o ganar días después no es "primer contacto".
    const firstContact = events.find((e) => e.stage === 'contacted')
    const ms = firstContact ? Math.max(0, Date.parse(firstContact.at) - Date.parse(l.created_at)) : null
    return {
      lead: l, events, contacted, quoted, booked, won,
      lost: !!terminal && terminal.stage === 'lost',
      lostReason: terminal && terminal.stage === 'lost' ? terminal.reason : undefined,
      value: won && Number.isFinite(terminal.value_usd) ? terminal.value_usd : 0,
      ms,
      ageMs: nowMs - Date.parse(l.created_at),
    }
  })

  const funnel = {
    leads: rows.length,
    contacted: rows.filter((r) => r.contacted).length,
    quoted: rows.filter((r) => r.quoted).length,
    booked: rows.filter((r) => r.booked).length,
    won: rows.filter((r) => r.won).length,
    lost: rows.filter((r) => r.lost).length,
  }

  const group = (keyFn) => {
    const map = new Map()
    for (const r of rows) {
      const key = keyFn(r.lead) || '(none)'
      if (!map.has(key)) map.set(key, { key, leads: 0, contacted: 0, quoted: 0, won: 0, lost: 0, revenue_usd: 0 })
      const g = map.get(key)
      g.leads += 1
      if (r.contacted) g.contacted += 1
      if (r.quoted) g.quoted += 1
      if (r.won) g.won += 1
      if (r.lost) g.lost += 1
      g.revenue_usd += r.value
    }
    return [...map.values()].map((g) => ({ ...g, low_n: g.leads < LOW_N })).sort((a, b) => b.leads - a.leads || a.key.localeCompare(b.key))
  }

  const answered = rows.filter((r) => r.ms !== null).map((r) => Math.round(r.ms / 60000))
  const noStamp = rows.filter((r) => r.contacted && r.ms === null).length
  // Denominador: leads con al menos esa edad. Uno que nunca se atendió cuenta en contra.
  const within = (limitMin) => {
    const eligible = rows.filter((r) => r.ageMs >= limitMin * 60000)
    if (!eligible.length) return null // todavía no hay leads con esa edad: no hay nada que medir
    return pct(eligible.filter((r) => r.ms !== null && r.ms <= limitMin * 60000).length, eligible.length)
  }
  const lostReasons = {}
  for (const r of rows) if (r.lost && r.lostReason) lostReasons[r.lostReason] = (lostReasons[r.lostReason] || 0) + 1

  const warnings = []
  if (rows.length < MIN_LEADS_FOR_CONCLUSIONS) warnings.push(`Muy pocos leads (n=${rows.length}, hacen falta ${MIN_LEADS_FOR_CONCLUSIONS}+): no saques conclusiones por fuente o servicio todavía.`)
  if (skippedLeads + skippedOutcomes) warnings.push(`Se saltaron ${skippedLeads + skippedOutcomes} líneas dañadas en los archivos.`)
  if (orphans) warnings.push(`${orphans} resultado(s) apuntan a leads que ya no están en el archivo.`)
  if (noStamp) warnings.push(`${noStamp} lead(s) llegaron a cotizado o ganado sin un "contacted" anotado: su velocidad de respuesta no se puede medir.`)
  const unworked = rows.filter((r) => r.events.length === 0 && r.ageMs >= UNWORKED_AFTER_HOURS * 3600000)
  if (unworked.length) warnings.push(`${unworked.length} lead(s) con más de ${UNWORKED_AFTER_HOURS} h sin ningún resultado registrado: o no se atendieron o no se anotó.`)

  return {
    range: { from: from || null, to: to || null },
    // La calidad del formulario (casilla, ZIP, correo, fecha) se mide solo sobre leads que vinieron del formulario.
    totals: (() => {
      const form = rows.filter((r) => !r.lead.manual)
      return {
        leads: rows.length,
        manual_leads: rows.length - form.length,
        consent_pct: pct(form.filter((r) => r.lead.consent && r.lead.consent.sms).length, form.length),
        with_zip_pct: pct(form.filter((r) => r.lead.zip).length, form.length),
        with_email_pct: pct(form.filter((r) => r.lead.email).length, form.length),
        with_date_pct: pct(form.filter((r) => r.lead.date).length, form.length),
      }
    })(),
    funnel,
    revenue_usd: rows.reduce((n, r) => n + r.value, 0),
    response: {
      median_minutes: median(answered),
      within_5_min_pct: within(5),
      within_15_min_pct: within(15),
      within_60_min_pct: within(60),
      never_contacted: rows.filter((r) => !r.contacted).length,
      measured_from: 'hora anotada de la etapa contacted (usa --at si la anotas después)',
    },
    by_source: group(sourceOf),
    by_service: group((l) => l.service),
    by_lang: group((l) => l.lang),
    by_channel: group((l) => l.channel || 'form'),
    by_landing: group((l) => l.attribution && l.attribution.landing),
    lost_reasons: lostReasons,
    unworked: unworked.map((r) => ({ lead_id: r.lead.lead_id, created_at: r.lead.created_at, service: r.lead.service, source: sourceOf(r.lead) })),
    orphan_outcomes: orphans,
    warnings,
  }
}

module.exports = {
  STAGES, LOST_REASONS, BUSINESS_TZ, outcomesPathFor, readLeads, readOutcomes, resolveLeadId, recordOutcome, sourceOf, buildReport, parseAt,
}
