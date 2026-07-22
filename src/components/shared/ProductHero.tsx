"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Minus, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/lib/types/ecommerce";
import { useCart } from "@/provider/cart-provider";
import { toast } from "sonner";
import { getProductPrice } from "@/lib/utils/product-price";

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { amount: displayPrice, currency } = getProductPrice(product);

  // Memoized values
  const isMerchandise = useMemo(
    () => product.productType === "marchandice",
    [product.productType],
  );

  const hasSizes = useMemo(
    () => product.size && product.size.length > 0,
    [product.size],
  );

  const hasColors = useMemo(
    () => product.color && product.color.length > 0,
    [product.color],
  );

  const displayImage = useMemo(
    () => selectedImage || product.imgs?.[0] || product.img || "/no-image.jpg",
    [selectedImage, product.imgs, product.img],
  );

  const thumbnails = useMemo(
    () =>
      product.imgs && product.imgs.length > 0
        ? product.imgs
        : [product.img || "/no-image.jpg"],
    [product.imgs, product.img],
  );

  // Optimized handlers with useCallback
  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  }, []);

  const handleImageSelect = useCallback((img: string) => {
    setSelectedImage(img);
  }, []);

  const handleSizeSelect = useCallback((size: string) => {
    setSelectedSize(size);
  }, []);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const validateSelection = useCallback((): boolean => {
    if (!isMerchandise) return true;

    if (hasSizes && !selectedSize) {
      toast.error("Please select a size.");
      return false;
    }

    if (hasColors && !selectedColor) {
      toast.error("Please select a color.");
      return false;
    }

    return true;
  }, [isMerchandise, hasSizes, hasColors, selectedSize, selectedColor]);

  const handleAddToCart = useCallback(async () => {
    if (!validateSelection()) return;

    setIsAdding(true);

    try {
      await addToCart([
        {
          productId: product._id,
          quantity,
          ...(selectedColor && { color: selectedColor }),
          ...(selectedSize && { size: selectedSize }),
          product,
        },
      ]);
      toast.success(`${product.productName} added to cart for Pre Order!`);
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
      console.error("Add to cart error:", error);
    } finally {
      setIsAdding(false);
    }
  }, [
    validateSelection,
    addToCart,
    product,
    quantity,
    selectedColor,
    selectedSize,
  ]);

  return (
    <section
      className="my-6 md:my-12 lg:my-20 container"
      aria-labelledby="product-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Product Details -> Added order-2 lg:order-1 */}
        <article className="w-full flex flex-col gap-8 lg:col-span-7 lg:self-stretch lg:justify-between lg:gap-0 order-2 lg:order-1">
          <div>
            {/* Dynamic Product Name as fallback/sub-heading if needed */}
            <h2 className="text-lg font-light text-[#0EA5B8] tracking-tight leading-[1.1] mb-6">
              {product.productName}
            </h2>

            {/* Features / Description */}
            <p className="text-base md:text-4xl text-[#4A4A4A] leading-[1.1] max-w-2xl font-light">
              {product.feature ||
                "A psychological strategy game where every move reveals more about the board — and about you. Every selection you make tells a story."}
            </p>

            <p className="text-base md:text-lg mt-6 text-[#4A4A4A] leading-relaxed max-w-xl font-light">
              {product.gameSubtitle ||
                "A psychological strategy game where every move reveals more about the board — and about you. Every selection you make tells a story."}
            </p>
          </div>

          <div className="border-y border-[#EAE6DF] py-6 grid grid-cols-4 gap-4 max-w-xl">
            <div>
              <p className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">
                {product?.players}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[#8A8A8A] font-medium mt-1">
                PLAYERS
              </p>
            </div>

            <div>
              <p className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">
                {product?.minutes}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[#8A8A8A] font-medium mt-1">
                MINUTES
              </p>
            </div>

            <div>
              <p className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">
                {product?.age}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[#8A8A8A] font-medium mt-1">
               AGES
              </p>
            </div>

            <div>
              <p className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">
                {product?.cards}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[#8A8A8A] font-medium mt-1">
                CARDS
              </p>
            </div>
          </div>

          {/* Color & Size Variant Selectors (Rendered dynamically if merchandise) */}
          {isMerchandise && (hasSizes || hasColors) && (
            <div className="space-y-4 max-w-xl bg-white/50 p-4 rounded-xl border border-[#EAE6DF]">
              {hasSizes && (
                <fieldset className="flex flex-col gap-2">
                  <legend className="text-xs font-semibold uppercase tracking-wider text-[#8B8B8B]">
                    Size <span className="text-[#E96A3D]">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup">
                    {product.size!.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        role="radio"
                        aria-checked={selectedSize === size}
                        className={`px-3 py-1.5 text-xs font-medium border rounded transition-all ${
                          selectedSize === size
                            ? "border-[#B3634B] bg-[#B3634B]/5 text-[#B3634B]"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {hasColors && (
                <fieldset className="flex flex-col gap-2">
                  <legend className="text-xs font-semibold uppercase tracking-wider text-[#8B8B8B]">
                    Color <span className="text-red-500">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup">
                    {product.color!.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        role="radio"
                        aria-checked={selectedColor === color}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          selectedColor === color
                            ? "ring-2 ring-[#B3634B] scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        aria-label={`Select ${color}`}
                      />
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          )}

          {/* Bottom Control Row: Price, Quantity, Add to Cart, Action Link */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            {/* Terracotta Styled Price */}
            <p className="text-3xl md:text-4xl font-normal text-[#E96A3D]">
              ${displayPrice.toFixed(2)}{" "}
              <span className="text-base font-light tracking-normal text-gray-500">
                {currency}
              </span>
            </p>

            {/* Quantity Selector Counter */}
            <div className="flex items-center border border-gray-300 !rounded-none bg-white overflow-hidden h-11">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={isAdding || quantity <= 1}
                className="px-3 hover:bg-gray-100 h-full transition-colors disabled:opacity-30"
              >
                <Minus className="w-3.5 h-3.5 text-gray-600" />
              </button>
              <span className="w-10 text-center text-sm font-medium text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={isAdding}
                className="px-3 hover:bg-gray-100 h-full transition-colors disabled:opacity-30"
              >
                <Plus className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>

            {/* Pill Shape Terracotta Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="px-8 h-11 bg-[#E96A3D] hover:bg-[#9C523D] !rounded-none text-white text-xs font-medium uppercase tracking-wider transition-all transform active:scale-[0.98] disabled:opacity-50"
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>

            {/* How To Play Arrow Link */}
            <button
              onClick={() =>
                document
                  .getElementById(
                    isMerchandise ? "product-details" : "game-rules",
                  )
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="text-xs font-bold tracking-widest text-[#1A1A1A] uppercase flex items-center gap-2 hover:opacity-80 transition-opacity ml-auto sm:ml-0"
            >
              How To Play <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </article>

        {/* Right Column: Images Grid -> Added order-1 lg:order-2 */}
        <div className="w-full lg:col-span-5 flex flex-col gap-4 order-1 lg:order-2">
          {/* Main Product Frame */}
          <div className="relative w-full aspect-square bg-white shadow-sm border border-gray-100 overflow-hidden">
            <Image
              src={displayImage}
              alt={product.productName}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Horizontal Thumbnails Layout aligned directly beneath main image */}
          <nav
            className="flex flex-wrap gap-3"
            aria-label="Product image thumbnails"
          >
            {thumbnails.map((img, index) => (
              <button
                key={`${img}-${index}`}
                onClick={() => handleImageSelect(img)}
                className={`relative w-20 h-20 border transition-all ${
                  selectedImage === img || (!selectedImage && index === 0)
                    ? "border-2 border-[#1A1A1A] opacity-100 scale-102"
                    : "border-gray-200 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
