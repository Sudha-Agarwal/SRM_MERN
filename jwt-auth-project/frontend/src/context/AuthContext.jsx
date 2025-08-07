import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import BASE_URL  from '../apiConfig';
//const BASE_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

  // Configure axios to send tokens
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle 401 errors
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser({ email: decoded.email, id: decoded.id });
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }
        setUser({ email: decoded.email, id: decoded.id });
      } catch (err) {
        console.error('Token validation failed:', err);
        logout();
      }
    }
   
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;