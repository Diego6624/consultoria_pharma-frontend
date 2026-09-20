import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function RoleRoute({ allowedRoles = [] }) {
  const { authenticated, user } = useAuth();

  const normalizeRole = (role) => {
    if (!role) return "";
    return role.startsWith("ROLE_") ? role.substring(5) : role;
  };

  const userRole = normalizeRole(user?.rol);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.some((role) => normalizeRole(role) === userRole)) {
    return <Navigate to="/admin/no-autorizado" replace />;
  }

  return <Outlet />;
}
