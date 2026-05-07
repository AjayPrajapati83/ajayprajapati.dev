import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import GlobeScene from './GlobeScene'
import TypewriterText from './TypewriterText'

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D Canvas Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}>
        <Suspense fallback={null}>
          <Canvas
              dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
              camera={{ position: [0, 0, 6], fov: 45 }}
              style={{ background: 'transparent' }}
              gl={{ antialias: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
              resize={{ debounce: 200 }}
            >
            <GlobeScene />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient overlay for readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2, 11, 20, 0.7) 70%)',
        zIndex: 1,
      }} />

      {/* Content overlay */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 2rem',
        maxWidth: '800px',
      }}>
        {/* System status line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {'// initializing threat intelligence...'}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--accent-teal)',
            letterSpacing: '0.1em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            textShadow: '0 0 40px rgba(0, 255, 178, 0.3)',
          }}
        >
          AJAY<br />PRAJAPATI
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <TypewriterText />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => scrollTo('projects')}
            className="btn-terminal"
            data-cursor-hover
          >
            [ ./view-projects.sh ]
          </button>
          <a
            href="/Ajay_Prajapati_Resume.pdf"
            download
            className="btn-terminal"
            data-cursor-hover
            style={{
              borderColor: 'var(--accent-amber)',
              color: 'var(--accent-amber)',
            }}
          >
            [ ./download-resume.pdf ]
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => scrollTo('about')}
      >
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          marginBottom: '0.5rem',
          letterSpacing: '0.1em',
        }}>
          [ scroll to explore ]
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: '1.2rem',
            color: 'var(--accent-teal)',
          }}
        >
          ▼
        </motion.div>
      </motion.div>
    </section>
  )
}
