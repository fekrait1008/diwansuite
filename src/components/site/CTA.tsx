"use client"

import { useState, useRef, useEffect } from 'react'
import { trackDemoRequest } from '@/lib/analytics'
import { 
  Target,
  Building2,
  User,
  Users,
  Briefcase,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  XCircle,
  ChevronDown,
  Calendar,
  ArrowLeft,
  FileText,
  X
} from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'

// Session draft storage key — lightweight, session-only
const SESSION_DRAFT_KEY = 'diwanFormDraft'
const SESSION_CTA_KEY   = 'diwanCtaLabel'

// CTA-aware intro hints per language (subtle, not structural)
const CTA_HINTS: Record<string, Record<string, string>> = {
  ar: {
    'احجز عرضًا مخصصًا':       'سنُعدّ عرضًا توضيحيًا مخصصًا لاحتياجات جهتكم تحديدًا.',
    'احجز عرضاً':               'سنُعدّ عرضًا توضيحيًا مخصصًا لاحتياجات جهتكم تحديدًا.',
    'احجز عرضًا توضيحيًا':     'سنُعدّ عرضًا توضيحيًا مخصصًا لاحتياجات جهتكم تحديدًا.',
    'اطلب استشارة سريعة':       'فريقنا متاح لإجراء استشارة قصيرة ومباشرة على الفور.',
    'اطلب استشارة مجانية':      'فريقنا متاح لإجراء استشارة قصيرة ومباشرة على الفور.',
    'تحدث مع خبير حوكمة':      'سيتولى أحد خبراء الحوكمة لدينا الرد على استفساركم بدقة.',
  },
  en: {
    'Book a Custom Demo':        'We will prepare a tailored demo specifically for your organisation.',
    'Request a Quick Consultation': 'Our team is available for a short, direct consultation right away.',
    'Talk to a Governance Expert': 'One of our governance experts will address your enquiry precisely.',
    'Request a Free Consultation': 'Our team is available for a short, direct consultation right away.',
  },
}

// Step definitions - 3 steps
const STEPS = [
  { id: 1, key: 'goal', icon: Target },
  { id: 2, key: 'entity', icon: Building2 },
  { id: 3, key: 'contact', icon: User },
] as const

// Goal options (Step 1)
const GOAL_OPTIONS: Record<string, { value: string; label: string; blocked?: boolean }[]> = {
  ar: [
    { value: 'demo', label: 'أريد عرضًا توضيحيًا للنظام' },
    { value: 'pricing', label: 'أريد معرفة الأسعار أو الباقات' },
    { value: 'solution', label: 'أبحث عن حل لإدارة المجالس أو اللجان' },
    { value: 'integration', label: 'أريد تكامل أو شراكة' },
    { value: 'inquiry', label: 'لدي استفسار عام' },
    { value: 'job', label: 'أبحث عن وظيفة / إرسال سيرة ذاتية', blocked: true },
  ],
  en: [
    { value: 'demo', label: 'I want a system demo' },
    { value: 'pricing', label: 'I want to know pricing or packages' },
    { value: 'solution', label: 'I am looking for a board/committee management solution' },
    { value: 'integration', label: 'I want integration or partnership' },
    { value: 'inquiry', label: 'I have a general inquiry' },
    { value: 'job', label: 'I am looking for a job / submit CV', blocked: true },
  ],
  hi: [
    { value: 'demo', label: 'मुझे सिस्टम डेमो चाहिए' },
    { value: 'pricing', label: 'मुझे कीमतों या पैकेजों की जानकारी चाहिए' },
    { value: 'solution', label: 'मैं बोर्ड/समिति प्रबंधन समाधान ढूंढ रहा हूं' },
    { value: 'integration', label: 'मुझे एकीकरण या साझेदारी चाहिए' },
    { value: 'inquiry', label: 'मेरा एक सामान्य प्रश्न है' },
    { value: 'job', label: 'मैं नौकरी ढूंढ रहा हूं / CV भेजना चाहता हूं', blocked: true },
  ],
  ur: [
    { value: 'demo', label: 'مجھے سسٹم ڈیمو چاہیے' },
    { value: 'pricing', label: 'مجھے قیمتوں یا پیکجز کے بارے میں جاننا ہے' },
    { value: 'solution', label: 'میں بورڈ/کمیٹی مینجمنٹ حل تلاش کر رہا ہوں' },
    { value: 'integration', label: 'مجھے انضمام یا شراکت چاہیے' },
    { value: 'inquiry', label: 'میرا ایک عام سوال ہے' },
    { value: 'job', label: 'میں نوکری ڈھونڈ رہا ہوں / CV بھیجنا چاہتا ہوں', blocked: true },
  ],
}

// Decision role options (Step 3)
const DECISION_ROLE_OPTIONS: Record<string, { value: string; label: string }[]> = {
  ar: [
    { value: 'decision-maker', label: 'صانع القرار المباشر' },
    { value: 'recommender', label: 'موصٍ أو مقترح' },
    { value: 'evaluator', label: 'مقيّم فقط' },
    { value: 'user', label: 'مستخدم نهائي فقط' },
    { value: 'other', label: 'أخرى' },
  ],
  en: [
    { value: 'decision-maker', label: 'Direct decision maker' },
    { value: 'recommender', label: 'Recommender or proposer' },
    { value: 'evaluator', label: 'Evaluator only' },
    { value: 'user', label: 'End user only' },
    { value: 'other', label: 'Other' },
  ],
  hi: [
    { value: 'decision-maker', label: 'प्रत्यक्ष निर्णयकर्ता' },
    { value: 'recommender', label: 'अनुशंसाकर्ता' },
    { value: 'evaluator', label: 'केवल मूल्यांकनकर्ता' },
    { value: 'user', label: 'केवल अंतिम उपयोगकर्ता' },
    { value: 'other', label: 'अन्य' },
  ],
  ur: [
    { value: 'decision-maker', label: 'براہ راست فیصلہ ساز' },
    { value: 'recommender', label: 'سفارش کرنے والا' },
    { value: 'evaluator', label: 'صرف جائزہ لینے والا' },
    { value: 'user', label: 'صرف آخری صارف' },
    { value: 'other', label: 'دیگر' },
  ],
}

// Job title options
const JOB_TITLE_OPTIONS: Record<string, { value: string; label: string }[]> = {
  ar: [
    { value: 'ceo', label: 'الرئيس التنفيذي' },
    { value: 'cfo', label: 'المدير المالي' },
    { value: 'board-secretary', label: 'أمين سر مجلس الإدارة' },
    { value: 'governance-officer', label: 'مسؤول الحوكمة' },
    { value: 'compliance-officer', label: 'مسؤول الامتثال' },
    { value: 'legal-counsel', label: 'المستشار القانوني' },
    { value: 'it-manager', label: 'مدير تقنية المعلومات' },
    { value: 'board-member', label: 'عضو مجلس إدارة' },
    { value: 'executive', label: 'مدير تنفيذي' },
    { value: 'other', label: 'أخرى' },
  ],
  en: [
    { value: 'ceo', label: 'CEO' },
    { value: 'cfo', label: 'CFO' },
    { value: 'board-secretary', label: 'Board Secretary' },
    { value: 'governance-officer', label: 'Governance Officer' },
    { value: 'compliance-officer', label: 'Compliance Officer' },
    { value: 'legal-counsel', label: 'Legal Counsel' },
    { value: 'it-manager', label: 'IT Manager' },
    { value: 'board-member', label: 'Board Member' },
    { value: 'executive', label: 'Executive' },
    { value: 'other', label: 'Other' },
  ],
  hi: [
    { value: 'ceo', label: 'सीईओ' },
    { value: 'cfo', label: 'सीएफओ' },
    { value: 'board-secretary', label: 'बोर्ड सचिव' },
    { value: 'governance-officer', label: 'गवर्नेंस अधिकारी' },
    { value: 'compliance-officer', label: 'अनुपालन अधिकारी' },
    { value: 'legal-counsel', label: 'कानूनी सलाहकार' },
    { value: 'it-manager', label: 'आईटी प्रबंधक' },
    { value: 'board-member', label: 'बोर्ड सदस्य' },
    { value: 'executive', label: 'कार्यकारी' },
    { value: 'other', label: 'अन्य' },
  ],
  ur: [
    { value: 'ceo', label: 'سی ای او' },
    { value: 'cfo', label: 'سی ایف او' },
    { value: 'board-secretary', label: 'بورڈ سیکرٹری' },
    { value: 'governance-officer', label: 'گورننس آفیسر' },
    { value: 'compliance-officer', label: 'کمپلائنس آفیسر' },
    { value: 'legal-counsel', label: 'قانونی مشیر' },
    { value: 'it-manager', label: 'آئی ٹی منیجر' },
    { value: 'board-member', label: 'بورڈ ممبر' },
    { value: 'executive', label: 'ایگزیکٹو' },
    { value: 'other', label: 'دیگر' },
  ],
}

// Sector options
const SECTOR_OPTIONS: Record<string, { value: string; label: string }[]> = {
  ar: [
    { value: 'listed-company', label: 'شركة مساهمة مدرجة' },
    { value: 'government', label: 'جهة حكومية' },
    { value: 'semi-government', label: 'شبه حكومية' },
    { value: 'private', label: 'قطاع خاص' },
    { value: 'family-business', label: 'شركة عائلية' },
    { value: 'nonprofit', label: 'جهة غير ربحية' },
    { value: 'financial', label: 'مؤسسة مالية' },
    { value: 'healthcare', label: 'قطاع صحي' },
    { value: 'education', label: 'قطاع تعليمي' },
    { value: 'other', label: 'أخرى' },
  ],
  en: [
    { value: 'listed-company', label: 'Listed company' },
    { value: 'government', label: 'Government entity' },
    { value: 'semi-government', label: 'Semi-government' },
    { value: 'private', label: 'Private sector' },
    { value: 'family-business', label: 'Family business' },
    { value: 'nonprofit', label: 'Non-profit organization' },
    { value: 'financial', label: 'Financial institution' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' },
  ],
  hi: [
    { value: 'listed-company', label: 'सूचीबद्ध कंपनी' },
    { value: 'government', label: 'सरकारी संस्था' },
    { value: 'semi-government', label: 'अर्ध-सरकारी' },
    { value: 'private', label: 'निजी क्षेत्र' },
    { value: 'family-business', label: 'पारिवारिक व्यवसाय' },
    { value: 'nonprofit', label: 'गैर-लाभकारी संगठन' },
    { value: 'financial', label: 'वित्तीय संस्थान' },
    { value: 'healthcare', label: 'स्वास्थ्य सेवा' },
    { value: 'education', label: 'शिक्षा' },
    { value: 'other', label: 'अन्य' },
  ],
  ur: [
    { value: 'listed-company', label: 'درج شدہ کمپنی' },
    { value: 'government', label: 'سرکاری ادارہ' },
    { value: 'semi-government', label: 'نیم سرکاری' },
    { value: 'private', label: 'نجی شعبہ' },
    { value: 'family-business', label: 'خاندانی کاروبار' },
    { value: 'nonprofit', label: 'غیر منافع بخش تنظیم' },
    { value: 'financial', label: 'مالیاتی ادارہ' },
    { value: 'healthcare', label: 'صحت کی دیکھ بھال' },
    { value: 'education', label: 'تعلیم' },
    { value: 'other', label: 'دیگر' },
  ],
}

// Boards count options
const BOARDS_OPTIONS: Record<string, { value: string; label: string }[]> = {
  ar: [
    { value: '1', label: 'مجلس أو لجنة واحدة' },
    { value: '2-3', label: '2-3 مجالس/لجان' },
    { value: '4-6', label: '4-6 مجالس/لجان' },
    { value: '7-10', label: '7-10 مجالس/لجان' },
    { value: '10+', label: 'أكثر من 10' },
  ],
  en: [
    { value: '1', label: '1 board/committee' },
    { value: '2-3', label: '2-3 boards/committees' },
    { value: '4-6', label: '4-6 boards/committees' },
    { value: '7-10', label: '7-10 boards/committees' },
    { value: '10+', label: 'More than 10' },
  ],
  hi: [
    { value: '1', label: '1 बोर्ड/समिति' },
    { value: '2-3', label: '2-3 बोर्ड/समितियां' },
    { value: '4-6', label: '4-6 बोर्ड/समितियां' },
    { value: '7-10', label: '7-10 बोर्ड/समितियां' },
    { value: '10+', label: '10 से अधिक' },
  ],
  ur: [
    { value: '1', label: '1 بورڈ/کمیٹی' },
    { value: '2-3', label: '2-3 بورڈز/کمیٹیاں' },
    { value: '4-6', label: '4-6 بورڈز/کمیٹیاں' },
    { value: '7-10', label: '7-10 بورڈز/کمیٹیاں' },
    { value: '10+', label: '10 سے زیادہ' },
  ],
}

// Employees count options
const EMPLOYEES_OPTIONS: Record<string, { value: string; label: string }[]> = {
  ar: [
    { value: '1-10', label: '1-10 موظفين' },
    { value: '11-50', label: '11-50 موظف' },
    { value: '51-200', label: '51-200 موظف' },
    { value: '201-500', label: '201-500 موظف' },
    { value: '500+', label: 'أكثر من 500 موظف' },
  ],
  en: [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500+', label: 'More than 500 employees' },
  ],
  hi: [
    { value: '1-10', label: '1-10 कर्मचारी' },
    { value: '11-50', label: '11-50 कर्मचारी' },
    { value: '51-200', label: '51-200 कर्मचारी' },
    { value: '201-500', label: '201-500 कर्मचारी' },
    { value: '500+', label: '500 से अधिक कर्मचारी' },
  ],
  ur: [
    { value: '1-10', label: '1-10 ملازمین' },
    { value: '11-50', label: '11-50 ملازمین' },
    { value: '51-200', label: '51-200 ملازمین' },
    { value: '201-500', label: '201-500 ملازمین' },
    { value: '500+', label: '500 سے زیادہ ملازمین' },
  ],
}

// Meetings per month options
const MEETINGS_OPTIONS: Record<string, { value: string; label: string }[]> = {
  ar: [
    { value: '1-5', label: '1-5 اجتماعات' },
    { value: '6-10', label: '6-10 اجتماعات' },
    { value: '11-20', label: '11-20 اجتماع' },
    { value: '20+', label: 'أكثر من 20 اجتماع' },
  ],
  en: [
    { value: '1-5', label: '1-5 meetings' },
    { value: '6-10', label: '6-10 meetings' },
    { value: '11-20', label: '11-20 meetings' },
    { value: '20+', label: 'More than 20 meetings' },
  ],
  hi: [
    { value: '1-5', label: '1-5 बैठकें' },
    { value: '6-10', label: '6-10 बैठकें' },
    { value: '11-20', label: '11-20 बैठकें' },
    { value: '20+', label: '20 से अधिक बैठकें' },
  ],
  ur: [
    { value: '1-5', label: '1-5 میٹنگز' },
    { value: '6-10', label: '6-10 میٹنگز' },
    { value: '11-20', label: '11-20 میٹنگز' },
    { value: '20+', label: '20 سے زیادہ میٹنگز' },
  ],
}

// Labels type
interface LabelSet {
  steps: { goal: string; entity: string; contact: string }
  step1: { title: string; subtitle: string }
  step2: { 
    title: string; 
    representsEntity: string;
    yes: string; 
    no: string; 
    entityName: string; 
    entityNamePlaceholder: string; 
    sector: string; 
    employeesCount: string;
    meetingsPerMonth: string;
    boardsCount: string; 
  }
  step3: { 
    title: string; 
    fullName: string; 
    fullNamePlaceholder: string; 
    jobTitle: string; 
    decisionRole: string;
    email: string; 
    emailPlaceholder: string; 
    phone: string; 
    phonePlaceholder: string;
    notes: string; 
    notesPlaceholder: string 
  }
  buttons: { next: string; back: string; submit: string; submitting: string; goBack: string; closeForm: string; retry: string }
  validation: { required: string; invalidEmail: string; invalidPhone: string; minTwoWords: string }
  success: { title: string; message: string; nextSteps: string; newRequest: string }
  notEligible: { title: string; message: string }
  jobBlocked: { title: string; message: string }
  error: { title: string; message: string }
  selectPlaceholder: string
  stepIndicator: string // "الخطوة X من Y"
}

const LABELS: Record<string, LabelSet> = {
  ar: {
    steps: { goal: 'هدف الطلب', entity: 'بيانات الجهة', contact: 'معلومات التواصل' },
    step1: { title: 'ما الهدف من طلبك؟', subtitle: 'اختر ما يناسب احتياجك' },
    step2: { 
      title: 'بيانات الجهة', 
      representsEntity: 'هل تمثل شركة أو جهة؟', 
      yes: 'نعم', 
      no: 'لا', 
      entityName: 'اسم الجهة / الشركة', 
      entityNamePlaceholder: 'أدخل اسم الجهة أو الشركة', 
      sector: 'مجال عمل الجهة', 
      employeesCount: 'عدد موظفي الجهة',
      meetingsPerMonth: 'كم عدد الاجتماعات التقريبية شهريًا؟',
      boardsCount: 'كم عدد مجالس الإدارة واللجان في جهتكم؟'
    },
    step3: { 
      title: 'معلومات التواصل', 
      fullName: 'الاسم الكامل', 
      fullNamePlaceholder: 'أدخل اسمك الكامل', 
      jobTitle: 'المسمى الوظيفي', 
      decisionRole: 'علاقتك بقرار الشراء أو التوصية',
      email: 'البريد الإلكتروني للعمل', 
      emailPlaceholder: 'name@company.com', 
      phone: 'رقم الجوال', 
      phonePlaceholder: '+966 5X XXX XXXX',
      notes: 'ملاحظات إضافية (اختياري)', 
      notesPlaceholder: 'أي متطلبات أو أسئلة محددة؟' 
    },
    buttons: { next: 'التالي', back: 'السابق', submit: 'إرسال الطلب', submitting: 'جاري الإرسال...', goBack: 'العودة', closeForm: 'إغلاق النموذج', retry: 'إعادة المحاولة' },
    validation: { required: 'هذا الحقل مطلوب', invalidEmail: 'البريد الإلكتروني غير صالح', invalidPhone: 'رقم الجوال غير صالح', minTwoWords: 'يجب إدخال كلمتين على الأقل' },
    success: { title: 'شكراً لك!', message: 'تم استلام طلبك بنجاح. سيراجع فريقنا طلبك ويتواصل معك خلال أوقات العمل الرسمية.', nextSteps: 'ما الذي سيحدث بعد ذلك؟ سيتواصل معك أحد المتخصصين لتأكيد الطلب وترتيب الخطوات التالية.', newRequest: 'إرسال طلب جديد' },
    notEligible: { title: 'هذا النموذج مخصص للشركات والجهات', message: 'نعتذر، لا يمكن إكمال الطلب حاليًا لأن هذا النموذج مخصص لممثلي الشركات والجهات فقط. يمكنكم زيارتنا في وقت لاحق عند توفر جهة أو مؤسسة ترغبون بتمثيلها.' },
    jobBlocked: { title: 'هذا النموذج غير مخصص لطلبات التوظيف', message: 'للتقدم لوظيفة أو إرسال سيرتك الذاتية، يرجى التواصل معنا عبر صفحة الوظائف أو البريد الإلكتروني المخصص للتوظيف.' },
    error: { title: 'تعذر إرسال الطلب', message: 'تعذر إرسال الطلب حاليًا. يرجى المحاولة مرة أخرى بعد قليل أو التواصل معنا مباشرة إذا استمرت المشكلة.' },
    selectPlaceholder: 'اختر...',
    stepIndicator: 'الخطوة {current} من {total}'
  },
  en: {
    steps: { goal: 'Request Goal', entity: 'Entity Details', contact: 'Contact Info' },
    step1: { title: 'What is the goal of your request?', subtitle: 'Choose what matches your needs' },
    step2: { 
      title: 'Entity Details', 
      representsEntity: 'Do you represent a company or organization?', 
      yes: 'Yes', 
      no: 'No', 
      entityName: 'Company / Organization Name', 
      entityNamePlaceholder: 'Enter company or organization name', 
      sector: 'Industry / Sector', 
      employeesCount: 'Number of Employees',
      meetingsPerMonth: 'Approximate meetings per month?',
      boardsCount: 'Number of Boards/Committees'
    },
    step3: { 
      title: 'Contact Information', 
      fullName: 'Full Name', 
      fullNamePlaceholder: 'Enter your full name', 
      jobTitle: 'Job Title', 
      decisionRole: 'Your role in purchase decision',
      email: 'Business Email', 
      emailPlaceholder: 'name@company.com', 
      phone: 'Mobile Number', 
      phonePlaceholder: '+966 5X XXX XXXX',
      notes: 'Additional Notes (Optional)', 
      notesPlaceholder: 'Any specific requirements or questions?' 
    },
    buttons: { next: 'Next', back: 'Back', submit: 'Submit Request', submitting: 'Submitting...', goBack: 'Go Back', closeForm: 'Close Form', retry: 'Try Again' },
    validation: { required: 'This field is required', invalidEmail: 'Invalid email address', invalidPhone: 'Invalid phone number', minTwoWords: 'Please enter at least two words' },
    success: { title: 'Thank you!', message: 'Your request has been received. Our team will review it and contact you during business hours.', nextSteps: "What happens next? A specialist will reach out to confirm your request and arrange the next steps.", newRequest: 'Submit a new request' },
    notEligible: { title: 'This form is for companies and organizations', message: 'We apologize, this form is exclusively for company and organization representatives. Please visit us later when you have an organization you wish to represent.' },
    jobBlocked: { title: 'This form is not for job applications', message: 'To apply for a job or submit your CV, please contact us through the careers page or the dedicated recruitment email.' },
    error: { title: 'Failed to submit request', message: 'Unable to submit your request at this time. Please try again shortly or contact us directly if the issue persists.' },
    selectPlaceholder: 'Select...',
    stepIndicator: 'Step {current} of {total}'
  },
  hi: {
    steps: { goal: 'अनुरोध लक्ष्य', entity: 'संस्था विवरण', contact: 'संपर्क जानकारी' },
    step1: { title: 'आपके अनुरोध का उद्देश्य क्या है?', subtitle: 'अपनी आवश्यकता के अनुसार चुनें' },
    step2: { 
      title: 'संस्था विवरण', 
      representsEntity: 'क्या आप किसी कंपनी या संगठन का प्रतिनिधित्व करते हैं?', 
      yes: 'हां', 
      no: 'नहीं', 
      entityName: 'कंपनी / संगठन का नाम', 
      entityNamePlaceholder: 'कंपनी या संगठन का नाम दर्ज करें', 
      sector: 'उद्योग / क्षेत्र', 
      employeesCount: 'कर्मचारियों की संख्या',
      meetingsPerMonth: 'प्रति माह अनुमानित बैठकें?',
      boardsCount: 'बोर्ड/समितियों की संख्या'
    },
    step3: { 
      title: 'संपर्क जानकारी', 
      fullName: 'पूरा नाम', 
      fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें', 
      jobTitle: 'पद', 
      decisionRole: 'खरीद निर्णय में आपकी भूमिका',
      email: 'व्यावसायिक ईमेल', 
      emailPlaceholder: 'name@company.com', 
      phone: 'मोबाइल नंबर', 
      phonePlaceholder: '+966 5X XXX XXXX',
      notes: 'अतिरिक्त नोट्स (वैकल्पिक)', 
      notesPlaceholder: 'कोई विशेष आवश्यकता या प्रश्न?' 
    },
    buttons: { next: 'अगला', back: 'पीछे', submit: 'अनुरोध भेजें', submitting: 'भेजा जा रहा है...', goBack: 'वापस जाएं', closeForm: 'फॉर्म बंद करें', retry: 'पुनः प्रयास करें' },
    validation: { required: 'यह फ़ील्ड आवश्यक है', invalidEmail: 'अमान्य ईमेल पता', invalidPhone: 'अमान्य फोन नंबर', minTwoWords: 'कृपया कम से कम दो शब्द दर्ज करें' },
    success: { title: 'धन्यवाद!', message: 'आपका अनुरोध प्राप्त हो गया है। हमारी टीम इसकी समीक्षा करेगी और कार्यालय समय में आपसे संपर्क करेगी।', nextSteps: 'आगे क्या होगा? एक विशेषज्ञ आपके अनुरोध की पुष्टि करने के लिए संपर्क करेगा।', newRequest: 'नया अनुरोध भेजें' },
    notEligible: { title: 'यह फॉर्म कंपनियों और संगठनों के लिए है', message: 'हमें खेद है, यह फॉर्म केवल कंपनी और संगठन के प्रतिनिधियों के लिए है। कृपया बाद में हमसे मिलें जब आपके पास कोई संगठन हो।' },
    jobBlocked: { title: 'यह फॉर्म नौकरी आवेदनों के लिए नहीं है', message: 'नौकरी के लिए आवेदन करने या CV भेजने के लिए, कृपया करियर पेज या भर्ती ईमेल के माध्यम से संपर्क करें।' },
    error: { title: 'अनुरोध भेजने में विफल', message: 'इस समय आपका अनुरोध भेजने में असमर्थ। कृपया कुछ देर बाद पुनः प्रयास करें।' },
    selectPlaceholder: 'चुनें...',
    stepIndicator: 'चरण {current} का {total}'
  },
  ur: {
    steps: { goal: 'درخواست کا مقصد', entity: 'ادارے کی تفصیلات', contact: 'رابطہ کی معلومات' },
    step1: { title: 'آپ کی درخواست کا مقصد کیا ہے؟', subtitle: 'اپنی ضرورت کے مطابق منتخب کریں' },
    step2: { 
      title: 'ادارے کی تفصیلات', 
      representsEntity: 'کیا آپ کسی کمپنی یا تنظیم کی نمائندگی کرتے ہیں؟', 
      yes: 'ہاں', 
      no: 'نہیں', 
      entityName: 'کمپنی / تنظیم کا نام', 
      entityNamePlaceholder: 'کمپنی یا تنظیم کا نام درج کریں', 
      sector: 'صنعت / شعبہ', 
      employeesCount: 'ملازمین کی تعداد',
      meetingsPerMonth: 'ماہانہ تقریباً کتنی میٹنگز؟',
      boardsCount: 'بورڈز/کمیٹیوں کی تعداد'
    },
    step3: { 
      title: 'رابطہ کی معلومات', 
      fullName: 'مکمل نام', 
      fullNamePlaceholder: 'اپنا مکمل نام درج کریں', 
      jobTitle: 'عہدہ', 
      decisionRole: 'خریداری کے فیصلے میں آپ کا کردار',
      email: 'کاروباری ای میل', 
      emailPlaceholder: 'name@company.com', 
      phone: 'موبائل نمبر', 
      phonePlaceholder: '+966 5X XXX XXXX',
      notes: 'اضافی نوٹس (اختیاری)', 
      notesPlaceholder: 'کوئی خاص ضروریات یا سوالات؟' 
    },
    buttons: { next: 'اگلا', back: 'پیچھے', submit: 'درخواست بھیجیں', submitting: 'بھیجا جا رہا ہے...', goBack: 'واپس جائیں', closeForm: 'فارم بند کریں', retry: 'دوبارہ کوشش کریں' },
    validation: { required: 'یہ فیلڈ ضروری ہے', invalidEmail: 'غلط ای میل ایڈریس', invalidPhone: 'غلط فون نمبر', minTwoWords: 'براہ کرم کم از کم دو الفاظ درج کریں' },
    success: { title: 'شکریہ!', message: 'آپ کی درخواست موصول ہو گئی ہے۔ ہماری ٹیم اسے دیکھے گی اور دفتری اوقات میں آپ سے رابطہ کرے گی۔', nextSteps: 'آگے کیا ہوگا؟ ایک ماہر آپ کی درخواست کی تصدیق کے لیے رابطہ کرے گا۔', newRequest: 'نئی درخواست بھیجیں' },
    notEligible: { title: 'یہ فارم کمپنیوں اور تنظیموں کے لیے ہے', message: 'معذرت، یہ فارم صرف کمپنی اور تنظیم کے نمائندوں کے لیے ہے۔ براہ کرم بعد میں ہم سے ملیں جب آپ کے پاس کوئی تنظیم ہو۔' },
    jobBlocked: { title: 'یہ فارم نوکری کی درخواستوں کے لیے نہیں ہے', message: 'نوکری کے لیے درخواست دینے یا CV بھیجنے کے لیے، براہ کرم کیریئرز پیج یا بھرتی ای میل سے رابطہ کریں۔' },
    error: { title: 'درخواست بھیجنے میں ناکام', message: 'اس وقت آپ کی درخواست بھیجنے میں ناکام۔ براہ کرم تھوڑی دیر بعد دوبارہ کوشش کریں۔' },
    selectPlaceholder: 'منتخب کریں...',
    stepIndicator: 'مرحلہ {current} از {total}'
  },
}

// Form data type
interface FormData {
  // Step 1
  goal: string
  // Step 2
  representsEntity: string
  entityName: string
  sector: string
  employeesCount: string
  meetingsPerMonth: string
  boardsCount: string
  // Step 3
  fullName: string
  jobTitle: string
  decisionRole: string
  email: string
  phone: string
  notes: string
  // Security
  honeypot: string
}

// ============== EXTERNAL COMPONENTS (prevent remount) ==============

function InputField({
  id, label, icon: Icon, type = 'text', value, onChange, placeholder, required = true, error, dir, font,
}: {
  id: string; label: string; icon: React.ElementType; type?: string | undefined; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string | undefined;
  required?: boolean | undefined; error?: string | undefined; dir?: 'ltr' | 'rtl' | undefined; font?: string | undefined;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-foreground" style={{ fontFamily: font }}>
        <Icon className="h-4 w-4 text-chart-1" />
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={id} name={id} type={type} value={value} onChange={onChange} placeholder={placeholder} dir={dir}
        className={`w-full rounded-lg border bg-background px-4 py-3 text-sm transition-colors focus:border-chart-1 focus:outline-none focus:ring-2 focus:ring-chart-1/20 ${error ? 'border-destructive' : 'border-input'}`}
        style={{ fontFamily: font, textAlign: dir === 'ltr' ? 'left' : undefined }}
      />
      {error && <p className="text-xs text-destructive" style={{ fontFamily: font }}>{error}</p>}
    </div>
  )
}

function SelectField({
  id, label, icon: Icon, value, onChange, options, placeholder, required = true, error, font,
}: {
  id: string; label: string; icon: React.ElementType; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[]; placeholder?: string | undefined;
  required?: boolean | undefined; error?: string | undefined; font?: string | undefined;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-foreground" style={{ fontFamily: font }}>
        <Icon className="h-4 w-4 text-chart-1" />
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      <div className="relative">
        <select
          id={id} name={id} value={value} onChange={onChange}
          className={`w-full appearance-none rounded-lg border bg-background px-4 py-3 text-sm transition-colors focus:border-chart-1 focus:outline-none focus:ring-2 focus:ring-chart-1/20 ${error ? 'border-destructive' : 'border-input'} ${!value ? 'text-muted-foreground' : ''}`}
          style={{ fontFamily: font }}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      {error && <p className="text-xs text-destructive" style={{ fontFamily: font }}>{error}</p>}
    </div>
  )
}

function RadioGroup({
  label, value, onChange, options, error, font,
}: {
  label: string; value: string; onChange: (value: string) => void;
  options: { value: string; label: string }[]; error?: string | undefined; font?: string | undefined;
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground" style={{ fontFamily: font }}>
        {label} <span className="text-destructive">*</span>
      </label>
      <div className="flex gap-4">
        {options.map((opt) => (
          <button
            key={opt.value} type="button" onClick={() => onChange(opt.value)}
            className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
              value === opt.value
                ? 'border-chart-1 bg-chart-1/10 text-chart-1'
                : 'border-input bg-background text-foreground hover:border-chart-1/50'
            }`}
            style={{ fontFamily: font }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-destructive" style={{ fontFamily: font }}>{error}</p>}
    </div>
  )
}

function TextareaField({
  id, label, value, onChange, placeholder, required = false, font,
}: {
  id: string; label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string | undefined; required?: boolean | undefined; font?: string | undefined;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-foreground" style={{ fontFamily: font }}>
        <MessageSquare className="h-4 w-4 text-chart-1" />
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      <textarea
        id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} rows={3}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-chart-1 focus:outline-none focus:ring-2 focus:ring-chart-1/20"
        style={{ fontFamily: font }}
      />
    </div>
  )
}

// ============== MAIN COMPONENT ==============

// Saudi phone normalization — accepts 05XXXXXXXX or 5XXXXXXXX → +966 5X XXX XXXX canonical form
function normalizeSaudiPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  // Already has country code: 966XXXXXXXXX
  if (digits.startsWith('966') && digits.length === 12) {
    return '+' + digits
  }
  // Local Saudi mobile: 05XXXXXXXX (10 digits) or 5XXXXXXXX (9 digits)
  if (digits.startsWith('05') && digits.length === 10) {
    return '+966' + digits.slice(1)
  }
  if (digits.startsWith('5') && digits.length === 9) {
    return '+966' + digits
  }
  // Preserve as-is if already has + prefix or is international
  return raw.startsWith('+') ? raw : (raw.trim() ? '+' + digits : raw)
}

// Compute UTM params once from URL search string
function getUtmParams() {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source:   p.get('utm_source')   || '',
    utm_medium:   p.get('utm_medium')   || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_term:     p.get('utm_term')     || '',
    utm_content:  p.get('utm_content')  || '',
    affiliate:    p.get('f')            || '',
  }
}

export function SiteCTA() {
  const { lang, isRTL, font, homeConversion: conversion } = useLang()
  const ref = useReveal()
  const formRef = useRef<HTMLFormElement>(null)

  // State
  const [currentStep, setCurrentStep] = useState(1)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'not-eligible' | 'job-blocked'>('idle')
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  // CTA label that opened the form — captured from sessionStorage or prop
  const [ctaLabel, setCtaLabel] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    goal: '',
    representsEntity: '',
    entityName: '',
    sector: '',
    employeesCount: '',
    meetingsPerMonth: '',
    boardsCount: '',
    fullName: '',
    jobTitle: '',
    decisionRole: '',
    email: '',
    phone: '',
    notes: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  // Get labels for current language
  const labels = LABELS[lang] || LABELS.ar
  const goalOptions = GOAL_OPTIONS[lang] || GOAL_OPTIONS.ar
  const jobTitleOptions = JOB_TITLE_OPTIONS[lang] || JOB_TITLE_OPTIONS.ar
  const decisionRoleOptions = DECISION_ROLE_OPTIONS[lang] || DECISION_ROLE_OPTIONS.ar
  const sectorOptions = SECTOR_OPTIONS[lang] || SECTOR_OPTIONS.ar
  const boardsOptions = BOARDS_OPTIONS[lang] || BOARDS_OPTIONS.ar
  const employeesOptions = EMPLOYEES_OPTIONS[lang] || EMPLOYEES_OPTIONS.ar
  const meetingsOptions = MEETINGS_OPTIONS[lang] || MEETINGS_OPTIONS.ar

  // On mount: restore session draft + selectedPackage + ctaLabel
  useEffect(() => {
    try {
      const storedPackage = sessionStorage.getItem('selectedPackage')
      if (storedPackage) setSelectedPackage(storedPackage)

      const storedCta = sessionStorage.getItem(SESSION_CTA_KEY)
      if (storedCta) setCtaLabel(storedCta)

      const draftRaw = sessionStorage.getItem(SESSION_DRAFT_KEY)
      if (draftRaw) {
        const draft = JSON.parse(draftRaw) as Partial<FormData & { step: number }>
        if (draft && typeof draft === 'object') {
          setFormData(prev => ({
            ...prev,
            goal:             draft.goal             || '',
            representsEntity: draft.representsEntity || '',
            entityName:       draft.entityName       || '',
            sector:           draft.sector           || '',
            employeesCount:   draft.employeesCount   || '',
            meetingsPerMonth: draft.meetingsPerMonth || '',
            boardsCount:      draft.boardsCount      || '',
            fullName:         draft.fullName         || '',
            jobTitle:         draft.jobTitle         || '',
            decisionRole:     draft.decisionRole     || '',
            email:            draft.email            || '',
            phone:            draft.phone            || '',
            notes:            draft.notes            || '',
          }))
          if (draft.step && draft.step > 1 && draft.step <= 3) {
            setCurrentStep(draft.step)
          }
        }
      }
    } catch {
      // Ignore storage errors (private browsing, quota, etc.)
    }
  }, [])

  // Persist draft to sessionStorage whenever formData or step changes
  useEffect(() => {
    if (submitStatus === 'success') return // Don't persist after success
    try {
      const { honeypot: _, ...safeData } = formData
      sessionStorage.setItem(SESSION_DRAFT_KEY, JSON.stringify({ ...safeData, step: currentStep }))
    } catch {
      // Ignore
    }
  }, [formData, currentStep, submitStatus])

  // Email validation - only English letters, numbers, @, ., -, _, +
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^a-zA-Z0-9@._+-]/g, '').replace(/\s/g, '').toLowerCase()
    setFormData(prev => ({ ...prev, email: filtered }))
    if (errors.email) {
      const { email: _, ...rest } = errors
      setErrors(rest)
    }
  }

  // Phone validation - only numbers and +
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^0-9+]/g, '').replace(/\s/g, '')
    setFormData(prev => ({ ...prev, phone: filtered }))
    if (errors.phone) {
      const { phone: _, ...rest } = errors
      setErrors(rest)
    }
  }

  // Generic field update
  const handleFieldChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  // Goal selection handler
  const handleGoalSelect = (value: string) => {
    const selectedOption = goalOptions.find(opt => opt.value === value)
    setFormData(prev => ({ ...prev, goal: value }))
    if (errors.goal) {
      const { goal: _, ...rest } = errors
      setErrors(rest)
    }
    
    // Check if job option is selected
    if (selectedOption?.blocked) {
      setSubmitStatus('job-blocked')
    } else {
      setSubmitStatus('idle')
    }
  }

  // Radio change handler
  const handleRadioChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
    
    if (field === 'representsEntity' && value === 'no') {
      setSubmitStatus('not-eligible')
    } else if (field === 'representsEntity' && value === 'yes') {
      setSubmitStatus('idle')
    }
  }

  // Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (step === 1) {
      if (!formData.goal) newErrors.goal = labels.validation.required
    }

    if (step === 2) {
      if (!formData.representsEntity) {
        newErrors.representsEntity = labels.validation.required
      } else if (formData.representsEntity === 'yes') {
        if (!formData.entityName.trim()) {
          newErrors.entityName = labels.validation.required
        } else if (formData.entityName.trim().split(/\s+/).length < 2) {
          newErrors.entityName = labels.validation.minTwoWords
        }
        if (!formData.sector) newErrors.sector = labels.validation.required
        if (!formData.employeesCount) newErrors.employeesCount = labels.validation.required
        if (!formData.meetingsPerMonth) newErrors.meetingsPerMonth = labels.validation.required
        if (!formData.boardsCount) newErrors.boardsCount = labels.validation.required
      }
    }

    if (step === 3) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = labels.validation.required
      } else if (formData.fullName.trim().split(/\s+/).length < 2) {
        newErrors.fullName = labels.validation.minTwoWords
      }
      if (!formData.jobTitle) newErrors.jobTitle = labels.validation.required
      if (!formData.decisionRole) newErrors.decisionRole = labels.validation.required
      if (!formData.email.trim()) {
        newErrors.email = labels.validation.required
      } else if (!/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        newErrors.email = labels.validation.invalidEmail
      }
      if (!formData.phone.trim()) {
        newErrors.phone = labels.validation.required
      } else if (!/^\+?[0-9]{8,15}$/.test(formData.phone)) {
        newErrors.phone = labels.validation.invalidPhone
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation
  const handleNext = () => {
    // Block if job option selected
    if (currentStep === 1 && submitStatus === 'job-blocked') return
    // Block if not representing entity
    if (currentStep === 2 && formData.representsEntity === 'no') return
    
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      // Reset blocked states when going back
      if (submitStatus === 'job-blocked' || submitStatus === 'not-eligible') {
        setSubmitStatus('idle')
      }
    }
  }

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(3)) return
    if (formData.honeypot) return // Honeypot check
    if (submitStatus === 'submitting') return // Duplicate submit prevention

    setSubmitStatus('submitting')

    try {
      const utm = getUtmParams()
      const normalizedPhone = normalizeSaudiPhone(formData.phone)

      const payload = {
        goal: formData.goal,
        representsOrg: formData.representsEntity,
        orgName: formData.entityName,
        sector: formData.sector,
        employeeCount: formData.employeesCount,
        meetingsCount: formData.meetingsPerMonth,
        boardsCount: formData.boardsCount,
        fullName: formData.fullName.trim(),
        jobTitle: formData.jobTitle,
        decisionRole: formData.decisionRole,
        email: formData.email.toLowerCase(),
        phone: normalizedPhone,
        message: formData.notes || '',
        selectedPackage: selectedPackage || '',
        // Metadata
        language:     lang,
        timestamp:    new Date().toISOString(),
        pageUrl:      window.location.href,
        referrer:     document.referrer || '',
        ctaLabel:     ctaLabel || '',
        utm_source:   utm.utm_source,
        utm_medium:   utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_term:     utm.utm_term,
        utm_content:  utm.utm_content,
        affiliate:    utm.affiliate,
      }
      
      // Clear session data after submission
      try {
        sessionStorage.removeItem('selectedPackage')
        sessionStorage.removeItem(SESSION_DRAFT_KEY)
        sessionStorage.removeItem(SESSION_CTA_KEY)
      } catch { /* ignore */ }
      
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      
      if (result.success) {
        setSubmitStatus('success')
        trackDemoRequest({
          goal: formData.goal,
          step: 3,
          lang,
          ...(selectedPackage ? { selectedPackage } : {}),
        })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  // Reset form — clears session draft too
  const resetForm = () => {
    try {
      sessionStorage.removeItem(SESSION_DRAFT_KEY)
    } catch { /* ignore */ }
    setFormData({
      goal: '',
      representsEntity: '',
      entityName: '',
      sector: '',
      employeesCount: '',
      meetingsPerMonth: '',
      boardsCount: '',
      fullName: '',
      jobTitle: '',
      decisionRole: '',
      email: '',
      phone: '',
      notes: '',
      honeypot: '',
    })
    setCurrentStep(1)
    setSubmitStatus('idle')
    setErrors({})
  }

  // Step indicator text
  const stepIndicator = labels.stepIndicator
    .replace('{current}', String(currentStep))
    .replace('{total}', '3')

  // ============== RENDER STATES ==============

  // Success screen — inline, no redirect, explains next steps
  if (submitStatus === 'success') {
    return (
      <section
        id="booking-cta"
        ref={ref as React.RefObject<HTMLElement>}
        className="relative scroll-mt-24 py-20 lg:py-28"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 md:p-12">
            <CheckCircle className="mx-auto h-14 w-14 text-emerald-500" />
            <h3 className="mt-6 text-2xl font-bold text-foreground" style={{ fontFamily: font }}>
              {labels.success.title}
            </h3>
            <p className="mt-3 text-base text-muted-foreground" style={{ fontFamily: font }}>
              {labels.success.message}
            </p>
            {/* Next-steps hint */}
            <p className="mt-4 rounded-lg border border-emerald-200 bg-white/70 px-4 py-3 text-sm text-emerald-800" style={{ fontFamily: font }}>
              {labels.success.nextSteps}
            </p>
            {/* Actions */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-lg bg-chart-1 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-chart-1/90"
                style={{ fontFamily: font }}
              >
                <Send className="h-4 w-4" />
                {labels.success.newRequest}
              </button>
              <button
                type="button"
                onClick={() => {
                  // Scroll to top and close the section visually by resetting — "إغلاق النموذج"
                  resetForm()
                  // Then re-submit status stays idle; user is back to the form's default state
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                style={{ fontFamily: font }}
              >
                <X className="h-4 w-4" />
                {labels.buttons.closeForm}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error screen
  if (submitStatus === 'error') {
    return (
      <section
        id="booking-cta"
        ref={ref as React.RefObject<HTMLElement>}
        className="relative scroll-mt-24 py-20 lg:py-28"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-12">
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h3 className="mt-6 text-2xl font-bold text-foreground" style={{ fontFamily: font }}>
              {labels.error.title}
            </h3>
            <p className="mt-4 text-muted-foreground" style={{ fontFamily: font }}>
              {labels.error.message}
            </p>
            <button
              type="button"
              onClick={() => setSubmitStatus('idle')}
              className="mt-6 rounded-lg bg-chart-1 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-chart-1/90"
              style={{ fontFamily: font }}
            >
              {labels.buttons.retry}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Main form
  return (
    <section
      id="booking-cta"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative scroll-mt-24 py-20 lg:py-28"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ fontFamily: font }}>
            {conversion?.heroCtas?.primary || labels.buttons.submit}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground" style={{ fontFamily: font }}>
            {conversion?.heroCtas?.microcopy || ''}
          </p>
        </div>

        {/* Form Card */}
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
          {/* Step Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => {
                const StepIcon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id

                return (
                  <div key={step.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      {/* Bubble — active gets a ring for extra pop on mobile */}
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                          isActive
                            ? 'border-chart-1 bg-chart-1 text-white shadow-[0_0_0_3px_hsl(var(--chart-1)/0.15)]'
                            : isCompleted
                            ? 'border-chart-1 bg-chart-1/10 text-chart-1'
                            : 'border-border bg-muted/40 text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <StepIcon className="h-4 w-4" />
                        )}
                      </div>
                      {/* Label — hidden on very small screens to avoid overflow */}
                      <span
                        className={`mt-1.5 hidden text-[11px] leading-tight sm:block ${
                          isActive
                            ? 'font-semibold text-chart-1'
                            : 'font-normal text-muted-foreground/60'
                        }`}
                        style={{ fontFamily: font }}
                      >
                        {labels.steps[step.key as keyof typeof labels.steps]}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`mx-2 h-px flex-1 transition-colors duration-300 ${
                          currentStep > step.id ? 'bg-chart-1' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <p className="mt-2.5 text-center text-xs text-muted-foreground" style={{ fontFamily: font }}>
              {stepIndicator}
            </p>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleFieldChange('honeypot')}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Step 1: Goal */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-foreground md:text-xl" style={{ fontFamily: font }}>
                    {labels.step1.title}
                  </h3>
                  {/* CTA-aware personalization hint — subtle, only when a known CTA label is present */}
                  {ctaLabel && (CTA_HINTS[lang]?.[ctaLabel] || CTA_HINTS.ar?.[ctaLabel]) ? (
                    <p className="mt-1 text-sm text-chart-1/80 font-medium" style={{ fontFamily: font }}>
                      {CTA_HINTS[lang]?.[ctaLabel] || CTA_HINTS.ar?.[ctaLabel]}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground" style={{ fontFamily: font }}>
                      {labels.step1.subtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  {/* Custom-styled select — appearance-none + explicit chevron makes it look native-free */}
                  <div
                    className={`group relative rounded-xl border-2 bg-background transition-all duration-150 ${
                      errors.goal
                        ? 'border-destructive'
                        : 'border-input hover:border-chart-1/40 focus-within:border-chart-1 focus-within:shadow-[0_0_0_3px_hsl(var(--chart-1)/0.12)]'
                    }`}
                  >
                    <select
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={(e) => handleGoalSelect(e.target.value)}
                      className={`w-full cursor-pointer appearance-none rounded-[10px] bg-transparent py-3.5 ps-4 pe-10 text-sm focus:outline-none ${
                        !formData.goal ? 'text-muted-foreground/80' : 'text-foreground font-medium'
                      }`}
                      style={{ fontFamily: font }}
                    >
                      <option value="">
                        {lang === 'ar'
                          ? 'اختر الهدف من الطلب'
                          : lang === 'hi'
                          ? 'अनुरोध का लक्ष्य चुनें'
                          : lang === 'ur'
                          ? 'درخواست کا مقصد منتخب کریں'
                          : 'Select request goal'}
                      </option>
                      {goalOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {/* Chevron icon — rotates subtly on focus for a polished feel */}
                    <ChevronDown
                      className="pointer-events-none absolute end-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform duration-150 group-focus-within:rotate-180"
                    />
                  </div>
                  {errors.goal && (
                    <p className="ps-1 text-xs text-destructive" style={{ fontFamily: font }}>
                      {lang === 'ar' ? 'يرجى اختيار أحد الخيارات' : labels.validation.required}
                    </p>
                  )}
                </div>

                {/* Job blocked — low-key inline strip, no competing visual weight */}
                {submitStatus === 'job-blocked' && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/80 px-3.5 py-2.5">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                    <p className="min-w-0 flex-1 text-xs text-amber-700 leading-snug" style={{ fontFamily: font }}>
                      <span className="font-semibold">{labels.jobBlocked.title}</span>
                      <span className="mx-1 opacity-40">·</span>
                      {labels.jobBlocked.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, goal: '' }))
                        setSubmitStatus('idle')
                      }}
                      className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-amber-700 underline-offset-2 transition-colors hover:underline"
                      style={{ fontFamily: font }}
                    >
                      {labels.buttons.goBack}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Entity Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: font }}>
                  {labels.step2.title}
                </h3>
                
                <RadioGroup
                  label={labels.step2.representsEntity}
                  value={formData.representsEntity}
                  onChange={handleRadioChange('representsEntity')}
                  options={[
                    { value: 'yes', label: labels.step2.yes },
                    { value: 'no', label: labels.step2.no },
                  ]}
                  error={errors.representsEntity}
                  font={font}
                />

                {/* Not eligible message */}
                {formData.representsEntity === 'no' && (
                  <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-6 text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
                    <h4 className="mt-4 text-lg font-semibold text-destructive" style={{ fontFamily: font }}>
                      {labels.notEligible.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground" style={{ fontFamily: font }}>
                      {labels.notEligible.message}
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, representsEntity: '' }))
                          setSubmitStatus('idle')
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-chart-1 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-chart-1/90"
                        style={{ fontFamily: font }}
                      >
                        <ArrowLeft className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                        {labels.buttons.goBack}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                        style={{ fontFamily: font }}
                      >
                        <X className="h-4 w-4" />
                        {labels.buttons.closeForm}
                      </button>
                    </div>
                  </div>
                )}

                {/* Entity fields - show only if "yes" */}
                {formData.representsEntity === 'yes' && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <InputField
                        id="entityName"
                        label={labels.step2.entityName}
                        icon={Building2}
                        value={formData.entityName}
                        onChange={handleFieldChange('entityName')}
                        placeholder={labels.step2.entityNamePlaceholder}
                        error={errors.entityName}
                        font={font}
                      />
                    </div>
                    <SelectField
                      id="sector"
                      label={labels.step2.sector}
                      icon={Briefcase}
                      value={formData.sector}
                      onChange={handleFieldChange('sector')}
                      options={sectorOptions}
                      placeholder={labels.selectPlaceholder}
                      error={errors.sector}
                      font={font}
                    />
                    <SelectField
                      id="employeesCount"
                      label={labels.step2.employeesCount}
                      icon={Users}
                      value={formData.employeesCount}
                      onChange={handleFieldChange('employeesCount')}
                      options={employeesOptions}
                      placeholder={labels.selectPlaceholder}
                      error={errors.employeesCount}
                      font={font}
                    />
                    <SelectField
                      id="meetingsPerMonth"
                      label={labels.step2.meetingsPerMonth}
                      icon={Calendar}
                      value={formData.meetingsPerMonth}
                      onChange={handleFieldChange('meetingsPerMonth')}
                      options={meetingsOptions}
                      placeholder={labels.selectPlaceholder}
                      error={errors.meetingsPerMonth}
                      font={font}
                    />
                    <SelectField
                      id="boardsCount"
                      label={labels.step2.boardsCount}
                      icon={FileText}
                      value={formData.boardsCount}
                      onChange={handleFieldChange('boardsCount')}
                      options={boardsOptions}
                      placeholder={labels.selectPlaceholder}
                      error={errors.boardsCount}
                      font={font}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: font }}>
                  {labels.step3.title}
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <InputField
                      id="fullName"
                      label={labels.step3.fullName}
                      icon={User}
                      value={formData.fullName}
                      onChange={handleFieldChange('fullName')}
                      placeholder={labels.step3.fullNamePlaceholder}
                      error={errors.fullName}
                      font={font}
                    />
                  </div>
                  <SelectField
                    id="jobTitle"
                    label={labels.step3.jobTitle}
                    icon={Briefcase}
                    value={formData.jobTitle}
                    onChange={handleFieldChange('jobTitle')}
                    options={jobTitleOptions}
                    placeholder={labels.selectPlaceholder}
                    error={errors.jobTitle}
                    font={font}
                  />
                  <SelectField
                    id="decisionRole"
                    label={labels.step3.decisionRole}
                    icon={Target}
                    value={formData.decisionRole}
                    onChange={handleFieldChange('decisionRole')}
                    options={decisionRoleOptions}
                    placeholder={labels.selectPlaceholder}
                    error={errors.decisionRole}
                    font={font}
                  />
                  <InputField
                    id="email"
                    label={labels.step3.email}
                    icon={Mail}
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    placeholder={labels.step3.emailPlaceholder}
                    error={errors.email}
                    dir="ltr"
                    font={font}
                  />
                  <InputField
                    id="phone"
                    label={labels.step3.phone}
                    icon={Phone}
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={labels.step3.phonePlaceholder}
                    error={errors.phone}
                    dir="ltr"
                    font={font}
                  />
                </div>
                <TextareaField
                  id="notes"
                  label={labels.step3.notes}
                  value={formData.notes}
                  onChange={handleFieldChange('notes')}
                  placeholder={labels.step3.notesPlaceholder}
                  required={false}
                  font={font}
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6">
              {currentStep > 1 && submitStatus !== 'not-eligible' && submitStatus !== 'job-blocked' ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  style={{ fontFamily: font }}
                >
                  {labels.buttons.back}
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={submitStatus === 'job-blocked' || (currentStep === 2 && formData.representsEntity === 'no')}
                  className="rounded-lg bg-chart-1 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-chart-1/90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontFamily: font }}
                >
                  {labels.buttons.next}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="flex items-center gap-2 rounded-lg bg-chart-1 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-chart-1/90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontFamily: font }}
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {labels.buttons.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {labels.buttons.submit}
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
