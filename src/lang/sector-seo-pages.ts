import type { LangCode } from './types'
import type { InternalPageCopy, PageSection } from './extra'
export type SectorSeoPageKey =
  | 'familyBusinessGovernanceSoftware'
  | 'jointStockCompaniesGovernanceSoftware'
  | 'banksBoardCommitteeGovernanceSoftware'
  | 'universitiesBoardGovernanceSoftware'
  | 'healthcareGovernanceMeetingsSoftware'
  | 'nonprofitGovernanceMeetingsSoftware'
  | 'realEstateDeveloperGovernanceSoftware'
  | 'auditCommitteeManagementSoftware'
  | 'riskCommitteeManagementSoftware'
  | 'nominationRemunerationCommitteeManagement'

type Localized = Record<LangCode, string>
type LocalizedList = Record<LangCode, string[]>

type SectorSeed = {
  key: SectorSeoPageKey
  titles: Localized
  seoTitles: Localized
  seoDescriptions: Localized
  summaries: Localized
  definitions: Localized
  keywords: LocalizedList
  audiences: LocalizedList
  challenges: LocalizedList
  outputs: LocalizedList
  workflow: LocalizedList
  useCase: Localized
  relatedPages: string[]
}

const ui: Record<LangCode, {
  eyebrow: string
  executiveSummary: string
  directAnswer: string
  sectorChallenges: string
  platformFit: string
  governanceOutputs: string
  operatingJourney: string
  useCase: string
  roleTable: string
  role: string
  need: string
  systemRole: string
  faqTitle: string
  ctaTitle: string
  ctaBody: string
  ctaPrimary: string
  ctaSecondary: string
}> = {
  ar: {
    eyebrow: 'صفحات قطاعات SEO', executiveSummary: 'ملخص تنفيذي', directAnswer: 'إجابة مباشرة', sectorChallenges: 'تحديات القطاع', platformFit: 'كيف يخدم ديوان سويت هذا القطاع', governanceOutputs: 'مخرجات الحوكمة المتوقعة', operatingJourney: 'رحلة التشغيل داخل الجهة', useCase: 'سيناريو تطبيقي', roleTable: 'الأدوار المستفيدة داخل القطاع', role: 'الدور', need: 'الاحتياج', systemRole: 'دور ديوان سويت', faqTitle: 'أسئلة شائعة للقطاع', ctaTitle: 'حوكمة القطاع تبدأ من اجتماع موثق', ctaBody: 'احجز عرضًا توضيحيًا لعرض كيفية تطبيق ديوان سويت على طبيعة مجالسكم ولجانكم واجتماعاتكم.', ctaPrimary: 'احجز عرضًا توضيحيًا', ctaSecondary: 'تواصل مع الفريق'
  },
  en: {
    eyebrow: 'Sector SEO pages', executiveSummary: 'Executive summary', directAnswer: 'Direct answer', sectorChallenges: 'Sector challenges', platformFit: 'How Diwan Suite fits this sector', governanceOutputs: 'Expected governance outputs', operatingJourney: 'Operating journey inside the organization', useCase: 'Practical use case', roleTable: 'Benefiting roles in this sector', role: 'Role', need: 'Need', systemRole: 'Diwan Suite role', faqTitle: 'Sector FAQs', ctaTitle: 'Sector governance starts with an auditable meeting', ctaBody: 'Book a tailored walkthrough to see how Diwan Suite fits your boards, committees, and formal meetings.', ctaPrimary: 'Book a Demo', ctaSecondary: 'Talk to the team'
  },
  hi: {
    eyebrow: 'सेक्टर SEO पृष्ठ', executiveSummary: 'कार्यकारी सारांश', directAnswer: 'सीधा उत्तर', sectorChallenges: 'क्षेत्र की चुनौतियाँ', platformFit: 'Diwan Suite इस क्षेत्र में कैसे फिट होता है', governanceOutputs: 'अपेक्षित गवर्नेंस आउटपुट', operatingJourney: 'संगठन के अंदर संचालन यात्रा', useCase: 'व्यावहारिक उपयोग परिदृश्य', roleTable: 'इस क्षेत्र में लाभ पाने वाली भूमिकाएँ', role: 'भूमिका', need: 'आवश्यकता', systemRole: 'Diwan Suite की भूमिका', faqTitle: 'क्षेत्र से जुड़े प्रश्न', ctaTitle: 'क्षेत्रीय गवर्नेंस एक दस्तावेज़ीकृत बैठक से शुरू होती है', ctaBody: 'अपने boards, committees और formal meetings के लिए Diwan Suite का उपयुक्त डेमो बुक करें।', ctaPrimary: 'डेमो बुक करें', ctaSecondary: 'टीम से बात करें'
  },
  ur: {
    eyebrow: 'سیکٹر SEO صفحات', executiveSummary: 'انتظامی خلاصہ', directAnswer: 'براہِ راست جواب', sectorChallenges: 'شعبے کے چیلنجز', platformFit: 'Diwan Suite اس شعبے میں کیسے فٹ ہوتا ہے', governanceOutputs: 'متوقع گورننس نتائج', operatingJourney: 'ادارے کے اندر آپریشنل سفر', useCase: 'عملی استعمال کا منظرنامہ', roleTable: 'اس شعبے میں فائدہ اٹھانے والے کردار', role: 'کردار', need: 'ضرورت', systemRole: 'Diwan Suite کا کردار', faqTitle: 'شعبے سے متعلق سوالات', ctaTitle: 'شعبے کی گورننس ایک دستاویزی اجلاس سے شروع ہوتی ہے', ctaBody: 'اپنے boards، committees اور formal meetings کے مطابق Diwan Suite کا موزوں ڈیمو بک کریں۔', ctaPrimary: 'ڈیمو بک کریں', ctaSecondary: 'ٹیم سے بات کریں'
  },
}

const common = {
  ar: {
    who: ['أمانة المجلس واللجان', 'الإدارة التنفيذية', 'الحوكمة والامتثال والمراجعة الداخلية'],
    workflow: ['تهيئة الكيان واللجان والصلاحيات', 'إدارة الدعوات وجدول الأعمال والمرفقات', 'توثيق المحاضر والقرارات وتحويلها إلى متابعة وتقارير'],
    faq: [
      ['هل الصفحة مخصصة لهذا القطاع؟', 'نعم، صيغت الصفحة لتوضيح كيف يدعم ديوان سويت متطلبات هذا القطاع من حيث الاجتماعات والمحاضر والقرارات والامتثال.'],
      ['هل يمكن ضبط الصلاحيات حسب الأدوار؟', 'نعم، يمكن ضبط الصلاحيات ومسارات الاعتماد وفق دور المستخدم وحساسية الاجتماع أو الوثيقة.'],
      ['هل يدعم النظام التقارير التنفيذية؟', 'نعم، يوفر ديوان سويت تقارير ولوحات متابعة تساعد الإدارة العليا على رؤية حالة الاجتماعات والقرارات والتنفيذ.'],
      ['هل يؤثر ذلك على الهيدر أو قوائم الموقع؟', 'لا، هذه الصفحة مستقلة للبحث والمحتوى ولا تغيّر قوائم الهيدر أو الحلول أو القطاعات.'],
    ],
  },
  en: {
    who: ['Board and committee secretariat', 'Executive management', 'Governance, compliance, and internal audit'],
    workflow: ['Configure the entity, committees, and permissions', 'Manage invitations, agendas, and attachments', 'Document minutes and decisions, then turn them into follow-up and reports'],
    faq: [
      ['Is this page specific to the sector?', 'Yes. It explains how Diwan Suite supports the sector with meetings, minutes, decisions, compliance, and follow-up.'],
      ['Can permissions be configured by role?', 'Yes. Permissions and approval paths can be configured by user role, meeting sensitivity, and document type.'],
      ['Does the system support executive reporting?', 'Yes. Diwan Suite provides dashboards and reports for meetings, decisions, execution status, and governance indicators.'],
      ['Does this change the site header or menus?', 'No. This is an independent SEO content page and does not change the header, solutions menu, or sectors menu.'],
    ],
  },
  hi: {
    who: ['बोर्ड और समिति सचिवालय', 'कार्यकारी प्रबंधन', 'गवर्नेंस, अनुपालन और आंतरिक ऑडिट'],
    workflow: ['इकाई, समितियों और अनुमतियों को कॉन्फ़िगर करना', 'निमंत्रण, एजेंडा और संलग्नक प्रबंधित करना', 'मिनट्स और निर्णयों को दस्तावेज़ कर उन्हें फॉलो-अप और रिपोर्ट में बदलना'],
    faq: [
      ['क्या यह पृष्ठ इस क्षेत्र के लिए विशिष्ट है?', 'हाँ। यह बताता है कि Diwan Suite इस क्षेत्र की meetings, minutes, decisions, compliance और follow-up आवश्यकताओं को कैसे समर्थन देता है।'],
      ['क्या अनुमतियाँ भूमिका के अनुसार सेट हो सकती हैं?', 'हाँ। अनुमतियाँ और approval paths user role, meeting sensitivity और document type के अनुसार सेट किए जा सकते हैं।'],
      ['क्या executive reporting समर्थित है?', 'हाँ। Diwan Suite meetings, decisions, execution status और governance indicators के लिए dashboards और reports देता है।'],
      ['क्या इससे site header या menus बदलते हैं?', 'नहीं। यह एक स्वतंत्र SEO content page है और header, solutions menu या sectors menu को नहीं बदलता।'],
    ],
  },
  ur: {
    who: ['بورڈ اور کمیٹی سیکریٹریٹ', 'ایگزیکٹو مینجمنٹ', 'گورننس، تعمیل اور داخلی آڈٹ'],
    workflow: ['ادارے، کمیٹیوں اور اجازتوں کو ترتیب دینا', 'دعوتوں، ایجنڈا اور منسلکات کا انتظام', 'محاضر اور فیصلوں کو دستاویز کر کے فالو اپ اور رپورٹس میں بدلنا'],
    faq: [
      ['کیا یہ صفحہ اس شعبے کے لیے مخصوص ہے؟', 'جی ہاں، یہ بتاتا ہے کہ Diwan Suite اس شعبے میں meetings، minutes، decisions، compliance اور follow-up کو کیسے سپورٹ کرتا ہے۔'],
      ['کیا اجازتیں کردار کے مطابق سیٹ ہو سکتی ہیں؟', 'جی ہاں، permissions اور approval paths user role، meeting sensitivity اور document type کے مطابق سیٹ کیے جا سکتے ہیں۔'],
      ['کیا executive reporting دستیاب ہے؟', 'جی ہاں، Diwan Suite meetings، decisions، execution status اور governance indicators کے لیے dashboards اور reports فراہم کرتا ہے۔'],
      ['کیا اس سے site header یا menus بدلتے ہیں؟', 'نہیں، یہ ایک independent SEO content page ہے اور header، solutions menu یا sectors menu کو تبدیل نہیں کرتا۔'],
    ],
  },
}

const seeds: SectorSeed[] = [
  {
    key: 'familyBusinessGovernanceSoftware',
    titles: { ar: 'برنامج حوكمة الشركات العائلية', en: 'Family Business Governance Software', hi: 'फैमिली बिज़नेस गवर्नेंस सॉफ्टवेयर', ur: 'فیملی بزنس گورننس سافٹ ویئر' },
    seoTitles: { ar: 'برنامج حوكمة الشركات العائلية | ديوان سويت', en: 'Family Business Governance Software | Diwan Suite', hi: 'फैमिली बिज़नेस गवर्नेंस सॉफ्टवेयर | Diwan Suite', ur: 'فیملی بزنس گورننس سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج حوكمة الشركات العائلية لتنظيم اجتماعات المجلس واللجان والقرارات ومحاضر الشركاء والمتابعة التنفيذية داخل منصة موثقة.', en: 'Family business governance software for board meetings, committees, minutes, decisions, partner records, and executive follow-up.', hi: 'Family business governance software बोर्ड मीटिंग, committees, minutes, decisions और executive follow-up के लिए।', ur: 'Family business governance software بورڈ meetings، committees، minutes، decisions اور executive follow-up کے لیے۔' },
    summaries: { ar: 'تحتاج الشركات العائلية إلى مسار واضح يحفظ قرارات الشركاء ومجالس الإدارة ويقلل الاعتماد على المحادثات غير الموثقة.', en: 'Family businesses need a clear governance workflow that protects partner decisions, board records, and accountability beyond informal communication.', hi: 'Family businesses को partner decisions, board records और accountability के लिए informal communication से आगे स्पष्ट governance workflow चाहिए।', ur: 'Family businesses کو partner decisions، board records اور accountability کے لیے informal communication سے آگے واضح governance workflow چاہیے۔' },
    definitions: { ar: 'برنامج حوكمة الشركات العائلية هو حل يساعد العائلة المالكة والإدارة على توثيق الاجتماعات والقرارات والصلاحيات والمتابعة في سجل مؤسسي واضح.', en: 'Family business governance software helps owners and management document meetings, decisions, permissions, and follow-up in a clear institutional record.', hi: 'Family business governance software owners और management को meetings, decisions, permissions और follow-up को स्पष्ट institutional record में दस्तावेज़ करने में मदद करता है।', ur: 'Family business governance software owners اور management کو meetings، decisions، permissions اور follow-up کو واضح institutional record میں دستاویز کرنے میں مدد دیتا ہے۔' },
    keywords: { ar: ['حوكمة الشركات العائلية', 'برنامج حوكمة الشركات العائلية', 'إدارة مجالس الشركات العائلية'], en: ['family business governance software', 'family company board governance'], hi: ['family business governance software', 'family company governance'], ur: ['family business governance software', 'family company governance'] },
    audiences: { ar: ['مجلس العائلة والشركاء', 'أمانة مجلس الإدارة', 'الإدارة التنفيذية والمالية'], en: ['Family council and partners', 'Board secretariat', 'Executive and finance management'], hi: ['Family council और partners', 'Board secretariat', 'Executive और finance management'], ur: ['Family council اور partners', 'Board secretariat', 'Executive اور finance management'] },
    challenges: { ar: ['تداخل العلاقات العائلية مع القرار المؤسسي', 'تشتت المحاضر والاعتمادات بين الشركاء', 'صعوبة متابعة قرارات المجلس والإدارة التنفيذية'], en: ['Family relationships overlap with institutional decision-making', 'Minutes and approvals are scattered across partners', 'Board decisions and executive follow-up become difficult to track'], hi: ['Family relationships institutional decisions से जुड़ जाती हैं', 'Minutes और approvals partners के बीच बिखर जाते हैं', 'Board decisions और executive follow-up ट्रैक करना कठिन होता है'], ur: ['Family relationships institutional decisions کے ساتھ مل جاتی ہیں', 'Minutes اور approvals partners کے درمیان بکھر جاتے ہیں', 'Board decisions اور executive follow-up ٹریک کرنا مشکل ہوتا ہے'] },
    outputs: { ar: ['محاضر معتمدة للشركاء والمجلس', 'سجل قرارات عائلي ومؤسسي', 'تقارير تنفيذية للمتابعة والحوكمة'], en: ['Approved partner and board minutes', 'Family and institutional decision register', 'Executive follow-up and governance reports'], hi: ['Approved partner और board minutes', 'Family और institutional decision register', 'Executive follow-up और governance reports'], ur: ['Approved partner اور board minutes', 'Family اور institutional decision register', 'Executive follow-up اور governance reports'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'يمكن للشركة العائلية عقد اجتماع مجلس، توثيق قرارات الشركاء، تحديد المسؤوليات، ثم متابعة التنفيذ دون فقدان السياق أو الاعتماد.', en: 'A family company can run a board meeting, document partner decisions, assign owners, and track execution without losing context or approvals.', hi: 'Family company board meeting चला सकती है, partner decisions दस्तावेज़ कर सकती है, owners assign कर सकती है और execution track कर सकती है।', ur: 'Family company board meeting چلا سکتی ہے، partner decisions دستاویز کر سکتی ہے، owners assign کر سکتی ہے اور execution track کر سکتی ہے۔' },
    relatedPages: ['boardGovernanceSoftware', 'boardManagementSoftwarePage', 'boardDecisionsTrackingSoftware', 'corporateGovernancePlatform'],
  },
  {
    key: 'jointStockCompaniesGovernanceSoftware',
    titles: { ar: 'برنامج حوكمة الشركات المساهمة', en: 'Joint-Stock Company Governance Software', hi: 'जॉइंट-स्टॉक कंपनी गवर्नेंस सॉफ्टवेयर', ur: 'جوائنٹ اسٹاک کمپنی گورننس سافٹ ویئر' },
    seoTitles: { ar: 'برنامج حوكمة الشركات المساهمة ومجالسها | ديوان سويت', en: 'Joint-Stock Company Governance Software | Diwan Suite', hi: 'जॉइंट-स्टॉक कंपनी गवर्नेंस सॉफ्टवेयर | Diwan Suite', ur: 'جوائنٹ اسٹاک کمپنی گورننس سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج حوكمة الشركات المساهمة لإدارة مجلس الإدارة واللجان والجمعيات العمومية والمحاضر والقرارات وسجل التدقيق.', en: 'Governance software for joint-stock companies to manage boards, committees, general assemblies, minutes, decisions, and audit-ready records.', hi: 'Joint-stock companies के boards, committees, general assemblies, minutes, decisions और audit records के लिए governance software।', ur: 'Joint-stock companies کے boards، committees، general assemblies، minutes، decisions اور audit records کے لیے governance software۔' },
    summaries: { ar: 'الشركات المساهمة تحتاج إدارة دقيقة للمجالس واللجان والجمعيات العمومية مع سجل قرار موثق وتقارير جاهزة للرقابة.', en: 'Joint-stock companies need precise control over boards, committees, assemblies, decisions, and reporting for regulated governance.', hi: 'Joint-stock companies को boards, committees, assemblies, decisions और reporting पर regulated governance के लिए precise control चाहिए।', ur: 'Joint-stock companies کو boards، committees، assemblies، decisions اور reporting پر regulated governance کے لیے precise control چاہیے۔' },
    definitions: { ar: 'برنامج حوكمة الشركات المساهمة ينظم اجتماعات مجلس الإدارة واللجان والجمعيات العمومية ويربط المحاضر بالقرارات والتنفيذ والامتثال.', en: 'Joint-stock company governance software organizes board, committee, and general assembly meetings while linking minutes to decisions, execution, and compliance.', hi: 'Joint-stock company governance software board, committee और general assembly meetings को organize करता है और minutes को decisions, execution और compliance से जोड़ता है।', ur: 'Joint-stock company governance software board، committee اور general assembly meetings کو organize کرتا ہے اور minutes کو decisions، execution اور compliance سے جوڑتا ہے۔' },
    keywords: { ar: ['حوكمة الشركات المساهمة', 'برنامج حوكمة الشركات المساهمة', 'مجالس إدارة الشركات المساهمة'], en: ['joint-stock company governance software', 'public company board governance'], hi: ['joint-stock company governance software'], ur: ['joint-stock company governance software'] },
    audiences: { ar: ['أمانة مجلس الإدارة', 'لجان المجلس', 'إدارة الحوكمة والامتثال'], en: ['Board secretariat', 'Board committees', 'Governance and compliance teams'], hi: ['Board secretariat', 'Board committees', 'Governance और compliance teams'], ur: ['Board secretariat', 'Board committees', 'Governance اور compliance teams'] },
    challenges: { ar: ['متطلبات إفصاح ورقابة أعلى', 'تعدد اجتماعات المجلس واللجان والجمعيات', 'الحاجة إلى سجل قرارات قابل للتدقيق'], en: ['Higher disclosure and oversight expectations', 'Multiple board, committee, and assembly meetings', 'Need for an audit-ready decision register'], hi: ['Higher disclosure और oversight expectations', 'Multiple board, committee और assembly meetings', 'Audit-ready decision register की आवश्यकता'], ur: ['Higher disclosure اور oversight expectations', 'Multiple board، committee اور assembly meetings', 'Audit-ready decision register کی ضرورت'] },
    outputs: { ar: ['محاضر واعتمادات موثقة', 'سجل تدقيق للقرارات والمسؤوليات', 'تقارير حوكمة للإدارة العليا'], en: ['Documented minutes and approvals', 'Audit trail for decisions and ownership', 'Governance reports for leadership'], hi: ['Documented minutes और approvals', 'Decisions और ownership का audit trail', 'Leadership के लिए governance reports'], ur: ['Documented minutes اور approvals', 'Decisions اور ownership کا audit trail', 'Leadership کے لیے governance reports'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'تستطيع أمانة المجلس إدارة اجتماع المجلس ثم ربط توصيات لجنة المراجعة أو المخاطر بالقرارات والتقارير التنفيذية.', en: 'The board secretariat can manage board meetings and connect audit or risk committee recommendations to decisions and executive reports.', hi: 'Board secretariat board meetings manage कर सकता है और audit या risk committee recommendations को decisions और executive reports से जोड़ सकता है।', ur: 'Board secretariat board meetings manage کر سکتا ہے اور audit یا risk committee recommendations کو decisions اور executive reports سے جوڑ سکتا ہے۔' },
    relatedPages: ['generalAssemblyManagementSoftware', 'auditCommitteeManagementSoftware', 'riskCommitteeManagementSoftware', 'boardPortalSaudiArabia'],
  },
  {
    key: 'banksBoardCommitteeGovernanceSoftware',
    titles: { ar: 'برنامج إدارة لجان البنوك والقطاع المالي', en: 'Bank Board Committee Governance Software', hi: 'बैंक बोर्ड कमेटी गवर्नेंस सॉफ्टवेयर', ur: 'بینک بورڈ کمیٹی گورننس سافٹ ویئر' },
    seoTitles: { ar: 'برنامج إدارة لجان البنوك والقطاع المالي | ديوان سويت', en: 'Bank Board Committee Governance Software | Diwan Suite', hi: 'बैंक बोर्ड कमेटी गवर्नेंस सॉफ्टवेयर | Diwan Suite', ur: 'بینک بورڈ کمیٹی گورننس سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج لإدارة لجان البنوك والقطاع المالي مثل المراجعة والمخاطر والترشيحات مع محاضر وقرارات وتقارير امتثال.', en: 'Software for bank and financial-sector committees such as audit, risk, and nominations with minutes, decisions, and compliance reports.', hi: 'Banks और financial-sector committees जैसे audit, risk और nominations के लिए minutes, decisions और compliance reports वाला software।', ur: 'Banks اور financial-sector committees جیسے audit، risk اور nominations کے لیے minutes، decisions اور compliance reports والا software۔' },
    summaries: { ar: 'البنوك والجهات المالية تحتاج حوكمة دقيقة للجان الحساسة وسجل تدقيق واضح لكل توصية وقرار ومتابعة.', en: 'Banks and financial institutions need precise governance for sensitive committees and a clear audit trail for every recommendation and decision.', hi: 'Banks और financial institutions को sensitive committees और हर recommendation व decision के audit trail के लिए precise governance चाहिए।', ur: 'Banks اور financial institutions کو sensitive committees اور ہر recommendation و decision کے audit trail کے لیے precise governance چاہیے۔' },
    definitions: { ar: 'برنامج إدارة لجان البنوك ينظم اجتماعات لجنة المراجعة والمخاطر والترشيحات ويحول توصياتها إلى قرارات ومسؤوليات قابلة للتتبع.', en: 'Bank committee governance software organizes audit, risk, and nomination committee meetings and turns recommendations into traceable decisions and responsibilities.', hi: 'Bank committee governance software audit, risk और nomination committee meetings को organize करता है और recommendations को traceable decisions व responsibilities में बदलता है।', ur: 'Bank committee governance software audit، risk اور nomination committee meetings کو organize کرتا ہے اور recommendations کو traceable decisions و responsibilities میں بدلتا ہے۔' },
    keywords: { ar: ['برنامج إدارة لجان البنوك', 'حوكمة لجان البنوك', 'لجنة المخاطر', 'لجنة المراجعة'], en: ['bank committee governance software', 'risk committee software', 'audit committee software'], hi: ['bank committee governance software', 'risk committee software'], ur: ['bank committee governance software', 'risk committee software'] },
    audiences: { ar: ['أمانة لجان المجلس', 'إدارة المخاطر والالتزام', 'المراجعة الداخلية'], en: ['Board committee secretariat', 'Risk and compliance management', 'Internal audit'], hi: ['Board committee secretariat', 'Risk और compliance management', 'Internal audit'], ur: ['Board committee secretariat', 'Risk اور compliance management', 'Internal audit'] },
    challenges: { ar: ['حساسية محاضر اللجان المالية والرقابية', 'تعدد التوصيات ومواعيد التنفيذ', 'الحاجة إلى تقارير جاهزة للمراجعة والرقابة'], en: ['Sensitive financial and oversight committee records', 'Many recommendations and execution dates', 'Need for audit and regulatory-ready reports'], hi: ['Sensitive financial और oversight committee records', 'कई recommendations और execution dates', 'Audit और regulatory-ready reports की आवश्यकता'], ur: ['Sensitive financial اور oversight committee records', 'کئی recommendations اور execution dates', 'Audit اور regulatory-ready reports کی ضرورت'] },
    outputs: { ar: ['سجل توصيات للجان', 'متابعة تنفيذ لكل قرار', 'لوحات امتثال ومخاطر'], en: ['Committee recommendation register', 'Execution tracking for every decision', 'Compliance and risk dashboards'], hi: ['Committee recommendation register', 'हर decision के लिए execution tracking', 'Compliance और risk dashboards'], ur: ['Committee recommendation register', 'ہر decision کے لیے execution tracking', 'Compliance اور risk dashboards'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'تستطيع لجنة المخاطر توثيق اجتماعها، اعتماد التوصيات، ثم تحويل كل توصية إلى مسؤولية متابعة بتقارير دورية.', en: 'A risk committee can document meetings, approve recommendations, and convert each item into an owned follow-up with periodic reports.', hi: 'Risk committee meetings document कर सकती है, recommendations approve कर सकती है और हर item को owned follow-up में बदल सकती है।', ur: 'Risk committee meetings document کر سکتی ہے، recommendations approve کر سکتی ہے اور ہر item کو owned follow-up میں بدل سکتی ہے۔' },
    relatedPages: ['riskCommitteeManagementSoftware', 'auditCommitteeManagementSoftware', 'bankingGovernance', 'governanceSecurityCompliance'],
  },
  {
    key: 'universitiesBoardGovernanceSoftware',
    titles: { ar: 'برنامج إدارة مجالس الجامعات والمعاهد', en: 'University Board Governance Software', hi: 'यूनिवर्सिटी बोर्ड गवर्नेंस सॉफ्टवेयर', ur: 'یونیورسٹی بورڈ گورننس سافٹ ویئر' },
    seoTitles: { ar: 'برنامج إدارة مجالس الجامعات والمعاهد | ديوان سويت', en: 'University Board Governance Software | Diwan Suite', hi: 'यूनिवर्सिटी बोर्ड गवर्नेंस सॉफ्टवेयर | Diwan Suite', ur: 'یونیورسٹی بورڈ گورننس سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج لإدارة مجالس الجامعات واللجان الأكاديمية ومحاضر الاجتماعات والقرارات والتوصيات والتقارير التنفيذية.', en: 'Governance software for university boards, academic committees, minutes, decisions, recommendations, and executive reporting.', hi: 'University boards, academic committees, minutes, decisions, recommendations और executive reporting के लिए governance software।', ur: 'University boards، academic committees، minutes، decisions، recommendations اور executive reporting کے لیے governance software۔' },
    summaries: { ar: 'الجامعات والمعاهد تحتاج تنظيمًا واضحًا للمجالس واللجان الأكاديمية والإدارية مع محاضر وتوصيات قابلة للمتابعة.', en: 'Universities and institutes need structured governance for academic and administrative boards with trackable minutes and recommendations.', hi: 'Universities और institutes को academic और administrative boards के लिए trackable minutes और recommendations के साथ structured governance चाहिए।', ur: 'Universities اور institutes کو academic اور administrative boards کے لیے trackable minutes اور recommendations کے ساتھ structured governance چاہیے۔' },
    definitions: { ar: 'برنامج إدارة مجالس الجامعات يساعد على تنظيم اجتماعات المجالس واللجان الأكاديمية وتوثيق المحاضر والتوصيات وربطها بالتنفيذ.', en: 'University board governance software helps manage councils and academic committees, document minutes and recommendations, and connect them to execution.', hi: 'University board governance software councils और academic committees को manage करता है, minutes और recommendations दस्तावेज़ करता है और उन्हें execution से जोड़ता है।', ur: 'University board governance software councils اور academic committees کو manage کرتا ہے، minutes اور recommendations دستاویز کرتا ہے اور انہیں execution سے جوڑتا ہے۔' },
    keywords: { ar: ['برنامج إدارة مجالس الجامعات', 'اجتماعات مجلس الجامعة', 'محاضر الجامعات'], en: ['university board governance software', 'academic committee management'], hi: ['university board governance software'], ur: ['university board governance software'] },
    audiences: { ar: ['أمانة مجلس الجامعة', 'الكليات واللجان الأكاديمية', 'الإدارة العليا'], en: ['University council secretariat', 'Colleges and academic committees', 'Executive leadership'], hi: ['University council secretariat', 'Colleges और academic committees', 'Executive leadership'], ur: ['University council secretariat', 'Colleges اور academic committees', 'Executive leadership'] },
    challenges: { ar: ['كثرة اللجان الأكاديمية والإدارية', 'صعوبة تتبع التوصيات بين الكليات والإدارات', 'الحاجة إلى محاضر موثقة ومؤرشفة'], en: ['Many academic and administrative committees', 'Difficulty tracking recommendations across colleges and departments', 'Need for documented and archived minutes'], hi: ['कई academic और administrative committees', 'Colleges और departments में recommendations track करना कठिन', 'Documented और archived minutes की आवश्यकता'], ur: ['کئی academic اور administrative committees', 'Colleges اور departments میں recommendations track کرنا مشکل', 'Documented اور archived minutes کی ضرورت'] },
    outputs: { ar: ['محاضر مجالس ولجان أكاديمية', 'سجل توصيات حسب الكلية أو الإدارة', 'تقارير متابعة للإدارة العليا'], en: ['Academic board and committee minutes', 'Recommendation register by college or department', 'Follow-up reports for leadership'], hi: ['Academic board और committee minutes', 'College या department के अनुसार recommendation register', 'Leadership के लिए follow-up reports'], ur: ['Academic board اور committee minutes', 'College یا department کے مطابق recommendation register', 'Leadership کے لیے follow-up reports'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'يمكن لمجلس الجامعة اعتماد توصيات لجنة أكاديمية ثم متابعة التنفيذ حسب الكلية والإدارة ضمن تقارير موحدة.', en: 'A university council can approve academic committee recommendations and track execution by college and department in unified reports.', hi: 'University council academic committee recommendations approve कर सकता है और execution को college व department के अनुसार unified reports में track कर सकता है।', ur: 'University council academic committee recommendations approve کر سکتا ہے اور execution کو college و department کے مطابق unified reports میں track کر سکتا ہے۔' },
    relatedPages: ['universitiesInstitutesSector', 'meetingMinutesSoftware', 'governanceReportsDashboards', 'committeeGovernanceSoftware'],
  },
  {
    key: 'healthcareGovernanceMeetingsSoftware',
    titles: { ar: 'برنامج إدارة اجتماعات المستشفيات والقطاع الصحي', en: 'Healthcare Governance Meeting Software', hi: 'हेल्थकेयर गवर्नेंस मीटिंग सॉफ्टवेयर', ur: 'ہیلتھ کیئر گورننس میٹنگ سافٹ ویئر' },
    seoTitles: { ar: 'برنامج إدارة اجتماعات المستشفيات والقطاع الصحي | ديوان سويت', en: 'Healthcare Governance Meeting Software | Diwan Suite', hi: 'हेल्थकेयर गवर्नेंस मीटिंग सॉफ्टवेयर | Diwan Suite', ur: 'ہیلتھ کیئر گورننس میٹنگ سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج لإدارة اجتماعات المستشفيات واللجان الصحية ومحاضر الجودة والقرارات والتوصيات والتقارير الرقابية.', en: 'Software for hospital and healthcare committee meetings, quality minutes, decisions, recommendations, and governance reporting.', hi: 'Hospital और healthcare committee meetings, quality minutes, decisions, recommendations और governance reporting के लिए software।', ur: 'Hospital اور healthcare committee meetings، quality minutes، decisions، recommendations اور governance reporting کے لیے software۔' },
    summaries: { ar: 'القطاع الصحي يحتاج إدارة موثقة للجان الجودة والسلامة والاعتمادات والقرارات ذات الأثر التشغيلي والرقابي.', en: 'Healthcare organizations need documented management of quality, safety, accreditation, and operational decision committees.', hi: 'Healthcare organizations को quality, safety, accreditation और operational decision committees की documented management चाहिए।', ur: 'Healthcare organizations کو quality، safety، accreditation اور operational decision committees کی documented management چاہیے۔' },
    definitions: { ar: 'برنامج إدارة اجتماعات المستشفيات ينظم لجان الجودة والسلامة والإدارة الطبية ويربط التوصيات بالتنفيذ والتقارير.', en: 'Healthcare governance meeting software organizes quality, safety, and clinical administration committees and links recommendations to execution and reports.', hi: 'Healthcare governance meeting software quality, safety और clinical administration committees को organize करता है और recommendations को execution व reports से जोड़ता है।', ur: 'Healthcare governance meeting software quality، safety اور clinical administration committees کو organize کرتا ہے اور recommendations کو execution و reports سے جوڑتا ہے۔' },
    keywords: { ar: ['برنامج إدارة اجتماعات المستشفيات', 'لجان المستشفيات', 'حوكمة القطاع الصحي'], en: ['healthcare governance meeting software', 'hospital committee management'], hi: ['healthcare governance meeting software'], ur: ['healthcare governance meeting software'] },
    audiences: { ar: ['إدارة المستشفى', 'لجان الجودة والسلامة', 'الإدارة الطبية والامتثال'], en: ['Hospital management', 'Quality and safety committees', 'Clinical administration and compliance'], hi: ['Hospital management', 'Quality और safety committees', 'Clinical administration और compliance'], ur: ['Hospital management', 'Quality اور safety committees', 'Clinical administration اور compliance'] },
    challenges: { ar: ['كثرة لجان الجودة والسلامة والاعتماد', 'صعوبة متابعة التوصيات ذات الأثر التشغيلي', 'الحاجة إلى تقارير رقابية موثقة'], en: ['Many quality, safety, and accreditation committees', 'Difficulty tracking operational recommendations', 'Need for documented oversight reports'], hi: ['कई quality, safety और accreditation committees', 'Operational recommendations track करना कठिन', 'Documented oversight reports की आवश्यकता'], ur: ['کئی quality، safety اور accreditation committees', 'Operational recommendations track کرنا مشکل', 'Documented oversight reports کی ضرورت'] },
    outputs: { ar: ['محاضر لجان صحية موثقة', 'متابعة توصيات الجودة والسلامة', 'تقارير امتثال وتشغيل'], en: ['Documented healthcare committee minutes', 'Quality and safety recommendation tracking', 'Compliance and operations reports'], hi: ['Documented healthcare committee minutes', 'Quality और safety recommendation tracking', 'Compliance और operations reports'], ur: ['Documented healthcare committee minutes', 'Quality اور safety recommendation tracking', 'Compliance اور operations reports'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'يمكن للجنة الجودة اعتماد توصيات تحسين الخدمة ثم متابعة تنفيذها مع الإدارة الطبية والتشغيلية في سجل واحد.', en: 'A quality committee can approve service-improvement recommendations and track execution with clinical and operations teams in one record.', hi: 'Quality committee service-improvement recommendations approve कर सकती है और clinical व operations teams के साथ execution track कर सकती है।', ur: 'Quality committee service-improvement recommendations approve کر سکتی ہے اور clinical و operations teams کے ساتھ execution track کر سکتی ہے۔' },
    relatedPages: ['hospitalsClinicsSector', 'committeeGovernanceSoftware', 'meetingMinutesSoftware', 'governanceReportsDashboards'],
  },
  {
    key: 'nonprofitGovernanceMeetingsSoftware',
    titles: { ar: 'برنامج حوكمة الجمعيات غير الربحية', en: 'Nonprofit Governance Meeting Software', hi: 'नॉनप्रॉफिट गवर्नेंस मीटिंग सॉफ्टवेयर', ur: 'نان پرافٹ گورننس میٹنگ سافٹ ویئر' },
    seoTitles: { ar: 'برنامج حوكمة الجمعيات غير الربحية | ديوان سويت', en: 'Nonprofit Governance Meeting Software | Diwan Suite', hi: 'नॉनप्रॉफिट गवर्नेंस मीटिंग सॉफ्टवेयर | Diwan Suite', ur: 'نان پرافٹ گورننس میٹنگ سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج حوكمة للجمعيات غير الربحية لإدارة اجتماعات المجلس واللجان والجمعيات العمومية والمحاضر والقرارات.', en: 'Governance software for nonprofits to manage board meetings, committees, general assemblies, minutes, and decisions.', hi: 'Nonprofits के board meetings, committees, general assemblies, minutes और decisions के लिए governance software।', ur: 'Nonprofits کے board meetings، committees، general assemblies، minutes اور decisions کے لیے governance software۔' },
    summaries: { ar: 'الجمعيات غير الربحية تحتاج شفافية عالية في الاجتماعات والقرارات والتوصيات والتقارير لأصحاب المصلحة.', en: 'Nonprofits need high transparency in meetings, decisions, recommendations, and stakeholder reporting.', hi: 'Nonprofits को meetings, decisions, recommendations और stakeholder reporting में high transparency चाहिए।', ur: 'Nonprofits کو meetings، decisions، recommendations اور stakeholder reporting میں high transparency چاہیے۔' },
    definitions: { ar: 'برنامج حوكمة الجمعيات غير الربحية يساعد على توثيق اجتماعات المجلس والجمعيات واللجان وربط قراراتها بالمتابعة والشفافية.', en: 'Nonprofit governance meeting software documents board, assembly, and committee meetings and links decisions to follow-up and transparency.', hi: 'Nonprofit governance meeting software board, assembly और committee meetings को document करता है और decisions को follow-up व transparency से जोड़ता है।', ur: 'Nonprofit governance meeting software board، assembly اور committee meetings کو document کرتا ہے اور decisions کو follow-up و transparency سے جوڑتا ہے۔' },
    keywords: { ar: ['حوكمة الجمعيات غير الربحية', 'برنامج إدارة الجمعيات غير الربحية', 'محاضر الجمعيات'], en: ['nonprofit governance software', 'nonprofit board meeting software'], hi: ['nonprofit governance software'], ur: ['nonprofit governance software'] },
    audiences: { ar: ['مجلس الإدارة', 'اللجان التنفيذية', 'الإدارة المالية والامتثال'], en: ['Board of directors', 'Executive committees', 'Finance and compliance teams'], hi: ['Board of directors', 'Executive committees', 'Finance और compliance teams'], ur: ['Board of directors', 'Executive committees', 'Finance اور compliance teams'] },
    challenges: { ar: ['الحاجة إلى شفافية القرار', 'تعدد اجتماعات المجلس واللجان والجمعية', 'تجهيز محاضر وتقارير للجهات الرقابية والداعمين'], en: ['Need for decision transparency', 'Multiple board, committee, and assembly meetings', 'Preparing minutes and reports for regulators and donors'], hi: ['Decision transparency की आवश्यकता', 'Multiple board, committee और assembly meetings', 'Regulators और donors के लिए minutes व reports तैयार करना'], ur: ['Decision transparency کی ضرورت', 'Multiple board، committee اور assembly meetings', 'Regulators اور donors کے لیے minutes و reports تیار کرنا'] },
    outputs: { ar: ['محاضر مجلس وجمعيات موثقة', 'سجل قرارات وتوصيات', 'تقارير شفافية ومتابعة'], en: ['Documented board and assembly minutes', 'Decision and recommendation register', 'Transparency and follow-up reports'], hi: ['Documented board और assembly minutes', 'Decision और recommendation register', 'Transparency और follow-up reports'], ur: ['Documented board اور assembly minutes', 'Decision اور recommendation register', 'Transparency اور follow-up reports'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'تستطيع الجمعية توثيق اجتماع مجلس الإدارة والجمعية العمومية ثم متابعة قرارات المبادرات والميزانيات بتقارير واضحة.', en: 'A nonprofit can document board and general assembly meetings, then track initiative and budget decisions with clear reports.', hi: 'Nonprofit board और general assembly meetings document कर सकती है और initiatives व budgets के decisions को clear reports में track कर सकती है।', ur: 'Nonprofit board اور general assembly meetings document کر سکتی ہے اور initiatives و budgets کے decisions کو clear reports میں track کر سکتی ہے۔' },
    relatedPages: ['charitableEntitiesSector', 'generalAssemblyManagementSoftware', 'meetingMinutesSoftware', 'boardDecisionsTrackingSoftware'],
  },
  {
    key: 'realEstateDeveloperGovernanceSoftware',
    titles: { ar: 'برنامج حوكمة شركات التطوير العقاري', en: 'Real Estate Developer Governance Software', hi: 'रियल एस्टेट डेवलपर गवर्नेंस सॉफ्टवेयर', ur: 'ریئل اسٹیٹ ڈیولپر گورننس سافٹ ویئر' },
    seoTitles: { ar: 'برنامج حوكمة شركات التطوير العقاري | ديوان سويت', en: 'Real Estate Developer Governance Software | Diwan Suite', hi: 'रियल एस्टेट डेवलपर गवर्नेंस सॉफ्टवेयर | Diwan Suite', ur: 'ریئل اسٹیٹ ڈیولپر گورننس سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج حوكمة لشركات التطوير العقاري لإدارة مجالس الإدارة واللجان ومحاضر المشاريع والقرارات والتوصيات.', en: 'Governance software for real estate developers to manage boards, committees, project minutes, decisions, and recommendations.', hi: 'Real estate developers के boards, committees, project minutes, decisions और recommendations के लिए governance software।', ur: 'Real estate developers کے boards، committees، project minutes، decisions اور recommendations کے لیے governance software۔' },
    summaries: { ar: 'شركات التطوير العقاري تحتاج ربط اجتماعات المجلس واللجان بقرارات المشاريع والمخاطر والاعتمادات التنفيذية.', en: 'Real estate developers need to connect board and committee meetings to project decisions, risks, and executive approvals.', hi: 'Real estate developers को board और committee meetings को project decisions, risks और executive approvals से जोड़ना होता है।', ur: 'Real estate developers کو board اور committee meetings کو project decisions، risks اور executive approvals سے جوڑنا ہوتا ہے۔' },
    definitions: { ar: 'برنامج حوكمة التطوير العقاري يوثق اجتماعات المجلس واللجان ويربط قرارات المشاريع والاعتمادات والمسؤوليات بتقارير متابعة.', en: 'Real estate developer governance software documents board and committee meetings and links project decisions, approvals, and ownership to follow-up reports.', hi: 'Real estate developer governance software board और committee meetings document करता है और project decisions, approvals व ownership को follow-up reports से जोड़ता है।', ur: 'Real estate developer governance software board اور committee meetings document کرتا ہے اور project decisions، approvals و ownership کو follow-up reports سے جوڑتا ہے۔' },
    keywords: { ar: ['حوكمة شركات التطوير العقاري', 'إدارة اجتماعات شركات العقار', 'مجالس شركات التطوير العقاري'], en: ['real estate developer governance software', 'property developer board governance'], hi: ['real estate developer governance software'], ur: ['real estate developer governance software'] },
    audiences: { ar: ['مجلس الإدارة', 'لجان المشاريع والاستثمار', 'إدارة المخاطر والمتابعة'], en: ['Board of directors', 'Project and investment committees', 'Risk and follow-up teams'], hi: ['Board of directors', 'Project और investment committees', 'Risk और follow-up teams'], ur: ['Board of directors', 'Project اور investment committees', 'Risk اور follow-up teams'] },
    challenges: { ar: ['كثرة قرارات المشاريع والاعتمادات', 'ارتباط الاجتماعات بالمخاطر والتكاليف والجداول الزمنية', 'الحاجة إلى مسؤوليات واضحة لكل قرار'], en: ['Many project decisions and approvals', 'Meetings tied to risks, cost, and timelines', 'Need for clear ownership of each decision'], hi: ['Many project decisions और approvals', 'Meetings risks, cost और timelines से जुड़ी होती हैं', 'हर decision की clear ownership चाहिए'], ur: ['Many project decisions اور approvals', 'Meetings risks، cost اور timelines سے جڑی ہوتی ہیں', 'ہر decision کی clear ownership چاہیے'] },
    outputs: { ar: ['سجل قرارات مشاريع', 'متابعة مخاطر واعتمادات', 'تقارير تنفيذية للمجلس'], en: ['Project decision register', 'Risk and approval follow-up', 'Executive reports for the board'], hi: ['Project decision register', 'Risk और approval follow-up', 'Board के लिए executive reports'], ur: ['Project decision register', 'Risk اور approval follow-up', 'Board کے لیے executive reports'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'يمكن للجنة الاستثمار اعتماد قرار مرتبط بمشروع ثم ربطه بمالك تنفيذ وموعد وتقرير متابعة للمجلس.', en: 'An investment committee can approve a project decision, assign an owner and due date, and report progress to the board.', hi: 'Investment committee project decision approve कर सकती है, owner और due date assign कर सकती है और board को progress report दे सकती है।', ur: 'Investment committee project decision approve کر سکتی ہے، owner اور due date assign کر سکتی ہے اور board کو progress report دے سکتی ہے۔' },
    relatedPages: ['boardManagementSoftwarePage', 'boardDecisionsTrackingSoftware', 'riskCommitteeManagementSoftware', 'corporateGovernancePlatform'],
  },
  {
    key: 'auditCommitteeManagementSoftware',
    titles: { ar: 'برنامج إدارة لجنة المراجعة', en: 'Audit Committee Management Software', hi: 'ऑडिट कमेटी मैनेजमेंट सॉफ्टवेयर', ur: 'آڈٹ کمیٹی مینجمنٹ سافٹ ویئر' },
    seoTitles: { ar: 'برنامج إدارة لجنة المراجعة ومحاضرها | ديوان سويت', en: 'Audit Committee Management Software | Diwan Suite', hi: 'ऑडिट कमेटी मैनेजमेंट सॉफ्टवेयर | Diwan Suite', ur: 'آڈٹ کمیٹی مینجمنٹ سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج إدارة لجنة المراجعة لتوثيق الاجتماعات والمحاضر والتوصيات ومتابعة الملاحظات والتقارير وسجل التدقيق.', en: 'Audit committee management software for meetings, minutes, recommendations, observations, follow-up reports, and audit-ready records.', hi: 'Audit committee meetings, minutes, recommendations, observations, follow-up reports और audit-ready records के लिए software।', ur: 'Audit committee meetings، minutes، recommendations، observations، follow-up reports اور audit-ready records کے لیے software۔' },
    summaries: { ar: 'لجنة المراجعة تحتاج توثيقًا دقيقًا للتوصيات والملاحظات ومسؤوليات المتابعة بما يدعم الشفافية والامتثال.', en: 'Audit committees need precise documentation of recommendations, observations, and follow-up ownership to support transparency and compliance.', hi: 'Audit committees को transparency और compliance के लिए recommendations, observations और follow-up ownership की precise documentation चाहिए।', ur: 'Audit committees کو transparency اور compliance کے لیے recommendations، observations اور follow-up ownership کی precise documentation چاہیے۔' },
    definitions: { ar: 'برنامج إدارة لجنة المراجعة ينظم اجتماعات اللجنة ومحاضرها وتوصياتها ويحول الملاحظات إلى متابعة قابلة للقياس.', en: 'Audit committee management software organizes committee meetings, minutes, and recommendations and turns observations into measurable follow-up.', hi: 'Audit committee management software committee meetings, minutes और recommendations को organize करता है और observations को measurable follow-up में बदलता है।', ur: 'Audit committee management software committee meetings، minutes اور recommendations کو organize کرتا ہے اور observations کو measurable follow-up میں بدلتا ہے۔' },
    keywords: { ar: ['برنامج إدارة لجنة المراجعة', 'لجنة المراجعة', 'محاضر لجنة المراجعة'], en: ['audit committee management software', 'audit committee minutes'], hi: ['audit committee management software'], ur: ['audit committee management software'] },
    audiences: { ar: ['أعضاء لجنة المراجعة', 'المراجعة الداخلية', 'الإدارة المالية والامتثال'], en: ['Audit committee members', 'Internal audit', 'Finance and compliance teams'], hi: ['Audit committee members', 'Internal audit', 'Finance और compliance teams'], ur: ['Audit committee members', 'Internal audit', 'Finance اور compliance teams'] },
    challenges: { ar: ['تعدد الملاحظات والتوصيات', 'الحاجة إلى سرية عالية للمرفقات', 'ضرورة إثبات المتابعة والإغلاق'], en: ['Many observations and recommendations', 'Need for high confidentiality of attachments', 'Need to prove follow-up and closure'], hi: ['कई observations और recommendations', 'Attachments की high confidentiality की आवश्यकता', 'Follow-up और closure साबित करने की आवश्यकता'], ur: ['کئی observations اور recommendations', 'Attachments کی high confidentiality کی ضرورت', 'Follow-up اور closure ثابت کرنے کی ضرورت'] },
    outputs: { ar: ['سجل توصيات المراجعة', 'متابعة الملاحظات حتى الإغلاق', 'تقارير لجنة المراجعة'], en: ['Audit recommendation register', 'Observation follow-up until closure', 'Audit committee reports'], hi: ['Audit recommendation register', 'Closure तक observation follow-up', 'Audit committee reports'], ur: ['Audit recommendation register', 'Closure تک observation follow-up', 'Audit committee reports'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'توثق لجنة المراجعة ملاحظة رقابية ثم تسندها لمسؤول وتتابع حالة الإغلاق في تقرير دوري للمجلس.', en: 'The audit committee documents an audit observation, assigns an owner, and tracks closure status in periodic board reports.', hi: 'Audit committee audit observation document करती है, owner assign करती है और closure status को periodic board reports में track करती है।', ur: 'Audit committee audit observation document کرتی ہے، owner assign کرتی ہے اور closure status کو periodic board reports میں track کرتی ہے۔' },
    relatedPages: ['banksBoardCommitteeGovernanceSoftware', 'jointStockCompaniesGovernanceSoftware', 'governanceSecurityCompliance', 'boardDecisionsTrackingSoftware'],
  },
  {
    key: 'riskCommitteeManagementSoftware',
    titles: { ar: 'برنامج إدارة لجنة المخاطر', en: 'Risk Committee Management Software', hi: 'रिस्क कमेटी मैनेजमेंट सॉफ्टवेयर', ur: 'رسک کمیٹی مینجمنٹ سافٹ ویئر' },
    seoTitles: { ar: 'برنامج إدارة لجنة المخاطر وقراراتها | ديوان سويت', en: 'Risk Committee Management Software | Diwan Suite', hi: 'रिस्क कमेटी मैनेजमेंट सॉफ्टवेयर | Diwan Suite', ur: 'رسک کمیٹی مینجمنٹ سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج إدارة لجنة المخاطر لتوثيق الاجتماعات والتوصيات وخطط المعالجة ومتابعة القرارات والتقارير التنفيذية.', en: 'Risk committee management software for meetings, recommendations, mitigation actions, decision tracking, and executive reports.', hi: 'Risk committee meetings, recommendations, mitigation actions, decision tracking और executive reports के लिए software।', ur: 'Risk committee meetings، recommendations، mitigation actions، decision tracking اور executive reports کے لیے software۔' },
    summaries: { ar: 'لجنة المخاطر تحتاج ربط الاجتماعات بسجل واضح للتوصيات وخطط المعالجة والمسؤوليات والتقارير.', en: 'Risk committees need to connect meetings to a clear register of recommendations, mitigation actions, owners, and reports.', hi: 'Risk committees को meetings को recommendations, mitigation actions, owners और reports के clear register से जोड़ना होता है।', ur: 'Risk committees کو meetings کو recommendations، mitigation actions، owners اور reports کے clear register سے جوڑنا ہوتا ہے۔' },
    definitions: { ar: 'برنامج إدارة لجنة المخاطر يوثق اجتماعات اللجنة ويربط توصيات المخاطر بخطط المعالجة والمتابعة التنفيذية.', en: 'Risk committee management software documents committee meetings and links risk recommendations to mitigation plans and executive follow-up.', hi: 'Risk committee management software committee meetings document करता है और risk recommendations को mitigation plans व executive follow-up से जोड़ता है।', ur: 'Risk committee management software committee meetings document کرتا ہے اور risk recommendations کو mitigation plans و executive follow-up سے جوڑتا ہے۔' },
    keywords: { ar: ['برنامج إدارة لجنة المخاطر', 'لجنة المخاطر', 'متابعة توصيات المخاطر'], en: ['risk committee management software', 'risk committee minutes'], hi: ['risk committee management software'], ur: ['risk committee management software'] },
    audiences: { ar: ['أعضاء لجنة المخاطر', 'إدارة المخاطر', 'الإدارة التنفيذية والامتثال'], en: ['Risk committee members', 'Risk management', 'Executive and compliance teams'], hi: ['Risk committee members', 'Risk management', 'Executive और compliance teams'], ur: ['Risk committee members', 'Risk management', 'Executive اور compliance teams'] },
    challenges: { ar: ['صعوبة ربط المخاطر بقرارات قابلة للتنفيذ', 'تعدد خطط المعالجة والمسؤولين', 'الحاجة إلى تقارير حالة مستمرة'], en: ['Difficulty turning risk discussions into executable decisions', 'Many mitigation actions and owners', 'Need for continuous status reporting'], hi: ['Risk discussions को executable decisions में बदलना कठिन', 'कई mitigation actions और owners', 'Continuous status reporting की आवश्यकता'], ur: ['Risk discussions کو executable decisions میں بدلنا مشکل', 'کئی mitigation actions اور owners', 'Continuous status reporting کی ضرورت'] },
    outputs: { ar: ['سجل توصيات المخاطر', 'متابعة خطط المعالجة', 'تقارير حالة للمجلس'], en: ['Risk recommendation register', 'Mitigation plan follow-up', 'Status reports for the board'], hi: ['Risk recommendation register', 'Mitigation plan follow-up', 'Board के लिए status reports'], ur: ['Risk recommendation register', 'Mitigation plan follow-up', 'Board کے لیے status reports'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'تسجل لجنة المخاطر توصية معالجة، تحدد مالك التنفيذ والموعد، ثم تعرض حالة التنفيذ في تقرير المجلس القادم.', en: 'The risk committee records a mitigation recommendation, assigns ownership and a due date, then reports status to the next board meeting.', hi: 'Risk committee mitigation recommendation record करती है, ownership और due date assign करती है और next board meeting को status report देती है।', ur: 'Risk committee mitigation recommendation record کرتی ہے، ownership اور due date assign کرتی ہے اور next board meeting کو status report دیتی ہے۔' },
    relatedPages: ['banksBoardCommitteeGovernanceSoftware', 'auditCommitteeManagementSoftware', 'boardDecisionsTrackingSoftware', 'governanceReportsDashboards'],
  },
  {
    key: 'nominationRemunerationCommitteeManagement',
    titles: { ar: 'برنامج إدارة لجنة الترشيحات والمكافآت', en: 'Nomination and Remuneration Committee Software', hi: 'नॉमिनेशन और रेम्यूनरेशन कमेटी सॉफ्टवेयर', ur: 'نامزدگی اور معاوضہ کمیٹی سافٹ ویئر' },
    seoTitles: { ar: 'برنامج إدارة لجنة الترشيحات والمكافآت | ديوان سويت', en: 'Nomination and Remuneration Committee Software | Diwan Suite', hi: 'नॉमिनेशन और रेम्यूनरेशन कमेटी सॉफ्टवेयर | Diwan Suite', ur: 'نامزدگی اور معاوضہ کمیٹی سافٹ ویئر | Diwan Suite' },
    seoDescriptions: { ar: 'برنامج لإدارة لجنة الترشيحات والمكافآت ومحاضرها وتوصياتها وقراراتها بسرية وسجل اعتماد واضح.', en: 'Software for nomination and remuneration committees to manage minutes, recommendations, decisions, confidentiality, and approval records.', hi: 'Nomination और remuneration committees के minutes, recommendations, decisions और approval records के लिए software।', ur: 'Nomination اور remuneration committees کے minutes، recommendations، decisions اور approval records کے لیے software۔' },
    summaries: { ar: 'لجنة الترشيحات والمكافآت تتعامل مع قرارات حساسة تتطلب سرية وتوثيقًا واعتمادًا واضحًا.', en: 'Nomination and remuneration committees handle sensitive decisions that require confidentiality, documentation, and clear approvals.', hi: 'Nomination और remuneration committees sensitive decisions संभालती हैं जिन्हें confidentiality, documentation और clear approvals चाहिए।', ur: 'Nomination اور remuneration committees sensitive decisions سنبھالتی ہیں جنہیں confidentiality، documentation اور clear approvals چاہیے۔' },
    definitions: { ar: 'برنامج إدارة لجنة الترشيحات والمكافآت يساعد على توثيق الاجتماعات والتوصيات والاعتمادات الحساسة ضمن صلاحيات دقيقة.', en: 'Nomination and remuneration committee software helps document meetings, recommendations, and sensitive approvals with precise permissions.', hi: 'Nomination and remuneration committee software meetings, recommendations और sensitive approvals को precise permissions के साथ document करता है।', ur: 'Nomination and remuneration committee software meetings، recommendations اور sensitive approvals کو precise permissions کے ساتھ document کرتا ہے۔' },
    keywords: { ar: ['برنامج إدارة لجنة الترشيحات والمكافآت', 'لجنة الترشيحات والمكافآت', 'محاضر لجنة المكافآت'], en: ['nomination remuneration committee software', 'compensation committee management'], hi: ['nomination remuneration committee software'], ur: ['nomination remuneration committee software'] },
    audiences: { ar: ['أعضاء اللجنة', 'أمانة المجلس', 'الموارد البشرية والحوكمة'], en: ['Committee members', 'Board secretariat', 'HR and governance teams'], hi: ['Committee members', 'Board secretariat', 'HR और governance teams'], ur: ['Committee members', 'Board secretariat', 'HR اور governance teams'] },
    challenges: { ar: ['حساسية بيانات الترشيحات والمكافآت', 'الحاجة إلى سرية وصلاحيات دقيقة', 'توثيق التوصيات والاعتمادات بوضوح'], en: ['Sensitive nomination and remuneration data', 'Need for confidentiality and precise permissions', 'Clear documentation of recommendations and approvals'], hi: ['Sensitive nomination और remuneration data', 'Confidentiality और precise permissions की आवश्यकता', 'Recommendations और approvals की clear documentation'], ur: ['Sensitive nomination اور remuneration data', 'Confidentiality اور precise permissions کی ضرورت', 'Recommendations اور approvals کی clear documentation'] },
    outputs: { ar: ['محاضر لجنة سرية', 'سجل توصيات واعتمادات', 'متابعة قرارات الموارد والمكافآت'], en: ['Confidential committee minutes', 'Recommendation and approval register', 'Follow-up on HR and remuneration decisions'], hi: ['Confidential committee minutes', 'Recommendation और approval register', 'HR और remuneration decisions follow-up'], ur: ['Confidential committee minutes', 'Recommendation اور approval register', 'HR اور remuneration decisions follow-up'] },
    workflow: common.ar && { ar: common.ar.workflow, en: common.en.workflow, hi: common.hi.workflow, ur: common.ur.workflow },
    useCase: { ar: 'تستطيع اللجنة مناقشة توصية ترشيح أو مكافأة وتوثيق القرار ضمن صلاحيات محدودة ثم رفعه للمجلس.', en: 'The committee can discuss a nomination or remuneration recommendation, document the decision under limited permissions, and escalate it to the board.', hi: 'Committee nomination या remuneration recommendation discuss कर सकती है, limited permissions में decision document कर सकती है और board को escalate कर सकती है।', ur: 'Committee nomination یا remuneration recommendation discuss کر سکتی ہے، limited permissions میں decision document کر سکتی ہے اور board کو escalate کر سکتی ہے۔' },
    relatedPages: ['jointStockCompaniesGovernanceSoftware', 'boardGovernanceSoftware', 'committeeGovernanceSoftware', 'governanceSecurityCompliance'],
  },
]

function makeSections(seed: SectorSeed, lang: LangCode): PageSection[] {
  const t = ui[lang]
  return [
    {
      id: 'direct-answer',
      title: t.directAnswer,
      body: [seed.definitions[lang]],
      bullets: seed.keywords[lang],
    },
    {
      id: 'sector-challenges',
      title: t.sectorChallenges,
      body: [seed.summaries[lang]],
      bullets: seed.challenges[lang],
    },
    {
      id: 'platform-fit',
      title: t.platformFit,
      body: [lang === 'ar'
        ? 'يربط ديوان سويت الاجتماعات الرسمية بالمحاضر والقرارات والمهام والتقارير داخل مسار واحد قابل للتدقيق، دون الاعتماد على البريد والملفات المتفرقة.'
        : lang === 'en'
        ? 'Diwan Suite connects formal meetings, minutes, decisions, tasks, and reports in one auditable workflow instead of scattered email and files.'
        : lang === 'hi'
        ? 'Diwan Suite formal meetings, minutes, decisions, tasks और reports को scattered email और files के बजाय एक auditable workflow में जोड़ता है।'
        : 'Diwan Suite formal meetings، minutes، decisions، tasks اور reports کو scattered email اور files کے بجائے ایک auditable workflow میں جوڑتا ہے۔'],
      bullets: seed.outputs[lang],
    },
    {
      id: 'operating-journey',
      title: t.operatingJourney,
      body: [lang === 'ar'
        ? 'تبدأ الرحلة من تهيئة الكيان واللجان والصلاحيات، ثم إدارة الاجتماع ومحضره، وبعدها تحويل المخرجات إلى متابعة وتقارير تنفيذية.'
        : lang === 'en'
        ? 'The journey starts with configuring the entity, committees, and permissions, then managing meetings and minutes, then turning outputs into follow-up and executive reports.'
        : lang === 'hi'
        ? 'यात्रा entity, committees और permissions को configure करने से शुरू होती है, फिर meetings और minutes manage होते हैं, और outputs follow-up व executive reports में बदलते हैं।'
        : 'سفر entity، committees اور permissions کو configure کرنے سے شروع ہوتا ہے، پھر meetings اور minutes manage ہوتے ہیں، اور outputs follow-up و executive reports میں بدلتے ہیں۔'],
      bullets: seed.workflow[lang],
      table: {
        caption: t.roleTable,
        columns: [t.role, t.need, t.systemRole],
        rows: seed.audiences[lang].map((role, index) => [role, seed.challenges[lang][index % seed.challenges[lang].length], seed.outputs[lang][index % seed.outputs[lang].length]]),
      },
    },
    {
      id: 'sector-use-case',
      title: t.useCase,
      body: [seed.useCase[lang]],
    },
  ]
}

function buildCopy(seed: SectorSeed, lang: LangCode): InternalPageCopy {
  const t = ui[lang]
  const faq = common[lang].faq.map(([q, a]) => ({ q, a }))
  return {
    eyebrow: t.eyebrow,
    title: seed.titles[lang],
    summary: seed.summaries[lang],
    seoTitle: seed.seoTitles[lang],
    seoDescription: seed.seoDescriptions[lang],
    executiveSummary: seed.summaries[lang],
    definition: seed.definitions[lang],
    whoFor: seed.audiences[lang],
    whatItSolves: seed.challenges[lang],
    howItWorks: seed.workflow[lang],
    pageFaqTitle: t.faqTitle,
    faq,
    ctaTitle: t.ctaTitle,
    ctaBody: t.ctaBody,
    ctaPrimaryLabel: t.ctaPrimary,
    ctaSecondaryLabel: t.ctaSecondary,
    relatedPages: seed.relatedPages,
    hideSiblingLinks: true,
    sections: makeSections(seed, lang),
  }
}

export const sectorSeoPageCopy: Record<LangCode, Record<SectorSeoPageKey, InternalPageCopy>> = {
  ar: Object.fromEntries(seeds.map((seed) => [seed.key, buildCopy(seed, 'ar')])) as Record<SectorSeoPageKey, InternalPageCopy>,
  en: Object.fromEntries(seeds.map((seed) => [seed.key, buildCopy(seed, 'en')])) as Record<SectorSeoPageKey, InternalPageCopy>,
  hi: Object.fromEntries(seeds.map((seed) => [seed.key, buildCopy(seed, 'hi')])) as Record<SectorSeoPageKey, InternalPageCopy>,
  ur: Object.fromEntries(seeds.map((seed) => [seed.key, buildCopy(seed, 'ur')])) as Record<SectorSeoPageKey, InternalPageCopy>,
}
