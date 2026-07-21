import React from "react";

type RightToLeftMarqueeProps = {
  active: boolean;
};


export default function RightToLeftMarquee({active}:RightToLeftMarqueeProps) {
  const words = [
    "Ares", "Shiva", "Gaia", "Shaman", "Enki", 
    "Hera", "Mitra", "Ahura", "Asgard", "Titan", "Laozi", "Setna", "Ziggy"
  ];

  const repeatedWords = [...words, ...words, ...words];

  return (
    <div className={`w-full overflow-hidden ${ active ? "bg-[#f0eddc]" : "bg-[#FCF8EF]"}  py-6 border-y border-stone-200`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-right-to-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: scroll-right-to-left 25s linear infinite;
        }
      `}} />

      <div className="relative flex w-full">
        <div className="flex items-center gap-8 md:gap-12 whitespace-nowrap animate-marquee-left">
          {repeatedWords.map((word, index) => (
            <React.Fragment key={`${word}-${index}`}>
              <span className="text-stone-800 text-sm md:text-base font-semibold tracking-[0.2em] uppercase font-sans selection:bg-transparent">
                {word}
              </span>
              <span
                aria-hidden="true"
                className="text-[#28A8B5] text-sm md:text-base leading-none selection:bg-transparent"
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
