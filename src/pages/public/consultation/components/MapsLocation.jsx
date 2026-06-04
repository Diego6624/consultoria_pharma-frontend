import { useState } from "react";
import { motion } from "framer-motion";

const MapsLocation = () => {
    const [activeLocation, setActiveLocation] = useState(0);

    // Plantilla de ubicaciones - Personalizar con URLs de iframes reales
    const locations = [
        {
            id: 0,
            name: "Ica, Ica",
            description: "Av. San Francisco #999",
            iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d-77.0!3d-12.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2z0JDQvdC00YDQvdCx!5e0!3m2!1ses!2spe!4v1234567890",
        },
        {
            id: 1,
            name: "Lima, Cercado de lima",
            description: "Av. San Francisco #999",
            iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d-77.0!3d-12.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2z0JDQvdC00YDQvdCx!5e0!3m2!1ses!2spe!4v1234567890",
        },
        {
            id: 2,
            name: "Lima, Cercado de lima",
            description: "Av. San Francisco #999",
            iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d-77.0!3d-12.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2z0JDQvdC00YDQvdCx!5e0!3m2!1ses!2spe!4v1234567890",
        },
    ];

    return (
        <section className="relative w-full">
            <motion.div
                className="relative w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Botones debajo del mapa — solo visible en mobile */}
                <div className="flex md:hidden w-full">
                    {locations.map((location) => (
                        <button
                            key={location.id}
                            onClick={() => setActiveLocation(location.id)}
                            className={`flex-1 py-3 px-2 text-center text-xs font-semibold transition-all duration-300 border-t-2 ${activeLocation === location.id
                                ? "bg-[#0DB3DE] text-white border-[#0DB3DE]"
                                : "bg-[#268EA9] text-white border-transparent hover:bg-[#1F7FA0]"
                                }`}
                        >
                            <p className="font-bold leading-tight">{location.name}</p>
                            <p className="opacity-80 text-[11px] leading-tight mt-0.5">{location.description}</p>
                        </button>
                    ))}
                </div>
                {/* Mapa */}
                <div className="relative w-full overflow-hidden h-64 sm:h-80 md:h-[550px] lg:h-screen">
                    <iframe
                        key={activeLocation}
                        width="100%"
                        height="100%"
                        style={{ border: 0, display: "block" }}
                        loading="lazy"
                        allowFullScreen=""
                        referrerPolicy="no-referrer-when-downgrade"
                        src={locations[activeLocation].iframeUrl}
                        title={locations[activeLocation].name}
                    />

                    {/* Botones sobre el mapa — solo visible en md+ */}
                    <div className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-3 z-10">
                        {locations.map((location) => (
                            <button
                                key={location.id}
                                onClick={() => setActiveLocation(location.id)}
                                className={`px-6 py-3 rounded-lg font-semibold text-left text-base max-w-xs shadow-lg
                        transition-all duration-300
                        hover:translate-x-2
                        ${activeLocation === location.id
                                        ? "bg-[#0DB3DE] text-white translate-x-2"
                                        : "bg-[#268EA9] text-white"
                                    }`}
                            >
                                <p className="font-bold">{location.name}</p>
                                <p className="text-sm opacity-90">{location.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default MapsLocation;
