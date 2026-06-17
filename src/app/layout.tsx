import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mateusz Wiewióra — Full-Stack Engineer & Systems Architect",
  description:
    "Building high-velocity infrastructure at the intersection of performance and precision. MERN, WordPress, WooCommerce — production systems shipped at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${jetbrainsMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-void text-text-primary font-mono selection:bg-accent-green/30 selection:text-accent-green">
        {children}
      </body>
    </html>
  );
}
