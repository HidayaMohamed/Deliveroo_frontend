import api from "../../services/api";

export const createOrder = (data) =>
  api.post("/orders", data);

export const getMyOrders = () =>
  api.get("/orders");

export const getOrderById = (id) =>
  api.get(`/orders/${id}`);

export const cancelOrder = (id) =>
  api.delete(`/orders/${id}`);

export const updateDestination = (id, data) =>
  api.patch(`/orders/${id}`, data);
