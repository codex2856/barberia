import { useLanguage } from "../i18n/LanguageContext";
import { strings } from "../i18n/strings";

export function useNavLinks() {
  const { language } = useLanguage();
  return [
    { href: "#inicio", label: strings.nav.inicio[language] },
    { href: "#servicios", label: strings.nav.servicios[language] },
    { href: "#cortes", label: strings.nav.cortes[language] },
    { href: "#resenas", label: strings.nav.resenas[language] },
    { href: "#horarios", label: strings.nav.horarios[language] },
    { href: "#contacto", label: strings.nav.contacto[language] },
  ];
}
