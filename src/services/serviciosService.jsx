import api from "./apiClient2.jsx";

export const listarServiciosPublicos = ({ page = 0, size = 10 } = {}) => {
  return api.get("/api/public/servicios", { params: { page, size } });
};

export const obtenerServicioPublico = (id) => api.get(`/api/public/servicios/${id}`);

export const listarServiciosAdmin = ({ page = 0, size = 10 } = {}) => api.get("/api/admin/servicios", { params: { page, size } });

export const obtenerServicioAdmin = (id) => api.get(`/api/admin/servicios/${id}`);

export const crearServicio = (payload) => api.post(`/api/admin/servicios`, payload);
export const crearServicioConImagen = (formData) => api.post(`/api/admin/servicios/upload`, formData);

export const actualizarServicio = (id, payload) => api.put(`/api/admin/servicios/${id}`, payload);
export const actualizarServicioConImagen = (id, formData) => api.put(`/api/admin/servicios/${id}/upload`, formData);

export const eliminarServicio = (id) => api.delete(`/api/admin/servicios/${id}`);

// Fallback fetch-based upload helpers
import { getSession } from "../lib/auth";

export async function crearServicioConImagenFetch(formData) {
  const session = getSession();
  const token = session?.token;
  const resp = await fetch((import.meta.env.VITE_API_BASE_URL || "http://localhost:8080") + '/api/admin/servicios/upload', {
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

export async function actualizarServicioConImagenFetch(id, formData) {
  const session = getSession();
  const token = session?.token;
  const resp = await fetch((import.meta.env.VITE_API_BASE_URL || "http://localhost:8080") + `/api/admin/servicios/${id}/upload`, {
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
