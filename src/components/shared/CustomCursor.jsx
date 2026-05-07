import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    // Don't show on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    setIsVisible(true)

    function handleMouseMove(e) {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    function handleMouseOver(e) {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]') ||
        target.style?.cursor === 'pointer'
      ) {
        setIsHovering(true)
      }
    }

    function handleMouseOut(e) {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(false)
      }
    }

    function animate() {
      // Lerp dot position (faster follow)
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.15
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.15

      // Lerp ring position (slower follow)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.08
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.08

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`
      }
      if (ringRef.current) {
        const size = isHovering ? 48 : 32
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isHovering])

  if (!isVisible) return null

  return (
    <>
      {/* Crosshair dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--accent-teal)',
          pointerEvents: 'none',
          zIndex: 10001,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? 'var(--accent-amber)' : 'var(--accent-teal)'}`,
          pointerEvents: 'none',
          zIndex: 10001,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
          willChange: 'transform',
          opacity: 0.7,
        }}
      />
    </>
  )
}
