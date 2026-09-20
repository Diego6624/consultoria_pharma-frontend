import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";

export default function ServiceTable({ services, loading, deletingId, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-slate-50">
      <table className="min-w-full text-sm"><thead className="bg-slate-50 text-left text-slate-600"><tr>
        <th className="px-4 py-3">ID</th><th className="px-4 py-3">Título</th><th className="px-4 py-3">Descripción</th><th className="px-4 py-3">Acciones</th>
      </tr></thead><tbody>
        {loading ? <AdminTableSkeleton columns={4} /> : services.length === 0 ? (
          <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">No hay servicios que coincidan.</td></tr>
        ) : services.map((service) => (
          <tr key={service.idServicio} className="border-t border-slate-200 bg-white last:border-b">
            <td className="px-4 py-3 font-mono text-xs text-slate-500">{service.idServicio}</td><td className="px-4 py-3">{service.titulo}</td><td className="px-4 py-3">{service.descripcion}</td>
            <td className="flex flex-col gap-2 space-x-2 px-4 py-3 md:flex-row md:gap-0">
              <Link to={`/admin/servicios/${service.idServicio}/editar`}><Button variant="outline" size="sm" disabled={Boolean(deletingId)}>Editar</Button></Link>
              <Button variant="destructive" size="sm" disabled={Boolean(deletingId)} onClick={() => onDelete(service)}>{deletingId === service.idServicio ? "Eliminando..." : "Eliminar"}</Button>
            </td>
          </tr>
        ))}
      </tbody></table>
    </div>
  );
}
