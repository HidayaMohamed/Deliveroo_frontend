import { getToken, removeToken } from "../utils/token";

const API_URL = import.meta.env.VITE_API_URL || "/api";

async function fetchWrapper(endpoint, options = {}) {
  const token = getToken();

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, config);
  } catch {
    throw new Error("Connection problem. Check your internet");
  }

  if (!response.ok) {
    if (response.status === 401 && getToken()) {
      removeToken();
      window.location.href = "/login";
      throw new Error("Session expired. Please login again");
    }

    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorData.msg;
    } catch {
      // response wasn't JSON
    }

    if (errorMessage) {
      throw new Error(errorMessage);
    }

    const statusMessages = {
      400: "Please check your information and try again",
      403: "You don't have permission to do that",
      404: "Order not found",
      409: "This action conflicts with the current state",
      422: "Please check your information and try again",
      500: "Something went wrong. Please try again",
    };

    throw new Error(statusMessages[response.status] || `Request failed (${response.status})`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export function get(endpoint) {
  return fetchWrapper(endpoint, { method: "GET" });
}

export function post(endpoint, data) {
  return fetchWrapper(endpoint, { method: "POST", body: data });
}

export function patch(endpoint, data) {
  return fetchWrapper(endpoint, { method: "PATCH", body: data });
}

export function del(endpoint) {
  return fetchWrapper(endpoint, { method: "DELETE" });
}

export default fetchWrapper;
