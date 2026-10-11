import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { obtenerServicioPublico } from "@/services/serviciosService";
import { getImageUrl, sanitizeHtml } from "@/lib/content";
import PublicBannerImage from "@/components/PublicBannerImage";
import PublicDetailSkeleton from "@/components/PublicDetailSkeleton";
import SeoHead from "@/components/SeoHead";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    obtenerServicioPublico(slug)
      .then((data) => active && setService(data))
      .catch((loadError) => active && setError(loadError.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [slug]);

  if (loading) return <PublicDetailSkeleton withSidebar />;
  if (!service || error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Servicio no encontrado</h1>
        <p className="mb-8 text-gray-600">{error || "El servicio que buscas no existe."}</p>
        <button
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a servicios
        </button>
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title={`${service.titulo} | Consultoría YL Pharma`}
        description={service.descripcion || "Servicios de consultoría y asesoría farmacéutica."}
        image={service.imagen ? getImageUrl(service.imagen) : "/images/imageServices.webp"}
        type="article"
      />
      <div className="min-h-screen bg-white">

        {/* HERO — igual que BannerMain */}
        <section className="relative w-full h-svh overflow-hidden">

          <PublicBannerImage
            src={service.imagen ? getImageUrl(service.imagen) : "/images/imageServices.webp"}
            alt={service.titulo}
          />

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
                {service.nombreCategoria || "Servicio"}
              </span>

              {/* Título */}
              <div className="flex flex-col font-bold text-white gap-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-sm md:max-w-4xl py-2 md:py-0">
                <p className="leading-tight">{service.titulo}</p>
              </div>

              {/* Descripción */}
              <div className="text-white max-w-sm md:max-w-2xl text-lg md:text-xl lg:text-2xl py-2 md:py-0">
                <p>{service.descripcion}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contenido + Sidebar */}
        <div className="px-8 md:px-16 lg:px-32 2xl:px-44 py-6 md:py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {/* Columna principal */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Descripcion servicio + Linea divisora */}
              <div className="flex flex-col gap-2 md:gap-4">
                <Link to="/services" className="flex md:hidden items-center gap-2 font-semibold text-gray-400 hover:text-cyan-700 text-sm py-4">
                  <ArrowLeft size={18} />
                  Volver a servicios
                </Link>
                <div className="flex justify-between items-center w-full">
                  <div className="text-xl md:text-4xl font-bold">Descripción del servicio</div>
                  <Link to="/services" className="hidden md:inline-flex items-center gap-2 font-semibold text-gray-400 hover:text-cyan-700 text-sm">
                    <ArrowLeft size={18} />
                    Volver a servicios
                  </Link>
                </div>
                <div className="h-1 w-20 rounded-full bg-cyan-400 mb-8" />
              </div>

              {/* Contenido */}
              <div className="prose prose-slate mb-12 max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.contenido) }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-8 sticky top-32 shadow-sm border-gray-400/40 border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  ¿Necesitas más información?
                </h3>
                <p className="text-gray-600 mb-6">
                  Contacta con nuestro equipo para una consultoría personalizada.
                </p>
                <Link to="/consultation" className="w-full h-full">
                  <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer">
                    Contáctanos
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailPage;
