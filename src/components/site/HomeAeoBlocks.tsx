import { ArrowRight, CheckCircle2, CircleHelp, Layers3, ListChecks, Users2 } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'
import { buildLocalizedPath } from '@/lib/routing'

const cardIcons = [CircleHelp, Users2, Layers3, ListChecks]

export function SiteHomeAeoBlocks() {
  const { lang, isRTL, font, homeAeo: content } = useLang()
  const ref = useReveal()
  const supportHref = buildLocalizedPath(lang, 'support')

  const cards = [
    content.cards.directAnswer,
    content.cards.whoFor,
    content.cards.whatItSolves,
    content.cards.howItWorks,
  ]

  return (
    <section ref={ref} id="answers" className="section-reveal bg-secondary/25 py-16 lg:py-20" aria-labelledby="answers-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-chart-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            {content.sectionBadge}
          </span>
          <h2 id="answers-heading" className="mb-4 font-extrabold text-foreground" style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: '1.15' }}>
            {content.sectionTitle}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground lg:text-base" style={{ fontFamily: font }}>
            {content.sectionIntro}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = cardIcons[index]
            const isDirectAnswer = 'body' in card
            return (
              <article key={card.title} className={`rounded-3xl border border-border bg-background/90 p-6 shadow-sm ${isDirectAnswer ? 'lg:col-span-2' : ''}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-chart-1/10">
                    <Icon className="h-5 w-5 text-chart-1" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: font }}>
                    {card.title}
                  </h3>
                </div>

                {isDirectAnswer ? (
                  <p className="max-w-4xl text-sm leading-8 text-muted-foreground lg:text-base" style={{ fontFamily: font }}>
                    {card.body}
                  </p>
                ) : (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/80 bg-secondary/25 px-4 py-4 text-sm text-foreground" style={{ fontFamily: font }}>
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#features" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-chart-1/30 hover:text-chart-1" style={{ fontFamily: font }}>
            {content.links.features}
            <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </a>
          <a href="#pricing" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-chart-1/30 hover:text-chart-1" style={{ fontFamily: font }}>
            {content.links.pricing}
            <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </a>
          <a href={supportHref} className="inline-flex items-center gap-2 rounded-xl bg-chart-1 px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-chart-1/90" style={{ fontFamily: font }}>
            {content.links.support}
            <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </a>
        </div>
      </div>
    </section>
  )
}
