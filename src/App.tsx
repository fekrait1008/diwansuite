import { lazy, Suspense } from 'react'
import { SiteHeader } from '@/components/site/Header'
import { SiteFooter } from '@/components/site/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { HomePage } from '@/pages/HomePage'
import type { InitialPageData } from '@/lib/app-state'

const InternalPageLayout = lazy(async () => import('@/components/shared/InternalPageLayout').then((module) => ({ default: module.InternalPageLayout })))
const BlogPage = lazy(async () => import('@/pages/BlogPage').then((module) => ({ default: module.BlogPage })))

export async function preloadInternalPageLayout() {
  await import('@/components/shared/InternalPageLayout')
}

function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:border focus:border-border focus:rounded-md"
    >
      {label}
    </a>
  )
}

function CurrentPage({ page }: { page: InitialPageData['page'] }) {
  if (page === 'home') return <HomePage />
  if (page === 'blog') return <Suspense fallback={null}><BlogPage /></Suspense>
  return (
    <Suspense fallback={null}>
      <InternalPageLayout page={page} />
    </Suspense>
  )
}

export function App({ initialData }: { initialData: InitialPageData }) {
  return (
    <LanguageProvider initialData={initialData}>
      <div className="bg-background text-foreground">
        <SkipLink label={initialData.t.skipLink} />
        <SiteHeader />
        <CurrentPage page={initialData.page} />
        <SiteFooter />
      </div>
    </LanguageProvider>
  )
}

export default App
