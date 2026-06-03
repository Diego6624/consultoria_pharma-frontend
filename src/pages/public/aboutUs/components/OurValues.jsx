import { motion } from "framer-motion";

const OurValues = () => {
    const values = [
        {
            title: "Integridad",
            description: "Garantizamos una transparencia absoluta en cada gestión regulatoria."
        },
        {
            title: "Excelencia",
            description: "Buscamos la máxima perfección técnica sin tolerar errores."
        },
        {
            title: "Agilidad",
            description: "Optimizamos cada proceso para entregarte resultados rápidos siempre."
        },
        {
            title: "Compromiso",
            description: "Asumimos los objetivos de tu empresa como nuestros."
        }
    ];

    return (
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="w-full h-full flex justify-center">
                    <div className="relative w-full max-w-lg">

                        {/* CÍRCULO CELESTE (ATRÁS) */}
                        <div className="absolute bottom-0 md:bottom-0 left-0 md:left-0 w-20 h-20 bg-[#A5E4F4] rounded-full z-0"></div>

                        {/* IMAGEN */}
                        <img
                            src="/images/imageUs3.png"
                            alt="image"
                            className="relative z-10 w-full h-full md:h-[450px] object-cover shadow-lg bg-center
                                [border-top-right-radius:150px]
                                [border-bottom-left-radius:150px]"
                        />

                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                    {/* Título */}
                    <h2 className="text-4xl font-bold text-gray-900">Nuestros Valores</h2>

                    {/* Lista de Valores */}
                    <div className="flex flex-col gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="flex gap-4 items-center group"
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                {/* Borde izquierdo azul */}
                                <div className="w-1 bg-[#0DB3DE] transition duration-400 group-hover:bg-[#1F4C7F] rounded-full shrink-0" style={{ minHeight: '70px' }}></div>

                                {/* Contenido del valor */}
                                <div className="flex flex-col gap-1 group-hover:-translate-x-2 transition-transform duration-400">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {value.title}
                                    </h3>
                                    <p className="text-base text-gray-700">
                                        {value.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default OurValues;