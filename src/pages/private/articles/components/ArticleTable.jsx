import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";
import { Pencil, Trash2 } from "lucide-react";

export default function ArticleTable({ articles, loading, deletingId, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-slate-50">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-left text-slate-600"><tr>
          <th className="px-4 py-3">ID</th><th className="px-4 py-3">Título</th><th className="px-4 py-3">Categoría</th>
          <th className="px-4 py-3">Fecha</th><th className="px-4 py-3">Acciones</th>
        </tr></thead>
        <tbody>
          {loading ? <AdminTableSkeleton columns={5} /> : articles.length === 0 ? (
            <tr><td colSpan="5" className="px-4 py-6 text-center text-slate-500">No hay artículos que coincidan.</td></tr>
          ) : articles.map((article) => (
            <tr key={article.idNoticia} className="border-t border-slate-200 bg-white last:border-b">
              <td className="px-4 py-3 font-mono text-xs text-slate-500">{article.idNoticia}</td><td className="px-4 py-3">{article.titulo}</td>
              <td className="px-4 py-3">{article.nombreCategoria || "-"}</td>
              <td className="px-4 py-3">{new Date(article.fechaPublicacion).toLocaleDateString()}</td>
              <td className="flex flex-col gap-2 space-x-2 px-4 py-3 md:flex-row md:gap-0">
                <Link to={`/admin/noticias/${article.idNoticia}/editar`} className="w-min">
                  <Button variant="outline" size="sm" disabled={Boolean(deletingId)} className={"cursor-pointer w-full"}><Pencil size={14} />Editar</Button>
                </Link>
                <Button variant="destructive" size="sm" disabled={Boolean(deletingId)} onClick={() => onDelete(article)} className={"cursor-pointer"}>
                  {deletingId === article.idNoticia ? "Eliminando..." : <><Trash2 size={14} />Eliminar</>}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
