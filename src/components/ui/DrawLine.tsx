import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface DrawLineProps {
  className?: string;
}

/** Línea decorativa que se dibuja al entrar en el viewport. */
export function DrawLine({ className = "" }: DrawLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: reducedMotion ? 0 : length });
    if (reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: path,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" });
      },
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <svg viewBox="0 0 200 2" preserveAspectRatio="none" className={className} aria-hidden>
      <path ref={pathRef} d="M0 1 H200" stroke="#c9a24b" strokeWidth="1" />
    </svg>
  );
}
