import { Star, Quote } from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
import { useReveal } from "@/hooks/use-reveal"

export function SiteReviews() {
  const { t, font, isRTL } = useLang()
  const ref = useReveal()

  return (
    <section 
      ref={ref} 
      id="reviews" 
      className="section-reveal py-10 lg:py-14 bg-secondary/30" 
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-8 max-w-3xl mx-auto">
          <span 
            className="inline-block text-xs font-bold uppercase tracking-widest text-chart-1 mb-3" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.reviews.badge}
          </span>
          <h2
            id="reviews-heading"
            className="font-extrabold text-foreground"
            style={{ fontFamily: font, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.15" }}
          >
            {t.reviews.heading}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.reviews.items.map((review, i) => (
            <article
              key={i}
              className="enterprise-card relative rounded-2xl border border-border bg-card p-6 lg:p-7"
            >
              {/* Quote decoration - positioned opposite to stars for visual balance */}
              <Quote 
                className={`absolute top-5 h-8 w-8 text-chart-1/15 lg:top-6 ${
                  isRTL ? 'left-5 lg:left-6' : 'right-5 lg:right-6'
                }`} 
                style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
              />
              
              {/* Stars - aligned to start based on reading direction */}
              <div className={`mb-4 flex items-center gap-0.5 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${s < review.rating ? 'fill-amber-400 text-amber-400' : 'text-border'}`}
                  />
                ))}
              </div>
              
              {/* Quote text */}
              <blockquote 
                className="mb-5 text-sm leading-relaxed text-foreground/90" 
                style={{ fontFamily: font }}
              >
                &ldquo;{review.text}&rdquo;
              </blockquote>
              
              {/* Author */}
              <footer className="flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-1/10 border border-chart-1/20">
                  <span 
                    className="text-xs font-bold text-chart-1" 
                    style={{ fontFamily: font }}
                  >
                    {review.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                  </span>
                </div>
                <div>
                  <div 
                    className="text-sm font-semibold text-foreground" 
                    style={{ fontFamily: font }}
                  >
                    {review.name}
                  </div>
                  <div 
                    className="text-xs text-muted-foreground" 
                    style={{ fontFamily: font }}
                  >
                    {review.role} — {review.org}
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
