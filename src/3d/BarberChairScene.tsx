import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SceneLighting } from "./SceneLighting";
import { PointerRig } from "./PointerRig";
import { ScrollCameraRig } from "./ScrollCameraRig";
import { DustParticles } from "./DustParticles";
import { getDprCap } from "../utils/device";

interface BarberChairSceneProps {
  heroSelector: string;
  isMobile: boolean;
  lowEnd: boolean;
  reducedMotion: boolean;
}

/**
 * Escena 3D del Hero, pensada para cargarse de forma diferida (ver
 * `LazyBarberChair.tsx`). Toda la interacción vive aquí: rotación por
 * cursor/drag y una ligera reacción de cámara al hacer scroll dentro
 * del hero.
 */
export default function BarberChairScene({ heroSelector, isMobile, lowEnd, reducedMotion }: BarberChairSceneProps) {
  const scrollProgress = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;
    const heroEl = document.querySelector(heroSelector);
    if (!heroEl) return;

    const trigger = ScrollTrigger.create({
      trigger: heroEl,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, [heroSelector, reducedMotion]);

  useEffect(() => {
    const heroEl = document.querySelector(heroSelector);
    if (!heroEl) return;
    // Evita renderizar la escena 3D cuando el hero no está en pantalla.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [heroSelector]);

  const dpr = getDprCap(isMobile, lowEnd);
  const enableShadows = !lowEnd;

  return (
    <Canvas
      dpr={dpr}
      shadows={enableShadows}
      gl={{ antialias: !lowEnd, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.15, 4.4], fov: 36 }}
      frameloop={visible ? "always" : "never"}
    >
      <color attach="background" args={["#0a0a0b"]} />
      <fog attach="fog" args={["#0a0a0b", 6, 12]} />
      <SceneLighting enableShadows={enableShadows} />
      <PointerRig subtle={reducedMotion || isMobile} />
      <ScrollCameraRig progressRef={scrollProgress} active={!reducedMotion} />
      {!lowEnd && !reducedMotion && <DustParticles />}
      {!lowEnd && (
        <ContactShadows position={[0, -1.2, 0]} opacity={0.55} scale={6} blur={2.4} far={2} color="#000000" />
      )}
      <mesh position={[0, -1.201, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111113" roughness={0.9} metalness={0.05} />
      </mesh>
    </Canvas>
  );
}
