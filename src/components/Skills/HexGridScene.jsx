import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useMediaQuery } from '../../hooks/useMediaQuery'

// Generate hexagonal grid positions
function generateHexPositions(count) {
  const positions = []
  const hexWidth = 2.0
  const hexHeight = Math.sqrt(3)
  let index = 0

  // Create a honeycomb pattern
  const cols = Math.ceil(Math.sqrt(count * 1.5))
  const rows = Math.ceil(count / cols)

  for (let row = 0; index < count; row++) {
    const rowOffset = row % 2 === 0 ? 0 : hexWidth * 0.5
    const rowCols = row % 2 === 0 ? cols : cols - 1

    for (let col = 0; col < rowCols && index < count; col++) {
      positions.push({
        x: (col - rowCols / 2 + 0.5) * hexWidth + rowOffset,
        y: 0,
        z: (row - rows / 2 + 0.5) * hexHeight * 0.9,
      })
      index++
    }
  }

  return positions
}

// Map skill clusters to hex indices
function assignClustersToHexes(count, clusters) {
  const assignments = []
  let hexIndex = 0

  clusters.forEach((cluster, clusterIdx) => {
    const hexesForCluster = Math.max(
      Math.floor(count * cluster.skills.length / 
        clusters.reduce((sum, c) => sum + c.skills.length, 0)),
      3
    )

    for (let i = 0; i < hexesForCluster && hexIndex < count; i++) {
      const skillIndex = i % cluster.skills.length
      assignments.push({
        clusterIndex: clusterIdx,
        color: new THREE.Color(cluster.color),
        clusterName: cluster.name,
        skill: cluster.skills[skillIndex],
        skills: cluster.skills,
      })
      hexIndex++
    }
  })

  // Fill remaining
  while (assignments.length < count) {
    const idx = assignments.length % clusters.length
    const skillIndex = assignments.length % clusters[idx].skills.length
    assignments.push({
      clusterIndex: idx,
      color: new THREE.Color(clusters[idx].color),
      clusterName: clusters[idx].name,
      skill: clusters[idx].skills[skillIndex],
      skills: clusters[idx].skills,
    })
  }

  return assignments
}

const getSkillIcon = (skillName) => {
  const icons = {
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    'Python Scripting': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
    'Supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
    'Ubuntu': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg',
    'Selenium': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
  }
  return icons[skillName] || null
}

export default function HexGridScene({ clusters, onHexHover, onHexLeave }) {
  const meshRef = useRef()
  const { isMobile } = useMediaQuery()
  const { camera, gl } = useThree()
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const targetYPositions = useRef({})
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const pointer = useMemo(() => new THREE.Vector2(), [])

  const hexCount = isMobile ? 30 : 54

  const hexPositions = useMemo(() => generateHexPositions(hexCount), [hexCount])
  const hexAssignments = useMemo(() => assignClustersToHexes(hexCount, clusters), [hexCount, clusters])

  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.9, 0.9, 0.15, 6)
  }, [])

  // Initialize instanced mesh with colors and positions
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useMemo(() => {
    if (!meshRef.current) return
    const mesh = meshRef.current

    for (let i = 0; i < hexCount; i++) {
      dummy.position.set(hexPositions[i].x, 0, hexPositions[i].z)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, hexAssignments[i].color)
    }
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [hexCount, hexPositions, hexAssignments, dummy])

  const groupRef = useRef()
  const iconGroupsRef = useRef([])

  // Animate hex positions (hover raise effect)
  useFrame(() => {
    if (!meshRef.current) return
    const mesh = meshRef.current

    for (let i = 0; i < hexCount; i++) {
      const targetY = hoveredIndex === i ? 0.3 : 0
      const currentTarget = targetYPositions.current[i] || 0
      const newY = currentTarget + (targetY - currentTarget) * 0.1
      targetYPositions.current[i] = newY

      dummy.position.set(hexPositions[i].x, newY, hexPositions[i].z)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      // Brighten on hover
      const baseColor = hexAssignments[i].color.clone()
      if (hoveredIndex === i) {
        baseColor.multiplyScalar(1.5)
      }
      mesh.setColorAt(i, baseColor)

      // Update icon position
      if (iconGroupsRef.current[i]) {
        iconGroupsRef.current[i].position.y = newY + 0.16
      }
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    // Subtle auto-rotation of entire group
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0003
    }
  })

  const handlePointerMove = useCallback((event) => {
    const rect = gl.domElement.getBoundingClientRect()
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(pointer, camera)
    
    if (meshRef.current) {
      const intersects = raycaster.intersectObject(meshRef.current)
      if (intersects.length > 0) {
        const idx = intersects[0].instanceId
        if (idx !== hoveredIndex) {
          setHoveredIndex(idx)
          const assignment = hexAssignments[idx]
          if (assignment) {
            // Project 3D position to 2D for tooltip
            const pos = new THREE.Vector3(
              hexPositions[idx].x,
              0.5,
              hexPositions[idx].z
            )
            pos.project(camera)
            const x = (pos.x * 0.5 + 0.5) * rect.width + rect.left
            const y = (-pos.y * 0.5 + 0.5) * rect.height + rect.top
            onHexHover?.({
              clusterName: assignment.clusterName,
              skills: assignment.skills,
              x,
              y,
              color: assignment.color.getStyle(),
            })
          }
        }
      } else {
        if (hoveredIndex !== -1) {
          setHoveredIndex(-1)
          onHexLeave?.()
        }
      }
    }
  }, [camera, gl, raycaster, pointer, hoveredIndex, hexPositions, hexAssignments, onHexHover, onHexLeave])

  const handlePointerLeave = useCallback(() => {
    setHoveredIndex(-1)
    onHexLeave?.()
  }, [onHexLeave])

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, hexCount]}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <meshStandardMaterial
          metalness={0.3}
          roughness={0.6}
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      {/* Hexagon Icons */}
      {hexPositions.map((pos, i) => {
        const iconUrl = getSkillIcon(hexAssignments[i].skill)
        if (!iconUrl) return null
        return (
          <group 
            key={i} 
            position={[pos.x, pos.y + 0.16, pos.z]}
            ref={el => iconGroupsRef.current[i] = el}
          >
            <Html
              center
              transform
              sprite
              scale={0.5}
              style={{
                pointerEvents: 'none',
                opacity: hoveredIndex === i || hoveredIndex === -1 ? 0.8 : 0.1,
                transition: 'opacity 0.3s',
              }}
            >
              <img 
                src={iconUrl} 
                alt={hexAssignments[i].skill}
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  filter: 'drop-shadow(0 0 6px rgba(0,255,178,0.4))' 
                }} 
              />
            </Html>
          </group>
        )
      })}

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 3, 0]} color="#00FFB2" intensity={0.3} distance={10} />
    </group>
  )
}
