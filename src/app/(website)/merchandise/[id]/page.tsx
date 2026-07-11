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
    <main className="bg-[#FBFBFB]">
      <div className="container mx-auto px-4">
        <MerchandiseSingleCard product={product} />
      </div>

      <section className="border-y border-[#EFEFEF] bg-white">
        <div className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Product details
            </p>
            <h2 className="text-2xl font-bold text-[#111111]">
              {product.productName}
            </h2>
            <div
              className="prose prose-sm mt-5 max-w-none text-[#333333] prose-headings:text-[#111111] prose-strong:text-[#111111]"
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            />
          </div>

          <aside className="space-y-5 rounded-lg border border-[#EFEFEF] bg-[#FBFBFB] p-5">
            <DetailRow label="Price" value={`$${product.price}`} />
            <DetailRow
              label="Availability"
              value={
                product.quantity && product.quantity > 0
                  ? `${product.quantity} in stock`
                  : "Out of stock"
              }
            />
            <DetailRow
              label="Type"
              value={
                product.productType === "marchandice" ? "Merchandise" : "Card"
              }
            />

            {colors.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8B8B8B]">
                  Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className="inline-flex h-8 w-8 rounded-full border border-gray-200 shadow-sm"
                      style={{
                        backgroundColor: color.startsWith("#")
                          ? color
                          : `#${color}`,
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8B8B8B]">
                  Sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-md border border-[#DDDDDD] bg-white px-3 py-1 text-sm font-semibold uppercase text-[#111111]"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <ProductReviewsSection productId={product._id} />
      <GarmentSpecsSection />
      <ProductImageSlider currentProductId={product._id} />
      <FAQAccordionSection />
    </main>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#EFEFEF] pb-4 last:border-b-0 last:pb-0">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#8B8B8B]">
        {label}
      </span>
      <span className="text-right text-sm font-semibold text-[#111111]">
        {value}
      </span>
    </div>
  );
}
