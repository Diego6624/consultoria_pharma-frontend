import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@heroui/react";
import {
  crearUbicacionAdmin,
  eliminarUbicacionAdmin,
  listarUbicacionesAdmin,
  actualizarUbicacionAdmin,
} from "@/services/ubicacionesService";

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
  const [message, setMessage] = useState({ type: "", text: "" });
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadLocations = async (currentPage = page) => {
    setLoading(true);
    try {
      const data = await listarUbicacionesAdmin({ page: currentPage, size: 10 });
      setLocations(data.content || []);
      setTotal(data.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar las ubicaciones");
      setMessage({ type: "error", text: error.message || "No se pudieron cargar las ubicaciones" });
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
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        nombre: form.nombre.trim(),
        latitud: Number(form.latitud),
        longitud: Number(form.longitud),
        descripcion: form.descripcion.trim(),
      };

      if (editingId) {
        await actualizarUbicacionAdmin(editingId, payload);
        setMessage({ type: "success", text: "Ubicación actualizada" });
      } else {
        await crearUbicacionAdmin(payload);
        setMessage({ type: "success", text: "Ubicación creada" });
      }

      setForm(emptyForm);
      setEditingId(null);
      toast.success(editingId ? "Ubicación actualizada" : "Ubicación creada");
      loadLocations(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo guardar la ubicación");
      setMessage({ type: "error", text: error.message || "No se pudo guardar la ubicación" });
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
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta ubicación?")) return;
    setDeletingId(id);
    try {
      await eliminarUbicacionAdmin(id);
      toast.success("Ubicación eliminada");
      loadLocations(page);
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar la ubicación");
      setMessage({ type: "error", text: error.message || "No se pudo eliminar la ubicación" });
    } finally {
      setDeletingId(null);
    }
  };

  const pages = useMemo(() => {
    const count = Math.max(1, Math.ceil(total / 10));
    return Array.from({ length: count }, (_, index) => index);
  }, [total]);

  const filteredLocations = locations.filter((location) => {
    const term = search.trim().toLowerCase();
    return !term || `${location.nombre} ${location.descripcion || ""}`.toLowerCase().includes(term);
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Ubicaciones</h2>
            <p className="text-sm text-slate-600">Administra los puntos de atención y sucursales.</p>
          </div>
          <Button variant="outline" onClick={() => { setEditingId(null); setForm(emptyForm); setMessage({ type: "", text: "" }); }}>
            Limpiar formulario
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
            <Input value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} placeholder="Nombre de la ubicación" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Latitud</label>
              <Input type="number" step="any" value={form.latitud} onChange={(event) => setForm({ ...form, latitud: event.target.value })} required />
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
          <div className="md:col-span-2 flex items-center gap-3">
            <Button type="submit" disabled={submitting}>{editingId ? "Guardar cambios" : "Crear ubicación"}</Button>
            {message.text ? (
              <span className={`text-sm ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}>{message.text}</span>
            ) : null}
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4"><Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por nombre o descripción" /></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Coordenadas</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="px-4 py-8 text-center text-slate-500">Cargando ubicaciones...</td></tr>
              ) : filteredLocations.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-8 text-center text-slate-500">No hay ubicaciones registradas.</td></tr>
              ) : (
                filteredLocations.map((location) => (
                  <tr key={location.idUbicacion} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium">{location.nombre}</td>
                    <td className="px-4 py-3">{location.latitud}, {location.longitud}</td>
                    <td className="px-4 py-3">{location.descripcion || "-"}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(location)}>Editar</Button>
                      <Button variant="destructive" size="sm" disabled={deletingId === location.idUbicacion} onClick={() => handleDelete(location.idUbicacion)}>{deletingId === location.idUbicacion ? "Eliminando..." : "Eliminar"}</Button>
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
