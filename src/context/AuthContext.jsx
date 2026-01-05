import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("bloomUser")) || null);
  const [token, setToken] = useState(localStorage.getItem("bloomToken") || "");

  useEffect(() => {
    localStorage.setItem("bloomUser", JSON.stringify(user));
    localStorage.setItem("bloomToken", token);
  }, [user, token]);

  return <AuthContext.Provider value={{ user, setUser, token, setToken }}>{children}</AuthContext.Provider>;
};
