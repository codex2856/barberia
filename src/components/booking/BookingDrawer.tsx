import { useEffect, useRef, type ComponentType } from "react";
import { STEP_LABELS, STEP_ORDER, useBooking, type BookingStep } from "./BookingContext";
import { StepService } from "./steps/StepService";
import { StepDate } from "./steps/StepDate";
import { StepTime } from "./steps/StepTime";
import { StepConfirm } from "./steps/StepConfirm";
import { CloseIcon, ChevronLeftIcon } from "../ui/icons";
import { useLanguage } from "../../i18n/LanguageContext";
import { strings } from "../../i18n/strings";

const STEP_COMPONENTS: Record<BookingStep, ComponentType> = {
  service: StepService,
  date: StepDate,
  time: StepTime,
  confirm: StepConfirm,
};

export function BookingDrawer() {
  const { isOpen, step, serviceId, date, closeBooking, goToStep } = useBooking();
  const { language } = useLanguage();
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
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={strings.booking.title[language]}>
      <button
        type="button"
        aria-label={strings.booking.closeReservationAriaLabel[language]}
        onClick={closeBooking}
        className="absolute inset-0 bg-void/80 opacity-100 backdrop-blur-sm transition-opacity duration-300 ease-out starting:opacity-0"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md translate-x-0 translate-y-0 flex-col bg-charcoal shadow-[var(--shadow-lift)] outline-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] starting:translate-x-full sm:border-l sm:border-white/10 max-sm:inset-x-0 max-sm:top-auto max-sm:h-[92vh] max-sm:rounded-t-3xl max-sm:starting:translate-x-0 max-sm:starting:translate-y-full"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            {canGoBack && (
              <button
                type="button"
                onClick={handleBack}
                aria-label={strings.booking.backAriaLabel[language]}
                className="rounded-full p-1.5 text-bone-dim hover:text-gold"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            )}
            <span className="font-display text-lg tracking-wide text-bone">{strings.booking.title[language]}</span>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            aria-label={strings.booking.closeAriaLabel[language]}
            className="rounded-full p-1.5 text-bone-dim hover:text-gold"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <p className="border-b border-white/10 bg-gold/5 px-5 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          {strings.booking.simulationNotice[language]}
        </p>

        {step !== "confirm" && (
          <ol className="flex gap-1.5 px-5 pt-4" aria-label={strings.booking.progressAriaLabel[language]}>
            {STEP_ORDER.slice(0, -1).map((s, i) => (
              <li
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${i <= stepIndex ? "bg-gold" : "bg-white/10"}`}
                aria-current={s === step ? "step" : undefined}
              >
                <span className="sr-only">{STEP_LABELS[s][language]}</span>
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
