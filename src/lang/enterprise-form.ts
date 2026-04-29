// Enterprise Lead Form Translations
// All 4 languages: Arabic (ar), English (en), Hindi (hi), Urdu (ur)

export const enterpriseFormTranslations = {
  ar: {
    // Step titles
    steps: {
      contact: 'معلومات التواصل',
      organization: 'بيانات المنظمة',
      requirements: 'متطلباتك',
      preferences: 'تفضيلاتك',
    },
    
    // Step headers
    step1: { title: 'معلومات التواصل' },
    step2: { title: 'بيانات المنظمة' },
    step3: { title: 'متطلباتك' },
    step4: { title: 'تفضيلاتك' },
    
    // Field labels
    fields: {
      fullName: 'الاسم الكامل',
      jobTitle: 'المسمى الوظيفي',
      email: 'البريد الإلكتروني للعمل',
      phone: 'رقم الهاتف',
      organizationName: 'اسم المنظمة',
      sector: 'القطاع',
      country: 'الدولة',
      boardCount: 'عدد المجالس/اللجان',
      memberCount: 'إجمالي الأعضاء',
      currentTools: 'الأدوات الحالية (اختياري)',
      timeline: 'الجدول الزمني للتنفيذ',
      deploymentPreference: 'طريقة النشر المفضلة',
      demoPreference: 'تفضيل العرض التوضيحي',
      additionalNotes: 'ملاحظات إضافية (اختياري)',
    },
    
    // Placeholders
    placeholders: {
      fullName: 'أدخل اسمك الكامل',
      jobTitle: 'مثال: أمين سر المجلس',
      email: 'name@company.com',
      phone: '+966 5X XXX XXXX',
      organizationName: 'أدخل اسم المنظمة',
      country: 'مثال: المملكة العربية السعودية',
      currentTools: 'مثال: Excel، البريد الإلكتروني، برامج أخرى',
      additionalNotes: 'أي متطلبات أو أسئلة محددة؟',
    },
    
    // Sectors
    sectors: {
      listedCompany: 'شركة مدرجة',
      government: 'جهة حكومية',
      familyBusiness: 'شركة عائلية',
      financial: 'مؤسسة مالية',
      healthcare: 'قطاع صحي',
      education: 'قطاع تعليمي',
      nonprofit: 'منظمة غير ربحية',
      other: 'أخرى',
    },
    
    // Timeline options
    timeline: {
      immediate: 'فوري (خلال شهر)',
      oneToThree: '1-3 أشهر',
      threeToSix: '3-6 أشهر',
      sixPlus: 'أكثر من 6 أشهر',
      exploring: 'استكشاف فقط',
    },
    
    // Deployment options
    deployment: {
      cloud: 'سحابي (SaaS)',
      onPremise: 'محلي (On-Premise)',
      hybrid: 'هجين',
    },
    
    // Demo options
    demo: {
      videoCall: 'عرض عبر مكالمة فيديو',
      inPerson: 'عرض حضوري',
      selfGuided: 'جولة ذاتية',
    },
    
    // Buttons
    buttons: {
      next: 'التالي',
      back: 'السابق',
      submit: 'إرسال الطلب',
      submitting: 'جاري الإرسال...',
    },
    
    // Validation messages
    validation: {
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'البريد الإلكتروني غير صالح',
      invalidPhone: 'رقم الهاتف غير صالح',
    },
    
    // Success screen
    success: {
      title: 'شكراً لك!',
      message: 'تم استلام طلبك بنجاح. سيتواصل معك فريقنا خلال 24 ساعة عمل.',
      close: 'إغلاق',
    },
    
    // OTP verification
    otp: {
      title: 'تحقق من بريدك الإلكتروني',
      message: 'أرسلنا رمز التحقق إلى بريدك الإلكتروني',
      verify: 'تحقق وإرسال',
      verifying: 'جاري التحقق...',
      resend: 'إعادة إرسال الرمز',
      resendIn: 'إعادة الإرسال خلال',
    },
    
    // Misc
    selectPlaceholder: 'اختر...',
    
    // Hero CTA
    heroCta: {
      title: 'ابدأ رحلة الحوكمة الرقمية',
      subtitle: 'احصل على عرض توضيحي مخصص لمنظمتك',
      button: 'احجز عرضك التوضيحي',
      buttonExpanded: 'أغلق النموذج',
    },
  },
  
  en: {
    steps: {
      contact: 'Contact Info',
      organization: 'Organization',
      requirements: 'Requirements',
      preferences: 'Preferences',
    },
    
    step1: { title: 'Contact Information' },
    step2: { title: 'Organization Details' },
    step3: { title: 'Your Requirements' },
    step4: { title: 'Your Preferences' },
    
    fields: {
      fullName: 'Full Name',
      jobTitle: 'Job Title',
      email: 'Business Email',
      phone: 'Phone Number',
      organizationName: 'Organization Name',
      sector: 'Sector',
      country: 'Country',
      boardCount: 'Number of Boards/Committees',
      memberCount: 'Total Members',
      currentTools: 'Current Tools (Optional)',
      timeline: 'Implementation Timeline',
      deploymentPreference: 'Preferred Deployment',
      demoPreference: 'Demo Preference',
      additionalNotes: 'Additional Notes (Optional)',
    },
    
    placeholders: {
      fullName: 'Enter your full name',
      jobTitle: 'e.g. Board Secretary',
      email: 'name@company.com',
      phone: '+966 5X XXX XXXX',
      organizationName: 'Enter organization name',
      country: 'e.g. Saudi Arabia',
      currentTools: 'e.g. Excel, Email, Other software',
      additionalNotes: 'Any specific requirements or questions?',
    },
    
    sectors: {
      listedCompany: 'Listed Company',
      government: 'Government Entity',
      familyBusiness: 'Family Business',
      financial: 'Financial Institution',
      healthcare: 'Healthcare',
      education: 'Education',
      nonprofit: 'Non-Profit',
      other: 'Other',
    },
    
    timeline: {
      immediate: 'Immediate (within 1 month)',
      oneToThree: '1-3 months',
      threeToSix: '3-6 months',
      sixPlus: '6+ months',
      exploring: 'Just exploring',
    },
    
    deployment: {
      cloud: 'Cloud (SaaS)',
      onPremise: 'On-Premise',
      hybrid: 'Hybrid',
    },
    
    demo: {
      videoCall: 'Video Call Demo',
      inPerson: 'In-Person Demo',
      selfGuided: 'Self-Guided Tour',
    },
    
    buttons: {
      next: 'Next',
      back: 'Back',
      submit: 'Submit Request',
      submitting: 'Submitting...',
    },
    
    validation: {
      required: 'This field is required',
      invalidEmail: 'Invalid email address',
      invalidPhone: 'Invalid phone number',
    },
    
    success: {
      title: 'Thank you!',
      message: 'Your request has been received. Our team will contact you within 24 business hours.',
      close: 'Close',
    },
    
    otp: {
      title: 'Verify your email',
      message: 'We sent a verification code to your email',
      verify: 'Verify & Submit',
      verifying: 'Verifying...',
      resend: 'Resend code',
      resendIn: 'Resend in',
    },
    
    selectPlaceholder: 'Select...',
    
    heroCta: {
      title: 'Start Your Digital Governance Journey',
      subtitle: 'Get a personalized demo for your organization',
      button: 'Book Your Demo',
      buttonExpanded: 'Close Form',
    },
  },
  
  hi: {
    steps: {
      contact: 'संपर्क जानकारी',
      organization: 'संगठन',
      requirements: 'आवश्यकताएं',
      preferences: 'प्राथमिकताएं',
    },
    
    step1: { title: 'संपर्क जानकारी' },
    step2: { title: 'संगठन विवरण' },
    step3: { title: 'आपकी आवश्यकताएं' },
    step4: { title: 'आपकी प्राथमिकताएं' },
    
    fields: {
      fullName: 'पूरा नाम',
      jobTitle: 'पद',
      email: 'व्यावसायिक ईमेल',
      phone: 'फोन नंबर',
      organizationName: 'संगठन का नाम',
      sector: 'क्षेत्र',
      country: 'देश',
      boardCount: 'बोर्ड/समितियों की संख्या',
      memberCount: 'कुल सदस्य',
      currentTools: 'वर्तमान उपकरण (वैकल्पिक)',
      timeline: 'कार्यान्वयन समयरेखा',
      deploymentPreference: 'पसंदीदा डिप्लॉयमेंट',
      demoPreference: 'डेमो प्राथमिकता',
      additionalNotes: 'अतिरिक्त नोट्स (वैकल्पिक)',
    },
    
    placeholders: {
      fullName: 'अपना पूरा नाम दर्ज करें',
      jobTitle: 'उदा. बोर्ड सचिव',
      email: 'name@company.com',
      phone: '+966 5X XXX XXXX',
      organizationName: 'संगठन का नाम दर्ज करें',
      country: 'उदा. सऊदी अरब',
      currentTools: 'उदा. Excel, ईमेल, अन्य सॉफ्टवेयर',
      additionalNotes: 'कोई विशेष आवश्यकता या प्रश्न?',
    },
    
    sectors: {
      listedCompany: 'सूचीबद्ध कंपनी',
      government: 'सरकारी संस्था',
      familyBusiness: 'पारिवारिक व्यवसाय',
      financial: 'वित्तीय संस्थान',
      healthcare: 'स्वास्थ्य सेवा',
      education: 'शिक्षा',
      nonprofit: 'गैर-लाभकारी',
      other: 'अन्य',
    },
    
    timeline: {
      immediate: 'तत्काल (1 महीने के भीतर)',
      oneToThree: '1-3 महीने',
      threeToSix: '3-6 महीने',
      sixPlus: '6+ महीने',
      exploring: 'केवल जानकारी ले रहे हैं',
    },
    
    deployment: {
      cloud: 'क्लाउड (SaaS)',
      onPremise: 'ऑन-प्रिमाइस',
      hybrid: 'हाइब्रिड',
    },
    
    demo: {
      videoCall: 'वीडियो कॉल डेमो',
      inPerson: 'व्यक्तिगत डेमो',
      selfGuided: 'स्व-निर्देशित टूर',
    },
    
    buttons: {
      next: 'अगला',
      back: 'पीछे',
      submit: 'अनुरोध भेजें',
      submitting: 'भेजा जा रहा है...',
    },
    
    validation: {
      required: 'यह फ़ील्ड आवश्यक है',
      invalidEmail: 'अमान्य ईमेल पता',
      invalidPhone: 'अमान्य फोन नंबर',
    },
    
    success: {
      title: 'धन्यवाद!',
      message: 'आपका अनुरोध प्राप्त हो गया है। हमारी टीम 24 व्यावसायिक घंटों के भीतर आपसे संपर्क करेगी।',
      close: 'बंद करें',
    },
    
    otp: {
      title: 'अपना ईमेल सत्यापित करें',
      message: 'हमने आपके ईमेल पर एक सत्यापन कोड भेजा है',
      verify: 'सत्यापित करें और भेजें',
      verifying: 'सत्यापन हो रहा है...',
      resend: 'कोड पुनः भेजें',
      resendIn: 'पुनः भेजें',
    },
    
    selectPlaceholder: 'चुनें...',
    
    heroCta: {
      title: 'अपनी डिजिटल गवर्नेंस यात्रा शुरू करें',
      subtitle: 'अपने संगठन के लिए व्यक्तिगत डेमो प्राप्त करें',
      button: 'अपना डेमो बुक करें',
      buttonExpanded: 'फॉर्म बंद करें',
    },
  },
  
  ur: {
    steps: {
      contact: 'رابطہ معلومات',
      organization: 'تنظیم',
      requirements: 'ضروریات',
      preferences: 'ترجیحات',
    },
    
    step1: { title: 'رابطہ معلومات' },
    step2: { title: 'تنظیم کی تفصیلات' },
    step3: { title: 'آپ کی ضروریات' },
    step4: { title: 'آپ کی ترجیحات' },
    
    fields: {
      fullName: 'مکمل نام',
      jobTitle: 'عہدہ',
      email: 'کاروباری ای میل',
      phone: 'فون نمبر',
      organizationName: 'تنظیم کا نام',
      sector: 'شعبہ',
      country: 'ملک',
      boardCount: 'بورڈز/کمیٹیوں کی تعداد',
      memberCount: 'کل ممبران',
      currentTools: 'موجودہ ٹولز (اختیاری)',
      timeline: 'عمل درآمد کا وقت',
      deploymentPreference: 'ترجیحی تعیناتی',
      demoPreference: 'ڈیمو ترجیح',
      additionalNotes: 'اضافی نوٹس (اختیاری)',
    },
    
    placeholders: {
      fullName: 'اپنا مکمل نام درج کریں',
      jobTitle: 'مثلاً بورڈ سیکرٹری',
      email: 'name@company.com',
      phone: '+966 5X XXX XXXX',
      organizationName: 'تنظیم کا نام درج کریں',
      country: 'مثلاً سعودی عرب',
      currentTools: 'مثلاً Excel، ای میل، دیگر سافٹ ویئر',
      additionalNotes: 'کوئی مخصوص ضروریات یا سوالات؟',
    },
    
    sectors: {
      listedCompany: 'درج شدہ کمپنی',
      government: 'سرکاری ادارہ',
      familyBusiness: 'خاندانی کاروبار',
      financial: 'مالیاتی ادارہ',
      healthcare: 'صحت کی دیکھ بھال',
      education: 'تعلیم',
      nonprofit: 'غیر منافع بخش',
      other: 'دیگر',
    },
    
    timeline: {
      immediate: 'فوری (1 ماہ کے اندر)',
      oneToThree: '1-3 ماہ',
      threeToSix: '3-6 ماہ',
      sixPlus: '6+ ماہ',
      exploring: 'صرف معلومات حاصل کر رہے ہیں',
    },
    
    deployment: {
      cloud: 'کلاؤڈ (SaaS)',
      onPremise: 'آن پریمائز',
      hybrid: 'ہائبرڈ',
    },
    
    demo: {
      videoCall: 'ویڈیو کال ڈیمو',
      inPerson: 'ذاتی ڈیمو',
      selfGuided: 'خود رہنمائی ٹور',
    },
    
    buttons: {
      next: 'اگلا',
      back: 'پیچھے',
      submit: 'درخواست بھیجیں',
      submitting: 'بھیجا جا رہا ہے...',
    },
    
    validation: {
      required: 'یہ فیلڈ ضروری ہے',
      invalidEmail: 'غلط ای میل پتہ',
      invalidPhone: 'غلط فون نمبر',
    },
    
    success: {
      title: 'شکریہ!',
      message: 'آپ کی درخواست موصول ہو گئی ہے۔ ہماری ٹیم 24 کاروباری گھنٹوں میں آپ سے رابطہ کرے گی۔',
      close: 'بند کریں',
    },
    
    otp: {
      title: 'اپنا ای میل تصدیق کریں',
      message: 'ہم نے آپ کے ای میل پر ایک تصدیقی کوڈ بھیجا ہے',
      verify: 'تصدیق کریں اور بھیجیں',
      verifying: 'تصدیق ہو رہی ہے...',
      resend: 'کوڈ دوبارہ بھیجیں',
      resendIn: 'دوبارہ بھیجیں',
    },
    
    selectPlaceholder: 'منتخب کریں...',
    
    heroCta: {
      title: 'اپنا ڈیجیٹل گورننس سفر شروع کریں',
      subtitle: 'اپنی تنظیم کے لیے ذاتی ڈیمو حاصل کریں',
      button: 'اپنا ڈیمو بک کریں',
      buttonExpanded: 'فارم بند کریں',
    },
  },
}

export type EnterpriseFormTranslations = typeof enterpriseFormTranslations.ar
