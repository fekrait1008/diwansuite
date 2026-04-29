import type { PublicPage } from '@/lib/page-registry'
import { getPageCategory } from '@/lib/page-registry'

export type InternalLinkPage = Exclude<PublicPage, 'home'>

type LinkClusterId =
  | 'meeting-management'
  | 'board-governance'
  | 'general-assembly'
  | 'minutes-ai'
  | 'decision-tracking'
  | 'committees'
  | 'sector-governance'
  | 'comparisons'
  | 'supporting-blog'

const CONTENT_CLUSTERS: Record<LinkClusterId, InternalLinkPage[]> = {
  'meeting-management': [
    'meetingManagementSoftware',
    'corporateMeetingManagementSoftware',
    'meetingMinutesSoftware',
    'meetingMinutesEsignature',
    'boardPortalVsTeamsZoom',
    'boardPortalVsMeetingToolsGuideArticle',
    'whatIsMeetingManagementSoftwareArticle',
  ],
  'board-governance': [
    'boardGovernanceSoftware',
    'boardOfDirectorsGovernanceSoftware',
    'boardManagementSoftwarePage',
    'boardManagementSystem',
    'corporateGovernancePlatform',
    'boardPortalSaudiArabia',
    'howChooseBoardGovernanceSoftwareArticle',
    'boardGovernanceSoftwareGovernmentSaudiArabia',
  ],
  'general-assembly': [
    'generalAssemblyManagementSoftware',
    'generalAssemblyManagement',
    'generalAssembliesSector',
    'electronicVotingMeetings',
    'attendanceQuorumQr',
    'generalAssemblyQuorumImportanceArticle',
  ],
  'minutes-ai': [
    'meetingMinutesSoftware',
    'meetingMinutesEsignature',
    'meetingMinutesVsWordPdf',
    'aiMeetingMinutesVsManualWordPdf',
    'electronicMeetingMinutesVsPaperMinutes',
    'aiGovernanceAssistant',
    'aiMeetingSummariesMinutesArticle',
    'reduceMeetingMinutesErrorsArticle',
  ],
  'decision-tracking': [
    'boardDecisionsTrackingSoftware',
    'decisionTracking',
    'manualBoardDecisionTrackingVsAutomation',
    'boardDecisionManagementVsTaskManagement',
    'governanceReportsDashboards',
    'roiBoardGovernance',
    'howTrackBoardDecisionsArticle',
    'meetingMinutesVsMeetingDecisionArticle',
  ],
  committees: [
    'committeeGovernanceSoftware',
    'committeeManagementSoftware',
    'auditCommitteeManagementSoftware',
    'riskCommitteeManagementSoftware',
    'nominationRemunerationCommitteeManagement',
    'manualCommitteeManagementVsGovernancePlatform',
    'committeeGovernanceBestPracticesArticle',
  ],
  'sector-governance': [
    'familyBusinessGovernanceSoftware',
    'jointStockCompaniesGovernanceSoftware',
    'banksBoardCommitteeGovernanceSoftware',
    'universitiesBoardGovernanceSoftware',
    'healthcareGovernanceMeetingsSoftware',
    'nonprofitGovernanceMeetingsSoftware',
    'realEstateDeveloperGovernanceSoftware',
    'governmentGovernance',
    'bankingGovernance',
  ],
  comparisons: [
    'manualBoardDecisionTrackingVsAutomation',
    'meetingMinutesVsWordPdf',
    'boardPortalVsEmail',
    'boardPortalVsTeamsZoom',
    'governancePlatformVsMeetingSoftware',
    'aiMeetingMinutesVsManualWordPdf',
    'boardPortalVsSharePointGoogleDrive',
    'boardDecisionManagementVsTaskManagement',
    'electronicMeetingMinutesVsPaperMinutes',
    'manualCommitteeManagementVsGovernancePlatform',
  ],
  'supporting-blog': [
    'whatIsMeetingManagementSoftwareArticle',
    'howChooseBoardGovernanceSoftwareArticle',
    'meetingMinutesVsMeetingDecisionArticle',
    'howTrackBoardDecisionsArticle',
    'generalAssemblyQuorumImportanceArticle',
    'aiMeetingSummariesMinutesArticle',
    'committeeGovernanceBestPracticesArticle',
    'whyEmailNotEnoughBoardGovernanceArticle',
    'boardPortalVsMeetingToolsGuideArticle',
  ],
}

const PAGE_CLUSTER_MAP: Partial<Record<InternalLinkPage, LinkClusterId[]>> = {
  meetingManagementSoftware: ['meeting-management', 'minutes-ai', 'decision-tracking'],
  corporateMeetingManagementSoftware: ['meeting-management', 'board-governance'],
  boardGovernanceSoftware: ['board-governance', 'comparisons', 'decision-tracking'],
  boardOfDirectorsGovernanceSoftware: ['board-governance', 'committees', 'decision-tracking'],
  boardManagementSoftwarePage: ['board-governance', 'meeting-management'],
  corporateGovernancePlatform: ['board-governance', 'sector-governance', 'comparisons'],
  boardPortalSaudiArabia: ['board-governance', 'comparisons', 'sector-governance'],
  generalAssemblyManagementSoftware: ['general-assembly', 'minutes-ai', 'decision-tracking'],
  meetingMinutesSoftware: ['minutes-ai', 'meeting-management', 'comparisons'],
  boardDecisionsTrackingSoftware: ['decision-tracking', 'board-governance', 'comparisons'],
  committeeGovernanceSoftware: ['committees', 'board-governance', 'decision-tracking'],
  electronicVotingMeetings: ['general-assembly', 'committees'],

  familyBusinessGovernanceSoftware: ['sector-governance', 'board-governance'],
  jointStockCompaniesGovernanceSoftware: ['sector-governance', 'board-governance', 'general-assembly'],
  banksBoardCommitteeGovernanceSoftware: ['sector-governance', 'committees'],
  universitiesBoardGovernanceSoftware: ['sector-governance', 'meeting-management'],
  healthcareGovernanceMeetingsSoftware: ['sector-governance', 'committees'],
  nonprofitGovernanceMeetingsSoftware: ['sector-governance', 'general-assembly'],
  realEstateDeveloperGovernanceSoftware: ['sector-governance', 'board-governance'],
  auditCommitteeManagementSoftware: ['committees', 'sector-governance'],
  riskCommitteeManagementSoftware: ['committees', 'sector-governance'],
  nominationRemunerationCommitteeManagement: ['committees', 'sector-governance'],

  boardPortalVsEmail: ['comparisons', 'board-governance', 'supporting-blog'],
  boardPortalVsTeamsZoom: ['comparisons', 'meeting-management', 'board-governance'],
  meetingMinutesVsWordPdf: ['comparisons', 'minutes-ai'],
  manualBoardDecisionTrackingVsAutomation: ['comparisons', 'decision-tracking'],
  governancePlatformVsMeetingSoftware: ['comparisons', 'board-governance', 'meeting-management'],
  aiMeetingMinutesVsManualWordPdf: ['comparisons', 'minutes-ai'],
  boardPortalVsSharePointGoogleDrive: ['comparisons', 'board-governance'],
  boardDecisionManagementVsTaskManagement: ['comparisons', 'decision-tracking'],
  electronicMeetingMinutesVsPaperMinutes: ['comparisons', 'minutes-ai'],
  manualCommitteeManagementVsGovernancePlatform: ['comparisons', 'committees'],
  boardGovernanceSoftwareGovernmentSaudiArabia: ['sector-governance', 'board-governance', 'comparisons'],

  whatIsMeetingManagementSoftwareArticle: ['meeting-management', 'supporting-blog'],
  howChooseBoardGovernanceSoftwareArticle: ['board-governance', 'supporting-blog'],
  meetingMinutesVsMeetingDecisionArticle: ['minutes-ai', 'decision-tracking', 'supporting-blog'],
  howTrackBoardDecisionsArticle: ['decision-tracking', 'supporting-blog'],
  generalAssemblyQuorumImportanceArticle: ['general-assembly', 'supporting-blog'],
  aiMeetingSummariesMinutesArticle: ['minutes-ai', 'supporting-blog'],
  committeeGovernanceBestPracticesArticle: ['committees', 'supporting-blog'],
  reduceMeetingMinutesErrorsArticle: ['minutes-ai', 'supporting-blog'],
  whyEmailNotEnoughBoardGovernanceArticle: ['comparisons', 'board-governance', 'supporting-blog'],
  boardPortalVsMeetingToolsGuideArticle: ['comparisons', 'meeting-management', 'supporting-blog'],
}

const STRATEGIC_DIRECT_LINKS: Partial<Record<InternalLinkPage, InternalLinkPage[]>> = {
  meetingManagementSoftware: ['meetingMinutesSoftware', 'boardDecisionsTrackingSoftware', 'boardPortalVsTeamsZoom', 'whatIsMeetingManagementSoftwareArticle'],
  boardGovernanceSoftware: ['boardOfDirectorsGovernanceSoftware', 'boardManagementSoftwarePage', 'boardPortalVsEmail', 'howChooseBoardGovernanceSoftwareArticle'],
  boardOfDirectorsGovernanceSoftware: ['boardGovernanceSoftware', 'boardDecisionsTrackingSoftware', 'committeeGovernanceSoftware', 'boardGovernanceSoftwareGovernmentSaudiArabia'],
  generalAssemblyManagementSoftware: ['electronicVotingMeetings', 'generalAssemblyQuorumImportanceArticle', 'generalAssembliesSector', 'meetingMinutesSoftware'],
  meetingMinutesSoftware: ['meetingMinutesVsWordPdf', 'aiMeetingMinutesVsManualWordPdf', 'reduceMeetingMinutesErrorsArticle', 'meetingMinutesEsignature', 'meetingMinutesVsMeetingDecisionArticle'],
  boardDecisionsTrackingSoftware: ['manualBoardDecisionTrackingVsAutomation', 'boardDecisionManagementVsTaskManagement', 'howTrackBoardDecisionsArticle', 'governanceReportsDashboards', 'meetingMinutesVsMeetingDecisionArticle'],
  committeeGovernanceSoftware: ['auditCommitteeManagementSoftware', 'riskCommitteeManagementSoftware', 'manualCommitteeManagementVsGovernancePlatform', 'committeeGovernanceBestPracticesArticle'],
  boardPortalVsEmail: ['whyEmailNotEnoughBoardGovernanceArticle', 'boardGovernanceSoftware', 'boardPortalVsSharePointGoogleDrive', 'governanceSecurityCompliance'],
  boardPortalVsTeamsZoom: ['boardPortalVsMeetingToolsGuideArticle', 'integrationsBoardGovernance', 'meetingManagementSoftware', 'governancePlatformVsMeetingSoftware'],
  aiMeetingMinutesVsManualWordPdf: ['meetingMinutesSoftware', 'aiMeetingSummariesMinutesArticle', 'aiGovernanceAssistant', 'meetingMinutesVsWordPdf'],
  boardGovernanceSoftwareGovernmentSaudiArabia: ['governmentGovernance', 'ministriesGovernmentEntitiesSector', 'governanceSecurityCompliance', 'implementationSupportTraining'],
  meetingMinutesVsMeetingDecisionArticle: ['meetingMinutesSoftware', 'boardDecisionsTrackingSoftware', 'howTrackBoardDecisionsArticle', 'reduceMeetingMinutesErrorsArticle', 'decisionTracking'],
  decisionTracking: ['boardDecisionsTrackingSoftware', 'meetingMinutesVsMeetingDecisionArticle', 'howTrackBoardDecisionsArticle', 'governanceReportsDashboards'],
  blog: ['meetingManagementSoftware', 'boardGovernanceSoftware', 'generalAssemblyManagementSoftware', 'boardPortalVsEmail', 'aiMeetingMinutesVsManualWordPdf', 'meetingMinutesVsMeetingDecisionArticle'],
}

export const BLOG_HUB_PAGES: InternalLinkPage[] = [
  'meetingManagementSoftware',
  'boardGovernanceSoftware',
  'generalAssemblyManagementSoftware',
  'meetingMinutesSoftware',
  'boardDecisionsTrackingSoftware',
  'boardPortalVsEmail',
  'aiMeetingMinutesVsManualWordPdf',
  'boardGovernanceSoftwareGovernmentSaudiArabia',
]

function uniquePages(pages: InternalLinkPage[], current?: InternalLinkPage): InternalLinkPage[] {
  const seen = new Set<InternalLinkPage>()
  const output: InternalLinkPage[] = []
  for (const page of pages) {
    if (current && page === current) continue
    if (seen.has(page)) continue
    seen.add(page)
    output.push(page)
  }
  return output
}

export function getStrategicRelatedPages(page: InternalLinkPage): InternalLinkPage[] {
  const clusters = PAGE_CLUSTER_MAP[page] ?? []
  const clusterPages = clusters.flatMap((cluster) => CONTENT_CLUSTERS[cluster] ?? [])
  const directPages = STRATEGIC_DIRECT_LINKS[page] ?? []
  const category = getPageCategory(page)
  const fallbackPages = category === 'blog'
    ? BLOG_HUB_PAGES
    : category === 'seo'
      ? ['boardGovernanceSoftware', 'meetingManagementSoftware', 'meetingMinutesSoftware', 'boardDecisionsTrackingSoftware', 'corporateGovernancePlatform'] as InternalLinkPage[]
      : []
  return uniquePages([...directPages, ...clusterPages, ...fallbackPages], page).slice(0, 8)
}

export function getBlogHubPages(): InternalLinkPage[] {
  return BLOG_HUB_PAGES
}

export function getSitemapChangefreq(page: PublicPage): 'weekly' | 'monthly' {
  const category = page === 'home' ? 'core' : getPageCategory(page)
  if (page === 'home' || page === 'blog' || category === 'blog' || category === 'seo') return 'weekly'
  return 'monthly'
}

export function getSitemapPriority(page: PublicPage): string {
  if (page === 'home') return '1.0'
  if (page === 'blog') return '0.8'
  const category = getPageCategory(page)
  if (category === 'seo') return '0.85'
  if (category === 'solution' || category === 'sector' || category === 'industry') return '0.75'
  if (category === 'platform' || category === 'trust') return '0.70'
  if (category === 'blog') return '0.65'
  return '0.60'
}

export const INTERNAL_LINKING_PHASE6_SUMMARY = {
  clusters: Object.keys(CONTENT_CLUSTERS).length,
  blogHubPages: BLOG_HUB_PAGES.length,
  maxStrategicLinksPerPage: 8,
  schemaPolicy: 'No FAQPage or Service schema added by internal linking phase.',
} as const
