"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import ProductNavbar from "@/components/shared/ProductNavbar"
import ProductHero from "@/components/shared/ProductHero";
import ProductDetails from "@/components/shared/ProductDetails";
import MediaSection from "@/components/shared/MediaSection";
// import ProductFooter from "@/components/shared/ProductFooter"
import { Product } from "@/lib/types/ecommerce";
import { productService } from "@/lib/api/product-service";
import RightToLeftMarquee from "@/components/shared/LeftToRightMarquee";
import GameRulesSection from "../_components/GameRulesSection";
import BoardAnatomySection from "../_components/BoardAnatomySection";
import PressReactionsSection from "../_components/PressReactionsSection";
import MaterialsSection from "../_components/MaterialsSection";

export default function ProductPage() {
  const params = useParams();
  const productId = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const response = await productService.getProductById(productId);
        if (response.success) {
          setProduct(response.data);
        } else {
          setError("Failed to fetch product");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("An error occurred while fetching the product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center">
        <p className="text-red-500 text-lg">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f0] border   selection:text-[#2E8F8A]">
      {/* Patterned Background Overlay (Subtle) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'url("/images/pattern-bg.png")',
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* <ProductNavbar /> */}

      <main >
        <ProductHero product={product} /> 
        <RightToLeftMarquee active={true}/>
        <GameRulesSection />
        <BoardAnatomySection />
        <MediaSection videoLink={product.videoLink} />
        <MaterialsSection/>
        <ProductDetails product={product} />
        <PressReactionsSection/>
      </main>
    </div>
  );
}
