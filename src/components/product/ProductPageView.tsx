"use client";

import React from "react";
import ProductHero from "@/components/shared/ProductHero";
import ProductDetails from "@/components/shared/ProductDetails";
import MediaSection from "@/components/shared/MediaSection";
import { Product } from "@/lib/types/ecommerce";

interface ProductPageViewProps {
  product: Product;
}

const ProductPageView = ({ product }: ProductPageViewProps) => {
  return (
    <div className="bg-[#FBFBFB] selection:bg-[#2E8F8A]/20 selection:text-[#2E8F8A]">
      {/* Patterned Background Overlay (Subtle) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'url("/images/pattern-bg.png")',
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      <main className="relative z-10 pb-20 container mx-auto px-6 lg:px-0 max-w-6xl">
        <ProductHero product={product} />
        <ProductDetails product={product} />
        {product.productType === "card" && (
          <MediaSection
            productName={product.productName}
            videoLink={product.videoLink}
          />
        )}
      </main>
    </div>
  );
};

export default ProductPageView;
