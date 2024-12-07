import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />; // O redirige a una página de acceso denegado
  }

  return children;
};

export default RoleBasedRoute;
