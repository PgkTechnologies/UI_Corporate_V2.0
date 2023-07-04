import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return children;
}

export default RequireAuth;
