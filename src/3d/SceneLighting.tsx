import { Environment, Lightformer } from "@react-three/drei";

interface SceneLightingProps {
  enableShadows: boolean;
}

/**
 * Iluminación cálida de interior de barbería: luz principal ámbar (como
 * bombillas de tungsteno) + un par de luces de contorno para separar la
 * silla negra del fondo de ladrillo, más un acento dorado de marca. El
 * entorno de reflejos se genera con Lightformers (sin HDR externo), así
 * el cromo/dorado de la silla refleja luz sin peticiones de red.
 */
export function SceneLighting({ enableShadows }: SceneLightingProps) {
  return (
    <>
      <ambientLight intensity={0.32} color="#5a4432" />
      <directionalLight
        position={[2.2, 5.5, 3.8]}
        intensity={2}
        color="#ffb877"
        castShadow={enableShadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      {/* Luz de contorno trasera: separa la silueta negra del ladrillo */}
      <pointLight position={[-1.4, 2.8, -3.2]} intensity={16} decay={2} color="#ffcf9e" />
      <pointLight position={[1.6, 2.3, -2.8]} intensity={11} decay={2} color="#ffcf9e" />
      {/* Acento cálido de marca */}
      <pointLight position={[-2.2, 1.3, 1.6]} intensity={4} decay={2} color="#c9a24b" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2} color="#ffddb0" position={[0, 4, 3]} scale={[7, 4, 1]} />
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#c9a24b"
          position={[-4, 1.6, 1.5]}
          scale={[2.5, 3, 1]}
          rotation={[0, Math.PI / 3, 0]}
        />
        <Lightformer form="rect" intensity={1.6} color="#ffb877" position={[3, 2, -3]} scale={[4, 4, 1]} rotation={[0, -Math.PI / 4, 0]} />
      </Environment>
    </>
  );
}
