import { useRef, useEffect, useState } from 'react'

function CountUpNumber({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const numericTarget = parseFloat(target)

    function animate(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = numericTarget * eased

      if (Number.isInteger(numericTarget)) {
        setCount(Math.round(current))
      } else {
        setCount(parseFloat(current.toFixed(2)))
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [started, target, duration])

  return (
    <span ref={ref}>
      {typeof target === 'number' && !Number.isInteger(target)
        ? count.toFixed(2)
        : count.toLocaleString()}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 3, label: 'Research Papers Published', suffix: '' },
  { value: 20, label: 'Public Seminars Delivered', suffix: '+' },
  { value: 1000, label: 'Individuals Reached', suffix: '+' },
  { value: 8.43, label: 'CGPA — BSc Computer Science', suffix: '' },
]

export default function StatCards() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
    }}>
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '2px solid var(--accent-teal)',
            padding: '1.25rem',
            borderRadius: '4px',
          }}
        >
          <div style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--accent-teal)',
            lineHeight: 1,
            marginBottom: '0.5rem',
          }}>
            <CountUpNumber target={stat.value} suffix={stat.suffix} />
          </div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
