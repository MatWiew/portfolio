"use client";

import { useEffect, useState } from "react";
import Clarity from "@microsoft/clarity";

export type ConsentLevel = "all" | "essential" | "none";

const KEY = "mw_cookie_consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentLevel | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as ConsentLevel | null;
    const raf = requestAnimationFrame(() => {
      if (saved) {
        setConsent(saved);
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
    if (level !== "all") {
      // Chowamy baner z opóźnieniem (dajemy czas na animację zjedzenia)
      setTimeout(() => setVisible(false), level === "none" ? 1800 : 900);
    } else {
      setTimeout(() => setVisible(false), 600);
    }
  };

  return { consent, visible, choose };
}

function applyConsent(level: ConsentLevel) {
  if (typeof window === "undefined") return;

  // 1. Obsługa Google Analytics / gtag
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("consent", "update", {
      analytics_storage: level === "all" ? "granted" : "denied",
      ad_storage: "denied",
    });
  }

  // 2. Obsługa Microsoft Clarity przez API v2
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
}

// Rozszerzenie globalnych typów, żeby TS nie krzyczał na window.gtag/clarity
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
