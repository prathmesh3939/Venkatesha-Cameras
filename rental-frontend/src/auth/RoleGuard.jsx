import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleGuard = ({ allowedRoles }) => {
  const { role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RoleGuard;
