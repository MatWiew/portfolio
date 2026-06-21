"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS: [string, string][] = [
  ["hero", "Start"],
  ["offer", "Oferta"],
  ["projects", "Projekty"],
  ["contact", "Kontakt"],
];

export function Nav() {
  const [active, setActive] = useState("hero");

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const sections = LINKS.map(([id]) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-xl border-b border-white/[0.05]">
      <motion.span
        whileHover={{ letterSpacing: "0.3em" }}
        transition={{ duration: 0.3 }}
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-primary text-xs tracking-[0.2em] uppercase cursor-default"
      >
        &lt;mw.dev /&gt;
      </motion.span>

      <div className="hidden md:flex gap-8">
        {LINKS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{ fontFamily: "var(--font-mono)" }}
            className={`relative pb-1 text-[13px] uppercase tracking-[0.15em] transition-colors ${
              active === id ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            {label}
            {active === id && (
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
          <span className="relative w-2 h-2 rounded-full bg-primary" />
        </span>
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[12px] text-primary/60 tracking-wider"
        >
          dostępny do pracy
        </span>
      </div>
    </nav>
  );
}
