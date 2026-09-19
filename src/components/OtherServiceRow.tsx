import { formatDuration, formatPrice, type Service } from "../data/services";
import { useBooking } from "./booking/BookingContext";

interface OtherServiceRowProps {
  service: Service;
}

export function OtherServiceRow({ service }: OtherServiceRowProps) {
  const { openBooking } = useBooking();

  return (
    <li className="flex items-center justify-between gap-4 border-b border-white/8 py-4 last:border-0">
      <div>
        <p className="font-semibold text-bone">
          {service.name}
          {service.badge && (
            <span className="ml-2 rounded-full bg-wine/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-bone-dim">
              {service.badge}
            </span>
          )}
        </p>
        <p className="text-sm text-bone-faint">
          {formatPrice(service.price)} · {formatDuration(service.duration)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => openBooking(service.id)}
        className="shrink-0 rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-void"
      >
        Agendar
      </button>
    </li>
  );
}
