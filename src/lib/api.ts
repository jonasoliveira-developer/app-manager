import axios from "axios"

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem("_authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
