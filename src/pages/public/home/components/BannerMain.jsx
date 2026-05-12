import AnimateBoton from "@/components/AnimateBoton";
import { ChevronRight } from "lucide-react";

const BannerMain = () => {

    const divStyle = {
        width: '100%',
        height: '100dvh',
        backgroundImage: 'url(images/imageHome.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (
        <div className="relative w-full h-dvh" style={divStyle}>

            {/* 🔥 CAPA DE SOMBRA / GRADIENTE */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/10 to-transparent"></div>

            {/* CONTENIDO */}
            <div className="relative flex items-center w-full h-full">
                <div className="flex flex-col justify-center px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-6">

                    {/* Message */}
                    <div className="flex flex-col font-bold text-white text-4xl md:text-6xl lg:text-7xl gap-2">
                        <p>Tu Negocio</p>
                        <p className="text-[#0DB3DE]">Farmacéutico</p>
                        <p>en Regla</p>
                    </div>

                    {/* Description */}
                    <div className="flex text-white text-lg md:text-xl lg:text-2xl max-w-xl">
                        <p>
                            Gestionamos tus permisos y registros sanitarios para que operes
                            sin riesgos ni multas.
                        </p>
                    </div>

                    {/* Button */}
                    <AnimateBoton
                        name="Ver servicios"
                        bg=""
                        icon={
                            <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        }
                        bgIcon=""
                        navigate="/services"
                    />

                </div>
            </div>
        </div>
    )
}

export default BannerMain;