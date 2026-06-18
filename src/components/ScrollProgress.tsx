"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Cienki pasek postępu na samej górze strony, śledzący scroll całej
 * strony — drobny, ale wyraźny sygnał "ta strona ma dopracowane detale".
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
      aria-hidden="true"
    />
  );
}
