import { useEffect, useState } from "react";
import { barbershop } from "../data/barbershop";
import { useBooking } from "./booking/BookingContext";
import { Button } from "./ui/Button";
import { MenuIcon, CloseIcon } from "./ui/icons";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#cortes", label: "Cortes" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#horarios", label: "Horarios" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // El Hero tiene fondo claro; el resto de la página es oscuro. El navbar
  // invierte sus colores de texto según esté sobre uno u otro.
  const onLightHero = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
        scrolled ? "bg-void/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8" aria-label="Navegación principal">
        <a
          href="#inicio"
          className={`font-display text-xl tracking-[0.12em] sm:text-2xl ${onLightHero ? "text-void" : "text-bone"}`}
        >
          {barbershop.name}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-gold-dark ${
                  onLightHero ? "text-charcoal-lighter" : "text-bone-dim"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button size="md" onClick={() => openBooking()}>
            Agendar cita
          </Button>
        </div>

        <button
          type="button"
          className={`lg:hidden ${onLightHero ? "text-void" : "text-bone"}`}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-void/97 px-5 pb-8 pt-4 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
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
            Agendar cita
          </Button>
        </div>
      )}
    </header>
  );
}
