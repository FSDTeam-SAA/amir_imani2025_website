import axiosInstance from "./axios-instance";
import {
  CreateReviewRequest,
  CreateReviewResponse,
  ProductReviewsResponse,
  ReviewEligibilityResponse,
} from "../types/ecommerce";

export const reviewService = {
  getProductReviews: async (
    productId: string
  ): Promise<ProductReviewsResponse> => {
    const response = await axiosInstance.get<ProductReviewsResponse>(
      `/reviews/product/${productId}`
    );
    return response.data;
  },

  getReviewEligibility: async (
    productId: string
  ): Promise<ReviewEligibilityResponse> => {
    const response = await axiosInstance.get<ReviewEligibilityResponse>(
      `/reviews/eligibility/${productId}`
    );
    return response.data;
  },

  createReview: async (
    payload: CreateReviewRequest
  ): Promise<CreateReviewResponse> => {
    const response = await axiosInstance.post<CreateReviewResponse>(
      "/reviews",
      payload
    );
    return response.data;
  },
};
