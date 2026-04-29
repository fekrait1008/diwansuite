import type { LangCode } from '@/lang/types'

interface RoleRow {
  role: string
  responsibilities: string
  systemRole: string
}

interface RoadmapPhase {
  title: string
  desc: string
}

interface SupportItem {
  title: string
  desc: string
}

interface TechnicalItem {
  title: string
  desc: string
}

interface ChallengeItem {
  title: string
  challenge: string
  solution: string
}

export interface HomeEnterpriseContent {
  badge: string
  introTitle: string
  introText: string
  roles: {
    title: string
    intro: string
    headers: {
      role: string
      responsibilities: string
      systemRole: string
    }
    rows: RoleRow[]
  }
  roadmap: {
    title: string
    intro: string
    phases: RoadmapPhase[]
  }
  support: {
    title: string
    intro: string
    items: SupportItem[]
  }
  technical: {
    title: string
    intro: string
    items: TechnicalItem[]
  }
  challenges: {
    title: string
    intro: string
    items: ChallengeItem[]
  }
  links: {
    implementation: string
    integrations: string
    compliance: string
    support: string
  }
}

const ar: HomeEnterpriseContent = {
  badge: 'جاهزية مؤسسية',
  introTitle: 'ما الذي تحتاجه الجهات الكبيرة قبل اعتماد المنصة؟',
  introText:
    'لا تكتمل القيمة المؤسسية بحسن إدارة الاجتماع فقط، بل بوضوح الأدوار، وخطة التطبيق، والاستعداد التقني، ومعالجة تحديات التغيير والتبني منذ البداية.',
  roles: {
    title: 'توزيع الأدوار والمسؤوليات',
    intro: 'يوضح هذا الجدول المسؤوليات الأساسية لكل طرف ودوره المتوقع داخل النظام حتى لا تتداخل الملكيات بين المجلس والإدارة والتنفيذ والتقنية.',
    headers: {
      role: 'الجهة / الدور',
      responsibilities: 'المسؤوليات',
      systemRole: 'الدور داخل النظام',
    },
    rows: [
      {
        role: 'مجلس الإدارة',
        responsibilities: 'اعتماد البنود، مراجعة المحاضر، اتخاذ القرارات، ومتابعة مؤشرات التنفيذ والالتزام.',
        systemRole: 'الوصول إلى الاجتماعات والقرارات والتقارير التنفيذية والاعتمادات بحسب الصلاحية.',
      },
      {
        role: 'أمين السر',
        responsibilities: 'تنظيم جدول الأعمال، الدعوات، المرفقات، المحاضر، ومسار الاعتماد والمتابعة.',
        systemRole: 'مشغل الحوكمة اليومي ومسؤول ضبط دورة الاجتماع والمستندات والتنبيهات.',
      },
      {
        role: 'الإدارة التنفيذية',
        responsibilities: 'استلام القرارات، تحويلها إلى إجراءات، تحديث التنفيذ، ورفع الحالة للإدارة العليا.',
        systemRole: 'مالكو التنفيذ ومحدثو نسب الإنجاز والمخاطر والتعثرات.',
      },
      {
        role: 'إدارة الامتثال',
        responsibilities: 'التحقق من الالتزام بالسياسات والضوابط وحفظ الأثر الرقابي والتقارير الداعمة.',
        systemRole: 'مراجعة السجل التدقيقي، متابعة الامتثال، واستخراج التقارير الرقابية.',
      },
      {
        role: 'تقنية المعلومات',
        responsibilities: 'تهيئة البيئة، إدارة التكاملات، السياسات الأمنية، النسخ الاحتياطي، ودعم الاستقرار التشغيلي.',
        systemRole: 'إدارة الإعدادات الفنية، الصلاحيات المتقدمة، الربط مع الأنظمة، وحوكمة الاستضافة.',
      },
    ],
  },
  roadmap: {
    title: 'مراحل تطبيق ديوان سويت',
    intro: 'يُنفذ المشروع على مراحل واضحة تقلل المخاطر وتسرّع التبني داخل الجهة دون إرباك تشغيلي.',
    phases: [
      { title: '1. تحليل الوضع الحالي', desc: 'مراجعة المجالس واللجان، دورة المحاضر، الاعتمادات، والاحتياجات التنظيمية والتقنية.' },
      { title: '2. إعداد النظام', desc: 'تهيئة الهيكل، الصلاحيات، النماذج، مسارات الاعتماد، والتكاملات المطلوبة.' },
      { title: '3. التدريب', desc: 'تأهيل الأمناء والمستخدمين والإدارة التنفيذية على الأدوار الفعلية داخل النظام.' },
      { title: '4. التشغيل', desc: 'البدء التدريجي على اجتماعات فعلية مع المتابعة والتأكد من جودة الاعتماد والتنفيذ.' },
      { title: '5. التحسين المستمر', desc: 'قياس التبني، تحسين القوالب والتقارير، وتوسيع النطاق إلى لجان أو كيانات إضافية.' },
    ],
  },
  support: {
    title: 'التدريب وبناء الكفاءات',
    intro: 'دعم التبني لا يقل أهمية عن التهيئة التقنية، لذلك يُدمج التدريب والدعم ضمن مسار التطبيق بدل تركه كخطوة لاحقة.',
    items: [
      { title: 'تدريب المستخدمين', desc: 'جلسات موجهة للأمناء، الأعضاء، والمشغلين بحسب الدور الفعلي.' },
      { title: 'دعم فني', desc: 'قنوات دعم للتعامل مع التشغيل والاستفسارات والحالات ذات الأولوية.' },
      { title: 'استشارات', desc: 'إرشاد تنظيمي وتشغيلي لرفع نضج الحوكمة وليس مجرد تشغيل النظام.' },
      { title: 'أدلة استخدام', desc: 'مواد إرشادية مختصرة تساعد على سرعة التبني والرجوع الذاتي.' },
    ],
  },
  technical: {
    title: 'المتطلبات التقنية والتكامل',
    intro: 'يراعي ديوان سويت البيئات المؤسسية التي تحتاج إلى ربط منضبط، خيارات استضافة متعددة، وضوابط أمن سيبراني واضحة.',
    items: [
      { title: 'التكامل مع ERP / ECM', desc: 'ربط البيانات والوثائق وتدفقات العمل مع الأنظمة المؤسسية القائمة عند الحاجة.' },
      { title: 'Zoom / Teams / Webex / Meet', desc: 'دعم التكامل مع منصات الاجتماعات والتقويم لتبسيط الدعوات والحضور وتجربة المستخدم.' },
      { title: 'On-Premise و Cloud', desc: 'دعم النشر داخل بيئة الجهة أو على السحابة وفق المتطلبات التنظيمية والتشغيلية.' },
      { title: 'الأمان السيبراني', desc: 'صلاحيات دقيقة، سجل تدقيق، نسخ احتياطية، وضوابط تحكم ملائمة للجهات الحساسة.' },
    ],
  },
  challenges: {
    title: 'التحديات المتوقعة وكيف نعالجها',
    intro: 'نجاح المنصة لا يعتمد على التقنية فقط، بل على كيفية إدارة التغيير والالتزام التشغيلي منذ اليوم الأول.',
    items: [
      {
        title: 'مقاومة التغيير',
        challenge: 'الاعتماد على البريد والملفات اليدوية يخلق ترددًا في الانتقال إلى مسار رقمي موحد.',
        solution: 'نبدأ بسيناريو تطبيقي واضح، وتدريب موجّه، وتطبيق تدريجي يثبت القيمة بسرعة للمستخدمين الرئيسيين.',
      },
      {
        title: 'ضعف الالتزام',
        challenge: 'قد تتأخر تحديثات التنفيذ أو الاعتمادات إذا لم تكن المسؤوليات مرئية ومقاسة.',
        solution: 'نربط كل قرار بمالك واضح، وتنبيهات، ومؤشرات متابعة وتقارير دورية للإدارة العليا.',
      },
      {
        title: 'تعقيد العمليات',
        challenge: 'اختلاف إجراءات المجالس واللجان والجهات التابعة قد يجعل التوحيد صعبًا في البداية.',
        solution: 'نهيئ مسارات مرنة وقوالب مخصصة وصلاحيات متدرجة مع تطبيق مرحلي يقلل التعقيد التشغيلي.',
      },
    ],
  },
  links: {
    implementation: 'استعرض صفحة التطبيق والدعم',
    integrations: 'استعرض صفحة التكاملات',
    compliance: 'استعرض صفحة الأمن والامتثال',
    support: 'تواصل مع فريق المشروع',
  },
}

const en: HomeEnterpriseContent = {
  badge: 'Enterprise readiness',
  introTitle: 'What do large organizations need before approving the platform?',
  introText:
    'Institutional value is not completed by running the meeting well alone. It also requires clear ownership, a rollout plan, technical readiness, and an early response to adoption and change challenges.',
  roles: {
    title: 'Roles and responsibilities distribution',
    intro: 'This table clarifies the core responsibility of each stakeholder and the expected role inside the platform so ownership does not blur across governance, execution, compliance, and IT.',
    headers: {
      role: 'Role',
      responsibilities: 'Responsibilities',
      systemRole: 'Role inside the platform',
    },
    rows: [
      {
        role: 'Board of Directors',
        responsibilities: 'Review agenda items, approve minutes, issue decisions, and monitor execution and compliance indicators.',
        systemRole: 'Access meetings, decisions, approvals, and executive reports according to permissions.',
      },
      {
        role: 'Corporate Secretary',
        responsibilities: 'Manage agendas, invitations, attachments, minutes, approval routing, and follow-up discipline.',
        systemRole: 'Daily governance operator responsible for meeting workflow, documents, and alerts.',
      },
      {
        role: 'Executive Management',
        responsibilities: 'Receive decisions, convert them into actions, update execution, and escalate status to leadership.',
        systemRole: 'Execution owners who update progress, delays, and delivery risks.',
      },
      {
        role: 'Compliance Office',
        responsibilities: 'Validate policy compliance, preserve audit evidence, and prepare review-ready reporting.',
        systemRole: 'Review audit trails, monitor compliance, and extract oversight reports.',
      },
      {
        role: 'Information Technology',
        responsibilities: 'Prepare the environment, integrations, security controls, backup discipline, and operational stability.',
        systemRole: 'Manage advanced settings, enterprise permissions, integrations, and hosting governance.',
      },
    ],
  },
  roadmap: {
    title: 'Diwan Suite implementation phases',
    intro: 'The rollout follows a phased model that reduces risk and accelerates adoption without disrupting institutional operations.',
    phases: [
      { title: '1. Current-state analysis', desc: 'Review boards, committees, minutes workflow, approvals, and organizational and technical requirements.' },
      { title: '2. System setup', desc: 'Configure structure, permissions, templates, approval routes, and required integrations.' },
      { title: '3. Training', desc: 'Enable secretariat teams, users, and executive owners on their real operating roles in the platform.' },
      { title: '4. Go-live', desc: 'Start gradually with live meetings while validating approval quality, execution visibility, and operational stability.' },
      { title: '5. Continuous improvement', desc: 'Measure adoption, refine templates and reports, and expand to more committees or entities.' },
    ],
  },
  support: {
    title: 'Training and capability building',
    intro: 'Adoption support matters as much as technical setup, so training and support are embedded into the rollout path instead of being treated as an afterthought.',
    items: [
      { title: 'User training', desc: 'Role-based sessions for secretariat teams, members, and operational users.' },
      { title: 'Technical support', desc: 'Support channels for onboarding, operational questions, and priority cases.' },
      { title: 'Consulting', desc: 'Governance and operating guidance to improve maturity, not just use the system.' },
      { title: 'User guides', desc: 'Short materials that help teams adopt faster and self-serve when needed.' },
    ],
  },
  technical: {
    title: 'Technical requirements and integrations',
    intro: 'Diwan Suite is built for enterprise environments that need governed integrations, flexible hosting, and clear cyber controls.',
    items: [
      { title: 'ERP / ECM integration', desc: 'Connect records, documents, and workflow signals with enterprise systems where required.' },
      { title: 'Zoom / Teams / Webex / Meet', desc: 'Support common meeting and calendar integrations to streamline invitations, attendance, and user experience.' },
      { title: 'On-premise and cloud', desc: 'Deploy inside the entity environment or in the cloud based on regulatory and operating requirements.' },
      { title: 'Cybersecurity controls', desc: 'Granular permissions, audit trails, backup discipline, and controls suited for sensitive institutions.' },
    ],
  },
  challenges: {
    title: 'Expected challenges and how we address them',
    intro: 'Platform success depends not only on software, but also on how change, discipline, and operating complexity are handled from the start.',
    items: [
      {
        title: 'Change resistance',
        challenge: 'Teams that rely on email and uncontrolled files may hesitate to move to one governed digital process.',
        solution: 'We start with a practical operating scenario, role-based training, and phased adoption that proves value quickly.',
      },
      {
        title: 'Weak execution discipline',
        challenge: 'Approvals and execution updates may slip when ownership is not visible or measured.',
        solution: 'Every decision is tied to a clear owner, alerts, deadlines, and executive follow-up indicators.',
      },
      {
        title: 'Process complexity',
        challenge: 'Different committees, entities, or subsidiaries can make standardization difficult at the beginning.',
        solution: 'We configure flexible workflows, tailored templates, and phased rollout paths that reduce operating complexity.',
      },
    ],
  },
  links: {
    implementation: 'View implementation and support page',
    integrations: 'View integrations page',
    compliance: 'View security and compliance page',
    support: 'Contact the project team',
  },
}

const base: Record<'ar' | 'en', HomeEnterpriseContent> = { ar, en }

export function getHomeEnterpriseContent(lang: LangCode): HomeEnterpriseContent {
  return base[(lang === 'ar' || lang === 'en') ? lang : 'en']
}
