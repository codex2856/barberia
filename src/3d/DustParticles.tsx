import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 140;

/** Polvo ambiental muy sutil — se omite en dispositivos de bajo rendimiento. */
export function DustParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = Math.random() * 3.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 0.5;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    const attribute = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const nextY = attribute.getY(i) + delta * 0.05;
      attribute.setY(i, nextY > 3.5 ? 0 : nextY);
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        color="#d8b96a"
        transparent
        opacity={0.32}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
