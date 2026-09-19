/**
 * Punto único de integración para enviar una reserva confirmada a un
 * backend real (Google Calendar, base de datos propia, WhatsApp, etc).
 * Hoy solo simula el envío; sustituir `submitBooking` por una llamada real
 * sin tocar la UI del flujo de reserva.
 */
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

export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  // TODO: reemplazar por integración real (Google Calendar / API propia).
  await new Promise((resolve) => setTimeout(resolve, 600));
  const seed = `${payload.serviceId}-${payload.date}-${payload.time}`;
  return {
    confirmationId: `TB-${seed.length}-${Date.now().toString(36).toUpperCase()}`,
  };
}
