import { useLang } from "../../contexts/LanguageContext";
import { useReveal } from "../../hooks/use-reveal";
import { SectionLinks } from "@/components/site/SectionLinks";
import { getPageTitle } from "@/lib/page-links";
import { buildLocalizedPath } from "@/lib/routing";
import { FileText, Users, Target, ChartBar as BarChart3, ShieldCheck, LayoutDashboard } from "lucide-react";

export function SiteReports() {
  const { t, lang, font, pageMeta, homePhase4 } = useLang();
  const ref = useReveal();

  const icons = [FileText, Users, Target, BarChart3, ShieldCheck, LayoutDashboard];

  return (
    <section
      ref={ref}
      id="reports"
      className="section-reveal py-12 lg:py-16 bg-secondary/30"
      aria-labelledby="reports-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="mb-4">
            <span
              className="text-xs font-bold uppercase tracking-widest text-chart-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t.reports.badge}
            </span>
          </div>
          <h2
            id="reports-heading"
            className="font-extrabold mb-5"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.15,
              fontFamily: font,
            }}
          >
            {t.reports.heading}
          </h2>
          <p
            className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-14"
            style={{ fontFamily: font }}
          >
            {t.reports.answerParagraph}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.reports.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="enterprise-card rounded-2xl p-7 bg-background border border-border"
              >
                <div className="w-11 h-11 rounded-xl bg-chart-1/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-chart-1" />
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: font }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: font }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <SectionLinks
          title={homePhase4.links.platform}
          items={[
            { label: getPageTitle(pageMeta, 'governanceReportsDashboards'), href: buildLocalizedPath(lang, 'governanceReportsDashboards') },
            { label: getPageTitle(pageMeta, 'roiBoardGovernance'), href: buildLocalizedPath(lang, 'roiBoardGovernance') },
            { label: getPageTitle(pageMeta, 'decisionTracking'), href: buildLocalizedPath(lang, 'decisionTracking') },
            { label: getPageTitle(pageMeta, 'implementationSupportTraining'), href: buildLocalizedPath(lang, 'implementationSupportTraining') },
          ]}
        />

      </div>
    </section>
  );
}
