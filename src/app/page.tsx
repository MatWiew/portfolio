import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Offer } from "@/components/Offer";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { ContactPrefillProvider } from "@/components/ContactPrefillContext";

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
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ContactPrefillProvider>
  );
}
