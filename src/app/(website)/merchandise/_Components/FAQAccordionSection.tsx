"use client";

import React, { useEffect, useState } from "react";
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
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    if (isLargeScreen && openIndex !== index) {
      setOpenIndex(index);
    }
  };

  return (
    <section className="flex w-full items-center justify-center bg-[#FAF6EE] px-6 py-16 font-sans antialiased text-stone-950 md:px-12 md:py-24 lg:px-24">
      <div className="container mx-auto grid w-full grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-12 lg:gap-16">
        
        {/* Left Side: Header Content (Takes 5 Columns) */}
        <div className="mb-4 space-y-4 text-left lg:sticky lg:top-12 lg:col-span-5 lg:mb-0">
          <span className="block text-xs font-bold uppercase tracking-widest text-[#E96A3D]">
            FREQUENTLY ASKED
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Before you order.
          </h2>
        </div>

        {/* Right Side: Interactive Accordion List (Takes 7 Columns) */}
        <motion.div
          className="w-full border-t border-stone-200/70 lg:col-span-7"
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
                onMouseEnter={() => handleMouseEnter(index)}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-stone-200/70"
              >
                {/* Accordion Trigger Header Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`merchandise-faq-answer-${index}`}
                  className="group flex w-full items-center justify-between py-4.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E97443]/40 focus-visible:ring-offset-2"
                >
                  <span
                    className={`pr-4 text-xs font-medium leading-snug tracking-wide transition-colors duration-300 md:text-[16px] ${
                      isOpen
                        ? "text-[#E97443]"
                        : "text-stone-800 group-hover:text-[#E97443]"
                    }`}
                  >
                    {item.question}
                  </span>
                  
                  {/* Animated +/- Indicator */}
                  <motion.span
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      borderColor: isOpen ? "#E97443" : "#d6d3d1",
                      color: isOpen ? "#E97443" : "#a8a29e",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border bg-transparent group-hover:border-[#E97443] group-hover:text-[#E97443]"
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
                        className="max-w-2xl whitespace-pre-line pb-5 pl-1 text-xs font-normal leading-relaxed text-stone-500 md:text-[13px]"
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
