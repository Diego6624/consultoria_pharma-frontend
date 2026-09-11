import { useEffect, useState } from "react";
import BannerMain from "./components/BannerMain";
import SearchServices from "./components/SearchServices";
import ServicesList from "@/components/ServicesList";
import { listarServiciosPublicos } from "@/services/serviciosService";
import { PublicError, PublicLoading } from "@/components/PublicLoading";

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadServices = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await listarServiciosPublicos({ page, size: 6 });
      setServices((data?.content || []).map((service) => ({
        id: service.idServicio,
        category: service.nombreCategoria || "Servicio",
        title: service.titulo,
        description: service.descripcion,
        content: service.contenido,
        image: service.imagen,
      })));
      setTotalPages(data?.totalPages || 0);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [page]);

  const categories = [...new Set(services.map((service) => service.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(0);
  };

  return (
    <>
      <BannerMain />
      <div className="py-12 flex flex-col gap-12">
        <SearchServices
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />
        {isLoading ? <PublicLoading label="Cargando servicios..." /> : null}
        {error && !isLoading ? <PublicError message={error} onRetry={loadServices} /> : null}
        {!isLoading && !error ? (
          <>
            <ServicesList services={services} searchTerm={searchTerm} selectedCategory={selectedCategory} />
            {totalPages > 1 ? (
              <div className="flex justify-center gap-2 px-6">
                {Array.from({ length: totalPages }, (_, pageNumber) => (
                  <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} className={`size-10 rounded-full text-sm font-semibold ${page === pageNumber ? "bg-cyan-500 text-white" : "border border-slate-200 text-slate-600 hover:border-cyan-400"}`}>
                    {pageNumber + 1}
                  </button>
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default ServicesPage;

