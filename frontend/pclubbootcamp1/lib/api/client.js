export async function apiRequest(endpoint, options = {}) {
  const baseUrl = process.env.backend_url || "http://localhost:4000";

  const res = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API error: ${res.status} ${error}`);
  }

  return res.json();
}
