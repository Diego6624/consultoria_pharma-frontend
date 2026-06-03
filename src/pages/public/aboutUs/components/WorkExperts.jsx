import AnimateBoton from "@/components/AnimateBoton";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { motion } from "framer-motion";

const WorkExperts = () => {
    const divStyle = {
        width: '100%',
        height: '90vh',
        backgroundImage: 'url(images/imageUs4.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (<>
        <section>
            <motion.div
                className="relative w-full h-max"
                style={divStyle}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* CAPA DE SOMBRA / GRADIENTE */}
                <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent"></div>

                {/* CONTENIDO */}
                <div className="relative flex items-center justify-center w-full h-full md:pt-15">
                    <div className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-6">

                        {/* Message */}
                        <div className="flex items-center justify-center gap-2">
                            <p className="font-bold text-white text-3xl md:text-4xl">¿Listo para trabajar con expertos?</p>
                        </div>

                        {/* Description */}
                        <div className="flex text-white text-xl">
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
                            textSize="text-md md:text-lg"
                            textHover="#FFFFFF"
                            icon={<LocalPhoneIcon />}
                            iconColor="#FFFFFF"
                            navigate="/consultation"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    </>);

}

export default WorkExperts;