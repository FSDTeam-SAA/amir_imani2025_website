import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Product } from "@/lib/types/ecommerce";
import { productService } from "@/lib/api/product-service";
import Link from "next/link";
import Image from "next/image";
import { getProductPreviousPrice, getProductPrice } from "@/lib/utils/product-price";

const SearchMotal = ({
  open,
  onSetSearchOpen,
}: {
  open: boolean;
  onSetSearchOpen: (open: boolean) => void;
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const response = await productService.getSearchProduct(query);
          if (response.success) {
            setResults(response.data);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500); // Debounce search for 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <section>
      <div className="search-motal  container mx-auto px-4">
        <AlertDialog open={open} onOpenChange={onSetSearchOpen}>
          <AlertDialogContent className="w-[95vw] md:max-w-3xl max-h-[80vh] overflow-hidden flex flex-col p-4 md:p-6">
            <AlertDialogHeader className="flex flex-row items-center gap-3 space-y-0">
              <AlertDialogTitle className="hidden">
                Search Products
              </AlertDialogTitle>
              <Input
                type="text"
                placeholder="Search products..."
                name="search"
                value={query}
                onChange={handleSearch}
                className="flex-1"
                autoFocus
              />
              <AlertDialogCancel className="mt-0">Close</AlertDialogCancel>
            </AlertDialogHeader>

            <div className="flex-1 overflow-y-auto mt-4 pr-2">
              {loading && (
                <div className="flex justify-center p-4">
                  <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500">
                    Search Results ({results.length})
                  </h3>
                  <div className="space-y-3">
                    {results.map((product) => (
                      <Link
                        key={product._id}
                        href={
                          product.productType === "marchandice"
                            ? `/merchandise/${product._id}`
                            : `/product/${product._id}`
                        }
                        onClick={() => onSetSearchOpen(false)}
                        className="flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                      >
                        <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={
                              (product.imgs && product.imgs.length > 0
                                ? product.imgs[0]
                                : product.img) || "/no-image.jpg"
                            }
                            alt={product.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                            {product.productName}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-500 line-clamp-1">
                            {product.feature}
                          </p>
                        </div>
                        <div className="text-right font-semibold text-gray-900">
                          <div>
                            ${getProductPrice(product).amount.toFixed(2)} {getProductPrice(product).currency}
                          </div>
                          {getProductPreviousPrice(product) && (
                            <div className="text-gray-400 line-through">
                              ${getProductPreviousPrice(product)?.amount.toFixed(2)} {getProductPreviousPrice(product)?.currency}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {!loading && query.trim() !== "" && results.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No products found for &apos;{query}&apos;
                </div>
              )}

              {!loading && query.trim() === "" && (
                <div className="text-center py-12 text-gray-400">
                  Start typing to search...
                </div>
              )}
            </div>
            <AlertDialogFooter className="hidden">
              {/* Footer hidden as content manages itself, but kept for accessibility structure if needed */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default SearchMotal;
