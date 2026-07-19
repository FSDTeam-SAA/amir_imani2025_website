import axiosInstance from "./axios-instance";
import { ProductsResponse, SingleProductResponse } from "../types/ecommerce";
// import { get } from "http";

export const productService = {
  /**
   * Fetch all available products for shop listing.
   */
  getProducts: async (): Promise<ProductsResponse> => {
    const response = await axiosInstance.get<ProductsResponse>("/products");
    return response.data;
  },
  getmarchandice: async (): Promise<ProductsResponse> => {
    const response = await axiosInstance.get<ProductsResponse>(
      `/products?type=marchandice`
    );
    const data = response.data;
    // ensure backward compatibility if img is used
    if (data.success && data.data) {
      data.data = data.data.map((p) => ({
        ...p,
        img: p.imgs && p.imgs.length > 0 ? p.imgs[0] : p.img,
      }));
    }
    return data;
  },

  getMerchandiseByCategory: async (
    category?: string
  ): Promise<ProductsResponse> => {
    const query = category && category !== "ALL" ? `&category=${encodeURIComponent(category)}` : "";
    const response = await axiosInstance.get<ProductsResponse>(
      `/products?type=marchandice${query}`
    );
    const data = response.data;

    if (data.success && data.data) {
      data.data = data.data.map((p) => ({
        ...p,
        img: p.imgs && p.imgs.length > 0 ? p.imgs[0] : p.img,
      }));
    }

    return data;
  },

  getCards: async (): Promise<ProductsResponse> => {
    const response = await axiosInstance.get<ProductsResponse>(
      `/products?type=card`
    );
    const data = response.data;
    // ensure backward compatibility if img is used
    if (data.success && data.data) {
      data.data = data.data.map((p) => ({
        ...p,
        img: p.imgs && p.imgs.length > 0 ? p.imgs[0] : p.img,
      }));
    }
    return data;
  },

  /**
   * Fetch full product details for product detail page.
   */
  getProductById: async (productId: string): Promise<SingleProductResponse> => {
    const response = await axiosInstance.get<SingleProductResponse>(
      `/products/${productId}`
    );
    return response.data;
  },
  //   getMerchandiseById: async (productId: string): Promise<SingleProductResponse> => {
  //   const response = await axiosInstance.get<SingleProductResponse>(`/products/${productId}`);
  //   return response.data;
  // },
 
    getSearchProduct: async (search: string): Promise<ProductsResponse> => {
    const response = await axiosInstance.get<ProductsResponse>(`/products?search=${search}`);
    return response.data;
  },
    deleteProduct: async (productId: string): Promise<ProductsResponse> => {
    const response = await axiosInstance.get<ProductsResponse>(`/products/${productId}`);
    return response.data;
  },
};
