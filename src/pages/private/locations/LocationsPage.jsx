import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@heroui/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  crearUbicacionAdmin,
  eliminarUbicacionAdmin,
  listarUbicacionesAdmin,
  actualizarUbicacionAdmin,
} from "@/services/ubicacionesService";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import AdminPageHeader from "@/pages/private/components/AdminPageHeader";
import AdminPagination from "@/pages/private/components/AdminPagination";

const emptyForm = {
  nombre: "",
  latitud: "",
  longitud: "",
  descripcion: "",
};

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadLocations = async (currentPage = page) => {
    setLoading(true);
    try {
      const data = await listarUbicacionesAdmin({ page: currentPage, size: 10 });
      setLocations(data.content || []);
      setTotal(data.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar las ubicaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations(page);
  }, [page]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        nombre: form.nombre.trim(),
        latitud: Number(form.latitud),
        longitud: Number(form.longitud),
        descripcion: form.descripcion.trim(),
      };

      if (editingId) {
        await actualizarUbicacionAdmin(editingId, payload);
      } else {
        await crearUbicacionAdmin(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      setDialogOpen(false);
      toast.success(editingId ? "Ubicación actualizada" : "Ubicación creada");
      loadLocations(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo guardar la ubicación");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (location) => {
    setEditingId(location.idUbicacion);
    setForm({
      nombre: location.nombre || "",
      latitud: location.latitud ?? "",
      longitud: location.longitud ?? "",
      descripcion: location.descripcion || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await eliminarUbicacionAdmin(id);
      toast.success("Ubicación eliminada");
      loadLocations(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar la ubicación");
    } finally {
      setDeletingId(null);
    }
  };

  const requestDelete = (location) => setDeleteTarget(location);

  const pages = useMemo(() => {
    const count = Math.max(1, Math.ceil(total / 10));
    return Array.from({ length: count }, (_, index) => index);
  }, [total]);

  const filteredLocations = locations.filter((location) => {
    const term = search.trim().toLowerCase();
    return !term || `${location.idUbicacion} ${location.nombre} ${location.descripcion || ""}`.toLowerCase().includes(term);
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <AdminPageHeader
          title="Ubicaciones"
          description="Administra los puntos de atención y sucursales."
          actions={<Button className="cursor-pointer w-full bg-black text-white hover:bg-black/80 hover:text-white md:w-auto" variant="outline" onClick={() => { setEditingId(null); setForm(emptyForm); setDialogOpen(true); }}>Nueva ubicación</Button>}
        />

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar ubicación" : "Nueva ubicación"}</DialogTitle>
              <DialogDescription>
                Registra los datos del punto de atención.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
                <Input className="text-sm" value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} placeholder="Nombre de la ubicación" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Latitud</label>
                  <Input className="text-sm" type="number" step="any" value={form.latitud} onChange={(event) => setForm({ ...form, latitud: event.target.value })} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Longitud</label>
                  <Input type="number" step="any" value={form.longitud} onChange={(event) => setForm({ ...form, longitud: event.target.value })} required />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Descripción</label>
                <textarea className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm" value={form.descripcion} onChange={(event) => setForm({ ...form, descripcion: event.target.value })} placeholder="Detalles de la ubicación" />
              </div>
              <DialogFooter className="md:col-span-2">
                <Button className={"cursor-pointer"} type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button className={"cursor-pointer"} type="submit" disabled={submitting}>{submitting ? "Guardando..." : editingId ? "Guardar cambios" : "Crear ubicación"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <Input className={"text-sm"} value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por ID, nombre o descripción" />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Coordenadas</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <AdminTableSkeleton columns={5} />
              ) : filteredLocations.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-8 text-center text-slate-500">No hay ubicaciones registradas.</td></tr>
              ) : (
                filteredLocations.map((location) => (
                  <tr key={location.idUbicacion} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{location.idUbicacion}</td>
                    <td className="px-4 py-3 font-medium">{location.nombre}</td>
                    <td className="px-4 py-3">{location.latitud}, {location.longitud}</td>
                    <td className="px-4 py-3">{location.descripcion || "-"}</td>
                    <td className="px-4 py-3 space-x-2 flex flex-col md:flex-row gap-2 md:gap-0">
                      <Button className={"cursor-pointer"} variant="outline" size="sm" onClick={() => handleEdit(location)}>Editar</Button>
                      <Button className={"cursor-pointer"} variant="destructive" size="sm" disabled={Boolean(deletingId)} onClick={() => requestDelete(location)}>{deletingId === location.idUbicacion ? "Eliminando..." : "Eliminar"}</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <AdminPagination pages={pages} currentPage={page} onPageChange={setPage} disabled={loading || Boolean(deletingId)} />
      </div>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="¿Eliminar esta ubicación?"
        description="La ubicación se eliminará permanentemente del sistema. Esta acción no se puede deshacer."
        loading={Boolean(deletingId)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await handleDelete(deleteTarget.idUbicacion);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
