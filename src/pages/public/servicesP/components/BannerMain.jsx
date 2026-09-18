import { motion } from "framer-motion";
import PublicBannerImage from "@/components/PublicBannerImage";

const BannerMain = () => {
    return (
        <section className="relative w-full h-svh overflow-hidden">

            {/* Imagen — entra de derecha a izquierda */}
            <PublicBannerImage
                src="/images/imageServices.jpg"
                imageClassName="object-[52%_center] md:object-center"
            />

            {/* Gradiente overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 md:via-black/10 md:to-transparent" />

            {/* Contenido — entra de izquierda a derecha */}
            <motion.div
                className="relative flex md:items-center w-full h-full pb-6 sm:pb-16 md:pb-0 pt-24 md:pt-0"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className="flex flex-col justify-center md:items-start px-6 sm:px-10 md:px-16 lg:px-32 xl:px-48 2xl:px-64 md:gap-6">

                    <div className="flex flex-col font-bold text-white gap-1
                                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                                    max-w-sm md:max-w-xl py-2 md:py-0">
                        <p className="leading-tight">
                            Nuestros{" "}
                            <span className="text-[#0DB3DE]">Servicios</span>{" "}
                            Especializados
                        </p>
                    </div>

                    <div className="text-white max-w-sm md:max-w-2xl
                                    text-lg md:text-xl lg:text-2xl py-2 md:py-0">
                        <p>
                            Soluciones técnicas y legales a medida para asegurar el
                            éxito normativo de tu negocio farmacéutico.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default BannerMain;