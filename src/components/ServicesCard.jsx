import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesCard = ({
  id,
  category,
  title,
  description,
  features = [],
  image,
  categoryBadgeColor = "bg-cyan-400"
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/services/${id}`);
  };

  // Mapeo de colores por categoría
  const getCategoryColor = () => {
    const colors = {
      'Regulatorio': 'bg-teal-600',
      'Calidad': 'bg-cyan-400',
      'Gestión': 'bg-purple-600'
    };
    return colors[category] || categoryBadgeColor;
  };

  return (
    <article className="group relative w-full h-full flex flex-col cursor-pointer" onClick={handleNavigate}>
      {/* Imagen superior */}
      <div className="h-48 md:h-56 overflow-hidden rounded-t-2xl transition-transform duration-400 group-hover:scale-105">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Badge de categoría */}
      <div className={`absolute top-4 left-4 ${getCategoryColor()} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
        {category}
      </div>

      {/* Card con contenido */}
      <div className="flex-1 rounded-b-2xl border-t-0 border border-gray-200 bg-white px-6 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-400 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex flex-col gap-4">
        
        {/* Título */}
        <h3 className="text-xl font-bold leading-tight text-gray-900">
          {title}
        </h3>

        {/* Línea divisora */}
        <div className="h-1 w-12 rounded-full bg-cyan-400" />

        {/* Descripción */}
        <p className="text-sm leading-6 text-gray-600 flex-grow">
          {description}
        </p>

        {/* Features list */}
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <Check size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Botón Ver detalle */}
        <button
          onClick={handleNavigate}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-cyan-500 group-hover:translate-x-1"
        >
          Ver detalle
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
};

export default ServicesCard;

