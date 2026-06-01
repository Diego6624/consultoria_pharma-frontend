import { Check, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const ServicesCard = ({
  id,
  category,
  title,
  description,
  features = [],
  image,
  categoryBadgeColor = "#0DB3DE"
}) => {

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


  return (
    <motion.article
      className="relative w-full flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-md md:shadow-none"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >

      {/* IMAGEN */}
      <div className="
        w-full 
        lg:w-1/2 
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
        lg:w-1/2 
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

        <button
          onClick={handleNavigate}
          className="group relative mt-4 inline-flex items-center gap-2 rounded-full max-w-min py-2 text-sm font-semibold text-gray-600 hover:text-black transition-all overflow-hidden cursor-pointer"
        >

          {/* CONTENIDO */}
          <span className="flex items-center gap-2 w-max">
            Ver detalle
            <ArrowRight
              size={16}
              className="transition-all group-hover:translate-x-0.5"
            />
          </span>

          {/* LÍNEA ANIMADA */}
          <span className="
            absolute 
            left-1/2 bottom-0
            h-[2px] w-0 
            bg-current
            transition-all duration-300 ease-out
            group-hover:w-full 
            group-hover:left-0
          " />
        </button>
      </div>
    </motion.article>
  );
};

export default ServicesCard;

