import { get, patch } from "./fetchWrapper";

export function getCourierOrders(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.page) params.set("page", filters.page);
  if (filters.limit) params.set("limit", filters.limit);
  const query = params.toString();
  return get(`/courier/orders${query ? `?${query}` : ""}`);
}

export function getCourierOrderById(orderId) {
  return get(`/courier/orders/${orderId}`);
}

export function updateOrderStatus(orderId, status, notes) {
  return patch(`/courier/orders/${orderId}/status`, { status, notes });
}

export function updateCourierLocation(orderId, latitude, longitude, description) {
  return patch(`/courier/orders/${orderId}/location`, {
    latitude,
    longitude,
    location_description: description,
  });
}

export function getCourierStats() {
  return get("/courier/stats");
}
