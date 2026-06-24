"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./GitHubIcon";
import { MagneticBtn } from "./MagneticBtn";
import { TiltCard } from "./TiltCard";
import { PROJECTS } from "@/data/projects";
import { trackCardInteraction } from "./Analytics";

export function Projects() {
  // Na urządzeniach dotykowych nie ma stanu hover, więc kliknięcie w kartę
  // samo w sobie pełni rolę "rozwinięcia" opisu — działa jak przełącznik
  // (tap ponownie zwija). Na desktopie hover nadal działa jak wcześniej,
  // niezależnie od tego stanu.
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[13px] tracking-[0.2em] text-primary uppercase mb-4"
          >
            {"// 02 — Wybrane Realizacje"}
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)", lineHeight: 0.9 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            Projekty
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => {
            const isOpen = expandedId === p.id;
            return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={p.span ?? ""}
            >
            <TiltCard
              onClick={() => {
                trackCardInteraction("project", isOpen ? "collapse" : "expand", { id: p.id, title: p.title });
                setExpandedId(isOpen ? null : p.id);
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] cursor-pointer"
              style={{ minHeight: p.tall ? 340 : 240 }}
            >
              {p.image ? (
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 ${isOpen ? "scale-105" : ""}`}
                  style={{ backgroundImage: `url(${p.image})` }}
                />
              ) : (
                <NoImageBackdrop seed={p.id} />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/10" />
              <div className={`absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500 ${isOpen ? "bg-primary/[0.03]" : ""}`} />

              <div className="relative z-10 flex flex-col justify-end h-full p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="text-[12px] px-2 py-0.5 bg-black/60 border border-white/15 rounded-full text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl font-bold text-white mb-2"
                >
                  {p.title}
                </h3>
                <p className={`text-sm text-white/50 leading-relaxed overflow-hidden transition-all duration-500 group-hover:max-h-28 ${isOpen ? "max-h-28" : "max-h-0"}`}>
                  {p.desc}
                </p>
                <div className={`flex gap-3 mt-4 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                  {p.github && (
                    <MagneticBtn
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        trackCardInteraction("project", "link_click", { id: p.id, title: p.title, type: "github" });
                      }}
                      className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-2 text-white transition-colors"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span style={{ fontFamily: "var(--font-mono)" }}>GitHub</span>
                    </MagneticBtn>
                  )}
                  {p.link && (
                    <MagneticBtn
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        trackCardInteraction("project", "link_click", { id: p.id, title: p.title, type: "live" });
                      }}
                      className="flex items-center gap-1.5 text-xs bg-primary hover:bg-primary/90 rounded-full px-4 py-2 text-black font-bold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span style={{ fontFamily: "var(--font-mono)" }}>Zobacz</span>
                    </MagneticBtn>
                  )}
                  {!p.github && !p.link && (
                    <span
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="flex items-center gap-1.5 text-xs bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-white/40"
                    >
                      Projekt prywatny
                    </span>
                  )}
                </div>
              </div>
            </TiltCard>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Tło zastępcze dla projektów bez zdjęcia — deterministyczny gradient +
 * subtelny wzór linii, generowany na podstawie ID projektu, by każda
 * karta bez obrazka wyglądała inaczej, ale spójnie z resztą designu.
 */
function NoImageBackdrop({ seed }: { seed: number }) {
  const palettes = [
    ["#00d4ff", "#0a1622"],
    ["#7c3aed", "#130a22"],
    ["#00ff87", "#06160f"],
  ];
  const [accent, base] = palettes[seed % palettes.length];

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${accent}22, transparent 55%), linear-gradient(160deg, ${base}, #07090f 80%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
