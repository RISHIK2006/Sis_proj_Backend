const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function getApiUrl() {
  return API_URL.replace(/\/$/, "");
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${getApiUrl()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      (data && data.message) ||
      (typeof data === "string" ? data : null) ||
      `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("ridesync_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeUser(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem("ridesync_user", JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("ridesync_user");
}

export function requireUser() {
  const user = getStoredUser();
  if (!user || !user.userId) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }
  return user;
}
