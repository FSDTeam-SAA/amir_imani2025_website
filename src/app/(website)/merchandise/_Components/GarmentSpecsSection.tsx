"use client";

import { ProductHeroProps } from "@/components/merchandise/merchandiseSingleProduct/MerchandiseSingleCard";
import React from "react";

export default function GarmentSpecsSection({ product }: ProductHeroProps) {
  const specsData = [
    {
      label: "MATERIAL",
      title: product.garmentsMATERIAL || "N/A",
      desc: "GOTS certified, Portuguese grown",
    },
    {
      label: "WEIGHT",
      title: product.garmentWEIGHT || "N/A",
      desc: "Heavyweight, structured drape",
    },
    {
      label: "FIT",
      title: product.garmentFit || "N/A",
      desc: "Size up for an oversized silhouette",
    },
    {
      label: "PRINT",
      title: product.garmentPRINT || "N/A",
      desc: "Water-based, low-impact inks",
    },
    {
      label: "MADE IN",
      title: product.garmentMADeIN || "N/A",
      desc: "Small-batch, limited run of 200",
    },
    {
      label: "CARE",
      title: product.garmentCARE || "N/A",
      desc: "Turn inside out · no tumble",
    },
  ];

  return (
    <section className="bg-[#FAF6EE] text-[#171513] py-20 px-6 md:px-12 lg:px-24 w-full font-sans antialiased">
      <div className="container mx-auto">
        
        {/* Top Header Section */}
        <div className="space-y-3 mb-14 text-left">
          <span className="text-[#3A8B91] text-[10px] font-bold tracking-[0.3em] uppercase block">
            THE GARMENT
          </span>
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-stone-950">
            {product?.garmentTitle}
          </h2>
        </div>

        {/* 3x2 Pixel-Perfect Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-stone-200/80">
          {specsData.map((spec, index) => {
            return (
              <div
                key={index}
                className={`py-8 md:py-10 flex flex-col justify-between space-y-4 text-left transition-colors duration-150 hover:bg-stone-100/30
                  /* মোবাইল স্ক্রিনের জন্য বর্ডার লজিক */
                  border-b border-stone-200/80
                  /* বড় স্ক্রিনের জন্য কাস্টম গ্রিড বর্ডার ডিভাইডার */
                  md:px-8 first:pl-0 
                  ${index === 1 || index === 4 ? "md:border-x md:border-stone-200/80" : ""}
                  ${index === 2 ? "md:pr-0" : ""}
                  ${index === 3 ? "md:pl-0" : ""}
                  ${index === 5 ? "md:pr-0" : ""}
                `}
              >
                {/* ক্যাটাগরি লেবেল (মিউটেড টিল কালার) */}
                <span className="text-[#3A8B91] text-[10px] font-bold tracking-[0.25em] uppercase block">
                  {spec.label}
                </span>

                {/* মেইন হাইলাইট টাইটেল */}
                <h3 className="text-lg md:text-xl font-normal tracking-tight text-stone-900">
                  {spec.title}
                </h3>

                {/* নিচের ছোট বিবরণ টেক্সট */}
                <p className="text-stone-400 text-[11px] md:text-xs tracking-wide font-normal">
                  {spec.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
