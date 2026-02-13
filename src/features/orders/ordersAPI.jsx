import api from "../../api/axios";

// 1. GET USER PROFILE
export const getUserProfile = () => api.get("/auth/me");

// 2. CREATE ORDER
export const createOrder = (data) => api.post("/orders", data);

// 3. MPESA STK PUSH
export const initiateMpesa = (data) => api.post("/payments/stk-push", data);

// 4. GET ALL ORDERS
export const getMyOrders = () => api.get("/orders");

// 5. GET SINGLE ORDER
export const getOrderById = (id) => api.get(`/orders/${id}`);

// 6. CANCEL ORDER
export const cancelOrder = (id) => api.delete(`/orders/${id}`);

// 7. EDIT DESTINATION
export const updateDestination = (id, data) =>
  api.patch(`/orders/${id}`, data);
