import { lazy, Suspense } from "react";
import { useDeviceCapability } from "../hooks/useWebGLSupport";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIsMobile } from "../hooks/useMediaQuery";
import { HeroFallback } from "./HeroFallback";

const BarberChairScene = lazy(() => import("./BarberChairScene"));

interface LazyBarberChairSceneProps {
  heroSelector: string;
}

function SceneSkeleton() {
  return (
    <div className="h-full w-full animate-pulse bg-[radial-gradient(circle_at_center,rgba(201,162,75,0.08),transparent_70%)]" />
  );
}

/**
 * Punto de entrada público de la escena 3D del Hero. Decide, en el
 * cliente, si puede cargar Three.js (WebGL disponible) y con qué nivel
 * de calidad, cargando el bundle 3D de forma diferida en cualquier caso.
 */
export function LazyBarberChairScene({ heroSelector }: LazyBarberChairSceneProps) {
  const { webglSupported, lowEnd, checked } = useDeviceCapability();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  if (!checked) return <SceneSkeleton />;
  if (!webglSupported) return <HeroFallback />;

  return (
    <Suspense fallback={<SceneSkeleton />}>
      <BarberChairScene
        heroSelector={heroSelector}
        isMobile={isMobile}
        lowEnd={lowEnd}
        reducedMotion={reducedMotion}
      />
    </Suspense>
  );
}
