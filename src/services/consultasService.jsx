import api from "./apiClient.jsx";

export const listarConsultasAdmin = ({ page = 0, size = 10 } = {}) => {
  return api.get("/api/admin/consultas", { params: { page, size } });
};

export const obtenerConsultaAdmin = (id) => api.get(`/api/admin/consultas/${id}`);
