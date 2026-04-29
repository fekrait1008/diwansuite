import type { LangCode } from '@/lang/types'
import { getPageBySlug, getPageSlug, HOME_PAGE, isPublicPage, PUBLIC_PAGES, type PublicPage } from '@/lib/page-registry'

export const DEFAULT_LANG: LangCode = 'ar'
export const SUPPORTED_LANGS: LangCode[] = ['ar', 'en', 'hi', 'ur']
export const STATIC_PAGES = PUBLIC_PAGES
export type StaticPage = PublicPage
export const LEGACY_LANG_SEGMENT = 'lang'

export function isLangCode(value?: string | null): value is LangCode {
  return !!value && SUPPORTED_LANGS.includes(value as LangCode)
}

export function isStaticPage(value?: string | null): value is StaticPage {
  return isPublicPage(value)
}

function getRouteSegments(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === LEGACY_LANG_SEGMENT) {
    return { prefix: LEGACY_LANG_SEGMENT, lang: segments[1], pageSlug: segments.slice(2).join('/') }
  }
  return { prefix: null, lang: segments[0], pageSlug: segments.slice(1).join('/') }
}

export function buildLocalizedPath(lang: LangCode, page: StaticPage = HOME_PAGE, hash = ''): string {
  const slug = getPageSlug(page)
  const base = slug ? `/${lang}/${slug}` : `/${lang}`
  return hash ? `${base}${hash.startsWith('#') ? hash : `#${hash}`}` : base
}

export function getPageFromPath(pathname: string): StaticPage {
  const { pageSlug } = getRouteSegments(pathname)
  return getPageBySlug(pageSlug) ?? HOME_PAGE
}

export function getLangFromPath(pathname: string): LangCode {
  const { lang } = getRouteSegments(pathname)
  return isLangCode(lang) ? lang : DEFAULT_LANG
}

export function replacePathLanguage(pathname: string, targetLang: LangCode): string {
  const [pathOnly] = pathname.split(/[?#]/, 1)
  const segments = pathOnly.split('/').filter(Boolean)

  if (segments.length === 0) return `/${targetLang}`

  if (segments[0] === LEGACY_LANG_SEGMENT) {
    if (isLangCode(segments[1])) segments[1] = targetLang
    else segments.splice(1, 0, targetLang)
    segments.shift()
  } else if (isLangCode(segments[0])) {
    segments[0] = targetLang
  } else {
    segments.unshift(targetLang)
  }

  return `/${segments.join('/')}`
}

function normalizeLegacyHref(rawHref: string): string {
  const normalized = rawHref.replace(/^\/+|\/+$/g, '')
  const parts = normalized.split('/')

  if (parts[0] !== LEGACY_LANG_SEGMENT || !isLangCode(parts[1])) {
    return rawHref
  }

  const legacyLang = parts[1]
  const legacySlug = parts.slice(2).join('/')
  const legacyPage = getPageBySlug(legacySlug)
  return buildLocalizedPath(legacyLang, legacyPage ?? HOME_PAGE)
}

export function resolveLocalizedHref(rawHref: string, lang: LangCode, pathname: string): string {
  if (!rawHref) return buildLocalizedPath(lang)
  if (rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('http')) return rawHref
  if (rawHref.startsWith(`/${LEGACY_LANG_SEGMENT}/`)) return normalizeLegacyHref(rawHref)
  if (rawHref.startsWith('#')) {
    return getPageFromPath(pathname) === HOME_PAGE ? rawHref : buildLocalizedPath(lang, HOME_PAGE, rawHref)
  }
  if (rawHref === '/' || rawHref === '/home/' || rawHref === '/home') return buildLocalizedPath(lang)
  const normalized = rawHref.replace(/^\/+|\/+$/g, '')
  const page = getPageBySlug(normalized)
  if (page) return buildLocalizedPath(lang, page)
  return rawHref
}
