import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { createBarberPoleTexture } from "./textures";

/**
 * Poste de barbería 3D generado de forma procedural: el símbolo más
 * reconocible de una barbería, en vez de una silla. Base y remates
 * cromados/dorados, franjas giratorias con la textura procedural ya
 * existente (`createBarberPoleTexture`), efecto clásico de "ascenso"
 * infinito de las franjas (rotación continua del cilindro interior,
 * independiente del giro por cursor que aplica el componente padre).
 */

const chromeMaterial = (
  <meshStandardMaterial color="#c9cbd2" metalness={1} roughness={0.16} envMapIntensity={1.3} />
);
const darkMetalMaterial = <meshStandardMaterial color="#1c1c1f" metalness={0.85} roughness={0.35} />;
const goldMaterial = <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.24} />;
const glassMaterial = (
  <meshStandardMaterial color="#ffe3b0" emissive="#ffb864" emissiveIntensity={1.8} roughness={0.2} toneMapped={false} />
);

interface HeroBarberPoleProps {
  /** Desactiva el giro continuo de las franjas (reduced motion). */
  spin: boolean;
}

export function HeroBarberPole({ spin }: HeroBarberPoleProps) {
  const stripeRef = useRef<THREE.Mesh>(null!);
  const poleTexture = useMemo(() => {
    const texture = createBarberPoleTexture();
    texture.repeat.set(1, 3.2);
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (!spin || !stripeRef.current) return;
    stripeRef.current.rotation.y += delta * 1.6;
  });

  return (
    <group>
      {/* Base circular en el suelo */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.58, 0.06, 48]} />
        {darkMetalMaterial}
      </mesh>
      <mesh position={[0, 0.065, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.46, 0.012, 16, 64]} />
        {goldMaterial}
      </mesh>

      {/* Pedestal cromado */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 0.5, 32]} />
        {chromeMaterial}
      </mesh>

      {/* Collar oscuro donde el pedestal se une al poste */}
      <RoundedBox args={[0.34, 0.14, 0.34]} radius={0.03} smoothness={4} position={[0, 0.62, 0]} castShadow>
        {darkMetalMaterial}
      </RoundedBox>
      <mesh position={[0, 0.69, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.19, 0.012, 12, 48]} />
        {goldMaterial}
      </mesh>

      {/* Cilindro de cristal con franjas giratorias (el poste en sí) */}
      <mesh ref={stripeRef} position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 1.7, 32]} />
        <meshStandardMaterial map={poleTexture} roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Collar dorado superior */}
      <mesh position={[0, 2.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.19, 0.012, 12, 48]} />
        {goldMaterial}
      </mesh>
      <RoundedBox args={[0.34, 0.1, 0.34]} radius={0.03} smoothness={4} position={[0, 2.47, 0]} castShadow>
        {darkMetalMaterial}
      </RoundedBox>

      {/* Globo de cristal iluminado */}
      <mesh position={[0, 2.68, 0]} castShadow>
        <sphereGeometry args={[0.17, 24, 24]} />
        {glassMaterial}
      </mesh>

      {/* Remate dorado */}
      <mesh position={[0, 2.92, 0]} castShadow>
        <sphereGeometry args={[0.09, 20, 20]} />
        {goldMaterial}
      </mesh>
      <mesh position={[0, 3.02, 0]} castShadow>
        <coneGeometry args={[0.05, 0.14, 20]} />
        {goldMaterial}
      </mesh>
    </group>
  );
}
