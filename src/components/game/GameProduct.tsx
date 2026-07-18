"use client";
import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";

import { Product } from "@/lib/types/ecommerce";
import { productService } from "@/lib/api/product-service";
import { MoveRight } from "lucide-react";
import { useCart } from "@/provider/cart-provider";
import { toast } from "sonner";
import ProductCard from "../shared/product-card";

const GameProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getCards();
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
       window.location.href = "/cart"
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Products
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Products
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
    <section className=" my-10 md:my-16 ">
      <div>
        <div className="container mx-auto w-[95%] md:w-full ">
        
          <div className="flex flex-wrap  gap-5">
            {(selectedProduct ? products : products.slice(0, 3)).map(
              (product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  addingToCartId={addingToCartId}
                />
              )
            )}
          </div>
          {products.length > 2 && (
            <Button
              onClick={() => setSelectedProduct(!selectedProduct)}
              className="mt-6 mx-auto flex items-center gap-2 border-gray-300 text-white"
            >
              {selectedProduct ? "Less Games" : "More Games"}
              <MoveRight />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default GameProduct;
