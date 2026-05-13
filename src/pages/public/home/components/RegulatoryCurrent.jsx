// Reemplaza el campo `image` de cada artículo con la ruta de tu imagen
// ej: "/images/nuevos-decretos.jpg" o import img from "./assets/img.jpg"

import ArticleCard from "@/components/ArticleCard";

const articles = [
  {
    id: 1,
    title: "Nuevos Decretos",
    subtitle: "Conoce los últimos cambios en reglamentos.",
    image: "", // 👈 tu imagen aquí
  },
  {
    id: 2,
    title: "Auditorías BPA",
    subtitle: "Prepara tu almacén para la inspección.",
    image: "", // 👈 tu imagen aquí
  },
  {
    id: 3,
    title: "Registros Sanitarios",
    subtitle: "Guía rápida para inscribir tus productos.",
    image: "", // 👈 tu imagen aquí
  },
  {
    id: 4,
    title: "Farmacovigilancia",
    subtitle: "Cómo reportar reacciones adversas correctamente.",
    image: "", // 👈 tu imagen aquí
  },
  {
    id: 5,
    title: "Farmacia Digital",
    subtitle: "El futuro de la gestión farmacéutica.",
    image: "", // 👈 tu imagen aquí
  },
  {
    id: 6,
    title: "Evita Multas",
    subtitle: "Errores comunes que causan sanciones.",
    image: "", // 👈 tu imagen aquí
  },
];
 
const RegulatoryCurrent = () => {
  return (
    <section className="py-14 px-8 md:px-16 lg:px-32 2xl:px-44">
 
      {/* Encabezado */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <h2 className="font-bold text-3xl text-gray-900 text-center">
          Actualidad Regulatoria
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Mantente informado sobre las últimas normativas, cambios en DIGEMID y
          tendencias del sector salud.
        </p>
      </div>
 
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-[2px]
          bg-gray-200
          rounded-2xl
          overflow-hidden
          shadow-lg
          h-auto lg:h-[520px]
        "
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
 
    </section>
  );
};

export default RegulatoryCurrent;