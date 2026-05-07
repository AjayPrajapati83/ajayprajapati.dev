import { useState, useEffect, useRef } from 'react'

export function useScrollSpy(sectionIds, options = {}) {
  const { threshold = 0.3, rootMargin = '-80px 0px 0px 0px' } = options
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')
  const observerRef = useRef(null)

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold, rootMargin }
    )

    elements.forEach(el => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [sectionIds, threshold, rootMargin])

  return activeSection
}
