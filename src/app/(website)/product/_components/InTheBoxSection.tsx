import { Product } from "@/lib/types/ecommerce";
import React from "react";

// Data array for easy maintenance and scalability
const items = [
  {
    number: "72",
    title: "Illustrated cards",
    description: "6 of each symbol, across 3 rarities",
  },
  {
    number: "1",
    title: "Fabric game board",
    description:
      "Heavy linen, folds to book-size Heavy linen, folds to book-size linen, folds to book-size linen, folds to book-size linen, folds to book-size linen, folds to book-size linen, folds to book-size.",
  },
  {
    number: "1",
    title: "Rules leaflet",
    description: "Letterpress, 8 pages, 4 languages",
  },
];

interface ProductHeroProps {
  product: Product;
}

export default function InTheBoxSection({ product }: ProductHeroProps) {
  return (
    <section className="bg-[#f7f6f0] py-16 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 min-w-0 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-[0.25em] font-semibold text-[#5c727d] uppercase mb-6">
                IN THE BOX
              </p>

              <h2 className="text-4xl md:text-5xl font-light leading-[1.15] tracking-tight text-[#1c1c1c] mb-8">
                {product?.inTheBox?.title || "N/A"}
              </h2>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-[#686868] break-words">
              {product?.inTheBox?.subtitle || "N/A"}
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 min-w-0 border-y border-[#e3ded5] divide-y divide-[#e3ded5]">
            {( product?.inTheBox?.boxnumbers?.length ?? 0) > 0 ? (
              product?.inTheBox?.boxnumbers?.map(
                (
                  item: {
                    number?: string;
                    title?: string;
                    subtitle?: string;
                  },
                  index: number,
                ) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 py-8 items-start"
                  >
                    {/* Number */}
                    <div className="col-span-3 sm:col-span-2 text-4xl sm:text-5xl font-light text-[#5c727d]">
                      {item.number || "N/A"}
                    </div>

                    {/* Details */}
                    <div className="col-span-9 sm:col-span-10 min-w-0">
                      <h3 className="text-xl sm:text-2xl text-[#1c1c1c] mb-2">
                        {item.title || "N/A"}
                      </h3>

                      <p className="text-sm sm:text-base text-[#888888] leading-relaxed break-words">
                        {item.subtitle || "N/A"}
                      </p>
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="grid grid-cols-12 gap-4 py-8 items-start">
                <div className="col-span-3 sm:col-span-2 text-4xl sm:text-5xl font-light text-[#5c727d]">
                  N/A
                </div>

                <div className="col-span-9 sm:col-span-10 min-w-0">
                  <h3 className="text-xl sm:text-2xl text-[#1c1c1c] mb-2">
                    N/A
                  </h3>

                  <p className="text-sm sm:text-base text-[#888888] leading-relaxed break-words">
                    N/A
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
