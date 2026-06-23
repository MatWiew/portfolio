"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent, type ConsentLevel } from "./useCookieConsent";

/* ─────────────────────────────────────────────────────────────────────────
   SVG ciasteczko (Zawsze w całości, z neonowym konturem zewnętrznym)
   ───────────────────────────────────────────────────────────────────────── */
const CRUMB_RADII = [1.9, 1.6, 2.1, 1.7, 2.3, 1.8, 2.0, 1.5];

function CookieSvg({ crumbs }: { crumbs: boolean }) {
  const id = useId().replace(/:/g, "");

  // Kawałki czekolady (chips)
  const chips = [
    { cx: 45, cy: 40, r: 5 },
    { cx: 68, cy: 55, r: 6 },
    { cx: 52, cy: 70, r: 4.5 },
    { cx: 76, cy: 38, r: 4 },
    { cx: 38, cy: 62, r: 4 },
    { cx: 65, cy: 78, r: 5 },
    { cx: 82, cy: 68, r: 3.5 },
    { cx: 55, cy: 85, r: 3 },
    { cx: 72, cy: 88, r: 4 },
    { cx: 44, cy: 88, r: 3.5 },
    { cx: 88, cy: 50, r: 4 },
  ];

  // Pełna, idealna krawędź ciasteczka
  const cookiePath =
    "M60,8 C72,7 84,10 92,18 C102,28 113,38 112,52 C113,66 108,80 98,89 C86,100 72,113 58,112 C44,113 30,106 20,96 C10,86 7,72 8,58 C7,44 12,30 22,20 C32,10 48,9 60,8 Z";

  // Pozycje startowe i wektory ruchu dla animowanych okruszków
  const crumbPositions = [
    { x: 15, y: 20, dx: -12, dy: -10 },
    { x: 8, y: 35, dx: -15, dy: 5 },
    { x: 30, y: 10, dx: -5, dy: -14 },
    { x: 55, y: 5, dx: 3, dy: -16 },
    { x: 100, y: 20, dx: 14, dy: -8 },
    { x: 112, y: 45, dx: 16, dy: 2 },
    { x: 40, y: 115, dx: -8, dy: 14 },
    { x: 70, y: 118, dx: 2, dy: 16 },
  ];

  return (
    <svg
      viewBox="0 0 120 120"
      width="140"
      height="140"
      className="drop-shadow-[0_0_24px_rgba(0,212,255,0.35)]"
    >
      <defs>
        {/* Gradient tła ciasteczka */}
        <radialGradient id={`cg-${id}`} cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#1a3040" />
          <stop offset="60%" stopColor="#0d1e2c" />
          <stop offset="100%" stopColor="#071420" />
        </radialGradient>

        {/* Gradient cyfrowego połysku */}
        <radialGradient id={`shine-${id}`} cx="35%" cy="30%" r="40%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.18)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0)" />
        </radialGradient>
      </defs>

      {/* Ciało ciasteczka */}
      <g>
        <path d={cookiePath} fill={`url(#cg-${id})`} />

        {/* Grid texture */}
        <g opacity="0.07" stroke="rgba(0,212,255,1)" strokeWidth="0.6">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 10} x2="120" y2={i * 10} />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="120" />
          ))}
        </g>

        {/* Szyna konturowa wewnętrzna */}
        <path
          d={cookiePath}
          fill="none"
          stroke="rgba(0,212,255,0.25)"
          strokeWidth="1.5"
        />

        {/* Kawałki czekolady */}
        {chips.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="rgba(0,212,255,0.22)"
            stroke="rgba(0,212,255,0.5)"
            strokeWidth="0.8"
          />
        ))}

        {/* Połysk cyfrowy */}
        <path d={cookiePath} fill={`url(#shine-${id})`} />
      </g>

      {/* NEONOWY KONTUR ZEWNĘTRZNY */}
      <motion.path
        d={cookiePath}
        fill="none"
        stroke="rgba(0,212,255,0.45)"
        strokeWidth="1.2"
        animate={{
          opacity: [0.45, 0.85, 0.45],
          strokeWidth: ["1.2px", "1.8px", "1.2px"],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animowane okruszki */}
      <AnimatePresence>
        {crumbs && crumbPositions.map((c, i) => (
          <motion.circle
            key={`crumb${i}`}
            cx={c.x}
            cy={c.y}
            r={CRUMB_RADII[i]}
            fill="rgba(0,212,255,0.7)"
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{
              opacity: [1, 1, 0],
              x: c.dx,
              y: c.dy,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: i * 0.04, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Główny komponent bannera
   ───────────────────────────────────────────────────────────────────────── */
export function CookieConsent() {
  const { consent, visible, choose } = useCookieConsent();

  const [crumbs, setCrumbs] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleChoose = (level: ConsentLevel) => {
    if (level === consent) return;

    if (level === "none") {
      // Dla "Odrzuć" strzelamy okruszkami i zamykamy po chwili, by było widać efekt
      setCrumbs(true);
      setTimeout(() => {
        setCrumbs(false);
        setIsClosed(true);
      }, 800);
    } else {
      // Dla akceptacji zamykamy od razu
      setIsClosed(true);
    }

    choose(level);
  };

  // Jeśli globalny hook twierdzi, że nie powinno być go widać lub zamknęliśmy go lokalnie – ukrywamy
  const shouldShow = visible && !isClosed;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[calc(100vw-2rem)] max-w-md"
        >
          <div
            className="relative rounded-2xl border border-white/10 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,18,32,0.97) 0%, rgba(7,9,15,0.98) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 0 0 1px rgba(0,212,255,0.1), 0 32px 64px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.06)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <div className="p-5">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-[100px]">
                  <div style={{ width: 100, display: "flex", justifyContent: "center" }}>
                    <CookieSvg crumbs={crumbs} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-[15px] font-bold text-foreground"
                    >
                      Ciasteczka
                    </p>
                    <span
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="text-[10px] text-primary/70 border border-primary/30 rounded px-1.5 py-0.5"
                    >
                      cookies
                    </span>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
                    Używam Google Analytics i Microsoft Clarity do analizy ruchu.
                    Wybierz swój poziom prywatności.
                  </p>

                  <div className="flex flex-col gap-2">
                    {(
                      [
                        { level: "all", label: "Zaakceptuj ciasteczka", hot: true },
                        { level: "essential", label: "Tylko niezbędne", hot: false },
                        { level: "none", label: "Odrzuć", hot: false },
                      ] as const
                    ).map(({ level, label, hot }) => (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleChoose(level)}
                        style={{ fontFamily: "var(--font-mono)" }}
                        className={`relative w-full text-[12px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl border transition-colors duration-200 text-left flex items-center justify-between ${
                          hot
                            ? "bg-primary text-black border-primary/80 hover:bg-primary/90"
                            : level === "none"
                            ? "bg-white/[0.03] text-muted-foreground border-white/[0.07] hover:border-white/15 hover:text-foreground/70"
                            : "bg-white/[0.04] text-foreground/80 border-white/10 hover:border-primary/30 hover:text-primary"
                        }`}
                      >
                        {label}
                        {consent === level && (
                          <motion.span
                            layoutId="consent-check"
                            className={`text-xs ${hot ? "text-black/60" : "text-primary/60"}`}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}