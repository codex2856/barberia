/**
 * Catálogo de servicios. Editar aquí para cambiar nombre, precio, duración
 * o disponibilidad — no está escrito dentro de los componentes.
 *
 * `price` y `duration` en `null` significan "todavía no confirmado":
 * la UI debe mostrar "a confirmar" en vez de inventar un valor.
 */
export interface Service {
  id: string;
  name: string;
  /** Precio en euros, o null si aún no está confirmado. */
  price: number | null;
  /** Duración en minutos, o null si aún no está confirmada. */
  duration: number | null;
  popular?: boolean;
  /** Etiqueta corta opcional (ej. "Edición Navidad"). */
  badge?: string;
}

export const services: Service[] = [
  {
    id: "corte-caballero",
    name: "Corte caballero",
    price: 18,
    duration: 30,
    popular: true,
  },
  {
    id: "corte-cejas",
    name: "Corte + cejas",
    price: 19,
    duration: 30,
    popular: true,
  },
  {
    id: "corte-barba-cejas",
    name: "Corte + barba + cejas",
    price: 23,
    duration: 30,
    popular: true,
  },
  {
    id: "corte-barba",
    name: "Corte + barba",
    price: 22,
    duration: 30,
  },
  {
    id: "corte-diseno",
    name: "Corte + diseño",
    price: 21,
    duration: 30,
  },
  {
    id: "corte-navidad",
    name: "Corte navidad",
    price: 25,
    duration: 30,
    badge: "Edición navidad",
  },
  {
    id: "corte-barba-navidad",
    name: "Corte + barba navidad",
    price: 25,
    duration: 30,
    badge: "Edición navidad",
  },
  {
    id: "corte-barba-cejas-navidad",
    name: "Corte + barba + cejas navidad",
    price: 30,
    duration: 30,
    badge: "Edición navidad",
  },
  {
    id: "corte-fin-de-ano",
    name: "Corte fin de año",
    price: 30,
    duration: 30,
    badge: "Edición fin de año",
  },
  {
    id: "corte-barba-fin-de-ano",
    name: "Corte + barba fin de año",
    // Precio y duración todavía no confirmados — no inventar.
    price: null,
    duration: null,
    badge: "Edición fin de año",
  },
];

export const popularServices = services.filter((service) => service.popular);
export const otherServices = services.filter((service) => !service.popular);

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Precio a confirmar";
  return `${price.toFixed(2).replace(".", ",")} €`;
}

export function formatDuration(duration: number | null): string {
  if (duration === null) return "Duración a confirmar";
  return `${duration} min`;
}
