import { motion } from 'framer-motion'
import StatCards from './StatCards'
import CyberRadar from './CyberRadar'

const badges = [
  { icon: '🏆', text: 'Best Research Paper — CONFAB 2026' },
  { icon: '🥇', text: 'Best Entry College — Governor of Maharashtra' },
  { icon: '⭐', text: 'Best President Nominee — Quick Heal' },
]

export default function AboutSection() {
  return (
    <section id="about" className="section" style={{ paddingTop: '8rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header">profile_loaded</div>
        <h2 className="section-title">About Me</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
          className="about-grid"
        >
          {/* Left Column — Stats */}
          <div>
            <StatCards />

            {/* Achievement badges */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {badges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200 }}
                  viewport={{ once: true }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(0, 255, 178, 0.05)',
                    border: '1px solid rgba(0, 255, 178, 0.1)',
                    borderRadius: '6px',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{badge.icon}</span>
                  {badge.text}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column — Radar + Bio */}
          <div>
            <div style={{
              height: '320px',
              marginBottom: '2rem',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'rgba(10, 22, 40, 0.3)',
              border: '1px solid rgba(0, 255, 178, 0.08)',
            }}>
              <CyberRadar />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}>
                I'm a cybersecurity researcher and frontend developer building at the intersection of security and user experience. Currently in my final year of BSc Computer Science at Patkar Varde College with a <span style={{ color: 'var(--accent-teal)' }}>CGPA of 8.43</span>.
              </p>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-muted)',
              }}>
                As President of the Cyber Warriors Club under the Quick Heal Foundation, I led a 19-member team delivering 20+ public seminars, reaching over 1,000 individuals. My research on cybersecurity education through mobile applications earned the <span style={{ color: 'var(--accent-amber)' }}>Best Paper Award at CONFAB 2026</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
