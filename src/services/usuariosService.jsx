import api from "./apiClient.jsx";

export const listarUsuariosAdmin = ({ page = 0, size = 10, estado } = {}) => {
  const params = { page, size };
  if (estado !== undefined && estado !== null) params.estado = estado;
  return api.get("/api/master/usuarios", { params });
};

export const obtenerUsuarioAdmin = (id) => api.get(`/api/master/usuarios/${id}`);

export const crearUsuarioAdmin = (payload) => api.post("/api/master/usuarios", payload);

export const actualizarUsuarioAdmin = (id, payload) => api.put(`/api/master/usuarios/${id}`, payload);

export const cambiarEstadoUsuarioAdmin = (id, activo) => api.patch(`/api/master/usuarios/${id}/estado?activo=${activo}`);

export const eliminarUsuarioAdmin = (id) => api.delete(`/api/master/usuarios/${id}`);
