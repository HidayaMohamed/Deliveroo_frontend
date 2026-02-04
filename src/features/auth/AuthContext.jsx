import { createContext, useEffect, useState } from "react";
import api from "../../api/axios";
import { setToken, getToken, removeToken } from "../../utils/token";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.access_token);
    setUser(res.data.user);
    return res.data.user; 
  };

  const register = async (data) => {
    try {
      const res = await api.post("/api/auth/register", data);
      setToken(res.data.access_token);
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data); // log backend error
      throw err;
    }
  };


  const logout = () => {
    removeToken();
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => removeToken())
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
