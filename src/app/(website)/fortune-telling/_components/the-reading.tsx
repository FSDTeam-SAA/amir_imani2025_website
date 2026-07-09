"use client";

import React, { useState } from "react";

const CARDS_DATA = [
  {
    id: "ahura",
    name: "Ahura",
    title: "Above",
    icon: (
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
    ),
  },
  {
    id: "ares",
    name: "Ares",
    title: "Arms",
    icon: <path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z" />,
  },
  {
    id: "asgard",
    name: "Asgard",
    title: "Angel",
    icon: <path d="M12 2l9 7-9 7-9-7 9-7zm0 11l9 7-9 7-9-7 9-7z" />,
  },
  {
    id: "enki",
    name: "Enki",
    title: "Rain",
    icon: (
      <path d="M2 12h3a4 4 0 0 1 4 4 4 4 0 0 0 4 4h1a4 4 0 0 0 4-4 4 4 0 0 1 4-4h3M2 6h3a4 4 0 0 1 4 4 4 4 0 0 0 4 4h1a4 4 0 0 0 4-4 4 4 0 0 1 4-4h3" />
    ),
  },
  {
    id: "gaia",
    name: "Gaia",
    title: "Earth",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10M2 12h20" />
      </>
    ),
  },
  {
    id: "hera",
    name: "Hera",
    title: "Prize",
    icon: <path d="M6 3h12v3H6zm2 3h8v12H8zm-3 12h14v3H5z" />,
  },
  {
    id: "laozi",
    name: "Laozi",
    title: "Leaf",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 0 20M2 12h20" />
      </>
    ),
  },
  {
    id: "mitra",
    name: "Mitra",
    title: "Mist",
    icon: <path d="M3 15c2.2-2.2 4.2-3.3 6-3.3 2.1 0 3.4 1.2 5 1.2 1.7 0 3-.9 7-4" />,
  },
  {
    id: "senta",
    name: "Senta",
    title: "Stone",
    icon: <path d="M12 3.5c2.5 3 5.5 6.6 5.5 10.1A5.5 5.5 0 1 1 6.5 13.6c0-3.5 3-7.1 5.5-10.1Z" />,
  },
  {
    id: "shaman",
    name: "Shaman",
    title: "Stream",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v20M2 12h20" />
      </>
    ),
  },
  {
    id: "shiva",
    name: "Shiva",
    title: "Shot",
    icon: <path d="M18 6 6 18M6 6l12 12" />,
  },
  {
    id: "titan",
    name: "Titan",
    title: "Trace",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M12 4v16" />
      </>
    ),
  },
];

export default function TheReading() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleCardClick = (id: string) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
      return;
    }

    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, id]);
    }
  };

  return (
    <section className="relative pt-2 text-[#f2eadf]">
      <div className="space-y-3">
        <span className="block text-[9px] uppercase tracking-[0.26em] text-[#c9803d]">
          — the reading —
        </span>
        <h2 className="font-serif text-[38px] font-light leading-none tracking-[-0.03em] text-[#efe4d4] sm:text-[46px]">
          Step into the circle.
        </h2>
        <p className="max-w-[360px] text-[12px] leading-[1.65] text-[#99a39f]">
          Tap a card to claim it. Your first is the past, your second is the
          present, your third is what comes.
        </p>
      </div>

      <div className="relative mt-10 flex min-h-[430px] items-center justify-center">
        <div className="pointer-events-none absolute h-[310px] w-[310px] rounded-full sm:h-[360px] sm:w-[360px]">
          <div className="absolute inset-0 rounded-full border border-[#24363a]/70" />
          <div className="absolute inset-[28px] rounded-full border border-[#24363a]/40" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#24363a]/35" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#24363a]/35" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-[1px] w-3 origin-left bg-[#3a4d50]/60"
              style={{ transform: `rotate(${i * 45}deg) translateX(150px)` }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute z-20 flex flex-col items-center text-center">
          <div className="font-serif text-[24px] font-light tracking-[0.18em] text-[#dd9448]">
            {selectedCards.length}/3
          </div>
          <span className="mt-1 block text-[8px] uppercase tracking-[0.3em] text-[#738381]">
            selected
          </span>
        </div>

        <div className="relative z-10 grid w-full max-w-[536px] grid-cols-4 gap-3 sm:gap-4">
          {CARDS_DATA.map((card) => {
            const isSelected = selectedCards.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`group flex aspect-[0.76] cursor-pointer select-none flex-col items-center justify-center rounded-[2px] border bg-[#342117]/95 px-2 py-3 text-center transition-all duration-200 ${
                  isSelected
                    ? "border-[#dd9448] bg-[#3b261b] shadow-[0_0_0_1px_rgba(221,148,72,0.16)]"
                    : "border-[#533426] hover:border-[#76503b]"
                }`}
              >
                <svg
                  className={`h-[18px] w-[18px] fill-none stroke-[1.1] transition-colors ${
                    isSelected
                      ? "stroke-[#dd9448]"
                      : "stroke-[#d6cab7]/85 group-hover:stroke-[#efe4d4]"
                  }`}
                  viewBox="0 0 24 24"
                >
                  {card.icon}
                </svg>

                <h3
                  className={`mt-3 font-serif text-[12px] leading-none tracking-[0.01em] ${
                    isSelected ? "text-[#f2eadf]" : "text-[#efe4d4]"
                  }`}
                >
                  {card.name}
                </h3>

                <span className="mt-1 text-[8px] tracking-[0.18em] text-[#ad8f73]">
                  {card.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
