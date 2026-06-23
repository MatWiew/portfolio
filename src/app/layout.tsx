import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Clarity from '@microsoft/clarity';
import "./globals.css";

const projectId = "xbh4b3w16l"

Clarity.init(projectId);

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
  title: "Mateusz Wiewióra — Full-Stack MERN Developer",
  description:
    "Tworzę skalowalne aplikacje webowe od koncepcji po wdrożenie. React, Node.js, Express i MongoDB z naciskiem na wydajność i doświadczenie użytkownika.",
  keywords: [
    "Mateusz Wiewióra",
    "Full-Stack Developer",
    "MERN Developer",
    "React",
    "Node.js",
    "Programista stron internetowych",
    "Tworzenie aplikacji webowych",
  ],
  authors: [{ name: "Mateusz Wiewióra", url: siteUrl }],
  openGraph: {
    title: "Mateusz Wiewióra — Full-Stack MERN Developer",
    description:
      "Tworzę skalowalne aplikacje webowe od koncepcji po wdrożenie. React, Node.js, Express i MongoDB.",
    url: siteUrl,
    siteName: "Mateusz Wiewióra — Portfolio",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateusz Wiewióra — Full-Stack MERN Developer",
    description:
      "Tworzę skalowalne aplikacje webowe od koncepcji po wdrożenie.",
  },
  robots: { index: true, follow: true },
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
        {children}
        {/* Pierwszy skrypt ładujący bibliotekę Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9TB50FXKYZ"
          strategy="afterInteractive"
        />

        {/* Drugi skrypt inicjalizujący GA z domyślną odmową (denied) */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Ustawienie domyślnego braku zgody na analitykę i reklamy przed konfiguracją
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });

            gtag('js', new Date());
            gtag('config', 'G-9TB50FXKYZ');
          `}
        </Script>
      </body>
    </html>
  );
}
