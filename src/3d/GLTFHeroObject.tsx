import { useGLTF } from "@react-three/drei";

interface GLTFHeroObjectProps {
  url: string;
}

/**
 * Carga un modelo GLB/GLTF real cuando exista (ver `HeroObject.tsx`).
 * No se usa todavía: hoy la escena renderiza `HeroBarberPole`.
 */
export function GLTFHeroObject({ url }: GLTFHeroObjectProps) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
