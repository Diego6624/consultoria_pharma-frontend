import { motion } from "framer-motion";

const VisionMision = () => {
    return (
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44">
            <div className="grid md:grid-cols-2 gap-6">

                {/* MISION */}
                <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-lg
                                bg-[url(/images/visionMision.png)] bg-cover bg-center
                                flex items-center gap-4 p-6 min-h-48"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <img
                        src="/images/diana.png"
                        alt="diana"
                        className=" w-20 h-20 object-contain shrink-0"
                    />
                    <div className="relative z-10 flex gap-3 flex-col text-white">
                        <h3 className="text-2xl font-bold">Misión</h3>
                        <p className="text-md leading-relaxed">
                            Brindar soluciones regulatorias integrales que permitan a nuestros clientes
                            operar con excelencia, ética y cumplimiento total ante DIGEMID y otras entidades de salud.
                        </p>
                    </div>
                </motion.div>

                {/* VISION */}
                <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-lg
                                bg-[url(/images/visionMision.png)] bg-cover bg-center
                                flex items-center gap-4 p-6 min-h-48"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <img
                        src="/images/eye.png"
                        alt="eye"
                        className="relative z-10 w-20 h-20 object-contain shrink-0"
                    />
                    <div className="relative z-10 flex flex-col gap-3 text-white">
                        <h3 className="text-2xl font-bold">Visión</h3>
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