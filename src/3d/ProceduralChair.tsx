import { RoundedBox } from "@react-three/drei";

/**
 * Silla de barbería 3D generada de forma procedural con primitivas.
 *
 * Es un placeholder deliberado: no existe todavía un modelo GLB/GLTF real.
 * Cuando haya uno disponible, colócalo en `public/models/barber-chair.glb`
 * y define `CHAIR_MODEL_URL` en `BarberChair.tsx` — el resto de la escena
 * (rotación por cursor, respuesta al scroll, iluminación) no necesita
 * cambiar porque toda esa lógica vive fuera de este componente.
 */

const chromeMaterial = (
  <meshStandardMaterial color="#c9cbd2" metalness={1} roughness={0.16} envMapIntensity={1.3} />
);
const darkMetalMaterial = <meshStandardMaterial color="#232327" metalness={0.85} roughness={0.35} />;
const leatherMaterial = (
  <meshPhysicalMaterial color="#131013" roughness={0.7} clearcoat={0.22} clearcoatRoughness={0.55} />
);
const goldMaterial = <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.26} />;

export function ProceduralChair() {
  return (
    <group>
      {/* Base circular */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.56, 0.6, 0.08, 48]} />
        {chromeMaterial}
      </mesh>

      {/* Anillo dorado de la base */}
      <mesh position={[0, 0.085, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.014, 16, 64]} />
        {goldMaterial}
      </mesh>

      {/* Reposapiés */}
      <mesh position={[0, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.035, 16, 48]} />
        {chromeMaterial}
      </mesh>

      {/* Columna hidráulica */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.17, 1.0, 32]} />
        {chromeMaterial}
      </mesh>

      {/* Mecanismo de inclinación */}
      <mesh position={[0, 1.06, 0]} castShadow>
        <boxGeometry args={[0.42, 0.14, 0.5]} />
        {darkMetalMaterial}
      </mesh>

      {/* Asiento */}
      <group position={[0, 1.2, 0.02]} rotation={[-0.06, 0, 0]}>
        <RoundedBox args={[0.76, 0.18, 0.72]} radius={0.06} smoothness={4} castShadow receiveShadow>
          {leatherMaterial}
        </RoundedBox>
      </group>

      {/* Anillo dorado asiento/respaldo */}
      <mesh position={[0, 1.32, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.016, 12, 40]} />
        {goldMaterial}
      </mesh>

      {/* Respaldo */}
      <group position={[0, 1.78, -0.32]} rotation={[0.16, 0, 0]}>
        <RoundedBox args={[0.7, 0.95, 0.16]} radius={0.07} smoothness={4} castShadow receiveShadow>
          {leatherMaterial}
        </RoundedBox>
      </group>

      {/* Varillas del reposacabezas */}
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, 2.28, -0.42]} castShadow>
          <cylinderGeometry args={[0.014, 0.014, 0.22, 12]} />
          {chromeMaterial}
        </mesh>
      ))}

      {/* Reposacabezas */}
      <group position={[0, 2.44, -0.4]} rotation={[0.12, 0, 0]}>
        <RoundedBox args={[0.34, 0.2, 0.13]} radius={0.05} smoothness={4} castShadow>
          {leatherMaterial}
        </RoundedBox>
      </group>

      {/* Reposabrazos */}
      {[-0.44, 0.44].map((x) => (
        <group key={x} position={[x, 1.42, 0.02]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.06, 0.34, 20]} />
            {chromeMaterial}
          </mesh>
          <RoundedBox args={[0.48, 0.09, 0.15]} radius={0.03} smoothness={4} position={[0, 0.22, 0]} castShadow>
            {leatherMaterial}
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}
