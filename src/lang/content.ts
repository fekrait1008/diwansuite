export type { LangCode, SiteContent } from './types'
export { LANGUAGES, RTL_LANGS } from './types'

import type { LangCode, SiteContent } from './types'
import { ar } from './ar'
import { en } from './en'
import { hi } from './hi'
import { ur } from './ur'
import { homePhase4Content } from './home-phase4'

const baseContent = { ar, en, hi, ur } as const satisfies Partial<Record<LangCode, SiteContent>>

export const siteContent: Record<LangCode, SiteContent> = Object.fromEntries(
  (Object.entries(baseContent) as Array<[LangCode, SiteContent]>).map(([lang, content]) => {
    const patch = homePhase4Content[lang]
    return [
      lang,
      {
        ...content,
        hero: { ...content.hero, ...patch.hero },
        valueProposition: { ...content.valueProposition, ...patch.valueProposition },
        aiSection: { ...content.aiSection, ...patch.aiSection },
        compliance: { ...content.compliance, ...patch.compliance },
        reports: { ...content.reports, ...patch.reports },
        faq: { ...content.faq, badge: patch.faq.badge, heading: patch.faq.heading },
      },
    ]
  }),
) as Record<LangCode, SiteContent>
