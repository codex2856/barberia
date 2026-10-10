import { socialLinks } from "../data/social";
import { WhatsAppIcon } from "./ui/icons";
import { useLanguage } from "../i18n/LanguageContext";
import { strings } from "../i18n/strings";

/**
 * Botón flotante de WhatsApp, visible en toda la página. Usa el mismo
 * enlace centralizado que el resto del sitio (`data/social.ts`) — hoy es
 * un placeholder ("#"); en cuanto haya un número real, se actualiza en
 * un solo lugar y este botón queda funcionando automáticamente.
 */
export function FloatingWhatsAppButton() {
  const whatsapp = socialLinks.find((link) => link.id === "whatsapp");
  const { language } = useLanguage();
  if (!whatsapp) return null;

  return (
    <a
      href={whatsapp.href}
      target={whatsapp.isPlaceholder ? undefined : "_blank"}
      rel={whatsapp.isPlaceholder ? undefined : "noreferrer"}
      aria-label={
        whatsapp.isPlaceholder
          ? strings.whatsapp.ariaLabelPlaceholder[language]
          : strings.whatsapp.contact[language]
      }
      title={whatsapp.isPlaceholder ? strings.whatsapp.titlePlaceholder[language] : strings.whatsapp.contact[language]}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-7 w-7" strokeWidth={1.8} />
      {whatsapp.isPlaceholder && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-void" aria-hidden>
          !
        </span>
      )}
    </a>
  );
}
