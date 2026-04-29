import { createContext, useContext, useMemo, useCallback, useEffect, type ReactNode } from 'react'
import { buildLocalizedPath, type StaticPage } from '@/lib/routing'
import type { InitialPageData } from '@/lib/app-state'
import type { LangCode } from '@/lang/types'

interface LanguageContextValue extends InitialPageData {
  setLang: (lang: LangCode) => void
  hrefForLanguage: (lang: LangCode, page?: StaticPage, hash?: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'diwan-lang'

export function LanguageProvider({ children, initialData }: { children: ReactNode; initialData: InitialPageData }) {
  const resolveFallbackPage = useCallback((page?: StaticPage) => {
    if (page) return page
    return initialData.pathname.includes('/sectors') ? 'sectorsIndex' : 'home'
  }, [initialData.pathname])

  const hrefForLanguage = useCallback(
    (nextLang: LangCode, page?: StaticPage, hash = '') => buildLocalizedPath(nextLang, resolveFallbackPage(page ?? initialData.page), hash),
    [initialData.page, resolveFallbackPage]
  )

  const setLang = useCallback(
    (nextLang: LangCode) => {
      const hash = window.location.hash || ''
      window.location.assign(hrefForLanguage(nextLang, initialData.page, hash))
    },
    [hrefForLanguage, initialData.page]
  )

  useEffect(() => {
    document.documentElement.lang = initialData.lang
    document.documentElement.dir = initialData.dir
    localStorage.setItem(STORAGE_KEY, initialData.lang)
  }, [initialData.dir, initialData.lang])

  const value = useMemo(
    () => ({
      ...initialData,
      setLang,
      hrefForLanguage,
    }),
    [hrefForLanguage, initialData, setLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
