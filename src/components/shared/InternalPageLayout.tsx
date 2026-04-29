import { ArrowRight, ChevronLeft, Phone, ShieldCheck } from 'lucide-react'
import { buildLocalizedPath, type StaticPage } from '@/lib/routing'
import { useLang } from '@/contexts/LanguageContext'
import { SITE_CONFIG } from '@/lib/site-config'
import { LEGAL_PAGES, NAV_INDUSTRY_PAGES, NAV_SECTOR_PAGES, NAV_SOLUTION_PAGES, PLATFORM_PAGES, SUPPORT_PAGES, TRUST_PAGES, getPageCategory } from '@/lib/page-registry'
import { getStrategicRelatedPages } from '@/lib/seo-internal-linking'

function LinkGrid({ items, title, font }: { items: Array<{ label: string; href: string }>; title: string; font: string }) {
  if (!items.length) return null
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold text-foreground" style={{ fontFamily: font }}>
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" style={{ fontFamily: font }}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function PageFaq({ items, font, title }: { items: Array<{ q: string; a: string }>; font: string; title: string }) {
  if (!items.length) return null
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm lg:p-8" aria-labelledby="page-faq-heading">
      <h2 id="page-faq-heading" className="text-2xl font-bold tracking-tight" style={{ fontFamily: font }}>
        {title}
      </h2>
      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background/70">
        {items.map((item, index) => (
          <details key={index} className="group px-5 py-4">
            <summary className="cursor-pointer list-none text-base font-semibold text-foreground" style={{ fontFamily: font }}>
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function InternalPageLayout({ page }: { page: Exclude<StaticPage, 'home'> }) {
  const { lang, font, isRTL, extra, pageCopy: currentPageCopy, pageMeta } = useLang()

  if (!currentPageCopy) return null

  const primaryContactHref = SITE_CONFIG.whatsappUrl || SITE_CONFIG.phoneHref || buildLocalizedPath(lang, 'home', '#booking-cta')
  const primaryContactLabel = lang === 'ar' ? 'اتصل بالفريق' : lang === 'hi' ? 'टीम से बात करें' : lang === 'ur' ? 'ٹیم سے رابطہ کریں' : 'Talk to the team'

  const breadcrumbLinks = [
    { label: extra.breadcrumbsHome, href: buildLocalizedPath(lang) },
    ...NAV_SOLUTION_PAGES.map((key) => ({ label: pageMeta[key].title, href: buildLocalizedPath(lang, key) })),
    ...NAV_SECTOR_PAGES.map((key) => ({ label: pageMeta[key].title, href: buildLocalizedPath(lang, key) })),
    ...NAV_INDUSTRY_PAGES.map((key) => ({ label: pageMeta[key].title, href: buildLocalizedPath(lang, key) })),
    ...PLATFORM_PAGES.map((key) => ({ label: pageMeta[key].title, href: buildLocalizedPath(lang, key) })),
    ...TRUST_PAGES.map((key) => ({ label: pageMeta[key].title, href: buildLocalizedPath(lang, key) })),
    ...SUPPORT_PAGES.map((key) => ({ label: pageMeta[key].title, href: buildLocalizedPath(lang, key) })),
    ...LEGAL_PAGES.map((key) => ({ label: pageMeta[key].title, href: buildLocalizedPath(lang, key) })),
  ].filter((item) => item.href !== buildLocalizedPath(lang, page))

  const uiTextMap: Record<string, { related: string; strategic: string; siblings: string; explore: string; pageFaq: string; who: string; solve: string; how: string; summary: string; contact: string }> = {
    ar: { related: 'صفحات ذات صلة', strategic: 'مسار قراءة مقترح', siblings: 'صفحات من نفس المسار', explore: 'استكشف صفحات أخرى', pageFaq: 'أسئلة مرتبطة بالصفحة', who: 'لمن صُمم', solve: 'ما الذي يعالجه', how: 'كيف يعمل', summary: 'الخلاصة التنفيذية', contact: 'إذا كنتم بحاجة إلى عرض توضيحي أو مناقشة تطبيق ديوان سويت داخل الجهة، يمكنكم التواصل مباشرة مع الفريق عبر القنوات الرسمية.' },
    en: { related: 'Related pages', strategic: 'Suggested reading path', siblings: 'Pages in the same track', explore: 'Explore more pages', pageFaq: 'Page FAQs', who: 'Who it is for', solve: 'What it solves', how: 'How it works', summary: 'Executive summary', contact: 'If you need a tailored walkthrough or want to discuss how Diwan Suite fits your organization, contact the team through the official channels.' },
    hi: { related: 'संबंधित पृष्ठ', strategic: 'सुझाया गया पढ़ने का मार्ग', siblings: 'इसी श्रेणी के पृष्ठ', explore: 'और पृष्ठ देखें', pageFaq: 'इस पृष्ठ से जुड़े प्रश्न', who: 'किसके लिए', solve: 'यह क्या हल करता है', how: 'यह कैसे काम करता है', summary: 'कार्यकारी सारांश', contact: 'यदि आपको डेमो चाहिए या अपनी संस्था में Diwan Suite के उपयोग पर चर्चा करनी है, तो आधिकारिक चैनलों के माध्यम से हमसे संपर्क करें।' },
    ur: { related: 'متعلقہ صفحات', strategic: 'تجویز کردہ مطالعہ کا راستہ', siblings: 'اسی زمرے کے صفحات', explore: 'مزید صفحات دیکھیں', pageFaq: 'اس صفحے سے متعلق سوالات', who: 'یہ کس کے لیے ہے', solve: 'یہ کیا حل کرتا ہے', how: 'یہ کیسے کام کرتا ہے', summary: 'انتظامی خلاصہ', contact: 'اگر آپ ڈیمو چاہتے ہیں یا اپنے ادارے میں Diwan Suite کے نفاذ پر بات کرنا چاہتے ہیں تو براہ کرم سرکاری ذرائع سے رابطہ کریں۔' },
  }
  const uiText = uiTextMap[lang] ?? uiTextMap.ar

  const strategicPageKeys = getStrategicRelatedPages(page)
  const relatedPageKeys = Array.from(new Set([...(currentPageCopy.relatedPages ?? []), ...strategicPageKeys]))
    .filter((key) => key !== page)

  const relatedPageLinks = relatedPageKeys
    .map((key) => (key in pageMeta ? { label: pageMeta[key as keyof typeof pageMeta].title, href: buildLocalizedPath(lang, key as Exclude<StaticPage, 'home'>) } : null))
    .filter(Boolean) as Array<{ label: string; href: string }>

  const strategicLinks = strategicPageKeys
    .map((key) => (key in pageMeta ? { label: pageMeta[key].title, href: buildLocalizedPath(lang, key) } : null))
    .filter(Boolean) as Array<{ label: string; href: string }>

  const siblingGroup = (() => {
    const category = getPageCategory(page)
    if (category === 'solution') return NAV_SOLUTION_PAGES
    if (category === 'sector') return NAV_SECTOR_PAGES
    if (category === 'industry') return NAV_INDUSTRY_PAGES
    if (category === 'platform') return PLATFORM_PAGES
    if (category === 'trust') return TRUST_PAGES
    if (category === 'support') return SUPPORT_PAGES
    if (category === 'legal') return LEGAL_PAGES
    return []
  })()

  const siblingLinks = siblingGroup
    .filter((key) => key !== page)
    .map((key) => ({ label: pageMeta[key].title, href: buildLocalizedPath(lang, key) }))

  const isSectorPage = getPageCategory(page) === 'sector'
  const sectorHeroWrapStyle = isSectorPage && isRTL ? { marginInlineStart: 'auto' as const } : undefined
  const sectorLeadClass = isSectorPage && isRTL
    ? 'mt-5 max-w-4xl text-right text-lg leading-8 text-foreground lg:text-[1.35rem] lg:leading-9'
    : 'mt-5 max-w-3xl text-lg leading-8 text-foreground lg:text-[1.35rem] lg:leading-9'
  const sectorSupportingClass = isSectorPage && isRTL
    ? 'mt-4 max-w-4xl text-right text-base leading-8 text-muted-foreground lg:text-lg'
    : 'mt-4 max-w-3xl text-base leading-8 text-muted-foreground lg:text-lg'

  const shouldHideSiblingLinks = currentPageCopy.hideSiblingLinks ?? false
  const shouldHideExploreLinks = currentPageCopy.hideExploreLinks ?? false
  const pageFaqTitle = currentPageCopy.pageFaqTitle ?? uiText.pageFaq
  const ctaTitle = currentPageCopy.ctaTitle ?? extra.contactLabel
  const ctaBody = currentPageCopy.ctaBody ?? uiText.contact
  const ctaPrimaryLabel = currentPageCopy.ctaPrimaryLabel ?? extra.requestDemo
  const ctaSecondaryLabel = currentPageCopy.ctaSecondaryLabel ?? primaryContactLabel
  const exploreLinks = breadcrumbLinks.slice(0, 10)

  const tocItems = [
    ...(currentPageCopy.executiveSummary ? [{ id: 'executive-summary', title: uiText.summary }] : []),
    ...currentPageCopy.sections.map((section) => ({ id: section.id, title: section.title })),
    ...((currentPageCopy.faq?.length ?? 0) > 0 ? [{ id: 'page-faq', title: pageFaqTitle }] : []),
    { id: 'page-contact', title: ctaTitle },
  ]

  const trimRepeatedTitle = (value?: string | null) => {
    if (!value) return ''
    const normalized = value.trim()
    const title = currentPageCopy.title.trim()
    const prefixes = [`${title} — `, `${title}: `, `${title} - `]
    const matchedPrefix = prefixes.find((prefix) => normalized.startsWith(prefix))
    return matchedPrefix ? normalized.slice(matchedPrefix.length).trim() : normalized
  }

  const leadParagraph = trimRepeatedTitle(currentPageCopy.definition?.trim() || currentPageCopy.summary)
  const supportingParagraph = currentPageCopy.definition && currentPageCopy.summary.trim() !== currentPageCopy.definition.trim()
    ? trimRepeatedTitle(currentPageCopy.summary)
    : null

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" style={{ fontFamily: font }}>
            <a href={buildLocalizedPath(lang)} className="transition-colors hover:text-foreground">
              {extra.breadcrumbsHome}
            </a>
            <ChevronLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            <span>{currentPageCopy.title}</span>
          </div>

          <div className="max-w-4xl" style={sectorHeroWrapStyle}>
            <span className="inline-flex rounded-full border border-chart-1/20 bg-chart-1/8 px-3 py-1 text-xs font-semibold text-chart-1" style={{ fontFamily: font }}>
              {currentPageCopy.eyebrow}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight lg:text-5xl" style={{ fontFamily: font, lineHeight: 1.15 }}>
              {currentPageCopy.title}
            </h1>
            <p className={sectorLeadClass} style={{ fontFamily: font }}>
              {leadParagraph}
            </p>
            {supportingParagraph && (
              <p className={sectorSupportingClass} style={{ fontFamily: font }}>
                {supportingParagraph}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground" style={{ fontFamily: font }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-chart-1" />
                {extra.lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-foreground" style={{ fontFamily: font }}>
              {extra.tocLabel}
            </h2>
            <nav aria-label={extra.tocLabel} className="space-y-2">
              {tocItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" style={{ fontFamily: font }}>
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
          <LinkGrid items={relatedPageLinks.slice(0, 4)} title={uiText.related} font={font} />
          {!shouldHideSiblingLinks && <LinkGrid items={siblingLinks.slice(0, 6)} title={uiText.siblings} font={font} />}
        </aside>

        <div className="space-y-8">
          {currentPageCopy.executiveSummary && (
            <section id="executive-summary" className="rounded-3xl border border-chart-1/20 bg-chart-1/5 p-6 shadow-sm lg:p-8" aria-label={uiText.summary}>
              <div className="max-w-4xl">
                <span className="inline-flex rounded-full border border-chart-1/20 bg-background px-3 py-1 text-xs font-semibold text-chart-1" style={{ fontFamily: font }}>
                  {uiText.summary}
                </span>
                <p className="mt-4 text-base leading-8 text-foreground lg:text-lg" style={{ fontFamily: font }}>
                  {currentPageCopy.executiveSummary}
                </p>
              </div>
            </section>
          )}

          {(currentPageCopy.whoFor || currentPageCopy.whatItSolves || currentPageCopy.howItWorks) && (
            <section className="grid gap-5 lg:grid-cols-3" aria-label={currentPageCopy.executiveSummary ?? 'Page summary'}>
              {currentPageCopy.whoFor && (
                <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: font }}>{uiText.who}</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>
                    {currentPageCopy.whoFor.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-chart-1" />{item}</li>)}
                  </ul>
                </article>
              )}
              {currentPageCopy.whatItSolves && (
                <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: font }}>{uiText.solve}</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>
                    {currentPageCopy.whatItSolves.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-chart-1" />{item}</li>)}
                  </ul>
                </article>
              )}
              {currentPageCopy.howItWorks && (
                <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: font }}>{uiText.how}</h2>
                  <ol className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>
                    {currentPageCopy.howItWorks.map((item, index) => <li key={item} className="flex gap-3"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">{index + 1}</span>{item}</li>)}
                  </ol>
                </article>
              )}
            </section>
          )}

          {currentPageCopy.sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 shadow-sm lg:p-8">
              <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: font }}>
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground" style={{ fontFamily: font }}>
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 grid gap-3 rounded-2xl bg-secondary/40 p-5 text-sm text-foreground lg:grid-cols-1" style={{ fontFamily: font }}>
                  {section.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-chart-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background">
                  {section.table.caption && (
                    <div className="border-b border-border bg-secondary/30 px-5 py-4">
                      <p className="text-sm font-semibold text-foreground" style={{ fontFamily: font }}>
                        {section.table.caption}
                      </p>
                    </div>
                  )}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-secondary/40">
                        <tr>
                          {section.table.columns.map((column, columnIndex) => (
                            <th key={columnIndex} className={`px-5 py-4 text-sm font-bold text-foreground ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontFamily: font }} scope="col">{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="align-top">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className={`px-5 py-4 text-sm leading-7 text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontFamily: font }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid gap-4 p-4 md:hidden">
                    {section.table.rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        {row.map((cell, cellIndex) => (
                          <div key={cellIndex} className="border-b border-border/70 py-2 last:border-b-0">
                            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground" style={{ fontFamily: font }}>
                              {section.table?.columns[cellIndex]}
                            </div>
                            <div className="mt-1 text-sm leading-7 text-foreground" style={{ fontFamily: font }}>{cell}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}

          <div id="page-faq" className="scroll-mt-28"><PageFaq items={currentPageCopy.faq ?? []} font={font} title={pageFaqTitle} /></div>

          <section id="page-contact" className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 shadow-sm lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: font }}>{ctaTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground" style={{ fontFamily: font }}>
                  {ctaBody}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={primaryContactHref} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary" style={{ fontFamily: font }}>
                  <Phone className="h-4 w-4" />
                  {ctaSecondaryLabel}
                </a>
                <a href={buildLocalizedPath(lang, 'home', '#booking-cta')} className="inline-flex items-center gap-2 rounded-xl bg-chart-1 px-5 py-3 text-sm font-semibold text-primary-foreground" style={{ fontFamily: font }}>
                  {ctaPrimaryLabel}
                  <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                </a>
              </div>
            </div>
          </section>

          <LinkGrid items={strategicLinks.slice(0, 6)} title={uiText.strategic} font={font} />

          {!shouldHideExploreLinks && <LinkGrid items={exploreLinks} title={uiText.explore} font={font} />}
        </div>
      </section>
    </main>
  )
}
