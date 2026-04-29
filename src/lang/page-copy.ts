import type { LangCode } from './types'
import type { InternalPageCopy } from './extra'
import type { PublicPage } from '@/lib/page-registry'
import { aboutPageCopy } from './about-page'
import { privacyPageCopy } from './privacy-page'
import { termsPageCopy } from './terms-page'
import { contentPageCopy } from './content-pages'
import { phase3bPageCopy } from './phase3b-pages'
import { phase3cPageCopy } from './phase3c-pages'
import { sectorPageCopy, sectorsIndexCopy } from './sector-pages'
import { blogPageContent } from './blog-page'
import { seoMoneyPageCopy } from './seo-money-pages'
import { sectorSeoPageCopy } from './sector-seo-pages'
import { comparisonSeoPageCopy } from './comparison-seo-pages'
import { comparisonSeoPhase4PageCopy } from './comparison-seo-phase4-pages'
import { supportBlogPageCopy } from './support-blog-pages'

export type NonHomePage = Exclude<PublicPage, 'home'>

export const pageCopy: Record<LangCode, Record<NonHomePage, InternalPageCopy>> = {
  ar: {
    about: aboutPageCopy.ar,
    privacy: privacyPageCopy.ar,
    terms: termsPageCopy.ar,
    ...contentPageCopy.ar,
    ...phase3bPageCopy.ar,
    ...phase3cPageCopy.ar,
    ...sectorPageCopy.ar,
    ...seoMoneyPageCopy.ar,
    ...sectorSeoPageCopy.ar,
    ...comparisonSeoPageCopy.ar,
    ...comparisonSeoPhase4PageCopy.ar,
    ...supportBlogPageCopy.ar,
    decisionTracking: contentPageCopy.ar.decisionTracking,
    sectorsIndex: sectorsIndexCopy.ar,
    blog: blogPageContent.ar.copy,
},
  en: {
    about: aboutPageCopy.en,
    privacy: privacyPageCopy.en,
    terms: termsPageCopy.en,
    ...contentPageCopy.en,
    ...phase3bPageCopy.en,
    ...phase3cPageCopy.en,
    ...sectorPageCopy.en,
    ...seoMoneyPageCopy.en,
    ...sectorSeoPageCopy.en,
    ...comparisonSeoPageCopy.en,
    ...comparisonSeoPhase4PageCopy.en,
    ...supportBlogPageCopy.en,
    decisionTracking: contentPageCopy.en.decisionTracking,
    sectorsIndex: sectorsIndexCopy.en,
    blog: blogPageContent.en.copy,
},



  hi: {
    about: aboutPageCopy.hi,
    privacy: privacyPageCopy.hi,
    terms: termsPageCopy.hi,
    ...contentPageCopy.hi,
    ...phase3bPageCopy.hi,
    ...phase3cPageCopy.hi,
    ...sectorPageCopy.hi,
    ...seoMoneyPageCopy.hi,
    ...sectorSeoPageCopy.hi,
    ...comparisonSeoPageCopy.hi,
    ...comparisonSeoPhase4PageCopy.hi,
    ...supportBlogPageCopy.hi,
    decisionTracking: contentPageCopy.hi.decisionTracking,
    sectorsIndex: sectorsIndexCopy.hi,
    blog: blogPageContent.hi.copy,
},
  ur: {
    about: aboutPageCopy.ur,
    privacy: privacyPageCopy.ur,
    terms: termsPageCopy.ur,
    ...contentPageCopy.ur,
    ...phase3bPageCopy.ur,
    ...phase3cPageCopy.ur,
    ...sectorPageCopy.ur,
    ...seoMoneyPageCopy.ur,
    ...sectorSeoPageCopy.ur,
    ...comparisonSeoPageCopy.ur,
    ...comparisonSeoPhase4PageCopy.ur,
    ...supportBlogPageCopy.ur,
    decisionTracking: contentPageCopy.ur.decisionTracking,
    sectorsIndex: sectorsIndexCopy.ur,
    blog: blogPageContent.ur.copy,
}
}
