import axiosInstance from "./axios-instance";

export interface FortuneRevealResponse {
  success: boolean;
  message: string;
  data: {
    fortune: string;
    symbols: string[];
  };
}

export interface FortuneHistoryItem {
  _id: string;
  userId: string;
  symbols: string[];
  fortune: string;
  createdAt: string;
  updatedAt: string;
}

export interface FortuneHistoryResponse {
  success: boolean;
  message: string;
  data: FortuneHistoryItem[];
}

export const fortuneTellingService = {
  reveal: async (symbols: string[]) => {
    const response = await axiosInstance.post<FortuneRevealResponse>(
      "/fortune-telling/reveal",
      { symbols }
    );

    return response.data;
  },

  getMyHistory: async () => {
    const response = await axiosInstance.get<FortuneHistoryResponse>(
      "/fortune-telling/my-history"
    );

    return response.data;
  },
};
