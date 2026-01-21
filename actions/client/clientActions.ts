// auth-required APIs, browser only

import { fetcher } from "@/lib/fetcher";

// get current user
export async function getMe() {
    return await fetcher<any>("/auth/me", { method: "GET", credentials: "include" });
}

// logout
export async function logout() {
    return await fetcher("/auth/logout", { method: "POST" });
}

export async function updateMe(data: any) {
    return await fetcher("/auth/update-profile", { method: "PUT", body: JSON.stringify(data) })
}

export async function verifyOTP(data: any) {
    return await fetcher("/auth/verify-otp", { method: "POST", body: JSON.stringify(data) });
}

// upload avatar
export async function uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return await fetcher<{ url: string }>("/auth/avatar", {
        method: "POST",
        body: formData,
    });
}

// upload file
export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return await fetcher<{ url: string }>("/upload", {
        method: "POST",
        body: formData,
    });
}