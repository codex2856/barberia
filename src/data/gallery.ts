/**
 * Galería de trabajos. `image` queda vacío hasta tener fotografías reales:
 * mientras tanto la UI renderiza un placeholder visual identificable,
 * nunca una fotografía inventada.
 */
export interface GalleryItem {
  id: string;
  style: string;
  description: string;
  image?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "fade",
    style: "Fade",
    description: "Degradado limpio en las zonas laterales y nuca.",
  },
  {
    id: "clasico",
    style: "Corte clásico",
    description: "Corte atemporal con acabado pulido.",
  },
  {
    id: "barba",
    style: "Corte + barba",
    description: "Perfilado de barba a juego con el corte.",
  },
  {
    id: "diseno",
    style: "Diseño",
    description: "Líneas y diseño personalizado a navaja.",
  },
  {
    id: "textura",
    style: "Textura",
    description: "Acabado con textura natural en la parte superior.",
  },
  {
    id: "cejas",
    style: "Perfilado de cejas",
    description: "Detalle y definición para un acabado completo.",
  },
];
