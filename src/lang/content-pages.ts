import type { LangCode } from './types'
import type { InternalPageCopy } from './extra'
import type { PublicPage } from '@/lib/page-registry'

export type ContentPageKey = Exclude<PublicPage, 'home' | 'about' | 'privacy' | 'terms'>

type LangPack = {
  solutionEyebrow: string
  trustEyebrow: string
  platformEyebrow: string
  supportEyebrow: string
  executiveSummary: string
  directAnswerTitle: string
  problemsTitle: string
  solutionTitle: string
  capabilitiesTitle: string
  workflowTitle: string
  governanceTitle: string
  proofTitle: string
  outcomesTitle: string
  definitionLead: string
  whatItSolvesLabel: string[]
  howItWorksLabel: string[]
  commonAudience: string[]
  commonOutcomes: string[]
  commonWorkflow: string[]
  supportTitle: string
}

type PageTemplate = {
  key: ContentPageKey
  eyebrowType: 'solution' | 'trust' | 'platform' | 'support'
  titles: Record<LangCode, string>
  summaries: Record<LangCode, string>
  seoTitles: Record<LangCode, string>
  seoDescriptions: Record<LangCode, string>
  definitions: Record<LangCode, string>
  audiences?: Record<LangCode, string[]>
  solves?: Record<LangCode, string[]>
  workflows?: Record<LangCode, string[]>
  faq: Record<LangCode, Array<{ q: string; a: string }>>
  relatedPages: ContentPageKey[]
  sections: Record<LangCode, Array<{ id: string; title: string; body: string[]; bullets?: string[] }>>
}

const pack: Record<LangCode, LangPack> = {
  ar: {
    solutionEyebrow: 'الحلول', trustEyebrow: 'الثقة والامتثال', platformEyebrow: 'المنصة', supportEyebrow: 'الدعم', executiveSummary: 'ملخص تنفيذي',
    directAnswerTitle: 'لمحة سريعة', problemsTitle: 'تحديات تشغيلية قائمة', solutionTitle: 'كيف يعالجها ديوان سويت', capabilitiesTitle: 'قدرات أساسية', workflowTitle: 'كيف يعمل المسار', governanceTitle: 'الأثر الحوكمي والرقابي', proofTitle: 'شواهد تشغيلية', outcomesTitle: 'مخرجات تنفيذية قابلة للقياس',
    definitionLead: 'يقدم ديوان سويت هذا المسار المؤسسي لربط الدعوة والاجتماع والمحضر والاعتماد والتنفيذ والتقارير داخل دورة حوكمة واحدة.',
    whatItSolvesLabel: ['تقليل التشتت بين الوثائق والاعتمادات', 'رفع المساءلة والشفافية', 'تسريع الوصول إلى سجلات القرار'],
    howItWorksLabel: ['تهيئة المسار والصلاحيات', 'إدارة الدعوات والمرفقات والمحاضر', 'تحويل المخرجات إلى متابعة وتقارير'],
    commonAudience: ['أمانة المجلس واللجان', 'الامتثال والمراجعة الداخلية', 'الإدارة التنفيذية ووحدات المتابعة'],
    commonOutcomes: ['لوحات تنفيذية للقيادات', 'تقارير حوكمة قابلة للتدقيق', 'تحسين جاهزية الامتثال والرقابة'],
    commonWorkflow: ['دعوة وجدول أعمال', 'حضور ونصاب واعتماد', 'قرارات ومهام وتقارير'],
    supportTitle: 'الدعم والتأهيل المؤسسي'
},
  en: {
    solutionEyebrow: 'Solutions', trustEyebrow: 'Trust & Compliance', platformEyebrow: 'Platform', supportEyebrow: 'Support', executiveSummary: 'Executive Summary',
    directAnswerTitle: 'Quick overview', problemsTitle: 'Current operational pain', solutionTitle: 'How Diwan Suite addresses it', capabilitiesTitle: 'Key capabilities', workflowTitle: 'How the workflow operates', governanceTitle: 'Governance, compliance, and audit impact', proofTitle: 'Operational proof points', outcomesTitle: 'Executive outcomes',
    definitionLead: 'Diwan Suite provides this institutional workflow to connect invitation, meeting, minutes, approval, execution, and reporting in one governance cycle.',
    whatItSolvesLabel: ['Reduces fragmentation between records and approvals', 'Strengthens accountability and transparency', 'Accelerates access to decision records'],
    howItWorksLabel: ['Configure workflow and permissions', 'Manage invitations, attachments, and minutes', 'Convert outputs into follow-up and reporting'],
    commonAudience: ['Board and committee secretariat', 'Compliance and internal audit', 'Executive management and follow-up teams'],
    commonOutcomes: ['Executive dashboards', 'Audit-ready governance reports', 'Stronger readiness for regulated environments'],
    commonWorkflow: ['Invitation and agenda', 'Attendance, quorum, and approval', 'Decisions, tasks, and reporting'],
    supportTitle: 'Institutional support and enablement'
},



  hi: {
    solutionEyebrow: 'समाधान', trustEyebrow: 'विश्वास और अनुपालन', platformEyebrow: 'प्लेटफ़ॉर्म', supportEyebrow: 'सहायता', executiveSummary: 'कार्यकारी सारांश',
    directAnswerTitle: 'त्वरित परिचय', problemsTitle: 'वर्तमान परिचालन चुनौतियाँ', solutionTitle: 'Diwan Suite कैसे समाधान देता है', capabilitiesTitle: 'मुख्य क्षमताएँ', workflowTitle: 'प्रक्रिया कैसे चलती है', governanceTitle: 'गवर्नेंस, अनुपालन और ऑडिट प्रभाव', proofTitle: 'प्रचालन प्रमाण', outcomesTitle: 'कार्यकारी परिणाम',
    definitionLead: 'Diwan Suite निमंत्रण, बैठक, मिनट्स, अनुमोदन, निष्पादन और रिपोर्टिंग को एक ही गवर्नेंस चक्र में जोड़ता है।',
    whatItSolvesLabel: ['दस्तावेज़ों और अनुमोदनों के बिखराव को कम करता है', 'जवाबदेही और पारदर्शिता को मजबूत करता है', 'निर्णय अभिलेखों तक पहुँच तेज करता है'],
    howItWorksLabel: ['वर्कफ़्लो और अनुमतियाँ कॉन्फ़िगर करें', 'निमंत्रण, संलग्नक और मिनट्स प्रबंधित करें', 'आउटपुट को फ़ॉलो-अप और रिपोर्टिंग में बदलें'],
    commonAudience: ['बोर्ड और समिति सचिवालय', 'अनुपालन और आंतरिक ऑडिट', 'कार्यकारी प्रबंधन और फ़ॉलो-अप टीम'],
    commonOutcomes: ['कार्यकारी डैशबोर्ड', 'ऑडिट-तैयार गवर्नेंस रिपोर्ट', 'नियमित क्षेत्रों के लिए अधिक तैयारी'],
    commonWorkflow: ['निमंत्रण और एजेंडा', 'उपस्थिति, कोरम और अनुमोदन', 'निर्णय, कार्य और रिपोर्टिंग'],
    supportTitle: 'संस्थागत समर्थन और सक्षम बनाना'
},
  ur: {
    solutionEyebrow: 'حلول', trustEyebrow: 'اعتماد اور تعمیل', platformEyebrow: 'پلیٹ فارم', supportEyebrow: 'سپورٹ', executiveSummary: 'ایگزیکٹو خلاصہ',
    directAnswerTitle: 'براہِ راست جواب', problemsTitle: 'موجودہ عملی مسائل', solutionTitle: 'Diwan Suite یہ مسئلہ کیسے حل کرتا ہے', capabilitiesTitle: 'اہم صلاحیتیں', workflowTitle: 'ورک فلو کیسے چلتا ہے', governanceTitle: 'گورننس، تعمیل اور آڈٹ اثرات', proofTitle: 'عملی شواہد', outcomesTitle: 'انتظامی نتائج',
    definitionLead: 'Diwan Suite دعوت، اجلاس، محضر، منظوری، عمل درآمد اور رپورٹنگ کو ایک ہی گورننس سائیکل میں جوڑتا ہے۔',
    whatItSolvesLabel: ['دستاویزات اور منظوریوں کے بکھراؤ کو کم کرتا ہے', 'جوابدہی اور شفافیت بڑھاتا ہے', 'فیصلہ جاتی ریکارڈ تک رسائی تیز کرتا ہے'],
    howItWorksLabel: ['ورک فلو اور اختیارات ترتیب دیں', 'دعوتیں، منسلکات اور محاضر منظم کریں', 'نتائج کو فالو اپ اور رپورٹنگ میں منتقل کریں'],
    commonAudience: ['بورڈ اور کمیٹی سیکرٹریٹ', 'تعمیل اور داخلی آڈٹ', 'انتظامی ٹیم اور فالو اپ یونٹس'],
    commonOutcomes: ['ایگزیکٹو ڈیش بورڈز', 'آڈٹ کے لیے تیار گورننس رپورٹس', 'ریگولیٹڈ شعبوں کے لیے بہتر تیاری'],
    commonWorkflow: ['دعوت اور ایجنڈا', 'حاضری، کورم اور منظوری', 'فیصلے، ذمہ داریاں اور رپورٹنگ'],
    supportTitle: 'ادارہ جاتی سپورٹ اور فعال سازی'
}
}

const commonScreensBullets: Record<LangCode, string[]> = {
  ar: ['لوحة حوكمة للمجلس واللجان', 'تتبع حضور ونصاب واعتماد', 'سجل قرارات ومحاضر قابل للبحث'],
  en: ['Board and committee governance dashboard', 'Attendance, quorum, and approval tracking', 'Searchable decisions and minutes archive'],



  hi: ['बोर्ड और समिति गवर्नेंस डैशबोर्ड', 'उपस्थिति, कोरम और अनुमोदन ट्रैकिंग', 'खोज योग्य निर्णय और मिनट्स अभिलेख'],
  ur: ['بورڈ اور کمیٹی گورننس ڈیش بورڈ', 'حاضری، کورم اور منظوری کی ٹریکنگ', 'قابلِ تلاش فیصلوں اور محاضر کا ریکارڈ']
}

const templates: PageTemplate[] = [
  {
    key: 'boardManagementSystem',
    eyebrowType: 'solution',
    titles: {
      ar: 'نظام إدارة مجالس الإدارة', en: 'Board Management System', hi: 'बोर्ड प्रबंधन प्रणाली', ur: 'بورڈ مینجمنٹ سسٹم'
},
    summaries: {
      ar: 'صفحة متخصصة تشرح كيف يدعم ديوان سويت الحوكمة الرقمية لمجالس الإدارة من التشكيل والدعوة وحتى اعتماد المحاضر ومتابعة التنفيذ والتقارير.',
      en: 'A focused page showing how Diwan Suite supports digital governance for boards of directors from structure and invitations to minutes approval, execution tracking, and reporting.',



      hi: 'यह पृष्ठ बताता है कि Diwan Suite बोर्ड गवर्नेंस को संरचना और आमंत्रण से लेकर मिनट्स अनुमोदन, निष्पादन ट्रैकिंग और रिपोर्टिंग तक कैसे समर्थन देता है।',
      ur: 'یہ صفحہ دکھاتا ہے کہ Diwan Suite بورڈ گورننس کو تشکیل، دعوت، محضر کی منظوری، عمل درآمد اور رپورٹنگ تک کیسے سپورٹ کرتا ہے۔'
},
    seoTitles: {
      ar: 'نظام إدارة مجالس الإدارة | ديوان سويت', en: 'Board Management System | Diwan Suite', hi: 'बोर्ड प्रबंधन प्रणाली | Diwan Suite', ur: 'بورڈ مینجمنٹ سسٹم | Diwan Suite'
},
    seoDescriptions: {
      ar: 'نظام إدارة مجالس الإدارة من ديوان سويت لإدارة دورة الاجتماع والمحاضر والاعتماد ومتابعة القرارات والتقارير الحوكمية في بيئة موثقة وقابلة للتدقيق.',
      en: 'Diwan Suite board management system for meeting lifecycle, minutes approval, decision tracking, and governance reporting in an auditable environment.',



      hi: 'Diwan Suite बोर्ड प्रबंधन प्रणाली मीटिंग लाइफसाइकिल, मिनट्स अनुमोदन, निर्णय ट्रैकिंग और गवर्नेंस रिपोर्टिंग के लिए।',
      ur: 'Diwan Suite بورڈ مینجمنٹ سسٹم اجلاس کے مکمل سائیکل، محاضر کی منظوری، فیصلہ ٹریکنگ اور گورننس رپورٹنگ کے لیے۔'
},
    definitions: {
      ar: 'نظام إدارة مجالس الإدارة هو مسار رقمي يربط تشكيل المجلس، الدعوات، جدول الأعمال، الحضور، المحاضر، الاعتمادات، القرارات، والتنفيذ في سجل موحد.',
      en: 'A board management system is a digital governance workflow that connects board structure, invitations, agendas, attendance, minutes, approvals, decisions, and execution in one record.',



      hi: 'बोर्ड प्रबंधन प्रणाली एक डिजिटल गवर्नेंस वर्कफ़्लो है जो बोर्ड संरचना, आमंत्रण, एजेंडा, उपस्थिति, मिनट्स, अनुमोदन, निर्णय और निष्पादन को एक रिकॉर्ड में जोड़ती है।',
      ur: 'بورڈ مینجمنٹ سسٹم ایک ڈیجیٹل گورننس ورک فلو ہے جو بورڈ کی تشکیل، دعوت، ایجنڈا، حاضری، محاضر، منظوری، فیصلے اور عمل درآمد کو ایک ہی ریکارڈ میں جوڑتا ہے۔'
},
    faq: {
      ar: [
        { q: 'هل يدعم النظام تشكيل المجلس والعضويات؟', a: 'نعم، يدعم تسجيل هياكل المجلس والعضويات والأدوار وسريان الفترات بصورة منظمة.' },
        { q: 'هل يدعم محاضر مجلس الإدارة؟', a: 'نعم، يدعم إعداد المحاضر ومراجعتها واعتمادها وربطها بالقرارات والمرفقات.' },
        { q: 'كيف تتم متابعة القرارات؟', a: 'تتحول القرارات إلى عناصر متابعة قابلة للإسناد والقياس مع حالة تنفيذ وتقارير.' },
        { q: 'هل توجد صلاحيات دقيقة؟', a: 'نعم، يمكن ضبط الصلاحيات بحسب الدور واللجنة ونوع المحتوى المطلوب الوصول إليه.' },
        { q: 'هل يدعم الاجتماعات الحضورية والافتراضية والهجينة؟', a: 'نعم، يدعم تنظيم المسار التشغيلي للاجتماعات الحضورية والافتراضية والهجينة.' },
        { q: 'هل توجد تقارير للحوكمة والامتثال؟', a: 'نعم، توفر المنصة تقارير حوكمة ولوحات متابعة وسجل تدقيق يساعد على الامتثال.' },
      ],
      en: [
        { q: 'Does the system support board structure and memberships?', a: 'Yes. It supports board composition, membership terms, roles, and governance records in a controlled way.' },
        { q: 'Does it support board minutes?', a: 'Yes. Minutes can be drafted, reviewed, approved, and linked to decisions and attachments.' },
        { q: 'How are decisions tracked?', a: 'Decisions become accountable follow-up items with owners, status, and reporting visibility.' },
        { q: 'Are granular permissions available?', a: 'Yes. Access can be controlled by role, committee, and content sensitivity.' },
        { q: 'Does it support in-person, virtual, and hybrid meetings?', a: 'Yes. The workflow can support all three operating modes.' },
        { q: 'Are governance and compliance reports available?', a: 'Yes. The platform provides reporting and auditability for governance oversight.' },
      ],



      hi: [
        { q: 'क्या सिस्टम बोर्ड संरचना और सदस्यताओं का समर्थन करता है?', a: 'हाँ। यह बोर्ड संरचना, सदस्य अवधि, भूमिकाओं और गवर्नेंस रिकॉर्ड का समर्थन करता है।' },
        { q: 'क्या यह बोर्ड मिनट्स का समर्थन करता है?', a: 'हाँ। मिनट्स तैयार, समीक्षा, अनुमोदित और निर्णयों से जोड़े जा सकते हैं।' },
        { q: 'निर्णयों को कैसे ट्रैक किया जाता है?', a: 'निर्णय जिम्मेदार कार्यों में बदल जाते हैं जिनमें मालिक, स्थिति और रिपोर्टिंग शामिल होती है।' },
        { q: 'क्या सूक्ष्म अनुमतियाँ उपलब्ध हैं?', a: 'हाँ। भूमिका, समिति और सामग्री के आधार पर एक्सेस नियंत्रित किया जा सकता है।' },
        { q: 'क्या यह भौतिक, वर्चुअल और हाइब्रिड बैठकों का समर्थन करता है?', a: 'हाँ। कार्यप्रवाह तीनों मोड को संभाल सकता है।' },
        { q: 'क्या गवर्नेंस और अनुपालन रिपोर्ट उपलब्ध हैं?', a: 'हाँ। प्लेटफ़ॉर्म ऑडिट-तैयार गवर्नेंस रिपोर्ट प्रदान करता है।' },
      ],
      ur: [
        { q: 'کیا نظام بورڈ کی تشکیل اور ممبرشپ کو سپورٹ کرتا ہے؟', a: 'جی ہاں، بورڈ کی ساخت، رکنیت کی مدت، کردار اور ریکارڈ منظم طریقے سے سنبھالے جا سکتے ہیں۔' },
        { q: 'کیا یہ بورڈ کے محاضر کو سپورٹ کرتا ہے؟', a: 'جی ہاں، محاضر تیار، جائزہ، منظور اور فیصلوں سے منسلک کیے جا سکتے ہیں۔' },
        { q: 'فیصلوں کی فالو اپ کیسے ہوتی ہے؟', a: 'فیصلے ذمہ دارانہ کارروائیوں میں بدل جاتے ہیں جن کے مالک، اسٹیٹس اور رپورٹنگ واضح ہوتی ہے۔' },
        { q: 'کیا باریک سطح کی اجازتیں موجود ہیں؟', a: 'جی ہاں، کردار، کمیٹی اور مواد کے مطابق رسائی کنٹرول کی جا سکتی ہے۔' },
        { q: 'کیا حضوری، ورچوئل اور ہائبرڈ اجلاس سپورٹ ہوتے ہیں؟', a: 'جی ہاں، نظام تینوں طریقوں کے لیے موزوں ہے۔' },
        { q: 'کیا گورننس اور تعمیل کی رپورٹس موجود ہیں؟', a: 'جی ہاں، پلیٹ فارم گورننس نگرانی کے لیے رپورٹنگ اور آڈٹ قابلیت فراہم کرتا ہے۔' },
      ]
},
    relatedPages: ['committeeManagementSoftware', 'corporateSecretarySystem', 'governanceReports'],
    sections: {} as any
},
  {
    key: 'committeeManagementSoftware', eyebrowType: 'solution',
    titles: { ar: 'برنامج إدارة اللجان', en: 'Committee Management Software', hi: 'समिति प्रबंधन सॉफ़्टवेयर', ur: 'کمیٹی مینجمنٹ سافٹ ویئر'},
    summaries: { ar: 'صفحة متخصصة لإدارة حوكمة اللجان وتوثيق اجتماعاتها وقراراتها ومتابعة أدائها ضمن إطار مؤسسي واضح.', en: 'A dedicated page for committee governance, meeting control, decision accountability, and performance follow-up within a structured institutional model.', hi: 'समिति गवर्नेंस, बैठकों, निर्णय जवाबदेही और प्रदर्शन अनुवर्ती के लिए समर्पित पृष्ठ।', ur: 'کمیٹی گورننس، اجلاس، فیصلوں کی جوابدہی اور کارکردگی کی فالو اپ کے لیے مخصوص صفحہ۔'},
    seoTitles: { ar: 'برنامج إدارة اللجان | ديوان سويت', en: 'Committee Management Software | Diwan Suite', hi: 'समिति प्रबंधन सॉफ़्टवेयर | Diwan Suite', ur: 'کمیٹی مینجمنٹ سافٹ ویئر | Diwan Suite'},
    seoDescriptions: { ar: 'برنامج إدارة اللجان من ديوان سويت لتنظيم تشكيل اللجان، الاجتماعات، القرارات، المتابعة، والتقارير ضمن بيئة حوكمة موثقة.', en: 'Diwan Suite committee management software for committee formation, meetings, decisions, follow-up, and governance reporting.', hi: 'Diwan Suite समिति प्रबंधन सॉफ़्टवेयर समिति संरचना, बैठकें, निर्णय, अनुवर्ती और रिपोर्टिंग के लिए।', ur: 'Diwan Suite کمیٹی مینجمنٹ سافٹ ویئر کمیٹی ساخت، اجلاس، فیصلے، فالو اپ اور گورننس رپورٹنگ کے لیے۔'},
    definitions: { ar: 'برنامج إدارة اللجان هو مسار رقمي يضبط تشكيل اللجان، الأدوار، مدد العضوية، الاجتماعات، القرارات، ومؤشرات الأداء في سجل موحد.', en: 'Committee management software is a digital workflow for committee structure, roles, membership terms, meetings, decisions, and performance signals in one record.', hi: 'समिति प्रबंधन सॉफ़्टवेयर समिति संरचना, भूमिकाएँ, सदस्य अवधि, बैठकें, निर्णय और प्रदर्शन संकेतकों को एक रिकॉर्ड में जोड़ता है।', ur: 'کمیٹی مینجمنٹ سافٹ ویئر ایک ڈیجیٹل ورک فلو ہے جو کمیٹی کی ساخت، کردار، مدت، اجلاس، فیصلے اور کارکردگی کو ایک ریکارڈ میں رکھتا ہے۔'},
    faq: { ar:[{q:'هل يدعم لجان المراجعة ولجان الترشيحات وغيرها؟',a:'نعم، يمكن تهيئة أنواع مختلفة من اللجان مع أدوار وصلاحيات مستقلة.'},{q:'هل يمكن تحديد مدة العضوية؟',a:'نعم، يمكن تتبع مدة العضوية والتشكيل والدورات المرتبطة بها.'},{q:'هل يمكن ربط قرارات اللجنة بالتنفيذ؟',a:'نعم، ترتبط القرارات بمهام متابعة ومسؤوليات واضحة.'},{q:'هل توجد تقارير أداء للجان؟',a:'نعم، يمكن إظهار مؤشرات نشاط اللجان والتأخر والتنفيذ.'}], en:[{q:'Does it support audit, nomination, and other committees?',a:'Yes. Different committee types can be configured with distinct roles and permissions.'},{q:'Can membership terms be tracked?',a:'Yes. Membership periods, composition, and changes can be monitored.'},{q:'Can committee decisions be linked to execution?',a:'Yes. Decisions can be linked to accountable follow-up actions.'},{q:'Are committee performance reports available?',a:'Yes. Activity, delay, and execution indicators can be reported.'}], hi:[{q:'क्या यह ऑडिट, नामांकन और अन्य समितियों का समर्थन करता है?',a:'हाँ। विभिन्न समिति प्रकार अलग भूमिकाओं और अनुमतियों के साथ कॉन्फ़िगर किए जा सकते हैं।'},{q:'क्या सदस्यता अवधि ट्रैक की जा सकती है?',a:'हाँ। सदस्यता अवधि, संरचना और परिवर्तनों को ट्रैक किया जा सकता है।'},{q:'क्या समिति के निर्णय निष्पादन से जोड़े जा सकते हैं?',a:'हाँ। निर्णय जिम्मेदार फॉलो-अप कार्यों से जोड़े जा सकते हैं।'},{q:'क्या समिति प्रदर्शन रिपोर्ट उपलब्ध हैं?',a:'हाँ। गतिविधि, देरी और निष्पादन संकेतक रिपोर्ट किए जा सकते हैं।'}], ur:[{q:'کیا یہ آڈٹ، نامزدگی اور دیگر کمیٹیوں کو سپورٹ کرتا ہے؟',a:'جی ہاں، مختلف کمیٹی اقسام کو الگ کرداروں اور اجازتوں کے ساتھ ترتیب دیا جا سکتا ہے۔'},{q:'کیا رکنیت کی مدت ٹریک کی جا سکتی ہے؟',a:'جی ہاں، رکنیت کی مدت اور تبدیلیاں ٹریک کی جا سکتی ہیں۔'},{q:'کیا کمیٹی کے فیصلے عمل درآمد سے جوڑے جا سکتے ہیں؟',a:'جی ہاں، فیصلوں کو واضح ذمہ داری کے ساتھ فالو اپ اقدامات سے جوڑا جا سکتا ہے۔'},{q:'کیا کمیٹی کارکردگی رپورٹس موجود ہیں؟',a:'جی ہاں، سرگرمی، تاخیر اور عمل درآمد کے اشاریے رپورٹ کیے جا سکتے ہیں۔'}]},
    relatedPages:['boardManagementSystem','corporateSecretarySystem','securityCompliance'], sections:{} as any
},
  {
    key:'generalAssemblyManagement', eyebrowType:'solution',
    titles:{ ar:'إدارة الجمعيات العمومية', en:'General Assembly Management', hi:'सामान्य सभा प्रबंधन', ur:'جنرل اسمبلی مینجمنٹ'},
    summaries:{ ar:'صفحة مخصصة لإدارة الجمعيات العمومية رقمياً بما يشمل الدعوات والنصاب والتصويت والمحضر والاعتماد والأرشفة.', en:'A dedicated page for managing general assemblies digitally with invitations, quorum, voting, minutes, approval, and archival control.', hi:'आम सभाओं के डिजिटल प्रबंधन के लिए समर्पित पृष्ठ, जिसमें आमंत्रण, कोरम, मतदान, मिनट्स, अनुमोदन और अभिलेख शामिल हैं।', ur:'جنرل اسمبلی کے ڈیجیٹل انتظام کے لیے مخصوص صفحہ، جس میں دعوت، کورم، ووٹنگ، محضر، منظوری اور آرکائیو شامل ہیں۔'},
    seoTitles:{ ar:'إدارة الجمعيات العمومية | ديوان سويت', en:'General Assembly Management | Diwan Suite', hi:'सामान्य सभा प्रबंधन | Diwan Suite', ur:'جنرل اسمبلی مینجمنٹ | Diwan Suite'},
    seoDescriptions:{ ar:'إدارة الجمعيات العمومية من ديوان سويت لتنظيم الدعوات والنصاب والتصويت والمحاضر والاعتماد والأرشفة ضمن بيئة امتثال موثقة.', en:'Diwan Suite general assembly management for invitations, quorum, voting, minutes, approvals, and archival compliance.', hi:'Diwan Suite सामान्य सभा प्रबंधन आमंत्रण, कोरम, मतदान, मिनट्स, अनुमोदन और अभिलेख अनुपालन के लिए।', ur:'Diwan Suite جنرل اسمبلی مینجمنٹ دعوت، کورم، ووٹنگ، محاضر، منظوری اور آرکائیو تعمیل کے لیے۔'},
    definitions:{ ar:'إدارة الجمعيات العمومية هي مسار رقمي يضبط الدعوات، الحضور، النصاب، التصويت، المحضر، والاعتماد في سجل موحد قابل للتدقيق.', en:'General assembly management is a digital workflow for invitations, attendance, quorum, voting, minutes, and approval in one auditable record.', hi:'सामान्य सभा प्रबंधन एक डिजिटल वर्कफ़्लो है जो आमंत्रण, उपस्थिति, कोरम, मतदान, मिनट्स और अनुमोदन को एक ऑडिट योग्य रिकॉर्ड में जोड़ता है।', ur:'جنرل اسمبلی مینجمنٹ ایک ڈیجیٹل ورک فلو ہے جو دعوت، حاضری، کورم، ووٹنگ، محاضر اور منظوری کو ایک آڈٹ کے قابل ریکارڈ میں جوڑتا ہے۔'},
    faq:{ ar:[{q:'هل يدعم النصاب والتصويت؟',a:'نعم، يمكن توثيق النصاب والحضور وآليات إبداء الرأي أو التصويت ضمن السجل المؤسسي.'},{q:'هل يمكن إدارة محضر الجمعية؟',a:'نعم، يمكن إعداد محضر الجمعية واعتماده وربطه بالمرفقات والقرارات.'},{q:'هل يمكن الاحتفاظ بسجل تدقيق؟',a:'نعم، يحتفظ النظام بسجل زمني للتغييرات والاعتمادات والأنشطة.'},{q:'هل يدعم الاجتماعات المختلطة؟',a:'نعم، يمكن استخدامه مع الاجتماعات الحضورية أو الافتراضية أو المختلطة.'}], en:[{q:'Does it support quorum and voting?',a:'Yes. Quorum, attendance, and controlled voting or opinion collection can be recorded.'},{q:'Can the assembly minutes be managed?',a:'Yes. Minutes can be prepared, approved, and linked to attachments and decisions.'},{q:'Can an audit trail be retained?',a:'Yes. The system preserves timestamps and activity history for review.'},{q:'Does it support hybrid meetings?',a:'Yes. It can support in-person, virtual, and hybrid assembly operations.'}], hi:[{q:'क्या यह कोरम और मतदान का समर्थन करता है?',a:'हाँ। कोरम, उपस्थिति और नियंत्रित मतदान/मत संग्रह रिकॉर्ड किया जा सकता है।'},{q:'क्या सामान्य सभा के मिनट्स प्रबंधित किए जा सकते हैं?',a:'हाँ। मिनट्स तैयार, अनुमोदित और संलग्नकों से जोड़े जा सकते हैं।'},{q:'क्या ऑडिट ट्रेल रखा जा सकता है?',a:'हाँ। सिस्टम टाइमस्टैम्प और गतिविधि इतिहास संरक्षित करता है।'},{q:'क्या यह हाइब्रिड बैठकों का समर्थन करता है?',a:'हाँ। भौतिक, वर्चुअल और हाइब्रिड संचालन को समर्थन मिलता है।'}], ur:[{q:'کیا یہ کورم اور ووٹنگ کو سپورٹ کرتا ہے؟',a:'جی ہاں، کورم، حاضری اور کنٹرولڈ ووٹنگ یا رائے جمع آوری کو ریکارڈ کیا جا سکتا ہے۔'},{q:'کیا اسمبلی کے محاضر کو منظم کیا جا سکتا ہے؟',a:'جی ہاں، محاضر تیار، منظور اور منسلکات سے جوڑے جا سکتے ہیں۔'},{q:'کیا آڈٹ ٹریل محفوظ کی جا سکتی ہے؟',a:'جی ہاں، نظام ٹائم اسٹیمپس اور سرگرمیوں کی ہسٹری محفوظ رکھتا ہے۔'},{q:'کیا یہ ہائبرڈ اجلاس کو سپورٹ کرتا ہے؟',a:'جی ہاں، حضوری، ورچوئل اور ہائبرڈ فارمیٹس کے لیے موزوں ہے۔'}]},
    relatedPages:['boardManagementSystem','meetingMinutesEsignature','support'], sections:{} as any
},
  {
    key:'corporateSecretarySystem', eyebrowType:'solution', titles:{ ar:'نظام أمين سر مجلس الإدارة', en:'Board Secretary System', hi:'बोर्ड सचिव प्रणाली', ur:'بورڈ سیکرٹری سسٹم'},
    summaries:{ ar:'صفحة تركّز على احتياجات أمين سر مجلس الإدارة في إعداد جدول الأعمال وتجميع المرفقات ومسارات الاعتماد والأرشفة السريعة.', en:'A page focused on the board secretary office: agenda preparation, attachment control, approval routing, and fast retrieval.', hi:'बोर्ड सचिव कार्यालय की आवश्यकताओं पर केंद्रित पृष्ठ: एजेंडा तैयारी, संलग्नक प्रबंधन, अनुमोदन मार्ग और त्वरित खोज।', ur:'بورڈ سیکرٹری کے عملی تقاضوں کے لیے مخصوص صفحہ: ایجنڈا تیاری، منسلکات، منظوری کا راستہ اور تیز بازیافت۔'},
    seoTitles:{ ar:'نظام أمين سر مجلس الإدارة | ديوان سويت', en:'Board Secretary System | Diwan Suite', hi:'बोर्ड सचिव प्रणाली | Diwan Suite', ur:'بورڈ سیکرٹری سسٹم | Diwan Suite'},
    seoDescriptions:{ ar:'نظام أمين سر مجلس الإدارة من ديوان سويت لإعداد جدول الأعمال وتجميع المرفقات ومسارات الاعتماد والتوقيع الإلكتروني والأرشفة والاسترجاع.', en:'Diwan Suite board secretary system for agenda preparation, attachment consolidation, approval routing, e-signature, and archive retrieval.', hi:'Diwan Suite बोर्ड सचिव प्रणाली एजेंडा तैयारी, संलग्नक समेकन, अनुमोदन, ई-हस्ताक्षर और अभिलेख खोज के लिए।', ur:'Diwan Suite بورڈ سیکرٹری سسٹم ایجنڈا تیاری، منسلکات، منظوری، ای-سگنیچر اور آرکائیو بازیافت کے لیے۔'},
    definitions:{ ar:'نظام أمين سر مجلس الإدارة هو مسار تشغيلي يمكّن أمانة المجلس من ضبط جدول الأعمال والمرفقات والمحاضر والاعتمادات والاسترجاع في بيئة واحدة.', en:'A board secretary system is an operational workflow for agenda preparation, attachment control, minutes handling, approval routing, and retrieval in one environment.', hi:'बोर्ड सचिव प्रणाली एजेंडा, संलग्नक, मिनट्स, अनुमोदन और खोज को एक ही कार्यप्रवाह में व्यवस्थित करती है।', ur:'بورڈ سیکرٹری سسٹم ایک ہی ماحول میں ایجنڈا، منسلکات، محاضر، منظوری اور بازیافت کو منظم کرتا ہے۔'},
    faq:{ ar:[{q:'هل يساعد أمين السر في تجهيز جدول الأعمال؟',a:'نعم، يدعم إعداد جدول الأعمال وربطه بالدعوات والمرفقات.'},{q:'هل يجمع المرفقات والوثائق؟',a:'نعم، يدعم جمع الوثائق وتنظيمها ضمن الاجتماع واللجنة المعنية.'},{q:'هل يدعم مسارات الاعتماد؟',a:'نعم، يمكن ضبط مسارات اعتماد للمحاضر والوثائق وفق الصلاحيات.'},{q:'هل يدعم الاسترجاع السريع للمحاضر والقرارات؟',a:'نعم، يدعم البحث والاسترجاع المنظم بحسب الاجتماع أو القرار أو التاريخ.'}], en:[{q:'Does it help the board secretary prepare agendas?',a:'Yes. Agendas can be prepared and linked to invitations and attachments.'},{q:'Does it consolidate attachments and records?',a:'Yes. Documents can be gathered and structured by meeting and committee.'},{q:'Does it support approval workflows?',a:'Yes. Approval routes can be configured for minutes and board records.'},{q:'Does it support fast retrieval of minutes and decisions?',a:'Yes. Search and retrieval can be done by meeting, decision, member, or date.'}], hi:[{q:'क्या यह बोर्ड सचिव को एजेंडा तैयार करने में मदद करता है?',a:'हाँ। एजेंडा तैयार कर आमंत्रण और संलग्नकों से जोड़ा जा सकता है।'},{q:'क्या यह संलग्नक और दस्तावेज़ समेकित करता है?',a:'हाँ। दस्तावेज़ों को बैठक और समिति के अनुसार व्यवस्थित किया जा सकता है।'},{q:'क्या यह अनुमोदन वर्कफ़्लो का समर्थन करता है?',a:'हाँ। मिनट्स और दस्तावेज़ों के लिए अनुमोदन मार्ग सेट किए जा सकते हैं।'},{q:'क्या मिनट्स और निर्णयों की त्वरित खोज संभव है?',a:'हाँ। बैठक, निर्णय, सदस्य या तिथि से खोज की जा सकती है।'}], ur:[{q:'کیا یہ بورڈ سیکرٹری کو ایجنڈا تیار کرنے میں مدد دیتا ہے؟',a:'جی ہاں، ایجنڈا تیار کر کے دعوت اور منسلکات سے جوڑا جا سکتا ہے۔'},{q:'کیا یہ منسلکات اور دستاویزات جمع کرتا ہے؟',a:'جی ہاں، دستاویزات کو اجلاس اور کمیٹی کے مطابق منظم کیا جا سکتا ہے۔'},{q:'کیا یہ منظوری کے ورک فلو کو سپورٹ کرتا ہے؟',a:'جی ہاں، محاضر اور دستاویزات کے لیے منظوری کے راستے طے کیے جا سکتے ہیں۔'},{q:'کیا محاضر اور فیصلوں کی تیز تلاش ممکن ہے؟',a:'جی ہاں، اجلاس، فیصلہ، رکن یا تاریخ کے مطابق تلاش ممکن ہے۔'}]},
    relatedPages:['boardManagementSystem','meetingMinutesEsignature','decisionTracking'], sections:{} as any
},
  {
    key:'meetingMinutesEsignature', eyebrowType:'solution', titles:{ ar:'محاضر الاجتماعات والتوقيع الإلكتروني', en:'Meeting Minutes & E-Signature', hi:'मीटिंग मिनट्स और ई-हस्ताक्षर', ur:'اجلاس کے محاضر اور ای-سگنیچر'},
    summaries:{ ar:'صفحة مخصصة لإدارة المحاضر إلكترونياً ضمن مسار اعتماد مضبوط يتضمن القوالب، المراجعة، الختم الزمني، التوقيع، وسجل التدقيق.', en:'A dedicated page for digital minutes management with templates, controlled approval, timestamping, e-signature, and audit trail.', hi:'डिजिटल मिनट्स प्रबंधन के लिए समर्पित पृष्ठ जिसमें टेम्पलेट, अनुमोदन, टाइमस्टैम्प, ई-हस्ताक्षर और ऑडिट ट्रेल शामिल हैं।', ur:'ڈیجیٹل محاضر کے نظم کے لیے مخصوص صفحہ جس میں ٹیمپلیٹس، منظوری، ٹائم اسٹیمپ، ای-سگنیچر اور آڈٹ ٹریل شامل ہیں۔'},
    seoTitles:{ ar:'محاضر الاجتماعات والتوقيع الإلكتروني | ديوان سويت', en:'Meeting Minutes & E-Signature | Diwan Suite', hi:'मीटिंग मिनट्स और ई-हस्ताक्षर | Diwan Suite', ur:'اجلاس کے محاضر اور ای-سگنیچر | Diwan Suite'},
    seoDescriptions:{ ar:'محاضر الاجتماعات والتوقيع الإلكتروني من ديوان سويت لإعداد المحاضر، اعتمادها إلكترونياً، حفظ الختم الزمني، ومنع التعديل بعد الاعتماد.', en:'Diwan Suite meeting minutes and e-signature workflow for controlled drafting, approval, timestamping, and non-editable final records.', hi:'Diwan Suite मिनट्स और ई-हस्ताक्षर कार्यप्रवाह नियंत्रित ड्राफ्टिंग, अनुमोदन, टाइमस्टैम्प और अंतिम लॉकिंग के लिए।', ur:'Diwan Suite محاضر اور ای-سگنیچر ورک فلو کنٹرولڈ ڈرافٹنگ، منظوری، ٹائم اسٹیمپ اور حتمی لاکنگ کے لیے۔'},
    definitions:{ ar:'محاضر الاجتماعات والتوقيع الإلكتروني هو مسار رقمي لإعداد المحضر بصيغة منضبطة، إرساله للاعتماد، ختمه زمنياً، وتوثيق من اعتمد ومتى.', en:'Meeting minutes and e-signature is a digital workflow to prepare formal minutes, route them for approval, timestamp them, and record who approved and when.', hi:'मीटिंग मिनट्स और ई-हस्ताक्षर एक डिजिटल कार्यप्रवाह है जो औपचारिक मिनट्स तैयार करता है, अनुमोदन भेजता है, टाइमस्टैम्प जोड़ता है और अनुमोदन रिकॉर्ड करता है।', ur:'اجلاس کے محاضر اور ای-سگنیچر ایک ڈیجیٹل ورک فلو ہے جو رسمی محضر تیار کرتا، منظوری کے لیے بھیجتا، ٹائم اسٹیمپ دیتا اور منظوری کا ریکارڈ رکھتا ہے۔'},
    faq:{ ar:[{q:'هل يمنع التعديل بعد الاعتماد؟',a:'يمكن ضبط المسار بحيث تحفظ النسخة النهائية بعد الاعتماد بصورة محكومة وتاريخية.'},{q:'هل يوجد ختم زمني؟',a:'نعم، يمكن الاحتفاظ بالطابع الزمني المرتبط بعمليات الاعتماد.'},{q:'هل يوجد سجل تدقيق؟',a:'نعم، يدعم النظام سجل نشاط واعتماد يساعد في المراجعة والامتثال.'},{q:'هل يمكن البحث بالمحضر أو القرار أو العضو أو التاريخ؟',a:'نعم، يدعم الاسترجاع المنظم وفق عناصر متعددة.'}], en:[{q:'Does it prevent edits after approval?',a:'The workflow can preserve the final approved version in a controlled, historical state.'},{q:'Is timestamping available?',a:'Yes. Approval-related timestamps can be retained for record integrity.'},{q:'Is there an audit trail?',a:'Yes. Activity and approval logs support review and compliance.'},{q:'Can users search by minutes, decision, member, or date?',a:'Yes. Retrieval supports multiple structured search dimensions.'}], hi:[{q:'क्या अनुमोदन के बाद संपादन रोका जा सकता है?',a:'वर्कफ़्लो अंतिम स्वीकृत संस्करण को नियंत्रित ऐतिहासिक स्थिति में रख सकता है।'},{q:'क्या टाइमस्टैम्प उपलब्ध है?',a:'हाँ। अनुमोदन से जुड़े टाइमस्टैम्प सुरक्षित रखे जा सकते हैं।'},{q:'क्या ऑडिट ट्रेल है?',a:'हाँ। गतिविधि और अनुमोदन लॉग समीक्षा और अनुपालन में मदद करते हैं।'},{q:'क्या मिनट्स, निर्णय, सदस्य या तिथि से खोज संभव है?',a:'हाँ। कई संरचित खोज आयाम उपलब्ध हैं।'}], ur:[{q:'کیا منظوری کے بعد ترمیم روکی جا سکتی ہے؟',a:'ورک فلو حتمی منظور شدہ ورژن کو کنٹرولڈ تاریخی حالت میں محفوظ رکھ سکتا ہے۔'},{q:'کیا ٹائم اسٹیمپ موجود ہے؟',a:'جی ہاں، منظوری سے متعلق ٹائم اسٹیمپس محفوظ رکھے جا سکتے ہیں۔'},{q:'کیا آڈٹ ٹریل ہے؟',a:'جی ہاں، سرگرمی اور منظوری کے لاگز جائزہ اور تعمیل میں مدد دیتے ہیں۔'},{q:'کیا محضر، فیصلہ، رکن یا تاریخ سے تلاش ممکن ہے؟',a:'جی ہاں، متعدد ساختہ سرچ جہات موجود ہیں۔'}]},
    relatedPages:['corporateSecretarySystem','decisionTracking','securityCompliance'], sections:{} as any
},
]


function makeGenericPageCopy(lang: LangCode, title: string, eyebrow: string): InternalPageCopy {
  const p = pack[lang]
  const summaryLead = {
    ar: 'يوضح هذا المسار المؤسسي كيف يدعم ديوان سويت الحوكمة الرقمية والاعتماد والمتابعة والتقارير ضمن سجل موحد قابل للتدقيق.',
    en: 'This institutional page explains how Diwan Suite supports digital governance, approvals, follow-up, and reporting in one auditable record.',



    hi: 'यह पृष्ठ बताता है कि Diwan Suite डिजिटल गवर्नेंस, अनुमोदन, फॉलो-अप और रिपोर्टिंग को एक ऑडिट योग्य रिकॉर्ड में कैसे जोड़ता है।',
    ur: 'یہ صفحہ واضح کرتا ہے کہ Diwan Suite ڈیجیٹل گورننس، منظوری، فالو اپ اور رپورٹنگ کو ایک آڈٹ قابل ریکارڈ میں کیسے جوڑتا ہے۔'
}[lang]

  const descriptionLead = {
    ar: `صفحة ${title} في ديوان سويت لشرح المتطلبات التشغيلية، ومسار الموافقات، والمتابعة، والتقارير، والجاهزية الرقابية بطريقة عملية وقابلة للتطبيق.`,
    en: `${title} page in Diwan Suite covering operational requirements, approval workflows, follow-up, reporting, and audit readiness in a practical model.`,



    hi: `Diwan Suite में ${title} पृष्ठ, जो परिचालन आवश्यकताओं, अनुमोदन वर्कफ़्लो, फॉलो-अप, रिपोर्टिंग और ऑडिट तैयारी को समझाता है।`,
    ur: `Diwan Suite میں ${title} صفحہ آپریشنل تقاضوں، منظوری کے ورک فلو، فالو اپ، رپورٹنگ اور آڈٹ تیاری کی وضاحت کرتا ہے۔`
}[lang]

  const genericFaq = {
    ar: [
      { q: `ما الذي يقدمه ${title} داخل ديوان سويت؟`, a: 'يوفر مساراً موحداً لإدارة المستندات والاعتمادات والمتابعة والتقارير ضمن سجل حوكمي منظم.' },
      { q: 'هل يدعم الصلاحيات وسجل التدقيق؟', a: 'نعم، يدعم صلاحيات منظمة وسجلاً تدقيقياً يساعد على الامتثال والمراجعة.' },
      { q: 'هل يمكن ربط المخرجات بالتنفيذ والتقارير؟', a: 'نعم، يمكن ربط القرارات أو المخرجات بمتابعة عملية وتقارير تنفيذية.' },
    ],
    en: [
      { q: `What does ${title} provide inside Diwan Suite?`, a: 'It provides a unified workflow for records, approvals, follow-up, and reporting in a controlled governance trail.' },
      { q: 'Does it support permissions and audit trails?', a: 'Yes. The workflow supports controlled permissions and auditable activity records.' },
      { q: 'Can outputs be linked to execution and reporting?', a: 'Yes. Decisions and outputs can be linked to operational follow-up and executive reporting.' },
    ]
} as const

  return {
    eyebrow,
    title,
    summary: `${title} — ${summaryLead}`,
    seoTitle: `${title} | Diwan Suite`,
    seoDescription: descriptionLead,
    executiveSummary: p.executiveSummary,
    definition: `${title}: ${p.definitionLead}`,
    whoFor: p.commonAudience,
    whatItSolves: p.whatItSolvesLabel,
    howItWorks: p.howItWorksLabel,
    faq: [...(genericFaq[lang as 'ar' | 'en'] ?? [])],
    relatedPages: ['boardManagementSystem', 'securityCompliance', 'support'],
    sections: [
      { id: 'problems', title: p.problemsTitle, body: [summaryLead], bullets: p.whatItSolvesLabel },
      { id: 'solution-overview', title: p.solutionTitle, body: [p.definitionLead] },
      { id: 'key-capabilities', title: p.capabilitiesTitle, body: [], bullets: p.whatItSolvesLabel },
      { id: 'workflow', title: p.workflowTitle, body: [], bullets: p.commonWorkflow },
      { id: 'executive-outcomes', title: p.outcomesTitle, body: p.commonOutcomes },
    ]
}
}

const qualityOverrides: Partial<Record<LangCode, Partial<Record<ContentPageKey, Partial<InternalPageCopy>>>>> = {
  ar: {
    boardManagementSystem: {
      summary: 'نظام إدارة مجالس الإدارة في ديوان سويت يضبط دورة المجلس كاملة في بيئة واحدة: من تشكيل المجلس والدعوة للاجتماعات إلى المحاضر والاعتماد والتوقيع الإلكتروني، ثم تحويل القرارات إلى مهام قابلة للتنفيذ والمتابعة والقياس.',
      seoTitle: 'نظام إدارة مجالس الإدارة | ديوان سويت',
      seoDescription: 'نظام إدارة مجالس الإدارة من ديوان سويت يربط تشكيل المجلس، جدول الأعمال، الحضور والنصاب، المحاضر، الاعتماد، القرارات، المتابعة، والتقارير في مسار حوكمة موثق وقابل للتدقيق.',
      definition: 'إذا كانت الجهة تحتاج إلى نظام يُخرج مجلس الإدارة من الإدارة اليدوية إلى حوكمة رقمية قابلة للتنفيذ والتدقيق، فإن ديوان سويت يوفّر هذا المسار من خلال إدارة المجلس، الاجتماع، المحضر، القرار، والمتابعة داخل سجل موحد وواضح الصلاحيات.',
      whoFor: ['مجالس الإدارة وأمانات المجالس', 'اللجان المنبثقة والإدارة التنفيذية', 'الالتزام والمراجعة الداخلية والحوكمة'],
      whatItSolves: ['تأخر المحاضر والاعتمادات بسبب المراجعات اليدوية', 'تشتت المرفقات والقرارات بين البريد والملفات', 'ضعف المساءلة وصعوبة متابعة التنفيذ والتقارير'],
      howItWorks: ['تشكيل المجلس وضبط العضويات والأدوار', 'تنظيم الاجتماع وجدول الأعمال والحضور والنصاب', 'اعتماد المحاضر وتحويل القرارات إلى مهام وتقارير'],
      faq: [
        { q: 'هل يدعم النظام تشكيل المجلس والعضويات والأدوار؟', a: 'نعم. يدعم ضبط هيكل المجلس والعضويات وفترات السريان والأدوار والصلاحيات ضمن سجل موحد.' },
        { q: 'هل يدعم إعداد محاضر مجلس الإدارة واعتمادها؟', a: 'نعم. يدعم إعداد المحاضر ومراجعتها واعتمادها والتوقيع الإلكتروني وربطها بالقرارات والمرفقات.' },
        { q: 'كيف تتم متابعة قرارات المجلس؟', a: 'تُحوَّل القرارات إلى مهام أو التزامات تنفيذية مع مسؤول واضح وموعد استحقاق وحالة تنفيذ وتنبيهات عند التأخير.' },
        { q: 'هل توجد قدرات ذكاء اصطناعي داخل هذا المسار؟', a: 'نعم. يدعم الذكاء الاصطناعي التلخيص، واستخراج القرارات، واقتراح مهام تنفيذية، وتحسين وضوح صياغة القرار، مع اعتماد نهائي بشري.' },
        { q: 'هل النظام مناسب للبيئات الرقابية والجهات الحساسة؟', a: 'نعم. يدعم سجل التدقيق، والصلاحيات الدقيقة، والطابع الزمني، وحماية الوثائق والقرارات الحساسة.' },
        { q: 'هل يدعم الاجتماعات الحضورية والافتراضية والهجينة؟', a: 'نعم. يدعم النماذج التشغيلية الثلاثة مع حضور ونصاب ومحاضر مرتبطة بالقرار والمتابعة.' },
      ],
      sections: [
        { id: 'who-for', title: 'لمن صُمم', body: ['صُمم هذا الحل لمجالس الإدارة، وأمانات المجالس، واللجان المنبثقة عنها، والإدارة التنفيذية، والحوكمة والامتثال، والجهات التي تحتاج إلى ضبط القرار المؤسسي من لحظة المناقشة إلى لحظة التنفيذ.'] },
        { id: 'what-it-solves', title: 'ما الذي يعالجه', body: ['يعالج تأخر المحاضر، وتشتت المرفقات، وضعف وضوح المسؤوليات، وصعوبة متابعة تنفيذ القرارات، وغياب سجل تدقيق موحد، وضعف جاهزية المجلس عند المراجعات أو طلبات الجهات الرقابية.'] },
        { id: 'how-it-works', title: 'كيف يعمل', body: ['يبدأ المسار بتشكيل المجلس وضبط العضويات والأدوار، ثم تنظيم الاجتماع وجدول الأعمال، وربط الحضور والنصاب والمناقشات، ثم إعداد المحضر واعتماده، وتحويل القرارات إلى مهام، ومتابعة التنفيذ، وإصدار التقارير واللوحات التنفيذية.'] },
        { id: 'operational-pain', title: 'تحديات تشغيلية قائمة', body: ['في كثير من الجهات، تُدار اجتماعات المجلس عبر ملفات متفرقة ومراسلات يدوية، ما يؤخر الاعتماد ويُضعف المساءلة ويجعل القرار منفصلًا عن التنفيذ الفعلي.'] },
        { id: 'solution', title: 'كيف يعالجها ديوان سويت', body: ['يجمع النظام جميع عناصر دورة المجلس في مكان واحد: الأعضاء، الدعوات، المرفقات، المحاضر، القرارات، المهام، المتابعة، والتقارير، مع صلاحيات دقيقة وسجل تدقيق واضح.'] },
        { id: 'capabilities', title: 'قدرات أساسية', body: ['يدعم النظام تشكيل المجلس، العضويات، جدول الأعمال، الحضور والنصاب، المحاضر، التوقيع الإلكتروني، تحويل القرارات إلى مهام، التنبيهات، التقارير، والتكامل مع البيئة المؤسسية.'] },
        { id: 'workflow', title: 'كيف يعمل المسار', body: ['تُنشأ الجلسة، تُرسل الدعوات، يُسجل الحضور، تُوثق المناقشات، يُعد المحضر، تُعتمد القرارات، تُسند المهام، ثم تُتابع حالات التنفيذ عبر لوحة واضحة للإدارة وأمانة المجلس.'] },
        { id: 'governance-impact', title: 'الأثر الحوكمي والرقابي', body: ['يرفع هذا المسار جودة توثيق المجلس، ويزيد وضوح المسؤولية، ويُسرّع اعتماد المحاضر، ويُحسن الجاهزية للتدقيق، ويمنح القيادة رؤية أدق لحالة تنفيذ القرارات.'] },
        { id: 'proof', title: 'شواهد تشغيلية', body: ['داخل المنصة، يمكن ربط كل قرار بمسؤول وموعد استحقاق، وتتبع التأخير، وتسجيل الاعتمادات بطابع زمني، وربط المحاضر والمرفقات والقرارات في سجل واحد قابل للاسترجاع السريع.'] },
        { id: 'outcomes', title: 'مخرجات تنفيذية قابلة للقياس', body: ['النتيجة ليست فقط أرشفة أفضل، بل مجلس أكثر انضباطًا، وقرارات أوضح، ومتابعة أسرع، وتقارير جاهزة، وقدرة أعلى على إثبات الحوكمة والامتثال.'] },
      ],
      relatedPages: ['corporateSecretarySystem', 'decisionTracking', 'meetingMinutesEsignature']
},
    committeeManagementSoftware: {
      summary: 'برنامج إدارة اللجان في ديوان سويت ينظم اجتماعات اللجان وعضوياتها ومحاضرها وقراراتها ومتابعة تنفيذها ضمن مسار حوكمي واضح يدعم الشفافية وسرعة الإنجاز.',
      seoTitle: 'برنامج إدارة اللجان | ديوان سويت',
      seoDescription: 'برنامج إدارة اللجان من ديوان سويت لإدارة عضويات اللجان، الاجتماعات، المحاضر، القرارات، المتابعة، والتقارير في مسار مؤسسي موثق وقابل للتدقيق.',
      definition: 'إذا كانت الجهة تدير لجاناً متخصصة وتتأثر جودة القرار فيها بتشتت المتابعة وتعدد الملفات، فإن ديوان سويت يوفّر إطاراً رقمياً ينظم دورة اللجنة من العضوية إلى المحضر ثم القرار والتنفيذ.',
      whoFor: ['اللجان الدائمة والمؤقتة والفرق المتخصصة', 'أمانة اللجان والإدارة التنفيذية', 'الالتزام والمراجعة الداخلية ووحدات المتابعة'],
      whatItSolves: ['تشتت أعمال اللجان ومحاضرها بين البريد والملفات', 'ضعف وضوح مسؤوليات التوصيات والقرارات', 'صعوبة قياس التزام اللجان ورفع تقارير واضحة للإدارة'],
      howItWorks: ['تنظيم هيكلة اللجنة والعضويات والصلاحيات', 'إدارة الاجتماع والمحضر والتوصيات والتصويت عند الحاجة', 'تحويل مخرجات اللجنة إلى مهام ومؤشرات متابعة وتقارير'],
      faq: [
        { q: 'هل يدعم النظام اللجان الدائمة والمؤقتة؟', a: 'نعم. يمكن تهيئة لجان دائمة أو مؤقتة مع ضبط الأعضاء والصلاحيات ومدة العضوية وسجل القرارات.' },
        { q: 'هل يمكن ربط توصيات اللجان بالتنفيذ؟', a: 'نعم. يمكن تحويل التوصيات والقرارات إلى مهام واضحة بمسؤول وتاريخ استحقاق وحالة متابعة.' },
        { q: 'هل يفيد هذا الحل الجهات التي لديها عدة لجان متوازية؟', a: 'نعم. يوفّر رؤية موحدة لحالة كل لجنة واجتماعاتها وقراراتها دون فقدان الخصوصية أو الصلاحيات.' },
        { q: 'هل توجد تقارير أداء خاصة باللجان؟', a: 'نعم. يمكن عرض مؤشرات الحضور، والقرارات، وسرعة الاعتماد، وحالة التنفيذ على مستوى كل لجنة.' },
        { q: 'هل يدعم الذكاء الاصطناعي هذا المسار؟', a: 'نعم. يمكن للذكاء الاصطناعي المساعدة في تلخيص الاجتماعات واستخراج المخرجات وتحسين وضوح الصياغة مع بقاء الاعتماد النهائي بيد الإنسان.' },
      ],
      sections: [
        { id: 'who-for', title: 'لمن صُمم', body: ['صُمم هذا الحل للجان الدائمة والمؤقتة والفرق المتخصصة وأمانات اللجان والإدارة التنفيذية والجهات التي تحتاج إلى ضبط أعمال اللجان ضمن إطار حوكمي واضح.'] },
        { id: 'what-it-solves', title: 'ما الذي يعالجه', body: ['يعالج تشتت اجتماعات اللجان ووثائقها ومحاضرها، وضعف وضوح التوصيات، وصعوبة متابعة تنفيذها، وغياب التقارير الموحدة عن أداء اللجان.'] },
        { id: 'how-it-works', title: 'كيف يعمل', body: ['يبدأ المسار بتشكيل اللجنة وضبط العضويات والصلاحيات، ثم إدارة الاجتماع وجدول الأعمال، وتوثيق المناقشات والتوصيات، وتحويل المخرجات إلى متابعة وتقارير تنفيذية.'] },
        { id: 'operational-pain', title: 'أين تتعثر اللجان عادة؟', body: ['تتعثر اللجان عندما تبقى توصياتها موزعة بين رسائل ومرفقات ومحاضر غير مترابطة، أو عندما لا تُربط مخرجاتها بمسؤوليات وتنفيذ واضح.'] },
        { id: 'solution', title: 'كيف يعالجها ديوان سويت', body: ['ديوان سويت يربط هيكلة اللجنة بالاجتماع والمحضر والتوصية والتنفيذ، بحيث تصبح أعمال اللجان قابلة للقياس والمتابعة والتدقيق.'] },
        { id: 'capabilities', title: 'قدرات أساسية', body: ['يشمل الحل إدارة العضويات، وجدولة الاجتماعات، والمحاضر، والتصويت، والقرارات، والمتابعة، والتقارير، مع صلاحيات مناسبة لطبيعة كل لجنة.'] },
        { id: 'workflow', title: 'كيف تنتقل توصيات اللجان إلى التنفيذ', body: ['تُوثق التوصيات داخل محضر اللجنة، ثم تُعتمد وفق المسار المحدد، وتُحوّل إلى مهام أو التزامات تنفيذية، ثم تُعرض حالتها في لوحات وتقارير متابعة.'] },
        { id: 'governance-impact', title: 'الأثر الحوكمي والإداري', body: ['يساعد هذا المسار على رفع انضباط اللجان، وتقليل التأخير، وتوضيح المساءلة، ومنح الإدارة التنفيذية رؤية أوضح لحالة أعمال اللجان.'] },
        { id: 'proof', title: 'شواهد تشغيلية', body: ['يمكن تتبع كل لجنة بحسب أعضائها واجتماعاتها وتوصياتها ونسب تنفيذها، مع حفظ المحاضر والمرفقات والاعتمادات في سجل موحد قابل للاسترجاع.'] },
        { id: 'outcomes', title: 'مخرجات تنفيذية قابلة للقياس', body: ['النتيجة هي لجان أكثر انضباطاً، وتوصيات أوضح، ومتابعة أسرع، وتقارير جاهزة، وقدرة أعلى على إثبات الحوكمة والامتثال.'] },
      ],
      relatedPages: ['boardManagementSystem', 'corporateSecretarySystem', 'decisionTracking']
},
    generalAssemblyManagement: {
      summary: 'حل إدارة الجمعيات العمومية في ديوان سويت ينظم الدعوات والتصويت والحضور والنصاب والمحاضر والقرارات في مسار موحد يرفع الجاهزية النظامية والتنفيذية.',
      seoTitle: 'إدارة الجمعيات العمومية | ديوان سويت',
      seoDescription: 'إدارة الجمعيات العمومية من ديوان سويت لتنظيم الدعوات، النصاب، الحضور، التصويت، المحاضر، الاعتماد، والقرارات ضمن مسار موثق وقابل للتدقيق.',
      definition: 'إذا كانت الجهة تحتاج إلى إدارة الجمعية العمومية بطريقة أكثر انضباطاً ووضوحاً من الدعوة إلى التصويت والمحضر والتنفيذ، فإن ديوان سويت يوفّر هذا المسار داخل بيئة مؤسسية موحدة.',
      whoFor: ['الشركات والجمعيات التي تعقد جمعيات عمومية دورية أو طارئة', 'أمانة الجمعيات والإدارة القانونية والتنفيذية', 'الالتزام والحوكمة والجهات المعنية بإثبات النصاب والاعتماد'],
      whatItSolves: ['صعوبة ضبط الدعوات والحضور والنصاب والتصويت في مسار واحد', 'تأخر اعتماد المحضر النهائي وإثبات نتائج الجمعية', 'ضعف الربط بين قرارات الجمعية والتنفيذ اللاحق'],
      howItWorks: ['تنظيم الجمعية والجدول والدعوات والمرفقات', 'إدارة الحضور والنصاب والتصويت والمحضر', 'اعتماد المخرجات وربط القرارات بالتنفيذ والتقارير'],
      faq: [
        { q: 'هل يدعم النظام احتساب النصاب وتوثيق الحضور؟', a: 'نعم. يمكن توثيق الحضور واحتساب النصاب وربطه بالمحضر ونتائج التصويت ضمن سجل واضح.' },
        { q: 'هل يمكن إدارة التصويت داخل الجمعية؟', a: 'نعم. يدعم النظام التصويت وإثبات النتائج وربطها ببنود الأعمال والقرارات الصادرة.' },
        { q: 'هل يصلح للجمعيات العمومية الدورية والطارئة؟', a: 'نعم. يمكن تكييف المسار بحسب نوع الجمعية ومتطلبات الجهة وطبيعة القرارات المطروحة.' },
        { q: 'هل ترتبط قرارات الجمعية بالتنفيذ؟', a: 'نعم. يمكن تحويل قرارات الجمعية إلى مهام أو التزامات تنفيذية قابلة للمتابعة والقياس.' },
        { q: 'هل يوفر النظام جاهزية أفضل للتدقيق والرقابة؟', a: 'نعم. يوفّر سجلاً موثقاً للدعوات والحضور والنصاب والتصويت والمحاضر والاعتمادات والقرارات.' },
      ],
      sections: [
        { id: 'who-for', title: 'لمن صُمم', body: ['صُمم هذا الحل للشركات والجمعيات والجهات التي تحتاج إلى إدارة الجمعيات العمومية الدورية أو الطارئة بطريقة موثقة وواضحة وقابلة للتدقيق.'] },
        { id: 'what-it-solves', title: 'ما الذي يعالجه', body: ['يعالج صعوبة توحيد الدعوات والحضور والنصاب والتصويت والمحاضر في مسار واحد، ويقلل ارتباك الاعتماد النهائي ونتائج الجمعية.'] },
        { id: 'how-it-works', title: 'كيف يعمل', body: ['تُنظم الجمعية من خلال جدول الأعمال والدعوات والمرفقات، ثم تُدار الحضور والنصاب والتصويت، ويُعتمد المحضر، وتُربط القرارات بنتائج التنفيذ والمتابعة.'] },
        { id: 'operational-pain', title: 'لماذا تتعقد إدارة الجمعيات العمومية؟', body: ['لأن الجمعية تجمع بين اشتراطات الدعوة والنصاب والتصويت والتوثيق والاعتماد، وأي خلل في ترابط هذه العناصر يضعف الجاهزية النظامية والتنفيذية.'] },
        { id: 'solution', title: 'كيف يعالجها ديوان سويت', body: ['ديوان سويت يوحّد مسار الجمعية العمومية من التخطيط إلى الاعتماد، ويمنح الجهة سجلاً واضحاً للحضور والتصويت والمحاضر والقرارات.'] },
        { id: 'capabilities', title: 'قدرات أساسية', body: ['يشمل الحل الدعوات، والمرفقات، والحضور، والنصاب، والتصويت، والمحاضر، والاعتماد، وربط القرارات بالتنفيذ والتقارير.'] },
        { id: 'workflow', title: 'كيف تجري الجمعية داخل النظام', body: ['تُنشأ الجمعية، وتُرسل الدعوات، ويُسجل الحضور، ويُحتسب النصاب، ويُدار التصويت، ثم يُعتمد المحضر وتُحوّل القرارات إلى متابعة واضحة.'] },
        { id: 'governance-impact', title: 'الأثر الحوكمي والنظامي', body: ['يرفع هذا المسار سلامة تنظيم الجمعية ووضوح نتائجها، ويعزز القدرة على إثبات الامتثال للنصاب والاعتماد، ويقلل المخاطر الإجرائية.'] },
        { id: 'proof', title: 'شواهد تشغيلية', body: ['يمكن إثبات من حضر، وما النصاب المتحقق، وكيف جرى التصويت، وما القرارات الصادرة، ومتى تم الاعتماد، وكل ذلك ضمن سجل موحد قابل للاسترجاع.'] },
        { id: 'outcomes', title: 'مخرجات تنفيذية قابلة للقياس', body: ['النتيجة هي جمعيات عمومية أكثر انضباطاً، ونتائج أوضح، واعتماد أسرع، ومتابعة أدق لما يترتب على قرارات الجمعية.'] },
      ],
      relatedPages: ['boardManagementSystem', 'meetingMinutesEsignature', 'support']
},
    corporateSecretarySystem: {
      summary: 'نظام أمين سر مجلس الإدارة في ديوان سويت يدعم أمانة المجلس في تنظيم الاجتماعات والوثائق والمحاضر والقرارات والاعتمادات في مسار عملي موثوق وسهل المتابعة.',
      seoTitle: 'نظام أمين سر مجلس الإدارة | ديوان سويت',
      seoDescription: 'نظام أمين سر مجلس الإدارة من ديوان سويت لتنظيم اجتماعات المجلس، الوثائق، المحاضر، القرارات، الاعتمادات، والمتابعة التنفيذية ضمن مسار حوكمي موثق.',
      definition: 'إذا كانت أمانة المجلس تتحمل عبئاً كبيراً في تنسيق الاجتماعات وتجميع الوثائق وإعداد المحاضر ومتابعة القرارات، فإن ديوان سويت يقدّم نظاماً يخفف هذا العبء ويضبطه داخل مسار مؤسسي موحد.',
      whoFor: ['أمين سر مجلس الإدارة وفريق الأمانة', 'رؤساء وأعضاء المجالس واللجان', 'الإدارة التنفيذية والالتزام والمراجعة'],
      whatItSolves: ['الاعتماد الكبير على التنسيق اليدوي بين الأطراف', 'صعوبة ضبط الوثائق والمحاضر والنسخ المعتمدة', 'ضغط المتابعة على أمانة المجلس بعد صدور القرارات'],
      howItWorks: ['إدارة الاجتماعات والمرفقات قبل الانعقاد', 'إعداد المحاضر والاعتمادات والتوقيع بعد الاجتماع', 'متابعة القرارات والتقارير من خلال لوحة موحدة لأمانة المجلس'],
      faq: [
        { q: 'كيف يخدم هذا الحل أمين سر مجلس الإدارة عملياً؟', a: 'يوفّر لأمين السر مكاناً واحداً لإدارة الاجتماعات والوثائق والمحاضر والاعتمادات والقرارات والمتابعة دون الاعتماد على أدوات متفرقة.' },
        { q: 'هل يدعم تنظيم الوثائق والمرفقات قبل الاجتماع؟', a: 'نعم. يمكن ربط الدعوات وجدول الأعمال والوثائق والمرفقات بكل اجتماع وبكل بند عند الحاجة.' },
        { q: 'هل يساعد في تسريع المحاضر والاعتمادات؟', a: 'نعم. ينظم إعداد المحضر ومسار مراجعته واعتماده وربطه بالتوقيع الإلكتروني والطابع الزمني.' },
        { q: 'هل يخفف عبء متابعة القرارات بعد الاجتماع؟', a: 'نعم. يربط القرارات بمسؤوليات واضحة ويعرض حالة التنفيذ والتنبيهات والتقارير في مكان واحد.' },
        { q: 'هل يوفر تقارير مناسبة للإدارة وأمانة المجلس؟', a: 'نعم. يمكن عرض مؤشرات الاجتماعات والاعتمادات والقرارات وحالة التنفيذ بما يفيد الإدارة وأمانة المجلس معاً.' },
      ],
      sections: [
        { id: 'who-for', title: 'لمن صُمم', body: ['صُمم هذا الحل لأمناء سر المجالس وفرق الأمانة والجهات التي تتولى التنسيق المؤسسي للاجتماعات والوثائق والمحاضر والاعتمادات والقرارات.'] },
        { id: 'what-it-solves', title: 'ما الذي يعالجه', body: ['يعالج كثافة التنسيق اليدوي، وتشتت الوثائق، وتأخر المحاضر، وضعف التحكم في النسخ المعتمدة، وعبء متابعة القرارات على أمانة المجلس.'] },
        { id: 'how-it-works', title: 'كيف يعمل', body: ['يبدأ المسار بتنظيم الاجتماع ووثائقه وجدول أعماله، ثم دعم إعداد المحضر واعتماده، ثم ربط القرارات بالمتابعة التنفيذية والتقارير داخل لوحة واحدة تخدم أمانة المجلس.'] },
        { id: 'operational-pain', title: 'أين يستهلك الدور أكبر جهد؟', body: ['يستهلك الجهد الأكبر في جمع الوثائق، وتنسيق الأطراف، وضبط النسخ المعتمدة، ثم متابعة ما صدر من قرارات وتوصيات بعد انتهاء الاجتماع.'] },
        { id: 'solution', title: 'كيف يعالجها ديوان سويت', body: ['ديوان سويت يمنح أمين السر نظاماً موحداً يجمع التحضير، والانعقاد، والمحضر، والاعتماد، والقرار، والمتابعة، بما يقلل الأعمال المكررة ويرفع دقة الضبط.'] },
        { id: 'capabilities', title: 'قدرات أساسية', body: ['يشمل الحل تنظيم الدعوات والمرفقات، وجدول الأعمال، والمحاضر، والاعتمادات، والتوقيع الإلكتروني، والقرارات، والمتابعة، والتقارير.'] },
        { id: 'workflow', title: 'كيف يعمل المسار اليومي', body: ['يُنظم الاجتماع، وتُجهز الوثائق، وتُوثق المناقشات، ويُعتمد المحضر، ثم تُحوّل القرارات إلى متابعة واضحة مع تقارير محدثة تدعم أمانة المجلس والقيادة.'] },
        { id: 'governance-impact', title: 'الأثر التنظيمي والحوكمي', body: ['يساعد هذا المسار على رفع كفاءة أمانة المجلس، وتقليل التأخير، وتحسين الجاهزية للتدقيق، وتقديم تجربة أكثر احترافية لأعضاء المجلس واللجان.'] },
        { id: 'proof', title: 'شواهد تشغيلية', body: ['يمكن لأمين السر تتبع حالة الاجتماع والمحضر والاعتماد والقرار من خلال سجل واحد بدلاً من التنقل بين البريد والملفات والمتابعات اليدوية.'] },
        { id: 'outcomes', title: 'مخرجات تنفيذية قابلة للقياس', body: ['النتيجة هي أمانة مجلس أكثر تنظيماً، واعتمادات أسرع، ومحاضر أوضح، ومتابعة أدق للقرارات، وتجهيز أفضل للتقارير والرقابة.'] },
      ],
      relatedPages: ['boardManagementSystem', 'meetingMinutesEsignature', 'decisionTracking']
},
    meetingMinutesEsignature: {
      title: 'محاضر الاجتماعات والتوقيع الإلكتروني',
      summary: 'حل ديوان سويت لإدارة محاضر الاجتماعات والتوقيع الإلكتروني يوحّد إعداد المحضر، المراجعة، الاعتماد، الطابع الزمني، وسجل التدقيق في مسار رسمي قابل للرقابة.',
      seoTitle: 'محاضر الاجتماعات والتوقيع الإلكتروني | ديوان سويت',
      seoDescription: 'محاضر الاجتماعات والتوقيع الإلكتروني من ديوان سويت لتنظيم إعداد المحضر، الاعتماد، الطابع الزمني، التوقيع الإلكتروني، ومنع التعديل بعد النسخة النهائية.',
      definition: 'إذا كانت الجهة تحتاج إلى محاضر رسمية يمكن إعدادها واعتمادها وتتبعها دون فوضى المراسلات اليدوية، فإن ديوان سويت يوفّر مساراً موثقاً يربط المحضر بالقرار والتوقيع والتاريخ وسجل المراجعة.',
      whoFor: ['أمانة المجلس واللجان', 'الإدارة التنفيذية والشؤون القانونية', 'الالتزام والمراجعة الداخلية والجهات الرقابية'],
      whatItSolves: ['تأخر اعتماد المحاضر بسبب المراجعات غير المنظمة', 'صعوبة معرفة النسخة النهائية المعتمدة ومن عدّلها', 'ضعف الربط بين المحضر والقرار والتوقيع وسجل التدقيق'],
      howItWorks: ['إعداد المحضر وفق قالب منظم وربطه بالاجتماع', 'إرساله لمسار مراجعة واعتماد وتوقيع إلكتروني موثق', 'تثبيت النسخة النهائية وربطها بالقرارات والمرفقات وسجل التدقيق'],
      faq: [
        { q: 'هل يمنع النظام التعديل بعد اعتماد النسخة النهائية؟', a: 'نعم، يمكن ضبط المسار بحيث تُحفظ النسخة النهائية في حالة محكومة مع سجل تاريخي واضح.' },
        { q: 'هل يدعم التوقيع الإلكتروني والطابع الزمني؟', a: 'نعم، يدعم التوقيع الإلكتروني الموثق والطابع الزمني المرتبط بخطوات الاعتماد.' },
        { q: 'هل يمكن البحث في المحاضر بسرعة؟', a: 'نعم، يمكن البحث بحسب الاجتماع أو القرار أو العضو أو التاريخ أو حالة الاعتماد.' },
        { q: 'هل يرتبط المحضر بالقرارات والمرفقات؟', a: 'نعم، يربط النظام المحضر بالمرفقات والقرارات والاعتمادات ضمن سجل واحد يسهل استرجاعه.' },
        { q: 'هل هذه الصفحة مناسبة للجهات الخاضعة للرقابة؟', a: 'نعم، لأنها تعزز توثيق الاعتماد، وسلامة النسخة النهائية، والجاهزية للمراجعة والتدقيق.' },
      ],
      sections: [
        { id: 'who-for', title: 'لمن صُمم', body: ['صُمم هذا الحل لأمانات المجالس واللجان، والإدارة التنفيذية، والشؤون القانونية، والحوكمة والامتثال، وكل جهة تحتاج إلى محاضر رسمية دقيقة قابلة للاعتماد والاسترجاع والتدقيق.'] },
        { id: 'what-it-solves', title: 'ما الذي يعالجه', body: ['يعالج تأخر إعداد المحاضر، وتعدد النسخ غير المنضبطة، وضعف التوثيق عند الاعتماد، وصعوبة إثبات من اعتمد ومتى، والارتباك بين المحضر النهائي والقرارات المرتبطة به.'] },
        { id: 'how-it-works', title: 'كيف يعمل', body: ['يبدأ المسار بإعداد المحضر وفق قالب منظم، ثم إرساله للمراجعة والاعتماد، وتوقيعه إلكترونياً، وربطه زمنياً بسجل واضح يثبت النسخة النهائية ويحافظ على سلامة المخرجات.'] },
        { id: 'operational-pain', title: 'لماذا تتأخر المحاضر في الجهات الكبيرة؟', body: ['لأن المحضر غالباً يمر بين البريد والملفات والملاحظات الشخصية دون مسار اعتماد واضح، فتتعدد النسخ، وتتأخر التعديلات، ويصبح إثبات النسخة الرسمية أمراً مرهقاً.'] },
        { id: 'solution', title: 'كيف يعالجها ديوان سويت', body: ['ديوان سويت يجمع إعداد المحضر، والمراجعة، والتوقيع الإلكتروني، والطابع الزمني، ومنع التعديل بعد الاعتماد، وربط المحضر بالقرارات والمرفقات في دورة واحدة قابلة للتدقيق.'] },
        { id: 'capabilities', title: 'قدرات أساسية', body: ['يشمل الحل قوالب محاضر منظمة، ومسارات اعتماد مرنة، وتوقيعاً إلكترونياً، وسجل تدقيق، وبحثاً متقدماً، وربطاً مباشراً بالمرفقات والقرارات واللجان والاجتماعات.'] },
        { id: 'workflow', title: 'كيف يجري اعتماد المحضر', body: ['يُنشأ المحضر، ويُراجع داخلياً، ثم يمر بمسار اعتماد منظم، ويُوقّع إلكترونياً، وتُثبت النسخة النهائية بطابع زمني، ثم تصبح جاهزة للاسترجاع والرقابة والربط بالقرارات.'] },
        { id: 'governance-impact', title: 'الأثر الحوكمي والرقابي', body: ['هذا المسار يرفع سلامة المحاضر، ويقلل الجدل حول النسخة المعتمدة، ويُسرّع الاعتماد، ويمنح الجهات الرقابية والمراجعة سجلاً أوضح وأكثر موثوقية.'] },
        { id: 'proof', title: 'شواهد تشغيلية', body: ['يمكن توثيق من أنشأ المحضر، ومن راجعه، ومن اعتمده، ومتى تم الاعتماد، وما النسخة النهائية، مع ربط ذلك بالمرفقات والقرارات ضمن مسار واضح وسهل التتبع.'] },
        { id: 'outcomes', title: 'مخرجات تنفيذية قابلة للقياس', body: ['النتيجة هي محاضر أكثر سرعة ودقة، واعتماد أوضح، وتقليل الأخطاء البشرية، ورفع الجاهزية للتدقيق والامتثال دون تعطيل دورة الاجتماع والقرار.'] },
      ],
      relatedPages: ['corporateSecretarySystem', 'decisionTracking', 'securityCompliance']
},
    decisionTracking: {
      title: 'إدارة ومتابعة القرارات',
      summary: 'إدارة ومتابعة القرارات في ديوان سويت تربط كل قرار بمسؤول وموعد استحقاق وحالة تنفيذ وتنبيهات وتقارير، حتى لا يبقى القرار سطراً في محضر بلا تنفيذ فعلي.',
      seoTitle: 'إدارة ومتابعة القرارات | ديوان سويت',
      seoDescription: 'إدارة ومتابعة القرارات من ديوان سويت لتحويل قرارات المجالس واللجان إلى مهام قابلة للتنفيذ، مع مسؤول واضح، تنبيهات، تصعيد، وتقارير جاهزة للإدارة والرقابة.',
      definition: 'إذا كانت الجهة تعتمد القرارات داخل الاجتماع ثم تفقد السيطرة عليها بعد انتهاء الجلسة، فإن ديوان سويت يحول القرار إلى التزام تنفيذي واضح بمالك ومدة وتنبيه وسجل متابعة وإقفال.',
      whoFor: ['أمانة المجلس واللجان', 'الإدارة التنفيذية ووحدات المتابعة', 'الالتزام والمراجعة الداخلية وصناع القرار'],
      whatItSolves: ['ضياع القرار بعد الاجتماع دون مالك تنفيذ واضح', 'ضعف الرؤية على نسب الإنجاز والتأخير والتعثر', 'غياب سجل واضح لإغلاق القرارات وإثبات ما تم تنفيذه'],
      howItWorks: ['اعتماد القرار وربطه بمحضر الاجتماع المعتمد', 'إسناد مسؤول التنفيذ والموعد والأولوية والتنبيهات', 'متابعة الحالة والتصعيد وإصدار تقارير التنفيذ والالتزام'],
      faq: [
        { q: 'هل يمكن ربط كل قرار بمسؤول محدد؟', a: 'نعم، يمكن إسناد كل قرار إلى مالك تنفيذ واضح مع موعد استحقاق وأولوية وحالة متابعة.' },
        { q: 'هل يدعم النظام التنبيهات والتصعيد؟', a: 'نعم، يدعم التنبيهات الآلية والتذكيرات والتصعيد عند التأخر أو قرب الاستحقاق.' },
        { q: 'هل توجد تقارير تنفيذ للإدارة العليا؟', a: 'نعم، يمكن عرض نسب الإنجاز، والقرارات المتأخرة، والحالات المفتوحة والمغلقة، والجهات الأكثر التزاماً أو تعثراً.' },
        { q: 'هل يمكن ربط القرار بالمحضر والاجتماع والمرفقات؟', a: 'نعم، يبقى القرار مرتبطاً بالمحضر المعتمد والاجتماع والمستندات المساندة داخل سجل موحد.' },
        { q: 'هل يساعد الذكاء الاصطناعي في هذا المسار؟', a: 'نعم، يمكن استخدام الذكاء الاصطناعي لدعم تلخيص المخرجات، واقتراح مهام تنفيذية، وكشف مؤشرات التعثر والتأخير، مع بقاء القرار النهائي للإنسان.' },
      ],
      sections: [
        { id: 'who-for', title: 'لمن صُمم', body: ['صُمم هذا الحل لأمانة المجلس واللجان، والإدارة التنفيذية، ووحدات المتابعة، والحوكمة والامتثال، وكل جهة تحتاج إلى ربط القرار بالتنفيذ لا بالاكتفاء بتوثيقه فقط.'] },
        { id: 'what-it-solves', title: 'ما الذي يعالجه', body: ['يعالج ضياع القرار بعد الاجتماع، وضعف وضوح المسؤولية، وتأخر التنفيذ، وصعوبة معرفة ما أُنجز وما تعثر، وغياب سجل متابعة موحد يربط القرار بحالته الفعلية.'] },
        { id: 'how-it-works', title: 'كيف يعمل', body: ['بعد اعتماد القرار، يُسجَّل داخل النظام، ويُربط بمسؤول وموعد استحقاق وأولوية، ثم تُتابَع حالته عبر تنبيهات، وتصعيد، ولوحات وتحليلات تُظهر التقدم أو التعثر بوضوح.'] },
        { id: 'operational-pain', title: 'أين تضيع القرارات بعد الاجتماع؟', body: ['تضيع عندما تبقى داخل المحضر دون تحويل واضح إلى التزام تنفيذي، أو عندما تُوزع المتابعة بين البريد والاجتهادات الفردية دون لوحة موحدة أو سجل مساءلة.'] },
        { id: 'solution', title: 'كيف يعالجها ديوان سويت', body: ['ديوان سويت يربط القرار بمحضر الاجتماع المعتمد، ثم يحوله إلى عنصر تنفيذ واضح يمكن تتبعه، وقياسه، والتذكير به، وتصعيده، وإقفاله مع دليل تنفيذ موثق.'] },
        { id: 'capabilities', title: 'قدرات أساسية', body: ['يشمل الحل إسناد القرار لمالك تنفيذ، وتحديد الأولوية والموعد، والتنبيهات، والتصعيد، ولوحات التنفيذ، وسجل الإقفال، وربط القرار بالمستندات والمناقشات ذات الصلة.'] },
        { id: 'workflow', title: 'كيف يتحول القرار إلى تنفيذ', body: ['يصدر القرار داخل الاجتماع، ثم يُعتمد، ويُربط بمسؤول تنفيذي، وتُحدد مواعيد المتابعة، وتظهر حالته في التقارير، حتى يُغلق بدليل تنفيذ واضح يمكن الرجوع إليه لاحقاً.'] },
        { id: 'governance-impact', title: 'الأثر الحوكمي والتنفيذي', body: ['هذا المسار يرفع المساءلة، ويحد من نسيان التكليفات، ويكشف التعثر مبكراً، ويمنح الإدارة رؤية أوضح لنسبة تنفيذ القرارات وجودة الالتزام بين الإدارات.'] },
        { id: 'proof', title: 'شواهد تشغيلية', body: ['يمكن معرفة من يملك القرار، وما الموعد المحدد له، وما حالته الحالية، وما إن كان متأخراً، وما الإجراءات التي اتخذت حياله، مع تقارير جاهزة للقيادة والرقابة.'] },
        { id: 'outcomes', title: 'مخرجات تنفيذية قابلة للقياس', body: ['النتيجة هي قرارات تُنفّذ ولا تُنسى، وتأخير أقل، ومسؤولية أوضح، وتقارير أفضل، وقدرة أعلى على إثبات أن المجلس لا يكتفي باتخاذ القرار بل يتابع أثره حتى الإغلاق.'] },
      ],
      relatedPages: ['boardManagementSystem', 'governanceReportsDashboards', 'roiBoardGovernance']
},
    governmentGovernance: {
      summary: 'صفحة توضح كيف يدعم ديوان سويت حوكمة الجهات الحكومية عبر ضبط الدعوات والمحاضر والقرارات واللجان والتقارير في بيئة عالية الامتثال.',
      seoDescription: 'حوكمة الجهات الحكومية في ديوان سويت تشمل إدارة الاجتماعات والمحاضر والقرارات والتدقيق والتقارير التنفيذية مع جاهزية أعلى للرقابة والامتثال.',
      definition: 'حوكمة الجهات الحكومية تحتاج إلى مسار رقمي منضبط يوازن بين السرعة الإدارية، والحوكمة، والامتثال، وقابلية المراجعة.',
      whatItSolves: ['تعدد المخاطبات والاعتمادات اليدوية', 'صعوبة إثبات الالتزام الإجرائي', 'ضعف مركزية الوثائق والقرارات'],
      relatedPages: ['securityCompliance', 'governanceReportsDashboards', 'implementationSupportTraining']
},
    listedCompaniesGovernance: {
      summary: 'صفحة تركز على متطلبات الحوكمة للشركات المدرجة من حيث سرعة اعتماد المحاضر، وضبط القرارات، وشفافية السجل، وجاهزية الإفصاح والتدقيق.',
      seoDescription: 'حوكمة الشركات المدرجة في ديوان سويت لتمكين محاضر دقيقة وقرارات قابلة للمتابعة وتقارير أوضح لمكاتب المجلس والالتزام والمراجعة.',
      definition: 'حوكمة الشركات المدرجة تتطلب سجلاً دقيقاً للمجلس واللجان والقرارات مع دورة اعتماد واضحة وقابلة للتدقيق.',
      relatedPages: ['boardManagementSystem', 'governanceReportsDashboards', 'governanceSecurityCompliance']
},
    bankingGovernance: {
      summary: 'صفحة توضح كيف يدعم ديوان سويت البنوك والجهات المالية في الحوكمة عالية الحساسية مع مسارات اعتماد وصلاحيات وسجل تدقيق وتقارير تنفيذية.',
      seoDescription: 'حوكمة البنوك في ديوان سويت مع ضوابط وصول دقيقة، وسجل تدقيق، واعتماد محاضر وقرارات، وتقارير رقابية جاهزة للجهات الداخلية والخارجية.',
      definition: 'حوكمة البنوك تتطلب انضباطاً أعلى في السرية والصلاحيات والاعتماد والتتبع وإثبات الامتثال.',
      relatedPages: ['securityCompliance', 'boardManagementSystem', 'governanceReportsDashboards']
},
    securityCompliance: {
      summary: 'صفحة الثقة والامتثال التي تشرح طبقات الحماية والصلاحيات وسجل التدقيق والنسخ الاحتياطي والجاهزية للبيئات عالية الحساسية.',
      seoDescription: 'الأمن والامتثال المؤسسي في ديوان سويت مع صلاحيات دقيقة، وتشفير، وسجل تدقيق، ودعم الاستضافة السحابية أو On-Premise وفق سياسات الجهة.',
      definition: 'الأمن والامتثال المؤسسي في ديوان سويت يغطي التحكم بالوصول، حماية البيانات، التتبع، الاحتفاظ، والجاهزية للضوابط الداخلية والتنظيمية.',
      whoFor: ['إدارة الأمن السيبراني', 'الالتزام والمراجعة الداخلية', 'تقنية المعلومات ومكاتب المجلس'],
      whatItSolves: ['ضعف تتبع الوصول والتغييرات', 'الحاجة إلى سجل تدقيق موثوق', 'الحاجة إلى خيارات نشر وسيطرة أعلى على البيانات'],
      howItWorks: ['ضبط الصلاحيات والأدوار', 'تسجيل النشاط والاعتمادات', 'إخراج تقارير امتثال ومراجعة'],
      faq: [
        { q: 'هل يدعم النظام صلاحيات دقيقة حسب الدور؟', a: 'نعم، يمكن ضبط الوصول بحسب الدور والمجلس واللجنة ونوع المحتوى.' },
        { q: 'هل يوجد سجل تدقيق؟', a: 'نعم، يحتفظ النظام بسجل نشاط واعتمادات يساعد على المراجعة والامتثال.' },
        { q: 'هل يدعم On-Premise أو الاستضافة المحلية؟', a: 'نعم، يمكن تقديم خيارات نشر سحابي أو محلي وفق متطلبات الجهة.' },
      ],
      relatedPages: ['governanceSecurityCompliance', 'implementationSupportTraining', 'support']
},
    aiGovernanceAssistant: {
      summary: 'وكيل ديوان سويت للذكاء الاصطناعي يحول الحوار إلى محضر وقرارات ومهام قابلة للتنفيذ. بعد انتهاء الاجتماع، يقوم بتفريغ المحادثات، وتمييز المتحدثين، وتلخيص النقاشات، واستخراج القرارات، وإعداد مسودة المحضر، وتحويل التوصيات إلى مهام تنفيذية مرتبطة بمسؤولين وتواريخ استحقاق.',
      seoDescription: 'وكيل ديوان سويت للذكاء الاصطناعي يحول الاجتماعات إلى محاضر وقرارات ومهام تنفيذية. يتكامل مع Google Meet وZoom وWebex وMicrosoft Teams لتسريع الحوكمة وتحسين الامتثال.',
      definition: 'وكيل ديوان سويت للذكاء الاصطناعي هو طبقة تنفيذية ذكية تبدأ بعد انتهاء الاجتماع لتحويل الحوار إلى نتائج قابلة للتنفيذ، مع بقاء المراجعة والاعتماد النهائي بيد الإنسان.',
      whoFor: ['أمناء المجالس واللجان', 'فرق الحوكمة والامتثال', 'الإدارة التنفيذية ووحدات المتابعة'],
      whatItSolves: ['بطء إعداد المحاضر بعد الاجتماعات', 'صعوبة استخراج القرارات والمهام يدوياً', 'ضياع التوصيات بين الاجتماع والتنفيذ', 'الحاجة إلى متابعة ذكية للتنفيذ'],
      howItWorks: ['تفريغ الاجتماع وتمييز المتحدثين', 'تلخيص النقاشات واستخراج القرارات', 'إعداد مسودة محضر جاهزة للمراجعة', 'تحويل التوصيات إلى مهام ومسؤوليات واضحة', 'متابعة التنفيذ وتواريخ الاستحقاق', 'أرشفة ذكية وربط بسجل الاجتماع'],
      integrations: ['Google Meet', 'Zoom', 'Webex', 'Microsoft Teams'],
      faq: [
        { q: 'كيف يساعد وكيل الذكاء الاصطناعي بعد الاجتماع؟', a: 'يقوم بتفريغ الاجتماع، وتمييز المتحدثين، وتلخيص النقاشات، واستخراج القرارات، وإعداد مسودة المحضر، وتحويل التوصيات إلى مهام تنفيذية.' },
        { q: 'هل يُعد مسودة المحضر؟', a: 'نعم، يُعد مسودة محضر منسّقة وشاملة جاهزة للمراجعة والاعتماد خلال دقائق لا ساعات.' },
        { q: 'هل يمكنه تمييز المتحدثين؟', a: 'نعم، يتعرف تلقائياً على كل متحدث ويربط مداخلاته بملفه في المنصة.' },
        { q: 'هل يستخرج القرارات والتوصيات؟', a: 'نعم، يحلل المناقشات ويستخرج القرارات والتوصيات بصياغة واضحة.' },
        { q: 'هل يحول التوصيات إلى مهام تنفيذية؟', a: 'نعم، يحول كل قرار أو توصية إلى مهمة مرتبطة بمسؤول وتاريخ استحقاق.' },
        { q: 'هل يدعم Google Meet وZoom وTeams وWebex؟', a: 'نعم، يتكامل مع هذه المنصات الأربع لاستيراد محتوى الاجتماعات.' },
        { q: 'هل هو مناسب للمجالس واللجان؟', a: 'نعم، صُمم خصيصاً للاجتماعات عالية الحوكمة مثل مجالس الإدارة واللجان والجمعيات العمومية.' },
      ],
      relatedPages: ['aiGovernanceDecisionSupport', 'meetingMinutesEsignature', 'decisionTracking', 'integrationsBoardGovernance']
},
    governanceReports: {
      summary: 'صفحة تشرح تقارير الحوكمة التنفيذية في ديوان سويت لعرض الحضور والنصاب والقرارات ومؤشرات التنفيذ ولوحات القراءة السريعة للإدارة العليا.',
      seoDescription: 'تقارير الحوكمة التنفيذية في ديوان سويت لقياس الحضور والنصاب وسرعة اعتماد المحاضر ونسب تنفيذ القرارات وجاهزية التقارير الرقابية.',
      definition: 'تقارير الحوكمة التنفيذية تجمع مؤشرات المجلس واللجان والقرارات في لوحات مختصرة تساعد الإدارة العليا على الرؤية السريعة.',
      whoFor: ['الرئيس التنفيذي ومكتب المجلس', 'أمانة المجلس واللجان', 'الالتزام والمراجعة الداخلية'],
      whatItSolves: ['غياب الرؤية الفورية لحالة القرارات', 'صعوبة إعداد تقارير الإدارة العليا يدوياً', 'الحاجة إلى مؤشرات موحدة للامتثال والتنفيذ'],
      howItWorks: ['جمع بيانات الاجتماعات والقرارات', 'عرضها في مؤشرات ولوحات وملخصات', 'إتاحة التصدير والمشاركة حسب الصلاحيات'],
      faq: [
        { q: 'ما نوع التقارير المتاحة؟', a: 'تقارير عن الحضور والنصاب والمحاضر والقرارات والتنفيذ وحالات التأخر والجاهزية الرقابية.' },
        { q: 'هل التقارير مناسبة للإدارة العليا؟', a: 'نعم، صممت لتكون مختصرة وسريعة القراءة مع قدرة على التعمق عند الحاجة.' },
        { q: 'هل يمكن التصدير أو المشاركة؟', a: 'يمكن ذلك وفق الصلاحيات والسياسات المعتمدة داخل الجهة.' },
      ],
      relatedPages: ['governanceReportsDashboards', 'roiBoardGovernance', 'decisionTracking']
},
    support: {
      summary: 'صفحة الدعم والتأهيل التي تعرض مسار الإطلاق والتدريب وخيارات المساندة التشغيلية والاستشارية للمؤسسات بعد بدء التطبيق.',
      seoDescription: 'الدعم والتأهيل في ديوان سويت يشمل التحضير للإطلاق، والتدريب، وقنوات الدعم الفني، والاستشارات، والتحسين المستمر بعد التشغيل.',
      definition: 'الدعم والتأهيل في ديوان سويت يربط بين جاهزية الإطلاق، وتدريب المستخدمين، والدعم الفني، وخطط التحسين المستمر.',
      whoFor: ['فرق المشروع والتحول الرقمي', 'تقنية المعلومات', 'المستخدمون الرئيسيون وأمانة المجلس'],
      whatItSolves: ['بطء التبني بعد الإطلاق', 'الحاجة إلى تدريب منظم للمستخدمين', 'الحاجة إلى قناة واضحة للدعم والتحسين'],
      howItWorks: ['تخطيط الإطلاق وتهيئة البيئة', 'تنفيذ التدريب والنماذج التشغيلية', 'تقديم دعم مستمر وتحسينات لاحقة'],
      faq: [
        { q: 'هل يوجد برنامج تدريب للمستخدمين؟', a: 'نعم، يمكن تنفيذ تدريب بحسب الأدوار ومستوى الاستخدام داخل الجهة.' },
        { q: 'هل توجد قنوات دعم فني؟', a: 'نعم، تتوافر قنوات دعم وتشغيل وفق نطاق الخدمة المتفق عليه.' },
        { q: 'هل يمكن تقديم استشارات بعد الإطلاق؟', a: 'نعم، يمكن تقديم استشارات ومراجعات تحسين بعد بدء التشغيل.' },
      ],
      relatedPages: ['implementationSupportTraining', 'support', 'about']
}
},
  en: {
    boardManagementSystem: {
      summary: 'Diwan Suite’s board management system controls the full board lifecycle in one environment, from board structure and meeting invitations to minutes approval, e-signature, decision execution, and measurable follow-up.',
      seoTitle: 'Board Management System | Diwan Suite',
      seoDescription: 'Diwan Suite board management system connects board structure, agendas, attendance, quorum, minutes, approvals, decisions, follow-up, and reporting in one auditable governance workflow.',
      definition: 'If your organization needs to move board operations from fragmented manual administration into a governed digital workflow, Diwan Suite provides that path by connecting the board, the meeting, the minutes, the decision, and execution in one controlled record.',
      whoFor: ['Boards of directors and board secretariats', 'Board committees and executive leadership teams', 'Governance, compliance, and internal audit stakeholders'],
      whatItSolves: ['Delayed minutes and fragmented approvals', 'Scattered attachments and board records', 'Weak accountability for decision execution'],
      howItWorks: ['Structure the board and define memberships and roles', 'Manage agendas, attendance, quorum, minutes, and approvals', 'Turn decisions into accountable execution and reporting'],
      faq: [
        { q: 'Does the system support board structure, roles, and memberships?', a: 'Yes. It supports board composition, membership terms, roles, and permissions in a controlled governance record.' },
        { q: 'Does it support board minutes and approvals?', a: 'Yes. Minutes can be drafted, reviewed, approved, e-signed, and linked to decisions and attachments.' },
        { q: 'How are board decisions tracked?', a: 'Decisions become accountable tasks or execution items with owners, deadlines, status, and escalation signals.' },
        { q: 'Does it include AI support inside the workflow?', a: 'Yes. AI can help summarize meetings, extract decisions, suggest tasks, and improve decision clarity while final approval remains human-led.' },
        { q: 'Is it suitable for regulated organizations?', a: 'Yes. It supports audit trails, fine-grained permissions, timestamps, and controlled handling of sensitive governance records.' },
        { q: 'Does it support in-person, virtual, and hybrid meetings?', a: 'Yes. The operating model supports all three meeting modes.' },
      ],
      sections: [
        { id: 'who-for', title: 'Who it is for', body: ['This solution is designed for boards of directors, board secretariats, board committees, executive leadership, governance teams, and compliance stakeholders who need disciplined decision execution.'] },
        { id: 'what-it-solves', title: 'What it solves', body: ['It solves delayed minutes, scattered attachments, unclear accountability, weak execution tracking, fragmented records, and poor audit readiness across board operations.'] },
        { id: 'how-it-works', title: 'How it works', body: ['The workflow starts with board structure and memberships, then meeting planning and agendas, attendance and quorum, minutes and approvals, decision capture, task assignment, execution follow-up, and executive reporting.'] },
        { id: 'operational-pain', title: 'Current operational pain', body: ['Many boards still rely on email, disconnected files, and manual follow-up, which slows approvals and separates decisions from real execution accountability.'] },
        { id: 'solution', title: 'How Diwan Suite addresses it', body: ['The platform brings board members, agendas, attachments, minutes, decisions, tasks, and reports into one secure governance workflow with clear permissions and auditability.'] },
        { id: 'capabilities', title: 'Key capabilities', body: ['It supports board composition, memberships, agendas, attendance and quorum, minutes, e-signature, decision-to-task conversion, notifications, reporting, and enterprise integration.'] },
        { id: 'workflow', title: 'How the workflow operates', body: ['A board session is created, invitations are sent, attendance is recorded, discussions are documented, minutes are approved, decisions are issued, tasks are assigned, and execution status is tracked in one operating model.'] },
        { id: 'governance-impact', title: 'Governance, compliance, and audit impact', body: ['This improves board discipline, speeds up minutes approval, strengthens accountability, and makes governance oversight easier to evidence and review.'] },
        { id: 'proof', title: 'Operational proof points', body: ['Every decision can be linked to an owner, due date, supporting documents, and follow-up status, while approvals and document actions remain timestamped and searchable.'] },
        { id: 'outcomes', title: 'Executive outcomes', body: ['The result is not just better record keeping. It is a board process with clearer execution, stronger oversight, faster approvals, and more reliable governance reporting.'] },
      ],
      relatedPages: ['corporateSecretarySystem', 'decisionTracking', 'meetingMinutesEsignature']
},
    committeeManagementSoftware: {
      summary: 'Diwan Suite committee management software organizes committee structures, meetings, minutes, recommendations, and execution follow-up in one governed workflow built for institutional accountability.',
      seoTitle: 'Committee Management Software | Diwan Suite',
      seoDescription: 'Diwan Suite committee management software for committee memberships, meetings, minutes, recommendations, decisions, follow-up, and executive reporting in one auditable workflow.',
      definition: 'If your organization runs multiple standing or temporary committees and struggles to keep recommendations, approvals, and execution aligned, Diwan Suite provides a controlled workflow from committee setup to measurable follow-up.',
      whoFor: ['Standing and temporary committees', 'Committee secretariats and executive management', 'Compliance, internal audit, and follow-up teams'],
      whatItSolves: ['Committee work scattered across email and disconnected files', 'Weak ownership of recommendations and committee outputs', 'Poor visibility into committee discipline and execution status'],
      howItWorks: ['Structure committees, memberships, and permissions', 'Run meetings, minutes, recommendations, and voting when needed', 'Convert committee outputs into tasks, follow-up, and reporting'],
      faq: [
        { q: 'Does it support both standing and temporary committees?', a: 'Yes. Committees can be configured with memberships, terms, permissions, and historical records.' },
        { q: 'Can committee recommendations be linked to execution?', a: 'Yes. Recommendations and decisions can be turned into accountable tasks with owners, deadlines, and follow-up status.' },
        { q: 'Is it suitable for organizations with many parallel committees?', a: 'Yes. It gives leadership and secretariats a unified view while preserving role-based access and confidentiality.' },
        { q: 'Are committee performance reports available?', a: 'Yes. Reports can show attendance, approval speed, recommendations, and execution status across committees.' },
        { q: 'Does AI support this workflow?', a: 'Yes. AI can help summarize meetings, extract outcomes, and improve wording while final approval remains human-led.' },
      ],
      sections: [
        { id: 'who-for', title: 'Who it is for', body: ['This solution is designed for standing and temporary committees, committee secretariats, executive teams, and organizations that need disciplined committee governance and execution follow-up.'] },
        { id: 'what-it-solves', title: 'What it solves', body: ['It solves fragmented committee meetings and records, weak recommendation tracking, unclear accountability, and poor executive visibility into committee work.'] },
        { id: 'how-it-works', title: 'How it works', body: ['The workflow structures committee memberships and permissions, manages agendas and meetings, documents recommendations and decisions, and turns outcomes into follow-up and reporting.'] },
        { id: 'operational-pain', title: 'Where do committees usually break down?', body: ['Committees break down when their recommendations remain trapped in minutes or email instead of moving into accountable follow-up, ownership, and reporting.'] },
        { id: 'solution', title: 'How Diwan Suite addresses it', body: ['Diwan Suite links committee structure, meetings, minutes, recommendations, and execution so committee work becomes measurable, visible, and auditable.'] },
        { id: 'capabilities', title: 'Key capabilities', body: ['The solution covers memberships, meeting scheduling, minutes, voting, recommendations, decisions, follow-up, and reporting with permissions suited to each committee.'] },
        { id: 'workflow', title: 'How committee outputs move into execution', body: ['Recommendations are documented inside the committee record, routed for approval when needed, then converted into accountable actions and exposed in follow-up dashboards and reports.'] },
        { id: 'governance-impact', title: 'Governance and management impact', body: ['This improves committee discipline, reduces delays, strengthens accountability, and gives leadership clearer visibility into committee activity and execution.'] },
        { id: 'proof', title: 'Operational proof points', body: ['Each committee can be tracked by members, meetings, recommendations, execution status, minutes, and approvals in one searchable governed record.'] },
        { id: 'outcomes', title: 'Executive outcomes', body: ['The result is more disciplined committees, clearer recommendations, faster follow-up, better reporting, and stronger evidence of governance and compliance.'] },
      ],
      relatedPages: ['boardManagementSystem', 'corporateSecretarySystem', 'decisionTracking']
},
    generalAssemblyManagement: {
      summary: 'Diwan Suite general assembly management standardizes invitations, attendance, quorum, voting, minutes, approvals, and decisions in one governed workflow built for formal assembly readiness.',
      seoTitle: 'General Assembly Management | Diwan Suite',
      seoDescription: 'Diwan Suite general assembly management for invitations, quorum, attendance, voting, minutes, approvals, and decision follow-up in one auditable governance workflow.',
      definition: 'If your organization needs general assemblies to run with stronger procedural control from invitation to voting, minutes, approvals, and execution, Diwan Suite provides that path in one institutional workflow.',
      whoFor: ['Organizations that run ordinary or extraordinary general assemblies', 'Assembly secretariats, legal teams, and executive leadership', 'Governance and compliance teams that need quorum and voting evidence'],
      whatItSolves: ['Difficulty controlling invitations, attendance, quorum, and voting together', 'Delays in final minutes approval and formal result confirmation', 'Weak linkage between assembly decisions and execution follow-up'],
      howItWorks: ['Manage assembly planning, agenda, invitations, and attachments', 'Control attendance, quorum, voting, and minutes', 'Approve outputs and connect decisions to follow-up and reporting'],
      faq: [
        { q: 'Does it support quorum calculation and attendance evidence?', a: 'Yes. Attendance and quorum can be documented and linked to the minutes and voting outcomes in one controlled record.' },
        { q: 'Can voting be managed inside the assembly workflow?', a: 'Yes. Voting results can be documented and connected to agenda items and issued decisions.' },
        { q: 'Is it suitable for regular and extraordinary assemblies?', a: 'Yes. The workflow can be adapted to the type of assembly and the organization’s operating requirements.' },
        { q: 'Can assembly decisions be linked to execution?', a: 'Yes. Decisions can be converted into accountable follow-up items and measured after approval.' },
        { q: 'Does it improve audit and compliance readiness?', a: 'Yes. It provides a documented record of invitations, attendance, quorum, voting, minutes, approvals, and decisions.' },
      ],
      sections: [
        { id: 'who-for', title: 'Who it is for', body: ['This solution is designed for organizations that run ordinary or extraordinary general assemblies and need stronger procedural control, documentation, and follow-up.'] },
        { id: 'what-it-solves', title: 'What it solves', body: ['It solves the challenge of keeping invitations, attendance, quorum, voting, minutes, and approvals inside one governed process and reduces confusion around official outcomes.'] },
        { id: 'how-it-works', title: 'How it works', body: ['Assemblies are planned with agendas, invitations, and attachments, then attendance, quorum, and voting are controlled, and the minutes and decisions move into approval and follow-up.'] },
        { id: 'operational-pain', title: 'Why do general assemblies become difficult to manage?', body: ['Because assemblies combine formal invitation, quorum, voting, minutes, and approvals in one event, and any disconnect between those elements increases procedural and compliance risk.'] },
        { id: 'solution', title: 'How Diwan Suite addresses it', body: ['Diwan Suite unifies the general assembly workflow from preparation to approval and gives the organization a clear governed record of attendance, voting, minutes, and decisions.'] },
        { id: 'capabilities', title: 'Key capabilities', body: ['The solution covers invitations, attachments, attendance, quorum, voting, minutes, approvals, and linking decisions to follow-up and reporting.'] },
        { id: 'workflow', title: 'How the assembly runs inside the system', body: ['The assembly is created, invitations are sent, attendance is recorded, quorum is calculated, voting is documented, the minutes are approved, and decisions move into structured follow-up.'] },
        { id: 'governance-impact', title: 'Governance and procedural impact', body: ['This increases the reliability of assembly administration, strengthens formal evidence of quorum and approvals, and reduces procedural risk.'] },
        { id: 'proof', title: 'Operational proof points', body: ['The platform can show who attended, whether quorum was achieved, how voting occurred, which decisions were issued, and when final approval took place.'] },
        { id: 'outcomes', title: 'Executive outcomes', body: ['The result is more disciplined assemblies, clearer outcomes, faster approvals, and stronger follow-up on what the assembly decided.'] },
      ],
      relatedPages: ['boardManagementSystem', 'meetingMinutesEsignature', 'support']
},
    corporateSecretarySystem: {
      summary: 'Diwan Suite board secretary system helps the board office manage meetings, documents, minutes, approvals, decisions, and execution follow-up in one practical governance workflow.',
      seoTitle: 'Board Secretary System | Diwan Suite',
      seoDescription: 'Diwan Suite board secretary system for board meetings, records, minutes, approvals, decisions, and follow-up in one auditable governance workflow.',
      definition: 'If the board office carries the burden of coordinating meetings, documents, minutes, approvals, and decision follow-up, Diwan Suite provides one controlled system that reduces manual overhead and improves institutional discipline.',
      whoFor: ['Board secretaries and board office teams', 'Board chairs and members', 'Executive management, governance, and compliance stakeholders'],
      whatItSolves: ['Heavy manual coordination across people, documents, and approvals', 'Weak control over official versions of records and minutes', 'The burden of decision follow-up after meetings'],
      howItWorks: ['Prepare meetings, agendas, and attachments before the session', 'Manage minutes, approvals, and e-signature after the meeting', 'Track decisions, follow-up, and reporting from one board office view'],
      faq: [
        { q: 'How does this help the board secretary in practice?', a: 'It gives the board office one place to manage meetings, documents, minutes, approvals, decisions, and follow-up instead of relying on scattered tools.' },
        { q: 'Does it organize documents and attachments before the meeting?', a: 'Yes. Invitations, agendas, documents, and attachments can be linked to each meeting and agenda item as needed.' },
        { q: 'Does it help speed up minutes and approvals?', a: 'Yes. It structures minute preparation, review, approval, e-signature, and timestamping in one governance workflow.' },
        { q: 'Does it reduce the burden of post-meeting follow-up?', a: 'Yes. Decisions can be linked to owners, status, reminders, and reporting in one controlled view.' },
        { q: 'Are reports available for leadership and the board office?', a: 'Yes. Reports can show meetings, approvals, decisions, and execution status for both leadership and board office teams.' },
      ],
      sections: [
        { id: 'who-for', title: 'Who it is for', body: ['This solution is designed for board secretaries and board office teams responsible for meeting coordination, records, minutes, approvals, decisions, and executive follow-up.'] },
        { id: 'what-it-solves', title: 'What it solves', body: ['It solves heavy manual coordination, scattered records, delayed minutes, weak control over official versions, and the burden of following up on decisions after meetings.'] },
        { id: 'how-it-works', title: 'How it works', body: ['The workflow organizes the meeting, agenda, and supporting records, then supports minutes preparation and approval, then connects decisions to execution follow-up and reporting from one board office view.'] },
        { id: 'operational-pain', title: 'Where does the role consume the most effort?', body: ['The biggest effort is usually spent on gathering records, coordinating stakeholders, controlling official versions, and chasing post-meeting decisions and recommendations.'] },
        { id: 'solution', title: 'How Diwan Suite addresses it', body: ['Diwan Suite gives the board secretary one operating system for preparation, meeting administration, minutes, approvals, decisions, and follow-up, reducing repeated manual work and improving control.'] },
        { id: 'capabilities', title: 'Key capabilities', body: ['The solution covers invitations, attachments, agendas, minutes, approvals, e-signature, decisions, follow-up, and reporting.'] },
        { id: 'workflow', title: 'How the daily operating flow works', body: ['Meetings are prepared, records are organized, discussions are documented, minutes are approved, and decisions move into follow-up with updated reporting for the board office and leadership.'] },
        { id: 'governance-impact', title: 'Organizational and governance impact', body: ['This improves board office efficiency, reduces delays, strengthens audit readiness, and provides a more professional experience for board members and committees.'] },
        { id: 'proof', title: 'Operational proof points', body: ['The board office can track meeting status, minutes, approvals, decisions, and follow-up from one governed record instead of moving across email, files, and manual trackers.'] },
        { id: 'outcomes', title: 'Executive outcomes', body: ['The result is a more organized board office, faster approvals, clearer records, better decision follow-up, and stronger readiness for reporting and oversight.'] },
      ],
      relatedPages: ['boardManagementSystem', 'meetingMinutesEsignature', 'decisionTracking']
},
    meetingMinutesEsignature: {
      title: 'Meeting Minutes & E-Signature',
      summary: 'Diwan Suite standardizes meeting minutes and e-signature in one controlled workflow for drafting, review, approval, timestamping, and audit-ready final records.',
      seoTitle: 'Meeting Minutes & E-Signature | Diwan Suite',
      seoDescription: 'Diwan Suite meeting minutes and e-signature workflow for formal drafting, approvals, timestamping, e-signature, and preserving the final approved record.',
      definition: 'If your organization needs formal minutes that can be drafted, reviewed, approved, signed, and traced without email chaos or version confusion, Diwan Suite provides that process in one governed workflow.',
      whoFor: ['Board and committee secretariat', 'Executive management and legal stakeholders', 'Compliance, audit, and oversight-heavy organizations'],
      whatItSolves: ['Delayed minutes approval caused by fragmented reviews', 'Version confusion around the final approved record', 'Weak linkage between minutes, decisions, signatures, and audit evidence'],
      howItWorks: ['Draft the minutes in a controlled template linked to the meeting', 'Route them through review, approval, and e-signature', 'Preserve the final approved version with timestamps, records, and linked decisions'],
      faq: [
        { q: 'Can the workflow prevent edits after final approval?', a: 'Yes. The final approved record can be preserved in a controlled historical state.' },
        { q: 'Does it support e-signature and timestamping?', a: 'Yes. The workflow supports documented e-signature and approval-related timestamps.' },
        { q: 'Can users search minutes quickly?', a: 'Yes. Search can be structured by meeting, decision, member, date, or approval state.' },
        { q: 'Can minutes be linked to decisions and attachments?', a: 'Yes. Minutes remain connected to decisions, supporting files, and approval history in one record.' },
        { q: 'Is this suitable for regulated environments?', a: 'Yes. It improves record integrity, review traceability, and readiness for audit and compliance review.' },
      ],
      sections: [
        { id: 'who-for', title: 'Who it is for', body: ['This solution is designed for board and committee secretariats, executive teams, legal stakeholders, and organizations that need formal minutes with controlled approval and reliable retrieval.'] },
        { id: 'what-it-solves', title: 'What it solves', body: ['It addresses delayed minutes approval, scattered drafts, uncertainty around the final approved version, weak approval evidence, and poor linkage between minutes, decisions, and supporting records.'] },
        { id: 'how-it-works', title: 'How it works', body: ['The workflow starts with structured drafting, then routes the minutes through review, approval, e-signature, timestamping, and final record preservation within one controlled governance process.'] },
        { id: 'operational-pain', title: 'Why do minutes slow down in large organizations?', body: ['Because the document often moves through email, files, comments, and manual edits without one approval path, which creates delays, duplicate versions, and weak confidence in the final official record.'] },
        { id: 'solution', title: 'How Diwan Suite addresses it', body: ['Diwan Suite brings drafting, review, e-signature, timestamping, version control, and approval evidence into one workflow that keeps the formal minutes connected to decisions, attachments, and audit records.'] },
        { id: 'capabilities', title: 'Key capabilities', body: ['The solution supports controlled minute templates, flexible approval paths, e-signature, audit trails, advanced retrieval, and direct linkage to meetings, decisions, and supporting records.'] },
        { id: 'workflow', title: 'How minutes approval works', body: ['Minutes are drafted, reviewed, approved, electronically signed, and preserved as the official final version, while the workflow records who approved what and when.'] },
        { id: 'governance-impact', title: 'Governance and audit impact', body: ['This workflow improves record integrity, reduces ambiguity over final versions, speeds approvals, and gives audit and compliance teams stronger evidence of approval and control.'] },
        { id: 'proof', title: 'Operational proof points', body: ['The platform can show who drafted the minutes, who reviewed them, who approved them, when approval occurred, and which version became the official final record.'] },
        { id: 'outcomes', title: 'Executive outcomes', body: ['The result is faster minutes approval, stronger record control, fewer human errors, and better readiness for audit, governance, and regulatory review.'] },
      ],
      relatedPages: ['corporateSecretarySystem', 'decisionTracking', 'securityCompliance']
},
    decisionTracking: {
      title: 'Decision Management & Tracking',
      summary: 'Diwan Suite decision management and tracking links every board or committee decision to an owner, due date, reminders, execution status, and closure evidence so decisions do not stop at the minutes.',
      seoTitle: 'Decision Management & Tracking | Diwan Suite',
      seoDescription: 'Diwan Suite decision management and tracking turns board and committee decisions into accountable execution items with owners, reminders, escalation, and executive reporting.',
      definition: 'If your organization approves decisions in meetings but loses control of them after the session ends, Diwan Suite turns each approved decision into a governed execution item with ownership, timing, reminders, reporting, and closure evidence.',
      whoFor: ['Board and committee secretariat', 'Executive management and follow-up teams', 'Compliance, internal audit, and decision-makers'],
      whatItSolves: ['Decisions that lose ownership after the meeting', 'Weak visibility into execution progress, delays, and blockers', 'No reliable closure trail for approved board or committee decisions'],
      howItWorks: ['Register the approved decision against the meeting record', 'Assign an owner, due date, priority, and reminder logic', 'Track execution status, escalation, and closure through governance reporting'],
      faq: [
        { q: 'Can every decision be assigned to a named owner?', a: 'Yes. Each decision can be assigned to an accountable owner with a due date, priority, and follow-up state.' },
        { q: 'Does the workflow support reminders and escalation?', a: 'Yes. It supports automated reminders, approaching-deadline alerts, and escalation when execution slips.' },
        { q: 'Are executive reports available?', a: 'Yes. Reports can show execution rates, overdue decisions, open versus closed items, and accountability trends across teams.' },
        { q: 'Can decisions be linked back to minutes and attachments?', a: 'Yes. Decisions stay connected to the approved meeting record, the minutes, and supporting documents.' },
        { q: 'Does AI help inside this workflow?', a: 'Yes. AI can help summarize outcomes, suggest execution tasks, and detect early delay signals while final governance judgment remains human-led.' },
      ],
      sections: [
        { id: 'who-for', title: 'Who it is for', body: ['This solution is built for board and committee secretariats, executive follow-up teams, compliance stakeholders, and leaders who need decisions to move into visible execution.'] },
        { id: 'what-it-solves', title: 'What it solves', body: ['It solves the gap between decision approval and real execution by making ownership, deadlines, progress, and closure visible instead of leaving them buried in minutes or email.'] },
        { id: 'how-it-works', title: 'How it works', body: ['Once approved, a decision is recorded, assigned to an owner, linked to a due date and priority, then tracked through reminders, escalation, dashboards, and closure evidence.'] },
        { id: 'operational-pain', title: 'Where do decisions get lost after the meeting?', body: ['They get lost when the decision remains a sentence in the minutes without ownership, follow-up rules, a status view, or a clear escalation model.'] },
        { id: 'solution', title: 'How Diwan Suite addresses it', body: ['Diwan Suite turns the approved decision into an accountable execution item that can be tracked, measured, reminded, escalated, and closed with supporting evidence.'] },
        { id: 'capabilities', title: 'Key capabilities', body: ['The workflow supports owner assignment, due dates, priorities, reminders, escalation, execution dashboards, closure records, and linkage to meeting context and supporting documents.'] },
        { id: 'workflow', title: 'How a decision turns into execution', body: ['The decision is captured in the approved record, assigned to an accountable owner, tracked through progress signals, surfaced in reporting, and finally closed with evidence of completion.'] },
        { id: 'governance-impact', title: 'Governance and execution impact', body: ['This raises accountability, reduces forgotten actions, exposes delay risk earlier, and gives leadership clearer insight into how decisions move across the organization.'] },
        { id: 'proof', title: 'Operational proof points', body: ['The platform can show who owns the decision, when it is due, whether it is delayed, what actions were taken, and what closure evidence exists for review.'] },
        { id: 'outcomes', title: 'Executive outcomes', body: ['The result is fewer lost decisions, stronger accountability, better execution reporting, earlier intervention, and clearer evidence that governance decisions are actually being implemented.'] },
      ],
      relatedPages: ['boardManagementSystem', 'governanceReportsDashboards', 'roiBoardGovernance']
},
    governmentGovernance: {
      summary: 'A page showing how Diwan Suite supports governance for government entities through structured invitations, minutes, decisions, committees, and compliance-ready reporting.',
      seoDescription: 'Governance for government entities in Diwan Suite covering meetings, minutes, decisions, audit readiness, and executive reporting in a controlled operating model.',
      definition: 'Governance for government entities requires a controlled digital workflow that balances speed, documented approvals, policy discipline, and auditability.',
      whatItSolves: ['Scattered approvals and manual correspondence', 'Difficulty proving procedural compliance', 'Weak centralization of governance records'],
      relatedPages: ['securityCompliance', 'governanceReportsDashboards', 'implementationSupportTraining']
},
    listedCompaniesGovernance: {
      summary: 'A focused page for listed-company governance, covering faster minutes approval, decision accountability, transparent records, and stronger reporting readiness.',
      seoDescription: 'Listed-company governance in Diwan Suite with faster minutes approval, decision follow-up, clearer board records, and stronger readiness for governance oversight.',
      definition: 'Governance for listed companies requires disciplined records for board and committee cycles, approvals, execution tracking, and transparent governance evidence.',
      relatedPages: ['boardManagementSystem', 'governanceReportsDashboards', 'governanceSecurityCompliance']
},
    bankingGovernance: {
      summary: 'A page explaining how Diwan Suite supports banks and regulated financial institutions with controlled permissions, auditable workflows, and governance reporting.',
      seoDescription: 'Governance for banks in Diwan Suite with controlled access, audit trails, minutes approval, decision tracking, and executive oversight reporting.',
      definition: 'Governance for banks requires stronger discipline around confidentiality, access control, approvals, traceability, and compliance evidence.',
      relatedPages: ['securityCompliance', 'boardManagementSystem', 'governanceReportsDashboards']
},
    securityCompliance: {
      summary: 'A trust page covering protection layers, permissions, audit trails, backup, recovery, and readiness for regulated or high-sensitivity environments.',
      seoDescription: 'Security and compliance in Diwan Suite with granular permissions, encryption, audit trails, and flexible cloud or on-premise deployment options.',
      definition: 'Security and compliance in Diwan Suite covers access control, data protection, traceability, retention, backup, and operational readiness for regulated environments.',
      whoFor: ['Cybersecurity teams', 'Compliance and internal audit', 'IT and board office stakeholders'],
      whatItSolves: ['Weak visibility into access and changes', 'The need for reliable audit evidence', 'The need for stronger control over deployment and data residency'],
      howItWorks: ['Configure permissions and role boundaries', 'Retain auditable activity and approval records', 'Support reporting for governance and compliance review'],
      faq: [
        { q: 'Does the system support granular permissions?', a: 'Yes. Access can be controlled by role, board, committee, and content sensitivity.' },
        { q: 'Is an audit trail available?', a: 'Yes. The platform retains activity and approval logs that support review and compliance.' },
        { q: 'Are cloud and on-premise models supported?', a: 'Yes. Deployment can be aligned with organizational policy and hosting requirements.' },
      ],
      relatedPages: ['governanceSecurityCompliance', 'implementationSupportTraining', 'support']
},
    aiGovernanceAssistant: {
      summary: 'Diwan Suite AI Agent transforms meeting dialogue into actionable minutes, decisions, and executable tasks. After meetings end, it transcribes conversations, identifies speakers, summarizes discussions, extracts decisions, drafts minutes, and converts recommendations into action items with owners and due dates.',
      seoDescription: 'Diwan Suite AI Agent transforms meetings into minutes, decisions, and action items. Integrates with Google Meet, Zoom, Webex, and Microsoft Teams to accelerate governance and improve compliance.',
      definition: 'Diwan Suite AI Agent is an intelligent execution layer that begins after meetings conclude to transform dialogue into actionable outcomes, while keeping review and final approval with humans.',
      whoFor: ['Board and committee secretariat', 'Governance and compliance teams', 'Executive management and follow-up units'],
      whatItSolves: ['Slow minutes preparation after meetings', 'Difficulty extracting decisions and tasks manually', 'Lost recommendations between meeting and execution', 'Need for intelligent follow-up tracking'],
      howItWorks: ['Transcribe meeting and identify speakers', 'Summarize discussions and extract decisions', 'Prepare draft minutes ready for review', 'Convert recommendations into tasks with clear ownership', 'Track execution and due dates', 'Smart archival linked to meeting record'],
      integrations: ['Google Meet', 'Zoom', 'Webex', 'Microsoft Teams'],
      faq: [
        { q: 'How does the AI Agent help after meetings?', a: 'It transcribes the meeting, identifies speakers, summarizes discussions, extracts decisions, drafts minutes, and converts recommendations into actionable tasks.' },
        { q: 'Does it prepare draft minutes?', a: 'Yes. It prepares formatted, comprehensive draft minutes ready for review and approval within minutes, not hours.' },
        { q: 'Can it identify speakers?', a: 'Yes. It automatically recognizes each speaker and links their contributions to their profile in the platform.' },
        { q: 'Does it extract decisions and recommendations?', a: 'Yes. It analyzes discussions and extracts decisions and recommendations with clear wording.' },
        { q: 'Does it convert recommendations into action items?', a: 'Yes. It converts each decision or recommendation into a task linked to an owner and due date.' },
        { q: 'Does it support Google Meet, Zoom, Teams, and Webex?', a: 'Yes. It integrates with all four platforms to import meeting content.' },
        { q: 'Is it suitable for boards and committees?', a: 'Yes. It is designed specifically for high-governance meetings like board meetings, committees, and general assemblies.' },
      ],
      relatedPages: ['aiGovernanceDecisionSupport', 'meetingMinutesEsignature', 'decisionTracking', 'integrationsBoardGovernance']
},
    governanceReports: {
      summary: 'A page focused on governance reporting for attendance, quorum, minutes approval, decision execution, and executive dashboards for board leadership.',
      seoDescription: 'Governance reports in Diwan Suite covering attendance, quorum, minutes approval speed, decision execution metrics, and leadership-ready dashboards.',
      definition: 'Governance reporting consolidates board, committee, and execution indicators into concise views for executive oversight and review readiness.',
      whoFor: ['CEOs and board offices', 'Board and committee secretariat', 'Compliance and internal audit'],
      whatItSolves: ['No instant visibility into decision status', 'Manual preparation of executive reports', 'Weak consistency in governance performance indicators'],
      howItWorks: ['Collect structured meeting and execution data', 'Present dashboards and summary indicators', 'Support export and sharing based on permissions'],
      faq: [
        { q: 'What kinds of reports are available?', a: 'Attendance, quorum, minutes, decision execution, delays, and governance readiness views can be reported.' },
        { q: 'Are the reports suitable for executive leadership?', a: 'Yes. The reports are designed for concise executive reading with room for deeper drill-down.' },
        { q: 'Can reports be exported or shared?', a: 'Yes. Export and controlled sharing can be enabled according to policy and permissions.' },
      ],
      relatedPages: ['governanceReportsDashboards', 'roiBoardGovernance', 'decisionTracking']
},
    support: {
      summary: 'A support and enablement page covering launch planning, user training, service channels, and continuous improvement after go-live.',
      seoDescription: 'Support and enablement in Diwan Suite covering implementation readiness, training, support channels, consulting, and post-launch improvement.',
      definition: 'Support and enablement in Diwan Suite connects launch readiness, user capability building, technical support, and continuous improvement planning.',
      whoFor: ['Transformation and project teams', 'IT teams', 'Board office administrators and power users'],
      whatItSolves: ['Slow user adoption after launch', 'The need for structured role-based training', 'The need for a clear support and improvement path'],
      howItWorks: ['Plan implementation and environment readiness', 'Deliver training and operating playbooks', 'Provide ongoing support and improvement cycles'],
      faq: [
        { q: 'Is structured user training available?', a: 'Yes. Training can be organized by role, process, and adoption maturity.' },
        { q: 'Are support channels available?', a: 'Yes. Support channels and response models can be aligned to the agreed service scope.' },
        { q: 'Can advisory support continue after go-live?', a: 'Yes. Post-launch advisory and optimization support can be provided as needed.' },
      ],
      relatedPages: ['implementationSupportTraining', 'about', 'securityCompliance']
}
},

  hi: {
    boardManagementSystem: {
      summary: 'Diwan Suite की बोर्ड प्रबंधन प्रणाली बोर्ड संरचना, बैठक आमंत्रण, कार्यवृत्त अनुमोदन, ई-हस्ताक्षर, निर्णय निष्पादन और मापनीय अनुवर्ती को एक ही संस्थागत वातावरण में व्यवस्थित करती है।',
      seoTitle: 'बोर्ड प्रबंधन प्रणाली | Diwan Suite',
      seoDescription: 'Diwan Suite की बोर्ड प्रबंधन प्रणाली बोर्ड संरचना, एजेंडा, उपस्थिति, quorum, कार्यवृत्त, अनुमोदन, निर्णय, अनुवर्ती और रिपोर्टिंग को एक audit-ready गवर्नेंस कार्यप्रवाह में जोड़ती है।',
      definition: 'यदि आपकी संस्था को ऐसा सिस्टम चाहिए जो बोर्ड संचालन को बिखरे हुए प्रशासन से नियंत्रित डिजिटल गवर्नेंस प्रक्रिया में बदल दे, तो Diwan Suite वही ढांचा प्रदान करता है जो बोर्ड, बैठक, कार्यवृत्त, निर्णय और निष्पादन को एक ही रिकॉर्ड में जोड़ता है।',
      whoFor: ['Boards of directors और secretariat टीमें', 'Committees और executive leadership', 'Governance, compliance और internal audit हितधारक'],
      whatItSolves: ['Delayed minutes और fragmented approvals', 'Scattered attachments और board records', 'Decision execution की कमजोर जवाबदेही'],
      howItWorks: ['Board structure और memberships व्यवस्थित करें', 'Agenda, attendance, quorum, minutes और approvals नियंत्रित करें', 'Decisions को accountable execution और reporting में बदलें'],
      faq: [
        { q: 'क्या यह board structure, roles और memberships का समर्थन करता है?', a: 'हाँ, यह board composition, terms, roles और permissions को नियंत्रित तरीके से संभालता है।' },
        { q: 'क्या यह board minutes और approvals का समर्थन करता है?', a: 'हाँ, minutes तैयार, समीक्षा, अनुमोदित और e-sign किए जा सकते हैं।' },
        { q: 'निर्णयों को कैसे ट्रैक किया जाता है?', a: 'निर्णय जिम्मेदार tasks या execution items में बदल जाते हैं जिनमें owner, deadline और status होता है।' },
        { q: 'क्या इसमें AI सहायता है?', a: 'हाँ, AI summaries, decision extraction, task suggestions और decision clarity में मदद करता है, जबकि अंतिम approval मानव के पास रहता है।' },
        { q: 'क्या यह regulated संस्थाओं के लिए उपयुक्त है?', a: 'हाँ, यह audit trail, permissions, timestamping और sensitive records control का समर्थन करता है।' },
        { q: 'क्या यह hybrid और virtual meetings का समर्थन करता है?', a: 'हाँ, यह तीनों meeting modes के लिए उपयुक्त है।' },
      ],
      sections: [
        { id: 'who-for', title: 'किसके लिए', body: ['यह समाधान boards of directors, board secretariats, committees, executive leadership, governance teams और compliance stakeholders के लिए है।'] },
        { id: 'what-it-solves', title: 'यह क्या हल करता है', body: ['यह delayed minutes, बिखरे attachments, अस्पष्ट जवाबदेही, कमजोर execution tracking और audit readiness की कमी को हल करता है।'] },
        { id: 'how-it-works', title: 'यह कैसे काम करता है', body: ['प्रक्रिया board structure और memberships से शुरू होकर agenda, attendance, quorum, minutes, approvals, decision capture, task assignment और executive reporting तक जाती है।'] },
        { id: 'operational-pain', title: 'मौजूदा परिचालन चुनौतियाँ', body: ['कई boards अब भी email, disconnected files और manual follow-up पर निर्भर हैं, जिससे approvals धीमे होते हैं और decisions execution से कट जाते हैं।'] },
        { id: 'solution', title: 'Diwan Suite कैसे समाधान देता है', body: ['यह board members, agendas, attachments, minutes, decisions, tasks और reports को एक ही secure governance workflow में लाता है।'] },
        { id: 'capabilities', title: 'मुख्य क्षमताएँ', body: ['बोर्ड संरचना, memberships, agendas, attendance, quorum, minutes, e-signature, decision-to-task conversion, notifications, reporting और integration.'] },
        { id: 'workflow', title: 'प्रक्रिया कैसे चलती है', body: ['session बनाया जाता है, invitations भेजे जाते हैं, attendance दर्ज होती है, discussions documented होती हैं, minutes approve होते हैं, decisions issue होते हैं और execution tracked रहती है।'] },
        { id: 'governance-impact', title: 'गवर्नेंस, अनुपालन और ऑडिट प्रभाव', body: ['इससे board discipline बेहतर होता है, approvals तेज़ होते हैं, accountability मजबूत होती है और governance oversight आसान बनता है।'] },
        { id: 'proof', title: 'प्रचालन प्रमाण', body: ['हर decision को owner, due date, supporting records और follow-up status से जोड़ा जा सकता है, जबकि approvals timestamped और searchable रहते हैं।'] },
        { id: 'outcomes', title: 'कार्यकारी परिणाम', body: ['परिणाम केवल बेहतर record keeping नहीं, बल्कि अधिक स्पष्ट execution, तेज़ approvals और बेहतर governance reporting है।'] },
      ],
      relatedPages: ['corporateSecretarySystem', 'decisionTracking', 'meetingMinutesEsignature']
},
    committeeManagementSoftware: {
      summary: 'Diwan Suite समिति प्रबंधन समाधान समितियों की संरचना, बैठकों, कार्यवृत्त, सिफारिशों और निष्पादन अनुवर्ती को एक नियंत्रित गवर्नेंस कार्यप्रवाह में संगठित करता है।',
      seoTitle: 'समिति प्रबंधन सॉफ़्टवेयर | Diwan Suite',
      seoDescription: 'Diwan Suite समिति प्रबंधन सॉफ़्टवेयर समितियों की सदस्यता, बैठकें, कार्यवृत्त, सिफारिशें, निर्णय, फॉलो-अप और रिपोर्टिंग को एक audit-ready workflow में संगठित करता है।',
      definition: 'यदि आपकी संस्था कई स्थायी या अस्थायी समितियाँ चलाती है और सिफारिशों, अनुमोदनों और निष्पादन को एक साथ रखना कठिन हो रहा है, तो Diwan Suite समिति संरचना से लेकर मापनीय follow-up तक एक नियंत्रित workflow प्रदान करता है।',
      whoFor: ['स्थायी और अस्थायी समितियाँ', 'समिति सचिवालय और executive management', 'Compliance, internal audit और follow-up टीमें'],
      whatItSolves: ['ईमेल और अलग-अलग files में बिखरा समिति कार्य', 'Recommendations और outputs की कमजोर ownership', 'समितियों के अनुशासन और execution status पर कमजोर visibility'],
      howItWorks: ['समितियों, memberships और permissions को संरचित करें', 'Meetings, minutes, recommendations और voting को प्रबंधित करें', 'Outputs को tasks, follow-up और reporting में बदलें'],
      sections: [
        { id: 'who-for', title: 'किसके लिए', body: ['यह समाधान स्थायी और अस्थायी समितियों, समिति सचिवालयों और उन संस्थाओं के लिए है जिन्हें समिति शासन और निष्पादन पर बेहतर नियंत्रण चाहिए।'] },
        { id: 'what-it-solves', title: 'यह क्या हल करता है', body: ['यह बिखरी हुई समिति meetings, unclear accountability, weak recommendation tracking और committee performance पर सीमित executive visibility को हल करता है।'] },
        { id: 'how-it-works', title: 'यह कैसे काम करता है', body: ['Workflow समितियों की संरचना, agenda, meetings, minutes, recommendations और follow-up को एक नियंत्रित प्रणाली में जोड़ता है।'] },
        { id: 'operational-pain', title: 'समितियाँ कहाँ टूटती हैं?', body: ['जब recommendations minutes या email तक सीमित रह जाती हैं और ownership, execution और reporting से नहीं जुड़तीं।'] },
        { id: 'solution', title: 'Diwan Suite कैसे समाधान देता है', body: ['Diwan Suite committee structure, meetings, minutes, recommendations और execution को जोड़कर committee work को measurable और auditable बनाता है।'] },
        { id: 'capabilities', title: 'मुख्य क्षमताएँ', body: ['Memberships, scheduling, minutes, voting, recommendations, decisions, follow-up और reporting.'] },
        { id: 'workflow', title: 'समिति के outputs execution में कैसे जाते हैं', body: ['Recommendations record होती हैं, approval path में जाती हैं, फिर accountable actions में बदलकर dashboards और reports में दिखाई देती हैं।'] },
        { id: 'governance-impact', title: 'गवर्नेंस और प्रबंधन प्रभाव', body: ['इससे committee discipline बढ़ता है, delays कम होते हैं, accountability मजबूत होती है और leadership को बेहतर visibility मिलती है।'] },
        { id: 'proof', title: 'प्रचालन प्रमाण', body: ['हर समिति को members, meetings, recommendations, execution status, minutes और approvals के आधार पर track किया जा सकता है।'] },
        { id: 'outcomes', title: 'कार्यकारी परिणाम', body: ['परिणाम है अधिक अनुशासित समितियाँ, स्पष्ट recommendations, तेज़ follow-up और बेहतर governance evidence।'] },
      ],
      faq: [
        { q: 'क्या यह स्थायी और अस्थायी दोनों समितियों का समर्थन करता है?', a: 'हाँ, memberships, terms और permissions के साथ दोनों प्रकार की समितियाँ कॉन्फ़िगर की जा सकती हैं।' },
        { q: 'क्या recommendations को execution से जोड़ा जा सकता है?', a: 'हाँ, recommendations और decisions को owners, deadlines और status वाले accountable tasks में बदला जा सकता है।' },
        { q: 'क्या कई parallel committees के लिए यह उपयोगी है?', a: 'हाँ, यह role-based access बनाए रखते हुए एक unified executive view देता है।' },
        { q: 'क्या committee performance reports उपलब्ध हैं?', a: 'हाँ, attendance, approvals, recommendations और execution status पर reports उपलब्ध हैं।' },
        { q: 'क्या AI इस workflow का समर्थन करता है?', a: 'हाँ, AI summaries, outcome extraction और wording support में मदद कर सकता है जबकि अंतिम approval मानव के पास रहता है।' },
      ],
      relatedPages: ['boardManagementSystem', 'corporateSecretarySystem', 'decisionTracking']
},
    generalAssemblyManagement: {
      summary: 'Diwan Suite सामान्य सभा प्रबंधन invitations, attendance, quorum, voting, minutes, approvals और decisions को एक संस्थागत governance workflow में व्यवस्थित करता है।',
      seoTitle: 'सामान्य सभा प्रबंधन | Diwan Suite',
      seoDescription: 'Diwan Suite सामान्य सभा प्रबंधन invitations, quorum, attendance, voting, minutes, approvals और decision follow-up को एक audit-ready workflow में नियंत्रित करता है।',
      definition: 'यदि आपकी संस्था को सामान्य सभाओं को invitation से voting, minutes approval और decision follow-up तक अधिक नियंत्रित तरीके से चलाने की आवश्यकता है, तो Diwan Suite यही institutional workflow प्रदान करता है।',
      whoFor: ['संगठन जो नियमित या extraordinary general assemblies चलाते हैं', 'Assembly secretariats, legal teams और executive leadership', 'Governance और compliance टीमें'],
      whatItSolves: ['Invitations, attendance, quorum और voting को एक साथ नियंत्रित करने की कठिनाई', 'Final minutes approval में देरी', 'Assembly decisions और execution follow-up के बीच कमजोर linkage'],
      howItWorks: ['Assembly planning, agenda, invitations और attachments प्रबंधित करें', 'Attendance, quorum, voting और minutes नियंत्रित करें', 'Approved decisions को follow-up और reporting से जोड़ें'],
      sections: [
        { id: 'who-for', title: 'किसके लिए', body: ['यह समाधान उन संगठनों के लिए है जो सामान्य सभाएँ चलाते हैं और procedural control, documentation और follow-up को मजबूत करना चाहते हैं।'] },
        { id: 'what-it-solves', title: 'यह क्या हल करता है', body: ['यह invitations, attendance, quorum, voting, minutes और approvals को एक governed process में रखता है और official outcomes पर भ्रम कम करता है।'] },
        { id: 'how-it-works', title: 'यह कैसे काम करता है', body: ['Assembly agenda, invitations और attachments से शुरू होती है, फिर attendance, quorum और voting नियंत्रित होते हैं, और अंत में minutes और decisions approval व follow-up में जाते हैं।'] },
        { id: 'operational-pain', title: 'सामान्य सभाएँ जटिल क्यों हो जाती हैं?', body: ['क्योंकि वे formal invitation, quorum, voting, minutes और approvals को एक साथ जोड़ती हैं, और इनके बीच disconnect procedural risk बढ़ा देता है।'] },
        { id: 'solution', title: 'Diwan Suite कैसे समाधान देता है', body: ['Diwan Suite preparation से approval तक पूरी general assembly को एकीकृत करता है और attendance, voting, minutes और decisions का clear governed record देता है।'] },
        { id: 'capabilities', title: 'मुख्य क्षमताएँ', body: ['Invitations, attachments, attendance, quorum, voting, minutes, approvals और decisions को follow-up व reporting से जोड़ना.'] },
        { id: 'workflow', title: 'सिस्टम के भीतर सभा कैसे चलती है', body: ['Assembly create होती है, invitations भेजे जाते हैं, attendance record होती है, quorum calculate होता है, voting document होती है और decisions follow-up में जाते हैं।'] },
        { id: 'governance-impact', title: 'गवर्नेंस और प्रक्रियात्मक प्रभाव', body: ['इससे assembly administration अधिक भरोसेमंद होती है, formal evidence मजबूत होता है और procedural risk कम होता है।'] },
        { id: 'proof', title: 'प्रचालन प्रमाण', body: ['Platform दिखा सकता है कि कौन उपस्थित था, quorum पूरा हुआ या नहीं, voting कैसे हुई और final approvals कब हुए।'] },
        { id: 'outcomes', title: 'कार्यकारी परिणाम', body: ['परिणाम है अधिक अनुशासित assemblies, स्पष्ट outcomes, तेज़ approvals और decisions पर बेहतर follow-up।'] },
      ],
      faq: [
        { q: 'क्या यह quorum calculation और attendance evidence को समर्थन देता है?', a: 'हाँ, attendance और quorum को minutes और voting outcomes से जोड़ा जा सकता है।' },
        { q: 'क्या voting workflow के भीतर प्रबंधित की जा सकती है?', a: 'हाँ, voting results को agenda items और issued decisions से जोड़ा जा सकता है।' },
        { q: 'क्या यह regular और extraordinary assemblies के लिए उपयुक्त है?', a: 'हाँ, workflow assembly type और operating requirements के अनुसार अनुकूलित किया जा सकता है।' },
        { q: 'क्या assembly decisions को execution से जोड़ा जा सकता है?', a: 'हाँ, decisions को accountable follow-up items में बदला जा सकता है।' },
        { q: 'क्या यह audit और compliance readiness को बेहतर बनाता है?', a: 'हाँ, यह invitations, attendance, quorum, voting, minutes, approvals और decisions का documented record देता है।' },
      ],
      relatedPages: ['boardManagementSystem', 'meetingMinutesEsignature', 'support']
},
    corporateSecretarySystem: {
      summary: 'Diwan Suite बोर्ड सचिव प्रणाली board office को meetings, records, minutes, approvals, decisions और execution follow-up को एक practical governance workflow में प्रबंधित करने में मदद करती है।',
      seoTitle: 'बोर्ड सचिव प्रणाली | Diwan Suite',
      seoDescription: 'Diwan Suite बोर्ड सचिव प्रणाली board meetings, records, minutes, approvals, decisions और follow-up को एक audit-ready governance workflow में संगठित करती है।',
      definition: 'यदि board office पर meetings, documents, minutes, approvals और decision follow-up का भारी दबाव है, तो Diwan Suite एक नियंत्रित operating system देता है जो manual overhead कम करता है और institutional discipline बढ़ाता है।',
      whoFor: ['Board secretaries और board office टीमें', 'Board chairs और members', 'Executive management, governance और compliance stakeholders'],
      whatItSolves: ['People, documents और approvals के बीच भारी manual coordination', 'Official versions और records पर कमजोर नियंत्रण', 'Post-meeting decision follow-up का दबाव'],
      howItWorks: ['Session से पहले meetings, agendas और attachments तैयार करें', 'Meeting के बाद minutes, approvals और e-signature प्रबंधित करें', 'Board office view से decisions, follow-up और reporting track करें'],
      sections: [
        { id: 'who-for', title: 'किसके लिए', body: ['यह समाधान board secretaries और board office teams के लिए है जो meetings, records, minutes, approvals, decisions और follow-up का संस्थागत समन्वय करती हैं।'] },
        { id: 'what-it-solves', title: 'यह क्या हल करता है', body: ['यह manual coordination, scattered records, delayed minutes, weak version control और post-meeting follow-up burden को हल करता है।'] },
        { id: 'how-it-works', title: 'यह कैसे काम करता है', body: ['Workflow meeting preparation, agenda, attachments, minutes approval और decision follow-up को एक ही board office view में जोड़ता है।'] },
        { id: 'operational-pain', title: 'सबसे अधिक मेहनत कहाँ लगती है?', body: ['अधिकांश समय records इकट्ठा करने, stakeholders को समन्वित करने, official versions नियंत्रित करने और decisions का पीछा करने में खर्च होता है।'] },
        { id: 'solution', title: 'Diwan Suite कैसे समाधान देता है', body: ['Diwan Suite board secretary को तैयारी, administration, minutes, approvals, decisions और follow-up के लिए एक unified system देता है।'] },
        { id: 'capabilities', title: 'मुख्य क्षमताएँ', body: ['Invitations, attachments, agendas, minutes, approvals, e-signature, decisions, follow-up और reporting.'] },
        { id: 'workflow', title: 'दैनिक संचालन प्रवाह कैसे चलता है', body: ['Meetings तैयार की जाती हैं, records संगठित होते हैं, discussions documented होती हैं, minutes approve होते हैं और decisions updated reporting के साथ follow-up में जाते हैं।'] },
        { id: 'governance-impact', title: 'संगठनात्मक और गवर्नेंस प्रभाव', body: ['इससे board office की efficiency बढ़ती है, delays कम होते हैं, audit readiness मजबूत होती है और board members के लिए अधिक professional experience बनता है।'] },
        { id: 'proof', title: 'प्रचालन प्रमाण', body: ['Board office meeting status, minutes, approvals, decisions और follow-up को email व manual trackers के बजाय एक governed record से track कर सकता है।'] },
        { id: 'outcomes', title: 'कार्यकारी परिणाम', body: ['परिणाम है अधिक संगठित board office, तेज़ approvals, स्पष्ट records, बेहतर decision follow-up और stronger reporting readiness।'] },
      ],
      faq: [
        { q: 'यह board secretary की व्यावहारिक रूप से कैसे मदद करता है?', a: 'यह meetings, documents, minutes, approvals, decisions और follow-up को एक ही जगह प्रबंधित करने देता है।' },
        { q: 'क्या यह meeting से पहले documents और attachments व्यवस्थित करता है?', a: 'हाँ, invitations, agendas, documents और attachments को प्रत्येक meeting और agenda item से जोड़ा जा सकता है।' },
        { q: 'क्या यह minutes और approvals को तेज़ करता है?', a: 'हाँ, यह minute preparation, review, approval, e-signature और timestamping को संरचित करता है।' },
        { q: 'क्या यह post-meeting follow-up का burden कम करता है?', a: 'हाँ, decisions को owners, status, reminders और reporting से जोड़ा जा सकता है।' },
        { q: 'क्या leadership और board office के लिए reports उपलब्ध हैं?', a: 'हाँ, meetings, approvals, decisions और execution status पर reports उपलब्ध हैं।' },
      ],
      relatedPages: ['boardManagementSystem', 'meetingMinutesEsignature', 'decisionTracking']
},
    meetingMinutesEsignature: {
      title: 'मीटिंग मिनट्स और ई-हस्ताक्षर',
      summary: 'Diwan Suite मीटिंग मिनट्स और ई-हस्ताक्षर को एक नियंत्रित workflow में लाता है, जहाँ drafting, review, approval, timestamping और final record preservation एक ही governance path में होता है।',
      seoTitle: 'मीटिंग मिनट्स और ई-हस्ताक्षर | Diwan Suite',
      seoDescription: 'Diwan Suite मीटिंग मिनट्स और ई-हस्ताक्षर workflow औपचारिक drafting, approval, timestamping, e-signature और final approved record के नियंत्रण के लिए।',
      definition: 'यदि आपकी संस्था को ऐसे औपचारिक मिनट्स चाहिए जो review, approval, signing और retrieval के लिए एक नियंत्रित डिजिटल workflow में चलें, तो Diwan Suite वही governed process प्रदान करता है।',
      whoFor: ['Board और committee secretariat', 'Executive management और legal stakeholders', 'Compliance, audit और oversight-heavy organizations'],
      whatItSolves: ['Fragmented reviews के कारण delayed minutes approval', 'Final approved version पर confusion', 'Minutes, decisions, signatures और audit evidence के बीच weak linkage'],
      howItWorks: ['Meeting-linked structured template में minutes तैयार करें', 'Review, approval और e-signature workflow चलाएँ', 'Final version को timestamp और approval history सहित सुरक्षित रखें'],
      faq: [
        { q: 'क्या final approval के बाद edits रोके जा सकते हैं?', a: 'हाँ, final approved record को controlled historical state में सुरक्षित रखा जा सकता है।' },
        { q: 'क्या e-signature और timestamping उपलब्ध है?', a: 'हाँ, workflow documented e-signature और approval timestamps को support करता है।' },
        { q: 'क्या मिनट्स को जल्दी खोजा जा सकता है?', a: 'हाँ, search meeting, decision, member, date या approval state के आधार पर की जा सकती है।' },
        { q: 'क्या मिनट्स decisions और attachments से जुड़े रहते हैं?', a: 'हाँ, minutes decisions, supporting files और approval history से एक ही record में जुड़े रहते हैं।' },
        { q: 'क्या यह regulated environments के लिए उपयुक्त है?', a: 'हाँ, यह record integrity, approval traceability और audit readiness को मजबूत करता है।' },
      ],
      sections: [
        { id: 'who-for', title: 'किसके लिए', body: ['यह समाधान board और committee secretariat, executive teams, legal stakeholders और उन संस्थाओं के लिए है जिन्हें formal minutes पर controlled approval और reliable retrieval चाहिए।'] },
        { id: 'what-it-solves', title: 'यह क्या हल करता है', body: ['यह delayed approval, scattered drafts, final approved version पर uncertainty, weak approval evidence और minutes, decisions तथा supporting records के बीच कमजोर linkage को हल करता है।'] },
        { id: 'how-it-works', title: 'यह कैसे काम करता है', body: ['Workflow structured drafting से शुरू होकर review, approval, e-signature, timestamping और final record preservation तक एक नियंत्रित governance process में चलता है।'] },
        { id: 'operational-pain', title: 'बड़ी संस्थाओं में मिनट्स क्यों धीमे हो जाते हैं?', body: ['क्योंकि document अक्सर email, files, comments और manual edits के बीच घूमता रहता है, जिससे delay, duplicate versions और official final record पर uncertainty पैदा होती है।'] },
        { id: 'solution', title: 'Diwan Suite कैसे समाधान देता है', body: ['Diwan Suite drafting, review, e-signature, timestamping, version control और approval evidence को एक workflow में लाता है जो minutes को decisions, attachments और audit records से जोड़ता है।'] },
        { id: 'capabilities', title: 'मुख्य क्षमताएँ', body: ['Controlled minute templates, flexible approval paths, e-signature, audit trail, advanced retrieval और meetings, decisions तथा attachments के साथ direct linkage.'] },
        { id: 'workflow', title: 'मिनट्स approval कैसे होता है', body: ['Minutes तैयार होते हैं, review होते हैं, approve होते हैं, electronically sign किए जाते हैं और final official version के रूप में preserve किए जाते हैं, जबकि workflow बताता है कि किसने क्या और कब approve किया।'] },
        { id: 'governance-impact', title: 'गवर्नेंस और ऑडिट प्रभाव', body: ['यह workflow record integrity को बेहतर बनाता है, final version पर ambiguity घटाता है, approvals तेज़ करता है और audit व compliance review के लिए stronger evidence देता है।'] },
        { id: 'proof', title: 'प्रचालन प्रमाण', body: ['Platform दिखा सकता है कि minutes किसने draft किए, किसने review किया, किसने approve किया, approval कब हुआ और कौन-सी version final official record बनी।'] },
        { id: 'outcomes', title: 'कार्यकारी परिणाम', body: ['परिणाम है faster approval, stronger record control, fewer human errors और audit तथा governance readiness में सुधार।'] },
      ],
      relatedPages: ['corporateSecretarySystem', 'decisionTracking', 'securityCompliance']
},
    decisionTracking: {
      title: 'निर्णय प्रबंधन और ट्रैकिंग',
      summary: 'Diwan Suite निर्णय प्रबंधन और ट्रैकिंग हर board या committee decision को owner, due date, reminders, execution status और closure evidence से जोड़ता है ताकि निर्णय केवल मिनट्स में दर्ज होकर न रुक जाए।',
      seoTitle: 'निर्णय प्रबंधन और ट्रैकिंग | Diwan Suite',
      seoDescription: 'Diwan Suite निर्णय प्रबंधन और ट्रैकिंग board और committee decisions को accountable execution items में बदलता है, जिनमें owner, reminders, escalation और executive reporting शामिल हैं।',
      definition: 'यदि आपकी संस्था meeting में decisions approve करती है लेकिन session के बाद उन पर नियंत्रण खो देती है, तो Diwan Suite हर approved decision को governed execution item में बदलता है जिसमें ownership, timing, reminders, reporting और closure evidence होता है।',
      whoFor: ['Board और committee secretariat', 'Executive management और follow-up teams', 'Compliance, internal audit और decision-makers'],
      whatItSolves: ['Meeting के बाद owner-less हो जाने वाले decisions.', 'Execution progress, delay और blockers पर weak visibility.', 'Approved decisions के लिए reliable closure trail का अभाव.'],
      howItWorks: ['Approved decision को meeting record से register करें.', 'Owner, due date, priority और reminders assign करें.', 'Execution status, escalation और closure को governance reporting से track करें.'],
      faq: [
        { q: 'क्या हर decision को एक accountable owner दिया जा सकता है?', a: 'हाँ, हर decision को named owner, due date, priority और follow-up state के साथ assign किया जा सकता है।' },
        { q: 'क्या reminders और escalation उपलब्ध हैं?', a: 'हाँ, workflow automated reminders, approaching deadline alerts और execution delay escalation को support करता है।' },
        { q: 'क्या executive reports उपलब्ध हैं?', a: 'हाँ, reports execution rates, overdue decisions, open बनाम closed items और accountability trends दिखा सकती हैं।' },
        { q: 'क्या decisions minutes और attachments से जुड़े रहते हैं?', a: 'हाँ, decisions approved meeting record, minutes और supporting documents से जुड़े रहते हैं।' },
        { q: 'क्या AI इस workflow में मदद करता है?', a: 'हाँ, AI outcomes summarize करने, tasks suggest करने और early delay signals पकड़ने में मदद कर सकता है, जबकि final governance judgment मानव के पास रहता है।' },
      ],
      sections: [
        { id: 'who-for', title: 'किसके लिए', body: ['यह समाधान board और committee secretariat, executive follow-up teams, compliance stakeholders और उन leaders के लिए है जिन्हें decisions को visible execution में बदलना है।'] },
        { id: 'what-it-solves', title: 'यह क्या हल करता है', body: ['यह decision approval और वास्तविक execution के बीच की खाई को भरता है, ताकि ownership, deadlines, progress और closure स्पष्ट रहें।'] },
        { id: 'how-it-works', title: 'यह कैसे काम करता है', body: ['Decision approved होते ही उसे रिकॉर्ड किया जाता है, owner और due date दी जाती है, priority और reminders जोड़े जाते हैं, फिर dashboards और reports में उसकी progress track की जाती है।'] },
        { id: 'operational-pain', title: 'मीटिंग के बाद निर्णय कहाँ खो जाते हैं?', body: ['वे तब खो जाते हैं जब decision मिनट्स में दर्ज होकर रह जाता है और उसके साथ ownership, follow-up rules, status view और escalation model नहीं जुड़ता।'] },
        { id: 'solution', title: 'Diwan Suite कैसे समाधान देता है', body: ['Diwan Suite approved decision को accountable execution item में बदलता है जिसे track, measure, remind, escalate और close किया जा सकता है।'] },
        { id: 'capabilities', title: 'मुख्य क्षमताएँ', body: ['Owner assignment, due dates, priorities, reminders, escalation, execution dashboards, closure records और meeting context व supporting documents से linkage.'] },
        { id: 'workflow', title: 'निर्णय कैसे execution में बदलता है', body: ['Decision approved record में capture होता है, owner को assign होता है, progress signals से track होता है, reporting में दिखता है और completion evidence के साथ close होता है।'] },
        { id: 'governance-impact', title: 'गवर्नेंस और execution प्रभाव', body: ['इससे accountability बढ़ती है, भूले हुए actions कम होते हैं, delay risk जल्दी दिखती है और leadership को बेहतर visibility मिलती है।'] },
        { id: 'proof', title: 'प्रचालन प्रमाण', body: ['Platform दिखा सकता है कि decision का owner कौन है, due date क्या है, वह delayed है या नहीं, क्या actions लिए गए और closure evidence क्या है।'] },
        { id: 'outcomes', title: 'कार्यकारी परिणाम', body: ['परिणाम है fewer lost decisions, stronger accountability, बेहतर execution reporting, earlier intervention और स्पष्ट evidence कि governance decisions वास्तव में लागू हो रहे हैं।'] },
      ],
      relatedPages: ['boardManagementSystem', 'governanceReportsDashboards', 'roiBoardGovernance']
}
},
  ur: {
    boardManagementSystem: {
      summary: 'Diwan Suite کا بورڈ مینجمنٹ سسٹم بورڈ کی تشکیل، میٹنگ دعوت، محاضر کی منظوری، ای-سگنیچر، فیصلہ نفاذ اور قابلِ پیمائش فالو اپ کو ایک ہی ادارہ جاتی ماحول میں منظم کرتا ہے۔',
      seoTitle: 'بورڈ مینجمنٹ سسٹم | Diwan Suite',
      seoDescription: 'Diwan Suite کا بورڈ مینجمنٹ سسٹم بورڈ کی تشکیل، ایجنڈا، حاضری، quorum، محاضر، منظوری، فیصلوں، فالو اپ اور رپورٹنگ کو ایک audit-ready گورننس ورک فلو میں جوڑتا ہے۔',
      definition: 'اگر آپ کے ادارے کو ایسا نظام چاہیے جو بورڈ آپریشنز کو بکھرے ہوئے دستی انتظام سے ایک منظم ڈیجیٹل گورننس ورک فلو میں بدل دے، تو Diwan Suite یہی فریم ورک فراہم کرتا ہے جو بورڈ، اجلاس، محضر، فیصلہ اور نفاذ کو ایک ہی ریکارڈ میں جوڑتا ہے۔',
      whoFor: ['Boards of directors اور secretariat ٹیمیں', 'Committees اور executive leadership', 'Governance، تعمیل اور internal audit اسٹیک ہولڈرز'],
      whatItSolves: ['Delayed minutes اور fragmented approvals', 'Scattered attachments اور board records', 'Decision execution کی کمزور جوابدہی'],
      howItWorks: ['Board structure اور memberships منظم کریں', 'Agenda، attendance، quorum، minutes اور approvals کنٹرول کریں', 'Decisions کو accountable execution اور reporting میں بدلیں'],
      faq: [
        { q: 'کیا یہ board structure، roles اور memberships کو سپورٹ کرتا ہے؟', a: 'جی ہاں، یہ board composition، terms، roles اور permissions کو منظم طریقے سے سنبھالتا ہے۔' },
        { q: 'کیا یہ board minutes اور approvals کو سپورٹ کرتا ہے؟', a: 'جی ہاں، minutes تیار، جائزہ، منظور اور e-sign کیے جا سکتے ہیں۔' },
        { q: 'فیصلوں کی ٹریکنگ کیسے ہوتی ہے؟', a: 'فیصلے ذمہ دار tasks یا execution items میں بدل جاتے ہیں جن میں owner، deadline اور status شامل ہوتے ہیں۔' },
        { q: 'کیا اس میں AI معاونت موجود ہے؟', a: 'جی ہاں، AI summaries، decision extraction، task suggestions اور decision clarity میں مدد دیتا ہے، جبکہ حتمی approval انسان کے پاس رہتی ہے۔' },
        { q: 'کیا یہ regulated اداروں کے لیے مناسب ہے؟', a: 'جی ہاں، یہ audit trail، permissions، timestamps اور sensitive records control فراہم کرتا ہے۔' },
        { q: 'کیا یہ hybrid اور virtual meetings کو سپورٹ کرتا ہے؟', a: 'جی ہاں، یہ تینوں meeting modes کے لیے موزوں ہے۔' },
      ],
      sections: [
        { id: 'who-for', title: 'یہ کس کے لیے ہے', body: ['یہ حل boards of directors، board secretariats، committees، executive leadership، governance teams اور compliance stakeholders کے لیے موزوں ہے۔'] },
        { id: 'what-it-solves', title: 'یہ کیا حل کرتا ہے', body: ['یہ delayed minutes، بکھرے attachments، غیر واضح جوابدہی، کمزور execution tracking اور audit readiness کی کمی کو حل کرتا ہے۔'] },
        { id: 'how-it-works', title: 'یہ کیسے کام کرتا ہے', body: ['عمل board structure اور memberships سے شروع ہو کر agenda، attendance، quorum، minutes، approvals، decision capture، task assignment اور executive reporting تک جاتا ہے۔'] },
        { id: 'operational-pain', title: 'موجودہ عملی مسائل', body: ['بہت سے boards اب بھی email، disconnected files اور manual follow-up پر انحصار کرتے ہیں، جس سے approvals سست ہوتے ہیں اور فیصلے execution سے الگ ہو جاتے ہیں۔'] },
        { id: 'solution', title: 'Diwan Suite یہ مسئلہ کیسے حل کرتا ہے', body: ['یہ board members، agendas، attachments، minutes، decisions، tasks اور reports کو ایک ہی secure governance workflow میں جمع کرتا ہے۔'] },
        { id: 'capabilities', title: 'اہم صلاحیتیں', body: ['Board structure، memberships، agendas، attendance، quorum، minutes، e-signature، decision-to-task conversion، notifications، reporting اور integration.'] },
        { id: 'workflow', title: 'ورک فلو کیسے چلتا ہے', body: ['Session بنایا جاتا ہے، invitations بھیجی جاتی ہیں، attendance ریکارڈ ہوتی ہے، discussions documented ہوتی ہیں، minutes approve ہوتے ہیں، decisions جاری ہوتے ہیں اور execution tracked رہتی ہے۔'] },
        { id: 'governance-impact', title: 'گورننس، تعمیل اور آڈٹ اثرات', body: ['اس سے board discipline بہتر ہوتا ہے، approvals تیز ہوتی ہیں، accountability مضبوط ہوتی ہے اور governance oversight زیادہ واضح ہو جاتی ہے۔'] },
        { id: 'proof', title: 'عملی شواہد', body: ['ہر decision کو owner، due date، supporting records اور follow-up status سے جوڑا جا سکتا ہے، جبکہ approvals timestamped اور searchable رہتے ہیں۔'] },
        { id: 'outcomes', title: 'انتظامی نتائج', body: ['نتیجہ صرف بہتر record keeping نہیں، بلکہ زیادہ واضح execution، تیز approvals اور مضبوط governance reporting ہے۔'] },
      ],
      relatedPages: ['corporateSecretarySystem', 'decisionTracking', 'meetingMinutesEsignature']
},
    committeeManagementSoftware: {
      summary: 'Diwan Suite کمیٹی مینجمنٹ حل کمیٹیوں کی ساخت، اجلاسوں، محاضر، سفارشات اور نفاذی فالو اپ کو ایک منظم گورننس ورک فلو میں جوڑتا ہے۔',
      seoTitle: 'کمیٹی مینجمنٹ سافٹ ویئر | Diwan Suite',
      seoDescription: 'Diwan Suite کمیٹی مینجمنٹ سافٹ ویئر کمیٹی memberships، meetings، محاضر، سفارشات، decisions، follow-up اور reporting کو ایک audit-ready workflow میں منظم کرتا ہے۔',
      definition: 'اگر آپ کا ادارہ متعدد مستقل یا عارضی کمیٹیاں چلاتا ہے اور سفارشات، approvals اور execution کو ایک جگہ جوڑنا مشکل ہو رہا ہے، تو Diwan Suite committee setup سے measurable follow-up تک ایک controlled workflow فراہم کرتا ہے۔',
      whoFor: ['مستقل اور عارضی کمیٹیاں', 'کمیٹی سیکریٹریٹ اور ایگزیکٹو مینجمنٹ', 'Compliance، internal audit اور follow-up ٹیمیں'],
      whatItSolves: ['ای میل اور الگ files میں بکھرا ہوا کمیٹی کام', 'سفارشات اور outputs کی کمزور ownership', 'کمیٹی discipline اور execution status پر کم visibility'],
      howItWorks: ['کمیٹی structure، memberships اور permissions ترتیب دیں', 'Meetings، minutes، recommendations اور voting کو manage کریں', 'Outputs کو tasks، follow-up اور reporting میں بدلیں'],
      sections: [
        { id: 'who-for', title: 'یہ کس کے لیے ہے', body: ['یہ حل مستقل اور عارضی کمیٹیوں، کمیٹی سیکریٹریٹس اور ان اداروں کے لیے ہے جنہیں کمیٹی گورننس اور follow-up پر بہتر کنٹرول چاہیے۔'] },
        { id: 'what-it-solves', title: 'یہ کیا حل کرتا ہے', body: ['یہ fragmented committee meetings، unclear accountability، weak recommendation tracking اور committee performance پر محدود executive visibility کو حل کرتا ہے۔'] },
        { id: 'how-it-works', title: 'یہ کیسے کام کرتا ہے', body: ['ورک فلو کمیٹی structure، agenda، meetings، minutes، recommendations اور follow-up کو ایک controlled system میں جوڑتا ہے۔'] },
        { id: 'operational-pain', title: 'کمیٹیاں کہاں کمزور پڑتی ہیں؟', body: ['جب recommendations minutes یا email تک محدود رہ جائیں اور ownership، execution اور reporting سے نہ جڑیں۔'] },
        { id: 'solution', title: 'Diwan Suite کیسے حل دیتا ہے', body: ['Diwan Suite committee structure، meetings، minutes، recommendations اور execution کو جوڑ کر کمیٹی کام کو measurable اور auditable بناتا ہے۔'] },
        { id: 'capabilities', title: 'اہم صلاحیتیں', body: ['Memberships، scheduling، minutes، voting، recommendations، decisions، follow-up اور reporting.'] },
        { id: 'workflow', title: 'کمیٹی outputs execution میں کیسے جاتے ہیں', body: ['Recommendations record ہوتی ہیں، approval path میں جاتی ہیں، پھر accountable actions میں بدل کر dashboards اور reports میں دکھائی دیتی ہیں۔'] },
        { id: 'governance-impact', title: 'گورننس اور انتظامی اثرات', body: ['اس سے committee discipline بہتر ہوتا ہے، delays کم ہوتے ہیں، accountability مضبوط ہوتی ہے اور leadership کو بہتر visibility ملتی ہے۔'] },
        { id: 'proof', title: 'عملی شواہد', body: ['ہر کمیٹی کو members، meetings، recommendations، execution status، minutes اور approvals کی بنیاد پر track کیا جا سکتا ہے۔'] },
        { id: 'outcomes', title: 'انتظامی نتائج', body: ['نتیجہ ہے زیادہ منظم کمیٹیاں، واضح recommendations، تیز follow-up اور بہتر governance evidence۔'] },
      ],
      faq: [
        { q: 'کیا یہ مستقل اور عارضی دونوں کمیٹیوں کو سپورٹ کرتا ہے؟', a: 'جی ہاں، memberships، terms اور permissions کے ساتھ دونوں قسم کی کمیٹیاں configure کی جا سکتی ہیں۔' },
        { q: 'کیا recommendations کو execution سے جوڑا جا سکتا ہے؟', a: 'جی ہاں، recommendations اور decisions کو owners، deadlines اور status والے accountable tasks میں بدلا جا سکتا ہے۔' },
        { q: 'کیا متعدد parallel committees کے لیے یہ مفید ہے؟', a: 'جی ہاں، یہ role-based access برقرار رکھتے ہوئے unified executive view دیتا ہے۔' },
        { q: 'کیا committee performance reports دستیاب ہیں؟', a: 'جی ہاں، attendance، approvals، recommendations اور execution status پر reports دستیاب ہیں۔' },
        { q: 'کیا AI اس workflow کو سپورٹ کرتا ہے؟', a: 'جی ہاں، AI summaries، outcome extraction اور wording support میں مدد دے سکتا ہے جبکہ final approval انسان کے پاس رہتا ہے۔' },
      ],
      relatedPages: ['boardManagementSystem', 'corporateSecretarySystem', 'decisionTracking']
},
    generalAssemblyManagement: {
      summary: 'Diwan Suite عمومی اسمبلی مینجمنٹ invitations، attendance، quorum، voting، minutes، approvals اور decisions کو ایک ادارہ جاتی governance workflow میں منظم کرتا ہے۔',
      seoTitle: 'عمومی اسمبلی مینجمنٹ | Diwan Suite',
      seoDescription: 'Diwan Suite عمومی اسمبلی مینجمنٹ invitations، quorum، attendance، voting، minutes، approvals اور decision follow-up کو ایک audit-ready workflow میں کنٹرول کرتا ہے۔',
      definition: 'اگر آپ کے ادارے کو عمومی اسمبلیوں کو invitation سے voting، minutes approval اور decision follow-up تک زیادہ controlled انداز میں چلانے کی ضرورت ہے، تو Diwan Suite یہی institutional workflow فراہم کرتا ہے۔',
      whoFor: ['ایسے ادارے جو regular یا extraordinary general assemblies چلاتے ہیں', 'Assembly secretariats، legal teams اور executive leadership', 'Governance اور compliance teams'],
      whatItSolves: ['Invitations، attendance، quorum اور voting کو ایک ساتھ control کرنے کی مشکل', 'Final minutes approval میں تاخیر', 'Assembly decisions اور execution follow-up کے درمیان کمزور linkage'],
      howItWorks: ['Assembly planning، agenda، invitations اور attachments manage کریں', 'Attendance، quorum، voting اور minutes control کریں', 'Approved decisions کو follow-up اور reporting سے جوڑیں'],
      sections: [
        { id: 'who-for', title: 'یہ کس کے لیے ہے', body: ['یہ حل ان اداروں کے لیے ہے جو عمومی اسمبلیاں چلاتے ہیں اور procedural control، documentation اور follow-up کو مضبوط بنانا چاہتے ہیں۔'] },
        { id: 'what-it-solves', title: 'یہ کیا حل کرتا ہے', body: ['یہ invitations، attendance، quorum، voting، minutes اور approvals کو ایک governed process میں رکھتا ہے اور official outcomes پر ambiguity کم کرتا ہے۔'] },
        { id: 'how-it-works', title: 'یہ کیسے کام کرتا ہے', body: ['Assembly agenda، invitations اور attachments سے شروع ہوتی ہے، پھر attendance، quorum اور voting control ہوتی ہے اور آخر میں minutes اور decisions approval و follow-up میں جاتے ہیں۔'] },
        { id: 'operational-pain', title: 'عمومی اسمبلیاں پیچیدہ کیوں ہو جاتی ہیں؟', body: ['کیونکہ یہ formal invitation، quorum، voting، minutes اور approvals کو ایک ساتھ جوڑتی ہیں، اور ان کے درمیان disconnect procedural risk بڑھا دیتا ہے۔'] },
        { id: 'solution', title: 'Diwan Suite کیسے حل دیتا ہے', body: ['Diwan Suite preparation سے approval تک پوری general assembly کو یکجا کرتا ہے اور attendance، voting، minutes اور decisions کا clear governed record دیتا ہے۔'] },
        { id: 'capabilities', title: 'اہم صلاحیتیں', body: ['Invitations، attachments، attendance، quorum، voting، minutes، approvals اور decisions کو follow-up اور reporting سے جوڑنا.'] },
        { id: 'workflow', title: 'سسٹم کے اندر اسمبلی کیسے چلتی ہے', body: ['Assembly create ہوتی ہے، invitations بھیجی جاتی ہیں، attendance record ہوتی ہے، quorum calculate ہوتا ہے، voting document ہوتی ہے اور decisions follow-up میں جاتے ہیں۔'] },
        { id: 'governance-impact', title: 'گورننس اور طریقہ کار کے اثرات', body: ['اس سے assembly administration زیادہ قابلِ اعتماد بنتی ہے، formal evidence مضبوط ہوتی ہے اور procedural risk کم ہوتا ہے۔'] },
        { id: 'proof', title: 'عملی شواہد', body: ['Platform دکھا سکتا ہے کہ کون حاضر تھا، quorum پورا ہوا یا نہیں، voting کیسے ہوئی اور final approvals کب ہوئے۔'] },
        { id: 'outcomes', title: 'انتظامی نتائج', body: ['نتیجہ ہے زیادہ منظم assemblies، واضح outcomes، تیز approvals اور decisions پر بہتر follow-up۔'] },
      ],
      faq: [
        { q: 'کیا یہ quorum calculation اور attendance evidence کو سپورٹ کرتا ہے؟', a: 'جی ہاں، attendance اور quorum کو minutes اور voting outcomes سے جوڑا جا سکتا ہے۔' },
        { q: 'کیا voting workflow کے اندر manage کی جا سکتی ہے؟', a: 'جی ہاں، voting results کو agenda items اور issued decisions سے جوڑا جا سکتا ہے۔' },
        { q: 'کیا یہ regular اور extraordinary assemblies کے لیے مناسب ہے؟', a: 'جی ہاں، workflow assembly type اور operating requirements کے مطابق adapt کیا جا سکتا ہے۔' },
        { q: 'کیا assembly decisions کو execution سے جوڑا جا سکتا ہے؟', a: 'جی ہاں، decisions کو accountable follow-up items میں بدلا جا سکتا ہے۔' },
        { q: 'کیا یہ audit اور compliance readiness کو بہتر بناتا ہے؟', a: 'جی ہاں، یہ invitations، attendance، quorum، voting، minutes، approvals اور decisions کا documented record دیتا ہے۔' },
      ],
      relatedPages: ['boardManagementSystem', 'meetingMinutesEsignature', 'support']
},
    corporateSecretarySystem: {
      summary: 'Diwan Suite بورڈ سیکریٹری سسٹم board office کو meetings، records، minutes، approvals، decisions اور execution follow-up کو ایک practical governance workflow میں manage کرنے میں مدد دیتا ہے۔',
      seoTitle: 'بورڈ سیکریٹری سسٹم | Diwan Suite',
      seoDescription: 'Diwan Suite بورڈ سیکریٹری سسٹم board meetings، records، minutes، approvals، decisions اور follow-up کو ایک audit-ready governance workflow میں منظم کرتا ہے۔',
      definition: 'اگر board office پر meetings، documents، minutes، approvals اور decision follow-up کا بھاری دباؤ ہے، تو Diwan Suite ایک controlled operating system دیتا ہے جو manual overhead کم کرتا ہے اور institutional discipline بڑھاتا ہے۔',
      whoFor: ['Board secretaries اور board office teams', 'Board chairs اور members', 'Executive management، governance اور compliance stakeholders'],
      whatItSolves: ['People، documents اور approvals کے درمیان heavy manual coordination', 'Official versions اور records پر weak control', 'Post-meeting decision follow-up کا دباؤ'],
      howItWorks: ['Session سے پہلے meetings، agendas اور attachments تیار کریں', 'Meeting کے بعد minutes، approvals اور e-signature manage کریں', 'Board office view سے decisions، follow-up اور reporting track کریں'],
      sections: [
        { id: 'who-for', title: 'یہ کس کے لیے ہے', body: ['یہ حل board secretaries اور board office teams کے لیے ہے جو meetings، records، minutes، approvals، decisions اور follow-up کا ادارہ جاتی coordination کرتی ہیں۔'] },
        { id: 'what-it-solves', title: 'یہ کیا حل کرتا ہے', body: ['یہ manual coordination، scattered records، delayed minutes، weak version control اور post-meeting follow-up burden کو حل کرتا ہے۔'] },
        { id: 'how-it-works', title: 'یہ کیسے کام کرتا ہے', body: ['Workflow meeting preparation، agenda، attachments، minutes approval اور decision follow-up کو ایک ہی board office view میں جوڑتا ہے۔'] },
        { id: 'operational-pain', title: 'سب سے زیادہ محنت کہاں لگتی ہے؟', body: ['زیادہ تر وقت records جمع کرنے، stakeholders کو coordinate کرنے، official versions control کرنے اور decisions کا پیچھا کرنے میں صرف ہوتا ہے۔'] },
        { id: 'solution', title: 'Diwan Suite کیسے حل دیتا ہے', body: ['Diwan Suite board secretary کو preparation، administration، minutes، approvals، decisions اور follow-up کے لیے ایک unified system دیتا ہے۔'] },
        { id: 'capabilities', title: 'اہم صلاحیتیں', body: ['Invitations، attachments، agendas، minutes، approvals، e-signature، decisions، follow-up اور reporting.'] },
        { id: 'workflow', title: 'روزمرہ آپریٹنگ فلو کیسے چلتا ہے', body: ['Meetings تیار کی جاتی ہیں، records منظم ہوتے ہیں، discussions documented ہوتی ہیں، minutes approve ہوتے ہیں اور decisions updated reporting کے ساتھ follow-up میں جاتے ہیں۔'] },
        { id: 'governance-impact', title: 'تنظیمی اور گورننس اثرات', body: ['اس سے board office کی efficiency بڑھتی ہے، delays کم ہوتے ہیں، audit readiness مضبوط ہوتی ہے اور board members کے لیے زیادہ professional experience بنتا ہے۔'] },
        { id: 'proof', title: 'عملی شواہد', body: ['Board office meeting status، minutes، approvals، decisions اور follow-up کو email یا manual trackers کے بجائے ایک governed record سے track کر سکتا ہے۔'] },
        { id: 'outcomes', title: 'انتظامی نتائج', body: ['نتیجہ ہے زیادہ منظم board office، تیز approvals، واضح records، بہتر decision follow-up اور stronger reporting readiness۔'] },
      ],
      faq: [
        { q: 'یہ board secretary کی عملی طور پر کیسے مدد کرتا ہے؟', a: 'یہ meetings، documents، minutes، approvals، decisions اور follow-up کو ایک ہی جگہ manage کرنے دیتا ہے۔' },
        { q: 'کیا یہ meeting سے پہلے documents اور attachments کو منظم کرتا ہے؟', a: 'جی ہاں، invitations، agendas، documents اور attachments کو ہر meeting اور agenda item سے جوڑا جا سکتا ہے۔' },
        { q: 'کیا یہ minutes اور approvals کو تیز کرتا ہے؟', a: 'جی ہاں، یہ minute preparation، review، approval، e-signature اور timestamping کو structure کرتا ہے۔' },
        { q: 'کیا یہ post-meeting follow-up کا burden کم کرتا ہے؟', a: 'جی ہاں، decisions کو owners، status، reminders اور reporting سے جوڑا جا سکتا ہے۔' },
        { q: 'کیا leadership اور board office کے لیے reports دستیاب ہیں؟', a: 'جی ہاں، meetings، approvals، decisions اور execution status پر reports دستیاب ہیں۔' },
      ],
      relatedPages: ['boardManagementSystem', 'meetingMinutesEsignature', 'decisionTracking']
},
    meetingMinutesEsignature: {
      title: 'اجلاس کے محاضر اور ای-سگنیچر',
      summary: 'Diwan Suite اجلاس کے محاضر اور ای-سگنیچر کو ایک کنٹرولڈ workflow میں لاتا ہے جہاں drafting، review، approval، timestamping اور final record preservation ایک ہی governance path میں ہوتا ہے۔',
      seoTitle: 'اجلاس کے محاضر اور ای-سگنیچر | Diwan Suite',
      seoDescription: 'Diwan Suite اجلاس کے محاضر اور ای-سگنیچر workflow رسمی drafting، approval، timestamping، e-signature اور final approved record کے تحفظ کے لیے۔',
      definition: 'اگر آپ کے ادارے کو ایسے رسمی محاضر درکار ہیں جو review، approval، signing اور retrieval کے لیے ایک منظم ڈیجیٹل workflow میں چلیں، تو Diwan Suite یہی governed process فراہم کرتا ہے۔',
      whoFor: ['Board اور committee secretariat', 'Executive management اور legal stakeholders', 'Compliance، audit اور oversight-heavy organizations'],
      whatItSolves: ['Fragmented reviews کی وجہ سے delayed minutes approval', 'Final approved version کے بارے میں confusion', 'Minutes، decisions، signatures اور audit evidence کے درمیان weak linkage'],
      howItWorks: ['Meeting-linked structured template میں minutes تیار کریں', 'Review، approval اور e-signature workflow چلائیں', 'Final version کو timestamp اور approval history سمیت محفوظ رکھیں'],
      faq: [
        { q: 'کیا final approval کے بعد edits روکے جا سکتے ہیں؟', a: 'جی ہاں، final approved record کو controlled historical state میں محفوظ رکھا جا سکتا ہے۔' },
        { q: 'کیا e-signature اور timestamping دستیاب ہے؟', a: 'جی ہاں، workflow documented e-signature اور approval timestamps کو سپورٹ کرتا ہے۔' },
        { q: 'کیا محاضر کو جلد تلاش کیا جا سکتا ہے؟', a: 'جی ہاں، search meeting، decision، member، date یا approval state کی بنیاد پر کی جا سکتی ہے۔' },
        { q: 'کیا محاضر decisions اور attachments سے جڑے رہتے ہیں؟', a: 'جی ہاں، minutes decisions، supporting files اور approval history سے ایک ہی record میں جڑے رہتے ہیں۔' },
        { q: 'کیا یہ regulated environments کے لیے مناسب ہے؟', a: 'جی ہاں، یہ record integrity، approval traceability اور audit readiness کو مضبوط کرتا ہے۔' },
      ],
      sections: [
        { id: 'who-for', title: 'یہ کس کے لیے ہے', body: ['یہ حل board اور committee secretariat، executive teams، legal stakeholders اور ان اداروں کے لیے ہے جنہیں formal minutes پر controlled approval اور reliable retrieval چاہیے۔'] },
        { id: 'what-it-solves', title: 'یہ کیا حل کرتا ہے', body: ['یہ delayed approval، scattered drafts، final approved version پر uncertainty، weak approval evidence اور minutes، decisions اور supporting records کے درمیان کمزور linkage کو حل کرتا ہے۔'] },
        { id: 'how-it-works', title: 'یہ کیسے کام کرتا ہے', body: ['Workflow structured drafting سے شروع ہو کر review، approval، e-signature، timestamping اور final record preservation تک ایک کنٹرولڈ governance process میں چلتا ہے۔'] },
        { id: 'operational-pain', title: 'بڑے اداروں میں محاضر کیوں سست ہو جاتے ہیں؟', body: ['کیونکہ document اکثر email، files، comments اور manual edits کے درمیان گھومتا رہتا ہے، جس سے delay، duplicate versions اور official final record پر uncertainty پیدا ہوتی ہے۔'] },
        { id: 'solution', title: 'Diwan Suite کیسے حل دیتا ہے', body: ['Diwan Suite drafting، review، e-signature، timestamping، version control اور approval evidence کو ایک workflow میں لاتا ہے جو minutes کو decisions، attachments اور audit records سے جوڑتا ہے۔'] },
        { id: 'capabilities', title: 'اہم صلاحیتیں', body: ['Controlled minute templates، flexible approval paths، e-signature، audit trail، advanced retrieval اور meetings، decisions اور attachments کے ساتھ direct linkage.'] },
        { id: 'workflow', title: 'محاضر کی منظوری کیسے ہوتی ہے', body: ['Minutes تیار ہوتے ہیں، review ہوتے ہیں، approve ہوتے ہیں، electronically sign کیے جاتے ہیں اور final official version کے طور پر محفوظ کیے جاتے ہیں، جبکہ workflow بتاتا ہے کہ کس نے کیا اور کب approve کیا۔'] },
        { id: 'governance-impact', title: 'گورننس اور آڈٹ اثرات', body: ['یہ workflow record integrity بہتر بناتا ہے، final version پر ambiguity کم کرتا ہے، approvals تیز کرتا ہے اور audit و compliance review کے لیے stronger evidence دیتا ہے۔'] },
        { id: 'proof', title: 'عملی شواہد', body: ['Platform دکھا سکتا ہے کہ minutes کس نے draft کیے، کس نے review کیا، کس نے approve کیا، approval کب ہوا اور کون سی version final official record بنی۔'] },
        { id: 'outcomes', title: 'انتظامی نتائج', body: ['نتیجہ ہے faster approval، stronger record control، fewer human errors اور audit و governance readiness میں بہتری۔'] },
      ],
      relatedPages: ['corporateSecretarySystem', 'decisionTracking', 'securityCompliance']
},
    decisionTracking: {
      title: 'فیصلہ مینجمنٹ اور ٹریکنگ',
      summary: 'Diwan Suite فیصلہ مینجمنٹ اور ٹریکنگ ہر board یا committee decision کو owner، due date، reminders، execution status اور closure evidence سے جوڑتا ہے تاکہ فیصلہ صرف محضر میں درج ہو کر نہ رہ جائے۔',
      seoTitle: 'فیصلہ مینجمنٹ اور ٹریکنگ | Diwan Suite',
      seoDescription: 'Diwan Suite فیصلہ مینجمنٹ اور ٹریکنگ board اور committee decisions کو accountable execution items میں بدلتی ہے جن میں owner، reminders، escalation اور executive reporting شامل ہیں۔',
      definition: 'اگر آپ کا ادارہ میٹنگ میں فیصلے approve کرتا ہے مگر session ختم ہونے کے بعد ان پر کنٹرول کھو دیتا ہے، تو Diwan Suite ہر approved decision کو governed execution item میں بدل دیتا ہے جس میں ownership، timing، reminders، reporting اور closure evidence شامل ہوتا ہے۔',
      whoFor: ['Board اور committee secretariat', 'Executive management اور follow-up teams', 'Compliance، internal audit اور decision-makers'],
      whatItSolves: ['Meeting کے بعد owner-less ہو جانے والے decisions.', 'Execution progress، delay اور blockers پر weak visibility.', 'Approved decisions کے لیے reliable closure trail کا فقدان.'],
      howItWorks: ['Approved decision کو meeting record سے register کریں.', 'Owner، due date، priority اور reminders assign کریں.', 'Execution status، escalation اور closure کو governance reporting کے ذریعے track کریں۔'],
      faq: [
        { q: 'کیا ہر decision کو ایک accountable owner دیا جا سکتا ہے؟', a: 'جی ہاں، ہر decision کو named owner، due date، priority اور follow-up state کے ساتھ assign کیا جا سکتا ہے۔' },
        { q: 'کیا reminders اور escalation دستیاب ہیں؟', a: 'جی ہاں، workflow automated reminders، approaching deadline alerts اور execution delay escalation کو سپورٹ کرتا ہے۔' },
        { q: 'کیا executive reports دستیاب ہیں؟', a: 'جی ہاں، reports execution rates، overdue decisions، open بمقابلہ closed items اور accountability trends دکھا سکتی ہیں۔' },
        { q: 'کیا decisions minutes اور attachments سے جڑے رہتے ہیں؟', a: 'جی ہاں، decisions approved meeting record، minutes اور supporting documents سے جڑے رہتے ہیں۔' },
        { q: 'کیا AI اس workflow میں مدد کرتا ہے؟', a: 'جی ہاں، AI outcomes summarize کرنے، tasks suggest کرنے اور early delay signals پکڑنے میں مدد کر سکتا ہے، جبکہ final governance judgment انسان کے پاس رہتا ہے۔' },
      ],
      sections: [
        { id: 'who-for', title: 'یہ کس کے لیے ہے', body: ['یہ حل board اور committee secretariat، executive follow-up teams، compliance stakeholders اور ان leaders کے لیے ہے جنہیں decisions کو visible execution میں بدلنا ہے۔'] },
        { id: 'what-it-solves', title: 'یہ کیا حل کرتا ہے', body: ['یہ decision approval اور حقیقی execution کے درمیان خلا کو بھرता ہے تاکہ ownership، deadlines، progress اور closure واضح رہیں۔'] },
        { id: 'how-it-works', title: 'یہ کیسے کام کرتا ہے', body: ['Decision approve ہوتے ہی اسے record کیا جاتا ہے، owner اور due date دی جاتی ہے، priority اور reminders جوڑے جاتے ہیں، پھر dashboards اور reports میں progress track کی جاتی ہے۔'] },
        { id: 'operational-pain', title: 'میٹنگ کے بعد فیصلے کہاں کھو جاتے ہیں؟', body: ['وہ اس وقت کھو جاتے ہیں جب decision محضر میں درج ہو کر رہ جائے اور اس کے ساتھ ownership، follow-up rules، status view اور escalation model نہ جڑے۔'] },
        { id: 'solution', title: 'Diwan Suite کیسے حل دیتا ہے', body: ['Diwan Suite approved decision کو accountable execution item میں بدل دیتا ہے جسے track، measure، remind، escalate اور close کیا جا سکتا ہے۔'] },
        { id: 'capabilities', title: 'اہم صلاحیتیں', body: ['Owner assignment، due dates، priorities، reminders، escalation، execution dashboards، closure records اور meeting context و supporting documents سے linkage.'] },
        { id: 'workflow', title: 'فیصلہ execution میں کیسے بدلتا ہے', body: ['Decision approved record میں capture ہوتا ہے، owner کو assign ہوتا ہے، progress signals سے track ہوتا ہے، reporting میں ظاہر ہوتا ہے اور completion evidence کے ساتھ close ہوتا ہے۔'] },
        { id: 'governance-impact', title: 'گورننس اور execution اثرات', body: ['اس سے accountability بڑھتی ہے، بھولی ہوئی actions کم ہوتی ہیں، delay risk جلد دکھائی دیتی ہے اور leadership کو بہتر visibility ملتی ہے۔'] },
        { id: 'proof', title: 'عملی شواہد', body: ['Platform دکھا سکتا ہے کہ decision کا owner کون ہے، due date کیا ہے، وہ delayed ہے یا نہیں، کیا actions لیے گئے اور closure evidence کیا ہے۔'] },
        { id: 'outcomes', title: 'انتظامی نتائج', body: ['نتیجہ ہے fewer lost decisions، stronger accountability، بہتر execution reporting، earlier intervention اور واضح evidence کہ governance decisions واقعی نافذ ہو رہے ہیں۔'] },
      ],
      relatedPages: ['boardManagementSystem', 'governanceReportsDashboards', 'roiBoardGovernance']
}
}
}
function createSections(template: PageTemplate, lang: LangCode): InternalPageCopy['sections'] {
  const p = pack[lang]
  const custom = template.sections[lang]
  if (custom?.length) return custom
  const summary = template.summaries[lang]
  const bullets = commonScreensBullets[lang]
  return [
    { id: 'problems', title: p.problemsTitle, body: [summary], bullets: template.solves?.[lang] ?? p.whatItSolvesLabel },
    { id: 'solution-overview', title: p.solutionTitle, body: [p.definitionLead] },
    { id: 'key-capabilities', title: p.capabilitiesTitle, body: [], bullets: template.solves?.[lang] ?? p.whatItSolvesLabel },
    { id: 'workflow', title: p.workflowTitle, body: [], bullets: template.workflows?.[lang] ?? p.commonWorkflow },
    { id: 'governance-impact', title: p.governanceTitle, body: [p.definitionLead], bullets: p.commonOutcomes },
    { id: 'proof', title: p.proofTitle, body: [summary], bullets },
    { id: 'executive-outcomes', title: p.outcomesTitle, body: p.commonOutcomes },
  ]
}

const contentPageCopy = {} as Record<LangCode, Record<ContentPageKey, InternalPageCopy>>
const emptyPages: Array<{ key: ContentPageKey; eyebrowType: 'solution' | 'trust' | 'platform' | 'support'; titles: Record<LangCode, string> }> = [
  { key: 'decisionTracking', eyebrowType: 'solution', titles: { ar:'متابعة القرارات', en:'Decision Tracking', hi:'निर्णय ट्रैकिंग', ur:'فیصلہ ٹریکنگ'} },
  { key: 'governmentGovernance', eyebrowType: 'solution', titles: { ar:'حوكمة للجهات الحكومية', en:'Governance for Government Entities', hi:'सरकारी संस्थाओं के लिए गवर्नेंस', ur:'سرکاری اداروں کے لیے گورننس'} },
  { key: 'listedCompaniesGovernance', eyebrowType: 'solution', titles: { ar:'حوكمة للشركات المدرجة', en:'Governance for Listed Companies', hi:'सूचीबद्ध कंपनियों के लिए गवर्नेंस', ur:'لسٹڈ کمپنیوں کے لیے گورننس'} },
  { key: 'bankingGovernance', eyebrowType: 'solution', titles: { ar:'حوكمة للبنوك', en:'Governance for Banks', hi:'बैंकों के लिए गवर्नेंस', ur:'بینکوں کے لیے گورننس'} },
  { key: 'securityCompliance', eyebrowType: 'trust', titles: { ar:'الأمن والامتثال المؤسسي', en:'Security & Compliance', hi:'सुरक्षा और अनुपालन', ur:'سیکیورٹی اور تعمیل'} },
  { key: 'aiGovernanceAssistant', eyebrowType: 'platform', titles: { ar:'وكيل الذكاء الاصطناعي للحوكمة', en:'AI Governance Assistant', hi:'AI गवर्नेंस सहायक', ur:'AI گورننس اسسٹنٹ'} },
  { key: 'governanceReports', eyebrowType: 'platform', titles: { ar:'تقارير الحوكمة التنفيذية', en:'Governance Reports', hi:'गवर्नेंस रिपोर्ट', ur:'گورننس رپورٹس'} },
  { key: 'support', eyebrowType: 'support', titles: { ar:'الدعم والتأهيل', en:'Support & Enablement', hi:'सपोर्ट और एनेबलमेंट', ur:'سپورٹ اور فعال سازی'} },
]

for (const lang of Object.keys(pack) as LangCode[]) {
  const p = pack[lang]
  contentPageCopy[lang] = {} as Record<ContentPageKey, InternalPageCopy>
  for (const template of templates) {
    const eyebrow = template.eyebrowType === 'trust' ? p.trustEyebrow : template.eyebrowType === 'platform' ? p.platformEyebrow : template.eyebrowType === 'support' ? p.supportEyebrow : p.solutionEyebrow
    contentPageCopy[lang][template.key] = {
      eyebrow,
      title: template.titles[lang],
      summary: template.summaries[lang],
      seoTitle: template.seoTitles[lang],
      seoDescription: template.seoDescriptions[lang],
      executiveSummary: p.executiveSummary,
      definition: template.definitions[lang],
      whoFor: template.audiences?.[lang] ?? p.commonAudience,
      whatItSolves: template.solves?.[lang] ?? p.whatItSolvesLabel,
      howItWorks: template.workflows?.[lang] ?? p.commonWorkflow,
      faq: template.faq[lang],
      relatedPages: template.relatedPages,
      sections: createSections(template, lang)
}
  }
  for (const empty of emptyPages) {
    if (!contentPageCopy[lang][empty.key]) {
      const eyebrow = empty.eyebrowType === 'trust' ? p.trustEyebrow : empty.eyebrowType === 'platform' ? p.platformEyebrow : empty.eyebrowType === 'support' ? p.supportEyebrow : p.solutionEyebrow
      contentPageCopy[lang][empty.key] = makeGenericPageCopy(lang, empty.titles[lang], eyebrow)
    }
  }
}


for (const lang of Object.keys(qualityOverrides) as LangCode[]) {
  const langOverrides = qualityOverrides[lang]
  if (!langOverrides) continue
  for (const key of Object.keys(langOverrides) as ContentPageKey[]) {
    const current = contentPageCopy[lang][key]
    if (!current) continue
    contentPageCopy[lang][key] = { ...current, ...langOverrides[key] }
  }
}


const seoLinkOverrides: Partial<Record<ContentPageKey, ContentPageKey[]>> = {
  boardManagementSystem: ['meetingMinutesEsignature', 'decisionTracking', 'attendanceQuorumQr'],
  committeeManagementSoftware: ['boardManagementSystem', 'meetingMinutesEsignature', 'decisionTracking'],
  generalAssemblyManagement: ['attendanceQuorumQr', 'meetingMinutesEsignature', 'boardManagementSystem'],
  corporateSecretarySystem: ['meetingMinutesEsignature', 'boardManagementSystem', 'decisionTracking'],
  meetingMinutesEsignature: ['corporateSecretarySystem', 'decisionTracking', 'attendanceQuorumQr'],
  decisionTracking: ['boardManagementSystem', 'governanceReportsDashboards', 'roiBoardGovernance'],
  securityCompliance: ['governanceSecurityCompliance', 'integrationsBoardGovernance', 'implementationSupportTraining'],
  aiGovernanceAssistant: ['aiGovernanceDecisionSupport', 'meetingMinutesEsignature', 'decisionTracking'],
  governanceReports: ['governanceReportsDashboards', 'roiBoardGovernance', 'decisionTracking'],
}

for (const lang of Object.keys(contentPageCopy) as LangCode[]) {
  for (const key of Object.keys(seoLinkOverrides) as ContentPageKey[]) {
    const current = contentPageCopy[lang][key]
    if (!current) continue
    const overrideLinks = seoLinkOverrides[key]
    if (overrideLinks) current.relatedPages = overrideLinks
  }
}

export { contentPageCopy }
