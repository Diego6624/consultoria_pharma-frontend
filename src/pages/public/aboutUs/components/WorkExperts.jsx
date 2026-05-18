import AnimateBoton from "@/components/AnimateBoton";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

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
            <div className="relative w-full h-max" style={divStyle}>
                {/* CAPA DE SOMBRA / GRADIENTE */}
                <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent"></div>

                {/* CONTENIDO */}
                <div className="relative flex items-center justify-center w-full h-full md:pt-15">
                    <div className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-6">

                        {/* Message */}
                        <div className="flex items-center justify-center gap-2">
                            <p className="font-bold text-white text-4xl">¿Listo para trabajar con expertos?</p>
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
                            textHover="#FFFFFF"
                            icon={<LocalPhoneIcon />}
                            iconColor="#FFFFFF"
                            navigate="/contact"
                        />
                    </div>
                </div>
            </div>
        </section>
    </>);

}

export default WorkExperts;