import React from 'react';

export default function MakingOfSection() {
  // Data for the bento grid items to keep code clean and modular
  const gridItems = [
    {
      title: "STUDIO",
      className: "col-span-12 md:col-span-6 row-span-2 bg-gradient-to-b from-[#5c3e2b] to-[#1f1610]",
      icon: (
        <svg className="w-10 h-10 opacity-30 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      )
    },
    {
      title: "PROTOTYPE",
      className: "col-span-12 sm:col-span-6 md:col-span-3 bg-gradient-to-b from-[#416a7a] to-[#1b2b32]",
      icon: (
        <div className="w-6 h-8 opacity-30 bg-white clip-diamond rotate-45 transform scale-75" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
      )
    },
    {
      title: "SYMBOLS",
      className: "col-span-12 sm:col-span-6 md:col-span-3 row-span-2 bg-gradient-to-b from-[#94442d] to-[#361a12]",
      icon: (
        <div className="w-8 h-8 opacity-30 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-1 h-5 bg-white"></div>
        </div>
      )
    },
    {
      title: "SKETCHES",
      className: "col-span-12 sm:col-span-6 md:col-span-3 bg-gradient-to-b from-[#7e735e] to-[#2c2821]",
      icon: (
        <div className="w-6 h-6 opacity-30 bg-white rounded-t-full rotate-45"></div>
      )
    },
    {
      title: "BOX DESIGN",
      className: "col-span-12 md:col-span-6 bg-gradient-to-b from-[#2e4d58] to-[#142126]",
      icon: (
        <svg className="w-12 h-12 opacity-30 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
      )
    },
    {
      title: "PROCESS",
      className: "col-span-12 sm:col-span-6 md:col-span-3 bg-gradient-to-b from-[#7a623f] to-[#2b2216]",
      icon: (
        <div className="w-6 h-8 opacity-30 bg-white rounded-full scale-x-75"></div>
      )
    },
    {
      title: "STUDIO DAY",
      className: "col-span-12 sm:col-span-6 md:col-span-3 bg-gradient-to-b from-[#5c4669] to-[#201824]",
      icon: (
        <div className="w-4 h-8 opacity-30 bg-white rounded-l-full rotate-12"></div>
      )
    }
  ];

  return (
    <section className="bg-[#110f0c] text-white font-sans px-6 py-20 md:py-28">
      {/* Header Container */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-6 mb-12 md:mb-16">
        <div>
          <span className="text-[10px] tracking-[0.2em] font-bold text-[#577b8a] uppercase block mb-3">
            Behind the Scenes
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-md">
            The Making <br /> of <span className="text-[#577b8a]">DoUndo.</span>
          </h2>
        </div>
        
        <div className="md:max-w-xs md:pt-8">
          <p className="text-xs md:text-sm text-[#888888] leading-relaxed font-light">
            A glimpse into the studio — sketches, prototypes, photo shoots, and the moments where ideas become objects you can hold.
          </p>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="container mx-auto grid grid-cols-12 auto-rows-[160px] gap-4">
        {gridItems.map((item, index) => (
          <div
            key={index}
            className={`${item.className} relative rounded-md p-6 flex flex-col justify-between overflow-hidden group cursor-pointer transition-all duration-300 hover:brightness-110`}
          >
            {/* Centered Decorative Icon Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {item.icon}
            </div>

            {/* Empty space filler for flex-col top alignment layout */}
            <div></div>

            {/* Label at the bottom-left */}
            <span className="text-[10px] font-bold tracking-[0.15em] text-white/70 uppercase relative z-10">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}