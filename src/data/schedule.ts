/**
 * Horarios de apertura — ÚNICA fuente de verdad.
 * PLACEHOLDER — todavía no son los horarios reales del negocio.
 * Editar `RAW_SCHEDULE` cuando se confirmen los horarios definitivos.
 *
 * `src/data/availability.ts` lee de aquí (vía `getScheduleForWeekday`)
 * para generar las horas reservables. Antes existía un horario
 * hardcodeado por separado en `availability.ts` (09:00–19:00 para todos
 * los días) que nunca coincidía con lo que se mostraba aquí — por
 * ejemplo, ofrecía horas de reserva los sábados hasta las 18:30, cuando
 * el negocio cierra a las 15:00. Con una sola fuente, eso ya no puede
 * pasar: cambiar un horario aquí lo cambia también en las reservas.
 */
export interface DaySchedule {
  day: string;
  shortDay: string;
  /** Apertura en formato HH:mm, o null si el día está cerrado. */
  open: string | null;
  /** Cierre en formato HH:mm, o null si el día está cerrado. */
  close: string | null;
  /** Texto ya formateado para mostrar ("09:00 — 19:00"), o null si cerrado. */
  hours: string | null;
  closed: boolean;
}

export const isSchedulePlaceholder = true;

/** Índice 0 = lunes … 6 = domingo (igual que se muestra en la UI). */
const RAW_SCHEDULE: Array<Pick<DaySchedule, "day" | "shortDay" | "open" | "close" | "closed">> = [
  { day: "Lunes", shortDay: "LUN", open: "09:00", close: "19:00", closed: false },
  { day: "Martes", shortDay: "MAR", open: "09:00", close: "19:00", closed: false },
  { day: "Miércoles", shortDay: "MIÉ", open: "09:00", close: "19:00", closed: false },
  { day: "Jueves", shortDay: "JUE", open: "09:00", close: "19:00", closed: false },
  { day: "Viernes", shortDay: "VIE", open: "09:00", close: "20:00", closed: false },
  { day: "Sábado", shortDay: "SÁB", open: "10:00", close: "15:00", closed: false },
  { day: "Domingo", shortDay: "DOM", open: null, close: null, closed: true },
];

export const schedule: DaySchedule[] = RAW_SCHEDULE.map((d) => ({
  ...d,
  hours: d.open && d.close ? `${d.open} — ${d.close}` : null,
}));

/**
 * Devuelve el horario del día para el índice que da `Date.getDay()`
 * (0 = domingo … 6 = sábado), convirtiéndolo al índice de `schedule`
 * (0 = lunes … 6 = domingo) con la misma fórmula que ya usaba la UI.
 */
export function getScheduleForWeekday(jsGetDayIndex: number): DaySchedule {
  const index = (jsGetDayIndex + 6) % 7;
  return schedule[index];
}
