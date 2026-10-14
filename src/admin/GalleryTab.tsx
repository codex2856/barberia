import { useRef, useState } from "react";
import { DEFAULT_GALLERY, galleryItems, type GalleryItem } from "../data/gallery";
import { resetConfigKey, writeConfig } from "../data/adminStore";
import { AdminButton, Notice, TextInput } from "./ui";

const MAX_SIDE = 900;

/** Reduce la foto antes de guardarla: el navegador solo permite unos 5 MB en total. */
function resizeToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        return reject(new Error("canvas"));
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}

export function GalleryTab() {
  const [items, setItems] = useState<GalleryItem[]>(() => galleryItems.map((g) => ({ ...g })));
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const addInput = useRef<HTMLInputElement>(null);
  const replaceInput = useRef<HTMLInputElement>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  function update(index: number, patch: Partial<GalleryItem>) {
    setItems((list) => list.map((g, i) => (i === index ? { ...g, ...patch } : g)));
    setMessage(null);
  }

  async function handleFiles(files: FileList | null, index: number | null) {
    if (!files || files.length === 0) return;
    try {
      if (index !== null) {
        update(index, { image: await resizeToDataUrl(files[0]) });
      } else {
        const added: GalleryItem[] = [];
        for (const file of Array.from(files)) {
          added.push({
            id: `foto-${Date.now().toString(36)}-${added.length}`,
            style: file.name.replace(/\.[^.]+$/, "").slice(0, 40) || "Nuevo trabajo",
            description: "",
            image: await resizeToDataUrl(file),
          });
        }
        setItems((list) => [...list, ...added]);
      }
      setMessage(null);
    } catch {
      setMessage({ kind: "error", text: "No se pudo leer esa imagen. Prueba con un JPG o PNG." });
    }
  }

  function save() {
    if (items.some((g) => !g.style.trim())) return setMessage({ kind: "error", text: "Cada trabajo necesita un título." });
    const ok = writeConfig({ gallery: items });
    setMessage(
      ok
        ? { kind: "ok", text: "Galería guardada. Ya se ve en la web." }
        : { kind: "error", text: "No cabe: el navegador no pudo guardar tantas fotos. Quita alguna o usa fotos más pequeñas." },
    );
  }

  function restore() {
    resetConfigKey("gallery");
    setItems(DEFAULT_GALLERY.map((g) => ({ ...g })));
    setMessage({ kind: "ok", text: "Galería original restaurada." });
  }

  return (
    <section aria-labelledby="tab-gallery">
      <h2 id="tab-gallery" className="font-display text-2xl text-bone">
        Galería de trabajos
      </h2>

      <input ref={addInput} type="file" accept="image/*" multiple hidden onChange={(e) => { void handleFiles(e.target.files, null); e.target.value = ""; }} />
      <input
        ref={replaceInput}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => { void handleFiles(e.target.files, replaceIndex); e.target.value = ""; }}
      />

      <ul className="mt-6 space-y-3">
        {items.map((g, i) => (
          <li key={g.id} className="grid gap-3 rounded-lg border border-white/10 p-3 sm:grid-cols-[80px_1fr_1fr_auto] sm:items-center">
            <div className="aspect-[4/5] w-20 overflow-hidden rounded-md bg-charcoal-light">
              {g.image ? <img src={g.image} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[10px] text-bone-faint">Sin foto</div>}
            </div>
            <label className="text-xs uppercase tracking-[0.15em] text-bone-faint">
              Título
              <TextInput className="mt-1" value={g.style} onChange={(e) => update(i, { style: e.target.value })} />
            </label>
            <label className="text-xs uppercase tracking-[0.15em] text-bone-faint">
              Descripción
              <TextInput className="mt-1" value={g.description} onChange={(e) => update(i, { description: e.target.value })} />
            </label>
            <div className="flex gap-2 sm:flex-col">
              <AdminButton onClick={() => { setReplaceIndex(i); replaceInput.current?.click(); }}>{g.image ? "Cambiar foto" : "Poner foto"}</AdminButton>
              <AdminButton tone="danger" onClick={() => setItems((list) => list.filter((_, idx) => idx !== i))}>Quitar</AdminButton>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-3">
        <AdminButton onClick={() => addInput.current?.click()}>Subir fotos</AdminButton>
        <AdminButton tone="primary" onClick={save}>Guardar galería</AdminButton>
        <AdminButton onClick={restore}>Restaurar originales</AdminButton>
      </div>
      {message && (
        <div className="mt-4">
          <Notice kind={message.kind}>{message.text}</Notice>
        </div>
      )}
      <p className="mt-4 text-xs text-bone-faint">
        Las fotos se reducen y se guardan en este navegador. Con un servidor se guardarían en la nube sin este límite.
      </p>
    </section>
  );
}
