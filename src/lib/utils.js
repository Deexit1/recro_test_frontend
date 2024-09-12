import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

