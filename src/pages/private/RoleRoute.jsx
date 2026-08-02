import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function RoleRoute({ allowedRoles = [] }) {
  const { authenticated, user } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/admin/no-autorizado" replace />;
  }

  return <Outlet />;
}
