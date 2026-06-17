"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";

/**
 * Returns a ref to attach to the hero content container and a `reveal`
 * function that animates it in (fade + slight upward motion + scale)
 * once the boot sequence completes — mimicking content emerging from
 * a "light tunnel".
 */
export function useHeroReveal() {
  const contentRef = useRef<HTMLDivElement>(null);

  const reveal = useCallback(() => {
    if (!contentRef.current) return;

    const targets = contentRef.current.querySelectorAll("[data-reveal]");

    gsap.set(contentRef.current, { opacity: 1 });

    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: 24,
        scale: 0.98,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  }, []);

  return { contentRef, reveal };
}
