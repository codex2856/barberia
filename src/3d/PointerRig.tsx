import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BarberChair } from "./BarberChair";

interface PointerRigProps {
  /** Desactiva la inclinación vertical y reduce la sensibilidad (reduced motion). */
  subtle: boolean;
  /** Desplazamiento horizontal de la silla (0 en móvil, centrada). */
  offsetX: number;
  /** Escala de la silla (más pequeña en móvil para no tapar el texto). */
  scale: number;
}

const MAX_YAW = 0.62;
const MAX_PITCH = 0.11;
const DRAG_SENSITIVITY = 3.2;

/**
 * Silla con rotación suave controlada por el cursor (desktop) o por
 * drag/swipe (touch). El movimiento se amortigua cada frame para que
 * nunca se sienta brusco.
 */
export function PointerRig({ subtle, offsetX, scale }: PointerRigProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const target = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, lastX: 0 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") {
        if (!drag.current.active) return;
        const deltaX = event.clientX - drag.current.lastX;
        drag.current.lastX = event.clientX;
        target.current.x = THREE.MathUtils.clamp(
          target.current.x + (deltaX / window.innerWidth) * DRAG_SENSITIVITY,
          -1.4,
          1.4,
        );
        return;
      }
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType !== "touch") return;
      drag.current.active = true;
      drag.current.lastX = event.clientX;
    }

    function handlePointerUp() {
      drag.current.active = false;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const smoothing = 1 - Math.exp(-5 * delta);
    const sensitivity = subtle ? 0.6 : 1;
    const targetYaw = target.current.x * MAX_YAW * sensitivity;
    const targetPitch = subtle ? 0 : target.current.y * MAX_PITCH;
    groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * smoothing;
    groupRef.current.rotation.x += (targetPitch - groupRef.current.rotation.x) * smoothing;
  });

  return <BarberChair ref={groupRef} position={[offsetX, -1.2, 0]} scale={scale} />;
}
