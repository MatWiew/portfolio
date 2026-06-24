"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent, type ConsentLevel } from "./useCookieConsent";

const FULL_PATH =
  "M 47.1,11.7 C 58.4,8.7 70.5,9.7 81.1,14.7 C 91.8,19.7 100.3,28.2 105.3,38.9 C 110.3,49.5 111.3,61.6 108.3,72.9 C 102.0,96.4 79.8,111.9 55.6,109.8 C 31.5,107.7 12.3,88.5 10.2,64.4 C 8.1,40.2 23.6,18.0 47.1,11.7 Z";
const BITTEN_PATH =
  "M 47.1,11.7 C 43.0,25.3 47.7,34.2 61.2,38.4 C 59.5,53.7 66.3,60.5 81.6,58.8 C 85.8,72.3 94.7,77.0 108.3,72.9 C 102.0,96.4 79.8,111.9 55.6,109.8 C 31.5,107.7 12.3,88.5 10.2,64.4 C 8.1,40.2 23.6,18.0 47.1,11.7 Z";

/* ─────────────────────────────────────────────────────────────────────────
   SVG ciasteczko z animacją nadgryzienia
   ───────────────────────────────────────────────────────────────────────── */
function CookieSvg({ bitten }: { bitten: boolean }) {
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

  const currentPath = bitten ? BITTEN_PATH : FULL_PATH;

  return (
    <motion.svg
      viewBox="0 0 120 120"
      width="140"
      height="140"
      className="drop-shadow-[0_0_24px_rgba(0,212,255,0.35)]"
      animate={{
        scale: bitten ? [1, 0.85, 1.05, 1] : 1,
        rotate: bitten ? [0, -10, 5, 0] : 0,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
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

        {/* Maska clippingu — ukrywa chipy w nadgryzionym obszarze */}
        <clipPath id={`clip-${id}`}>
          <motion.path animate={{ d: currentPath }} transition={{ type: "spring", stiffness: 400, damping: 25 }} />
        </clipPath>
      </defs>

      {/* Ciało ciasteczka */}
      <g clipPath={`url(#clip-${id})`}>
        <motion.path animate={{ d: currentPath }} transition={{ type: "spring", stiffness: 400, damping: 25 }} fill={`url(#cg-${id})`} />

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
        <motion.path
          animate={{ d: currentPath }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
        <motion.path animate={{ d: currentPath }} transition={{ type: "spring", stiffness: 400, damping: 25 }} fill={`url(#shine-${id})`} />
      </g>

      {/* NEONOWY KONTUR ZEWNĘTRZNY */}
      <motion.path
        fill="none"
        stroke="rgba(0,212,255,0.45)"
        strokeWidth="1.2"
        animate={{
          d: currentPath,
          opacity: [0.45, 0.85, 0.45],
          strokeWidth: ["1.2px", "1.8px", "1.2px"],
        }}
        transition={{
          d: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          strokeWidth: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Główny komponent bannera
   ───────────────────────────────────────────────────────────────────────── */
export function CookieConsent() {
  const { consent, visible, choose } = useCookieConsent();

  const [bitten, setBitten] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleChoose = (level: ConsentLevel) => {
    if (level === consent) return;

    if (level === "none") {
      setBitten(true);
      setTimeout(() => {
        setIsClosed(true);
      }, 500);
    } else {
      setBitten(false);
      setTimeout(() => {
        setIsClosed(true);
      }, 500);
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
                    <CookieSvg bitten={bitten} />
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
                    {/* Zaakceptuj ciasteczka */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleChoose("all")}
                      onMouseEnter={() => setBitten(false)}
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="relative w-full text-[12px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl border transition-colors duration-200 text-left flex items-center justify-between bg-primary text-black border-primary/80 hover:bg-primary/90"
                    >
                      Zaakceptuj ciasteczka
                      {consent === "all" && (
                        <motion.span
                          layoutId="consent-check"
                          className="text-xs text-black/60"
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>

                    {/* Odrzuć */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleChoose("none")}
                      onMouseEnter={() => setBitten(true)}
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="relative w-full text-[12px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl border transition-colors duration-200 text-left flex items-center justify-between bg-white/[0.03] text-muted-foreground border-white/[0.07] hover:border-white/15 hover:text-foreground/70"
                    >
                      Odrzuć
                      {consent === "none" && (
                        <motion.span
                          layoutId="consent-check"
                          className="text-xs text-primary/60"
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
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