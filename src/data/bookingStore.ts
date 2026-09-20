/**
 * Registro de citas confirmadas — la fuente de verdad de qué horas están
 * REALMENTE ocupadas.
 *
 * Antes no existía nada así: la disponibilidad se "simulaba" con un hash
 * matemático que no tenía memoria de ninguna reserva real, así que una
 * hora ya reservada seguía apareciendo disponible después. Este store la
 * reemplaza por un registro real.
 *
 * Se guarda en `localStorage` (no hay backend todavía) — es la única
 * forma de que una reserva confirmada siga bloqueada de verdad al volver
 * a abrir el flujo, recargar la página o abrir otra pestaña del mismo
 * navegador: un simple array en memoria del módulo se reinicia con cada
 * carga de página (se probó y falló exactamente así). Sigue siendo 100%
 * local al navegador de quien reserva — no se envía a ningún sitio.
 *
 * En cuanto se conecte un backend real (Google Calendar, base de datos
 * propia), basta con reemplazar las funciones de este archivo por
 * llamadas a esa API sin tocar `availability.ts` ni la UI, que solo
 * conocen esta interfaz.
 *
 * Límite conocido, honesto: sin servidor no hay forma de garantizar
 * atomicidad perfecta entre dos pestañas escribiendo en el MISMO
 * milisegundo exacto — eso solo lo resuelve un backend real. Lo que sí
 * garantiza es que, en el uso normal, una hora reservada nunca vuelve a
 * aparecer libre, y una revalidación justo antes de confirmar.
 */
export interface ConfirmedBooking {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  serviceId: string;
  name: string;
  phone: string;
  email: string;
  confirmationId: string;
  createdAt: string; // ISO timestamp
}

const STORAGE_KEY = "the-barber:confirmed-bookings";

function readAll(): ConfirmedBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ConfirmedBooking[]) : [];
  } catch {
    return [];
  }
}

function writeAll(bookings: ConfirmedBooking[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // Almacenamiento no disponible (modo privado, cuota llena, etc.) — la
    // reserva ya se validó en memoria durante esta sesión; solo no
    // persistirá entre recargas.
  }
}

/**
 * Cualquier servicio ya reservado en esa fecha+hora ocupa el turno: el
 * barbero solo puede atender a una persona a la vez, sin importar el
 * servicio elegido.
 */
export function isSlotTaken(date: string, time: string): boolean {
  return readAll().some((b) => b.date === date && b.time === time);
}

export function getBookingsForDate(date: string): ConfirmedBooking[] {
  return readAll().filter((b) => b.date === date);
}

export type CreateBookingResult = { ok: true } | { ok: false; reason: "slot-taken" };

/**
 * Registra una reserva SOLO si el horario sigue libre en este mismo
 * instante — lee el estado más reciente antes de guardar, no confía en
 * que el frontend haya consultado disponibilidad hace unos segundos.
 */
export function tryCreateBooking(booking: ConfirmedBooking): CreateBookingResult {
  const current = readAll();
  if (current.some((b) => b.date === booking.date && b.time === booking.time)) {
    return { ok: false, reason: "slot-taken" };
  }
  writeAll([...current, booking]);
  return { ok: true };
}

/** Solo para pruebas: vacía el registro. */
export function __resetBookingsForTests(): void {
  writeAll([]);
}
