import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import {
  createBarberPoleTexture,
  createBrickWallTexture,
  createWoodFloorTexture,
  createWoodPanelTexture,
} from "./textures";

/**
 * Interior de barbería propio y original: ladrillo arriba, paneles de
 * madera abajo, piso de madera, lámparas colgantes y un poste de
 * barbería giratorio — todo generado por código (texturas en <canvas> +
 * geometría propia), sin fotografías de terceros.
 */
interface BarbershopBackdropProps {
  enableShadows: boolean;
  /** Desactiva lámparas, espejos y el poste en gama baja. */
  showDetails: boolean;
}

function PendantLight({ x, castShadow }: { x: number; castShadow: boolean }) {
  return (
    <group position={[x, 5.6, -1]}>
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 1.4, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, -0.78, 0]} castShadow={castShadow}>
        <coneGeometry args={[0.14, 0.12, 16, 1, true]} />
        <meshStandardMaterial color="#2a2a2e" metalness={0.6} roughness={0.4} side={2} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#ffe3b0" emissive="#ffb864" emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

function BarberPole() {
  const poleTexture = useMemo(() => createBarberPoleTexture(), []);
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 1.1;
  });
  return (
    <group position={[-4.4, 1.5, -1.8]}>
      <mesh ref={ref} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 1.5, 24]} />
        <meshStandardMaterial map={poleTexture} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.82, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

export function BarbershopBackdrop({ enableShadows, showDetails }: BarbershopBackdropProps) {
  const brick = useMemo(() => createBrickWallTexture(), []);
  const wood = useMemo(() => createWoodFloorTexture(), []);
  const woodPanel = useMemo(() => createWoodPanelTexture(), []);

  return (
    <group>
      {/* pared de ladrillo (mitad superior) */}
      <mesh position={[0, 4.4, -3.4]} receiveShadow>
        <planeGeometry args={[24, 6.4]} />
        <meshStandardMaterial map={brick} roughness={0.95} metalness={0} />
      </mesh>

      {/* zócalo de madera (mitad inferior, tipo boiserie) */}
      <mesh position={[0, 0, -3.38]} receiveShadow>
        <planeGeometry args={[24, 2.4]} />
        <meshStandardMaterial map={woodPanel} roughness={0.55} metalness={0.05} />
      </mesh>

      {/* piso de madera */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial map={wood} roughness={0.75} metalness={0.05} />
      </mesh>

      {showDetails && (
        <>
          {/* lámparas colgantes de tungsteno */}
          {[-3.2, 0, 3.2].map((x) => (
            <PendantLight key={x} x={x} castShadow={enableShadows} />
          ))}

          {/* paneles tenues a los lados, sugieren espejos de tocador */}
          {[-2.6, 2.6].map((x) => (
            <mesh key={x} position={[x, 1.6, -3.2]}>
              <planeGeometry args={[1.3, 2.4]} />
              <meshStandardMaterial color="#cfd6dd" roughness={0.15} metalness={0.6} />
            </mesh>
          ))}

          <BarberPole />
        </>
      )}
    </group>
  );
}
