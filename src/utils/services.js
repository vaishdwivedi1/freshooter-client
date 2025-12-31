import axios from "axios";

export const apiUrl = import.meta.env.VITE_API_URL;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// Request interceptor → attach token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle 403 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const services = {
  get: (url, params = {}) => axiosInstance.get(url, { params }),

  post: (url, data) => axiosInstance.post(url, data),

  put: (url, data) => axiosInstance.put(url, data),

  delete: (url) => axiosInstance.delete(url),
};
