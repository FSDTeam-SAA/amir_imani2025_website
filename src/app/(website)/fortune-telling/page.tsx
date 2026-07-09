import React from "react";
import FortuneTellingHero from "./_components/fortune-telling-hero";
import TheReading from "./_components/the-reading";
import FourSteps from "./_components/four-step";
import ProductShot from "./_components/product-shot";

const page = () => {
  return (
    <main className="relative overflow-hidden bg-[#0b191d] text-[#f2eadf] scroll-smooth">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(21,44,46,0.85),_rgba(11,25,29,0.96)_42%,_#0b191d_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#d7ded5_0.8px,transparent_0.8px)] [background-size:38px_38px] opacity-[0.12]" />
        <div className="absolute left-[8%] top-[12%] h-[2px] w-[2px] rounded-full bg-[#d7ded5]/70" />
        <div className="absolute left-[24%] top-[30%] h-[1.5px] w-[1.5px] rounded-full bg-[#d7ded5]/70" />
        <div className="absolute right-[16%] top-[18%] h-[2px] w-[2px] rounded-full bg-[#d7ded5]/55" />
        <div className="absolute right-[24%] top-[46%] h-[1.5px] w-[1.5px] rounded-full bg-[#d7ded5]/50" />
        <div className="absolute left-[18%] bottom-[26%] h-[1.5px] w-[1.5px] rounded-full bg-[#d7ded5]/60" />
        <div className="absolute right-[12%] bottom-[14%] h-[2px] w-[2px] rounded-full bg-[#d7ded5]/50" />
      </div>

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
