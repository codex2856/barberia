import type { Language } from "../i18n/LanguageContext";

/**
 * Reseñas de ejemplo — NO son reseñas reales de clientes. Esta web es una
 * plantilla de portfolio; la sección se marca visiblemente como "EJEMPLO"
 * en `Reviews.tsx`. Para reutilizar con un negocio real, sustituir por
 * reseñas reales (o conectar con Google Reviews).
 */
export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const isReviewsPlaceholder = true;

export const reviews: Review[] = [
  {
    id: "ejemplo-1",
    author: "Carlos M.",
    rating: 5,
    text: "Entré sin cita y me atendieron igual. El fade quedó perfecto y el ambiente es muy agradable.",
  },
  {
    id: "ejemplo-2",
    author: "Javier R.",
    rating: 5,
    text: "Reservar por la web fue rapidísimo. El resultado, impecable — repetiré seguro.",
  },
  {
    id: "ejemplo-3",
    author: "Daniel P.",
    rating: 4,
    text: "Muy buena atención y puntualidad. El local tiene un estilo que me encanta.",
  },
  {
    id: "ejemplo-4",
    author: "Alejandro V.",
    rating: 5,
    text: "El mejor arreglo de barba que me han hecho. Volveré sin duda.",
  },
];

const REVIEW_TEXT_EN: Record<string, string> = {
  "ejemplo-1": "Walked in without an appointment and got seen anyway. The fade came out perfect and the vibe is great.",
  "ejemplo-2": "Booking online was super quick. The result was flawless — I'll definitely be back.",
  "ejemplo-3": "Great attention to detail and right on time. I love the style of the place.",
  "ejemplo-4": "Best beard trim I've ever had. Will definitely return.",
};

export function getReviewText(review: Review, language: Language): string {
  if (language === "es") return review.text;
  return REVIEW_TEXT_EN[review.id] ?? review.text;
}
