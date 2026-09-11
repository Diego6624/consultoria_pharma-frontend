import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { listarUbicacionesPublicas } from "@/services/ubicacionesService";

const buildIframeUrl = (lat, lng, nombre) =>
  `https://www.google.com/maps?q=${encodeURIComponent(nombre)}&ll=${lat},${lng}&hl=es&z=16&output=embed`;

const MapsLocation = () => {
  const [activeLocation, setActiveLocation] = useState(0);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await listarUbicacionesPublicas({ page: 0, size: 20 });
        const mapped = (data.content || []).map((u) => ({
          id: u.idUbicacion,
          name: u.nombre,
          description: u.descripcion,
          iframeUrl: buildIframeUrl(u.latitud, u.longitud, u.nombre),
        }));
        setLocations(mapped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full h-64 md:h-[550px] flex items-center justify-center bg-slate-100">
        <p className="text-slate-500 text-sm">Cargando ubicaciones...</p>
      </section>
    );
  }

  if (locations.length === 0) {
    return (
      <section className="relative w-full h-64 md:h-[550px] flex items-center justify-center bg-slate-100">
        <p className="text-slate-500 text-sm">No hay ubicaciones disponibles.</p>
      </section>
    );
  }

  return (
    <section className="relative w-full">
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Botones debajo del mapa — solo visible en mobile */}
        <div className="flex md:hidden w-full overflow-x-auto">
          {locations.map((location, index) => (
            <button
              key={location.id}
              onClick={() => setActiveLocation(index)}
              className={`flex-shrink-0 w-32 py-3 px-2 text-center text-xs font-semibold transition-all duration-300 border-t-2 ${activeLocation === index
                ? "bg-[#0DB3DE] text-white border-[#0DB3DE]"
                : "bg-[#268EA9] text-white border-transparent hover:bg-[#1F7FA0]"
                }`}
            >
              <p className="font-bold leading-tight line-clamp-2">{location.name}</p>
              <p className="opacity-80 text-[10px] leading-tight mt-0.5 line-clamp-1">
                {location.description}
              </p>
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
            src={locations[activeLocation]?.iframeUrl}
            title={locations[activeLocation]?.name}
          />

          {/* Botones sobre el mapa — solo visible en md+ */}
          <div className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-3 z-10">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(index)}
                className={`w-56 px-5 py-3 rounded-lg font-semibold text-left text-sm shadow-lg
        transition-all duration-300 hover:translate-x-2
        ${activeLocation === index
                    ? "bg-[#0DB3DE] text-white translate-x-2"
                    : "bg-[#268EA9] text-white"
                  }`}
              >
                <p className="font-bold leading-tight line-clamp-1">{location.name}</p>
                <p className="text-xs opacity-90 mt-0.5 line-clamp-1">{location.description}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MapsLocation;