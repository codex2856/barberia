/**
 * Acceso al panel de admin — SOLO PARA LA DEMO.
 *
 * Esta contraseña vive en el código de la web, así que cualquiera que
 * abra las herramientas del navegador puede verla: sirve para enseñar el
 * panel en un portafolio, no para proteger datos reales. Para un negocio
 * de verdad hay que sustituir esto por un login con servidor (Supabase
 * Auth u otro) y reglas de acceso en la base de datos.
 */
const SESSION_KEY = "the-barber:admin-session";

export const DEMO_PASSWORD = "barber2026";

export function isLoggedIn(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function login(password: string): boolean {
  if (password !== DEMO_PASSWORD) return false;
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // sin sessionStorage: el acceso solo dura mientras no se recargue
  }
  return true;
}

export function logout(): void {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // nada que borrar
  }
}
