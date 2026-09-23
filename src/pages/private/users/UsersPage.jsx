import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@heroui/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  cambiarEstadoUsuarioAdmin,
  crearUsuarioAdmin,
  eliminarUsuarioAdmin,
  listarUsuariosAdmin,
  actualizarUsuarioAdmin,
} from "@/services/usuariosService";
import useAuth from "@/hooks/useAuth";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import AdminPageHeader from "@/pages/private/components/AdminPageHeader";
import AdminPagination from "@/pages/private/components/AdminPagination";
import { Pencil, Plus, Power, PowerOff, Save, Trash2 } from "lucide-react";

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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [action, setAction] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadUsers = async (currentPage = page) => {
    setLoading(true);
    try {
      const data = await listarUsuariosAdmin({ page: currentPage, size: 10 });
      setUsers(data.content || []);
      setTotal(data.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar los usuarios");
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
      } else {
        if (!form.password.trim()) {
          throw new Error("La contraseña es obligatoria para crear un usuario");
        }
        await crearUsuarioAdmin(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      setDialogOpen(false);
      toast.success(editingId ? "Usuario actualizado" : "Usuario creado");
      loadUsers(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo guardar el usuario");
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
    setDialogOpen(true);
  };

  const handleToggle = async (user) => {
    if (action) return;
    setAction({ id: user.idUsuario, type: "toggle" });
    try {
      await cambiarEstadoUsuarioAdmin(user.idUsuario, !user.estado);
      toast.success("Estado actualizado");
      loadUsers(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo actualizar el estado");
    } finally {
      setAction(null);
    }
  };

  const handleDelete = async (id) => {
    if (action) return;
    setAction({ id, type: "delete" });
    try {
      await eliminarUsuarioAdmin(id);
      toast.success("Usuario eliminado");
      loadUsers(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar el usuario");
    } finally {
      setAction(null);
    }
  };

  const requestDelete = (user) => setDeleteTarget(user);

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
        <AdminPageHeader
          title="Gestión de usuarios"
          description="Crea, edita y controla el acceso de administradores del sistema."
          actions={<Button className="cursor-pointer w-full bg-black text-white hover:bg-black/80 hover:text-white md:w-auto" variant="outline" onClick={() => { setEditingId(null); setForm(emptyForm); setDialogOpen(true); }}><Plus size={16} />Nuevo usuario</Button>}
        />

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar usuario" : "Nuevo usuario"}</DialogTitle>
              <DialogDescription>Completa los datos del administrador.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
                <Input value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} placeholder="Nombre completo" className={"text-sm"} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Correo</label>
                <Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="correo@empresa.com" className={"text-sm"} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
                <Input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={editingId ? "Nueva contraseña" : "Contraseña"} className={"text-sm"} required={!editingId} />
              </div>
              <DialogFooter className="md:col-span-2">
                <Button className={"cursor-pointer"} type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button className="cursor-pointer" type="submit" disabled={submitting}>{submitting ? "Guardando..." : <><Save size={16} />{editingId ? "Guardar cambios" : "Crear usuario"}</>}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_180px]">
          <Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por nombre o correo" className="h-10 w-full text-sm" />
          <Select value={statusFilter || "all"} onValueChange={(value) => { setStatusFilter(value === "all" ? "" : value); setPage(0); }}>
            <SelectTrigger className="!h-10 w-full bg-white">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="true">Activos</SelectItem>
              <SelectItem value="false">Inactivos</SelectItem>
            </SelectContent>
          </Select>
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
                <AdminTableSkeleton columns={5} />
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
                    <td className="px-4 py-3 space-x-2 flex flex-col md:flex-row gap-2 md:gap-0">
                      <Button className={"cursor-pointer"} variant="outline" size="sm" onClick={() => handleEdit(user)}>
                        <><Pencil size={14} />Editar</>
                      </Button>
                      <Button className={"cursor-pointer"} variant="secondary" size="sm" disabled={Boolean(action)} onClick={() => handleToggle(user)}>
                        {action?.id === user.idUsuario && action.type === "toggle" ? "Procesando..." :
                          <>
                            {user.estado ? <PowerOff size={14} /> : <Power size={14} />}
                            {user.estado ? "Desactivar" : "Activar"}
                          </>
                        }
                      </Button>
                      <Button className={"cursor-pointer"} variant="destructive" size="sm" disabled={Boolean(action)} onClick={() => requestDelete(user)}>
                        {action?.id === user.idUsuario && action.type === "delete" ? "Eliminando..." : <><Trash2 size={14} />Eliminar</>}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <AdminPagination pages={pages} currentPage={page} onPageChange={setPage} disabled={loading || Boolean(action)} />
      </div>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="¿Eliminar este usuario?"
        description="El usuario perderá el acceso al panel administrativo. Esta acción no se puede deshacer."
        loading={action?.type === "delete"}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await handleDelete(deleteTarget.idUsuario);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
