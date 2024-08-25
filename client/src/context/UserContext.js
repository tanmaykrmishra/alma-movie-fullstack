// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
          const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const response = await axios.get("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setUser(response.data.user);
          setToken(storedToken); // Store token in state
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token); // Store token in state
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null); // Clear token from state
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
