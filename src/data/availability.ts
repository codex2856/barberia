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

    // Un hash por slot (en vez de una fórmula aritmética sobre `index`)
    // evita degeneraciones: `(seed + index * 7) % 7` era SIEMPRE 0 o
    // SIEMPRE distinto de 0 para todo `index` (index*7 es múltiplo de 7),
    // así que el día entero quedaba con todas las horas ocupadas o
    // ninguna, en vez de variar hora a hora.
    const occupiedFlags = ALL_DAY_SLOTS.map((_, index) => hashString(`${seed}:${index}`) % 6 === 0);

    // Salvaguarda: por más "aleatoria" que sea la simulación, nunca debe
    // dejar un día con casi todo ocupado — se limita a un máximo de horas
    // marcadas como ocupadas por día, dando prioridad (al liberar) a las
    // últimas del listado.
    const MAX_OCCUPIED_PER_DAY = 5;
    let occupiedCount = occupiedFlags.filter(Boolean).length;
    for (let index = occupiedFlags.length - 1; index >= 0 && occupiedCount > MAX_OCCUPIED_PER_DAY; index--) {
      if (occupiedFlags[index]) {
        occupiedFlags[index] = false;
        occupiedCount--;
      }
    }

    return ALL_DAY_SLOTS.map((time, index) => {
      const isPast = isDateTimeInPast(isoDate, time);
      return {
        time,
        available: service !== undefined && !occupiedFlags[index] && !isPast,
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

/**
 * Formatea una fecha como YYYY-MM-DD usando SIEMPRE la hora local (nunca
 * `toISOString`, que convierte a UTC). Mezclar ambos formatos es lo que
 * causaba que, según la zona horaria del navegador, "hoy" o algún día
 * de la lista quedara desfasado un día y apareciera sin ningún horario
 * disponible.
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
