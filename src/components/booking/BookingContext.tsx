import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getServiceById } from "../../data/services";
import { strings } from "../../i18n/strings";
import type { Bilingual } from "../../i18n/LanguageContext";

export type BookingStep = "service" | "date" | "time" | "confirm";

interface BookingState {
  isOpen: boolean;
  step: BookingStep;
  serviceId: string | null;
  date: string | null;
  time: string | null;
  confirmationId: string | null;
}

interface BookingContextValue extends BookingState {
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  goToStep: (step: BookingStep) => void;
  setService: (serviceId: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setConfirmationId: (id: string) => void;
  reset: () => void;
}

export const STEP_ORDER: BookingStep[] = ["service", "date", "time", "confirm"];

export const STEP_LABELS: Record<BookingStep, Bilingual> = strings.booking.stepLabels;

const initialState: BookingState = {
  isOpen: false,
  step: "service",
  serviceId: null,
  date: null,
  time: null,
  confirmationId: null,
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);

  const openBooking = useCallback((serviceId?: string) => {
    const preselected = serviceId && getServiceById(serviceId) ? serviceId : null;
    setState({
      ...initialState,
      isOpen: true,
      serviceId: preselected,
      step: preselected ? "date" : "service",
    });
  }, []);

  const closeBooking = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const goToStep = useCallback((step: BookingStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const setService = useCallback((serviceId: string) => {
    setState((prev) => ({ ...prev, serviceId, step: "date" }));
  }, []);

  const setDate = useCallback((date: string) => {
    setState((prev) => ({ ...prev, date, time: null, step: "time" }));
  }, []);

  const setTime = useCallback((time: string) => {
    setState((prev) => ({ ...prev, time }));
  }, []);

  const setConfirmationId = useCallback((confirmationId: string) => {
    setState((prev) => ({ ...prev, confirmationId, step: "confirm" }));
  }, []);

  const reset = useCallback(() => setState(initialState), []);

  const value = useMemo<BookingContextValue>(
    () => ({
      ...state,
      openBooking,
      closeBooking,
      goToStep,
      setService,
      setDate,
      setTime,
      setConfirmationId,
      reset,
    }),
    [state, openBooking, closeBooking, goToStep, setService, setDate, setTime, setConfirmationId, reset],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking debe usarse dentro de BookingProvider");
  return ctx;
}
