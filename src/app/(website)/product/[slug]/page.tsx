"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductHero from "@/components/shared/ProductHero";
import ProductDetails from "@/components/shared/ProductDetails";
import MediaSection from "@/components/shared/MediaSection";
import { Product } from "@/lib/types/ecommerce";
import { productService } from "@/lib/api/product-service";
import RightToLeftMarquee from "@/components/shared/LeftToRightMarquee";
import GameRulesSection from "../_components/GameRulesSection";
import BoardAnatomySection from "../_components/BoardAnatomySection";
import PressReactionsSection from "../_components/PressReactionsSection";
// import MaterialsSection from "../_components/MaterialsSection";

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

  const materialItems = [
    {
      count: "01",
      title: "Material",
      description: product.garmentsMATERIAL || "",
    },
    {
      count: "02",
      title: "Weight",
      description: product.garmentWEIGHT || "",
    },
    {
      count: "03",
      title: "Fit",
      description: product.garmentFit || "",
    },
    {
      count: "04",
      title: "Print",
      description: product.garmentPRINT || "",
    },
    {
      count: "05",
      title: "Made In",
      description: product.garmentMADeIN || "",
    },
    {
      count: "06",
      title: "Care",
      description: product.garmentCARE || "",
    },
  ].filter((item) => item.description);

  const shouldShowCardSections = product.productType === "card";

  return (
    <div className="bg-[#faf7f0] border   selection:text-[#2E8F8A]">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'url("/images/pattern-bg.png")',
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      <main>
        <ProductHero product={product} />
        <RightToLeftMarquee active={true} />
        {shouldShowCardSections && (
          <GameRulesSection
            title={product.ruleTitle}
            rules={product.rulls?.filter(
              (rule) => rule?.num || rule?.title || rule?.description,
            )}
          />
        )}
        {shouldShowCardSections && (
          <BoardAnatomySection
            title={product.boardanatomyTitle}
            description={product.boardAnatomyDiscription}
          />
        )}
        <MediaSection
          productName={product.productName}
          videoLink={product.videoLink}
        />
        {/* <MaterialsSection
          title={product.garmentTitle}
          items={materialItems}
        /> */}
        <ProductDetails product={product} />
        {shouldShowCardSections && (
          <PressReactionsSection
            title={product.passandplayTittle}
            items={product.passandplay?.filter(
              (item) => item?.message || item?.name || item?.type,
            )}
          />
        )}
      </main>
    </div>
  );
}
