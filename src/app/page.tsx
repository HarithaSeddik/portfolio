import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { BeyondCode } from "@/components/sections/beyond-code";
import { Contact } from "@/components/sections/contact";
import { DirectionalTransition } from "@/components/ui/page-transition";
import { ParallaxEffects } from "@/components/ui/parallax-effects";

function SectionDivider() {
  return (
    <div className="flex justify-center py-2 overflow-hidden" aria-hidden="true">
      <span
        data-parallax="divider"
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--amber)", opacity: 0.25 }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <DirectionalTransition>
      <ParallaxEffects />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <TechStack />
      <SectionDivider />
      <BeyondCode />
      <SectionDivider />
      <Contact />
    </DirectionalTransition>
  );
}
