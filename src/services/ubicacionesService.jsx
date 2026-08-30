import api from "./apiClient.jsx";

export const listarUbicacionesAdmin = ({ page = 0, size = 10 } = {}) => {
  return api.get("/api/admin/ubicaciones", { params: { page, size } });
};

// Agrega esto en ubicacionesService.js
export const listarUbicacionesPublicas = ({ page = 0, size = 20 } = {}) =>
  api.get("/api/public/ubicaciones", { params: { page, size } });

export const obtenerUbicacionAdmin = (id) => api.get(`/api/admin/ubicaciones/${id}`);

export const crearUbicacionAdmin = (payload) => api.post("/api/admin/ubicaciones", payload);

export const actualizarUbicacionAdmin = (id, payload) => api.put(`/api/admin/ubicaciones/${id}`, payload);

export const eliminarUbicacionAdmin = (id) => api.delete(`/api/admin/ubicaciones/${id}`);
