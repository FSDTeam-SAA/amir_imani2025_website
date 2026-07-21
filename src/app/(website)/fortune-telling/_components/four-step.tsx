"use client";

import React from "react";
import { motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const STEPS_DATA = [
  {
    number: "01",
    title: "Settle",
    desc: "Close the noise. Take one breath you can feel.",
  },
  {
    number: "02",
    title: "Hold a question",
    desc: "The clearer the question, the deeper the reading.",
  },
  {
    number: "03",
    title: "Choose three",
    desc: " The first reflects the past. The second reveals the present. The third points toward what comes next.",
  },
  {
    number: "04",
    title: "Read slowly",
    desc: "This is not prediction. It is reflection. Let the symbols speak.",
  },
];

export default function FourSteps() {
  return (
    <motion.section
      id="fortune-ritual"
      className="text-[#f2eadf] scroll-mt-28 !mt-10"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <div className="space-y-10">
        <div className="space-y-3">
          <span className="block text-[9px] uppercase tracking-[0.26em] text-[#c9803d]">
           READING GUIDE
          </span>
          <h2 className="font-serif text-[42px] font-light leading-none tracking-[-0.04em] text-[#f3e9da] sm:text-[52px]">
           One Circle.
A simple path. A deeper reading.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {STEPS_DATA.map((step) => (
            <motion.div
              key={step.number}
              className="flex min-h-[156px] flex-col justify-between border border-[#2d3738] bg-[linear-gradient(180deg,rgba(25,31,32,0.92),rgba(17,23,24,0.92))] px-6 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.45,
                ease: EASE_OUT,
                delay: Number(step.number) * 0.05,
              }}
            >
              <div className="space-y-4">
                <span className="block text-[9px] tracking-[0.22em] text-[#c9803d]">
                  {step.number}
                </span>
                <h3 className="font-serif text-[20px] font-light leading-none text-[#f2eadf]">
                  {step.title}
                </h3>
              </div>

              <p className="pt-5 text-[13px] leading-[1.7] text-[#a6b0ac]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
