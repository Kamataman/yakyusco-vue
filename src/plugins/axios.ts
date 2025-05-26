import axios from "axios";
import { userIdToken } from "@/auth";

const axiosConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL, // APIのベースURLを指定
  timeout: 30000, // タイムアウト時間（ミリ秒）
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosInstance = axios.create(axiosConfig);

export const authAxiosInstance = axios.create(axiosConfig);

// リクエスト前にトークンを付けるインターセプター
authAxiosInstance.interceptors.request.use(async (config) => {
  const token = userIdToken.value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
