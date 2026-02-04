import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Update to match your Flask port
  withCredentials: true,
});

export default api;