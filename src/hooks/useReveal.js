import { useEffect, useRef, useState } from 'react'

/** Marks an element visible once it scrolls into view (IntersectionObserver). */
export function useReveal(options = { threshold: 0.2 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        io.disconnect()
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visible]
}
