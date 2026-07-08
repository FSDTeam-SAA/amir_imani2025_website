"use client";
import React, { useEffect, useState } from "react";

import { Product } from "@/lib/types/ecommerce";
import { productService } from "@/lib/api/product-service";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/provider/cart-provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProductCard from "../shared/product-card";

// Chevron Icon Components for Dropdown
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const MerchandiseProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  // Filter State (Static tracking for UI)
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Static Categories matching your image
  const categories = [
    { id: "ALL", label: "ALL", count: 16 },
    { id: "APPAREL", label: "APPAREL", count: 4 },
    { id: "ACCESSORIES", label: "ACCESSORIES", count: 3 },
    { id: "PRINTS_POSTERS", label: "PRINTS & POSTERS", count: 3 },
    { id: "STATIONERY", label: "STATIONERY", count: 2 },
    { id: "HOME_DECOR", label: "HOME & DECOR", count: 2 },
    { id: "COLLECTIBLES", label: "COLLECTIBLES", count: 2 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getmarchandice();
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

    setAddingToCartId(product._id);
    try {
      await addToCart(
        [
          {
            productId: product._id,
            quantity: 1,
            product,
          },
        ]
      );
      toast.success(`${product.productName} added to cart!`);
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

  const { addToCart } = useCart();
  const router = useRouter();

  if (loading) {
    return (
      <section className="my-10 md:my-16">
        <div className="container mx-auto py-12">
          <h2 className="text-lg md:text-2xl xl:text-[48px] text-[#0C0D0E] leading-[150%] font-semibold mb-8 text-center invisible">
            ALL Merchandise Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-10 md:my-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ALL Merchandise Product
          </h2>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ALL Merchandise Product
          </h2>
          <p className="text-center text-gray-500">
            No products available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-10 md:my-16">
      <div className="container mx-auto px-4">
        
        {/* --- TOP FILTER & SORT BAR (Image Match) --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-8">
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                    isActive
                      ? "bg-[#141412] text-white border-[#141412]"
                      : "bg-[#FAF8F5] text-[#141412] border-[#EAE6DF] hover:bg-[#EAE6DF]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? "text-gray-400" : "text-gray-500"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-4 self-end md:self-auto text-sm">
            <span className="text-gray-500">
              <strong className="text-gray-900 font-medium">16</strong> products
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">SORT</span>
              <div className="relative inline-block">
                <select 
                  className="appearance-none bg-transparent pr-8 pl-1 py-1 font-medium text-gray-900 focus:outline-none cursor-pointer border-b border-transparent hover:border-gray-400 transition-colors"
                  defaultValue="featured"
                >
                  <option value="featured">Featured</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-900">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* --- END OF BAR --- */}

        {products?.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">You have no data</p>
        ) : (
          <div className="flex flex-wrap items-center gap-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
                addingToCartId={addingToCartId}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="group relative border-2 border-gray-100 rounded-lg overflow-hidden flex flex-col justify-center bg-white p-4">
      <Skeleton className="w-full aspect-square rounded-lg mb-4" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <div className="flex justify-between items-center gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
};

export default MerchandiseProduct;
