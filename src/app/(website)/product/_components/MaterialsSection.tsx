import React from 'react';

export default function MaterialsSection() {
  const items = [
    {
      count: "72",
      title: "Illustrated cards",
      description: "6 of each symbol, across 3 rarities"
    },
    {
      count: "1",
      title: "Fabric game board",
      description: "Heavy linen, folds to book-size"
    },
    {
      count: "1",
      title: "Rules leaflet",
      description: "Letterpress, 8 pages, 4 languages"
    }
  ];

  return (
    <section className=" py-20 px-6 sm:px-12 md:px-20 lg:px-32 text-[#2A2A2A] font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Left Side: Heading & Intro */}
        <div className="space-y-6">
          <span className="text-[11px] tracking-[0.25em] font-semibold text-slate-500 uppercase block">
            In the box
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-light leading-[1.1] tracking-tight text-slate-900 max-w-md">
            Materials you&apos;ll want to leave on the table.
          </h2>
          <p className="text-base leading-relaxed text-slate-500 font-normal max-w-sm pt-2">
            Every component is made to age well — linen, pressed board, archival card stock. 
            Doundo is built for a shelf, not a closet.
          </p>
        </div>

        {/* Right Side: List Items */}
        <div className="border-t border-slate-200/60">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start py-8 border-b border-slate-200/60 last:border-b"
            >
              {/* Big Number */}
              <div className="w-20 sm:w-24 text-4xl sm:text-5xl font-light text-[#4A6B82] select-none">
                {item.count}
              </div>
              
              {/* Text Content */}
              <div className="space-y-1 pt-1">
                <h3 className="text-lg sm:text-xl font-normal text-slate-800">
                  {item.title}
                </h3>
                <p className="text-[13px] text-slate-400 font-normal tracking-wide">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}