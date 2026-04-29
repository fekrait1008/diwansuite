import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'

import './index.css'
import App from './App'
import { readInitialPageData } from '@/lib/client-data'

// Wrap initialization in try-catch to prevent Firefox NS_ERROR_FAILURE blank pages
let initialData: ReturnType<typeof readInitialPageData>

try {
  initialData = readInitialPageData()
  window.__DIWAN_PAGE__ = initialData
} catch (error) {
  // If data loading fails, show error UI instead of blank page
  console.error('[v0] Critical: Failed to initialize app data:', error)
  const rootEl = document.getElementById('root')
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui;text-align:center;padding:2rem;">
        <h1 style="font-size:1.5rem;margin-bottom:1rem;">Unable to load page</h1>
        <p style="color:#666;margin-bottom:1rem;">Please refresh the page or try again later.</p>
        <button onclick="location.reload()" style="padding:0.5rem 1rem;background:#1d4ed8;color:white;border:none;border-radius:0.25rem;cursor:pointer;">
          Refresh Page
        </button>
      </div>
    `
  }
  throw error
}

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
  // Firefox hydration safety: wrap in try-catch and fall back to createRoot if hydration fails
  try {
    hydrateRoot(
      rootEl,
      <StrictMode>
        <App initialData={initialData} />
      </StrictMode>
    )
  } catch (hydrationError) {
    console.error('[v0] Hydration failed, falling back to client render:', hydrationError)
    rootEl.innerHTML = ''
    createRoot(rootEl).render(
      <StrictMode>
        <App initialData={initialData} />
      </StrictMode>
    )
  }
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
