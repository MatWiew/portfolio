// ─────────────────────────────────────────────────────────────────────────
// Dane sekcji "Projekty" (bento grid).
//
// WAŻNE: pole `image` jest OPCJONALNE. Część prac nie ma zdjęcia (np. praca
// pod NDA, drobna poprawka u klienta, projekt wewnętrzny) — w takim
// przypadku karta w bento grid wyświetli sam opis na neutralnym,
// wygenerowanym tle (gradient + wzór), żeby sekcja nigdy nie wyglądała na
// "zepsutą" czy niedokończoną.
//
// `span` i `tall` kontrolują rozmiar karty w gridzie (bento layout).
// ─────────────────────────────────────────────────────────────────────────

export type Project = {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  /** Opcjonalne — brak = karta tekstowa bez zdjęcia */
  image?: string;
  link?: string;
  github?: string;
  span?: string;
  tall?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Klub Szachowy C4",
    desc: "Strona klubu szachowego zaprojektowana pod młodego, energicznego odbiorcę — wyrazista identyfikacja wizualna, szybki SPA frontend i prosta nawigacja po sekcjach klubu.",
    tech: ["React", "SPA", "UI/UX", "Branding"],
    link: "https://klubc4.pl",
    span: "md:col-span-2",
    tall: true,
  },
  {
    id: 2,
    title: "Naturalny Koszyk — B2B",
    desc: "Dedykowana podstrona do współpracy biznesowej (B2B) dla sklepu spożywczego — osobny lejek ofertowy, czytelna prezentacja warunków współpracy dla partnerów handlowych.",
    tech: ["React", "B2B", "Landing Page"],
    link: "https://naturalnykoszyk.pl/b2b/",
    span: "",
    tall: false,
  },
  {
    id: 3,
    title: "Majk.com.pl — Ikony Sakralne",
    desc: "Projekt popupu dedykacji przy zakupie ikony oraz poprawki wizualne karty produktu w sklepie e-commerce ze sztuką sakralną.",
    tech: ["E-commerce", "UI Fixes", "Frontend"],
    link: "https://majk.com.pl/pl/p/Ikona-Matka-Boska-z-Guadalupe/165",
    span: "",
    tall: false,
  },
  {
    id: 4,
    title: "MR Pharmaceuticals (PT)",
    desc: "Poprawki wyświetlania i korekty wizualne dla strony portugalskiej firmy farmaceutycznej — dopracowanie responsywności i zgodności wizualnej między sekcjami.",
    tech: ["Frontend", "Responsywność", "QA wizualne"],
    link: "https://www.mrpharmaceuticals.pt",
    span: "",
    tall: false,
  },
  {
    id: 5,
    title: "MicToPC",
    desc: "Aplikacja zamieniająca telefon z Androidem w bezprzewodowy mikrofon dla komputera — działa przez Wi-Fi, bez kabli i sterowników. Dźwięk trafia do PC jako wirtualne urządzenie audio (VB-Cable), dostępne dla dowolnej aplikacji.",
    tech: ["C#", "Android", "Networking", "Audio"],
    github: "https://github.com/MatWiew/MicToPC",
    span: "md:col-span-2",
    tall: false,
  },
];
