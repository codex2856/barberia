/**
 * Reseñas de ejemplo — NO son reseñas reales de clientes.
 * Reemplazar por reseñas reales (o conectar con Google Reviews) antes de publicar.
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
    author: "Cliente de ejemplo 1",
    rating: 5,
    text: "Reseña de ejemplo pendiente de sustituir. Aquí aparecerá la opinión real de un cliente sobre su experiencia y el resultado del corte.",
  },
  {
    id: "ejemplo-2",
    author: "Cliente de ejemplo 2",
    rating: 5,
    text: "Reseña de ejemplo pendiente de sustituir. Este espacio está preparado para mostrar reseñas reales, próximamente vía Google Reviews.",
  },
  {
    id: "ejemplo-3",
    author: "Cliente de ejemplo 3",
    rating: 4,
    text: "Reseña de ejemplo pendiente de sustituir. El diseño de la tarjeta ya está listo para recibir contenido real del negocio.",
  },
  {
    id: "ejemplo-4",
    author: "Cliente de ejemplo 4",
    rating: 5,
    text: "Reseña de ejemplo pendiente de sustituir. Sustituir por comentarios auténticos en cuanto estén disponibles.",
  },
];
