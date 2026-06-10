const DEFAULT_API_BASE_URL = "http://localhost:5002";

function normalizeApiBaseUrl(value: unknown): string {
  const raw = typeof value === "string" ? value.trim() : "";

  if (!raw) return DEFAULT_API_BASE_URL;

  if (/^https?:\/\//i.test(raw)) {
    return raw.replace(/\/+$/, "");
  }

  const withoutSlashes = raw.replace(/^\/+/, "").replace(/\/+$/, "");

  if (/^:?5002$/.test(withoutSlashes)) return DEFAULT_API_BASE_URL;
  if (/^:?5003$/.test(withoutSlashes)) return "https://localhost:5003";
  if (/^localhost:\d+$/i.test(withoutSlashes)) return `http://${withoutSlashes}`;

  return DEFAULT_API_BASE_URL;
}

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

export function apiUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export function getAuthToken(): string | null {
  const token = localStorage.getItem("auth_token");
  if (!token) return null;

  try {
    const parsed = JSON.parse(token);
    if (typeof parsed === "string") return parsed;
    if (parsed?.token && typeof parsed.token === "string") return parsed.token;
    if (parsed?.accessToken && typeof parsed.accessToken === "string") return parsed.accessToken;
  } catch {
    // Stored token is already a plain JWT string.
  }

  return token;
}

export function getJsonHeaders(authenticated = false): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authenticated) {
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function readApiError(response: Response, fallback: string): Promise<string> {
  try {
    const payload = await response.json();
    return payload?.message || payload?.error || JSON.stringify(payload) || fallback;
  } catch {
    const text = await response.text();
    return text || fallback;
  }
}

export function extractToken(payload: any): string | null {
  const token =
    payload?.data?.token ||
    payload?.data?.accessToken ||
    payload?.token ||
    payload?.accessToken ||
    (typeof payload?.data === "string" ? payload.data : null) ||
    (typeof payload === "string" ? payload : null);

  return typeof token === "string" && token.trim() ? token : null;
}
