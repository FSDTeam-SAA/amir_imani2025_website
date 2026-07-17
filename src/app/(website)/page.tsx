import AboutSectionPixelPerfect from "@/components/shared/AboutSection";
import AnimatedGalaxySection from "@/components/shared/AnimatedGalaxySection";
import FAQ from "@/components/shared/FAQ";
import GameSection from "@/components/shared/GameSection";

import Hero from "@/components/shared/Hero";
import LeftToRightMarquee from "@/components/shared/LeftToRightMarquee";
import PantheonInteractiveSection from "@/components/shared/PantheonInteractiveSection";
import HomeSectionReveal from "@/components/home/HomeSectionReveal";

export default function Home() {
  return (
    <div className=" ">
      <Hero />
      <HomeSectionReveal>
        <LeftToRightMarquee />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <GameSection />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <AboutSectionPixelPerfect />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <PantheonInteractiveSection />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <AnimatedGalaxySection />
      </HomeSectionReveal>
      {/* <About /> */}
      {/* <Products /> */}
      {/* <GetInTouch /> */}
      <HomeSectionReveal>
        <FAQ />
      </HomeSectionReveal>
    </div>
  );
}
