import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { listarNoticiasAdmin, eliminarNoticia } from "@/services/noticiasService";
import { listarCategoriasPorTipo } from "@/services/categoriasService";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await listarNoticiasAdmin({ page, size: 20 });
      setArticles(data?.content || []);
      setTotal(data?.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar los artículos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadArticles(); }, [page]);
  useEffect(() => {
    listarCategoriasPorTipo("NOTICIA").then(setCategories).catch(() => toast.danger("No se pudieron cargar las categorías"));
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await eliminarNoticia(id);
      setArticles((current) => current.filter((article) => article.idNoticia !== id));
      toast.success("Artículo eliminado");
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar el artículo");
    } finally {
      setDeletingId(null);
    }
  };

  const requestDelete = (article) => setDeleteTarget(article);

  const visibleArticles = articles.filter((article) => {
    const term = search.trim().toLowerCase();
    return (!term || `${article.titulo} ${article.descripcion}`.toLowerCase().includes(term)) && (!category || String(article.idCategoria) === category);
  });
  const pages = useMemo(() => Array.from({ length: Math.ceil(total / 20) }, (_, index) => index), [total]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">
              Artículos
            </h2>
            <p className="text-sm text-slate-600">
              Lista de noticias administrables.
            </p>
          </div>
          <Link to="/admin/noticias/nuevo" className="hidden md:flex">
            <Button className="cursor-pointer">
              Crear artículo
            </Button>
          </Link>
        </div>
        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px]">
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por título o descripción" className="h-10 rounded-md border border-slate-300 px-3 text-sm" />
          <select value={category} onChange={(event) => { setCategory(event.target.value); setPage(0); }} className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
            <option value="">
              Todas las categorías
            </option>
            {categories.map((item) =>
              <option key={item.idCategoria} value={item.idCategoria}>
                {item.nombre}
              </option>)}
          </select>
          <Link to="/admin/noticias/nuevo" className="flex md:hidden w-full">
            <Button className="w-full">
              Crear artículo
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-border bg-slate-50">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">
                  Título
                </th>
                <th className="px-4 py-3">
                  Categoría
                </th>
                <th className="px-4 py-3">
                  Fecha</th>
                <th className="px-4 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ?
                <AdminTableSkeleton columns={4} />
                : visibleArticles.length === 0 ?
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-center text-slate-500">
                      No hay artículos que coincidan.
                    </td>
                  </tr>
                  : visibleArticles.map((article) =>
                    <tr key={article.idNoticia} className="border-t bg-white border-slate-200 last:border-b">
                      <td className="px-4 py-3">
                        {article.titulo}
                      </td>
                      <td className="px-4 py-3">
                        {article.nombreCategoria || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(article.fechaPublicacion).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 space-x-2 flex flex-col md:flex-row gap-2 md:gap-0">
                        <Link to={`/admin/noticias/${article.idNoticia}/editar`}>
                          <Button className={"cursor-pointer"} variant="outline" size="sm" disabled={Boolean(deletingId)}>Editar</Button>
                        </Link>
                        <Button className={"cursor-pointer"} variant="destructive" size="sm" disabled={Boolean(deletingId)} onClick={() => requestDelete(article)}>
                          {deletingId === article.idNoticia ? "Eliminando..." : "Eliminar"}
                        </Button>
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{pages.map((pageNumber) =>
          <Button key={pageNumber} variant={page === pageNumber ? "secondary" : "outline"} size="sm" onClick={() => setPage(pageNumber)}>
            {pageNumber + 1}
          </Button>)}
        </div>
      </div>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="¿Eliminar este artículo?"
        description="El artículo se eliminará permanentemente y dejará de estar disponible. Esta acción no se puede deshacer."
        loading={Boolean(deletingId)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await handleDelete(deleteTarget.idNoticia);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
