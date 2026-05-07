import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ShieldModel() {
  const meshRef = useRef()

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()

    // Shield path
    shape.moveTo(0, 1.5)
    shape.bezierCurveTo(0.6, 1.4, 1.0, 1.1, 1.2, 0.7)
    shape.bezierCurveTo(1.4, 0.3, 1.3, -0.3, 1.1, -0.7)
    shape.bezierCurveTo(0.9, -1.1, 0.5, -1.4, 0, -1.6)
    shape.bezierCurveTo(-0.5, -1.4, -0.9, -1.1, -1.1, -0.7)
    shape.bezierCurveTo(-1.3, -0.3, -1.4, 0.3, -1.2, 0.7)
    shape.bezierCurveTo(-1.0, 1.1, -0.6, 1.4, 0, 1.5)

    const extrudeSettings = {
      steps: 1,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.3 + clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, -0.15]}>
        <meshStandardMaterial
          color="#00FFB2"
          emissive="#00FFB2"
          emissiveIntensity={0.15}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Lock icon on shield - simple keyhole */}
      <mesh position={[0, 0.1, 0.08]}>
        <circleGeometry args={[0.2, 16]} />
        <meshStandardMaterial
          color="#020B14"
          emissive="#00FFB2"
          emissiveIntensity={0.05}
        />
      </mesh>

      <mesh position={[0, -0.15, 0.08]}>
        <boxGeometry args={[0.12, 0.3, 0.01]} />
        <meshStandardMaterial
          color="#020B14"
          emissive="#00FFB2"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Lights */}
      <pointLight position={[2, 3, 2]} color="#00FFB2" intensity={1} distance={8} />
      <pointLight position={[-2, -1, 2]} color="#0EA5E9" intensity={0.3} distance={6} />
      <ambientLight intensity={0.15} />
    </group>
  )
}
