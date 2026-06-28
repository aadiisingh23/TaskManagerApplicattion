import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    api
      .get("/auth/me")
      .then((response) => {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  const saveSession = (authData) => {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    setUser(authData.user);
  };

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    saveSession(response.data);
    return response.data.user;
  };

  const signup = async (formData) => {
    const response = await api.post("/auth/signup", formData);
    saveSession(response.data);
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), isCheckingAuth, login, signup, logout }),
    [user, isCheckingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
