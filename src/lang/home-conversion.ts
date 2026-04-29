import type { LangCode } from './types'

export interface HomeConversionMetric {
  value: string
  label: string
  note: string
}

export interface HomeConversionRole {
  role: string
  summary: string
  points: string[]
}

export interface HomeConversionContent {
  heroCtas: {
    primary: string
    secondary: string
    microcopy: string
  }
  finalCtas: {
    primary: string
    secondary: string
  }
  whyNow: {
    badge: string
    title: string
    intro: string
    items: Array<{ title: string; desc: string }>
    ctaHeading: string
    ctaText: string
    primary: string
    secondary: string
  }
  beforeAfter: {
    badge: string
    title: string
    intro: string
    withoutLabel: string
    withLabel: string
    rows: Array<{ label: string; without: string; with: string }>
  }
  results: {
    badge: string
    title: string
    intro: string
    metrics: HomeConversionMetric[]
    disclaimer: string
    ctaHeading: string
    ctaText: string
    primary: string
  }
  workflow: {
    badge: string
    title: string
    intro: string
    steps: string[]
  }
  executiveValue: {
    badge: string
    title: string
    intro: string
    roles: HomeConversionRole[]
  }
}

const ar: HomeConversionContent = {
  heroCtas: {
    primary: 'احجز عرض توضيحي',
    secondary: 'اطلب استشارة مجانية',
    microcopy: 'جلسة مخصصة لقيادات الحوكمة والالتزام وتقنية المعلومات داخل الجهة.'
},
  finalCtas: {
    primary: 'ابدأ التحول في حوكمة مؤسستك',
    secondary: 'اطلب استشارة مجانية'
},
  whyNow: {
    badge: 'لماذا الآن',
    title: 'لماذا تحتاج الجهات إلى حوكمة رقمية الآن؟',
    intro:
      'تزايد المتطلبات الرقابية، وتسارع دورات القرار، وارتفاع توقعات الشفافية يجعل إدارة الاجتماعات والقرارات بالأساليب التقليدية عبئًا تشغيليًا ومخاطرة مؤسسية في الوقت نفسه.',
    items: [
      {
        title: 'مخاطر عدم الحوكمة',
        desc: 'تعدد النسخ اليدوية والاجتهادات الفردية يرفع احتمالية فقدان المستندات أو اختلاف المرجعية عند الحاجة للمراجعة.'
},
      {
        title: 'ضعف تنفيذ القرارات',
        desc: 'عندما لا يرتبط القرار بمالك واضح وتاريخ استحقاق ومسار متابعة، تتأخر المخرجات وتفقد الاجتماعات أثرها التنفيذي.'
},
      {
        title: 'فقدان الشفافية',
        desc: 'غياب السجل الموحد للحضور والمحاضر والاعتمادات يجعل رؤية الحالة الحالية للمجلس أو اللجنة غير مكتملة للإدارة العليا.'
},
      {
        title: 'صعوبة التدقيق',
        desc: 'التدقيق الداخلي والخارجي يتعثر عند توزيع الأدلة بين البريد والملفات والجداول بدل وجود أثر رقمي منظم وقابل للتتبع.'
},
    ],
    ctaHeading: 'عندما تتسع المؤسسة، لا يكفي توثيق الاجتماع فقط، بل يجب ضبط القرار وتنفيذه وإثباته رقابيًا.',
    ctaText: 'اطلع على كيف يحوّل ديوان سويت مسار الحوكمة من متابعة يدوية متفرقة إلى دورة رقمية قابلة للقياس.',
    primary: 'احجز عرض توضيحي',
    secondary: 'اطلب استشارة مجانية'
},
  beforeAfter: {
    badge: 'قبل وبعد',
    title: 'قبل وبعد ديوان سويت',
    intro: 'مقارنة مباشرة بين إدارة الاجتماعات بالوسائل التقليدية وإدارتها عبر منصة حوكمة مؤسسية موحدة.',
    withoutLabel: 'بدون النظام',
    withLabel: 'مع ديوان سويت',
    rows: [
      {
        label: 'متابعة القرارات',
        without: 'قرارات موزعة بين البريد والجداول والمتابعة الشخصية.',
        with: 'كل قرار مرتبط بمسؤول وتاريخ استحقاق وحالة تنفيذ ولوحة متابعة واحدة.'
},
      {
        label: 'سرعة اعتماد المحاضر',
        without: 'تأخير بسبب المراجعات اليدوية وتبادل النسخ المتعددة.',
        with: 'مسار اعتماد رقمي منظم مع إشعارات وسجل واضح للإصدارات.'
},
      {
        label: 'وضوح المسؤوليات',
        without: 'عدم وضوح المالك التنفيذي ومصير التوصيات بعد الاجتماع.',
        with: 'إسناد مباشر للمهام والقرارات مع مساءلة واضحة وقياس للتقدم.'
},
      {
        label: 'الجاهزية الرقابية',
        without: 'الرجوع للأدلة يستغرق وقتًا ويعتمد على ملفات متناثرة.',
        with: 'أثر رقمي موحد للحضور والمحاضر والقرارات والاعتمادات جاهز للتدقيق.'
},
    ]
},
  results: {
    badge: 'نتائج تشغيلية',
    title: 'نتائج قابلة للقياس',
    intro:
      'يعرض ديوان سويت نتائج تشغيلية متوقعة عند توحيد دورة الحوكمة رقميًا، وهي أمثلة واقعية شائعة تعتمد على نضج العمليات وسرعة التبني داخل الجهة.',
    metrics: [
      {
        value: 'حتى 60%',
        label: 'تقليل تأخر القرارات',
        note: 'عبر المتابعة المنظمة والتنبيهات والتصعيد وربط القرار بالتنفيذ.'
},
      {
        value: 'حتى 90%',
        label: 'رفع نسبة تنفيذ القرارات',
        note: 'عند تحويل قرارات المجالس واللجان إلى عناصر متابعة قابلة للقياس.'
},
      {
        value: 'حتى 70%',
        label: 'تقليل وقت إعداد المحاضر',
        note: 'بفضل القوالب الذكية وسير الاعتماد والتوثيق المنظم.'
},
      {
        value: 'جاهزية فورية',
        label: 'للتدقيق والامتثال',
        note: 'من خلال سجل موحد للحضور والمحاضر والقرارات والاعتمادات.'
},
    ],
    disclaimer:
      'هذه النتائج أمثلة تشغيلية تقديرية وليست التزامًا قانونيًا ثابتًا، وتتأثر بحجم الجهة، وعدد المجالس واللجان، ومستوى التبني الداخلي.',
    ctaHeading: 'هل تحتاج جهة قيادية داخلية لرؤية فورية لحالة القرارات واللجان؟',
    ctaText: 'رتّب جلسة تعريفية لنموذج قياس الحوكمة داخل مؤسستك واستعرض السيناريو الأنسب لهيكلتك التنظيمية.',
    primary: 'ابدأ التحول في حوكمة مؤسستك'
},
  workflow: {
    badge: 'مسار العمل',
    title: 'كيف تتم إدارة الاجتماع داخل ديوان سويت؟',
    intro: 'تنتقل دورة الاجتماع من التحضير إلى التنفيذ عبر خطوات مترابطة تقلل الفاقد التشغيلي وتزيد وضوح المساءلة.',
    steps: [
      'إنشاء الاجتماع',
      'إرسال الدعوات',
      'تسجيل الحضور',
      'إدارة الاجتماع',
      'إصدار القرارات',
      'اعتماد المحضر',
      'تحويل القرار إلى مهام',
      'متابعة التنفيذ',
      'إصدار التقارير',
    ]
},
  executiveValue: {
    badge: 'القيمة للإدارة العليا',
    title: 'ماذا يستفيد صناع القرار؟',
    intro: 'يعطي ديوان سويت للإدارة العليا والجهات الرقابية رؤية موحدة على مسار الاجتماع والقرار والتنفيذ بدل الاكتفاء بالتوثيق فقط.',
    roles: [
      {
        role: 'الرئيس التنفيذي',
        summary: 'يرى أثر الاجتماعات على التنفيذ الفعلي بدل الاكتفاء بالقرارات النظرية.',
        points: ['رؤية فورية لحالة القرارات الحرجة', 'تقليل زمن الانتظار بين القرار والتنفيذ', 'تقارير مختصرة تدعم سرعة التوجيه']
},
      {
        role: 'أعضاء مجلس الإدارة',
        summary: 'يحصلون على مسار حوكمة واضح يرفع جودة المتابعة ويقلل فجوات الاعتماد.',
        points: ['وضوح أكبر في المسؤوليات والمواعيد', 'محاضر واعتمادات مؤرشفة ويمكن الرجوع إليها', 'متابعة مؤشرات الحضور والتنفيذ والالتزام']
},
      {
        role: 'مسؤولو الالتزام والحوكمة',
        summary: 'يتوفر لديهم سجل رقمي يدعم التدقيق ويرفع جاهزية التقارير والامتثال.',
        points: ['أثر تدقيقي موحد وقابل للتتبع', 'تقليل المخاطر الناتجة عن التوثيق اليدوي', 'تحسين الامتثال والاستعداد للمراجعات الرقابية']
},
    ]
}
}

const en: HomeConversionContent = {
  heroCtas: {
    primary: 'Book a demo',
    secondary: 'Request a free consultation',
    microcopy: 'A tailored session for governance, compliance, and enterprise IT leadership teams.'
},
  finalCtas: {
    primary: 'Start the governance transformation',
    secondary: 'Request a free consultation'
},
  whyNow: {
    badge: 'Why now',
    title: 'Why do organizations need digital governance now?',
    intro:
      'Rising regulatory expectations, faster decision cycles, and stronger transparency requirements make manual meeting governance a costly operational burden and an institutional risk.',
    items: [
      {
        title: 'Governance risk exposure',
        desc: 'Scattered files, email trails, and manual practices increase the risk of inconsistent records and weak institutional control.'
},
      {
        title: 'Weak decision execution',
        desc: 'When decisions are not linked to owners, due dates, and follow-up status, meetings lose executive impact.'
},
      {
        title: 'Loss of transparency',
        desc: 'Without a unified record for attendance, minutes, approvals, and actions, leadership lacks a reliable view of current status.'
},
      {
        title: 'Audit difficulty',
        desc: 'Internal and external audit becomes slower when evidence is spread across inboxes, spreadsheets, and uncontrolled files.'
},
    ],
    ctaHeading: 'As the institution grows, documenting the meeting is no longer enough; execution, accountability, and auditability must also be governed.',
    ctaText: 'See how Diwan Suite turns fragmented follow-up into a measurable governance cycle.',
    primary: 'Book a demo',
    secondary: 'Request a free consultation'
},
  beforeAfter: {
    badge: 'Before & after',
    title: 'Before and after Diwan Suite',
    intro: 'A direct comparison between traditional meeting handling and a unified governance workflow.',
    withoutLabel: 'Without the platform',
    withLabel: 'With Diwan Suite',
    rows: [
      {
        label: 'Decision follow-up',
        without: 'Decisions are spread across email, spreadsheets, and personal follow-up.',
        with: 'Every decision is linked to an owner, due date, status, and a single tracking view.'
},
      {
        label: 'Minutes approval speed',
        without: 'Manual reviews and multiple versions delay final approval.',
        with: 'A controlled digital approval path with notifications and version visibility.'
},
      {
        label: 'Responsibility clarity',
        without: 'Ownership remains vague after the meeting ends.',
        with: 'Actions and decisions are assigned directly with measurable accountability.'
},
      {
        label: 'Audit readiness',
        without: 'Evidence retrieval is slow and depends on fragmented records.',
        with: 'Attendance, minutes, approvals, and decisions remain available in one auditable trail.'
},
    ]
},
  results: {
    badge: 'Operational outcomes',
    title: 'Measurable outcomes',
    intro:
      'Diwan Suite supports measurable governance improvement when the full decision cycle is managed digitally. The figures below are realistic operating examples and vary by organizational maturity and adoption.',
    metrics: [
      {
        value: 'Up to 60%',
        label: 'less decision delay',
        note: 'Through structured follow-up, alerts, escalation, and ownership tracking.'
},
      {
        value: 'Up to 90%',
        label: 'decision execution rate',
        note: 'When board and committee decisions are converted into measurable follow-up items.'
},
      {
        value: 'Up to 70%',
        label: 'less time to prepare minutes',
        note: 'With structured templates, automation support, and approval workflows.'
},
      {
        value: 'Instant readiness',
        label: 'for audit and compliance',
        note: 'Because attendance, minutes, approvals, and decisions remain centrally documented.'
},
    ],
    disclaimer:
      'These figures are indicative operational examples, not legal guarantees. Actual outcomes depend on governance maturity, process design, and adoption across the organization.',
    ctaHeading: 'Need leadership-level visibility into board, committee, and decision status?',
    ctaText: 'Book a walkthrough of the Diwan Suite governance model mapped to your organizational structure.',
    primary: 'Start the governance transformation'
},
  workflow: {
    badge: 'Workflow',
    title: 'How is a meeting managed inside Diwan Suite?',
    intro: 'The meeting lifecycle moves from preparation to execution through a connected operating flow that reduces friction and improves accountability.',
    steps: [
      'Create the meeting',
      'Send invitations',
      'Record attendance',
      'Run the meeting',
      'Issue decisions',
      'Approve minutes',
      'Convert decisions to tasks',
      'Track execution',
      'Generate reports',
    ]
},
  executiveValue: {
    badge: 'Executive value',
    title: 'What do decision-makers gain?',
    intro: 'Diwan Suite gives executives, board members, and compliance teams a unified operating view of meetings, decisions, follow-up, and governance readiness.',
    roles: [
      {
        role: 'CEO',
        summary: 'Moves from meeting documentation to measurable execution oversight.',
        points: ['Immediate visibility into critical decisions', 'Faster movement from approval to execution', 'Executive reporting that supports action']
},
      {
        role: 'Board Members',
        summary: 'Gain a clearer governance trail and stronger discipline around responsibility and approvals.',
        points: ['Clearer ownership and due dates', 'Approved minutes and records available on demand', 'Better visibility into attendance, execution, and compliance']
},
      {
        role: 'Compliance Officers',
        summary: 'Receive a controlled digital trail that improves audit readiness and governance assurance.',
        points: ['Traceable audit evidence in one place', 'Lower risk from manual documentation practices', 'Stronger compliance and regulatory readiness']
},
    ]
}
}

export const homeConversionContent: Record<LangCode, HomeConversionContent> = {
  ar,
  en,



  hi: {
    ...en,
    heroCtas: {
      primary: 'डेमो बुक करें',
      secondary: 'निःशुल्क परामर्श का अनुरोध करें',
      microcopy: 'गवर्नेंस, अनुपालन और एंटरप्राइज़ आईटी नेतृत्व टीमों के लिए अनुकूलित सत्र।'
},
    finalCtas: {
      primary: 'गवर्नेंस परिवर्तन शुरू करें',
      secondary: 'निःशुल्क परामर्श का अनुरोध करें'
},
    whyNow: {
      ...en.whyNow,
      badge: 'क्यों अब',
      title: 'संस्थाओं को अब डिजिटल गवर्नेंस की आवश्यकता क्यों है?',
      intro: 'नियामक अपेक्षाएँ, तेज़ निर्णय चक्र और पारदर्शिता की बढ़ती मांग manual governance को महँगा और जोखिमपूर्ण बनाती है।',
      ctaHeading: 'जैसे-जैसे संस्था बढ़ती है, केवल बैठक का दस्तावेज़ीकरण पर्याप्त नहीं रहता; execution, accountability और auditability को भी govern करना पड़ता है।',
      ctaText: 'देखें कि Diwan Suite fragmented follow-up को measurable governance cycle में कैसे बदलता है।',
      primary: 'डेमो बुक करें',
      secondary: 'निःशुल्क परामर्श का अनुरोध करें'
},
    beforeAfter: {
      ...en.beforeAfter,
      badge: 'पहले और बाद',
      title: 'Diwan Suite से पहले और बाद',
      intro: 'पारंपरिक meeting handling और एकीकृत governance workflow के बीच सीधी तुलना।',
      withoutLabel: 'प्लेटफ़ॉर्म के बिना',
      withLabel: 'Diwan Suite के साथ'
},
    results: {
      ...en.results,
      badge: 'परिचालन परिणाम',
      title: 'मापनीय परिणाम',
      intro: 'डिजिटल governance cycle अपनाने पर मिलने वाले सामान्य परिचालन परिणामों के उदाहरण।',
      disclaimer: 'ये संख्याएँ अनुमानित परिचालन उदाहरण हैं; वास्तविक परिणाम संस्था के आकार, प्रक्रिया डिज़ाइन और अपनाने की परिपक्वता पर निर्भर करते हैं।',
      ctaHeading: 'क्या नेतृत्व को boards, committees और decisions की स्थिति पर स्पष्ट दृश्यता चाहिए?',
      ctaText: 'अपने संगठनात्मक ढाँचे के अनुरूप Diwan Suite governance model का walkthrough बुक करें।',
      primary: 'गवर्नेंस परिवर्तन शुरू करें'
},
    workflow: {
      ...en.workflow,
      badge: 'वर्कफ़्लो',
      title: 'Diwan Suite के भीतर बैठक कैसे संचालित होती है?',
      intro: 'बैठक lifecycle तैयारी से execution तक एक जुड़े हुए flow में आगे बढ़ता है जो friction कम करता है और accountability बढ़ाता है।',
      steps: ['बैठक बनाएं','आमंत्रण भेजें','उपस्थिति दर्ज करें','बैठक संचालित करें','निर्णय जारी करें','कार्यवृत्त अनुमोदित करें','निर्णयों को tasks में बदलें','execution ट्रैक करें','रिपोर्ट तैयार करें']
},
    executiveValue: {
      ...en.executiveValue,
      badge: 'कार्यकारी मूल्य',
      title: 'निर्णय-निर्माताओं को क्या मिलता है?',
      intro: 'Diwan Suite executives, board members और compliance teams को meetings, decisions, follow-up और governance readiness का एकीकृत दृश्य देता है।'
}
},
  ur: {
    ...en,
    heroCtas: {
      primary: 'ڈیمو بک کریں',
      secondary: 'مفت مشاورت کی درخواست کریں',
      microcopy: 'گورننس، تعمیل اور انٹرپرائز آئی ٹی قیادت کے لیے مخصوص سیشن۔'
},
    finalCtas: {
      primary: 'گورننس تبدیلی شروع کریں',
      secondary: 'مفت مشاورت کی درخواست کریں'
},
    whyNow: {
      ...en.whyNow,
      badge: 'کیوں ابھی',
      title: 'اداروں کو اب ڈیجیٹل گورننس کیوں درکار ہے؟',
      intro: 'ضابطہ جاتی توقعات، تیز فیصلہ جاتی چکر اور شفافیت کی بڑھتی ضرورت manual governance کو مہنگا اور پرخطر بناتی ہے۔',
      ctaHeading: 'جیسے جیسے ادارہ بڑھتا ہے، صرف میٹنگ کا ریکارڈ کافی نہیں رہتا؛ execution، accountability اور auditability کو بھی govern کرنا پڑتا ہے۔',
      ctaText: 'دیکھیں کہ Diwan Suite fragmented follow-up کو measurable governance cycle میں کیسے بدلتا ہے۔',
      primary: 'ڈیمو بک کریں',
      secondary: 'مفت مشاورت کی درخواست کریں'
},
    beforeAfter: {
      ...en.beforeAfter,
      badge: 'پہلے اور بعد',
      title: 'Diwan Suite سے پہلے اور بعد',
      intro: 'روایتی meeting handling اور ایک مربوط governance workflow کے درمیان براہِ راست موازنہ۔',
      withoutLabel: 'پلیٹ فارم کے بغیر',
      withLabel: 'Diwan Suite کے ساتھ'
},
    results: {
      ...en.results,
      badge: 'آپریشنل نتائج',
      title: 'قابلِ پیمائش نتائج',
      intro: 'ڈیجیٹل governance cycle اپنانے کے بعد حاصل ہونے والے عام آپریشنل نتائج کی مثالیں۔',
      disclaimer: 'یہ اعداد و شمار تخمینی آپریشنل مثالیں ہیں؛ حقیقی نتائج ادارے کے سائز، process design اور adoption maturity پر منحصر ہیں۔',
      ctaHeading: 'کیا قیادت کو boards، committees اور decisions کی حالت پر واضح visibility چاہیے؟',
      ctaText: 'اپنی تنظیمی ساخت کے مطابق Diwan Suite governance model کا walkthrough بک کریں۔',
      primary: 'گورننس تبدیلی شروع کریں'
},
    workflow: {
      ...en.workflow,
      badge: 'ورک فلو',
      title: 'Diwan Suite کے اندر اجلاس کیسے چلتا ہے؟',
      intro: 'میٹنگ lifecycle تیاری سے execution تک ایک مربوط flow میں آگے بڑھتا ہے جو friction کم کرتا ہے اور accountability بڑھاتا ہے۔',
      steps: ['اجلاس بنائیں','دعوتیں بھیجیں','حاضری ریکارڈ کریں','اجلاس چلائیں','فیصلے جاری کریں','محاضر منظور کریں','فیصلوں کو tasks میں بدلیں','execution ٹریک کریں','رپورٹس بنائیں']
},
    executiveValue: {
      ...en.executiveValue,
      badge: 'انتظامی قدر',
      title: 'فیصلہ سازوں کو کیا حاصل ہوتا ہے؟',
      intro: 'Diwan Suite executives، board members اور compliance teams کو meetings، decisions، follow-up اور governance readiness کا ایک مربوط منظر دیتا ہے۔'
}
}
}
