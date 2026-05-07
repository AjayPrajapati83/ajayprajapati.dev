import { useTypewriter } from '../../hooks/useTypewriter'

const phrases = [
  'Cybersecurity Enthusiast',
  'Frontend Developer',
  'SOC Analyst (L1) — Building',
  'Best Paper — CONFAB 2026',
]

export default function TypewriterText() {
  const { text } = useTypewriter(phrases, {
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseTime: 2000,
  })

  return (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
      color: 'var(--text-primary)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      minHeight: '2rem',
    }}>
      <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>[&gt;_]</span>
      <span>{text}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.2em',
          background: 'var(--accent-teal)',
          animation: 'blink 1s step-end infinite',
          verticalAlign: 'text-bottom',
        }}
      />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
