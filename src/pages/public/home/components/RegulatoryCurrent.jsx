import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArticleCard from "@/components/ArticleCard";
import { PublicError, PublicLoading } from "@/components/PublicLoading";
import { listarNoticiasPublicas } from "@/services/noticiasService";
import { getImageUrl } from "@/lib/content";

const FALLBACK_IMAGE = "/images/imageNews2.webp";

const GRID_LAYOUTS = {
  1: ["col-span-12"],
  2: ["col-span-12 md:col-span-6", "col-span-12 md:col-span-6"],
  3: ["col-span-12 md:col-span-3", "col-span-12 md:col-span-4", "col-span-12 md:col-span-5"],
  4: ["col-span-12 md:col-span-3", "col-span-12 md:col-span-4", "col-span-12 md:col-span-5", "col-span-12 md:col-span-12"],
  5: ["col-span-12 md:col-span-3", "col-span-12 md:col-span-4", "col-span-12 md:col-span-5", "col-span-12 md:col-span-6", "col-span-12 md:col-span-6"],
  6: ["col-span-12 md:col-span-3", "col-span-12 md:col-span-4", "col-span-12 md:col-span-5", "col-span-12 md:col-span-5", "col-span-12 md:col-span-4", "col-span-12 md:col-span-3"],
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0DB3DE]";

const NewsAccordionItem = ({ article, isOpen, onToggle }) => {
  const image = getImageUrl(article.imagen) || FALLBACK_IMAGE;
  const buttonId = `news-btn-${article.idNoticia}`;
  const panelId = `news-panel-${article.idNoticia}`;

  return (
    <li
      className={`relative overflow-hidden rounded-sm border bg-white transition-colors duration-300 ${
        isOpen ? "border-[#0DB3DE]/50" : "border-slate-300"
      }`}
    >
      {/* Barra lateral del ítem abierto */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 z-10 w-1.5 bg-[#0DB3DE] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left ${focusRing}`}
        >
          <span className="text-base font-semibold leading-snug text-[#1F4C7F]">{article.titulo}</span>
          <ChevronDown
            size={20}
            strokeWidth={3}
            aria-hidden="true"
            className={`shrink-0 text-[#0DB3DE] transition-transform duration-300 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <Link
            to={`/news/${article.slug}`}
            tabIndex={isOpen ? 0 : -1}
            className={`relative block bg-cover bg-center text-white ${focusRing}`}
            style={{ backgroundImage: `url("${image}")` }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(10,30,56,0.92) 0%, rgba(10,30,56,0.7) 60%, rgba(10,30,56,0.5) 100%)",
              }}
            />
            <div className="relative flex min-h-44 flex-col justify-end gap-3 py-5 pl-6 pr-5">
              <p className="text-sm leading-6 text-white/95">{article.descripcion}</p>
              <span className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-[#0DB3DE]">
                Leer noticia
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </li>
  );
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
    <section className="px-5 py-12 sm:px-8 md:px-16 md:py-14 lg:px-32 xl:px-48 2xl:px-64">
      <div className="mb-8 flex flex-col items-center gap-3 md:mb-10">
        <h2 className="text-center text-3xl font-bold text-gray-900">Actualidad Regulatoria</h2>
        <p className="text-center text-base text-gray-600 md:text-lg">
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
          {/* Escritorio (sin cambios) */}
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
                  image={getImageUrl(article.imagen) || FALLBACK_IMAGE}
                  navigate={`/news/${article.slug}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Móvil: acordeón limpio, la foto de la noticia es el fondo del contenido */}
          <ul className="space-y-2 md:hidden">
            {articles.map((article, index) => (
              <NewsAccordionItem
                key={article.idNoticia}
                article={article}
                isOpen={openArticle === index}
                onToggle={() => setOpenArticle(openArticle === index ? null : index)}
              />
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
};

export default RegulatoryCurrent;