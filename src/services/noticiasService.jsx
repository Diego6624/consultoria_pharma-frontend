import api from "./apiClient2.jsx";

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
export const crearNoticiaConImagen = (formData, config = {}) => api.post(`/api/admin/noticias/upload`, formData, { ...config, headers: { ...(config.headers || {}), 'Content-Type': 'multipart/form-data' } });

export const actualizarNoticia = (id, payload) => api.put(`/api/admin/noticias/${id}`, payload);
export const actualizarNoticiaConImagen = (id, formData, config = {}) => api.put(`/api/admin/noticias/${id}/upload`, formData, { ...config, headers: { ...(config.headers || {}), 'Content-Type': 'multipart/form-data' } });

export const eliminarNoticia = (id) => api.delete(`/api/admin/noticias/${id}`);

// Fallback fetch-based upload helpers (useful if axios client Authorization header is broken)
import { getSession } from "../lib/auth";

export async function crearNoticiaConImagenFetch(formData) {
  const session = getSession();
  const token = session?.token;
  const resp = await fetch((import.meta.env.VITE_API_BASE_URL || "http://localhost:8080") + '/api/admin/noticias/upload', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || resp.statusText);
  }
  return resp.json();
}

export async function actualizarNoticiaConImagenFetch(id, formData) {
  const session = getSession();
  const token = session?.token;
  const resp = await fetch((import.meta.env.VITE_API_BASE_URL || "http://localhost:8080") + `/api/admin/noticias/${id}/upload`, {
    method: 'PUT',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || resp.statusText);
  }
  return resp.json();
}
