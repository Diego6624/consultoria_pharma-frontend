import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listarCategorias } from "@/services/categoriasService";
import { listarNoticiasPublicas } from "@/services/noticiasService";
import { formatDate, getImageUrl } from "@/lib/content";
import { PublicError } from "@/components/PublicLoading";
import { ArticleCardsSkeleton } from "@/components/PublicCardSkeletons";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZE = 12;

export default function SearchNews() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadNews = async () => {
        setLoading(true);
        setError("");
        try {
            const [newsPage, categoryData] = await Promise.all([
                listarNoticiasPublicas({ page, size: PAGE_SIZE, idCategoria: selectedCategory || undefined }),
                page === 0 ? listarCategorias() : Promise.resolve(categories),
            ]);
            setArticles(newsPage?.content || []);
            setTotalPages(newsPage?.totalPages || 0);
            if (page === 0 && Array.isArray(categoryData)) {
                setCategories(categoryData.filter((category) => category.tipo === "NOTICIA"));
            }
        } catch (loadError) {
            setError(loadError.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, [page, selectedCategory]);

    const filteredArticles = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return articles;
        return articles.filter((article) => `${article.titulo} ${article.descripcion}`.toLowerCase().includes(term));
    }, [articles, searchTerm]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setPage(0);
    };

    return (
        <section className="px-8 py-12 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input type="search" placeholder="Busca alguna noticia" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="h-12 rounded-lg border-gray-300 py-0 pl-12 pr-10 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-cyan-400" />
                        {searchTerm ?
                            <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpiar búsqueda" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <X size={18} />
                            </button>
                            :
                            null
                        }
                    </div>
                    <Select value={selectedCategory || "all"} onValueChange={(value) => handleCategoryChange(value === "all" ? "" : value)}>
                        <SelectTrigger className="!h-12 w-full min-w-56 md:w-auto rounded-lg border-gray-300 bg-white px-4 py-0 hover:border-gray-400 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-cyan-400">
                            <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)] min-w-56">
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        {categories.map((category) =>
                            <SelectItem key={category.idCategoria} value={String(category.idCategoria)}>
                                {category.nombre}
                            </SelectItem>
                        )}
                        </SelectContent>
                    </Select>
                </div>

                {loading ? <ArticleCardsSkeleton count={12} /> : null}
                {error && !loading ? <PublicError message={error} onRetry={loadNews} /> : null}
                {!loading && !error ? (
                    filteredArticles.length ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredArticles.map((article, index) => (
                                    <motion.div
                                        key={article.idNoticia}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <Link to={`/news/${article.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md">
                                            <div className="relative h-48 overflow-hidden bg-slate-200">
                                                {article.imagen ?
                                                    <img src={getImageUrl(article.imagen)} alt={article.titulo} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                                    :
                                                    null
                                                }
                                                <span className="absolute left-0 top-4 bg-[#1699BC] px-2.5 py-1 text-sm font-semibold text-white">
                                                    {article.nombreCategoria || "Noticias"}
                                                </span>
                                            </div>
                                            <div className="flex flex-1 flex-col gap-4 p-4">
                                                <div className="flex-1">
                                                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800">
                                                        {article.titulo}
                                                    </h3>
                                                    <p className="line-clamp-3 text-sm text-gray-600">
                                                        {article.descripcion}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(article.fechaPublicacion)}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            {totalPages > 1
                                ? <div className="flex justify-center gap-2">
                                    {Array.from({ length: totalPages }, (_, pageNumber) =>
                                        <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} className={`cursor-pointer size-10 rounded-full text-sm font-semibold ${page === pageNumber ? "bg-cyan-500 text-white" : "border border-slate-200 text-slate-600"}`}>
                                            {pageNumber + 1}
                                        </button>
                                    )}
                                </div>
                                : null
                            }
                        </>
                    ) : <div className="py-12 text-center text-gray-500">
                        No se encontraron noticias con esos criterios.
                    </div>
                ) : null}
            </div>
        </section>
    );
}
