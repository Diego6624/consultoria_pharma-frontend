import { Check, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const ServicesCard = ({
  id,
  category,
  title,
  description,
  features = [],
  image,
  categoryBadgeColor = "#0DB3DE"
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/services/${id}`);
  };

  // Mapeo de colores por categoría
  const getCategoryColor = () => {
    const colors = {
      'Regulatorio': 'bg-[#003F45]',
      'Calidad': 'bg-[#0DB3DE]',
      'Gestión': 'bg-[#6B0086]'
    };
    return colors[category] || categoryBadgeColor;
  };
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <article className="relative w-full flex flex-col xl:flex-row overflow-hidden rounded-2xl shadow-md md:shadow-none">

      {/* IMAGEN */}
      <div className="
  w-full 
  xl:w-1/2 
  aspect-[4/3] md:aspect-square
  md:max-h-[100%]
  overflow-hidden
">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* BADGE */}
      <div className={`absolute top-4 left-4 ${getCategoryColor()} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
        {category}
      </div>

      {/* CONTENIDO */}
      <div className="
    w-full 
    xl:w-1/2 
    flex flex-col 
    justify-between
    bg-white 
    px-6 py-6
    border border-gray-200 md:border
    md:rounded-r-2xl
    gap-4
  ">

        {/* TOP CONTENT */}
        <div className="flex flex-col gap-4">

          <h3 className="text-xl font-bold text-gray-900">
            {title}
          </h3>

          <div className="h-1 w-12 rounded-full bg-cyan-400" />

          <p className="text-sm text-gray-600 leading-6">
            {description}
          </p>

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

        </div>

        {/* BUTTON */}
        <button
          onClick={handleNavigate}
          className=" group mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-cyan-500"
        >
          
          Ver detalle
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-all" />
          <motion.div
            className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#0DB3DE]"
            initial={false}
            animate={{
              scaleX: isActive ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              originX: 0.5
            }}
          />
        </button>

      </div>

    </article>
  );
};

export default ServicesCard;

