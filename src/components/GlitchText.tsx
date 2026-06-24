"use client";

import { useEffect, useState } from "react";

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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let cycleTimeout: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 4000;
      cycleTimeout = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 250);
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
      <style>{`
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 0); opacity: 0.85; }
          25% { clip-path: inset(60% 0 5% 0); transform: translate(2px, 0); }
          50% { clip-path: inset(30% 0 45% 0); transform: translate(-2px, 0); opacity: 0.7; }
          75% { clip-path: inset(0% 0 85% 0); transform: translate(1px, 0); }
          100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); opacity: 0; }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(55% 0 20% 0); transform: translate(3px, 0); opacity: 0.85; }
          25% { clip-path: inset(5% 0 75% 0); transform: translate(-2px, 0); }
          50% { clip-path: inset(40% 0 35% 0); transform: translate(2px, 0); opacity: 0.7; }
          75% { clip-path: inset(80% 0 0% 0); transform: translate(-1px, 0); }
          100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); opacity: 0; }
        }
        .animate-glitch-1 { animation: glitch-anim-1 0.25s linear infinite; }
        .animate-glitch-2 { animation: glitch-anim-2 0.25s linear infinite; }
      `}</style>

      <span>{text}</span>

      {glitching && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none select-none animate-glitch-1"
            style={{ color: "#ff2d6f", mixBlendMode: "screen" }}
          >
            {text}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none select-none animate-glitch-2"
            style={{ color: "#00f0ff", mixBlendMode: "screen" }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}