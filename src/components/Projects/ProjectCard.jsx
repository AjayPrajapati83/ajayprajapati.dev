import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const classColors = {
    'FULL-STACK/MOBILE': 'var(--accent-teal)',
    'SOC/INFRASTRUCTURE': 'var(--accent-amber)',
    'WEB/SECURITY': 'var(--accent-red)',
    'DESKTOP/SECURITY': 'var(--accent-coral)',
    'PRODUCTION/WEB': 'var(--accent-blue)',
    'FULL-STACK/WEB': 'var(--accent-purple)',
    'WEB/EVENT': 'var(--accent-blue)',
  }

  const tagColor = classColors[project.classification] || 'var(--accent-teal)'

  return (
    <div
      style={{
        perspective: '1200px',
        height: '380px',
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      data-cursor-hover
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          background: 'var(--bg-secondary)',
          border: '1px solid rgba(0, 255, 178, 0.1)',
          borderRadius: '8px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Classification tag */}
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.65rem',
            color: tagColor,
            padding: '0.3rem 0.6rem',
            border: `1px solid ${tagColor}`,
            borderRadius: '4px',
            alignSelf: 'flex-start',
            marginBottom: '1.25rem',
            letterSpacing: '0.05em',
          }}>
            [CLASSIFICATION: {project.classification}]
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}>
            {project.title}
          </h3>

          {/* Tech badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '1rem',
          }}>
            {project.tech.map((t, i) => (
              <span key={i} style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                padding: '0.2rem 0.5rem',
                background: 'rgba(0, 255, 178, 0.08)',
                border: '1px solid rgba(0, 255, 178, 0.15)',
                borderRadius: '3px',
                color: 'var(--text-muted)',
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            flex: 1,
          }}>
            {project.description}
          </p>

          {/* Links */}
          {project.live && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
            }}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-terminal"
                style={{
                  fontSize: '0.7rem',
                  padding: '0.4rem 0.8rem',
                  borderColor: 'var(--accent-amber)',
                  color: 'var(--accent-amber)',
                }}
              >
                [Live Demo ↗]
              </a>
            </div>
          )}

          {/* Flip hint */}
          <div style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0.75rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            opacity: 0.5,
          }}>
            [click to flip]
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'var(--bg-secondary)',
          border: `1px solid ${tagColor}40`,
          borderRadius: '8px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: tagColor,
            marginBottom: '1rem',
          }}>
            {project.title}
          </div>

          {project.backDetails?.metrics && (
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.75rem',
              color: 'var(--accent-amber)',
              marginBottom: '1rem',
              padding: '0.4rem 0.6rem',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '4px',
              display: 'inline-block',
              alignSelf: 'flex-start',
            }}>
              🏆 {project.backDetails.metrics}
            </div>
          )}

          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}>
            {'>'} Full Stack:
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            marginBottom: '1rem',
          }}>
            {project.backDetails?.fullStack?.map((t, i) => (
              <span key={i} style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem',
                padding: '0.2rem 0.4rem',
                background: `${tagColor}15`,
                border: `1px solid ${tagColor}30`,
                borderRadius: '3px',
                color: 'var(--text-primary)',
              }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}>
            {'>'} Highlights:
          </div>
          <div style={{ flex: 1 }}>
            {project.backDetails?.highlights?.map((h, i) => (
              <div key={i} style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.7rem',
                color: 'var(--text-primary)',
                marginBottom: '0.3rem',
                display: 'flex',
                gap: '0.5rem',
              }}>
                <span style={{ color: 'var(--accent-teal)' }}>•</span>
                {h}
              </div>
            ))}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0.75rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            opacity: 0.5,
          }}>
            [click to flip back]
          </div>
        </div>
      </motion.div>
    </div>
  )
}
