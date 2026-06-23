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
    return () => window.removeEventListener("cookie-consent-changed", checkConsent);
  }, []);

  useEffect(() => {
    // JEŚLI NIE MA ZGODY - ABSOLUTNA CISZA
    if (!hasConsent) return;

    // Inicjalizujemy Google Analytics DOPIERO TUTAJ, gdy użytkownik kliknął akceptację
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
    
    // Logujemy pierwszą odsłonę strony zaraz po wyrażeniu zgody
    analyticsInstance.page();
  }, [hasConsent]);

  useEffect(() => {
    // Śledzenie przejść między podstronami (tylko jeśli instancja istnieje i jest zgoda)
    if (!hasConsent || !analyticsInstance) return;
    analyticsInstance.page();
  }, [pathname, hasConsent]);

  return null;
}

// Bezpieczna funkcja do śledzenia formularza kontaktowego
export const trackCustomEvent = (eventName: string, payload?: object) => {
  if (typeof window !== "undefined" && analyticsInstance) {
    analyticsInstance.track(eventName, payload);
  }
};