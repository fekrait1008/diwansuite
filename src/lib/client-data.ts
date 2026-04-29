import type { InitialPageData } from '@/lib/app-state'

const TEMPLATE_ID = '__DIWAN_DATA__'

export function readInitialPageData(): InitialPageData {
  try {
    const template = document.getElementById(TEMPLATE_ID)
    if (!template) {
      throw new Error(`Missing ${TEMPLATE_ID} template element`)
    }

    // Firefox workaround: use textContent as fallback if innerHTML fails
    let raw: string
    if (template instanceof HTMLTemplateElement) {
      raw = template.innerHTML.trim()
    } else {
      // Fallback for non-template elements or Firefox edge cases
      raw = (template.textContent || template.innerHTML || '').trim()
    }

    if (!raw) {
      throw new Error('Initial page payload is empty')
    }

    return JSON.parse(raw) as InitialPageData
  } catch (error) {
    // Log error for debugging - re-throw to trigger error boundary
    console.error('[v0] Failed to read initial page data:', error)
    throw error
  }
}
