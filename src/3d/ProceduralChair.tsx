import { RoundedBox } from "@react-three/drei";

/**
 * Silla de barbería 3D generada de forma procedural con primitivas,
 * estilo vintage (cuero capitoné + cromo ornamentado).
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
  <meshPhysicalMaterial color="#4d1420" roughness={0.5} clearcoat={0.4} clearcoatRoughness={0.35} />
);
const goldMaterial = <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.26} />;
const woodMaterial = <meshStandardMaterial color="#5a3a24" roughness={0.6} metalness={0.05} />;

/** Botones de cuero capitoné: una grilla de pequeñas esferas sobre una superficie. */
function TuftedButtons({
  cols,
  rows,
  width,
  height,
  z,
}: {
  cols: number;
  rows: number;
  width: number;
  height: number;
  z: number;
}) {
  const stepX = width / cols;
  const stepY = height / rows;
  const buttons: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      buttons.push([-width / 2 + stepX / 2 + c * stepX, -height / 2 + stepY / 2 + r * stepY]);
    }
  }
  return (
    <>
      {buttons.map(([x, y], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.022, 10, 10]} />
          {leatherMaterial}
        </mesh>
      ))}
    </>
  );
}

/** Ménsula cromada curva (tipo scroll) para los reposabrazos. */
function ScrollBracket({ mirror }: { mirror: boolean }) {
  const sign = mirror ? -1 : 1;
  return (
    <mesh
      position={[sign * 0.4, 1.05, 0.02]}
      rotation={[0, 0, sign * -0.5]}
      scale={[sign, 1, 1]}
      castShadow
    >
      <torusGeometry args={[0.26, 0.025, 10, 32, Math.PI * 0.62]} />
      {chromeMaterial}
    </mesh>
  );
}

export function ProceduralChair() {
  return (
    <group>
      {/* Base circular */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.56, 0.6, 0.08, 48]} />
        {chromeMaterial}
      </mesh>

      {/* Nervaduras radiales ornamentadas sobre la base */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.3, 0.09, Math.sin(angle) * 0.3]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.42, 0.02, 0.07]} />
            {chromeMaterial}
          </mesh>
        );
      })}

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

      {/* Estribo con detalle en madera, al frente del reposapiés */}
      <group position={[0, 0.34, 0.4]} rotation={[0.5, 0, 0]}>
        <RoundedBox args={[0.3, 0.06, 0.16]} radius={0.02} smoothness={3} castShadow>
          {leatherMaterial}
        </RoundedBox>
        <mesh position={[0, -0.035, 0]}>
          <boxGeometry args={[0.32, 0.014, 0.18]} />
          {woodMaterial}
        </mesh>
      </group>

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

      {/* Asiento capitoné */}
      <group position={[0, 1.2, 0.02]} rotation={[-0.06, 0, 0]}>
        <RoundedBox args={[0.76, 0.18, 0.72]} radius={0.06} smoothness={4} castShadow receiveShadow>
          {leatherMaterial}
        </RoundedBox>
        <TuftedButtons cols={3} rows={2} width={0.56} height={0.5} z={0.37} />
      </group>

      {/* Anillo dorado asiento/respaldo */}
      <mesh position={[0, 1.32, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.016, 12, 40]} />
        {goldMaterial}
      </mesh>

      {/* Respaldo capitoné */}
      <group position={[0, 1.78, -0.32]} rotation={[0.16, 0, 0]}>
        <RoundedBox args={[0.7, 0.95, 0.16]} radius={0.07} smoothness={4} castShadow receiveShadow>
          {leatherMaterial}
        </RoundedBox>
        <TuftedButtons cols={3} rows={4} width={0.52} height={0.76} z={0.09} />
      </group>

      {/* Varillas del reposacabezas */}
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, 2.28, -0.42]} castShadow>
          <cylinderGeometry args={[0.014, 0.014, 0.22, 12]} />
          {chromeMaterial}
        </mesh>
      ))}

      {/* Reposacabezas capitoné */}
      <group position={[0, 2.44, -0.4]} rotation={[0.12, 0, 0]}>
        <RoundedBox args={[0.34, 0.2, 0.13]} radius={0.05} smoothness={4} castShadow>
          {leatherMaterial}
        </RoundedBox>
        <TuftedButtons cols={2} rows={2} width={0.22} height={0.12} z={0.07} />
      </group>

      {/* Reposabrazos con ménsula cromada curva */}
      {[-0.44, 0.44].map((x) => (
        <group key={x} position={[x, 1.42, 0.02]}>
          <RoundedBox args={[0.48, 0.09, 0.15]} radius={0.03} smoothness={4} position={[0, 0.22, 0]} castShadow>
            {leatherMaterial}
          </RoundedBox>
        </group>
      ))}
      <ScrollBracket mirror={false} />
      <ScrollBracket mirror={true} />
    </group>
  );
}
