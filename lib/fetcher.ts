
// // src/lib/fetcher.ts
// const API_BASE = process.env.API_URL || "http://localhost:9000/api";

import { routes } from "./routeNames";

// export async function fetcher<T>(
//     endpoint: string,
//     options: RequestInit = {}
// ): Promise<T> {
//     const isFormData = options.body instanceof FormData;

//     const res = await fetch(`${API_BASE}${endpoint}`, {
//         ...options,
//         credentials: "include",
//         headers: {
//             // Only set JSON header when body is *not* FormData
//             ...(isFormData ? {} : { "Content-Type": "application/json" }),
//             ...(options.headers || {}),
//         },
//     });

//     if (res.status === 401 && window.location.href.includes("/profile")) {
//         // const logoutRes = await fetch(`${API_BASE}/auth/logout`, {
//         //     method: "POST"
//         // })
//     }

//     if (!res.ok) {
//         const text = await res.text();
//         throw JSON.parse(text)
//     }

//     try {
//         return (await res.json()) as T;
//     } catch {
//         return {} as T; // for APIs that return no body
//     }
// }

// src/lib/fetcher.ts
const API_BASE = process.env.API_URL || "https://api.tahrir124.ir/api";

interface FetcherOptions extends RequestInit {
    authRedirect?: boolean; // NEW
    router?: any;           // optional router
}

export async function fetcher<T>(
    endpoint: string,
    options: FetcherOptions = {}
): Promise<T> {

    const { authRedirect = false, router, ...fetchOptions } = options;
    const isFormData = fetchOptions.body instanceof FormData;

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...fetchOptions,
        credentials: "include",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(fetchOptions.headers || {}),
        },
    });

    // redirect ONLY if caller wants
    if (res.status === 401 && authRedirect && router) {
        router.push(`${routes.LOGIN}?redirect=${encodeURIComponent(window.location.pathname)}`);
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const text = await res.text();
        throw JSON.parse(text);
    }

    try {
        return (await res.json()) as T;
    } catch {
        return {} as T;
    }
}

