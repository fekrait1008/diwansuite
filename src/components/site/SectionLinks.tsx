import { ArrowRight } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

export function SectionLinks({ title, items }: { title: string; items: Array<{ label: string; href: string }> }) {
  const { font, isRTL } = useLang()
  if (!items.length) return null

  return (
    <div className="mt-10 rounded-2xl border border-border bg-background/60 p-4 shadow-sm">
      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-chart-1" style={{ fontFamily: "'Inter', sans-serif" }}>
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <a
            key={item.href + item.label}
            href={item.href}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
            style={{ fontFamily: font }}
          >
            <span>{item.label}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </a>
        ))}
      </div>
    </div>
  )
}
