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
  { value: "3+", label: "YRS ACTIVE" },
  { value: "100%", label: "EYE-CATCHING DESIGN" },
  { value: "0", label: "THIRD-PARTY BOILERPLATES" },
  { value: "100%", label: "UPTIME MAINTAINED" },
];

export const operatorAbout = {
  designation:
    "Full-Stack Engineer z doświadczeniem w MERN stack oraz ekosystemie WordPress / WooCommerce.",
  origin:
    "Polska → Remote / Global. Dostępny do współpracy nad projektami e-commerce, SaaS, oraz custom developmentem.",
  philosophy:
    "Skupiam się na projektowaniu stron, które budzą emocje i zostają w głowie na długo.",
  tags: ["MERN Stack", "WordPress", "WooCommerce", "Performance"],
};
