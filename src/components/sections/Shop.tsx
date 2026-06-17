"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TerminalButton } from "@/components/ui/TerminalButton";
import { TemplatePreviewModal } from "@/components/sections/TemplatePreviewModal";
import { templates } from "@/data/templates";
import { Template, TemplateCategory } from "@/types/content";

const FILTERS: Array<TemplateCategory | "ALL"> = [
  "ALL",
  "E-commerce",
  "Korporacyjna",
  "Portfolio",
  "Booking",
  "SaaS",
  "Landing",
];

export function Shop() {
  const [activeFilter, setActiveFilter] = useState<TemplateCategory | "ALL">(
    "ALL"
  );
  const [notifyState, setNotifyState] = useState<"idle" | "submitted">("idle");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(
    null
  );

  const filtered = useMemo(() => {
    if (activeFilter === "ALL") return templates;
    return templates.filter((t) => t.category === activeFilter);
  }, [activeFilter]);

  const handleNotify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder: wire up to a real subscriber list (e.g. Resend Audiences,
    // Buttondown, or a simple DB table) once the templates ship.
    setNotifyState("submitted");
  };

  return (
    <section id="shop" className="px-4 sm:px-8 py-20">
      <SectionHeading windowLabel="WINDOW.05" title="TEMPLATE ARMORY" />

      <RevealOnScroll>
        <div data-reveal-item>
          <TerminalWindow windowId="[WINDOW.05]" title="AVAILABLE BUILDS" accent="cyan">
            <p className="text-sm text-text-dim mb-6 leading-relaxed">
              Gotowe systemy startowe — e-commerce, strony korporacyjne,
              portfolio, rezerwacje, SaaS. Każdy szablon przechodzi pełny
              audyt wydajności przed publikacją. Pierwsze premiery wkrótce.
            </p>

            {/* Category filter — quick browse system */}
            <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filtruj szablony">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 border transition-colors duration-150 ${
                    activeFilter === filter
                      ? "border-accent-cyan text-accent-cyan shadow-glow-cyan"
                      : "border-border-bright text-text-dim hover:text-text-primary"
                  }`}
                >
                  {filter === "ALL" ? "WSZYSTKIE" : filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-[140px]">
              {filtered.map((tpl) => (
                <div
                  key={tpl.id}
                  className="border border-border-dim p-4 flex flex-col gap-3 relative"
                >
                  {!tpl.available && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest text-accent-yellow border border-accent-yellow px-2 py-0.5 animate-pulse">
                      SOON
                    </span>
                  )}
                  <span className="text-[11px] text-accent-cyan tracking-widest">
                    {tpl.category.toUpperCase()}
                  </span>
                  <h3 className="text-base font-bold text-text-primary">{tpl.name}</h3>
                  <p className="text-xs text-text-dim leading-relaxed">{tpl.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tpl.deliveryStack.map((stack) => (
                      <span
                        key={stack}
                        className="text-[10px] text-text-dim border border-border-dim px-1.5 py-0.5"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>

                  {tpl.available && tpl.previewUrl ? (
                    <TerminalButton
                      variant="ghost"
                      className="mt-auto w-full"
                      onClick={() => setPreviewTemplate(tpl)}
                    >
                      LIVE PREVIEW
                    </TerminalButton>
                  ) : (
                    <div className="mt-auto" />
                  )}
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="text-sm text-text-dim col-span-full text-center py-8">
                  Brak szablonów w tej kategorii — jeszcze.
                </p>
              )}
            </div>

            {/* Notify-me CTA */}
            <div className="mt-6 border border-border-dim p-4 sm:p-5">
              {notifyState === "submitted" ? (
                <p className="text-sm text-accent-green text-glow-green text-center py-1">
                  {"// SUBSCRIBED — powiadomię Cię przy premierze."}
                </p>
              ) : (
                <form
                  onSubmit={handleNotify}
                  className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
                >
                  <label htmlFor="notify-email" className="text-xs text-text-dim tracking-wider shrink-0">
                    &gt;_ Powiadom mnie o premierze:
                  </label>
                  <input
                    id="notify-email"
                    type="email"
                    required
                    placeholder="twoj@email.com"
                    className="flex-1 bg-transparent border-b border-border-bright pb-1.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent-green min-w-0"
                  />
                  <TerminalButton type="submit" variant="ghost" className="shrink-0">
                    SUBSCRIBE
                  </TerminalButton>
                </form>
              )}
            </div>
          </TerminalWindow>
        </div>
      </RevealOnScroll>

      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </section>
  );
}
