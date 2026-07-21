"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

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
    <section className="bg-[#F8F0DD] text-[#171513] py-24 px-6 md:px-12 lg:px-24 w-full font-sans antialiased">
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
        <motion.div
          className="lg:col-span-7 border-t border-stone-200/80"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-stone-200/80 transition-colors duration-150"
              >
                {/* Accordion Trigger Header Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`merchandise-faq-answer-${index}`}
                  className="w-full py-6 md:py-7 flex items-center justify-between text-left group focus:outline-hidden"
                >
                  <span
                    className={`text-base md:text-lg font-normal tracking-tight transition-colors duration-300 ${
                      isOpen
                        ? "text-[#3A8B91]"
                        : "text-stone-900 group-hover:text-[#3A8B91]"
                    }`}
                  >
                    {item.question}
                  </span>
                  
                  {/* Animated +/- Indicator */}
                  <motion.span
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      borderColor: isOpen ? "#3A8B91" : "#d6d3d1",
                      color: isOpen ? "#3A8B91" : "#a8a29e",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border bg-transparent group-hover:border-[#3A8B91] group-hover:text-[#3A8B91]"
                  >
                    <Plus aria-hidden="true" size={13} strokeWidth={2} />
                  </motion.span>
                </button>

                {/* Accordion Content Body Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`merchandise-faq-answer-${index}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.25, ease: "easeOut" },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -5 }}
                        className="text-stone-500 text-xs md:text-[13px] leading-relaxed max-w-xl pb-6 md:pb-8 font-normal tracking-wide"
                      >
                        {item.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
