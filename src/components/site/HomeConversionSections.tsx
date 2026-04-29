import { AlertTriangle, CircleCheck, FileSearch, Eye, CheckCircle2, Clock3, Workflow, Users, Briefcase, ShieldCheck } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { useLang } from '@/contexts/LanguageContext'
import { Badge } from '@/components/ui/badge'

const WHY_NOW_ICONS = [AlertTriangle, Clock3, Eye, FileSearch]
const EXECUTIVE_ICONS = [Briefcase, Users, ShieldCheck]
const RESULT_ICONS = [Clock3, CheckCircle2, Workflow, FileSearch]

export function SiteWhyNow() {
  const { homeConversion, font } = useLang()
  const ref = useReveal()
  const content = homeConversion.whyNow

  return (
    <section ref={ref} id="why-now" className="section-reveal bg-secondary/35 py-12 lg:py-16" aria-labelledby="why-now-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <Badge variant="outline" className="mb-4">{content.badge}</Badge>
          <h2 id="why-now-heading" className="mb-4 font-extrabold text-foreground" style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.35rem)', lineHeight: '1.15' }}>
            {content.title}
          </h2>
          <p className="text-base leading-7 text-muted-foreground lg:text-lg" style={{ fontFamily: font }}>
            {content.intro}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {content.items.map((item, index) => {
              const Icon = WHY_NOW_ICONS[index % WHY_NOW_ICONS.length]
              return (
                <article key={item.title} className="enterprise-card rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/8">
                    <Icon className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground" style={{ fontFamily: font }}>{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>{item.desc}</p>
                </article>
              )
            })}
          </div>

          <aside className="rounded-3xl border border-chart-1/15 bg-foreground p-8 text-background shadow-xl">
            <h3 className="mb-4 text-2xl font-extrabold" style={{ fontFamily: font }}>{content.ctaHeading}</h3>
            <p className="mb-7 text-sm leading-7 text-background/75" style={{ fontFamily: font }}>{content.ctaText}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

export function SiteBeforeAfter() {
  const { homeConversion, font } = useLang()
  const ref = useReveal()
  const content = homeConversion.beforeAfter

  return (
    <section ref={ref} id="before-after" className="section-reveal bg-background py-12 lg:py-16" aria-labelledby="before-after-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">{content.badge}</Badge>
          <h2 id="before-after-heading" className="mb-4 font-extrabold text-foreground" style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.35rem)', lineHeight: '1.15' }}>
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground" style={{ fontFamily: font }}>{content.intro}</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="grid gap-px bg-border lg:grid-cols-[1.1fr_1fr_1fr]">
            <div className="hidden bg-secondary/50 p-5 lg:block" />
            <div className="bg-destructive/5 p-5 text-center">
              <div className="text-sm font-bold text-destructive" style={{ fontFamily: font }}>{content.withoutLabel}</div>
            </div>
            <div className="bg-emerald-600/8 p-5 text-center">
              <div className="text-sm font-bold text-emerald-700" style={{ fontFamily: font }}>{content.withLabel}</div>
            </div>

            {content.rows.map((row) => (
              <div key={row.label} className="contents">
                <div key={`${row.label}-label`} className="bg-background p-5">
                  <div className="text-sm font-bold text-foreground lg:text-base" style={{ fontFamily: font }}>{row.label}</div>
                </div>
                <div key={`${row.label}-without`} className="bg-background p-5">
                  <div className="flex items-start gap-3 text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>
                    <AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span>{row.without}</span>
                  </div>
                </div>
                <div key={`${row.label}-with`} className="bg-background p-5">
                  <div className="flex items-start gap-3 text-sm leading-7 text-foreground" style={{ fontFamily: font }}>
                    <CircleCheck className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <span>{row.with}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SiteResults() {
  const { homeConversion, font } = useLang()
  const ref = useReveal()
  const content = homeConversion.results

  return (
    <section ref={ref} id="results" className="section-reveal bg-secondary/30 py-12 lg:py-16" aria-labelledby="results-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-chart-1">{content.badge}</Badge>
            <h2 id="results-heading" className="mb-4 font-extrabold text-foreground" style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.35rem)', lineHeight: '1.15' }}>
              {content.title}
            </h2>
            <p className="text-base leading-7 text-muted-foreground lg:text-lg" style={{ fontFamily: font }}>{content.intro}</p>
          </div>
          <div className="rounded-2xl border border-border bg-background px-5 py-4 text-sm leading-7 text-muted-foreground shadow-sm lg:max-w-sm" style={{ fontFamily: font }}>
            {content.disclaimer}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.metrics.map((metric, index) => {
            const Icon = RESULT_ICONS[index % RESULT_ICONS.length]
            return (
              <article key={metric.label} className="enterprise-card rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-chart-1/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-chart-1" />
                  </div>
                  <div className="text-3xl font-black text-chart-1" style={{ fontFamily: "'Inter', sans-serif" }}>{metric.value}</div>
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground" style={{ fontFamily: font }}>{metric.label}</h3>
                <p className="text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>{metric.note}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-chart-1/15 bg-foreground p-8 text-background shadow-xl lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="mb-6 lg:mb-0 lg:max-w-2xl">
            <h3 className="mb-3 text-2xl font-extrabold" style={{ fontFamily: font }}>{content.ctaHeading}</h3>
            <p className="text-sm leading-7 text-background/75" style={{ fontFamily: font }}>{content.ctaText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SiteWorkflow() {
  const { homeConversion, font } = useLang()
  const ref = useReveal()
  const content = homeConversion.workflow

  return (
    <section ref={ref} id="workflow" className="section-reveal bg-background py-12 lg:py-16" aria-labelledby="workflow-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">{content.badge}</Badge>
          <h2 id="workflow-heading" className="mb-4 font-extrabold text-foreground" style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.35rem)', lineHeight: '1.15' }}>
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground" style={{ fontFamily: font }}>{content.intro}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.steps.map((step, index) => (
            <article key={step} className="enterprise-card rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-chart-1 text-sm font-black text-primary-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {index + 1}
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="text-base font-bold text-foreground lg:text-lg" style={{ fontFamily: font }}>{step}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SiteExecutiveValue() {
  const { homeConversion, font } = useLang()
  const ref = useReveal()
  const content = homeConversion.executiveValue

  return (
    <section ref={ref} id="executive-value" className="section-reveal bg-secondary/30 py-12 lg:py-16" aria-labelledby="executive-value-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <Badge variant="outline" className="mb-4">{content.badge}</Badge>
          <h2 id="executive-value-heading" className="mb-4 font-extrabold text-foreground" style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.35rem)', lineHeight: '1.15' }}>
            {content.title}
          </h2>
          <p className="text-base leading-7 text-muted-foreground lg:text-lg" style={{ fontFamily: font }}>{content.intro}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {content.roles.map((role, index) => {
            const Icon = EXECUTIVE_ICONS[index % EXECUTIVE_ICONS.length]
            return (
              <article key={role.role} className="enterprise-card rounded-2xl border border-border bg-background p-7 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-chart-1/10">
                  <Icon className="h-5 w-5 text-chart-1" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground" style={{ fontFamily: font }}>{role.role}</h3>
                <p className="mb-5 text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>{role.summary}</p>
                <ul className="space-y-3">
                  {role.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-foreground" style={{ fontFamily: font }}>
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
