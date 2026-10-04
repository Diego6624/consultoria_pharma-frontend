import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ArticleCard = ({ title, subtitle, image, navigate: target }) => {
  return (
    <Link
      to={target}
      className="relative w-full h-full overflow-hidden group rounded-2xl block"
    >
      {/* Imagen */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

      {/* Borde */}
      <div className="absolute inset-0 rounded-2xl border border-white/20 transition-all duration-300 pointer-events-none" />

      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none shadow-[inset_0_0_0_1px_rgba(34,211,238,0.6),0_0_25px_rgba(34,211,238,0.3)]" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6">

        {/* Texto */}
        <div className="flex flex-col gap-1">
          <p className="line-clamp-2 text-white font-bold text-lg leading-snug">
            {title}
          </p>
          <p className="line-clamp-3 text-white text-md leading-snug max-w-xs">
            {subtitle}
          </p>
        </div>

        {/* Botón flecha */}
        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-cyan-400 group-hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center">

          {/* Flecha que sale */}
          <ArrowUpRight
            size={20}
            className="absolute text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                       group-hover:translate-x-6 group-hover:-translate-y-6
                       group-hover:opacity-0"
          />

          {/* Flecha que entra */}
          <ArrowUpRight
            size={20}
            className="absolute text-black transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                       -translate-x-6 translate-y-6 opacity-0
                       group-hover:translate-x-0 group-hover:translate-y-0
                       group-hover:opacity-100"
          />
        </div>

      </div>
    </Link>
  );
};

export default ArticleCard;
