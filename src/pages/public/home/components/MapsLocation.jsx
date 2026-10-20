import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import { listarUbicacionesPublicas } from "@/services/ubicacionesService";

const buildIframeUrl = (lat, lng) =>
  `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=16&output=embed`;

const scrollBehavior = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

const MapsLocation = () => {
  const [activeLocation, setActiveLocation] = useState(0);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await listarUbicacionesPublicas({ page: 0, size: 20 });
        const mapped = (data.content || []).map((u) => ({
          id: u.idUbicacion,
          name: u.nombre,
          description: u.descripcion,
          iframeUrl: buildIframeUrl(u.latitud, u.longitud),
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

  // Mobile: al elegir un cliente, se asegura de que el mapa quede a la vista
  const selectOnMobile = (index) => {
    setActiveLocation(index);
    mapRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
  };

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
    <section className="flex flex-col relative w-full bg-[#1F4C7F]">
      <div className="mb-8 pt-12 flex flex-col items-center gap-3 md:mb-10">
        <div className="text-center text-3xl font-bold text-white">Nuestros clientes</div>
        <p className="text-center text-base text-white/80 md:text-lg">Descubre quienes confiaron en nosotros</p>
      </div>
      <motion.div
        className="relative w-full flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Mapa */}
        <div ref={mapRef} className="relative w-full overflow-hidden h-64 sm:h-80 md:h-[550px] lg:h-screen">
          <iframe
            key={activeLocation}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={locations[activeLocation]?.iframeUrl}
            title={locations[activeLocation]?.name}
          />

          {/* Botones sobre el mapa — solo visible en md+ */}
          <div className="absolute left-10 top-1/2 z-10 hidden -translate-y-1/2 md:block">
            <div
              className="flex max-h-[400px] flex-col gap-3 overflow-y-auto overscroll-contain px-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            >
              {/* Padding top para que el fade superior tenga espacio */}
              <div className="pt-4 pb-4 flex flex-col gap-3">
                {locations.map((location, index) => (
                  <button
                    key={location.id}
                    onClick={() => setActiveLocation(index)}
                    style={{
                      animation: `fadeSlideIn 0.35s ease both`,
                      animationDelay: `${index * 60}ms`,
                    }}
                    className={`w-56 rounded-xl px-5 py-3 text-left font-semibold shadow-lg
            transition-all duration-300 hover:translate-x-2
            ${activeLocation === index
                        ? "translate-x-2 bg-[#0DB3DE] text-white"
                        : "bg-[#268EA9] text-white hover:bg-[#0DB3DE]"
                      }`}
                  >
                    <p className="font-bold leading-tight line-clamp-1">{location.name}</p>
                    <p className="mt-0.5 text-xs opacity-90 line-clamp-1">{location.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de clientes debajo del mapa — solo visible en mobile */}
        <div className="w-full px-4 pb-8 pt-5 sm:mx-auto sm:max-w-xl md:hidden">
          <p className="mb-3 text-sm text-white/80">
            Toca un cliente para ver su ubicación en el mapa
          </p>

          <ul
            className="max-h-[18.5rem] space-y-2 overflow-y-auto overscroll-contain pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
            }}
          >
            {locations.map((location, index) => {
              const isActive = index === activeLocation;

              return (
                <li key={location.id}>
                  <button
                    type="button"
                    onClick={() => selectOnMobile(index)}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? "border-[#0DB3DE] bg-[#0DB3DE] text-white shadow-lg"
                        : "border-white/10 bg-white/10 text-white active:bg-white/20"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        isActive ? "bg-white/25" : "bg-white/10"
                      }`}
                      aria-hidden="true"
                    >
                      <MapPin size={18} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-tight line-clamp-1">{location.name}</span>
                      {location.description ? (
                        <span className="mt-0.5 block text-xs leading-snug text-white/85 line-clamp-2">
                          {location.description}
                        </span>
                      ) : null}
                    </span>

                    {isActive ? <Check size={20} strokeWidth={3} className="shrink-0" aria-hidden="true" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default MapsLocation;