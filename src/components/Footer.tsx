import { barbershop } from "../data/barbershop";
import { SocialRow } from "./SocialRow";

const FOOTER_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#cortes", label: "Cortes" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#horarios", label: "Horarios" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <span className="font-display text-2xl tracking-[0.12em] text-bone">{barbershop.name}</span>
        <p className="max-w-sm text-sm text-bone-faint">{barbershop.tagline}</p>

        <nav aria-label="Enlaces del pie de página">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialRow />

        <p className="mt-4 text-xs text-bone-faint">
          © {new Date().getFullYear()} {barbershop.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
