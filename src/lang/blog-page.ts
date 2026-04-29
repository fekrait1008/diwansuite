import type { InternalPageCopy } from './extra'

export interface BlogArticle {
  slug: string
  title: string
  description: string
  bullets: [string, string, string]
  intent: string
  category: string
  readTime: string
  /** Internal page slug from page-registry — null means no live page yet */
  internalSlug: string | null
}

export interface BlogPageContent {
  copy: InternalPageCopy & { faq: { q: string; a: string }[] }
  articles: BlogArticle[]
}

// Per-language data is split into separate files so Vite can tree-shake
// unused language content in client bundles. SSR prerender imports all four
// synchronously to generate every /ar/blog, /en/blog, /hi/blog, /ur/blog page.
import arContent from './blog-page-ar'
import enContent from './blog-page-en'
import hiContent from './blog-page-hi'
import urContent from './blog-page-ur'

export const blogPageContent: Record<'ar' | 'en' | 'hi' | 'ur', BlogPageContent> = {
  ar: arContent,
  en: enContent,
  hi: hiContent,
  ur: urContent,
}
