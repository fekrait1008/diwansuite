import { useEffect, useRef } from 'react'

const revealedElements = new WeakSet<Element>()
let sharedObserver: IntersectionObserver | null = null

function getObserver() {
  if (sharedObserver || typeof window === 'undefined') return sharedObserver
  sharedObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const element = entry.target as HTMLElement
      element.classList.add('revealed')
      revealedElements.add(element)
      sharedObserver?.unobserve(element)
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  return sharedObserver
}

export function useReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || revealedElements.has(el)) return
    const observer = getObserver()
    observer?.observe(el)
    return () => observer?.unobserve(el)
  }, [])

  return ref
}
