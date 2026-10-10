import { useEffect, useState } from "react";
import { barbershop } from "../data/barbershop";
import { useBooking } from "./booking/BookingContext";
import { Button } from "./ui/Button";
import { MenuIcon, CloseIcon } from "./ui/icons";
import { useLanguage } from "../i18n/LanguageContext";
import { strings } from "../i18n/strings";
import { useNavLinks } from "../hooks/useNavLinks";

function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={strings.nav.langToggle[language]}
      className={`rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-bone-dim transition-colors hover:border-gold hover:text-gold ${className}`}
    >
      {language === "es" ? "EN" : "ES"}
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBooking();
  const { language } = useLanguage();
  const navLinks = useNavLinks();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
        scrolled ? "bg-void/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8"
        aria-label={language === "es" ? "Navegación principal" : "Main navigation"}
      >
        <a href="#inicio" className="font-display text-xl tracking-[0.12em] text-bone sm:text-2xl">
          {barbershop.name}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-bone-dim transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button size="md" onClick={() => openBooking()}>
            {strings.common.agendarCita[language]}
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="text-bone"
            aria-label={mobileOpen ? strings.nav.closeMenu[language] : strings.nav.openMenu[language]}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-void/97 px-5 pb-8 pt-4 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bone-dim hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            className="mt-4 w-full"
            onClick={() => {
              setMobileOpen(false);
              openBooking();
            }}
          >
            {strings.common.agendarCita[language]}
          </Button>
        </div>
      )}
    </header>
  );
}
