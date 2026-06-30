"use client";

import React, { useRef, useState } from "react";

const recommendedProducts = [
  {
    name: "Ahura",
    tag: "TEE - AHURA",
    price: "$48",
    desc: "Light & truth",
    // Light T-shirt / Apparel image
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600", 
    isDarkTag: false,
  },
  {
    name: "Ares",
    tag: "TEE - ARES",
    price: "$48",
    desc: "War & courage",
    // Dark/Teal tone or Minimalist Apparel image
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600",
    isDarkTag: true,
  },
  {
    name: "Enki",
    tag: "TEE - ENKI",
    price: "$48",
    desc: "Water & wisdom",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    isDarkTag: false,
  },
  {
    name: "Gaia",
    tag: "TEE - GAIA",
    price: "$48",
    desc: "Earth & creation",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600",
    isDarkTag: true,
  },
  {
    name: "Odin",
    tag: "TEE - ODIN",
    price: "$48",
    desc: "Wisdom & shadow",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    isDarkTag: false,
  },
  {
    name: "Zeus",
    tag: "TEE - ZEUS",
    price: "$48",
    desc: "Thunder & sky",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600",
    isDarkTag: true,
  },
];

export default function ProductImageSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // স্মুথ ড্র্যাগ-টু-স্ক্রোল (Right to Left) ফাংশনালিটি
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // স্লাইড স্পীড কন্ট্রোল
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-[#FAF6EE] text-[#171513] py-10">
      <div className="container ">
        
        {/* Header: Title & View All Button */}
        <div className="flex items-end justify-between pr-6 md:pr-12 lg:pr-24 mb-12">
          <div className="space-y-3">
            <span className="text-[#3A8B91] text-[10px] font-bold tracking-[0.3em] uppercase block">
              COMPLETE THE PANTHEON
            </span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-stone-950">
              More from the Series.
            </h2>
          </div>
          
          <button className="border border-stone-950 px-6 py-3 text-[11px] font-bold tracking-widest uppercase bg-transparent hover:bg-stone-950 hover:text-[#FAF6EE] transition-colors duration-200 flex items-center gap-4 shrink-0">
            VIEW ALL 12 <span className="text-xs">→</span>
          </button>
        </div>

        {/* Horizontal Slider Area */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-auto pb-8 pr-6 md:pr-12 scrollbar-none select-none cursor-grab active:cursor-grabbing scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {recommendedProducts.map((product, index) => (
            <div 
              key={index} 
              className="w-[260px] md:w-[290px] shrink-0 flex flex-col space-y-4"
            >
              {/* Product Visual Frame Box with Image Background */}
              <div className="w-full aspect-[4/5] relative p-5 flex flex-col justify-end overflow-hidden border border-stone-300/30 bg-stone-200">
           
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Diagonal Striped Mask Overlay (ফিগমার অবিকল তির্যক বর্ডার লুক ফিরিয়ে আনার জন্য) */}
                <div 
                  className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-difference"
                  style={{
                    backgroundImage: `repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 1px, transparent 24px)`,
                  }}
                />

               
                {/* Metadata Badge Over Image */}
                <div 
                  className={`self-start px-2 py-1 text-[9px] font-mono tracking-wider z-10 shadow-xs ${
                    product.isDarkTag 
                      ? "bg-[#171513] text-white" 
                      : "bg-[#FAF6EE] text-[#171513] border border-stone-300/40"
                  }`}
                >
                  {product.tag}
                </div>
              </div>

              {/* Text Information Stack */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm md:text-base font-normal tracking-tight text-stone-950">
                  <h3>{product.name}</h3>
                  <span className="text-stone-500 font-medium text-xs md:text-sm">{product.price}</span>
                </div>
                <p className="text-stone-400 text-[11px] md:text-xs tracking-wide">
                  {product.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}