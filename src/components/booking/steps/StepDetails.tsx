import { useState, type FormEvent } from "react";
import { useBooking } from "../BookingContext";
import { submitBooking, SlotUnavailableError } from "../../../data/bookingService";
import { Button } from "../../ui/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function StepDetails() {
  const { details, setDetails, serviceId, date, time, setConfirmationId, goToStep } = useBooking();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slotTaken, setSlotTaken] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!serviceId || !date || !time) return;

    if (details.name.trim().length < 2) {
      setError("Introduce tu nombre completo.");
      return;
    }
    if (details.phone.trim().length < 6) {
      setError("Introduce un teléfono válido.");
      return;
    }
    if (!EMAIL_PATTERN.test(details.email)) {
      setError("Introduce un email válido.");
      return;
    }

    setError(null);
    setSlotTaken(false);
    setSubmitting(true);
    try {
      const result = await submitBooking({ serviceId, date, time, ...details });
      setConfirmationId(result.confirmationId);
    } catch (err) {
      if (err instanceof SlotUnavailableError) {
        setSlotTaken(true);
        setError("Justo se acaba de reservar esa hora. Elige otra, por favor.");
      } else {
        setError("No se pudo confirmar la cita. Inténtalo de nuevo.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="font-display text-2xl text-bone">TUS DATOS</h3>
      <div className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-bone-dim">
          Nombre
          <input
            type="text"
            required
            autoComplete="name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-bone-dim">
          Teléfono
          <input
            type="tel"
            required
            autoComplete="tel"
            value={details.phone}
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-bone-dim">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-bone outline-none focus:border-gold"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        {slotTaken ? (
          <Button type="button" onClick={() => goToStep("time")} className="mt-2 w-full">
            Elegir otra hora
          </Button>
        ) : (
          <Button type="submit" disabled={submitting} className="mt-2 w-full">
            {submitting ? "Confirmando…" : "Confirmar cita"}
          </Button>
        )}
      </div>
    </form>
  );
}
