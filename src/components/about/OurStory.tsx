import React from "react";
import Image from "next/image";

const LinkedinIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const XIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const OurStory = () => {
  return (
    <div className="bg-[#FAF6EE] font-sans antialiased text-[#2D2D2D]">
      <section
        className="text-white py-20 px-4 text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C4A484] block mb-3 font-semibold">
            ABOUT US
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">
            Our Story
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E28755] tracking-tight mb-6">
            So Far.
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Meet the team and learn about our mission to build a universe of
            games around thirteen symbols.
          </p>
        </div>
      </section>

     
    </div>
  );
};

export default OurStory;
