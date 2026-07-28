import { orderHistory } from "@/lib/api/order";
import { useQuery } from "@tanstack/react-query";

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  imgs?: ProductImage[] | string[];
  quantity: number;
  _id: string;
  productName: string;
  price: number;
  feature?: string;
  description?: string;
  videoLink?: string;
  img?: string;
  createdAt: string;
  updatedAt?: string;
  productType: string;
  __v?: number;
  paymentStatus?: string;
  orderStatus?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: Product[];
}

export const useOrderHistory = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["orderHistory", userId],
    queryFn: () => orderHistory(userId!),
    enabled: !!userId,
  });
};
