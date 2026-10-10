import type { Language } from "../i18n/LanguageContext";

/**
 * Catálogo de servicios. Editar aquí para cambiar nombre, precio, duración
 * o disponibilidad — no está escrito dentro de los componentes.
 *
 * `price` y `duration` en `null` significan "todavía no confirmado":
 * la UI debe mostrar "a confirmar" en vez de inventar un valor.
 *
 * El nombre base (`name`) es el texto en español — es el que usan
 * `getServiceById` y el resto de la lógica (nunca el id). La traducción
 * al inglés vive en `SERVICE_NAMES_EN`, indexada por `id`, para no
 * duplicar todo el array solo por el idioma.
 */
export interface Service {
  id: string;
  name: string;
  /** Precio en euros, o null si aún no está confirmado. */
  price: number | null;
  /** Duración en minutos, o null si aún no está confirmada. */
  duration: number | null;
  popular?: boolean;
  /** Etiqueta corta opcional (ej. "Popular", "Nuevo"). */
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
];

const SERVICE_NAMES_EN: Record<string, string> = {
  "corte-caballero": "Gentleman's Cut",
  "corte-cejas": "Cut + Eyebrows",
  "corte-barba-cejas": "Cut + Beard + Eyebrows",
  "corte-barba": "Cut + Beard",
  "corte-diseno": "Cut + Design",
};

export const popularServices = services.filter((service) => service.popular);
export const otherServices = services.filter((service) => !service.popular);

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getServiceName(service: Service, language: Language): string {
  if (language === "es") return service.name;
  return SERVICE_NAMES_EN[service.id] ?? service.name;
}

export function formatPrice(price: number | null, language: Language = "es"): string {
  if (price === null) return language === "es" ? "Precio a confirmar" : "Price to be confirmed";
  if (language === "es") return `${price.toFixed(2).replace(".", ",")} €`;
  return `€${price.toFixed(2)}`;
}

export function formatDuration(duration: number | null, language: Language = "es"): string {
  if (duration === null) return language === "es" ? "Duración a confirmar" : "Duration to be confirmed";
  return `${duration} min`;
}
