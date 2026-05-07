import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLines = [
  { text: '[>] Initializing threat modules...', delay: 0, color: 'var(--accent-teal)' },
  { text: '[>] Loading neural pathways...', delay: 400, color: 'var(--accent-teal)' },
  { text: '[>] Mounting cybersecurity core...', delay: 800, color: 'var(--accent-teal)' },
  { text: '[>] Verifying credentials...', delay: 1200, color: 'var(--accent-teal)' },
  { text: '[>] Access granted.', delay: 1600, color: '#22C55E' },
]

export default function Loader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [lineTexts, setLineTexts] = useState({})
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('boot') // boot | glitch | done

  // Type each line character by character
  const typeLine = useCallback((index, fullText) => {
    let charIndex = 0
    const interval = setInterval(() => {
      charIndex++
      setLineTexts(prev => ({ ...prev, [index]: fullText.substring(0, charIndex) }))
      if (charIndex >= fullText.length) {
        clearInterval(interval)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cleanups = []

    bootLines.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
        cleanups.push(typeLine(i, line.text))
      }, line.delay)
      cleanups.push(() => clearTimeout(timer))
    })

    // Progress bar animation
    const startTime = Date.now()
    const duration = 2500
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min((elapsed / duration) * 100, 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => setPhase('glitch'), 300)
        setTimeout(() => {
          setPhase('done')
          onComplete?.()
        }, 600)
      }
    }, 16)
    cleanups.push(() => clearInterval(progressInterval))

    return () => cleanups.forEach(fn => typeof fn === 'function' && fn())
  }, [onComplete, typeLine])

  const progressBarFilled = Math.round(progress / 4)
  const progressBar = '█'.repeat(progressBarFilled) + '░'.repeat(25 - progressBarFilled)

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: '#020B14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"JetBrains Mono", monospace',
          }}
          className={phase === 'glitch' ? 'loader-glitch' : ''}
        >
          <div style={{ width: '100%', maxWidth: '520px', padding: '2rem' }}>
            {/* AP Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: '2.5rem',
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                color: 'var(--accent-teal)',
                textAlign: 'center',
                marginBottom: '1.5rem',
                letterSpacing: '0.1em',
              }}
            >
              AP
            </motion.div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)',
              marginBottom: '1.5rem',
              opacity: 0.5,
            }} />

            {/* Boot lines */}
            <div style={{ minHeight: '160px', marginBottom: '1.5rem' }}>
              {visibleLines.map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: bootLines[i].color,
                    fontSize: '0.85rem',
                    marginBottom: '0.5rem',
                    lineHeight: 1.6,
                  }}
                >
                  {lineTexts[i] || ''}
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '14px',
                    background: bootLines[i].color,
                    marginLeft: '2px',
                    animation: 'blink 1s step-end infinite',
                    verticalAlign: 'text-bottom',
                  }} />
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)',
              marginBottom: '1rem',
              opacity: 0.5,
            }} />

            {/* Progress bar */}
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--accent-teal)',
              letterSpacing: '0.05em',
            }}>
              {progressBar} {Math.round(progress)}%
            </div>
          </div>

          <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            .loader-glitch {
              animation: loaderGlitch 0.3s steps(3) both;
            }
            @keyframes loaderGlitch {
              0% { clip-path: inset(0 0 0 0); }
              25% { clip-path: inset(40% 0 20% 0); transform: translate(-5px, 2px); }
              50% { clip-path: inset(10% 0 60% 0); transform: translate(5px, -2px); }
              75% { clip-path: inset(80% 0 5% 0); transform: translate(-3px, 1px); }
              100% { clip-path: inset(0 0 0 0); transform: translate(0); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
