import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { cartService } from "@/lib/api/cart-service";
import { Product } from "@/lib/types/ecommerce";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  addGuestCartItems,
  clearGuestCart,
  getGuestCart,
  removeGuestCartItem,
  updateGuestCartItem,
} from "@/lib/utils/guest-cart";

// Query keys
export const cartKeys = {
  all: ["cart"] as const,
  user: (userId: string) => [...cartKeys.all, userId] as const,
};

/**
 * Hook to fetch the current user's cart using TanStack Query.
 */
export const useCartQuery = () => {
  // const { data: session } = useSession();
  // const userId = session?.user?.id;
  const queryKey = cartKeys.user("guest");

  return useQuery({
    queryKey,
    queryFn: async () => {
      // Previous API-based cart fetch. Kept for future restore if needed.
      // if (!userId) return getGuestCart();
      // const response = await cartService.getCart(userId);
      // return response.success ? response.data : null;

      return getGuestCart();
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

/**
 * Hook to add items to cart.
 */
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession();

  return useMutation({
    mutationFn: async (
      items: {
        productId: string;
        quantity: number;
        color?: string;
        size?: string;
        product?: Product;
      }[]
    ) => {
      // Previous API-based cart add. Kept for future restore if needed.
      // if (!session?.user?.id) {
      //   return {
      //     success: true,
      //     message: "Item added to cart",
      //     data: addGuestCartItems(items),
      //   };
      // }
      //
      // return cartService.addToCart(session.user.id, items);

      return {
        success: true,
        message: "Item added to cart",
        data: addGuestCartItems(items),
      };
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.setQueryData(cartKeys.user("guest"), response.data);
        toast.success("Item added to cart");
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Failed to add item to cart"
      );
    },
  });
};

/**
 * Hook to update cart quantity.
 */
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
      color,
      size,
    }: {
      productId: string;
      quantity: number;
      color?: string;
      size?: string;
    }) => {
      // Previous API-based cart update. Kept for future restore if needed.
      // if (!session?.user?.id) {
      //   return {
      //     success: true,
      //     message: "Cart updated",
      //     data: updateGuestCartItem(productId, quantity, color, size),
      //   };
      // }
      //
      // const currentCart = queryClient.getQueryData<Cart>(
      //   cartKeys.user(session.user.id)
      // );
      // if (!currentCart) throw new Error("Cart not found");
      //
      // const updatedProductIds = currentCart.productIds.map((item: CartItem) =>
      //   item.productId._id === productId &&
      //   item.color === color &&
      //   item.size === size
      //     ? {
      //         productId: item.productId._id,
      //         quantity,
      //         color: item.color,
      //         size: item.size,
      //       }
      //     : {
      //         productId: item.productId._id,
      //         quantity: item.quantity,
      //         color: item.color,
      //         size: item.size,
      //       }
      // );
      //
      // return cartService.updateCart(session.user.id, updatedProductIds);

      return {
        success: true,
        message: "Cart updated",
        data: updateGuestCartItem(productId, quantity, color, size),
      };
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.setQueryData(cartKeys.user("guest"), response.data);
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Failed to update cart quantity:", error);
      // Refetch to ensure UI is in sync
      queryClient.invalidateQueries({
        queryKey: cartKeys.user("guest"),
      });
    },
  });
};

/**
 * Hook to remove item from cart.
 */
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      cartId,
      productId,
      color,
      size,
    }: {
      cartId: string;
      productId: string;
      color?: string;
      size?: string;
    }) => {
      // Previous API-based cart remove. Kept for future restore if needed.
      // if (!session?.user?.id) {
      //   return {
      //     success: true,
      //     message: "Item removed from cart",
      //     data: removeGuestCartItem(productId, color, size),
      //   };
      // }
      //
      // return cartService.removeFromCart(cartId, productId);

      void cartId;

      return {
        success: true,
        message: "Item removed from cart",
        data: removeGuestCartItem(productId, color, size),
      };
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.setQueryData(cartKeys.user("guest"), response.data);
        toast.success(response.message || "Item removed from cart");
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to remove item");
    },
  });
};

/**
 * Hook to clear the entire cart.
 */
export const useClearCart = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession();

  return useMutation({
    mutationFn: async () => {
      // Previous API-based cart clear. Kept for future restore if needed.
      // if (!session?.user?.id) {
      //   return {
      //     success: true,
      //     message: "Cart cleared",
      //     data: clearGuestCart(),
      //   };
      // }
      //
      // return cartService.updateCart(session.user.id, []);

      return {
        success: true,
        message: "Cart cleared",
        data: clearGuestCart(),
      };
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.setQueryData(cartKeys.user("guest"), response.data);
        toast.success("Cart cleared");
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    },
  });
};
