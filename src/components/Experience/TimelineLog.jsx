import { useRef, useEffect, useState } from 'react'
import { timelineEntries } from '../../data/timeline'

function TimelineEntry({ entry, index }) {
  const [expanded, setExpanded] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const ref = useRef(null)

  // Reveal on scroll — single IntersectionObserver per entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`tl-entry${revealed ? ' tl-revealed' : ''}`}
      style={{ '--entry-index': index }}
    >
      {/* Vertical connector line */}
      {index < timelineEntries.length - 1 && (
        <div className="tl-connector" />
      )}

      {/* Dot marker */}
      <div className="tl-dot" />

      {/* Log line — clickable */}
      <div
        className={`tl-logline${expanded ? ' tl-logline--open' : ''}`}
        onClick={() => setExpanded(!expanded)}
        data-cursor-hover
      >
        <span className="tl-date">[{entry.date}]</span>{' '}
        <span className="tl-type" style={{ color: getTypeColor(entry.type) }}>[{entry.type}]</span>{' '}
        <span className="tl-title">{entry.title}</span>{' '}
        <span className="tl-company">@ {entry.company}</span>
        <span className="tl-toggle">{expanded ? '[-]' : '[+]'}</span>
      </div>

      {/* Expanded details — CSS height transition */}
      <div className={`tl-details${expanded ? ' tl-details--open' : ''}`}>
        <div className="tl-details-inner" style={{ borderLeftColor: getTypeColor(entry.type) }}>
          {entry.bullets.map((bullet, i) => (
            <div
              key={i}
              className="tl-bullet"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="tl-bullet-dot">•</span>
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getTypeColor(type) {
  switch (type) {
    case 'FRONTEND': return 'var(--accent-blue)'
    case 'LEADERSHIP': return 'var(--accent-amber)'
    case 'EDUCATION': return 'var(--accent-purple)'
    default: return 'var(--accent-teal)'
  }
}

export default function TimelineLog() {
  return (
    <div className="tl-container">
      {timelineEntries.map((entry, i) => (
        <TimelineEntry key={i} entry={entry} index={i} />
      ))}

      <style>{`
        .tl-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ── Entry ─────────────────────────── */
        .tl-entry {
          position: relative;
          padding-left: 2rem;
        }

        /* ── Connector line ────────────────── */
        .tl-connector {
          position: absolute;
          left: 7px;
          top: 24px;
          width: 2px;
          height: calc(100% + 1rem);
          background: linear-gradient(to bottom, var(--accent-teal), transparent);
          transform-origin: top;
          transform: scaleY(0);
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
        }
        .tl-revealed .tl-connector {
          transform: scaleY(1);
        }

        /* ── Dot marker ────────────────────── */
        .tl-dot {
          position: absolute;
          left: 0;
          top: 6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid var(--accent-teal);
          background: transparent;
          transition: background 0.4s ease 0.15s;
        }
        .tl-revealed .tl-dot {
          background: var(--accent-teal);
        }

        /* ── Log line ──────────────────────── */
        .tl-logline {
          font-family: "JetBrains Mono", monospace;
          font-size: clamp(0.65rem, 1.5vw, 0.85rem);
          color: var(--accent-teal);
          margin-bottom: 0.5rem;
          cursor: pointer;
          padding: 0.75rem 1rem;
          background: transparent;
          border-radius: 4px;
          border: 1px solid transparent;
          word-break: break-word;
          user-select: none;

          /* Fade-in on reveal */
          opacity: 0;
          transition:
            opacity 0.5s ease 0.1s,
            background 0.3s ease,
            border-color 0.3s ease;
        }
        .tl-revealed .tl-logline {
          opacity: 1;
        }
        .tl-logline:hover {
          border-color: rgba(0, 255, 178, 0.2);
          background: rgba(0, 255, 178, 0.03);
        }
        .tl-logline--open {
          background: rgba(0, 255, 178, 0.05);
        }

        .tl-date   { color: var(--text-muted); }
        .tl-title  { color: var(--text-primary); font-weight: 600; }
        .tl-company { color: var(--text-muted); }
        .tl-toggle {
          margin-left: 0.5rem;
          color: var(--text-muted);
          font-size: 0.7rem;
        }

        /* ── Expandable details ────────────── */
        .tl-details {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
          padding-left: 1rem;
        }
        .tl-details--open {
          grid-template-rows: 1fr;
        }

        .tl-details-inner {
          min-height: 0;
          padding: 0.75rem 1rem;
          border-left: 2px solid var(--accent-teal);
          margin-bottom: 1.5rem;
        }

        /* ── Bullet items ──────────────────── */
        .tl-bullet {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
          display: flex;
          gap: 0.5rem;

          /* Staggered fade-in */
          opacity: 0;
          transform: translateX(-8px);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }
        .tl-details--open .tl-bullet {
          opacity: 1;
          transform: translateX(0);
        }

        .tl-bullet-dot {
          color: var(--accent-teal);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  )
}
