import { forwardRef, Suspense } from "react";
import type { Group } from "three";
import type { ThreeElements } from "@react-three/fiber";
import { ProceduralChair } from "./ProceduralChair";
import { GLTFChair } from "./GLTFChair";

/**
 * Ruta de un modelo GLB/GLTF real. Cuando exista el archivo definitivo,
 * colócalo en `public/models/barber-chair.glb` y actualiza esta constante
 * (por ejemplo: "/models/barber-chair.glb"). El resto de la escena
 * —rotación por cursor, parallax, respuesta al scroll— sigue funcionando
 * igual porque toda esa lógica vive en el componente padre (CameraRig),
 * no aquí.
 */
export const CHAIR_MODEL_URL: string | null = null;

type BarberChairProps = ThreeElements["group"];

export const BarberChair = forwardRef<Group, BarberChairProps>(function BarberChair(props, ref) {
  return (
    <group ref={ref} {...props}>
      {CHAIR_MODEL_URL ? (
        <Suspense fallback={<ProceduralChair />}>
          <GLTFChair url={CHAIR_MODEL_URL} />
        </Suspense>
      ) : (
        <ProceduralChair />
      )}
    </group>
  );
});
