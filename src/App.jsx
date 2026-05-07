import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Global UI
import Loader from './components/shared/Loader'
import ScanlineOverlay from './components/shared/ScanlineOverlay'
import CustomCursor from './components/shared/CustomCursor'
import Navbar from './components/shared/Navbar'

// Sections
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import SkillsSection from './components/Skills/SkillsSection'
import ExperienceSection from './components/Experience/ExperienceSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import AchievementsSection from './components/Achievements/AchievementsSection'
import ContactSection from './components/Contact/ContactSection'

gsap.registerPlugin(ScrollTrigger)

import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          padding: '2rem',
          color: 'var(--accent-red)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.85rem',
        }}>
          [ERROR] Component failed to render. Check console for details.
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [loading])

  return (
    <>
      {/* Loading Screen */}
      <Loader onComplete={() => setLoading(false)} />

      {/* Main Content */}
      {!loading && (
        <>
          <ScanlineOverlay />
          <CustomCursor />
          <Navbar />

          <main>
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>

            <ErrorBoundary>
              <AboutSection />
            </ErrorBoundary>

            <ErrorBoundary>
              <SkillsSection />
            </ErrorBoundary>

            <ErrorBoundary>
              <ExperienceSection />
            </ErrorBoundary>

            <ErrorBoundary>
              <ProjectsSection />
            </ErrorBoundary>

            <ErrorBoundary>
              <AchievementsSection />
            </ErrorBoundary>

            <ErrorBoundary>
              <ContactSection />
            </ErrorBoundary>
          </main>
        </>
      )}
    </>
  )
}
