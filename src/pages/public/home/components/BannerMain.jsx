import AnimateBoton from "@/components/AnimateBoton";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const BannerMain = () => {
    return (
        <section className="relative w-full h-full md:h-svh overflow-hidden">
            {/* Imagen como elemento, no background-image */}
            <img
                src="/images/imageHome.jpg"
                alt=""
                className="absolute inset-0 w-min md:w-full h-full object-cover object-center"
            />

            {/* Gradiente overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 md:via-black/10 md:to-transparent"></div>

            {/* Contenido */}
            <motion.div
                className="relative flex items-end md:items-center w-full h-full pb-6 sm:pb-16 md:pb-0 pt-24 md:pt-0"
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-4 md:gap-6">

                    <div className="flex flex-col font-bold text-white gap-1
                                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                                    max-w-[280px] sm:max-w-sm md:max-w-none md:pt-15">
                        <p className="w-min">
                            Tu Negocio{" "}
                            <span className="text-[#0DB3DE]">Farmacéutico</span>{" "}
                            en Regla
                        </p>
                    </div>

                    <div className="text-white max-w-[280px] sm:max-w-sm md:max-w-xl
                                    text-base sm:text-lg md:text-xl lg:text-2xl">
                        <p>
                            Gestionamos tus permisos y registros sanitarios para que
                            operes sin riesgos ni multas.
                        </p>
                    </div>

                    <div className="w-fit">
                        <AnimateBoton
                            bg=""
                            bgIcon="#0DB3DE"
                            name="Ver servicio"
                            textColor="#FFFFFF"
                            textHover="#FFFFFF"
                            icon={<ChevronRight />}
                            iconColor="#FFFFFF"
                            navigate="/services"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default BannerMain;