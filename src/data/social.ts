/**
 * Enlace de WhatsApp del botón flotante — placeholder, "#" hasta tener el
 * número real del negocio. Esta web es una plantilla de portfolio: antes
 * también había una fila de iconos de Instagram/TikTok en Contacto y en
 * el pie, pero como ninguno llevaba a ningún sitio real se quitó esa
 * fila; solo queda este enlace porque alimenta un componente visible
 * (`FloatingWhatsAppButton`) marcado explícitamente como de prueba.
 */
export interface SocialLink {
  id: "whatsapp";
  label: string;
  href: string;
  isPlaceholder: boolean;
}

export const socialLinks: SocialLink[] = [{ id: "whatsapp", label: "WhatsApp", href: "#", isPlaceholder: true }];
