import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { listarUbicacionesPublicas } from "@/services/ubicacionesService";

const buildIframeUrl = (lat, lng) =>
  `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=16&output=embed`;

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

  const current = locations[activeLocation];

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
        {/* Selector de cliente — solo visible en mobile */}
        <div className="w-full px-5 pb-5 sm:mx-auto sm:max-w-md md:hidden">
          <label htmlFor="cliente-select" className="mb-2 block text-sm font-medium text-white/80">
            Selecciona un cliente
          </label>

          <div className="relative">
            <MapPin
              size={20}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0DB3DE]"
            />
            {/* Select nativo: en celular abre el selector del sistema (cómodo y accesible).
                text-base (16px) evita el zoom automático de iOS al enfocarlo. */}
            <select
              id="cliente-select"
              value={activeLocation}
              onChange={(e) => setActiveLocation(Number(e.target.value))}
              className="w-full appearance-none rounded-xl border border-white/20 bg-white py-3.5 pl-12 pr-12 text-base font-semibold text-[#1F4C7F] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DB3DE]"
            >
              {locations.map((location, index) => (
                <option key={location.id} value={index}>
                  {location.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              strokeWidth={3}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0DB3DE]"
            />
          </div>

          {current?.description ? (
            <p className="mt-3 text-sm leading-6 text-white/85" aria-live="polite">
              {current.description}
            </p>
          ) : null}
        </div>

        {/* Mapa */}
        <div className="relative w-full overflow-hidden h-64 sm:h-80 md:h-[550px] lg:h-screen">
          <iframe
            key={activeLocation}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={current?.iframeUrl}
            title={current?.name}
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
      </motion.div>
    </section>
  );
};

export default MapsLocation;