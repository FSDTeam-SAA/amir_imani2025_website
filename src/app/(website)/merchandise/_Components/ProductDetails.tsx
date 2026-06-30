"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductDetailSection() {
  const params = useParams();

  const images = [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80",
  ];

  const [selectedColor, setSelectedColor] = useState("Parchment");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(images[0]);

  const colors = [
    { name: "Parchment", class: "bg-[#FAF6EE] border-[#171513]" },
    { name: "Ink", class: "bg-[#171513] border-stone-200" },
    { name: "Teal", class: "bg-[#3A8B91] border-stone-200" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const thumbnails = ["MAIN", "BACK", "DETAIL", "LIFE"];

  return (
    <section className="bg-[#FAF6EE] text-[#171513] py-12 px-6 md:px-12 lg:px-24 min-h-screen flex items-center justify-center font-sans antialiased">
      <div className="container mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <nav className="text-[10px] font-bold tracking-[0.25em] uppercase text-stone-400 mb-8 flex items-center gap-2">
          <span>MERCH</span> <span>/</span>
          <span>THE PANTHEON TEES</span> <span>/</span>
          <span className="text-stone-900">ASGARD</span>
        </nav>

        {/* Main Interface Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Product Images - 6 Columns */}
          <div className="lg:col-span-6 space-y-4 w-full">
            {/* Featured Main Image Showcase Area */}
            <div className="w-full aspect-square bg-[#E6DFD3] relative border border-stone-300/40 p-4 overflow-hidden">
              {/* Top Corner Meta Tag */}
              <div className="absolute top-4 left-4 bg-[#FAF6EE]/80 px-2 py-1 text-[9px] font-bold tracking-[0.2em] uppercase text-stone-500 border border-stone-200">
                ASGARD — 02 / 12
              </div>

              <div className="absolute inset-0">
                <Image
                  src={activeImage}
                  alt="Product Image"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Bottom Info Bar Label */}
              <div className="absolute bottom-4 left-4 bg-[#FAF6EE] px-3 py-1 text-[9px] font-mono tracking-wider uppercase text-stone-600 border border-stone-200">
                FRONT • ASGARD GLYPH, CENTERED
              </div>
            </div>

            {/* Micro Thumbnail Selection Row */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => {
                const isActive = activeImage === image;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveImage(image)}
                    className={`aspect-square relative overflow-hidden border transition-all ${
                      isActive
                        ? "border-[#171513] shadow-md"
                        : "border-stone-300/40 hover:border-stone-400"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-4xl font-normal tracking-tight text-stone-950 mb-1">
                Asgard
              </h1>
              <p className="text-[#3A8B91] italic font-serif text-sm md:text-base tracking-wide">
                Cotton Half Sleeve T-Shirt
              </p>
            </div>

            <div className="text-2xl font-bold tracking-tight text-[#171513]">
              $48 USD
            </div>

            <hr className="border-stone-200" />

            <div className="space-y-2.5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase block">
                COLOR — {selectedColor.toUpperCase()}
              </span>
              <div className="flex items-center gap-3">
                {colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 border text-xs tracking-wide transition-all bg-white font-medium ${
                        isSelected
                          ? "border-[#171513] ring-1 ring-[#171513]"
                          : "border-stone-200 text-stone-600 hover:border-stone-400"
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full border border-stone-300/60 inline-block ${color.class}`}
                      />
                      {color.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Configuration Component */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between max-w-md">
                <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase block">
                  SIZE — {selectedSize}
                </span>
                <button className="text-[10px] font-bold tracking-[0.15em] text-[#3A8B91] uppercase hover:underline flex items-center gap-0.5">
                  SIZE GUIDE <span className="text-[8px]">⏵</span>
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2 max-w-md">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border text-center text-xs font-mono transition-all uppercase ${
                        isSelected
                          ? "bg-[#171513] text-white border-[#171513]"
                          : "bg-white text-stone-800 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector Option */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase block">
                QUANTITY
              </span>
              <div className="inline-flex items-center border border-stone-200 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-500 hover:text-stone-900 text-xs font-bold focus:outline-none"
                >
                  −
                </button>
                <span className="px-4 py-2 text-xs font-mono font-bold text-stone-900 select-none min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-500 hover:text-stone-900 text-xs font-bold focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Primary CTA Add To Cart Button */}
            <div className="pt-2 max-w-md">
              <button className="w-full bg-[#3A8B91] hover:bg-[#2e6f74] text-white text-xs font-bold tracking-[0.25em] uppercase py-4 transition-colors duration-200 shadow-xs">
                ADD TO CART - ${48 * quantity}
              </button>
            </div>

            {/* Platform Integration Row Links */}
            <div className="flex items-center gap-6 text-[10px] font-mono tracking-wider font-bold text-stone-700 pt-2">
              <button className="hover:text-stone-950 flex items-center gap-1.5">
                01{" "}
                <span className="underline uppercase tracking-widest">
                  SHOPIFY
                </span>{" "}
                →
              </button>
              <button className="hover:text-stone-950 flex items-center gap-1.5">
                02{" "}
                <span className="underline uppercase tracking-widest">
                  AMAZON
                </span>{" "}
                →
              </button>
            </div>

            <hr className="border-stone-200" />

            {/* Bullet Point Delivery/Guarantee Information Labels */}
            <ul className="space-y-2 text-[11px] text-stone-500 font-mono tracking-wide">
              <li className="flex items-center gap-2">
                <span className="text-stone-400">✓</span> Free shipping over $80
              </li>
              <li className="flex items-center gap-2">
                <span className="text-stone-400">✓</span> 30-day returns, unworn
              </li>
              <li className="flex items-center gap-2">
                <span className="text-stone-400">✓</span> Ships from Porto in 3
                business days
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
