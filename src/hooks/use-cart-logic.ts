import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Cart, CartItem } from "@/lib/types/ecommerce";
import { debounce } from "@/lib/utils/debounce";
import { getProductPrice } from "@/lib/utils/product-price";

interface UseCartLogicOptions {
  cart: Cart | null;
  onUpdateQuantity: (params: {
    productId: string;
    quantity: number;
    color?: string;
    size?: string;
  }) => void;
  onRemoveFromCart: (params: {
    cartId: string;
    productId: string;
    color?: string;
    size?: string;
  }) => void;
}

/**
 * Generates a unique key for a cart item based on product ID, color, and size.
 */
export const getCartItemKey = (
  productId: string,
  color?: string,
  size?: string
): string => {
  return `${productId}-${color || ""}-${size || ""}`;
};

/**
 * Hook that encapsulates cart page UI logic including:
 * - Pending quantities for optimistic updates
 * - Debounced quantity updates
 * - Subtotal calculation
 */
export const useCartLogic = ({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
}: UseCartLogicOptions) => {
  // Pending quantities for optimistic UI updates
  const [pendingQuantities, setPendingQuantities] = useState<
    Record<string, number>
  >({});

  // Compute quantities from cart data, with pending optimistic updates overlaid
  const localQuantities = useMemo(() => {
    const quantities: Record<string, number> = {};
    if (cart?.productIds) {
      cart.productIds.forEach((item: CartItem) => {
        const key = getCartItemKey(item?.productId?._id, item.color, item.size);
        quantities[key] = item.quantity;
      });
    }
    // Overlay any pending optimistic updates
    return { ...quantities, ...pendingQuantities };
  }, [cart, pendingQuantities]);

  // Debounced update ref
  const debouncedUpdateRef =
    useRef<
      (
        productId: string,
        quantity: number,
        color?: string,
        size?: string
      ) => void
    >(null);

  useEffect(() => {
    debouncedUpdateRef.current = debounce(
      async (
        productId: string,
        quantity: number,
        color?: string,
        size?: string
      ) => {
        const key = getCartItemKey(productId, color, size);
        try {
          onUpdateQuantity({ productId, quantity, color, size });
          // Clear the pending quantity once mutation is triggered
          setPendingQuantities((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
          });
        } catch (error) {
          console.error("Failed to update quantity:", error);
          // Revert optimistic update on error
          setPendingQuantities((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
          });
        }
      },
      500
    );
  }, [onUpdateQuantity]);

  // Handle quantity change with optimistic update
  const handleQuantityChange = useCallback(
    (productId: string, newQuantity: number, color?: string, size?: string) => {
      const key = getCartItemKey(productId, color, size);
      // Optimistic UI update - immediate feedback
      setPendingQuantities((prev) => ({
        ...prev,
        [key]: newQuantity,
      }));

      // Debounced API call
      debouncedUpdateRef.current?.(productId, newQuantity, color, size);
    },
    []
  );

  // Handle remove item
  const handleRemove = useCallback(
    async (productId: string, color?: string, size?: string) => {
      const cartId = cart?._id;
      if (!cartId) return;
      try {
        onRemoveFromCart({
          cartId,
          productId,
          color,
          size,
        });
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    },
    [cart, onRemoveFromCart]
  );

  // Cart items
  const items = useMemo(() => cart?.productIds || [], [cart?.productIds]);

  // Calculate subtotal using local quantities for immediate feedback
  const subtotal = useMemo(() => {
    return items.reduce((acc, item: CartItem) => {
      const key = getCartItemKey(item?.productId?._id, item.color, item.size);
      const quantity = localQuantities[key] ?? item.quantity;
      const { amount: price } = getProductPrice(item?.productId);
      return acc + price * quantity;
    }, 0);
  }, [items, localQuantities]);

  return {
    items,
    localQuantities,
    subtotal,
    handleQuantityChange,
    handleRemove,
    getCartItemKey,
  };
};
