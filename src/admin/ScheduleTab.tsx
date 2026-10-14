import { useState } from "react";
import { DEFAULT_RAW_SCHEDULE, schedule as currentSchedule, type RawScheduleDay } from "../data/schedule";
import { readConfig, resetConfigKey, writeConfig } from "../data/adminStore";
import { todayIso } from "../data/availability";
import { AdminButton, Notice, TextInput } from "./ui";

function toRaw(): RawScheduleDay[] {
  return currentSchedule.map(({ day, shortDay, open, close, closed }) => ({ day, shortDay, open, close, closed }));
}

export function ScheduleTab() {
  const [days, setDays] = useState<RawScheduleDay[]>(toRaw);
  const [blocked, setBlocked] = useState<string[]>(() => [...(readConfig().blockedDates ?? [])].sort());
  const [newBlocked, setNewBlocked] = useState("");
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  function update(index: number, patch: Partial<RawScheduleDay>) {
    setDays((list) => list.map((d, i) => (i === index ? { ...d, ...patch } : d)));
    setMessage(null);
  }

  function save() {
    for (const d of days) {
      if (!d.closed && (!d.open || !d.close || d.open >= d.close))
        return setMessage({ kind: "error", text: `${d.day}: la hora de cierre debe ser posterior a la de apertura.` });
    }
    const ok = writeConfig({
      schedule: days.map((d) => (d.closed ? { ...d, open: null, close: null } : d)),
    });
    setMessage(
      ok
        ? { kind: "ok", text: "Horarios guardados. Las reservas ya usan las nuevas horas." }
        : { kind: "error", text: "El navegador no pudo guardar los cambios." },
    );
  }

  function restore() {
    resetConfigKey("schedule");
    setDays(DEFAULT_RAW_SCHEDULE.map((d) => ({ ...d })));
    setMessage({ kind: "ok", text: "Horarios originales restaurados." });
  }

  function saveBlocked(next: string[]) {
    setBlocked(next);
    writeConfig({ blockedDates: next });
  }

  function addBlocked() {
    if (!newBlocked || blocked.includes(newBlocked)) return;
    saveBlocked([...blocked, newBlocked].sort());
    setNewBlocked("");
  }

  return (
    <section aria-labelledby="tab-schedule" className="space-y-10">
      <div>
        <h2 id="tab-schedule" className="font-display text-2xl text-bone">
          Horario semanal
        </h2>
        <ul className="mt-6 space-y-2">
          {days.map((d, i) => (
            <li key={d.shortDay} className="grid items-center gap-3 rounded-lg border border-white/10 p-3 sm:grid-cols-[110px_auto_1fr]">
              <span className="font-display text-lg text-bone">{d.day}</span>
              <label className="flex items-center gap-2 text-sm text-bone-dim">
                <input
                  type="checkbox"
                  checked={d.closed}
                  onChange={(e) =>
                    update(i, e.target.checked ? { closed: true } : { closed: false, open: d.open ?? "09:00", close: d.close ?? "19:00" })
                  }
                />
                Cerrado
              </label>
              {!d.closed && (
                <div className="flex items-center gap-2">
                  <TextInput type="time" aria-label={`Apertura ${d.day}`} value={d.open ?? ""} onChange={(e) => update(i, { open: e.target.value })} />
                  <span className="text-bone-faint">a</span>
                  <TextInput type="time" aria-label={`Cierre ${d.day}`} value={d.close ?? ""} onChange={(e) => update(i, { close: e.target.value })} />
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <AdminButton tone="primary" onClick={save}>
            Guardar horario
          </AdminButton>
          <AdminButton onClick={restore}>Restaurar originales</AdminButton>
        </div>
        {message && (
          <div className="mt-4">
            <Notice kind={message.kind}>{message.text}</Notice>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display text-2xl text-bone">Días libres</h2>
        <p className="mt-1 text-sm text-bone-dim">Vacaciones o festivos: ese día no se podrá reservar. Se guarda al añadirlo.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <TextInput
            type="date"
            aria-label="Día libre"
            className="max-w-[200px]"
            min={todayIso()}
            value={newBlocked}
            onChange={(e) => setNewBlocked(e.target.value)}
          />
          <AdminButton onClick={addBlocked}>Añadir día libre</AdminButton>
        </div>
        {blocked.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {blocked.map((iso) => (
              <li key={iso} className="flex items-center gap-2 rounded-full border border-white/10 py-1 pl-3 pr-1 text-sm text-bone">
                {new Date(`${iso}T00:00:00`).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                <button
                  type="button"
                  aria-label={`Quitar ${iso}`}
                  onClick={() => saveBlocked(blocked.filter((b) => b !== iso))}
                  className="rounded-full px-2 text-bone-faint hover:text-gold"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
