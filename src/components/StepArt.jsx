/**
 * Ilustraciones de «Cómo funciona»: una por paso, mismo trazo, mismos colores de marca.
 * Son dibujos, no fotos: no pretenden ser trabajos reales de nadie. Decorativas (aria-hidden): el paso lo dice el texto.
 * Color de línea = currentColor (--text-light), acento azul y dorado de la marca.
 */
const ACCENT = 'var(--brand-blue)'
const GOLD = 'var(--brand-gold)'

const common = { viewBox: '0 0 96 96', fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' }

// 1 · Pedir la cotización: un celular que toma la foto y la burbuja de mensaje que sale hacia el negocio.
const Quote = () => (
  <svg {...common}>
    <rect x="18" y="12" width="38" height="68" rx="7" />
    <circle cx="37" cy="40" r="11" fill={ACCENT} fillOpacity=".22" stroke={ACCENT} />
    <circle cx="37" cy="40" r="4" fill={ACCENT} stroke="none" />
    <path d="M31 70h12" />
    <path d="M52 52h30a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H70l-8 8v-8h-10a5 5 0 0 1-5-5V57a5 5 0 0 1 5-5Z" fill={GOLD} fillOpacity=".2" stroke={GOLD} />
    <path d="M58 61h20M58 68h12" stroke={GOLD} />
  </svg>
)

// 2 · Llegamos: la camioneta llegando por el camino.
const Arrive = () => (
  <svg {...common}>
    <path d="M8 66V40a5 5 0 0 1 5-5h38a5 5 0 0 1 5 5v26" />
    <path d="M56 46h14l14 12v8H56Z" fill={ACCENT} fillOpacity=".2" stroke={ACCENT} />
    <path d="M8 66h8m22 0h12m22 0h12" />
    <circle cx="27" cy="68" r="8" fill="var(--bg-card, #111827)" />
    <circle cx="27" cy="68" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="71" cy="68" r="8" fill="var(--bg-card, #111827)" />
    <circle cx="71" cy="68" r="2.5" fill="currentColor" stroke="none" />
    <path d="M10 84h20m10 0h14m10 0h22" stroke={GOLD} strokeDasharray="1 7" />
    <path d="M18 50h24" stroke={ACCENT} />
  </svg>
)

// 3 · El trabajo: un carro de lado que queda con brillo.
const Work = () => (
  <svg {...common}>
    <path d="M8 66v-9c0-3 2-5 5-6l13-3 9-11c2-2 3-3 6-3h22c3 0 5 1 7 3l9 11 7 2c3 1 4 3 4 6v10" />
    <path d="M32 48l7-10h18v10Z" fill={ACCENT} fillOpacity=".22" stroke={ACCENT} />
    <path d="M63 48V38h6l8 10Z" fill={ACCENT} fillOpacity=".22" stroke={ACCENT} />
    <path d="M8 66h8m24 0h20m24 0h4" />
    <circle cx="28" cy="68" r="8" fill="var(--bg-card, #111827)" />
    <circle cx="28" cy="68" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="72" cy="68" r="8" fill="var(--bg-card, #111827)" />
    <circle cx="72" cy="68" r="2.5" fill="currentColor" stroke="none" />
    <path d="M22 18v12M16 24h12" stroke={GOLD} />
    <path d="M52 10v8M48 14h8" stroke={GOLD} />
    <path d="M80 22v12M74 28h12" stroke={GOLD} />
    <path d="M44 56h14" stroke={GOLD} />
  </svg>
)

// 4 · Revisión y pago: la lista revisada y la moneda.
const Done = () => (
  <svg {...common}>
    <rect x="16" y="14" width="46" height="62" rx="6" />
    <rect x="29" y="8" width="20" height="12" rx="4" fill="var(--bg-card, #111827)" />
    <path d="M26 44l8 8 14-16" stroke={ACCENT} strokeWidth="4" />
    <path d="M26 62h22" strokeOpacity=".6" />
    <circle cx="68" cy="66" r="17" fill={GOLD} fillOpacity=".22" stroke={GOLD} />
    <path d="M68 57v18M73 61.5c-1-2-3-3-5-3-3 0-5 1.6-5 3.8 0 5 10 2.6 10 7.7 0 2.2-2 3.8-5 3.8-2 0-4-1-5-3" stroke={GOLD} strokeWidth="2.5" />
  </svg>
)

const ART = { 1: Quote, 2: Arrive, 3: Work, 4: Done }

export default function StepArt({ n }) {
  const Art = ART[n]
  return <div className="step-art">{Art ? <Art /> : null}</div>
}
