import { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "P.01",
    codename: "KLUB C4",
    category: "Web Development · Landing Page",
    status: "LIVE",
    description:
      "Nowoczesna, dynamiczna strona internetowa zaprojektowana pod kątem młodszej grupy odbiorców. Skupiona na mocnym efekcie wizualnym, płynnych przejściach i pełnej responsywności.",
    stack: ["HTML5", "CSS3 / SCSS", "JavaScript", "Responsive Design"],
    challenge:
      "Stworzenie projektu, który przełamie schemat nudnych stron i natychmiast przyciągnie uwagę młodego klienta, zachowując przy tym lekkość działania.",
    solution:
      "Wdrożono nieszablonowy, dynamiczny layout zoptymalizowany pod kątem urządzeń mobilnych, z intuicyjną nawigacją i strukturą ułatwiającą szybki kontakt.",
    metrics: [
      { label: "Odbiorcy", value: "MŁODZI" },
      { label: "Dostosowanie", value: "MOBILE" },
    ],
  },
  {
    id: "P.02",
    codename: "NATURALNY KOSZYK B2B",
    category: "E-commerce · Business Architecture",
    status: "LIVE",
    description:
      "Dedykowana podstrona biznesowa zaprojektowana i wdrożona na potrzeby obsługi partnerów hurtowych i współpracy handlowej (B2B).",
    stack: ["WordPress", "WooCommerce", "B2B Logic", "UI Optimization"],
    challenge:
      "Stworzenie przejrzystego, profesjonalnego punktu styku dla klientów biznesowych wewnątrz istniejącego ekosystemu sklepu, oddzielonego od standardowej oferty detalicznej.",
    solution:
      "Zaprojektowano i zakodowano dedykowaną architekturę podstrony B2B z logicznym układem korzyści, formularzem weryfikacyjnym i ścieżką rejestracji dla hurtowników.",
    metrics: [
      { label: "Segment", value: "B2B" },
      { label: "Struktura", value: "DEDYKOWANA" },
    ],
  },
  {
    id: "P.03",
    codename: "MAJK (KREATOR POPUP)",
    category: "Custom Dev · E-commerce",
    status: "LIVE",
    description:
      "Wdrożenie dedykowanego modułu popupu do personalizacji zamówień (kreator dedykacji) oraz zaawansowane poprawki wizualne interfejsu sklepu.",
    stack: ["JavaScript", "E-commerce UX", "Custom Scripting", "CSS"],
    challenge:
      "Sklep potrzebował intuicyjnego mechanizmu dodawania własnych dedykacji do produktów, bez obciążania procesu zakupowego i psucia layoutu.",
    solution:
      "Napisano customowy skrypt obsługujący popup dedykacji zintegrowany z koszykiem. Przeprowadzono serię poprawek wizualnych, które poprawiły czytelność i wygląd kart produktowych.",
    metrics: [
      { label: "Funkcja", value: "CUSTOM POPUP" },
      { label: "Interfejs", value: "POPRAWIONY" },
    ],
  },
  {
    id: "P.04",
    codename: "MR PHARMACEUTICALS",
    category: "Optimization · UI Bugfixing",
    status: "LIVE",
    description:
      "Prace optymalizacyjne i naprawcze nad warstwą wizualną międzynarodowego serwisu e-commerce w celu eliminacji błędów renderowania.",
    stack: ["Frontend Dev", "UI Debugging", "Cross-Browser CSS", "Optimization"],
    challenge:
      "Serwis posiadał błędy w wyświetlaniu elementów layoutu na różnych rozdzielczościach, co negatywnie wpływało na profesjonalny odbiór strony.",
    solution:
      "Zlokalizowano i naprawiono konflikty w plikach stylów, zoptymalizowano wyświetlanie kluczowych sekcji UI i zapewniono pełną spójność wizualną na ekranach desktopowych i mobile.",
    metrics: [
      { label: "Obszar", value: "WIZUALNY" },
      { label: "Błędy UI", value: "RESOLVED" },
    ],
  },
];