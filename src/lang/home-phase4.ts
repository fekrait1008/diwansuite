import type { LangCode } from './types'
import type { PublicPage } from '@/lib/page-registry'

export type HomeFaqGroupKey =
  | 'productOverview'
  | 'governanceWorkflow'
  | 'boardsCommittees'
  | 'generalAssemblies'
  | 'minutesEsignature'
  | 'decisionsExecution'
  | 'attendanceQuorum'
  | 'ai'
  | 'securityCompliance'
  | 'integrations'
  | 'supportImplementation'

export interface HomeFaqExtraItem {
  group: HomeFaqGroupKey
  q: string
  a: string
}

export interface HomeScreenItem {
  page: Exclude<PublicPage, 'home'>
  caption: string
  alt: string
  image: string
}

export interface HomePhase4Lang {
  hero: {
    badge?: string
    sub: string
    answerParagraph: string
    bullets: string[]
  }
  valueProposition: {
    answerParagraph: string
  }
  aiSection: {
    answerParagraph: string
  }
  compliance: {
    answerParagraph: string
  }
  reports: {
    answerParagraph: string
  }
  faq: {
    badge: string
    heading: string
    groupTitles: Record<HomeFaqGroupKey, string>
    extraItems: HomeFaqExtraItem[]
  }
  screens: {
    badge: string
    heading: string
    intro: string
    items: HomeScreenItem[]
  }
  links: {
    solutions: string
    platform: string
    trust: string
    industries: string
  }
}

export const homePhase4Content: Record<LangCode, HomePhase4Lang> = {
  ar: {
    hero: {
      badge: 'منصة حوكمة الاجتماعات والقرارات للمجالس واللجان',
      sub: 'حوكمة من الدعوة إلى الاعتماد إلى التنفيذ في منصة واحدة للمجالس واللجان والجمعيات العمومية.',
      answerParagraph:
        'ديوان سويت منصة حوكمة مؤسسية تساعد الجهات الحكومية والشركات المدرجة والبنوك والمؤسسات الكبرى على إدارة دورة الاجتماع كاملة: الدعوة، جدول الأعمال، الحضور والنصاب، المحاضر والتوقيع الإلكتروني، القرارات، المتابعة، التقارير، والامتثال في سجل موحد وقابل للتدقيق.',
      bullets: [
        'إدارة مجالس الإدارة واللجان والجمعيات العمومية',
        'محاضر وتوقيع إلكتروني ومسارات اعتماد منظمة',
        'متابعة القرارات والتنفيذ مع مساءلة واضحة',
        'تقارير تنفيذية وتكاملات واستعداد للقطاعات المنظمة',
      ]
},
    valueProposition: {
      answerParagraph:
        'يمنحك ديوان سويت مسار حوكمة موحدًا يبدأ من الدعوة والتحضير وينتهي بالاعتماد والتنفيذ والتقرير. وبدل الاعتماد على البريد والجداول والملفات المتفرقة، تصبح كل خطوة قابلة للقياس والمراجعة والربط بين المجلس واللجنة والإدارة التنفيذية.'
},
    aiSection: {
      answerParagraph:
        'يوظف ديوان سويت الذكاء الاصطناعي في تلخيص الاجتماعات، واستخراج القرارات والتوصيات، وتحويل المخرجات إلى عناصر متابعة منظمة، ودعم التحليل التنفيذي قبل الاعتماد مع إبقاء القرار النهائي بيد المستخدم المخول.'
},
    compliance: {
      answerParagraph:
        'صُممت ضوابط الأمان والامتثال في ديوان سويت لخدمة البيئات الحساسة والمنظمة، مع صلاحيات دقيقة، وتشفير أثناء النقل والتخزين، وسجل تدقيق، ونسخ احتياطية، وجاهزية أفضل للامتثال المؤسسي والتدقيق الداخلي والخارجي.'
},
    reports: {
      answerParagraph:
        'تساعد لوحات التحكم والتقارير التنفيذية على قياس انتظام الاجتماعات، ونسب الحضور، وسرعة اعتماد المحاضر، ومعدلات تنفيذ القرارات، ومؤشرات الحوكمة والامتثال بصورة تدعم الإدارة العليا والجهات الرقابية.'
},
    faq: {
      badge: 'الأسئلة الشائعة',
      heading: 'إجابات عملية على أكثر الأسئلة شيوعًا حول ديوان سويت',
      groupTitles: {
        productOverview: 'نظرة عامة على المنتج',
        governanceWorkflow: 'مسار الحوكمة والتشغيل',
        boardsCommittees: 'المجالس واللجان',
        generalAssemblies: 'الجمعيات العمومية',
        minutesEsignature: 'المحاضر والتوقيع الإلكتروني',
        decisionsExecution: 'القرارات والتنفيذ',
        attendanceQuorum: 'الحضور والنصاب',
        ai: 'الذكاء الاصطناعي',
        securityCompliance: 'الأمن والامتثال',
        integrations: 'التكاملات',
        supportImplementation: 'التطبيق والدعم'
},
      extraItems: [
        { group: 'generalAssemblies', q: 'هل يدعم ديوان سويت إدارة الجمعيات العمومية؟', a: 'نعم، يمكن استخدامه لتنظيم الدعوات، وجدولة البنود، وتوثيق الحضور والنصاب، وإدارة المحاضر في إطار رقابي منضبط.' },
        { group: 'generalAssemblies', q: 'هل يدعم التصويت وإثبات الرأي في الاجتماعات؟', a: 'يمكن ربط الاجتماع بسير عمل يوثق قرارات الحضور والرأي والاعتماد بحسب السياسة المعتمدة لدى الجهة.' },
        { group: 'minutesEsignature', q: 'هل يمكن اعتماد المحاضر إلكترونيًا؟', a: 'نعم، يدعم مسارات اعتماد منظمة للمحاضر مع تسجيل خطوات المراجعة والاعتماد بصورة مؤرشفة.' },
        { group: 'minutesEsignature', q: 'هل يمنع التعديل على المحضر بعد الاعتماد النهائي؟', a: 'يمكن ضبط سير العمل بحيث يصبح المحضر النهائي نسخة مرجعية مع سجل واضح لأي تعديل أو إصدار لاحق وفق الصلاحيات.' },
        { group: 'minutesEsignature', q: 'هل توجد طوابع زمنية وسجل اعتماد؟', a: 'نعم، يتم توثيق توقيتات الاعتماد وسجل النشاط المرتبط بها لدعم التتبع والتدقيق.' },
        { group: 'decisionsExecution', q: 'هل يمكن ربط القرار بمالك تنفيذي وتاريخ استحقاق؟', a: 'نعم، يمكن تحويل كل قرار إلى عنصر متابعة مع مسؤول مباشر وأولوية وتاريخ استحقاق وحالة تنفيذ.' },
        { group: 'decisionsExecution', q: 'هل توجد تنبيهات وتصعيد عند التأخر؟', a: 'نعم، يدعم النظام التنبيهات والتصعيد بحسب إعدادات الجهة لضمان وضوح المسؤولية وسرعة المعالجة.' },
        { group: 'attendanceQuorum', q: 'هل يدعم الاعتذارات قبل الاجتماع وتوثيقها؟', a: 'نعم، يمكن توثيق الاعتذارات وحالة الحضور وربطها بسجلات الاجتماع والتقارير.' },
        { group: 'attendanceQuorum', q: 'هل توجد تقارير حضور ونصاب للإدارة العليا؟', a: 'نعم، تتوفر تقارير ولوحات مؤشرات تبين الحضور، والنصاب، وانتظام الاجتماعات على مستوى المجلس أو اللجنة.' },
        { group: 'integrations', q: 'هل يدعم Google Calendar وOutlook وZoom وTeams وWebex؟', a: 'نعم، يدعم التكامل مع أدوات التقويم والاجتماعات الشائعة ضمن نهج مؤسسي منظم.' },
        { group: 'integrations', q: 'هل يمكن ربطه مع ERP وHCM وCRM وأنظمة المحتوى المؤسسي؟', a: 'نعم، يدعم التكامل عبر واجهات API وربط البيانات مع الأنظمة المؤسسية ذات الصلة لاستمرارية التشغيل.' },
        { group: 'supportImplementation', q: 'هل توجد خطة تطبيق وتدريب للجهات الكبيرة؟', a: 'نعم، يمكن تنفيذ المشروع على مراحل تشمل التهيئة، والهجرة، والتدريب، والدعم التشغيلي وفق احتياج الجهة.' },
        { group: 'productOverview', q: 'ما الفرق بين ديوان سويت ومنصات الاجتماعات التقليدية؟', a: 'منصات الاجتماعات تركز على الاتصال المرئي، بينما ديوان سويت يدير دورة الاجتماع والقرار بالكامل: من الدعوة وجدول الأعمال إلى المحضر والتوقيع الإلكتروني ومتابعة التنفيذ وتقارير الامتثال.' },
        { group: 'productOverview', q: 'هل يدعم ديوان سويت إدارة الجمعيات العمومية؟', a: 'نعم، يدعم ديوان سويت إدارة الجمعيات العمومية من الدعوات وجدول الأعمال إلى النصاب والتصويت والمحاضر ومخرجات الاعتماد.' },
        { group: 'productOverview', q: 'هل يمكن إنشاء المحاضر عبر الذكاء الاصطناعي؟', a: 'نعم، يساعد ديوان سويت في تفريغ الاجتماعات، تحليل النقاشات، استخراج القرارات، وإنشاء مسودة محضر قابلة للمراجعة والاعتماد.' },
        { group: 'productOverview', q: 'هل يدعم ديوان سويت متابعة القرارات بعد الاجتماع؟', a: 'نعم، يتم تحويل القرارات إلى مهام تنفيذية مرتبطة بمسؤول وتاريخ استحقاق وحالة تنفيذ وتنبيهات وتصعيد عند التأخير.' },
        { group: 'boardsCommittees', q: 'هل يدعم ديوان سويت إدارة مجالس الإدارة؟', a: 'نعم، يدير ديوان سويت دورة حياة مجلس الإدارة بالكامل من تشكيل المجلس وإدارة العضويات والصلاحيات إلى الاجتماعات والمحاضر والقرارات وتقارير الحوكمة.' },
        { group: 'boardsCommittees', q: 'هل يدعم إدارة اللجان المنبثقة عن المجلس؟', a: 'نعم، يدير ديوان سويت اللجان المتخصصة كلجان التدقيق والمخاطر والاستثمار والتنفيذية بفصل كامل للصلاحيات ومسار اعتماد منظم.' },
        { group: 'attendanceQuorum', q: 'هل يحتسب النصاب النظامي تلقائيًا؟', a: 'نعم، يحسب ديوان سويت النصاب تلقائيًا بمجرد تسجيل الحضور، ويتحقق منه قبل البدء بالتصويت أو اتخاذ القرارات الرسمية.' },
        { group: 'minutesEsignature', q: 'هل يدعم التوقيع الإلكتروني والختم الزمني؟', a: 'نعم، يدعم ديوان سويت التوقيع الإلكتروني على المحاضر ويوثق الختم الزمني لكل خطوة اعتماد لدعم التتبع والتدقيق المؤسسي.' },
        { group: 'attendanceQuorum', q: 'هل يدعم ديوان سويت الحضور الذكي عبر QR؟', a: 'نعم، يوفر QR فريدًا لكل مدعو يُحدَّث دوريًا، ويدعم الحضور الحضوري والافتراضي والهجين مع إدراج النتائج تلقائيًا في المحضر.' },
        { group: 'productOverview', q: 'هل يدعم ديوان سويت الاجتماعات الحضورية والافتراضية والهجينة؟', a: 'نعم، يدعم الاجتماعات الحضورية والافتراضية عبر Zoom وTeams وWebex وGoogle Meet، والهجينة مع توحيد التوثيق في مسار واحد.' },
        { group: 'integrations', q: 'هل يتكامل ديوان سويت مع DocSuite ECM؟', a: 'نعم، يتكامل ديوان سويت مع DocSuite ECM لتبادل الوثائق والمحاضر والقرارات في منظومة إدارة المحتوى المؤسسي.' },
        { group: 'securityCompliance', q: 'هل يمكن تشغيل ديوان سويت On-Premise؟', a: 'نعم، يدعم ديوان سويت الاستضافة السحابية والخاصة والمحلية (On-Premise)، وذلك حسب متطلبات الجهة وبيئة التشغيل.' },
        { group: 'securityCompliance', q: 'كيف يحمي ديوان سويت بيانات المجالس؟', a: 'يوظف ديوان سويت تشفيرًا أثناء النقل والتخزين، وصلاحيات دقيقة حسب الدور، وسجل تدقيق غير قابل للتعديل، ونسخًا احتياطية منتظمة، وجاهزية أعلى للامتثال المؤسسي.' },
        { group: 'productOverview', q: 'هل يدعم ديوان سويت التقارير ولوحات المعلومات التنفيذية؟', a: 'نعم، يوفر لوحات تحكم تنفيذية وتقارير جاهزة لقياس الحضور والنصاب وسرعة اعتماد المحاضر ومعدلات تنفيذ القرارات ومؤشرات الامتثال.' },
        { group: 'supportImplementation', q: 'كيف يتم التسعير في ديوان سويت؟', a: 'التسعير سنوي ويبدأ من 750 ريال شهريًا لكل مستخدم تنفيذي. يمكن الاشتراك في الباقة المناسبة أو طلب عرض مخصص حسب حجم الجهة واحتياجاتها.' },
        { group: 'productOverview', q: 'هل ديوان سويت مناسب للجهات الحكومية؟', a: 'نعم، ديوان سويت مصمم لخدمة الجهات الحكومية بدعم متطلبات الحوكمة والأمن السيبراني، وخيارات استضافة داخل المملكة، وتقارير امتثال جاهزة للجهات الرقابية.' },
        { group: 'productOverview', q: 'هل يناسب الشركات الكبرى والشركات المدرجة؟', a: 'نعم، يلبي ديوان سويت احتياجات الشركات المدرجة والكبرى من حيث فصل المجالس واللجان، وجاهزية هيئة السوق المالية، وتقارير الحوكمة، وسجلات التدقيق المؤرشفة.' },
        { group: 'supportImplementation', q: 'هل يمكن تخصيص مسارات الاعتماد والصلاحيات؟', a: 'نعم، يدعم ديوان سويت تخصيص مسارات الاعتماد (Approval Workflow) وصلاحيات RBAC على مستوى المجلس واللجنة والاجتماع والوثيقة حسب سياسة الجهة.' },
        { group: 'productOverview', q: 'هل يدعم ديوان سويت اللغات المتعددة؟', a: 'نعم، يدعم ديوان سويت العربية والإنجليزية والهندية والأردية مع واجهة RTL كاملة للعربية والأردية.' },
      ]
},
    screens: {
      badge: 'إثبات المنتج',
      heading: 'شواهد عملية على دورة الحوكمة داخل النظام',
      intro: 'هذه أمثلة على واجهات تشغيلية توضح كيف ينتقل العمل من الاجتماع إلى القرار إلى التنفيذ والتقرير داخل بيئة مؤسسية واضحة.',
      items: [
        { page: 'boardManagementSystem', caption: 'لوحة متابعة مجالس الإدارة واللجان مع رؤية حالة الاجتماعات والاعتمادات.', alt: 'لوحة متابعة حوكمة مجلس الإدارة واللجان في ديوان سويت', image: '/proof-governance-dashboard.svg' },
        { page: 'boardManagementSystem', caption: 'مسار الاجتماع من الدعوة وجدول الأعمال إلى الحضور والمرفقات والمحضر.', alt: 'واجهة دورة حياة الاجتماع في ديوان سويت', image: '/proof-meeting-lifecycle.svg' },
        { page: 'decisionTracking', caption: 'تتبع القرارات وربطها بالمسؤولين وتواريخ الاستحقاق والتصعيد والتنفيذ.', alt: 'واجهة تتبع تنفيذ القرارات والمسؤوليات في ديوان سويت', image: '/proof-decision-tracking.svg' },
        { page: 'meetingMinutesEsignature', caption: 'إعداد المحاضر واعتمادها إلكترونيًا مع سجل تدقيق وختم زمني.', alt: 'واجهة اعتماد المحاضر والتوقيع الإلكتروني في ديوان سويت', image: '/proof-minutes-approval.svg' },
        { page: 'attendanceQuorumQr', caption: 'تسجيل الحضور والنصاب عبر QR مع إدراج النتائج داخل المحضر.', alt: 'واجهة إدارة الحضور والنصاب عبر QR في ديوان سويت', image: '/proof-attendance-qr.svg' },
        { page: 'governanceReportsDashboards', caption: 'لوحات تحكم وتقارير تنفيذية لمتابعة الحوكمة والامتثال والتنفيذ.', alt: 'واجهة التقارير ولوحات التحكم التنفيذية في ديوان سويت', image: '/proof-governance-reports.svg' },
      ]
},
    links: {
      solutions: 'حلول مرتبطة',
      platform: 'صفحات المنصة ذات الصلة',
      trust: 'الأمن والامتثال',
      industries: 'قطاعات ذات صلة'
}
},
  en: {
    hero: {
      badge: 'Governance platform for boards, committees, and assemblies',
      sub: 'Governance from invitation to approval to execution in one platform for boards, committees, and general assemblies.',
      answerParagraph:
        'Diwan Suite is an institutional governance platform built for government entities, listed companies, banks, and large organizations to manage the full meeting lifecycle: invitations, agenda, attendance and quorum, minutes and e-signature, decisions, follow-up, reporting, and compliance in one auditable record.',
      bullets: [
        'Boards, committees, and general assembly workflows',
        'Minutes, e-signature, and controlled approval routes',
        'Decision follow-up with ownership and accountability',
        'Executive reporting, integrations, and regulated-sector readiness',
      ]
},
    valueProposition: { answerParagraph: 'Diwan Suite delivers one governance workflow from preparation and invitation through approval, execution, and reporting. Instead of relying on scattered emails, spreadsheets, and files, every step becomes measurable, reviewable, and linked across the board, committee, and executive office.' },
    aiSection: { answerParagraph: 'Diwan Suite applies AI to summarize meetings, extract decisions and recommendations, convert outputs into structured follow-up items, and support executive analysis before approval while keeping final authority with authorized users.' },
    compliance: { answerParagraph: 'Security and compliance controls are built to serve sensitive and regulated environments through granular permissions, encryption in transit and at rest, audit trails, backup discipline, and stronger readiness for internal and external review.' },
    reports: { answerParagraph: 'Executive dashboards and reports help leadership measure meeting discipline, attendance, minutes approval speed, decision execution, and governance and compliance KPIs with visibility suitable for senior oversight.' },
    faq: {
      badge: 'FAQ',
      heading: 'Practical answers to the most common questions about Diwan Suite',
      groupTitles: {
        productOverview: 'Product overview', governanceWorkflow: 'Governance workflow', boardsCommittees: 'Boards and committees', generalAssemblies: 'General assemblies', minutesEsignature: 'Minutes and e-signature', decisionsExecution: 'Decisions and execution', attendanceQuorum: 'Attendance and quorum', ai: 'AI', securityCompliance: 'Security and compliance', integrations: 'Integrations', supportImplementation: 'Implementation and support'
},
      extraItems: [
        { group: 'generalAssemblies', q: 'Does Diwan Suite support general assembly management?', a: 'Yes. It can support invitations, agenda planning, attendance and quorum documentation, and minutes handling within a controlled governance workflow.' },
        { group: 'generalAssemblies', q: 'Does it support voting or formal opinion collection?', a: 'The platform can support structured approval and documented voting-related workflows based on the organization’s governance policy.' },
        { group: 'minutesEsignature', q: 'Can minutes be approved electronically?', a: 'Yes. Minutes can move through controlled approval routes with documented review and approval steps.' },
        { group: 'minutesEsignature', q: 'Can edits be restricted after final approval?', a: 'Yes. The workflow can be configured so the final minutes become the controlled reference version, with clear records for any later amendment.' },
        { group: 'minutesEsignature', q: 'Are timestamps and approval logs available?', a: 'Yes. Approval events and timestamps can be captured to support auditability and traceability.' },
        { group: 'decisionsExecution', q: 'Can each decision be assigned to an owner and due date?', a: 'Yes. Approved decisions can become tracked follow-up items with owner, due date, priority, and live status.' },
        { group: 'decisionsExecution', q: 'Are notifications and escalations available for delays?', a: 'Yes. The system can trigger notifications and escalation paths based on execution status and defined rules.' },
        { group: 'attendanceQuorum', q: 'Can apologies be documented before the meeting?', a: 'Yes. Apologies and attendance status can be documented and linked to the meeting record and related reporting.' },
        { group: 'attendanceQuorum', q: 'Are attendance and quorum dashboards available for executives?', a: 'Yes. Dashboards can show attendance patterns, quorum readiness, and meeting discipline at board or committee level.' },
        { group: 'integrations', q: 'Does it support Google Calendar, Outlook, Zoom, Teams, and Webex?', a: 'Yes. It supports integration with common calendar and meeting tools within a controlled enterprise operating model.' },
        { group: 'integrations', q: 'Can it integrate with ERP, HCM, CRM, and enterprise content systems?', a: 'Yes. Integration can be enabled through APIs and enterprise data connections to support operational continuity.' },
        { group: 'supportImplementation', q: 'Is there an implementation and training plan for large organizations?', a: 'Yes. Deployment can be delivered in phased onboarding, migration, training, and operational support tracks based on organizational needs.' },
        { group: 'productOverview', q: 'What is the difference between Diwan Suite and traditional meeting platforms?', a: 'Meeting platforms focus on video communication, while Diwan Suite manages the full meeting and decision lifecycle: from invitation and agenda to minutes, e-signature, execution follow-up, and compliance reporting.' },
        { group: 'productOverview', q: 'Does Diwan Suite support general assembly management?', a: 'Yes. Diwan Suite supports general assemblies from invitations and agenda through quorum, voting, minutes, and formal approval outputs.' },
        { group: 'productOverview', q: 'Can minutes be generated using AI?', a: 'Yes. Diwan Suite helps transcribe meetings, analyze discussions, extract decisions, and generate a draft minutes ready for review and approval.' },
        { group: 'productOverview', q: 'Does Diwan Suite support decision follow-up after the meeting?', a: 'Yes. Decisions are converted into execution tasks assigned to an owner with a due date, execution status, notifications, and escalation when delayed.' },
        { group: 'boardsCommittees', q: 'Does Diwan Suite support board of directors management?', a: 'Yes. Diwan Suite manages the full board lifecycle from composition and membership management through meetings, minutes, decisions, and governance reporting.' },
        { group: 'boardsCommittees', q: 'Does it support sub-committee management?', a: 'Yes. Diwan Suite supports specialized committees such as audit, risk, investment, and executive committees with full permission separation and structured approval workflows.' },
        { group: 'attendanceQuorum', q: 'Does it automatically calculate statutory quorum?', a: 'Yes. Diwan Suite calculates quorum automatically as attendance is recorded and verifies it before voting or formal decision-making begins.' },
        { group: 'minutesEsignature', q: 'Does it support e-signature and timestamp on minutes?', a: 'Yes. Diwan Suite supports electronic signing of minutes and records a tamper-evident timestamp at each approval step to support institutional auditability.' },
        { group: 'attendanceQuorum', q: 'Does Diwan Suite support smart QR attendance?', a: 'Yes. A unique, time-refreshed QR is generated per invitee and supports in-person, virtual, and hybrid attendance with automatic insertion of results into the official minutes.' },
        { group: 'productOverview', q: 'Does Diwan Suite support in-person, virtual, and hybrid meetings?', a: 'Yes. It supports in-person, virtual meetings via Zoom, Teams, Webex, and Google Meet, and hybrid formats — all documented in one unified record.' },
        { group: 'integrations', q: 'Does Diwan Suite integrate with DocSuite ECM?', a: 'Yes. Diwan Suite integrates with DocSuite ECM to exchange documents, minutes, and decisions within the enterprise content management ecosystem.' },
        { group: 'securityCompliance', q: 'Can Diwan Suite be deployed On-Premise?', a: 'Yes. Diwan Suite supports cloud, private cloud, and on-premise deployment depending on organizational requirements and operating environment.' },
        { group: 'securityCompliance', q: 'How does Diwan Suite protect board data?', a: 'Diwan Suite uses encryption in transit and at rest, granular role-based permissions, a tamper-resistant audit log, regular backups, and compliance-ready controls suited for regulated environments.' },
        { group: 'productOverview', q: 'Does Diwan Suite support reports and executive dashboards?', a: 'Yes. It provides executive dashboards and ready-made reports tracking attendance, quorum, minutes approval speed, decision execution rates, and compliance indicators.' },
        { group: 'supportImplementation', q: 'How is Diwan Suite priced?', a: 'Pricing is annual and starts from SAR 750 per executive user per month. Plans are available based on organization size, and custom quotes are provided for large or government entities.' },
        { group: 'productOverview', q: 'Is Diwan Suite suitable for government entities?', a: 'Yes. Diwan Suite is designed for government entities with governance and cybersecurity requirements, in-Kingdom hosting options, and compliance reports ready for regulatory bodies.' },
        { group: 'productOverview', q: 'Is it suitable for large corporations and listed companies?', a: 'Yes. Diwan Suite addresses the needs of listed companies and large corporations including board and committee separation, CMA readiness, governance reporting, and archived audit records.' },
        { group: 'supportImplementation', q: 'Can approval workflows and permissions be customized?', a: 'Yes. Diwan Suite supports custom approval workflows and RBAC permissions at the board, committee, meeting, and document level according to each organization\'s governance policy.' },
        { group: 'productOverview', q: 'Does Diwan Suite support multiple languages?', a: 'Yes. Diwan Suite supports Arabic, English, Hindi, and Urdu with a full RTL interface for Arabic and Urdu.' },
      ]
},
    screens: {
      badge: 'Product proof',
      heading: 'Operational proof of the governance lifecycle inside the platform',
      intro: 'These examples show how work moves from meeting to decision to execution and reporting inside a controlled enterprise governance environment.',
      items: [
        { page: 'boardManagementSystem', caption: 'Board and committee dashboard with visibility over meetings, approvals, and governance status.', alt: 'Diwan Suite board and committee governance dashboard', image: '/proof-governance-dashboard.svg' },
        { page: 'boardManagementSystem', caption: 'Meeting lifecycle from invitation and agenda through attendance, attachments, and minutes.', alt: 'Diwan Suite meeting lifecycle interface', image: '/proof-meeting-lifecycle.svg' },
        { page: 'decisionTracking', caption: 'Decision tracking linked to owners, due dates, escalation, and execution status.', alt: 'Diwan Suite decision execution tracking interface', image: '/proof-decision-tracking.svg' },
        { page: 'meetingMinutesEsignature', caption: 'Minutes drafting and electronic approval with timestamped auditability.', alt: 'Diwan Suite minutes approval and e-signature interface', image: '/proof-minutes-approval.svg' },
        { page: 'attendanceQuorumQr', caption: 'Attendance and quorum via QR with structured insertion into the official minutes.', alt: 'Diwan Suite attendance and quorum via QR interface', image: '/proof-attendance-qr.svg' },
        { page: 'governanceReportsDashboards', caption: 'Executive dashboards and governance reporting for visibility, compliance, and follow-up.', alt: 'Diwan Suite governance dashboards and reports interface', image: '/proof-governance-reports.svg' },
      ]
},
    links: { solutions: 'Related solutions', platform: 'Related platform pages', trust: 'Security and compliance', industries: 'Related industries' }
},



  hi: {
    hero: {
      badge: 'बोर्ड, समितियों और सामान्य सभाओं के लिए गवर्नेंस प्लेटफ़ॉर्म',
      sub: 'आमंत्रण से अनुमोदन और फिर निष्पादन तक, बोर्ड, समितियों और सामान्य सभाओं के लिए एकीकृत गवर्नेंस प्लेटफ़ॉर्म।',
      answerParagraph: 'Diwan Suite सरकारी संस्थाओं, सूचीबद्ध कंपनियों, बैंकों और बड़े संगठनों के लिए एक संस्थागत गवर्नेंस प्लेटफ़ॉर्म है, जो मीटिंग जीवनचक्र को एक ही ऑडिट योग्य रिकॉर्ड में संभालता है: आमंत्रण, एजेंडा, उपस्थिति और कोरम, मिनट्स और ई-सिग्नेचर, निर्णय, फॉलो-अप, रिपोर्टिंग और अनुपालन।',
      bullets: ['बोर्ड, समितियों और सामान्य सभाओं के वर्कफ़्लो', 'मिनट्स, ई-सिग्नेचर और नियंत्रित अनुमोदन', 'जवाबदेही के साथ निर्णय ट्रैकिंग', 'एग्जीक्यूटिव रिपोर्टिंग, इंटीग्रेशन और रेगुलेटेड-सेक्टर तैयारियाँ']
},
    valueProposition: { answerParagraph: 'Diwan Suite तैयारी और आमंत्रण से लेकर अनुमोदन, निष्पादन और रिपोर्टिंग तक एकीकृत गवर्नेंस वर्कफ़्लो देता है। बिखरे ईमेल, शीट और फाइलों के बजाय, हर चरण मापने योग्य, समीक्षा योग्य और बोर्ड, समिति तथा कार्यकारी कार्यालय के बीच जुड़ा हुआ बनता है।' },
    aiSection: { answerParagraph: 'Diwan Suite AI का उपयोग मीटिंग सारांश, निर्णय और सिफ़ारिशें निकालने, आउटपुट को संरचित फॉलो-अप आइटम में बदलने और अनुमोदन से पहले विश्लेषण समर्थन देने के लिए करता है, जबकि अंतिम अधिकार अधिकृत उपयोगकर्ताओं के पास रहता है।' },
    compliance: { answerParagraph: 'सुरक्षा और अनुपालन नियंत्रण संवेदनशील और विनियमित वातावरणों के लिए बनाए गए हैं: सूक्ष्म अनुमतियाँ, ट्रांज़िट और स्टोरेज एन्क्रिप्शन, ऑडिट ट्रेल, बैकअप और रिकवरी, तथा आंतरिक और बाहरी समीक्षा के लिए मजबूत तैयारी।' },
    reports: { answerParagraph: 'एग्जीक्यूटिव डैशबोर्ड और रिपोर्ट्स नेतृत्व को मीटिंग अनुशासन, उपस्थिति, मिनट्स अनुमोदन की गति, निर्णय निष्पादन, तथा गवर्नेंस और अनुपालन KPI को मापने में मदद करती हैं।' },
    faq: { badge: 'अक्सर पूछे जाने वाले प्रश्न', heading: 'Diwan Suite के बारे में सबसे सामान्य प्रश्नों के व्यावहारिक उत्तर', groupTitles: { productOverview: 'उत्पाद अवलोकन', governanceWorkflow: 'गवर्नेंस वर्कफ़्लो', boardsCommittees: 'बोर्ड और समितियाँ', generalAssemblies: 'सामान्य सभाएँ', minutesEsignature: 'मिनट्स और ई-सिग्नेचर', decisionsExecution: 'निर्णय और निष्पादन', attendanceQuorum: 'उपस्थिति और कोरम', ai: 'एआई', securityCompliance: 'सुरक्षा और अनुपालन', integrations: 'इंटीग्रेशन', supportImplementation: 'इम्प्लीमेंटेशन और सपोर्ट' }, extraItems: [
      { group: 'generalAssemblies', q: 'क्या Diwan Suite सामान्य सभाओं का समर्थन करता है?', a: 'हाँ। प्लेटफ़ॉर्म नियंत्रित गवर्नेंस वर्कफ़्लो के भीतर आमंत्रण, एजेंडा, उपस्थिति, कोरम और मिनट्स प्रबंधन का समर्थन कर सकता है।' },
      { group: 'generalAssemblies', q: 'क्या प्लेटफ़ॉर्म वोटिंग या औपचारिक मत-संग्रह का समर्थन करता है?', a: 'हाँ। संगठन की गवर्नेंस नीति के अनुसार संरचित अनुमोदन और दस्तावेजीकृत मतदान-संबंधित वर्कफ़्लो समर्थित हो सकते हैं।' },
      { group: 'minutesEsignature', q: 'क्या मिनट्स को इलेक्ट्रॉनिक रूप से अनुमोदित किया जा सकता है?', a: 'हाँ। मिनट्स नियंत्रित अनुमोदन मार्गों से गुजर सकते हैं, जिनमें समीक्षा और स्वीकृति चरण दर्ज होते हैं।' },
      { group: 'minutesEsignature', q: 'क्या अंतिम अनुमोदन के बाद संपादन सीमित किए जा सकते हैं?', a: 'हाँ। वर्कफ़्लो को इस तरह कॉन्फ़िगर किया जा सकता है कि अंतिम संस्करण नियंत्रित संदर्भ संस्करण बन जाए और किसी भी बाद के संशोधन का स्पष्ट रिकॉर्ड रहे।' },
      { group: 'minutesEsignature', q: 'क्या टाइमस्टैम्प और अनुमोदन लॉग उपलब्ध हैं?', a: 'हाँ। अनुमोदन घटनाएँ और टाइमस्टैम्प ऑडिटेबिलिटी और ट्रेसबिलिटी के लिए दर्ज किए जा सकते हैं।' },
      { group: 'decisionsExecution', q: 'क्या प्रत्येक निर्णय को किसी मालिक और नियत तिथि से जोड़ा जा सकता है?', a: 'हाँ। अनुमोदित निर्णय ट्रैक किए जाने वाले फॉलो-अप आइटम बन सकते हैं जिनमें मालिक, प्राथमिकता, नियत तिथि और स्थिति होती है।' },
      { group: 'decisionsExecution', q: 'क्या देरी के लिए नोटिफिकेशन और एस्केलेशन उपलब्ध हैं?', a: 'हाँ। सिस्टम निष्पादन स्थिति और परिभाषित नियमों के आधार पर नोटिफिकेशन और एस्केलेशन पथ ट्रिगर कर सकता है।' },
      { group: 'attendanceQuorum', q: 'क्या बैठक से पहले क्षमा-याचना/अनुपस्थिति दर्ज की जा सकती है?', a: 'हाँ। अनुपस्थिति या उपस्थिति की स्थिति को दर्ज कर मीटिंग रिकॉर्ड और संबंधित रिपोर्ट से जोड़ा जा सकता है।' },
      { group: 'attendanceQuorum', q: 'क्या नेतृत्व के लिए उपस्थिति और कोरम डैशबोर्ड उपलब्ध हैं?', a: 'हाँ। डैशबोर्ड उपस्थिति पैटर्न, कोरम तैयारियों और मीटिंग अनुशासन को दिखा सकते हैं।' },
      { group: 'integrations', q: 'क्या यह Google Calendar, Outlook, Zoom, Teams और Webex का समर्थन करता है?', a: 'हाँ। प्लेटफ़ॉर्म नियंत्रित एंटरप्राइज़ मॉडल के भीतर सामान्य कैलेंडर और मीटिंग टूल्स के साथ इंटीग्रेशन का समर्थन करता है।' },
      { group: 'integrations', q: 'क्या इसे ERP, HCM, CRM और एंटरप्राइज़ कंटेंट सिस्टम्स से जोड़ा जा सकता है?', a: 'हाँ। API और एंटरप्राइज़ डेटा कनेक्शनों के माध्यम से इंटीग्रेशन से ऑपरेशनल continuity को समर्थन मिलता है।' },
      { group: 'supportImplementation', q: 'क्या बड़े संगठनों के लिए इम्प्लीमेंटेशन और प्रशिक्षण योजना उपलब्ध है?', a: 'हाँ। तैनाती को चरणबद्ध रूप में onboarding, migration, training और operational support के साथ लागू किया जा सकता है।' },
      { group: 'boardsCommittees', q: 'क्या Diwan Suite बोर्ड ऑफ डायरेक्टर्स प्रबंधन का समर्थन करता है?', a: 'हाँ। Diwan Suite पूर्ण बोर्ड लाइफसाइकिल को संरचना और सदस्यता प्रबंधन से लेकर बैठकों, मिनट्स, निर्णयों और गवर्नेंस रिपोर्टिंग तक प्रबंधित करता है।' },
      { group: 'boardsCommittees', q: 'क्या यह उप-समितियों का समर्थन करता है?', a: 'हाँ। Diwan Suite ऑडिट, जोखिम, निवेश और कार्यकारी समितियों को पूर्ण अनुमति पृथक्करण और संरचित अनुमोदन वर्कफ़्लो के साथ समर्थन करता है।' },
      { group: 'attendanceQuorum', q: 'क्या यह वैधानिक कोरम स्वचालित रूप से गणना करता है?', a: 'हाँ। उपस्थिति दर्ज होते ही Diwan Suite कोरम की गणना करता है और मतदान या औपचारिक निर्णय लेने से पहले इसकी पुष्टि करता है।' },
      { group: 'minutesEsignature', q: 'क्या यह ई-सिग्नेचर और टाइमस्टैम्प का समर्थन करता है?', a: 'हाँ। Diwan Suite मिनट्स पर इलेक्ट्रॉनिक हस्ताक्षर का समर्थन करता है और ऑडिटेबिलिटी के लिए प्रत्येक अनुमोदन चरण पर एक टैम्पर-प्रूफ टाइमस्टैम्प दर्ज करता है।' },
      { group: 'attendanceQuorum', q: 'क्या Diwan Suite QR के माध्यम से स्मार्ट उपस्थिति का समर्थन करता है?', a: 'हाँ। प्रत्येक आमंत्रित व्यक्ति के लिए एक अनूठा, समय-ताज़ा QR उत्पन्न होता है और इन-पर्सन, वर्चुअल, हाइब्रिड उपस्थिति का समर्थन करता है।' },
      { group: 'productOverview', q: 'क्या Diwan Suite इन-पर्सन, वर्चुअल और हाइब्रिड मीटिंग का समर्थन करता है?', a: 'हाँ। यह Zoom, Teams, Webex और Google Meet के माध्यम से वर्चुअल और हाइब्रिड मीटिंग का समर्थन करता है, सभी एक एकीकृत रिकॉर्ड में दर्ज होते हैं।' },
      { group: 'integrations', q: 'क्या Diwan Suite DocSuite ECM के साथ इंटीग्रेट होता है?', a: 'हाँ। Diwan Suite DocSuite ECM के साथ दस्तावेज़, मिनट्स और निर्णयों का आदान-प्रदान एंटरप्राइज़ कंटेंट मैनेजमेंट के भीतर करता है।' },
      { group: 'securityCompliance', q: 'क्या Diwan Suite को On-Premise डिप्लॉय किया जा सकता है?', a: 'हाँ। Diwan Suite क्लाउड, प्राइवेट क्लाउड और ऑन-प्रिमाइस डिप्लॉयमेंट का समर्थन करता है जो संगठनात्मक आवश्यकताओं पर निर्भर करता है।' },
      { group: 'securityCompliance', q: 'Diwan Suite बोर्ड डेटा को कैसे सुरक्षित रखता है?', a: 'Diwan Suite ट्रांज़िट और स्टोरेज में एन्क्रिप्शन, भूमिका-आधारित अनुमतियाँ, tamper-proof ऑडिट लॉग, नियमित बैकअप और रेगुलेटेड वातावरण के लिए अनुपालन-तैयार नियंत्रण का उपयोग करता है।' },
      { group: 'productOverview', q: 'क्या Diwan Suite रिपोर्ट और एग्जीक्यूटिव डैशबोर्ड का समर्थन करता है?', a: 'हाँ। यह उपस्थिति, कोरम, मिनट्स अनुमोदन गति, निर्णय निष्पादन दर और अनुपालन संकेतकों को ट्रैक करने वाले डैशबोर्ड और रिपोर्ट प्रदान करता है।' },
      { group: 'supportImplementation', q: 'Diwan Suite की कीमत कैसे निर्धारित होती है?', a: 'मूल्य निर्धारण वार्षिक है और प्रति कार्यकारी उपयोगकर्ता SAR 750 प्रति माह से शुरू होता है। संगठन के आकार और आवश्यकताओं के अनुसार कस्टम उद्धरण उपलब्ध हैं।' },
      { group: 'productOverview', q: 'क्या Diwan Suite सरकारी संस्थाओं के लिए उपयुक्त है?', a: 'हाँ। Diwan Suite गवर्नेंस और साइबरसिक्योरिटी आवश्यकताओं के साथ सरकारी संस्थाओं के लिए डिज़ाइन किया गया है, जिसमें इन-किंगडम होस्टिंग विकल्प और नियामक निकायों के लिए अनुपालन रिपोर्ट शामिल हैं।' },
      { group: 'productOverview', q: 'क्या यह बड़े कॉरपोरेशन और लिस्टेड कंपनियों के लिए उपयुक्त है?', a: 'हाँ। Diwan Suite लिस्टेड कंपनियों और बड़े कॉरपोरेशन की जरूरतों को पूरा करता है, जिसमें बोर्ड और समिति पृथक्करण, CMA तैयारी, गवर्नेंस रिपोर्टिंग और संग्रहीत ऑडिट रिकॉर्ड शामिल हैं।' },
      { group: 'supportImplementation', q: 'क्या अनुमोदन वर्कफ़्लो और अनुमतियाँ अनुकूलित की जा सकती हैं?', a: 'हाँ। Diwan Suite संगठन की गवर्नेंस नीति के अनुसार बोर्ड, समिति, बैठक और दस्तावेज़ स्तर पर कस्टम अनुमोदन वर्कफ़्लो और RBAC अनुमतियों का समर्थन करता है।' },
      { group: 'productOverview', q: 'क्या Diwan Suite कई भाषाओं का समर्थन करता है?', a: 'हाँ। Diwan Suite अरबी, अंग्रेज़ी, हिंदी और उर्दू का समर्थन करता है जिसमें अरबी और उर्दू के लिए पूर्ण RTL इंटरफ़ेस है।' },
    ] },
    screens: {
      badge: 'उत्पाद प्रमाण', heading: 'प्लेटफ़ॉर्म के भीतर गवर्नेंस जीवनचक्र के व्यावहारिक प्रमाण', intro: 'ये उदाहरण दिखाते हैं कि काम मीटिंग से निर्णय, फिर निष्पादन और रिपोर्टिंग तक नियंत्रित एंटरप्राइज़ गवर्नेंस वातावरण में कैसे आगे बढ़ता है।',
      items: [
        { page: 'boardManagementSystem', caption: 'बोर्ड और समिति डैशबोर्ड जिसमें मीटिंग्स, अनुमोदनों और गवर्नेंस स्थिति की दृश्यता होती है।', alt: 'Diwan Suite बोर्ड और समिति गवर्नेंस डैशबोर्ड', image: '/proof-governance-dashboard.svg' },
        { page: 'boardManagementSystem', caption: 'आमंत्रण और एजेंडा से लेकर उपस्थिति, अटैचमेंट और मिनट्स तक मीटिंग जीवनचक्र।', alt: 'Diwan Suite मीटिंग लाइफसाइकिल इंटरफ़ेस', image: '/proof-meeting-lifecycle.svg' },
        { page: 'decisionTracking', caption: 'मालिकों, नियत तिथियों, एस्केलेशन और निष्पादन स्थिति से जुड़ी निर्णय ट्रैकिंग।', alt: 'Diwan Suite निर्णय निष्पादन ट्रैकिंग इंटरफ़ेस', image: '/proof-decision-tracking.svg' },
        { page: 'meetingMinutesEsignature', caption: 'मिनट्स ड्राफ्टिंग और इलेक्ट्रॉनिक अनुमोदन के साथ टाइमस्टैम्प आधारित ऑडिटेबिलिटी।', alt: 'Diwan Suite मिनट्स अनुमोदन और ई-सिग्नेचर इंटरफ़ेस', image: '/proof-minutes-approval.svg' },
        { page: 'attendanceQuorumQr', caption: 'QR के माध्यम से उपस्थिति और कोरम, और परिणामों का संरचित सम्मिलन।', alt: 'Diwan Suite उपस्थिति और कोरम QR इंटरफ़ेस', image: '/proof-attendance-qr.svg' },
        { page: 'governanceReportsDashboards', caption: 'दृश्यता, अनुपालन और फॉलो-अप के लिए एग्जीक्यूटिव डैशबोर्ड और गवर्नेंस रिपोर्टिंग।', alt: 'Diwan Suite गवर्नेंस डैशबोर्ड और रिपोर्ट्स इंटरफ़ेस', image: '/proof-governance-reports.svg' },
      ]
},
    links: { solutions: 'संबंधित समाधान', platform: 'संबंधित प्लेटफ़ॉर्म पृष्ठ', trust: 'सुरक्षा और अनुपालन', industries: 'संबंधित सेक्टर' }
},
  ur: {
    hero: {
      badge: 'بورڈ، کمیٹیوں اور جنرل اسمبلیوں کے لیے گورننس پلیٹ فارم',
      sub: 'دعوت سے منظوری اور پھر عمل درآمد تک، بورڈز، کمیٹیوں اور جنرل اسمبلیوں کے لیے ایک ہی پلیٹ فارم میں گورننس۔',
      answerParagraph: 'Diwan Suite ایک ادارہ جاتی گورننس پلیٹ فارم ہے جو سرکاری اداروں، لسٹڈ کمپنیوں، بینکوں اور بڑے اداروں کے لیے مکمل میٹنگ سائیکل کو ایک قابلِ آڈٹ ریکارڈ میں منظم کرتا ہے: دعوت، ایجنڈا، حاضری اور کورم، محاضر اور الیکٹرانک دستخط، فیصلے، فالو اپ، رپورٹنگ اور کمپلائنس۔',
      bullets: ['بورڈ، کمیٹی اور جنرل اسمبلی کے ورک فلو', 'محاضر، ای-سگنیچر اور منظم منظوری', 'واضح جوابدہی کے ساتھ فیصلہ ٹریکنگ', 'ایگزیکٹو رپورٹنگ، انٹیگریشنز اور ریگولیٹڈ سیکٹر ریڈی نیس']
},
    valueProposition: { answerParagraph: 'Diwan Suite تیاری اور دعوت سے لے کر منظوری، عمل درآمد اور رپورٹنگ تک ایک متحد گورننس ورک فلو فراہم کرتا ہے۔ بکھرے ہوئے ای میلز، شیٹس اور فائلوں کے بجائے ہر قدم قابلِ پیمائش، قابلِ جائزہ اور بورڈ، کمیٹی اور ایگزیکٹو دفتر کے درمیان مربوط ہو جاتا ہے۔' },
    aiSection: { answerParagraph: 'Diwan Suite مصنوعی ذہانت کو میٹنگ سمری، فیصلوں اور سفارشات کے اخراج، نتائج کو منظم فالو اپ میں تبدیل کرنے اور منظوری سے پہلے انتظامی تجزیے کے لیے استعمال کرتا ہے، جبکہ حتمی اختیار مجاز صارف کے پاس رہتا ہے۔' },
    compliance: { answerParagraph: 'سیکیورٹی اور کمپلائنس کنٹرولز حساس اور ریگولیٹڈ ماحول کے لیے بنائے گئے ہیں، جن میں باریک سطح کی اجازتیں، ٹرانزٹ اور اسٹوریج میں انکرپشن، آڈٹ ٹریل، بیک اپ اور ریکوری، اور اندرونی و بیرونی جائزوں کے لیے مضبوط تیاری شامل ہے۔' },
    reports: { answerParagraph: 'ایگزیکٹو ڈیش بورڈز اور رپورٹس قیادت کو میٹنگ ڈسپلن، حاضری، محاضر کی منظوری کی رفتار، فیصلوں کے عمل درآمد، اور گورننس و کمپلائنس KPI کی نگرانی میں مدد دیتے ہیں۔' },
    faq: { badge: 'اکثر پوچھے گئے سوالات', heading: 'Diwan Suite کے بارے میں عام سوالات کے عملی جوابات', groupTitles: { productOverview: 'مصنوعات کا تعارف', governanceWorkflow: 'گورننس ورک فلو', boardsCommittees: 'بورڈز اور کمیٹیاں', generalAssemblies: 'جنرل اسمبلیاں', minutesEsignature: 'محاضر اور ای-سگنیچر', decisionsExecution: 'فیصلے اور عمل درآمد', attendanceQuorum: 'حاضری اور کورم', ai: 'مصنوعی ذہانت', securityCompliance: 'سیکیورٹی اور کمپلائنس', integrations: 'انٹیگریشنز', supportImplementation: 'نفاذ اور سپورٹ' }, extraItems: [
      { group: 'generalAssemblies', q: 'کیا Diwan Suite جنرل اسمبلی مینجمنٹ کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ پلیٹ فارم ایک منظم گورننس فریم میں دعوت، ایجنڈا، حاضری، کورم اور محاضر کے انتظام کو سپورٹ کرتا ہے۔' },
      { group: 'generalAssemblies', q: 'کیا پلیٹ فارم ووٹنگ یا باضابطہ رائے کے اندراج کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ ادارے کی گورننس پالیسی کے مطابق منظم منظوری اور دستاویزی ووٹنگ ورک فلو سپورٹ کیے جا سکتے ہیں۔' },
      { group: 'minutesEsignature', q: 'کیا محاضر کو الیکٹرانک طور پر منظور کیا جا سکتا ہے؟', a: 'جی ہاں۔ محاضر منظم منظوری کے راستوں سے گزرتے ہیں اور جائزہ و منظوری کے مراحل محفوظ رہتے ہیں۔' },
      { group: 'minutesEsignature', q: 'کیا حتمی منظوری کے بعد ترمیم محدود کی جا سکتی ہے؟', a: 'جی ہاں۔ ورک فلو اس طرح ترتیب دیا جا سکتا ہے کہ حتمی ورژن کنٹرولڈ ریفرنس بن جائے اور بعد کی کسی بھی ترمیم کا واضح ریکارڈ رہے۔' },
      { group: 'minutesEsignature', q: 'کیا ٹائم اسٹیمپ اور منظوری لاگ دستیاب ہیں؟', a: 'جی ہاں۔ منظوری کے واقعات اور وقت کے اندراجات آڈٹ اور ٹریس ایبلٹی کے لیے محفوظ کیے جا سکتے ہیں۔' },
      { group: 'decisionsExecution', q: 'کیا ہر فیصلے کے ساتھ ذمہ دار شخص اور آخری تاریخ جوڑی جا سکتی ہے؟', a: 'جی ہاں۔ منظور شدہ فیصلوں کو ذمہ دار، ترجیح، مقررہ تاریخ اور حالت کے ساتھ فالو اپ آئٹمز میں بدلا جا سکتا ہے۔' },
      { group: 'decisionsExecution', q: 'کیا تاخیر کی صورت میں نوٹیفکیشن اور ایسکلیشن دستیاب ہیں؟', a: 'جی ہاں۔ سسٹم عمل درآمد کی حالت اور متعین قواعد کی بنیاد پر نوٹیفکیشن اور ایسکلیشن پاتھ چلا سکتا ہے۔' },
      { group: 'attendanceQuorum', q: 'کیا اجلاس سے پہلے معذرت یا غیر حاضری کو ریکارڈ کیا جا سکتا ہے؟', a: 'جی ہاں۔ معذرت اور حاضری کی حالت کو میٹنگ ریکارڈ اور متعلقہ رپورٹس کے ساتھ محفوظ کیا جا سکتا ہے۔' },
      { group: 'attendanceQuorum', q: 'کیا قیادت کے لیے حاضری اور کورم ڈیش بورڈ دستیاب ہیں؟', a: 'جی ہاں۔ ڈیش بورڈ حاضری کے رجحانات، کورم کی تیاری اور میٹنگ ڈسپلن ظاہر کرتے ہیں۔' },
      { group: 'integrations', q: 'کیا یہ Google Calendar، Outlook، Zoom، Teams اور Webex کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ پلیٹ فارم کنٹرولڈ ادارہ جاتی ماحول میں عام کیلنڈر اور میٹنگ ٹولز کے ساتھ انٹیگریشن کو سپورٹ کرتا ہے۔' },
      { group: 'integrations', q: 'کیا اسے ERP، HCM، CRM اور انٹرپرائز کنٹینٹ سسٹمز سے جوڑا جا سکتا ہے؟', a: 'جی ہاں۔ API اور ادارہ جاتی ڈیٹا کنیکشنز کے ذریعے انٹیگریشن آپریشنل continuity کو بہتر بناتا ہے۔' },
      { group: 'supportImplementation', q: 'کیا بڑے اداروں کے لیے نفاذ اور تربیت کا منصوبہ موجود ہے؟', a: 'جی ہاں۔ نفاذ کو onboarding، migration، training اور operational support کے مرحلوں میں انجام دیا جا سکتا ہے۔' },
      { group: 'boardsCommittees', q: 'کیا Diwan Suite بورڈ آف ڈائریکٹرز مینجمنٹ کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ Diwan Suite بورڈ کی تشکیل اور رکنیت کے انتظام سے لے کر اجلاسوں، محاضر، فیصلوں اور گورننس رپورٹنگ تک مکمل بورڈ لائف سائیکل سنبھالتا ہے۔' },
      { group: 'boardsCommittees', q: 'کیا یہ ذیلی کمیٹیوں کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ Diwan Suite آڈٹ، رسک، سرمایہ کاری اور ایگزیکٹو کمیٹیوں کو مکمل اجازت علیحدگی اور منظم منظوری ورک فلو کے ساتھ سپورٹ کرتا ہے۔' },
      { group: 'attendanceQuorum', q: 'کیا یہ قانونی کورم کا خودکار حساب لگاتا ہے؟', a: 'جی ہاں۔ حاضری درج ہوتے ہی Diwan Suite کورم کا حساب لگاتا ہے اور ووٹنگ یا باضابطہ فیصلہ سازی سے پہلے اس کی تصدیق کرتا ہے۔' },
      { group: 'minutesEsignature', q: 'کیا یہ ای-سگنیچر اور ٹائم اسٹیمپ کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ Diwan Suite محاضر پر الیکٹرانک دستخط کو سپورٹ کرتا ہے اور ادارہ جاتی آڈیٹبلٹی کے لیے ہر منظوری قدم پر ٹائم اسٹیمپ ریکارڈ کرتا ہے۔' },
      { group: 'attendanceQuorum', q: 'کیا Diwan Suite QR کے ذریعے سمارٹ حاضری کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ ہر مدعو کے لیے ایک منفرد، وقتاً فوقتاً تجدید ہونے والا QR بنتا ہے جو حضوری، ورچوئل اور ہائبرڈ حاضری کو سپورٹ کرتا ہے۔' },
      { group: 'productOverview', q: 'کیا Diwan Suite حضوری، ورچوئل اور ہائبرڈ اجلاسوں کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ یہ Zoom، Teams، Webex اور Google Meet کے ذریعے ورچوئل اور ہائبرڈ اجلاسوں کو سپورٹ کرتا ہے اور تمام ریکارڈ ایک متحد ریکارڈ میں محفوظ ہوتا ہے۔' },
      { group: 'integrations', q: 'کیا Diwan Suite DocSuite ECM کے ساتھ انٹیگریٹ ہوتا ہے؟', a: 'جی ہاں۔ Diwan Suite DocSuite ECM کے ساتھ دستاویزات، محاضر اور فیصلوں کا تبادلہ انٹرپرائز کنٹینٹ مینجمنٹ ایکو سسٹم میں کرتا ہے۔' },
      { group: 'securityCompliance', q: 'کیا Diwan Suite کو On-Premise تعینات کیا جا سکتا ہے؟', a: 'جی ہاں۔ Diwan Suite کلاؤڈ، پرائیویٹ کلاؤڈ اور آن پریمائس تعیناتی کو سپورٹ کرتا ہے جو ادارے کی آپریشنل ضروریات پر منحصر ہوتا ہے۔' },
      { group: 'securityCompliance', q: 'Diwan Suite بورڈ کا ڈیٹا کیسے محفوظ رکھتا ہے؟', a: 'Diwan Suite ٹرانزٹ اور اسٹوریج میں انکرپشن، کردار پر مبنی باریک اجازتیں، غیر قابلِ تبدیل آڈٹ لاگ، باقاعدہ بیک اپ اور ریگولیٹڈ ماحول کے لیے کمپلائنس کنٹرولز استعمال کرتا ہے۔' },
      { group: 'productOverview', q: 'کیا Diwan Suite رپورٹس اور ایگزیکٹو ڈیش بورڈز کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ یہ حاضری، کورم، محاضر کی منظوری کی رفتار، فیصلوں کے عمل درآمد کی شرح اور کمپلائنس اشاریوں کو ٹریک کرنے والے ڈیش بورڈز اور رپورٹس فراہم کرتا ہے۔' },
      { group: 'supportImplementation', q: 'Diwan Suite کی قیمت کا تعین کیسے ہوتا ہے؟', a: 'قیمت سالانہ ہے اور فی ایگزیکٹو صارف SAR 750 ماہانہ سے شروع ہوتی ہے۔ ادارے کے حجم اور ضروریات کے مطابق حسب ضرورت اقتباس دستیاب ہیں۔' },
      { group: 'productOverview', q: 'کیا Diwan Suite سرکاری اداروں کے لیے موزوں ہے؟', a: 'جی ہاں۔ Diwan Suite گورننس اور سائبرسیکیورٹی ضروریات کے ساتھ سرکاری اداروں کے لیے ڈیزائن کیا گیا ہے، جس میں ان کنگڈم ہوسٹنگ کے اختیارات اور ریگولیٹری اداروں کے لیے تیار کمپلائنس رپورٹس شامل ہیں۔' },
      { group: 'productOverview', q: 'کیا یہ بڑی کمپنیوں اور لسٹڈ کمپنیوں کے لیے موزوں ہے؟', a: 'جی ہاں۔ Diwan Suite لسٹڈ کمپنیوں اور بڑے اداروں کی ضروریات کو پورا کرتا ہے جن میں بورڈ اور کمیٹی علیحدگی، CMA تیاری، گورننس رپورٹنگ اور محفوظ شدہ آڈٹ ریکارڈ شامل ہیں۔' },
      { group: 'supportImplementation', q: 'کیا منظوری کے ورک فلو اور اجازتیں حسب ضرورت بنائی جا سکتی ہیں؟', a: 'جی ہاں۔ Diwan Suite بورڈ، کمیٹی، اجلاس اور دستاویز کی سطح پر ادارے کی گورننس پالیسی کے مطابق حسب ضرورت منظوری ورک فلو اور RBAC اجازتوں کو سپورٹ کرتا ہے۔' },
      { group: 'productOverview', q: 'کیا Diwan Suite کئی زبانوں کو سپورٹ کرتا ہے؟', a: 'جی ہاں۔ Diwan Suite عربی، انگریزی، ہندی اور اردو کو سپورٹ کرتا ہے جس میں عربی اور اردو کے لیے مکمل RTL انٹرفیس ہے۔' },
    ] },
    screens: {
      badge: 'پروڈکٹ پروف', heading: 'پلیٹ فارم کے اندر گورننس لائف سائیکل کے عملی شواہد', intro: 'یہ مثالیں دکھاتی ہیں کہ ایک منظم ادارہ جاتی ماحول میں کام میٹنگ سے فیصلے، پھر عمل درآمد اور رپورٹنگ تک کیسے منتقل ہوتا ہے۔',
      items: [
        { page: 'boardManagementSystem', caption: 'بورڈ اور کمیٹی ڈیش بورڈ جس میں میٹنگز، منظوریوں اور گورننس اسٹیٹس کی مرئیت ہو۔', alt: 'Diwan Suite بورڈ اور کمیٹی گورننس ڈیش بورڈ', image: '/proof-governance-dashboard.svg' },
        { page: 'boardManagementSystem', caption: 'دعوت اور ایجنڈا سے لے کر حاضری، منسلکات اور محاضر تک میٹنگ لائف سائیکل۔', alt: 'Diwan Suite میٹنگ لائف سائیکل انٹرفیس', image: '/proof-meeting-lifecycle.svg' },
        { page: 'decisionTracking', caption: 'فیصلہ ٹریکنگ جو ذمہ دار شخص، آخری تاریخ، ایسکلیشن اور عمل درآمد کی حالت سے منسلک ہو۔', alt: 'Diwan Suite فیصلہ عمل درآمد ٹریکنگ انٹرفیس', image: '/proof-decision-tracking.svg' },
        { page: 'meetingMinutesEsignature', caption: 'محاضر کی تیاری اور الیکٹرانک منظوری کے ساتھ ٹائم اسٹیمپڈ آڈٹ ایبلٹی۔', alt: 'Diwan Suite محاضر منظوری اور ای-سگنیچر انٹرفیس', image: '/proof-minutes-approval.svg' },
        { page: 'attendanceQuorumQr', caption: 'QR کے ذریعے حاضری اور کورم اور اس کے نتائج کو باضابطہ محضر میں شامل کرنا۔', alt: 'Diwan Suite حاضری اور کورم QR انٹرفیس', image: '/proof-attendance-qr.svg' },
        { page: 'governanceReportsDashboards', caption: 'ایگزیکٹو ڈیش بورڈز اور گورننس رپورٹنگ تاکہ مرئیت، کمپلائنس اور فالو اپ بہتر ہو۔', alt: 'Diwan Suite گورننس ڈیش بورڈز اور رپورٹس انٹرفیس', image: '/proof-governance-reports.svg' },
      ]
},
    links: { solutions: 'متعلقہ حل', platform: 'متعلقہ پلیٹ فارم صفحات', trust: 'سیکیورٹی اور کمپلائنس', industries: 'متعلقہ شعبے' }
}
}
