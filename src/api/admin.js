import { get, patch } from "./fetchWrapper";

export function getAdminOrders(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.courier_id) params.set("courier_id", filters.courier_id);
  if (filters.date_from) params.set("date_from", filters.date_from);
  if (filters.date_to) params.set("date_to", filters.date_to);
  if (filters.page) params.set("page", filters.page);
  if (filters.limit) params.set("limit", filters.limit);
  const query = params.toString();
  return get(`/admin/orders${query ? `?${query}` : ""}`);
}

export function getAdminStats(period = "all") {
  return get(`/admin/stats?period=${period}`);
}

export function getAdminUsers(filters = {}) {
  const params = new URLSearchParams();
  if (filters.role) params.set("role", filters.role);
  if (filters.is_active !== undefined) params.set("is_active", filters.is_active);
  if (filters.page) params.set("page", filters.page);
  if (filters.limit) params.set("limit", filters.limit);
  const query = params.toString();
  return get(`/admin/users${query ? `?${query}` : ""}`);
}

export function assignCourier(orderId, courierId) {
  return patch(`/admin/orders/${orderId}/assign`, { courier_id: courierId });
}

export function updateOrderStatus(orderId, status, notes) {
  return patch(`/admin/orders/${orderId}/status`, { status, notes });
}
