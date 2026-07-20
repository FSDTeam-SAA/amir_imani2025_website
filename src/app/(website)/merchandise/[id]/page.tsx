"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import FAQAccordionSection from "../_Components/FAQAccordionSection";
import GarmentSpecsSection from "../_Components/GarmentSpecsSection";
import ProductImageSlider from "../_Components/RecommendedProducts";
import ProductReviewsSection from "../_Components/product-reviews-section";
import MerchandiseSingleCard, {
  MerchandiseSingleCardSkeleton,
} from "@/components/merchandise/merchandiseSingleProduct/MerchandiseSingleCard";
import { productService } from "@/lib/api/product-service";
import { Product } from "@/lib/types/ecommerce";

export default function MerchandiseDetailsPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;

    let isMounted = true;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await productService.getProductById(productId);

        if (!isMounted) return;

        if (response.success && response.data) {
          setProduct({
            ...response.data,
            img: response.data.img || response.data.imgs?.[0],
          });
          return;
        }

        setError("Product not found.");
      } catch (fetchError) {
        console.error("Failed to load merchandise product:", fetchError);
        if (isMounted) {
          setError("Could not load this product. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const colors = useMemo(
    () =>
      product?.color && product.color.length > 0
        ? product.color
        : product?.colors || [],
    [product]
  );
  const sizes = useMemo(
    () =>
      product?.size && product.size.length > 0 ? product.size : product?.sizes || [],
    [product]
  );

  if (isLoading) {
    return (
      <main className="bg-[#FBFBFB]">
        <div className="container mx-auto px-4">
          <MerchandiseSingleCardSkeleton />
          <div className="flex items-center justify-center gap-2 pb-12 text-sm text-[#666666]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading product details...
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#FBFBFB] px-6">
        <div className="max-w-md rounded-lg border border-[#EFEFEF] bg-white p-6 text-center">
          <h1 className="text-xl font-bold text-[#111111]">
            Merchandise unavailable
          </h1>
          <p className="mt-2 text-sm text-[#666666]">
            {error || "Product not found."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#fcf8efb0]">
      <div className="container mx-auto px-4">
        <MerchandiseSingleCard product={product} />
      </div>
      <GarmentSpecsSection product={product}/>
      <ProductImageSlider currentProductId={product._id} />
      <FAQAccordionSection />
      <ProductReviewsSection productId={product._id} />
    </main>
  );
}
