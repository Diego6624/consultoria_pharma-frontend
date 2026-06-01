import ArticleCard from "@/components/ArticleCard";
import { motion } from "framer-motion";
import imageRegulatory from "/public/images/imageRegulatory.png";
import imageRegulatory2 from "/public/images/imageRegulatory2.png";
import imageRegulatory3 from "/public/images/imageRegulatory3.png";
import imageRegulatory4 from "/public/images/imageRegulatory4.png";
import imageRegulatory5 from "/public/images/imageRegulatory5.png";
import imageRegulatory6 from "/public/images/imageRegulatory6.png";

const articles = [
  {
    id: 1,
    title: "Nuevos Decretos",
    subtitle: "Conoce los últimos cambios en reglamentos.",
    image: imageRegulatory,
    span: "col-span-12 md:col-span-3",
    navigate: "/",
  },
  {
    id: 2,
    title: "Auditorías BPA",
    subtitle: "Prepara tu almacén para la inspección.",
    image: imageRegulatory2,
    span: "col-span-12 md:col-span-4",
    navigate: "/",
  },
  {
    id: 3,
    title: "Registros Sanitarios",
    subtitle: "Guía rápida para inscribir tus productos.",
    image: imageRegulatory3,
    span: "col-span-12 md:col-span-5",
    navigate: "/",
  },
  {
    id: 4,
    title: "Farmacovigilancia",
    subtitle: "Cómo reportar reacciones adversas correctamente.",
    image: imageRegulatory4,
    span: "col-span-12 md:col-span-6",
    navigate: "/",
  },
  {
    id: 5,
    title: "Farmacia Digital",
    subtitle: "El futuro de la gestión farmacéutica.",
    image: imageRegulatory5,
    span: "col-span-12 md:col-span-3",
    navigate: "/",
  },
  {
    id: 6,
    title: "Evita Multas",
    subtitle: "Errores comunes que causan sanciones.",
    image: imageRegulatory6,
    span: "col-span-12 md:col-span-3",
    navigate: "/",
  },
];

const RegulatoryCurrent = () => {
  return (
    <section className="py-14 px-8 md:px-16 lg:px-32 2xl:px-44 bg-gray-100">

      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <h2 className="font-bold text-3xl text-gray-900 text-center">
          Actualidad Regulatoria
        </h2>
        <p className="text-lg text-gray-600 text-center">
          Mantente informado sobre las últimas normativas, cambios en DIGEMID y
          tendencias del sector salud.
        </p>
      </div>

      {/* GRID tipo figma */}
      <div className="grid grid-cols-12 auto-rows-[300px] gap-4">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            className={article.span}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (index % 6) * 0.12, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <ArticleCard {...article} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RegulatoryCurrent;