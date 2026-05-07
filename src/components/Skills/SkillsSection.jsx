import { useEffect, useRef } from 'react'
import { skillClusters, skillPills } from '../../data/skills'

/* ── Icon map (devicon CDN) ─────────────────────────── */
const iconMap = {
  'Wazuh': 'linux/linux-original',
  'SIEM': 'prometheus/prometheus-original',
  'SOC L1': 'grafana/grafana-original',
  'React': 'react/react-original',
  'Next.js': 'nextjs/nextjs-original',
  'Flutter': 'flutter/flutter-original',
  'React Native': 'react/react-original',
  'TypeScript': 'typescript/typescript-original',
  'JavaScript': 'javascript/javascript-original',
  'HTML5': 'html5/html5-original',
  'CSS3': 'css3/css3-original',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original',
  'Gemini API': 'google/google-original',
  'Selenium': 'selenium/selenium-original',
  'Python Scripting': 'python/python-original',
  'Git': 'git/git-original',
  'VS Code': 'vscode/vscode-original',
  'Firebase': 'firebase/firebase-original',
  'Supabase': 'supabase/supabase-original',
  'Ubuntu': 'ubuntu/ubuntu-original',
  'Vercel': 'vercel/vercel-original',
}

const emojiMap = {
  'Phishing Analysis': '🎣', 'Threat Intelligence': '🕵️',
  'Incident Response': '🚨', 'Log Analysis': '📊',
  'Vulnerability Assessment': '🔍', 'Network Security': '🔒',
  'OSI Model': '📶', 'TCP/IP': '🌐', 'DNS': '🔗',
  'Subnetting': '📡', 'Wi-Fi Security': '📡',
  'Firewall Config': '🛡️', 'VPN': '🔐', 'Network Monitoring': '📈',
  'Web Scraping': '🕸️', 'AI Chatbots': '🤖', 'Automation': '⚙️',
  'MS Office': '📝', 'VirtualBox': '💻',
  'Leadership': '👑', 'Public Speaking': '🎤',
  'Documentation': '📄', 'Team Management': '👥',
  'Mentoring': '🧭', 'Research': '🔬',
}

const getIcon = (name) => {
  const path = iconMap[name]
  return path ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg` : null
}

/* ── Skill Tag ──────────────────────────────────────── */
function SkillTag({ name, color, delay }) {
  const iconUrl = getIcon(name)
  const emoji = emojiMap[name]

  return (
    <div
      className="skill-tag"
      style={{
        '--tag-color': color,
        animationDelay: `${delay}ms`,
      }}
    >
      <span className="skill-tag__icon">
        {iconUrl ? (
          <img src={iconUrl} alt="" width="16" height="16" loading="lazy" />
        ) : (
          <span className="skill-tag__emoji">{emoji || '⬡'}</span>
        )}
      </span>
      <span className="skill-tag__name">{name}</span>
    </div>
  )
}

/* ── Cluster Card ───────────────────────────────────── */
function ClusterCard({ cluster, index }) {
  return (
    <div
      className="skill-cluster"
      style={{
        '--cluster-color': cluster.color,
        '--cluster-index': index,
      }}
    >
      {/* Accent bar */}
      <div className="skill-cluster__bar" />

      {/* Header */}
      <div className="skill-cluster__header">
        <div className="skill-cluster__indicator">
          <span className="skill-cluster__dot" />
          <span className="skill-cluster__dot skill-cluster__dot--ping" />
        </div>
        <h3 className="skill-cluster__title">{cluster.name}</h3>
        <span className="skill-cluster__count">{cluster.skills.length}</span>
      </div>

      {/* Description */}
      <p className="skill-cluster__desc">// {cluster.description}</p>

      {/* Tags */}
      <div className="skill-cluster__tags">
        {cluster.skills.map((skill, si) => (
          <SkillTag
            key={skill}
            name={skill}
            color={cluster.color}
            delay={si * 60}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Main Section ───────────────────────────────────── */
export default function SkillsSection() {
  const sectionRef = useRef(null)

  /* Single IntersectionObserver — toggles .in-view on each card */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    const cards = section.querySelectorAll('.skill-cluster')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header">scanning_capabilities</div>
        <h2 className="section-title">Skills &amp; Expertise</h2>

        {/* Cluster Grid */}
        <div className="skills-grid">
          {skillClusters.map((cluster, ci) => (
            <ClusterCard key={cluster.name} cluster={cluster} index={ci} />
          ))}
        </div>

        {/* Marquee Pill Strip */}
        <div className="skills-marquee-wrapper">
          <div className="skills-marquee">
            {[...skillPills, ...skillPills].map((pill, i) => (
              <span
                key={i}
                className="marquee-pill"
                style={{ '--pill-color': pill.color }}
              >
                {pill.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ─── Grid ───────────────────────────────── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        /* ─── Cluster Card ───────────────────────── */
        .skill-cluster {
          position: relative;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 1.5rem 1.5rem 1.25rem;
          overflow: hidden;

          /* Entrance animation — driven by .in-view class */
          opacity: 0;
          transform: translateY(32px) scale(0.97);
          transition:
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease,
            box-shadow 0.35s ease;
          transition-delay: calc(var(--cluster-index) * 0.1s);
        }

        .skill-cluster.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Hover glow */
        .skill-cluster:hover {
          border-color: color-mix(in srgb, var(--cluster-color) 40%, transparent);
          box-shadow:
            0 0 30px color-mix(in srgb, var(--cluster-color) 10%, transparent),
            inset 0 0 30px color-mix(in srgb, var(--cluster-color) 4%, transparent);
        }

        /* Accent top bar */
        .skill-cluster__bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--cluster-color) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .skill-cluster.in-view .skill-cluster__bar {
          opacity: 0.7;
        }
        .skill-cluster:hover .skill-cluster__bar {
          opacity: 1;
        }

        /* Header row */
        .skill-cluster__header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.4rem;
        }

        /* Pulsing dot indicator */
        .skill-cluster__indicator {
          position: relative;
          width: 10px;
          height: 10px;
          flex-shrink: 0;
        }
        .skill-cluster__dot {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--cluster-color);
        }
        .skill-cluster__dot--ping {
          animation: sk-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          opacity: 0;
        }
        .skill-cluster:hover .skill-cluster__dot--ping {
          animation-play-state: running;
        }

        @keyframes sk-ping {
          0% { transform: scale(1); opacity: 0.6; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }

        .skill-cluster__title {
          font-family: "Syne", sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--text-primary);
          margin: 0;
          flex: 1;
        }

        .skill-cluster__count {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          color: var(--cluster-color);
          background: color-mix(in srgb, var(--cluster-color) 12%, transparent);
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
          letter-spacing: 0.02em;
        }

        .skill-cluster__desc {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin: 0 0 1rem;
          opacity: 0.7;
        }

        /* ─── Skill Tags Container ───────────────── */
        .skill-cluster__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        /* ─── Individual Skill Tag ───────────────── */
        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.7rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 6px;
          cursor: default;
          position: relative;

          /* Staggered pop-in driven by CSS only */
          opacity: 0;
          transform: translateY(10px);
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease;
        }

        /* Animate in when parent card is in view */
        .skill-cluster.in-view .skill-tag {
          animation: sk-tagIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes sk-tagIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .skill-tag:hover {
          border-color: color-mix(in srgb, var(--tag-color) 50%, transparent);
          background: color-mix(in srgb, var(--tag-color) 8%, transparent);
          transform: translateY(-2px);
        }

        .skill-tag__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }
        .skill-tag__icon img {
          width: 16px;
          height: 16px;
          filter: grayscale(0.3) brightness(0.9);
          transition: filter 0.3s ease;
        }
        .skill-tag:hover .skill-tag__icon img {
          filter: grayscale(0) brightness(1) drop-shadow(0 0 4px var(--tag-color));
        }

        .skill-tag__emoji {
          font-size: 0.85rem;
          line-height: 1;
        }

        .skill-tag__name {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.7rem;
          color: var(--text-primary);
          white-space: nowrap;
          opacity: 0.85;
          transition: color 0.3s ease;
        }
        .skill-tag:hover .skill-tag__name {
          color: var(--tag-color);
          opacity: 1;
        }

        /* ─── Marquee ────────────────────────────── */
        .skills-marquee-wrapper {
          margin-top: 3rem;
          overflow: hidden;
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .skills-marquee {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          animation: sk-scroll 40s linear infinite;
          will-change: transform;
        }

        .skills-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes sk-scroll {
          to { transform: translateX(-50%); }
        }

        .marquee-pill {
          padding: 0.45rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-left: 2px solid var(--pill-color);
          border-radius: 0 6px 6px 0;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.72rem;
          color: var(--text-primary);
          white-space: nowrap;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .marquee-pill:hover {
          background: color-mix(in srgb, var(--pill-color) 12%, transparent);
          color: var(--pill-color);
        }

        /* ─── Responsive ─────────────────────────── */
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .skill-cluster {
            padding: 1.25rem 1rem 1rem;
          }
        }
      `}</style>
    </section>
  )
}
