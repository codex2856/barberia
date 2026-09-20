/**
 * Punto único de integración para enviar una reserva confirmada a un
 * backend real (Google Calendar, base de datos propia, WhatsApp, etc).
 * Hoy guarda en `bookingStore` (en memoria); sustituir `submitBooking`
 * por una llamada real sin tocar la UI del flujo de reserva.
 */
import { tryCreateBooking, type ConfirmedBooking } from "./bookingStore";

export interface BookingPayload {
  serviceId: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  name: string;
  phone: string;
  email: string;
}

export interface BookingResult {
  confirmationId: string;
}

/** Se lanza cuando, al confirmar, la hora elegida ya no está disponible. */
export class SlotUnavailableError extends Error {
  constructor() {
    super("La hora seleccionada ya no está disponible.");
    this.name = "SlotUnavailableError";
  }
}

export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  // TODO: reemplazar por integración real (Google Calendar / API propia).
  await new Promise((resolve) => setTimeout(resolve, 600));

  const confirmationId = `TB-${Date.now().toString(36).toUpperCase()}`;
  const booking: ConfirmedBooking = {
    ...payload,
    confirmationId,
    createdAt: new Date().toISOString(),
  };

  // Revalida justo antes de guardar: si la hora se ocupó mientras el
  // cliente completaba sus datos (otra reserva, otra pestaña), se
  // rechaza aquí en vez de crear una reserva duplicada.
  const result = tryCreateBooking(booking);
  if (!result.ok) {
    throw new SlotUnavailableError();
  }

  return { confirmationId };
}
