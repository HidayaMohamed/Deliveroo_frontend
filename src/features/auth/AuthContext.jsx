import { useEffect, useState } from "react";
import { get, post } from "../../api/fetchWrapper";
import { setToken, getToken, removeToken } from "../../utils/token";
import { AuthContext } from "./AuthContextBase";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => !!getToken());

  const login = async (email, password) => {
    const data = await post("/auth/login", { email, password });
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  };

  const register = async (formData) => {
    const data = await post("/auth/register", formData);
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    get("/auth/me")
      .then((data) => setUser(data))
      .catch(() => removeToken())
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
