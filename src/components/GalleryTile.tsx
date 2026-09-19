import { useTilt } from "../hooks/useTilt";
import type { GalleryItem } from "../data/gallery";

const GRADIENTS: Record<string, string> = {
  fade: "from-[#232327] via-charcoal to-void",
  clasico: "from-[#2a2118] via-charcoal to-void",
  barba: "from-[#1f1a2e] via-charcoal to-void",
  diseno: "from-[#2e1a1a] via-charcoal to-void",
  textura: "from-[#1a2a24] via-charcoal to-void",
  cejas: "from-[#241a2e] via-charcoal to-void",
};

interface GalleryTileProps {
  item: GalleryItem;
}

/**
 * Placeholder visual reemplazable: cuando existan fotografías reales,
 * basta con añadir `image` en `data/gallery.ts` y renderizar un <img>
 * dentro de este mismo contenedor sin tocar el resto de la sección.
 */
export function GalleryTile({ item }: GalleryTileProps) {
  const tiltRef = useTilt<HTMLDivElement>(4);

  return (
    <div
      ref={tiltRef}
      role="img"
      aria-label={`Placeholder de corte de estilo ${item.style} — pendiente de sustituir por fotografía real`}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10"
      style={{ willChange: "transform" }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[item.id] ?? "from-charcoal-light to-void"} transition-transform duration-700 ease-out group-hover:scale-110`}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">{item.style}</p>
        <p className="mt-1 text-xs text-bone-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {item.description}
        </p>
      </div>
    </div>
  );
}
