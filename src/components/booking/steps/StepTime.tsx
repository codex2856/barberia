import { useEffect, useState } from "react";
import { mockAvailabilityProvider, type TimeSlot } from "../../../data/availability";
import { useBooking } from "../BookingContext";

export function StepTime() {
  const { serviceId, date, time, setTime } = useBooking();
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);

  useEffect(() => {
    if (!serviceId || !date) return;
    let cancelled = false;
    setSlots(null);
    mockAvailabilityProvider.getAvailableSlots(serviceId, date).then((result) => {
      if (!cancelled) setSlots(result);
    });
    return () => {
      cancelled = true;
    };
  }, [serviceId, date]);

  return (
    <div>
      <h3 className="font-display text-2xl text-bone">ELIGE HORA</h3>

      {slots === null && (
        <p className="mt-5 text-sm text-bone-faint" role="status">
          Consultando disponibilidad…
        </p>
      )}

      {slots !== null && slots.length === 0 && (
        <p className="mt-5 text-sm text-bone-faint">No hay horario disponible ese día. Elige otra fecha.</p>
      )}

      {slots !== null && slots.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {slots.map((slot) => {
            const selected = slot.time === time;
            return (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available}
                onClick={() => setTime(slot.time)}
                aria-pressed={selected}
                aria-label={slot.available ? `Reservar a las ${slot.time}` : `${slot.time} no disponible`}
                className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
                  !slot.available
                    ? "border-white/5 bg-white/[0.02] text-bone-faint/40 line-through"
                    : selected
                      ? "border-gold bg-gold/10 text-bone"
                      : "border-white/10 bg-white/[0.02] text-bone hover:border-gold/40"
                }`}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
