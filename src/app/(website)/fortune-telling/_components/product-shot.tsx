import React from "react";

export default function ProductShot() {
  return (
    <section className="border border-[#1d292b] bg-[#121b1d]/92 px-5 py-5 text-[#f2eadf] sm:px-6 sm:py-6">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="max-w-[360px] space-y-4">
          <span className="block text-[9px] uppercase tracking-[0.26em] text-[#c9803d]">
            — the game —
          </span>

          <h2 className="font-serif text-[34px] font-light leading-[1.02] tracking-[-0.03em] text-[#efe4d4] sm:text-[40px]">
            The wheel lives on a table, too.
          </h2>

          <p className="text-[11px] leading-[1.65] text-[#99a39f]">
            DoUndo is a board card game built around these same twelve symbols
            — one language, many games. Strategy, perception, imagination,
            story. Bring the circle into the room.
          </p>

          <div className="flex flex-wrap gap-3 pt-1 text-[10px] uppercase tracking-[0.12em]">
            <button className="rounded-[2px] border border-[#e2974b] bg-[#e2974b] px-4 py-2.5 font-medium text-[#1b1713] transition-colors hover:bg-[#ed9f50]">
              Shop the game
            </button>
            <button className="rounded-[2px] border border-[#4f5d5e] px-4 py-2.5 text-[#ced4ce] transition-colors hover:border-[#68777a]">
              About DoUndo
            </button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[430px] border border-[#3c271b] bg-[#21150f] px-4 py-3">
            <div className="text-[9px] tracking-[0.18em] text-[#8f6848]">
              {"// product shot — DoUndo box"}
            </div>

            <div className="relative mt-3 flex aspect-[1.5] items-center justify-center overflow-hidden border border-[#6b4a34] bg-[#2a1b14]">
              <div
                className="absolute inset-[12%] border border-[#d0c6b8]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(208,198,184,0.22) 0 1px, transparent 1px 8px)",
                }}
              />
              <div className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[#dd9448]">
                <span className="font-serif text-[15px] font-light tracking-[-0.02em] text-[#efe4d4]">
                  DoUndo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
