import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MutableRefObject } from "react";

interface ScrollCameraRigProps {
  /** 0 al inicio del hero, 1 cuando el usuario ya hizo scroll fuera de él. */
  progressRef: MutableRefObject<number>;
  active: boolean;
}

/** Mueve suavemente la cámara mientras el usuario hace scroll por el hero. */
export function ScrollCameraRig({ progressRef, active }: ScrollCameraRigProps) {
  useFrame(({ camera }) => {
    if (!active) return;
    const p = progressRef.current;
    const perspective = camera as THREE.PerspectiveCamera;
    perspective.position.z = THREE.MathUtils.lerp(4.4, 5.7, p);
    perspective.position.y = THREE.MathUtils.lerp(1.15, 1.75, p);
    perspective.fov = THREE.MathUtils.lerp(36, 30, p);
    perspective.updateProjectionMatrix();
    perspective.lookAt(0, 1.05, 0);
  });
  return null;
}
