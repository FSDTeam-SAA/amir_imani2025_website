"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductPrice } from "@/lib/utils/product-price";
import { Loader2 } from "lucide-react";
import { productService } from "@/lib/api/product-service";
import { Product } from "@/lib/types/ecommerce";

export default function ProductImageSlider({
  currentProductId,
}: {
  currentProductId: string;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRelatedProducts = async () => {
      setIsLoading(true);
      try {
        const response = await productService.getmarchandice();

        if (!isMounted || !response.success) return;

        const relatedProducts = response.data
          .filter((product) => product._id !== currentProductId)
          .slice(0, 8);

        setProducts(relatedProducts);
      } catch (error) {
        console.error("Failed to load related products:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRelatedProducts();

    return () => {
      isMounted = false;
    };
  }, [currentProductId]);

  const viewAllCount = useMemo(() => products.length, [products.length]);

  // স্মুথ ড্র্যাগ-টু-স্ক্রোল (Right to Left) ফাংশনালিটি
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // স্লাইড স্পীড কন্ট্রোল
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-[#FAF6EE] text-[#171513] py-10">
      <div className="container ">
        
        {/* Header: Title & View All Button */}
        <div className="flex items-end justify-between pr-6 md:pr-12 lg:pr-24 mb-12">
          <div className="space-y-3">
            <span className="text-[#3A8B91] text-[10px] font-bold tracking-[0.3em] uppercase block">
              COMPLETE THE PANTHEON
            </span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-stone-950">
              More from the Series.
            </h2>
          </div>

          <Link
            href="/merchandise"
            className="border border-stone-950 px-6 py-3 text-[11px] font-bold tracking-widest uppercase bg-transparent hover:bg-stone-950 hover:text-[#FAF6EE] transition-colors duration-200 flex items-center gap-4 shrink-0"
          >
            VIEW ALL {viewAllCount || "ITEMS"} <span className="text-xs">→</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-6 py-8 text-sm text-stone-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading more merchandise...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-8 text-sm text-stone-500">
            More merchandise will appear here once additional products are available.
          </div>
        ) : (
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 overflow-x-auto pb-8 pr-6 md:pr-12 scrollbar-none select-none cursor-grab active:cursor-grabbing scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((product, index) => {
              const imageUrl =
                (product.imgs && product.imgs.length > 0
                  ? product.imgs[0]
                  : product.img) || "/no-image.jpg";

              return (
                <Link
                  href={`/merchandise/${product._id}`}
                  key={product._id}
                  className="w-[260px] md:w-[290px] shrink-0 flex flex-col space-y-4"
                >
                  <div className="w-full aspect-[4/5] relative p-5 flex flex-col justify-end overflow-hidden border border-stone-300/30 bg-stone-200">
                    <Image
                      src={imageUrl}
                      alt={product.productName}
                      fill
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                    />

                    <div
                      className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-difference"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 1px, transparent 24px)",
                      }}
                    />

                    <div
                      className={`self-start px-2 py-1 text-[9px] font-mono tracking-wider z-10 shadow-xs ${
                        index % 2 === 0
                          ? "bg-[#FAF6EE] text-[#171513] border border-stone-300/40"
                          : "bg-[#171513] text-white"
                      }`}
                    >
                      {product.productType === "marchandice"
                        ? "MERCHANDISE"
                        : "PRODUCT"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-3 text-sm md:text-base font-normal tracking-tight text-stone-950">
                      <h3 className="line-clamp-1">{product.productName}</h3>
                      <span className="text-stone-500 font-medium text-xs md:text-sm">
                        ${getProductPrice(product).amount.toFixed(2)}{" "}
                        {getProductPrice(product).currency}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-stone-400 text-[11px] md:text-xs tracking-wide">
                      {product.feature || "Explore another piece from the same series."}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
