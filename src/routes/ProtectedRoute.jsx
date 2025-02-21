import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const userId = useSelector((state) => state.auth.userId);
  return userId ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
