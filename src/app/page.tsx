import { SystemBar } from "@/components/ui/SystemBar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { CapabilityMatrix } from "@/components/sections/CapabilityMatrix";
import { Portfolio } from "@/components/sections/Portfolio";
import { Shop } from "@/components/sections/Shop";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="scanline-overlay">
      <SystemBar />
      <main>
        <Hero />
        <About />
        <CapabilityMatrix />
        <Portfolio />
        <Shop />
        <Contact />
      </main>
    </div>
  );
}
