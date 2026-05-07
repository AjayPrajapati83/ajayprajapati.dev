import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useMouseParallax } from '../../hooks/useMouseParallax'

function ConnectionArc({ start, end, delay }) {
  const meshRef = useRef()
  const materialRef = useRef()

  const curve = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .multiplyScalar(1.4)
    return new THREE.QuadraticBezierCurve3(start, mid, end)
  }, [start, end])

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 32, 0.008, 4, false)
  }, [curve])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const t = (Math.sin(clock.elapsedTime * 1.5 + delay) + 1) / 2
      materialRef.current.opacity = 0.15 + t * 0.6
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        ref={materialRef}
        color="#00FFB2"
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </mesh>
  )
}

function Particles({ count }) {
  const pointsRef = useRef()

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      spd[i] = Math.random() * 0.5 + 0.2
    }
    return { positions: pos, speeds: spd }
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const posArray = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(clock.elapsedTime * speeds[i] + i) * 0.001
      posArray[i * 3] += Math.cos(clock.elapsedTime * speeds[i] * 0.5 + i) * 0.0005
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00FFB2"
        size={0.025}
        transparent
        opacity={0.5}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
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

export default function GlobeScene() {
  const groupRef = useRef()
  const { isMobile } = useMediaQuery()
  const mouse = useMouseParallax(0.3)

  const particleCount = isMobile ? 200 : 800

  // Generate random connection arcs
  const arcs = useMemo(() => {
    const count = isMobile ? 6 : 18
    const result = []
    for (let i = 0; i < count; i++) {
      const lat1 = (Math.random() - 0.5) * 140
      const lon1 = (Math.random() - 0.5) * 360
      const lat2 = (Math.random() - 0.5) * 140
      const lon2 = (Math.random() - 0.5) * 360
      result.push({
        start: latLongToVec3(lat1, lon1, 2),
        end: latLongToVec3(lat2, lon2, 2),
        delay: Math.random() * Math.PI * 2,
      })
    }
    return result
  }, [isMobile])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
      // Mouse parallax
      groupRef.current.rotation.x += (mouse.y * 0.3 - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.z += (mouse.x * 0.1 - groupRef.current.rotation.z) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe Globe */}
      <mesh>
        <icosahedronGeometry args={[2, 4]} />
        <meshBasicMaterial
          color="#00FFB2"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <icosahedronGeometry args={[1.95, 3]} />
        <meshBasicMaterial
          color="#00FFB2"
          transparent
          opacity={0.02}
        />
      </mesh>

      {/* Connection arcs */}
      {arcs.map((arc, i) => (
        <ConnectionArc key={i} {...arc} />
      ))}

      {/* Particles */}
      <Particles key={particleCount} count={particleCount} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#00FFB2" intensity={0.5} />
    </group>
  )
}
