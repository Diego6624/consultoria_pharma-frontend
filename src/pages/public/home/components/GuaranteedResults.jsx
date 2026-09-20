import AnimateBoton from "@/components/AnimateBoton";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { motion } from "framer-motion";

const stats = [
    { label: "Experiencia", value: "+8 años sector" },
    { label: "Clientes", value: "+500 atendidos" },
    { label: "Éxito", value: "99% aprobados" },
    { label: "Soporte", value: "24/7 disponible" },
];

const GuaranteedResults = () => {
    return (<>
        {/* overflow-hidden aquí corta el desborde del x: 40 durante la animación */}
        <section className="overflow-hidden bg-[#1F4C7F] px-6 py-10 sm:px-10 md:px-16 md:py-16 lg:px-32 xl:px-48 2xl:px-64">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white">

                {/* Imagen */}
                <motion.div
                    className="w-full flex items-center justify-center"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="relative w-full max-w-sm md:max-w-none">
                        <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4
                                        w-full h-full rounded-lg bg-[#0DB3DE] z-0" />
                        <img
                            src="/images/imageResult.jpg"
                            alt="Resultados garantizados"
                            className="relative w-full h-52 sm:h-64 md:h-[420px] lg:h-[500px]
                                       object-cover rounded-lg shadow-md z-10"
                        />
                    </div>
                </motion.div>

                {/* Contenido */}
                <motion.div
                    className="flex flex-col gap-6 w-full"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-2xl md:text-3xl leading-tight">
                            Resultados garantizados
                        </p>
                        <p className="text-sm md:text-base lg:text-xl text-white/80">
                            Brindamos seguridad jurídica y técnica a tu establecimiento
                            farmacéutico. Nuestro equipo gestiona cada requerimiento con
                            precisión absoluta para evitar observaciones de la autoridad y
                            asegurar la continuidad operativa de tu negocio sin contratiempos
                            legales.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
                        {stats.map(({ label, value }, i) => (
                            <div key={i}
                                className="flex flex-col gap-1 bg-white/10 rounded-xl p-3 md:p-1 md:bg-transparent md:rounded-none">
                                <p className="font-semibold text-sm md:text-base lg:text-lg">{label}</p>
                                <p className="text-xs md:text-sm lg:text-base text-white/70">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <AnimateBoton
                            bg="#FFFFFF"
                            bgIcon="#0DB3DE"
                            name="Contáctanos"
                            textColor="#000000"
                            textHover="#FFFFFF"
                            icon={<LocalPhoneIcon />}
                            iconColor="#FFFFFF"
                            navigate="/consultation"
                            textSize="text-md"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    </>);
};

export default GuaranteedResults;
