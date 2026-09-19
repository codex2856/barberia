import { useGLTF } from "@react-three/drei";

interface GLTFChairProps {
  url: string;
}

/**
 * Carga un modelo GLB/GLTF real cuando exista (ver `BarberChair.tsx`).
 * No se usa todavía: hoy la escena renderiza `ProceduralChair`.
 */
export function GLTFChair({ url }: GLTFChairProps) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
