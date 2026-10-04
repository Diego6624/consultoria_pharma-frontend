import { motion } from "framer-motion";

const VisionMision = () => {
    return (
        <section className="overflow-hidden px-4 py-10 md:p-15 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* MISION */}
                <motion.div
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg
                                bg-[url(/images/visionMision.webp)] bg-cover bg-center
                                flex flex-col md:flex-row items-center md:items-center
                                text-center md:text-left
                                gap-4 p-5 md:p-6 min-h-[220px] md:min-h-48 md:hover:-translate-y-2 md:transition-transform md:duration-300"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Icono */}
                    <img
                        src="/images/diana.webp"
                        alt="Icono de misión"
                        className="relative z-10 w-16 h-16 md:w-20 md:h-20 object-contain"
                    />

                    {/* Texto */}
                    <div className="relative z-10 flex flex-col gap-2 md:gap-3 text-white">
                        <h3 className="text-xl md:text-2xl font-bold">Misión</h3>
                        <p className="text-md leading-relaxed">
                            Brindar soluciones regulatorias integrales que permitan a nuestros clientes
                            operar con excelencia, ética y cumplimiento total ante DIGEMID y otras entidades de salud.
                        </p>
                    </div>
                </motion.div>

                {/* VISION */}
                <motion.div
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg
                                bg-[url(/images/visionMision.webp)] bg-cover bg-center
                                flex flex-col md:flex-row items-center
                                text-center md:text-left
                                gap-4 p-5 md:p-6 min-h-[220px] md:min-h-48 md:hover:-translate-y-2 md:transition-transform md:duration-300"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Icono */}
                    <img
                        src="/images/eye.webp"
                        alt="Icono de visión"
                        className="relative z-10 w-16 h-16 md:w-20 md:h-20 object-contain"
                    />

                    {/* Texto */}
                    <div className="relative z-10 flex flex-col gap-2 md:gap-3 text-white">
                        <h3 className="text-xl md:text-2xl font-bold">Visión</h3>
                        <p className="text-md leading-relaxed">
                            Ser la consultora referente en el sector farmacéutico peruano, reconocida por nuestra agilidad,
                            precisión técnica y compromiso inquebrantable con la salud pública.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default VisionMision;
