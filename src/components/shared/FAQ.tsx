"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqData = [
  {
    question: "Who owns the rights to DoUndo?",
    answer: `All intellectual property associated with DoUndo, including artwork, symbols, card designs, manuals, packaging, website content, and digital materials, is owned and controlled by DoUndo Corp. Unauthorized use, copying, or reproduction is strictly prohibited.`,
  },
  {
    question:
      "Can I use DoUndo images, logos, or symbols in my own projects or videos?",
    answer: `You may not use DoUndo logos, symbols, artwork, or other proprietary assets for commercial
purposes without prior written permission from DoUndo Corp. For fan content or collaboration
proposals, please contact us through the official website.`,
  },
  {
    question: `What should I do if my order arrives damaged or incomplete?`,
    answer: `If your order arrives damaged, incomplete, or with the wrong items, please contact our support
team at Info@doundogames.com within 7 days of delivery. Include your order number and clear
photos where possible. We will review your case and arrange a replacement or other
appropriate solution.`,
  },
  {
    question: "Are custom duties or import taxes included in my order total?",
    answer: `For international orders, customs duties, import taxes, and local VAT are typically not included in
the product or shipping price. These additional charges, if any, are usually collected by your
local customs authority and are the responsibility of the recipient.`,
  },
  {
    question: "What happens if my package is lost in transit?",
    answer: `If tracking information suggests that your package has been lost in transit, we will work with the
carrier to investigate. Once loss is confirmed, we will, in line with our Shipping Policy, either
send a replacement or offer a refund, depending on the specific circumstances.`,
  },
  {
    question: "Can retailers or partners distribute DoUndo?",
    answer: `We welcome interest from retailers, distributors, and collaboration partners. Please reach out
through our official contact channels with details about your business, location, and volume
expectations so we can review and discuss potential partnerships.`,
  },
  {
    question: "How can I contact DoUndo for general questions or support?",
    answer: `For general questions, product support, or order-related inquiries, please contact us at
Info@doundogames.com or through the contact form on our official website. For privacy or legal
matters, you may use indicated in our policies.`,
  },
];

export default function FAQPixelPerfect() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#FAF6EE] text-stone-950 px-6 md:px-12 lg:px-24 py-20  flex items-center justify-center font-sans antialiased">
      <div className=" container mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Typography Block - 5 Columns */}
        <div className="lg:col-span-5 sticky top-12 space-y-4">
          <span className="text-[#E97443] text-xs font-bold tracking-widest uppercase block">
            FAQ
          </span>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Questions? <br />
            <span className="text-[#3A8B91]">We have answers.</span>
          </h2>

          <p className="text-stone-500 text-xs md:text-sm leading-relaxed max-w-xs font-normal">
            Everything you need to know about the product, licensing,
            transparency and transparency.
          </p>
        </div>

        {/* Right Accordion List Block - 7 Columns */}
        <motion.div
          className="lg:col-span-7 w-full border-t border-stone-200/70"
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
                className="border-b border-stone-200/70"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="group flex w-full items-center justify-between py-4.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E97443]/40 focus-visible:ring-offset-2"
                >
                  <span
                    className={`pr-4 text-xs font-medium tracking-wide transition-colors duration-300 md:text-[16px] ${
                      isOpen
                        ? "text-[#E97443]"
                        : "text-stone-800 group-hover:text-[#E97443]"
                    }`}
                  >
                    {item.question}
                  </span>

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

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
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
                        className="max-w-2xl pb-5 pl-1 text-xs font-normal leading-relaxed whitespace-pre-line text-stone-500 md:text-[13px]"
                      >
                        {item.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <p className="text-[10px] text-stone-400/80 leading-relaxed mt-6 tracking-wide max-w-2xl">
You can reach us through the Contact page on our website. We aim to respond to all enquiries within 2-3 business days. For order-specific issues, please include your order number to help us assist you faster.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
