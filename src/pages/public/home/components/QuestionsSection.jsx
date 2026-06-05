import { Clock, FileText, TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

const QuestionsSection = () => {
    const items = [
        {
            icon: <TriangleAlert className="size-6 md:size-8" />,
            title: "¿Temes recibir multas inesperadas?",
            desc: "Evita sanciones económicas con nuestras auditorías preventivas antes de cualquier inspección.",
        },
        {
            icon: <Clock className="size-6 md:size-8" />,
            title: "¿Tus trámites demoran meses en salir?",
            desc: "Agilizamos tus expedientes evitando errores comunes que causan rechazos y demoras en DIGEMID.",
        },
        {
            icon: <FileText className="size-6 md:size-8" />,
            title: "¿Te abruman las actualizaciones de la norma?",
            desc: "Nosotros nos mantenemos al día por ti. Tu negocio siempre cumplirá con la normativa vigente.",
        },
    ];

    return (
        <section className="overflow-hidden py-10 md:py-16 px-6 sm:px-10 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-center">

                {/* Content — siempre primero en mobile */}
                <motion.div
                    className="flex flex-col gap-5 w-full"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-2xl md:text-3xl leading-tight">
                            ¿Te preocupa la complejidad regulatoria de la DIGEMID?
                        </p>
                        <p className="text-sm md:text-base lg:text-xl text-gray-600">
                            El sector farmacéutico es estricto. Un simple error administrativo
                            puede derivar en multas costosas o el cierre de tu negocio.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {items.map(({ icon, title, desc }, i) => (
                            <div key={i} className="flex items-start gap-3 w-full">
                                <div className="shrink-0 flex items-center justify-center
                                                p-2.5 md:p-3 rounded-full
                                                text-white bg-[#0DB3DE] hover:bg-[#1F4C7F]
                                                transition-colors duration-300 shadow-md">
                                    {icon}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <p className="font-semibold text-sm md:text-base lg:text-lg">{title}</p>
                                    <p className="text-sm md:text-base text-gray-600">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Imagen — debajo en mobile */}
                <motion.div
                    className="w-full flex items-center justify-center order-last md:order-none"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <img
                        src="/images/imageHome2.jpg"
                        alt="image"
                        className="w-full h-56 sm:h-72 md:h-[420px] lg:h-[500px]
                                   object-cover rounded-2xl md:rounded-b-full shadow-md"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default QuestionsSection;