import { useState, useEffect, useRef } from 'react'

/**
 * Wrapper that only mounts children when the element is in viewport.
 * Used to lazy-mount Canvas elements to avoid WebGL context exhaustion.
 */
export default function LazyCanvas({ children, className = '', height, fallbackText = '[>] Awaiting render...', style = {} }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        } else {
          // Unmount when far out of view to free WebGL context
          const rect = entry.boundingClientRect
          const windowHeight = window.innerHeight
          if (rect.top > windowHeight * 2 || rect.bottom < -windowHeight) {
            setInView(false)
          }
        }
      },
      {
        rootMargin: '200px 0px 200px 0px',
        threshold: 0,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(height ? { height } : {}),
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        background: 'rgba(10, 22, 40, 0.3)',
        border: '1px solid rgba(0, 255, 178, 0.08)',
        ...style,
      }}
    >
      {inView ? (
        children
      ) : (
        <div style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}>
          {fallbackText}
        </div>
      )}
    </div>
  )
}
