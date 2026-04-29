import type { InitialPageData } from '@/lib/app-state'

const TEMPLATE_ID = '__DIWAN_DATA__'

export function readInitialPageData(): InitialPageData {
  const template = document.getElementById(TEMPLATE_ID)
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Missing ${TEMPLATE_ID} template payload`)
  }

  const raw = template.innerHTML.trim()
  if (!raw) {
    throw new Error('Initial page payload is empty')
  }

  return JSON.parse(raw) as InitialPageData
}
