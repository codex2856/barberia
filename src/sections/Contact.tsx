import { barbershop } from "../data/barbershop";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { SocialRow } from "../components/SocialRow";
import { Button } from "../components/ui/Button";
import { useBooking } from "../components/booking/BookingContext";

export function Contact() {
  const { openBooking } = useBooking();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${barbershop.addressPlaceholder}, ${barbershop.cityPlaceholder}`,
  )}`;

  return (
    <section id="contacto" className="bg-charcoal py-24 sm:py-32" aria-labelledby="contacto-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center">
          <SectionHeading id="contacto-heading" eyebrow="Ubicación" title="ENCUÉNTRANOS" />
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Dirección (a confirmar)</p>
                <address className="mt-3 not-italic text-lg text-bone">
                  {barbershop.addressPlaceholder}
                  <br />
                  {barbershop.cityPlaceholder}
                </address>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Contacto (a confirmar)</p>
                <p className="mt-3 text-bone-dim">
                  <a href={`tel:${barbershop.phonePlaceholder.replace(/\s/g, "")}`} className="hover:text-gold">
                    {barbershop.phonePlaceholder}
                  </a>
                  <br />
                  <a href={`mailto:${barbershop.emailPlaceholder}`} className="hover:text-gold">
                    {barbershop.emailPlaceholder}
                  </a>
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="outline"
                  size="md"
                  className="sm:w-auto"
                  onClick={() => window.open(mapsHref, "_blank", "noreferrer")}
                >
                  Cómo llegar
                </Button>
                <Button size="md" onClick={() => openBooking()}>
                  Agendar cita
                </Button>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Síguenos</p>
                <div className="mt-4">
                  <SocialRow />
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div
              role="img"
              aria-label="Mapa de ubicación pendiente de configurar con la dirección real"
              className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(201,162,75,0.08),transparent_65%)]"
            >
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(243,239,228,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(243,239,228,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative flex flex-col items-center gap-2 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
                  ◎
                </span>
                <p className="text-sm text-bone-dim">Mapa disponible cuando se confirme la ubicación</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
