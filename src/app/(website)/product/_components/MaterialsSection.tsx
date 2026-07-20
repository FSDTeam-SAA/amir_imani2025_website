import React from "react";

interface MaterialsSectionProps {
  title?: string;
  items?: Array<{
    count: string;
    title: string;
    description: string;
  }>;
}

export default function MaterialsSection({
  title,
  items,
}: MaterialsSectionProps) {
  if (!items?.length) return null;

  return (
    <section className=" py-20 px-6 sm:px-12 md:px-20 lg:px-32 text-[#2A2A2A] font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="space-y-6">
          <span className="text-[11px] tracking-[0.25em] font-semibold text-slate-500 uppercase block">
            Materials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-light leading-[1.1] tracking-tight text-slate-900 max-w-md">
            {title || "Materials and care details."}
          </h2>
        </div>

        <div className="border-t border-slate-200/60">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start py-8 border-b border-slate-200/60 last:border-b"
            >
              <div className="w-20 sm:w-24 text-4xl sm:text-5xl font-light text-[#4A6B82] select-none">
                {item.count}
              </div>
              
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
