import { lazy, Suspense } from 'react'
import { SiteHero } from '@/components/site/Hero'
import { SiteProblem } from '@/components/site/Problem'
import { SiteHomeAeoBlocks } from '@/components/site/HomeAeoBlocks'
import { SiteFeatures } from '@/components/site/Features'
import { SiteWhyNow, SiteBeforeAfter, SiteWorkflow, SiteExecutiveValue } from '@/components/site/HomeConversionSections'
import { SiteResults } from '@/components/site/Results'
import { SiteReviews } from '@/components/site/Reviews'
import { SiteScreens } from '@/components/site/Screens'
import { SiteAISection } from '@/components/site/AISection'
import { SiteComparison } from '@/components/site/Comparison'
import { SiteCompliance } from '@/components/site/Compliance'
import { SiteHomeEnterpriseSections } from '@/components/site/HomeEnterpriseSections'
import { SitePricing } from '@/components/site/Pricing'
import { SiteFAQ } from '@/components/site/FAQ'

/**
 * SiteCTA contains the lead form (1354 lines).
 * Lazy-loaded so it does not inflate the initial JS bundle.
 * The form is below the fold — users reach it after scrolling through
 * ~12 sections, so the chunk will have finished loading by then.
 */
const SiteCTA = lazy(() =>
  import('@/components/site/CTA').then(m => ({ default: m.SiteCTA }))
)

/**
 * Refined homepage with optimized persuasion flow:
 * 1. Hero - product-led with visual anchor and trust signals
 * 2. Problem - why change now (pain points) 
 * 3. Features - solution proof with interactive showcase
 * 4. Results - quantified outcomes (restored for AEO/social proof)
 * 5. Reviews - social proof (moved earlier in flow)
 * 6. Screens - product visual proof
 * 7. AI - Diwan Suite AI Agent positioning with platform integrations
 * 8. Comparison - competitive differentiation vs alternatives
 * 9. Compliance - trust and security
 * 10. Pricing - conversion decision point
 * 11. FAQ - objection handling
 * 12. CTA - final conversion
 */
export function HomePage() {
  return (
    <main id="main-content">
      <SiteHero />
      <SiteProblem />
      <SiteHomeAeoBlocks />
      <SiteFeatures />
      <SiteWhyNow />
      <SiteBeforeAfter />
      <SiteWorkflow />
      <SiteResults />
      <SiteReviews />
      <SiteExecutiveValue />
      <SiteScreens />
      <SiteAISection />
      <SiteComparison />
      <SiteCompliance />
      <SiteHomeEnterpriseSections />
      <SitePricing />
      <SiteFAQ />
      <Suspense fallback={null}>
        <SiteCTA />
      </Suspense>
    </main>
  )
}
