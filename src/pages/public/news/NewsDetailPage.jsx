import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { obtenerNoticiaPublica } from "@/services/noticiasService";
import { formatDate, getImageUrl, sanitizeHtml } from "@/lib/content";
import { PublicError, PublicLoading } from "@/components/PublicLoading";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    obtenerNoticiaPublica(id)
      .then((data) => active && setArticle(data))
      .catch((loadError) => active && setError(loadError.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  if (loading) return <PublicLoading label="Cargando noticia..." />;
  if (error || !article) return <PublicError message={error || "Noticia no encontrada."} />;

  return (
    <article className="min-h-screen bg-white px-8 py-10 md:px-16 lg:px-32 2xl:px-44">
      <Link to="/news" className="mb-8 inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-700"><ArrowLeft size={18} /> Volver a noticias</Link>
      {article.imagen ? <img src={getImageUrl(article.imagen)} alt={article.titulo} className="mb-10 h-64 w-full rounded-2xl object-cover md:h-96" fetchPriority="high" /> : null}
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-600">{article.nombreCategoria || "Noticias"}</p>
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">{article.titulo}</h1>
        <p className="mt-4 text-sm text-slate-500">{formatDate(article.fechaPublicacion)}</p>
        <p className="mt-8 text-xl leading-8 text-slate-700">{article.descripcion}</p>
        <div className="prose prose-slate mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.contenido) }} />
      </div>
    </article>
  );
}
