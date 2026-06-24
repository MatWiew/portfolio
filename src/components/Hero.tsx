"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { ParticleCanvas } from "./ParticleCanvas";
import { useScramble } from "./useScramble";
import { GlitchText } from "./GlitchText";
import { SKILLS } from "@/data/skills";
import { trackCTAClick } from "./Analytics";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const h1 = useScramble("MATEUSZ", 300);
  const h2 = useScramble("WIEWIÓRA", 800);
  const h3 = useScramble("Full-Stack MERN Developer", 1400);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <ParticleCanvas />

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full bg-accent/[0.05] blur-[110px] pointer-events-none"
      />

      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.25em] text-primary/70 uppercase border border-primary/20 rounded-full px-5 py-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Dostępny — Freelance 2026
          </span>
        </motion.div>

        <h1
          style={{ fontFamily: "var(--font-display)", lineHeight: 0.88 }}
          className="text-[clamp(3.4rem,11vw,9rem)] font-black tracking-tighter mb-6 select-none"
        >
          <span className="block text-foreground">
            {h1 === "MATEUSZ" ? (
              <GlitchText text={h1} startDelay={600} />
            ) : (
              h1 || "\u00A0"
            )}
          </span>
          <span className="block" style={{ color: "#00d4ff" }}>
            {h2 === "WIEWIÓRA" ? (
              <GlitchText text={h2} startDelay={1100} />
            ) : (
              h2 || "\u00A0"
            )}
          </span>
          <span
            className="block text-muted-foreground/50 font-light"
            style={{
              fontSize: "clamp(1.1rem,2.8vw,2.4rem)",
              fontFamily: "var(--font-sans)",
              marginTop: "0.5em",
              letterSpacing: "0.02em",
            }}
          >
            {h3 || "\u00A0"}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-muted-foreground max-w-lg mx-auto mb-10 text-base leading-relaxed"
        >
          Tworzę skalowalne aplikacje webowe — od koncepcji po wdrożenie. React, Node.js, Express
          &amp; MongoDB z naciskiem na wydajność i doświadczenie użytkownika.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              trackCTAClick("hero", "projects");
              scrollTo("projects");
            }}
            className="group flex items-center gap-2 bg-primary text-black text-sm font-bold tracking-wider uppercase px-8 py-4 rounded-full hover:bg-primary/90 transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Zobacz moje prace
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              trackCTAClick("hero", "contact");
              scrollTo("contact");
            }}
            className="text-sm uppercase tracking-wider text-muted-foreground border border-white/10 px-8 py-4 rounded-full hover:border-primary/40 hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Zatrudnij mnie
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3 }}
        className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl w-full"
      >
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 + i * 0.1, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,212,255,0.08)] transition-colors group"
          >
            <p
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors mb-1"
            >
              {s.label}
            </p>
            <p className="text-[13px] text-foreground/70 leading-relaxed">{s.items}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/30 cursor-pointer"
        onClick={() => scrollTo("projects")}
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
