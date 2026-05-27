import { useState } from "react";

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
        <>
            <section className="relative w-full">
                {/* Contenedor del mapa con posición relativa */}
                <div className="relative w-full overflow-hidden  h-80 md:h-[550px] lg:h-screen">
                    {/* Mapa de fondo */}
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
                    ></iframe>

                    {/* Botones posicionados sobre el mapa */}
                    <div className="absolute left-6 md:left-10 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-10">
                        {locations.map((location) => (
                            <button
                                key={location.id}
                                onClick={() => setActiveLocation(location.id)}
                                className={`px-4 md:px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-left text-sm md:text-base max-w-xs shadow-lg ${
                                    activeLocation === location.id
                                        ? "bg-[#0DB3DE] text-white"
                                        : "bg-[#268EA9] text-white hover:bg-[#1F7FA0]"
                                }`}
                            >
                                <p className="font-bold">{location.name}</p>
                                <p className="text-xs md:text-sm opacity-90">{location.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default MapsLocation;
