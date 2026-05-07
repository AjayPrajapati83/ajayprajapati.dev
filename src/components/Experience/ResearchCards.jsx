import { useRef, useEffect } from 'react'
import { researchPapers } from '../../data/timeline'

export default function ResearchCards() {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('rc-visible')
        })
      },
      { threshold: 0.15 }
    )

    const cards = grid.querySelectorAll('.rc-card')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={gridRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '3rem',
      }}
    >
      {researchPapers.map((paper, i) => (
        <div
          key={paper.id}
          className={`rc-card${paper.featured ? ' rc-card--featured' : ''}`}
          style={{ '--card-index': i }}
        >
          {/* Golden shimmer border for featured paper */}
          {paper.featured && <div className="rc-shimmer" />}

          {/* Conference badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}>
            <span className={`rc-badge${paper.featured ? ' rc-badge--featured' : ''}`}>
              [{paper.conference || paper.year}]
            </span>
            {paper.award && (
              <span className="rc-award">🏆 {paper.award}</span>
            )}
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            lineHeight: 1.5,
          }}>
            {paper.title}
          </h3>

          {/* Abstract */}
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}>
            {paper.abstract}
          </p>
        </div>
      ))}

      <style>{`
        .rc-card {
          background: var(--bg-secondary);
          border: 1px solid rgba(0, 255, 178, 0.1);
          border-radius: 8px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          cursor: default;

          /* Entrance */
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.3s ease,
            box-shadow 0.3s ease;
          transition-delay: calc(var(--card-index) * 0.12s);
        }

        .rc-card.rc-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .rc-card--featured {
          border-color: rgba(245, 158, 11, 0.3);
        }

        .rc-card:hover {
          box-shadow: 0 0 20px rgba(0, 255, 178, 0.15);
        }
        .rc-card--featured:hover {
          box-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
        }

        .rc-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--accent-amber),
            #FDE68A,
            var(--accent-amber),
            #FDE68A,
            var(--accent-amber)
          );
          background-size: 200% auto;
          animation: goldShimmer 3s linear infinite;
        }

        @keyframes goldShimmer {
          to { background-position: 200% center; }
        }

        .rc-badge {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          padding: 0.25rem 0.5rem;
          background: rgba(0, 255, 178, 0.1);
          border: 1px solid var(--accent-teal);
          border-radius: 4px;
          color: var(--accent-teal);
        }
        .rc-badge--featured {
          background: rgba(245, 158, 11, 0.15);
          border-color: var(--accent-amber);
          color: var(--accent-amber);
        }

        .rc-award {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.6rem;
          padding: 0.2rem 0.5rem;
          background: rgba(245, 158, 11, 0.2);
          border-radius: 4px;
          color: var(--accent-amber);
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
