import React from "react";
import Image from "next/image";

interface BoardAnatomySectionProps {
  title?: string;
  description?: string;
}

export default function BoardAnatomySection({
  title,
  description,
}: BoardAnatomySectionProps) {
  if (!title && !description) return null;

  return (
    <section className=" text-[#1A1A1A] px-6 py-16 md:py-24 container mx-auto font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <article className="w-full lg:col-span-5 flex flex-col space-y-4">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#5C6B73] uppercase">
            Board Anatomy
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] text-[#1A1A1A]">
            {title || "Board anatomy"}
          </h2>

          <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed font-light tracking-wide pt-2">
            {description}
          </p>
        </article>

        <div className="w-full lg:col-span-7 flex justify-center lg:justify-end">
          <div className="relative w-full aspect-[4/3] max-w-[640px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            <Image
              src="/gamedetails.svg"
              alt="Doundo Board Anatomy Illustration"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transform rotate-[-2deg]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
