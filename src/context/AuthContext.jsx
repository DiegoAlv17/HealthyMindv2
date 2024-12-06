// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = Cookies.get("authToken");
    const storedAdminName = Cookies.get("adminName");
    if (token && storedAdminName) {
      setIsAuthenticated(true);
      setAdminName(storedAdminName);
    }
  }, []);

  const login = (token, name) => {
    Cookies.set("authToken", token, { expires: 7 });
    Cookies.set("adminName", name, { expires: 7 });
    setIsAuthenticated(true);
    setAdminName(name);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout'); 
      Cookies.remove("adminName");
      setIsAuthenticated(false);
      setAdminName("");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, adminName }}>
      {children}
    </AuthContext.Provider>
  );
};