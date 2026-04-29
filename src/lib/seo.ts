import { SITE_CONFIG } from '@/lib/site-config'
import { buildLocalizedPath, DEFAULT_LANG, SUPPORTED_LANGS, type StaticPage } from '@/lib/routing'
import { extraCopy } from '@/lang/extra'
import { siteContent } from '@/lang/content'
import { pageCopy } from '@/lang/page-copy'
import { getPageSlug, getPageCategory, getPageDateModified } from '@/lib/page-registry'
import { getHomeAeoContent } from '@/lang/home-aeo'
import type { LangCode } from '@/lang/types'
import type { InternalPageCopy } from '@/lang/extra'

export interface SeoAlternate {
  lang: LangCode
  href: string
  htmlLang: string
  hreflang: string
  locale: string
}

export interface SeoPayload {
  title: string
  description: string
  canonical: string
  pagePath: string
  locale: string
  htmlLang: string
  hreflang: string
  dir: 'rtl' | 'ltr'
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogImageAlt: string
  breadcrumbName: string
  alternates: SeoAlternate[]
  xDefaultHref: string
  structuredData: unknown[]
}

const localeMap: Partial<Record<LangCode, string>> = {
  ar: 'ar_SA',
  en: 'en_US',
  hi: 'hi_IN',
  ur: 'ur_PK',
}

const languageTagMap: Partial<Record<LangCode, string>> = {
  ar: 'ar-SA',
  en: 'en-US',
  hi: 'hi-IN',
  ur: 'ur-PK',
}

const metaMaxLength: Partial<Record<LangCode, number>> = {
  ar: 158,
  en: 158,
  hi: 158,
  ur: 158,
}

const metaMinLength: Partial<Record<LangCode, number>> = {
  ar: 110,
  en: 110,
  hi: 100,
  ur: 100,
}

const brandLabel: Partial<Record<LangCode, string>> = {
  ar: 'ديوان سويت',
  en: 'Diwan Suite',
  hi: 'Diwan Suite',
  ur: 'Diwan Suite',
}

const pageTypeDescriptionTemplates: Partial<Record<LangCode, Record<string, (title: string) => string>>> = {
  ar: {
    about: () => 'تعرّف على ديوان سويت، منصة سعودية لإدارة المجالس واللجان والاجتماعات ومحاضرها وقراراتها مع استضافة محلية ودعم تنفيذي للجهات المتوسطة والكبيرة.',
    legal: (title) => `${title} في ديوان سويت يوضح الخصوصية والاستخدام والامتثال وحوكمة البيانات بصياغة مهنية مناسبة للجهات والشركات داخل السعودية.`,
    support: (title) => `${title} من ديوان سويت يشرح الدعم والتأهيل وخيارات التطبيق والتشغيل المطلوبة للجهات السعودية والشركات المتوسطة والكبيرة بثقة واستمرارية.`,
    solution: (title) => `${title} من ديوان سويت ينظم الاجتماعات واللجان والمحاضر والقرارات ضمن مسار حوكمة واضح للشركات والجهات السعودية متوسطة وكبيرة الحجم.`,
    sector: (title) => `${title} من ديوان سويت يهيئ الجهات السعودية لإدارة المجالس واللجان والقرارات والامتثال بسجل موثق وتقارير تنفيذية قابلة للتتبع.`,
    industry: (title) => `${title} من ديوان سويت يربط الحوكمة المؤسسية بالاجتماعات والمحاضر والقرارات والمتابعة التنفيذية داخل الجهات الخاضعة للرقابة والتنظيم.`,
    platform: (title) => `${title} في ديوان سويت يدعم الحوكمة المؤسسية عبر أتمتة المحاضر والقرارات والمتابعة والتقارير ضمن بيئة آمنة ومستضافة محليًا.`,
    trust: (title) => `${title} في ديوان سويت يشرح ضوابط الأمن والامتثال والتتبع اللازمة لحوكمة اجتماعات المجالس واللجان داخل المؤسسات السعودية.`,
    core: (title) => `${title} من ديوان سويت يشرح المنصة وخياراتها المؤسسية لإدارة المجالس واللجان والاجتماعات بوضوح مناسب للجهات التنفيذية.`
  },
  en: {
    about: () => 'Learn how Diwan Suite helps Saudi organizations manage boards, committees, meetings, minutes, decisions, and governance follow-up with local hosting and executive support.',
    legal: (title) => `${title} explains privacy, usage, data governance, and compliance controls in Diwan Suite for Saudi organizations and enterprise buyers.`,
    support: (title) => `${title} explains enablement, rollout, training, and operational support in Diwan Suite for Saudi organizations and mid-market to enterprise teams.`,
    solution: (title) => `${title} in Diwan Suite helps Saudi organizations manage meetings, committees, minutes, decisions, and governance follow-up with an audit-ready workflow.`,
    sector: (title) => `${title} shows how Diwan Suite supports boards, committees, decisions, and institutional compliance for regulated Saudi organizations and large teams.`,
    industry: (title) => `${title} shows how Diwan Suite connects governance operations, meeting records, decisions, and executive follow-up for highly regulated organizations.`,
    platform: (title) => `${title} in Diwan Suite supports governance automation, decision tracking, reporting, and secure execution workflows with local hosting in Saudi Arabia.`,
    trust: (title) => `${title} in Diwan Suite explains the security, compliance, audit trail, and governance controls required by Saudi institutions and enterprise teams.`,
    core: (title) => `${title} explains how Diwan Suite supports board governance, meeting operations, and executive decision follow-up for Saudi organizations.`
  },
  hi: {
    about: () => 'जानें कि Diwan Suite सऊदी संगठनों के लिए बोर्ड गवर्नेंस, समितियाँ, बैठक कार्यवृत्त, निर्णय ट्रैकिंग और स्थानीय होस्टिंग के साथ अनुपालन को कैसे समर्थन देता है।',
    legal: (title) => `${title} Diwan Suite में गोपनीयता, उपयोग, डेटा गवर्नेंस और अनुपालन नियंत्रण को सऊदी संगठनों के लिए स्पष्ट रूप से समझाता है।`,
    support: (title) => `${title} Diwan Suite में प्रशिक्षण, कार्यान्वयन, सहायता और परिचालन सक्षमकरण को सऊदी संस्थाओं तथा मध्यम से बड़े संगठनों के लिए स्पष्ट करता है।`,
    solution: (title) => `${title} Diwan Suite में बैठकों, समितियों, कार्यवृत्त, निर्णयों और गवर्नेंस फॉलो-अप को सऊदी संस्थाओं के लिए एक संरचित वर्कफ़्लो में व्यवस्थित करता है।`,
    sector: (title) => `${title} दिखाता है कि Diwan Suite सऊदी संस्थाओं में बोर्ड, समितियाँ, निर्णय और अनुपालन रिकॉर्ड को एक ही प्लेटफ़ॉर्म में कैसे संगठित करता है।`,
    industry: (title) => `${title} बताता है कि Diwan Suite नियामित संस्थाओं में गवर्नेंस, ���ैठक रिकॉर्ड, निर्णय और कार्यान्वयन ट्रैकिंग को कैसे जोड़ता है।`,
    platform: (title) => `${title} Diwan Suite में गवर्नेंस ऑटोमेशन, रिपोर्टिंग, निर्णय ट्रैकिंग और सुरक्षित कार्य निष्पादन को स्थानीय होस्टिंग के साथ समर्थन देता है।`,
    trust: (title) => `${title} Diwan Suite में सुरक्षा, अनुपालन, ऑडिट ट्रेल और गवर्नेंस नियंत्रण को सऊदी संस्थागत आवश्यकताओं के अनुसार स्पष्ट करता है।`,
    core: (title) => `${title} बताता है कि Diwan Suite सऊदी संगठनों के लिए बोर्ड गवर्नेंस, बैठक संचालन और निर्णय फॉलो-अप को कैसे समर्थन देता है।`
  },
  ur: {
    about: () => 'جانیں کہ Diwan Suite سعودی اداروں کے لیے بورڈ گورننس، کمیٹیاں، اجلاس کے محاضر، فیصلہ ٹریکنگ اور مقامی ہوسٹنگ کے ساتھ ادارہ جاتی تعمیل کو کیسے سپورٹ کرتا ہے۔',
    legal: (title) => `${title} Diwan Suite میں پرائیویسی، استعمال، ڈیٹا گورننس اور تعمیلی کنٹرولز کو سعودی اداروں کے لیے واضح انداز میں بیان کرتا ہے۔`,
    support: (title) => `${title} Diwan Suite میں نفاذ، تربیت، سپورٹ اور آپریشنل فعال سازی کو سعودی اداروں اور درمیانے سے بڑے کاروباری ماحول کے لیے واضح کرتا ہے۔`,
    solution: (title) => `${title} Diwan Suite میں اجلاس، کمیٹیاں، محاضر، فیصلے اور گورننس فالو اپ کو سعودی اداروں کے لیے ایک منظم ورک فلو میں لاتا ہے۔`,
    sector: (title) => `${title} دکھاتا ہے کہ Diwan Suite سعودی اداروں میں بورڈ، کمیٹی، فیصلہ اور تعمیلی ریکارڈ کو ایک مربوط پلیٹ فارم میں کیسے منظم کرتا ہے۔`,
    industry: (title) => `${title} واضح کرتا ہے کہ Diwan Suite ضابطہ جاتی اداروں میں گورننس، اجلاس ریکارڈ، فیصلوں اور نفاذی فالو اپ کو کیسے جوڑتا ہے۔`,
    platform: (title) => `${title} Diwan Suite میں گورننس آٹومیشن، فیصلہ ٹریکنگ، رپورٹنگ اور محفوظ نفاذی ورک فلو کو مقامی ہوسٹنگ کے ساتھ سپورٹ کرتا ہے۔`,
    trust: (title) => `${title} Diwan Suite میں سیکیورٹی، تعمیل، آڈٹ ٹریل اور گورننس کنٹرولز کو سعودی ادارہ جاتی ضروریات کے مطابق واضح کرتا ہے۔`,
    core: (title) => `${title} واضح کرتا ہے کہ Diwan Suite سعودی اداروں کے لیے بورڈ گورننس، اجلاس کے انتظام اور فیصلہ فالو اپ کو کیسے سپورٹ کرتا ہے۔`
  },
}

function getLocale(lang: LangCode) {
  return localeMap[lang] ?? localeMap.ar ?? 'ar_SA'
}

function getLanguageTag(lang: LangCode) {
  return languageTagMap[lang] ?? languageTagMap.ar ?? 'ar-SA'
}

function buildAbsoluteUrl(path: string) {
  return new URL(path, `${SITE_CONFIG.url}/`).toString().replace(/([^:]\/)\/+/, '$1')
}

function getPageCopyForSeo(lang: LangCode, page: StaticPage) {
  return page === 'home' ? null : pageCopy[lang][page]
}

function getOgImagePath(page: StaticPage) {
  const slug = getPageSlug(page)
  const image = page === 'about' ? '/og-about.webp' : page === 'privacy' ? '/og-privacy.webp' : page === 'terms' ? '/og-terms.webp' : '/og-home.webp'
  return buildAbsoluteUrl(image || `/og-${slug}.webp`)
}

function getAlternateLinks(page: StaticPage): SeoAlternate[] {
  return SUPPORTED_LANGS.map((lang) => ({
    lang,
    href: buildAbsoluteUrl(buildLocalizedPath(lang, page)),
    htmlLang: getLanguageTag(lang),
    hreflang: getLanguageTag(lang),
    locale: getLocale(lang),
  }))
}

function normalizeWhitespace(value = '') {
  return value.replace(/\s+/g, ' ').trim()
}

function trimMetaDescription(value: string, lang: LangCode) {
  const clean = normalizeWhitespace(value)
  const maxLength = metaMaxLength[lang] ?? 158
  if (clean.length <= maxLength) return clean

  const finalize = (candidate: string) => {
    const normalized = normalizeWhitespace(candidate)
    if (normalized.length <= maxLength) return normalized
    return `${normalized.slice(0, maxLength - 1).trimEnd()}…`
  }

  const slice = clean.slice(0, maxLength)
  const breakpoint = Math.max(
    slice.lastIndexOf('. '),
    slice.lastIndexOf('؟ '),
    slice.lastIndexOf('۔ '),
    slice.lastIndexOf('، '),
    slice.lastIndexOf(', '),
    slice.lastIndexOf('؛ '),
    slice.lastIndexOf(' '),
  )

  if (breakpoint > Math.floor(maxLength * 0.65)) {
    return finalize(`${slice.slice(0, breakpoint).trimEnd()}…`)
  }

  return finalize(`${clean.slice(0, maxLength - 1).trimEnd()}…`)
}

function trimSeoTitle(value: string, lang: LangCode, maxLength = 60) {
  const clean = normalizeWhitespace(value)
  if (clean.length <= maxLength) return clean

  const brand = brandLabel[lang] ?? 'Diwan Suite'
  const withoutBrand = clean
    .replace(new RegExp(`\\s*[|–-]\\s*${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'), '')
    .replace(/\s*[|–-]\s*Diwan\s*Suite$/i, '')
    .trim()

  if (withoutBrand.length <= maxLength) return withoutBrand

  const slice = withoutBrand.slice(0, maxLength + 1)
  const breakpoint = Math.max(slice.lastIndexOf(' | '), slice.lastIndexOf(' – '), slice.lastIndexOf(' - '), slice.lastIndexOf(' '))
  if (breakpoint > Math.floor(maxLength * 0.6)) return `${slice.slice(0, breakpoint).trimEnd()}…`
  return `${withoutBrand.slice(0, maxLength - 1).trimEnd()}…`
}

const seoTitleOverrides: Partial<Record<LangCode, Partial<Record<StaticPage, string>>>> = {
  ar: {
    home: 'ديوان سويت | منصة حوكمة اجتماعات المجالس والقرارات',
    blog: 'مدونة حوكمة المجالس والقرارات | ديوان سويت',
    boardManagementSystem: 'نظام إدارة اجتماعات مجالس الإدارة | ديوان سويت',
    committeeManagementSoftware: 'برنامج إدارة اجتماعات اللجان | ديوان سويت',
    meetingMinutesEsignature: 'برنامج محاضر الاجتماعات والتوقيع الإلكتروني | ديوان سويت',
    decisionTracking: 'متابعة قرارات الاجتماعات والمجالس | ديوان سويت',
    generalAssemblyManagement: 'إدارة اجتماعات الجمعيات العمومية | ديوان سويت',
    attendanceQuorumQr: 'إدارة النصاب والتصويت والحضور | ديوان سويت',
    aiGovernanceDecisionSupport: 'الذكاء الاصطناعي في الاجتماعات والمحاضر | ديوان سويت',
    integrationsBoardGovernance: 'الأرشفة والربط المؤسسي للاجتماعات | ديوان سويت',
    governanceReportsDashboards: 'تقارير ولوحات حوكمة الاجتماعات | ديوان سويت',
    governanceSecurityCompliance: 'الامتثال والجاهزية الرقابية للاجتماعات | ديوان سويت',
    ministriesGovernmentEntitiesSector: 'حوكمة الوزارات والجهات الحكومية | ديوان سويت',
  },
  en: {
    home: 'Diwan Suite | Board Meeting Governance & Decision Execution',
    blog: 'Board Governance Resource Center & Blog | Diwan Suite',
    boardManagementSystem: 'Board Meeting Management System | Diwan Suite',
    committeeManagementSoftware: 'Committee Meeting Management Software | Diwan Suite',
    meetingMinutesEsignature: 'Meeting Minutes Software & E-Signature | Diwan Suite',
    decisionTracking: 'Meeting Decision Tracking & Execution | Diwan Suite',
    generalAssemblyManagement: 'General Assembly Meeting Management | Diwan Suite',
    attendanceQuorumQr: 'Attendance, Quorum & Voting Management | Diwan Suite',
    aiGovernanceDecisionSupport: 'AI for Meetings, Minutes & Decisions | Diwan Suite',
    integrationsBoardGovernance: 'Meeting Archiving & Enterprise Integration | Diwan Suite',
    governanceReportsDashboards: 'Meeting Governance Reports & Dashboards | Diwan Suite',
    governanceSecurityCompliance: 'Meeting Compliance & Audit Readiness | Diwan Suite',
    ministriesGovernmentEntitiesSector: 'Governance for Ministries & Public Entities | Diwan Suite',
  },
  hi: {
    home: 'Diwan Suite | बोर्ड मीटिंग गवर्नेंस और निर्णय निष्पादन',
    blog: 'बोर्ड गवर्नेंस ब्लॉग और संसाधन केंद्र | Diwan Suite',
    boardManagementSystem: 'बोर्ड मीटिंग प्रबंधन प्रणाली | Diwan Suite',
    committeeManagementSoftware: 'समिति मीटिंग प्रबंधन सॉफ़्टवेयर | Diwan Suite',
    meetingMinutesEsignature: 'मीटिंग मिनट्स सॉफ़्टवेयर और ई-हस्ताक्षर | Diwan Suite',
    decisionTracking: 'मीटिंग निर्णय ट्रैकिंग और निष्पादन | Diwan Suite',
    generalAssemblyManagement: 'सामान्य सभा मीटिंग प्रबंधन | Diwan Suite',
    attendanceQuorumQr: 'उपस्थिति, कोरम और मतदान प्रबंधन | Diwan Suite',
    aiGovernanceDecisionSupport: 'मीटिंग, मिनट्स और निर्णयों में AI | Diwan Suite',
    integrationsBoardGovernance: 'मीटिंग अभिलेख और एंटरप्राइज़ इंटीग्रेशन | Diwan Suite',
    governanceReportsDashboards: 'मीटिंग गवर्नेंस रिपोर्ट और डैशबोर्ड | Diwan Suite',
    governanceSecurityCompliance: 'मीटिंग अनुपालन और ऑडिट तैयारी | Diwan Suite',
    ministriesGovernmentEntitiesSector: 'मंत्रालयों और सार्वजनिक संस्थाओं की गवर्नेंस | Diwan Suite',
  },
  ur: {
    home: 'Diwan Suite | بورڈ میٹنگ گورننس اور فیصلہ نفاذ',
    blog: 'بورڈ گورننس بلاگ اور وسائل مرکز | Diwan Suite',
    boardManagementSystem: 'بورڈ میٹنگ مینجمنٹ سسٹم | Diwan Suite',
    committeeManagementSoftware: 'کمیٹی میٹنگ مینجمنٹ سافٹ ویئر | Diwan Suite',
    meetingMinutesEsignature: 'میٹنگ منٹس سافٹ ویئر اور ای-سگنیچر | Diwan Suite',
    decisionTracking: 'میٹنگ فیصلوں کی ٹریکنگ اور نفاذ | Diwan Suite',
    generalAssemblyManagement: 'جنرل اسمبلی میٹنگ مینجمنٹ | Diwan Suite',
    attendanceQuorumQr: 'حاضری، کورم اور ووٹنگ مینجمنٹ | Diwan Suite',
    aiGovernanceDecisionSupport: 'میٹنگز، محاضر اور فیصلوں میں AI | Diwan Suite',
    integrationsBoardGovernance: 'میٹنگ آرکائیونگ اور ادارہ جاتی انضمام | Diwan Suite',
    governanceReportsDashboards: 'میٹنگ گورننس رپورٹس اور ڈیش بورڈز | Diwan Suite',
    governanceSecurityCompliance: 'میٹنگ تعمیل اور آڈٹ تیاری | Diwan Suite',
    ministriesGovernmentEntitiesSector: 'وزارات اور سرکاری اداروں کی گورننس | Diwan Suite',
  },
}

const seoDescriptionOverrides: Partial<Record<LangCode, Partial<Record<StaticPage, string>>>> = {
  ar: {
    home: 'ديوان سويت منصة حوكمة مجالس الإدارة واللجان تُدير القرارات والمحاضر والتنفيذ والامتثال في بيئة مؤسسية واحدة مدعومة بالذكاء الاصطناعي وجاهزة للجهات السعودية.',
    blog: 'مقالات عملية عن حوكمة مجالس الإدارة، إدارة اللجان، محاضر الاجتماعات بالذكاء الاصطناعي، متابعة القرارات، والامتثال المؤسسي في السوق السعودي والخليجي.',
    about: 'تعرّف على ديوان سويت، منصة سعودية لإدارة اجتماعات المجالس واللجان ومحاضرها وقراراتها ومتابعة تنفيذها مع استضافة محلية ودعم تنفيذي.',
    boardManagementSystem: 'نظام لإدارة اجتماعات مجالس الإدارة والمحاضر والاعتماد والقرارات والتنفيذ، مع سجل تدقيق وتقارير حوكمة للإدارة العليا.',
    committeeManagementSoftware: 'برنامج لإدارة اجتماعات اللجان وتوصياتها ومحاضرها ومتابعة تنفيذها، مع تنظيم العضويات والاعتماد والتقارير.',
    meetingMinutesEsignature: 'برنامج محاضر الاجتماعات لإعداد المحاضر واعتمادها وتوقيعها إلكترونياً وربطها بالقرارات والمرفقات وسجل التدقيق.',
    decisionTracking: 'منصة لمتابعة قرارات الاجتماعات والمجالس واللجان وتحويلها إلى مهام بمسؤوليات واضحة وتنبيهات وتقارير تنفيذية.',
    generalAssemblyManagement: 'حل لإدارة اجتماعات الجمعيات العمومية يشمل الدعوات والحضور والنصاب والتصويت والمحاضر والاعتماد والأرشفة.',
    attendanceQuorumQr: 'إدارة حضور الاجتماعات والنصاب النظامي والتصويت وربط النتائج بالمحاضر والتقارير ولوحات المتابعة داخل ديوان سويت.',
    aiGovernanceDecisionSupport: 'ذكاء اصطناعي لاجتماعات المجالس واللجان يساعد على التلخيص واستخراج القرارات وإعداد المحاضر وتحسين المتابعة دون إلغاء المراجعة البشرية.',
    integrationsBoardGovernance: 'أرشفة المحاضر والقرارات وربط اجتماعات المجالس بالأنظمة المؤسسية والتقويمات ومنصات الاجتماعات داخل منظومة رقمية موحدة.',
    governanceReportsDashboards: 'تقارير ولوحات تحكم لقياس حضور الاجتماعات والنصاب وسرعة اعتماد المحاضر ونسب تنفيذ القرارات وجاهزية الامتثال.',
    governanceSecurityCompliance: 'ضوابط أمن وامتثال لتأمين اجتماعات المجالس واللجان ومحاضرها وقراراتها بسجل تدقيق وتشفير وجاهزية أعلى للتدقيق.',
  },
  en: {
    home: 'Diwan Suite is a board governance platform for managing committees, meetings, minutes, decisions, and execution follow-up in one AI-assisted compliance-ready environment built for Saudi organizations.',
    blog: 'Practical articles on board governance, committee management, AI-assisted meeting minutes, decision tracking, and institutional compliance for Saudi and Gulf organizations.',
    about: 'Learn how Diwan Suite supports board and committee meetings, minutes, decisions, and governance follow-up for Saudi organizations with local hosting.',
    boardManagementSystem: 'Manage board meetings, minutes, approvals, decisions, and execution follow-up in one auditable governance workflow.',
    committeeManagementSoftware: 'Manage committee meetings, recommendations, minutes, memberships, and execution follow-up with a structured governance workflow.',
    meetingMinutesEsignature: 'Prepare meeting minutes, route approvals, apply e-signature, and preserve audit-ready records linked to decisions and attachments.',
    decisionTracking: 'Track meeting decisions, assign owners and deadlines, and monitor execution through alerts, escalation, and executive reporting.',
    generalAssemblyManagement: 'Manage general assembly meetings with invitations, attendance, quorum, voting, minutes, approvals, and archival control.',
    attendanceQuorumQr: 'Capture attendance, calculate quorum, support controlled voting, and feed meeting minutes and dashboards with reliable participation data.',
    aiGovernanceDecisionSupport: 'Use AI for meeting summaries, minutes drafting, decision extraction, and structured follow-up while keeping final approval human-led.',
    integrationsBoardGovernance: 'Connect meeting workflows with calendars, conferencing tools, archiving, and enterprise systems to keep records and decisions synchronized.',
    governanceReportsDashboards: 'Executive dashboards for meeting attendance, quorum, minutes approval, decision execution, and governance reporting.',
    governanceSecurityCompliance: 'Protect board and committee meeting records with audit trails, encryption, permissions, and compliance-ready controls.',
  },
  hi: {
    home: 'Diwan Suite बोर्ड और समिति बैठकों, मिनट्स, निर्णयों, निष्पादन अनुवर्ती और अनुपालन को एक AI-सहायित गवर्नेंस प्लेटफ़ॉर्म में संगठित करता है।',
    blog: 'बोर्ड गवर्नेंस, समिति प्रबंधन, AI मीटिंग मिनट्स, निर्णय ट्रैकिंग और संस्थागत अनुपालन पर व्यावहारिक लेख — सऊदी और खाड़ी देशों के संगठनों के लिए।',
    about: 'जानें कि Diwan Suite सऊदी संगठनों में बोर्ड और समिति बैठकों, मिनट्स, निर्णयों और गवर्नेंस अनुवर्ती को कैसे समर्थन देता है।',
    boardManagementSystem: 'बोर्ड बैठकों, मिनट्स, अनुमोदन, निर्णयों और निष्पादन अनुवर्ती को एक audit-ready governance workflow में प्रबंधित करें।',
    committeeManagementSoftware: 'समिति बैठकों, सिफारिशों, मिनट्स, सदस्यताओं और निष्पादन अनुवर्ती को एक structured governance workflow में प्रबंधित करें।',
    meetingMinutesEsignature: 'मीटिंग मिनट्स तैयार करें, अनुमोदन चलाएँ, ई-हस्ताक्षर लागू करें और निर्णयों व संलग्नकों से जुड़े audit-ready records सुरक्षित रखें।',
    decisionTracking: 'मीटिंग निर्णयों को ट्रैक करें, owner और deadline तय करें, और alerts, escalation तथा reporting के साथ निष्पादन देखें।',
    generalAssemblyManagement: 'सामान्य सभा बैठकों को invitations, attendance, quorum, voting, minutes, approvals और archival control सहित प्रबंधित करें।',
    attendanceQuorumQr: 'उपस्थिति दर्ज करें, quorum गणना करें, voting को समर्थन दें और meeting minutes तथा dashboards को भरोसेमंद सहभागिता डेटा दें।',
    aiGovernanceDecisionSupport: 'मीटिंग summaries, minutes drafting, decision extraction और structured follow-up के लिए AI का उपयोग करें, जबकि final approval मानव के पास रहे।',
    integrationsBoardGovernance: 'मीटिंग workflows को calendars, conferencing tools, archiving और enterprise systems से जोड़कर records और decisions को synchronized रखें।',
    governanceReportsDashboards: 'मीटिंग attendance, quorum, minutes approval, decision execution और governance reporting के लिए executive dashboards।',
    governanceSecurityCompliance: 'बोर्ड और समिति मीटिंग records को audit trails, encryption, permissions और compliance-ready controls के साथ सुरक्षित रखें।',
  },
  ur: {
    home: 'Diwan Suite بورڈ اور کمیٹی میٹنگز، محاضر، فیصلوں، نفاذی فالو اپ اور تعمیل کو ایک AI-assisted governance platform میں منظم کرتا ہے۔',
    blog: 'بورڈ گورننس، کمیٹی مینجمنٹ، AI میٹنگ محاضر، فیصلہ ٹریکنگ اور ادارہ جاتی تعمیل پر عملی مضامین — سعودی اور خلیجی اداروں کے لیے۔',
    about: 'جانیں کہ Diwan Suite سعودی اداروں میں بورڈ اور کمیٹی میٹنگز، محاضر، فیصلوں اور گورننس فالو اپ کو کیسے سپورٹ کرتا ہے۔',
    boardManagementSystem: 'بورڈ میٹنگز، محاضر، منظوری، فیصلوں اور نفاذی فالو اپ کو ایک audit-ready governance workflow میں منظم کریں۔',
    committeeManagementSoftware: 'کمیٹی میٹنگز، سفارشات، محاضر، ممبرشپس اور نفاذی فالو اپ کو ایک structured governance workflow میں منظم کریں۔',
    meetingMinutesEsignature: 'میٹنگ منٹس تیار کریں، approvals چلائیں، e-signature لگائیں اور decisions و attachments سے منسلک audit-ready records محفوظ رکھیں۔',
    decisionTracking: 'میٹنگ فیصلوں کو track کریں، owner اور deadline طے کریں، اور alerts، escalation اور reporting کے ساتھ نفاذ دیکھیں۔',
    generalAssemblyManagement: 'جنرل اسمبلی میٹنگز کو invitations، attendance، quorum، voting، minutes، approvals اور archival control سمیت منظم کریں۔',
    attendanceQuorumQr: 'حاضری ریکارڈ کریں، quorum calculate کریں، voting کو سپورٹ کریں اور meeting minutes و dashboards کو reliable participation data دیں۔',
    aiGovernanceDecisionSupport: 'meeting summaries، minutes drafting، decision extraction اور structured follow-up کے لیے AI استعمال کریں، جبکہ final approval انسان کے پاس رہے۔',
    integrationsBoardGovernance: 'meeting workflows کو calendars، conferencing tools، archiving اور enterprise systems سے جوڑ کر records اور decisions کو synchronized رکھیں۔',
    governanceReportsDashboards: 'meeting attendance، quorum، minutes approval، decision execution اور governance reporting کے لیے executive dashboards۔',
    governanceSecurityCompliance: 'بورڈ اور کمیٹی meeting records کو audit trails، encryption، permissions اور compliance-ready controls کے ساتھ محفوظ رکھیں۔',
  },
}

function getSeoOverride<T extends 'title' | 'description'>(kind: T, lang: LangCode, page: StaticPage): string | null {
  const source = kind === 'title' ? seoTitleOverrides : seoDescriptionOverrides
  return source[lang]?.[page] ?? null
}

function sanitizeMetaPart(value?: string | null) {
  if (!value) return ''
  return normalizeWhitespace(
    value
      .split(/(?<=[.!؟۔])\s+/)
      .filter((sentence) => sentence && !/(^this page\b|\bpage\b.*explains|^صفحة\b|\bتعرض\b|ページ|页面|^diese seite\b|^cette page\b)/i.test(sentence.trim()))
      .join(' '),
  )
}

function sentenceize(parts: string[]) {
  return parts
    .map((part) => normalizeWhitespace(part))
    .filter(Boolean)
    .filter((part, index, array) => array.findIndex((candidate) => candidate.toLowerCase() === part.toLowerCase()) === index)
    .join(' ')
}

function getPageTemplateKey(page: StaticPage) {
  if (page === 'about') return 'about'
  const category = getPageCategory(page)
  if (category === 'legal') return 'legal'
  return category
}

function buildFallbackDescription(lang: LangCode, page: StaticPage, pageTitle: string) {
  const templateKey = getPageTemplateKey(page)
  const template = pageTypeDescriptionTemplates[lang]?.[templateKey] ?? pageTypeDescriptionTemplates.ar?.core
  return trimMetaDescription(template?.(pageTitle) ?? pageTitle, lang)
}

function buildInternalDescription(lang: LangCode, page: StaticPage, copy: InternalPageCopy) {
  const summary = sanitizeMetaPart(copy.summary)
  const definition = sanitizeMetaPart(copy.definition)
  const solve = sanitizeMetaPart(copy.whatItSolves?.[0])
  const sectionLead = sanitizeMetaPart(copy.sections[0]?.body?.[0])
  const templateDescription = buildFallbackDescription(lang, page, copy.title)

  const assembled = sentenceize([
    summary,
    definition,
    solve,
    sectionLead,
  ])

  const minimum = metaMinLength[lang] ?? 100
  if (assembled.length >= minimum) return trimMetaDescription(assembled, lang)
  return trimMetaDescription(sentenceize([assembled, templateDescription]), lang)
}

function buildSeoTitle(lang: LangCode, page: StaticPage, homeTitle: string, pageDetails: InternalPageCopy | null) {
  const override = getSeoOverride('title', lang, page)
  if (override) return trimSeoTitle(override, lang)

  const base = normalizeWhitespace(page === 'home' ? homeTitle : pageDetails?.seoTitle || pageDetails?.title || '')
  const brand = brandLabel[lang] ?? 'Diwan Suite'
  const titled = /diwan\s*suite|ديوان\s*سويت/i.test(base) ? base : `${base} | ${brand}`
  return trimSeoTitle(titled, lang)
}

function buildSeoDescription(lang: LangCode, page: StaticPage, homeDescription: string, pageDetails: InternalPageCopy | null) {
  const override = getSeoOverride('description', lang, page)
  if (override) return trimMetaDescription(override, lang)
  if (page === 'home') return trimMetaDescription(homeDescription, lang)
  if (pageDetails) return buildInternalDescription(lang, page, pageDetails)
  return buildFallbackDescription(lang, page, page)
}

function buildFaqSchemaItems(items: Array<{ q: string; a: string }>, lang: LangCode) {
  const seen = new Set<string>()
  return items
    .filter((item) => {
      const key = normalizeWhitespace(item.q).toLowerCase()
      if (!key || seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map((item) => ({
      '@type': 'Question',
      name: item.q,
      inLanguage: getLanguageTag(lang),
      acceptedAnswer: { '@type': 'Answer', text: item.a, inLanguage: getLanguageTag(lang) },
    }))
}


function getPageFaq(lang: LangCode, page: Exclude<StaticPage, 'home'>) {
  const items = pageCopy[lang][page].faq ?? []
  if (!items.length) return []
  return buildFaqSchemaItems(items, lang)
}

function getHomeFaq(lang: LangCode) {
  const homeAeo = getHomeAeoContent(lang)
  const items = homeAeo.faq?.items ?? []
  if (!items.length) return []
  return buildFaqSchemaItems(items, lang)
}



function getAudienceList(page: StaticPage, lang: LangCode) {
  if (page === 'home') return []
  const pageDetails = pageCopy[lang][page as Exclude<StaticPage, 'home'>]
  return pageDetails?.whoFor ?? []
}

function buildHowItWorksSchema(lang: LangCode, page: StaticPage, canonical: string) {
  if (page === 'home') return null

  const items = pageCopy[lang][page as Exclude<StaticPage, 'home'>]?.howItWorks ?? []
  if (items.length < 2) return null

  const listName = lang === 'ar' ? 'كيف يعمل' : lang === 'hi' ? 'यह कैसे काम करता है' : lang === 'ur' ? 'یہ کیسے کام کرتا ہے' : 'How it works'

  return {
    '@id': `${canonical}#workflow`,
    '@type': 'ItemList',
    name: listName,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
    })),
  }
}

function buildHomeDecisionJourneySchema(lang: LangCode, canonical: string) {
  const items = getHomeAeoContent(lang).cards.howItWorks.items
  if (items.length < 2) return null

  const listName = lang === 'ar'
    ? 'رحلة القرار من الاجتماع إلى التنفيذ'
    : lang === 'hi'
    ? 'मीटिंग से निर्णय निष्पादन तक की यात्रा'
    : lang === 'ur'
    ? 'اجلاس سے فیصلہ نفاذ تک کا سفر'
    : 'Decision journey from meeting to execution'

  return {
    '@id': canonical + '#decision-journey',
    '@type': 'ItemList',
    name: listName,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    inLanguage: getLanguageTag(lang),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
    })),
  }
}

function buildServiceSchema(lang: LangCode, page: StaticPage, title: string, description: string, canonical: string, organizationId: string) {
  const category = getPageCategory(page)
  if (page === 'home' || category === 'seo' || category === 'legal' || page === 'about' || page === 'privacy' || page === 'terms' || page === 'blog') return null

  const audiences = getAudienceList(page, lang)
  return {
    '@id': `${canonical}#service`,
    '@type': 'Service',
    name: title,
    description,
    serviceType: title,
    provider: { '@id': organizationId },
    areaServed: SITE_CONFIG.areaServed,
    audience: audiences.map((audience) => ({ '@type': 'Audience', audienceType: audience })),
    inLanguage: getLanguageTag(lang),
    url: canonical,
  }
}

const softwareAppNames: Partial<Record<LangCode, string>> = {
  ar: 'ديوان سويت — منصة حوكمة المجالس والقرارات',
  en: 'Diwan Suite — Board Governance & Decision Platform',
  hi: 'Diwan Suite — बोर्ड गवर्नेंस और निर्णय प्लेटफ़ॉर्म',
  ur: 'Diwan Suite — بورڈ گورننس اور فیصلہ پلیٹ فارم',
}

function buildSoftwareApplicationSchema(lang: LangCode, organizationId: string): object {
  return {
    '@type': 'SoftwareApplication',
    name: softwareAppNames[lang] ?? softwareAppNames.en,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: '750',
      availability: 'https://schema.org/InStock',
    },
    provider: { '@id': organizationId },
    inLanguage: SUPPORTED_LANGS.map((code) => getLanguageTag(code)),
    url: buildAbsoluteUrl(buildLocalizedPath(lang, 'home')),
  }
}

function buildStructuredData(lang: LangCode, page: StaticPage, title: string, description: string, canonical: string, breadcrumbName: string) {
  const websiteUrl = buildAbsoluteUrl(buildLocalizedPath(DEFAULT_LANG, 'home'))
  const organizationId = `${websiteUrl}#organization`
  const websiteId = `${websiteUrl}#website`
  const pageId = `${canonical}#webpage`
  const breadcrumbId = `${canonical}#breadcrumb`
  const faqId = `${canonical}#faq`
  const pageCategory = getPageCategory(page)
  const pageFaq = page === 'home'
    ? getHomeFaq(lang)
    : page === 'blog' || pageCategory === 'seo'
    ? []
    : getPageFaq(lang, page as Exclude<StaticPage, 'home'>)
  const serviceSchema = buildServiceSchema(lang, page, title, description, canonical, organizationId)
  const howItWorksSchema = buildHowItWorksSchema(lang, page, canonical)
  const homeDecisionJourneySchema = page === 'home' ? buildHomeDecisionJourneySchema(lang, canonical) : null
  const audiences = getAudienceList(page, lang)

  const graph: unknown[] = [
    {
      '@id': organizationId,
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      alternateName: SITE_CONFIG.arabicName,
      legalName: SITE_CONFIG.operatorName,
      url: websiteUrl,
      logo: {
        '@type': 'ImageObject',
        url: buildAbsoluteUrl('/logo-diwan.svg'),
      },
      telephone: SITE_CONFIG.phone,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: SITE_CONFIG.phone,
          url: buildAbsoluteUrl(buildLocalizedPath(DEFAULT_LANG, 'home', '#booking-cta')),
          availableLanguage: SUPPORTED_LANGS.map((code) => getLanguageTag(code)),
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.region,
        addressCountry: SITE_CONFIG.address.countryCode,
      },
      areaServed: SITE_CONFIG.areaServed,
    },
    {
      '@id': websiteId,
      '@type': 'WebSite',
      url: websiteUrl,
      name: SITE_CONFIG.name,
      publisher: { '@id': organizationId },
      inLanguage: SUPPORTED_LANGS.map((code) => getLanguageTag(code)),
    },
    {
      '@id': pageId,
      '@type': 'WebPage',
      url: canonical,
      name: title,
      description,
      inLanguage: getLanguageTag(lang),
      dateModified: getPageDateModified(page),
      isAccessibleForFree: true,
      isPartOf: { '@id': websiteId },
      breadcrumb: { '@id': breadcrumbId },
      ...(audiences.length ? { audience: audiences.map((audience) => ({ '@type': 'Audience', audienceType: audience })) } : {}),
      ...(serviceSchema ? { about: { '@id': `${canonical}#service` } } : {}),
      ...(pageFaq.length ? { mainEntity: { '@id': faqId } } : {}),
    },
    {
      '@id': breadcrumbId,
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: extraCopy[lang].breadcrumbsHome,
          item: buildAbsoluteUrl(buildLocalizedPath(lang, 'home')),
        },
        ...(page === 'home'
          ? []
          : [
              {
                '@type': 'ListItem',
                position: 2,
                name: breadcrumbName,
                item: canonical,
              },
            ]),
      ],
    },
  ]

  if (page === 'home') {
    graph.push(buildSoftwareApplicationSchema(lang, organizationId))
  }

  if (serviceSchema) {
    graph.push(serviceSchema)
  }

  if (howItWorksSchema) {
    graph.push(howItWorksSchema)
  }

  if (homeDecisionJourneySchema) {
    graph.push(homeDecisionJourneySchema)
  }

  if (pageFaq.length) {
    graph.push({
      '@id': faqId,
      '@type': 'FAQPage',
      mainEntity: pageFaq,
    })
  }

  return graph
}

export function getSeoPayload(lang: LangCode, page: StaticPage): SeoPayload {
  const home = siteContent[lang]
  const pageDetails = getPageCopyForSeo(lang, page)
  const path = buildLocalizedPath(lang, page)
  const canonical = buildAbsoluteUrl(path)
  const alternates = getAlternateLinks(page)
  const xDefaultHref = buildAbsoluteUrl(buildLocalizedPath(DEFAULT_LANG, page))
  const ogImage = getOgImagePath(page)
  const title = buildSeoTitle(lang, page, home.pageTitle, pageDetails)
  const description = buildSeoDescription(lang, page, home.metaDescription, pageDetails)
  const breadcrumbName = page === 'home' ? extraCopy[lang].breadcrumbsHome : pageDetails?.title || title
  const structuredData = buildStructuredData(lang, page, title, description, canonical, breadcrumbName)

  return {
    title,
    description,
    canonical,
    pagePath: path,
    locale: getLocale(lang),
    htmlLang: getLanguageTag(lang),
    hreflang: getLanguageTag(lang),
    dir: home.dir,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageAlt: page === 'about'
      ? SITE_CONFIG.ogImageAlt.about
      : page === 'privacy'
      ? SITE_CONFIG.ogImageAlt.privacy
      : page === 'terms'
      ? SITE_CONFIG.ogImageAlt.terms
      : SITE_CONFIG.ogImageAlt.home,
    breadcrumbName,
    alternates,
    xDefaultHref,
    structuredData,
  }
}
