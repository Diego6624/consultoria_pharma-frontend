import api from "./apiClient.jsx";

export const obtenerDashboardAdmin = () => api.get("/api/admin/dashboard");