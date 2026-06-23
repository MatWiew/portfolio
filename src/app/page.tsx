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
  return (
    <ContactPrefillProvider>
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
