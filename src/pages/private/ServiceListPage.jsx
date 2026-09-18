import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { listarServiciosAdmin, eliminarServicio } from "@/services/serviciosService";
import { listarCategoriasPorTipo } from "@/services/categoriasService";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";

export default function ServiceListPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await listarServiciosAdmin({ page, size: 20 });
      setServices(data?.content || []);
      setTotal(data?.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar los servicios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadServices(); }, [page]);
  useEffect(() => {
    listarCategoriasPorTipo("SERVICIO").then(setCategories).catch(() => toast.danger("No se pudieron cargar las categorías"));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este servicio?")) return;
    setDeletingId(id);
    try {
      await eliminarServicio(id);
      setServices((current) => current.filter((service) => service.idServicio !== id));
      toast.success("Servicio eliminado");
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar el servicio");
    } finally {
      setDeletingId(null);
    }
  };

  const visibleServices = services.filter((service) => {
    const term = search.trim().toLowerCase();
    return (!term || `${service.titulo} ${service.descripcion}`.toLowerCase().includes(term)) && (!category || String(service.idCategoria) === category);
  });
  const pages = useMemo(() => Array.from({ length: Math.ceil(total / 20) }, (_, index) => index), [total]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Servicios</h2>
            <p className="text-sm text-slate-600">Administra los servicios que se muestran en el sitio.</p>
          </div>
          <Link to="/admin/servicios/nuevo" className="hidden md:flex">
            <Button className="cursor-pointer">Crear servicio</Button>
          </Link>
        </div>
        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px]">
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por título o descripción" className="h-10 rounded-md border border-slate-300 px-3 text-sm" />
          <select value={category} onChange={(event) => { setCategory(event.target.value); setPage(0); }} className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
            <option value="">Todas las categorías</option>
            {categories.map((item) =>
              <option key={item.idCategoria} value={item.idCategoria}>
                {item.nombre}
              </option>
            )}
          </select>
          <Link to="/admin/servicios/nuevo" className="flex md:hidden w-full">
            <Button className="w-full">Crear servicio</Button>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-border bg-slate-50">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ?
                <AdminTableSkeleton columns={3} />
                : visibleServices.length === 0 ?
                  <tr>
                    <td colSpan="3" className="px-4 py-6 text-center text-slate-500">
                      No hay servicios que coincidan.
                    </td>
                  </tr>
                  : visibleServices.map((service) =>
                    <tr key={service.idServicio} className="border-t bg-white border-slate-200 last:border-b">
                      <td className="px-4 py-3">
                        {service.titulo}
                      </td>
                      <td className="px-4 py-3">
                        {service.descripcion}
                      </td>
                      <td className="px-4 py-3 space-x-2 flex flex-col md:flex-row gap-2 md:gap-0">
                        <Link to={`/admin/servicios/${service.idServicio}/editar`}>
                          <Button className={"cursor-pointer"} variant="outline" size="sm" disabled={Boolean(deletingId)}>
                            Editar
                          </Button>
                        </Link>
                        <Button className={"cursor-pointer"} variant="destructive" size="sm" disabled={deletingId === service.idServicio} onClick={() => handleDelete(service.idServicio)}>
                          {deletingId === service.idServicio ? "Eliminando..." : "Eliminar"}
                        </Button>
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {pages.map((pageNumber) =>
            <Button key={pageNumber} variant={page === pageNumber ? "secondary" : "outline"} size="sm" onClick={() => setPage(pageNumber)}>
              {pageNumber + 1}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
