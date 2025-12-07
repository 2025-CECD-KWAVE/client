export async function apiFetch(url, options = {}) {
    const lang = localStorage.getItem("Accepted-Language") || "KO";

    const headers = {
        "Accept-Language": lang,
        ...(options.headers || {})
    };

    return fetch(url, { ...options, headers });
}