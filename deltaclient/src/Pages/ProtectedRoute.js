// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { NavAccessContext } from "./NavAccessContext";

const ProtectedRoute = ({ children }) => {
  const { allowedRoute } = useContext(NavAccessContext);
  const location = useLocation();

  return location.pathname === allowedRoute ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
