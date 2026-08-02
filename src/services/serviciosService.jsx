import api from "./apiClient.jsx";

export const listarServiciosPublicos = ({ page = 0, size = 10 } = {}) => {
  return api.get("/api/public/servicios", { params: { page, size } });
};

export const obtenerServicioPublico = (id) => api.get(`/api/public/servicios/${id}`);

export const listarServiciosAdmin = ({ page = 0, size = 10 } = {}) => api.get("/api/admin/servicios", { params: { page, size } });

export const obtenerServicioAdmin = (id) => api.get(`/api/admin/servicios/${id}`);

export const crearServicio = (payload) => api.post(`/api/admin/servicios`, payload);

export const actualizarServicio = (id, payload) => api.put(`/api/admin/servicios/${id}`, payload);

export const eliminarServicio = (id) => api.delete(`/api/admin/servicios/${id}`);
