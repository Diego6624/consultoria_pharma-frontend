import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard =({
  category,
  title,
  description,
  icon,
  image,
  navigation,
}) => {
  return (
    <article className="group relative w-full">
      {/* Imagen superior */}
      <div className="h-auto md:h-[300px] overflow-hidden rounded-2xl transition-transform duration-400 group-hover:-translate-y-2">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card flotante */}
      <div className="relative -mt-20 mx-5 rounded-2xl border-1 border-gray-200 bg-white px-6 pb-6 pt-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-transform duration-400 group-hover:translate-y-2">
        {/* Icono flotante */}
        <div className="absolute -top-7 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#0DB3DE] text-white shadow-lg transition-transform duration-400 group-hover:-translate-y-8">
          {icon}
        </div>

        <span className="block text-[15px] text-gray-700">{category}</span>

        <h3 className="mt-1 text-[23px] font-bold leading-tight text-gray-900">
          {title}
        </h3>

        <div className="mt-3 h-1 w-12 rounded-full bg-[#0DB3DE]" />

        <p className="mt-4 text-md leading-6 text-gray-700">
          {description}
        </p>

        <Link
          to={navigation}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0DB3DE] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#079CC3]"
        >
          <CircleAlert />
          Ver servicio
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;