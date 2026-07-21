"use client";

import { motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

export default function FortuneTellingHero() {
  const dots = Array.from({ length: 13 });

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.section
      className="relative overflow-hidden pb-8 pt-2 text-[#f2eadf] scroll-mt-28 md:pb-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      <div className="relative min-h-[360px] md:min-h-[420px] lg:min-h-[500px]">
        <div className="relative z-10 max-w-[820px]">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#768483]">
            <span className="rounded-full border border-[#203236] px-3 py-1">
              DOUNDO FORTUNE TELLING
            </span>
            <span className="rounded-full border border-[#203236] px-3 py-1">
              13 SYMBOLS . 3 DRAWS . 1 READING Thirteen Symbols Wait.
            </span>
          </div>

          <h1 className="max-w-[760px] font-serif text-[46px] font-light leading-[0.98] tracking-[-0.04em] text-[#f3e9da] sm:text-[58px] md:text-[68px] lg:text-[78px]">
            <span className="block">Ask the twelve.</span>
            <span className="mt-1 block italic text-[#dd9448]">
              Choose three.
            </span>
          </h1>

          <p className="mt-6 max-w-[560px] text-[14px] leading-[1.8] text-[#a7b2ae] sm:text-[15px]">
            A quiet ritual from the world of DoUndo. Thirteen archetypes wait
            within the circle, each carrying a different force, memory, or
            warning. Draw the past, uncover the present, and glimpse what waits
            ahead.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.12em]">
            <motion.button
              type="button"
              onClick={() => scrollToSection("fortune-reading")}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-[2px] border border-[#e2974b] bg-[#e2974b] px-4 py-2.5 font-medium text-[#1b1713] transition-colors hover:bg-[#ed9f50]"
            >
              Enter The Circle
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollToSection("fortune-ritual")}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-[2px] border border-[#4f5d5e] px-4 py-2.5 text-[#ced4ce] transition-colors hover:border-[#68777a]"
            >
              Reading Guide
            </motion.button>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-[-48px] hidden md:block lg:right-[0] xl:right-[40px]">
          <div className="relative h-[240px] w-[240px] md:h-[300px] md:w-[300px] lg:h-[380px] lg:w-[380px] xl:h-[430px] xl:w-[430px]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(20,77,85,0.24),rgba(9,20,23,0)_70%)] blur-2xl" />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 48, ease: EASE_LINEAR, repeat: Infinity }}
            >
              <div className="absolute inset-0 rounded-full border border-[#3b5c61]/70 shadow-[0_0_100px_rgba(25,78,86,0.16)]" />
              <div className="absolute inset-[18px] rounded-full border border-[#304b50]/65 md:inset-[24px] lg:inset-[26px]" />
              <div className="absolute inset-[42px] rounded-full border border-[#20393d]/55 md:inset-[52px] lg:inset-[58px]" />
              <div className="absolute inset-[68px] rounded-full border border-[#1b3034]/45 md:inset-[80px] lg:inset-[92px]" />
              {dots.map((_, i) => {
                const angle = (i * 360) / 13;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e3a053] shadow-[0_0_20px_rgba(227,160,83,0.45)]"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-118px)`,
                    }}
                  />
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
