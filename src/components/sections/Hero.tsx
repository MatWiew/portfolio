"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { BootOverlay } from "@/components/three/BootOverlay";
import { GlitchText } from "@/components/ui/GlitchText";
import { useHeroReveal } from "@/hooks/useHeroReveal";

// WebGL canvas is client-only and not needed for the first paint —
// load it lazily so it doesn't block initial render / hydration.
const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  const { contentRef, reveal } = useHeroReveal();
  const [showCanvas, setShowCanvas] = useState(false);

  const handleBootComplete = useCallback(() => {
    setShowCanvas(true);
    reveal();
    window.dispatchEvent(new CustomEvent("hero:boot-complete"));
  }, [reveal]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 pt-16 overflow-hidden">
      {/* WebGL particle canvas — mounted once the boot sequence finishes */}
      <div className="absolute inset-0 -z-10">
        {showCanvas && <HeroCanvas />}
      </div>

      <BootOverlay onComplete={handleBootComplete} />

      <div ref={contentRef} className="max-w-4xl opacity-0">
        <p data-reveal className="text-text-dim text-xs tracking-widest mb-6">
          <span className="text-accent-green">▸</span> PROCESS.ID://4829A — IDENTITY CONFIRMED
        </p>

        <h1 className="font-extrabold leading-[0.95] tracking-tight">
          <span data-reveal className="block text-5xl sm:text-7xl lg:text-8xl text-accent-yellow text-glow-green">
            <GlitchText text="MATEUSZ">MATEUSZ</GlitchText>
          </span>
          <span data-reveal className="block text-5xl sm:text-7xl lg:text-8xl text-accent-cyan text-glow-cyan">
            <GlitchText text="WIEWIÓRA">WIEWIÓRA</GlitchText>
          </span>
        </h1>

        <div data-reveal className="mt-8 pl-4 border-l-2 border-accent-green/60 max-w-xl">
          <p className="text-sm sm:text-base text-text-primary font-bold uppercase tracking-wider mb-2">
            Full-Stack Engineer · Systems Architect
          </p>
          <p className="text-sm text-text-dim leading-relaxed">
            Buduję wysokowydajną infrastrukturę na styku performance i precyzji.
            Sześć lat dostarczania systemów produkcyjnych na skalę — MERN,
            WordPress, WooCommerce.
          </p>
        </div>

        <div data-reveal className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="#portfolio"
            className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase border border-accent-green text-accent-green hover:bg-accent-green hover:text-bg-void hover:shadow-glow-green transition-all duration-200 text-center"
          >
            &gt;_ LOAD WORK
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase border border-border-bright text-text-primary hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow-cyan transition-all duration-200 text-center"
          >
            &gt;_ OPEN CHANNEL
          </a>
          <a
            href="https://github.com/mwiewiora"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase border border-border-bright text-text-dim hover:text-text-primary transition-all duration-200 text-center"
          >
            {"// GITHUB"}
          </a>
        </div>
      </div>

      <div data-reveal className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 flex justify-between text-[10px] sm:text-xs text-text-dim tracking-widest">
        <span className="animate-blink">↓ SCROLL TO EXECUTE</span>
        <span className="hidden sm:inline">X:48.8566 Y:2.3522 Z:0.000 // PL</span>
      </div>
    </section>
  );
}
