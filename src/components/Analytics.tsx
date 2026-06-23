"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Clarity from "@microsoft/clarity";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

const projectId = "xbh4b3w16l";
const KEY = "mw_cookie_consent"; // Twój klucz z hooka

// Inicjalizacja bazowa core-biblioteki (nie wysyła jeszcze danych)
const analytics = Analytics({
  app: "Mateusz Wiewióra - Portfolio",
  plugins: [
    googleAnalytics({
      measurementIds: ["G-9TB50FXKYZ"],
    }),
  ],
});

export default function AnalyticsSync() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Funkcja sprawdzająca aktualny stan w localStorage
    const checkConsent = () => {
      const saved = localStorage.getItem(KEY);
      setHasConsent(saved === "all");
    };

    // Sprawdź stan od razu przy ładowaniu strony
    checkConsent();

    // Nasłuchuj zdarzenia kliknięcia w banerze (Krok 1)
    window.addEventListener("cookie-consent-changed", checkConsent);
    return () => window.removeEventListener("cookie-consent-changed", checkConsent);
  }, []);

  // Odpalenie Clarity tylko po wyraźnej zgodzie
  useEffect(() => {
    if (!hasConsent) return;
    Clarity.init(projectId);
  }, [hasConsent]);

  // Śledzenie podstron tylko po wyraźnej zgodzie
  useEffect(() => {
    if (!hasConsent) return;
    analytics.page();
  }, [pathname, hasConsent]);

  return null;
}

// Bezpieczny eksport trackera do formularza kontaktowego
export const trackCustomEvent = (eventName: string, payload?: object) => {
  if (typeof window !== "undefined" && localStorage.getItem(KEY) === "all") {
    analytics.track(eventName, payload);
  }
};