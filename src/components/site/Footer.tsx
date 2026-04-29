import { SITE_CONFIG } from '@/lib/site-config'
import { useLang } from '@/contexts/LanguageContext'
import { buildLocalizedPath, resolveLocalizedHref } from '@/lib/routing'
import { getIndustryLinks, getPlatformLinks, getSectorLinks, getSolutionLinks } from '@/lib/page-links'

const footerLogoAlt: Record<string, string> = {
  ar: 'شعار ديوان سويت الأبيض',
  en: 'DiwanSuite white logo',
  hi: 'DiwanSuite सफ़ेद लोगो',
  ur: 'DiwanSuite سفید لوگو',
}

export function SiteFooter() {
  const { lang, t, font, pathname, pageMeta } = useLang()
  const solutionLinks = [...getSolutionLinks(lang, pageMeta), ...getPlatformLinks(lang, pageMeta)]
  const sectorLinks = [...getSectorLinks(lang, pageMeta), ...getIndustryLinks(lang, pageMeta), { label: lang === 'ar' ? 'جميع القطاعات' : lang === 'hi' ? 'सभी क्षेत्र' : lang === 'ur' ? 'تمام شعبے' : 'All sectors', href: buildLocalizedPath(lang, 'sectorsIndex') }]
  const resourcesLabel = { ar: 'مركز الموارد', en: 'Resources', hi: 'संसाधन', ur: 'وسائل' }[lang] ?? 'Resources'
  const aboutLabel = { ar: 'من نحن', en: 'About', hi: 'हमारे बारे में', ur: 'ہمارے بارے میں' }[lang] ?? 'About'
  const contactLabel = { ar: 'تواصل معنا', en: 'Contact', hi: 'संपर्क', ur: 'رابطہ' }[lang] ?? 'Contact'
  const privacyLabel = { ar: 'سياسة الخصوصية', en: 'Privacy Policy', hi: 'गोपनीयता नीति', ur: 'رازداری کی پالیسی' }[lang] ?? 'Privacy Policy'
  const termsLabel = { ar: 'الشروط والأحكام', en: 'Terms of Service', hi: 'सेवा की शर्तें', ur: 'شرائط و ضوابط' }[lang] ?? 'Terms of Service'
  const supportLabel = { ar: 'الدعم', en: 'Support', hi: 'सहायता', ur: 'سپورٹ' }[lang] ?? 'Support'
  const pricingHref = resolveLocalizedHref('#pricing', lang, pathname)
  const companyLinks = [
    { label: resourcesLabel, href: buildLocalizedPath(lang, 'blog') },
    { label: t.nav.pricing, href: pricingHref },
    { label: aboutLabel, href: buildLocalizedPath(lang, 'about') },
    { label: contactLabel, href: resolveLocalizedHref('#booking-cta', lang, pathname) },
    { label: supportLabel, href: buildLocalizedPath(lang, 'support') },
    { label: privacyLabel, href: buildLocalizedPath(lang, 'privacy') },
    { label: termsLabel, href: buildLocalizedPath(lang, 'terms') },
  ]

  const footerUiMap: Record<string, { industries: string; company: string }> = {
    ar: { industries: 'القطاعات والسيناريوهات', company: 'الشركة' },
    en: { industries: 'Sectors & Scenarios', company: 'Company' },
    hi: { industries: 'क्षेत्र और परिदृश्य', company: 'कंपनी' },
    ur: { industries: 'شعبے اور منظرنامے', company: 'کمپنی' },
  }
  const footerUi = footerUiMap[lang] ?? footerUiMap.ar

  const footerLinkClass = 'text-base font-semibold leading-7 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'

  return (
    <footer className="border-t border-white/10 bg-foreground py-16 text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
          <div>
            <a href={buildLocalizedPath(lang)} className="mb-5 inline-flex items-center" aria-label={SITE_CONFIG.name}>
              <img
                src="/assets/images/logo_website_white.svg"
                alt={footerLogoAlt[lang] ?? footerLogoAlt.ar}
                className="h-12 w-auto max-w-[230px] object-contain"
                width={230}
                height={53}
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="max-w-sm text-base leading-8 text-white/75" style={{ fontFamily: font }}>{t.footer.desc}</p>
          </div>

          <div>
            <h4 className="mb-4 text-base font-extrabold text-white" style={{ fontFamily: font }}>{t.footer.productTitle}</h4>
            <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
              {solutionLinks.map((link) => (
                <li key={link.href}><a href={link.href} className={footerLinkClass} style={{ fontFamily: font }}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-extrabold text-white" style={{ fontFamily: font }}>{footerUi.industries}</h4>
            <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
              {sectorLinks.map((link) => (
                <li key={link.href}><a href={link.href} className={footerLinkClass} style={{ fontFamily: font }}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-extrabold text-white" style={{ fontFamily: font }}>{footerUi.company}</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}><a href={link.href} className={footerLinkClass} style={{ fontFamily: font }}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-8">
          <p className="text-center text-sm font-medium text-white/70" style={{ fontFamily: font }}>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
