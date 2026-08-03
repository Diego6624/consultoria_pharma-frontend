import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { listarNoticiasAdmin, eliminarNoticia } from "@/services/noticiasService2";

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await listarNoticiasAdmin(page, 20);
      setArticles(data.content || []);
      setTotal(data.totalElements ?? 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [page]);

  const handleDelete = async (id) => {
      if (!window.confirm("¿Eliminar este artículo?")) return;
    try {
      await eliminarNoticia(id);
      setArticles((current) => current.filter((article) => article.idNoticia !== id));
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
            <h2 className="text-xl font-semibold">Artículos</h2>
            <p className="text-sm text-slate-600">Lista de noticias administrables.</p>
          </div>
          <Link to="/admin/noticias/nuevo">
            <Button>Crear artículo</Button>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-border bg-slate-50">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-slate-100 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">Cargando artículos...</td></tr>
              ) : articles.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">No hay artículos registrados.</td></tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.idNoticia} className="border-t border-slate-200 last:border-b">
                    <td className="px-4 py-3">{article.titulo}</td>
                    <td className="px-4 py-3">{article.nombreCategoria || "-"}</td>
                    <td className="px-4 py-3">{new Date(article.fechaPublicacion).toLocaleDateString()}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Link to={`/admin/noticias/${article.idNoticia}/editar`}>
                        <Button variant="outline" size="sm">Editar</Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(article.idNoticia)}>Eliminar</Button>
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
