import React from "react";


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
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#E28755] block mb-3 font-semibold">
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
