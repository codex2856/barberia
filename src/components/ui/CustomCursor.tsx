import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const REST_TILT = -32;

/** Navaja de barbero que sigue al cursor, solo en desktop con puntero fino. */
export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasFinePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    document.documentElement.classList.add("razor-cursor-active");

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
      document.documentElement.classList.remove("razor-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={wrapRef} className="razor-cursor" aria-hidden>
      <svg width="52" height="26" viewBox="0 0 64 32" fill="none">
        {/* hoja */}
        <polygon points="2,16 34,7 34,25" fill="#cfae5c" />
        <polygon points="2,16 34,7 34,11" fill="#eeda9e" opacity="0.8" />
        {/* pivote */}
        <circle cx="34" cy="16" r="3" fill="#0a0a0b" stroke="#c9a24b" strokeWidth="1" />
        {/* mango */}
        <rect x="35" y="8" width="27" height="16" rx="6" fill="#161113" stroke="#c9a24b" strokeWidth="1" />
        <line x1="42" y1="12" x2="42" y2="20" stroke="#c9a24b" strokeWidth="1" opacity="0.5" />
        <line x1="47" y1="12" x2="47" y2="20" stroke="#c9a24b" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}
