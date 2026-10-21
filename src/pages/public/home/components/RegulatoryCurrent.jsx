import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArticleCard from "@/components/ArticleCard";
import { PublicError } from "@/components/PublicLoading";
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
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DB3DE] focus-visible:ring-offset-2";

const scrollBehavior = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

const RegulatorySkeleton = () => (
  <div role="status" aria-label="Cargando noticias regulatorias">
    <div className="hidden grid-cols-12 auto-rows-[270px] gap-4 md:grid">
      {GRID_LAYOUTS[6].map((layout, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-2xl bg-slate-200 ${layout}`}
        />
      ))}
    </div>

    <div className="md:hidden">
      <div className="mx-auto w-[78vw] max-w-[22rem]">
        <div className="aspect-[4/5] animate-pulse rounded-3xl bg-slate-200" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 6 }, (_, index) => (
            <span
              key={index}
              className={`h-2 animate-pulse rounded-full bg-slate-200 ${
                index === 0 ? "w-6" : "w-2"
              }`}
            />
          ))}
        </div>
        <span className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
      </div>
    </div>
  </div>
);

/* Móvil: carrusel con scroll-snap nativo (sin librerías) */
const NewsCarousel = ({ articles }) => {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);
  const total = articles.length;

  // Detecta qué tarjeta está centrada
  useEffect(() => {
    const root = trackRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { root, threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [total]);

  const goTo = (index) => {
    const target = Math.max(0, Math.min(total - 1, index));
    itemRefs.current[target]?.scrollIntoView({
      behavior: scrollBehavior(),
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div role="region" aria-roledescription="carrusel" aria-label="Noticias regulatorias">
      {/* El padding lateral centra la primera y la última tarjeta */}
      <ul
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] sm:-mx-8 [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: "calc((100vw - min(78vw, 22rem)) / 2)" }}
      >
        {articles.map((article, index) => {
          const image = getImageUrl(article.imagen) || FALLBACK_IMAGE;
          const isActive = index === active;

          return (
            <li
              key={article.idNoticia}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-index={index}
              aria-label={`${index + 1} de ${total}`}
              className={`w-[78vw] max-w-[22rem] shrink-0 snap-center transition-[transform,opacity] duration-300 motion-reduce:transition-none ${
                isActive ? "scale-100 opacity-100" : "scale-[0.95] opacity-80"
              }`}
            >
              <Link
                to={`/news/${article.slug}`}
                draggable={false}
                className={`group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-md ${focusRing}`}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(10,30,56,0.95) 0%, rgba(10,30,56,0.65) 45%, rgba(10,30,56,0.05) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="mb-3 block h-1 w-10 rounded-full bg-[#0DB3DE]" aria-hidden="true" />
                  <h3 className="line-clamp-3 text-xl font-bold leading-tight text-white">{article.titulo}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/85">{article.descripcion}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0DB3DE]">
                    Leer noticia
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Controles: flechas + indicadores */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Noticia anterior"
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#1F4C7F] transition-opacity disabled:opacity-40 ${focusRing}`}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <div className="flex items-center">
          {articles.map((article, index) => (
            <button
              key={article.idNoticia}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir a la noticia ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={`flex h-6 items-center px-1 ${focusRing}`}
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  index === active ? "w-6 bg-[#0DB3DE]" : "w-2 bg-slate-300"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === total - 1}
          aria-label="Noticia siguiente"
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#1F4C7F] transition-opacity disabled:opacity-40 ${focusRing}`}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const RegulatoryCurrent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    let cancelled = false;

    const loadInitialArticles = async () => {
      try {
        const page = await listarNoticiasPublicas({ page: 0, size: 6 });
        if (!cancelled) setArticles((page?.content || []).slice(0, 6));
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "No se pudieron cargar las noticias regulatorias.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadInitialArticles();
    return () => {
      cancelled = true;
    };
  }, []);

  const layout = GRID_LAYOUTS[articles.length] || GRID_LAYOUTS[6];

  return (
    <section className="overflow-x-clip px-5 py-12 sm:px-8 md:px-16 md:py-14 lg:px-32 xl:px-48 2xl:px-64">
      <div className="mb-8 flex flex-col items-center gap-3 md:mb-10">
        <h2 className="text-center text-3xl font-bold text-gray-900">Actualidad Regulatoria</h2>
        <p className="text-center text-base text-gray-600 md:text-lg">
          Mantente informado sobre las últimas normativas, cambios en DIGEMID y tendencias del sector salud.
        </p>
      </div>

      {loading ? <RegulatorySkeleton /> : null}
      {error && !loading ? <PublicError message={error} onRetry={loadArticles} /> : null}

      {!loading && !error && articles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">
          Próximamente publicaremos novedades regulatorias.
        </div>
      ) : null}

      {!loading && !error && articles.length > 0 ? (
        <>
          {/* Escritorio (sin cambios) */}
          <div className="hidden grid-cols-12 auto-rows-[270px] gap-4 md:grid">
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

          {/* Móvil: carrusel */}
          <div className="md:hidden">
            <NewsCarousel articles={articles} />
          </div>
        </>
      ) : null}
    </section>
  );
};

export default RegulatoryCurrent;