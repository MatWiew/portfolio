"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShoppingCart,
  Rocket,
  Building2,
  LayoutGrid,
  ArrowRight,
  Check,
} from "lucide-react";
import { OFFER, type OfferItem } from "@/data/offer";
import { useContactPrefill } from "./ContactPrefillContext";
import { trackCardInteraction, trackCTAClick } from "./Analytics";

const ICONS = {
  Sparkles,
  ShoppingCart,
  Rocket,
  Building2,
  LayoutGrid,
} as const;

export function Offer() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { requestContact } = useContactPrefill();

  const handleAsk = (item: OfferItem) => {
    trackCTAClick("offer", `Zapytaj o ${item.title}`, { id: item.id, title: item.title });
    requestContact(item.topic, item.prefillMessage);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggle = (item: OfferItem, isOpen: boolean) => {
    const action = isOpen ? "collapse" : "expand";
    trackCardInteraction("offer", action, { id: item.id, title: item.title });
  };

  return (
    <section id="offer" className="py-28 px-6 md:px-16 relative overflow-hidden">
      {/* Delikatne, wolno dryfujące tło sekcji */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[440px] h-[440px] rounded-full bg-primary/[0.035] blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative">
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
            {"// 01 — Moja Oferta"}
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)", lineHeight: 0.9 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            Czym się
            <br />
            zajmuję
          </h2>
        </motion.div>

        {/* Dodano items-start, żeby karty obok zachowały swoją wysokość przy rozwijaniu sąsiada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {OFFER.map((item, i) => (
            <OfferCard
              key={item.id}
              item={item}
              index={i}
              isOpen={openId === item.id}
              onToggle={() => {
                handleToggle(item, openId === item.id);
                setOpenId((prev) => (prev === item.id ? null : item.id));
              }}
              onAsk={() => handleAsk(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferCard({
  item,
  index,
  isOpen,
  onToggle,
  onAsk,
}: {
  item: OfferItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onAsk: () => void;
}) {
  const Icon = ICONS[item.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={onToggle}
      whileHover={{ y: -4 }}
      className={`group relative cursor-pointer rounded-2xl border overflow-hidden transition-colors duration-300 ${
        isOpen ? "border-primary/40" : "border-white/[0.07] md:hover:border-white/15"
      }`}
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div
        className={`absolute inset-0 bg-primary/[0.04] pointer-events-none transition-opacity duration-300 md:group-hover:opacity-100 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-5">
          <motion.div
            animate={{
              rotate: isOpen ? 8 : 0,
              scale: isOpen ? 1.08 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary md:group-hover:bg-primary/15 transition-colors"
          >
            <Icon className="w-5 h-5" />
          </motion.div>

          <div
            className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground md:group-hover:border-primary/30 md:group-hover:text-primary transition-all flex-shrink-0 duration-300 ${
              isOpen ? "rotate-45 border-primary/30 text-primary" : "rotate-0"
            } md:group-hover:rotate-45`}
          >
            <span className="text-lg leading-none">+</span>
          </div>
        </div>

        <h3
          style={{ fontFamily: "var(--font-display)" }}
          className="text-xl font-bold text-foreground mb-2"
        >
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.shortDesc}</p>

        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] md:group-hover:grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-5 mt-5 border-t border-white/[0.07]">
              <p className="text-[13px] text-muted-foreground/90 leading-relaxed mb-4">
                {item.longDesc}
              </p>
              
              <ul className="space-y-2 mb-5">
                {item.bullets.map((b, bi) => (
                  <motion.li
                    key={b}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    animate={isOpen ? "visible" : "hidden"}
                    className="flex items-center gap-2 text-[13px] text-foreground/75 md:!opacity-100 md:!transform-none"
                    style={{ transitionDelay: `${bi * 0.04}s` }}
                  >
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {b}
                  </motion.li>
                ))}
              </ul>

              {/* Sekcja ceny: minimalistyczny i czytelny układ nad przyciskiem */}
              <div className="mb-4 pt-2 flex items-baseline justify-between border-t border-white/[0.04]">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Inwestycja</span>
                <span 
                  style={{ fontFamily: "var(--font-mono)" }} 
                  className="text-base font-bold text-primary"
                >
                  {item.price}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAsk();
                }}
                style={{ fontFamily: "var(--font-mono)" }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-black text-xs font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Zapytaj o {item.title.toLowerCase()}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left transition-transform duration-400 ${
          isOpen ? "scale-x-100" : "scale-x-0 md:group-hover:scale-x-100"
        }`}
      />
    </motion.div>
  );
}