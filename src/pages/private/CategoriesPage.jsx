import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@heroui/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  listarCategoriasAdmin,
} from "@/services/categoriasService";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

const emptyForm = {
  nombre: "",
  tipo: "NOTICIA",
};

const TIPO_LABELS = {
  NOTICIA: "Noticia",
  SERVICIO: "Servicio",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await listarCategoriasAdmin();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        nombre: form.nombre.trim(),
        tipo: form.tipo,
      };

      if (editingId) {
        await actualizarCategoria(editingId, payload);
      } else {
        await crearCategoria(payload);
      }

      resetForm();
      setDialogOpen(false);
      toast.success(editingId ? "Categoría actualizada" : "Categoría creada");
      loadCategories();
    } catch (error) {
      toast.danger(error.message || "No se pudo guardar la categoría");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.idCategoria);
    setForm({
      nombre: category.nombre || "",
      tipo: category.tipo || "NOTICIA",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await eliminarCategoria(id);
      toast.success("Categoría eliminada");
      loadCategories();
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar la categoría");
    } finally {
      setDeletingId(null);
    }
  };

  const requestDelete = (category) => setDeleteTarget(category);

  const filteredCategories = categories.filter((category) => {
    const term = search.trim().toLowerCase();
    return (!term || category.nombre.toLowerCase().includes(term)) && (!typeFilter || category.tipo === typeFilter);
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Categorías</h2>
            <p className="text-sm text-slate-600">
              Administra las categorías para artículos y servicios.
            </p>
          </div>
          <Button variant="outline" onClick={() => { resetForm(); setDialogOpen(true); }} className={"cursor-pointer md:w-auto w-full bg-black hover:bg-black/80 text-white hover:text-white"}>
            Nueva categoría
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className={"cursor-pointer"}>{editingId ? "Editar categoría" : "Nueva categoría"}</DialogTitle>
              <DialogDescription>
                Define el nombre y el tipo de contenido.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="">
                <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
                <Input
                  value={form.nombre}
                  onChange={(event) => setForm({ ...form, nombre: event.target.value })}
                  placeholder="Nombre de la categoría"
                  maxLength={100}
                  required
                  className="w-full text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Tipo</label>
                <NativeSelect
                  className="w-full"
                  value={form.tipo}
                  onChange={(event) => setForm({ ...form, tipo: event.target.value })}
                  required
                >
                  <option value="NOTICIA">Noticia</option>
                  <option value="SERVICIO">Servicio</option>
                </NativeSelect>
              </div>
              <DialogFooter className="md:col-span-2">
                <Button className={"cursor-pointer"} type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className={"cursor-pointer"} type="submit" disabled={submitting}>{submitting ? "Guardando..." : editingId ? "Guardar cambios" : "Crear categoría"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px]">
          <input className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre" />
          <select className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="">
              Todos los tipos
            </option>
            <option value="NOTICIA">Noticia</option>
            <option value="SERVICIO">Servicio</option>
          </select>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <AdminTableSkeleton columns={3} />
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-8 text-center text-slate-500">
                    No hay categorías registradas.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.idCategoria} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium">{category.nombre}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${category.tipo === "SERVICIO"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                          }`}
                      >
                        {TIPO_LABELS[category.tipo] || category.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2 flex flex-col md:flex-row gap-2 md:gap-0">
                      <Button className={"cursor-pointer"} variant="outline" size="sm" onClick={() => handleEdit(category)}>
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className={"cursor-pointer"}
                        disabled={Boolean(deletingId)}
                        onClick={() => requestDelete(category)}
                      >
                        {deletingId === category.idCategoria ? "Eliminando..." : "Eliminar"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="¿Eliminar esta categoría?"
        description="La categoría se eliminará permanentemente. Esta acción no se puede deshacer."
        loading={Boolean(deletingId)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await handleDelete(deleteTarget.idCategoria);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
