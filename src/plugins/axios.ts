import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // APIのベースURLを指定
  timeout: 5000, // タイムアウト時間（ミリ秒）
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;