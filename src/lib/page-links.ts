import type { PublicPageMeta } from '@/lib/app-state'
import type { LangCode } from '@/lang/types'
import { LEGAL_PAGES, NAV_INDUSTRY_PAGES, NAV_SECTOR_PAGES, NAV_SOLUTION_PAGES, PLATFORM_PAGES, SUPPORT_PAGES, TRUST_PAGES, type PublicPage } from '@/lib/page-registry'
import { buildLocalizedPath } from '@/lib/routing'

const MENU_LABEL_OVERRIDES: Partial<Record<LangCode, Partial<Record<Exclude<PublicPage, 'home'>, string>>>> = {
  ar: {
    meetingMinutesEsignature: 'محاضر الاجتماعات والتوقيع الإلكتروني',
    decisionTracking: 'إدارة ومتابعة القرارات',
    holdingCompaniesSector: 'حوكمة الشركات القابضة',
    governmentCompaniesSector: 'حوكمة الشركات الحكومية',
    charitableEntitiesSector: 'حوكمة الجهات الخيرية',
    universitiesInstitutesSector: 'حوكمة الجامعات والمعاهد',
    ministriesGovernmentEntitiesSector: 'الوزارات والجهات الحكومية',
    authoritiesOrganizationsSector: 'حوكمة الهيئات والمنظمات',
    municipalitiesSector: 'حوكمة الأمانات والبلديات',
    hospitalsClinicsSector: 'حوكمة المستشفيات والعيادات',
    homeownersAssociationsSector: 'حوكمة اتحادات الملاك',
    generalAssembliesSector: 'حوكمة الجمعية العمومية',
  },
  en: {
    meetingMinutesEsignature: 'Meeting Minutes & E-Signature',
    decisionTracking: 'Decision Management & Tracking',
    holdingCompaniesSector: 'Holding Companies',
    governmentCompaniesSector: 'Government Companies',
    charitableEntitiesSector: 'Charitable Entities',
    universitiesInstitutesSector: 'Universities & Institutes',
    ministriesGovernmentEntitiesSector: 'Ministries & Public Entities',
    authoritiesOrganizationsSector: 'Authorities & Organizations',
    municipalitiesSector: 'Municipalities',
    hospitalsClinicsSector: 'Hospitals & Clinics',
    homeownersAssociationsSector: 'Homeowners Associations',
    generalAssembliesSector: 'General Assemblies',
  },
  hi: {
    meetingMinutesEsignature: 'मीटिंग मिनट्स और ई-हस्ताक्षर',
    decisionTracking: 'निर्णय प्रबंधन और ट्रैकिंग',
    holdingCompaniesSector: 'होल्डिंग कंपनियाँ',
    governmentCompaniesSector: 'सरकारी कंपनियाँ',
    charitableEntitiesSector: 'चैरिटेबल संस्थाएँ',
    universitiesInstitutesSector: 'विश्वविद्यालय और संस्थान',
    ministriesGovernmentEntitiesSector: 'मंत्रालय और सरकारी संस्थाएँ',
    authoritiesOrganizationsSector: 'प्राधिकरण और संगठन',
    municipalitiesSector: 'नगरपालिकाएँ और अमानत',
    hospitalsClinicsSector: 'अस्पताल और क्लीनिक',
    homeownersAssociationsSector: 'होमओनर्स एसोसिएशन',
    generalAssembliesSector: 'सामान्य सभाएँ',
  },
  ur: {
    meetingMinutesEsignature: 'اجلاس کے محاضر اور ای-سگنیچر',
    decisionTracking: 'فیصلہ مینجمنٹ اور ٹریکنگ',
    holdingCompaniesSector: 'ہولڈنگ کمپنیاں',
    governmentCompaniesSector: 'سرکاری کمپنیاں',
    charitableEntitiesSector: 'خیراتی ادارے',
    universitiesInstitutesSector: 'جامعات اور ادارے',
    ministriesGovernmentEntitiesSector: 'وزارات اور سرکاری ادارے',
    authoritiesOrganizationsSector: 'ہیئات اور تنظیمیں',
    municipalitiesSector: 'امانات اور بلدیات',
    hospitalsClinicsSector: 'ہسپتال اور کلینکس',
    homeownersAssociationsSector: 'اتحاداتِ مالکان',
    generalAssembliesSector: 'جنرل اسمبلیاں',
  },
}

export function getPageTitle(pageMeta: PublicPageMeta, page: Exclude<PublicPage, 'home'>) {
  return pageMeta[page].title
}

export function getMenuLabel(lang: LangCode, pageMeta: PublicPageMeta, page: Exclude<PublicPage, 'home'>) {
  return MENU_LABEL_OVERRIDES[lang]?.[page] ?? getPageTitle(pageMeta, page)
}

export function getPageSummary(pageMeta: PublicPageMeta, page: Exclude<PublicPage, 'home'>) {
  void pageMeta
  void page
  return ''
}

export function getSolutionLinks(lang: LangCode, pageMeta: PublicPageMeta) {
  return NAV_SOLUTION_PAGES.map((page) => ({ page, label: getMenuLabel(lang, pageMeta, page), summary: getPageSummary(pageMeta, page), href: buildLocalizedPath(lang, page) }))
}

export function getSectorLinks(lang: LangCode, pageMeta: PublicPageMeta) {
  return NAV_SECTOR_PAGES.map((page) => ({ page, label: getMenuLabel(lang, pageMeta, page), summary: getPageSummary(pageMeta, page), href: buildLocalizedPath(lang, page) }))
}

export function getIndustryLinks(lang: LangCode, pageMeta: PublicPageMeta) {
  return NAV_INDUSTRY_PAGES.map((page) => ({ page, label: getMenuLabel(lang, pageMeta, page), summary: getPageSummary(pageMeta, page), href: buildLocalizedPath(lang, page) }))
}

export function getPlatformLinks(lang: LangCode, pageMeta: PublicPageMeta) {
  return PLATFORM_PAGES.map((page) => ({ page, label: getMenuLabel(lang, pageMeta, page), summary: getPageSummary(pageMeta, page), href: buildLocalizedPath(lang, page) }))
}

export function getSupportLinks(lang: LangCode, pageMeta: PublicPageMeta) {
  return SUPPORT_PAGES.map((page) => ({ page, label: getMenuLabel(lang, pageMeta, page), summary: getPageSummary(pageMeta, page), href: buildLocalizedPath(lang, page) }))
}

export function getLegalLinks(lang: LangCode, pageMeta: PublicPageMeta) {
  return LEGAL_PAGES.map((page) => ({ page, label: getMenuLabel(lang, pageMeta, page), summary: getPageSummary(pageMeta, page), href: buildLocalizedPath(lang, page) }))
}

export function getTrustLinks(lang: LangCode, pageMeta: PublicPageMeta) {
  return TRUST_PAGES.map((page) => ({ page, label: getMenuLabel(lang, pageMeta, page), summary: getPageSummary(pageMeta, page), href: buildLocalizedPath(lang, page) }))
}

const CAPABILITY_PAGES: Exclude<PublicPage, 'home'>[] = [
  'aiGovernanceAssistant',
  'meetingMinutesEsignature',
  'decisionTracking',
  'attendanceQuorumQr',
  'governanceReportsDashboards',
  'governanceSecurityCompliance',
  'integrationsBoardGovernance',
]

const CAPABILITY_LABEL_OVERRIDES: Partial<Record<LangCode, Partial<Record<Exclude<PublicPage, 'home'>, string>>>> = {
  ar: {
    aiGovernanceAssistant: 'الذكاء الاصطناعي للحوكمة',
    meetingMinutesEsignature: 'محاضر الاجتماعات والتوقيع',
    decisionTracking: 'متابعة تنفيذ القرارات',
    attendanceQuorumQr: 'الحضور والنصاب QR',
    governanceReportsDashboards: 'لوحات التحكم والتقارير',
    governanceSecurityCompliance: 'الأمن والامتثال',
    integrationsBoardGovernance: 'التكاملات المؤسسية',
  },
  en: {
    aiGovernanceAssistant: 'AI Governance Assistant',
    meetingMinutesEsignature: 'Meeting Minutes & E-Signature',
    decisionTracking: 'Decision Tracking',
    attendanceQuorumQr: 'QR Attendance & Quorum',
    governanceReportsDashboards: 'Dashboards & Reports',
    governanceSecurityCompliance: 'Security & Compliance',
    integrationsBoardGovernance: 'Enterprise Integrations',
  },
  hi: {
    aiGovernanceAssistant: 'AI गवर्नेंस असिस्टेंट',
    meetingMinutesEsignature: 'बैठक कार्यवृत्त और ई-हस्ताक्षर',
    decisionTracking: 'निर्णय ट्रैकिंग',
    attendanceQuorumQr: 'QR उपस्थिति और कोरम',
    governanceReportsDashboards: 'डैशबोर्ड और रिपोर्ट',
    governanceSecurityCompliance: 'सुरक्षा और अनुपालन',
    integrationsBoardGovernance: 'एंटरप्राइज़ एकीकरण',
  },
  ur: {
    aiGovernanceAssistant: 'AI گورننس اسسٹنٹ',
    meetingMinutesEsignature: 'میٹنگ منٹس اور ای-سگنیچر',
    decisionTracking: 'فیصلوں کی پیروی',
    attendanceQuorumQr: 'QR حاضری اور کورم',
    governanceReportsDashboards: 'ڈیش بورڈز اور رپورٹس',
    governanceSecurityCompliance: 'سیکیورٹی اور تعمیل',
    integrationsBoardGovernance: 'انٹرپرائز انٹیگریشنز',
  },
}

export function getCapabilityLinks(lang: LangCode, pageMeta: PublicPageMeta) {
  return CAPABILITY_PAGES.map((page) => ({
    page,
    label: CAPABILITY_LABEL_OVERRIDES[lang]?.[page] ?? getMenuLabel(lang, pageMeta, page),
    summary: '',
    href: buildLocalizedPath(lang, page),
  }))
}
