'use client'

import React from 'react'
import { Check, X, Minus } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'

// ─── Types ───────────────────────────────────────────────────────────────────

type FeatureStatus = 'full' | 'partial' | 'none'

interface ComparisonRow {
  name: string
  diwanSuite: FeatureStatus
  globalPlatforms: FeatureStatus
  generalTools: FeatureStatus
  nonLocalizedPortals: FeatureStatus
  /** Optional short label override for globalPlatforms cell (e.g. "limited by platform") */
  globalPlatformsNote?: string
  nonLocalizedPortalsNote?: string
}

// ─── Content ──────────────────────────────────────────────────────────────────

const CONTENT = {
  ar: {
    badge: 'المقارنة',
    heading: 'ديوان سويت ليس أداة اجتماعات… بل منصة حوكمة وتنفيذ للقرارات',
    intro: 'ديوان سويت ليس مجرد أداة لعقد الاجتماعات، بل منصة حوكمة مؤسسية متكاملة لإدارة المجالس واللجان والجمعيات العمومية من الدعوة وحتى اعتماد المحضر ومتابعة تنفيذ القرارات. يجمع النظام بين إدارة الاجتماعات، احتساب النصاب، إصدار المحاضر، التوقيع الإلكتروني، متابعة القرارات والمهام، التقارير التنفيذية، سجل التدقيق، والذكاء الاصطناعي في بيئة عربية آمنة مناسبة للجهات الحكومية والشركات والكيانات الكبرى.',
    columnHeaders: {
      feature: 'الميزة',
      diwanSuite: 'ديوان سويت',
      globalPlatforms: 'منصات اجتماعات عالمية',
      generalTools: 'أدوات اجتماعات عامة',
      nonLocalizedPortals: 'بوابات مجالس غير محلية',
    },
    features: [
      // Existing rows — updated values per spec
      { name: 'واجهة عربية RTL كاملة',                         diwanSuite: 'full', globalPlatforms: 'partial', generalTools: 'partial', nonLocalizedPortals: 'none' },
      { name: 'إدارة مجالس ولجان منفصلة',                       diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial', nonLocalizedPortalsNote: 'متوفر جزئيًا أو محدود' },
      { name: 'محاضر وتوقيع إلكتروني',                          diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'متابعة القرارات والمهام',                         diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'وكيل ذكاء اصطناعي لإنشاء المحاضر وتحليل الاجتماعات', diwanSuite: 'full', globalPlatforms: 'none', generalTools: 'none', nonLocalizedPortals: 'none' },
      { name: 'سجل تدقيق وامتثال',                              diwanSuite: 'full', globalPlatforms: 'partial', generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'استضافة داخل المملكة',                           diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'تكامل Zoom / Microsoft Teams / Google Meet / Webex', diwanSuite: 'full', globalPlatforms: 'partial', globalPlatformsNote: 'محدود حسب المنصة', generalTools: 'partial', nonLocalizedPortals: 'partial', nonLocalizedPortalsNote: 'حسب المورد' },
      // New rows per spec
      { name: 'إدارة الجمعيات العمومية',                        diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'احتساب النصاب النظامي',                          diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'مسارات اعتماد المحاضر',                          diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'ختم زمني وسجل تدقيق',                           diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'تقارير امتثال جاهزة',                            diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'دعم العربية والإنجليزية والهندية والأردية',       diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'إنشاء المحضر عبر الذكاء الاصطناعي',             diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'فحص القرارات عبر الذكاء الاصطناعي',             diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'إدارة ومتابعة القرارات',                         diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'إدارة قاعات الاجتماعات',                        diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
    ] as ComparisonRow[],
    legend: {
      full: 'مدعوم بالكامل',
      partial: 'محدود أو غير مخصص',
      none: 'غير متوفر',
    },
    summary: {
      heading: 'هل تريد مقارنة ديوان سويت مع طريقة عمل لجانكم الحالية؟',
      conclusion: 'إذا كانت حاجتك مجرد اجتماع مرئي، فقد تكفي منصات الاجتماعات العالمية. أما إذا كانت حاجتك إدارة مجلس أو لجنة أو جمعية عمومية مع محاضر رسمية، توقيع إلكتروني، متابعة قرارات، مهام تنفيذية، سجل تدقيق، تقارير امتثال، وذكاء اصطناعي؛ فديوان سويت مصمم لهذا الغرض من البداية.',
      subtext: 'احصل على عرض توضيحي يوضح كيف تتحول اجتماعات المجلس من دعوات ومحاضر متفرقة إلى قرارات قابلة للتنفيذ والقياس.',
      ctaPrimary: 'احجز عرضًا توضيحيًا',
      ctaSecondary: 'اطلب مقارنة مخصصة لجهتك',
    },
  },

  en: {
    badge: 'Comparison',
    heading: 'Diwan Suite is not a meeting tool — it is a governance and decision execution platform',
    intro: 'Diwan Suite is not just a video conferencing tool. It is a comprehensive institutional governance platform for managing boards, committees, and general assemblies — from invitation to minutes approval and decision execution follow-up. The system combines meeting management, quorum calculation, minutes issuance, e-signature, decision and task follow-up, executive reporting, audit trail, and AI in a secure Arabic-first environment built for government entities, corporations, and large organizations.',
    columnHeaders: {
      feature: 'Feature',
      diwanSuite: 'Diwan Suite',
      globalPlatforms: 'Global Meeting Platforms',
      generalTools: 'General Meeting Tools',
      nonLocalizedPortals: 'Non-Localized Board Portals',
    },
    features: [
      { name: 'Full Arabic RTL interface',                       diwanSuite: 'full', globalPlatforms: 'partial', generalTools: 'partial', nonLocalizedPortals: 'none' },
      { name: 'Separate board & committee management',           diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial', nonLocalizedPortalsNote: 'Partial / limited' },
      { name: 'Minutes & e-signature',                           diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'Decision & task follow-up',                       diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'AI agent for minutes creation & meeting analysis',diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Audit trail & compliance',                        diwanSuite: 'full', globalPlatforms: 'partial', generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'Saudi local hosting',                             diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Zoom / Microsoft Teams / Google Meet / Webex integration', diwanSuite: 'full', globalPlatforms: 'partial', globalPlatformsNote: 'Limited by platform', generalTools: 'partial', nonLocalizedPortals: 'partial', nonLocalizedPortalsNote: 'Vendor-dependent' },
      { name: 'General assembly management',                     diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Statutory quorum calculation',                    diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Minutes approval workflows',                      diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Timestamp & audit log',                           diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Ready-made compliance reports',                   diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Arabic, English, Hindi & Urdu support',           diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'AI-generated minutes',                            diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'AI decision review',                              diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Decision management & tracking',                  diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Meeting room management',                         diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
    ] as ComparisonRow[],
    legend: {
      full: 'Fully supported',
      partial: 'Limited / partial',
      none: 'Not available',
    },
    summary: {
      heading: 'Want to compare Diwan Suite with how your committees currently operate?',
      conclusion: 'If you only need a visual meeting, global meeting platforms may suffice. But if you need to manage a board, committee, or general assembly with formal minutes, e-signature, decision follow-up, execution tasks, audit trail, compliance reports, and AI — Diwan Suite was built for exactly this purpose from the ground up.',
      subtext: 'Get a demo that shows how board meetings transform from scattered invitations and minutes into measurable, executable decisions.',
      ctaPrimary: 'Book a Demo',
      ctaSecondary: 'Request a Custom Comparison',
    },
  },

  hi: {
    badge: 'तुलना',
    heading: 'Diwan Suite केवल मीटिंग टूल नहीं — यह एक गवर्नेंस और निर्णय निष्पादन प्लेटफ़ॉर्म है',
    intro: 'Diwan Suite सिर्फ एक वीडियो कॉन्फ्रेंसिंग टूल नहीं है। यह बोर्डों, समितियों और सामान्य सभाओं के प्रबंधन के लिए एक व्यापक संस्थागत गवर्नेंस प्लेटफ़ॉर्म है — आमंत्रण से लेकर मिनट्स अनुमोदन और निर्णय निष्पादन अनुवर्ती तक। यह प्रणाली मीटिंग प्रबंधन, कोरम गणना, मिनट्स जारी करना, ई-हस्ताक्षर, निर्णय और कार्य अनुवर्ती, कार्यकारी रिपोर्टिंग, ऑडिट ट्रेल, और AI को एक सुरक्षित वातावरण में जोड़ती है।',
    columnHeaders: {
      feature: 'विशेषता',
      diwanSuite: 'Diwan Suite',
      globalPlatforms: 'वैश्विक मीटिंग प्लेटफ़ॉर्म',
      generalTools: 'सामान्य मीटिंग टूल्स',
      nonLocalizedPortals: 'गैर-स्थानीयकृत बोर्ड पोर्टल',
    },
    features: [
      { name: 'पूर्ण अरबी RTL इंटरफ़ेस',                      diwanSuite: 'full', globalPlatforms: 'partial', generalTools: 'partial', nonLocalizedPortals: 'none' },
      { name: 'अलग बोर्ड और समिति प्रबंधन',                   diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial', nonLocalizedPortalsNote: 'आंशिक / सीमित' },
      { name: 'मिनट्स और ई-हस्ताक्षर',                        diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'निर्णय और कार्य अनुवर्ती',                     diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'मिनट्स निर्माण और विश्लेषण के लिए AI एजेंट',   diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'ऑडिट ट्रेल और अनुपालन',                        diwanSuite: 'full', globalPlatforms: 'partial', generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'सऊदी स्थानीय होस्टिंग',                        diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Zoom / Teams / Google Meet / Webex इंटीग्रेशन', diwanSuite: 'full', globalPlatforms: 'partial', globalPlatformsNote: 'प्लेटफ़ॉर्म पर निर्भर', generalTools: 'partial', nonLocalizedPortals: 'partial', nonLocalizedPortalsNote: 'विक्रेता पर निर्भर' },
      { name: 'सामान्य सभा प्रबंधन',                           diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'वैधानिक कोरम गणना',                             diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'मिनट्स अनुमोदन वर्कफ़्लो',                     diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'टाइमस्टैम्प और ऑडिट लॉग',                      diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'तैयार अनुपालन रिपोर्ट',                         diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'अरबी, अंग्रेज़ी, हिंदी और उर्दू समर्थन',        diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'AI-जनित मिनट्स',                                diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'AI निर्णय समीक्षा',                             diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'निर्णय प्रबंधन और ट्रैकिंग',                   diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'मीटिंग रूम प्रबंधन',                            diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
    ] as ComparisonRow[],
    legend: {
      full: 'पूर्ण समर्थन',
      partial: 'सीमित / आंशिक',
      none: 'उपलब्ध नहीं',
    },
    summary: {
      heading: 'क्या आप अपनी समितियों के वर्तमान कार्य से Diwan Suite की तुलना करना चाहते हैं?',
      conclusion: 'यदि आपको केवल एक वीडियो मीटिंग की आवश्यकता है, तो वैश्विक मीटिंग प्लेटफ़ॉर्म पर्याप्त हो सकते हैं। लेकिन यदि आपको औपचारिक मिनट्स, ई-हस्ताक्षर, निर्णय अनुवर्ती, निष्पादन कार्य, ऑडिट ट्रेल, अनुपालन रिपोर्ट और AI के साथ एक बोर्ड, समिति या सामान्य सभा का प्रबंधन करना है — तो Diwan Suite शुरू से ही इसी उद्देश्य के लिए बनाया गया है।',
      subtext: 'एक डेमो प्राप्त करें जो दिखाता है कि बोर्ड मीटिंग बिखरे आमंत्रणों और मिनट्स से मापनीय, निष्पादन योग्य निर्णयों में कैसे बदलती हैं।',
      ctaPrimary: 'डेमो बुक करें',
      ctaSecondary: 'कस्टम तुलना का अनुरोध करें',
    },
  },

  ur: {
    badge: 'موازنہ',
    heading: 'Diwan Suite صرف میٹنگ ٹول نہیں — یہ گورننس اور فیصلہ سازی کا پلیٹ فارم ہے',
    intro: 'Diwan Suite محض ویڈیو کانفرنسنگ ٹول نہیں ہے۔ یہ بورڈز، کمیٹیوں اور جنرل اسمبلیوں کے انتظام کے لیے ایک جامع ادارہ جاتی گورننس پلیٹ فارم ہے — دعوت سے لے کر محاضر کی منظوری اور فیصلوں کے نفاذ کی پیروی تک۔ یہ نظام میٹنگ مینجمنٹ، کورم کا حساب، محاضر کا اجرا، ای-دستخط، فیصلوں اور کاموں کی پیروی، ایگزیکٹو رپورٹنگ، آڈٹ ٹریل اور AI کو ایک محفوظ ماحول میں یکجا کرتا ہے۔',
    columnHeaders: {
      feature: 'خصوصیت',
      diwanSuite: 'Diwan Suite',
      globalPlatforms: 'عالمی میٹنگ پلیٹ فارمز',
      generalTools: 'عام میٹنگ ٹولز',
      nonLocalizedPortals: 'غیر لوکلائزڈ بورڈ پورٹلز',
    },
    features: [
      { name: 'مکمل عربی RTL انٹرفیس',                         diwanSuite: 'full', globalPlatforms: 'partial', generalTools: 'partial', nonLocalizedPortals: 'none' },
      { name: 'الگ بورڈ اور کمیٹی مینجمنٹ',                   diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial', nonLocalizedPortalsNote: 'جزوی / محدود' },
      { name: 'محاضر اور ای-دستخط',                             diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'فیصلے اور کام فالو اپ',                         diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'محاضر سازی اور تجزیہ کے لیے AI ایجنٹ',          diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'آڈٹ ٹریل اور تعمیل',                            diwanSuite: 'full', globalPlatforms: 'partial', generalTools: 'none',    nonLocalizedPortals: 'partial' },
      { name: 'سعودی مقامی ہوسٹنگ',                            diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'Zoom / Teams / Google Meet / Webex انٹیگریشن',   diwanSuite: 'full', globalPlatforms: 'partial', globalPlatformsNote: 'پلیٹ فارم پر منحصر', generalTools: 'partial', nonLocalizedPortals: 'partial', nonLocalizedPortalsNote: 'وینڈر پر منحصر' },
      { name: 'جنرل اسمبلی مینجمنٹ',                           diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'قانونی کورم کا حساب',                            diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'محاضر منظوری کے ورک فلو',                       diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'ٹائم اسٹیمپ اور آڈٹ لاگ',                      diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'تیار تعمیلی رپورٹس',                            diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'عربی، انگریزی، ہندی اور اردو کی حمایت',         diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'AI سے تیار کردہ محاضر',                         diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'AI فیصلہ جائزہ',                                diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'فیصلہ مینجمنٹ اور ٹریکنگ',                     diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
      { name: 'میٹنگ روم مینجمنٹ',                             diwanSuite: 'full', globalPlatforms: 'none',    generalTools: 'none',    nonLocalizedPortals: 'none' },
    ] as ComparisonRow[],
    legend: {
      full: 'مکمل تعاون',
      partial: 'محدود / جزوی',
      none: 'دستیاب نہیں',
    },
    summary: {
      heading: 'کیا آپ Diwan Suite کا موازنہ اپنی کمیٹیوں کے موجودہ طریقہ کار سے کرنا چاہتے ہیں؟',
      conclusion: 'اگر آپ کو صرف ایک ویڈیو میٹنگ کی ضرورت ہے تو عالمی میٹنگ پلیٹ فارمز کافی ہو سکتے ہیں۔ لیکن اگر آپ کو رسمی محاضر، ای-دستخط، فیصلہ فالو اپ، عملدرآمد کے کام، آڈٹ ٹریل، تعمیلی رپورٹس اور AI کے ساتھ بورڈ، کمیٹی یا جنرل اسمبلی کا انتظام کرنا ہے — تو Diwan Suite شروع سے ہی اسی مقصد کے لیے بنایا گیا ہے۔',
      subtext: 'ایک ڈیمو حاصل کریں جو ظاہر کرتا ہے کہ بورڈ میٹنگز بکھرے دعوت ناموں اور محاضر سے قابل پیمائش، قابل عملدرآمد فیصلوں میں کیسے تبدیل ہوتی ہیں۔',
      ctaPrimary: 'ڈیمو بک کریں',
      ctaSecondary: 'اپنے ادارے کے لیے کسٹم موازنہ طلب کریں',
    },
  },
}

// Status label localised based on current lang
function getLocalizedLabel(status: FeatureStatus, lang: string, note?: string): string {
  if (note) return note
  const map: Record<string, Record<FeatureStatus, string>> = {
    ar: { full: 'مدعوم بالكامل',   partial: 'محدود أو غير مخصص', none: 'غير متوفر' },
    en: { full: 'Fully supported', partial: 'Limited / partial',   none: 'Not available' },
    hi: { full: 'पूर्ण समर्थन',    partial: 'सीमित / आंशिक',       none: 'उपलब्ध नहीं' },
    ur: { full: 'مکمل تعاون',      partial: 'محدود / جزوی',        none: 'دستیاب نہیں' },
  }
  return (map[lang] ?? map.ar)[status]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SiteComparison() {
  const { lang, font, isRTL } = useLang()
  const ref = useReveal()

  const t = ((CONTENT as unknown) as Record<string, typeof CONTENT.ar>)[lang] ?? CONTENT.ar


  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="comparison"
      className="section-reveal py-10 lg:py-14 bg-secondary/30"
      aria-labelledby="comparison-heading"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-10 lg:mb-8 max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest text-chart-1 mb-3"
            aria-hidden="true"
          >
            {t.badge}
          </span>
          <h2
            id="comparison-heading"
            className="font-extrabold mb-5 text-foreground text-balance"
            style={{ fontFamily: font, fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)', lineHeight: '1.2' }}
          >
            {t.heading}
          </h2>
          <p
            className="text-base lg:text-lg text-muted-foreground leading-relaxed text-pretty"
            style={{ fontFamily: font }}
          >
            {t.intro}
          </p>
        </div>

        {/* ── Table wrapper with horizontal scroll on mobile ─────────────── */}
        <div
          className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm"
          role="region"
          aria-label={isRTL ? 'جدول المقارنة' : 'Comparison table'}
          tabIndex={0}
        >
          <table
            className="w-full min-w-[680px] border-collapse text-sm"
            aria-describedby="comparison-heading"
          >
            {/* Column headers */}
            <thead>
              <tr className="border-b border-border bg-secondary/60">
                {/* Feature column */}
                <th
                  scope="col"
                  className="px-4 py-4 text-start font-bold text-foreground w-[30%]"
                  style={{ fontFamily: font }}
                >
                  {t.columnHeaders.feature}
                </th>
                {/* Diwan Suite — highlighted */}
                <th
                  scope="col"
                  className="px-3 py-4 text-center font-bold text-chart-1 bg-chart-1/10 w-[17.5%]"
                  style={{ fontFamily: font }}
                >
                  <span className="inline-block leading-snug">{t.columnHeaders.diwanSuite}</span>
                </th>
                {/* Other columns */}
                {[t.columnHeaders.globalPlatforms, t.columnHeaders.generalTools, t.columnHeaders.nonLocalizedPortals].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-3 py-4 text-center font-medium text-muted-foreground w-[17.5%]"
                    style={{ fontFamily: font }}
                  >
                    <span className="inline-block leading-snug">{header}</span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody className="divide-y divide-border">
              {t.features.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-secondary/20 transition-colors"
                >
                  {/* Feature name */}
                  <td
                    className="px-4 py-3 font-medium text-foreground align-middle"
                    style={{ fontFamily: font }}
                  >
                    {row.name}
                  </td>

                  {/* Diwan Suite */}
                  <td className="px-3 py-3 text-center align-middle bg-chart-1/5">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-50">
                        <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                      </span>
                      <span
                        className="text-[11px] leading-tight font-semibold hidden sm:block text-green-700"
                        style={{ fontFamily: font }}
                      >
                        {t.legend.full}
                      </span>
                    </div>
                  </td>

                  {/* Global Platforms */}
                  {(() => {
                    const status = row.globalPlatforms
                    const note = getLocalizedLabel(status, lang, row.globalPlatformsNote)
                    const cfg = status === 'full'
                      ? { Icon: Check,  bg: 'bg-green-50',  color: 'text-green-600', textColor: 'text-green-700' }
                      : status === 'partial'
                      ? { Icon: Minus,  bg: 'bg-amber-50',  color: 'text-amber-500', textColor: 'text-amber-600' }
                      : { Icon: X,      bg: 'bg-red-50',    color: 'text-red-500',   textColor: 'text-red-600' }
                    return (
                      <td className="px-3 py-3 text-center align-middle">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${cfg.bg}`}>
                            <cfg.Icon className={`h-4 w-4 ${cfg.color}`} aria-hidden="true" />
                          </span>
                          <span className={`text-[11px] leading-tight hidden sm:block ${cfg.textColor}`} style={{ fontFamily: font }}>{note}</span>
                        </div>
                      </td>
                    )
                  })()}

                  {/* General Tools */}
                  {(() => {
                    const status = row.generalTools
                    const note = getLocalizedLabel(status, lang)
                    const cfg = status === 'full'
                      ? { Icon: Check,  bg: 'bg-green-50',  color: 'text-green-600', textColor: 'text-green-700' }
                      : status === 'partial'
                      ? { Icon: Minus,  bg: 'bg-amber-50',  color: 'text-amber-500', textColor: 'text-amber-600' }
                      : { Icon: X,      bg: 'bg-red-50',    color: 'text-red-500',   textColor: 'text-red-600' }
                    return (
                      <td className="px-3 py-3 text-center align-middle">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${cfg.bg}`}>
                            <cfg.Icon className={`h-4 w-4 ${cfg.color}`} aria-hidden="true" />
                          </span>
                          <span className={`text-[11px] leading-tight hidden sm:block ${cfg.textColor}`} style={{ fontFamily: font }}>{note}</span>
                        </div>
                      </td>
                    )
                  })()}

                  {/* Non-localized Portals */}
                  {(() => {
                    const status = row.nonLocalizedPortals
                    const note = getLocalizedLabel(status, lang, row.nonLocalizedPortalsNote)
                    const cfg = status === 'full'
                      ? { Icon: Check,  bg: 'bg-green-50',  color: 'text-green-600', textColor: 'text-green-700' }
                      : status === 'partial'
                      ? { Icon: Minus,  bg: 'bg-amber-50',  color: 'text-amber-500', textColor: 'text-amber-600' }
                      : { Icon: X,      bg: 'bg-red-50',    color: 'text-red-500',   textColor: 'text-red-600' }
                    return (
                      <td className="px-3 py-3 text-center align-middle">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${cfg.bg}`}>
                            <cfg.Icon className={`h-4 w-4 ${cfg.color}`} aria-hidden="true" />
                          </span>
                          <span className={`text-[11px] leading-tight hidden sm:block ${cfg.textColor}`} style={{ fontFamily: font }}>{note}</span>
                        </div>
                      </td>
                    )
                  })()}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Legend ─────────────────────────────────────────────────────── */}
        <div
          className="flex flex-wrap items-center justify-center gap-5 mt-5 text-sm text-muted-foreground"
          aria-label={isRTL ? 'دليل الرموز' : 'Legend'}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-50">
              <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
            </span>
            <span style={{ fontFamily: font }}>{t.legend.full}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-50">
              <Minus className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            </span>
            <span style={{ fontFamily: font }}>{t.legend.partial}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50">
              <X className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
            </span>
            <span style={{ fontFamily: font }}>{t.legend.none}</span>
          </div>
        </div>

        {/* ── Summary & CTA ──────────────────────────────────────────────── */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-8 lg:p-10 text-center max-w-3xl mx-auto">
          <h3
            className="text-xl lg:text-2xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: font }}
          >
            {t.summary.heading}
          </h3>
          <p
            className="text-base text-muted-foreground leading-relaxed mb-3 text-pretty"
            style={{ fontFamily: font }}
          >
            {t.summary.conclusion}
          </p>
          <p
            className="text-sm text-muted-foreground mb-8"
            style={{ fontFamily: font }}
          >
            {t.summary.subtext}
          </p>
        </div>

      </div>
    </section>
  )
}
