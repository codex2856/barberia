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
