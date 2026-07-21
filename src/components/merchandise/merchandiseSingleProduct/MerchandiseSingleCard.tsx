"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Check,
  Minus,
  Plus,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/lib/types/ecommerce";
import { useCart } from "@/provider/cart-provider";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductPrice } from "@/lib/utils/product-price";

export interface ProductHeroProps {
  product: Product;
}

const MerchandiseSingleCard = ({ product }: ProductHeroProps) => {
  const [quantity, setQuantity] = useState(1);
  const { amount: displayPrice, currency } = getProductPrice(product);
  const [isAdding, setIsAdding] = useState(false);
  const [selectColor, setSelectColor] = useState<string | null>(null);
  const [selectSize, setSelectSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    (product.imgs && product.imgs.length > 0 ? product.imgs[0] : product.img) ||
      null,
  );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (product.imgs && product.imgs.length > 0) {
      setSelectedImage(product.imgs[0]);
    } else {
      setSelectedImage(product.img || null);
    }
  }, [product]);

  const images =
    product.imgs && product.imgs.length > 0
      ? product.imgs
      : product.img
        ? [product.img]
        : [];

  const goNextImage = () => {
    if (images.length <= 1) return;
    const currentIndex = images.findIndex((i) => i === selectedImage) ?? 0;
    const next = images[(currentIndex + 1) % images.length];
    setSelectedImage(next);
  };

  const goPrevImage = () => {
    if (images.length <= 1) return;
    const currentIndex = images.findIndex((i) => i === selectedImage) ?? 0;
    const prev = images[(currentIndex - 1 + images.length) % images.length];
    setSelectedImage(prev);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goNextImage();
      else goPrevImage();
    }
    touchStartX.current = null;
  };

  const { addToCart } = useCart();

  const { data: session } = useSession();

  const handleAddToCart = async () => {
    setIsAdding(true);

    if (
      ((product.colors && product.colors.length > 0) ||
        (product.color && product.color.length > 0)) &&
      !selectColor
    ) {
      toast.error("Please select a color.");
      setIsAdding(false);
      return;
    }

    if (
      ((product.sizes && product.sizes.length > 0) ||
        (product.size && product.size.length > 0)) &&
      !selectSize
    ) {
      toast.error("Please select a size.");
      setIsAdding(false);
      return;
    }

    try {
      await addToCart(
        [
          {
            productId: product._id,
            quantity,
            color: selectColor || undefined,
            size: selectSize || undefined,
            product,
          },
        ],
        session?.user?.id,
      );
      toast.success(`${product.productName} added to cart for pre-order!`);
    } catch (error) {
      toast.error("Failed to add to cart for pre-order. Please try again.");
      console.error("Add to cart error:", error);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <section className="py-12 lg:py-16 ">
      <div className="grid grid-cols-1 lg:grid-cols-2  items-start lg:items-stretch">
        {/* Left Column: Product Image */}
        <div className="flex w-full  max-w-[480px] flex-col gap-3 mx-auto lg:ml-0 lg:min-h-0 lg:mb-8">
          {/* Thumbnail big Image  */}
          <div
            className="relative w-full aspect-square overflow-hidden lg:aspect-auto lg:min-h-0 lg:flex-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={
                selectedImage ||
                (product.imgs && product.imgs.length > 0
                  ? product.imgs[0]
                  : product.img) ||
                "/no-image.jpg"
              }
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {images.length > 1 && (
              <>
                <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none md:hidden">
                  <button
                    onClick={goPrevImage}
                    aria-label="Previous image"
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#111111]" />
                  </button>
                  <button
                    onClick={goNextImage}
                    aria-label="Next image"
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow"
                  >
                    <ChevronRight className="w-5 h-5 text-[#111111]" />
                  </button>
                </div>

                {/* Mobile dots */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 md:hidden">
                  {images.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setSelectedImage(img)}
                      aria-label={`Show image ${idx + 1}`}
                      className={`w-2 h-2 rounded-full ${
                        selectedImage === img ? "bg-primary" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div
              className="flex w-full gap-3 overflow-x-auto p-1 no-scrollbar"
              aria-label="Product image thumbnails"
            >
              {images.map((img, index) => (
                <button
                  type="button"
                  key={`${img}-${index}`}
                  className={`relative aspect-square min-w-18 flex-1 basis-0 overflow-hidden  border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    selectedImage === img || (!selectedImage && index === 0)
                      ? "border-primary shadow-md"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  aria-label={`View image ${index + 1} of ${product.productName}`}
                  aria-pressed={
                    selectedImage === img || (!selectedImage && index === 0)
                  }
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.productName} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col text-left ">
          {/* Title and Price */}
          <h1 className="text-4xl lg:text-[40px] font-bold text-[#111111] mt-4 mb-2 leading-tight">
            {product.productName}
          </h1>
          <div className="mb-6 text-3xl font-bold text-[#111111]">
            <span>
              ${displayPrice.toFixed(2)}{" "}
              <span className="text-base font-normal text-gray-500">
                {currency}
              </span>
            </span>
          </div>

          {/* Summary / Features */}
          <p className="text-[#333333] text-base leading-relaxed mb-6 whitespace-pre-line">
            {product.feature}
          </p>

          {/* Controls */}
          <div className="space-y-6 mb-8">
            <div>
              {/* Color and Size Options */}
              <div className="md:flex flex-col justify-between gap-12 mb-7 md:space-y-0 space-y-4">
                {(product.color || product.colors) &&
                  (product.color?.length || 0) + (product.colors?.length || 0) >
                    0 && (
                    <div className="flex flex-col gap-4 ">
                      <span className="text-sm font-medium min-w-[60px]">
                        Colors
                      </span>
                      <div className="flex flex-wrap gap-3">
                        {(product.color || product.colors)?.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectColor(color)}
                            className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-200 ${
                              selectColor === color
                                ? "border-primary"
                                : "border-gray-300 hover:border-gray-500"
                            }`}
                          >
                            {/* Color Circle */}
                            <div
                              className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center"
                              style={{
                                backgroundColor: color.startsWith("#")
                                  ? color
                                  : `#${color}`,
                              }}
                            >
                              {selectColor === color && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>

                            {/* Color Name */}
                            {/* <span className="text-sm font-medium capitalize">
                              {color.replace("#", "")}
                            </span> */}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                {(product.size || product.sizes) &&
                  (product.size?.length || 0) + (product.sizes?.length || 0) >
                    0 && (
                    <div className="flex flex-col gap-4">
                      <span className="text-sm font-medium min-w-[60px]">
                        Sizes:
                      </span>

                      <div className="flex flex-wrap gap-3">
                        {(product.size || product.sizes)?.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectSize(size)}
                            className={`w-12 h-12 border text-sm font-semibold uppercase transition-all duration-200
              ${
                selectSize === size
                  ? "bg-[#1B1815] text-white border-[#1B1815]"
                  : "bg-white text-[#444] border-[#E5D9C9] hover:border-[#B8AA95] hover:bg-[#FAF6EE]"
              }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              {/* Secondary Action */}
              {/* <button className="flex items-center gap-2 text-[13px] text-[#8B8B8B] hover:text-[#111111] transition-colors mx-auto lg:mx-0">
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </button> */}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8B8B8B]">
                Quantity:
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex items-center p-3 border-2 border-[#EFEFEF] rounded-md overflow-hidden ">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-2 hover:bg-[#EFEFEF] transition-colors"
                    disabled={isAdding}
                  >
                    <Minus className="w-3 h-3 text-[#111111]" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-2 hover:bg-[#EFEFEF] transition-colors"
                    disabled={isAdding}
                  >
                    <Plus className="w-3 h-3 text-[#111111]" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full h-14 !rounded-none bg-[#4296a1] hover:bg-[#4296a1]/85 text-white  text-base "
            >
              {isAdding ? "Adding..." : "Pre-Order"} <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MerchandiseSingleCardSkeleton = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start lg:items-stretch">
        {/* Left Column Skeleton */}
        <div className="flex w-full max-w-[480px] flex-col gap-3 mx-auto lg:ml-0 lg:min-h-0">
          <Skeleton className="w-full aspect-square rounded-md lg:aspect-auto lg:min-h-0 lg:flex-1" />
          <div className="flex w-full gap-3 p-1">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-square min-w-18 flex-1 basis-0 rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-12 w-full md:w-3/4" />
          <Skeleton className="h-10 w-24" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default MerchandiseSingleCard;
