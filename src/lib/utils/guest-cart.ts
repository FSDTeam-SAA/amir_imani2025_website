import { Cart, CartItem, Product } from "@/lib/types/ecommerce";

const GUEST_CART_KEY = "guestCart";
const GUEST_CART_ID = "guest-cart";
const GUEST_USER_ID = "guest";

export type CartItemInputWithProduct = {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
  product?: Product;
};

const createEmptyGuestCart = (): Cart => {
  const now = new Date().toISOString();

  return {
    _id: GUEST_CART_ID,
    userId: GUEST_USER_ID,
    productIds: [],
    createdAt: now,
    updatedAt: now,
  };
};

const isBrowser = () => typeof window !== "undefined";

export const getGuestCart = (): Cart => {
  if (!isBrowser()) return createEmptyGuestCart();

  try {
    const storedCart = window.localStorage.getItem(GUEST_CART_KEY);
    if (!storedCart) return createEmptyGuestCart();

    const parsedCart = JSON.parse(storedCart) as Cart;

    return {
      ...createEmptyGuestCart(),
      ...parsedCart,
      productIds: parsedCart.productIds || [],
    };
  } catch (error) {
    console.error("Failed to read guest cart:", error);
    return createEmptyGuestCart();
  }
};

export const saveGuestCart = (cart: Cart): Cart => {
  const updatedCart = {
    ...cart,
    updatedAt: new Date().toISOString(),
  };

  if (isBrowser()) {
    window.localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("guest-cart-updated"));
  }

  return updatedCart;
};

export const addGuestCartItems = (items: CartItemInputWithProduct[]): Cart => {
  const cart = getGuestCart();
  const productIds = [...cart.productIds];

  items.forEach((item) => {
    if (!item.product) return;

    const existingItem = productIds.find(
      (cartItem) =>
        cartItem.productId._id === item.productId &&
        cartItem.color === item.color &&
        cartItem.size === item.size
    );

    const nextQuantity = (existingItem?.quantity || 0) + item.quantity;
    assertItemStock(item.product, item.color, item.size, nextQuantity);

    if (existingItem) {
      existingItem.quantity = nextQuantity;
    } else {
      productIds.push({
        productId: item.product,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      });
    }
  });

  return saveGuestCart({
    ...cart,
    productIds,
  });
};

export const updateGuestCartItem = (
  productId: string,
  quantity: number,
  color?: string,
  size?: string
): Cart => {
  const cart = getGuestCart();
  const productIds = cart.productIds
    .map((item: CartItem) => {
      if (
        item.productId._id !== productId ||
        item.color !== color ||
        item.size !== size
      ) {
        return item;
      }

      assertItemStock(item.productId, color, size, quantity);
      return { ...item, quantity };
    })
    .filter((item) => item.quantity > 0);

  return saveGuestCart({
    ...cart,
    productIds,
  });
};

export const removeGuestCartItem = (
  productId: string,
  color?: string,
  size?: string
): Cart => {
  const cart = getGuestCart();
  const productIds = cart.productIds.filter(
    (item) =>
      !(
        item.productId._id === productId &&
        item.color === color &&
        item.size === size
      )
  );

  return saveGuestCart({
    ...cart,
    productIds,
  });
};

export const clearGuestCart = (): Cart => saveGuestCart(createEmptyGuestCart());

function assertItemStock(
  product: Product,
  color: string | undefined,
  size: string | undefined,
  quantity: number,
) {
  if (product.colorSizeStocks?.length) {
    const stock = product.colorSizeStocks
      .find((entry) => entry.color === color)
      ?.sizes.find((entry) => entry.size === size);
    if (!color || !size || !stock || stock.quantity < quantity) {
      throw new Error(`The selected color and size is out of stock for ${product.productName}.`);
    }
    return;
  }

  if (!size || !product.sizeStocks?.length) return;
  const stock = product.sizeStocks.find((entry) => entry.size === size);
  if (!stock || stock.quantity < quantity) {
    throw new Error(`${size.toUpperCase()} is out of stock for ${product.productName}.`);
  }
}
