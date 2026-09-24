import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "../components/ui/Button";
import { useBooking } from "../components/booking/BookingContext";
import { ArrowRightIcon } from "../components/ui/icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { HeroChairSpinner } from "../components/HeroChairSpinner";

export function Hero() {
  const { openBooking } = useBooking();
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!contentRef.current) return;
    const targets = contentRef.current.querySelectorAll("[data-hero-in]");
    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      targets,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15 },
    );
  }, [reducedMotion]);

  return (
    <section
      id="inicio"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-[#2a1d17]"
    >
      <HeroChairSpinner />

      {/* degradados para legibilidad del texto sobre la imagen: en móvil el
          texto ocupa casi todo el ancho, así que ahí el velo es más fuerte
          y parejo; en desktop se concentra a la izquierda, donde está el
          texto, dejando la imagen más nítida a la derecha. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2a1d17] via-[#2a1d17]/10 to-[#2a1d17]/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2a1d17]/90 via-[#2a1d17]/55 to-[#2a1d17]/45 sm:from-[#2a1d17]/80 sm:via-transparent sm:to-[#2a1d17]/30" />

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <p data-hero-in className="font-body text-xs font-bold uppercase tracking-[0.4em] text-gold">
            The Barber
          </p>
          <h1 data-hero-in className="mt-4 font-display text-6xl leading-[0.92] text-bone sm:text-7xl md:text-8xl">
            TU ESTILO.
            <br />
            TU BARBERÍA.
          </h1>
          <p data-hero-in className="mt-6 max-w-md text-balance text-base text-bone-dim sm:text-lg">
            Cortes de precisión, barba y una experiencia pensada al detalle. Reserva tu cita en menos de un minuto.
          </p>
          <div data-hero-in className="mt-9">
            <Button size="lg" onClick={() => openBooking()}>
              Agendar cita <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-bone-faint">
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">Scroll to explore</span>
        <span className="h-9 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" aria-hidden />
      </div>
    </section>
  );
}
