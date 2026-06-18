import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Templates } from "@/components/Templates";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <Hero />
      <Templates />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
