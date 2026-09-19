import { Button } from "../components/ui/Button";
import { useBooking } from "../components/booking/BookingContext";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { DrawLine } from "../components/ui/DrawLine";
import { ArrowRightIcon } from "../components/ui/icons";

export function ReservaCTA() {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden bg-void py-24 sm:py-28" aria-labelledby="reserva-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,75,0.1),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <RevealOnScroll className="flex w-full flex-col items-center gap-6">
          <DrawLine className="h-2 w-24" />
          <h2 id="reserva-heading" className="font-display text-4xl text-bone sm:text-5xl">
            RESERVA TU PRÓXIMA CITA
          </h2>
          <p className="max-w-md text-balance text-bone-dim">
            Elige tu servicio, tu horario y confírmalo en menos de un minuto.
          </p>
          <Button size="lg" onClick={() => openBooking()}>
            Agendar cita <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
