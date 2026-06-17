import { CapabilityGroup, OperatorMetric } from "@/types/content";

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "WND.02.FRO",
    title: "FRONTEND",
    items: [
      { label: "TypeScript / React", value: 96 },
      { label: "Next.js / Vite", value: 92 },
      { label: "CSS / Animation", value: 88 },
    ],
  },
  {
    id: "WND.02.BAC",
    title: "BACKEND",
    items: [
      { label: "Node.js / Express", value: 94 },
      { label: "WordPress / WooCommerce", value: 90 },
      { label: "PostgreSQL / Redis", value: 88 },
    ],
  },
  {
    id: "WND.02.INF",
    title: "INFRA",
    items: [
      { label: "Performance / Lighthouse", value: 95 },
      { label: "Docker / CI-CD", value: 85 },
      { label: "SEO / Core Web Vitals", value: 93 },
    ],
  },
];

export const operatorMetrics: OperatorMetric[] = [
  { value: "6+", label: "YRS ACTIVE" },
  { value: "40+", label: "SYSTEMS SHIPPED" },
  { value: "2M+", label: "REQUESTS HANDLED" },
  { value: "99.9%", label: "UPTIME MAINTAINED" },
];

export const operatorAbout = {
  designation:
    "Full-Stack Engineer z głębokimi korzeniami w MERN stack oraz ekosystemie WordPress / WooCommerce.",
  origin:
    "Polska → Remote / Global. Wdrożone systemy produkcyjne obsługujące tysiące dziennych zapytań.",
  philosophy:
    "Kod jako architektura. Każda linia ma znaczenie. Obsesja na punkcie wydajności, DX i wdrożeń bez przestojów.",
  tags: ["MERN Stack", "WordPress", "WooCommerce", "Performance"],
};
