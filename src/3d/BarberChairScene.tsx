import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SceneLighting } from "./SceneLighting";
import { PointerRig } from "./PointerRig";
import { ScrollCameraRig } from "./ScrollCameraRig";
import { DustParticles } from "./DustParticles";
import { getDprCap } from "../utils/device";

interface CameraFraming {
  z: [number, number];
  y: [number, number];
  fov: [number, number];
  lookAt: [number, number];
}

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
  // En desktop la silla se desplaza a la derecha para dejar sitio al texto
  // (el texto se apila arriba en móvil, así que ahí queda centrada).
  const chairOffsetX = isMobile ? 0 : 0.85;
  const chairScale = isMobile ? 0.48 : 1;

  // Encuadre: en desktop, primer plano dramático sobre la silla; en móvil
  // la cámara se aleja más y apunta más abajo para que la silla quede por
  // detrás/debajo del bloque de texto en vez de superponerse a él.
  const framing: CameraFraming = isMobile
    ? { z: [5.6, 6.4], y: [0.45, 0.85], fov: [32, 28], lookAt: [0, -0.55] }
    : { z: [5, 6], y: [0.9, 1.5], fov: [32, 28], lookAt: [0, 0.05] };

  return (
    <Canvas
      dpr={dpr}
      shadows={enableShadows}
      gl={{ antialias: !lowEnd, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, framing.y[0], framing.z[0]], fov: framing.fov[0] }}
      frameloop={visible ? "always" : "never"}
    >
      <color attach="background" args={["#f0eee7"]} />
      <fog attach="fog" args={["#f0eee7", 7, 15]} />
      <SceneLighting enableShadows={enableShadows} />
      <PointerRig subtle={reducedMotion || isMobile} offsetX={chairOffsetX} scale={chairScale} />
      <ScrollCameraRig
        progressRef={scrollProgress}
        zRange={framing.z}
        yRange={framing.y}
        fovRange={framing.fov}
        lookAt={framing.lookAt}
      />
      {!lowEnd && !reducedMotion && <DustParticles />}
      {!lowEnd && (
        <ContactShadows position={[chairOffsetX, -1.2, 0]} opacity={0.32} scale={6} blur={2} far={2} color="#000000" />
      )}
      <mesh position={[0, -1.201, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0eee7" roughness={0.95} metalness={0} />
      </mesh>
    </Canvas>
  );
}
