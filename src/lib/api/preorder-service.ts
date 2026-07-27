import axiosInstance from "./axios-instance";

const storageKey = (productId: string) => `preordered-product:${productId}`;

export const hasPreorderedProduct = (productId: string) =>
  typeof window !== "undefined" && sessionStorage.getItem(storageKey(productId)) === "true";

export const rememberPreorderedProduct = (productId: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(storageKey(productId), "true");
  }
};

export const preorderService = {
  create: async (productId: string) => {
    const response = await axiosInstance.post<{
      success: boolean;
      message: string;
      data: { _id: string };
    }>("/preorders", { productId });

    return response.data;
  },
};
