import { Button } from "@/components/ui/button";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";

const labels = { NOTICIA: "Noticia", SERVICIO: "Servicio" };

export default function CategoryTable({ categories, loading, deletingId, onEdit, onDelete }) {
  return <div className="overflow-x-auto rounded-2xl border border-slate-200"><table className="min-w-full text-sm">
    <thead className="bg-slate-50 text-left text-slate-600"><tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Nombre</th><th className="px-4 py-3">Tipo</th><th className="px-4 py-3">Acciones</th></tr></thead>
    <tbody>{loading ? <AdminTableSkeleton columns={4} /> : categories.length === 0 ? <tr><td colSpan="4" className="px-4 py-8 text-center text-slate-500">No hay categorías registradas.</td></tr> : categories.map((category) => <tr key={category.idCategoria} className="border-t border-slate-200">
      <td className="px-4 py-3 font-mono text-xs text-slate-500">{category.idCategoria}</td><td className="px-4 py-3 font-medium">{category.nombre}</td><td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${category.tipo === "SERVICIO" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>{labels[category.tipo] || category.tipo}</span></td>
      <td className="flex flex-col gap-2 space-x-2 px-4 py-3 md:flex-row md:gap-0"><Button variant="outline" size="sm" onClick={() => onEdit(category)}>Editar</Button><Button variant="destructive" size="sm" disabled={Boolean(deletingId)} onClick={() => onDelete(category)}>{deletingId === category.idCategoria ? "Eliminando..." : "Eliminar"}</Button></td>
    </tr>)}</tbody>
  </table></div>;
}
