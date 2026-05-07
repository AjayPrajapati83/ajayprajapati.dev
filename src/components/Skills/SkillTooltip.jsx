import { motion, AnimatePresence } from 'framer-motion'

export default function SkillTooltip({ data }) {
  if (!data) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          left: data.x,
          top: data.y - 20,
          transform: 'translate(-50%, -100%)',
          zIndex: 100,
          pointerEvents: 'none',
          background: 'rgba(2, 11, 20, 0.95)',
          border: `1px solid ${data.color}`,
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          minWidth: '200px',
          maxWidth: '280px',
          backdropFilter: 'blur(12px)',
          boxShadow: `0 0 20px ${data.color}33`,
        }}
      >
        <div style={{
          fontFamily: '"Syne", sans-serif',
          fontWeight: 700,
          fontSize: '0.9rem',
          color: data.color,
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: data.color,
            display: 'inline-block',
          }} />
          {data.clusterName}
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35rem',
        }}>
          {data.skills.slice(0, 6).map((skill, i) => (
            <span
              key={i}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                padding: '0.2rem 0.5rem',
                background: `${data.color}15`,
                border: `1px solid ${data.color}30`,
                borderRadius: '4px',
                color: 'var(--text-primary)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
