"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, Wallet, Banknote, Plus } from "lucide-react";
import { FAQ_CATEGORIES, type FaqItem } from "@/data/faq";

const ICONS = { Clock, Sparkles, Wallet, Banknote } as const;

export function Faq() {
  const [activeCat, setActiveCat] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const category = FAQ_CATEGORIES[activeCat];

  return (
    <section id="faq" className="py-28 px-6 md:px-16 relative overflow-hidden">
      <motion.div
        animate={{ x: [0, -35, 25, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-accent/[0.04] blur-[130px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[13px] tracking-[0.2em] text-primary uppercase mb-4"
          >
            {"// 03 — Pytania i odpowiedzi"}
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)", lineHeight: 0.9 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            Często zadawane
            <br />
            pytania
          </h2>
        </motion.div>

        {/* Zakładki kategorii */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {FAQ_CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.icon];
            const isActive = activeCat === i;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCat(i);
                  setOpenIndex(0);
                }}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full border text-[13px] font-medium transition-colors duration-300 ${
                  isActive
                    ? "border-primary/50 text-primary"
                    : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground/80"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="faq-cat-highlight"
                    className="absolute inset-0 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative w-3.5 h-3.5" />
                <span className="relative" style={{ fontFamily: "var(--font-mono)" }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Lista pytań aktywnej kategorii */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {category.items.map((item, i) => (
              <FaqRow
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  // Odpowiedzi z listą numerowaną (proces współpracy) mają puste linie
  // oddzielające punkty "1. ... 2. ..." — rozbijamy to na akapity, żeby
  // wyglądało jak czytelna lista, a nie jeden zbity blok tekstu.
  const paragraphs = item.a.split("\n").filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
        isOpen ? "border-primary/35 bg-primary/[0.03]" : "border-white/[0.07] bg-white/[0.02]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-7 py-5"
      >
        <span
          style={{ fontFamily: "var(--font-display)" }}
          className="text-[15px] md:text-base font-bold text-foreground"
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
            isOpen ? "border-primary/50 text-primary" : "border-white/15 text-muted-foreground"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-400 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-7 pb-6 pt-0">
            {paragraphs.map((p, pi) => (
              <motion.p
                key={pi}
                initial={{ opacity: 0, y: -6 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ delay: pi * 0.05, duration: 0.3 }}
                className={`text-[13.5px] text-muted-foreground leading-relaxed ${
                  pi > 0 ? "mt-2.5" : ""
                }`}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
