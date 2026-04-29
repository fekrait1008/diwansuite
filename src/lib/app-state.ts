import { DEFAULT_LANG, STATIC_PAGES, getLangFromPath, getPageFromPath, type StaticPage } from '@/lib/routing'
import { LANGUAGES, type LangCode, type SiteContent } from '@/lang/types'
import type { ExtraCopy, InternalPageCopy } from '@/lang/extra'
import type { HomeConversionContent } from '@/lang/home-conversion'
import type { HomeAeoContent } from '@/lang/home-aeo'
import type { HomeEnterpriseContent } from '@/lang/home-enterprise'
import type { HomePhase4Lang } from '@/lang/home-phase4'
import type { HomeFaqGroup, HomeFaqItem } from '@/lib/home-faq'

export type PublicPageMeta = Record<Exclude<StaticPage, 'home'>, {
  title: string
  summary: string
}>

export interface InitialPageData {
  lang: LangCode
  page: StaticPage
  pathname: string
  t: SiteContent
  extra: ExtraCopy
  pageCopy: InternalPageCopy | null
  pageMeta: PublicPageMeta
  homeConversion: HomeConversionContent
  homeAeo: HomeAeoContent
  homeEnterprise: HomeEnterpriseContent
  homePhase4: HomePhase4Lang
  homeFaq: {
    quickItems: HomeFaqItem[]
    groups: HomeFaqGroup[]
  }
  isRTL: boolean
  dir: 'rtl' | 'ltr'
  font: string
  languageOptions: Array<{
    code: LangCode
    name: string
    nativeName: string
    flag: string
    dir: 'rtl' | 'ltr'
    font: string
  }>
}

export function sanitizePathname(pathname: string): string {
  const [pathOnly] = (pathname || '').split(/[?#]/, 1)
  if (!pathOnly || pathOnly === '/') return `/${DEFAULT_LANG}`
  const normalized = pathOnly.replace(/\/+$/, '')
  return normalized || `/${DEFAULT_LANG}`
}

export function resolveRoute(pathname: string): { lang: LangCode; page: StaticPage; pathname: string } {
  const cleanPathname = sanitizePathname(pathname)
  return {
    lang: getLangFromPath(cleanPathname),
    page: getPageFromPath(cleanPathname),
    pathname: cleanPathname,
  }
}

export function getLanguageOptions() {
  return Object.entries(LANGUAGES).map(([code, meta]) => ({ code: code as LangCode, ...meta }))
}

export function isSupportedPage(value: string): value is StaticPage {
  return STATIC_PAGES.includes(value as StaticPage)
}
