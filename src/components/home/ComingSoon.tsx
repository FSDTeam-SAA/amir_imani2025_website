"use client";
import React, { useEffect, useState } from "react";

import { Product } from "@/lib/types/ecommerce";
import { productService } from "@/lib/api/product-service";

import { MoveRight } from "lucide-react";
import ProductCard from "../shared/product-card";
import { Button } from "../ui/button";
import { useCart } from "@/provider/cart-provider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const ComingSoon = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        if (response.success) {
          setProducts(response.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (
    e: React.MouseEvent,
    product: Product,
    redirect: boolean = false
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setAddingToCartId(product?._id);
    try {
      await addToCart(
        [
          {
            productId: product?._id,
            quantity: 1,
            product,
          },
        ],
        session?.user?.id
      );
      toast.success(`${product?.productName} added to cart!`);
      if (redirect) {
        router.push("/cart");
      }
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
      console.error("Add to cart error:", error);
    } finally {
      setAddingToCartId(null);
    }
  };

  if (loading) {
    return (
      <section className="md:my-16 lg:my-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-12">
            Our Products
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#4296A2] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-12">
            Our Products
          </h2>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (products?.length === 0) {
    return (
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-12">
            Our Products
          </h2>
          <p className="text-center text-gray-500">
            No products available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative ">
      <div className="container mx-auto my-10 md:my-16 lg:my-20">
        <div className="text-center max-w-286.5 mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-[48px] text-primary-foreground font-bold mb-6 tracking-tight">
            Symbolverse: Stories Told Through Games
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            DoUndo is a collection of original tabletop experiences, each with
            its own style and challenge. Some invite strategic duels of
            psychology and deduction, others spark memory, puzzles, or playful
            moments of chance. What unites them is a symbolic system that ties
            every design into one universe.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Main Product Card */}
          {products
            ?.filter((product) => product?.productType === "card")
            .slice(0, 1)
            .map((product) => (
              <ProductCard
                key={product?._id}
                product={product}
                handleAddToCart={handleAddToCart}
                addingToCartId={addingToCartId}
              />
            ))}

          {/* Coming Soon Teaser Card */}
          <Link
            href="/game/coming-soon"
            className="group block w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-[400px]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {/* Image Container */}
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src="/images/WalnizeProductCard.jpeg"
                  alt="Walnize - Coming Soon"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-primary text-white text-[12px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Coming Soon
                  </span>
                </div>

            
              </div>

              {/* Product Info - Below image on all screen sizes */}
              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-primary-foreground line-clamp-2">
                    Walnize
                  </h3>
                  <p className="text-primary-foreground/60 text-sm font-medium whitespace-nowrap">
                    Next Release
                  </p>
                </div>
                    {/* CTA Button - Centered on image */}
                <div className="  flex items-center justify-start z-10">
                  <Button className="rounded-full bg-primary  border-primary text-white hover:bg-primary/90 transition-colors px-6  h-auto font-bold flex items-center gap-2">
                    Get Notified
                    <MoveRight className="w-4  transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* <div className="mt-16 flex justify-center">
          <Link href="/game">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#0C0D0E] text-[#0C0D0E] hover:bg-[#0C0D0E] hover:text-white transition-all duration-300 font-bold px-10 py-6 h-auto flex items-center gap-2 group"
            >
              Explore More Games
              <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default ComingSoon;
