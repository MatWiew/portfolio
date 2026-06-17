"use client";

import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOnScrollProps {
  children: ReactNode;
  /** Stagger delay (seconds) between direct children with [data-reveal-item] */
  stagger?: number;
  /** Extra y-offset (px) the content travels from */
  y?: number;
  className?: string;
}

/**
 * Animates its children in when scrolled into view: fade + upward motion,
 * mimicking a terminal window "booting up". If the wrapper itself has
 * children marked with [data-reveal-item], those are staggered;
 * otherwise the wrapper's direct children are animated as a group.
 */
export function RevealOnScroll({
  children,
  stagger = 0.1,
  y = 32,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const animTargets = targets.length > 0 ? targets : el.children;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(animTargets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(animTargets, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(animTargets, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger,
        });
      },
    });

    return () => trigger.kill();
  }, [stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
