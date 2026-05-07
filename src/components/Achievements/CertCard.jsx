import { motion } from 'framer-motion'
import { certifications } from '../../data/achievements'

export default function CertCard() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.5rem',
    }}>
      {certifications.map((cert, i) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="holo-border"
          style={{
            padding: '1.75rem',
          }}
        >
          {/* Title */}
          <h3 style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
          }}>
            {cert.title}
          </h3>

          {/* Issuer */}
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: 'var(--accent-teal)',
            marginBottom: '0.5rem',
            lineHeight: 1.5,
          }}>
            {cert.issuer}
          </div>

          {/* Date */}
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.65rem',
            color: 'var(--accent-amber)',
            marginBottom: '1rem',
            padding: '0.2rem 0.5rem',
            background: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '3px',
            display: 'inline-block',
          }}>
            📅 {cert.date}
          </div>

          {/* Description */}
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
          }}>
            {cert.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
