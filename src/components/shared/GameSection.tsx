"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { Product } from "@/lib/types/ecommerce";
import { productService } from "@/lib/api/product-service";

const FEATURED_PRODUCT_ROUTE = "/product/695057098548e119f5fa7cfd";

export default function GameSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productService.getCards();
        if (response.success) {
          const homeProducts = (response.data || []).filter(
            (product) => product.addHome
          );
          setFeaturedProducts(homeProducts.slice(0, 2));
        }
      } catch (error) {
        console.error("Failed to fetch featured games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const primaryProduct = featuredProducts[0];
  const secondaryProduct = featuredProducts[1];

  const primaryTitle = primaryProduct?.productName || "DoUndo: The Card Game";
  const primarySubtitle =
    primaryProduct?.feature ||
    "Strategy & Perception";
  const primaryDescription =
    primaryProduct?.description ||
    "The original game that started it all. Use your thirteen symbols to outread, outmaneuver, and outlast your opponent in a battle of archetypes.";

  const secondaryTitle = secondaryProduct?.productName || "The Myth Game";
  const secondaryDescription =
    secondaryProduct?.description ||
    "Weave stories using symbols as characters, conflicts, and resolutions. A narrative game for 2-8 players.";

  const primaryImage =
    primaryProduct?.homeImage ||
    primaryProduct?.imgs?.[0] ||
    primaryProduct?.img ||
    "/images/univers1.jpeg";
  const secondaryImage =
    secondaryProduct?.homeImage ||
    secondaryProduct?.imgs?.[0] ||
    secondaryProduct?.img ||
    "/images/univers2.jpeg";

  const cardContent = isLoading
    ? {
        title: "DoUndo: The Card Game",
        subtitle: "Strategy & Perception",
        description:
          "The original game that started it all. Use your thirteen symbols to outread, outmaneuver, and outlast your opponent in a battle of archetypes.",
      }
    : {
        title: primaryTitle,
        subtitle: primarySubtitle,
        description: primaryDescription,
      };

  return (
    <section className="bg-[#F8F0DD] text-stone-900 py-20 px-6 md:px-12 lg:px-20 flex flex-col justify-center font-sans">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-12">
          <div>
            <span className="text-[#E97443] text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              GAMES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-950">
              Play the Universe
            </h2>
          </div>
          <div>
            <p className="text-stone-600 text-base md:text-lg max-w-md md:ml-auto leading-relaxed">
              The same thirteen symbols. Different rules, different moods,
              different depths. Every game is a new way in to the same world.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <Link
            href={FEATURED_PRODUCT_ROUTE}
            className="lg:col-span-2  min-h-137.5 flex flex-col justify-between relative overflow-hidden group shadow-xl"
          >
            <Image
              src={primaryImage}
              alt={primaryTitle}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="p-8 md:p-12 mt-auto relative z-10 max-w-xl w-full">
              <div className="uppercase text-[#5EA3A3] text-xs font-bold tracking-widest mb-6">
                {cardContent.subtitle}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {cardContent.title}
              </h3>
              {/* <p className="text-stone-200 text-sm md:text-base mb-6 leading-relaxed">
                {cardContent.description}
              </p> */}
              <span className="inline-flex items-center gap-2 text-[#E97443] text-xs font-bold tracking-widest uppercase group/btn">
                Explore the Game
                <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </span>
            </div>
          </Link>

          <Link
            href={FEATURED_PRODUCT_ROUTE}
            className=" min-h-105 flex flex-col justify-between relative overflow-hidden group shadow-xl"
          >
            <Image
              src={secondaryImage}
              alt={secondaryTitle}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="p-8 mt-auto relative z-10 w-full h-full flex flex-col justify-between min-h-105">
              <div className="flex justify-between items-start w-full">
                <span className="uppercase text-[#5EA3A3] text-xs font-bold tracking-widest">
                  {secondaryProduct ? "Featured Game" : "Next Chapter"}
                </span>
                <span className="bg-stone-900/80 backdrop-blur-sm text-[#5EA3A3] text-[10px] font-bold tracking-widest px-2 py-1 rounded uppercase border border-stone-700/50">
                  Coming Soon
                </span>
              </div>

              <div className="mt-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {secondaryTitle}
                </h3>
                {/* <p className="text-stone-200 text-sm mb-6 leading-relaxed">
                  {secondaryDescription}
                </p> */}
                <span className="inline-flex items-center gap-1 text-[#E97443] text-xs font-bold tracking-widest uppercase group/btn">
                  Discover More
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
