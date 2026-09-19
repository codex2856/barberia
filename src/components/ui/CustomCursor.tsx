import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const REST_TILT = -32;

/** Máquina de afeitar que sigue al cursor, solo en desktop con puntero fino. */
export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasFinePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    document.documentElement.classList.add("clipper-cursor-active");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let tilt = REST_TILT;
    let rafId: number;

    function handleMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
    }

    function tick() {
      const dx = targetX - x;
      const dy = targetY - y;
      x += dx * 0.24;
      y += dy * 0.24;

      const targetTilt = REST_TILT + Math.max(-22, Math.min(22, dx * 1.1));
      tilt += (targetTilt - tilt) * 0.18;

      if (wrap) {
        wrap.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-8px, -10px) rotate(${tilt}deg)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove("clipper-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={wrapRef} className="clipper-cursor" aria-hidden>
      <svg width="54" height="26" viewBox="0 0 64 32" fill="none">
        {/* dientes de la cuchilla */}
        <rect x="1" y="9" width="2" height="14" fill="#cfae5c" />
        <rect x="4.4" y="9" width="2" height="14" fill="#cfae5c" />
        <rect x="7.8" y="9" width="2" height="14" fill="#cfae5c" />
        <rect x="11.2" y="9" width="2" height="14" fill="#cfae5c" />
        {/* base de la cuchilla */}
        <rect x="1" y="7" width="14" height="4" rx="1" fill="#eeda9e" />
        {/* cuerpo de la máquina */}
        <rect x="14" y="4" width="46" height="24" rx="9" fill="#161113" stroke="#c9a24b" strokeWidth="1" />
        {/* rejilla de ventilación */}
        <line x1="34" y1="10" x2="34" y2="22" stroke="#c9a24b" strokeWidth="1" opacity="0.4" />
        <line x1="38" y1="10" x2="38" y2="22" stroke="#c9a24b" strokeWidth="1" opacity="0.4" />
        {/* interruptor */}
        <rect x="45" y="12" width="11" height="8" rx="4" fill="#0a0a0b" stroke="#c9a24b" strokeWidth="1" />
        <circle cx="48.5" cy="16" r="2.4" fill="#cfae5c" />
      </svg>
    </div>
  );
}
