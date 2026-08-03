"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const gridItems = [
  {
    title: "STUDIO",
    image: "/about/first.png",
    width: 568,
    height: 564,
  },
  {
    title: "PROTOTYPE",
    image: "/about/4th.png",
    width: 568,
    height: 421,
  },
  {
    title: "SYMBOLS",
    image: "/about/2nd.png",
    width: 443,
    height: 323,
  },
  {
    title: "SKETCHES",
    image: "/about/5th.png",
    width: 443,
    height: 323,
  },
  {
    title: "BOX DESIGN",
    image: "/about/7th.png",
    width: 443,
    height: 323,
  },
  {
    title: "PROCESS",
    image: "/about/3rd.png",
    width: 398,
    height: 492,
  },
  {
    title: "STUDIO DAY",
    image: "/about/6th.png",
    width: 398,
    height: 492,
  },
];

type GalleryImage = (typeof gridItems)[number];

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open ${item.title} image`}
      className="group relative min-h-0 overflow-hidden rounded-xs text-left transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#577b8a]"
    >
      <Image
        src={item.image}
        alt={`${item.title} behind the scenes`}
        width={item.width}
        height={item.height}
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/0 to-black/40" />
    </button>
  );
}

export default function MakingOfSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage =
    selectedIndex === null ? null : gridItems[selectedIndex];

  const showPreviousImage = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === null
        ? null
        : (currentIndex - 1 + gridItems.length) % gridItems.length,
    );
  };

  const showNextImage = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === null ? null : (currentIndex + 1) % gridItems.length,
    );
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage]);

  return (
    <section className="bg-[#110f0c] text-white font-sans px-6 py-20 md:py-28">
      {/* Header Container */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-6 mb-12 md:mb-16">
        <div>
          <span className="text-[10px] tracking-[0.2em] font-bold text-[#0EA5B8] uppercase block mb-3">
            Behind the Scenes
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-md">
            The Making <br /> of <span className="text-[#E96A3D]">DoUndo.</span>
          </h2>
        </div>

        <div className="md:max-w-xs md:pt-8">
          {/* <p className="text-xs md:text-sm text-[#888888] leading-relaxed font-light">
            A glimpse into the studio — sketches, prototypes, photo shoots, and the moments where ideas become objects you can hold.
          </p> */}
        </div>
      </div>

      {/* The column/row ratios mirror the source images at the 1440px × 1000px reference size. */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="hidden aspect-[36/25] grid-cols-[minmax(0,1.4269fr)_minmax(0,1.1128fr)_minmax(0,1fr)] gap-4 lg:grid">
          <div className="grid min-h-0 grid-rows-[1.3397fr_1fr] gap-4">
            <GalleryTile item={gridItems[0]} index={0} onOpen={setSelectedIndex} />
            <GalleryTile item={gridItems[1]} index={1} onOpen={setSelectedIndex} />
          </div>

          <div className="grid min-h-0 grid-rows-3 gap-4">
            <GalleryTile item={gridItems[2]} index={2} onOpen={setSelectedIndex} />
            <GalleryTile item={gridItems[3]} index={3} onOpen={setSelectedIndex} />
            <GalleryTile item={gridItems[4]} index={4} onOpen={setSelectedIndex} />
          </div>

          <div className="grid min-h-0 grid-rows-2 gap-4">
            <GalleryTile item={gridItems[5]} index={5} onOpen={setSelectedIndex} />
            <GalleryTile item={gridItems[6]} index={6} onOpen={setSelectedIndex} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {gridItems.map((item, index) => (
            <button
              type="button"
              key={item.image}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open ${item.title} image`}
              className="group overflow-hidden rounded-xs text-left transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#577b8a]"
            >
              <Image
                src={item.image}
                alt={`${item.title} behind the scenes`}
                width={item.width}
                height={item.height}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedImage.title} image preview`}
          >
            <motion.div
              className="relative h-[82vh] w-full max-w-6xl overflow-hidden rounded-xl bg-[#171513] shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selectedImage.image}
                alt={`${selectedImage.title} behind the scenes enlarged`}
                fill
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-contain p-2 md:p-4"
                priority
              />

              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:scale-105 hover:bg-black focus-visible:outline-2 focus-visible:outline-white md:left-5 md:h-12 md:w-12"
                aria-label="Show previous image"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:scale-105 hover:bg-black focus-visible:outline-2 focus-visible:outline-white md:right-5 md:h-12 md:w-12"
                aria-label="Show next image"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-6 pb-5 pt-14 pointer-events-none">
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                  {selectedImage.title}
                </span>
              </div> */}

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xl text-white backdrop-blur transition hover:scale-105 hover:bg-black focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Close image preview"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
