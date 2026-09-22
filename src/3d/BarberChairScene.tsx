import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SceneLighting } from "./SceneLighting";
import { PointerRig } from "./PointerRig";
import { ScrollCameraRig } from "./ScrollCameraRig";
import { DustParticles } from "./DustParticles";
import { getDprCap } from "../utils/device";
import { useBooking } from "../components/booking/BookingContext";
import { BarbershopBackdrop } from "./BarbershopBackdrop";

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
  const { isOpen: bookingOpen } = useBooking();

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
  // En desktop el objeto se desplaza a la derecha para dejar sitio al texto
  // (el texto se apila arriba en móvil, así que ahí queda centrado).
  const heroOffsetX = isMobile ? 0 : 0.85;
  const heroScale = isMobile ? 0.36 : 1;

  // Encuadre: en desktop, primer plano dramático sobre el objeto; en móvil
  // la cámara se aleja más y apunta más abajo para que quede por
  // detrás/debajo del bloque de texto en vez de superponerse a él.
  const framing: CameraFraming = isMobile
    ? { z: [6.8, 7.6], y: [0.2, 0.6], fov: [32, 28], lookAt: [0, -0.95] }
    : { z: [5.9, 6.9], y: [1.1, 1.7], fov: [32, 28], lookAt: [0, 0.45] };

  return (
    <Canvas
      dpr={dpr}
      shadows={enableShadows}
      gl={{ antialias: !lowEnd, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, framing.y[0], framing.z[0]], fov: framing.fov[0] }}
      // Pausa el render 3D cuando el hero no está en pantalla o cuando el
      // drawer de reserva está abierto encima (evita competir por CPU/GPU
      // con la app mientras el usuario reserva, y quita jank innecesario).
      frameloop={visible && !bookingOpen ? "always" : "never"}
    >
      <color attach="background" args={["#3a2a22"]} />
      <fog attach="fog" args={["#3a2a22", 8, 17]} />
      <SceneLighting enableShadows={enableShadows} />
      <PointerRig
        subtle={reducedMotion || isMobile}
        reducedMotion={reducedMotion}
        offsetX={heroOffsetX}
        scale={heroScale}
      />
      <ScrollCameraRig
        progressRef={scrollProgress}
        zRange={framing.z}
        yRange={framing.y}
        fovRange={framing.fov}
        lookAt={framing.lookAt}
      />
      {!lowEnd && !reducedMotion && <DustParticles />}
      {!lowEnd && (
        <ContactShadows position={[heroOffsetX, -1.2, 0]} opacity={0.4} scale={6} blur={2} far={2} color="#000000" />
      )}
      <BarbershopBackdrop enableShadows={enableShadows} showDetails={!lowEnd} />
    </Canvas>
  );
}
