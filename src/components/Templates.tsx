"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Monitor, Tablet, Smartphone } from "lucide-react";
import type { TemplateMeta } from "@/app/api/templates/route";

type Device = "desktop" | "tablet" | "mobile";
const DEVICE_W: Record<Device, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};
const DEVICE_LABEL: Record<Device, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};

export function Templates() {
  const [templates, setTemplates] = useState<TemplateMeta[] | null>(null);
  const [activeTpl, setActiveTpl] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [device, setDevice] = useState<Device>("desktop");

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then((data) => setTemplates(data.templates ?? []))
      .catch(() => setTemplates([]));
  }, []);

  const active = templates?.[activeTpl];

  return (
    <section id="templates" className="py-28 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[13px] tracking-[0.2em] text-primary uppercase mb-4"
            >
              {"// 01 — Podgląd na Żywo"}
            </p>
            <h2
              style={{ fontFamily: "var(--font-display)", lineHeight: 0.9 }}
              className="text-5xl md:text-7xl font-black tracking-tighter"
            >
              Szablony
              <br />
              MERN
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
            Gotowe do produkcji startery full-stack. Uruchom podgląd na żywo i
            testuj responsywność na różnych urządzeniach.
          </p>
        </motion.div>

        {templates === null ? (
          <TemplatesSkeleton />
        ) : templates.length === 0 ? (
          <EmptyTemplates />
        ) : (
          <>
            {/* Zakładki */}
            <div className="flex gap-3 mb-6 flex-wrap">
              {templates.map((t, i) => (
                <button
                  key={t.slug}
                  onClick={() => setActiveTpl(i)}
                  className={`flex items-center gap-3 text-left px-5 py-3 rounded-xl border transition-all duration-300 ${
                    activeTpl === i
                      ? "border-primary/40 bg-primary/5 shadow-[0_0_20px_rgba(0,212,255,0.08)]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: activeTpl === i ? t.accent : "#333" }}
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {t.name}
                  </span>
                </button>
              ))}
            </div>

            {/* ZMIANA TUTAJ: Dodano 'hidden md:flex' w klasach kontenera */}
            {/* Przełącznik urządzeń */}
            <div className="hidden md:flex items-center gap-2 mb-5">
              {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
                const Icon =
                  d === "desktop"
                    ? Monitor
                    : d === "tablet"
                      ? Tablet
                      : Smartphone;
                return (
                  <button
                    key={d}
                    onClick={() => setDevice(d)}
                    style={{ fontFamily: "var(--font-mono)" }}
                    className={`flex items-center gap-1.5 text-[13px] uppercase tracking-widest px-4 py-2 rounded-lg border transition-all ${
                      device === d
                        ? "border-primary/50 text-primary bg-primary/10"
                        : "border-white/[0.08] text-muted-foreground hover:border-white/20"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {DEVICE_LABEL[d]}
                  </button>
                );
              })}
            </div>

            {/* Ramka z podglądem */}
            <div className="bg-white/[0.02] rounded-2xl border border-white/[0.07] overflow-hidden p-5">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="ml-3 flex-1 bg-white/[0.04] rounded-md px-4 py-1.5 text-[13px] text-muted-foreground truncate"
                >
                  {loaded[activeTpl]
                    ? `mateuszwiewiora.pl/templates/${active?.slug}`
                    : "— kliknij aby uruchomić —"}
                </div>
              </div>

              <div className="flex justify-center overflow-x-auto">
                <motion.div
                  animate={{ width: DEVICE_W[device] }}
                  transition={{ type: "spring", stiffness: 180, damping: 28 }}
                  className="relative rounded-xl overflow-hidden bg-black/30"
                  style={{ minHeight: 460, flexShrink: 0 }}
                >
                  {!loaded[activeTpl] ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-8">
                      <div className="w-full space-y-3 opacity-20 pointer-events-none">
                        <div className="h-8 bg-primary/30 rounded-lg w-2/3" />
                        <div className="h-3 bg-white/20 rounded w-1/2" />
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          {[1, 2, 3].map((n) => (
                            <div
                              key={n}
                              className="h-24 bg-white/10 rounded-xl"
                            />
                          ))}
                        </div>
                        <div className="h-40 bg-white/5 rounded-xl" />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setLoaded((p) => ({ ...p, [activeTpl]: true }))
                        }
                        disabled={!active?.hasPreview}
                        style={{ fontFamily: "var(--font-mono)" }}
                        className="flex items-center gap-2 bg-primary text-black text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_30px_rgba(0,212,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {active?.hasPreview
                          ? "Uruchom podgląd na żywo"
                          : "Brak podglądu"}
                      </motion.button>
                      <p className="text-muted-foreground text-xs">
                        Podgląd ładuje się w izolowanym iframe
                      </p>
                    </div>
                  ) : (
                    <iframe
                      key={device}
                      src={`/api/templates/${active?.slug}/preview`}
                      className="w-full border-0"
                      style={{ height: 460 }}
                      title={active?.name}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  )}
                </motion.div>
              </div>

              {active && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">
                        {active.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                        {active.desc}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-shrink-0">
                      {active.tech.map((t, i) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          style={{
                            fontFamily: "var(--font-mono)",
                            borderColor: active.accent + "44",
                            color: active.accent,
                          }}
                          className="text-[13px] px-3 py-1 rounded-full border"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function TemplatesSkeleton() {
  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.07] p-5 animate-pulse">
      <div className="flex gap-3 mb-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-11 w-44 bg-white/[0.04] rounded-xl" />
        ))}
      </div>
      <div className="h-[460px] bg-white/[0.03] rounded-xl" />
    </div>
  );
}

function EmptyTemplates() {
  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.07] p-12 text-center">
      <p className="text-muted-foreground text-sm">
        Brak szablonów do wyświetlenia. Dodaj podfolder z plikiem{" "}
        <code className="text-primary/80 font-mono">meta.json</code> do katalogu{" "}
        <code className="text-primary/80 font-mono">/templates</code>.
      </p>
    </div>
  );
}