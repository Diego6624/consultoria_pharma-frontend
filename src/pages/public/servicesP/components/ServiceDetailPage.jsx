import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { obtenerServicioPublico } from "@/services/serviciosService";
import { getImageUrl, sanitizeHtml } from "@/lib/content";
import { PublicError, PublicLoading } from "@/components/PublicLoading";

const ServiceDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    obtenerServicioPublico(id)
      .then((data) => active && setService(data))
      .catch((loadError) => active && setError(loadError.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  if (loading) return <PublicLoading label="Cargando servicio..." />;
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
    <div className="min-h-screen bg-white">
      {/* Header con botón volver */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-8 md:px-16 lg:px-32 2xl:px-44 py-4">
        <button
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-500 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a servicios
        </button>
      </div>

      {/* Contenido principal */}
      <div className="px-8 md:px-16 lg:px-32 2xl:px-44 py-12">
        {/* Hero section con imagen */}
        <div className="mb-12">
          <img
            src={getImageUrl(service.imagen)}
            alt={service.titulo}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Columna principal */}
          <div className="lg:col-span-2">
            {/* Badge de categoría */}
            <div className="mb-6">
                <span className="inline-block rounded-full bg-cyan-500 px-4 py-2 font-semibold text-white">
                {service.nombreCategoria || "Servicio"}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {service.titulo}
            </h1>

            {/* Línea divisora */}
            <div className="h-1 w-20 rounded-full bg-cyan-400 mb-8" />

            {/* Descripción principal */}
            <p className="text-xl leading-8 text-gray-700 mb-12">
              {service.descripcion}
            </p>
            <div className="prose prose-slate mb-12 max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.contenido) }} />

            {/* CTA */}
            <div className="mb-12">
              <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors">
                Solicitar consultoría
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Box de contacto */}
            <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ¿Necesitas más información?
              </h3>
              <p className="text-gray-600 mb-6">
                Contacta con nuestro equipo para una consultoría personalizada.
              </p>
              <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                Contáctanos
              </button>
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-gray-200 pt-12">
          <Link to="/consultation" className="inline-flex rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-cyan-600">Solicitar consultoría</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
