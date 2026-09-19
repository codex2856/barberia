import { useEffect, useRef, type ComponentType } from "react";
import { STEP_LABELS, STEP_ORDER, useBooking, type BookingStep } from "./BookingContext";
import { StepService } from "./steps/StepService";
import { StepDate } from "./steps/StepDate";
import { StepTime } from "./steps/StepTime";
import { StepDetails } from "./steps/StepDetails";
import { StepConfirm } from "./steps/StepConfirm";
import { CloseIcon, ChevronLeftIcon } from "../ui/icons";

const STEP_COMPONENTS: Record<BookingStep, ComponentType> = {
  service: StepService,
  date: StepDate,
  time: StepTime,
  details: StepDetails,
  confirm: StepConfirm,
};

export function BookingDrawer() {
  const { isOpen, step, serviceId, date, closeBooking, goToStep } = useBooking();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeBooking();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, closeBooking]);

  if (!isOpen) return null;

  const stepIndex = STEP_ORDER.indexOf(step);
  const canGoBack = stepIndex > 0 && step !== "confirm";
  const StepComponent = STEP_COMPONENTS[step];

  function handleBack() {
    if (!canGoBack) return;
    const prevStep = STEP_ORDER[stepIndex - 1];
    if (prevStep === "date" && !serviceId) return;
    if (prevStep === "time" && !date) return;
    goToStep(prevStep);
  }

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Reservar cita">
      <button
        type="button"
        aria-label="Cerrar reserva"
        onClick={closeBooking}
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-charcoal shadow-[var(--shadow-lift)] outline-none sm:border-l sm:border-white/10 max-sm:inset-x-0 max-sm:top-auto max-sm:h-[92vh] max-sm:rounded-t-3xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            {canGoBack && (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Paso anterior"
                className="rounded-full p-1.5 text-bone-dim hover:text-gold"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            )}
            <span className="font-display text-lg tracking-wide text-bone">AGENDAR CITA</span>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-bone-dim hover:text-gold"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {step !== "confirm" && (
          <ol className="flex gap-1.5 px-5 pt-4" aria-label="Progreso de la reserva">
            {STEP_ORDER.slice(0, 4).map((s, i) => (
              <li
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${i <= stepIndex ? "bg-gold" : "bg-white/10"}`}
                aria-current={s === step ? "step" : undefined}
              >
                <span className="sr-only">{STEP_LABELS[s]}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <StepComponent />
        </div>
      </div>
    </div>
  );
}
