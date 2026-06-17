import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ContactForm } from "@/components/sections/ContactForm";

const channels = [
  { label: "EMAIL", value: "m@wiewiora.dev" },
  { label: "GITHUB", value: "github.com/mwiewiora" },
  { label: "LINKEDIN", value: "in/mwiewiora" },
];

export function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-8 py-20">
      <SectionHeading windowLabel="WINDOW.06" title="CONTACT CHANNEL" />

      <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-6" stagger={0.15}>
        <div data-reveal-item>
          <TerminalWindow windowId="[WINDOW.06]" title="ESTABLISH CONTACT CHANNEL">
            <ContactForm />
          </TerminalWindow>
        </div>

        <div data-reveal-item>
          <TerminalWindow windowId="[WND.06B]" title="CHANNELS" accent="cyan">
            <div className="divide-y divide-border-dim">
              {channels.map((channel) => (
                <div key={channel.label} className="py-4 first:pt-0">
                  <p className="text-[11px] text-text-dim tracking-widest mb-1">
                    {channel.label}
                  </p>
                  <p className="text-sm text-accent-green">→ {channel.value}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-text-faint mt-6 tracking-widest">
              Response time: &lt;24h
            </p>
          </TerminalWindow>
        </div>
      </RevealOnScroll>
    </section>
  );
}
