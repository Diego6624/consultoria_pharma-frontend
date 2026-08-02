import api from "./apiClient.jsx";

export const listarCategorias = () => api.get(`/api/public/categorias`);
export const listarCategoriasAdmin = () => api.get(`/api/admin/categorias`);
export const crearCategoria = (payload) => api.post(`/api/admin/categorias`, payload);
export const actualizarCategoria = (id, payload) => api.put(`/api/admin/categorias/${id}`, payload);
export const eliminarCategoria = (id) => api.delete(`/api/admin/categorias/${id}`);
