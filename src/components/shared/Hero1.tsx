import React from "react";


const Hero1 = ({image, title, subtitle, description, text  }: {image: string, title: string, subtitle: string, description: string, text: string}) => {
  return (
    <div className="bg-[#FAF6EE] font-sans antialiased text-[#2D2D2D]">
      <section
        className="text-white py-20 px-4 text-center min-h-[500px] relative overflow-hidden"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

        }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C4A484] block mb-3 font-semibold">
            {title}
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">
            {subtitle}
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E28755] tracking-tight mb-6">
            {text}
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            {description}
          </p>
        </div>
      </section>

     
    </div>
  );
};

export default Hero1;
