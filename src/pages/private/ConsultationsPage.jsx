import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@heroui/react";
import { listarConsultasAdmin, obtenerConsultaAdmin } from "@/services/consultasService";

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [search, setSearch] = useState("");

  const loadConsultations = async (currentPage = page) => {
    setLoading(true);
    try {
      const data = await listarConsultasAdmin({ page: currentPage, size: 10 });
      setConsultations(data.content || []);
      setTotal(data.totalElements ?? 0);
      if ((data.content || []).length > 0 && !selectedId) {
        setSelectedId(data.content[0].idConsulta);
      }
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar las consultas");
      setMessage({ type: "error", text: error.message || "No se pudieron cargar las consultas" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsultations(page);
  }, [page]);

  useEffect(() => {
    if (!selectedId) return;
    const current = consultations.find((item) => item.idConsulta === selectedId);
    if (current) {
      setSelectedItem(current);
      return;
    }

    const fetchItem = async () => {
      try {
        const detail = await obtenerConsultaAdmin(selectedId);
        setSelectedItem(detail);
      } catch (error) {
        toast.danger(error.message || "No se pudo cargar el detalle de la consulta");
        setMessage({ type: "error", text: error.message || "No se pudo cargar el detalle de la consulta" });
      }
    };

    fetchItem();
  }, [selectedId, consultations]);

  const pages = useMemo(() => {
    const count = Math.max(1, Math.ceil(total / 10));
    return Array.from({ length: count }, (_, index) => index);
  }, [total]);

  const filteredConsultations = consultations.filter((item) => {
    const term = search.trim().toLowerCase();
    return !term || `${item.nombre} ${item.correo} ${item.nombreServicio || ""}`.toLowerCase().includes(term);
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Consultas del formulario</h2>
            <p className="text-sm text-slate-600">Revisa las solicitudes recibidas desde la página pública.</p>
          </div>
        </div>

        <div className="mt-6"><Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por nombre, correo o servicio" /></div>

        {message.text ? (
          <div className={`mt-4 rounded-xl px-3 py-2 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
            {message.text}
          </div>
        ) : null}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Correo</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-slate-500">Cargando consultas...</td></tr>
                ) : filteredConsultations.length === 0 ? (
                  <tr><td colSpan="3" className="px-4 py-8 text-center text-slate-500">No hay consultas registradas.</td></tr>
                ) : (
                  filteredConsultations.map((item) => (
                    <tr key={item.idConsulta} className={`cursor-pointer border-t border-slate-200 ${selectedId === item.idConsulta ? "bg-slate-50" : "hover:bg-slate-50"}`} onClick={() => setSelectedId(item.idConsulta)}>
                      <td className="px-4 py-3 font-medium">{item.nombre}</td>
                      <td className="px-4 py-3">{item.correo}</td>
                      <td className="px-4 py-3">{new Date(item.fecha).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            {selectedItem ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Detalle de la consulta</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{selectedItem.nombre}</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><span className="font-medium text-slate-700">Correo:</span> {selectedItem.correo}</p>
                  <p><span className="font-medium text-slate-700">Teléfono:</span> {selectedItem.telefono || "-"}</p>
                  <p><span className="font-medium text-slate-700">Servicio:</span> {selectedItem.nombreServicio || "Ninguno"}</p>
                  <p><span className="font-medium text-slate-700">Fecha:</span> {new Date(selectedItem.fecha).toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-medium text-slate-700">Mensaje</p>
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{selectedItem.mensaje}</p>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">Selecciona una consulta para ver su detalle.</div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {pages.map((pageNumber) => (
            <Button key={pageNumber} variant={page === pageNumber ? "secondary" : "outline"} size="sm" onClick={() => setPage(pageNumber)}>
              {pageNumber + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
