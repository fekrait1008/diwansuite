import { Mic, UserCheck, FileText, ClipboardList, Bell, Archive, ArrowRight } from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
import { useReveal } from "@/hooks/use-reveal"
import { buildLocalizedPath } from "@/lib/routing"

const CAPABILITY_ICONS = [Mic, UserCheck, FileText, ClipboardList, Bell, Archive]

// Real platform logos - stored as local SVG assets
const PLATFORM_LOGOS: Record<string, { name: string; logo: string; alt: string }> = {
  'Google Meet': { name: 'Google Meet', logo: '/logos/google-meet.svg', alt: 'Google Meet logo' },
  'Zoom': { name: 'Zoom', logo: '/logos/zoom.svg', alt: 'Zoom logo' },
  'Webex': { name: 'Webex', logo: '/logos/webex.svg', alt: 'Cisco Webex logo' },
  'Microsoft Teams': { name: 'Teams', logo: '/logos/teams.svg', alt: 'Microsoft Teams logo' },
}

export function SiteAISection() {
  const { t, lang, font, isRTL } = useLang()
  const ref = useReveal()

  const integrations = t.aiSection.integrations || ['Google Meet', 'Zoom', 'Webex', 'Microsoft Teams']
  const aiPageHref = buildLocalizedPath(lang, 'aiGovernanceDecisionSupport')

  return (
    <section
      ref={ref}
      id="ai"
      className="section-reveal py-10 lg:py-14 bg-foreground text-background"
      aria-labelledby="ai-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-8 max-w-3xl mx-auto">
          <span 
            className="inline-block text-xs font-bold uppercase tracking-widest text-chart-1 mb-3 px-3 py-1 rounded-full bg-chart-1/10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.aiSection.badge}
          </span>
          <h2
            id="ai-heading"
            className="font-extrabold mb-4"
            style={{ fontFamily: font, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.15" }}
          >
            {t.aiSection.heading}
          </h2>
          <p 
            className="text-base lg:text-lg text-background/80 leading-relaxed mb-4" 
            style={{ fontFamily: font }}
          >
            {t.aiSection.answerParagraph}
          </p>
          {t.aiSection.supportingLine && (
            <p 
              className="text-sm lg:text-base text-background/60 leading-relaxed" 
              style={{ fontFamily: font }}
            >
              {t.aiSection.supportingLine}
            </p>
          )}
        </div>

        {/* Platform Integrations Strip - Premium Enterprise Style */}
        <div className="rounded-2xl border border-background/10 bg-background/5 p-6 lg:p-8 mb-10 lg:mb-8 max-w-4xl mx-auto">
          <h3 className="text-center text-sm font-bold uppercase tracking-wider text-background/60 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            {isRTL ? 'يتكامل مع منصات الاجتماعات الرائدة' : 'Integrates with Leading Meeting Platforms'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {integrations.map((platform) => {
              const config = PLATFORM_LOGOS[platform]
              return (
                <div
                  key={platform}
                  className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-background/5 border border-background/10 hover:border-background/20 hover:bg-background/8 transition-all"
                >
                  <img 
                    src={config?.logo || '/logos/zoom.svg'}
                    alt={config?.alt || `${platform} logo`}
                    className="h-12 w-12 rounded-lg"
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                  <span 
                    className="text-sm font-semibold text-background/90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {config?.name || platform}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Capability Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 max-w-6xl mx-auto mb-10">
          {t.aiSection.capabilities.map((capability, i) => {
            const Icon = CAPABILITY_ICONS[i] || FileText
            return (
              <article
                key={i}
                className="rounded-2xl p-5 lg:p-6 border border-background/10 bg-background/5 transition-colors hover:bg-background/8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/20">
                    <Icon className="h-5 w-5 text-chart-1" />
                  </div>
                  <span 
                    className="text-xs font-bold text-background/40" 
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 
                  className="font-bold mb-2 text-base" 
                  style={{ fontFamily: font }}
                >
                  {capability.title}
                </h3>
                <p 
                  className="text-sm text-background/60 leading-relaxed" 
                  style={{ fontFamily: font }}
                >
                  {capability.desc}
                </p>
              </article>
            )
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href={aiPageHref}
            className="cta-btn inline-flex items-center gap-2 rounded-xl bg-chart-1 px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            style={{ fontFamily: font }}
          >
            {t.aiSection.ctaPrimary || (isRTL ? 'استكشف وكيل الذكاء الاصطناعي' : 'Explore AI Agent')}
            <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </a>
        </div>
      </div>
    </section>
  )
}
