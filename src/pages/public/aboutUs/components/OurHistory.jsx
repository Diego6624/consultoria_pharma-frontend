import AnimateBoton from "@/components/AnimateBoton";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { motion } from "framer-motion";

const OurHistory = () => {
    return (<>
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44 gap-6">
            <div className="items-center justify-center w-full h-full grid md:grid-cols-2 gap-8 md:gap-4 md:px-20">
                {/* Content */}
                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Tittle | Description*/}
                    <div className="flex flex-col gap-6 mx-auto w-full h-full">
                        <p className="font-semibold text-3xl text-center md:text-start">
                            Nuestra Historia
                        </p>
                        <div className="flex flex-col gap-2 text-md md:text-xl text-center">
                            <p >
                                Fundada con la visión de simplificar el complejo entorno regulatorio peruano, Consultoría YL Pharma nació para cerrar la brecha entre la normativa técnica y la gestión comercial.
                            </p>
                            <p>
                                Con más de 8 años de experiencia acumulada, hemos ayudado a decenas de empresas a iniciar y mantener sus operaciones sin riesgos legales.
                            </p>
                        </div>
                        <div className="md:flex hidden">
                            <AnimateBoton
                                bg="#FFFFFF"
                                bgShadow="0px 2px 6px #D1D1D1"
                                bgIcon="#0DB3DE"
                                name="Contáctanos"
                                textColor="#000000"
                                textHover="#FFFFFF"
                                icon={<LocalPhoneIcon />}
                                iconColor="#FFFFFF"
                                navigate="/consultation"
                            />
                        </div>

                    </div>
                </motion.div>
                {/* Image */}
                <motion.div
                    className="w-full h-full flex justify-center"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="relative w-full max-w-lg">

                        {/* CÍRCULO CELESTE (ATRÁS) */}
                        <div className="absolute top-0 md:top-0 right-0 md:right-0 w-20 h-20 bg-[#A5E4F4] rounded-full z-0"></div>

                        {/* IMAGEN */}
                        <img
                            src="/images/imageUs2.jpg"
                            alt="image"
                            className="relative z-10 w-full h-full md:h-[450px] object-cover shadow-lg
                                md:[border-top-right-radius:150px] [border-top-right-radius:100px]
                                md:[border-bottom-left-radius:150px] [border-bottom-left-radius:100px]"
                        />

                    </div>
                </motion.div>
            </div>
        </section>
    </>);
};

export default OurHistory;