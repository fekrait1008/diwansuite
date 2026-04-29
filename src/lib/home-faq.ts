import { homePhase4Content, type HomeFaqGroupKey } from '@/lang/home-phase4'
import { getHomeAeoContent } from '@/lang/home-aeo'
import { siteContent } from '@/lang/content'
import type { LangCode } from '@/lang/types'

export interface HomeFaqItem {
  q: string
  a: string
  group: string
}

export interface HomeFaqGroup {
  key: string
  title: string
  items: HomeFaqItem[]
}

const GROUP_ORDER: string[] = [
  'quickAnswers',
  'productOverview',
  'governanceWorkflow',
  'boardsCommittees',
  'generalAssemblies',
  'minutesEsignature',
  'decisionsExecution',
  'attendanceQuorum',
  'ai',
  'securityCompliance',
  'integrations',
  'supportImplementation',
]


export function getHomeQuickFaqItems(lang: LangCode): HomeFaqItem[] {
  return getHomeAeoContent(lang).faq.items.map((item) => ({ ...item, group: 'quickAnswers' }))
}

const BASE_GROUP_MAP: HomeFaqGroupKey[] = [
  'productOverview',
  'productOverview',
  'productOverview',
  'governanceWorkflow',
  'boardsCommittees',
  'decisionsExecution',
  'ai',
  'securityCompliance',
  'securityCompliance',
  'securityCompliance',
  'minutesEsignature',
  'attendanceQuorum',
  'boardsCommittees',
  'decisionsExecution',
  'securityCompliance',
  'supportImplementation',
  'supportImplementation',
  'ai',
  'integrations',
  'supportImplementation',
  'supportImplementation',
  'securityCompliance',
  'supportImplementation',
  'supportImplementation',
  'boardsCommittees',
  'productOverview',
  'supportImplementation',
  'ai',
  'minutesEsignature',
  'securityCompliance',
  'integrations',
  'supportImplementation',
  'productOverview',
]

export function getHomeFaqItems(lang: LangCode): HomeFaqItem[] {
  const baseItems = [...siteContent[lang].faq.items, ...siteContent[lang].pricing.faq.items].map((item, index) => ({
    ...item,
    group: BASE_GROUP_MAP[index] ?? 'productOverview',
  }))

  return [...getHomeQuickFaqItems(lang), ...baseItems, ...homePhase4Content[lang].faq.extraItems]
}

export function getHomeFaqGroups(lang: LangCode): HomeFaqGroup[] {
  const titles = { quickAnswers: getHomeAeoContent(lang).faq.groupTitle, ...homePhase4Content[lang].faq.groupTitles }
  const items = getHomeFaqItems(lang)

  return GROUP_ORDER.map((key) => ({
    key,
    title: titles[key as keyof typeof titles],
    items: items.filter((item) => item.group === key),
  })).filter((group) => group.items.length > 0)
}
