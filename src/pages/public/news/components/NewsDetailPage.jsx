import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { obtenerNoticiaPublica } from "@/services/noticiasService";
import { formatDate, getImageUrl, sanitizeHtml } from "@/lib/content";
import { PublicError } from "@/components/PublicLoading";
import PublicBannerImage from "@/components/PublicBannerImage";
import PublicDetailSkeleton from "@/components/PublicDetailSkeleton";
import SeoHead from "@/components/SeoHead";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    obtenerNoticiaPublica(slug)
      .then((data) => active && setArticle(data))
      .catch((loadError) => active && setError(loadError.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [slug]);

  if (loading) return <PublicDetailSkeleton />;
  if (error || !article) return <PublicError message={error || "Noticia no encontrada."} />;

  return (
    <>
      <SeoHead
        title={`${article.titulo} | Consultoría YL Pharma`}
        description={article.descripcion || "Noticias y novedades del sector farmacéutico."}
        image={article.imagen ? getImageUrl(article.imagen) : "/images/imageNews.webp"}
        type="article"
      />
    <article className="min-h-screen bg-white">

      {/* HERO — copia exacta de BannerMain */}
      <section className="relative w-full h-svh overflow-hidden">

        <PublicBannerImage src={article.imagen ? getImageUrl(article.imagen) : "/images/imageNews.webp"} alt={article.titulo} />

        <div className="absolute inset-0 bg-linear-to-r from-black/80 md:via-black/20 md:to-transparent" />

        <motion.div
          className="relative flex md:items-center w-full h-full pb-6 sm:pb-16 md:pb-0 pt-24 md:pt-0"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col justify-center md:items-start px-6 sm:px-10 md:px-16 lg:px-32 xl:px-48 2xl:px-64 md:gap-4">

            {/* Categoría */}
            <span className="tracking-widest bg-[#0DB3DE] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm self-start">
              {article.nombreCategoria || "Noticias"}
            </span>

            {/* Título */}
            <div className="flex flex-col font-bold text-white gap-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-sm md:max-w-4xl py-2 md:py-0">
              <p className="leading-tight">{article.titulo}</p>
            </div>

            {/* Descripción */}
            <div className="text-white max-w-sm md:max-w-2xl text-lg md:text-xl lg:text-2xl py-2 md:py-0">
              <p>{article.descripcion}</p>
            </div>

            {/* Fecha + volver */}
            <div className="flex items-center gap-6 py-1">
              <p className="text-sm text-white/50">{formatDate(article.fechaPublicacion)}</p>
              <Link to="/news" className="md:hidden inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors">
                <ArrowLeft size={16} />
                Volver a noticias
              </Link>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Contenido del artículo */}
      <div className="px-8 md:px-16 lg:px-32 2xl:px-44 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Descripcion servicio + Linea divisora */}
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex justify-between items-center w-full">
              <div className="text-xl md:text-4xl font-bold">Información del artículo</div>
              <Link to="/news" className="hidden md:inline-flex items-center gap-2 font-semibold text-gray-400 hover:text-cyan-700 text-sm">
                <ArrowLeft size={18} />
                Volver a noticias
              </Link>
            </div>
            <div className="h-1 w-20 rounded-full bg-cyan-400 mb-8" />
          </div>
          <div className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.contenido) }}
          />
        </div>
      </div>

    </article>
    </>
  );
}
