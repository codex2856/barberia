import { Environment, Lightformer } from "@react-three/drei";

interface SceneLightingProps {
  enableShadows: boolean;
}

/**
 * Iluminación cinematográfica de la escena. El entorno de reflejos se
 * genera de forma procedural con Lightformers (sin depender de un HDR
 * externo), así el chrome de la silla refleja luz sin peticiones de red.
 */
export function SceneLighting({ enableShadows }: SceneLightingProps) {
  return (
    <>
      <ambientLight intensity={0.45} color="#3a3a45" />
      <directionalLight
        position={[2.6, 5.5, 3.5]}
        intensity={3.4}
        color="#ffedd2"
        castShadow={enableShadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <pointLight position={[-2.6, 1.9, -1.6]} intensity={55} decay={2} color="#c9a24b" />
      <pointLight position={[0.6, 1.4, -2.4]} intensity={10} decay={2} color="#8a2c2c" />
      <pointLight position={[0, 2.6, 2.4]} intensity={30} decay={2} color="#ffffff" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={6} color="#ffffff" position={[0, 4, 3]} scale={[6, 3, 1]} />
        <Lightformer
          form="rect"
          intensity={4}
          color="#c9a24b"
          position={[-4, 2, 2]}
          scale={[3, 4, 1]}
          rotation={[0, Math.PI / 3, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#8fa5ff"
          position={[4, 1.4, -2]}
          scale={[3, 3, 1]}
          rotation={[0, -Math.PI / 3, 0]}
        />
      </Environment>
    </>
  );
}
