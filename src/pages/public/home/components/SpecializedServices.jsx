import ServiceCard from "@/components/ServiceCard";
import { FileCheckCorner, InfoIcon, KeyRound, ShieldCheck } from "lucide-react";
import imageCard from '/public/images/imageCards.jpg';
import imageCard2 from '/public/images/imageCards2.jpg';
import imageCard3 from '/public/images/imageCards3.jpg';

const services = [
    {
        category: "Regulatorio",
        title: "Registro Sanitario y Trámites DIGEMID",
        description:
            "Gestionamos la inscripción y cambios en tus registros de productos farmacéuticos, asegurando cero rechazos y agilidad en el trámite.",
        icon: <FileCheckCorner />,
        image: imageCard,
        navigation: "/services"
    },
    {
        category: "Calidad",
        title: "Certificaciones BPA, BPM y BPDT",
        description:
            "Preparamos tu droguería o almacén para superar las inspecciones. Implementamos Manuales de Calidad y POEs para garantizar tu certificación a la primera.",
        icon: <ShieldCheck />,
        image: imageCard2,
        navigation: "/services"
    },
    {
        category: "Gestión",
        title: "Autorización de Funcionamiento",
        description:
            "Asesoría integral para la apertura de tu establecimiento. Desde el diseño del plano del almacén hasta la obtención final de la Resolución Directoral.",
        icon: <KeyRound />,
        image: imageCard3,
        navigation: "/services"
    },
];

const SpecializedServices = () => {
    return (
        <section className="w-full">

            {/* Tittle | Description */}
            <div className="relative bg-[#2F5D93] pt-16 pb-32 overflow-hidden">
                <div className="w-auto mx-50 px-6 sm:px-8 lg:px-12 grid gap-8 lg:grid-cols-2 lg:items-center">

                    <h2 className="font-semibold text-3xl leading-tight text-white w-min">
                        Nuestros Servicios Especializados
                    </h2>

                    <div className="relative max-w-2xl pl-6 flex items-center w-full">
                        <span className="absolute left-0 h-[70%] w-1 rounded-full bg-sky-300" />
                        <p className="text-lg leading-7 text-white/95 sm:text-xl">
                            Simplificamos la burocracia técnica y legal. Desde la obtención
                            de registros sanitarios hasta la certificación de almacenes,
                            nos encargamos de que tu empresa cumpla con DIGEMID sin detener
                            su operación comercial.
                        </p>
                    </div>

                </div>

                {/* Borde */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg
                        viewBox="0 0 0 0"
                        className="w-full h-[150px]"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,40 C360,120 1080,0 1440,80 L1440,120 L0,120 Z"
                            className="fill-white"
                        />
                    </svg>
                </div>
            </div>

            {/* CARDS */}
            <div className="bg-white -mt-24 pt-10 pb-20">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <ServiceCard key={index}
                                category={service.category}
                                title={service.title}
                                description={service.description}
                                icon={service.icon}
                                image={service.image}
                                navigation={service.navigation}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default SpecializedServices;