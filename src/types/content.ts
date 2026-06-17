export type ProjectStatus = "LIVE" | "BETA" | "OSS" | "ARCHIVED";

export interface Project {
  id: string; // e.g. "P.01"
  codename: string; // e.g. "NEUROVAULT"
  category: string; // e.g. "SaaS · FinTech"
  status: ProjectStatus;
  description: string;
  stack: string[];
  href?: string; // case study link / slug
  metrics?: { label: string; value: string }[];
  /** The technical problem this project solved. */
  challenge?: string;
  /** How it was solved technically. */
  solution?: string;
}

export interface CapabilityItem {
  label: string;
  value: number; // 0-100
}

export interface CapabilityGroup {
  id: string; // e.g. "WND.02.FRO"
  title: string; // e.g. "FRONTEND"
  items: CapabilityItem[];
}

export interface OperatorMetric {
  value: string;
  label: string;
}

export type TemplateCategory =
  | "E-commerce"
  | "Korporacyjna"
  | "Portfolio"
  | "Booking"
  | "SaaS"
  | "Landing";

/** Stack technologiczny, w jakim dany szablon może zostać dostarczony klientowi. */
export type DeliveryStack = "WordPress" | "MERN" | "WooCommerce";

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  /** W czym może być zrealizowany u klienta — niezależnie od tego, w czym jest live preview. */
  deliveryStack: DeliveryStack[];
  description: string;
  price?: number;
  available: boolean; // false = "SOON"
  previewImage?: string;
  /** Adres żywego, klikalnego dema (zawsze Next.js/MERN, hostowane np. na Vercel). */
  previewUrl?: string;
  href?: string;
}

export type ContactTopic =
  | "template"
  | "collaboration"
  | "project"
  | "other";

export interface ContactFormData {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
}
