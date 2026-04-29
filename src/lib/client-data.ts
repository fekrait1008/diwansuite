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
    // Log error for debugging but don't crash - provide minimal fallback
    console.error('[v0] Failed to read initial page data:', error)
    
    // Attempt to extract data from URL as emergency fallback
    const path = window.location.pathname
    const langMatch = path.match(/^\/(ar|en|hi|ur)/)
    const lang = langMatch ? langMatch[1] as 'ar' | 'en' | 'hi' | 'ur' : 'ar'
    
    // Re-throw to trigger error boundary - the app needs proper data
    throw error
  }
}
