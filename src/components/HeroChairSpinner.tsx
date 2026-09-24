import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * "Spinner" de producto: 8 fotos de la MISMA silla generadas en una sola
 * hoja de contacto (para que la iluminación/fondo/encuadre coincidan
 * entre frames) y luego recortadas. Al mover el cursor de izquierda a
 * derecha sobre el Hero, se cambia de frame según la posición
 * horizontal — igual que los visores 360° de producto — dando la
 * sensación de que la silla gira contigo. No es una rotación 3D real
 * (son fotos fijas), así que solo cubre el arco de 180° que existe
 * como fotos: perfil izquierdo → frente → perfil derecho.
 */
const FRAME_COUNT = 8;
const DEFAULT_FRAME = 3; // la vista más de frente, usada en reposo/reduced motion
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `hero/spin/frame-${i}.jpg`);

export function HeroChairSpinner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(DEFAULT_FRAME);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    function handleMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(x * FRAME_COUNT)));
      setActiveFrame(index);
    }
    function handleLeave() {
      setActiveFrame(DEFAULT_FRAME);
    }

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0" role="img" aria-label="Silla de barbero clásica">
      {FRAMES.map((src, index) => (
        <img
          key={src}
          src={`${import.meta.env.BASE_URL}${src}`}
          alt=""
          aria-hidden="true"
          // Los frames son casi cuadrados (fotos de estudio de la silla
          // sola) y el Hero es muy panorámico: si se estirasen a
          // object-cover a pantalla completa, la silla quedaría
          // recortada/ampliada de forma exagerada. En vez de eso, se
          // ancla a la derecha respetando su proporción real (como la
          // silla 3D original), dejando que el fondo sólido de la
          // sección ocupe el lado izquierdo, donde está el texto. La
          // máscara difumina el borde izquierdo de la foto para que se
          // funda con ese fondo en vez de verse como un corte recto.
          className="absolute right-0 top-0 h-full w-auto [-webkit-mask-image:linear-gradient(to_right,transparent,black_18%)] [mask-image:linear-gradient(to_right,transparent,black_18%)] transition-opacity duration-150 ease-out"
          style={{ opacity: index === activeFrame ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
