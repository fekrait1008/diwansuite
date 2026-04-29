import { ArrowRight, BookOpenCheck, Cable, GraduationCap, ShieldCheck, Users2, Wrench, Workflow, AlertCircle } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'
import { Badge } from '@/components/ui/badge'
import { buildLocalizedPath } from '@/lib/routing'

const SUPPORT_ICONS = [GraduationCap, Wrench, BookOpenCheck, Users2]
const TECH_ICONS = [Cable, Workflow, ShieldCheck, Wrench]

export function SiteHomeEnterpriseSections() {
  const { lang, isRTL, font, homeEnterprise: content } = useLang()
  const ref = useReveal()

  const quickLinks = [
    { label: content.links.implementation, href: buildLocalizedPath(lang, 'implementationSupportTraining') },
    { label: content.links.integrations, href: buildLocalizedPath(lang, 'integrationsBoardGovernance') },
    { label: content.links.compliance, href: buildLocalizedPath(lang, 'governanceSecurityCompliance') },
    { label: content.links.support, href: buildLocalizedPath(lang, 'support') },
  ]

  return (
    <section ref={ref} id="enterprise-readiness" className="section-reveal bg-secondary/25 py-12 lg:py-16" aria-labelledby="enterprise-readiness-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <Badge variant="outline" className="mb-4">{content.badge}</Badge>
          <h2 id="enterprise-readiness-heading" className="mb-4 font-extrabold text-foreground" style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.35rem)', lineHeight: '1.15' }}>
            {content.introTitle}
          </h2>
          <p className="text-base leading-7 text-muted-foreground lg:text-lg" style={{ fontFamily: font }}>
            {content.introText}
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-border bg-background p-6 shadow-sm lg:p-8" aria-labelledby="roles-responsibilities-heading">
            <div className="mb-6 max-w-3xl">
              <h3 id="roles-responsibilities-heading" className="mb-3 text-2xl font-extrabold text-foreground" style={{ fontFamily: font }}>
                {content.roles.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground lg:text-base" style={{ fontFamily: font }}>
                {content.roles.intro}
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="min-w-full divide-y divide-border bg-background text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    {[content.roles.headers.role, content.roles.headers.responsibilities, content.roles.headers.systemRole].map((label) => (
                      <th key={label} className="px-4 py-4 text-start font-bold text-foreground" style={{ fontFamily: font }}>
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {content.roles.rows.map((row) => (
                    <tr key={row.role} className="align-top">
                      <td className="px-4 py-4 font-bold text-foreground" style={{ fontFamily: font }}>{row.role}</td>
                      <td className="px-4 py-4 leading-7 text-muted-foreground" style={{ fontFamily: font }}>{row.responsibilities}</td>
                      <td className="px-4 py-4 leading-7 text-foreground/85" style={{ fontFamily: font }}>{row.systemRole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-border bg-background p-6 shadow-sm lg:p-8" aria-labelledby="implementation-roadmap-heading">
              <div className="mb-6 max-w-3xl">
                <h3 id="implementation-roadmap-heading" className="mb-3 text-2xl font-extrabold text-foreground" style={{ fontFamily: font }}>
                  {content.roadmap.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground lg:text-base" style={{ fontFamily: font }}>
                  {content.roadmap.intro}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                {content.roadmap.phases.map((phase, index) => (
                  <article key={phase.title} className="rounded-2xl border border-border bg-secondary/30 p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/10 text-sm font-extrabold text-chart-1" style={{ fontFamily: font }}>
                      {index + 1}
                    </div>
                    <h4 className="mb-2 text-base font-bold text-foreground" style={{ fontFamily: font }}>{phase.title}</h4>
                    <p className="text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>{phase.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            <aside className="rounded-3xl border border-border bg-foreground p-6 text-background shadow-xl lg:p-8" aria-labelledby="training-support-heading">
              <h3 id="training-support-heading" className="mb-3 text-2xl font-extrabold" style={{ fontFamily: font }}>
                {content.support.title}
              </h3>
              <p className="mb-6 text-sm leading-7 text-background/80 lg:text-base" style={{ fontFamily: font }}>
                {content.support.intro}
              </p>
              <div className="space-y-4">
                {content.support.items.map((item, index) => {
                  const Icon = SUPPORT_ICONS[index % SUPPORT_ICONS.length]
                  return (
                    <article key={item.title} className="rounded-2xl border border-background/15 bg-background/5 p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background/10">
                        <Icon className="h-5 w-5 text-background" />
                      </div>
                      <h4 className="mb-2 text-base font-bold" style={{ fontFamily: font }}>{item.title}</h4>
                      <p className="text-sm leading-7 text-background/75" style={{ fontFamily: font }}>{item.desc}</p>
                    </article>
                  )
                })}
              </div>
            </aside>
          </div>

          <div className="grid gap-8 xl:grid-cols-2">
            <section className="rounded-3xl border border-border bg-background p-6 shadow-sm lg:p-8" aria-labelledby="technical-integrations-heading">
              <div className="mb-6 max-w-3xl">
                <h3 id="technical-integrations-heading" className="mb-3 text-2xl font-extrabold text-foreground" style={{ fontFamily: font }}>
                  {content.technical.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground lg:text-base" style={{ fontFamily: font }}>
                  {content.technical.intro}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {content.technical.items.map((item, index) => {
                  const Icon = TECH_ICONS[index % TECH_ICONS.length]
                  return (
                    <article key={item.title} className="rounded-2xl border border-border bg-secondary/30 p-5">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/10">
                        <Icon className="h-5 w-5 text-chart-1" />
                      </div>
                      <h4 className="mb-2 text-base font-bold text-foreground" style={{ fontFamily: font }}>{item.title}</h4>
                      <p className="text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>{item.desc}</p>
                    </article>
                  )
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-background p-6 shadow-sm lg:p-8" aria-labelledby="challenges-solutions-heading">
              <div className="mb-6 max-w-3xl">
                <h3 id="challenges-solutions-heading" className="mb-3 text-2xl font-extrabold text-foreground" style={{ fontFamily: font }}>
                  {content.challenges.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground lg:text-base" style={{ fontFamily: font }}>
                  {content.challenges.intro}
                </p>
              </div>
              <div className="space-y-4">
                {content.challenges.items.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-border bg-secondary/30 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      </div>
                      <h4 className="text-base font-bold text-foreground" style={{ fontFamily: font }}>{item.title}</h4>
                    </div>
                    <div className="rounded-xl border border-border bg-background/80 p-4">
                      <p className="mb-3 text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>
                        <span className="font-bold text-foreground">{lang === 'ar' ? 'التحدي:' : 'Challenge:'}</span> {item.challenge}
                      </p>
                      <p className="text-sm leading-7 text-foreground/85" style={{ fontFamily: font }}>
                        <span className="font-bold text-foreground">{lang === 'ar' ? 'الحل:' : 'Solution:'}</span> {item.solution}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-chart-1/30 hover:text-chart-1" style={{ fontFamily: font }}>
              {link.label}
              <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
