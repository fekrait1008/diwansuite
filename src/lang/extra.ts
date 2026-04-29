import type { LangCode } from './types'

export interface PageTable {
  caption?: string
  columns: [string, string, string]
  rows: Array<[string, string, string]>
}

export interface PageSection {
  id: string
  title: string
  body: string[]
  bullets?: string[]
  table?: PageTable
}

export interface InternalPageFaqItem {
  q: string
  a: string
}

export interface InternalPageCopy {
  eyebrow: string
  title: string
  summary: string
  seoTitle: string
  seoDescription: string
  executiveSummary?: string
  definition?: string
  whoFor?: string[]
  whatItSolves?: string[]
  howItWorks?: string[]
  integrations?: string[]
  faq?: InternalPageFaqItem[]
  pageFaqTitle?: string
  ctaTitle?: string
  ctaBody?: string
  ctaPrimaryLabel?: string
  ctaSecondaryLabel?: string
  relatedPages?: string[]
  hideSiblingLinks?: boolean
  hideExploreLinks?: boolean
  sections: PageSection[]
}

export interface ExtraCopy {
  brandTagline: string
  languageLabel: string
  openMenu: string
  closeMenu: string
  breadcrumbsHome: string
  tocLabel: string
  backHome: string
  homeCta: string
  requestDemo: string
  contactLabel: string
  lastUpdated: string
  internalIntroLabel: string
  pages: {
    about: { eyebrow: string }
    privacy: { eyebrow: string }
    terms: { eyebrow: string }
  }
}

export const extraCopy: Record<LangCode, ExtraCopy> = {
  "ar": {
    "brandTagline": "حوكمة مجالس الإدارة",
    "languageLabel": "اللغة",
    "openMenu": "فتح القائمة",
    "closeMenu": "إغلاق القائمة",
    "breadcrumbsHome": "الرئيسية",
    "tocLabel": "في هذه الصفحة",
    "backHome": "العودة للرئيسية",
    "homeCta": "استكشف الصفحة الرئيسية",
    "requestDemo": "احجز عرضًا توضيحيًا",
    "contactLabel": "تواصل معنا",
    "lastUpdated": "آخر تحديث: 14 أبريل 2026",
    "internalIntroLabel": "صفحة داخلية",
    "pages": {
      "about": {
        "eyebrow": "من نحن"
      },
      "privacy": {
        "eyebrow": "سياسة الخصوصية"
      },
      "terms": {
        "eyebrow": "الشروط والأحكام"
      }
    }
  },
  "en": {
    "brandTagline": "Board Governance",
    "languageLabel": "Language",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "breadcrumbsHome": "Home",
    "tocLabel": "On this page",
    "backHome": "Back to home",
    "homeCta": "Explore the homepage",
    "requestDemo": "Book a Demo",
    "contactLabel": "Contact us",
    "lastUpdated": "Last updated: April 14, 2026",
    "internalIntroLabel": "Internal page",
    "pages": {
      "about": {
        "eyebrow": "About Us"
      },
      "privacy": {
        "eyebrow": "Privacy Policy"
      },
      "terms": {
        "eyebrow": "Terms & Conditions"
      }
    }
  },



  "hi": {
    "brandTagline": "बोर्ड गवर्नेंस",
    "languageLabel": "भाषा",
    "openMenu": "मेनू खोलें",
    "closeMenu": "मेनू बंद करें",
    "breadcrumbsHome": "मुख्य पृष्ठ",
    "tocLabel": "इस पृष्ठ पर",
    "backHome": "मुख्य पृष्ठ पर लौटें",
    "homeCta": "होमपेज देखें",
    "requestDemo": "डेमो बुक करें",
    "contactLabel": "हमसे संपर्क करें",
    "lastUpdated": "अंतिम अपडेट: 14 अप्रैल 2026",
    "internalIntroLabel": "आंतरिक पृष्ठ",
    "pages": {
      "about": {
        "eyebrow": "हमारे बारे में"
      },
      "privacy": {
        "eyebrow": "गोपनीयता नीति"
      },
      "terms": {
        "eyebrow": "नियम और शर्तें"
      }
    }
  },
  "ur": {
    "brandTagline": "بورڈ گورننس",
    "languageLabel": "زبان",
    "openMenu": "مینو کھولیں",
    "closeMenu": "مینو بند کریں",
    "breadcrumbsHome": "ہوم",
    "tocLabel": "اس صفحے پر",
    "backHome": "ہوم پر واپس جائیں",
    "homeCta": "ہوم پیج دیکھیں",
    "requestDemo": "ڈیمو بک کریں",
    "contactLabel": "ہم سے رابطہ کریں",
    "lastUpdated": "آخری تازہ کاری: 14 اپریل 2026",
    "internalIntroLabel": "اندرونی صفحہ",
    "pages": {
      "about": {
        "eyebrow": "ہمارے بارے میں"
      },
      "privacy": {
        "eyebrow": "پرائیویسی پالیسی"
      },
      "terms": {
        "eyebrow": "شرائط و ضوابط"
      }
    }
  }}
