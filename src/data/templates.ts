import { Template } from "@/types/content";

// Szablony jeszcze niegotowe — wszystkie oznaczone jako "SOON" (available: false).
//
// Gdy zbudujesz i wdrożysz realny szablon:
// 1. Zmień available na true.
// 2. Dodaj previewUrl z adresem demo (np. z Vercel — patrz README, sekcja
//    "Live preview szablonów").
// 3. Opcjonalnie dodaj price.
// Przycisk "LIVE PREVIEW" na karcie pojawi się automatycznie, gdy
// available === true i previewUrl jest ustawiony.
//
// `category` = typ strony (do czego służy, wpływa na filtr w Shop).
// `deliveryStack` = w czym może być zrealizowany u klienta — niezależnie
// od tego, że samo demo (previewUrl) jest zawsze w MERN/Next.js.
export const templates: Template[] = [
  // ─── E-commerce ───────────────────────────────────────────────
  {
    id: "T.01",
    name: "Shop Minimal",
    category: "E-commerce",
    deliveryStack: ["WooCommerce", "MERN"],
    description:
      "Minimalistyczny, szybki sklep z optymalizacją Core Web Vitals. Czysty katalog produktów, szybki checkout.",
    available: false,
    // previewUrl: "https://shop-minimal-demo.vercel.app",
  },
  {
    id: "T.02",
    name: "Boutique Dark",
    category: "E-commerce",
    deliveryStack: ["MERN", "WooCommerce"],
    description:
      "Premium sklep dla marek modowych i lifestyle. Duże zdjęcia produktów, mroczna paleta, filtrowanie w czasie rzeczywistym.",
    available: false,
    // previewUrl: "https://boutique-dark-demo.vercel.app",
  },
  {
    id: "T.03",
    name: "Marketplace Lite",
    category: "E-commerce",
    deliveryStack: ["MERN"],
    description:
      "Lekki szablon marketplace z wieloma sprzedawcami — katalog, koszyk, panel sprzedawcy w jednym.",
    available: false,
    // previewUrl: "https://marketplace-lite-demo.vercel.app",
  },

  // ─── Korporacyjna ─────────────────────────────────────────────
  {
    id: "T.04",
    name: "Dark Agency",
    category: "Korporacyjna",
    deliveryStack: ["WordPress", "MERN"],
    description:
      "Motyw dla agencji kreatywnych. Ciemny UI, animacje scroll-triggered, builder sekcji portfolio.",
    available: false,
    // previewUrl: "https://dark-agency-demo.vercel.app",
  },
  {
    id: "T.05",
    name: "Corporate Edge",
    category: "Korporacyjna",
    deliveryStack: ["WordPress"],
    description:
      "Solidna strona firmowa — sekcje o firmie, usługach, zespole i case studies. Zoptymalizowana pod SEO B2B.",
    available: false,
    // previewUrl: "https://corporate-edge-demo.vercel.app",
  },
  {
    id: "T.06",
    name: "Consulting Pro",
    category: "Korporacyjna",
    deliveryStack: ["WordPress", "MERN"],
    description:
      "Szablon dla firm konsultingowych i kancelarii. Nacisk na zaufanie: referencje, certyfikaty, jasne CTA kontaktowe.",
    available: false,
    // previewUrl: "https://consulting-pro-demo.vercel.app",
  },

  // ─── Portfolio ────────────────────────────────────────────────
  {
    id: "T.07",
    name: "Portfolio Noir",
    category: "Portfolio",
    deliveryStack: ["MERN"],
    description:
      "Mroczne portfolio dla deweloperów i designerów. Interaktywna galeria projektów, sekcja case studies.",
    available: false,
    // previewUrl: "https://portfolio-noir-demo.vercel.app",
  },
  {
    id: "T.08",
    name: "Studio Grid",
    category: "Portfolio",
    deliveryStack: ["MERN", "WordPress"],
    description:
      "Portfolio fotograficzne/graficzne na siatce masonry z pełnoekranowym podglądem prac.",
    available: false,
    // previewUrl: "https://studio-grid-demo.vercel.app",
  },
  {
    id: "T.09",
    name: "Freelancer One-Page",
    category: "Portfolio",
    deliveryStack: ["MERN", "WordPress"],
    description:
      "Jednostronicowe portfolio dla freelancerów — hero, usługi, wybrane projekty, kontakt. Szybkie do personalizacji.",
    available: false,
    // previewUrl: "https://freelancer-onepage-demo.vercel.app",
  },

  // ─── Booking ──────────────────────────────────────────────────
  {
    id: "T.10",
    name: "Booking Flow",
    category: "Booking",
    deliveryStack: ["MERN"],
    description:
      "System rezerwacji w czasie rzeczywistym z kalendarzem dostępności i potwierdzeniem mailowym — wzorowany na Klubie C4.",
    available: false,
    // previewUrl: "https://booking-flow-demo.vercel.app",
  },
  {
    id: "T.11",
    name: "Studio Schedule",
    category: "Booking",
    deliveryStack: ["MERN", "WordPress"],
    description:
      "Rezerwacje zajęć grupowych (siłownie, studia jogi, kursy) z limitami miejsc i listą oczekujących.",
    available: false,
    // previewUrl: "https://studio-schedule-demo.vercel.app",
  },
  {
    id: "T.12",
    name: "Appointment Desk",
    category: "Booking",
    deliveryStack: ["MERN", "WordPress"],
    description:
      "Rezerwacja wizyt 1:1 (gabinety, salony, konsultacje) z synchronizacją kalendarza i przypomnieniami SMS/e-mail.",
    available: false,
    // previewUrl: "https://appointment-desk-demo.vercel.app",
  },

  // ─── SaaS ─────────────────────────────────────────────────────
  {
    id: "T.13",
    name: "SaaS Starter",
    category: "SaaS",
    deliveryStack: ["MERN"],
    description:
      "Pełny boilerplate SaaS: auth, panel użytkownika, integracja płatności, dashboard z metrykami.",
    available: false,
    // previewUrl: "https://saas-starter-demo.vercel.app",
  },
  {
    id: "T.14",
    name: "Analytics Dashboard",
    category: "SaaS",
    deliveryStack: ["MERN"],
    description:
      "Dashboard analityczny z wykresami w czasie rzeczywistym, filtrami i eksportem danych do CSV.",
    available: false,
    // previewUrl: "https://analytics-dashboard-demo.vercel.app",
  },
  {
    id: "T.15",
    name: "Team Workspace",
    category: "SaaS",
    deliveryStack: ["MERN"],
    description:
      "Szablon aplikacji do pracy zespołowej — zadania, komentarze, role użytkowników, powiadomienia w czasie rzeczywistym.",
    available: false,
    // previewUrl: "https://team-workspace-demo.vercel.app",
  },

  // ─── Landing ──────────────────────────────────────────────────
  {
    id: "T.16",
    name: "Launch Page",
    category: "Landing",
    deliveryStack: ["MERN", "WordPress"],
    description:
      "Landing page pod premierę produktu — hero z animacją, lista funkcji, social proof, formularz zapisu na waitlistę.",
    available: false,
    // previewUrl: "https://launch-page-demo.vercel.app",
  },
  {
    id: "T.17",
    name: "App Promo",
    category: "Landing",
    deliveryStack: ["MERN"],
    description:
      "Strona promująca aplikację mobilną/webową — zrzuty ekranu, porównanie planów cenowych, CTA do pobrania.",
    available: false,
    // previewUrl: "https://app-promo-demo.vercel.app",
  },
  {
    id: "T.18",
    name: "Event Landing",
    category: "Landing",
    deliveryStack: ["MERN", "WordPress"],
    description:
      "Landing page pod wydarzenie/konferencję — agenda, prelegenci, lokalizacja, sprzedaż biletów.",
    available: false,
    // previewUrl: "https://event-landing-demo.vercel.app",
  },
];
