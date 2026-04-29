import { useState } from "react"
import { Landmark, Building2, TrendingUp, Users, Briefcase, LayoutDashboard, CircleCheck as CheckCircle2 } from "lucide-react"
import { useLang } from "../../contexts/LanguageContext"
import { useReveal } from "../../hooks/use-reveal"
import { Badge } from "../ui/badge"
import { SectionLinks } from "@/components/site/SectionLinks"
import { getIndustryLinks } from "@/lib/page-links"

const SECTOR_ICONS = [Landmark, Building2, TrendingUp, Users, Briefcase, LayoutDashboard]

export function SiteUseCases() {
  const { t, lang, font, pageMeta, homePhase4 } = useLang()
  const [active, setActive] = useState(0)
  const ref = useReveal()

  return (
    <section
      ref={ref}
      id="use-cases"
      className="section-reveal py-12 lg:py-16 bg-background"
      aria-labelledby="use-cases-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            {t.useCases.badge}
          </Badge>
          <h2
            id="use-cases-heading"
            className="font-extrabold text-foreground"
            style={{ fontFamily: font, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.15" }}
          >
            {t.useCases.heading}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {t.useCases.cases.map((c, i) => {
            const Icon = SECTOR_ICONS[i]
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all border ${
                  active === i
                    ? 'bg-chart-1 text-primary-foreground border-chart-1'
                    : 'bg-background text-muted-foreground border-border hover:border-foreground/20'
                }`}
                style={{ fontFamily: font }}
              >
                <Icon className="w-4 h-4" />
                {c.sector}
              </button>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="enterprise-card p-8 bg-card border border-border rounded-2xl">
            <p className="text-base text-foreground leading-relaxed mb-6" style={{ fontFamily: font }}>
              {t.useCases.cases[active].desc}
            </p>

            <ul className="space-y-3">
              {t.useCases.cases[active].results.map((result, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed" style={{ fontFamily: font }}>
                    {result}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <SectionLinks title={homePhase4.links.industries} items={getIndustryLinks(lang, pageMeta)} />

        </div>
      </div>
    </section>
  )
}
