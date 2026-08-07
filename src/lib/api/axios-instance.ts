/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createLoginUrl } from "@/lib/auth/redirect";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const shouldIgnore401 = (error.config as any)?._ignore401;
    if (error.response?.status === 401 && !shouldIgnore401) {
      localStorage.removeItem("authToken");
      window.location.href = createLoginUrl(
        `${window.location.pathname}${window.location.search}${window.location.hash}`,
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
