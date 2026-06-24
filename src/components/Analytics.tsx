"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Clarity from "@microsoft/clarity";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

const projectId = "xbh4b3w16l";
const KEY = "mw_cookie_consent";

// Tworzymy zmienną, która będzie przechowywać naszą instancję analityki po akceptacji
let analyticsInstance: any = null;

export default function AnalyticsSync() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const saved = localStorage.getItem(KEY);
      setHasConsent(saved === "all");
    };

    checkConsent();

    window.addEventListener("cookie-consent-changed", checkConsent);
    return () =>
      window.removeEventListener("cookie-consent-changed", checkConsent);
  }, []);

  useEffect(() => {
    // JEŚLI NIE MA ZGODY - ABSOLUTNA CISZA
    if (!hasConsent) return;

    // Inicjalizujemy Google Analytics DOPIERO TUTAJ
    if (!analyticsInstance) {
      analyticsInstance = Analytics({
        app: "Mateusz Wiewióra - Portfolio",
        plugins: [
          googleAnalytics({
            measurementIds: ["G-9TB50FXKYZ"],
          }),
        ],
      });
    }

    // Odpalamy Clarity
    Clarity.init(projectId);

    // NAKŁADAMY ZGODĘ DLA CLARITY ZARAZ PO INICJALIZACJI
    Clarity.consentV2({
      ad_Storage: "denied",
      analytics_Storage: "granted",
    });

    // Logujemy pierwszą odsłonę strony
    analyticsInstance.page();
  }, [hasConsent]);

  useEffect(() => {
    // Śledzenie przejść między podstronami (tylko jeśli instancja istnieje i jest zgoda)
    if (!hasConsent || !analyticsInstance) return;
    analyticsInstance.page();
  }, [pathname, hasConsent]);

  return null;
}

/* ─────────────────────────────────────────────────────────────────────────
   Funkcje do śledzenia zdarzeń — wywoływane z komponentów
   ───────────────────────────────────────────────────────────────────────── */

/** Ogólny event tracking (GA + Clarity) */
export const trackCustomEvent = (eventName: string, payload?: Record<string, any>) => {
  if (typeof window === "undefined") return;
  if (analyticsInstance) {
    analyticsInstance.track(eventName, payload);
  }
  // Clarity tagging — tagujemy sesję informacją o zdarzeniu
  try {
    Clarity.setTag(eventName, payload ? JSON.stringify(payload).slice(0, 255) : "true");
  } catch {
    // Clarity może nie być jeszcze gotowe
  }
};

/** Śledzenie interakcji z formularzem kontaktowym */
export const trackFormInteraction = (
  action: "start" | "field_focus" | "submit" | "success" | "error",
  details?: Record<string, any>
) => {
  trackCustomEvent(`contact_form_${action}`, details);
};

/** Śledzenie kliknięć CTA */
export const trackCTAClick = (
  section: string,
  buttonLabel: string,
  details?: Record<string, any>
) => {
  trackCustomEvent("cta_click", { section, button: buttonLabel, ...details });
};

/** Śledzenie interakcji z kartami (oferta, projekty) */
export const trackCardInteraction = (
  type: "offer" | "project",
  action: "expand" | "collapse" | "link_click",
  details?: Record<string, any>
) => {
  trackCustomEvent(`${type}_card_${action}`, details);
};
