import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types/ecommerce";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  handleAddToCart: (
    e: React.MouseEvent,
    product: Product,
    redirect?: boolean
  ) => Promise<void>;
  addingToCartId: string | null;
}

export default function ProductCard({
  product,
  handleAddToCart,
  addingToCartId,
}: ProductCardProps) {
  const isAddingToCart = addingToCartId === product?._id;

  return (
    <Link
      key={product._id}
      href={`${
        product.productType === "card"
          ? `/product/${product._id}`
          : `/merchandise/${product._id}`
      }`}
      className="group block w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-[400px]"
    >
      <div className="relative overflow-hidden  border border-gray-100 bg-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={product?.imgs?.[0] || product?.img || "/no-image.jpg"}
            width={496}
            height={678}
            alt={product?.productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-primary text-white text-[12px] font-semibold uppercase tracking-wider px-3 py-1  shadow-lg">
              New Arrival
            </span>
          </div>
        </div>

        {/* Product Info - Below image on all screen sizes */}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg md:text-xl font-bold text-primary-foreground line-clamp-2">
              {product?.productName}
            </h3>
            <p className="text-primary-foreground text-base font-semibold whitespace-nowrap">
              ${product?.price}
            </p>
          </div>

          <div className="flex flex-row gap-3 transition-all duration-300">
            <Button
              variant="secondary"
              className="flex-1 !rounded-none hover:bg-amber-100 bg-white border text-primary-foreground font-semibold"
              onClick={(e) => handleAddToCart(e, product)}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                "..."
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </>
              )}
            </Button>
            <Button
              className="flex-1 !rounded-none bg-primary hover:bg-primary/80 text-white font-semibold"
              onClick={(e) => handleAddToCart(e, product, true)}
              disabled={addingToCartId === product?._id}
            >
              Pre-order
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
