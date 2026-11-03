import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, PresentationControls } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const v2 = (pts) => pts.map(([x, y]) => new THREE.Vector2(x, y))

/** Wisps of steam that rise, sway and fade, then loop. */
function Steam({ animate }) {
  const puffs = useRef([])
  const seeds = useMemo(() => Array.from({ length: 9 }, (_, i) => ({ offset: i / 9, phase: Math.random() * 6 })), [])
  useFrame(({ clock }) => {
    if (!animate) return
    const t = clock.elapsedTime
    puffs.current.forEach((m, i) => {
      if (!m) return
      const s = seeds[i]
      const life = (t * 0.28 + s.offset) % 1
      m.position.set(Math.sin(t * 1.3 + s.phase) * 0.18 * life, 1.05 + life * 1.3, Math.cos(t + s.phase) * 0.08)
      m.scale.setScalar(0.12 + life * 0.32)
      m.material.opacity = Math.sin(life * Math.PI) * 0.22
    })
  })
  return seeds.map((_, i) => (
    <mesh key={i} ref={(el) => (puffs.current[i] = el)} position={[0, 1.2 + i * 0.1, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#fff6ea" transparent opacity={animate ? 0 : 0.08} depthWrite={false} />
    </mesh>
  ))
}

function HotCup({ drink, animate }) {
  const shell = useMemo(() => v2([[0, 0], [0.5, 0], [0.56, 0.06], [0.78, 1.0], [0.8, 1.04], [0.74, 1.04], [0.72, 0.99], [0.5, 0.12], [0, 0.12]]), [])
  const saucer = useMemo(() => v2([[0, 0], [1.1, 0], [1.24, 0.07], [1.32, 0.15], [1.26, 0.15], [1.1, 0.08], [0, 0.08]]), [])
  // 'crema' = thin even layer (espresso, filter, straight matcha); otherwise milk latte art.
  const isMatcha = drink.art === 'crema'
  return (
    <group position={[0, -0.55, 0]}>
      <mesh receiveShadow castShadow>
        <latheGeometry args={[saucer, 64]} />
        <meshPhysicalMaterial color="#efe6da" roughness={0.18} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      <group position={[0, 0.08, 0]}>
        <mesh castShadow receiveShadow>
          <latheGeometry args={[shell, 64]} />
          <meshPhysicalMaterial color="#f6efe6" roughness={0.2} clearcoat={1} clearcoatRoughness={0.08} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.66, 0.55, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <torusGeometry args={[0.24, 0.055, 16, 40, Math.PI]} />
          <meshPhysicalMaterial color="#f6efe6" roughness={0.2} clearcoat={1} />
        </mesh>
        {/* liquid + crema / latte art */}
        <mesh position={[0, 0.88, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.685, 64]} />
          <meshStandardMaterial color={drink.liquid} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.882, 0.06]} rotation-x={-Math.PI / 2} scale={[1, 0.82, 1]}>
          <circleGeometry args={[isMatcha ? 0.6 : 0.4, 48]} />
          <meshStandardMaterial color={drink.foam} roughness={0.6} transparent opacity={isMatcha ? 0.55 : 1} />
        </mesh>
        {!isMatcha && (
          <mesh position={[0, 0.884, 0.16]} rotation-x={-Math.PI / 2}>
            <circleGeometry args={[0.13, 32]} />
            <meshStandardMaterial color={drink.liquid} roughness={0.3} />
          </mesh>
        )}
        <Steam animate={animate} />
      </group>
    </group>
  )
}

function IcedGlass({ drink }) {
  const glass = useMemo(() => v2([[0, 0], [0.5, 0], [0.62, 1.75], [0.58, 1.75], [0.47, 0.07], [0, 0.07]]), [])
  const cubes = useMemo(
    () => [[0.18, 1.32, 0.1, 0.4], [-0.2, 1.4, -0.08, 1.1], [0.02, 1.5, -0.2, 2.2], [-0.05, 1.18, 0.22, 0.7]],
    [],
  )
  return (
    <group position={[0, -0.9, 0]}>
      <mesh castShadow>
        <latheGeometry args={[glass, 64]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.04} metalness={0} transparent opacity={0.28} clearcoat={1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.53, 0.47, 1.1, 48]} />
        <meshStandardMaterial color={drink.liquid} roughness={0.2} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.565, 0.53, 0.26, 48]} />
        <meshStandardMaterial color={drink.foam} roughness={0.4} transparent opacity={0.9} />
      </mesh>
      {cubes.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[r, r * 0.6, r * 0.3]}>
          <boxGeometry args={[0.24, 0.24, 0.24]} />
          <meshPhysicalMaterial color="#eaf6ff" roughness={0.05} transparent opacity={0.55} clearcoat={1} />
        </mesh>
      ))}
      <mesh position={[0.18, 1.55, 0]} rotation={[0, 0, -0.22]}>
        <cylinderGeometry args={[0.04, 0.04, 2.0, 16]} />
        <meshStandardMaterial color="#9E2B25" roughness={0.5} />
      </mesh>
    </group>
  )
}

/** Spins the drink a full turn every time the selected drink changes. */
function SpinOnChange({ drinkId, children }) {
  const group = useRef()
  const target = useRef(0)
  useEffect(() => {
    target.current += Math.PI * 2
  }, [drinkId])
  useFrame((_, dt) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, target.current, 4, dt)
  })
  return <group ref={group}>{children}</group>
}

export default function CupScene({ drink, reducedMotion = false }) {
  const model = drink.iced ? <IcedGlass drink={drink} /> : <HotCup drink={drink} animate={!reducedMotion} />
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.5, 4.6], fov: 32 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 2]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} color="#ffe3c2" />
      <pointLight position={[-3, 1, -2]} intensity={6} color="#D9A25F" />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 4, 3]} scale={[6, 2, 1]} color="#fff1df" />
        <Lightformer intensity={1} position={[-4, 1, 0]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} color="#D9A25F" />
      </Environment>
      <PresentationControls
        global
        cursor
        snap
        speed={1.4}
        rotation={[0.18, -0.4, 0]}
        polar={[-0.3, 0.5]}
        azimuth={[-Infinity, Infinity]}
      >
        <Float enabled={!reducedMotion} speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
          <SpinOnChange drinkId={drink.id}>{model}</SpinOnChange>
        </Float>
      </PresentationControls>
      <ContactShadows position={[0, -0.95, 0]} opacity={0.55} scale={6} blur={2.6} far={2.5} color="#120804" />
    </Canvas>
  )
}
