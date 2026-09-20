import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArticleCard from "@/components/ArticleCard";
import { PublicError, PublicLoading } from "@/components/PublicLoading";
import { listarNoticiasPublicas } from "@/services/noticiasService";
import { getImageUrl } from "@/lib/content";

const GRID_LAYOUTS = {
  1: ["col-span-12"],
  2: ["col-span-12 md:col-span-6", "col-span-12 md:col-span-6"],
  3: ["col-span-12 md:col-span-3", "col-span-12 md:col-span-4", "col-span-12 md:col-span-5"],
  4: ["col-span-12 md:col-span-3", "col-span-12 md:col-span-4", "col-span-12 md:col-span-5", "col-span-12 md:col-span-12"],
  5: ["col-span-12 md:col-span-3", "col-span-12 md:col-span-4", "col-span-12 md:col-span-5", "col-span-12 md:col-span-6", "col-span-12 md:col-span-6"],
  6: ["col-span-12 md:col-span-3", "col-span-12 md:col-span-4", "col-span-12 md:col-span-5", "col-span-12 md:col-span-5", "col-span-12 md:col-span-4", "col-span-12 md:col-span-3"],
};

const RegulatoryCurrent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openArticle, setOpenArticle] = useState(null);

  const loadArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const page = await listarNoticiasPublicas({ page: 0, size: 6 });
      setArticles((page?.content || []).slice(0, 6));
    } catch (loadError) {
      setError(loadError.message || "No se pudieron cargar las noticias regulatorias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const layout = GRID_LAYOUTS[articles.length] || GRID_LAYOUTS[6];

  return (
    <section className="bg-gray-100 px-8 py-14 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
      <div className="mb-10 flex flex-col items-center gap-3">
        <h2 className="text-center text-3xl font-bold text-gray-900">Actualidad Regulatoria</h2>
        <p className="text-center text-lg text-gray-600">
          Mantente informado sobre las últimas normativas, cambios en DIGEMID y tendencias del sector salud.
        </p>
      </div>

      {loading ? <PublicLoading label="Cargando actualidad regulatoria..." /> : null}
      {error && !loading ? <PublicError message={error} onRetry={loadArticles} /> : null}

      {!loading && !error && articles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">
          Próximamente publicaremos novedades regulatorias.
        </div>
      ) : null}

      {!loading && !error && articles.length > 0 ? (
        <>
          <div className="hidden grid-cols-12 auto-rows-[300px] gap-4 md:grid">
            {articles.map((article, index) => (
              <motion.div
                key={article.idNoticia}
                className={layout[index]}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ArticleCard
                  title={article.titulo}
                  subtitle={article.descripcion}
                  image={getImageUrl(article.imagen) || "/images/imageNews.jpg"}
                  navigate={`/news/${article.slug}`}
                />
              </motion.div>
            ))}
          </div>

          <div className="space-y-3 md:hidden">
            {articles.map((article, index) => {
              const isOpen = openArticle === index;
              const image = getImageUrl(article.imagen) || "/images/imageNews.jpg";

              return (
                <motion.div
                  key={article.idNoticia}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenArticle(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-[#1F4C7F]"
                  >
                    <span>{article.titulo}</span>
                    <ChevronDown size={20} className={`shrink-0 text-[#0DB3DE] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen ? (
                    <Link
                      to={`/news/${article.slug}`}
                      className="relative block min-h-56 bg-cover bg-center px-5 py-6 text-white"
                      style={{ backgroundImage: `url("${image}")` }}
                    >
                      <div className="absolute inset-0 bg-slate-950/30" />
                      <div className="relative z-10 flex min-h-44 items-end">
                        <p className="text-sm leading-6">{article.descripcion}</p>
                      </div>
                    </Link>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </>
      ) : null}
    </section>
  );
};

export default RegulatoryCurrent;
