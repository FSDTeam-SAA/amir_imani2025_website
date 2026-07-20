import React from "react";
import { ProductRule } from "@/lib/types/ecommerce";

interface GameRulesSectionProps {
  title?: string;
  rules?: ProductRule[];
}

export default function GameRulesSection({
  title,
  rules,
}: GameRulesSectionProps) {
  if (!rules?.length) return null;

  return (
    <section
      id="game-rules"
      className=" text-[#1A1A1A] px-6 py-16 md:py-24 container font-sans"
    >
      <div className="mb-6">
        <p className="text-[11px] font-bold tracking-[0.2em] text-[#5C6B73] uppercase">
          How to Play
        </p>
      </div>

      <div className="max-w-4xl mb-16 md:mb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15]">
          {title || "Learn how the game works."}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#EAE6DF]">
        {rules.map((step, index) => (
          <div
            key={`${step.num || index}-${step.title || "rule"}`}
            className={`pt-8 pb-8 md:pb-12 flex flex-col space-y-4 lg:px-6 first:pl-0 last:pr-0
              border-b md:border-b-0 border-[#EAE6DF] 
              ${index % 2 !== 0 ? "md:pl-6" : "md:pr-6"}
              ${index > 0 ? "lg:border-l lg:border-[#EAE6DF]" : ""}
            `}
          >
            <span className="text-xs font-semibold tracking-wider text-[#9C9A96]">
              {step.num || String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="text-2xl font-normal tracking-tight text-[#1A1A1A]">
              {step.title || `Step ${index + 1}`}
            </h3>

            <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed font-light font-sans tracking-wide">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
