import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, getMe } from "../../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => !!getToken());

  const saveSession = ({ user, access_token, refresh_token }) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    setUser(user);
  };

  const login = async (data) => {
    const res = await loginUser(data); // data = { email, password }
    saveSession(res.data);
    return res.data.user;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    saveSession(res.data);
    return res.data.user;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getMe();
        setUser(res.data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
