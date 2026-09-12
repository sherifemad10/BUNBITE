import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import Loading from "../pages/Loading";
import { DataContext } from "../Hooks/DataContext";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { auth, authLoading } = useContext(DataContext);
  const location = useLocation();

  if (authLoading) return <Loading />;
  if (!auth) return <Navigate to="/login" replace state={{ from: location }} />;
  if (adminOnly && auth.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
