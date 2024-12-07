import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Controla la carga

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setLoading(false); // No necesitamos hacer más peticiones si ya hay un usuario en localStorage
    } else {
      // Si no hay usuario en localStorage, verificamos la autenticación con el servidor
      const verifyAuth = async () => {
        try {
          const response = await axios.get("/profile");
          setIsAuthenticated(true);
          setUser(response.data);
          // Guardamos el usuario en localStorage para persistencia
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      verifyAuth();
    }
  }, []);

  // Registro de usuario
  const register = async ({ name, email, password, role }) => {
    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
        role,
      });

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data; // Devuelve los datos del usuario registrado
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al registrar el usuario."
      );
    }
  };

  // Inicio de sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post("/login", { email, password });
      setIsAuthenticated(true);
      setUser(response.data);
      
      // Guardamos el usuario en localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data; // Retorna los datos del usuario
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  };

  // Cierre de sesión
  const logout = async () => {
    try {
      await axios.post("/logout");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = "/login"; // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Retornar solo cuando el estado de carga haya terminado
  if (loading) {
    return <div>Cargando...</div>;  // Aquí puedes poner un spinner o cualquier otro componente de carga
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
