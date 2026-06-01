import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

const ServiceDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Servicio no encontrado</h1>
        <p className="text-gray-600 mb-8">El servicio que buscas no existe.</p>
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

  const relatedServices = servicesData
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 2);

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
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Contenido */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Columna principal */}
          <div className="lg:col-span-2">
            {/* Badge de categoría */}
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold
                ${service.category === 'Regulatorio' ? 'bg-teal-600' : 
                  service.category === 'Calidad' ? 'bg-cyan-400' : 
                  'bg-purple-600'}
              `}>
                {service.category}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>

            {/* Línea divisora */}
            <div className="h-1 w-20 rounded-full bg-cyan-400 mb-8" />

            {/* Descripción principal */}
            <p className="text-xl leading-8 text-gray-700 mb-12">
              {service.description}
            </p>

            {/* Características */}
            {service.features && service.features.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Lo que incluye este servicio
                </h2>
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 text-lg text-gray-700">
                      <div className="flex-shrink-0 mt-1">
                        <Check size={24} className="text-cyan-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
        </motion.div>

        {/* Servicios relacionados */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Otros servicios en {service.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedServices.map((relatedService) => (
                <div
                  key={relatedService.id}
                  onClick={() => navigate(`/services/${relatedService.id}`)}
                  className="cursor-pointer group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={relatedService.image}
                    alt={relatedService.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-end p-4">
                    <h3 className="text-white font-bold text-lg">
                      {relatedService.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
