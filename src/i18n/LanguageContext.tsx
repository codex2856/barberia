import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "es" | "en";

/** Entrada bilingüe: `{ es: "...", en: "..." }`. */
export type Bilingual = Record<Language, string>;

export function tr(entry: Bilingual, language: Language): string {
  return entry[language];
}

const STORAGE_KEY = "the-barber:lang";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // localStorage no disponible (modo privado, etc.) — se queda en el idioma por defecto.
  }
  return "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignorar — el idioma sigue funcionando para esta sesión, solo no persiste.
    }
  }, [language]);

  function toggleLanguage() {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
}
