import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@heroui/react";
import {
  cambiarEstadoUsuarioAdmin,
  crearUsuarioAdmin,
  eliminarUsuarioAdmin,
  listarUsuariosAdmin,
  actualizarUsuarioAdmin,
} from "@/services/usuariosService";
import useAuth from "@/hooks/useAuth";

const emptyForm = {
  nombre: "",
  email: "",
  password: "",
};

function normalizeRole(role) {
  if (!role) return "-";
  return role.replace(/^ROLE_/, "");
}

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [actionId, setActionId] = useState(null);

  const loadUsers = async (currentPage = page) => {
    setLoading(true);
    try {
      const data = await listarUsuariosAdmin({ page: currentPage, size: 10 });
      setUsers(data.content || []);
      setTotal(data.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar los usuarios");
      setMessage({ type: "error", text: error.message || "No se pudieron cargar los usuarios" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        rol: "ROLE_ADMIN",
      };

      if (form.password.trim()) {
        payload.password = form.password.trim();
      }

      if (editingId) {
        await actualizarUsuarioAdmin(editingId, payload);
        setMessage({ type: "success", text: "Usuario actualizado correctamente" });
      } else {
        if (!form.password.trim()) {
          throw new Error("La contraseña es obligatoria para crear un usuario");
        }
        await crearUsuarioAdmin(payload);
        setMessage({ type: "success", text: "Usuario creado correctamente" });
      }

      setForm(emptyForm);
      setEditingId(null);
      toast.success(editingId ? "Usuario actualizado" : "Usuario creado");
      loadUsers(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo guardar el usuario");
      setMessage({ type: "error", text: error.message || "No se pudo guardar el usuario" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.idUsuario);
    setForm({
      nombre: user.nombre || "",
      email: user.email || "",
      password: "",
    });
    setMessage({ type: "", text: "" });
  };

  const handleToggle = async (user) => {
    setActionId(user.idUsuario);
    try {
      await cambiarEstadoUsuarioAdmin(user.idUsuario, !user.estado);
      toast.success("Estado actualizado");
      loadUsers(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo actualizar el estado");
      setMessage({ type: "error", text: error.message || "No se pudo actualizar el estado" });
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar este usuario?")) return;
    setActionId(id);
    try {
      await eliminarUsuarioAdmin(id);
      toast.success("Usuario eliminado");
      loadUsers(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar el usuario");
      setMessage({ type: "error", text: error.message || "No se pudo eliminar el usuario" });
    } finally {
      setActionId(null);
    }
  };

  const pages = useMemo(() => {
    const count = Math.max(1, Math.ceil(total / 10));
    return Array.from({ length: count }, (_, index) => index);
  }, [total]);

  const filteredUsers = users.filter((user) => {
    const term = search.trim().toLowerCase();
    const matchesText = !term || `${user.nombre} ${user.email}`.toLowerCase().includes(term);
    const matchesStatus = !statusFilter || String(Boolean(user.estado)) === statusFilter;
    return user.idUsuario !== currentUser?.idUsuario && matchesText && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Gestión de usuarios</h2>
            <p className="text-sm text-slate-600">Crea, edita y controla el acceso de administradores del sistema.</p>
          </div>
          <Button variant="outline" onClick={() => { setEditingId(null); setForm(emptyForm); setMessage({ type: "", text: "" }); }}>
            Limpiar formulario
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
            <Input value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} placeholder="Nombre completo" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Correo</label>
            <Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="correo@empresa.com" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
            <Input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={editingId ? "Nueva contraseña" : "Contraseña"} required={!editingId} />
          </div>
          <div className="md:col-span-3 flex items-center gap-3">
            <Button type="submit" disabled={submitting}>{editingId ? "Guardar cambios" : "Crear usuario"}</Button>
            {message.text ? (
              <span className={`text-sm ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}>{message.text}</span>
            ) : null}
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_180px]">
          <Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por nombre o correo" />
          <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(0); }} className="h-9 rounded-md border border-input bg-white px-3 text-sm">
            <option value="">Todos los estados</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="px-4 py-8 text-center text-slate-500">Cargando usuarios...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-8 text-center text-slate-500">No hay usuarios registrados.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.idUsuario} className="border-t border-slate-200">
                    <td className="px-4 py-3">{user.nombre}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{normalizeRole(user.rol)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${user.estado ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {user.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                        Editar
                      </Button>
                      <Button variant="secondary" size="sm" disabled={actionId === user.idUsuario} onClick={() => handleToggle(user)}>
                        {actionId === user.idUsuario ? "Procesando..." : user.estado ? "Desactivar" : "Activar"}
                      </Button>
                      <Button variant="destructive" size="sm" disabled={actionId === user.idUsuario} onClick={() => handleDelete(user.idUsuario)}>
                        {actionId === user.idUsuario ? "Eliminando..." : "Eliminar"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {pages.map((pageNumber) => (
            <Button key={pageNumber} variant={page === pageNumber ? "secondary" : "outline"} size="sm" onClick={() => setPage(pageNumber)}>
              {pageNumber + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}