import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutSectionPixelPerfect() {
  return (
    <section className="bg-[#6C9BB0] py-20 px-6 md:px-12 lg:px-24  flex items-center justify-center font-sans selection:bg-[#E97443]/20">
      {/* Main Container */}
      <div className=" mx-auto container w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Content Column (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-white">
          <span className="text-white/80 text-[11px] font-bold tracking-[0.25em] uppercase block mb-5">
            ABOUT DOUNDO
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
            Thirteen Symbols.<br />Infinite Worlds.
          </h2>
          
          <p className="text-white/90 text-sm md:text-base max-w-xl leading-relaxed mb-12 font-normal antialiased">
The same thirteen symbols return across
every DoUndo experience, connecting
strategy, story, and imagination through
one shared universe.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-12 max-w-md">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">13</div>
              <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">
                SYMBOLS
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">1</div>
              <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">
                UNIVERSE
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">∞</div>
              <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">
                GAMES COMING
              </div>
            </div>
          </div>

          {/* Read Our Story Button */}
          <div>
            <Link
              href="/about-us"
              className="inline-block bg-[#F04D2A] hover:bg-[#d66332] text-white text-xs font-bold tracking-[0.2em] uppercase px-9 py-4 transition-colors duration-200 rounded-none shadow-md"
            >
              Read Our Story
            </Link>
          </div>
        </div>

        {/* Right Portrait Image Card (5 Columns) */}
        <div className="lg:col-span-5 w-full bg-[#F5EBD4] p-10 min-h-[480px] lg:min-h-[560px] flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group self-stretch lg:translate-y-4">
          
          <Image
            src="/Thirteen-Symbols.jpg"
            alt="The thirteen DoUndo symbols"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Bottom Banner Tag (BORN FROM ANCIENT SYMBOLS) */}
          <div className="mt-auto relative z-10">
            <span className="bg-[#171513] text-white text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-2.5 inline-block">
              BORN FROM ANCIENT SYMBOLS
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
