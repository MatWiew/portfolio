import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import AnalyticsSync from "@/components/Analytics";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "800"],
});

const sans = DM_Sans({
  variable: "--font-sans-loaded",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
});

const siteUrl = "https://mateuszwiewiora.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mateusz Wiewióra — Full-Stack MERN Developer",
    template: "%s | Mateusz Wiewióra",
  },
  description:
    "Tworzę skalowalne aplikacje webowe od koncepcji po wdrożenie. Programista React, Node.js, Express i MongoDB. Zapraszam do współpracy.",
  keywords: [
    "Mateusz Wiewióra",
    "Full-Stack Developer",
    "MERN Developer",
    "React Developer",
    "Node.js Developer",
    "Programista stron internetowych",
    "Tworzenie aplikacji webowych",
    "Aplikacje internetowe na zamówienie",
    "Programista Warszawa",
    "Freelancer IT",
  ],
  authors: [{ name: "Mateusz Wiewióra", url: siteUrl }],
  creator: "Mateusz Wiewióra",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mateusz Wiewióra — Full-Stack MERN Developer",
    description:
      "Tworzę skalowalne aplikacje webowe od koncepcji po wdrożenie. React, Node.js, Express i MongoDB.",
    url: siteUrl,
    siteName: "Mateusz Wiewióra — Portfolio",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Placeholder - dodaj og-image.jpg do /public
        width: 1200,
        height: 630,
        alt: "Mateusz Wiewióra - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateusz Wiewióra — Full-Stack MERN Developer",
    description: "Tworzę skalowalne aplikacje webowe od koncepcji po wdrożenie.",
    creator: "@mateuszwiewiora",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased dark`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        style={{
          // map loaded next/font vars onto the design's expected var names
          // (font-sans/font-mono are referenced inline via style={{fontFamily: 'var(--font-sans)'}} across the page)
          ["--font-sans" as string]: "var(--font-sans-loaded)",
          ["--font-mono" as string]: "var(--font-mono-loaded)",
        }}
      >
        {/* Włączamy śledzenie GA i Clarity */}
        <AnalyticsSync />
        {children}
      </body>
    </html>
  );
}
