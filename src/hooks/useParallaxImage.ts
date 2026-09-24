import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Parallax sutil para una imagen de fondo a pantalla completa: se
 * escala un poco más grande que su contenedor y se desplaza unos
 * píxeles en dirección opuesta al cursor, dando sensación de
 * profundidad sin distorsionar la foto ni dejar huecos en los bordes
 * (a diferencia de un tilt/rotación 3D, que sí los deja en una imagen
 * plana). `containerRef` decide sobre qué área se escucha el cursor
 * (normalmente la sección del Hero, no solo la imagen).
 */
export function useParallaxImage<C extends HTMLElement, I extends HTMLElement>(amplitude = 18) {
  const containerRef = useRef<C>(null);
  const imageRef = useRef<I>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image || reducedMotion) return;

    function handleMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      image!.style.transform = `scale(1.08) translate(${(-px * amplitude).toFixed(1)}px, ${(-py * amplitude).toFixed(1)}px)`;
    }
    function handleLeave() {
      image!.style.transform = "scale(1.08) translate(0, 0)";
    }

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, [amplitude, reducedMotion]);

  return { containerRef, imageRef };
}
