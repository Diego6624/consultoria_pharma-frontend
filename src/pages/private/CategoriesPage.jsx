import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@heroui/react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  listarCategoriasAdmin,
} from "@/services/categoriasService";

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
  const [message, setMessage] = useState({ type: "", text: "" });
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await listarCategoriasAdmin();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar las categorías");
      setMessage({ type: "error", text: error.message || "No se pudieron cargar las categorías" });
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
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        nombre: form.nombre.trim(),
        tipo: form.tipo,
      };

      if (editingId) {
        await actualizarCategoria(editingId, payload);
        setMessage({ type: "success", text: "Categoría actualizada" });
      } else {
        await crearCategoria(payload);
        setMessage({ type: "success", text: "Categoría creada" });
      }

      resetForm();
      toast.success(editingId ? "Categoría actualizada" : "Categoría creada");
      loadCategories();
    } catch (error) {
      toast.danger(error.message || "No se pudo guardar la categoría");
      setMessage({ type: "error", text: error.message || "No se pudo guardar la categoría" });
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
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta categoría?")) return;
    setDeletingId(id);
    try {
      await eliminarCategoria(id);
      toast.success("Categoría eliminada");
      loadCategories();
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar la categoría");
      setMessage({ type: "error", text: error.message || "No se pudo eliminar la categoría" });
    } finally {
      setDeletingId(null);
    }
  };

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
          <Button variant="outline" onClick={resetForm}>
            Limpiar formulario
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
            <Input
              value={form.nombre}
              onChange={(event) => setForm({ ...form, nombre: event.target.value })}
              placeholder="Nombre de la categoría"
              maxLength={100}
              required
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
              <NativeSelectOption value="NOTICIA">Noticia</NativeSelectOption>
              <NativeSelectOption value="SERVICIO">Servicio</NativeSelectOption>
            </NativeSelect>
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <Button type="submit" disabled={submitting}>
              {editingId ? "Guardar cambios" : "Crear categoría"}
            </Button>
            {message.text ? (
              <span className={`text-sm ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}>
                {message.text}
              </span>
            ) : null}
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre" />
          <NativeSelect value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><NativeSelectOption value="">Todos los tipos</NativeSelectOption><NativeSelectOption value="NOTICIA">Noticia</NativeSelectOption><NativeSelectOption value="SERVICIO">Servicio</NativeSelectOption></NativeSelect>
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
                <tr>
                  <td colSpan="3" className="px-4 py-8 text-center text-slate-500">
                    Cargando categorías...
                  </td>
                </tr>
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
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          category.tipo === "SERVICIO"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {TIPO_LABELS[category.tipo] || category.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deletingId === category.idCategoria}
                        onClick={() => handleDelete(category.idCategoria)}
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
    </div>
  );
}
