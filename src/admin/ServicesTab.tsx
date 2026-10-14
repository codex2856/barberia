import { useState } from "react";
import { DEFAULT_SERVICES, services as currentServices, type Service } from "../data/services";
import { resetConfigKey, writeConfig } from "../data/adminStore";
import { AdminButton, Notice, TextInput } from "./ui";

function numberOrNull(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value.replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

export function ServicesTab() {
  const [items, setItems] = useState<Service[]>(() => currentServices.map((s) => ({ ...s })));
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  function update(index: number, patch: Partial<Service>) {
    setItems((list) => list.map((s, i) => (i === index ? { ...s, ...patch } : s)));
    setMessage(null);
  }

  function addService() {
    setItems((list) => [...list, { id: `servicio-${Date.now().toString(36)}`, name: "", price: null, duration: 30 }]);
    setMessage(null);
  }

  function save() {
    for (const s of items) {
      if (!s.name.trim()) return setMessage({ kind: "error", text: "Todos los servicios necesitan un nombre." });
      if (s.price !== null && (Number.isNaN(s.price) || s.price < 0))
        return setMessage({ kind: "error", text: `El precio de «${s.name}» no es válido.` });
      if (s.duration !== null && (Number.isNaN(s.duration) || s.duration <= 0))
        return setMessage({ kind: "error", text: `La duración de «${s.name}» no es válida.` });
    }
    const ok = writeConfig({ services: items.map((s) => ({ ...s, name: s.name.trim() })) });
    setMessage(
      ok
        ? { kind: "ok", text: "Servicios guardados. Ya se ven en la web." }
        : { kind: "error", text: "El navegador no pudo guardar los cambios." },
    );
  }

  function restore() {
    resetConfigKey("services");
    setItems(DEFAULT_SERVICES.map((s) => ({ ...s })));
    setMessage({ kind: "ok", text: "Servicios originales restaurados." });
  }

  return (
    <section aria-labelledby="tab-services">
      <h2 id="tab-services" className="font-display text-2xl text-bone">
        Servicios y precios
      </h2>

      <ul className="mt-6 space-y-3">
        {items.map((s, i) => (
          <li key={s.id} className="grid gap-3 rounded-lg border border-white/10 p-3 sm:grid-cols-[1fr_110px_110px_auto_auto] sm:items-end">
            <label className="text-xs uppercase tracking-[0.15em] text-bone-faint">
              Nombre
              <TextInput className="mt-1" value={s.name} onChange={(e) => update(i, { name: e.target.value })} />
            </label>
            <label className="text-xs uppercase tracking-[0.15em] text-bone-faint">
              Precio (€)
              <TextInput
                className="mt-1"
                inputMode="decimal"
                placeholder="a confirmar"
                value={s.price === null || Number.isNaN(s.price) ? "" : String(s.price)}
                onChange={(e) => update(i, { price: numberOrNull(e.target.value) })}
              />
            </label>
            <label className="text-xs uppercase tracking-[0.15em] text-bone-faint">
              Minutos
              <TextInput
                className="mt-1"
                inputMode="numeric"
                placeholder="a confirmar"
                value={s.duration === null || Number.isNaN(s.duration) ? "" : String(s.duration)}
                onChange={(e) => update(i, { duration: numberOrNull(e.target.value) })}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-bone-dim">
              <input type="checkbox" checked={!!s.popular} onChange={(e) => update(i, { popular: e.target.checked })} />
              Popular
            </label>
            <AdminButton tone="danger" onClick={() => setItems((list) => list.filter((_, idx) => idx !== i))}>
              Quitar
            </AdminButton>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-3">
        <AdminButton onClick={addService}>Añadir servicio</AdminButton>
        <AdminButton tone="primary" onClick={save}>
          Guardar cambios
        </AdminButton>
        <AdminButton onClick={restore}>Restaurar originales</AdminButton>
      </div>
      {message && (
        <div className="mt-4">
          <Notice kind={message.kind}>{message.text}</Notice>
        </div>
      )}
      <p className="mt-4 text-xs text-bone-faint">
        Los servicios nuevos aparecen en español; la traducción al inglés solo existe para los originales.
      </p>
    </section>
  );
}
