import { socialLinks } from "../data/social";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./ui/icons";

const ICONS = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  whatsapp: WhatsAppIcon,
};

export function SocialRow() {
  return (
    <ul className="flex items-center gap-4">
      {socialLinks.map((social) => {
        const Icon = ICONS[social.id];
        return (
          <li key={social.id}>
            <a
              href={social.href}
              target={social.isPlaceholder ? undefined : "_blank"}
              rel={social.isPlaceholder ? undefined : "noreferrer"}
              aria-label={social.label}
              title={social.isPlaceholder ? `${social.label} (enlace pendiente de configurar)` : social.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone-dim transition-colors hover:border-gold hover:text-gold"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
