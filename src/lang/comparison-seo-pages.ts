import type { LangCode } from './types'
import type { InternalPageCopy, PageTable } from './extra'
import type { PublicPage } from '@/lib/page-registry'

export type ComparisonSeoPageKey = Extract<PublicPage,
  | 'boardPortalVsEmail'
  | 'boardPortalVsTeamsZoom'
  | 'meetingMinutesVsWordPdf'
  | 'manualBoardDecisionTrackingVsAutomation'
  | 'governancePlatformVsMeetingSoftware'
  | 'aiMeetingMinutesVsManualWordPdf'
>

type Localized = Record<LangCode, string>
type LocalizedList = Record<LangCode, string[]>

type CriterionKey =
  | 'boardCommittees'
  | 'agenda'
  | 'quorum'
  | 'officialMinutes'
  | 'approvalSignature'
  | 'decisionToTask'
  | 'followUpEscalation'
  | 'auditTrail'
  | 'dashboards'
  | 'security'

type ComparisonSeed = {
  key: ComparisonSeoPageKey
  kind: 'direct' | 'operational'
  title: Localized
  seoTitle: Localized
  seoDescription: Localized
  summary: Localized
  directAnswer: Localized
  alternativeName: Localized
  diwanName: Localized
  alternativePosition: Record<LangCode, Record<CriterionKey, string>>
  diwanPosition: Record<LangCode, Record<CriterionKey, string>>
  practicalAnalysis: LocalizedList
  chooseAlternative: Localized
  chooseDiwan: Localized
  scenario: Localized
  faq: Record<LangCode, Array<{ q: string; a: string }>>
  relatedPages: PublicPage[]
  ctaTitle: Localized
  ctaBody: Localized
}

const ui: Record<LangCode, {
  eyebrow: string
  executiveSummary: string
  comparisonTable: string
  practicalAnalysis: string
  whenChoose: string
  scenario: string
  aiBlockTitle: string
  aiBlockBody: string
  faqTitle: string
  indirectCta: string
  directCta: string
  ctaPrimary: string
  ctaSecondary: string
  chooseAlternativeLabel: string
  chooseDiwanLabel: string
}> = {
  ar: {
    eyebrow: 'صفحات مقارنة SEO', executiveSummary: 'ملخص تنفيذي سريع', comparisonTable: 'جدول مقارنة مختصر', practicalAnalysis: 'تحليل عملي للفروقات', whenChoose: 'متى تختار كل خيار؟', scenario: 'سيناريو واقعي', aiBlockTitle: 'إضافة ذكية: محاضر إلكترونية ينشئها وكيل الذكاء الاصطناعي', aiBlockBody: 'ديوان سويت لا يكتفي بإدارة الاجتماع، بل يضيف طبقة ذكية لإنشاء المحاضر الإلكترونية. يقوم وكيل الذكاء الاصطناعي بتحليل محتوى الاجتماع، تلخيص النقاشات، استخراج القرارات والتوصيات، وإنشاء مسودة محضر قابلة للمراجعة والاعتماد، مع ربط القرارات بالمهام التنفيذية وسجل التدقيق والتوقيع الإلكتروني.', faqTitle: 'أسئلة شائعة حول المقارنة', indirectCta: 'قيّم نضج حوكمة اجتماعاتك', directCta: 'احجز عرضًا لديوان سويت', ctaPrimary: 'احجز عرضًا توضيحيًا', ctaSecondary: 'تواصل مع الفريق', chooseAlternativeLabel: 'اختر البديل عندما', chooseDiwanLabel: 'اختر ديوان سويت عندما'
  },
  en: {
    eyebrow: 'SEO comparison pages', executiveSummary: 'Quick executive summary', comparisonTable: 'Clear comparison table', practicalAnalysis: 'Practical impact analysis', whenChoose: 'When to choose each option', scenario: 'Realistic scenario', aiBlockTitle: 'Smart addition: AI-generated electronic minutes', aiBlockBody: 'Diwan Suite does not stop at managing the meeting. It adds an intelligent layer for electronic minutes. The AI agent analyzes meeting content, summarizes discussions, extracts decisions and recommendations, drafts reviewable minutes, and links decisions to execution tasks, audit trail, and e-signature.', faqTitle: 'Comparison FAQs', indirectCta: 'Assess your meeting governance maturity', directCta: 'Book a Diwan Suite walkthrough', ctaPrimary: 'Book a Demo', ctaSecondary: 'Talk to the team', chooseAlternativeLabel: 'Choose the alternative when', chooseDiwanLabel: 'Choose Diwan Suite when'
  },
  hi: {
    eyebrow: 'SEO तुलना पृष्ठ', executiveSummary: 'त्वरित कार्यकारी सारांश', comparisonTable: 'स्पष्ट तुलना तालिका', practicalAnalysis: 'व्यावहारिक प्रभाव विश्लेषण', whenChoose: 'कौन सा विकल्प कब चुनें', scenario: 'वास्तविक परिदृश्य', aiBlockTitle: 'स्मार्ट जोड़: AI द्वारा इलेक्ट्रॉनिक मिनट्स', aiBlockBody: 'Diwan Suite केवल बैठक प्रबंधन तक सीमित नहीं है। यह इलेक्ट्रॉनिक मिनट्स के लिए बुद्धिमान परत जोड़ता है। AI agent बैठक की सामग्री का विश्लेषण करता है, चर्चाओं को सारांशित करता है, निर्णयों और सिफारिशों को निकालता है, समीक्षा योग्य minutes draft बनाता है और निर्णयों को tasks, audit trail और e-signature से जोड़ता है।', faqTitle: 'तुलना से जुड़े प्रश्न', indirectCta: 'अपनी meeting governance maturity का मूल्यांकन करें', directCta: 'Diwan Suite डेमो बुक करें', ctaPrimary: 'डेमो बुक करें', ctaSecondary: 'टीम से बात करें', chooseAlternativeLabel: 'वैकल्पिक समाधान चुनें जब', chooseDiwanLabel: 'Diwan Suite चुनें जब'
  },
  ur: {
    eyebrow: 'SEO موازنہ صفحات', executiveSummary: 'فوری انتظامی خلاصہ', comparisonTable: 'واضح موازنہ جدول', practicalAnalysis: 'عملی اثرات کا تجزیہ', whenChoose: 'ہر اختیار کب منتخب کریں', scenario: 'حقیقی منظرنامہ', aiBlockTitle: 'ذہین اضافہ: AI agent کے ذریعے الیکٹرانک محاضر', aiBlockBody: 'Diwan Suite صرف اجلاس کے انتظام تک محدود نہیں۔ یہ الیکٹرانک محاضر کے لیے ذہین پرت فراہم کرتا ہے۔ AI agent اجلاس کے مواد کا تجزیہ کرتا ہے، گفتگو کا خلاصہ بناتا ہے، فیصلے اور سفارشات نکالتا ہے، قابلِ جائزہ محضر کا مسودہ تیار کرتا ہے اور فیصلوں کو tasks، audit trail اور e-signature سے جوڑتا ہے۔', faqTitle: 'موازنہ سے متعلق سوالات', indirectCta: 'اپنی meeting governance maturity کا جائزہ لیں', directCta: 'Diwan Suite کا ڈیمو بک کریں', ctaPrimary: 'ڈیمو بک کریں', ctaSecondary: 'ٹیم سے بات کریں', chooseAlternativeLabel: 'متبادل اختیار کریں جب', chooseDiwanLabel: 'Diwan Suite منتخب کریں جب'
  },
}

const criteria: Record<LangCode, Record<CriterionKey, { label: string; why: string }>> = {
  ar: {
    boardCommittees: { label: 'إدارة المجلس واللجان', why: 'لأن البدائل العامة لا تعرف معنى مجلس، لجنة، عضو، أمين سر، ونصاب.' },
    agenda: { label: 'جدول الأعمال', why: 'يربط النقاش بالمرفقات والقرارات بدل تركه في رسائل أو ملفات متفرقة.' },
    quorum: { label: 'الحضور والنصاب', why: 'مهم جدًا للحوكمة والجمعيات واللجان واجتماعات مجلس الإدارة.' },
    officialMinutes: { label: 'المحاضر الرسمية', why: 'الفرق بين مستند عادي ومحضر قابل للمراجعة والاعتماد.' },
    approvalSignature: { label: 'التوقيع والاعتماد', why: 'يحوّل المحضر من ملف إلى وثيقة رسمية ذات مسار اعتماد.' },
    decisionToTask: { label: 'تحويل القرار إلى مهمة', why: 'أهم نقطة بيع: القرار لا يبقى نصًا داخل المحضر.' },
    followUpEscalation: { label: 'المتابعة والتصعيد', why: 'تعالج سؤال: من المسؤول ومتى ينفذ ومتى يتأخر؟' },
    auditTrail: { label: 'سجل التدقيق', why: 'مهم للجهات الحكومية والشركات والرقابة والمراجعة الداخلية.' },
    dashboards: { label: 'التقارير ولوحات المؤشرات', why: 'تربط الحوكمة بالإدارة العليا وقياس التنفيذ.' },
    security: { label: 'الأمان والسرية', why: 'بيانات المجالس واللجان حساسة وليست مثل اجتماع عادي.' },
  },
  en: {
    boardCommittees: { label: 'Board and committee management', why: 'Generic tools do not understand boards, committees, members, secretaries, and quorum.' },
    agenda: { label: 'Agenda management', why: 'Connects discussions with attachments and decisions instead of scattered files.' },
    quorum: { label: 'Attendance and quorum', why: 'Critical for governance, assemblies, committees, and board meetings.' },
    officialMinutes: { label: 'Official minutes', why: 'Separates a normal document from reviewable and approvable minutes.' },
    approvalSignature: { label: 'Approval and e-signature', why: 'Turns minutes into a formal record with an approval path.' },
    decisionToTask: { label: 'Decision-to-task conversion', why: 'The core value: a decision should not remain text in the minutes.' },
    followUpEscalation: { label: 'Follow-up and escalation', why: 'Answers who owns execution, when it is due, and when it is delayed.' },
    auditTrail: { label: 'Audit trail', why: 'Important for government entities, companies, regulators, and internal audit.' },
    dashboards: { label: 'Reports and dashboards', why: 'Connects governance with executive visibility and measurable execution.' },
    security: { label: 'Security and confidentiality', why: 'Board and committee data is sensitive and not like a normal meeting.' },
  },
  hi: {
    boardCommittees: { label: 'बोर्ड और समिति प्रबंधन', why: 'सामान्य tools board, committee, member, secretary और quorum को नहीं समझते।' },
    agenda: { label: 'एजेंडा प्रबंधन', why: 'चर्चा को attachments और decisions से जोड़ता है, scattered files से नहीं।' },
    quorum: { label: 'उपस्थिति और quorum', why: 'Governance, assemblies, committees और board meetings के लिए आवश्यक।' },
    officialMinutes: { label: 'आधिकारिक minutes', why: 'साधारण document और approvable minutes के बीच अंतर बनाता है।' },
    approvalSignature: { label: 'Approval और e-signature', why: 'Minutes को formal record और approval path में बदलता है।' },
    decisionToTask: { label: 'Decision-to-task conversion', why: 'मुख्य मूल्य: decision केवल minutes में text बनकर न रहे।' },
    followUpEscalation: { label: 'Follow-up और escalation', why: 'कौन जिम्मेदार है, deadline क्या है और delay कब हुआ — यह स्पष्ट करता है।' },
    auditTrail: { label: 'Audit trail', why: 'सरकारी संस्थाओं, कंपनियों, regulators और internal audit के लिए महत्वपूर्ण।' },
    dashboards: { label: 'Reports और dashboards', why: 'Governance को executive visibility और measurable execution से जोड़ता है।' },
    security: { label: 'Security और confidentiality', why: 'Board और committee data संवेदनशील होता है, सामान्य बैठक जैसा नहीं।' },
  },
  ur: {
    boardCommittees: { label: 'بورڈ اور کمیٹی مینجمنٹ', why: 'عام tools بورڈ، کمیٹی، ممبر، سیکرٹری اور quorum کو نہیں سمجھتے۔' },
    agenda: { label: 'ایجنڈا مینجمنٹ', why: 'گفتگو کو attachments اور decisions سے جوڑتا ہے، scattered files سے نہیں۔' },
    quorum: { label: 'حاضری اور quorum', why: 'Governance، assemblies، committees اور board meetings کے لیے ضروری۔' },
    officialMinutes: { label: 'رسمی محاضر', why: 'عام document اور approvable minutes کے درمیان فرق پیدا کرتا ہے۔' },
    approvalSignature: { label: 'Approval اور e-signature', why: 'Minutes کو formal record اور approval path میں بدلتا ہے۔' },
    decisionToTask: { label: 'Decision-to-task conversion', why: 'اصل قدر: decision صرف minutes کا text نہ رہے۔' },
    followUpEscalation: { label: 'Follow-up اور escalation', why: 'کون ذمہ دار ہے، deadline کیا ہے اور delay کب ہوا — واضح کرتا ہے۔' },
    auditTrail: { label: 'Audit trail', why: 'سرکاری اداروں، کمپنیوں، regulators اور internal audit کے لیے اہم۔' },
    dashboards: { label: 'Reports اور dashboards', why: 'Governance کو executive visibility اور measurable execution سے جوڑتا ہے۔' },
    security: { label: 'Security اور confidentiality', why: 'Board اور committee data حساس ہوتا ہے، عام meeting جیسا نہیں۔' },
  },
}

const criterionOrder: CriterionKey[] = ['boardCommittees', 'agenda', 'quorum', 'officialMinutes', 'approvalSignature', 'decisionToTask', 'followUpEscalation', 'auditTrail', 'dashboards', 'security']

function positions(defaultAlt: Localized, defaultDiwan: Localized, overrides?: Partial<Record<CriterionKey, Localized>>, diwanOverrides?: Partial<Record<CriterionKey, Localized>>) {
  const make = (lang: LangCode, source: Localized, fieldOverrides?: Partial<Record<CriterionKey, Localized>>) => Object.fromEntries(
    criterionOrder.map((key) => [key, fieldOverrides?.[key]?.[lang] ?? source[lang]])
  ) as Record<CriterionKey, string>
  return {
    alternativePosition: { ar: make('ar', defaultAlt, overrides), en: make('en', defaultAlt, overrides), hi: make('hi', defaultAlt, overrides), ur: make('ur', defaultAlt, overrides) },
    diwanPosition: { ar: make('ar', defaultDiwan, diwanOverrides), en: make('en', defaultDiwan, diwanOverrides), hi: make('hi', defaultDiwan, diwanOverrides), ur: make('ur', defaultDiwan, diwanOverrides) },
  }
}

const commonDiwan: Localized = {
  ar: 'مدعوم داخل مسار حوكمة واحد يربط الاجتماع بالمحضر والقرار والمهمة والتقرير.',
  en: 'Supported in one governance workflow that connects the meeting, minutes, decision, task, and report.',
  hi: 'एक governance workflow में supported: meeting, minutes, decision, task और report जुड़े रहते हैं।',
  ur: 'ایک governance workflow میں supported: meeting، minutes، decision، task اور report منسلک رہتے ہیں۔',
}

const seeds: ComparisonSeed[] = [
  {
    key: 'manualBoardDecisionTrackingVsAutomation',
    kind: 'operational',
    title: { ar: 'متابعة قرارات المجلس يدويًا vs منصة مؤتمتة', en: 'Manual Board Decision Tracking vs Automated Platform', hi: 'Manual Board Decision Tracking vs Automated Platform', ur: 'Manual Board Decision Tracking vs Automated Platform' },
    seoTitle: { ar: 'متابعة قرارات المجلس يدويًا vs منصة مؤتمتة | ديوان سويت', en: 'Manual Board Decision Tracking vs Automated Platform | Diwan Suite', hi: 'Manual Board Decision Tracking vs Automated Platform | Diwan Suite', ur: 'Manual Board Decision Tracking vs Automated Platform | Diwan Suite' },
    seoDescription: { ar: 'مقارنة عملية بين متابعة قرارات المجلس يدويًا ومنصة مؤتمتة تربط القرار بالمسؤول والموعد والتنبيه والتصعيد والتقارير التنفيذية.', en: 'A practical comparison between manual board decision tracking and an automated platform that links decisions with owners, deadlines, alerts, escalation, and reports.', hi: 'Manual board decision tracking और automated platform की तुलना जो decisions को owners, deadlines, alerts, escalation और reports से जोड़ता है।', ur: 'Manual board decision tracking اور automated platform کا موازنہ جو decisions کو owners، deadlines، alerts، escalation اور reports سے جوڑتا ہے۔' },
    summary: { ar: 'المشكلة ليست في صدور القرار، بل في ضمان تنفيذه وقياس أثره. الطرق اليدوية تصلح للقوائم البسيطة، لكنها تضعف المساءلة عندما تتعدد اللجان والاجتماعات والمهل.', en: 'The issue is not issuing the decision; it is ensuring execution and measuring impact. Manual lists may work for simple follow-up, but accountability weakens when committees, meetings, and deadlines grow.', hi: 'समस्या decision जारी करने में नहीं, बल्कि execution और impact measurement में है। Simple follow-up में manual lists चल सकती हैं, लेकिन committees, meetings और deadlines बढ़ने पर accountability कमजोर होती है।', ur: 'مسئلہ decision جاری کرنے کا نہیں بلکہ execution اور impact measurement کا ہے۔ Simple follow-up میں manual lists چل سکتی ہیں، مگر committees، meetings اور deadlines بڑھنے پر accountability کمزور ہوتی ہے۔' },
    directAnswer: { ar: 'تكفي المتابعة اليدوية إذا كانت القرارات قليلة وغير رسمية. أما قرارات مجلس الإدارة واللجان والجمعيات فتحتاج منصة تربط كل قرار بمسؤول وتاريخ استحقاق وحالة تنفيذ وتصعيد وتقرير.', en: 'Manual tracking is enough for a few informal decisions. Board, committee, and assembly decisions need a platform that links every decision to an owner, due date, status, escalation, and report.', hi: 'कुछ informal decisions के लिए manual tracking पर्याप्त हो सकती है। Board, committee और assembly decisions को owner, due date, status, escalation और report से जोड़ने वाली platform चाहिए।', ur: 'چند informal decisions کے لیے manual tracking کافی ہو سکتی ہے۔ Board، committee اور assembly decisions کو owner، due date، status، escalation اور report سے جوڑنے والی platform چاہیے۔' },
    alternativeName: { ar: 'المتابعة اليدوية', en: 'Manual tracking', hi: 'Manual tracking', ur: 'Manual tracking' },
    diwanName: { ar: 'ديوان سويت', en: 'Diwan Suite', hi: 'Diwan Suite', ur: 'Diwan Suite' },
    ...positions(
      { ar: 'يعتمد على قوائم وجداول وتحديثات بشرية معرضة للتأخير.', en: 'Depends on lists, spreadsheets, and manual updates that can be delayed.', hi: 'Lists, spreadsheets और manual updates पर निर्भर; delay संभव।', ur: 'Lists، spreadsheets اور manual updates پر منحصر؛ delay ممکن۔' },
      commonDiwan,
      {
        decisionToTask: { ar: 'يحتاج نقل القرار يدويًا إلى مهمة خارجية.', en: 'Requires manually moving the decision into an external task.', hi: 'Decision को external task में manually ले जाना पड़ता है।', ur: 'Decision کو external task میں manually منتقل کرنا پڑتا ہے۔' },
        followUpEscalation: { ar: 'التذكير والتصعيد غالبًا شخصي وغير موثق.', en: 'Reminders and escalation are often personal and not audit-ready.', hi: 'Reminders और escalation अक्सर personal और untracked होते हैं।', ur: 'Reminders اور escalation اکثر personal اور untracked ہوتے ہیں۔' },
        dashboards: { ar: 'إعداد التقارير يحتاج تجميعًا يدويًا متكررًا.', en: 'Reporting requires repeated manual consolidation.', hi: 'Reporting के लिए repeated manual consolidation चाहिए।', ur: 'Reporting کے لیے repeated manual consolidation چاہیے۔' },
      }
    ),
    practicalAnalysis: {
      ar: ['كل تأخير في تحديث جدول المتابعة يعني أن الإدارة العليا ترى صورة قديمة عن التنفيذ.', 'عند غياب التصعيد الآلي يصبح الالتزام مرتبطًا بالأشخاص لا بالنظام.', 'المتابعة المؤتمتة تحوّل القرار إلى مسؤولية قابلة للقياس بدل ملاحظة في محضر.'],
      en: ['Every delay in updating a tracking sheet means executives see an outdated execution picture.', 'Without automated escalation, commitment depends on people rather than the system.', 'Automation turns a decision into measurable accountability, not a note in the minutes.'],
      hi: ['Tracking sheet update में हर delay executive view को पुराना बनाता है।', 'Automated escalation न हो तो commitment system के बजाय लोगों पर निर्भर होता है।', 'Automation decision को minutes में note नहीं, measurable accountability बनाता है।'],
      ur: ['Tracking sheet update میں ہر delay executive view کو پرانا بناتا ہے۔', 'Automated escalation نہ ہو تو commitment system کے بجائے لوگوں پر منحصر ہوتا ہے۔', 'Automation decision کو minutes کا note نہیں بلکہ measurable accountability بناتا ہے۔'],
    },
    chooseAlternative: { ar: 'تكون القرارات قليلة، غير رسمية، ولا تتطلب مساءلة أو تقارير دورية.', en: 'Decisions are few, informal, and do not require accountability or recurring reporting.', hi: 'Decisions कम، informal हों और recurring reporting/accountability की जरूरत न हो।', ur: 'Decisions کم، informal ہوں اور recurring reporting/accountability کی ضرورت نہ ہو۔' },
    chooseDiwan: { ar: 'توجد لجان متعددة وقرارات بمالكين ومواعيد وتحتاج الإدارة إلى رؤية تنفيذية.', en: 'You have multiple committees, decision owners, deadlines, and executives need visibility.', hi: 'Multiple committees, decision owners, deadlines हों और executives को visibility चाहिए।', ur: 'Multiple committees، decision owners، deadlines ہوں اور executives کو visibility چاہیے۔' },
    scenario: { ar: 'جهة لديها 8 لجان و12 اجتماعًا شهريًا تصدر عشرات القرارات. بالمتابعة اليدوية تتأخر التحديثات وتتفرق المسؤوليات. في ديوان سويت يتحول كل قرار إلى مهمة بمالك وموعد وحالة تنفيذ وتنبيه وتصعيد وتقرير.', en: 'An organization with 8 committees and 12 monthly meetings issues dozens of decisions. Manual tracking delays updates and fragments accountability. In Diwan Suite, each decision becomes a task with owner, due date, status, alert, escalation, and report.', hi: '8 committees और 12 monthly meetings वाली संस्था dozens decisions जारी करती है। Manual tracking updates delay करता है। Diwan Suite में हर decision owner, due date, status, alert, escalation और report वाला task बनता है।', ur: '8 committees اور 12 monthly meetings والا ادارہ dozens decisions جاری کرتا ہے۔ Manual tracking updates delay کرتا ہے۔ Diwan Suite میں ہر decision owner، due date، status، alert، escalation اور report والا task بنتا ہے۔' },
    faq: {
      ar: [{ q: 'كيف تتم متابعة قرارات المجلس إلكترونيًا؟', a: 'يتم ربط كل قرار بمسؤول وتاريخ استحقاق وحالة تنفيذ وتنبيهات وتصعيد وتقارير، بدل الاعتماد على جداول يدوية منفصلة.' }, { q: 'هل المتابعة اليدوية كافية لمجلس الإدارة؟', a: 'قد تكفي للقرارات القليلة، لكنها لا تكفي عندما توجد لجان متعددة ومواعيد والتزامات تحتاج مساءلة وتوثيقًا.' }, { q: 'هل يمكن تحويل القرار إلى مهمة داخل ديوان سويت؟', a: 'نعم، يمكن تحويل القرار إلى مهمة أو متابعة تنفيذية مرتبطة بالمحضر والتقرير وسجل التدقيق.' }],
      en: [{ q: 'How are board decisions tracked electronically?', a: 'Each decision is linked to an owner, due date, execution status, alerts, escalation, and reports instead of a separate manual sheet.' }, { q: 'Is manual tracking enough for a board?', a: 'It may be enough for a few decisions, but it weakens accountability when multiple committees, deadlines, and obligations exist.' }, { q: 'Can Diwan Suite turn a decision into a task?', a: 'Yes. A decision can become an execution task linked to the minutes, reports, and audit trail.' }],
      hi: [{ q: 'Board decisions को electronically कैसे track किया जाता है?', a: 'हर decision owner, due date, status, alerts, escalation और reports से जुड़ता है।' }, { q: 'क्या manual tracking board के लिए पर्याप्त है?', a: 'Few decisions में हो सकती है, लेकिन multiple committees और deadlines में accountability कमजोर होती है।' }, { q: 'क्या Diwan Suite decision को task बना सकता है?', a: 'हाँ, decision minutes, reports और audit trail से जुड़ा execution task बन सकता है।' }],
      ur: [{ q: 'Board decisions کو electronically کیسے track کیا جاتا ہے؟', a: 'ہر decision owner، due date، status، alerts، escalation اور reports سے جڑتا ہے۔' }, { q: 'کیا manual tracking board کے لیے کافی ہے؟', a: 'Few decisions میں ہو سکتی ہے، مگر multiple committees اور deadlines میں accountability کمزور ہوتی ہے۔' }, { q: 'کیا Diwan Suite decision کو task بنا سکتا ہے؟', a: 'جی ہاں، decision minutes، reports اور audit trail سے جڑا execution task بن سکتا ہے۔' }],
    },
    relatedPages: ['boardDecisionsTrackingSoftware', 'boardGovernanceSoftware', 'corporateGovernancePlatform'],
    ctaTitle: { ar: 'قيّم نضج متابعة قرارات مجلسك', en: 'Assess your board decision follow-up maturity', hi: 'अपनी board decision follow-up maturity देखें', ur: 'اپنی board decision follow-up maturity دیکھیں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف ينتقل القرار من المحضر إلى المسؤول والتنفيذ والتقرير داخل ديوان سويت.', en: 'Book a walkthrough showing how a decision moves from minutes to owner, execution, and report in Diwan Suite.', hi: 'Demo बुक करें और देखें कि decision minutes से owner, execution और report तक कैसे जाता है।', ur: 'Demo بک کریں اور دیکھیں کہ decision minutes سے owner، execution اور report تک کیسے جاتا ہے۔' },
  },
  {
    key: 'meetingMinutesVsWordPdf',
    kind: 'operational',
    title: { ar: 'برنامج محاضر الاجتماعات vs Word/PDF', en: 'Meeting Minutes Software vs Word/PDF', hi: 'Meeting Minutes Software vs Word/PDF', ur: 'Meeting Minutes Software vs Word/PDF' },
    seoTitle: { ar: 'برنامج محاضر الاجتماعات vs Word/PDF | ديوان سويت', en: 'Meeting Minutes Software vs Word/PDF | Diwan Suite', hi: 'Meeting Minutes Software vs Word/PDF | Diwan Suite', ur: 'Meeting Minutes Software vs Word/PDF | Diwan Suite' },
    seoDescription: { ar: 'مقارنة بين إعداد محاضر الاجتماعات في Word/PDF وبرنامج محاضر ذكي يربط الحضور والنصاب والاعتماد والتوقيع والقرارات بالتنفيذ.', en: 'Compare Word/PDF meeting minutes with intelligent meeting minutes software that links attendance, quorum, approvals, e-signature, decisions, and execution.', hi: 'Word/PDF meeting minutes और smart minutes software की तुलना जो attendance, quorum, approval, e-signature और execution से जुड़ता है।', ur: 'Word/PDF meeting minutes اور smart minutes software کا موازنہ جو attendance، quorum، approval، e-signature اور execution سے جڑتا ہے۔' },
    summary: { ar: 'Word وPDF مناسبان للكتابة والحفظ، لكنهما لا يديران اعتماد المحضر ولا يربطان القرار بالتنفيذ. المحضر الرسمي يحتاج مسارًا، توقيعًا، سجل تعديلات، وربطًا بالمهام.', en: 'Word and PDF are useful for writing and storing, but they do not manage minutes approval or connect decisions to execution. Official minutes need workflow, signature, versioning, and task linkage.', hi: 'Word और PDF writing/storage के लिए उपयोगी हैं, पर approval या execution linkage नहीं संभालते। Official minutes को workflow, signature, versions और task linkage चाहिए।', ur: 'Word اور PDF writing/storage کے لیے مفید ہیں، مگر approval یا execution linkage نہیں سنبھالتے۔ Official minutes کو workflow، signature، versions اور task linkage چاہیے۔' },
    directAnswer: { ar: 'Word يكتب المحضر، لكنه لا يدير اعتماده ولا يربطه بالقرار والتنفيذ. ديوان سويت يحول المحضر إلى وثيقة حوكمة قابلة للمراجعة والتوقيع والتتبع.', en: 'Word writes the minutes, but it does not manage approval or link them to decisions and execution. Diwan Suite turns minutes into a reviewable, signable, and traceable governance record.', hi: 'Word minutes लिखता है, लेकिन approval और decisions/execution से लिंक नहीं करता। Diwan Suite minutes को reviewable, signable और traceable governance record बनाता है।', ur: 'Word minutes لکھتا ہے، مگر approval اور decisions/execution سے link نہیں کرتا۔ Diwan Suite minutes کو reviewable، signable اور traceable governance record بناتا ہے۔' },
    alternativeName: { ar: 'Word/PDF', en: 'Word/PDF', hi: 'Word/PDF', ur: 'Word/PDF' },
    diwanName: { ar: 'محاضر ديوان سويت', en: 'Diwan Suite minutes', hi: 'Diwan Suite minutes', ur: 'Diwan Suite minutes' },
    ...positions(
      { ar: 'ملف منفصل يحتاج مراجعة وإرسالًا وحفظًا يدويًا.', en: 'A separate file that needs manual review, sending, and storage.', hi: 'Separate file जिसे manual review, sending और storage चाहिए।', ur: 'Separate file جسے manual review، sending اور storage چاہیے۔' },
      commonDiwan,
      {
        officialMinutes: { ar: 'محضر كملف، وليس سجلًا مؤسسيًا مترابطًا.', en: 'Minutes as a file, not a connected institutional record.', hi: 'Minutes as file, connected institutional record नहीं।', ur: 'Minutes as file، connected institutional record نہیں۔' },
        approvalSignature: { ar: 'الاعتماد والتوقيع يتمان خارج الملف أو عبر مراسلات.', en: 'Approval and signature happen outside the file or through messages.', hi: 'Approval/signature file के बाहर या messages में होता है।', ur: 'Approval/signature file کے باہر یا messages میں ہوتا ہے۔' },
        auditTrail: { ar: 'سجل النسخ والتعديلات محدود أو غير مركزي.', en: 'Version and change trail is limited or not centralized.', hi: 'Version/change trail limited या centralized नहीं।', ur: 'Version/change trail limited یا centralized نہیں۔' },
      }
    ),
    practicalAnalysis: {
      ar: ['الاعتماد عبر الملفات يخلق أكثر من نسخة ويصعب معرفة النسخة النهائية.', 'المحضر غير المرتبط بالقرار يجعل المتابعة تبدأ من الصفر بعد الاجتماع.', 'ربط المحضر بالحضور والنصاب والتوقيع يجعل الوثيقة جاهزة للمراجعة والامتثال.'],
      en: ['File-based approval creates multiple versions and makes the final version harder to identify.', 'Minutes that are not linked to decisions force follow-up to start from scratch after the meeting.', 'Linking minutes with attendance, quorum, and signature makes the record audit-ready.'],
      hi: ['File-based approval multiple versions बनाता है और final version पहचानना कठिन करता है।', 'Decisions से linked न हों तो follow-up meeting के बाद फिर से शुरू होता है।', 'Attendance, quorum और signature से linked minutes audit-ready होते हैं।'],
      ur: ['File-based approval multiple versions بناتا ہے اور final version پہچاننا مشکل کرتا ہے۔', 'Decisions سے linked نہ ہوں تو follow-up meeting کے بعد دوبارہ شروع ہوتا ہے۔', 'Attendance، quorum اور signature سے linked minutes audit-ready ہوتے ہیں۔'],
    },
    chooseAlternative: { ar: 'تكتب ملاحظات داخلية غير رسمية ولا تحتاج اعتمادًا أو تتبعًا.', en: 'You only write informal internal notes without approval or tracking needs.', hi: 'केवल informal internal notes लिखने हों और approval/tracking न चाहिए।', ur: 'صرف informal internal notes لکھنے ہوں اور approval/tracking نہ چاہیے۔' },
    chooseDiwan: { ar: 'تحتاج محاضر مجالس ولجان وجمعيات قابلة للاعتماد والتوقيع وربط القرارات بالتنفيذ.', en: 'You need board, committee, or assembly minutes that require approval, signature, and decision execution linkage.', hi: 'Board, committee या assembly minutes को approval, signature और execution linkage चाहिए।', ur: 'Board، committee یا assembly minutes کو approval، signature اور execution linkage چاہیے۔' },
    scenario: { ar: 'أمين سر مجلس يعد محضرًا بعد الاجتماع ثم يرسله للمراجعة. في Word/PDF تتعدد النسخ وتنفصل القرارات. في ديوان سويت يتم إعداد المحضر داخل الاجتماع، ربطه بالحضور والنصاب، اعتماده، توقيعه، وتحويل قراراته إلى مهام.', en: 'A board secretary drafts minutes after a meeting and sends them for review. In Word/PDF, versions multiply and decisions are separated. In Diwan Suite, minutes are prepared in context, linked to attendance and quorum, approved, signed, and converted into tasks.', hi: 'Board secretary meeting के बाद minutes draft करता है। Word/PDF में versions बढ़ते हैं और decisions अलग हो जाते हैं। Diwan Suite में minutes context में तैयार, attendance/quorum से linked, approved, signed और tasks में बदलते हैं।', ur: 'Board secretary meeting کے بعد minutes draft کرتا ہے۔ Word/PDF میں versions بڑھتے ہیں اور decisions الگ ہو جاتے ہیں۔ Diwan Suite میں minutes context میں تیار، attendance/quorum سے linked، approved، signed اور tasks میں بدلتے ہیں۔' },
    faq: {
      ar: [{ q: 'هل Word كاف لإعداد محاضر مجلس الإدارة؟', a: 'قد يكفي للكتابة الأولية، لكنه لا يكفي للاعتماد والتوقيع وسجل التدقيق وربط القرارات بالتنفيذ.' }, { q: 'ما الفرق بين محضر Word ومحضر ديوان سويت؟', a: 'محضر ديوان سويت مرتبط بالحضور والنصاب والمرفقات والقرارات والاعتماد والتوقيع وسجل التعديلات.' }, { q: 'هل يدعم ديوان سويت منع التعديل بعد الاعتماد؟', a: 'نعم، يمكن ضبط مسارات الاعتماد والتوقيع وحفظ سجل التعديلات وفق الصلاحيات.' }],
      en: [{ q: 'Is Word enough for board minutes?', a: 'It may be enough for drafting, but not for approval, signature, audit trail, and decision execution linkage.' }, { q: 'How are Diwan Suite minutes different from Word minutes?', a: 'They are linked to attendance, quorum, attachments, decisions, approvals, e-signature, and change history.' }, { q: 'Can Diwan Suite prevent edits after approval?', a: 'Yes. Approval and signature workflows can preserve change history according to permissions.' }],
      hi: [{ q: 'क्या Word board minutes के लिए पर्याप्त है?', a: 'Drafting के लिए हो सकता है, लेकिन approval, signature, audit trail और decision execution linkage के लिए नहीं।' }, { q: 'Diwan Suite minutes Word से कैसे अलग हैं?', a: 'वे attendance, quorum, attachments, decisions, approvals, e-signature और change history से जुड़े होते हैं।' }, { q: 'क्या approval के बाद edits रोके जा सकते हैं?', a: 'हाँ, permissions के अनुसार approval/signature workflows और change history रखी जा सकती है।' }],
      ur: [{ q: 'کیا Word board minutes کے لیے کافی ہے؟', a: 'Drafting کے لیے ہو سکتا ہے، مگر approval، signature، audit trail اور decision execution linkage کے لیے نہیں۔' }, { q: 'Diwan Suite minutes Word سے کیسے مختلف ہیں؟', a: 'یہ attendance، quorum، attachments، decisions، approvals، e-signature اور change history سے linked ہوتے ہیں۔' }, { q: 'کیا approval کے بعد edits روکے جا سکتے ہیں؟', a: 'جی ہاں، permissions کے مطابق approval/signature workflows اور change history رکھی جا سکتی ہے۔' }],
    },
    relatedPages: ['meetingMinutesSoftware', 'meetingMinutesEsignature', 'aiMeetingMinutesVsManualWordPdf'],
    ctaTitle: { ar: 'حوّل محاضر الاجتماعات من ملفات إلى سجلات حوكمة', en: 'Turn minutes from files into governance records', hi: 'Minutes को files से governance records में बदलें', ur: 'Minutes کو files سے governance records میں بدلیں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف يدير ديوان سويت المحضر من الإعداد إلى الاعتماد والتوقيع والتنفيذ.', en: 'Book a walkthrough to see how Diwan Suite manages minutes from drafting to approval, signature, and execution.', hi: 'Demo देखें कि Diwan Suite drafting से approval, signature और execution तक minutes कैसे संभालता है।', ur: 'Demo دیکھیں کہ Diwan Suite drafting سے approval، signature اور execution تک minutes کیسے سنبھالتا ہے۔' },
  },
  {
    key: 'boardPortalVsEmail',
    kind: 'direct',
    title: { ar: 'Board Portal vs Email: لماذا لا يكفي البريد الإلكتروني لإدارة اجتماعات مجلس الإدارة؟', en: 'Board Portal vs Email: Why Email Is Not Enough for Board Meetings', hi: 'Board Portal vs Email: Board Meetings के लिए Email क्यों पर्याप्त नहीं', ur: 'Board Portal vs Email: Board Meetings کے لیے Email کیوں کافی نہیں' },
    seoTitle: { ar: 'Board Portal vs Email لإدارة مجالس الإدارة | ديوان سويت', en: 'Board Portal vs Email for Board Meetings | Diwan Suite', hi: 'Board Portal vs Email for Board Meetings | Diwan Suite', ur: 'Board Portal vs Email for Board Meetings | Diwan Suite' },
    seoDescription: { ar: 'تعرف على الفرق بين استخدام البريد الإلكتروني ومنصة Board Portal لإدارة اجتماعات مجلس الإدارة والمحاضر والقرارات وسجل التدقيق والسرية.', en: 'Compare email with a Board Portal for board meetings, minutes, decisions, audit trail, confidentiality, and governance follow-up.', hi: 'Email और Board Portal की तुलना: board meetings, minutes, decisions, audit trail, confidentiality और governance follow-up।', ur: 'Email اور Board Portal کا موازنہ: board meetings، minutes، decisions، audit trail، confidentiality اور governance follow-up۔' },
    summary: { ar: 'البريد الإلكتروني وسيلة تواصل ممتازة، لكنه ليس منصة حوكمة. عندما تصبح المرفقات والقرارات والاعتمادات جزءًا من مسؤولية مجلس الإدارة، تحتاج الجهة إلى سجل مركزي قابل للتتبع.', en: 'Email is an excellent communication tool, but it is not a governance platform. When attachments, decisions, and approvals become board responsibilities, the organization needs a centralized traceable record.', hi: 'Email communication के लिए उत्कृष्ट है, governance platform नहीं। Attachments, decisions और approvals board responsibility बनें तो centralized traceable record चाहिए।', ur: 'Email communication کے لیے بہترین ہے، governance platform نہیں۔ Attachments، decisions اور approvals board responsibility بنیں تو centralized traceable record چاہیے۔' },
    directAnswer: { ar: 'يكفي البريد للتواصل غير الرسمي، لكنه لا يكفي لإدارة اجتماعات مجلس الإدارة عندما تحتاج نصابًا ومحاضر واعتمادًا وقرارات ومتابعة وسجل تدقيق وسرية.', en: 'Email is enough for informal communication, but not for board meetings that require quorum, minutes, approvals, decisions, follow-up, audit trail, and confidentiality.', hi: 'Email informal communication के लिए ठीक है, लेकिन quorum, minutes, approvals, decisions, follow-up, audit trail और confidentiality वाली board meetings के लिए नहीं।', ur: 'Email informal communication کے لیے ٹھیک ہے، مگر quorum، minutes، approvals، decisions، follow-up، audit trail اور confidentiality والی board meetings کے لیے نہیں۔' },
    alternativeName: { ar: 'البريد الإلكتروني', en: 'Email', hi: 'Email', ur: 'Email' },
    diwanName: { ar: 'Board Portal من ديوان سويت', en: 'Diwan Suite Board Portal', hi: 'Diwan Suite Board Portal', ur: 'Diwan Suite Board Portal' },
    ...positions(
      { ar: 'مناسب للتواصل، لكنه يشتت المرفقات والنسخ والقرارات.', en: 'Good for communication, but scatters attachments, versions, and decisions.', hi: 'Communication के लिए अच्छा, पर attachments, versions और decisions बिखेरता है।', ur: 'Communication کے لیے اچھا، مگر attachments، versions اور decisions بکھیرتا ہے۔' },
      commonDiwan,
      {
        auditTrail: { ar: 'لا يوفر سجل تدقيق مركزيًا لكل إجراء ونسخة واعتماد.', en: 'Does not provide a centralized audit trail for actions, versions, and approvals.', hi: 'Actions, versions और approvals के लिए centralized audit trail नहीं।', ur: 'Actions، versions اور approvals کے لیے centralized audit trail نہیں۔' },
        security: { ar: 'إعادة الإرسال والمرفقات تزيد مخاطر مشاركة غير مقصودة.', en: 'Forwarding and attachments increase unintended sharing risks.', hi: 'Forwarding और attachments unintended sharing risk बढ़ाते हैं।', ur: 'Forwarding اور attachments unintended sharing risk بڑھاتے ہیں۔' },
      }
    ),
    practicalAnalysis: {
      ar: ['تشتت المرفقات في البريد يجعل معرفة النسخة المعتمدة أصعب.', 'غياب سجل تدقيق مركزي يضعف القدرة على إثبات من اطلع واعتمد وعدّل.', 'عندما ينتقل القرار عبر رسائل منفصلة تضيع العلاقة بين النقاش والتنفيذ.'],
      en: ['Scattered email attachments make the approved version harder to identify.', 'A missing central audit trail weakens proof of who viewed, approved, or changed what.', 'When decisions move through separate messages, the link between discussion and execution is lost.'],
      hi: ['Email attachments बिखरने से approved version पहचानना कठिन होता है।', 'Central audit trail न होने से proof कमजोर होता है।', 'Separate messages में decisions जाने से discussion और execution का संबंध टूटता है।'],
      ur: ['Email attachments بکھرنے سے approved version پہچاننا مشکل ہوتا ہے۔', 'Central audit trail نہ ہونے سے proof کمزور ہوتا ہے۔', 'Separate messages میں decisions جانے سے discussion اور execution کا تعلق ٹوٹتا ہے۔'],
    },
    chooseAlternative: { ar: 'يكون الاجتماع غير رسمي والتواصل بسيطًا ولا توجد محاضر أو قرارات تحتاج اعتمادًا.', en: 'The meeting is informal, communication is simple, and no minutes or decisions require approval.', hi: 'Meeting informal हो، communication simple ہو اور minutes/decisions को approval न चाहिए।', ur: 'Meeting informal ہو، communication simple ہو اور minutes/decisions کو approval نہ چاہیے۔' },
    chooseDiwan: { ar: 'تدير مجلس إدارة أو لجنة أو جمعية وتحتاج سرية ومرفقات ومحاضر واعتمادًا وتنفيذًا وسجل تدقيق.', en: 'You manage a board, committee, or assembly and need confidentiality, attachments, minutes, approvals, execution, and audit trail.', hi: 'Board, committee या assembly manage करनी हो और confidentiality, attachments, minutes, approvals, execution और audit trail चाहिए।', ur: 'Board، committee یا assembly manage کرنی ہو اور confidentiality، attachments، minutes، approvals، execution اور audit trail چاہیے۔' },
    scenario: { ar: 'مجلس إدارة يستقبل جدول أعمال ومرفقات عبر البريد. بعض الأعضاء يراجعون نسخة قديمة، وتصدر قرارات في رسائل متفرقة. في ديوان سويت تكون الدعوة، جدول الأعمال، المرفقات، المحضر، القرار، المهمة، والتقرير داخل سجل واحد.', en: 'A board receives agendas and attachments by email. Some members review outdated versions, and decisions appear in scattered threads. In Diwan Suite, invitation, agenda, attachments, minutes, decision, task, and report live in one record.', hi: 'Board email से agenda और attachments पाता है। कुछ members पुरानी versions देखते हैं और decisions scattered threads में आते हैं। Diwan Suite में invitation, agenda, attachments, minutes, decision, task और report एक record में रहते हैं।', ur: 'Board email سے agenda اور attachments لیتا ہے۔ کچھ members پرانی versions دیکھتے ہیں اور decisions scattered threads میں آتے ہیں۔ Diwan Suite میں invitation، agenda، attachments، minutes، decision، task اور report ایک record میں رہتے ہیں۔' },
    faq: {
      ar: [{ q: 'هل يمكن استخدام البريد الإلكتروني لإدارة اجتماعات مجلس الإدارة؟', a: 'يمكن استخدامه للتواصل، لكنه لا يكفي لإدارة الحوكمة والمحاضر والقرارات والاعتماد وسجل التدقيق.' }, { q: 'ما الفرق بين Board Portal والبريد الإلكتروني؟', a: 'Board Portal يدير دورة الاجتماع والقرار في سجل مركزي، بينما البريد يوزع الرسائل والملفات دون مسار حوكمة متكامل.' }, { q: 'هل ديوان سويت يلغي البريد؟', a: 'لا، يمكن أن يبقى البريد للتنبيهات والتواصل، بينما يدير ديوان سويت الحوكمة الرسمية للاجتماع والقرار.' }],
      en: [{ q: 'Can email be used to manage board meetings?', a: 'It can be used for communication, but it is not enough for governance, minutes, decisions, approvals, and audit trail.' }, { q: 'What is the difference between a Board Portal and email?', a: 'A Board Portal manages the meeting and decision lifecycle in a central record, while email distributes messages and files without a full governance workflow.' }, { q: 'Does Diwan Suite replace email completely?', a: 'No. Email can remain for notifications and communication, while Diwan Suite manages the official governance workflow.' }],
      hi: [{ q: 'क्या email board meetings manage कर सकता है?', a: 'Communication के लिए कर सकता है, लेकिन governance, minutes, decisions, approvals और audit trail के लिए पर्याप्त नहीं।' }, { q: 'Board Portal और email में क्या अंतर है?', a: 'Board Portal meeting और decision lifecycle को central record में manage करता है; email messages/files distribute करता है।' }, { q: 'क्या Diwan Suite email को पूरी तरह replace करता है?', a: 'नहीं। Email notifications/communication के लिए रह सकता है; governance workflow Diwan Suite संभालता है।' }],
      ur: [{ q: 'کیا email board meetings manage کر سکتا ہے؟', a: 'Communication کے لیے کر سکتا ہے، مگر governance، minutes، decisions، approvals اور audit trail کے لیے کافی نہیں۔' }, { q: 'Board Portal اور email میں کیا فرق ہے؟', a: 'Board Portal meeting اور decision lifecycle کو central record میں manage کرتا ہے؛ email messages/files distribute کرتا ہے۔' }, { q: 'کیا Diwan Suite email کو مکمل replace کرتا ہے؟', a: 'نہیں۔ Email notifications/communication کے لیے رہ سکتا ہے؛ governance workflow Diwan Suite سنبھالتا ہے۔' }],
    },
    relatedPages: ['boardPortalSaudiArabia', 'boardManagementSoftwarePage', 'governanceSecurityCompliance'],
    ctaTitle: { ar: 'انتقل من رسائل متفرقة إلى سجل مجلس موثق', en: 'Move from scattered threads to an auditable board record', hi: 'Scattered threads से auditable board record तक जाएँ', ur: 'Scattered threads سے auditable board record تک جائیں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف يحافظ ديوان سويت على سرية ومركزية اجتماعات مجلس الإدارة.', en: 'Book a walkthrough showing how Diwan Suite keeps board meetings confidential and centralized.', hi: 'Demo देखें कि Diwan Suite board meetings को confidential और centralized कैसे रखता है।', ur: 'Demo دیکھیں کہ Diwan Suite board meetings کو confidential اور centralized کیسے رکھتا ہے۔' },
  },
  {
    key: 'boardPortalVsTeamsZoom',
    kind: 'direct',
    title: { ar: 'Board Portal vs Teams وZoom: الفرق بين عقد الاجتماع وحوكمة القرار', en: 'Board Portal vs Teams and Zoom: Meeting Call vs Decision Governance', hi: 'Board Portal vs Teams और Zoom: Meeting Call vs Decision Governance', ur: 'Board Portal vs Teams اور Zoom: Meeting Call vs Decision Governance' },
    seoTitle: { ar: 'Board Portal vs Teams وZoom | ديوان سويت', en: 'Board Portal vs Teams and Zoom | Diwan Suite', hi: 'Board Portal vs Teams and Zoom | Diwan Suite', ur: 'Board Portal vs Teams and Zoom | Diwan Suite' },
    seoDescription: { ar: 'مقارنة مهنية بين Teams وZoom كأدوات اجتماع مرئي وBoard Portal كطبقة حوكمة لإدارة النصاب والمحاضر والقرارات والتقارير.', en: 'A professional comparison between Teams/Zoom as video meeting tools and a Board Portal as a governance layer for quorum, minutes, decisions, and reports.', hi: 'Teams/Zoom video meeting tools और Board Portal governance layer की तुलना: quorum, minutes, decisions और reports।', ur: 'Teams/Zoom video meeting tools اور Board Portal governance layer کا موازنہ: quorum، minutes، decisions اور reports۔' },
    summary: { ar: 'Teams وZoom وWebex وGoogle Meet أدوات ممتازة لعقد الاجتماع المرئي، لكنها لا تدير حوكمة الاجتماع. ديوان سويت يعمل كطبقة حوكمة فوق الاجتماع، لا كبديل عدائي له.', en: 'Teams, Zoom, Webex, and Google Meet are excellent for hosting video meetings, but they do not govern the meeting. Diwan Suite acts as a governance layer above the meeting, not as a hostile replacement.', hi: 'Teams, Zoom, Webex और Google Meet video meetings के लिए अच्छे हैं, लेकिन meeting governance नहीं संभालते। Diwan Suite meeting के ऊपर governance layer की तरह काम करता है।', ur: 'Teams، Zoom، Webex اور Google Meet video meetings کے لیے اچھے ہیں، مگر meeting governance نہیں سنبھالتے۔ Diwan Suite meeting کے اوپر governance layer کے طور پر کام کرتا ہے۔' },
    directAnswer: { ar: 'Teams وZoom يعقدان الاجتماع، لكنهما لا يديران النصاب والمحاضر الرسمية والقرارات والمتابعة وسجل التدقيق. ديوان سويت يضيف طبقة حوكمة تربط الاجتماع المرئي بالقرار والتنفيذ.', en: 'Teams and Zoom host the meeting, but they do not manage quorum, official minutes, decisions, follow-up, and audit trail. Diwan Suite adds the governance layer that connects the call to decisions and execution.', hi: 'Teams/Zoom meeting host करते हैं, पर quorum, official minutes, decisions, follow-up और audit trail नहीं संभालते। Diwan Suite call को decisions/execution से जोड़ने वाली governance layer देता है।', ur: 'Teams/Zoom meeting host کرتے ہیں، مگر quorum، official minutes، decisions، follow-up اور audit trail نہیں سنبھالتے۔ Diwan Suite call کو decisions/execution سے جوڑنے والی governance layer دیتا ہے۔' },
    alternativeName: { ar: 'Teams / Zoom', en: 'Teams / Zoom', hi: 'Teams / Zoom', ur: 'Teams / Zoom' },
    diwanName: { ar: 'ديوان سويت كطبقة حوكمة', en: 'Diwan Suite governance layer', hi: 'Diwan Suite governance layer', ur: 'Diwan Suite governance layer' },
    ...positions(
      { ar: 'ممتاز لعقد الاجتماع المرئي، وليس لإدارة الحوكمة بعده.', en: 'Excellent for the video meeting, not for post-meeting governance.', hi: 'Video meeting के लिए excellent, post-meeting governance के लिए नहीं।', ur: 'Video meeting کے لیے excellent، post-meeting governance کے لیے نہیں۔' },
      commonDiwan,
      {
        quorum: { ar: 'لا يدير نصابًا حوكميًا مرتبطًا بالمجلس أو الجمعية.', en: 'Does not manage governance quorum tied to a board or assembly.', hi: 'Board/assembly से linked governance quorum नहीं संभालता।', ur: 'Board/assembly سے linked governance quorum نہیں سنبھالتا۔' },
        officialMinutes: { ar: 'التسجيل أو الملاحظات لا تعني محضرًا رسميًا معتمدًا.', en: 'Recording or notes do not equal official approved minutes.', hi: 'Recording/notes official approved minutes नहीं होते।', ur: 'Recording/notes official approved minutes نہیں ہوتے۔' },
        dashboards: { ar: 'لا يقدم تقارير امتثال للمجلس واللجان والقرارات.', en: 'Does not provide board, committee, and decision compliance reporting.', hi: 'Board, committee और decision compliance reports नहीं देता।', ur: 'Board، committee اور decision compliance reports نہیں دیتا۔' },
      }
    ),
    practicalAnalysis: {
      ar: ['الاجتماع المرئي يحل الحضور عن بعد، لكنه لا يكفي لإثبات دورة القرار.', 'إذا بقيت المحاضر والمهام خارج الاجتماع، تتفرق المسؤوليات بعد انتهاء المكالمة.', 'التكامل الأفضل هو استخدام أدوات الاجتماع للاتصال وديوان سويت للحوكمة والتوثيق والتنفيذ.'],
      en: ['Video conferencing solves remote attendance, but not the decision lifecycle.', 'If minutes and tasks remain outside the meeting, accountability scatters after the call.', 'The best model is to use meeting tools for the call and Diwan Suite for governance, documentation, and execution.'],
      hi: ['Video conferencing remote attendance हल करता है, decision lifecycle नहीं।', 'Minutes और tasks meeting से बाहर रहें तो accountability call के बाद बिखरती है।', 'Best model: call के लिए meeting tools और governance/documentation/execution के लिए Diwan Suite।'],
      ur: ['Video conferencing remote attendance حل کرتا ہے، decision lifecycle نہیں۔', 'Minutes اور tasks meeting سے باہر رہیں تو accountability call کے بعد بکھرتی ہے۔', 'Best model: call کے لیے meeting tools اور governance/documentation/execution کے لیے Diwan Suite۔'],
    },
    chooseAlternative: { ar: 'تحتاج فقط اجتماعًا مرئيًا أو مكالمة عمل غير رسمية.', en: 'You only need a video call or informal work meeting.', hi: 'صرف video call یا informal work meeting چاہیے۔', ur: 'صرف video call یا informal work meeting چاہیے۔' },
    chooseDiwan: { ar: 'تحتاج اجتماع مجلس أو لجنة له جدول أعمال ونصاب ومحضر وقرارات ومهام وتقارير.', en: 'You need a board or committee meeting with agenda, quorum, minutes, decisions, tasks, and reports.', hi: 'Board/committee meeting में agenda, quorum, minutes, decisions, tasks और reports चाहिए।', ur: 'Board/committee meeting میں agenda، quorum، minutes، decisions، tasks اور reports چاہیے۔' },
    scenario: { ar: 'لجنة تعقد اجتماعها عبر Teams. الاتصال ناجح، لكن المحضر والقرارات والمتابعة تُدار خارجه. مع ديوان سويت يتم ربط الاجتماع بمنصة الحوكمة: جدول أعمال، حضور، نصاب، محضر، قرارات، مهام، وتقارير.', en: 'A committee holds its call on Teams. The call works, but minutes, decisions, and follow-up are managed elsewhere. With Diwan Suite, the call is tied to governance: agenda, attendance, quorum, minutes, decisions, tasks, and reports.', hi: 'Committee Teams पर call करती है। Call successful है, पर minutes, decisions और follow-up अलग जगह होते हैं। Diwan Suite call को agenda, attendance, quorum, minutes, decisions, tasks और reports से जोड़ता है।', ur: 'Committee Teams پر call کرتی ہے۔ Call successful ہے، مگر minutes، decisions اور follow-up الگ جگہ ہوتے ہیں۔ Diwan Suite call کو agenda، attendance، quorum، minutes، decisions، tasks اور reports سے جوڑتا ہے۔' },
    faq: {
      ar: [{ q: 'هل Teams أو Zoom يكفيان لإدارة محاضر الاجتماعات؟', a: 'يكفيان لعقد الاجتماع المرئي، لكنهما لا يوفران مسار حوكمة كامل للمحاضر والقرارات والمتابعة والاعتماد.' }, { q: 'هل ديوان سويت بديل عن Teams وZoom؟', a: 'لا. ديوان سويت يعمل كطبقة حوكمة وتوثيق وتنفيذ يمكنها التكامل مع أدوات الاجتماع المرئي.' }, { q: 'ما الفرق بين عقد الاجتماع وحوكمة القرار؟', a: 'عقد الاجتماع يعني توفير الاتصال، أما حوكمة القرار فتعني توثيق المحضر والقرار وربطه بمسؤول وتنفيذ وتقرير.' }],
      en: [{ q: 'Are Teams or Zoom enough for meeting minutes?', a: 'They are enough for the call, but not for a full governance workflow for minutes, decisions, follow-up, and approvals.' }, { q: 'Does Diwan Suite replace Teams and Zoom?', a: 'No. It works as a governance, documentation, and execution layer that can integrate with video meeting tools.' }, { q: 'What is the difference between holding a meeting and governing a decision?', a: 'Holding a meeting provides the call; decision governance documents minutes, assigns owners, tracks execution, and reports status.' }],
      hi: [{ q: 'क्या Teams/Zoom meeting minutes के लिए पर्याप्त हैं?', a: 'Call के लिए पर्याप्त हैं, लेकिन minutes, decisions, follow-up और approvals के full governance workflow के लिए नहीं।' }, { q: 'क्या Diwan Suite Teams/Zoom को replace करता है?', a: 'नहीं। यह video meeting tools के साथ governance, documentation और execution layer की तरह काम करता है।' }, { q: 'Meeting hold करना और decision governance में क्या फर्क है?', a: 'Meeting hold करना call देना है; decision governance minutes, owners, execution और reports को manage करना है।' }],
      ur: [{ q: 'کیا Teams/Zoom meeting minutes کے لیے کافی ہیں؟', a: 'Call کے لیے کافی ہیں، مگر minutes، decisions، follow-up اور approvals کے full governance workflow کے لیے نہیں۔' }, { q: 'کیا Diwan Suite Teams/Zoom کو replace کرتا ہے؟', a: 'نہیں۔ یہ video meeting tools کے ساتھ governance، documentation اور execution layer کے طور پر کام کرتا ہے۔' }, { q: 'Meeting hold کرنا اور decision governance میں کیا فرق ہے؟', a: 'Meeting hold کرنا call دینا ہے؛ decision governance minutes، owners، execution اور reports کو manage کرنا ہے۔' }],
    },
    relatedPages: ['integrationsBoardGovernance', 'aiGovernanceAssistant', 'boardManagementSoftwarePage'],
    ctaTitle: { ar: 'اربط اجتماعاتك المرئية بحوكمة القرار', en: 'Connect video meetings with decision governance', hi: 'Video meetings को decision governance से जोड़ें', ur: 'Video meetings کو decision governance سے جوڑیں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف يعمل ديوان سويت كطبقة حوكمة فوق أدوات الاجتماعات المرئية.', en: 'Book a walkthrough showing how Diwan Suite acts as a governance layer above video meeting tools.', hi: 'Demo देखें कि Diwan Suite video meeting tools के ऊपर governance layer कैसे बनता है।', ur: 'Demo دیکھیں کہ Diwan Suite video meeting tools کے اوپر governance layer کیسے بنتا ہے۔' },
  },
  {
    key: 'governancePlatformVsMeetingSoftware',
    kind: 'direct',
    title: { ar: 'منصة حوكمة متخصصة vs برنامج اجتماعات عام', en: 'Specialized Governance Platform vs General Meeting Software', hi: 'Specialized Governance Platform vs General Meeting Software', ur: 'Specialized Governance Platform vs General Meeting Software' },
    seoTitle: { ar: 'منصة حوكمة متخصصة vs برنامج اجتماعات عام | ديوان سويت', en: 'Governance Platform vs Meeting Software | Diwan Suite', hi: 'Governance Platform vs Meeting Software | Diwan Suite', ur: 'Governance Platform vs Meeting Software | Diwan Suite' },
    seoDescription: { ar: 'اعرف الفرق بين برنامج اجتماعات عام ومنصة حوكمة متخصصة تدير المجالس واللجان والمحاضر والقرارات والتقارير والامتثال.', en: 'Understand the difference between general meeting software and a specialized governance platform for boards, committees, minutes, decisions, reports, and compliance.', hi: 'General meeting software और specialized governance platform का अंतर समझें: boards, committees, minutes, decisions, reports और compliance।', ur: 'General meeting software اور specialized governance platform کا فرق سمجھیں: boards، committees، minutes، decisions، reports اور compliance۔' },
    summary: { ar: 'برنامج الاجتماعات العام ينظم موعدًا أو اتصالًا، أما منصة الحوكمة فتدير قرارًا ومسؤولية وامتثالًا. هذا الفرق مهم جدًا في بيئات المجالس واللجان والجمعيات.', en: 'General meeting software organizes a meeting or call; a governance platform manages decisions, accountability, and compliance. This matters in boards, committees, and assemblies.', hi: 'General meeting software meeting/call organize करता है; governance platform decisions, accountability और compliance manage करता है। Boards, committees और assemblies में यह महत्वपूर्ण है।', ur: 'General meeting software meeting/call organize کرتا ہے؛ governance platform decisions، accountability اور compliance manage کرتا ہے۔ Boards، committees اور assemblies میں یہ اہم ہے۔' },
    directAnswer: { ar: 'برنامج الاجتماعات العام مناسب للتنسيق، لكنه لا يكفي إذا كانت البيئة تحتاج إدارة مجلس ولجنة ونصاب ومحضر رسمي وقرار ومهمة وتقرير امتثال.', en: 'General meeting software is useful for coordination, but not enough when the environment needs board, committee, quorum, official minutes, decisions, tasks, and compliance reports.', hi: 'General meeting software coordination के लिए उपयोगी है, पर board, committee, quorum, official minutes, decisions, tasks और compliance reports के लिए पर्याप्त नहीं।', ur: 'General meeting software coordination کے لیے مفید ہے، مگر board، committee، quorum، official minutes، decisions، tasks اور compliance reports کے لیے کافی نہیں۔' },
    alternativeName: { ar: 'برنامج اجتماعات عام', en: 'General meeting software', hi: 'General meeting software', ur: 'General meeting software' },
    diwanName: { ar: 'منصة حوكمة متخصصة', en: 'Specialized governance platform', hi: 'Specialized governance platform', ur: 'Specialized governance platform' },
    ...positions(
      { ar: 'يركز على الموعد والدعوة وربما الملاحظات العامة.', en: 'Focuses on scheduling, invitation, and possibly general notes.', hi: 'Scheduling, invitation और general notes पर केंद्रित।', ur: 'Scheduling، invitation اور general notes پر مرکوز۔' },
      commonDiwan,
      {
        boardCommittees: { ar: 'لا يميز بين مجلس ولجنة وجمعية وأمين سر ومسارات اعتماد.', en: 'Does not distinguish board, committee, assembly, secretary, and approval paths.', hi: 'Board, committee, assembly, secretary और approval paths अलग नहीं करता।', ur: 'Board، committee، assembly، secretary اور approval paths الگ نہیں کرتا۔' },
        dashboards: { ar: 'تقاريره غالبًا تشغيلية وليست تقارير حوكمة وامتثال.', en: 'Reports are often operational rather than governance and compliance reporting.', hi: 'Reports अक्सर operational होते हैं, governance/compliance नहीं।', ur: 'Reports اکثر operational ہوتے ہیں، governance/compliance نہیں۔' },
      }
    ),
    practicalAnalysis: {
      ar: ['الفرق الجوهري ليس في إنشاء الاجتماع، بل في إدارة نتائجه ومسؤوليته.', 'المنصة المتخصصة تقلل الفجوة بين النقاش والتنفيذ والرقابة.', 'كلما زادت حساسية الجهة، أصبح سجل التدقيق والصلاحيات والتقارير جزءًا من الحل وليس إضافة جانبية.'],
      en: ['The core difference is not creating the meeting; it is managing outcomes and accountability.', 'A specialized platform narrows the gap between discussion, execution, and oversight.', 'As sensitivity increases, audit trail, permissions, and reports become part of the solution, not an add-on.'],
      hi: ['मुख्य अंतर meeting बनाने में नहीं, outcomes और accountability manage करने में है।', 'Specialized platform discussion, execution और oversight के बीच gap घटाता है।', 'Sensitivity बढ़े तो audit trail, permissions और reports solution का हिस्सा बनते हैं।'],
      ur: ['اصل فرق meeting بنانے میں نہیں، outcomes اور accountability manage کرنے میں ہے۔', 'Specialized platform discussion، execution اور oversight کے gap کو کم کرتا ہے۔', 'Sensitivity بڑھے تو audit trail، permissions اور reports solution کا حصہ بنتے ہیں۔'],
    },
    chooseAlternative: { ar: 'تحتاج فقط جدولة اجتماع أو تنظيم اجتماع فريق بسيط.', en: 'You only need to schedule a meeting or organize a simple team session.', hi: 'صرف meeting schedule یا simple team session organize کرنا ہو۔', ur: 'صرف meeting schedule یا simple team session organize کرنا ہو۔' },
    chooseDiwan: { ar: 'تعمل في مجالس ولجان وجمعيات وتحتاج محاضر وقرارات ومسؤوليات وتقارير امتثال.', en: 'You operate boards, committees, or assemblies and need minutes, decisions, accountability, and compliance reporting.', hi: 'Boards, committees या assemblies हों और minutes, decisions, accountability तथा compliance reporting चाहिए।', ur: 'Boards، committees یا assemblies ہوں اور minutes، decisions، accountability اور compliance reporting چاہیے۔' },
    scenario: { ar: 'شركة لديها مجالس ولجان واجتماعات تنفيذية. برنامج اجتماعات عام ينظم الموعد، لكن القرارات والمتابعة تبقى خارجه. ديوان سويت يربط الاجتماع بالمحضر والقرار والتكليف والتقارير في منصة واحدة.', en: 'A company has boards, committees, and executive meetings. General meeting software schedules the meeting, but decisions and follow-up remain elsewhere. Diwan Suite connects the meeting, minutes, decisions, assignments, and reports in one platform.', hi: 'Company में boards, committees और executive meetings हैं। General software meeting schedule करता है, पर decisions/follow-up अलग रहते हैं। Diwan Suite meeting, minutes, decisions, assignments और reports को एक platform में जोड़ता है।', ur: 'Company میں boards، committees اور executive meetings ہیں۔ General software meeting schedule کرتا ہے، مگر decisions/follow-up الگ رہتے ہیں۔ Diwan Suite meeting، minutes، decisions، assignments اور reports کو ایک platform میں جوڑتا ہے۔' },
    faq: {
      ar: [{ q: 'ما الفرق بين برنامج إدارة الاجتماعات ومنصة حوكمة؟', a: 'برنامج الاجتماعات يركز على تنظيم الاجتماع، أما منصة الحوكمة فتدير المحاضر والقرارات والمسؤوليات والامتثال والتقارير.' }, { q: 'هل تحتاج كل شركة منصة حوكمة متخصصة؟', a: 'ليست كل شركة، لكن الجهات ذات المجالس واللجان والقرارات الرسمية تحتاج منصة متخصصة أكثر من أداة اجتماعات عامة.' }, { q: 'هل يدعم ديوان سويت التكامل مع أنظمة أخرى؟', a: 'نعم، صمم ديوان سويت ليعمل ضمن بيئة مؤسسية تشمل التكاملات والأرشفة والتقارير والصلاحيات.' }],
      en: [{ q: 'What is the difference between meeting software and a governance platform?', a: 'Meeting software focuses on organizing meetings; a governance platform manages minutes, decisions, accountability, compliance, and reports.' }, { q: 'Does every company need a specialized governance platform?', a: 'Not every company, but organizations with boards, committees, and formal decisions need more than a generic meeting tool.' }, { q: 'Does Diwan Suite support integrations?', a: 'Yes. It is designed for enterprise environments with integrations, archiving, reporting, and permissions.' }],
      hi: [{ q: 'Meeting software और governance platform में क्या फर्क है?', a: 'Meeting software meetings organize करता है; governance platform minutes, decisions, accountability, compliance और reports manage करता है।' }, { q: 'क्या हर company को specialized governance platform चाहिए?', a: 'हर company को नहीं, लेकिन boards, committees और formal decisions वाली organizations को generic meeting tool से अधिक चाहिए।' }, { q: 'क्या Diwan Suite integrations support करता है?', a: 'हाँ। यह integrations, archiving, reporting और permissions वाले enterprise environments के लिए बना है।' }],
      ur: [{ q: 'Meeting software اور governance platform میں کیا فرق ہے؟', a: 'Meeting software meetings organize کرتا ہے؛ governance platform minutes، decisions، accountability، compliance اور reports manage کرتا ہے۔' }, { q: 'کیا ہر company کو specialized governance platform چاہیے؟', a: 'ہر company کو نہیں، مگر boards، committees اور formal decisions والی organizations کو generic meeting tool سے زیادہ چاہیے۔' }, { q: 'کیا Diwan Suite integrations support کرتا ہے؟', a: 'جی ہاں۔ یہ integrations، archiving، reporting اور permissions والے enterprise environments کے لیے بنا ہے۔' }],
    },
    relatedPages: ['corporateGovernancePlatform', 'boardGovernanceSoftware', 'meetingManagementSoftware'],
    ctaTitle: { ar: 'اعرف هل تحتاج أداة اجتماع أم منصة حوكمة', en: 'Find out whether you need a meeting tool or a governance platform', hi: 'जानें आपको meeting tool चाहिए या governance platform', ur: 'جانیں آپ کو meeting tool چاہیے یا governance platform' },
    ctaBody: { ar: 'احجز عرضًا يوضح الفجوة بين إدارة الاجتماع وإدارة القرار داخل بيئتكم.', en: 'Book a walkthrough to understand the gap between managing meetings and governing decisions in your environment.', hi: 'Demo बुक करें और अपनी environment में meeting management और decision governance का gap समझें।', ur: 'Demo بک کریں اور اپنی environment میں meeting management اور decision governance کا gap سمجھیں۔' },
  },
  {
    key: 'aiMeetingMinutesVsManualWordPdf',
    kind: 'operational',
    title: { ar: 'المحاضر الإلكترونية بالذكاء الاصطناعي vs المحاضر اليدوية Word/PDF', en: 'AI Electronic Minutes vs Manual Word/PDF Minutes', hi: 'AI Electronic Minutes vs Manual Word/PDF Minutes', ur: 'AI Electronic Minutes vs Manual Word/PDF Minutes' },
    seoTitle: { ar: 'برنامج محاضر اجتماعات بالذكاء الاصطناعي لمجالس الإدارة واللجان | ديوان سويت', en: 'AI Meeting Minutes Software for Boards and Committees | Diwan Suite', hi: 'AI Meeting Minutes Software for Boards and Committees | Diwan Suite', ur: 'AI Meeting Minutes Software for Boards and Committees | Diwan Suite' },
    seoDescription: { ar: 'محاضر إلكترونية بالذكاء الاصطناعي لمجالس الإدارة واللجان: تلخيص النقاشات، استخراج القرارات، مسودة محضر، اعتماد، توقيع، وربط بالتنفيذ.', en: 'AI electronic minutes for boards and committees: summarize discussions, extract decisions, draft minutes, route approvals, e-sign, and link to execution.', hi: 'Boards और committees के लिए AI electronic minutes: discussions summarize, decisions extract, minutes draft, approvals, e-sign और execution link।', ur: 'Boards اور committees کے لیے AI electronic minutes: discussions summarize، decisions extract، minutes draft، approvals، e-sign اور execution link۔' },
    summary: { ar: 'ديوان سويت لا يكتفي بتسجيل الاجتماع أو تفريغ الحديث إلى نص. وكيل الذكاء الاصطناعي يفهم سياق الاجتماع، يميز المتحدثين، يلخص النقاشات، يستخرج القرارات والتوصيات، وينشئ مسودة محضر قابلة للمراجعة والاعتماد.', en: 'Diwan Suite does not stop at recording or transcription. The AI agent understands meeting context, identifies speakers, summarizes discussions, extracts decisions and recommendations, and drafts reviewable minutes.', hi: 'Diwan Suite केवल recording/transcription तक सीमित नहीं। AI agent meeting context समझता है, speakers पहचानता है, discussions summarize करता है, decisions/recommendations निकालता है और reviewable minutes draft करता है।', ur: 'Diwan Suite صرف recording/transcription تک محدود نہیں۔ AI agent meeting context سمجھتا ہے، speakers پہچانتا ہے، discussions summarize کرتا ہے، decisions/recommendations نکالتا ہے اور reviewable minutes draft کرتا ہے۔' },
    directAnswer: { ar: 'المحضر في ديوان سويت ليس ملف Word يتم إعداده بعد الاجتماع، بل مخرج حوكمي ذكي يبدأ من الاجتماع نفسه ويرتبط بالحضور والنصاب والقرارات والمهام والاعتماد والتوقيع وسجل التدقيق.', en: 'In Diwan Suite, minutes are not a Word file created after the meeting. They are an intelligent governance output that begins with the meeting and connects attendance, quorum, decisions, tasks, approvals, e-signature, and audit trail.', hi: 'Diwan Suite में minutes meeting के बाद बना Word file नहीं, बल्कि intelligent governance output है जो meeting से शुरू होकर attendance, quorum, decisions, tasks, approvals, e-signature और audit trail से जुड़ता है।', ur: 'Diwan Suite میں minutes meeting کے بعد بنا Word file نہیں بلکہ intelligent governance output ہے جو meeting سے شروع ہو کر attendance، quorum، decisions، tasks، approvals، e-signature اور audit trail سے جڑتا ہے۔' },
    alternativeName: { ar: 'المحاضر اليدوية Word/PDF', en: 'Manual Word/PDF minutes', hi: 'Manual Word/PDF minutes', ur: 'Manual Word/PDF minutes' },
    diwanName: { ar: 'محاضر ديوان سويت بالذكاء الاصطناعي', en: 'Diwan Suite AI minutes', hi: 'Diwan Suite AI minutes', ur: 'Diwan Suite AI minutes' },
    ...positions(
      { ar: 'تُكتب بعد الاجتماع يدويًا وتحتاج استخراجًا ومراجعة وربطًا منفصلًا.', en: 'Written manually after the meeting and needs separate extraction, review, and linking.', hi: 'Meeting के बाद manually written; extraction, review और linking अलग चाहिए।', ur: 'Meeting کے بعد manually written؛ extraction، review اور linking الگ چاہیے۔' },
      { ar: 'مسودة ذكية من سياق الاجتماع مرتبطة بالمراجعة والاعتماد والتنفيذ.', en: 'An intelligent draft from meeting context linked to review, approval, and execution.', hi: 'Meeting context से intelligent draft जो review, approval और execution से linked है।', ur: 'Meeting context سے intelligent draft جو review، approval اور execution سے linked ہے۔' },
      {
        officialMinutes: { ar: 'تعتمد على جودة الكاتب والذاكرة والمراجعة اللاحقة.', en: 'Depends on the writer, memory, and later review.', hi: 'Writer, memory और later review पर निर्भर।', ur: 'Writer، memory اور later review پر منحصر۔' },
        decisionToTask: { ar: 'استخراج القرارات يدوي وقد يبقى القرار داخل النص.', en: 'Decision extraction is manual and decisions may remain inside the text.', hi: 'Decision extraction manual है और decisions text में रह सकते हैं।', ur: 'Decision extraction manual ہے اور decisions text میں رہ سکتے ہیں۔' },
      },
      {
        officialMinutes: { ar: 'ينشئ وكيل الذكاء الاصطناعي مسودة منظمة قابلة للمراجعة.', en: 'The AI agent produces a structured reviewable draft.', hi: 'AI agent structured reviewable draft बनाता है।', ur: 'AI agent structured reviewable draft بناتا ہے۔' },
        decisionToTask: { ar: 'يستخرج القرارات والتوصيات ويقترح مهامًا تنفيذية.', en: 'Extracts decisions and recommendations and suggests execution tasks.', hi: 'Decisions/recommendations निकालता है और execution tasks suggest करता है।', ur: 'Decisions/recommendations نکالتا ہے اور execution tasks suggest کرتا ہے۔' },
      }
    ),
    practicalAnalysis: {
      ar: ['تأخر المحاضر غالبًا يبدأ من الاعتماد على الكتابة اليدوية بعد الاجتماع.', 'الذكاء الاصطناعي يقلل وقت المسودة لكنه لا يلغي مراجعة أمين السر وأصحاب الصلاحية.', 'القيمة الحقيقية ليست التفريغ فقط، بل ربط المحضر بالقرار والمهمة والتوقيع وسجل التدقيق.'],
      en: ['Minutes delays often start with relying on manual writing after the meeting.', 'AI reduces drafting time but does not remove secretary and authorized reviewer control.', 'The real value is not transcription alone; it is linking minutes to decisions, tasks, signatures, and audit trail.'],
      hi: ['Minutes delay अक्सर meeting के बाद manual writing पर निर्भरता से शुरू होता है।', 'AI drafting time घटाता है, पर secretary और authorized reviewers का control नहीं हटाता।', 'Real value transcription नहीं, minutes को decisions, tasks, signatures और audit trail से जोड़ना है।'],
      ur: ['Minutes delay اکثر meeting کے بعد manual writing پر انحصار سے شروع ہوتا ہے۔', 'AI drafting time کم کرتا ہے، مگر secretary اور authorized reviewers کا control نہیں ہٹاتا۔', 'Real value transcription نہیں بلکہ minutes کو decisions، tasks، signatures اور audit trail سے جوڑنا ہے۔'],
    },
    chooseAlternative: { ar: 'تحتاج ملاحظات بسيطة ولا توجد قرارات رسمية أو اعتماد أو توقيع أو متابعة.', en: 'You only need simple notes with no formal decisions, approvals, signatures, or follow-up.', hi: 'صرف simple notes چاہیے اور formal decisions, approvals, signatures یا follow-up نہیں۔', ur: 'صرف simple notes چاہیے اور formal decisions، approvals، signatures یا follow-up نہیں۔' },
    chooseDiwan: { ar: 'تحتاج محاضر مجالس ولجان وجمعيات ذكية وقابلة للمراجعة والاعتماد والتوقيع وربط القرارات بالتنفيذ.', en: 'You need intelligent board, committee, or assembly minutes that can be reviewed, approved, e-signed, and linked to execution.', hi: 'Board, committee या assembly minutes intelligent हों, review/approval/e-sign और execution से linked हों।', ur: 'Board، committee یا assembly minutes intelligent ہوں، review/approval/e-sign اور execution سے linked ہوں۔' },
    scenario: { ar: 'اجتماع لجنة يستمر ساعتين وينتج قرارات وتوصيات متعددة. يدويًا ينتظر أمين السر التسجيل والملاحظات ثم يراجع النص. في ديوان سويت ينشئ وكيل الذكاء الاصطناعي مسودة محضر، يستخرج القرارات، يقترح المهام، ثم تمر المسودة عبر الاعتماد والتوقيع.', en: 'A two-hour committee meeting produces several decisions and recommendations. Manually, the secretary waits for recordings and notes before drafting. In Diwan Suite, the AI agent drafts minutes, extracts decisions, suggests tasks, then routes the draft for approval and e-signature.', hi: 'दो घंटे की committee meeting कई decisions/recommendations बनाती है। Manual process में secretary recordings/notes के बाद draft करता है। Diwan Suite में AI agent minutes draft करता है, decisions निकालता है, tasks suggest करता है और approval/e-signature route करता है।', ur: 'دو گھنٹے کی committee meeting کئی decisions/recommendations بناتی ہے۔ Manual process میں secretary recordings/notes کے بعد draft کرتا ہے۔ Diwan Suite میں AI agent minutes draft کرتا ہے، decisions نکالتا ہے، tasks suggest کرتا ہے اور approval/e-signature route کرتا ہے۔' },
    faq: {
      ar: [{ q: 'هل ينشئ ديوان سويت محضر الاجتماع تلقائيًا؟', a: 'نعم، ينشئ وكيل الذكاء الاصطناعي مسودة محضر إلكترونية من محتوى الاجتماع، ثم تمر للمراجعة والاعتماد حسب الصلاحيات.' }, { q: 'هل المحضر الناتج نهائي مباشرة؟', a: 'لا، هو مسودة احترافية قابلة للمراجعة، ويعتمدها أصحاب الصلاحية عبر مسار رسمي.' }, { q: 'هل يستطيع النظام استخراج القرارات من الاجتماع؟', a: 'نعم، يساعد وكيل الذكاء الاصطناعي في تحليل النقاشات واستخراج القرارات والتوصيات وربطها بالمهام التنفيذية.' }, { q: 'هل يغني وكيل الذكاء الاصطناعي عن أمين السر؟', a: 'لا، هو يساعد أمين السر ويرفع كفاءته، مع بقاء المراجعة والاعتماد لأصحاب الصلاحية.' }],
      en: [{ q: 'Can Diwan Suite create meeting minutes automatically?', a: 'Yes. The AI agent drafts electronic minutes from meeting content, then routes them for review and approval according to permissions.' }, { q: 'Are the generated minutes final immediately?', a: 'No. They are professional reviewable drafts approved by authorized users through a formal workflow.' }, { q: 'Can the system extract decisions from the meeting?', a: 'Yes. The AI agent helps analyze discussions, extract decisions and recommendations, and link them to execution tasks.' }, { q: 'Does the AI agent replace the board secretary?', a: 'No. It assists the secretary and improves efficiency while keeping review and approval with authorized people.' }],
      hi: [{ q: 'क्या Diwan Suite automatically meeting minutes बना सकता है?', a: 'हाँ। AI agent meeting content से electronic minutes draft करता है और permissions के अनुसार review/approval के लिए भेजता है।' }, { q: 'क्या generated minutes तुरंत final होते हैं?', a: 'नहीं। वे professional reviewable drafts हैं जिन्हें authorized users formal workflow से approve करते हैं।' }, { q: 'क्या system meeting से decisions निकाल सकता है?', a: 'हाँ। AI agent discussions analyze कर decisions/recommendations निकालता है और execution tasks से जोड़ता है।' }, { q: 'क्या AI agent board secretary को replace करता है?', a: 'नहीं। यह secretary की मदद करता है और efficiency बढ़ाता है; review/approval authorized people के पास रहते हैं।' }],
      ur: [{ q: 'کیا Diwan Suite automatically meeting minutes بنا سکتا ہے؟', a: 'جی ہاں۔ AI agent meeting content سے electronic minutes draft کرتا ہے اور permissions کے مطابق review/approval کے لیے بھیجتا ہے۔' }, { q: 'کیا generated minutes فوراً final ہوتے ہیں؟', a: 'نہیں۔ یہ professional reviewable drafts ہیں جنہیں authorized users formal workflow سے approve کرتے ہیں۔' }, { q: 'کیا system meeting سے decisions نکال سکتا ہے؟', a: 'جی ہاں۔ AI agent discussions analyze کر کے decisions/recommendations نکالتا ہے اور execution tasks سے جوڑتا ہے۔' }, { q: 'کیا AI agent board secretary کو replace کرتا ہے؟', a: 'نہیں۔ یہ secretary کی مدد کرتا ہے اور efficiency بڑھاتا ہے؛ review/approval authorized people کے پاس رہتے ہیں۔' }],
    },
    relatedPages: ['meetingMinutesSoftware', 'aiGovernanceAssistant', 'aiGovernanceDecisionSupport'],
    ctaTitle: { ar: 'شاهد كيف ينشئ وكيل ديوان سويت محضر اجتماع ذكي خلال دقائق', en: 'See how Diwan Suite AI drafts smart meeting minutes in minutes', hi: 'देखें Diwan Suite AI minutes कैसे जल्दी draft करता है', ur: 'دیکھیں Diwan Suite AI minutes کیسے جلد draft کرتا ہے' },
    ctaBody: { ar: 'احجز عرضًا توضيحيًا لتجربة المحاضر الإلكترونية بالذكاء الاصطناعي وربطها بالقرارات والتنفيذ والاعتماد.', en: 'Book a demo to experience AI electronic minutes linked to decisions, execution, and approval.', hi: 'AI electronic minutes का demo बुक करें जो decisions, execution और approval से linked हैं।', ur: 'AI electronic minutes کا demo بک کریں جو decisions، execution اور approval سے linked ہیں۔' },
  },
]

function buildTable(seed: ComparisonSeed, lang: LangCode): PageTable {
  return {
    caption: ui[lang].comparisonTable,
    columns: [criteria[lang].boardCommittees.label === 'إدارة المجلس واللجان' ? 'المعيار' : lang === 'en' ? 'Criterion' : lang === 'hi' ? 'मानदंड' : 'معیار', seed.alternativeName[lang], seed.diwanName[lang]],
    rows: criterionOrder.map((key) => [
      `${criteria[lang][key].label} — ${criteria[lang][key].why}`,
      seed.alternativePosition[lang][key],
      seed.diwanPosition[lang][key],
    ] as [string, string, string]),
  }
}

function makePage(seed: ComparisonSeed, lang: LangCode): InternalPageCopy {
  const u = ui[lang]
  return {
    eyebrow: seed.kind === 'direct'
      ? (lang === 'ar' ? 'مقارنة مباشرة' : lang === 'hi' ? 'सीधी तुलना' : lang === 'ur' ? 'براہ راست موازنہ' : 'Direct comparison')
      : (lang === 'ar' ? 'مقارنة تشغيلية' : lang === 'hi' ? 'ऑपरेशनल तुलना' : lang === 'ur' ? 'آپریشنل موازنہ' : 'Operational comparison'),
    title: seed.title[lang],
    summary: seed.summary[lang],
    seoTitle: seed.seoTitle[lang],
    seoDescription: seed.seoDescription[lang],
    definition: seed.directAnswer[lang],
    executiveSummary: seed.summary[lang],
    whoFor: [seed.alternativeName[lang], seed.diwanName[lang], u.indirectCta],
    whatItSolves: seed.practicalAnalysis[lang],
    howItWorks: [u.executiveSummary, u.comparisonTable, u.practicalAnalysis, u.whenChoose, u.scenario],
    relatedPages: seed.relatedPages,
    hideSiblingLinks: true,
    hideExploreLinks: true,
    pageFaqTitle: u.faqTitle,
    ctaTitle: seed.ctaTitle[lang],
    ctaBody: seed.ctaBody[lang],
    ctaPrimaryLabel: u.ctaPrimary,
    ctaSecondaryLabel: u.ctaSecondary,
    faq: seed.faq[lang],
    sections: [
      {
        id: 'direct-answer',
        title: lang === 'ar' ? 'الإجابة المختصرة' : lang === 'hi' ? 'संक्षिप्त उत्तर' : lang === 'ur' ? 'مختصر جواب' : 'Short answer',
        body: [seed.directAnswer[lang], seed.summary[lang]],
      },
      {
        id: 'comparison-table',
        title: u.comparisonTable,
        body: [lang === 'ar' ? 'الجدول التالي لا يستخدم أحكامًا هجومية على البديل؛ بل يوضح أين يكون مناسبًا وأين تبدأ الحاجة إلى منصة حوكمة متخصصة.' : lang === 'hi' ? 'यह तालिका alternative पर हमला नहीं करती; यह दिखाती है कि वह कब उपयुक्त है और specialized governance platform की जरूरत कब शुरू होती है।' : lang === 'ur' ? 'یہ جدول alternative پر حملہ نہیں کرتا؛ یہ دکھاتا ہے کہ وہ کب مناسب ہے اور specialized governance platform کی ضرورت کب شروع ہوتی ہے۔' : 'This table does not attack the alternative; it shows when it is suitable and when a specialized governance platform becomes necessary.'],
        table: buildTable(seed, lang),
      },
      {
        id: 'practical-impact',
        title: u.practicalAnalysis,
        body: [seed.practicalAnalysis[lang].join(' ')],
        bullets: seed.practicalAnalysis[lang],
      },
      {
        id: 'when-to-choose',
        title: u.whenChoose,
        body: [
          `${u.chooseAlternativeLabel}: ${seed.chooseAlternative[lang]}`,
          `${u.chooseDiwanLabel}: ${seed.chooseDiwan[lang]}`,
        ],
      },
      {
        id: 'realistic-scenario',
        title: u.scenario,
        body: [seed.scenario[lang]],
      },
      {
        id: 'ai-minutes-agent',
        title: u.aiBlockTitle,
        body: [u.aiBlockBody],
        bullets: lang === 'ar'
          ? ['تحليل محتوى الاجتماع وتلخيص النقاشات.', 'استخراج القرارات والتوصيات.', 'إنشاء مسودة محضر قابلة للمراجعة والاعتماد.', 'ربط القرارات بالمهام وسجل التدقيق والتوقيع الإلكتروني.']
          : lang === 'hi'
          ? ['Meeting content analysis and discussion summaries.', 'Decision and recommendation extraction.', 'Reviewable and approvable minutes draft.', 'Decision links to tasks, audit trail, and e-signature.']
          : lang === 'ur'
          ? ['Meeting content analysis اور discussion summaries۔', 'Decision اور recommendation extraction۔', 'Reviewable اور approvable minutes draft۔', 'Decision links to tasks، audit trail اور e-signature۔']
          : ['Meeting content analysis and discussion summaries.', 'Decision and recommendation extraction.', 'Reviewable and approvable minutes draft.', 'Decision links to tasks, audit trail, and e-signature.'],
      },
      {
        id: 'cta-maturity',
        title: u.indirectCta,
        body: [seed.ctaBody[lang], u.directCta],
      },
    ],
  }
}

export const comparisonSeoPageCopy: Record<LangCode, Record<ComparisonSeoPageKey, InternalPageCopy>> = {
  ar: Object.fromEntries(seeds.map((seed) => [seed.key, makePage(seed, 'ar')])) as Record<ComparisonSeoPageKey, InternalPageCopy>,
  en: Object.fromEntries(seeds.map((seed) => [seed.key, makePage(seed, 'en')])) as Record<ComparisonSeoPageKey, InternalPageCopy>,
  hi: Object.fromEntries(seeds.map((seed) => [seed.key, makePage(seed, 'hi')])) as Record<ComparisonSeoPageKey, InternalPageCopy>,
  ur: Object.fromEntries(seeds.map((seed) => [seed.key, makePage(seed, 'ur')])) as Record<ComparisonSeoPageKey, InternalPageCopy>,
}
