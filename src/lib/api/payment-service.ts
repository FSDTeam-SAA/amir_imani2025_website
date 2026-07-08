import axiosInstance from "./axios-instance";
import {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
} from "../types/ecommerce";

export const paymentService = {
  /**
   * Create a payment session for checkout.
   * POST /payments/stripe/create
   */
  createPayment: async (
    payload: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> => {
    const response = await axiosInstance.post<CreatePaymentResponse>(
      "/payments/stripe/create",
      payload
    );
    return response.data;
  },

  /**
   * Create a Stripe PaymentIntent for on-site card payment.
   * POST /payments/intent
   */
  createPaymentIntent: async (
    payload: CreatePaymentIntentRequest
  ): Promise<CreatePaymentIntentResponse> => {
    const response = await axiosInstance.post<CreatePaymentIntentResponse>(
      "/payments/intent",
      payload
    );
    return response.data;
  },
};
