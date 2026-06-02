import AnimateBoton from "@/components/AnimateBoton";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { motion } from "framer-motion";

const PersonalizedAdvice = () => {
    const divStyle = {
        width: '100%',
        height: '90vh',
        backgroundImage: 'url(images/imageHome3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (<>
        <section>
            <motion.div
                className="relative w-full h-max"
                style={divStyle}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* CAPA DE SOMBRA / GRADIENTE */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/10 md:to-transparent"></div>

                {/* CONTENIDO */}
                <div className="relative flex items-center justify-center w-full h-full md:pt-15">
                    <div className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-4 md:gap-6">

                        {/* Message */}
                        <div className="flex items-center justify-center gap-2">
                            <p className="font-bold text-white text-3xl md:text-4xl">¿Necesitas asesoría personalizada?</p>
                        </div>

                        {/* Description */}
                        <div className="flex text-white text-lg">
                            <p>
                                Soluciones rápidas para tu negocio farmacéutico.
                            </p>
                        </div>

                        {/* Button */}
                        <AnimateBoton
                            bg="#FFFFFF"
                            bgIcon="#0DB3DE"
                            name="Contáctanos"
                            textColor="#000000"
                            textSize="text-md"
                            textHover="#FFFFFF"
                            icon={<LocalPhoneIcon />}
                            iconColor="#FFFFFF"
                            navigate="/contact"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    </>)
};

export default PersonalizedAdvice;