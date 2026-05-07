import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import EarthScene from './EarthScene'
import LazyCanvas from '../shared/LazyCanvas'

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-header">establish_secure_channel</div>
        <h2 className="section-title">Get in Touch</h2>

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(0, 255, 178, 0.05)',
            border: '1px solid rgba(0, 255, 178, 0.15)',
            borderRadius: '8px',
            marginBottom: '3rem',
          }}
        >
          <div className="pulse-dot" style={{ marginTop: '4px', flexShrink: 0 }} />
          <div>
            <div style={{
              fontFamily: '"Syne", sans-serif',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--accent-teal)',
              marginBottom: '0.4rem',
            }}>
              AVAILABLE FOR OPPORTUNITIES
            </div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
            }}>
              Open to: Cybersecurity Roles • Frontend Dev • Research Collaboration<br />
              Location: Mumbai, India (Remote Friendly)
            </div>
          </div>
        </motion.div>

        {/* Earth Scene — Centered */}
        <div style={{ maxWidth: '500px', margin: '0 auto 2.5rem' }}>
          <LazyCanvas className="contact-earth" fallbackText="[>] Establishing connection...">
            <Suspense fallback={null}>
              <Canvas
                dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
                camera={{ position: [0, 0, 6], fov: 35 }}
                gl={{ antialias: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
                resize={{ debounce: 200 }}
              >
                <EarthScene />
              </Canvas>
            </Suspense>
          </LazyCanvas>
        </div>

        {/* Contact Links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          <a
            href="https://linkedin.com/in/ajayprajapatii"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terminal"
            data-cursor-hover
            style={{
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            [ linkedin.com/in/ajayprajapatii ↗ ]
          </a>
          {typeof window !== 'undefined' && window.innerWidth <= 768 ? (
            <a
              href="tel:+918369564372"
              className="btn-terminal"
              data-cursor-hover
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                borderColor: 'var(--accent-teal)',
                color: 'var(--accent-teal)',
              }}
            >
              [ +91 8369564372 ↗ ]
            </a>
          ) : (
            <div
              className="btn-terminal"
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                borderColor: 'var(--accent-teal)',
                color: 'var(--accent-teal)',
                cursor: 'default',
              }}
            >
              [ +91 8369564372 ]
            </div>
          )}
          <a
            href="mailto:64.ajayprajapati@gmail.com"
            className="btn-terminal"
            data-cursor-hover
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              borderColor: 'var(--accent-amber)',
              color: 'var(--accent-amber)',
            }}
          >
            [ 64.ajayprajapati@gmail.com ↗ ]
          </a>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '6rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(0, 255, 178, 0.1)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}>
            {'// designed & built by Ajay Prajapati © 2026'}
          </div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            opacity: 0.5,
            marginTop: '0.5rem',
          }}>
            React • Three.js • GSAP • Framer Motion
          </div>
        </div>
      </div>

      <style>{`
        .contact-earth {
          height: 400px;
        }
        @media (max-width: 768px) {
          .contact-earth {
            height: 250px;
          }
        }
      `}</style>
    </section>
  )
}
