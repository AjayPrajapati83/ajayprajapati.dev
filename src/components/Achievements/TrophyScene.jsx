import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useMouseParallax } from '../../hooks/useMouseParallax'

function Trophy({ position, label, index }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.5 + index * 0.8) * 0.08
    }
  })

  const goldColor = '#D4A017'
  const goldEmissive = '#B8860B'

  return (
    <group ref={groupRef} position={position}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.4]} />
        <meshStandardMaterial
          color={goldColor}
          emissive={goldEmissive}
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.8, 8]} />
        <meshStandardMaterial
          color={goldColor}
          emissive={goldEmissive}
          emissiveIntensity={0.1}
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Cup */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.35, 0.12, 0.5, 12, 1, true]} />
        <meshStandardMaterial
          color={goldColor}
          emissive={goldEmissive}
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cup bottom disc */}
      <mesh position={[0, 0.75, 0]}>
        <circleGeometry args={[0.12, 12]} />
        <meshStandardMaterial
          color={goldColor}
          metalness={0.9}
          roughness={0.2}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </mesh>

      {/* Label */}
      <Html
        position={[0, 1.6, 0]}
        center
        distanceFactor={6}
        style={{
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '10px',
          color: '#F59E0B',
          background: 'rgba(2, 11, 20, 0.85)',
          padding: '4px 10px',
          borderRadius: '4px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          textAlign: 'center',
          maxWidth: '160px',
          whiteSpace: 'normal',
          lineHeight: 1.4,
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

const trophyData = [
  { label: 'Best Research Paper — CONFAB 2026' },
  { label: 'Best Entry College — Governor of Maharashtra' },
  { label: 'Best President Nominee — Quick Heal' },
  { label: 'Essay Writing Winner — Cosmos Jallos Fest' },
  { label: '14 Inter-Collegiate Competition Wins' },
]

export default function TrophyScene() {
  const groupRef = useRef()
  const mouse = useMouseParallax(0.2)

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  const trophyPositions = useMemo(() => {
    const spacing = 2.2
    return trophyData.map((_, i) => {
      const x = (i - (trophyData.length - 1) / 2) * spacing
      return [x, -0.5, 0]
    })
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0008
      // Mouse parallax
      groupRef.current.rotation.x += (mouse.y * 0.15 - groupRef.current.rotation.x) * 0.03
    }
  })

  return (
    <group ref={groupRef} scale={isMobile ? 0.45 : 1}>
      {trophyData.map((trophy, i) => (
        <Trophy
          key={i}
          position={trophyPositions[i]}
          label={trophy.label}
          index={i}
        />
      ))}

      {/* Shelf platform */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 2]} />
        <meshStandardMaterial
          color="#0A1628"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} color="#FFF8DC" />
      <pointLight position={[0, 4, 3]} color="#F59E0B" intensity={0.5} distance={12} />
      <pointLight position={[-3, 2, 2]} color="#00FFB2" intensity={0.2} distance={8} />
    </group>
  )
}
