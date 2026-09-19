import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let sharedLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return sharedLenis;
}

/**
 * Inicializa Lenis (smooth scroll) y lo sincroniza con el ticker de GSAP
 * para que ScrollTrigger reciba las mismas posiciones de scroll. Si está
 * desactivado (prefers-reduced-motion o dispositivo de bajo rendimiento),
 * deja el scroll nativo del navegador intacto.
 */
export function useLenis(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    sharedLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      sharedLenis = null;
    };
  }, [enabled]);
}
