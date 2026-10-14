import type { Language } from "../i18n/LanguageContext";
import { readConfig } from "./adminStore";

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

export const DEFAULT_GALLERY: GalleryItem[] = [
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

export const galleryItems: GalleryItem[] = readConfig().gallery ?? DEFAULT_GALLERY;

const GALLERY_EN: Record<string, { style: string; description: string }> = {
  fade: { style: "Fade", description: "Clean blend on the sides and nape." },
  clasico: { style: "Classic cut", description: "Timeless cut with a polished finish." },
  barba: { style: "Cut + beard", description: "Beard shaping to match the haircut." },
  diseno: { style: "Design", description: "Custom razor-lined designs." },
  textura: { style: "Texture", description: "Natural textured finish on top." },
  cejas: { style: "Eyebrow shaping", description: "Detail and definition for a complete look." },
};

export function getGalleryStyle(item: GalleryItem, language: Language): string {
  if (language === "es") return item.style;
  return GALLERY_EN[item.id]?.style ?? item.style;
}

export function getGalleryDescription(item: GalleryItem, language: Language): string {
  if (language === "es") return item.description;
  return GALLERY_EN[item.id]?.description ?? item.description;
}
