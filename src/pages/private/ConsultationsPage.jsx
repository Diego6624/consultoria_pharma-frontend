import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, Download, Mail, Trash2, UserRound } from "lucide-react";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  actualizarRevisionConsulta,
  eliminarConsultaAdmin,
  exportarConsultasAdmin,
  listarConsultasAdmin,
  obtenerConsultaAdmin,
} from "@/services/consultasService";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";

function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

function relativeDate(value) {
  const date = new Date(value);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / 86400000);
  if (Number.isNaN(date.getTime())) return "Fecha inválida";
  if (days <= 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 14) return "Hace 1 semana";
  return `Hace ${Math.floor(days / 7)} semanas`;
}

function csvValue(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [actionId, setActionId] = useState(null);
  const [exporting, setExporting] = useState(false);

  const loadConsultations = async (currentPage = page) => {
    setLoading(true);
    try {
      const data = await listarConsultasAdmin({ page: currentPage, size: 10 });
      setConsultations(data.content || []);
      setTotal(data.totalElements ?? 0);
      if (!(data.content || []).some((item) => item.idConsulta === selectedId)) {
        setSelectedId(data.content?.[0]?.idConsulta || null);
      }
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar las consultas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadConsultations(page); }, [page]);

  useEffect(() => {
    if (!selectedId) {
      setSelectedItem(null);
      return;
    }
    const current = consultations.find((item) => item.idConsulta === selectedId);
    if (current) {
      setSelectedItem(current);
      return;
    }
    obtenerConsultaAdmin(selectedId).then(setSelectedItem).catch((error) => toast.danger(error.message || "No se pudo cargar el detalle"));
  }, [selectedId, consultations]);

  const updateRevision = async (item) => {
    if (actionId) return;
    setActionId(item.idConsulta);
    try {
      const updated = await actualizarRevisionConsulta(item.idConsulta, !item.revisada);
      setConsultations((items) => items.map((current) => current.idConsulta === item.idConsulta ? updated : current));
      setSelectedItem(updated);
      toast.success(updated.revisada ? "Consulta marcada como leída" : "Consulta marcada como no leída");
    } catch (error) {
      toast.danger(error.message || "No se pudo actualizar la consulta");
    } finally {
      setActionId(null);
    }
  };

  const deleteConsultation = async (id) => {
    if (!window.confirm("¿Eliminar esta consulta? Esta acción no se puede deshacer.")) return;
    setActionId(id);
    try {
      await eliminarConsultaAdmin(id);
      setConsultations((items) => items.filter((item) => item.idConsulta !== id));
      if (selectedId === id) setSelectedId(null);
      toast.success("Consulta eliminada");
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar la consulta");
    } finally {
      setActionId(null);
    }
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const items = await exportarConsultasAdmin();
      const headers = ["Nombre", "Correo", "Teléfono", "Servicio", "Fecha", "Estado", "Mensaje"];
      const rows = items.map((item) => [item.nombre, item.correo, item.telefono, item.nombreServicio, new Date(item.fecha).toLocaleString("es-PE"), item.revisada ? "Leída" : "No leída", item.mensaje]);
      const csv = [headers, ...rows].map((row) => row.map(csvValue).join(",")).join("\n");
      const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `consultas-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Consultas exportadas");
    } catch (error) {
      toast.danger(error.message || "No se pudieron exportar las consultas");
    } finally {
      setExporting(false);
    }
  };

  const services = useMemo(() => [...new Set(consultations.map((item) => item.nombreServicio).filter(Boolean))], [consultations]);
  const filteredConsultations = consultations.filter((item) => {
    const term = search.trim().toLowerCase();
    const itemDate = new Date(item.fecha);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const matchesText = !term || `${item.nombre} ${item.correo} ${item.nombreServicio || ""}`.toLowerCase().includes(term);
    const matchesService = !serviceFilter || item.nombreServicio === serviceFilter;
    const matchesDate = !dateFilter || (dateFilter === "week" ? itemDate >= startOfWeek : itemDate >= startOfMonth);
    return matchesText && matchesService && matchesDate;
  });
  const pages = useMemo(() => Array.from({ length: Math.max(1, Math.ceil(total / 10)) }, (_, index) => index), [total]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#1F4C7F]">
              Consultas del formulario
            </h2>
            <p className="text-sm text-slate-600">
              Revisa, filtra y organiza las solicitudes recibidas.
            </p>
          </div>
          <Button className={"cursor-pointer"} onClick={exportCsv} disabled={exporting}>
            <Download size={16} />
            {exporting ? "Exportando..." : "Exportar CSV"}
          </Button>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_190px_170px]">
          <Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} placeholder="Buscar por nombre, correo o servicio" />
          <select value={serviceFilter} onChange={(event) => { setServiceFilter(event.target.value); setPage(0); }} className="h-9 rounded-md border border-input bg-white px-3 text-sm">
            <option value="">
              Todos los servicios
            </option>
            {services.map((service) =>
              <option key={service} value={service}>
                {service}
              </option>
            )}
          </select>
          <select value={dateFilter} onChange={(event) => { setDateFilter(event.target.value); setPage(0); }} className="h-9 rounded-md border border-input bg-white px-3 text-sm">
            <option value="">
              Todas las fechas
            </option>
            <option value="week">
              Esta semana
            </option>
            <option value="month">
              Este mes
            </option>
          </select>
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3">Contacto</th>
                  <th className="px-4 py-3">Servicio</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ?
                  <AdminTableSkeleton columns={5} />
                  : filteredConsultations.length === 0 ?
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                        No hay consultas que coincidan.
                      </td>
                    </tr> : filteredConsultations.map((item) =>
                      <tr key={item.idConsulta} className={`border-t border-slate-200 ${selectedId === item.idConsulta ? "bg-[#EBEDEE]/70" : "hover:bg-slate-50"}`}>
                        <td className="cursor-pointer px-4 py-3" onClick={() => setSelectedId(item.idConsulta)}>
                          <div className="flex items-center gap-3">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#52C7E5]/30 font-bold text-[#1F4C7F]">
                              {initials(item.nombre)}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-800">
                                {item.nombre}
                              </p>
                              <p className="truncate text-xs text-slate-500">
                                {item.correo}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {item.nombreServicio ?
                            <span className="rounded-full bg-[#52C7E5]/25 px-2.5 py-1 text-xs font-semibold text-[#1F4C7F]">
                              {item.nombreServicio}
                            </span>
                            :
                            <span className="text-slate-400">Sin preferencia</span>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <span title={new Date(item.fecha).toLocaleString("es-PE")} className="inline-flex items-center gap-1 text-xs text-slate-600">
                            <CalendarDays size={14} />
                            {relativeDate(item.fecha)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.revisada ? "bg-slate-100 text-slate-500" : "bg-[#0DB3DE]/15 text-[#1F4C7F]"}`}>
                            {!item.revisada ?
                              <span className="size-1.5 rounded-full bg-[#0DB3DE]" />
                              : <Check size={13} />
                            }
                            {item.revisada ? "Leída" : "No leída"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Button className={"cursor-pointer"} variant="outline" size="sm" disabled={Boolean(actionId)} onClick={() => updateRevision(item)}>
                              {actionId === item.idConsulta ? "..." : item.revisada ? "No leída" : "Leída"}
                            </Button>
                            <Button className={"cursor-pointer"} variant="destructive" size="sm" disabled={Boolean(actionId)} onClick={() => deleteConsultation(item.idConsulta)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            {selectedItem ?
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-[#52C7E5]/30 font-bold text-[#1F4C7F]">
                    {initials(selectedItem.nombre)}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Detalle de la consulta
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {selectedItem.nombre}
                    </h3>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <Mail size={14} className="mr-2 inline" />
                    {selectedItem.correo}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">
                      Teléfono:
                    </span>
                    {selectedItem.telefono || "-"}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">
                      Servicio:
                    </span>
                    {selectedItem.nombreServicio || "Sin preferencia"}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">
                      Fecha:
                    </span>
                    {new Date(selectedItem.fecha).toLocaleString("es-PE")}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-medium text-slate-700">
                    Mensaje
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                    {selectedItem.mensaje}
                  </p>
                </div>
              </div>
              :
              <div className="flex h-full min-h-48 items-center justify-center text-sm text-slate-500">
                Selecciona una consulta para ver su detalle.
              </div>
            }
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{pages.map((pageNumber) =>
          <Button key={pageNumber} variant={page === pageNumber ? "secondary" : "outline"} size="sm" onClick={() => setPage(pageNumber)}>
            {pageNumber + 1}
          </Button>
        )}
        </div>
      </div>
    </div>
  );
}
