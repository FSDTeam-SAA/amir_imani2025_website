"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const;

export default function ProductShot() {
  return (
    <motion.section
      id="fortune-game"
      className="scroll-mt-28 border border-[#223033] bg-[#121b1d]/92 px-6 py-6 text-[#f2eadf] sm:px-7 sm:py-7"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_430px]">
        <div className="max-w-[430px] space-y-5">
          <span className="block text-[9px] uppercase tracking-[0.26em] text-[#c9803d]">
            — the game —
          </span>

          <h2 className="font-serif text-[40px] font-light leading-[1.02] tracking-[-0.04em] text-[#f3e9da] sm:text-[48px]">
            The wheel lives on a table, too.
          </h2>

          <p className="text-[13px] leading-[1.8] text-[#a7b2ae]">
            DoUndo is a board card game built around these same twelve symbols
            — one language, many games. Strategy, perception, imagination,
            story. Bring the circle into the room.
          </p>

          <div className="flex flex-wrap gap-3 pt-1 text-[10px] uppercase tracking-[0.12em]">
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/game"
                className="block rounded-[2px] border border-[#e2974b] bg-[#e2974b] px-4 py-2.5 font-medium text-[#1b1713] transition-colors hover:bg-[#ed9f50]"
              >
              Shop the game
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about-us"
                className="block rounded-[2px] border border-[#4f5d5e] px-4 py-2.5 text-[#ced4ce] transition-colors hover:border-[#68777a]"
              >
              About DoUndo
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <motion.div
            className="w-full max-w-[430px] border border-[#4d321f] bg-[#21150f] px-4 py-3 shadow-[0_24px_90px_rgba(0,0,0,0.25)]"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, ease: EASE_IN_OUT, repeat: Infinity }}
          >
            <div className="text-[9px] tracking-[0.18em] text-[#8f6848]">
              {"// product shot — DoUndo box"}
            </div>

            <div className="relative mt-3 flex aspect-[1.5] items-center justify-center overflow-hidden border border-[#6b4a34] bg-[#2a1b14]">
              <div
                className="absolute inset-[12%] border border-[#d0c6b8]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(208,198,184,0.22) 0 1px, transparent 1px 8px)",
                }}
              />
              <div className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[#dd9448]">
                <span className="font-serif text-[15px] font-light tracking-[-0.02em] text-[#efe4d4]">
                  DoUndo
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
