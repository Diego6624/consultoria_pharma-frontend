import { ArrowUpRight } from "lucide-react";

const ArticleCard = ({ title, subtitle, image }) => (
  <div className="relative w-full h-full overflow-hidden group cursor-pointer">
    {/* Imagen de fondo */}
    {image ? (
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-500 to-slate-700" />
    )}
 
    {/* Overlay degradado oscuro solo en la parte superior */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
 
    {/* Contenido */}
    <div className="relative z-10 flex flex-col justify-between h-full p-5">
      {/* Texto arriba-izquierda */}
      <div className="flex flex-col gap-1">
        <p className="text-white font-bold text-[15px] leading-snug drop-shadow-sm">
          {title}
        </p>
        <p className="text-white/85 text-sm leading-snug max-w-[200px] drop-shadow-sm">
          {subtitle}
        </p>
      </div>
 
      {/* Botón flecha cian abajo-izquierda */}
      <div>
        <button className="w-9 h-9 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg">
          <ArrowUpRight />
        </button>
      </div>
    </div>
  </div>
);

export default ArticleCard;