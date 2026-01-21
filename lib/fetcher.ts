
// src/lib/fetcher.ts
const API_BASE = process.env.API_URL || "http://localhost:9000/api";

export async function fetcher<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const isFormData = options.body instanceof FormData;

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            // Only set JSON header when body is *not* FormData
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(options.headers || {}),
        },
    });

    if (res.status === 401 && window.location.href.includes("/profile")) {
        // const logoutRes = await fetch(`${API_BASE}/auth/logout`, {
        //     method: "POST"
        // })
    }

    if (!res.ok) {
        const text = await res.text();
        throw JSON.parse(text)
    }

    try {
        return (await res.json()) as T;
    } catch {
        return {} as T; // for APIs that return no body
    }
}
