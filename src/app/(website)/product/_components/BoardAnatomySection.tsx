import React from "react";
import Image from "next/image";

export default function BoardAnatomySection() {
  return (
    <section className=" text-[#1A1A1A] px-6 py-16 md:py-24 container mx-auto font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column - Text Content (Spans 5 of 12 columns for perfect asymmetric split) */}
        <article className="w-full lg:col-span-5 flex flex-col space-y-4">
          {/* Section Tagline */}
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#5C6B73] uppercase">
            Board Anatomy
          </p>

          {/* Core Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] text-[#1A1A1A]">
            Sixteen spaces. Three layers. Forty-eight decisions per round.
          </h2>

          {/* Detailed Paragraph Block */}
          <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed font-light tracking-wide pt-2">
            The game is played across three stackable layers. Each of the 16 
            card spaces can hold up to three cards, one per layer. Cards are 
            stacked so the bottom of each face stays visible — you can 
            always see the full symbol, even as the tower grows. When the 
            third layer locks, either a row matches or the round ends in a tie.
          </p>
        </article>

        {/* Right Column - Dummy Image Slot (Spans 7 of 12 columns to allow massive visual layout presence) */}
        <div className="w-full lg:col-span-7 flex justify-center lg:justify-end">
          {/* 
            Container setup to receive your graphic matching image_91d8a6.png. 
            Aspect ratio is set to fit standard close-up preview captures nicely.
          */}
          <div className="relative w-full aspect-[4/3] max-w-[640px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            <Image
              src="/gamedetails.svg" // <-- Replace this path with your uploaded image file path
              alt="Doundo Board Anatomy Illustration"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transform rotate-[-2deg]" // Added subtle default angle mapping the screenshot style
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}