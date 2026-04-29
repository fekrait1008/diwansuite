import { trackScrollDepth } from '@/lib/analytics'

/**
 * Attaches a scroll listener that fires trackScrollDepth at each milestone.
 * Loaded lazily after hydration so the main bundle only pays for it when needed.
 */
export function initScrollDepthTracking(lang: string, page: string): () => void {
  if (typeof window === 'undefined') return () => {}

  const milestones = new Set<number>()
  const thresholds = [25, 50, 75, 100] as const

  const onScroll = () => {
    const scrolled = window.scrollY + window.innerHeight
    const total = document.documentElement.scrollHeight
    const pct = Math.round((scrolled / total) * 100)

    for (const threshold of thresholds) {
      if (pct >= threshold && !milestones.has(threshold)) {
        milestones.add(threshold)
        trackScrollDepth({ depth: threshold, lang, page })
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
