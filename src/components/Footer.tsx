import { barbershop } from "../data/barbershop";
import { useNavLinks } from "../hooks/useNavLinks";
import { useLanguage } from "../i18n/LanguageContext";
import { strings } from "../i18n/strings";

export function Footer() {
  const { language } = useLanguage();
  const navLinks = useNavLinks();

  return (
    <footer className="border-t border-white/10 bg-void py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <span className="font-display text-2xl tracking-[0.12em] text-bone">{barbershop.name}</span>
        <p className="max-w-sm text-sm text-bone-faint">{strings.common.tagline[language]}</p>

        <nav aria-label={strings.footer.linksAriaLabel[language]}>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks
              .filter((link) => link.href !== "#inicio")
              .map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-xs uppercase tracking-[0.18em] text-bone-dim hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <p className="mt-4 text-xs text-bone-faint">{strings.footer.demoNotice[language]}</p>
      </div>
    </footer>
  );
}
