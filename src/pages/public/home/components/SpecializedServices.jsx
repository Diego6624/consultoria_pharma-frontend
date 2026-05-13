import ServiceCard from "@/components/ServiceCard";
import { InfoIcon } from "lucide-react";

const services = [
    {
        image: "/images/imageCards.jpg",
        category: "Servicio Especializado y Tramites DIGEMID",
        title: "Registro Sanitario",
        description: "Obtenga el registro sanitario para sus productos farmacéuticos de manera rápida y eficiente.",
        serviceLink: "/servicios/registro-sanitario",
        icon: <InfoIcon />
    }
];

const SpecializedServices = () => {
    return(<>
        <section className="p-15 bg-[#1F4C80]">
            <div className="px-20 w-full h-full flex flex-col gap-6 items-center justify-center">
                {/* Tittle */}
                <div className="flex text-white mx-auto w-full h-full gap-10 items-center justify-center divide-x-3 divide-[#91EBFF]">
                    <p className="font-semibold text-3xl">Nuestros servicios especializados</p>
                    
                    <p className="text-xl">Simplificamos la burocracia técnica y legal. Desde la obtención de registros sanitarios hasta la certificación de almacenes, nos 
                        encargamos de que tu empresa cumpla con DIGEMID sin detener su operación comercial.
                    </p>
                </div>
                {/* Cards */}
                <div className="flex ">
                    {services.map((service, i) => (
                        <ServiceCard
                            key={i}
                            image={service.image}
                            category={service.category}
                            title={service.title}
                            description={service.description}
                            serviceLink={service.serviceLink}
                            icon={service.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    </>);
};

export default SpecializedServices;