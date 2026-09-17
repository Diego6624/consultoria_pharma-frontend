import api from "./apiClient.jsx";

export const listarConsultasAdmin = ({ page = 0, size = 10 } = {}) => {
  return api.get("/api/admin/consultas", { params: { page, size } });
};

export const obtenerConsultaAdmin = (id) => api.get(`/api/admin/consultas/${id}`);

export const marcarConsultaRevisada = (id) => api.patch(`/api/admin/consultas/${id}/revisada`);

export const actualizarRevisionConsulta = (id, revisada) => api.patch(`/api/admin/consultas/${id}/revision`, null, { params: { revisada } });

export const eliminarConsultaAdmin = (id) => api.delete(`/api/admin/consultas/${id}`);

export const exportarConsultasAdmin = () => api.get("/api/admin/consultas/export");
