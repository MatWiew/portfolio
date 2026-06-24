"use client";

import { ArrowDown, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useScramble } from "./useScramble";
import { GlitchText } from "./GlitchText";
import { SKILLS } from "@/data/skills";
import { trackCTAClick } from "./Analytics";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const ParticleCanvas = dynamic(
    () => import("./ParticleCanvas").then((mod) => mod.ParticleCanvas),
    { ssr: false },
  );

  const h1 = useScramble("MATEUSZ", 100);
  const h2 = useScramble("WIEWIÓRA", 400);
  const h3 = useScramble("Full-Stack MERN Developer", 800);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12"
    >
      {/* Wstrzykujemy mikro-style CSS dla animacji tła. 
          Przeglądarka przetworzy to sprzętowo (GPU) zamiast obciążać JS (TBT) */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); }
          33% { transform: translate(-50%, -50%) translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-50%, -50%) translate(-20px, 15px) scale(0.95); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-30px, 20px); }
        }
        .animate-float-1 { animation: float-slow 18s infinite ease-in-out; }
        .animate-float-2 { animation: float-reverse 22s infinite ease-in-out; }
      `}</style>

      {/* Czysty CSS decyduje o ukryciu Canvasu na mobile — brak obciążenia JS */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <ParticleCanvas />
      </div>

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Kolorowe plamy tła animujemy natywnym CSS zamiast Framer Motion */}
      <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] sm:w-[600px] sm:h-[600px] rounded-full bg-primary/[0.04] blur-[80px] sm:blur-[120px] pointer-events-none animate-float-1" />
      <div className="absolute top-1/3 right-1/4 w-[180px] h-[180px] sm:w-[380px] sm:h-[380px] rounded-full bg-accent/[0.05] blur-[70px] sm:blur-[110px] pointer-events-none animate-float-2 hidden sm:block" />

      <div className="relative z-10 text-center max-w-5xl w-full flex flex-col items-center">
        <div className="mb-6">
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.25em] text-primary/70 uppercase border border-primary/20 rounded-full px-5 py-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Dostępny — Freelance 2026
          </span>
        </div>

        {/* Utrzymujemy poprawkę, która uratowała wskaźnik CLS */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: "1.02",
          }}
          className="text-[clamp(3.1rem,11vw,9rem)] font-black tracking-tighter mb-6 select-none w-full min-h-[150px] sm:min-h-0"
        >
          <span className="block text-foreground min-h-[1.1em]">
            {h1 === "MATEUSZ" ? (
              <GlitchText text={h1} startDelay={200} />
            ) : (
              h1 || "\u00A0"
            )}
          </span>
          <span className="block min-h-[1.1em]" style={{ color: "#00d4ff" }}>
            {h2 === "WIEWIÓRA" ? (
              <GlitchText text={h2} startDelay={500} />
            ) : (
              h2 || "\u00A0"
            )}
          </span>
          <span
            className="block text-muted-foreground/50 font-light"
            style={{
              fontSize: "clamp(1.1rem,2.8vw,2.4rem)",
              fontFamily: "var(--font-sans)",
              marginTop: "0.5em",
              letterSpacing: "0.02em",
            }}
          >
            {h3 || "\u00A0"}
          </span>
        </h1>

        <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-base leading-relaxed">
          Tworzę skalowalne aplikacje webowe — od koncepcji po wdrożenie. React,
          Node.js, Express &amp; MongoDB z naciskiem na wydajność i
          doświadczenie użytkownika.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              trackCTAClick("hero", "projects");
              scrollTo("projects");
            }}
            className="group flex items-center justify-center gap-2 bg-primary text-black text-sm font-bold tracking-wider uppercase px-8 py-4 rounded-full hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Zobacz moje prace
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => {
              trackCTAClick("hero", "contact");
              scrollTo("contact");
            }}
            className="flex items-center justify-center text-sm uppercase tracking-wider text-muted-foreground border border-white/10 px-8 py-4 rounded-full hover:border-primary/40 hover:text-primary transition-all active:scale-95 w-full sm:w-auto"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Zatrudnij mnie
          </button>
        </div>
      </div>

      {/* Siatka skilli ładowana statycznie bez zbędnego JS */}
      <div className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl w-full">
        {SKILLS.map((s) => (
          <div
            key={s.label}
            className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,212,255,0.08)] transition-all duration-300 group md:hover:-translate-y-1"
          >
            <p
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors mb-1"
            >
              {s.label}
            </p>
            <p className="text-[13px] text-foreground/70 leading-relaxed">
              {s.items}
            </p>
          </div>
        ))}
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/30 cursor-pointer animate-bounce"
        onClick={() => scrollTo("projects")}
      >
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}
