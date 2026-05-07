import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import TrophyScene from './TrophyScene'
import CertCard from './CertCard'
import LazyCanvas from '../shared/LazyCanvas'
import { stats } from '../../data/achievements'

function CountUpStat({ value, suffix, label }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    function animate(time) {
      const progress = Math.min((time - startTime) / 1500, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(value * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, value])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: '"Syne", sans-serif',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800,
        color: 'var(--accent-teal)',
        lineHeight: 1,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        marginTop: '0.5rem',
        letterSpacing: '0.05em',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header">credentials_verified</div>
        <h2 className="section-title">Achievements</h2>

        {/* Trophy Scene */}
        <LazyCanvas height="380px" fallbackText="[>] Loading trophy shelf..." style={{ marginBottom: '3rem' }}>
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
              camera={{ position: [0, 3, 10], fov: 35 }}
              gl={{ antialias: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
              resize={{ debounce: 200 }}
            >
              <TrophyScene />
            </Canvas>
          </Suspense>
        </LazyCanvas>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          marginBottom: '4rem',
          padding: '2rem',
          background: 'rgba(10, 22, 40, 0.4)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 255, 178, 0.08)',
        }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <CountUpStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginBottom: '1rem' }}>
          <div className="section-header">certifications</div>
          <h3 style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            Erasmus+ Certifications
          </h3>
        </div>
        <CertCard />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
