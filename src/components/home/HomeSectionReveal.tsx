"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type HomeSectionRevealProps = {
  children: ReactNode;
  delay?: number;
};

export default function HomeSectionReveal({
  children,
  delay = 0,
}: HomeSectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
