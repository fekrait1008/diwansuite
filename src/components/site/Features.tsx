import { useState, useEffect, useRef, useCallback } from "react"
import { Users, Calendar, FileText, Target, QrCode, Vote, Cpu, ChartBar as BarChart3, ShieldCheck, Link2, CircleCheck as CheckCircle2, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { useLang } from "../../contexts/LanguageContext"
import { useReveal } from "../../hooks/use-reveal"

const FEATURE_ICONS = [Users, Calendar, FileText, Target, QrCode, Vote, Cpu, BarChart3, ShieldCheck, Link2]
const AUTO_SWITCH_MS = 6000

export function SiteFeatures() {
  const { t, font, isRTL } = useLang()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoPlayReady, setAutoPlayReady] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useReveal()

  const itemCount = t.features.items.length

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % itemCount)
    }, AUTO_SWITCH_MS)
  }, [itemCount])

  useEffect(() => {
    const node = ref.current
    if (!node || autoPlayReady) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAutoPlayReady(true)
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [autoPlayReady, ref])

  useEffect(() => {
    if (!autoPlayReady || paused) return
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [autoPlayReady, paused, startTimer])

  const handleSelect = (i: number) => {
    setActive(i)
    if (timerRef.current) clearInterval(timerRef.current)
    if (!paused) startTimer()
  }

  const handlePrev = () => {
    handleSelect((active - 1 + itemCount) % itemCount)
  }

  const handleNext = () => {
    handleSelect((active + 1) % itemCount)
  }

  return (
    <section
      ref={ref}
      id="features"
      className="section-reveal py-10 lg:py-14 bg-background"
      aria-labelledby="features-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto lg:mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-chart-1 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t.features.badge}
          </span>
          <h2
            id="features-heading"
            className="font-extrabold text-foreground mb-4"
            style={{ fontFamily: font, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.15" }}
          >
            {t.features.heading}
          </h2>
        </div>

        {/* Mobile: Horizontal scroll with arrows */}
        <div className="relative mb-10 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Previous feature"
            >
              {isRTL ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
            
            <div 
              ref={scrollRef}
              className="flex-1 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-2 px-1">
                {t.features.items.map((item, i) => {
                  const Icon = FEATURE_ICONS[i]
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                        active === i
                          ? 'bg-chart-1 text-primary-foreground border-chart-1'
                          : 'bg-card text-muted-foreground border-border'
                      }`}
                      style={{ fontFamily: font }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{item.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Next feature"
            >
              {isRTL ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {t.features.items.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`h-1.5 rounded-full transition-all ${
                  active === i ? 'w-6 bg-chart-1' : 'w-1.5 bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Feature ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Wrapped pills */}
        <div className="hidden lg:flex flex-wrap justify-center gap-2 mb-12">
          {t.features.items.map((item, i) => {
            const Icon = FEATURE_ICONS[i]
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  active === i
                    ? 'bg-chart-1 text-primary-foreground border-chart-1 shadow-md'
                    : 'bg-background text-muted-foreground border-border hover:border-chart-1/30 hover:text-foreground'
                }`}
                style={{ fontFamily: font }}
              >
                <Icon className="w-4 h-4" />
                {item.title}
              </button>
            )
          })}
        </div>

        {/* Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start max-w-5xl mx-auto">
          <div
            key={active}
            className="animate-fade-in p-6 lg:p-8 bg-card border border-border rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              {(() => {
                const Icon = FEATURE_ICONS[active]
                return (
                  <div className="w-10 h-10 rounded-xl bg-chart-1/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-chart-1" />
                  </div>
                )
              })()}
              <h3 className="font-bold text-foreground text-lg" style={{ fontFamily: font }}>
                {t.features.items[active].title}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm lg:text-base" style={{ fontFamily: font }}>
              {t.features.items[active].desc}
            </p>
            <ul className="space-y-2.5">
              {t.features.items[active].bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85" style={{ fontFamily: font }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div
            key={`impact-${active}`}
            className="animate-fade-in p-6 lg:p-8 bg-secondary/40 border border-border rounded-2xl flex flex-col items-center justify-center text-center min-h-[280px] lg:min-h-[320px]"
          >
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-600" />
            </div>
            <div className="text-2xl lg:text-4xl font-extrabold text-foreground mb-2 tracking-tight" style={{ fontFamily: font }}>
              {t.features.items[active].impact}
            </div>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: font }}>
              {t.features.items[active].title}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
