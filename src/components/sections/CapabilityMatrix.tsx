import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { capabilityGroups } from "@/data/operator";

export function CapabilityMatrix() {
  return (
    <section id="capabilities" className="px-4 sm:px-8 py-20">
      <SectionHeading windowLabel="WINDOW.02" title="CAPABILITY MATRIX" />

      <RevealOnScroll className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
        {capabilityGroups.map((group) => (
          <div key={group.id} data-reveal-item>
            <TerminalWindow windowId={`[${group.id}]`} title={group.title}>
              <div className="space-y-5">
                {group.items.map((item) => (
                  <ProgressBar key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </TerminalWindow>
          </div>
        ))}
      </RevealOnScroll>
    </section>
  );
}
