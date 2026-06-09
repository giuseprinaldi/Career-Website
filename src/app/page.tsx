import SiteShell from "@/components/SiteShell";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import RoleFit from "@/components/sections/RoleFit";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SiteShell>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Hero />
        <About />
        <Portfolio />
        <RoleFit />
        <Journey />
        <Contact />
      </div>
    </SiteShell>
  );
}
