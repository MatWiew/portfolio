"use client";

import { useEffect, useState } from "react";
import Clarity from "@microsoft/clarity";

export type ConsentLevel = "all" | "none";

const KEY = "mw_cookie_consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentLevel | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    // Backward compat: "essential" traktujemy jak "none"
    const saved: ConsentLevel | null =
      raw === "all" ? "all" : raw === "none" || raw === "essential" ? "none" : null;

    const raf = requestAnimationFrame(() => {
      if (saved) {
        setConsent(saved);
        // Jeśli ktoś miał "essential", nadpisujemy na "none"
        if (raw === "essential") localStorage.setItem(KEY, "none");
        applyConsent(saved);
      } else {
        setTimeout(() => setVisible(true), 1200);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const choose = (level: ConsentLevel) => {
    setConsent(level);
    localStorage.setItem(KEY, level);
    applyConsent(level);
    window.dispatchEvent(new Event("cookie-consent-changed"));
    if (level !== "all") {
      // Chowamy baner z opóźnieniem (dajemy czas na animację zjedzenia)
      setTimeout(() => setVisible(false), 1800);
    } else {
      setTimeout(() => setVisible(false), 600);
    }
  };

  return { consent, visible, choose };
}

function applyConsent(level: ConsentLevel) {
  if (typeof window === "undefined") return;

  // 1. Obsługa Google Analytics / gtag
  (window as any).dataLayer = (window as any).dataLayer || [];

  // 2. Obsługa Microsoft Clarity przez API v2
  try {
    if (level === "all") {
      Clarity.consentV2({
        ad_Storage: "denied",
        analytics_Storage: "granted"
      });
    } else {
      Clarity.consentV2({
        ad_Storage: "denied",
        analytics_Storage: "denied"
      });
    }
  } catch (error) {
  }
}

// Rozszerzenie globalnych typów, żeby TS nie krzyczał na window.gtag/clarity
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
