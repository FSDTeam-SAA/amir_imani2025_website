export interface Product {
  _id: string;
  productName: string;
  price: number;
  productType?: "card" | "marchandice";
  feature: string;
  description: string;
  videoLink?: string;
  img?: string; // Keep for backward compatibility or if API still returns it as primary
  imgs?: string[];
  colors?: string[]; // Keep for compatibility
  color?: string[];
  sizes?: string[]; // Keep for compatibility
  size?: string[];
  quantity?: number;
}

export interface CartItem {
  productId: Product;
  quantity: number;
  color?: string;
  size?: string;
}

export interface CartItemInput {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Cart {
  _id: string;
  userId: string;
  productIds: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}

export interface SingleProductResponse {
  success: boolean;
  data: Product;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: Cart;
}

export interface PaymentData {
  checkoutUrl: string;
  paymentId: string;
}

export interface CreatePaymentRequest {
  userId: string;
  totalAmount: number;
  itemIds: string[];
}

export interface CreatePaymentResponse {
  success: boolean;
  message: string;
  data: PaymentData;
}

export interface ShippingAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface CreatePaymentIntentRequest {
  userId: string;
  shippingAddress: ShippingAddress;
  currency?: "usd" | "cad";
  couponCode?: string;
}

export interface PaymentIntentData {
  clientSecret: string;
  paymentId: string;
  coupon?: {
    couponId: string;
    discountAmount: number;
  };
}

export interface CreatePaymentIntentResponse {
  success: boolean;
  message: string;
  data: PaymentIntentData;
}
