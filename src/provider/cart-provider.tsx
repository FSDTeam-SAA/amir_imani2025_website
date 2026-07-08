"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Cart } from "../lib/types/ecommerce";
// import { cartService } from "../lib/api/cart-service";
// import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  addGuestCartItems,
  CartItemInputWithProduct,
  clearGuestCart,
  getGuestCart,
  removeGuestCartItem,
  updateGuestCartItem,
} from "@/lib/utils/guest-cart";


interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (items: CartItemInputWithProduct[], userId?: string) => Promise<void>;
  updateQuantity: (
    productId: string,
    quantity: number,
    color?: string,
    size?: string
  ) => Promise<void>;
  removeFromCart: (
    productId: string,
    color?: string,
    size?: string
  ) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  // const { data: session } = useSession();

  const refreshCart = useCallback(async () => {
    setLoading(true);
    setCart(getGuestCart());
    setLoading(false);

    // Previous API-based cart fetch. Kept for future restore if needed.
    // if (!session?.user?.id) {
    //   setCart(getGuestCart());
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const response = await cartService.getCart(session.user.id);
    //   if (response.success) {
    //     setCart(response.data);
    //   }
    // } catch (error) {
    //   console.error("Failed to fetch cart:", error);
    // } finally {
    //   setLoading(false);
    // }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  useEffect(() => {
    const handleGuestCartUpdate = () => setCart(getGuestCart());
    window.addEventListener("guest-cart-updated", handleGuestCartUpdate);

    return () => {
      window.removeEventListener("guest-cart-updated", handleGuestCartUpdate);
    };
  }, []);

  const addToCart = useCallback(
    async (items: CartItemInputWithProduct[], userId?: string) => {
      try {
        void userId;
        setCart(addGuestCartItems(items));

        // Previous API-based cart add. Kept for future restore if needed.
        // const effectiveUserId = userId || session?.user?.id;
        //
        // if (!effectiveUserId) {
        //   setCart(addGuestCartItems(items));
        //   return;
        // }
        //
        // const productItems = items.map((item) => ({
        //   productId: item.productId,
        //   quantity: item.quantity,
        //   color: item.color,
        //   size: item.size,
        // }));
        // const response = await cartService.addToCart(effectiveUserId, productItems);
        // if (response.success) {
        //   setCart(response.data);
        // }
      } catch (error) {
        console.error("Failed to add to cart:", error);
        throw error;
      }
    },
    []
  );

  const updateQuantity = useCallback(
    async (
      productId: string,
      quantity: number,
      color?: string,
      size?: string
    ) => {
      if (!cart) return;

      setCart(updateGuestCartItem(productId, quantity, color, size));

      // Previous API-based cart update. Kept for future restore if needed.
      // if (!session?.user?.id) {
      //   setCart(updateGuestCartItem(productId, quantity, color, size));
      //   return;
      // }
      //
      // try {
      //   const updatedProductIds = cart.productIds.map((item) =>
      //     item.productId._id === productId &&
      //     item.color === color &&
      //     item.size === size
      //       ? {
      //           productId: item.productId._id,
      //           quantity,
      //           color: item.color,
      //           size: item.size,
      //         }
      //       : {
      //           productId: item.productId._id,
      //           quantity: item.quantity,
      //           color: item.color,
      //           size: item.size,
      //         }
      //   );
      //
      //   const response = await cartService.updateCart(
      //     session.user.id,
      //     updatedProductIds
      //   );
      //   if (response.success) {
      //     setCart(response.data);
      //   }
      // } catch (error) {
      //   console.error("Failed to update cart quantity:", error);
      //   throw error;
      // }
    },
    [cart]
  );

  const removeFromCart = useCallback(
    async (productId: string, color?: string, size?: string) => {
      if (!cart) return;

      setCart(removeGuestCartItem(productId, color, size));
      toast.success("Item removed from cart");

      // Previous API-based cart remove. Kept for future restore if needed.
      // if (!session?.user?.id) {
      //   setCart(removeGuestCartItem(productId, color, size));
      //   toast.success("Item removed from cart");
      //   return;
      // }
      //
      // try {
      //   const response = await cartService.removeFromCart(cart._id, productId);
      //   if (response.success) {
      //     setCart(response.data);
      //     toast.success(response.message || "Item has remove form cart");
      //   }
      // } catch (error) {
      //   console.error("Failed to remove from cart:", error);
      //   throw error;
      // }
    },
    [cart]
  );

  const clearCart = useCallback(async () => {
    setCart(clearGuestCart());

    // Previous API-based cart clear. Kept for future restore if needed.
    // if (!session?.user?.id) {
    //   setCart(clearGuestCart());
    //   return;
    // }
    //
    // try {
    //   const response = await cartService.updateCart(session.user.id, []);
    //   if (response.success) {
    //     setCart(response.data);
    //   }
    // } catch (error) {
    //   console.error("Failed to clear cart:", error);
    //   throw error;
    // }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        refreshCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
