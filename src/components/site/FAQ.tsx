import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'

interface VisibleFaqItem {
  q: string
  a: string
  group: string
  key: string
}

// FAQ display limits
const INITIAL_TOTAL_VISIBLE = 5  // Max 5 questions total initially
const INITIAL_PER_GROUP = 2     // Max 2 questions per group initially

export function SiteFAQ() {
  const { lang, t, isRTL, font, homeAeo, homeFaq } = useLang()
  const [openItem, setOpenItem] = useState<string>('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false) // Track if user clicked "Show More"
  const ref = useReveal()
  const quickFaqItems = useMemo(() => homeFaq.quickItems, [homeFaq.quickItems])

  const faqIntro = {
    ar: 'تغطي الأسئلة التالية نظرة المنتج، ومسار الحوكمة، والمجالس واللجان، والجمعيات العمومية، والمحاضر، والقرارات، والحضور، والذكاء الاصطناعي، والأمن، والتكاملات، وخطة التطبيق.',
    en: 'The questions below cover product overview, governance workflow, boards and committees, general assemblies, minutes, decisions, attendance, AI, security, integrations, and implementation.',
    hi: 'नीचे दिए गए प्रश्न उत्पाद अवलोकन, गवर्नेंस वर्कफ़्लो, बोर्ड और समितियाँ, सामान्य सभाएँ, मिनट्स, निर्णय, उपस्थिति, एआई, सुरक्षा, इंटीग्रेशन और इम्प्लीमेंटेशन को कवर करते हैं।',
    ur: 'نیچے دیے گئے سوالات مصنوعات کے تعارف، گورننس ورک فلو، بورڈز اور کمیٹیوں، جنرل اسمبلیوں، محاضر، فیصلوں، حاضری، اے آئی، سیکیورٹی، انٹیگریشنز اور نفاذ کو کور کرتے ہیں۔'
  }[lang]

  const groups = useMemo(() => homeFaq.groups, [homeFaq.groups])
  const allItems = useMemo<VisibleFaqItem[]>(() => 
    groups.flatMap((group) => 
      group.items.map((item, index) => ({ 
        ...item, 
        group: group.title, 
        key: `${group.key}-${index}` 
      }))
    ), 
    [groups]
  )

  const filteredItems = useMemo(() => {
    if (!search.trim()) return allItems
    const term = search.trim().toLowerCase()
    return allItems.filter((item) => 
      item.q.toLowerCase().includes(term) || 
      item.a.toLowerCase().includes(term) || 
      item.group.toLowerCase().includes(term)
    )
  }, [allItems, search])

  // Calculate visible items based on showAll state
  const visibleItems = useMemo(() => {
    // If searching or showAll is true, show all filtered items
    if (search.trim() || showAll) {
      return filteredItems
    }
    
    // Initial display: max 5 total, max 2 per group
    const result: VisibleFaqItem[] = []
    const groupCounts = new Map<string, number>()
    
    for (const item of filteredItems) {
      if (result.length >= INITIAL_TOTAL_VISIBLE) break
      
      const currentGroupCount = groupCounts.get(item.group) || 0
      if (currentGroupCount >= INITIAL_PER_GROUP) continue
      
      result.push(item)
      groupCounts.set(item.group, currentGroupCount + 1)
    }
    
    return result
  }, [filteredItems, showAll, search])

  const visibleGroups = useMemo(() => {
    const map = new Map<string, VisibleFaqItem[]>()
    visibleItems.forEach((item) => {
      if (!map.has(item.group)) map.set(item.group, [])
      map.get(item.group)!.push(item)
    })
    return Array.from(map.entries()).map(([title, items]) => ({ title, items }))
  }, [visibleItems])
  
  // Count hidden items
  const hiddenCount = filteredItems.length - visibleItems.length

  // Popular items use the same key format as allItems so quick-answer buttons
  // navigate to the correct accordion item
  const popularItems = quickFaqItems.slice(0, 6).map((item, index) => {
    const faqKey = `quickAnswers-${index}`
    return { ...item, group: homeAeo.faq.groupTitle, key: faqKey }
  })

  useEffect(() => {
    // Reset showAll when language changes
    setShowAll(false)
    setOpenItem(filteredItems[0]?.key ?? '')
  }, [lang])
  
  // Don't reset showAll on search - user should see all matching results

  return (
    <section 
      ref={ref} 
      id="faq" 
      className="section-reveal bg-secondary/30 py-10 lg:py-14" 
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span 
            className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-chart-1" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.faq.badge}
          </span>
          <h2 
            id="faq-heading" 
            className="mb-4 font-extrabold text-foreground" 
            style={{ fontFamily: font, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: '1.15' }}
          >
            {t.faq.heading}
          </h2>
          <p 
            className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground lg:text-base" 
            style={{ fontFamily: font }}
          >
            {faqIntro}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.faq.searchPlaceholder}
            className="w-full rounded-xl border border-border bg-background py-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-chart-1/40 focus:outline-none focus:ring-2 focus:ring-chart-1/20"
            style={{ 
              fontFamily: font, 
              [isRTL ? 'paddingRight' : 'paddingLeft']: '3rem', 
              [isRTL ? 'paddingLeft' : 'paddingRight']: '1rem' 
            }}
          />
        </div>

        {/* Popular Questions */}
        {!search && (
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setOpenItem(item.key)
                  document.getElementById(item.key)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                className="rounded-xl border border-border bg-background p-4 text-start text-sm font-medium text-foreground transition-all hover:border-chart-1/20 hover:bg-secondary"
                style={{ fontFamily: font }}
              >
                {item.q}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Groups */}
        <div className="space-y-6">
          {visibleGroups.map((group) => (
            <section 
              key={group.title} 
              aria-labelledby={`faq-group-${group.title}`} 
              className="rounded-2xl border border-border bg-card p-4 lg:p-6"
            >
              <h3 
                id={`faq-group-${group.title}`} 
                className="mb-4 text-base lg:text-lg font-bold text-foreground" 
                style={{ fontFamily: font }}
              >
                {group.title}
              </h3>
              <div className="divide-y divide-border rounded-xl border border-border bg-background">
                {group.items.map((item) => (
                  <div key={item.key} id={item.key} className="px-4 py-3.5 lg:px-5 lg:py-4 scroll-mt-24">
                    <button
                      type="button"
                      onClick={() => setOpenItem(openItem === item.key ? '' : item.key)}
                      className="flex w-full items-center justify-between gap-3 text-start text-sm font-medium text-foreground transition-colors hover:text-chart-1"
                      style={{ fontFamily: font }}
                      aria-expanded={openItem === item.key}
                    >
                      <span className="flex-1">{item.q}</span>
                      <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${openItem === item.key ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`accordion-content ${openItem === item.key ? 'open' : ''}`}>
                      <div className="accordion-inner">
                        <div 
                          className="pt-3 text-sm leading-relaxed text-muted-foreground" 
                          style={{ fontFamily: font }}
                        >
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Show More / Show Less */}
        {!search.trim() && hiddenCount > 0 && !showAll && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="rounded-xl border border-border px-5 py-3 text-sm font-medium transition-all hover:border-chart-1/20 hover:bg-secondary"
              style={{ fontFamily: font }}
            >
              {lang === 'ar' ? 'عرض المزيد' : lang === 'hi' ? 'और दिखाएं' : lang === 'ur' ? 'مزید دکھائیں' : 'Show More'} ({hiddenCount})
            </button>
          </div>
        )}
        
        {!search.trim() && showAll && filteredItems.length > INITIAL_TOTAL_VISIBLE && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="rounded-xl border border-border px-5 py-3 text-sm font-medium transition-all hover:border-chart-1/20 hover:bg-secondary"
              style={{ fontFamily: font }}
            >
              {lang === 'ar' ? 'عرض أقل' : lang === 'hi' ? 'कम दिखाएं' : lang === 'ur' ? 'کم دکھائیں' : 'Show Less'}
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <p 
            className="py-10 text-center text-sm text-muted-foreground" 
            style={{ fontFamily: font }}
          >
            {t.faq.noResults}
          </p>
        )}

      </div>
    </section>
  )
}
