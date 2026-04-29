import { TrendingUp } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'

export function SiteResults() {
  const { homeConversion, font } = useLang()
  const ref = useReveal()

  const { results } = homeConversion

  return (
    <section
      ref={ref}
      id="results"
      className="section-reveal bg-chart-1 py-16 text-primary-foreground lg:py-24"
      aria-labelledby="results-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <span 
            className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary-foreground/60" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {results.badge}
          </span>
          <h2
            id="results-heading"
            className="mb-4 font-extrabold"
            style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: '1.15' }}
          >
            {results.title}
          </h2>
          <p 
            className="text-base leading-relaxed text-primary-foreground/80 lg:text-lg" 
            style={{ fontFamily: font }}
          >
            {results.intro}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {results.metrics.map((metric, index) => (
            <article
              key={index}
              className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center transition-colors hover:bg-primary-foreground/10"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div 
                className="mb-2 text-2xl font-extrabold lg:text-3xl" 
                style={{ fontFamily: font }}
              >
                {metric.value}
              </div>
              <div 
                className="mb-2 text-sm font-semibold" 
                style={{ fontFamily: font }}
              >
                {metric.label}
              </div>
              <p 
                className="text-xs leading-relaxed text-primary-foreground/60" 
                style={{ fontFamily: font }}
              >
                {metric.note}
              </p>
            </article>
          ))}
        </div>

        {/* Disclaimer */}
        <p 
          className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-primary-foreground/50" 
          style={{ fontFamily: font }}
        >
          {results.disclaimer}
        </p>
      </div>
    </section>
  )
}
