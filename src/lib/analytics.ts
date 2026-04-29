/**
 * Centralized GA4 + dataLayer event tracking.
 *
 * Design principles:
 * - Side effects only; tracking must never break the UI.
 * - No-op when gtag or dataLayer are unavailable.
 * - GA4-style event names.
 * - No PII in event payloads.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function push(event: string, params: Record<string, unknown>) {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })

    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params)
    }
  } catch {
    // Analytics failures must never affect the interface.
  }
}

export function trackCtaClick(opts: {
  location: string
  label: string
  lang: string
}) {
  push('cta_click', {
    cta_location: opts.location,
    cta_label: opts.label,
    page_language: opts.lang,
  })
}

export function trackDemoRequest(opts: {
  goal: string
  step: number
  lang: string
  selectedPackage?: string
}) {
  push('demo_request', {
    form_goal: opts.goal,
    form_step: opts.step,
    page_language: opts.lang,
    selected_package: opts.selectedPackage || '',
  })
}

export function trackFormAbandonment(opts: {
  step: number
  lang: string
}) {
  push('form_abandonment', {
    form_step: opts.step,
    page_language: opts.lang,
  })
}

export function trackWhatsAppClick(opts: { location: string; lang: string }) {
  push('whatsapp_click', {
    click_location: opts.location,
    page_language: opts.lang,
  })
}

export function trackPhoneClick(opts: { location: string; lang: string }) {
  push('phone_click', {
    click_location: opts.location,
    page_language: opts.lang,
  })
}

export function trackBrochureDownload(opts: { lang: string }) {
  push('brochure_download', { page_language: opts.lang })
}

export function trackLanguageSwitch(opts: { from: string; to: string }) {
  push('language_switch', { lang_from: opts.from, lang_to: opts.to })
}

export function trackScrollDepth(opts: {
  depth: 25 | 50 | 75 | 100
  lang: string
  page: string
}) {
  push('scroll_depth', {
    scroll_percentage: opts.depth,
    page_language: opts.lang,
    page_name: opts.page,
  })
}
