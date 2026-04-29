import { CircleCheck as CheckCircle2, ArrowRight } from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
import { useReveal } from "@/hooks/use-reveal"

export function SitePricing() {
  const { t, isRTL, font } = useLang()
  const ref = useReveal()
  
  // Handle pricing button click - scroll to booking CTA and store selected package
  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>, packageName: string) => {
    e.preventDefault()
    
    // Store selected package in sessionStorage for CTA form
    if (packageName) {
      sessionStorage.setItem('selectedPackage', packageName)
    }
    
    // Scroll to booking CTA
    const ctaElement = document.getElementById('booking-cta')
    if (ctaElement) {
      ctaElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // If CTA not found on current page, navigate to homepage with hash
      window.location.href = '#booking-cta'
    }
  }

  const p = t.pricing

  return (
    <section
      ref={ref}
      id="pricing"
      className="section-reveal py-10 lg:py-14 bg-background"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-8 max-w-3xl mx-auto">
          <span 
            className="inline-block text-xs font-bold uppercase tracking-widest text-chart-1 mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {p.badge}
          </span>
          <h2
            id="pricing-heading"
            className="font-extrabold text-foreground mb-4"
            style={{ fontFamily: font, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.15" }}
          >
            {p.heading}
          </h2>
          <p 
            className="text-base text-muted-foreground leading-relaxed" 
            style={{ fontFamily: font }}
          >
            {p.sub}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mb-6">
          {p.plans.map((plan, i) => (
            <article
              key={i}
              className={`flex flex-col rounded-2xl border transition-shadow ${
                plan.highlighted
                  ? "border-chart-1 shadow-xl bg-chart-1 text-primary-foreground relative"
                  : "border-border shadow-sm bg-card hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-3 py-1 text-[10px] font-bold rounded-full bg-background text-chart-1 border border-chart-1 shadow-sm whitespace-nowrap uppercase tracking-wide"
                    style={{ fontFamily: font }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-6 lg:p-7 flex-1 flex flex-col">
                <div className="mb-5">
                  <h3
                    className={`text-lg font-bold mb-1 ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}
                    style={{ fontFamily: font }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    style={{ fontFamily: font }}
                  >
                    {plan.sub}
                  </p>
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-2xl lg:text-3xl font-extrabold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}
                      style={{ fontFamily: font }}
                    >
                      {plan.monthlyPrice}
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-1 ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                    style={{ fontFamily: font }}
                  >
                    {plan.annualNote}
                  </p>
                </div>

                <ul className="space-y-2 mb-5 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-primary-foreground/80" : "text-emerald-600"}`}
                      />
                      <span
                        className={`text-sm ${plan.highlighted ? "text-primary-foreground/90" : "text-foreground"}`}
                        style={{ fontFamily: font }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className={`pt-4 border-t mb-5 ${plan.highlighted ? "border-primary-foreground/20" : "border-border"}`}>
                  <ul className="space-y-1">
                    {plan.limits.map((l, li) => (
                      <li
                        key={li}
                        className={`text-xs ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                        style={{ fontFamily: font }}
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#booking-cta"
                  onClick={(e) => handlePricingClick(e, plan.name)}
                  className={`flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    plan.highlighted
                      ? "bg-background text-chart-1 hover:bg-background/90"
                      : "bg-chart-1 text-primary-foreground hover:opacity-90"
                  }`}
                  style={{ fontFamily: font }}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p 
          className="text-center text-xs text-muted-foreground mb-8 max-w-2xl mx-auto" 
          style={{ fontFamily: font }}
        >
          {p.plansNote}
        </p>

        {/* Add-ons */}
        <div>
          <h3
            className="text-base lg:text-lg font-bold text-foreground mb-5 text-center"
            style={{ fontFamily: font }}
          >
            {p.addons.heading}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.addons.items.map((addon, i) => (
              <div key={i} className="enterprise-card p-5 bg-card border border-border rounded-xl">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="font-bold text-foreground text-sm" style={{ fontFamily: font }}>
                    {addon.name}
                  </h4>
                  <span
                    className="text-xs font-semibold text-chart-1 bg-chart-1/10 px-2 py-1 rounded-md whitespace-nowrap"
                    style={{ fontFamily: font }}
                  >
                    {addon.price}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {addon.desc.map((d, di) => (
                    <li key={di} className="flex items-start gap-2 text-xs text-muted-foreground" style={{ fontFamily: font }}>
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p 
            className="text-center text-xs text-muted-foreground mt-5" 
            style={{ fontFamily: font }}
          >
            {p.supportNote}
          </p>
        </div>
      </div>
    </section>
  )
}
