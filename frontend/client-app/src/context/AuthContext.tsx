import React, { createContext, useState, useContext, useEffect } from "react";
import { Tokens } from "../types/login";

interface AuthContextType {
  tokens: Tokens | null;
  login: (tokens: Tokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<Tokens | null>(
    () => JSON.parse(localStorage.getItem("tokens") || "null")
  );

  useEffect(() => {
    if (tokens) {
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      localStorage.setItem("tokens", JSON.stringify(tokens));
    } else {
      localStorage.removeItem("tokens");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }, [tokens]);

  const login = (newTokens: Tokens) => setTokens(newTokens);

  const logout = () => {
    setTokens(null);
    localStorage.clear(); // Clear all tokens on logout
  };

  return (
    <AuthContext.Provider value={{ tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};