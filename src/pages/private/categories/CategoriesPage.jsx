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
  listarCategoriasAdminPaginadas,
} from "@/services/categoriasService";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import AdminPageHeader from "@/pages/private/components/AdminPageHeader";
import AdminPagination from "@/pages/private/components/AdminPagination";
import CategoryTable from "./components/CategoryTable";
import { Plus, Save } from "lucide-react";

const emptyForm = {
  nombre: "",
  tipo: "NOTICIA",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
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
      const data = await listarCategoriasAdminPaginadas({ page, size: 10, tipo: typeFilter || undefined });
      setCategories(data?.content || []);
      setTotal(data?.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [page, typeFilter]);

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
    return !term || `${category.idCategoria} ${category.nombre}`.toLowerCase().includes(term);
  });
  const pages = Array.from({ length: Math.ceil(total / 10) }, (_, index) => index);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <AdminPageHeader
          title="Categorías"
          description="Administra las categorías para artículos y servicios."
          actions={
            <Button variant="outline" onClick={() => { resetForm(); setDialogOpen(true); }} className="cursor-pointer w-full bg-black text-white hover:bg-black/80 hover:text-white md:w-auto">
              <Plus size={16} />Nueva categoría
            </Button>
          }
        />

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
                <Button className={"cursor-pointer"} type="submit" disabled={submitting}>
                  {submitting ? "Guardando..." : <><Save size={16} />{editingId ? "Guardar cambios" : "Crear categoría"}</>}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px]">
          <input className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm" value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por ID o nombre" />
          <select className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm" value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value); setPage(0); }}>
            <option value="">
              Todos los tipos
            </option>
            <option value="NOTICIA">Noticia</option>
            <option value="SERVICIO">Servicio</option>
          </select>
        </div>
        <CategoryTable categories={filteredCategories} loading={loading} deletingId={deletingId} onEdit={handleEdit} onDelete={requestDelete} />
        <AdminPagination pages={pages} currentPage={page} onPageChange={setPage} disabled={loading || Boolean(deletingId)} />
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
