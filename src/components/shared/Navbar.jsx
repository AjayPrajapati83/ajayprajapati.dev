import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const navLinks = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'achievements', label: 'achievements' },
  { id: 'contact', label: 'contact' },
]

const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy(sectionIds)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollToSection = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9998,
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(6px)',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(6px)',
          background: scrolled
            ? 'rgba(2, 11, 20, 0.9)'
            : 'rgba(2, 11, 20, 0.5)',
          borderBottom: '1px solid rgba(0, 255, 178, 0.15)',
          transition: 'all 0.3s ease',
          padding: '0 2rem',
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
              <path
                d="M18 0 L34 10 L34 30 L18 40 L2 30 L2 10 Z"
                stroke="#00FFB2"
                strokeWidth="1.5"
                fill="rgba(0, 255, 178, 0.05)"
              />
              <text
                x="18"
                y="24"
                textAnchor="middle"
                fill="#00FFB2"
                fontFamily="Syne"
                fontWeight="800"
                fontSize="14"
              >
                AP
              </text>
            </svg>
          </motion.button>

          {/* Desktop Links */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
            className="nav-desktop"
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.8rem',
                  color: activeSection === link.id ? 'var(--accent-teal)' : 'var(--text-muted)',
                  cursor: 'none',
                  padding: '0.5rem 0',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="navIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--accent-teal)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-toggle"
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <motion.span
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 7 : 0,
                }}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--accent-teal)',
                  transition: 'background 0.3s',
                }}
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--accent-teal)',
                }}
              />
              <motion.span
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? -7 : 0,
                }}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--accent-teal)',
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9997,
              background: 'rgba(2, 11, 20, 0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '1.2rem',
                  color: activeSection === link.id ? 'var(--accent-teal)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.75rem 2rem',
                  letterSpacing: '0.1em',
                }}
              >
                {'> '}{link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  )
}
