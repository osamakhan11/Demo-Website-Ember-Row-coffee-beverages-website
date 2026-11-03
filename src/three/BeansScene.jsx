import { Canvas } from '@react-three/fiber'
import { ContactShadows, Float, PresentationControls } from '@react-three/drei'
import { useMemo } from 'react'

function Bean({ position, rotation, scale, roast }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial color={roast} roughness={0.35} clearcoat={0.6} clearcoatRoughness={0.4} />
      </mesh>
      {/* the centre crease on the flat side of the bean */}
      <mesh position={[0, 0, 0.155]} scale={[0.92, 0.07, 0.06]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#1a0b05" roughness={0.8} />
      </mesh>
    </group>
  )
}

export default function BeansScene({ reducedMotion = false }) {
  const beans = useMemo(() => {
    const roasts = ['#5A3320', '#4A2816', '#6B3F25', '#3C2012']
    return Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2
      const r = 0.9 + (i % 3) * 0.45
      return {
        position: [Math.cos(a) * r, ((i * 37) % 10) / 10 - 0.4, Math.sin(a) * r * 0.6],
        rotation: [i * 0.7, i * 1.3, i * 0.4],
        scale: [1, 0.72, 0.55].map((s) => s * (0.9 + (i % 4) * 0.08)),
        roast: roasts[i % roasts.length],
      }
    })
  }, [])

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.2, 5], fov: 35 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 4, 3]} intensity={2.4} castShadow color="#ffe1bd" />
      <pointLight position={[-3, -1, 2]} intensity={5} color="#D9A25F" />
      <PresentationControls global cursor snap={false} speed={1.2} azimuth={[-Infinity, Infinity]} polar={[-0.4, 0.4]}>
        {beans.map((b, i) => (
          <Float key={i} enabled={!reducedMotion} speed={1 + (i % 5) * 0.3} rotationIntensity={1.2} floatIntensity={0.8}>
            <Bean {...b} />
          </Float>
        ))}
      </PresentationControls>
      <ContactShadows position={[0, -1.3, 0]} opacity={0.45} scale={8} blur={3} far={3} color="#120804" />
    </Canvas>
  )
}
