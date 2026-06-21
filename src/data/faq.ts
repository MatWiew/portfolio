// ─────────────────────────────────────────────────────────────────────────
// Dane sekcji "Często zadawane pytania".
// Pogrupowane w 4 kategorie zgodnie z logiką: proces → technologia →
// finanse → koszty dodatkowe (od najbardziej "miękkich" obaw klienta po
// twarde, transparentne liczby).
// ─────────────────────────────────────────────────────────────────────────

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  id: string;
  label: string;
  /** Nazwa ikony z lucide-react, mapowana w komponencie Faq.tsx */
  icon: "Clock" | "Sparkles" | "Wallet" | "Banknote";
  items: FaqItem[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "proces",
    label: "Proces i czas",
    icon: "Clock",
    items: [
      {
        q: "Ile trwa stworzenie strony internetowej?",
        a: "Proste strony typu Wizytówka lub Landing Page jestem w stanie przygotować w 5–7 dni roboczych od momentu dostarczenia wszystkich materiałów. Bardziej rozbudowane strony firmowe oraz sklepy internetowe zazwyczaj zajmują od 2 do 4 tygodni.",
      },
      {
        q: "Jak wygląda proces współpracy?",
        a: "Całość zamyka się w 4 prostych krokach:\n\n1. Brief i rozmowa: Ustalamy, czego dokładnie potrzebujesz i zbieram materiały.\n2. Projekt i kodowanie: Tworzę nowoczesną, szybką stronę zgodnie z naszymi ustaleniami.\n3. Testy i poprawki: Sprawdzamy działanie na telefonach i komputerach, nanosząc Twoje uwagi.\n4. Wdrożenie: Przekazuję gotową stronę na Twój hosting i domenę.",
      },
    ],
  },
  {
    id: "technologia",
    label: "Edycja i technologia",
    icon: "Sparkles",
    items: [
      {
        q: "Czy po zakończeniu projektu poradzę sobie z samodzielną edycją treści?",
        a: "Tak! Strony firmowe i sklepy opieram na intuicyjnym systemie zarządzania treścią (CMS). Po wdrożeniu otrzymujesz ode mnie czysty, prosty panel, w którym bez znajomości kodu zmienisz teksty, podmienisz zdjęcia czy dodasz nowy wpis na blogu lub produkt.",
      },
      {
        q: "Czy moja strona będzie działać poprawnie na telefonach?",
        a: "Oczywiście. Responsywność (RWD) to u mnie standard, a nie usługa dodatkowa. Każda strona jest od podstaw projektowana tak, aby wyglądała i działała perfekcyjnie zarówno na najnowszym smartfonie, jak i dużym monitorze biurkowym.",
      },
    ],
  },
  {
    id: "finanse",
    label: "Finanse i formalności",
    icon: "Wallet",
    items: [
      {
        q: "Czy cena podana w ofercie jest ostateczna?",
        a: "Ceny w sekcji „Oferta” to stawki startowe („od...”) za standardowe pakiety. Ostateczny koszt zależy od Twoich indywidualnych wymagań (np. liczby podstron, niestandardowych animacji czy integracji z zewnętrznymi systemami). Pełną wycenę poznasz zawsze przed rozpoczęciem jakichkolwiek prac.",
      },
      {
        q: "Co muszę przygotować przed rozpoczęciem prac?",
        a: "Najważniejsze są teksty (informacje o firmie, opisy usług) oraz zdjęcia/logo, jeśli je posiadasz. Jeżeli nie masz gotowych materiałów, pomogę Ci je zaplanować lub podpowiem, skąd wziąć darmowe, profesjonalne fotografie (tzw. stocki).",
      },
    ],
  },
  {
    id: "koszty",
    label: "Koszty dodatkowe",
    icon: "Banknote",
    items: [
      {
        q: "Jakie są dodatkowe koszty utrzymania strony?",
        a: "Po mojej stronie płacisz jednorazowo za wykonanie projektu. Jedyne cykliczne koszty, które musisz opłacić u zewnętrznych dostawców, to utrzymanie domeny (Twój adres www) oraz hostingu (serwer, na którym stoi strona) – zazwyczaj jest to koszt od kilkudziesięciu do około dwustu złotych rocznie. Pomagam w ich darmowej konfiguracji.",
      },
    ],
  },
];
