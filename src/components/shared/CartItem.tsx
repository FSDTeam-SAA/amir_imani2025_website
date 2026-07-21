"use client";

import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: "USD" | "CAD";
  imageUrl: string;
  quantity: number;
  color?: string;
  size?: string;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = React.memo(function CartItem({
  id,
  title,
  description,
  price,
  currency = "USD",
  imageUrl,
  quantity,
  color,
  size,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const shortDescription = description?.replace(/<[^>]*>/g, "").slice(0, 60);

  return (
    <div className="relative flex flex-col  sm:flex-row items-start sm:items-cente  gap-4 p-4 border border-[#EFEFEF] rounded-lg mb-4 bg-white hover:border-primary/30 transition-colors">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 sm:static sm:order-first p-2 text-primary hover:bg-primary/10 rounded-full transition-colors shrink-0"
        aria-label="Remove item" // Accessiblity improvement
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="flex justify-between w-full gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 relative rounded-md overflow-hidden shrink-0 border border-[#EFEFEF]">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        {/* Product Details (Mobile: Next to image, Desktop: Flexed) */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
          <div className="flex flex-col gap-1 w-full md:max-w-[300px] pr-8 sm:pr-0">
            <h3 className="text-base font-semibold text-primary leading-tight truncate">
              {title}
            </h3>
            <div
              className="text-xs text-[#8B8B8B] leading-relaxed line-clamp-1"
              dangerouslySetInnerHTML={{
                __html: shortDescription,
              }}
            />

            {(color || size) && (
              <div className="flex flex-wrap gap-3 mt-1">
                {color && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#8B8B8B]">
                      Color:
                    </span>
                    <div
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                )}
                {size && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#8B8B8B]">
                      Size:
                    </span>
                    <span className="text-[10px] font-bold text-primary-foreground">
                      {size}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Price and Stepper */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0 border-t md:border-t-0 pt-3 md:pt-0 border-dashed border-gray-200">
            <span className="text-lg font-bold text-primary">
              ${price?.toFixed(2)} <span className="text-xs font-normal">{currency}</span>
            </span>

            <div className="flex items-center border border-[#2E8F8A] rounded-md overflow-hidden h-8">
              <button
                onClick={() => onQuantityChange(id, Math.max(0, quantity - 1))}
                className="px-2 h-full hover:bg-[#2E8F8A]/10 text-[#2E8F8A] transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-sm font-medium text-primary">
                {quantity}
              </span>
              <button
                onClick={() => onQuantityChange(id, quantity + 1)}
                className="px-2 h-full hover:bg-[#2E8F8A]/10 text-[#2E8F8A] transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartItem;
