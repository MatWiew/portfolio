"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProgressBarProps {
  label: string;
  value: number; // 0-100
}

export function ProgressBar({ label, value }: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { width: `${value}%` });
      return;
    }

    gsap.set(el, { width: "0%" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          width: `${value}%`,
          duration: 1.1,
          ease: "power2.out",
        });
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-text-primary">{label}</span>
        <span className="text-accent-green font-bold">{value}%</span>
      </div>
      <div className="h-1 bg-border-dim overflow-hidden">
        <div ref={fillRef} className="h-full bg-accent-green shadow-glow-green" />
      </div>
    </div>
  );
}
