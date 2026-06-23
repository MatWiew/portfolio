"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Niestandardowy kursor — dwa elementy:
 *  - mały, wypełniony punkt śledzący mysz 1:1 (bez sprężyny, zero lag)
 *  - duży pierścień śledzący z delikatnym "doganianiem" (spring), który
 *    powiększa się i wypełnia tłem nad elementami klikalnymi
 *
 * Domyślny kursor systemowy jest globalnie ukryty przez `cursor: none`
 * w globals.css (tylko gdy ten komponent jest aktywny — patrz logika
 * `enabled` niżej). Aktywne tylko na urządzeniach z dokładnym wskaźnikiem
 * (desktop) i z włączonym ruchem (prefers-reduced-motion: no-preference);
 * na dotyku / przy ograniczonym ruchu w ogóle się nie renderuje, żeby nie
 * psuć UX i dostępności.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mały punkt — śledzi mysz natychmiastowo
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Duży pierścień — śledzi z delikatnym opóźnieniem (spring)
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const springRingX = useSpring(ringX, { stiffness: 420, damping: 38, mass: 0.5 });
  const springRingY = useSpring(ringY, { stiffness: 420, damping: 38, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const enableId = requestAnimationFrame(() => setEnabled(true));

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [role='button'], input, textarea, select"));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeaveWindow);
    return () => {
      cancelAnimationFrame(enableId);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [dotX, dotY, ringX, ringY]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Mały punkt — zero lag */}
      <motion.div
        style={{ left: dotX, top: dotY, opacity: visible ? 1 : 0 }}
        animate={{ scale: pressed ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
        className="fixed z-[300] w-1.5 h-1.5 rounded-full bg-primary pointer-events-none -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      {/* Duży pierścień — śledzi z opóźnieniem */}
      <motion.div
        style={{ left: springRingX, top: springRingY, opacity: visible ? 1 : 0 }}
        animate={{
          width: hovering ? 56 : pressed ? 28 : 36,
          height: hovering ? 56 : pressed ? 28 : 36,
          backgroundColor: hovering ? "rgba(0,212,255,0.1)" : "rgba(0,212,255,0)",
          borderColor: hovering ? "rgba(0,212,255,0.7)" : "rgba(0,212,255,0.4)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="fixed z-[300] pointer-events-none rounded-full border -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        aria-hidden="true"
      />
    </>
  );
}
