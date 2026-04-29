import { Clock, TriangleAlert, FolderOpen, ShieldAlert, ChartBar, Users } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'

const painIcons = [Clock, TriangleAlert, FolderOpen, ShieldAlert, ChartBar, Users]

export function SiteProblem() {
  const { t, font } = useLang()
  const ref = useReveal()

  return (
    <section
      id="problem"
      ref={ref}
      className="section-reveal py-10 lg:py-14 bg-secondary/30"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-14">
          <span 
            className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.problem.badge}
          </span>
          <h2
            id="problem-heading"
            className="font-extrabold text-foreground mb-4"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              lineHeight: 1.15,
              fontFamily: font,
            }}
          >
            {t.problem.heading}
          </h2>
          <p 
            className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" 
            style={{ fontFamily: font }}
          >
            {t.problem.intro}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {t.problem.pains.map((pain, index) => {
            const Icon = painIcons[index]
            return (
              <article
                key={index}
                className="enterprise-card rounded-2xl border border-border bg-card p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/8">
                  <Icon className="h-5 w-5 text-destructive" />
                </div>
                <h3 
                  className="mb-2 text-base lg:text-lg font-bold text-foreground" 
                  style={{ fontFamily: font }}
                >
                  {pain.title}
                </h3>
                <p 
                  className="text-sm text-muted-foreground leading-relaxed" 
                  style={{ fontFamily: font }}
                >
                  {pain.desc}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
