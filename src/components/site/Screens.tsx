import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'
import { buildLocalizedPath } from '@/lib/routing'
import { ArrowRight } from 'lucide-react'

export function SiteScreens() {
  const { lang, font, isRTL, pageMeta, homePhase4 } = useLang()
  const ref = useReveal()
  const copy = homePhase4.screens

  return (
    <section 
      ref={ref} 
      id="screens" 
      className="section-reveal bg-secondary/30 py-10 lg:py-14" 
      aria-labelledby="screens-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 lg:mb-8 max-w-3xl text-center">
          <span 
            className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-chart-1" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {copy.badge}
          </span>
          <h2 
            id="screens-heading" 
            className="mb-4 font-extrabold text-foreground" 
            style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: '1.15' }}
          >
            {copy.heading}
          </h2>
          <p 
            className="text-base leading-relaxed text-muted-foreground lg:text-lg" 
            style={{ fontFamily: font }}
          >
            {copy.intro}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {copy.items.map((item) => {
            const title = pageMeta[item.page]?.title || item.page
            return (
              <article 
                key={item.page} 
                className="enterprise-card rounded-2xl border border-border bg-card overflow-hidden"
              >
                <div className="overflow-hidden bg-secondary/50">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    width="960"
                    height="640"
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
                <div className="p-5 lg:p-6">
                  <h3 
                    className="text-base lg:text-lg font-bold text-foreground mb-2" 
                    style={{ fontFamily: font }}
                  >
                    {title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed text-muted-foreground mb-4" 
                    style={{ fontFamily: font }}
                  >
                    {item.caption}
                  </p>
                  <a
                    href={buildLocalizedPath(lang, item.page)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-chart-1 hover:underline"
                    style={{ fontFamily: font }}
                  >
                    <span>{title}</span>
                    <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
