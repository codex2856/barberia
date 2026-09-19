import { Environment, Lightformer } from "@react-three/drei";

interface SceneLightingProps {
  enableShadows: boolean;
}

/**
 * Iluminación de estudio (fondo claro): luz principal neutra + una luz de
 * contorno para que la silla negra se despegue del fondo con un filo de
 * brillo, más un toque cálido en dorado como acento de marca. El entorno
 * de reflejos se genera de forma procedural con Lightformers (sin depender
 * de un HDR externo), así el chrome/dorado de la silla refleja luz sin
 * peticiones de red.
 */
export function SceneLighting({ enableShadows }: SceneLightingProps) {
  return (
    <>
      <ambientLight intensity={0.12} color="#ffffff" />
      <directionalLight
        position={[2.2, 5.5, 3.8]}
        intensity={1.3}
        color="#fff6ea"
        castShadow={enableShadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      {/* Luz de contorno trasera: separa la silueta negra del fondo claro sin aclarar el cuero */}
      <pointLight position={[-1.4, 2.8, -3.2]} intensity={9} decay={2} color="#ffffff" />
      <pointLight position={[1.6, 2.3, -2.8]} intensity={6} decay={2} color="#ffffff" />
      {/* Acento cálido de marca, muy sutil */}
      <pointLight position={[-2.2, 1.3, 1.6]} intensity={2.5} decay={2} color="#c9a24b" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[0, 4, 3]} scale={[7, 4, 1]} />
        <Lightformer
          form="rect"
          intensity={1}
          color="#c9a24b"
          position={[-4, 1.6, 1.5]}
          scale={[2.5, 3, 1]}
          rotation={[0, Math.PI / 3, 0]}
        />
        <Lightformer form="rect" intensity={1.4} color="#ffffff" position={[3, 2, -3]} scale={[4, 4, 1]} rotation={[0, -Math.PI / 4, 0]} />
      </Environment>
    </>
  );
}
