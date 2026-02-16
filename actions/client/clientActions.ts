// auth-required APIs, browser only

import { ShippingMethod } from "@/components/buttons/ShippingMethodRadioButtons";
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

export async function addToUserCart(data: any) {
    return await fetcher("/cart/add", { method: "POST", body: JSON.stringify(data) });
}

export async function removeFromUserCart(data: { productId: number, qty?: number }) {
    return await fetcher(`/cart/remove/${data.productId}`, { method: "DELETE", body: JSON.stringify(data) });
}

export async function getUserCart() {
    return await fetcher("/cart", { method: "GET" });
}

export async function updateUserCart(data: { productId: number, qty: number }[]) {
    return await fetcher("/cart/update", { method: "POST", body: JSON.stringify(data) });
}

export async function deleteCartItemRecord(productId: number) {
    return await fetcher(`/cart/remove-record/${productId}`, { method: "DELETE" });
}

export async function checkout(router: any) {
    return await fetcher("/orders/create", {
        method: "POST",
        authRedirect: true,
        router
    });
}

export async function getUserOrders(router: any) {
    return await fetcher("/orders/my", {
        method: "GET",
        authRedirect: true,
        router
    });
}

export async function getOrderById(orderId: string, router: any) {
    return await fetcher(`/orders/${orderId}`, {
        method: "GET",
        authRedirect: true,
        router
    });
}

export async function attachOrderShippingInfo(orderId: number, addressId: number, shippingMethod: ShippingMethod, router: any) {
    return await fetcher(`/orders/attach-shipping`, {
        method: "POST",
        body: JSON.stringify({ orderId, addressId, shippingMethod }),
        authRedirect: true,
        router
    });
}

export async function getUserAddresses(router: any) {
    return await fetcher("/address", {
        method: "GET",
        authRedirect: true,
        router
    });
}
export async function createAddress(data: any, router: any) {
    return await fetcher("/address", {
        method: "POST",
        body: JSON.stringify(data),
        authRedirect: true,
        router
    });
}
export async function updateAddressById(data: any, addressId: number, router: any) {
    return await fetcher(`/address/${addressId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        authRedirect: true,
        router
    });
}
export async function deleteAddressById(addressId: number, router: any) {
    return await fetcher(`/address/${addressId}`, {
        method: "DELETE",
        authRedirect: true,
        router
    });
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