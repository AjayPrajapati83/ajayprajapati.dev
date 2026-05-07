import { useState, useEffect, useRef } from 'react'

export function useMouseParallax(sensitivity = 0.5) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Disable on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    function handleMouseMove(e) {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * sensitivity,
        y: (e.clientY / window.innerHeight - 0.5) * sensitivity,
      }
    }

    function animate() {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.05
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.05
      setPosition({ ...currentRef.current })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [sensitivity])

  return position
}
