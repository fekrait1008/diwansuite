import { Database, Eye, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { useReveal } from '../../hooks/use-reveal';
import { Badge } from '../ui/badge';

const pillarIcons = [Database, Eye, ShieldCheck, Cpu];

export function SiteValueProposition() {
  const { t, isRTL, font } = useLang();
  const ref = useReveal();

  return (
    <section
      id="value-proposition"
      ref={ref}
      className="section-reveal py-12 lg:py-16 bg-secondary/30"
      aria-labelledby="value-proposition-heading"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest bg-chart-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t.valueProposition.badge}
          </Badge>
          <h2
            id="value-proposition-heading"
            className="font-extrabold mb-4"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              lineHeight: 1.15,
              fontFamily: font,
            }}
          >
            {t.valueProposition.heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12" style={{ fontFamily: font }}>
            {t.valueProposition.answerParagraph}
          </p>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {t.valueProposition.lifecycle.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="px-5 py-3 bg-background border border-border rounded-xl text-sm font-semibold" style={{ fontFamily: font }}>
                  {item}
                </div>
                {index < t.valueProposition.lifecycle.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.valueProposition.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <div
                key={index}
                className="enterprise-card rounded-2xl p-5 bg-background border border-border"
              >
                <div className="w-9 h-9 rounded-xl bg-chart-1/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-chart-1" />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: font }}>
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: font }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
