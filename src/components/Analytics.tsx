"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Clarity from "@microsoft/clarity";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

const projectId = "xbh4b3w16l";

// Inicjalizacja instancji analytics (poza cyklem renderowania komponentu)
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

  useEffect(() => {
    // Bezpieczna inicjalizacja Clarity tylko po stronie klienta
    Clarity.init(projectId);
  }, []);

  useEffect(() => {
    // Wywołanie pageview przy każdej zmianie podstrony
    analytics.page();
  }, [pathname]);

  return null; // Komponent nie renderuje nic wizualnego
}

// Eksportujemy instancję, aby móc z niej korzystać w innych komponentach (np. przy kliknięciach)
export { analytics };