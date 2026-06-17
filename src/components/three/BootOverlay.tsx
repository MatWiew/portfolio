"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const BOOT_LINE = "root@mateuszwiewiora:~# initiating_advanced_dev_protocol...";
const TYPE_SPEED = 0.035; // seconds per character

interface BootOverlayProps {
  onComplete: () => void;
}

/**
 * Full-screen black overlay that types out a boot command, then flashes
 * and fades away, revealing the hero content underneath.
 */
export function BootOverlay({ onComplete }: BootOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Respect reduced-motion preference: skip straight to content.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      onComplete();
      const timeout = setTimeout(() => setDone(true), 0);
      return () => clearTimeout(timeout);
    }

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setTyped(BOOT_LINE.slice(0, charIndex));
      if (charIndex >= BOOT_LINE.length) {
        clearInterval(typeInterval);

        // Hold on the completed line briefly, then flash + fade out.
        gsap.to({}, {
          duration: 0.4,
          onComplete: () => {
            const tl = gsap.timeline({
              onComplete: () => {
                setDone(true);
                onComplete();
              },
            });

            if (flashRef.current) {
              tl.to(flashRef.current, {
                opacity: 1,
                duration: 0.06,
                ease: "power1.in",
              }).to(flashRef.current, {
                opacity: 0,
                duration: 0.25,
                ease: "power2.out",
              });
            }

            if (overlayRef.current) {
              tl.to(
                overlayRef.current,
                {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                },
                "-=0.2"
              );
            }
          },
        });
      }
    }, TYPE_SPEED * 1000);

    return () => clearInterval(typeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-bg-void flex items-center justify-center px-4"
    >
      <div
        ref={flashRef}
        className="fixed inset-0 bg-accent-green opacity-0 pointer-events-none mix-blend-screen"
      />
      <p className="text-glow-green text-sm sm:text-lg font-bold tracking-wide max-w-2xl text-left w-full">
        <span className="text-accent-green">{typed}</span>
        <span className="inline-block w-2 h-4 sm:h-5 bg-accent-green ml-1 animate-blink align-middle" />
      </p>
    </div>
  );
}
