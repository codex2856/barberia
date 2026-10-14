/**
 * Configuración editable desde el panel de admin (`/#/admin`).
 *
 * Hoy se guarda en `localStorage`: sirve para la demo de portfolio, pero
 * SOLO existe en el navegador de quien edita. Cuando haya un backend real
 * (por ejemplo Supabase), basta con reemplazar `readConfig` / `writeConfig`
 * por llamadas a esa API: el resto de la web solo conoce esta interfaz.
 */
import type { Service } from "./services";
import type { RawScheduleDay } from "./schedule";
import type { GalleryItem } from "./gallery";

export interface AdminConfig {
  services?: Service[];
  schedule?: RawScheduleDay[];
  /** Días sin servicio (vacaciones, festivos), formato YYYY-MM-DD. */
  blockedDates?: string[];
  gallery?: GalleryItem[];
}

const STORAGE_KEY = "the-barber:admin-config";

export function readConfig(): AdminConfig {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as AdminConfig) : {};
  } catch {
    return {};
  }
}

/** Devuelve `false` si el navegador no pudo guardar (cuota llena, modo privado). */
export function writeConfig(patch: Partial<AdminConfig>): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readConfig(), ...patch }));
    return true;
  } catch {
    return false;
  }
}

/** Quita un apartado para volver a los valores por defecto de la plantilla. */
export function resetConfigKey(key: keyof AdminConfig): void {
  const current = readConfig();
  delete current[key];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // sin almacenamiento disponible: nada que restaurar
  }
}

export function isDateBlocked(isoDate: string): boolean {
  return (readConfig().blockedDates ?? []).includes(isoDate);
}
