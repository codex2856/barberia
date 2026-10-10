import { useEffect, useState } from "react";
import { mockAvailabilityProvider, type TimeSlot } from "../../../data/availability";
import { submitBooking, SlotUnavailableError } from "../../../data/bookingService";
import { useBooking } from "../BookingContext";
import { useLanguage } from "../../../i18n/LanguageContext";
import { strings } from "../../../i18n/strings";

export function StepTime() {
  const { serviceId, date, time, setTime, setConfirmationId } = useBooking();
  const { language } = useLanguage();
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
        setError(strings.booking.stepTime.slotTakenError[language]);
        const refreshed = await mockAvailabilityProvider.getAvailableSlots(serviceId, date);
        setSlots(refreshed);
      } else {
        setError(strings.booking.stepTime.genericError[language]);
      }
    } finally {
      setSubmittingTime(null);
    }
  }

  return (
    <div>
      <h3 className="font-display text-2xl text-bone">{strings.booking.stepTime.title[language]}</h3>

      {slots === null && (
        <p className="mt-5 text-sm text-bone-faint" role="status">
          {strings.booking.stepTime.loading[language]}
        </p>
      )}

      {slots !== null && slots.length === 0 && (
        <p className="mt-5 text-sm text-bone-faint">{strings.booking.stepTime.noSlots[language]}</p>
      )}

      {slots !== null && slots.length > 0 && (
        <>
          <p className="mt-2 text-xs text-bone-faint">{strings.booking.stepTime.legend[language]}</p>
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
                  aria-label={
                    slot.available
                      ? `${strings.booking.stepTime.bookAt[language]} ${slot.time}`
                      : `${slot.time} ${strings.booking.stepTime.notAvailable[language]}`
                  }
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
