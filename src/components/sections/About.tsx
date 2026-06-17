import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { operatorAbout, operatorMetrics } from "@/data/operator";

export function About() {
  return (
    <section id="about" className="px-4 sm:px-8 py-20">
      <SectionHeading windowLabel="WINDOW.01" title="OPERATOR DOSSIER" />

      <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-6" stagger={0.15}>
        <div data-reveal-item>
        <TerminalWindow windowId="[WINDOW.01]" title="ABOUT">
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              <span className="text-accent-green font-bold">{"// DESIGNATION:"}</span>{" "}
              <span className="text-text-primary">{operatorAbout.designation}</span>
            </p>
            <p>
              <span className="text-accent-green font-bold">{"// ORIGIN:"}</span>{" "}
              <span className="text-text-primary">{operatorAbout.origin}</span>
            </p>
            <p>
              <span className="text-accent-green font-bold">{"// PHILOSOPHY:"}</span>{" "}
              <span className="text-text-primary">{operatorAbout.philosophy}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {operatorAbout.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border-bright text-text-dim text-[11px] px-2.5 py-1 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </TerminalWindow>
        </div>

        <div data-reveal-item>
        <TerminalWindow windowId="[WINDOW.01B]" title="METRICS" accent="cyan">
          <div className="grid grid-cols-2 gap-8">
            {operatorMetrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-4xl sm:text-5xl font-extrabold text-accent-yellow text-glow-green">
                  {metric.value}
                </p>
                <p className="text-[11px] text-text-dim tracking-widest mt-1 uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </TerminalWindow>
        </div>
      </RevealOnScroll>
    </section>
  );
}
