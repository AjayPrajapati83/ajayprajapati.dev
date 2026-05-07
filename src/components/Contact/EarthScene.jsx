import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useMouseParallax } from '../../hooks/useMouseParallax'

function MumbaiMarker({ position }) {
  return (
    <group position={position}>
      {/* Glowing point */}
      <mesh>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#00FFB2" />
      </mesh>
      {/* Outer ring pulse */}
      <mesh>
        <ringGeometry args={[0.06, 0.08, 16]} />
        <meshBasicMaterial
          color="#00FFB2"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Label */}
      <Html
        position={[0, 0.25, 0]}
        center
        distanceFactor={5}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '9px',
          color: '#00FFB2',
          background: 'rgba(2, 11, 20, 0.9)',
          padding: '3px 8px',
          borderRadius: '3px',
          border: '1px solid rgba(0, 255, 178, 0.3)',
          whiteSpace: 'nowrap',
        }}>
          Mumbai, India 🌐
        </div>
      </Html>
    </group>
  )
}

function latLongToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

export default function EarthScene() {
  const groupRef = useRef()
  const wireRef = useRef()
  const mouse = useMouseParallax(0.2)

  // Mumbai coordinates: 19.0760° N, 72.8777° E
  const mumbaiPos = useMemo(() => latLongToVec3(19.076, 72.8777, 2.02), [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
      groupRef.current.rotation.x += (mouse.y * 0.1 - groupRef.current.rotation.x) * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {/* Solid dark sphere */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#0A1628"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[2.01, 24, 24]} />
        <meshBasicMaterial
          color="#00FFB2"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Grid lines (latitude) */}
      {[...Array(8)].map((_, i) => {
        const lat = (i - 3.5) * 22
        const phi = (90 - lat) * (Math.PI / 180)
        const r = 2.015 * Math.sin(phi)
        const y = 2.015 * Math.cos(phi)
        return (
          <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r - 0.003, r, 48]} />
            <meshBasicMaterial color="#00FFB2" transparent opacity={0.05} side={THREE.DoubleSide} />
          </mesh>
        )
      })}

      {/* Mumbai marker */}
      <MumbaiMarker position={mumbaiPos} />

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial
          color="#00FFB2"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Lights */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} color="#00FFB2" intensity={0.3} distance={10} />
    </group>
  )
}
