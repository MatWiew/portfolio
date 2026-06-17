import { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "P.01",
    codename: "KLUB C4",
    category: "Booking · Real-Time",
    status: "LIVE",
    description:
      "System rezerwacji w czasie rzeczywistym dla klubu sportowego. Optymalizacja zapytań do bazy danych o 70%, synchronizacja stanu przez WebSockets.",
    stack: ["Node.js", "WebSockets", "PostgreSQL", "React"],
    challenge:
      "Klub miał problem z podwójnymi rezerwacjami i wolnym, blokującym UI przy dużym obciążeniu w godzinach szczytu — zapytania do bazy trwały nawet 1,2s.",
    solution:
      "Przeprojektowano schemat bazy i dodano indeksy kompozytowe, redukując czas zapytań o 70%. Wdrożono warstwę WebSocket synchronizującą dostępność slotów w czasie rzeczywistym między wszystkimi klientami, eliminując konflikty rezerwacji.",
    metrics: [
      { label: "Redukcja czasu zapytań", value: "70%" },
      { label: "Konflikty rezerwacji", value: "0" },
    ],
  },
  {
    id: "P.02",
    codename: "NATURALNY KOSZYK",
    category: "E-commerce · Headless",
    status: "LIVE",
    description:
      "Headless WooCommerce z frontendem na Next.js. LCP poniżej 1.2s na urządzeniach mobilnych, pełna optymalizacja SEO i Core Web Vitals.",
    stack: ["Next.js", "WooCommerce", "GraphQL", "Tailwind"],
    challenge:
      "Standardowy motyw WooCommerce ładował się ponad 4s na mobile, co przekładało się na wysoki współczynnik odrzuceń i słabe pozycje w wyszukiwarce.",
    solution:
      "Oddzielono frontend od WordPressa (architektura headless), komunikacja przez WPGraphQL. Statyczne generowanie stron produktowych (ISR), agresywne lazy-loading obrazów i cache na poziomie CDN sprowadziły LCP do poniżej 1.2s.",
    metrics: [
      { label: "LCP (mobile)", value: "<1.2s" },
      { label: "Lighthouse Performance", value: "98" },
    ],
  },
  {
    id: "P.03",
    codename: "CIPHER.IO",
    category: "Security · API",
    status: "LIVE",
    description:
      "Infrastruktura komunikacji end-to-end encrypted dla enterprise. Zgodność z FIPS 140-2. Obsługa 800k dziennych aktywnych użytkowników.",
    stack: ["Node.js", "WebSockets", "PostgreSQL", "K8s"],
    challenge:
      "Klient wymagał zgodności z FIPS 140-2 oraz skalowalności do setek tysięcy równoczesnych połączeń bez degradacji opóźnień.",
    solution:
      "Wdrożono szyfrowanie end-to-end zgodne z wymaganym standardem kryptograficznym oraz architekturę mikroserwisową na Kubernetes z horyzontalnym autoscalingiem, obsługującą 800k DAU przy stabilnym opóźnieniu.",
    metrics: [
      { label: "Dzienni aktywni użytkownicy", value: "800k" },
      { label: "Zgodność", value: "FIPS 140-2" },
    ],
  },
  {
    id: "P.04",
    codename: "DARKFRAME",
    category: "ML · Vision",
    status: "BETA",
    description:
      "Pipeline computer vision do wykrywania anomalii w środowiskach produkcyjnych. Modele PyTorch serwowane przez custom runtime ONNX.",
    stack: ["Python", "PyTorch", "ONNX", "FastAPI"],
    challenge:
      "Modele PyTorch były zbyt wolne do inferencji w czasie rzeczywistym na sprzęcie produkcyjnym, a standardowe API serwujące nie skalowało się pod obciążeniem.",
    solution:
      "Modele skonwertowano do formatu ONNX i serwowano przez custom runtime z optymalizacją grafu obliczeniowego, co kilkukrotnie zredukowało czas inferencji. FastAPI z asynchronicznym przetwarzaniem batchowym zapewniło stabilną przepustowość pod obciążeniem.",
    metrics: [{ label: "Status", value: "BETA" }],
  },
];
