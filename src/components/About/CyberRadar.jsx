import { motion } from 'framer-motion'

export default function CyberRadar() {
  return (
    <div className="radar-container">
      {/* Outer ring */}
      <div className="radar-ring ring-outer" />
      <div className="radar-ring ring-middle" />
      <div className="radar-ring ring-inner" />

      {/* Rotating sweep */}
      <div className="radar-sweep" />

      {/* Center core */}
      <div className="radar-core">
        <div className="radar-core-inner" />
      </div>

      {/* Scan nodes */}
      {[
        { top: '18%', left: '62%', delay: 0, label: 'SIEM' },
        { top: '35%', left: '25%', delay: 0.5, label: 'SOC' },
        { top: '72%', left: '70%', delay: 1.0, label: 'IDS' },
        { top: '55%', left: '38%', delay: 1.5, label: 'WAF' },
        { top: '28%', left: '78%', delay: 2.0, label: 'EDR' },
        { top: '68%', left: '22%', delay: 2.5, label: 'TI' },
        { top: '82%', left: '48%', delay: 3.0, label: 'IR' },
        { top: '42%', left: '72%', delay: 0.8, label: 'FW' },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="radar-node"
          style={{ top: node.top, left: node.left }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
          transition={{
            delay: node.delay,
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
            times: [0, 0.1, 0.8, 1],
          }}
        >
          <div className="node-ping" />
          <div className="node-dot" />
          <span className="node-label">{node.label}</span>
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="radar-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.line
          x1="50" y1="50" x2="62" y2="18"
          stroke="rgba(0,255,178,0.15)" strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.line
          x1="50" y1="50" x2="25" y2="35"
          stroke="rgba(0,255,178,0.15)" strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.line
          x1="50" y1="50" x2="70" y2="72"
          stroke="rgba(0,255,178,0.15)" strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.line
          x1="50" y1="50" x2="38" y2="55"
          stroke="rgba(0,255,178,0.12)" strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
        />
      </svg>

      {/* Status text */}
      <div className="radar-status">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCANNING ACTIVE
        </motion.span>
      </div>

      {/* Grid overlay */}
      <div className="radar-grid" />

      <style>{`
        .radar-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(0, 255, 178, 0.03) 0%, transparent 70%);
          overflow: hidden;
          border-radius: 8px;
        }

        .radar-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 255, 178, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 178, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .radar-ring {
          position: absolute;
          border: 1px solid rgba(0, 255, 178, 0.12);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring-outer {
          width: 85%;
          height: 85%;
          border-color: rgba(0, 255, 178, 0.08);
        }

        .ring-middle {
          width: 58%;
          height: 58%;
          border-color: rgba(0, 255, 178, 0.12);
        }

        .ring-inner {
          width: 30%;
          height: 30%;
          border-color: rgba(0, 255, 178, 0.18);
        }

        .radar-sweep {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 2px;
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(0, 255, 178, 0.6), transparent);
          animation: sweep 4s linear infinite;
        }

        .radar-sweep::before {
          content: '';
          position: absolute;
          top: -40px;
          left: 0;
          width: 100%;
          height: 80px;
          background: conic-gradient(
            from -5deg at 0% 50%,
            transparent,
            rgba(0, 255, 178, 0.08) 15deg,
            transparent 30deg
          );
          transform-origin: left center;
        }

        @keyframes sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .radar-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(0, 255, 178, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: corePulse 2s ease-in-out infinite;
        }

        .radar-core-inner {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 12px var(--accent-teal), 0 0 24px rgba(0, 255, 178, 0.4);
        }

        @keyframes corePulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); }
        }

        .radar-node {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .node-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 8px var(--accent-teal);
          position: relative;
          z-index: 2;
        }

        .node-ping {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid rgba(0, 255, 178, 0.3);
          top: 50%;
          left: 3px;
          transform: translate(-50%, -50%);
          animation: ping 2s ease-out infinite;
        }

        @keyframes ping {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }

        .node-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.55rem;
          color: var(--accent-teal);
          letter-spacing: 0.1em;
          white-space: nowrap;
          text-shadow: 0 0 6px rgba(0, 255, 178, 0.5);
        }

        .radar-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .radar-status {
          position: absolute;
          top: 12px;
          right: 16px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.6rem;
          color: var(--accent-teal);
          letter-spacing: 0.15em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .radar-status::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal);
          box-shadow: 0 0 6px var(--accent-teal);
          animation: statusBlink 1.5s ease-in-out infinite;
        }

        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
