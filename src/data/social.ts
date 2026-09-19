/**
 * Enlaces de redes sociales — centralizados para editar en un solo sitio.
 * PLACEHOLDER — "#" hasta tener las URLs reales del negocio.
 */
export interface SocialLink {
  id: "instagram" | "tiktok" | "whatsapp";
  label: string;
  href: string;
  isPlaceholder: boolean;
}

export const socialLinks: SocialLink[] = [
  { id: "instagram", label: "Instagram", href: "#", isPlaceholder: true },
  { id: "tiktok", label: "TikTok", href: "#", isPlaceholder: true },
  { id: "whatsapp", label: "WhatsApp", href: "#", isPlaceholder: true },
];
