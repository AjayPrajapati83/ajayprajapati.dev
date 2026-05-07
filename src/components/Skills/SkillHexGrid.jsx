import { motion } from 'framer-motion'
import { skillClusters } from '../../data/skills'

// Comprehensive icon map using devicon CDN
const getSkillIcon = (skillName) => {
  const icons = {
    // Cybersecurity
    'Wazuh': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    'SIEM': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg',
    'SOC L1': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg',
    'Phishing Analysis': null,
    'Threat Intelligence': null,
    'Incident Response': null,
    'Log Analysis': null,
    'Vulnerability Assessment': null,
    'Network Security': null,
    // Frontend
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    // Networking
    'OSI Model': null,
    'TCP/IP': null,
    'DNS': null,
    'Subnetting': null,
    'Wi-Fi Security': null,
    'Firewall Config': null,
    'VPN': null,
    'Network Monitoring': null,
    // AI
    'Gemini API': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
    'Selenium': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
    'Python Scripting': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'Web Scraping': null,
    'AI Chatbots': null,
    'Automation': null,
    // Tools
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
    'Supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
    'MS Office': null,
    'VirtualBox': null,
    'Ubuntu': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg',
    'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
    // Soft Skills
    'Leadership': null,
    'Public Speaking': null,
    'Documentation': null,
    'Team Management': null,
    'Mentoring': null,
    'Research': null,
  }
  return icons[skillName] ?? null
}

// Emoji fallbacks for skills without devicon
const getSkillEmoji = (skillName) => {
  const emojis = {
    'Phishing Analysis': '🎣',
    'Threat Intelligence': '🕵️',
    'Incident Response': '🚨',
    'Log Analysis': '📊',
    'Vulnerability Assessment': '🔍',
    'Network Security': '🔒',
    'OSI Model': '📶',
    'TCP/IP': '🌐',
    'DNS': '🔗',
    'Subnetting': '📡',
    'Wi-Fi Security': '📡',
    'Firewall Config': '🛡️',
    'VPN': '🔐',
    'Network Monitoring': '📈',
    'Web Scraping': '🕸️',
    'AI Chatbots': '🤖',
    'Automation': '⚙️',
    'MS Office': '📝',
    'VirtualBox': '💻',
    'Leadership': '👑',
    'Public Speaking': '🎤',
    'Documentation': '📄',
    'Team Management': '👥',
    'Mentoring': '🧭',
    'Research': '🔬',
  }
  return emojis[skillName] ?? '⬡'
}

function HexTile({ skill, color, delay, clusterName }) {
  const iconUrl = getSkillIcon(skill)
  const emoji = getSkillEmoji(skill)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.12,
        y: -6,
        zIndex: 10,
      }}
      data-cursor-hover
      className="hex-tile"
      style={{
        '--cluster-color': color,
        position: 'relative',
      }}
    >
      <div className="hex-inner">
        {/* Icon */}
        <div className="hex-icon">
          {iconUrl ? (
            <img 
              src={iconUrl} 
              alt={skill} 
              width="28" 
              height="28"
              loading="lazy"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}
            />
          ) : (
            <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
          )}
        </div>
        {/* Label */}
        <div className="hex-label">{skill}</div>
      </div>

      {/* Glow on hover */}
      <div className="hex-glow" />
    </motion.div>
  )
}

export default function SkillHexGrid() {
  return (
    <div>
      {skillClusters.map((cluster, ci) => (
        <div key={ci} style={{ marginBottom: '2.5rem' }}>
          {/* Cluster title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}>
            <span style={{
              width: '12px',
              height: '12px',
              borderRadius: '3px',
              background: cluster.color,
              display: 'inline-block',
              boxShadow: `0 0 8px ${cluster.color}60`,
            }} />
            <span style={{
              fontFamily: '"Syne", sans-serif',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}>
              {cluster.name}
            </span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
            }}>
              // {cluster.description}
            </span>
          </div>

          {/* Hex tiles for this cluster */}
          <div className="hex-row">
            {cluster.skills.map((skill, si) => (
              <HexTile
                key={skill}
                skill={skill}
                color={cluster.color}
                clusterName={cluster.name}
                delay={ci * 0.05 + si * 0.04}
              />
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .hex-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .hex-tile {
          width: 100px;
          height: 110px;
          position: relative;
          cursor: pointer;
          transition: filter 0.3s ease;
        }

        .hex-inner {
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--cluster-color) 15%, var(--bg-secondary)),
            color-mix(in srgb, var(--cluster-color) 5%, var(--bg-primary))
          );
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          position: relative;
          z-index: 2;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .hex-tile:hover .hex-inner {
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--cluster-color) 30%, var(--bg-secondary)),
            color-mix(in srgb, var(--cluster-color) 12%, var(--bg-primary))
          );
        }

        /* Hex border via pseudo-element */
        .hex-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(135deg, var(--cluster-color), transparent 60%);
          opacity: 0.25;
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .hex-tile:hover .hex-inner::before {
          opacity: 0.6;
        }

        .hex-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }

        .hex-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.55rem;
          color: var(--text-primary);
          text-align: center;
          line-height: 1.2;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .hex-tile:hover .hex-label {
          opacity: 1;
          color: var(--cluster-color);
        }

        .hex-glow {
          position: absolute;
          inset: -4px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--cluster-color);
          opacity: 0;
          filter: blur(12px);
          z-index: 1;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .hex-tile:hover .hex-glow {
          opacity: 0.15;
        }

        @media (max-width: 768px) {
          .hex-tile {
            width: 80px;
            height: 90px;
          }
          .hex-icon img {
            width: 22px !important;
            height: 22px !important;
          }
          .hex-label {
            font-size: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .hex-tile {
            width: 68px;
            height: 76px;
          }
          .hex-icon img {
            width: 18px !important;
            height: 18px !important;
          }
          .hex-row {
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}
