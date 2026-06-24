import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Offer } from "@/components/Offer";
import { Faq } from "@/components/Faq";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { ContactPrefillProvider } from "@/components/ContactPrefillContext";
import { CookieConsent } from "@/components/CookieConsent";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Mateusz Wiewióra",
    "image": "https://mateuszwiewiora.pl/og-image.jpg",
    "@id": "https://mateuszwiewiora.pl",
    "url": "https://mateuszwiewiora.pl",
    "telephone": "+48531784268",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Warszawa",
      "addressCountry": "PL"
    },
    "description": "Tworzę skalowalne aplikacje webowe od koncepcji po wdrożenie. React, Node.js, Express i MongoDB z naciskiem na wydajność.",
    "priceRange": "$$",
    "sameAs": [
      "https://github.com/MatWiew",
      "https://www.linkedin.com/in/mateusz-wiewiora/"
    ]
  };

  return (
    <ContactPrefillProvider>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className="min-h-screen bg-background text-foreground"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <ScrollProgress />
        <CustomCursor />
        <Nav />
        <Hero />
        <Offer />
        <Faq />
        <Projects />
        <Contact />
        <Footer />
        <CookieConsent />
      </div>
    </ContactPrefillProvider>
  );
}
