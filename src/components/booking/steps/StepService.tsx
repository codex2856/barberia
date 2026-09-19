import { services, formatPrice, formatDuration } from "../../../data/services";
import { useBooking } from "../BookingContext";

export function StepService() {
  const { serviceId, setService } = useBooking();

  return (
    <div>
      <h3 className="font-display text-2xl text-bone">ELIGE TU SERVICIO</h3>
      <ul className="mt-5 flex flex-col gap-2.5">
        {services.map((service) => {
          const selected = service.id === serviceId;
          return (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => setService(service.id)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-colors ${
                  selected
                    ? "border-gold bg-gold/10"
                    : "border-white/10 bg-white/[0.02] hover:border-gold/40"
                }`}
              >
                <span>
                  <span className="block font-semibold text-bone">{service.name}</span>
                  <span className="block text-sm text-bone-faint">{formatDuration(service.duration)}</span>
                </span>
                <span className="font-display text-lg text-gold">{formatPrice(service.price)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
