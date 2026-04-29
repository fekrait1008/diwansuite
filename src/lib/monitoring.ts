import { SITE_CONFIG } from '@/lib/site-config'
import type { InitialPageData } from '@/lib/app-state'

type MetricPayload = {
  name: string
  value: number
  rating?: string
  delta?: number
  id?: string
  attribution?: unknown
  lang: string
  page: string
  path: string
  userAgent: string
  timestamp: string
}

type ErrorPayload = {
  type: 'error' | 'unhandledrejection'
  message: string
  stack?: string | undefined
  path: string
  lang: string
  page: string
  timestamp: string
}

function postJson(endpoint: string, payload: unknown) {
  if (!endpoint) return

  const body = JSON.stringify(payload)

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon(endpoint, blob)
    return
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  })
}

function pushToDataLayer(event: string, payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
}

function reportMetric(metric: MetricPayload) {
  pushToDataLayer('web_vital', metric)

  if (typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.path,
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      page_language: metric.lang,
    })
  }

  postJson(SITE_CONFIG.analytics.webVitalsEndpoint, metric)
}

function reportClientIssue(payload: ErrorPayload) {
  pushToDataLayer(payload.type, payload)
  postJson(SITE_CONFIG.analytics.errorReportingEndpoint, payload)
}

function buildCommonPayload(initialData: InitialPageData) {
  return {
    lang: initialData.lang,
    page: initialData.page,
    path: initialData.pathname,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  }
}

export function initMonitoring(initialData: InitialPageData) {
  window.addEventListener('error', (event) => {
    reportClientIssue({
      type: 'error',
      message: event.message || 'Unknown client error',
      stack: event.error instanceof Error ? event.error.stack : undefined,
      ...buildCommonPayload(initialData),
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    reportClientIssue({
      type: 'unhandledrejection',
      message: event.reason instanceof Error ? event.reason.message : String(event.reason || 'Unhandled rejection'),
      stack: event.reason instanceof Error ? event.reason.stack : undefined,
      ...buildCommonPayload(initialData),
    })
  })

  const loadVitals = () => {
    void import('web-vitals/attribution').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const track = (metric: { name: string; value: number; delta: number; rating: string; id: string; attribution?: unknown }) => {
        reportMetric({
          ...metric,
          ...buildCommonPayload(initialData),
        })
      }

      onCLS(track)
      onFCP(track)
      onINP(track)
      onLCP(track)
      onTTFB(track)
    })
  }

  if ('requestIdleCallback' in window && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(loadVitals, { timeout: 2500 })
  } else {
    window.setTimeout(loadVitals, 1200)
  }
}
