/**
 * Opciones del formulario de cotización, compartidas por la home (React) y las landings (HTML generado).
 * Cada servicio pide sus propios detalles: el tint, qué vidrios y qué película; el cerámico, qué partes cubrir.
 * Los valores (primer elemento) los valida la API (api/lib/lead.js): no cambiarlos sin cambiar allá.
 */
export const FORM = {
  en: {
    windowsLabel: `Windows`,
    windows: [
      [`front_sides`, `Front side windows`],
      [`rear_sides`, `Rear side windows`],
      [`back_window`, `Back window`],
      [`windshield_strip`, `Windshield strip`],
      [`sunroof`, `Sunroof`],
      [`full_car`, `All the windows (not the windshield)`],
    ],
    filmLabel: `Film`,
    films: [[`carbon`, `Carbon film`], [`ceramic`, `Ceramic film`], [`unsure`, `Not sure, recommend one`]],
    oldTint: `I have tint to take off`,
    areasLabel: `What to cover`,
    areas: [
      [`paint`, `Paint`],
      [`glass`, `Glass`],
      [`wheels`, `Wheels and calipers`],
      [`trim`, `Exterior trim and plastics`],
      [`interior`, `Interior`],
      [`other`, `Something else`],
    ],
  },
  es: {
    windowsLabel: `Vidrios`,
    windows: [
      [`front_sides`, `Ventanas de adelante`],
      [`rear_sides`, `Ventanas de atrás`],
      [`back_window`, `Vidrio trasero`],
      [`windshield_strip`, `Franja del parabrisas`],
      [`sunroof`, `Sunroof`],
      [`full_car`, `Todas las ventanas (menos el parabrisas)`],
    ],
    filmLabel: `Película`,
    films: [[`carbon`, `Película de carbono`], [`ceramic`, `Película cerámica`], [`unsure`, `No sé, recomiéndame una`]],
    oldTint: `Tengo polarizado que quitar`,
    areasLabel: `Qué cubrir`,
    areas: [
      [`paint`, `Pintura`],
      [`glass`, `Vidrios`],
      [`wheels`, `Rines y calipers`],
      [`trim`, `Molduras y plásticos de afuera`],
      [`interior`, `Interior`],
      [`other`, `Otra cosa`],
    ],
  },
}
