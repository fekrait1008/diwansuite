import { useLang } from "@/contexts/LanguageContext"
import { useReveal } from "@/hooks/use-reveal"
import { FileSearch, Clock, UserCheck, Lock, Server, Database } from "lucide-react"

const icons = [FileSearch, Clock, UserCheck, Lock, Server, Database]

export function SiteCompliance() {
  const { t, font } = useLang()
  const ref = useReveal()

  return (
    <section
      ref={ref}
      id="compliance"
      className="section-reveal py-10 lg:py-14 bg-background"
      aria-labelledby="compliance-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest text-chart-1 mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.compliance.badge}
          </span>
          <h2
            id="compliance-heading"
            className="font-extrabold text-foreground mb-4"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.15,
              fontFamily: font,
            }}
          >
            {t.compliance.heading}
          </h2>
          <p
            className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: font }}
          >
            {t.compliance.answerParagraph}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {t.compliance.items.map((item, index) => {
            const Icon = icons[index]
            return (
              <article
                key={index}
                className="enterprise-card rounded-2xl p-5 lg:p-6 bg-card border border-border"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/10">
                  <Icon className="h-5 w-5 text-chart-1" />
                </div>
                <h3
                  className="text-base lg:text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: font }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: font }}
                >
                  {item.desc}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
