import axiosInstance from "./axios-instance";

export type ApplyCouponPayload = {
  code: string;
  cartTotal: number;
};

export type ApplyCouponResponse = {
  success: boolean;
  message: string;
  data?: {
    discountAmount: number;
  };
};

export const couponService = {
  applyCoupon: async (
    payload: ApplyCouponPayload
  ): Promise<ApplyCouponResponse> => {
    const response = await axiosInstance.post<ApplyCouponResponse>(
      "/coupons/apply",
      payload
    );

    return response.data;
  },
};

