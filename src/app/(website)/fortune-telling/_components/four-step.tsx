"use client";

import React from "react";
import { motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const STEPS_DATA = [
  {
    number: "01",
    title: "Settle",
    desc: "Close the tabs. Take one breath that you feel.",
  },
  {
    number: "02",
    title: "Hold a question",
    desc: "Specific is better than clever. The wheel can tell the difference.",
  },
  {
    number: "03",
    title: "Choose three",
    desc: "First card is the past that carried you. Second is the present. Third is the path.",
  },
  {
    number: "04",
    title: "Read slowly",
    desc: "The reading is a mirror, not a map. The omen is the only instruction.",
  },
];

export default function FourSteps() {
  return (
    <motion.section
      id="fortune-ritual"
      className="text-[#f2eadf] scroll-mt-28"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <div className="space-y-10">
        <div className="space-y-3">
          <span className="block text-[9px] uppercase tracking-[0.26em] text-[#c9803d]">
            — the ritual —
          </span>
          <h2 className="font-serif text-[42px] font-light leading-none tracking-[-0.04em] text-[#f3e9da] sm:text-[52px]">
            Four steps, one circle.
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
