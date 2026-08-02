import axios from "axios";
import { getSession } from "../lib/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
});

client.interceptors.request.use((config) => {
  const session = getSession();
  const token = session?.token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const resp = error.response;
    const message = resp?.data?.message || resp?.data?.error || resp?.statusText || error.message;
    const err = new Error(message || "Error de red");
    err.status = resp?.status;
    return Promise.reject(err);
  }
);

export default client;
