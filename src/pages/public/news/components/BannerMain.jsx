import { motion } from "framer-motion";

const BannerMain = () => {

    const divStyle = {
        width: '100%',
        height: '100svh',
        backgroundImage: 'url(images/imageNews.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (<>
        <section>
            <motion.div
                className="relative w-full h-svh"
                style={divStyle}
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* 🔥 CAPA DE SOMBRA / GRADIENTE */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/10 to-transparent"></div>

                {/* CONTENIDO */}
                <div className="relative flex items-center w-full h-full md:pt-15">
                    <div className="flex flex-col justify-center px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-6 w-full">

                        {/* Message */}
                        <div className="flex flex-col font-bold text-white text-4xl md:text-6xl lg:text-7xl gap-2 w-full md:max-w-xl">
                            <p>Ultimas <span className="text-[#0DB3DE]">Noticias </span>y actualidad</p>
                        </div>

                        {/* Description */}
                        <div className="flex text-white text-lg md:text-xl lg:text-2xl max-w-2xl">
                            <p>
                                Análisis, alertas y novedades sobre el entorno normativo farmacéutico en Perú.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    </>)
}

export default BannerMain;