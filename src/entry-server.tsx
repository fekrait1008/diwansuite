import { renderToPipeableStream } from 'react-dom/server'
import { StrictMode } from 'react'
import { PassThrough } from 'node:stream'
import App from './App'
import { getInitialPageData } from './lib/server-page-data'

export { getSeoPayload } from './lib/seo'
export { preloadInternalPageLayout } from './App'
export { SUPPORTED_LANGS, STATIC_PAGES, buildLocalizedPath } from './lib/routing'
export { getInitialPageData } from './lib/server-page-data'
export { SITE_CONFIG } from './lib/site-config'

// PAGE_DATE_MODIFIED: used by prerender.mjs to set per-page lastmod in sitemaps.
// This avoids every URL showing today's date on every build.
import { PAGE_REGISTRY, PUBLIC_PAGES } from './lib/page-registry'
import { getSitemapChangefreq, getSitemapPriority } from './lib/seo-internal-linking'
export const PAGE_DATE_MODIFIED: Record<string, string> = Object.fromEntries(
  PUBLIC_PAGES.map((page) => [page, PAGE_REGISTRY[page].dateModified]),
)

export const PAGE_SITEMAP_META: Record<string, { changefreq: string; priority: string }> = Object.fromEntries(
  PUBLIC_PAGES.map((page) => [page, { changefreq: getSitemapChangefreq(page), priority: getSitemapPriority(page) }]),
)

function streamToString(stream: PassThrough) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', (chunk: Buffer | string) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    stream.on('error', reject)
  })
}

export async function render(url: string): Promise<string> {
  const initialData = getInitialPageData(url)

  return new Promise<string>((resolve, reject) => {
    let didError = false
    const stream = new PassThrough()
    const htmlPromise = streamToString(stream)

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <App initialData={initialData} />
      </StrictMode>,
      {
        onAllReady() {
          pipe(stream)
          htmlPromise.then(resolve).catch(reject)
        },
        onError(error) {
          didError = true
          console.error('SSR render error:', error)
        },
        onShellError(error) {
          reject(error)
        },
      },
    )

    setTimeout(() => {
      if (didError) abort()
    }, 10000)
  })
}
