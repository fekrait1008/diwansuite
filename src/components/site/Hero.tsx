import { SITE_CONFIG } from '@/lib/site-config'
import { useLang } from '@/contexts/LanguageContext'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { trackCtaClick, trackWhatsAppClick, trackPhoneClick } from '@/lib/analytics'

const heroVisualAlt: Record<string, string> = {
  ar: 'واجهة ديوان سويت لإدارة اجتماعات المجالس واللجان والمحاضر والقرارات',
  en: 'DiwanSuite board and committee meeting governance visual interface',
  hi: 'DiwanSuite बोर्ड और समिति बैठक शासन इंटरफ़ेस',
  ur: 'DiwanSuite بورڈ اور کمیٹی اجلاس گورننس انٹرفیس',
}

const logoAlt: Record<string, string> = {
  ar: 'شعار ديوان سويت الكامل',
  en: 'DiwanSuite full logo',
  hi: 'DiwanSuite पूर्ण लोगो',
  ur: 'DiwanSuite مکمل لوگو',
}

export function SiteHero() {
  const { t, homeConversion: conversion, isRTL, font, lang } = useLang()

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary via-background to-background"
      style={{
        paddingTop: 'clamp(28px, 5vw, 84px)',
        paddingBottom: 'clamp(34px, 5vw, 76px)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-chart-1/[0.06] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className={`max-w-2xl ${isRTL ? 'lg:order-2 lg:justify-self-end lg:text-right' : 'lg:text-left'}`}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-chart-1/25 bg-chart-1/10 px-4 py-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-chart-1" />
              <span className="text-sm font-bold text-chart-1" style={{ fontFamily: font }}>
                {t.hero.badge}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mb-4 font-extrabold tracking-tight text-foreground"
              style={{
                fontFamily: font,
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.015em',
              }}
            >
              {t.hero.h1}
            </h1>

            <p
              className="mb-6 max-w-2xl text-base leading-8 text-muted-foreground lg:text-lg"
              style={{ fontFamily: font }}
            >
              {t.hero.sub}
            </p>

            <div className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-center ${isRTL ? 'lg:justify-end' : ''}`}>
              <a
                href="#booking-cta"
                className="cta-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-chart-1 px-7 py-3 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-chart-1/90"
                style={{ fontFamily: font }}
                onClick={() => {
                  trackCtaClick({ location: 'hero', label: conversion.heroCtas.primary, lang })
                  try { sessionStorage.setItem('diwanCtaLabel', conversion.heroCtas.primary) } catch { /* ignore */ }
                }}
              >
                {conversion.heroCtas.primary}
                <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl || SITE_CONFIG.phoneHref || '#booking-cta'}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-border bg-background px-6 py-3 text-base font-bold text-foreground transition-colors hover:bg-secondary"
                style={{ fontFamily: font }}
                onClick={() => {
                  if (SITE_CONFIG.whatsappUrl) {
                    trackWhatsAppClick({ location: 'hero', lang })
                  } else if (SITE_CONFIG.phoneHref) {
                    trackPhoneClick({ location: 'hero', lang })
                  } else {
                    trackCtaClick({ location: 'hero_secondary', label: conversion.heroCtas.secondary, lang })
                  }
                }}
              >
                {conversion.heroCtas.secondary}
              </a>
            </div>

            <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 ${isRTL ? 'lg:justify-end' : ''}`}>
              {t.hero.trust.slice(0, 6).map((trustItem, index) => (
                <div key={index} className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-chart-1" />
                  <span style={{ fontFamily: font }}>{trustItem}</span>
                </div>
              ))}
            </div>
          </div>

          <figure className={`${isRTL ? 'lg:order-1' : ''}`} aria-label={heroVisualAlt[lang] ?? heroVisualAlt.ar}>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-3 shadow-2xl sm:p-4 lg:p-5">
              <div className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-gradient-to-r from-chart-1 via-chart-2 to-chart-1" />
              <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/60 px-4 py-3">
                <img
                  src="/assets/images/logo_full.svg"
                  alt={logoAlt[lang] ?? logoAlt.ar}
                  className="h-8 w-auto max-w-[220px] object-contain"
                  width={220}
                  height={52}
                  loading="eager"
                  decoding="async"
                />
                <span className="rounded-full bg-chart-1/10 px-3 py-1 text-xs font-bold text-chart-1" style={{ fontFamily: font }}>
                  {t.hero.badge}
                </span>
              </div>
              <img
                src="/assets/images/design_1.svg"
                alt={heroVisualAlt[lang] ?? heroVisualAlt.ar}
                className="w-full rounded-3xl border border-border bg-background object-contain"
                width={1375}
                height={924}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <figcaption className="sr-only">{heroVisualAlt[lang] ?? heroVisualAlt.ar}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
