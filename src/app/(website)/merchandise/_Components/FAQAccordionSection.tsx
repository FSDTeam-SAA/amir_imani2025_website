"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordionSection() {
  const faqData: FAQItem[] = [
    {
      question: "How do I choose my size?",
      answer: "Our Pantheon tee runs true to size with a relaxed, modern cut. If you're between sizes, size up for an oversized fit. Measurements in the size guide above are flat and in centimeters.",
    },
    {
      question: "How is the shirt printed?",
      answer: "Hand screen-printed using high-quality, water-based, low-impact inks that blend seamlessly into the fabric for a premium and durable feel.",
    },
    {
      question: "Shipping & returns?",
      answer: "We ship globally with tracked packaging. Standard delivery takes 3–7 business days. Returns or exchanges are accepted within 14 days of delivery.",
    },
    {
      question: "Are they ethically made?",
      answer: "Yes, 100% organic cotton, GOTS certified and sustainably grown in Portugal. Small-batch production with fair labor practices.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#FAF6EE] text-[#171513] py-24 px-6 md:px-12 lg:px-24 w-full font-sans antialiased">
      <div className=" container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Side: Header Content (Takes 5 Columns) */}
        <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-12 h-fit text-left">
          <span className="text-[#3A8B91] text-[10px] font-bold tracking-[0.3em] uppercase block">
            FREQUENTLY ASKED
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-stone-950 leading-[1.1]">
            Before you order.
          </h2>
        </div>

        {/* Right Side: Interactive Accordion List (Takes 7 Columns) */}
        <div className="lg:col-span-7 border-t border-stone-200/80">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-stone-200/80 transition-colors duration-150"
              >
                {/* Accordion Trigger Header Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 md:py-7 flex items-center justify-between text-left group focus:outline-hidden"
                >
                  <span className="text-base md:text-lg font-normal text-stone-900 tracking-tight transition-colors duration-200 group-hover:text-stone-600">
                    {item.question}
                  </span>
                  
                  {/* +/- Indicator Icons with Light Stroke Line */}
                  <span className="text-xl font-light text-stone-400 pl-4 select-none w-5 h-5 flex items-center justify-center">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Accordion Content Body Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 pb-6 md:pb-8 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-stone-500 text-xs md:text-[13px] leading-relaxed max-w-xl font-normal tracking-wide">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}