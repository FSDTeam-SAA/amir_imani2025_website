import axiosInstance from "./axios-instance";

export type CreateSubscriberPayload = {
  email: string;
  subscriberName?: string;
  game?: string;
  gameCategory?: string;
  releaseDate?: string;
};

export type SubscriberApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function subscribeToNewsletter(payload: CreateSubscriberPayload) {
  const response = await axiosInstance.post<SubscriberApiResponse<{ email: string }>>(
    "/subscribers/newsletter",
    payload
  );

  return response.data;
}
