// public APIs, server actions

import { fetcher } from "@/lib/fetcher";

export async function checkPhone(phoneNumber: string) {
  return await fetcher<{ exists: boolean }>("/auth/check", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
  });
}

export async function requestOtp(phoneNumber: string) {
  return await fetcher<{ message: string; status: number }>("/auth/request-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
  });
}

export async function fetchProducts(options?: {
  page?: number, limit?: number, sort?: string, categoryIds?: number[], isAvailableOnly?: boolean;
}) {
  // return await fetcher("/products", { method: "GET" });
  const params = new URLSearchParams();

  Object.entries(options ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  });

  return fetcher(`/products?${params.toString()}`, {
    method: 'GET',
  });
}

export async function fetchCategories() {
  return fetcher("/categories", { method: "GET" })
}