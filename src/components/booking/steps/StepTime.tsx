import { useEffect, useState } from "react";
import { mockAvailabilityProvider, type TimeSlot } from "../../../data/availability";
import { submitBooking, SlotUnavailableError } from "../../../data/bookingService";
import { useBooking } from "../BookingContext";

export function StepTime() {
  const { serviceId, date, time, setTime, setConfirmationId } = useBooking();
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);
  const [submittingTime, setSubmittingTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSelect(selected: string) {
    if (!serviceId || !date || submittingTime) return;
    setError(null);
    setTime(selected);
    setSubmittingTime(selected);
    try {
      const result = await submitBooking({ serviceId, date, time: selected });
      setConfirmationId(result.confirmationId);
    } catch (err) {
      if (err instanceof SlotUnavailableError) {
        setError("Justo se acaba de reservar esa hora. Elige otra, por favor.");
        const refreshed = await mockAvailabilityProvider.getAvailableSlots(serviceId, date);
        setSlots(refreshed);
      } else {
        setError("No se pudo confirmar la cita. Inténtalo de nuevo.");
      }
    } finally {
      setSubmittingTime(null);
    }
  }

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
        <>
          <p className="mt-2 text-xs text-bone-faint">Las horas tachadas ya están reservadas o ya pasaron.</p>
          {error && (
            <p role="alert" className="mt-2 text-sm text-red-400">
              {error}
            </p>
          )}
          <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            {slots.map((slot) => {
              const selected = slot.time === time;
              const isSubmitting = submittingTime === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available || submittingTime !== null}
                  onClick={() => handleSelect(slot.time)}
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
                  {isSubmitting ? "…" : slot.time}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
