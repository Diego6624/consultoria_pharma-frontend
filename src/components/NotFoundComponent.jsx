import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-[#EBEDEE] flex flex-col items-center justify-center px-6 text-center">

            {/* Número 404 grande */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <p className="text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter text-[#1F4C7F]/10 select-none">
                    404
                </p>
            </motion.div>

            {/* Contenido */}
            <motion.div
                className="flex flex-col items-center gap-4 -mt-8 sm:-mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
                {/* Badge */}
                <span className="text-xs font-semibold uppercase tracking-widest text-white bg-[#0DB3DE] px-4 py-1.5 rounded-full">
                    Página no encontrada
                </span>

                {/* Título */}
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1F4C7F] max-w-md leading-tight">
                    Esta página no existe o fue movida
                </h1>

                {/* Descripción */}
                <p className="text-slate-500 max-w-sm text-base">
                    La URL que ingresaste no corresponde a ninguna página de nuestro sitio. Verifica la dirección o regresa al inicio.
                </p>

                {/* Línea decorativa */}
                <div className="h-1 w-16 rounded-full bg-[#0DB3DE] my-2" />

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Link to="/">
                        <button className="flex items-center gap-2 bg-[#0DB3DE] hover:bg-[#52C7E5] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 cursor-pointer">
                            <Home size={18} />
                            Ir al inicio
                        </button>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 border-2 border-[#1F4C7F] text-[#1F4C7F] hover:bg-[#1F4C7F] hover:text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                        Volver atrás
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;