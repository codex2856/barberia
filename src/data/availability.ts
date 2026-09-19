/**
 * Disponibilidad de citas — MOCK.
 *
 * Esta capa está separada a propósito de los componentes de UI: hoy genera
 * horarios de forma determinista en el cliente, pero implementa la misma
 * interfaz (`AvailabilityProvider`) que usaría una integración real con
 * Google Calendar, una base de datos o un sistema de reservas externo.
 * Para conectar un backend real, basta con escribir un nuevo provider que
 * cumpla esta interfaz y sustituir `mockAvailabilityProvider` donde se use.
 */
import { getServiceById } from "./services";

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AvailabilityProvider {
  getAvailableSlots(serviceId: string, isoDate: string): Promise<TimeSlot[]>;
}

const OPENING_HOUR = 9;
const CLOSING_HOUR = 19;
const SLOT_STEP_MINUTES = 30;

function buildDaySlots(): string[] {
  const slots: string[] = [];
  for (let minutes = OPENING_HOUR * 60; minutes < CLOSING_HOUR * 60; minutes += SLOT_STEP_MINUTES) {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
  }
  return slots;
}

const ALL_DAY_SLOTS = buildDaySlots();

/** Hash determinista simple para generar disponibilidad "aleatoria" estable. */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Provider mock: la disponibilidad depende del servicio (duración) y de la
 * fecha, generada de forma determinista para que la demo sea consistente.
 */
export const mockAvailabilityProvider: AvailabilityProvider = {
  async getAvailableSlots(serviceId: string, isoDate: string): Promise<TimeSlot[]> {
    const service = getServiceById(serviceId);
    const seed = hashString(`${serviceId}:${isoDate}`);

    // Simula latencia de red para que la UI muestre su estado de carga real.
    await new Promise((resolve) => setTimeout(resolve, 350));

    const date = new Date(`${isoDate}T00:00:00`);
    const isSunday = date.getDay() === 0;
    if (isSunday) return [];

    return ALL_DAY_SLOTS.map((time, index) => {
      const isOccupied = (seed + index * 7) % 5 === 0;
      const isPast = isDateTimeInPast(isoDate, time);
      return {
        time,
        available: service !== undefined && !isOccupied && !isPast,
      };
    });
  },
};

function isDateTimeInPast(isoDate: string, time: string): boolean {
  const [h, m] = time.split(":").map(Number);
  const slotDate = new Date(`${isoDate}T00:00:00`);
  slotDate.setHours(h, m, 0, 0);
  return slotDate.getTime() < Date.now();
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysIso(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}
