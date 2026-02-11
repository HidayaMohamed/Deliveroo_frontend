import api from "../../services/api";

// 1. GET USER PROFILE
export const getUserProfile = () => api.get("/auth/me");

// 2. CREATE ORDER
export const createOrder = (data) => api.post("/api/orders", data);

// 3. MPESA STK PUSH
export const initiateMpesa = (data) => api.post("/api/payments/stk-push", data);

// 4. GET ALL ORDERS
export const getMyOrders = () => api.get("/api/orders");

// 5. GET SINGLE ORDER
export const getOrderById = (id) => api.get(`/api/orders/${id}`);

// 6. CANCEL ORDER
export const cancelOrder = (id) => api.delete(`/api/orders/${id}`);

// 7. EDIT DESTINATION
export const updateDestination = (id, data) =>
  api.patch(`/api/orders/${id}`, data);
