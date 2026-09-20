import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { listarNoticiasAdmin, eliminarNoticia } from "@/services/noticiasService";
import { listarCategoriasPorTipo } from "@/services/categoriasService";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import AdminPageHeader from "@/pages/private/components/AdminPageHeader";
import AdminPagination from "@/pages/private/components/AdminPagination";
import { Plus } from "lucide-react";
import ArticleFilters from "./components/ArticleFilters";
import ArticleTable from "./components/ArticleTable";

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
      const data = await listarNoticiasAdmin({ page, size: 10 });
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
    return (!term || `${article.idNoticia} ${article.titulo} ${article.descripcion}`.toLowerCase().includes(term)) && (!category || String(article.idCategoria) === category);
  });
  const pages = useMemo(() => Array.from({ length: Math.ceil(total / 10) }, (_, index) => index), [total]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
        <div className="mb-6">
          <AdminPageHeader
            title="Artículos"
            description="Lista de noticias administrables."
            actions={<Link to="/admin/noticias/nuevo" className="hidden md:flex"><Button className="cursor-pointer"><Plus size={16} />Crear artículo</Button></Link>}
          />
        </div>
        <ArticleFilters search={search} category={category} categories={categories} onSearchChange={(value) => { setSearch(value); setPage(0); }} onCategoryChange={(value) => { setCategory(value); setPage(0); }} />
        <ArticleTable articles={visibleArticles} loading={loading} deletingId={deletingId} onDelete={requestDelete} />
        <AdminPagination pages={pages} currentPage={page} onPageChange={setPage} disabled={loading || Boolean(deletingId)} />
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
