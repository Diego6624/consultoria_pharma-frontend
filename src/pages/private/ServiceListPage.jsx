import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { listarServiciosAdmin, eliminarServicio } from "@/services/serviciosService";

export default function ServiceListPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await listarServiciosAdmin(page, 20);
      setServices(data.content || []);
      setTotal(data.totalElements ?? 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este servicio?")) return;
    try {
      await eliminarServicio(id);
      setServices((current) => current.filter((service) => service.idServicio !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const pages = useMemo(() => {
    const count = Math.ceil(total / 20);
    return Array.from({ length: count }, (_, index) => index);
  }, [total]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Servicios</h2>
            <p className="text-sm text-slate-600">Administra los servicios que se muestran en el sitio.</p>
          </div>
          <Link to="/admin/servicios/nuevo">
            <Button>Crear servicio</Button>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-border bg-slate-50">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-slate-100 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="px-4 py-6 text-center text-slate-500">Cargando servicios...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan="3" className="px-4 py-6 text-center text-slate-500">No hay servicios registrados.</td></tr>
              ) : (
                services.map((service) => (
                  <tr key={service.idServicio} className="border-t border-slate-200 last:border-b">
                    <td className="px-4 py-3">{service.titulo}</td>
                    <td className="px-4 py-3">{service.descripcion}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Link to={`/admin/servicios/${service.idServicio}/editar`}>
                        <Button variant="outline" size="sm">Editar</Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(service.idServicio)}>Eliminar</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {pages.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={page === pageNumber ? "secondary" : "outline"}
              size="sm"
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
