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