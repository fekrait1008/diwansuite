import type { LangCode } from './types'
import type { InternalPageCopy, PageTable } from './extra'
import type { PublicPage } from '@/lib/page-registry'

export type Phase4ComparisonPageKey = Extract<PublicPage,
  | 'boardPortalVsSharePointGoogleDrive'
  | 'boardDecisionManagementVsTaskManagement'
  | 'electronicMeetingMinutesVsPaperMinutes'
  | 'manualCommitteeManagementVsGovernancePlatform'
  | 'boardGovernanceSoftwareGovernmentSaudiArabia'
>

type Localized = Record<LangCode, string>
type LocalizedList = Record<LangCode, string[]>

type Phase4PageSeed = {
  key: Phase4ComparisonPageKey
  kind: 'direct' | 'operational' | 'sector'
  title: Localized
  seoTitle: Localized
  seoDescription: Localized
  directAnswer: Localized
  summary: Localized
  alternativeName: Localized
  diwanName: Localized
  alternativeUse: Localized
  diwanUse: Localized
  scenario: Localized
  analysis: LocalizedList
  criteriaRows: Record<LangCode, Array<[string, string, string]>>
  faq: Record<LangCode, Array<{ q: string; a: string }>>
  relatedPages: PublicPage[]
  ctaTitle: Localized
  ctaBody: Localized
}

const labels: Record<LangCode, {
  direct: string
  operational: string
  sector: string
  shortAnswer: string
  executiveSummary: string
  comparisonTable: string
  practicalAnalysis: string
  whenChoose: string
  scenario: string
  faq: string
  criterion: string
  aiBlockTitle: string
  aiBlockBody: string
  ctaPrimary: string
  ctaSecondary: string
  chooseAlternative: string
  chooseDiwan: string
}> = {
  ar: {
    direct: 'مقارنة مباشرة',
    operational: 'مقارنة تشغيلية',
    sector: 'مقارنة قطاعية',
    shortAnswer: 'الإجابة المختصرة',
    executiveSummary: 'ملخص تنفيذي سريع',
    comparisonTable: 'جدول مقارنة مختصر',
    practicalAnalysis: 'تحليل عملي للفروقات',
    whenChoose: 'متى تختار كل خيار؟',
    scenario: 'سيناريو واقعي',
    faq: 'أسئلة شائعة حول المقارنة',
    criterion: 'المعيار',
    aiBlockTitle: 'إضافة ذكية: محاضر إلكترونية ينشئها وكيل الذكاء الاصطناعي',
    aiBlockBody: 'ديوان سويت لا يكتفي بإدارة الاجتماع، بل يضيف طبقة ذكية لإنشاء المحاضر الإلكترونية. يقوم وكيل الذكاء الاصطناعي بتحليل محتوى الاجتماع، تلخيص النقاشات، استخراج القرارات والتوصيات، وإنشاء مسودة محضر قابلة للمراجعة والاعتماد، مع ربط القرارات بالمهام التنفيذية وسجل التدقيق والتوقيع الإلكتروني.',
    ctaPrimary: 'احجز عرضًا توضيحيًا',
    ctaSecondary: 'تواصل مع الفريق',
    chooseAlternative: 'اختر البديل عندما',
    chooseDiwan: 'اختر ديوان سويت عندما',
  },
  en: {
    direct: 'Direct comparison',
    operational: 'Operational comparison',
    sector: 'Sector comparison',
    shortAnswer: 'Short answer',
    executiveSummary: 'Quick executive summary',
    comparisonTable: 'Clear comparison table',
    practicalAnalysis: 'Practical impact analysis',
    whenChoose: 'When to choose each option',
    scenario: 'Realistic scenario',
    faq: 'Comparison FAQs',
    criterion: 'Criterion',
    aiBlockTitle: 'Smart addition: AI-generated electronic minutes',
    aiBlockBody: 'Diwan Suite does not stop at managing the meeting. It adds an intelligent layer for electronic minutes. The AI agent analyzes meeting content, summarizes discussions, extracts decisions and recommendations, drafts reviewable minutes, and links decisions to execution tasks, audit trail, and e-signature.',
    ctaPrimary: 'Book a Demo',
    ctaSecondary: 'Talk to the team',
    chooseAlternative: 'Choose the alternative when',
    chooseDiwan: 'Choose Diwan Suite when',
  },
  hi: {
    direct: 'सीधी तुलना',
    operational: 'ऑपरेशनल तुलना',
    sector: 'सेक्टर तुलना',
    shortAnswer: 'संक्षिप्त उत्तर',
    executiveSummary: 'त्वरित कार्यकारी सारांश',
    comparisonTable: 'स्पष्ट तुलना तालिका',
    practicalAnalysis: 'व्यावहारिक प्रभाव विश्लेषण',
    whenChoose: 'कौन सा विकल्प कब चुनें',
    scenario: 'वास्तविक परिदृश्य',
    faq: 'तुलना से जुड़े प्रश्न',
    criterion: 'मानदंड',
    aiBlockTitle: 'स्मार्ट जोड़: AI द्वारा इलेक्ट्रॉनिक मिनट्स',
    aiBlockBody: 'Diwan Suite केवल बैठक प्रबंधन तक सीमित नहीं है। यह electronic minutes के लिए intelligent layer जोड़ता है। AI agent meeting content analyze करता है, discussions summarize करता है, decisions और recommendations निकालता है, reviewable minutes draft बनाता है और decisions को tasks, audit trail और e-signature से जोड़ता है।',
    ctaPrimary: 'डेमो बुक करें',
    ctaSecondary: 'टीम से बात करें',
    chooseAlternative: 'वैकल्पिक समाधान चुनें जब',
    chooseDiwan: 'Diwan Suite चुनें जब',
  },
  ur: {
    direct: 'براہ راست موازنہ',
    operational: 'آپریشنل موازنہ',
    sector: 'سیکٹر موازنہ',
    shortAnswer: 'مختصر جواب',
    executiveSummary: 'فوری انتظامی خلاصہ',
    comparisonTable: 'واضح موازنہ جدول',
    practicalAnalysis: 'عملی اثرات کا تجزیہ',
    whenChoose: 'ہر اختیار کب منتخب کریں',
    scenario: 'حقیقی منظرنامہ',
    faq: 'موازنہ سے متعلق سوالات',
    criterion: 'معیار',
    aiBlockTitle: 'ذہین اضافہ: AI agent کے ذریعے الیکٹرانک محاضر',
    aiBlockBody: 'Diwan Suite صرف اجلاس کے انتظام تک محدود نہیں۔ یہ electronic minutes کے لیے intelligent layer فراہم کرتا ہے۔ AI agent meeting content کا تجزیہ کرتا ہے، discussions کا خلاصہ بناتا ہے، decisions اور recommendations نکالتا ہے، reviewable minutes draft تیار کرتا ہے اور decisions کو tasks، audit trail اور e-signature سے جوڑتا ہے۔',
    ctaPrimary: 'ڈیمو بک کریں',
    ctaSecondary: 'ٹیم سے بات کریں',
    chooseAlternative: 'متبادل اختیار کریں جب',
    chooseDiwan: 'Diwan Suite منتخب کریں جب',
  },
}

function rows(
  ar: Array<[string, string, string]>,
  en: Array<[string, string, string]>,
  hi: Array<[string, string, string]>,
  ur: Array<[string, string, string]>,
): Record<LangCode, Array<[string, string, string]>> {
  return { ar, en, hi, ur }
}

const sharedRelated: PublicPage[] = ['boardGovernanceSoftware', 'meetingMinutesSoftware', 'boardDecisionsTrackingSoftware', 'corporateGovernancePlatform']

const seeds: Phase4PageSeed[] = [
  {
    key: 'boardPortalVsSharePointGoogleDrive',
    kind: 'direct',
    title: {
      ar: 'Board Portal vs SharePoint وGoogle Drive: هل تخزين الملفات يكفي لحوكمة المجالس؟',
      en: 'Board Portal vs SharePoint and Google Drive: Is File Storage Enough for Board Governance?',
      hi: 'Board Portal vs SharePoint और Google Drive: क्या File Storage Board Governance के लिए पर्याप्त है?',
      ur: 'Board Portal vs SharePoint اور Google Drive: کیا File Storage بورڈ گورننس کے لیے کافی ہے؟',
    },
    seoTitle: {
      ar: 'Board Portal vs SharePoint وGoogle Drive | ديوان سويت',
      en: 'Board Portal vs SharePoint and Google Drive | Diwan Suite',
      hi: 'Board Portal vs SharePoint and Google Drive | Diwan Suite',
      ur: 'Board Portal vs SharePoint and Google Drive | Diwan Suite',
    },
    seoDescription: {
      ar: 'مقارنة بين تخزين ملفات المجالس في SharePoint أو Google Drive وبين منصة Board Portal تدير المحاضر والقرارات والاعتماد وسجل التدقيق.',
      en: 'Compare storing board files in SharePoint or Google Drive with a Board Portal that manages minutes, decisions, approvals, and audit trail.',
      hi: 'SharePoint या Google Drive में board files storage और minutes, decisions, approvals व audit trail संभालने वाले Board Portal की तुलना।',
      ur: 'SharePoint یا Google Drive میں board files storage اور minutes، decisions، approvals و audit trail سنبھالنے والے Board Portal کا موازنہ۔',
    },
    directAnswer: {
      ar: 'SharePoint وGoogle Drive ممتازان لحفظ الملفات ومشاركتها، لكنهما لا يديران النصاب، الاعتماد، قرارات المجلس، المتابعة، أو سجل التدقيق الحوكمي. تحتاج منصة Board Portal عندما يصبح الملف جزءًا من دورة قرار رسمية.',
      en: 'SharePoint and Google Drive are useful for storing and sharing files, but they do not manage quorum, approvals, board decisions, follow-up, or governance audit trail. A Board Portal is needed when files become part of a formal decision lifecycle.',
      hi: 'SharePoint और Google Drive files store/share करने के लिए अच्छे हैं, पर quorum, approvals, board decisions, follow-up या governance audit trail नहीं चलाते। Formal decision lifecycle में Board Portal चाहिए।',
      ur: 'SharePoint اور Google Drive files store/share کرنے کے لیے اچھے ہیں، مگر quorum، approvals، board decisions، follow-up یا governance audit trail نہیں چلاتے۔ Formal decision lifecycle میں Board Portal چاہیے۔',
    },
    summary: {
      ar: 'إذا كانت الحاجة مجرد حفظ مستندات داخلية فقد تكفي منصات التخزين. أما اجتماعات المجالس واللجان فتحتاج ربط الملفات بجدول الأعمال والمحاضر والقرارات والاعتماد والتنفيذ.',
      en: 'If the need is only internal document storage, storage platforms may be enough. Board and committee meetings require linking files to agenda, minutes, decisions, approvals, and execution.',
      hi: 'यदि जरूरत केवल internal document storage है तो storage platforms पर्याप्त हो सकते हैं। Board/committee meetings में files को agenda, minutes, decisions, approvals और execution से जोड़ना पड़ता है।',
      ur: 'اگر ضرورت صرف internal document storage ہے تو storage platforms کافی ہو سکتے ہیں۔ Board/committee meetings میں files کو agenda، minutes، decisions، approvals اور execution سے جوڑنا ہوتا ہے۔',
    },
    alternativeName: { ar: 'SharePoint / Google Drive', en: 'SharePoint / Google Drive', hi: 'SharePoint / Google Drive', ur: 'SharePoint / Google Drive' },
    diwanName: { ar: 'ديوان سويت Board Portal', en: 'Diwan Suite Board Portal', hi: 'Diwan Suite Board Portal', ur: 'Diwan Suite Board Portal' },
    alternativeUse: { ar: 'تخزين الملفات، المشاركة، التعاون العام، والمراجعة غير الرسمية.', en: 'File storage, sharing, general collaboration, and informal review.', hi: 'File storage, sharing, general collaboration और informal review.', ur: 'File storage، sharing، general collaboration اور informal review۔' },
    diwanUse: { ar: 'اجتماعات مجلس أو لجنة أو جمعية تحتاج جدول أعمال ومحاضر واعتماد وقرارات وسجل تدقيق.', en: 'Board, committee, or assembly meetings that need agenda, minutes, approvals, decisions, and audit trail.', hi: 'Board, committee या assembly meetings जिन्हें agenda, minutes, approvals, decisions और audit trail चाहिए।', ur: 'Board، committee یا assembly meetings جنہیں agenda، minutes، approvals، decisions اور audit trail چاہیے۔' },
    scenario: {
      ar: 'شركة لديها ملفات مجلس محفوظة في مجلدات متعددة. عند مراجعة قرار سابق يبدأ الفريق بالبحث عن آخر نسخة ومرفقات الاجتماع. في ديوان سويت ترتبط الملفات بجدول الأعمال والمحضر والقرار والتنفيذ وسجل التدقيق.',
      en: 'A company keeps board files in multiple folders. When reviewing an old decision, the team searches for the latest version and attachments. In Diwan Suite, files are linked to agenda, minutes, decision, execution, and audit trail.',
      hi: 'एक company board files को कई folders में रखती है। Old decision review करते समय team latest version और attachments खोजती है। Diwan Suite में files agenda, minutes, decision, execution और audit trail से linked रहती हैं।',
      ur: 'ایک company board files کو کئی folders میں رکھتی ہے۔ Old decision review کرتے وقت team latest version اور attachments ڈھونڈتی ہے۔ Diwan Suite میں files agenda، minutes، decision، execution اور audit trail سے linked رہتی ہیں۔',
    },
    analysis: {
      ar: ['تخزين الملفات لا يعني إدارة قرار أو محضر رسمي.', 'المجلدات لا تمنح رؤية تنفيذية حول القرارات المتأخرة أو المسؤوليات.', 'الفرق الحقيقي يظهر عند التدقيق: هل يمكن معرفة من اعتمد ومتى وما الذي تغير؟'],
      en: ['Storing files does not mean managing an official decision or minutes record.', 'Folders do not provide executive visibility into delayed decisions or responsibilities.', 'The real difference appears during audit: can you know who approved, when, and what changed?'],
      hi: ['Files store करना official decision/minutes management नहीं है।', 'Folders delayed decisions या responsibilities पर executive visibility नहीं देते।', 'Audit के समय अंतर दिखता है: किसने approve किया, कब और क्या बदला?'],
      ur: ['Files store کرنا official decision/minutes management نہیں ہے۔', 'Folders delayed decisions یا responsibilities پر executive visibility نہیں دیتے۔', 'Audit کے وقت فرق ظاہر ہوتا ہے: کس نے approve کیا، کب اور کیا بدلا؟'],
    },
    criteriaRows: rows(
      [['إدارة المجلس واللجان', 'مجلدات وصلاحيات عامة', 'كيانات مجلس ولجان وأدوار وصلاحيات'], ['جدول الأعمال', 'ملفات مرتبطة يدويًا', 'بنود ومرفقات وقرارات مترابطة'], ['الحضور والنصاب', 'غير مخصص', 'حضور ونصاب مرتبطان بالاجتماع'], ['المحاضر الرسمية', 'ملف منفصل', 'محضر معتمد مرتبط بالقرار'], ['التوقيع والاعتماد', 'خارج المنصة غالبًا', 'مسار اعتماد وتوقيع إلكتروني'], ['تحويل القرار إلى مهمة', 'غير متوفر طبيعيًا', 'قرار يتحول إلى متابعة تنفيذية'], ['المتابعة والتصعيد', 'يدوي', 'تنبيهات وتصعيد وحالات تنفيذ'], ['سجل التدقيق', 'سجل ملفات محدود', 'سجل حوكمي كامل'], ['التقارير ولوحات المؤشرات', 'محدودة', 'لوحات تنفيذ وامتثال'], ['الأمان والسرية', 'مناسب للتخزين العام', 'مصمم لحساسية المجالس']],
      [['Board and committees', 'General folders and permissions', 'Board, committee, roles, and permissions'], ['Agenda', 'Manually linked files', 'Agenda items, attachments, and decisions linked'], ['Attendance and quorum', 'Not purpose-built', 'Attendance and quorum linked to meeting'], ['Official minutes', 'Separate file', 'Approved minutes linked to decisions'], ['Approval and signature', 'Usually outside the platform', 'Approval workflow and e-signature'], ['Decision to task', 'Not native', 'Decision becomes execution follow-up'], ['Follow-up and escalation', 'Manual', 'Alerts, escalation, and execution status'], ['Audit trail', 'Limited file logs', 'Full governance audit trail'], ['Dashboards', 'Limited', 'Execution and compliance dashboards'], ['Security', 'Good for general storage', 'Designed for board sensitivity']],
      [['Board/committees', 'General folders और permissions', 'Board, committee, roles और permissions'], ['Agenda', 'Manually linked files', 'Agenda items, attachments और decisions linked'], ['Attendance/quorum', 'Purpose-built नहीं', 'Meeting से linked attendance/quorum'], ['Official minutes', 'Separate file', 'Approved minutes decisions से linked'], ['Approval/signature', 'अक्सर platform के बाहर', 'Approval workflow और e-signature'], ['Decision to task', 'Native नहीं', 'Decision execution follow-up बनता है'], ['Follow-up/escalation', 'Manual', 'Alerts, escalation और status'], ['Audit trail', 'Limited file logs', 'Full governance audit trail'], ['Dashboards', 'Limited', 'Execution/compliance dashboards'], ['Security', 'General storage के लिए अच्छा', 'Board sensitivity के लिए designed']],
      [['Board/committees', 'General folders اور permissions', 'Board، committee، roles اور permissions'], ['Agenda', 'Manually linked files', 'Agenda items، attachments اور decisions linked'], ['Attendance/quorum', 'Purpose-built نہیں', 'Meeting سے linked attendance/quorum'], ['Official minutes', 'Separate file', 'Approved minutes decisions سے linked'], ['Approval/signature', 'اکثر platform کے باہر', 'Approval workflow اور e-signature'], ['Decision to task', 'Native نہیں', 'Decision execution follow-up بنتا ہے'], ['Follow-up/escalation', 'Manual', 'Alerts، escalation اور status'], ['Audit trail', 'Limited file logs', 'Full governance audit trail'], ['Dashboards', 'Limited', 'Execution/compliance dashboards'], ['Security', 'General storage کے لیے اچھا', 'Board sensitivity کے لیے designed']]
    ),
    faq: {
      ar: [{ q: 'هل SharePoint يكفي لإدارة مجلس الإدارة؟', a: 'يكفي لحفظ الملفات ومشاركتها، لكنه لا يكفي وحده لإدارة دورة الحوكمة من جدول الأعمال إلى المحضر والقرار والتنفيذ.' }, { q: 'ما الفرق بين التخزين السحابي وBoard Portal؟', a: 'التخزين يحفظ الملفات، بينما Board Portal يدير الاجتماع والقرار والاعتماد وسجل التدقيق.' }, { q: 'هل يمكن ربط ديوان سويت بمنصات تخزين؟', a: 'يمكن دراسة التكاملات حسب بيئة الجهة، لكن ديوان سويت يبقى طبقة الحوكمة التي تربط الملفات بالقرارات والتنفيذ.' }],
      en: [{ q: 'Is SharePoint enough for board management?', a: 'It is enough for file storage and sharing, but not for the full governance lifecycle from agenda to minutes, decisions, and execution.' }, { q: 'What is the difference between cloud storage and a Board Portal?', a: 'Storage keeps files; a Board Portal manages meetings, decisions, approvals, and audit trail.' }, { q: 'Can Diwan Suite integrate with storage platforms?', a: 'Integrations can be assessed based on the organization environment, while Diwan Suite remains the governance layer.' }],
      hi: [{ q: 'क्या SharePoint board management के लिए पर्याप्त है?', a: 'File storage और sharing के लिए पर्याप्त हो सकता है, पर full governance lifecycle के लिए नहीं।' }, { q: 'Cloud storage और Board Portal में क्या अंतर है?', a: 'Storage files रखता है; Board Portal meetings, decisions, approvals और audit trail चलाता है।' }, { q: 'क्या Diwan Suite storage platforms से integrate हो सकता है?', a: 'Organization environment के अनुसार integrations देखे जा सकते हैं; Diwan Suite governance layer रहता है।' }],
      ur: [{ q: 'کیا SharePoint board management کے لیے کافی ہے؟', a: 'File storage اور sharing کے لیے کافی ہو سکتا ہے، مگر full governance lifecycle کے لیے نہیں۔' }, { q: 'Cloud storage اور Board Portal میں کیا فرق ہے؟', a: 'Storage files رکھتا ہے؛ Board Portal meetings، decisions، approvals اور audit trail چلاتا ہے۔' }, { q: 'کیا Diwan Suite storage platforms سے integrate ہو سکتا ہے؟', a: 'Organization environment کے مطابق integrations دیکھے جا سکتے ہیں؛ Diwan Suite governance layer رہتا ہے۔' }],
    },
    relatedPages: sharedRelated,
    ctaTitle: { ar: 'حوّل ملفات المجلس إلى دورة قرار قابلة للتدقيق', en: 'Turn board files into an auditable decision lifecycle', hi: 'Board files को auditable decision lifecycle में बदलें', ur: 'Board files کو auditable decision lifecycle میں بدلیں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف ينتقل الملف من مرفق إلى بند ومحضر وقرار ومهمة داخل ديوان سويت.', en: 'Book a walkthrough showing how a file moves from attachment to agenda item, minutes, decision, and task in Diwan Suite.', hi: 'Demo देखें कि file attachment से agenda item, minutes, decision और task कैसे बनती है।', ur: 'Demo دیکھیں کہ file attachment سے agenda item، minutes، decision اور task کیسے بنتی ہے۔' },
  },
  {
    key: 'boardDecisionManagementVsTaskManagement',
    kind: 'operational',
    title: { ar: 'برنامج إدارة قرارات المجلس vs برنامج إدارة مهام عام', en: 'Board Decision Management vs Generic Task Management Software', hi: 'Board Decision Management vs Generic Task Management Software', ur: 'Board Decision Management vs Generic Task Management Software' },
    seoTitle: { ar: 'برنامج إدارة قرارات المجلس vs إدارة مهام عامة | ديوان سويت', en: 'Board Decision Management vs Task Management Software | Diwan Suite', hi: 'Board Decision Management vs Task Management Software | Diwan Suite', ur: 'Board Decision Management vs Task Management Software | Diwan Suite' },
    seoDescription: { ar: 'مقارنة بين متابعة قرارات مجلس الإدارة في برامج مهام عامة وبين منصة تربط القرار بالمحضر والمالك والموعد والتقارير والامتثال.', en: 'Compare generic task tools with a platform that links board decisions to minutes, owner, due date, reports, and compliance.', hi: 'Generic task tools और board decisions को minutes, owner, due date, reports और compliance से जोड़ने वाले platform की तुलना।', ur: 'Generic task tools اور board decisions کو minutes، owner، due date، reports اور compliance سے جوڑنے والے platform کا موازنہ۔' },
    directAnswer: { ar: 'برامج المهام العامة ممتازة لتوزيع الأعمال اليومية، لكنها لا تعرف سياق قرار مجلس الإدارة ولا تحفظ ارتباطه بالمحضر والاعتماد وسجل التدقيق. قرارات المجلس تحتاج منصة تربط القرار بالحوكمة قبل التنفيذ.', en: 'Generic task tools are useful for daily work distribution, but they do not understand board decision context or preserve links to minutes, approval, and audit trail. Board decisions need governance context before execution.', hi: 'Generic task tools daily work के लिए अच्छे हैं, पर board decision context, minutes, approval और audit trail नहीं समझते। Board decisions को execution से पहले governance context चाहिए।', ur: 'Generic task tools daily work کے لیے اچھے ہیں، مگر board decision context، minutes، approval اور audit trail نہیں سمجھتے۔ Board decisions کو execution سے پہلے governance context چاہیے۔' },
    summary: { ar: 'إذا كانت المهمة تشغيلية بسيطة فقد يكفي برنامج مهام. أما قرار مجلس الإدارة فهو التزام رسمي يحتاج مالكًا، موعدًا، تصعيدًا، تقارير، وسجلًا حوكميًا.', en: 'For simple operational tasks, a task tool may be enough. A board decision is a formal obligation that needs owner, due date, escalation, reports, and governance trail.', hi: 'Simple operational tasks के लिए task tool पर्याप्त हो सकता है। Board decision formal obligation है जिसे owner, due date, escalation, reports और governance trail चाहिए।', ur: 'Simple operational tasks کے لیے task tool کافی ہو سکتا ہے۔ Board decision formal obligation ہے جسے owner، due date، escalation، reports اور governance trail چاہیے۔' },
    alternativeName: { ar: 'برنامج مهام عام', en: 'Generic task tool', hi: 'Generic task tool', ur: 'Generic task tool' },
    diwanName: { ar: 'إدارة قرارات ديوان سويت', en: 'Diwan Suite decision management', hi: 'Diwan Suite decision management', ur: 'Diwan Suite decision management' },
    alternativeUse: { ar: 'مهام يومية، مشاريع داخلية، وتعاون فرق عام.', en: 'Daily tasks, internal projects, and general team collaboration.', hi: 'Daily tasks, internal projects और general collaboration.', ur: 'Daily tasks، internal projects اور general collaboration۔' },
    diwanUse: { ar: 'قرارات مجلس ولجان تحتاج توثيقًا رسميًا ومتابعة تنفيذية وتقارير للإدارة العليا.', en: 'Board and committee decisions that need formal documentation, execution follow-up, and executive reporting.', hi: 'Board/committee decisions जिन्हें formal documentation, follow-up और executive reporting चाहिए।', ur: 'Board/committee decisions جنہیں formal documentation، follow-up اور executive reporting چاہیے۔' },
    scenario: { ar: 'مجلس يصدر 25 قرارًا في ربع سنة. في برنامج مهام عام تظهر كمهام منفصلة عن المحاضر. في ديوان سويت يبقى كل قرار مرتبطًا بالمحضر، المسؤول، تاريخ الاستحقاق، حالة التنفيذ، والتقرير التنفيذي.', en: 'A board issues 25 decisions in a quarter. In a generic task tool, they become tasks detached from minutes. In Diwan Suite, each decision remains linked to minutes, owner, due date, execution status, and executive report.', hi: 'Board एक quarter में 25 decisions जारी करता है। Generic task tool में वे minutes से अलग tasks बनते हैं। Diwan Suite में हर decision minutes, owner, due date, status और executive report से linked रहता है।', ur: 'Board ایک quarter میں 25 decisions جاری کرتا ہے۔ Generic task tool میں وہ minutes سے الگ tasks بنتے ہیں۔ Diwan Suite میں ہر decision minutes، owner، due date، status اور executive report سے linked رہتا ہے۔' },
    analysis: { ar: ['المهمة العامة لا تحمل وزن القرار الرسمي أو سياقه.', 'عند التأخر، تحتاج الإدارة معرفة مصدر القرار وليس فقط اسم المهمة.', 'الربط بالمحضر والتقرير يحول المتابعة من جهد شخصي إلى مساءلة مؤسسية.'], en: ['A generic task does not carry the weight or context of an official decision.', 'When delayed, leadership needs to know the source decision, not only the task name.', 'Linking to minutes and reports turns follow-up from personal effort into institutional accountability.'], hi: ['Generic task official decision का weight/context नहीं रखता।', 'Delay होने पर leadership को source decision चाहिए, केवल task name नहीं।', 'Minutes/reports linkage follow-up को institutional accountability बनाता है।'], ur: ['Generic task official decision کا weight/context نہیں رکھتا۔', 'Delay پر leadership کو source decision چاہیے، صرف task name نہیں۔', 'Minutes/reports linkage follow-up کو institutional accountability بناتا ہے۔'] },
    criteriaRows: rows(
      [['مصدر القرار', 'وصف مهمة يدوي', 'قرار مرتبط بالمحضر والاجتماع'], ['المسؤولية', 'مالك مهمة فقط', 'مالك تنفيذ مرتبط بقرار رسمي'], ['تاريخ الاستحقاق', 'موعد مهمة', 'موعد تنفيذ مع تنبيهات وتصعيد'], ['الاعتماد', 'غير مرتبط بالاعتماد', 'قرار بعد محضر معتمد'], ['سجل التدقيق', 'سجل نشاط عام', 'سجل حوكمي للقرار والتنفيذ'], ['التقارير', 'تقارير مهام', 'تقارير قرارات مجلس ولجان'], ['السرية', 'حسب مساحة العمل', 'صلاحيات حساسة للمجالس'], ['المحاضر', 'خارج النظام', 'مرتبطة مباشرة'], ['التصعيد', 'عام', 'تصعيد حسب المسؤولية والحوكمة'], ['المساءلة', 'تشغيلية', 'مؤسسية وقابلة للتدقيق']],
      [['Decision source', 'Manual task description', 'Decision linked to minutes and meeting'], ['Responsibility', 'Task owner only', 'Execution owner linked to formal decision'], ['Due date', 'Task deadline', 'Execution deadline with alerts and escalation'], ['Approval', 'Not linked to approval', 'Decision after approved minutes'], ['Audit trail', 'General activity log', 'Governance trail for decision and execution'], ['Reports', 'Task reports', 'Board and committee decision reports'], ['Confidentiality', 'Workspace-based', 'Sensitive board permissions'], ['Minutes', 'Outside the tool', 'Directly linked'], ['Escalation', 'Generic', 'Governance-based escalation'], ['Accountability', 'Operational', 'Institutional and auditable']],
      [['Decision source', 'Manual task description', 'Decision minutes/meeting से linked'], ['Responsibility', 'केवल task owner', 'Formal decision से linked execution owner'], ['Due date', 'Task deadline', 'Alerts/escalation के साथ execution deadline'], ['Approval', 'Approval से linked नहीं', 'Approved minutes के बाद decision'], ['Audit trail', 'General activity log', 'Decision/execution governance trail'], ['Reports', 'Task reports', 'Board/committee decision reports'], ['Confidentiality', 'Workspace-based', 'Sensitive board permissions'], ['Minutes', 'Tool के बाहर', 'Directly linked'], ['Escalation', 'Generic', 'Governance-based escalation'], ['Accountability', 'Operational', 'Institutional and auditable']],
      [['Decision source', 'Manual task description', 'Decision minutes/meeting سے linked'], ['Responsibility', 'صرف task owner', 'Formal decision سے linked execution owner'], ['Due date', 'Task deadline', 'Alerts/escalation کے ساتھ execution deadline'], ['Approval', 'Approval سے linked نہیں', 'Approved minutes کے بعد decision'], ['Audit trail', 'General activity log', 'Decision/execution governance trail'], ['Reports', 'Task reports', 'Board/committee decision reports'], ['Confidentiality', 'Workspace-based', 'Sensitive board permissions'], ['Minutes', 'Tool کے باہر', 'Directly linked'], ['Escalation', 'Generic', 'Governance-based escalation'], ['Accountability', 'Operational', 'Institutional and auditable']]
    ),
    faq: {
      ar: [{ q: 'هل يمكن استخدام برنامج مهام عام لمتابعة قرارات المجلس؟', a: 'يمكن استخدامه للمتابعة البسيطة، لكنه لا يحفظ سياق القرار ومحضره واعتماده وسجل تدقيقه.' }, { q: 'ما الفرق بين القرار والمهمة؟', a: 'القرار مخرج رسمي من مجلس أو لجنة، أما المهمة فهي إجراء تنفيذي ناتج عنه ويحتاج متابعة ومسؤولية.' }, { q: 'هل يحول ديوان سويت القرار إلى مهمة؟', a: 'نعم، يربط القرار بمهمة أو متابعة تنفيذية مع مسؤول وتاريخ استحقاق وحالة تنفيذ.' }],
      en: [{ q: 'Can a generic task tool track board decisions?', a: 'It can track simple follow-up, but it does not preserve decision context, minutes, approval, and audit trail.' }, { q: 'What is the difference between a decision and a task?', a: 'A decision is a formal board or committee output; a task is the execution action that follows it.' }, { q: 'Can Diwan Suite convert a decision into a task?', a: 'Yes. It links decisions to execution follow-up with owner, due date, and status.' }],
      hi: [{ q: 'क्या generic task tool board decisions track कर सकता है?', a: 'Simple follow-up के लिए हो सकता है, पर decision context, minutes, approval और audit trail नहीं रखता।' }, { q: 'Decision और task में क्या अंतर है?', a: 'Decision board/committee का formal output है; task उसका execution action है।' }, { q: 'क्या Diwan Suite decision को task बनाता है?', a: 'हाँ, owner, due date और status के साथ execution follow-up बनाता है।' }],
      ur: [{ q: 'کیا generic task tool board decisions track کر سکتا ہے؟', a: 'Simple follow-up کے لیے ہو سکتا ہے، مگر decision context، minutes، approval اور audit trail نہیں رکھتا۔' }, { q: 'Decision اور task میں کیا فرق ہے؟', a: 'Decision board/committee کا formal output ہے؛ task اس کا execution action ہے۔' }, { q: 'کیا Diwan Suite decision کو task بناتا ہے؟', a: 'جی ہاں، owner، due date اور status کے ساتھ execution follow-up بناتا ہے۔' }],
    },
    relatedPages: ['boardDecisionsTrackingSoftware', 'manualBoardDecisionTrackingVsAutomation', 'corporateGovernancePlatform'],
    ctaTitle: { ar: 'حوّل قرارات المجلس إلى تنفيذ قابل للقياس', en: 'Turn board decisions into measurable execution', hi: 'Board decisions को measurable execution बनाएं', ur: 'Board decisions کو measurable execution بنائیں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف يدير ديوان سويت القرار من المحضر حتى التنفيذ والتقرير.', en: 'Book a walkthrough showing how Diwan Suite manages decisions from minutes to execution and reporting.', hi: 'Demo बुक करें और देखें Diwan Suite decision को minutes से execution/reporting तक कैसे चलाता है।', ur: 'Demo بک کریں اور دیکھیں Diwan Suite decision کو minutes سے execution/reporting تک کیسے چلاتا ہے۔' },
  },
  {
    key: 'electronicMeetingMinutesVsPaperMinutes',
    kind: 'operational',
    title: { ar: 'محاضر الاجتماعات الإلكترونية vs المحاضر الورقية', en: 'Electronic Meeting Minutes vs Paper Minutes', hi: 'Electronic Meeting Minutes vs Paper Minutes', ur: 'Electronic Meeting Minutes vs Paper Minutes' },
    seoTitle: { ar: 'محاضر الاجتماعات الإلكترونية vs المحاضر الورقية | ديوان سويت', en: 'Electronic Meeting Minutes vs Paper Minutes | Diwan Suite', hi: 'Electronic Meeting Minutes vs Paper Minutes | Diwan Suite', ur: 'Electronic Meeting Minutes vs Paper Minutes | Diwan Suite' },
    seoDescription: { ar: 'مقارنة بين المحاضر الورقية والمحاضر الإلكترونية من حيث الاعتماد والتوقيع والبحث وسجل التدقيق وربط القرارات بالمهام.', en: 'Compare paper and electronic meeting minutes across approval, signature, search, audit trail, and decision-to-task linkage.', hi: 'Paper और electronic meeting minutes की approval, signature, search, audit trail और decision-to-task linkage पर तुलना।', ur: 'Paper اور electronic meeting minutes کی approval، signature، search، audit trail اور decision-to-task linkage پر तुलना۔' },
    directAnswer: { ar: 'المحاضر الورقية تصلح للتوثيق التقليدي، لكنها ضعيفة في البحث والتتبع والاعتماد السريع وربط القرارات بالتنفيذ. المحاضر الإلكترونية تحول الوثيقة إلى سجل حوكمي قابل للتدقيق.', en: 'Paper minutes can document traditionally, but they are weak in search, tracking, fast approvals, and linking decisions to execution. Electronic minutes turn the record into auditable governance evidence.', hi: 'Paper minutes traditional documentation के लिए हो सकते हैं, पर search, tracking, fast approvals और execution linkage में कमजोर होते हैं। Electronic minutes auditable governance record बनाते हैं।', ur: 'Paper minutes traditional documentation کے لیے ہو سکتے ہیں، مگر search، tracking، fast approvals اور execution linkage میں کمزور ہوتے ہیں۔ Electronic minutes auditable governance record بناتے ہیں۔' },
    summary: { ar: 'في الجهات التي تحتاج جاهزية رقابية وسرعة اعتماد، لا يكفي الورق. المحضر الإلكتروني يحفظ النسخة المعتمدة، يربط التوقيع، ويجعل البحث والاسترجاع والمتابعة أسرع.', en: 'For organizations that need audit readiness and faster approvals, paper is not enough. Electronic minutes preserve the approved version, connect signatures, and make search and follow-up faster.', hi: 'Audit readiness और faster approvals वाली organizations में paper पर्याप्त नहीं। Electronic minutes approved version, signatures, search और follow-up को बेहतर बनाते हैं।', ur: 'Audit readiness اور faster approvals والی organizations میں paper کافی نہیں۔ Electronic minutes approved version، signatures، search اور follow-up کو بہتر بناتے ہیں۔' },
    alternativeName: { ar: 'محاضر ورقية', en: 'Paper minutes', hi: 'Paper minutes', ur: 'Paper minutes' },
    diwanName: { ar: 'محاضر إلكترونية في ديوان سويت', en: 'Diwan Suite electronic minutes', hi: 'Diwan Suite electronic minutes', ur: 'Diwan Suite electronic minutes' },
    alternativeUse: { ar: 'اجتماعات بسيطة أو أرشفة تقليدية لا تحتاج متابعة تنفيذية.', en: 'Simple meetings or traditional archiving without execution follow-up.', hi: 'Simple meetings या traditional archiving बिना execution follow-up.', ur: 'Simple meetings یا traditional archiving بغیر execution follow-up۔' },
    diwanUse: { ar: 'محاضر رسمية تحتاج اعتمادًا وتوقيعًا وبحثًا وربطًا بالقرارات والتنفيذ.', en: 'Official minutes needing approval, e-signature, search, and decision execution linkage.', hi: 'Official minutes जिन्हें approval, e-signature, search और execution linkage चाहिए।', ur: 'Official minutes جنہیں approval، e-signature، search اور execution linkage چاہیے۔' },
    scenario: { ar: 'جهة شبه حكومية تحتاج مراجعة محضر قديم وقرار مرتبط به. ورقيًا يبحث الفريق في ملفات وسجلات. إلكترونيًا يظهر المحضر والقرار والتوقيع ومسار الاعتماد في صفحة واحدة.', en: 'A semi-government entity needs to review old minutes and a related decision. With paper, the team searches folders and logs. Electronically, minutes, decision, signature, and approval path appear together.', hi: 'Semi-government entity old minutes और related decision review करना चाहती है। Paper में folders/logs खोजने पड़ते हैं। Electronic में minutes, decision, signature और approval path साथ दिखते हैं।', ur: 'Semi-government entity old minutes اور related decision review کرنا چاہتی ہے۔ Paper میں folders/logs تلاش کرنے پڑتے ہیں۔ Electronic میں minutes، decision، signature اور approval path ساتھ دکھتے ہیں۔' },
    analysis: { ar: ['المحضر الورقي يضعف سرعة الاسترجاع عند التدقيق.', 'أي تعديل أو نسخة جديدة تحتاج ضبطًا يدويًا.', 'المحضر الإلكتروني يربط الوثيقة بمسار اعتماد وسجل تغييرات وتنفيذ القرارات.'], en: ['Paper minutes slow down retrieval during audit.', 'Any change or new version requires manual control.', 'Electronic minutes link the record with approval workflow, change history, and decision execution.'], hi: ['Paper minutes audit में retrieval slow करते हैं।', 'हर change/version manual control चाहता है।', 'Electronic minutes approval workflow, change history और decision execution से linked होते हैं।'], ur: ['Paper minutes audit میں retrieval slow کرتے ہیں۔', 'ہر change/version manual control چاہتا ہے۔', 'Electronic minutes approval workflow، change history اور decision execution سے linked ہوتے ہیں۔'] },
    criteriaRows: rows(
      [['البحث والاسترجاع', 'يدوي وبطيء', 'بحث سريع حسب الاجتماع والقرار'], ['الاعتماد', 'توقيعات ومراسلات ورقية', 'مسار اعتماد إلكتروني'], ['التوقيع', 'يدوي', 'توقيع إلكتروني وختم زمني'], ['النسخة المعتمدة', 'قد تتعدد النسخ', 'نسخة معتمدة واضحة'], ['القرارات', 'داخل النص فقط', 'مرتبطة بمهام ومتابعة'], ['سجل التدقيق', 'محدود', 'كامل ومركزي'], ['الأمان', 'يعتمد على حفظ الملف', 'صلاحيات ووصول مضبوط'], ['التقارير', 'تجهيز يدوي', 'لوحات مؤشرات'], ['الجاهزية الرقابية', 'تحتاج جمع ملفات', 'جاهزة ومنظمة'], ['الاستدامة', 'ورق وأرشفة مادية', 'أرشفة رقمية']],
      [['Search', 'Manual and slow', 'Fast search by meeting and decision'], ['Approval', 'Paper signatures and messages', 'Electronic approval workflow'], ['Signature', 'Manual', 'E-signature and timestamp'], ['Approved version', 'Versions may multiply', 'Clear approved version'], ['Decisions', 'Only inside text', 'Linked to tasks and follow-up'], ['Audit trail', 'Limited', 'Complete and centralized'], ['Security', 'Depends on file custody', 'Controlled permissions'], ['Reports', 'Manual preparation', 'Dashboards'], ['Audit readiness', 'Requires gathering files', 'Organized and ready'], ['Sustainability', 'Paper archive', 'Digital archive']],
      [['Search', 'Manual और slow', 'Meeting/decision से fast search'], ['Approval', 'Paper signatures/messages', 'Electronic approval workflow'], ['Signature', 'Manual', 'E-signature और timestamp'], ['Approved version', 'Versions बढ़ सकते हैं', 'Clear approved version'], ['Decisions', 'केवल text में', 'Tasks/follow-up से linked'], ['Audit trail', 'Limited', 'Complete and centralized'], ['Security', 'File custody पर निर्भर', 'Controlled permissions'], ['Reports', 'Manual preparation', 'Dashboards'], ['Audit readiness', 'Files collect करने पड़ते हैं', 'Organized and ready'], ['Sustainability', 'Paper archive', 'Digital archive']],
      [['Search', 'Manual اور slow', 'Meeting/decision سے fast search'], ['Approval', 'Paper signatures/messages', 'Electronic approval workflow'], ['Signature', 'Manual', 'E-signature اور timestamp'], ['Approved version', 'Versions بڑھ سکتے ہیں', 'Clear approved version'], ['Decisions', 'صرف text میں', 'Tasks/follow-up سے linked'], ['Audit trail', 'Limited', 'Complete and centralized'], ['Security', 'File custody پر dependent', 'Controlled permissions'], ['Reports', 'Manual preparation', 'Dashboards'], ['Audit readiness', 'Files collect کرنے پڑتے ہیں', 'Organized and ready'], ['Sustainability', 'Paper archive', 'Digital archive']]
    ),
    faq: {
      ar: [{ q: 'هل المحاضر الإلكترونية مناسبة للجهات الحكومية؟', a: 'نعم، خصوصًا عند الحاجة إلى اعتماد وتوقيع وسجل تدقيق واسترجاع سريع.' }, { q: 'هل يمكن منع التعديل بعد اعتماد المحضر؟', a: 'يمكن ضبط ذلك حسب صلاحيات ومسارات الاعتماد داخل النظام.' }, { q: 'هل المحضر الإلكتروني يغني عن الأرشفة؟', a: 'هو يعزز الأرشفة الرقمية ويربط المحضر بالقرار والتنفيذ بدل حفظه كملف منفصل.' }],
      en: [{ q: 'Are electronic minutes suitable for government entities?', a: 'Yes, especially when approval, e-signature, audit trail, and quick retrieval are required.' }, { q: 'Can changes be prevented after approval?', a: 'This can be controlled according to permissions and approval workflows.' }, { q: 'Do electronic minutes replace archiving?', a: 'They strengthen digital archiving and link minutes to decisions and execution.' }],
      hi: [{ q: 'क्या electronic minutes government entities के लिए suitable हैं?', a: 'हाँ, खासकर approval, e-signature, audit trail और quick retrieval की जरूरत हो।' }, { q: 'क्या approval के बाद changes रोके जा सकते हैं?', a: 'Permissions और approval workflows के अनुसार control किया जा सकता है।' }, { q: 'क्या electronic minutes archiving को replace करते हैं?', a: 'वे digital archiving को मजबूत करते हैं और minutes को decisions/execution से जोड़ते हैं।' }],
      ur: [{ q: 'کیا electronic minutes government entities کے لیے suitable ہیں؟', a: 'جی ہاں، خاص طور پر approval، e-signature، audit trail اور quick retrieval کی ضرورت ہو۔' }, { q: 'کیا approval کے بعد changes روکے جا سکتے ہیں؟', a: 'Permissions اور approval workflows کے مطابق control کیا جا سکتا ہے۔' }, { q: 'کیا electronic minutes archiving کو replace کرتے ہیں؟', a: 'یہ digital archiving کو مضبوط کرتے ہیں اور minutes کو decisions/execution سے جوڑتے ہیں۔' }],
    },
    relatedPages: ['meetingMinutesSoftware', 'aiMeetingMinutesVsManualWordPdf', 'meetingMinutesEsignature'],
    ctaTitle: { ar: 'انتقل من المحاضر الورقية إلى محاضر إلكترونية قابلة للتنفيذ', en: 'Move from paper minutes to executable electronic minutes', hi: 'Paper minutes से executable electronic minutes पर जाएं', ur: 'Paper minutes سے executable electronic minutes پر جائیں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف يحفظ ديوان سويت المحضر ويعتمده ويربط قراراته بالتنفيذ.', en: 'Book a demo showing how Diwan Suite stores, approves, and links minutes to execution.', hi: 'Demo देखें कि Diwan Suite minutes को store, approve और execution से link कैसे करता है।', ur: 'Demo دیکھیں کہ Diwan Suite minutes کو store، approve اور execution سے link کیسے کرتا ہے۔' },
  },
  {
    key: 'manualCommitteeManagementVsGovernancePlatform',
    kind: 'operational',
    title: { ar: 'إدارة اللجان يدويًا vs منصة حوكمة اللجان', en: 'Manual Committee Management vs Committee Governance Platform', hi: 'Manual Committee Management vs Committee Governance Platform', ur: 'Manual Committee Management vs Committee Governance Platform' },
    seoTitle: { ar: 'إدارة اللجان يدويًا vs منصة حوكمة اللجان | ديوان سويت', en: 'Manual Committee Management vs Committee Governance Platform | Diwan Suite', hi: 'Manual Committee Management vs Committee Governance Platform | Diwan Suite', ur: 'Manual Committee Management vs Committee Governance Platform | Diwan Suite' },
    seoDescription: { ar: 'مقارنة بين إدارة لجان المراجعة والمخاطر والترشيحات يدويًا وبين منصة حوكمة تنظم الاجتماعات والمحاضر والتوصيات والمتابعة.', en: 'Compare manual audit, risk, and nomination committee management with a governance platform for meetings, minutes, recommendations, and follow-up.', hi: 'Audit, risk और nomination committees के manual management और governance platform की तुलना।', ur: 'Audit، risk اور nomination committees کے manual management اور governance platform کا موازنہ۔' },
    directAnswer: { ar: 'الإدارة اليدوية قد تكفي للجنة واحدة واجتماعات قليلة، لكنها تضعف المتابعة عند تعدد اللجان والتوصيات والمرفقات. منصة حوكمة اللجان تجعل كل توصية ومحضر ومسؤولية قابلة للتتبع.', en: 'Manual management may work for one committee and few meetings, but weakens follow-up when committees, recommendations, and attachments increase. A committee governance platform makes each recommendation, minutes record, and responsibility traceable.', hi: 'Manual management एक committee/few meetings में काम कर सकता है, पर committees, recommendations और attachments बढ़ने पर follow-up कमजोर होता है। Governance platform हर recommendation, minutes और responsibility को traceable बनाता है।', ur: 'Manual management ایک committee/few meetings میں چل سکتا ہے، مگر committees، recommendations اور attachments بڑھنے پر follow-up کمزور ہوتا ہے۔ Governance platform ہر recommendation، minutes اور responsibility کو traceable بناتا ہے۔' },
    summary: { ar: 'اللجان مثل المراجعة والمخاطر والترشيحات تحتاج انتظامًا عاليًا لأن مخرجاتها مرتبطة بالرقابة والإدارة العليا. ديوان سويت يحوّل إدارة اللجان من ملفات ورسائل إلى دورة حوكمة واضحة.', en: 'Audit, risk, and nomination committees need high discipline because their outputs affect oversight and leadership. Diwan Suite turns committee management from files and messages into a clear governance cycle.', hi: 'Audit, risk और nomination committees को discipline चाहिए क्योंकि outputs oversight और leadership से जुड़े होते हैं। Diwan Suite files/messages को clear governance cycle में बदलता है।', ur: 'Audit، risk اور nomination committees کو discipline چاہیے کیونکہ outputs oversight اور leadership سے جڑے ہوتے ہیں۔ Diwan Suite files/messages کو clear governance cycle میں بدلتا ہے۔' },
    alternativeName: { ar: 'إدارة يدوية للجان', en: 'Manual committee management', hi: 'Manual committee management', ur: 'Manual committee management' },
    diwanName: { ar: 'منصة حوكمة اللجان', en: 'Committee governance platform', hi: 'Committee governance platform', ur: 'Committee governance platform' },
    alternativeUse: { ar: 'لجنة صغيرة، اجتماعات قليلة، ولا توجد متطلبات متابعة رقابية كبيرة.', en: 'Small committee, few meetings, and limited governance follow-up requirements.', hi: 'Small committee, few meetings और limited governance follow-up.', ur: 'Small committee، few meetings اور limited governance follow-up۔' },
    diwanUse: { ar: 'لجان متعددة تحتاج جدول أعمال ومحاضر وتوصيات ومسؤوليات وتقارير متابعة.', en: 'Multiple committees needing agenda, minutes, recommendations, responsibilities, and follow-up reports.', hi: 'Multiple committees जिन्हें agenda, minutes, recommendations, responsibilities और follow-up reports चाहिए।', ur: 'Multiple committees جنہیں agenda، minutes، recommendations، responsibilities اور follow-up reports چاہیے۔' },
    scenario: { ar: 'جهة لديها لجنة مراجعة ولجنة مخاطر ولجنة ترشيحات. يدويًا تتوزع التوصيات بين ملفات ورسائل. في ديوان سويت تملك كل لجنة جدولها ومحاضرها وتوصياتها ومؤشرات تنفيذها.', en: 'An organization has audit, risk, and nomination committees. Manually, recommendations are spread across files and messages. In Diwan Suite, each committee has its agenda, minutes, recommendations, and execution indicators.', hi: 'एक organization के पास audit, risk और nomination committees हैं। Manual process में recommendations files/messages में फैलती हैं। Diwan Suite में हर committee का agenda, minutes, recommendations और execution indicators होते हैं।', ur: 'ایک organization کے پاس audit، risk اور nomination committees ہیں۔ Manual process میں recommendations files/messages میں پھیلتی ہیں۔ Diwan Suite میں ہر committee کا agenda، minutes، recommendations اور execution indicators ہوتے ہیں۔' },
    analysis: { ar: ['تعدد اللجان يعني تعدد التوصيات والمواعيد والمرفقات.', 'الإدارة اليدوية تضعف الذاكرة المؤسسية عند تغيير الأعضاء أو أمين السر.', 'منصة حوكمة اللجان تجعل المخرجات قابلة للتجميع والتقرير للإدارة العليا.'], en: ['Multiple committees mean multiple recommendations, deadlines, and attachments.', 'Manual management weakens institutional memory when members or secretaries change.', 'A committee governance platform makes outputs reportable to leadership.'], hi: ['Multiple committees का मतलब multiple recommendations, deadlines और attachments।', 'Manual management members/secretaries बदलने पर institutional memory कमजोर करता है।', 'Governance platform outputs को leadership reports में बदलता है।'], ur: ['Multiple committees کا مطلب multiple recommendations، deadlines اور attachments۔', 'Manual management members/secretaries بدلنے پر institutional memory کمزور کرتا ہے۔', 'Governance platform outputs کو leadership reports میں بدلتا ہے۔'] },
    criteriaRows: rows(
      [['هيكل اللجان', 'قوائم وملفات', 'لجان وأعضاء وأدوار'], ['جدول الأعمال', 'إرسال يدوي', 'بنود ومرفقات منظمة'], ['التوصيات', 'نص داخل محضر أو بريد', 'توصيات قابلة للمتابعة'], ['المحاضر', 'ملفات منفصلة', 'محاضر مرتبطة باللجنة'], ['المسؤوليات', 'توزيع يدوي', 'مالك وتاريخ استحقاق'], ['التقارير', 'تجميع يدوي', 'مؤشرات تنفيذ'], ['الامتثال', 'يعتمد على الأفراد', 'سجل تدقيق مركزي'], ['التصعيد', 'غير منظم', 'تنبيهات وتصعيد'], ['الأمان', 'حسب الملفات', 'صلاحيات حساسة'], ['الاستمرارية', 'تتأثر بتغيير الأشخاص', 'ذاكرة مؤسسية']],
      [['Committee structure', 'Lists and files', 'Committees, members, and roles'], ['Agenda', 'Manual sending', 'Organized items and attachments'], ['Recommendations', 'Text in minutes or email', 'Trackable recommendations'], ['Minutes', 'Separate files', 'Minutes linked to committee'], ['Responsibilities', 'Manual assignment', 'Owner and due date'], ['Reports', 'Manual aggregation', 'Execution indicators'], ['Compliance', 'People-dependent', 'Central audit trail'], ['Escalation', 'Unstructured', 'Alerts and escalation'], ['Security', 'File-based', 'Sensitive permissions'], ['Continuity', 'Affected by people changes', 'Institutional memory']],
      [['Committee structure', 'Lists/files', 'Committees, members और roles'], ['Agenda', 'Manual sending', 'Organized items/attachments'], ['Recommendations', 'Minutes/email में text', 'Trackable recommendations'], ['Minutes', 'Separate files', 'Committee से linked minutes'], ['Responsibilities', 'Manual assignment', 'Owner और due date'], ['Reports', 'Manual aggregation', 'Execution indicators'], ['Compliance', 'People-dependent', 'Central audit trail'], ['Escalation', 'Unstructured', 'Alerts और escalation'], ['Security', 'File-based', 'Sensitive permissions'], ['Continuity', 'People changes से प्रभावित', 'Institutional memory']],
      [['Committee structure', 'Lists/files', 'Committees، members اور roles'], ['Agenda', 'Manual sending', 'Organized items/attachments'], ['Recommendations', 'Minutes/email میں text', 'Trackable recommendations'], ['Minutes', 'Separate files', 'Committee سے linked minutes'], ['Responsibilities', 'Manual assignment', 'Owner اور due date'], ['Reports', 'Manual aggregation', 'Execution indicators'], ['Compliance', 'People-dependent', 'Central audit trail'], ['Escalation', 'Unstructured', 'Alerts اور escalation'], ['Security', 'File-based', 'Sensitive permissions'], ['Continuity', 'People changes سے متاثر', 'Institutional memory']]
    ),
    faq: {
      ar: [{ q: 'ما أفضل طريقة لإدارة لجان مجلس الإدارة؟', a: 'الأفضل استخدام منصة تربط اللجنة بأعضائها وجدول أعمالها ومحاضرها وتوصياتها ومتابعة التنفيذ.' }, { q: 'هل ديوان سويت مناسب للجان المراجعة والمخاطر؟', a: 'نعم، لأنه يدعم المحاضر والتوصيات والمهام والتقارير وسجل التدقيق.' }, { q: 'هل يمكن متابعة توصيات اللجان إلكترونيًا؟', a: 'نعم، يمكن ربط التوصية بمسؤول وتاريخ استحقاق وحالة تنفيذ وتقارير.' }],
      en: [{ q: 'What is the best way to manage board committees?', a: 'Use a platform that links each committee to its members, agenda, minutes, recommendations, and follow-up.' }, { q: 'Is Diwan Suite suitable for audit and risk committees?', a: 'Yes. It supports minutes, recommendations, tasks, reports, and audit trail.' }, { q: 'Can committee recommendations be tracked electronically?', a: 'Yes. Recommendations can be linked to owners, due dates, status, and reports.' }],
      hi: [{ q: 'Board committees manage करने का सबसे अच्छा तरीका क्या है?', a: 'ऐसा platform उपयोग करें जो committee को members, agenda, minutes, recommendations और follow-up से जोड़ता है।' }, { q: 'क्या Diwan Suite audit/risk committees के लिए suitable है?', a: 'हाँ। यह minutes, recommendations, tasks, reports और audit trail support करता है।' }, { q: 'क्या committee recommendations electronically track हो सकती हैं?', a: 'हाँ। Recommendations owners, due dates, status और reports से link हो सकती हैं।' }],
      ur: [{ q: 'Board committees manage کرنے کا بہترین طریقہ کیا ہے؟', a: 'ایسا platform استعمال کریں جو committee کو members، agenda، minutes، recommendations اور follow-up سے جوڑتا ہے۔' }, { q: 'کیا Diwan Suite audit/risk committees کے لیے suitable ہے؟', a: 'جی ہاں۔ یہ minutes، recommendations، tasks، reports اور audit trail support کرتا ہے۔' }, { q: 'کیا committee recommendations electronically track ہو سکتی ہیں؟', a: 'جی ہاں۔ Recommendations owners، due dates، status اور reports سے link ہو سکتی ہیں۔' }],
    },
    relatedPages: ['committeeGovernanceSoftware', 'auditCommitteeManagementSoftware', 'riskCommitteeManagementSoftware', 'nominationRemunerationCommitteeManagement'],
    ctaTitle: { ar: 'نظّم لجانك من الاجتماع إلى التوصية والتنفيذ', en: 'Organize committees from meeting to recommendation and execution', hi: 'Committees को meeting से recommendation और execution तक व्यवस्थित करें', ur: 'Committees کو meeting سے recommendation اور execution تک منظم کریں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف يدير ديوان سويت لجان المراجعة والمخاطر والترشيحات والتوصيات.', en: 'Book a demo showing how Diwan Suite manages audit, risk, nomination committees, and their recommendations.', hi: 'Demo देखें कि Diwan Suite audit, risk और nomination committees को कैसे manage करता है।', ur: 'Demo دیکھیں کہ Diwan Suite audit، risk اور nomination committees کو کیسے manage کرتا ہے۔' },
  },
  {
    key: 'boardGovernanceSoftwareGovernmentSaudiArabia',
    kind: 'sector',
    title: { ar: 'Board Governance Software للجهات الحكومية في السعودية', en: 'Board Governance Software for Government Entities in Saudi Arabia', hi: 'Saudi Arabia की Government Entities के लिए Board Governance Software', ur: 'Saudi Arabia کی Government Entities کے لیے Board Governance Software' },
    seoTitle: { ar: 'Board Governance Software للجهات الحكومية في السعودية | ديوان سويت', en: 'Board Governance Software for Government Entities in Saudi Arabia | Diwan Suite', hi: 'Board Governance Software for Government Entities in Saudi Arabia | Diwan Suite', ur: 'Board Governance Software for Government Entities in Saudi Arabia | Diwan Suite' },
    seoDescription: { ar: 'صفحة مقارنة قطاعية توضح متى تحتاج الجهات الحكومية في السعودية منصة حوكمة مجالس ولجان تدعم السرية والامتثال والمحاضر وسجل التدقيق.', en: 'A sector comparison page explaining when Saudi government entities need a board and committee governance platform for confidentiality, compliance, minutes, and audit trail.', hi: 'Saudi government entities को confidentiality, compliance, minutes और audit trail के लिए governance platform कब चाहिए — sector page.', ur: 'Saudi government entities کو confidentiality، compliance، minutes اور audit trail کے لیے governance platform کب چاہیے — sector page۔' },
    directAnswer: { ar: 'الجهات الحكومية وشبه الحكومية تحتاج أكثر من برنامج اجتماعات عام؛ تحتاج منصة حوكمة تضبط المجالس واللجان والمحاضر والصلاحيات والقرارات وسجل التدقيق بما يناسب حساسية البيانات والمسؤولية المؤسسية.', en: 'Government and semi-government entities need more than a generic meeting tool. They need a governance platform for boards, committees, minutes, permissions, decisions, and audit trail aligned with sensitive data and institutional accountability.', hi: 'Government और semi-government entities को generic meeting tool से अधिक चाहिए: boards, committees, minutes, permissions, decisions और audit trail के लिए governance platform।', ur: 'Government اور semi-government entities کو generic meeting tool سے زیادہ چاہیے: boards، committees، minutes، permissions، decisions اور audit trail کے لیے governance platform۔' },
    summary: { ar: 'هذه الصفحة تستهدف الجهات التي تدير لجانًا ومجالسًا رسمية وتحتاج سرية عالية وربطًا بين المحاضر والقرارات والتنفيذ والتقارير. ديوان سويت يقدم طبقة حوكمة فوق الاجتماع نفسه.', en: 'This page targets entities that manage formal committees and boards and need high confidentiality plus linkage between minutes, decisions, execution, and reports. Diwan Suite provides a governance layer above the meeting itself.', hi: 'यह page उन entities के लिए है जो formal committees/boards चलाती हैं और minutes, decisions, execution व reports के बीच high confidentiality/linkage चाहती हैं। Diwan Suite meeting के ऊपर governance layer देता है।', ur: 'یہ page اُن entities کے لیے ہے جو formal committees/boards چلاتی ہیں اور minutes، decisions، execution و reports کے درمیان high confidentiality/linkage چاہتی ہیں۔ Diwan Suite meeting کے اوپر governance layer دیتا ہے۔' },
    alternativeName: { ar: 'أدوات اجتماعات عامة', en: 'Generic meeting tools', hi: 'Generic meeting tools', ur: 'Generic meeting tools' },
    diwanName: { ar: 'ديوان سويت للجهات الحكومية', en: 'Diwan Suite for government entities', hi: 'Diwan Suite for government entities', ur: 'Diwan Suite for government entities' },
    alternativeUse: { ar: 'اجتماعات داخلية غير رسمية أو لقاءات مرئية لا تتطلب حوكمة قرار.', en: 'Informal internal meetings or video calls that do not require decision governance.', hi: 'Informal internal meetings या video calls जिन्हें decision governance नहीं चाहिए।', ur: 'Informal internal meetings یا video calls جنہیں decision governance نہیں چاہیے۔' },
    diwanUse: { ar: 'مجالس ولجان وجهات تحتاج سرية ومحاضر واعتماد وتوقيع وتقارير وسجل تدقيق.', en: 'Boards, committees, and entities needing confidentiality, minutes, approvals, signatures, reports, and audit trail.', hi: 'Boards/committees/entities जिन्हें confidentiality, minutes, approvals, signatures, reports और audit trail चाहिए।', ur: 'Boards/committees/entities جنہیں confidentiality، minutes، approvals، signatures، reports اور audit trail چاہیے۔' },
    scenario: { ar: 'جهة حكومية لديها لجان متعددة تتعامل مع مرفقات حساسة وقرارات لها أثر تنفيذي. الأدوات العامة تعقد الاجتماع، بينما ديوان سويت يحفظ المحضر والقرار والمسؤولية وسجل التدقيق في مسار واحد.', en: 'A government entity has multiple committees handling sensitive attachments and decisions with execution impact. Generic tools host the meeting; Diwan Suite keeps minutes, decision, responsibility, and audit trail in one path.', hi: 'Government entity की multiple committees sensitive attachments और execution-impact decisions संभालती हैं। Generic tools meeting host करते हैं; Diwan Suite minutes, decision, responsibility और audit trail को एक path में रखता है।', ur: 'Government entity کی multiple committees sensitive attachments اور execution-impact decisions سنبھالتی ہیں۔ Generic tools meeting host کرتے ہیں؛ Diwan Suite minutes، decision، responsibility اور audit trail کو ایک path میں رکھتا ہے۔' },
    analysis: { ar: ['الجهات الحكومية تحتاج وضوح الصلاحيات وسرية المرفقات أكثر من الاجتماعات العادية.', 'القرار الحكومي أو شبه الحكومي يحتاج تتبعًا وتوثيقًا لا مجرد ملاحظات.', 'التقارير وسجل التدقيق يساعدان الإدارة العليا في المتابعة والجاهزية للمراجعة.'], en: ['Government entities need clearer permissions and attachment confidentiality than normal meetings.', 'Government or semi-government decisions need traceability and documentation, not only notes.', 'Reports and audit trail help leadership follow execution and remain review-ready.'], hi: ['Government entities को normal meetings से अधिक clear permissions और attachment confidentiality चाहिए।', 'Government/semi-government decisions को traceability/documentation चाहिए, केवल notes नहीं।', 'Reports और audit trail leadership को execution follow-up और review readiness देते हैं।'], ur: ['Government entities کو normal meetings سے زیادہ clear permissions اور attachment confidentiality چاہیے۔', 'Government/semi-government decisions کو traceability/documentation چاہیے، صرف notes نہیں۔', 'Reports اور audit trail leadership کو execution follow-up اور review readiness دیتے ہیں۔'] },
    criteriaRows: rows(
      [['السرية', 'مشاركة عامة حسب الأداة', 'صلاحيات دقيقة ومحتوى حساس'], ['المحاضر', 'ملاحظات أو ملفات', 'محاضر رسمية قابلة للاعتماد'], ['القرارات', 'تدوين يدوي', 'قرارات مرتبطة بالتنفيذ'], ['اللجان', 'لا توجد بنية لجنة', 'بنية مجالس ولجان'], ['التوقيع', 'منفصل غالبًا', 'توقيع واعتماد إلكتروني'], ['سجل التدقيق', 'محدود', 'مركزي وقابل للمراجعة'], ['التقارير', 'غير حوكمية', 'تقارير تنفيذ وامتثال'], ['التكامل', 'تواصل واجتماعات', 'طبقة حوكمة قابلة للتكامل'], ['النصاب', 'غير مخصص', 'حضور ونصاب'], ['المساءلة', 'متفرقة', 'واضحة ومؤسسية']],
      [['Confidentiality', 'General sharing by tool', 'Granular permissions and sensitive content'], ['Minutes', 'Notes or files', 'Official approvable minutes'], ['Decisions', 'Manual notes', 'Decisions linked to execution'], ['Committees', 'No committee structure', 'Boards and committees structure'], ['Signature', 'Usually separate', 'E-signature and approval'], ['Audit trail', 'Limited', 'Central and reviewable'], ['Reports', 'Not governance-specific', 'Execution and compliance reports'], ['Integration', 'Communication and meetings', 'Integrable governance layer'], ['Quorum', 'Not purpose-built', 'Attendance and quorum'], ['Accountability', 'Scattered', 'Clear and institutional']],
      [['Confidentiality', 'Tool-based general sharing', 'Granular permissions और sensitive content'], ['Minutes', 'Notes/files', 'Official approvable minutes'], ['Decisions', 'Manual notes', 'Execution से linked decisions'], ['Committees', 'Committee structure नहीं', 'Boards/committees structure'], ['Signature', 'अक्सर separate', 'E-signature और approval'], ['Audit trail', 'Limited', 'Central/reviewable'], ['Reports', 'Governance-specific नहीं', 'Execution/compliance reports'], ['Integration', 'Communication/meetings', 'Integrable governance layer'], ['Quorum', 'Purpose-built नहीं', 'Attendance/quorum'], ['Accountability', 'Scattered', 'Clear and institutional']],
      [['Confidentiality', 'Tool-based general sharing', 'Granular permissions اور sensitive content'], ['Minutes', 'Notes/files', 'Official approvable minutes'], ['Decisions', 'Manual notes', 'Execution سے linked decisions'], ['Committees', 'Committee structure نہیں', 'Boards/committees structure'], ['Signature', 'اکثر separate', 'E-signature اور approval'], ['Audit trail', 'Limited', 'Central/reviewable'], ['Reports', 'Governance-specific نہیں', 'Execution/compliance reports'], ['Integration', 'Communication/meetings', 'Integrable governance layer'], ['Quorum', 'Purpose-built نہیں', 'Attendance/quorum'], ['Accountability', 'Scattered', 'Clear and institutional']]
    ),
    faq: {
      ar: [{ q: 'هل تحتاج الجهات الحكومية منصة حوكمة مجالس؟', a: 'تحتاجها عندما توجد لجان ومجالس ومحاضر وقرارات تتطلب سرية واعتمادًا ومتابعة وسجل تدقيق.' }, { q: 'هل ديوان سويت بديل عن Teams أو Zoom؟', a: 'لا، يمكن أن يعمل كطبقة حوكمة فوق أدوات الاجتماع المرئي، حيث يدير المحضر والقرار والتنفيذ.' }, { q: 'ما أهم ميزة للجهات الحكومية؟', a: 'الربط بين الاجتماع والمحضر والقرار والمسؤولية وسجل التدقيق والتقارير.' }],
      en: [{ q: 'Do government entities need a board governance platform?', a: 'They need one when committees, boards, minutes, and decisions require confidentiality, approval, follow-up, and audit trail.' }, { q: 'Is Diwan Suite a replacement for Teams or Zoom?', a: 'No. It can act as a governance layer above video meeting tools by managing minutes, decisions, and execution.' }, { q: 'What is the key value for government entities?', a: 'Linking the meeting, minutes, decision, responsibility, audit trail, and reports.' }],
      hi: [{ q: 'क्या government entities को board governance platform चाहिए?', a: 'जब committees, boards, minutes और decisions को confidentiality, approval, follow-up और audit trail चाहिए।' }, { q: 'क्या Diwan Suite Teams/Zoom का replacement है?', a: 'नहीं। यह video meeting tools के ऊपर governance layer की तरह काम कर सकता है।' }, { q: 'Government entities के लिए मुख्य value क्या है?', a: 'Meeting, minutes, decision, responsibility, audit trail और reports को जोड़ना।' }],
      ur: [{ q: 'کیا government entities کو board governance platform چاہیے؟', a: 'جب committees، boards، minutes اور decisions کو confidentiality، approval، follow-up اور audit trail چاہیے۔' }, { q: 'کیا Diwan Suite Teams/Zoom کا replacement ہے؟', a: 'نہیں۔ یہ video meeting tools کے اوپر governance layer کی طرح کام کر سکتا ہے۔' }, { q: 'Government entities کے لیے اصل value کیا ہے؟', a: 'Meeting، minutes، decision، responsibility، audit trail اور reports کو جوڑنا۔' }],
    },
    relatedPages: ['governmentGovernance', 'ministriesGovernmentEntitiesSector', 'governanceSecurityCompliance', 'integrationsBoardGovernance'],
    ctaTitle: { ar: 'ابنِ طبقة حوكمة مناسبة لاجتماعات الجهات الحكومية', en: 'Build a governance layer for government entity meetings', hi: 'Government entity meetings के लिए governance layer बनाएं', ur: 'Government entity meetings کے لیے governance layer بنائیں' },
    ctaBody: { ar: 'احجز عرضًا يوضح كيف يخدم ديوان سويت مجالس ولجان الجهات الحكومية بسرية وسجل تدقيق وتقارير تنفيذ.', en: 'Book a demo showing how Diwan Suite supports government boards and committees with confidentiality, audit trail, and execution reports.', hi: 'Demo देखें कि Diwan Suite government boards/committees को confidentiality, audit trail और reports से कैसे support करता है।', ur: 'Demo دیکھیں کہ Diwan Suite government boards/committees کو confidentiality، audit trail اور reports سے کیسے support کرتا ہے۔' },
  },
]

function buildTable(seed: Phase4PageSeed, lang: LangCode): PageTable {
  return {
    caption: labels[lang].comparisonTable,
    columns: [labels[lang].criterion, seed.alternativeName[lang], seed.diwanName[lang]],
    rows: seed.criteriaRows[lang],
  }
}

function makePage(seed: Phase4PageSeed, lang: LangCode): InternalPageCopy {
  const l = labels[lang]
  const eyebrow = seed.kind === 'direct' ? l.direct : seed.kind === 'sector' ? l.sector : l.operational
  return {
    eyebrow,
    title: seed.title[lang],
    summary: seed.summary[lang],
    seoTitle: seed.seoTitle[lang],
    seoDescription: seed.seoDescription[lang],
    definition: seed.directAnswer[lang],
    executiveSummary: seed.summary[lang],
    whoFor: [seed.alternativeName[lang], seed.diwanName[lang], l.chooseDiwan],
    whatItSolves: seed.analysis[lang],
    howItWorks: [l.executiveSummary, l.comparisonTable, l.practicalAnalysis, l.whenChoose, l.scenario],
    relatedPages: seed.relatedPages,
    hideSiblingLinks: true,
    hideExploreLinks: true,
    pageFaqTitle: l.faq,
    ctaTitle: seed.ctaTitle[lang],
    ctaBody: seed.ctaBody[lang],
    ctaPrimaryLabel: l.ctaPrimary,
    ctaSecondaryLabel: l.ctaSecondary,
    faq: seed.faq[lang],
    sections: [
      { id: 'short-answer', title: l.shortAnswer, body: [seed.directAnswer[lang], seed.summary[lang]] },
      {
        id: 'comparison',
        title: l.comparisonTable,
        body: [lang === 'ar' ? 'المقارنة التالية لا تهاجم البديل، بل توضح متى يكون مناسبًا ومتى تحتاج الجهة إلى طبقة حوكمة متخصصة.' : lang === 'hi' ? 'यह तुलना alternative पर हमला नहीं करती; यह बताती है कि वह कब उपयुक्त है और specialized governance layer कब चाहिए।' : lang === 'ur' ? 'یہ موازنہ alternative پر حملہ نہیں کرتا؛ یہ بتاتا ہے کہ وہ کب مناسب ہے اور specialized governance layer کب چاہیے۔' : 'This comparison does not attack the alternative; it explains when it is suitable and when a specialized governance layer is needed.'],
        table: buildTable(seed, lang),
      },
      { id: 'practical-impact', title: l.practicalAnalysis, body: seed.analysis[lang] },
      { id: 'when-to-choose', title: l.whenChoose, body: [`${l.chooseAlternative}: ${seed.alternativeUse[lang]}`, `${l.chooseDiwan}: ${seed.diwanUse[lang]}`] },
      { id: 'scenario', title: l.scenario, body: [seed.scenario[lang]] },
      { id: 'ai-minutes', title: l.aiBlockTitle, body: [l.aiBlockBody] },
    ],
  }
}

export const comparisonSeoPhase4PageCopy: Record<LangCode, Record<Phase4ComparisonPageKey, InternalPageCopy>> = {
  ar: Object.fromEntries(seeds.map((seed) => [seed.key, makePage(seed, 'ar')])) as Record<Phase4ComparisonPageKey, InternalPageCopy>,
  en: Object.fromEntries(seeds.map((seed) => [seed.key, makePage(seed, 'en')])) as Record<Phase4ComparisonPageKey, InternalPageCopy>,
  hi: Object.fromEntries(seeds.map((seed) => [seed.key, makePage(seed, 'hi')])) as Record<Phase4ComparisonPageKey, InternalPageCopy>,
  ur: Object.fromEntries(seeds.map((seed) => [seed.key, makePage(seed, 'ur')])) as Record<Phase4ComparisonPageKey, InternalPageCopy>,
}
