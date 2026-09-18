import api from "./apiClient.jsx";

export const listarNoticiasPublicas = ({ page = 0, size = 10, idCategoria } = {}) => {
  const params = { page, size };
  if (idCategoria) params.idCategoria = idCategoria;
  return api.get("/api/public/noticias", { params });
};

export const obtenerNoticiaPublica = (slug) => api.get(`/api/public/noticias/slug/${encodeURIComponent(slug)}`);

export const listarNoticiasAdmin = ({ page = 0, size = 10, idCategoria } = {}) => {
  const params = { page, size };
  if (idCategoria) params.idCategoria = idCategoria;
  return api.get("/api/admin/noticias", { params });
};

export const obtenerNoticiaAdmin = (id) => api.get(`/api/admin/noticias/${id}`);

export const crearNoticia = (payload) => api.post(`/api/admin/noticias`, payload);
export const crearNoticiaConImagen = (formData, config = {}) => api.post(`/api/admin/noticias/upload`, formData, config);

export const actualizarNoticia = (id, payload) => api.put(`/api/admin/noticias/${id}`, payload);
export const actualizarNoticiaConImagen = (id, formData, config = {}) => api.put(`/api/admin/noticias/${id}/upload`, formData, config);

export const eliminarNoticia = (id) => api.delete(`/api/admin/noticias/${id}`);
