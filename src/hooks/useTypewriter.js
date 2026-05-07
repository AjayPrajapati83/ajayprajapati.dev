import { useState, useEffect, useCallback, useRef } from 'react'

export function useTypewriter(phrases, {
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
} = {}) {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef(null)

  const tick = useCallback(() => {
    const currentPhrase = phrases[currentIndex]
    
    if (isDeleting) {
      setText(prev => prev.substring(0, prev.length - 1))
    } else {
      setText(currentPhrase.substring(0, text.length + 1))
    }
  }, [text, isDeleting, currentIndex, phrases])

  useEffect(() => {
    const currentPhrase = phrases[currentIndex]
    
    if (!isDeleting && text === currentPhrase) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    } else {
      timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeoutRef.current)
  }, [text, isDeleting, currentIndex, phrases, tick, typeSpeed, deleteSpeed, pauseTime])

  return { text, isDeleting, currentIndex }
}
