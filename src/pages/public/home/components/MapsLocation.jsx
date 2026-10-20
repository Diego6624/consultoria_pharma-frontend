import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { listarUbicacionesPublicas } from "@/services/ubicacionesService";

const buildIframeUrl = (lat, lng) =>
  `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=16&output=embed`;

const scrollBehavior = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

const MAX_DOTS = 8; // con más clientes que esto, los puntos se reemplazan por "3 / 12"

const MapsLocation = () => {
  const [activeLocation, setActiveLocation] = useState(0);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapRef = useRef(null);
  const touchStart = useRef(null);
  const reduceMotion = useReducedMotion();

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

  const total = locations.length;

  /* ---------- Mobile: navegación entre clientes ---------- */
  const goTo = (index) => {
    setActiveLocation(((index % total) + total) % total); // da la vuelta al llegar al final
    mapRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  // Deslizar la barra hacia los lados también cambia de cliente
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goTo(activeLocation + (dx < 0 ? 1 : -1));
    }
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

  const current = locations[activeLocation];
  const arrowClass =
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors active:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <section className="flex flex-col relative w-full bg-[#1F4C7F]">
      <div className="mb-8 pt-12 flex flex-col items-center gap-3 md:mb-10">
        <div className="text-center text-3xl font-bold text-white">
          Presentes donde nos necesitan
        </div>
        <p className="text-center text-base text-white/80 md:text-lg">
          Explora en el mapa a los establecimientos que ya cuentan con nuestro acompañamiento.
        </p>
      </div>
      <motion.div
        className="relative w-full flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Mapa */}
        <div ref={mapRef} className="relative w-full overflow-hidden h-72 sm:h-96 md:h-[550px] lg:h-screen">
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

        {/* Barra de navegación debajo del mapa — solo visible en mobile */}
        <div className="w-full border-t-2 border-[#0DB3DE] bg-[#163A63] md:hidden">
          <div
            className="mx-auto flex max-w-xl touch-pan-y items-center gap-2 px-3 py-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {total > 1 ? (
              <button
                type="button"
                onClick={() => goTo(activeLocation - 1)}
                aria-label="Cliente anterior"
                className={arrowClass}
              >
                <ChevronLeft size={28} strokeWidth={2.5} aria-hidden="true" />
              </button>
            ) : (
              <span className="h-12 w-12 shrink-0" aria-hidden="true" />
            )}

            <div className="flex min-h-[6.5rem] min-w-0 flex-1 flex-col items-center justify-center text-center">
              <div aria-live="polite" className="w-full">
                <motion.div
                  key={activeLocation}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">{current?.name}</h3>
                  {current?.description ? (
                    <p className="mt-1 text-sm leading-snug text-white/80 line-clamp-2">{current.description}</p>
                  ) : null}
                </motion.div>
              </div>

              {total > 1 ? (
                total <= MAX_DOTS ? (
                  <div className="mt-2 flex items-center">
                    {locations.map((location, index) => (
                      <button
                        key={location.id}
                        type="button"
                        onClick={() => goTo(index)}
                        aria-label={`Ir al cliente ${index + 1}: ${location.name}`}
                        aria-current={index === activeLocation ? "true" : undefined}
                        className="flex h-6 items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <span
                          className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${index === activeLocation ? "w-5 bg-[#0DB3DE]" : "w-2 bg-white/40"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs font-medium tracking-wide text-white/70">
                    {activeLocation + 1} / {total}
                  </p>
                )
              ) : null}
            </div>

            {total > 1 ? (
              <button
                type="button"
                onClick={() => goTo(activeLocation + 1)}
                aria-label="Cliente siguiente"
                className={arrowClass}
              >
                <ChevronRight size={28} strokeWidth={2.5} aria-hidden="true" />
              </button>
            ) : (
              <span className="h-12 w-12 shrink-0" aria-hidden="true" />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MapsLocation;