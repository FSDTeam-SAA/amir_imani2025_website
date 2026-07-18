import React from "react";
import FortuneTellingHero from "./_components/fortune-telling-hero";
import TheReading from "./_components/the-reading";
import FourSteps from "./_components/four-step";
import ProductShot from "./_components/product-shot";
import StarfieldBackground from "./_components/starfield-background";

const page = () => {
  return (
    <main className="relative overflow-hidden bg-[#0b191d] text-[#f2eadf] scroll-smooth">
      <StarfieldBackground />

      <div className="container relative flex w-full flex-col gap-24 px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-28">
        <FortuneTellingHero />
        <TheReading />
        <FourSteps />
        <ProductShot />
      </div>
    </main>
  );
};

export default page;
