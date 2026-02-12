const API_BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getMe = async () => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
};

export const refreshToken = async () => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
};
