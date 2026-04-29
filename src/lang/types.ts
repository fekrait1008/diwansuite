export type LangCode = 'ar' | 'en' | 'hi' | 'ur'

export const LANGUAGES: Partial<Record<LangCode, { name: string; nativeName: string; flag: string; dir: 'rtl' | 'ltr'; font: string }>> = {
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', font: "'Cairo', 'Tajawal', sans-serif" },
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr', font: "'Inter', sans-serif" },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr', font: "'Noto Sans Devanagari', sans-serif" },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl', font: "'Noto Nastaliq Urdu', 'Cairo', sans-serif" }
}

export const RTL_LANGS: LangCode[] = ['ar', 'ur']

export interface SiteContent {
  dir: 'rtl' | 'ltr'
  font: string
  pageTitle: string
  metaDescription: string
  skipLink: string
  nav: {
    home: string
    solutions: string
    solutionsItems: Array<{ label: string; desc: string; href: string }>
    industries: string
    industriesItems: Array<{ label: string; href: string }>
    ai: string
    faq: string
    pricing: string
    pricingShortcut: string
    contact: string
    requestDemo: string
  }
  hero: {
    badge: string
    h1: string
    sub: string
    answerParagraph: string
    bullets: string[]
    ctaPrimary: string
    ctaSecondary: string
    ctaMicrocopy: string
    stats: Array<{ num: string; label: string }>
    trust: string[]
  }
  problem: {
    badge: string
    heading: string
    intro: string
    introSub: string
    pains: Array<{ title: string; desc: string }>
  }
  valueProposition: {
    badge: string
    heading: string
    answerParagraph: string
    lifecycle: string[]
    pillars: Array<{ title: string; desc: string }>
  }
  features: {
    badge: string
    heading: string
    items: Array<{ title: string; desc: string; bullets: string[]; impact: string }>
  }
  aiSection: {
    badge: string
    heading: string
    answerParagraph: string
    supportingLine?: string
    capabilities: Array<{ title: string; desc: string }>
    integrations?: string[]
    ctaPrimary?: string
    ctaSecondary?: string
  }
  compliance: {
    badge: string
    heading: string
    answerParagraph: string
    items: Array<{ title: string; desc: string }>
  }
  reports: {
    badge: string
    heading: string
    answerParagraph: string
    items: Array<{ title: string; desc: string }>
  }
  useCases: {
    badge: string
    heading: string
    cases: Array<{ sector: string; desc: string; results: string[] }>
  }
  reviews: {
    badge: string
    heading: string
    items: Array<{ name: string; role: string; org: string; text: string; rating: number }>
  }
  faq: {
    badge: string
    heading: string
    searchPlaceholder: string
    showMore: string
    noResults: string
    ctaText: string
    ctaButton: string
    items: Array<{ q: string; a: string }>
  }
  pricing: {
    badge: string
    heading: string
    sub: string
    plansNote: string
    plans: Array<{
      name: string
      sub: string
      badge?: string
      monthlyPrice: string
      annualNote: string
      features: string[]
      limits: string[]
      cta: string
      highlighted?: boolean
    }>
    addons: {
      heading: string
      items: Array<{ name: string; desc: string[]; price: string }>
    }
    supportNote: string
    faq: {
      heading: string
      items: Array<{ q: string; a: string }>
    }
  }
  cta: {
    heading: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    trust: string[]
  }
  footer: {
    desc: string
    productTitle: string
    productLinks: Array<{ label: string; href: string }>
    companyTitle: string
    companyLinks: Array<{ label: string; href: string }>
    legalTitle: string
    legalLinks: Array<{ label: string; href: string }>
    copyright: string
  }
  enterpriseForm?: {
    steps: { contact: string; organization: string; requirements: string; preferences: string }
    step1: { title: string }
    step2: { title: string }
    step3: { title: string }
    step4: { title: string }
    fields: Record<string, string>
    placeholders: Record<string, string>
    sectors: Record<string, string>
    timeline: Record<string, string>
    deployment: Record<string, string>
    demo: Record<string, string>
    buttons: { next: string; back: string; submit: string; submitting: string }
    validation: { required: string; invalidEmail: string; invalidPhone: string }
    success: { title: string; message: string; close: string }
    otp: { title: string; message: string; verify: string; verifying: string; resend: string; resendIn: string }
    selectPlaceholder: string
    heroCta: { title: string; subtitle: string; button: string; buttonExpanded: string }
  }
}
