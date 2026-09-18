import api from "./apiClient.jsx";

export const listarServiciosPublicos = ({ page = 0, size = 10 } = {}) => {
  return api.get("/api/public/servicios", { params: { page, size } });
};

export const obtenerServicioPublico = (slug) => api.get(`/api/public/servicios/slug/${encodeURIComponent(slug)}`);

export const listarServiciosAdmin = ({ page = 0, size = 10 } = {}) => api.get("/api/admin/servicios", { params: { page, size } });

export const obtenerServicioAdmin = (id) => api.get(`/api/admin/servicios/${id}`);

export const crearServicio = (payload) => api.post(`/api/admin/servicios`, payload);
export const crearServicioConImagen = (formData, config = {}) => api.post(`/api/admin/servicios/upload`, formData, config);

export const actualizarServicio = (id, payload) => api.put(`/api/admin/servicios/${id}`, payload);
export const actualizarServicioConImagen = (id, formData, config = {}) => api.put(`/api/admin/servicios/${id}/upload`, formData, config);

export const eliminarServicio = (id) => api.delete(`/api/admin/servicios/${id}`);
