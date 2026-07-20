import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Product } from "@/lib/types/ecommerce";
import DownloadForm from "./DownloadForm";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const isCard = product.productType === "card";
  const sectionLabel = isCard ? "CARD PRODUCT DETAILS" : product.category || "PRODUCT DETAILS";
  const title = isCard
    ? product.productName
    : product.garmentTitle || product.productName;

  return (
    <section
      id="product-details"
      className="my-16 md:my-24 px-4 md:px-8 container mx-auto font-sans"
    >
      <div className="bg-gradient-to-br from-[#12181A] via-[#161D20] to-[#0D1113] text-[#FAF8F5] rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden">
        <div
          className={`grid grid-cols-1 ${
            isCard ? "lg:grid-cols-12" : "lg:grid-cols-1"
          } gap-8 lg:gap-16 items-start mx-auto`}
        >
          <div className={isCard ? "lg:col-span-7" : "lg:col-span-1"}>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#7A8B93] uppercase mb-4">
              {sectionLabel}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] mb-6 text-white">
              {title}
            </h2>

            <div className="prose prose-invert max-w-none break-words overflow-hidden text-[#B0BCC2] font-light leading-relaxed text-sm md:text-base selection:bg-[#B3634B]/30">
              <div 
                className="space-y-4 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:list-none [&_ul]:pl-0 [&_li]:before:content-['-'] [&_li]:before:mr-3 [&_li]:before:text-[#7A8B93] [&_li]:text-xs [&_li]:tracking-wider [&_li]:uppercase [&_li]:text-[#D0DBC5]" 
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </div>
          </div>

          {isCard && (
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="w-full max-w-[420px]">
                <DownloadForm gameName={product.productName} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const ProductDetailsSkeleton = () => {
  return (
    <section className="my-16 max-w-7xl mx-auto px-4">
      <div className="bg-[#161D20] rounded-2xl p-8 md:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Skeleton className="h-4 w-1/4 bg-gray-800 mb-4" />
            <Skeleton className="h-10 w-3/4 bg-gray-800 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-5/6 bg-gray-800" />
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-end">
            <Skeleton className="h-[320px] w-full max-w-[420px] rounded-xl bg-gray-800" />
          </div>
        </div>
      </div>
    </section>
  );
};
