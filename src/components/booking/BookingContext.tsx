import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getServiceById } from "../../data/services";

export type BookingStep = "service" | "date" | "time" | "details" | "confirm";

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
}

interface BookingState {
  isOpen: boolean;
  step: BookingStep;
  serviceId: string | null;
  date: string | null;
  time: string | null;
  details: CustomerDetails;
  confirmationId: string | null;
}

interface BookingContextValue extends BookingState {
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  goToStep: (step: BookingStep) => void;
  setService: (serviceId: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setDetails: (details: CustomerDetails) => void;
  setConfirmationId: (id: string) => void;
  reset: () => void;
}

export const STEP_ORDER: BookingStep[] = ["service", "date", "time", "details", "confirm"];

export const STEP_LABELS: Record<BookingStep, string> = {
  service: "Servicio",
  date: "Fecha",
  time: "Hora",
  details: "Tus datos",
  confirm: "Confirmar",
};

const initialState: BookingState = {
  isOpen: false,
  step: "service",
  serviceId: null,
  date: null,
  time: null,
  details: { name: "", phone: "", email: "" },
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
    setState((prev) => ({ ...prev, time, step: "details" }));
  }, []);

  const setDetails = useCallback((details: CustomerDetails) => {
    setState((prev) => ({ ...prev, details }));
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
      setDetails,
      setConfirmationId,
      reset,
    }),
    [state, openBooking, closeBooking, goToStep, setService, setDate, setTime, setDetails, setConfirmationId, reset],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking debe usarse dentro de BookingProvider");
  return ctx;
}
