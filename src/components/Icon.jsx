/**
 * Iconos de línea del sitio: un solo set, mismo trazo (1.75), color heredado (currentColor).
 * Reemplazan a los emojis, que se veían distintos en cada sistema y mezclaban estilos.
 * Decorativos por defecto (aria-hidden): el texto de al lado dice lo que significa.
 */
const PATHS = {
  // contacto
  whatsapp: <><path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6Z" /><path d="M9 8.6c0 3.6 2.8 6.4 6.4 6.4l1.3-1.6-2.2-1.1-1 1c-1.2-.5-2.1-1.4-2.6-2.6l1-1-1.1-2.2Z" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  camera: <><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13.5" r="3.5" /></>,
  // negocio
  car: <><path d="M3 16v-3.5l2-5A2 2 0 0 1 6.9 6h10.2A2 2 0 0 1 19 7.5l2 5V16" /><path d="M3 16h18v2H3Z" /><circle cx="7.5" cy="13" r="1" /><circle cx="16.5" cy="13" r="1" /></>,
  boat: <><path d="M3 15l2 5h14l2-5Z" /><path d="M12 3v12M12 4l6 9h-6" /></>,
  pin: <><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  // Florida
  bug: <><ellipse cx="12" cy="14" rx="4" ry="5.5" /><path d="M12 8.5V20M8 11 4 9M16 11l4-2M8 15H4M16 15h4M9 6l-1.5-2.5M15 6l1.5-2.5" /></>,
  waves: <><path d="M2 8c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" /><path d="M2 13c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" /><path d="M2 18c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  // utilidades
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  sparkle: <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />,
}

export default function Icon({ name, size = 22, strokeWidth = 1.75, className, label }) {
  const glyph = PATHS[name]
  if (!glyph) return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true', focusable: 'false' })}>
      {glyph}
    </svg>
  )
}
