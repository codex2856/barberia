import { useState, type FormEvent } from "react";
import { DEMO_PASSWORD, isLoggedIn, login, logout } from "./adminAuth";
import { BookingsTab } from "./BookingsTab";
import { ServicesTab } from "./ServicesTab";
import { ScheduleTab } from "./ScheduleTab";
import { GalleryTab } from "./GalleryTab";
import { AdminButton, Notice, TextInput } from "./ui";

const TABS = [
  { id: "citas", label: "Citas", view: BookingsTab },
  { id: "servicios", label: "Servicios", view: ServicesTab },
  { id: "horarios", label: "Horarios", view: ScheduleTab },
  { id: "galeria", label: "Galería", view: GalleryTab },
] as const;

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (login(password)) onSuccess();
    else setError(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-charcoal p-8">
        <h1 className="font-display text-3xl text-bone">Panel de administración</h1>
        <label className="block text-xs uppercase tracking-[0.15em] text-bone-faint">
          Contraseña
          <TextInput
            className="mt-1"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
          />
        </label>
        {error && <Notice kind="error">Contraseña incorrecta.</Notice>}
        <AdminButton tone="primary" type="submit" className="w-full">
          Entrar
        </AdminButton>
        <p className="text-xs text-bone-faint">
          Demo de portafolio. Contraseña de prueba: <code className="text-gold-light">{DEMO_PASSWORD}</code>
        </p>
      </form>
    </main>
  );
}

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("citas");

  if (!loggedIn) return <Login onSuccess={() => setLoggedIn(true)} />;

  const Active = TABS.find((t) => t.id === tab)!.view;

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-5 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-bone">THE BARBER · Admin</h1>
        <div className="flex gap-3">
          <a
            href="./"
            className="rounded-full border border-gold/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-bone hover:border-gold hover:bg-gold/10"
          >
            Ver la web
          </a>
          <AdminButton
            onClick={() => {
              logout();
              setLoggedIn(false);
            }}
          >
            Salir
          </AdminButton>
        </div>
      </header>

      <p className="mt-4 rounded-lg border border-white/10 px-3 py-2 text-xs text-bone-dim">
        Modo demo: los cambios se guardan solo en este navegador. Para que los vean todos los visitantes hace falta conectar un servidor.
      </p>

      <nav aria-label="Secciones del panel" className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-current={t.id === tab ? "page" : undefined}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
              t.id === tab ? "bg-gold text-void" : "border border-white/10 text-bone-dim hover:border-gold/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        <Active />
      </div>
    </div>
  );
}
