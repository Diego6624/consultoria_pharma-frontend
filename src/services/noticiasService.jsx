import api from "./apiClient.jsx";

export const listarNoticiasPublicas = ({ page = 0, size = 10, idCategoria } = {}) => {
  const params = { page, size };
  if (idCategoria) params.idCategoria = idCategoria;
  return api.get("/api/public/noticias", { params });
};

export const obtenerNoticiaPublica = (id) => api.get(`/api/public/noticias/${id}`);

export const listarNoticiasAdmin = ({ page = 0, size = 10, idCategoria } = {}) => {
  const params = { page, size };
  if (idCategoria) params.idCategoria = idCategoria;
  return api.get("/api/admin/noticias", { params });
};

export const obtenerNoticiaAdmin = (id) => api.get(`/api/admin/noticias/${id}`);

export const crearNoticia = (payload) => api.post(`/api/admin/noticias`, payload);

export const actualizarNoticia = (id, payload) => api.put(`/api/admin/noticias/${id}`, payload);

export const eliminarNoticia = (id) => api.delete(`/api/admin/noticias/${id}`);
