"use client";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  hoverScale,
  tapScale,
} from "@/config/animations";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center md:bg-center origin-center"
        style={{ backgroundPosition: "center 40%" }}
        role="img"
        aria-label="Hero background"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.05, transition: { duration: 0.7 } }}
      />



      {/* Center content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.32em] text-[#0EA5B8]"
            variants={fadeInUp}
          >
            A Universe of Games for Curious Minds
          </motion.p>

          <motion.div
            className="relative mx-auto mb-5 h-10 w-[260px] sm:h-12 sm:w-[340px] md:h-16 md:w-[460px]"
            variants={fadeInUp}
          >
            <Image
              src="/logo-white.png"
              alt="DoUndo"
              fill
              priority
              className="object-contain"
              sizes="(min-width: 768px) 460px, (min-width: 640px) 340px, 260px"
            />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white md:text-primary-foreground mb-4 sm:mb-6 leading-[1.1] tracking-tight"
            variants={fadeInUp}
          >
            <span className="block text-[#FFFFFF]">Different Games</span>
            <span className="block text-[#E96A3D]">One Language</span>
          </motion.h1>

          <motion.p
            className="text-[#B0B0B0] md:text-[#B0B0B0] text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light"
            variants={fadeInUp}
          >
            DoUndo connects strategy, perception, imagination, and story through
            thirteen symbols that tie every experience together.
          </motion.p>

          {/* CTA Button */}
          <motion.div className="flex justify-center gap-4" variants={fadeInUp}>
            {/* First Button: Solid Orange (Explore Games) */}
            <Link href="/game">
              <Button
                asChild
                variant={"outline"}
                className="group relative cursor-pointer px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold uppercase tracking-wider inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 bg-[#E97443] hover:bg-[#E97443]/80 text-white rounded-md border-none"
              >
                <motion.button whileHover={hoverScale} whileTap={tapScale}>
                  Explore Games
                  <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Button>
            </Link>

            {/* Second Button: Outlined White (Learn More) */}
            <Link href="/about-us">
              <Button
                asChild
                variant="outline"
                className="group relative cursor-pointer px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold uppercase tracking-wider inline-flex items-center gap-3 transition-all duration-300 bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-md"
              >
                <motion.button whileHover={hoverScale} whileTap={tapScale}>
                  Learn More
                  <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient overlay transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white/10 to-transparent" />
    </section>
  );
}
