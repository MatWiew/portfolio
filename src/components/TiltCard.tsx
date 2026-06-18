"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Opakowuje kartę efektem 3D tilt — przy hover karta delikatnie "przechyla
 * się" w stronę kursora (perspektywa), a pod kursorem podświetla się
 * radialny blask śledzący jego pozycję. Mocny, ale subtelny popisowy
 * efekt typowy dla nowoczesnych portfolio deweloperskich.
 */
export function TiltCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const springRY = useSpring(rotateY, { stiffness: 260, damping: 22 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(0,212,255,0.12), transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 900,
        ...style,
      }}
      className={className}
    >
      {children}
      <motion.div
        style={{ background: glowBg }}
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        aria-hidden="true"
      />
    </motion.div>
  );
}
