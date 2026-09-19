import { useMemo } from "react";
import { createBrickWallTexture, createWoodFloorTexture } from "./textures";

/**
 * Interior de barbería propio y original: pared de ladrillo y piso de
 * madera generados por código (texturas en <canvas>, sin fotografías de
 * terceros), más un par de tiras de luz cálida sugiriendo lámparas.
 */
interface BarbershopBackdropProps {
  enableShadows: boolean;
  /** Desactiva las tiras de luz y los paneles de espejo en gama baja. */
  showDetails: boolean;
}

export function BarbershopBackdrop({ enableShadows, showDetails }: BarbershopBackdropProps) {
  const brick = useMemo(() => createBrickWallTexture(), []);
  const wood = useMemo(() => createWoodFloorTexture(), []);

  return (
    <group>
      {/* pared de ladrillo */}
      <mesh position={[0, 3.2, -3.4]} receiveShadow>
        <planeGeometry args={[24, 10]} />
        <meshStandardMaterial map={brick} roughness={0.95} metalness={0} />
      </mesh>

      {/* piso de madera */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial map={wood} roughness={0.75} metalness={0.05} />
      </mesh>

      {showDetails && (
        <>
          {/* tiras de luz cálida, sugieren lámparas colgantes de la barbería */}
          {[-3.2, 0, 3.2].map((x) => (
            <mesh key={x} position={[x, 5.4, -1]} castShadow={enableShadows}>
              <boxGeometry args={[0.08, 0.08, 2.4]} />
              <meshStandardMaterial color="#ffd9a0" emissive="#ffb864" emissiveIntensity={2.2} toneMapped={false} />
            </mesh>
          ))}

          {/* paneles tenues a los lados, sugieren espejos de tocador */}
          {[-2.6, 2.6].map((x) => (
            <mesh key={x} position={[x, 1.6, -3.2]}>
              <planeGeometry args={[1.3, 2.4]} />
              <meshStandardMaterial color="#cfd6dd" roughness={0.15} metalness={0.6} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}
