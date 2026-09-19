import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/** Cursor personalizado muy sutil, solo en desktop con puntero fino. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasFinePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let rafId: number;

    function handleMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
    }

    function tick() {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      if (dot) dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className="custom-cursor" aria-hidden />;
}
