import React, { useState } from 'react'
import { ArrowRight, BookOpen, Clock, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { buildLocalizedPath } from '@/lib/routing'
import { getPageBySlug } from '@/lib/page-registry'
import { getBlogHubPages } from '@/lib/seo-internal-linking'
import { blogPageContent } from '@/lang/blog-page'
import type { BlogArticle } from '@/lang/blog-page'
import { trackCtaClick } from '@/lib/analytics'

// ─── Labels ──────────────────────────────────────────────────────────────────

const UI = {
  all:        { ar: 'الكل',          en: 'All',      hi: 'सभी',    ur: 'تمام'     },
  readMore:   { ar: 'اقرأ المزيد',   en: 'Read more',hi: 'और पढ़ें', ur: 'مزید پڑھیں' },
  comingSoon: { ar: 'قريبًا',        en: 'Coming soon', hi: 'जल्द आ रहा है', ur: 'جلد آ رہا ہے' },
  bullets:    { ar: 'ما ستتعلمه',    en: 'What you\'ll learn', hi: 'आप क्या सीखेंगे', ur: 'آپ کیا سیکھیں گے' },
  intent:     { ar: 'مناسب لمن يبحث عن:', en: 'Best for:', hi: 'सबसे उपयुक्त:', ur: 'بہترین:' },
  bookDemo:   { ar: 'احجز عرضًا توضيحيًا', en: 'Book a Demo', hi: 'डेमो बुक करें', ur: 'ڈیمو بک کریں' },
  explore:    { ar: 'استعرض قدرات المنصة', en: 'Explore Platform', hi: 'प्लेटफ़ॉर्म देखें', ur: 'پلیٹ فارم دیکھیں' },
  hubTitle:   { ar: 'مسارات قراءة مرتبطة بالحلول', en: 'Solution reading paths', hi: 'समाधान से जुड़े पढ़ने के मार्ग', ur: 'حلول سے متعلق مطالعہ کے راستے' },
  hubBody:    { ar: 'ابدأ من الدليل المناسب ثم انتقل إلى صفحة الحل أو المقارنة المرتبطة حتى تتضح دورة الاجتماع والقرار والتنفيذ.', en: 'Start with the most relevant guide, then move to the matching solution or comparison page to understand the meeting-to-decision lifecycle.', hi: 'उपयुक्त गाइड से शुरू करें, फिर संबंधित समाधान या तुलना पृष्ठ पर जाएँ ताकि बैठक से निर्णय तक की यात्रा स्पष्ट हो सके।', ur: 'مناسب گائیڈ سے شروع کریں، پھر متعلقہ حل یا تقابلی صفحے پر جائیں تاکہ اجلاس سے فیصلے تک کا مکمل سفر واضح ہو۔' },
  ctaTitle:   {
    ar: 'هل تبحث عن منصة لحوكمة المجالس والقرارات؟',
    en: 'Looking for a board governance platform?',
    hi: 'क्या आप बोर्ड गवर्नेंस प्लेटफ़ॉर्म की तलाश में हैं?',
    ur: 'کیا آپ بورڈ گورننس پلیٹ فارم تلاش کر رہے ہیں؟',
  },
  ctaBody:    {
    ar: 'ديوان سويت يساعدك على تحويل الاجتماعات إلى قرارات موثقة ومهام قابلة للتنفيذ وتقارير امتثال جاهزة.',
    en: 'Diwan Suite helps you turn meetings into documented decisions, executable tasks, and compliance-ready reports.',
    hi: 'Diwan Suite आपको बैठकों को दस्तावेज़ीकृत निर्णयों, कार्रवाई योग्य कार्यों और अनुपालन-तैयार रिपोर्ट में बदलने में मदद करता है।',
    ur: 'Diwan Suite آپ کو اجلاسوں کو دستاویز شدہ فیصلوں، قابلِ عمل کاموں اور تعمیل کے لیے تیار رپورٹوں میں بدلنے میں مدد کرتا ہے۔',
  },
  faqTitle:   {
    ar: 'أسئلة شائعة عن مدونة ديوان سويت',
    en: 'Frequently Asked Questions about the Diwan Suite Blog',
    hi: 'Diwan Suite ब्लॉग के बारे में अक्सर पूछे जाने वाले प्रश्न',
    ur: 'Diwan Suite بلاگ کے بارے میں اکثر پوچھے جانے والے سوالات',
  },
  introTitle: {
    ar: 'مقالات عملية في حوكمة المجالس والقرارات',
    en: 'Practical Articles on Board Governance and Decisions',
    hi: 'बोर्ड गवर्नेंस और निर्णयों पर व्यावहारिक लेख',
    ur: 'بورڈ گورننس اور فیصلوں پر عملی مضامین',
  },
  introBody:  {
    ar: 'تغطي هذه المقالات حوكمة مجالس الإدارة، إدارة اللجان، محاضر الاجتماعات بالذكاء الاصطناعي، متابعة تنفيذ القرارات، والامتثال المؤسسي — مصممة للجهات السعودية والخليجية.',
    en: 'These articles cover board of directors governance, committee management, AI-assisted meeting minutes, decision execution tracking, and institutional compliance — designed for Saudi and Gulf organizations.',
    hi: 'ये लेख बोर्ड ऑफ डायरेक्टर्स गवर्नेंस, समिति प्रबंधन, AI-सहायित मीटिंग मिनट्स, निर्णय निष्पादन ट्रैकिंग और संस्थागत अनुपालन को कवर करते हैं — सऊदी और खाड़ी संगठनों के लिए।',
    ur: 'یہ مضامین بورڈ آف ڈائریکٹرز گورننس، کمیٹی مینجمنٹ، AI-سہایہ یافتہ اجلاس محاضر، فیصلہ نفاذ ٹریکنگ اور ادارہ جاتی تعمیل کو کور کرتے ہیں — سعودی اور خلیجی اداروں کے لیے۔',
  },
} as const

type LangKey = 'ar' | 'en' | 'hi' | 'ur'

function label(key: keyof typeof UI, lang: string): string {
  return (UI[key] as Record<string, string>)[lang] ?? (UI[key] as Record<string, string>).en
}

// ─── ArticleCard ─────────────────────────────────────────────────────────────

function ArticleCard({ article, font, isRTL, lang }: { article: BlogArticle; font: string; isRTL: boolean; lang: string }) {
  const [open, setOpen] = useState(false)

  // internalSlug is a bare URL slug (e.g. 'board-management-system'), not a registry key.
  // getPageBySlug resolves it to the correct PublicPage key before building the path.
  const resolvedPage = article.internalSlug ? getPageBySlug(article.internalSlug) : null
  const articleHref = resolvedPage ? buildLocalizedPath(lang as LangKey, resolvedPage) : null

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-chart-1/30 hover:shadow-md">
      {/* Top section */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category + read time */}
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          <span
            className="rounded-full bg-chart-1/10 px-2.5 py-0.5 text-xs font-semibold text-chart-1"
            style={{ fontFamily: font }}
          >
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground" style={{ fontFamily: font }}>
            <Clock className="h-3 w-3 shrink-0" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="mb-2 font-bold leading-snug text-foreground transition-colors group-hover:text-chart-1"
          style={{ fontFamily: font, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-3 flex-1 text-xs leading-relaxed text-muted-foreground" style={{ fontFamily: font }}>
          {article.description}
        </p>

        {/* Intent */}
        <p className="mb-3 text-xs text-muted-foreground/70 italic" style={{ fontFamily: font }}>
          <span className="not-italic font-semibold text-muted-foreground">{label('intent', lang)}</span>{' '}
          {article.intent.split(' — ')[1] ?? article.intent}
        </p>

        {/* Bullets toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-chart-1 hover:underline w-fit"
          style={{ fontFamily: font }}
          aria-expanded={open}
        >
          {label('bullets', lang)}
          {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>

        {open && (
          <ul className="mb-4 flex flex-col gap-1.5" role="list">
            {article.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground" style={{ fontFamily: font }}>
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-chart-1" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA */}
      <div className="border-t border-border px-5 py-3">
        {articleHref ? (
          <a
            href={articleHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-chart-1 hover:underline"
            style={{ fontFamily: font }}
            onClick={() => trackCtaClick({ location: 'blog_article', label: article.title, lang })}
          >
            {label('readMore', lang)}
            <ArrowRight className="h-3 w-3" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} aria-hidden="true" />
          </a>
        ) : (
          <span
            className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
            style={{ fontFamily: font }}
          >
            {label('comingSoon', lang)}
          </span>
        )}
      </div>
    </article>
  )
}

// ─── CategoryFilter ───────────────────────────────────────────────────────────

function CategoryFilter({
  categories,
  active,
  onSelect,
  font,
}: {
  categories: string[]
  active: string
  onSelect: (c: string) => void
  font: string
}) {
  return (
    <div
      className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      role="group"
      aria-label="Filter articles by category"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
            active === cat
              ? 'border-chart-1 bg-chart-1 text-primary-foreground'
              : 'border-border bg-background text-muted-foreground hover:border-chart-1/40 hover:text-foreground'
          }`}
          style={{ fontFamily: font }}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

// ─── InlineCta ────────────────────────────────────────────────────────────────

function HubLinks({ lang, font, pageMeta }: { lang: LangKey; font: string; pageMeta: ReturnType<typeof useLang>['pageMeta'] }) {
  const links = getBlogHubPages()
    .map((page) => ({ label: pageMeta[page].title, href: buildLocalizedPath(lang, page) }))
    .slice(0, 8)

  return (
    <section className="border-b border-border/50 bg-secondary/20 py-8" aria-label={label('hubTitle', lang)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-5 max-w-3xl">
          <h2 className="text-base font-bold text-foreground" style={{ fontFamily: font }}>
            {label('hubTitle', lang)}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground" style={{ fontFamily: font }}>
            {label('hubBody', lang)}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary" style={{ fontFamily: font }}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function InlineCta({ lang, font, isRTL }: { lang: string; font: string; isRTL: boolean }) {
  const ctaHref = buildLocalizedPath(lang as LangKey, 'home', '#booking-cta')
  const platformHref = buildLocalizedPath(lang as LangKey, 'boardManagementSystem')

  return (
    <div className="col-span-full rounded-2xl border border-chart-1/20 bg-chart-1/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground text-balance" style={{ fontFamily: font }}>
          {label('ctaTitle', lang)}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground" style={{ fontFamily: font }}>
          {label('ctaBody', lang)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <a
          href={ctaHref}
          className="inline-flex items-center gap-1.5 rounded-xl bg-chart-1 px-4 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-chart-1/90"
          style={{ fontFamily: font }}
          data-cta="blog_inline"
          onClick={() => trackCtaClick({ location: 'blog_inline_cta', label: 'book_demo', lang })}
        >
          {label('bookDemo', lang)}
          <ArrowRight className="h-3 w-3 shrink-0" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} aria-hidden="true" />
        </a>
        <a
          href={platformHref}
          className="inline-flex items-center gap-1.5 rounded-xl border border-chart-1 px-4 py-2 text-xs font-bold text-chart-1 transition-all hover:bg-chart-1/5"
          style={{ fontFamily: font }}
          data-cta="blog_inline_explore"
          onClick={() => trackCtaClick({ location: 'blog_inline_cta', label: 'explore_platform', lang })}
        >
          {label('explore', lang)}
        </a>
      </div>
    </div>
  )
}

// ─── FaqItem ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a, font }: { q: string; a: string; font: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-start text-sm font-semibold text-foreground"
        style={{ fontFamily: font }}
        aria-expanded={open}
      >
        <span className="text-balance">{q}</span>
        {open ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
      </button>
      {open && (
        <p className="pb-4 text-xs leading-relaxed text-muted-foreground" style={{ fontFamily: font }}>
          {a}
        </p>
      )}
    </div>
  )
}

// ─── BlogPage ─────────────────────────────────────────────────────────────────

export function BlogPage() {
  const { lang, font, isRTL, pageMeta } = useLang()
  const lk = (lang as LangKey) in blogPageContent ? (lang as LangKey) : 'ar'
  const content = blogPageContent[lk]
  const { copy, articles } = content

  const allLabel = label('all', lang)
  const categories = [allLabel, ...Array.from(new Set(articles.map((a) => a.category)))]
  const [activeCategory, setActiveCategory] = useState<string>(allLabel)

  const filteredArticles = activeCategory === allLabel
    ? articles
    : articles.filter((a) => a.category === activeCategory)

  const ctaHref = buildLocalizedPath(lk, 'home', '#booking-cta')

  return (
    <main id="main-content" className="min-h-screen bg-background">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="border-b border-border bg-secondary/30 py-12 lg:py-16"
        aria-labelledby="blog-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-chart-1" aria-hidden="true" />
            <span
              className="text-xs font-bold uppercase tracking-widest text-chart-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {copy.eyebrow}
            </span>
          </div>
          {/* Single H1 */}
          <h1
            id="blog-heading"
            className="mb-3 font-extrabold text-balance text-foreground"
            style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.15 }}
          >
            {copy.title}
          </h1>
          <p
            className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base"
            style={{ fontFamily: font }}
          >
            {copy.summary}
          </p>
        </div>
      </section>

      {/* ── Intro / H2 ───────────────────────────────────────────── */}
      <section className="border-b border-border/50 bg-background py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <h2
            className="mb-2 text-base font-bold text-foreground"
            style={{ fontFamily: font }}
          >
            {label('introTitle', lang)}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground" style={{ fontFamily: font }}>
            {label('introBody', lang)}
          </p>
        </div>
      </section>

      <HubLinks lang={lk} font={font} pageMeta={pageMeta} />

      {/* ── Articles grid ─────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" aria-label={copy.title}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onSelect={setActiveCategory}
            font={font}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article, idx) => (
              <React.Fragment key={article.slug}>
                <ArticleCard
                  article={article}
                  font={font}
                  isRTL={isRTL}
                  lang={lang}
                />
                {/* Mid-list CTA after every 5th card */}
                {(idx + 1) % 5 === 0 && idx < filteredArticles.length - 1 && (
                  <InlineCta lang={lang} font={font} isRTL={isRTL} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      {copy.faq.length > 0 && (
        <section className="border-t border-border py-12 lg:py-16" aria-labelledby="blog-faq-heading">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <h2
              id="blog-faq-heading"
              className="mb-6 text-lg font-bold text-foreground text-balance"
              style={{ fontFamily: font }}
            >
              {label('faqTitle', lang)}
            </h2>
            <div>
              {copy.faq.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} font={font} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <h2 className="mb-3 text-xl font-bold text-foreground text-balance" style={{ fontFamily: font }}>
            {label('ctaTitle', lang)}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground" style={{ fontFamily: font }}>
            {label('ctaBody', lang)}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={ctaHref}
              className="cta-btn inline-flex items-center gap-2 rounded-xl bg-chart-1 px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-chart-1/90"
              style={{ fontFamily: font }}
              data-cta="blog_bottom"
              onClick={() => trackCtaClick({ location: 'blog_bottom_cta', label: 'book_demo', lang })}
            >
              {label('bookDemo', lang)}
              <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} aria-hidden="true" />
            </a>
            <a
              href={buildLocalizedPath(lk, 'boardManagementSystem')}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-secondary"
              style={{ fontFamily: font }}
              onClick={() => trackCtaClick({ location: 'blog_bottom_cta', label: 'explore_platform', lang })}
            >
              {label('explore', lang)}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
