/**
 * Horarios de apertura.
 * PLACEHOLDER — todavía no son los horarios reales del negocio.
 * Editar este archivo cuando se confirmen los horarios definitivos.
 */
export interface DaySchedule {
  day: string;
  shortDay: string;
  hours: string | null;
  closed?: boolean;
}

export const isSchedulePlaceholder = true;

export const schedule: DaySchedule[] = [
  { day: "Lunes", shortDay: "LUN", hours: "09:00 — 19:00" },
  { day: "Martes", shortDay: "MAR", hours: "09:00 — 19:00" },
  { day: "Miércoles", shortDay: "MIÉ", hours: "09:00 — 19:00" },
  { day: "Jueves", shortDay: "JUE", hours: "09:00 — 19:00" },
  { day: "Viernes", shortDay: "VIE", hours: "09:00 — 20:00" },
  { day: "Sábado", shortDay: "SÁB", hours: "10:00 — 15:00" },
  { day: "Domingo", shortDay: "DOM", hours: null, closed: true },
];
