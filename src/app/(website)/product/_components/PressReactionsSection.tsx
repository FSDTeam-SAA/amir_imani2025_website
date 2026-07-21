import React from "react";
import { ProductPassAndPlayItem } from "@/lib/types/ecommerce";

interface PressReactionsSectionProps {
  title?: string;
  items?: ProductPassAndPlayItem[];
}

export default function PressReactionsSection({
  title,
  items,
}: PressReactionsSectionProps) {
  if (!items?.length) return null;

  return (
    <section className=" text-[#1A1A1A] px-6 py-16 md:py-24 container mx-auto font-sans">
      <div className="mb-4">
        <p className="text-[11px] font-bold tracking-[0.25em] text-[#5C6B73] uppercase">
          Pass &amp; Play
        </p>
      </div>

      <div className="max-w-2xl mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.15] text-[#1A1A1A]">
          {title || "Highlights from the game."}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#F4EFE6]  p-8 flex flex-col justify-between min-h-[260px] border border-[#EAE6DF]/40 shadow-sm"
          >
            <div className="space-y-6">
              <div className="text-2xl font-serif text-[#4A6B6C] font-bold tracking-tighter leading-none select-none">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <p className="text-base text-[#2E2E2E] font-light leading-relaxed tracking-wide">
                {item.message}
              </p>
            </div>

            <div className="pt-8 space-y-1">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#5C6B73] uppercase">
                {item.name || "Untitled"}
              </h4>
              <p className="text-xs text-[#8A8A8A] font-light font-serif italic">
                {item.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
