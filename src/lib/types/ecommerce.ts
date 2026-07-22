export interface Product {
  _id: string;
  productName: string;
  price: number;
  ca_price?: number;
  merchandiseBadge?:
    | "none"
    | "new_arrival"
    | "most_popular"
    | "best_seller"
    | "limited_edition";
  productType?: "card" | "marchandice";
  category?:
    | "ALL"
    | "APPAREL"
    | "ACCESSORIES"
    | "PRINTS & POSTERS"
    | "STATIONERY"
    | "HOME & DECOR"
    | "COLLECTIBLES"
    | string;
  feature: string;
  description: string;
  gameSubtitle:string;
  addHome?: boolean;
  players?: string
  cards?:string
  age?:string
  inTheBox?: {
    title?: string;
    subtitle?: string;
    boxnumbers?: {
      number?: string;
      title?: string;
      subtitle?: string;
    }[];
  };
  minutes?:string
  videoLink?: string;
  homeImage?: string;
  img?: string; // Keep for backward compatibility or if API still returns it as primary
  imgs?: string[];
  colors?: string[]; // Keep for compatibility
  color?: string[];
  sizes?: string[]; // Keep for compatibility
  size?: string[];
  quantity?: number;
  ruleTitle?: string;
  rulls?: ProductRule[];
  boardanatomyTitle?: string;
  boardAnatomyDiscription?: string;
  passandplayTittle?: string;
  passandplay?: ProductPassAndPlayItem[];
  garmentTitle?: string;
  garmentsMATERIAL?: string;
  garmentWEIGHT?: string;
  garmentFit?: string;
  garmentPRINT?: string;
  garmentMADeIN?: string;
  productFeatures?:string[]
  garmentCARE?: string;
}

export interface ProductRule {
  num?: string;
  title?: string;
  description?: string;
}

export interface ProductPassAndPlayItem {
  message?: string;
  name?: string;
  type?: string;
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

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  review: string;
  status: "pending" | "published" | "rejected";
  userName: string;
  userEmail: string;
  productName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductReviewSummary {
  totalReviews: number;
  averageRating: number;
  ratingBreakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface ProductReviewsPayload {
  reviews: ProductReview[];
  summary: ProductReviewSummary;
}

export interface ProductReviewsResponse {
  success: boolean;
  message: string;
  data: ProductReviewsPayload;
}

export interface ReviewEligibility {
  hasPurchased: boolean;
  hasReviewed: boolean;
  canReview: boolean;
  review: ProductReview | null;
}

export interface ReviewEligibilityResponse {
  success: boolean;
  message: string;
  data: ReviewEligibility;
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  review: string;
  userName?: string;
  userEmail?: string;
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data: ProductReview;
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
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  items?: CartItemInput[];
  shippingAddress: ShippingAddress;
  currency?: "usd" | "cad";
  couponCode?: string;
}

export interface PaymentIntentData {
  clientSecret: string;
  paymentId: string;
  stripeMode: "live" | "test";
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
