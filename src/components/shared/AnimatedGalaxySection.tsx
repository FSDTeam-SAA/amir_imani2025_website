"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";

const pantheonData = [
  { id: "ahura", name: "Ahura", iconImage: "/symbol_AHURA.png", color: "#5EA3A3" },
  { id: "ares", name: "Ares", iconImage: "/symbol_ARES.png", color: "#D32F2F" },
  { id: "asgard", name: "Asgard", iconImage: "/symbol_ASGARD.png", color: "#F6D021" },
  { id: "enki", name: "Enki", iconImage: "/symbol_ENKI.png", color: "#C37BB0" },
  { id: "gaia", name: "Gaia", iconImage: "/symbol_GAIA.png", color: "#2E7D32" },
  { id: "hera", name: "Hera", iconImage: "/symbol_HERA.png", color: "#6A1B9A" },
  { id: "laozi", name: "Laozi", iconImage: "/symbol_LAOZI.png", color: "#E67E22" },
  { id: "mitra", name: "Mitra", iconImage: "/symbol_MITRA.png", color: "#95A5A6" },
  { id: "setna", name: "Setna", iconImage: "/symbol_SETNA.png", color: "#9CCC65" },
  { id: "shaman", name: "Shaman", iconImage: "/symbol_SHAMAN.png", color: "#D4AC0D" },
  { id: "shiva", name: "Shiva", iconImage: "/symbol_SHIVA.png", color: "#1565C0" },
  { id: "titan", name: "Titan", iconImage: "/symbol_TITAN.png", color: "#795548" }
];

export default function MixedGalaxySymbols() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    // ১. গড আইকনগুলোর ইমেজ অবজেক্ট আগে লোড করে নিচ্ছি প্রি-রেন্ডারিং এর জন্য
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const loadedSymbolImages = pantheonData.map((god) => {
      const img = new Image();
      img.src = god.iconImage;
      return { ...god, imgElement: img };
    });

    const particleCount = 1000;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const particles: any[] = [];
    const arms = 3; 

    const starColors = [
      "rgba(233, 116, 67, ",  // Orange
      "rgba(195, 123, 176, ", // Purple
      "rgba(246, 208, 33, ",  // Gold
      "rgba(255, 255, 255, "  // White
    ];

    for (let i = 0; i < particleCount; i++) {
      const distance = Math.pow(Math.random(), 2) * (Math.min(width, height) * 0.42) + 15;
      const armIndex = i % arms;
      const spiralAngle = (distance * 0.025) + (armIndex * ((Math.PI * 2) / arms));
      const randomSpread = (Math.random() - 0.5) * (45 / (distance * 0.01 + 1));
      const angle = spiralAngle + randomSpread;

      const isSymbol = i % 45 === 0; 
      const symbolData = isSymbol ? loadedSymbolImages[Math.floor(Math.random() * loadedSymbolImages.length)] : null;

      particles.push({
        distance,
        angle,
        isSymbol,
        symbolData,
        radius: isSymbol ? Math.random() * 8 + 16 : Math.random() * 1.8 + 0.4,
        color: isSymbol ? symbolData?.color : starColors[Math.floor(Math.random() * starColors.length)],
        alpha: Math.random() * 0.5 + 0.5,
        speed: (Math.random() * 0.0015 + 0.0008) * (120 / distance + 0.4),
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; 
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // গ্যালাক্সির নেবুলা ব্যাকগ্রাউন্ড গ্লো
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, Math.min(width, height) * 0.45);
      bgGlow.addColorStop(0, "rgba(35, 20, 45, 0.35)");
      bgGlow.addColorStop(0.6, "rgba(23, 21, 19, 0.08)");
      bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.angle += p.speed; 

       
        const x = centerX + Math.cos(p.angle) * p.distance;
        const y = centerY + Math.sin(p.angle) * p.distance * 0.4;

        if (p.isSymbol && p.symbolData?.imgElement.complete) {
     
          ctx.save();
          ctx.translate(x, y);
          
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.drawImage(
            p.symbolData.imgElement, 
            -p.radius / 2, 
            -p.radius / 2, 
            p.radius, 
            p.radius
          );
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color.includes("#") ? p.color : `${p.color}${p.alpha})`;
          ctx.fill();
        }
      });

      ctx.shadowBlur = 30;
      ctx.shadowColor = "rgba(255, 215, 130, 1)";
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
      coreGlow.addColorStop(0, "rgba(255, 255, 255, 1)");
      coreGlow.addColorStop(0.3, "rgba(246, 208, 33, 0.85)");
      coreGlow.addColorStop(0.7, "rgba(233, 116, 67, 0.25)");
      coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0; 

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="bg-[#171513] text-white min-h-screen grid grid-cols-1 lg:grid-cols-12 items-center font-sans relative overflow-hidden">
      
      {/* Left Content Column */}
      <div className="lg:col-span-5 px-8 md:px-16 gap-6 lg:px-24 py-16 flex flex-col justify-center relative z-10 bg-[#171513]">
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-[#E97443] text-xs tracking-widest font-bold">✦✦✦</span>
          <span className="text-stone-400 text-xs font-bold tracking-[0.25em] uppercase">
            Mystic Experience
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
          Let the Symbols <br/> Speak to You
        </h2>

        <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-md mb-9 font-normal antialiased">
         Ask a question. Choose three symbols.
Discover the patterns and tensions hidden
beneath the surface.
        </p>

        <div className="mb-14">
         <Link href={"/about-us"}>
          <button className="bg-[#F04D2A] hover:bg-[#d66332] text-white text-xs font-bold tracking-[0.25em] uppercase px-9 py-4.5 transition-all duration-200 rounded-none flex items-center gap-3 group shadow-lg">
            BEGIN YOUR READING
            <span className="text-xs transition-transform group-hover:translate-x-1 duration-200">✦</span>
          </button>
         </Link>
        </div>

        <div className="text-stone-500 text-xs italic tracking-wide mt-auto font-serif">
         A reflection, not a prediction.
        </div>
      </div>

      {/* Right Column - Premium Animated Mixed Canvas Galaxy */}
      <div className="lg:col-span-7 relative w-full h-[550px] lg:h-full min-h-[550px] bg-black flex items-center justify-center overflow-hidden">
        {/* Smoothly merge the content background into the black galaxy canvas. */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 z-10 h-28 w-full pointer-events-none bg-linear-to-b from-[#171513] via-[#171513]/80 to-transparent lg:inset-y-0 lg:h-full lg:w-64 lg:bg-linear-to-r"
        />
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block opacity-95 mix-blend-screen"
        />
      </div>

    </section>
  );
}
