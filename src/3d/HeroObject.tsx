import { forwardRef, Suspense } from "react";
import type { Group } from "three";
import type { ThreeElements } from "@react-three/fiber";
import { HeroBarberPole } from "./HeroBarberPole";
import { GLTFHeroObject } from "./GLTFHeroObject";

/**
 * Ruta de un modelo GLB/GLTF real. Cuando exista el archivo definitivo,
 * colócalo en `public/models/hero-object.glb` y actualiza esta constante
 * (por ejemplo: "/models/hero-object.glb"). El resto de la escena
 * —rotación por cursor, parallax, respuesta al scroll— sigue funcionando
 * igual porque toda esa lógica vive en el componente padre (CameraRig),
 * no aquí.
 */
export const HERO_MODEL_URL: string | null = null;

interface HeroObjectProps {
  /** Desactiva el giro continuo de las franjas del poste (reduced motion). */
  spin: boolean;
}

type HeroObjectGroupProps = HeroObjectProps & ThreeElements["group"];

export const HeroObject = forwardRef<Group, HeroObjectGroupProps>(function HeroObject(
  { spin, ...props },
  ref,
) {
  return (
    <group ref={ref} {...props}>
      {HERO_MODEL_URL ? (
        <Suspense fallback={<HeroBarberPole spin={spin} />}>
          <GLTFHeroObject url={HERO_MODEL_URL} />
        </Suspense>
      ) : (
        <HeroBarberPole spin={spin} />
      )}
    </group>
  );
});
