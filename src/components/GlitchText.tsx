"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Opakowuje już-wyrenderowany (statyczny) tekst i co jakiś czas wywołuje
 * krótki, cyfrowy "glitch": chromatic aberration (RGB split) + losowe
 * przesunięcie klipu warstw. Aktywuje się dopiero po `startDelay` (czyli
 * gdy efekt scramble w Hero zdążył się już zakończyć), żeby nie nakładać
 * dwóch animacji tekstu na siebie.
 */
export function GlitchText({
  text,
  startDelay = 0,
  color,
  className,
}: {
  text: string;
  startDelay?: number;
  color?: string;
  className?: string;
}) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cycleTimeout: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      // Glitch powtarza się w losowych, nieregularnych odstępach (3.5–7.5s),
      // żeby nie wyglądało to jak miarowy, mechaniczny tik.
      const delay = 3500 + Math.random() * 4000;
      cycleTimeout = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 220);
        scheduleNext();
      }, delay);
    };

    const startTimeout = setTimeout(scheduleNext, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(cycleTimeout);
    };
  }, [startDelay]);

  return (
    <span className={`relative inline-block ${className ?? ""}`} style={{ color }}>
      {/* warstwa bazowa — zawsze widoczna, niesie realny tekst (SEO/a11y) */}
      <span>{text}</span>

      {glitching && (
        <>
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.85, 0, 0.7, 0],
              x: [0, -3, 2, -2, 0],
              clipPath: [
                "inset(10% 0 70% 0)",
                "inset(60% 0 5% 0)",
                "inset(30% 0 45% 0)",
                "inset(0% 0 85% 0)",
                "inset(0 0 0 0)",
              ],
            }}
            transition={{ duration: 0.22, times: [0, 0.25, 0.5, 0.75, 1] }}
            className="absolute inset-0 pointer-events-none select-none"
            style={{ color: "#ff2d6f", mixBlendMode: "screen" }}
          >
            {text}
          </motion.span>
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.85, 0, 0.7, 0],
              x: [0, 3, -2, 2, 0],
              clipPath: [
                "inset(55% 0 20% 0)",
                "inset(5% 0 75% 0)",
                "inset(40% 0 35% 0)",
                "inset(80% 0 0% 0)",
                "inset(0 0 0 0)",
              ],
            }}
            transition={{ duration: 0.22, times: [0, 0.25, 0.5, 0.75, 1] }}
            className="absolute inset-0 pointer-events-none select-none"
            style={{ color: "#00f0ff", mixBlendMode: "screen" }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
}
