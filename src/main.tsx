import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'

import './index.css'
import App from './App'
import { readInitialPageData } from '@/lib/client-data'

const initialData = readInitialPageData()
window.__DIWAN_PAGE__ = initialData

const rootEl = document.getElementById('root')!

// In development Vite does not server-render the page, so there is no
// existing HTML to hydrate. Use createRoot for a fresh client render.
// In production the prerender step fills #root with SSR HTML, so we hydrate.
if (import.meta.env.DEV) {
  createRoot(rootEl).render(
    <StrictMode>
      <App initialData={initialData} />
    </StrictMode>
  )
} else {
  hydrateRoot(
    rootEl,
    <StrictMode>
      <App initialData={initialData} />
    </StrictMode>
  )
}

const bootMonitoring = () => {
  void import('@/lib/monitoring').then(({ initMonitoring }) => initMonitoring(initialData))
  void import('@/lib/scroll-depth').then(({ initScrollDepthTracking }) => {
    initScrollDepthTracking(initialData.lang, initialData.page)
  })
}

if ('requestIdleCallback' in window && typeof window.requestIdleCallback === 'function') {
  window.requestIdleCallback(bootMonitoring, { timeout: 2500 })
} else {
  window.setTimeout(bootMonitoring, 1200)
}
