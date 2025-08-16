import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const user = useSelector((store) => store.auth.user); // check user instead of token
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRouter;
