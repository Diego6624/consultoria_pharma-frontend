import ServiceCard from "@/components/ServiceCardH";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { listarServiciosParaInicio } from "@/services/serviciosService";
import { getServiceIconComponent } from "@/components/admin/serviceIconCatalog";

const fallbackImages = ["/images/imageCards.jpg", "/images/imageCards2.jpg", "/images/imageCards3.jpg"];

const SpecializedServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listarServiciosParaInicio(3)
            .then((data) => setServices(Array.isArray(data) ? data : []))
            .catch(() => setServices([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="w-full">

            {/* Tittle | Description */}
            <div className="relative bg-[#2F5D93] pt-16 pb-32 overflow-hidden">
                <div className="w-auto px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-4 md:gap-6 flex flex-col md:flex-row  lg:items-center">

                    <div className="font-semibold text-3xl leading-tight text-white w-auto">
                        <p>Nuestros Servicios Especializados</p>
                    </div>

                    <div className="md:relative md:pl-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-0 w-full">
                        <span className="md:absolute left-0 h-1 md:h-[70%] w-12 md:w-1 rounded-full bg-sky-300" />
                        <p className="text-lg text-white/95 sm:text-xl">
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
                <div className="mx-auto px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 gap-6">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {loading ? Array.from({ length: 3 }, (_, index) => (
                            <div key={`skeleton-${index}`} className="space-y-4">
                                <Skeleton className="h-[300px] w-full rounded-2xl" />
                                <Skeleton className="-mt-24 mx-5 h-64 rounded-2xl" />
                            </div>
                        )) : services.map((service, index) => {
                            const ServiceIcon = getServiceIconComponent(service.iconoInicio);
                            return (
                            <motion.div
                                key={service.idServicio}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <ServiceCard
                                    category={service.nombreCategoria || "Servicio especializado"}
                                    title={service.titulo}
                                    description={service.descripcion}
                                    icon={<ServiceIcon />}
                                    image={service.imagen || fallbackImages[index % fallbackImages.length]}
                                    navigation={`/services/${service.slug}`}
                                />
                            </motion.div>
                            );
                        })}
                    </div>
                    {!loading && services.length === 0 && (
                        <p className="py-6 text-center text-sm text-slate-500">Próximamente conocerás nuestros servicios especializados.</p>
                    )}
                </div>
            </div>

        </section>
    );
};

export default SpecializedServices;
