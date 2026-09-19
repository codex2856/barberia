import { useTilt } from "../hooks/useTilt";
import { formatDuration, formatPrice, type Service } from "../data/services";
import { useBooking } from "./booking/BookingContext";
import { Button } from "./ui/Button";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const tiltRef = useTilt<HTMLDivElement>(6);
  const { openBooking } = useBooking();

  return (
    <div
      ref={tiltRef}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-charcoal-light to-charcoal p-8 shadow-[var(--shadow-soft)] transition-[border-color,box-shadow] duration-300 hover:border-gold/50 hover:shadow-[var(--shadow-gold)]"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div>
        <h3 className="font-display text-2xl text-bone">{service.name}</h3>
        <p className="mt-3 font-display text-4xl text-gold">{formatPrice(service.price)}</p>
        <p className="mt-1 text-sm uppercase tracking-widest text-bone-faint">{formatDuration(service.duration)}</p>
      </div>
      <Button className="mt-8 w-full" onClick={() => openBooking(service.id)}>
        Agendar
      </Button>
    </div>
  );
}
