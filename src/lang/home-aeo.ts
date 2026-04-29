import type { LangCode } from '@/lang/types'

export interface HomeAeoFaqItem {
  q: string
  a: string
}

export interface HomeAeoContent {
  sectionBadge: string
  sectionTitle: string
  sectionIntro: string
  cards: {
    directAnswer: { title: string; body: string }
    whoFor: { title: string; items: string[] }
    whatItSolves: { title: string; items: string[] }
    howItWorks: { title: string; items: string[] }
  }
  links: {
    features: string
    pricing: string
    support: string
  }
  faq: {
    groupTitle: string
    intro: string
    items: HomeAeoFaqItem[]
  }
}

const base: Record<'ar' | 'en' | 'hi' | 'ur', HomeAeoContent> = {
  ar: {
    sectionBadge: 'محتوى مهيأ لمحركات الإجابات',
    sectionTitle: 'إجابات واضحة قبل طلب العرض التوضيحي',
    sectionIntro:
      'هذا الملخص موجّه لصناع القرار الذين يريدون معرفة ما إذا كان ديوان سويت مناسبًا لإدارة المجالس واللجان والقرارات والتنفيذ والامتثال داخل الجهات السعودية.',
    cards: {
      directAnswer: {
        title: 'لمحة سريعة',
        body:
          'ديوان سويت منصة حوكمة مؤسسية لإدارة المجلس واللجنة والاجتماع والمحضر والقرار والمهمة والمتابعة والتقارير والامتثال في سجل واحد موثق وقابل للتدقيق.',
      },
      whoFor: {
        title: 'لمن صُمم',
        items: [
          'مجالس الإدارة واللجان وأمانات المجالس.',
          'الجهات الحكومية والهيئات والشركات المتوسطة والكبيرة.',
          'فرق الحوكمة والامتثال والمراجعة الداخلية.',
          'الإدارة التنفيذية ووحدات المتابعة والتحول الرقمي.',
        ],
      },
      whatItSolves: {
        title: 'ما الذي يعالجه',
        items: [
          'تشتت الدعوات والمحاضر والمرفقات بين البريد والملفات والجداول.',
          'تأخر اعتماد المحاضر وضعف متابعة تنفيذ القرارات.',
          'غياب المسؤولية الواضحة عن التنفيذ والتصعيد والقياس.',
          'صعوبة إثبات الامتثال والجاهزية للتدقيق الداخلي والخارجي.',
        ],
      },
      howItWorks: {
        title: 'كيف يعمل',
        items: [
          'ينشئ الاجتماع ويضبط الأعضاء والبنود والمرفقات.',
          'يرسل الدعوات ويتابع الحضور والنصاب والاعتذارات.',
          'يوثق المحاضر والاعتمادات والقرارات إلكترونيًا.',
          'يحوّل القرارات إلى مهام ويتابع التنفيذ عبر تقارير ولوحات واضحة.',
        ],
      },
    },
    links: {
      features: 'استعرض القدرات الرئيسية',
      pricing: 'راجع الباقات',
      support: 'تواصل مع الفريق',
    },
    faq: {
      groupTitle: 'أسئلة سريعة عن حوكمة المجالس',
      intro: 'إجابات مختصرة وواضحة تساعد الزائر ومحركات الإجابات على فهم المنتج وسيناريو استخدامه بسرعة.',
      items: [
        { q: 'هل ديوان سويت مجرد نظام اجتماعات؟', a: 'لا. ديوان سويت منصة حوكمة مؤسسية تربط الاجتماع بالمحضر والقرار والتنفيذ والتقارير والامتثال.' },
        { q: 'هل يدعم إدارة مجالس الإدارة واللجان والجمعيات؟', a: 'نعم. يدعم المجالس واللجان والجمعيات العمومية مع صلاحيات ومسارات عمل وتقارير مستقلة.' },
        { q: 'هل يدعم الاجتماعات الحضورية والافتراضية والهجينة؟', a: 'نعم. يدعم النماذج التشغيلية الثلاثة مع حضور ونصاب ومحاضر وقرارات مرتبطة بالمتابعة.' },
        { q: 'هل يساعد الذكاء الاصطناعي فعليًا؟', a: 'نعم. يساعد على التلخيص، واستخراج القرارات والتوصيات، واقتراح المهام، وكشف مؤشرات التأخير مع اعتماد بشري نهائي.' },
        { q: 'هل المنصة مناسبة للجهات الخاضعة للرقابة؟', a: 'نعم. توفر سجل تدقيق، واعتمادات موثقة، وصلاحيات دقيقة، وتقارير تدعم الجاهزية للرقابة والتدقيق.' },
        { q: 'هل تتكامل مع الأنظمة الحالية؟', a: 'نعم. تدعم التكامل مع الأنظمة المؤسسية والتقويمات ومنصات الاجتماعات وبيئات الوثائق.' },
      ],
    },
  },
  en: {
    sectionBadge: 'Answer-engine ready content',
    sectionTitle: 'Clear answers before you book a demo',
    sectionIntro:
      'This summary is designed for decision-makers who need to know whether Diwan Suite fits boards, committees, decisions, execution, and compliance inside Saudi organizations.',
    cards: {
      directAnswer: {
        title: 'Quick overview',
        body:
          'Diwan Suite is an institutional governance platform that manages boards, committees, meetings, minutes, decisions, tasks, follow-up, reporting, and compliance in one auditable record.',
      },
      whoFor: {
        title: 'Who it is for',
        items: [
          'Boards, committees, and corporate secretariat teams.',
          'Government entities, listed companies, and enterprise organizations.',
          'Governance, compliance, and internal audit teams.',
          'Executive leadership and follow-up offices.',
        ],
      },
      whatItSolves: {
        title: 'What it solves',
        items: [
          'Scattered invitations, minutes, and attachments across email and folders.',
          'Delayed approvals and weak decision execution tracking.',
          'No clear ownership, escalation path, or execution measurement.',
          'Difficult audit readiness and weak proof of compliance.',
        ],
      },
      howItWorks: {
        title: 'How it works',
        items: [
          'Create the meeting and structure members, agenda, and attachments.',
          'Send invitations and track attendance, quorum, and apologies.',
          'Document minutes, approvals, and decisions in a governed workflow.',
          'Turn decisions into tasks and monitor execution through dashboards and reports.',
        ],
      },
    },
    links: {
      features: 'Explore core capabilities',
      pricing: 'Review pricing',
      support: 'Contact the team',
    },
    faq: {
      groupTitle: 'Quick answers about board governance',
      intro: 'Short, direct answers that help buyers and answer engines understand the platform quickly.',
      items: [
        { q: 'Is Diwan Suite just meeting software?', a: 'No. It is a governance platform that connects meetings, minutes, decisions, execution, reporting, and compliance in one workflow.' },
        { q: 'Does it support boards, committees, and general assemblies?', a: 'Yes. It supports multiple governance entities with separate workflows, permissions, and reporting.' },
        { q: 'Does it support in-person, virtual, and hybrid meetings?', a: 'Yes. It supports all three operating models with attendance, quorum, minutes, and execution follow-up.' },
        { q: 'What does the AI layer actually do?', a: 'It helps summarize meetings, extract decisions and recommendations, suggest tasks, and flag delay signals while final approval remains human-led.' },
        { q: 'Is it suitable for regulated organizations?', a: 'Yes. It supports audit trails, documented approvals, granular permissions, and governance-grade record control.' },
        { q: 'Can it integrate with existing systems?', a: 'Yes. It supports enterprise integrations for calendars, meeting tools, line-of-business systems, and document environments.' },
      ],
    },
  },
  hi: {
    sectionBadge: 'उत्तर इंजन हेतु तैयार सामग्री',
    sectionTitle: 'डेमो बुक करने से पहले स्पष्ट उत्तर',
    sectionIntro:
      'यह सारांश उन निर्णयकर्ताओं के लिए है जो जानना चाहते हैं कि क्या Diwan Suite उनकी संस्था में बोर्ड, समितियों, निर्णय, निष्पादन और अनुपालन के लिए उपयुक्त है।',
    cards: {
      directAnswer: {
        title: 'त्वरित परिचय',
        body:
          'Diwan Suite एक संस्थागत गवर्नेंस प्लेटफ़ॉर्म है जो बोर्ड, समितियाँ, बैठकें, कार्यवृत्त, निर्णय, कार्य, अनुवर्ती, रिपोर्टिंग और अनुपालन को एक ही audit-ready रिकॉर्ड में जोड़ता है।',
      },
      whoFor: {
        title: 'किसके लिए',
        items: [
          'बोर्ड, समितियाँ और सचिवालय टीमें।',
          'सरकारी संस्थाएँ, सूचीबद्ध कंपनियाँ और बड़े संगठन।',
          'गवर्नेंस, अनुपालन और आंतरिक ऑडिट टीमें।',
          'कार्यकारी नेतृत्व और follow-up कार्यालय।',
        ],
      },
      whatItSolves: {
        title: 'यह क्या हल करता है',
        items: [
          'ईमेल और फोल्डरों में बिखरे आमंत्रण, कार्यवृत्त और अटैचमेंट।',
          'देरी से अनुमोदन और निर्णय निष्पादन की कमजोर ट्रैकिंग।',
          'स्वामित्व, escalation और मापन की अस्पष्टता।',
          'ऑडिट तत्परता और अनुपालन प्रमाण में कठिनाई।',
        ],
      },
      howItWorks: {
        title: 'यह कैसे काम करता है',
        items: [
          'बैठक बनाएँ और सदस्य, एजेंडा तथा अटैचमेंट संरचित करें।',
          'आमंत्रण भेजें और उपस्थिति, quorum तथा अनुपस्थिति ट्रैक करें।',
          'कार्यवृत्त, अनुमोदन और निर्णयों को नियंत्रित workflow में दर्ज करें।',
          'निर्णयों को tasks में बदलें और dashboards व reports से execution देखें।',
        ],
      },
    },
    links: {
      features: 'मुख्य क्षमताएँ देखें',
      pricing: 'मूल्य देखें',
      support: 'टीम से संपर्क करें',
    },
    faq: {
      groupTitle: 'बोर्ड गवर्नेंस पर त्वरित प्रश्न',
      intro: 'संक्षिप्त उत्तर जो खरीदारों और answer engines को प्लेटफ़ॉर्म समझने में मदद करते हैं।',
      items: [
        { q: 'क्या Diwan Suite केवल meeting software है?', a: 'नहीं। यह governance platform है जो meeting, minutes, decisions, execution, reporting और compliance को एक workflow में जोड़ता है।' },
        { q: 'क्या यह बोर्ड, समितियाँ और general assemblies संभालता है?', a: 'हाँ। यह अलग workflows, permissions और reporting के साथ अनेक governance entities का समर्थन करता है।' },
        { q: 'क्या यह in-person, virtual और hybrid meetings का समर्थन करता है?', a: 'हाँ। यह तीनों मॉडलों को attendance, quorum, minutes और execution follow-up के साथ संभालता है।' },
        { q: 'AI वास्तव में क्या करता है?', a: 'यह meeting summaries, decision extraction, task suggestions और delay indicators में मदद करता है, जबकि अंतिम approval मानव के पास रहता है।' },
        { q: 'क्या यह regulated संस्थाओं के लिए उपयुक्त है?', a: 'हाँ। यह audit trail, documented approvals, granular permissions और governance-grade record control देता है।' },
        { q: 'क्या यह existing systems से जुड़ सकता है?', a: 'हाँ। यह enterprise calendars, meeting tools, business systems और document environments से integrate कर सकता है।' },
      ],
    },
  },
  ur: {
    sectionBadge: 'جواب انجن کے لیے تیار مواد',
    sectionTitle: 'ڈیمو بک کرنے سے پہلے واضح جوابات',
    sectionIntro:
      'یہ خلاصہ ان فیصلہ سازوں کے لیے ہے جو جاننا چاہتے ہیں کہ آیا Diwan Suite ان کے ادارے میں بورڈز، کمیٹیوں، فیصلوں، نفاذ اور تعمیل کے لیے مناسب ہے یا نہیں۔',
    cards: {
      directAnswer: {
        title: 'فوری خلاصہ',
        body:
          'Diwan Suite ایک ادارہ جاتی گورننس پلیٹ فارم ہے جو بورڈز، کمیٹیوں، اجلاس، محاضر، فیصلوں، tasks، follow-up، reporting اور compliance کو ایک ہی audit-ready ریکارڈ میں جوڑتا ہے۔',
      },
      whoFor: {
        title: 'یہ کس کے لیے ہے',
        items: [
          'بورڈز، کمیٹیاں اور سیکریٹریٹ ٹیمیں۔',
          'سرکاری ادارے، listed companies اور بڑے ادارے۔',
          'گورننس، تعمیل اور اندرونی آڈٹ ٹیمیں۔',
          'ایگزیکٹو قیادت اور follow-up دفاتر۔',
        ],
      },
      whatItSolves: {
        title: 'یہ کیا حل کرتا ہے',
        items: [
          'ای میل اور فولڈرز میں بکھری دعوتیں، محاضر اور منسلکات۔',
          'منظوری میں تاخیر اور فیصلوں کے نفاذ کی کمزور ٹریکنگ۔',
          'ملکیت، escalation اور پیمائش کی غیر واضح صورت۔',
          'آڈٹ readiness اور تعمیل کے ثبوت میں مشکل۔',
        ],
      },
      howItWorks: {
        title: 'یہ کیسے کام کرتا ہے',
        items: [
          'اجلاس بنائیں اور اراکین، agenda اور attachments کو منظم کریں۔',
          'دعوتیں بھیجیں اور attendance، quorum اور excuses کو track کریں۔',
          'محاضر، approvals اور decisions کو governed workflow میں دستاویز کریں۔',
          'فیصلوں کو tasks میں بدلیں اور dashboards و reports سے execution دیکھیں۔',
        ],
      },
    },
    links: {
      features: 'اہم صلاحیتیں دیکھیں',
      pricing: 'قیمتیں دیکھیں',
      support: 'ٹیم سے رابطہ کریں',
    },
    faq: {
      groupTitle: 'بورڈ گورننس کے بارے میں فوری سوالات',
      intro: 'مختصر جوابات جو خریداروں اور answer engines کو پلیٹ فارم جلد سمجھنے میں مدد دیتے ہیں۔',
      items: [
        { q: 'کیا Diwan Suite صرف meeting software ہے؟', a: 'نہیں۔ یہ governance platform ہے جو meetings، minutes، decisions، execution، reporting اور compliance کو ایک workflow میں جوڑتا ہے۔' },
        { q: 'کیا یہ بورڈز، کمیٹیوں اور general assemblies کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ یہ متعدد governance entities کو الگ workflows، permissions اور reporting کے ساتھ سپورٹ کرتا ہے۔' },
        { q: 'کیا یہ حضوری، virtual اور hybrid meetings کے لیے موزوں ہے؟', a: 'جی ہاں۔ یہ تینوں operational models کو attendance، quorum، minutes اور execution follow-up کے ساتھ سنبھالتا ہے۔' },
        { q: 'AI اصل میں کیا کرتا ہے؟', a: 'یہ meeting summaries، decision extraction، task suggestions اور delay indicators میں مدد دیتا ہے، جبکہ حتمی approval انسان کے پاس رہتی ہے۔' },
        { q: 'کیا یہ regulated اداروں کے لیے موزوں ہے؟', a: 'جی ہاں۔ یہ audit trail، documented approvals، granular permissions اور governance-grade record control فراہم کرتا ہے۔' },
        { q: 'کیا یہ existing systems کے ساتھ integrate ہو سکتا ہے؟', a: 'جی ہاں۔ یہ enterprise calendars، meeting tools، business systems اور document environments سے جڑ سکتا ہے۔' },
      ],
    },
  },
}

export function getHomeAeoContent(lang: LangCode): HomeAeoContent {
  if (lang === 'ar' || lang === 'en' || lang === 'hi' || lang === 'ur') return base[lang]
  return base.en
}
