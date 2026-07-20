import React from "react";

const Hero1 = ({
  image,
  title,
  subtitle,
  description,
  text,
}: {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  text: string;
}) => {
  return (
    <div className="bg-[#FAF6EE] font-sans antialiased text-[#2D2D2D]">
      <section
        className="relative flex min-h-[600px] items-center justify-center overflow-hidden text-center text-white"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center justify-center px-4">
          <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C4A484]">
            {title}
          </span>

          <h1 className="mb-2 text-4xl font-light tracking-tight md:text-5xl">
            {subtitle}
          </h1>

          <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#E28755] md:text-5xl">
            {text}
          </h2>

          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-gray-400 md:text-base">
            {description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero1;
