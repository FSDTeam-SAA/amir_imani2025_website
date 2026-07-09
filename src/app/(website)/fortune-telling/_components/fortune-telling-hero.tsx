import React from "react";

export default function FortuneTellingHero() {
  const dots = Array.from({ length: 12 });

  return (
    <section className="relative overflow-hidden pt-2 text-[#f2eadf]">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="relative z-10 max-w-[620px]">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#768483]">
            <span className="rounded-full border border-[#203236] px-3 py-1">
              Doundo Fortune Telling
            </span>
            <span className="rounded-full border border-[#203236] px-3 py-1">
              12 symbols • 3 draws • 1 reading
            </span>
          </div>

          <h1 className="font-serif text-[48px] font-light leading-[0.98] tracking-[-0.03em] text-[#efe4d4] sm:text-[62px] lg:text-[70px]">
            <span className="block">Ask the twelve.</span>
            <span className="mt-1 block italic text-[#dd9448]">Choose three.</span>
          </h1>

          <p className="mt-7 max-w-[470px] text-[12px] leading-[1.7] text-[#99a39f]">
            A quiet ritual from the DoUndo universe. Twelve archetypes wait on
            the wheel — Ahura, Ares, Asgard, Enki, Gaia, Hera, Laozi, Mitra,
            Senta, Shaman, Shiva, Titan. Draw the past, the present, and what
            waits on the path.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.12em]">
            <button className="rounded-[2px] border border-[#e2974b] bg-[#e2974b] px-4 py-2.5 font-medium text-[#1b1713] transition-colors hover:bg-[#ed9f50]">
              Begin the reading
            </button>
            <button className="rounded-[2px] border border-[#4f5d5e] px-4 py-2.5 text-[#ced4ce] transition-colors hover:border-[#68777a]">
              How it works
            </button>
          </div>
        </div>

        <div className="pointer-events-none relative hidden h-[240px] lg:block">
          <div className="absolute right-0 top-0 h-[220px] w-[220px] rounded-full">
            <div className="absolute inset-0 rounded-full border border-[#294044]/60" />
            <div className="absolute inset-[14px] rounded-full border border-[#22383c]/50" />
            <div className="absolute inset-[30px] rounded-full border border-[#1a2d30]/50" />
            {dots.map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9803d]"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-108px)`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
