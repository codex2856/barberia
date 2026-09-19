import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MutableRefObject } from "react";

interface ScrollCameraRigProps {
  /** 0 al inicio del hero, 1 cuando el usuario ya hizo scroll fuera de él. */
  progressRef: MutableRefObject<number>;
  /** Distancia de la cámara al inicio y al final del scroll del hero. */
  zRange: [number, number];
  /** Altura de la cámara al inicio y al final del scroll del hero. */
  yRange: [number, number];
  /** Campo de visión al inicio y al final del scroll del hero. */
  fovRange: [number, number];
  /** Punto fijo al que mira la cámara (no se anima con el scroll). */
  lookAt: [number, number];
}

/**
 * Encuadra la cámara sobre la silla y, si hay scroll dentro del hero
 * (progressRef pasa de 0 a 1), la aleja suavemente. Con
 * prefers-reduced-motion, progressRef nunca cambia de 0, así que esto
 * simplemente mantiene el encuadre inicial fijo — necesario para que el
 * lookAt se aplique también en ese caso.
 */
export function ScrollCameraRig({ progressRef, zRange, yRange, fovRange, lookAt }: ScrollCameraRigProps) {
  useFrame(({ camera }) => {
    const p = progressRef.current;
    const perspective = camera as THREE.PerspectiveCamera;
    perspective.position.z = THREE.MathUtils.lerp(zRange[0], zRange[1], p);
    perspective.position.y = THREE.MathUtils.lerp(yRange[0], yRange[1], p);
    perspective.fov = THREE.MathUtils.lerp(fovRange[0], fovRange[1], p);
    perspective.updateProjectionMatrix();
    perspective.lookAt(lookAt[0], lookAt[1], 0);
  });
  return null;
}
