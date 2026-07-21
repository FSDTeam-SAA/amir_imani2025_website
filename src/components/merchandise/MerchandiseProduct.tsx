"use client";

import React, { useEffect, useMemo, useState } from "react";
import { productService } from "@/lib/api/product-service";
import { Product } from "@/lib/types/ecommerce";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/provider/cart-provider";
import { toast } from "sonner";
import ProductCard from "../shared/product-card";
import { getProductPrice } from "@/lib/utils/product-price";

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1 h-4 w-4"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const categoryDisplayOrder = [
  "ALL",
  "APPAREL",
  "ACCESSORIES",
  "PRINTS & POSTERS",
  "STATIONERY",
  "HOME & DECOR",
  "COLLECTIBLES",
] as const;

type SortOption = "featured" | "low-to-high" | "high-to-low";

const MerchandiseProduct = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAllMerchandise = async () => {
      try {
        const response = await productService.getmarchandice();
        if (response.success) {
          setAllProducts(response.data);
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

    fetchAllMerchandise();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const fetchCategoryProducts = async () => {
      setCategoryLoading(true);
      setError(null);

      try {
        if (selectedCategory === "ALL") {
          setProducts(allProducts);
          return;
        }

        const response =
          await productService.getMerchandiseByCategory(selectedCategory);
        if (response.success) {
          setProducts(response.data);
        } else {
          setError("Failed to filter products");
        }
      } catch (err) {
        console.error("Error filtering products:", err);
        setError("An error occurred while filtering products.");
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [allProducts, loading, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts = allProducts.reduce<Record<string, number>>(
      (acc, product) => {
        const category = product.category || "UNCATEGORIZED";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {},
    );

    return counts;
  }, [allProducts]);

  const categories = useMemo(() => {
    return categoryDisplayOrder.map((category) => ({
      id: category,
      label: category,
      count:
        category === "ALL" ? allProducts.length : categoryCounts[category] || 0,
    }));
  }, [allProducts.length, categoryCounts]);

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortBy === "low-to-high") {
      return items.sort(
        (a, b) => getProductPrice(a).amount - getProductPrice(b).amount,
      );
    }

    if (sortBy === "high-to-low") {
      return items.sort(
        (a, b) => getProductPrice(b).amount - getProductPrice(a).amount,
      );
    }

    return items;
  }, [products, sortBy]);

  const handleAddToCart = async (
    e: React.MouseEvent,
    product: Product,
    redirect: boolean = false,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setAddingToCartId(product._id);
    try {
      await addToCart([
        {
          productId: product._id,
          quantity: 1,
          product,
        },
      ]);
      toast.success(`${product.productName} added to cart!`);
      if (redirect) {
        window.location.href = "/cart";
      }
    } catch (cartError) {
      toast.error("Failed to add to cart. Please try again.");
      console.error("Add to cart error:", cartError);
    } finally {
      setAddingToCartId(null);
    }
  };

  if (loading) {
    return (
      <section className="my-10 md:my-16">
        <div className="container mx-auto py-12">
          <h2 className="invisible mb-8 text-center text-lg font-semibold leading-[150%] text-[#0C0D0E] md:text-2xl xl:text-[48px]">
            ALL Merchandise Product
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="my-10 bg-white md:my-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Merchandise Products
          </h2>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (allProducts.length === 0) {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Merchandise Products
          </h2>
          <p className="text-center text-gray-500">
            No products available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:mt-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? "border-[#141412] bg-[#141412] text-white"
                      : "border-[#EAE6DF] bg-[#FAF8F5] text-[#141412] hover:bg-[#EAE6DF]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] ${isActive ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 self-end text-sm md:self-auto">
            <span className="text-gray-500">
              <strong className="font-medium text-gray-900">
                {sortedProducts.length}
              </strong>{" "}
              products
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                SORT
              </span>
              <div className="relative inline-block">
                <select
                  className="cursor-pointer appearance-none border-b border-transparent bg-transparent py-1 pl-1 pr-8 font-medium text-gray-900 transition-colors hover:border-gray-400 focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
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

        {categoryLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <ProductCardSkeleton key={`filtered-${i}`} />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No products found in this category yet.
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-5">
            {sortedProducts.map((product) => (
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
    <div className="group relative flex flex-col justify-center overflow-hidden rounded-lg border-2 border-gray-100 bg-white p-4">
      <Skeleton className="mb-4 aspect-square w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="mx-auto h-6 w-3/4" />
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
};

export default MerchandiseProduct;
