// ─────────────────────────────────────────────────────────────────────────
// Dane sekcji "Moja Oferta" (zastępuje dawną sekcję z podglądem szablonów).
//
// Każda usługa ma krótki opis (zawsze widoczny) i rozszerzony opis
// (pokazywany po rozwinięciu — hover na desktopie, tap na mobile).
// `prefillMessage` to wiadomość, która zostanie wpisana w formularzu
// kontaktowym, gdy ktoś kliknie "Zapytaj o [usługę]" na rozwiniętej karcie.
// ─────────────────────────────────────────────────────────────────────────

export type OfferItem = {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  price: string; // Dodane pole na cenę
  bullets: string[];
  /** Nazwa ikony z lucide-react, mapowana w komponencie Offer.tsx */
  icon: "Sparkles" | "ShoppingCart" | "Rocket" | "Building2" | "LayoutGrid";
  topic: string;
  prefillMessage: string;
};

export const OFFER: OfferItem[] = [
  {
    id: "wizytowki",
    title: "Wizytówki",
    shortDesc: "Prosta, elegancka strona dla freelancera lub małej firmy — wszystko na jednej stronie.",
    longDesc:
      "Jedna, dopracowana strona, która w kilka sekund pokazuje, kim jesteś i czym się zajmujesz. Idealna dla freelancerów, specjalistów i małych firm, które potrzebują profesjonalnej obecności online bez rozbudowanej struktury.",
    price: "od 790 PLN",
    bullets: ["Sekcja o Tobie i ofercie", "Formularz kontaktowy", "Pełna responsywność", "Gotowe w kilka dni"],
    icon: "Sparkles",
    topic: "Wizytówki",
    prefillMessage: "Cześć, jestem zainteresowany/a stworzeniem strony typu wizytówka. Chętnie poznam szczegóły i wycenę.",
  },
  {
    id: "sklepy",
    title: "Sklepy WWW",
    shortDesc: "Sklep internetowy z płatnościami, zarządzaniem produktami i panelem zamówień.",
    longDesc:
      "Kompletny sklep e-commerce dopasowany do Twojego asortymentu — katalog produktów, koszyk, bezpieczne płatności online i panel do zarządzania zamówieniami. Budowany pod realny ruch i wygodę klientów.",
    price: "od 2 490 PLN",
    bullets: ["Płatności online", "Panel zarządzania produktami", "Koszyk i checkout", "Integracja z dostawą"],
    icon: "ShoppingCart",
    topic: "Sklepy WWW",
    prefillMessage: "Cześć, szukam kogoś do zbudowania sklepu internetowego. Chętnie omówię szczegóły i wycenę.",
  },
  {
    id: "landing",
    title: "Landing Page",
    shortDesc: "Strona pod jedną kampanię lub produkt — zaprojektowana, by konwertować.",
    longDesc:
      "Skoncentrowana, szybka strona pod konkretny cel: kampanię reklamową, premierę produktu, zapis na webinar. Każdy element prowadzi odbiorcę do jednej, jasno zdefiniowanej akcji.",
    price: "od 990 PLN",
    bullets: ["Zorientowana na konwersję", "Szybkie wdrożenie", "A/B-ready struktura", "Pod kampanie reklamowe"],
    icon: "Rocket",
    topic: "Landing Page",
    prefillMessage: "Cześć, potrzebuję landing page pod kampanię/produkt. Chętnie pogadam o szczegółach i wycenie.",
  },
  {
    id: "firmowe",
    title: "Strony Firmowe",
    shortDesc: "Rozbudowana strona z wieloma podstronami — oferta, zespół, realizacje, blog.",
    longDesc:
      "Pełna strona firmowa z wieloma podstronami: oferta, o nas, zespół, realizacje, blog czy aktualności. Skalowalna struktura, która rośnie razem z Twoją firmą.",
    price: "od 1 500 PLN",
    bullets: ["Wiele podstron", "Panel CMS do edycji treści", "SEO od podstaw", "Skalowalna architektura"],
    icon: "Building2",
    topic: "Strony Firmowe",
    prefillMessage: "Cześć, jestem zainteresowany/a stroną firmową z kilkoma podstronami. Chętnie poznam szczegóły i wycenę.",
  },
  {
    id: "aplikacje",
    title: "Aplikacje Webowe",
    shortDesc: "Niestandardowe aplikacje z logowaniem, bazą danych i panelem użytkownika.",
    longDesc:
      "Dedykowane aplikacje webowe szyte pod konkretny proces biznesowy — logowanie i role użytkowników, baza danych, panele administracyjne, integracje z zewnętrznymi API. Pełny stack MERN.",
    price: "Wycena indywidualna",
    bullets: ["Logowanie i role użytkowników", "Baza danych i API", "Panel administracyjny", "Pełny stack MERN"],
    icon: "LayoutGrid",
    topic: "Aplikacje Webowe",
    prefillMessage: "Cześć, mam pomysł na aplikację webową i szukam developera. Chętnie omówię szczegóły i wycenę.",
  },
];