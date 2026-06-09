import SiteShell from "@/components/SiteShell";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import RoleFit from "@/components/sections/RoleFit";
import Journey from "@/components/sections/Journey";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SiteShell>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Hero />
        <About />
        <RoleFit />
        <Journey />
        <Skills />
        <Portfolio />
        <Contact />
      </div>
    </SiteShell>
  );
}
