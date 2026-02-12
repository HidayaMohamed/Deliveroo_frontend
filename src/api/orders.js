import { get, post, patch } from "./fetchWrapper";

export function createOrder(orderData) {
  // Backend expects: pickup_lat, pickup_lng, pickup_address,
  // destination_lat, destination_lng, destination_address, weight_kg,
  // parcel_description, fragile, insurance_required, is_express, is_weekend
  return post("/orders/", orderData);
}

export function getMyOrders(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.page) params.set("page", filters.page);
  if (filters.limit) params.set("limit", filters.limit);

  const query = params.toString();
  return get(`/orders/${query ? `?${query}` : ""}`);
}

export function getOrderById(orderId) {
  return get(`/orders/${orderId}`);
}

export function updateDestination(orderId, addresses) {
  // Backend expects: destination_lat, destination_lng, destination_address
  return patch(`/orders/${orderId}/destination`, addresses);
}

export function cancelOrder(orderId) {
  return post(`/orders/${orderId}/cancel`);
}

export function getOrderTracking(orderId) {
  return get(`/orders/${orderId}/tracking`);
}

export function getPriceEstimate(estimateData) {
  // Backend expects: pickup_lat, pickup_lng, destination_lat, destination_lng,
  // weight_kg, fragile?, insurance_required?, is_express?, is_weekend?
  return post("/orders/estimate", estimateData);
}
