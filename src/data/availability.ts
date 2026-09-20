/**
 * Disponibilidad de citas.
 *
 * RECONSTRUIDO DESDE CERO. La versión anterior generaba disponibilidad
 * con un hash matemático sobre `servicio+fecha+índice` que no tenía
 * relación real con nada: ni con el horario real del negocio (tenía su
 * propio horario hardcodeado 09:00–19:00 para todos los días, distinto
 * del que se mostraba en la sección "Horarios"), ni con las citas que
 * de verdad se hubieran confirmado (`bookingService.submitBooking` no
 * guardaba nada). Resultado: podían aparecer como "disponibles" horas
 * en las que el negocio ya estaba cerrado, u horas ya reservadas.
 *
 * Ahora la disponibilidad es un cálculo directo y verificable:
 *   horas del horario real de ese día  −  horas ya reservadas  −  horas pasadas
 *
 * Esta capa sigue separada de la UI a propósito, e implementa la misma
 * interfaz (`AvailabilityProvider`) que usaría una integración real con
 * Google Calendar u otro backend — para conectarlo, basta con escribir
 * un nuevo provider que cumpla esta interfaz.
 */
import { getServiceById } from "./services";
import { getScheduleForWeekday } from "./schedule";
import { isSlotTaken } from "./bookingStore";

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AvailabilityProvider {
  getAvailableSlots(serviceId: string, isoDate: string): Promise<TimeSlot[]>;
}

const SLOT_STEP_MINUTES = 30;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (totalMinutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Genera las horas reservables entre apertura y cierre de un día concreto. */
function buildSlotsForRange(open: string, close: string): string[] {
  const slots: string[] = [];
  for (let m = timeToMinutes(open); m < timeToMinutes(close); m += SLOT_STEP_MINUTES) {
    slots.push(minutesToTime(m));
  }
  return slots;
}

function isDateTimeInPast(isoDate: string, time: string): boolean {
  const [h, m] = time.split(":").map(Number);
  const slotDate = new Date(`${isoDate}T00:00:00`);
  slotDate.setHours(h, m, 0, 0);
  return slotDate.getTime() < Date.now();
}

export const mockAvailabilityProvider: AvailabilityProvider = {
  async getAvailableSlots(serviceId: string, isoDate: string): Promise<TimeSlot[]> {
    const service = getServiceById(serviceId);

    // Simula latencia de red para que la UI muestre su estado de carga real.
    await new Promise((resolve) => setTimeout(resolve, 350));

    const date = new Date(`${isoDate}T00:00:00`);
    const daySchedule = getScheduleForWeekday(date.getDay());

    if (daySchedule.closed || !daySchedule.open || !daySchedule.close) {
      return [];
    }

    const allSlots = buildSlotsForRange(daySchedule.open, daySchedule.close);

    return allSlots.map((time) => ({
      time,
      available: service !== undefined && !isDateTimeInPast(isoDate, time) && !isSlotTaken(isoDate, time),
    }));
  },
};

/**
 * Formatea una fecha como YYYY-MM-DD usando SIEMPRE la hora local (nunca
 * `toISOString`, que convierte a UTC): mezclar ambos formatos hacía que,
 * según la zona horaria del navegador, "hoy" quedara desfasado un día.
 */
function toIsoLocal(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayIso(): string {
  return toIsoLocal(new Date());
}

export function addDaysIso(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toIsoLocal(date);
}
