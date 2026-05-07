import { motion } from 'framer-motion'

export default function ProjectFilter({ categories, activeFilter, onFilterChange }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginBottom: '2.5rem',
    }}>
      {categories.map(cat => (
        <motion.button
          key={cat}
          onClick={() => onFilterChange(cat)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor-hover
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.75rem',
            padding: '0.5rem 1rem',
            background: activeFilter === cat
              ? 'var(--accent-teal)'
              : 'transparent',
            color: activeFilter === cat
              ? 'var(--bg-primary)'
              : 'var(--accent-teal)',
            border: '1px solid var(--accent-teal)',
            borderRadius: '0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.05em',
          }}
        >
          [ {cat} ]
        </motion.button>
      ))}
    </div>
  )
}
