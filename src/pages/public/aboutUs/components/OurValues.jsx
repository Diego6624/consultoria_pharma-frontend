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
        <section className="overflow-hidden p-15 px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text Responsive */}
                <motion.div
                        className="text-3xl font-bold text-gray-900 md:hidden flex justify-center"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.2 }}
                >
                        Nuestros Valores
                </motion.div>
                
                {/* Image */}
                <motion.div
                    className="w-full h-full flex justify-center"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="relative w-full max-w-lg">

                        {/* CÍRCULO CELESTE (ATRÁS) */}
                        <div className="absolute bottom-0 md:bottom-0 left-0 md:left-0 w-20 h-20 bg-[#A5E4F4] rounded-full z-0"></div>

                        {/* IMAGEN */}
                        <img
                            src="/images/imageUs3.webp"
                            alt="Profesional farmacéutica asesorando a un cliente"
                            className="relative z-10 w-full h-full md:h-[450px] object-cover shadow-lg bg-center
                                md:[border-top-right-radius:150px] [border-top-right-radius:100px]
                                md:[border-bottom-left-radius:150px] [border-bottom-left-radius:100px]"
                        />

                    </div>
                </motion.div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                    {/* Título */}
                    <motion.div
                        className="text-4xl font-bold text-gray-900 md:flex hidden"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        Nuestros Valores
                    </motion.div>

                    {/* Lista de Valores */}
                    <div className="flex flex-col gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="flex gap-4 items-center group cursor-default"
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.12, ease: 'easeOut' }}
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
