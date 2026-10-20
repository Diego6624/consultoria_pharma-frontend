import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, List, MapPin, Search, X } from "lucide-react";
import { listarUbicacionesPublicas } from "@/services/ubicacionesService";

const buildIframeUrl = (lat, lng) =>
  `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=16&output=embed`;

const scrollBehavior = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

// Búsqueda sin distinguir mayúsculas ni tildes
const normalize = (text = "") =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const SEARCH_THRESHOLD = 5; // el buscador aparece cuando hay más clientes que esto

const MapsLocation = () => {
  const [activeLocation, setActiveLocation] = useState(0);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const mapRef = useRef(null);
  const dialogRef = useRef(null);
  const activeItemRef = useRef(null);
  const pendingScroll = useRef(false);

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

  // Si el componente se desmonta con el panel abierto, se libera el scroll de la página
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const total = locations.length;

  /* ---------- Mobile: navegación entre clientes ---------- */
  const scrollToMap = () =>
    mapRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });

  const goTo = (index) => {
    setActiveLocation(((index % total) + total) % total); // da la vuelta al llegar al final
    scrollToMap();
  };

  /* ---------- Mobile: panel con la lista completa ---------- */
  const openSheet = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    requestAnimationFrame(() => activeItemRef.current?.scrollIntoView({ block: "center" }));
  };

  const closeSheet = () => dialogRef.current?.close();

  const handleSheetClose = () => {
    document.documentElement.style.overflow = "";
    setQuery("");
    if (pendingScroll.current) {
      pendingScroll.current = false;
      scrollToMap();
    }
  };

  const chooseFromSheet = (index) => {
    pendingScroll.current = true;
    setActiveLocation(index);
    closeSheet();
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
  const cleanQuery = normalize(query.trim());
  const visibleLocations = locations
    .map((location, index) => ({ location, index }))
    .filter(
      ({ location }) =>
        !cleanQuery || normalize(`${location.name} ${location.description ?? ""}`).includes(cleanQuery)
    );

  return (
    <section className="flex flex-col relative w-full bg-[#1F4C7F]">
      <style>{`
        .clientes-sheet[open] { animation: clientesSheetUp 0.3s ease-out; }
        @keyframes clientesSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .clientes-sheet[open] { animation: none; } }
      `}</style>

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

        {/* Tarjeta del cliente actual debajo del mapa — solo visible en mobile */}
        <div className="w-full px-4 pb-10 pt-5 sm:mx-auto sm:max-w-xl md:hidden">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
            <div className="flex items-start gap-3" aria-live="polite">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0DB3DE] text-white"
                aria-hidden="true"
              >
                <MapPin size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                  Cliente {activeLocation + 1} de {total}
                </p>
                <h3 className="mt-0.5 text-lg font-bold leading-tight text-white">{current?.name}</h3>
                {current?.description ? (
                  <p className="mt-1 text-sm leading-6 text-white/85 line-clamp-3">{current.description}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {total > 1 ? (
                <button
                  type="button"
                  onClick={() => goTo(activeLocation - 1)}
                  aria-label="Cliente anterior"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white active:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
              ) : null}

              <button
                type="button"
                onClick={openSheet}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#0DB3DE] px-4 text-sm font-semibold text-white active:bg-[#0BA0C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <List size={18} aria-hidden="true" />
                Ver todos los clientes ({total})
              </button>

              {total > 1 ? (
                <button
                  type="button"
                  onClick={() => goTo(activeLocation + 1)}
                  aria-label="Cliente siguiente"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white active:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Panel inferior (bottom sheet) con la lista completa — solo mobile.
          Usa <dialog>: el navegador se encarga del foco, la tecla Esc y el fondo. */}
      <dialog
        ref={dialogRef}
        onClose={handleSheetClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeSheet();
        }}
        aria-labelledby="clientes-sheet-title"
        className="clientes-sheet fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] w-full max-w-none overflow-hidden rounded-t-3xl bg-[#1F4C7F] p-0 text-white backdrop:bg-slate-950/60 md:hidden"
      >
        <div className="flex max-h-[85dvh] flex-col">
          <span className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-white/30" aria-hidden="true" />

          <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-3">
            <h2 id="clientes-sheet-title" className="text-lg font-bold">
              Nuestros clientes <span className="font-medium text-white/70">({total})</span>
            </h2>
            <button
              type="button"
              onClick={closeSheet}
              aria-label="Cerrar lista de clientes"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white active:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {total > SEARCH_THRESHOLD ? (
            <div className="relative shrink-0 px-5 pb-3">
              <label htmlFor="clientes-search" className="sr-only">
                Buscar cliente
              </label>
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-9 top-1/2 -translate-y-[70%] text-white/60"
              />
              {/* text-base (16px) evita el zoom automático de iOS al enfocar */}
              <input
                id="clientes-search"
                type="search"
                inputMode="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar cliente..."
                className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-base text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DB3DE]"
              />
            </div>
          ) : null}

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-1">
            {visibleLocations.length === 0 ? (
              <p className="px-2 py-10 text-center text-sm text-white/70">
                No se encontraron clientes con “{query.trim()}”.
              </p>
            ) : (
              <ul className="space-y-2">
                {visibleLocations.map(({ location, index }) => {
                  const isActive = index === activeLocation;

                  return (
                    <li key={location.id}>
                      <button
                        type="button"
                        ref={isActive ? activeItemRef : null}
                        onClick={() => chooseFromSheet(index)}
                        aria-pressed={isActive}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                          isActive
                            ? "border-[#0DB3DE] bg-[#0DB3DE] text-white"
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
                        {isActive ? (
                          <Check size={20} strokeWidth={3} className="shrink-0" aria-hidden="true" />
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default MapsLocation;