// client/src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../apiConfig';
import { useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Save user + token to both state and localStorage
  const saveAuthData = (data) => {
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    setUser(userData);
    setToken(data.token);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", data.token);
  };

  // Register
  const register = async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error("Registration failed");

    const data = await res.json();
    saveAuthData(data);
  };

  // Login
  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    saveAuthData(data);
    return data;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Auto-logout if token is removed externally
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setUser(null);
      setToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
