import { resolveRoute, getLanguageOptions, type InitialPageData, type PublicPageMeta } from '@/lib/app-state'
import { extraCopy } from '@/lang/extra'
import { pageCopy } from '@/lang/page-copy'
import { siteContent } from '@/lang/content'
import { homeConversionContent } from '@/lang/home-conversion'
import { getHomeAeoContent } from '@/lang/home-aeo'
import { getHomeEnterpriseContent } from '@/lang/home-enterprise'
import { homePhase4Content } from '@/lang/home-phase4'
import { getHomeFaqGroups, getHomeQuickFaqItems } from '@/lib/home-faq'
import { RTL_LANGS } from '@/lang/types'
import { PUBLIC_PAGES } from '@/lib/page-registry'

function buildPageMeta(lang: keyof typeof pageCopy): PublicPageMeta {
  return Object.fromEntries(
    PUBLIC_PAGES.filter((page) => page !== 'home').map((page) => [page, {
      title: pageCopy[lang][page].title,
      summary: '',
    }])
  ) as PublicPageMeta
}

function buildSlimSiteContent(lang: keyof typeof siteContent) {
  const full = siteContent[lang]
  return {
    ...full,
    hero: {
      badge: '',
      h1: '',
      sub: '',
      answerParagraph: '',
      bullets: [],
      ctaPrimary: '',
      ctaSecondary: '',
      ctaMicrocopy: '',
      stats: [],
      trust: [],
    },
    problem: {
      badge: '',
      heading: '',
      intro: '',
      introSub: '',
      pains: [],
    },
    valueProposition: {
      badge: '',
      heading: '',
      answerParagraph: '',
      lifecycle: [],
      pillars: [],
    },
    features: {
      badge: '',
      heading: '',
      items: [],
    },
    aiSection: {
      badge: '',
      heading: '',
      answerParagraph: '',
      capabilities: [],
    },
    compliance: {
      badge: '',
      heading: '',
      answerParagraph: '',
      items: [],
    },
    reports: {
      badge: '',
      heading: '',
      answerParagraph: '',
      items: [],
    },
    useCases: {
      badge: '',
      heading: '',
      cases: [],
    },
    reviews: {
      badge: '',
      heading: '',
      items: [],
    },
    faq: {
      badge: '',
      heading: '',
      searchPlaceholder: '',
      showMore: '',
      noResults: '',
      ctaText: '',
      ctaButton: '',
      items: [],
    },
    pricing: {
      badge: '',
      heading: '',
      sub: '',
      plansNote: '',
      plans: [],
      addons: {
        heading: '',
        items: [],
      },
      supportNote: '',
      faq: {
        heading: '',
        items: [],
      },
    },
    cta: {
      heading: '',
      sub: '',
      ctaPrimary: '',
      ctaSecondary: '',
      trust: [],
    },
  }
}

function buildHomePayload(lang: keyof typeof pageCopy, includeFullHomePayload: boolean) {
  if (includeFullHomePayload) {
    return {
      homeConversion: homeConversionContent[lang],
      homeAeo: getHomeAeoContent(lang),
      homeEnterprise: getHomeEnterpriseContent(lang),
      homePhase4: homePhase4Content[lang],
      homeFaq: {
        quickItems: getHomeQuickFaqItems(lang),
        groups: getHomeFaqGroups(lang),
      },
    }
  }

  return {
    homeConversion: {} as InitialPageData['homeConversion'],
    homeAeo: {} as InitialPageData['homeAeo'],
    homeEnterprise: {} as InitialPageData['homeEnterprise'],
    homePhase4: {} as InitialPageData['homePhase4'],
    homeFaq: {
      quickItems: [],
      groups: [],
    },
  }
}

export function getInitialPageData(pathname: string): InitialPageData {
  const route = resolveRoute(pathname)
  const { lang, page } = route
  const resolvedPageCopy = page === 'home' ? null : pageCopy[lang][page]
  const includeFullHomePayload = page === 'home'
  const t = includeFullHomePayload ? siteContent[lang] : buildSlimSiteContent(lang)
  const pageMeta = buildPageMeta(lang)

  return {
    lang,
    page,
    pathname: route.pathname,
    t,
    extra: extraCopy[lang],
    pageCopy: resolvedPageCopy,
    pageMeta,
    ...buildHomePayload(lang, includeFullHomePayload),
    isRTL: RTL_LANGS.includes(lang),
    dir: t.dir,
    font: t.font,
    languageOptions: getLanguageOptions(),
  }
}
