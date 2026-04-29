import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, ChevronDown, Globe, Menu, X } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { buildLocalizedPath, resolveLocalizedHref, getPageFromPath } from '@/lib/routing'
import { SITE_CONFIG } from '@/lib/site-config'
import { getCapabilityLinks, getSectorLinks, getSolutionLinks } from '@/lib/page-links'
import { trackLanguageSwitch, trackCtaClick } from '@/lib/analytics'

type DesktopGroup = 'sectors' | 'solutions' | 'capabilities' | 'company' | null
type MobileGroup = 'sectors' | 'solutions' | 'capabilities' | 'company' | 'languages' | null

type NavUiCopy = {
  mainNav: string
  groupedMenu: string
  home: string
  sectorsMenuLabel: string
  solutionsMenuLabel: string
  capabilitiesMenuLabel: string
  keyCapabilities: string
  companyMenuLabel: string
  pricing: string
  resources: string
  sectorsAll: string
  language: string
  cta: string
  contact: string
  about: string
  support: string
  privacy: string
  terms: string
}

const navUi: Record<string, NavUiCopy> = {
  ar: {
    mainNav: 'التنقل الرئيسي',
    groupedMenu: 'القائمة الرئيسية',
    home: 'الرئيسية',
    sectorsMenuLabel: 'القطاعات',
    solutionsMenuLabel: 'الحلول',
    capabilitiesMenuLabel: 'القدرات',
    keyCapabilities: 'القدرات الرئيسية',
    companyMenuLabel: 'الشركة',
    pricing: 'الباقات',
    resources: 'مركز الموارد',
    sectorsAll: 'عرض جميع القطاعات',
    language: 'اللغة',
    cta: 'احجز عرضاً',
    contact: 'تواصل معنا',
    about: 'من نحن',
    support: 'الدعم',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
  },
  en: {
    mainNav: 'Main navigation',
    groupedMenu: 'Main menu',
    home: 'Home',
    sectorsMenuLabel: 'Sectors',
    solutionsMenuLabel: 'Solutions',
    capabilitiesMenuLabel: 'Capabilities',
    keyCapabilities: 'Key Capabilities',
    companyMenuLabel: 'Company',
    pricing: 'Pricing',
    resources: 'Resources',
    sectorsAll: 'All sectors',
    language: 'Language',
    cta: 'Book Demo',
    contact: 'Contact',
    about: 'About',
    support: 'Support',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  hi: {
    mainNav: 'मुख्य नेविगेशन',
    groupedMenu: 'मुख्य मेनू',
    home: 'होम',
    sectorsMenuLabel: 'क्षेत्र',
    solutionsMenuLabel: 'समाधान',
    capabilitiesMenuLabel: 'क्षमताएँ',
    keyCapabilities: 'मुख्य क्षमताएँ',
    companyMenuLabel: 'कंपनी',
    pricing: 'मूल्य',
    resources: 'संसाधन',
    sectorsAll: 'सभी क्षेत्र',
    language: 'भाषा',
    cta: 'डेमो बुक करें',
    contact: 'संपर्क',
    about: 'हमारे बारे में',
    support: 'सहायता',
    privacy: 'गोपनीयता नीति',
    terms: 'सेवा की शर्तें',
  },
  ur: {
    mainNav: 'مرکزی نیویگیشن',
    groupedMenu: 'مرکزی مینو',
    home: 'ہوم',
    sectorsMenuLabel: 'شعبے',
    solutionsMenuLabel: 'حل',
    capabilitiesMenuLabel: 'صلاحیتیں',
    keyCapabilities: 'اہم صلاحیتیں',
    companyMenuLabel: 'کمپنی',
    pricing: 'قیمتیں',
    resources: 'وسائل',
    sectorsAll: 'تمام شعبے',
    language: 'زبان',
    cta: 'ڈیمو بُک کریں',
    contact: 'رابطہ',
    about: 'ہمارے بارے میں',
    support: 'سپورٹ',
    privacy: 'رازداری کی پالیسی',
    terms: 'شرائط و ضوابط',
  },
}

const desktopLinkClass = 'rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chart-1/40'
const activeLinkClass = 'bg-secondary text-foreground shadow-sm'
const inactiveLinkClass = 'text-muted-foreground hover:bg-secondary hover:text-foreground'

function normalizePath(value: string) {
  return value.replace(/\/+$/, '') || '/'
}

export function SiteHeader() {
  const { lang, pathname, font, extra, isRTL, setLang, hrefForLanguage, languageOptions, pageMeta } = useLang()
  const ui = navUi[lang]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeDrop, setActiveDrop] = useState<DesktopGroup>(null)
  const [mobileGroup, setMobileGroup] = useState<MobileGroup>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const dropRef = useRef<HTMLDivElement | null>(null)
  const langRef = useRef<HTMLDivElement | null>(null)
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null)
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null)

  const currentLanguageMeta = languageOptions.find((item) => item.code === lang)
  const homeHref = buildLocalizedPath(lang)
  const allSectorsHref = buildLocalizedPath(lang, 'sectorsIndex')
  const pricingHref = resolveLocalizedHref('#pricing', lang, pathname)
  const requestHref = resolveLocalizedHref('#booking-cta', lang, pathname)
  const resourcesHref = buildLocalizedPath(lang, 'blog')
  const currentPage = getPageFromPath(pathname)

  const solutionLinks = useMemo(() => getSolutionLinks(lang, pageMeta), [lang, pageMeta])
  const sectorLinks = useMemo(() => getSectorLinks(lang, pageMeta), [lang, pageMeta])
  const capabilityLinks = useMemo(() => getCapabilityLinks(lang, pageMeta), [lang, pageMeta])

  // Company dropdown items: Resources (blog) → About → Contact → Support → Privacy → Terms
  const companyMenuItems = useMemo(() => [
    { label: ui.resources, summary: '', href: resourcesHref },
    { label: ui.about, summary: '', href: buildLocalizedPath(lang, 'about') },
    { label: ui.contact, summary: '', href: resolveLocalizedHref('#booking-cta', lang, pathname) },
    { label: ui.support, summary: '', href: buildLocalizedPath(lang, 'support') },
    { label: ui.privacy, summary: '', href: buildLocalizedPath(lang, 'privacy') },
    { label: ui.terms, summary: '', href: buildLocalizedPath(lang, 'terms') },
  ], [ui, resourcesHref, lang, pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    const onClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (dropRef.current && !dropRef.current.contains(target)) setActiveDrop(null)
      if (langRef.current && !langRef.current.contains(target)) setLangOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const html = document.documentElement
    const body = document.body
    const drawer = mobileDrawerRef.current
    const focusable = drawer?.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')

    if (!mobileOpen) return

    const scrollY = window.scrollY
    const previousStyles = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyInset: body.style.inset,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyTouchAction: body.style.touchAction,
      bodyPaddingRight: body.style.paddingRight,
    }

    const scrollbarCompensation = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.inset = '0'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.touchAction = 'none'
    if (scrollbarCompensation > 0) body.style.paddingRight = `${scrollbarCompensation}px`

    focusable?.[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (event.key !== 'Tab' || !drawer || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      html.style.overflow = previousStyles.htmlOverflow
      body.style.overflow = previousStyles.bodyOverflow
      body.style.position = previousStyles.bodyPosition
      body.style.inset = previousStyles.bodyInset
      body.style.top = previousStyles.bodyTop
      body.style.width = previousStyles.bodyWidth
      body.style.touchAction = previousStyles.bodyTouchAction
      body.style.paddingRight = previousStyles.bodyPaddingRight
      document.removeEventListener('keydown', onKeyDown)
      window.scrollTo(0, scrollY)
      mobileToggleRef.current?.focus()
    }
  }, [isMounted, mobileOpen])

  const isHrefCurrent = (href: string) => {
    const [pathOnly] = href.split('#')
    return normalizePath(pathOnly) === normalizePath(pathname)
  }

  const isHashSectionCurrent = (href: string) => {
    return currentPage === 'home' && href.includes('#')
  }

  const isResourcesCurrent = currentPage === 'blog'

  // Desktop nav order: Home | Solutions | Sectors | Capabilities | Pricing | Company
  const desktopNavItems = [
    { type: 'link' as const, label: ui.home, href: homeHref, active: currentPage === 'home' },
    { type: 'dropdown' as const, key: 'solutions' as const, label: ui.solutionsMenuLabel, active: solutionLinks.some((item) => isHrefCurrent(item.href)) },
    { type: 'dropdown' as const, key: 'sectors' as const, label: ui.sectorsMenuLabel, active: currentPage === 'sectorsIndex' || sectorLinks.some((item) => isHrefCurrent(item.href)) },
    { type: 'dropdown' as const, key: 'capabilities' as const, label: ui.capabilitiesMenuLabel, active: capabilityLinks.some((item) => isHrefCurrent(item.href)) },
    { type: 'link' as const, label: ui.pricing, href: pricingHref, active: isHashSectionCurrent(pricingHref) },
    { type: 'dropdown' as const, key: 'company' as const, label: ui.companyMenuLabel, active: isResourcesCurrent || currentPage === 'about' || currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'support' },
  ]

  // Mobile nav order: Home | Solutions | Sectors | Capabilities | Pricing | Company (resources inside)
  const mobilePrimaryItems = [
    { type: 'link' as const, key: 'home', label: ui.home, href: homeHref, active: currentPage === 'home' },
    { type: 'dropdown' as const, key: 'solutions' as const, label: ui.solutionsMenuLabel, active: solutionLinks.some((item) => isHrefCurrent(item.href)), items: solutionLinks },
    { type: 'dropdown' as const, key: 'sectors' as const, label: ui.sectorsMenuLabel, active: currentPage === 'sectorsIndex' || sectorLinks.some((item) => isHrefCurrent(item.href)), items: [...sectorLinks, { label: ui.sectorsAll, summary: '', href: allSectorsHref }] },
    { type: 'dropdown' as const, key: 'capabilities' as const, label: ui.capabilitiesMenuLabel, active: capabilityLinks.some((item) => isHrefCurrent(item.href)), items: capabilityLinks },
    { type: 'link' as const, key: 'pricing', label: ui.pricing, href: pricingHref, active: isHashSectionCurrent(pricingHref) },
    { type: 'dropdown' as const, key: 'company' as const, label: ui.companyMenuLabel, active: isResourcesCurrent || currentPage === 'about' || currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'support', items: companyMenuItems },
  ]

  const mobileDirectLinkClass = (active: boolean) =>
    `flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${active ? 'border-chart-1/30 bg-chart-1/5 text-foreground' : 'border-border bg-card text-foreground hover:bg-secondary'}`
  const mobileSectionButtonClass = (active: boolean) =>
    `flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${active ? 'border-chart-1/30 bg-chart-1/5 text-foreground' : 'border-border bg-card text-foreground hover:bg-secondary'}`

  const mobileMenuPortal =
    isMounted && mobileOpen
      ? createPortal(
          <div className="lg:hidden" aria-hidden={!mobileOpen}>
            <button
              type="button"
              className="fixed inset-0 z-[90] bg-foreground/50 backdrop-blur-sm"
              aria-label={extra.closeMenu}
              onClick={() => setMobileOpen(false)}
            />
            <div
              id="mobile-nav-drawer"
              ref={mobileDrawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={ui.groupedMenu}
              className={`fixed inset-y-0 z-[100] flex w-full flex-col bg-background shadow-2xl ${isRTL ? 'right-0' : 'left-0'}`}
              style={{
                paddingTop: 'max(env(safe-area-inset-top), 0px)',
                paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <a href={homeHref} className="flex items-center" onClick={() => setMobileOpen(false)}>
                  <img
                    src="/assets/images/logo_website.svg"
                    alt="DiwanSuite - ديوان سويت"
                    className="h-[38px] w-auto"
                    width={210}
                    height={48}
                  />
                </a>
                <button
                  type="button"
                  className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                  aria-label={extra.closeMenu}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile CTA */}
              <div className="border-b border-border px-5 py-4">
                <a
                  href={requestHref}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-chart-1 px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm"
                  style={{ fontFamily: font }}
                  onClick={() => {
                    setMobileOpen(false)
                    try {
                      sessionStorage.setItem('diwanCtaLabel', ui.cta)
                    } catch {
                      /* ignore */
                    }
                  }}
                >
                  <span>{ui.cta}</span>
                  <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                </a>
              </div>

              {/* Nav Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <nav className="space-y-2" aria-label={ui.mainNav}>
                  {mobilePrimaryItems.map((item) => {
                    if (item.type === 'link') {
                      return (
                        <a
                          key={item.key}
                          href={item.href}
                          className={mobileDirectLinkClass(item.active)}
                          style={{ fontFamily: font }}
                          onClick={() => setMobileOpen(false)}
                          aria-current={item.active ? 'page' : undefined}
                        >
                          <span>{item.label}</span>
                        </a>
                      )
                    }

                    const isOpen = mobileGroup === item.key
                    return (
                      <section key={item.key} className="space-y-2">
                        <button
                          type="button"
                          onClick={() => setMobileGroup((current) => (current === item.key ? null : item.key))}
                          className={mobileSectionButtonClass(item.active || isOpen)}
                          style={{ fontFamily: font }}
                          aria-expanded={isOpen}
                          aria-controls={`mobile-group-${item.key}`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div
                            id={`mobile-group-${item.key}`}
                            className="space-y-1 rounded-xl border border-border bg-secondary/30 px-3 py-2"
                          >
                            {item.items.map((child, childIdx) => {
                              if ('_heading' in child && child._heading) {
                                return (
                                  <div
                                    key={`heading-${childIdx}`}
                                    className="mt-2 px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"
                                    style={{ fontFamily: font }}
                                  >
                                    {child.label.replace(/^—\s*|\s*—$/g, '')}
                                  </div>
                                )
                              }
                              const active = isHrefCurrent(child.href)
                              return (
                                <a
                                  key={child.href}
                                  href={child.href}
                                  className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? 'bg-background text-foreground shadow-sm' : 'text-foreground hover:bg-background'}`}
                                  style={{ fontFamily: font }}
                                  onClick={() => setMobileOpen(false)}
                                  aria-current={active ? 'page' : undefined}
                                >
                                  <span className="font-medium">{child.label}</span>
                                </a>
                              )
                            })}
                          </div>
                        )}
                      </section>
                    )
                  })}
                </nav>

                {/* Language Section */}
                <section className="mt-6 space-y-2 border-t border-border pt-6" aria-label={ui.language}>
                  <div
                    className="px-1 text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    style={{ fontFamily: font }}
                  >
                    {ui.language}
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileGroup((current) => (current === 'languages' ? null : 'languages'))}
                    className={mobileSectionButtonClass(mobileGroup === 'languages')}
                    style={{ fontFamily: font }}
                    aria-expanded={mobileGroup === 'languages'}
                    aria-controls="mobile-group-languages"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>{currentLanguageMeta?.nativeName || ui.language}</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${mobileGroup === 'languages' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileGroup === 'languages' && (
                    <div
                      id="mobile-group-languages"
                      className="space-y-1 rounded-xl border border-border bg-secondary/30 px-3 py-2"
                    >
                      {languageOptions.map((meta) => {
                        const selected = meta.code === lang
                        return (
                          <a
                            key={meta.code}
                            href={hrefForLanguage(meta.code)}
                            onClick={(event) => {
                              event.preventDefault()
                              if (!selected) {
                                trackLanguageSwitch({ from: lang, to: meta.code })
                                setLang(meta.code)
                              }
                              setMobileOpen(false)
                              setMobileGroup(null)
                            }}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${selected ? 'bg-background text-foreground shadow-sm' : 'text-foreground hover:bg-background'}`}
                            style={{ direction: meta.dir === 'rtl' ? 'rtl' : 'ltr', fontFamily: meta.font }}
                            aria-current={selected ? 'true' : undefined}
                          >
                            <span>{meta.flag}</span>
                            <span className="flex-1">{meta.nativeName}</span>
                            {selected && (
                              <span className="text-[10px] font-bold uppercase tracking-wide text-chart-1">
                                {meta.code.toUpperCase()}
                              </span>
                            )}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm transition-all duration-200 ${scrolled ? 'border-b border-border shadow-sm' : 'border-b border-transparent'}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-3 lg:h-[72px] lg:gap-4">
          {/* Logo */}
          <a href={homeHref} className="flex shrink-0 items-center" aria-label={SITE_CONFIG.name}>
            <img
              src="/assets/images/logo_website.svg"
              alt="DiwanSuite - ديوان سويت"
              className="h-[42px] w-auto sm:h-[46px] lg:h-[48px]"
              width={210}
                    height={48}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <nav ref={dropRef} className="flex items-center gap-0.5" aria-label={ui.mainNav}>
              {desktopNavItems.map((item) => {
                if (item.type === 'link') {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`${desktopLinkClass} ${item.active ? activeLinkClass : inactiveLinkClass}`}
                      style={{ fontFamily: font }}
                      aria-current={item.active ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  )
                }

                const isOpen = activeDrop === item.key
                const menuItems =
                  item.key === 'solutions'
                    ? solutionLinks
                    : item.key === 'sectors'
                      ? [...sectorLinks, { label: ui.sectorsAll, summary: '', href: allSectorsHref }]
                      : item.key === 'company'
                        ? companyMenuItems
                        : capabilityLinks
                const isSectorMenu = item.key === 'sectors'

                return (
                  <div key={item.key} className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveDrop((current) => (current === item.key ? null : item.key))}
                      className={`${desktopLinkClass} inline-flex items-center gap-1.5 ${item.active || isOpen ? activeLinkClass : inactiveLinkClass}`}
                      style={{ fontFamily: font }}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      aria-controls={`desktop-${item.key}-menu`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div
                        id={`desktop-${item.key}-menu`}
                        className={`absolute top-full z-50 mt-2 rounded-xl border border-border bg-background p-2 shadow-xl ${isRTL ? 'right-0' : 'left-0'} ${isSectorMenu ? 'w-[min(40rem,90vw)]' : 'w-[min(26rem,88vw)]'}`}
                        role="menu"
                      >
                        <div className={`grid gap-1 ${isSectorMenu ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                          {menuItems.map((menuItem) => {
                            const active = isHrefCurrent(menuItem.href)
                            return (
                              <a
                                key={menuItem.href}
                                href={menuItem.href}
                                className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? 'bg-chart-1/5 text-foreground' : 'text-foreground hover:bg-secondary'}`}
                                style={{ fontFamily: font }}
                                onClick={() => setActiveDrop(null)}
                                role="menuitem"
                                aria-current={active ? 'page' : undefined}
                              >
                                <div className="font-medium">{menuItem.label}</div>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className={`hidden shrink-0 items-center gap-3 lg:flex ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((current) => !current)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                style={{ fontFamily: font }}
                aria-label={ui.language}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-controls="desktop-language-list"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLanguageMeta?.flag}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div
                  id="desktop-language-list"
                  className={`absolute top-full z-50 mt-2 w-52 rounded-xl border border-border bg-background p-2 shadow-xl ${isRTL ? 'left-0' : 'right-0'}`}
                  role="listbox"
                  aria-label={ui.language}
                >
                  {languageOptions.map((meta) => {
                    const selected = meta.code === lang
                    return (
                      <a
                        key={meta.code}
                        href={hrefForLanguage(meta.code)}
                        onClick={(event) => {
                          event.preventDefault()
                          if (!selected) {
                            trackLanguageSwitch({ from: lang, to: meta.code })
                            setLang(meta.code)
                          }
                          setLangOpen(false)
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${selected ? 'bg-secondary text-foreground' : 'text-foreground hover:bg-secondary'}`}
                        style={{ direction: meta.dir === 'rtl' ? 'rtl' : 'ltr', fontFamily: meta.font }}
                        role="option"
                        aria-selected={selected}
                      >
                        <span>{meta.flag}</span>
                        <span className="flex-1">{meta.nativeName}</span>
                        {selected && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-chart-1">
                            {lang.toUpperCase()}
                          </span>
                        )}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            <a
              href={requestHref}
              className="cta-btn inline-flex items-center gap-2 rounded-lg bg-chart-1 px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm"
              style={{ fontFamily: font }}
              onClick={() => {
                trackCtaClick({ location: 'header', label: ui.cta, lang })
                try {
                  sessionStorage.setItem('diwanCtaLabel', ui.cta)
                } catch {
                  /* ignore */
                }
              }}
            >
              <span>{ui.cta}</span>
              <ArrowRight className="h-4 w-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className={`flex items-center gap-2 lg:hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a
              href={requestHref}
              className="cta-btn shrink-0 whitespace-nowrap rounded-lg bg-chart-1 px-3 py-1.5 text-xs font-bold text-primary-foreground leading-snug"
              style={{ fontFamily: font }}
              onClick={() => {
                trackCtaClick({ location: 'header_mobile', label: ui.cta, lang })
                try {
                  sessionStorage.setItem('diwanCtaLabel', ui.cta)
                } catch {
                  /* ignore */
                }
              }}
            >
              {ui.cta}
            </a>
            <button
              ref={mobileToggleRef}
              type="button"
              className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={() => {
                setMobileOpen((current) => !current)
                setMobileGroup(null)
              }}
              aria-label={mobileOpen ? extra.closeMenu : extra.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuPortal}
    </header>
  )
}
