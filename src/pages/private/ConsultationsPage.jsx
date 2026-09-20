import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Download,
  Eye,
  Loader2,
  Mail,
  Phone,
  Tag,
  Trash2,
} from "lucide-react";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  actualizarRevisionConsulta,
  eliminarConsultaAdmin,
  exportarConsultasAdmin,
  listarConsultasAdmin,
  obtenerConsultaAdmin,
} from "@/services/consultasService";
import { AdminTableSkeleton, ConsultationDialogSkeleton } from "@/components/admin/AdminSkeletons";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

function initials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [revisionActionId, setRevisionActionId] = useState(null);
  const [deleteActionId, setDeleteActionId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [exporting, setExporting] = useState(false);

  const loadConsultations = async (currentPage = page) => {
    setLoading(true);

    try {
      const data = await listarConsultasAdmin({
        page: currentPage,
        size: 10,
      });

      setConsultations(data.content || []);
      setTotal(data.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar las consultas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsultations(page);
  }, [page]);

  // Solo abre el detalle.
  // NO marca automáticamente la consulta como leída.
  const openDetail = async (item) => {
    setSelectedItem(null);
    setDialogOpen(true);
    setDialogLoading(true);

    try {
      const detail = await obtenerConsultaAdmin(item.idConsulta);
      setSelectedItem(detail);
    } catch (error) {
      setDialogOpen(false);
      toast.danger(error.message || "No se pudo cargar el detalle");
    } finally {
      setDialogLoading(false);
    }
  };

  const updateRevision = async (item, e) => {
    e?.stopPropagation();

    if (revisionActionId || deleteActionId) return;

    setRevisionActionId(item.idConsulta);

    try {
      const updated = await actualizarRevisionConsulta(
        item.idConsulta,
        !item.revisada
      );

      setConsultations((items) =>
        items.map((c) =>
          c.idConsulta === item.idConsulta ? updated : c
        )
      );

      if (selectedItem?.idConsulta === item.idConsulta) {
        setSelectedItem(updated);
      }

      toast.success(
        updated.revisada
          ? "Marcada como leída"
          : "Marcada como no leída"
      );
    } catch (error) {
      toast.danger(error.message || "No se pudo actualizar");
    } finally {
      setRevisionActionId(null);
    }
  };

  const deleteConsultation = async (id, e) => {
    e?.stopPropagation();

    setDeleteActionId(id);

    try {
      await eliminarConsultaAdmin(id);

      setConsultations((items) =>
        items.filter((item) => item.idConsulta !== id)
      );

      if (selectedItem?.idConsulta === id) {
        setDialogOpen(false);
        setSelectedItem(null);
      }

      toast.success("Consulta eliminada");
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar");
    } finally {
      setDeleteActionId(null);
    }
  };

  const requestDelete = (id, e) => {
    e?.stopPropagation();
    setDeleteTarget(id);
  };

  const exportCsv = async () => {
    setExporting(true);

    try {
      const items = await exportarConsultasAdmin();

      const headers = [
        "Nombre",
        "Correo",
        "Teléfono",
        "Servicio",
        "Fecha",
        "Estado",
        "Mensaje",
      ];

      const rows = items.map((item) => [
        item.nombre,
        item.correo,
        item.telefono,
        item.nombreServicio,
        new Date(item.fecha).toLocaleString("es-PE"),
        item.revisada ? "Leída" : "No leída",
        item.mensaje,
      ]);

      const csv = [headers, ...rows]
        .map((row) => row.map(csvValue).join(","))
        .join("\n");

      const blob = new Blob([`\ufeff${csv}`], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `consultas-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

      link.click();

      URL.revokeObjectURL(url);

      toast.success("Consultas exportadas");
    } catch (error) {
      toast.danger(error.message || "No se pudieron exportar");
    } finally {
      setExporting(false);
    }
  };

  const services = useMemo(
    () =>
      [
        ...new Set(
          consultations
            .map((item) => item.nombreServicio)
            .filter(Boolean)
        ),
      ],
    [consultations]
  );

  const filteredConsultations = consultations.filter((item) => {
    const term = search.trim().toLowerCase();
    const itemDate = new Date(item.fecha);

    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(
      now.getDate() - ((now.getDay() + 6) % 7)
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const matchesText =
      !term ||
      `${item.nombre} ${item.correo} ${item.nombreServicio || ""
        }`
        .toLowerCase()
        .includes(term);

    const matchesService =
      !serviceFilter ||
      item.nombreServicio === serviceFilter;

    const matchesDate =
      !dateFilter ||
      (dateFilter === "week"
        ? itemDate >= startOfWeek
        : itemDate >= startOfMonth);

    return matchesText && matchesService && matchesDate;
  });

  const pages = useMemo(
    () =>
      Array.from(
        {
          length: Math.max(1, Math.ceil(total / 10)),
        },
        (_, index) => index
      ),
    [total]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#1F4C7F]">
              Consultas del formulario
            </h2>

            <p className="text-sm text-slate-600">
              Revisa, filtra y organiza las solicitudes recibidas.
            </p>
          </div>

          <Button
            className="cursor-pointer"
            onClick={exportCsv}
            disabled={exporting}
          >
            {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {exporting ? "Exportando..." : "Exportar CSV"}
          </Button>
        </div>

        {/* Filtros */}
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_190px_170px]">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Buscar por nombre, correo o servicio"
          />

          <select
            value={serviceFilter}
            onChange={(e) => {
              setServiceFilter(e.target.value);
              setPage(0);
            }}
            className="h-9 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="">Todos los servicios</option>

            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(0);
            }}
            className="h-9 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="">Todas las fechas</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[760px] w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="min-w-[210px] whitespace-nowrap px-4 py-3">Contacto</th>
                <th className="min-w-[170px] whitespace-nowrap px-4 py-3">Servicio</th>
                <th className="min-w-[145px] whitespace-nowrap px-4 py-3">Fecha</th>
                <th className="min-w-[125px] whitespace-nowrap px-4 py-3">Estado</th>
                <th className="min-w-[190px] whitespace-nowrap px-4 py-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <AdminTableSkeleton columns={5} />
              ) : filteredConsultations.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No hay consultas que coincidan.
                  </td>
                </tr>
              ) : (
                filteredConsultations.map((item) => (
                  <tr
                    key={item.idConsulta}
                    className="border-t border-slate-200 transition-colors hover:bg-slate-50"
                  >
                    {/* Contacto */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#52C7E5]/30 font-bold text-[#1F4C7F]">
                          {initials(item.nombre)}
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate font-semibold text-slate-800">
                              {item.nombre}
                            </p>

                            {/* Punto azul si no leída */}
                            {!item.revisada && (
                              <span className="size-2 shrink-0 rounded-full bg-[#0DB3DE]" />
                            )}
                          </div>

                          <p className="truncate text-xs text-slate-500">
                            {item.correo}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Servicio */}
                    <td className="min-w-[170px] whitespace-nowrap px-4 py-3">
                      {item.nombreServicio ? (
                        <span className="inline-block whitespace-nowrap rounded-full bg-[#52C7E5]/25 px-2.5 py-1 text-xs font-semibold text-[#1F4C7F]">
                          {item.nombreServicio}
                        </span>
                      ) : (
                        <span className="whitespace-nowrap text-xs text-slate-400">
                          Sin preferencia
                        </span>
                      )}
                    </td>

                    {/* Fecha */}
                    <td className="min-w-[145px] whitespace-nowrap px-4 py-3">
                      <span
                        title={new Date(item.fecha).toLocaleString("es-PE")}
                        className="inline-flex whitespace-nowrap items-center gap-1 text-xs text-slate-600"
                      >
                        <CalendarDays size={14} />
                        {relativeDate(item.fecha)}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="min-w-[125px] whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex whitespace-nowrap items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.revisada
                            ? "bg-slate-100 text-slate-500"
                            : "bg-[#0DB3DE]/15 text-[#1F4C7F]"
                          }`}
                      >
                        {item.revisada ? (
                          <Check size={13} />
                        ) : (
                          <span className="size-1.5 rounded-full bg-[#0DB3DE]" />
                        )}

                        {item.revisada ? "Leída" : "No leída"}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {/* Ver */}
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="sm"
                          title="Ver detalle"
                          disabled={dialogLoading || Boolean(revisionActionId || deleteActionId) || exporting}
                          onClick={() => openDetail(item)}
                        >
                          {dialogLoading ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}
                          {dialogLoading ? "Cargando..." : "Ver"}
                        </Button>

                        {/* Eliminar */}
                        <Button
                          className="cursor-pointer"
                          variant="destructive"
                          size="sm"
                          title="Eliminar"
                          disabled={Boolean(revisionActionId || deleteActionId)}
                          onClick={(e) => requestDelete(item.idConsulta, e)}
                        >
                          {deleteActionId === item.idConsulta ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          {deleteActionId === item.idConsulta ? "Eliminando..." : "Eliminar"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="mt-4 flex flex-wrap gap-2">
          {pages.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={
                page === pageNumber
                  ? "secondary"
                  : "outline"
              }
              size="sm"
              onClick={() => setPage(pageNumber)}
              disabled={loading || Boolean(revisionActionId || deleteActionId) || exporting}
            >
              {pageNumber + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Dialog — detalle completo */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="sm:max-w-lg">
          {dialogLoading ? <ConsultationDialogSkeleton /> : selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#52C7E5]/30 text-lg font-bold text-[#1F4C7F]">
                    {initials(selectedItem.nombre)}
                  </span>

                  <div className="flex flex-col gap-1">
                    <DialogTitle className="text-[#1F4C7F]">
                      {selectedItem.nombre}
                    </DialogTitle>

                    <p className="text-xs text-slate-500">
                      Detalle de la consulta
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">

                {/* Info de contacto */}
                <div className="grid grid-cols-2 gap-6 rounded-xl p-4 text-sm">
                  <div className="flex flex-col justify-center gap-2 text-slate-700">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Mail
                        size={15}
                        className="shrink-0 text-[#0DB3DE]"
                      />
                      <p>Correo:</p>
                    </div>

                    <span>{selectedItem.correo}</span>
                  </div>

                  <div className="flex flex-col justify-center gap-2 text-slate-700">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Phone
                        size={15}
                        className="shrink-0 text-[#0DB3DE]"
                      />
                      <p>Teléfono:</p>
                    </div>

                    <span>
                      {selectedItem.telefono ||
                        "No especificado"}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center gap-2 text-slate-700">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CalendarDays
                        size={15}
                        className="shrink-0 text-[#0DB3DE]"
                      />
                      <p>Fecha y hora:</p>
                    </div>

                    <span>
                      {new Date(
                        selectedItem.fecha
                      ).toLocaleString("es-PE")}
                    </span>
                  </div>

                  {selectedItem.nombreServicio ? (
                    <div className="flex flex-col justify-center gap-2 text-slate-700">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Tag
                          size={15}
                          className="shrink-0 text-[#0DB3DE]"
                        />
                        <p>Servicio:</p>
                      </div>

                      <span>
                        {selectedItem.nombreServicio}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center gap-2 text-slate-700">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Tag
                          size={15}
                          className="shrink-0 text-[#0DB3DE]"
                        />
                        <p>Servicio:</p>
                      </div>

                      <span>Sin preferencia</span>
                    </div>
                  )}
                </div>

                {/* Mensaje */}
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between items-center">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Mensaje
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${selectedItem.revisada
                          ? "bg-slate-100 text-slate-500"
                          : "bg-[#0DB3DE]/15 text-[#1F4C7F]"
                        }`}
                    >
                      {selectedItem.revisada ? (
                        <Check size={13} />
                      ) : (
                        <span className="size-1.5 rounded-full bg-[#0DB3DE]" />
                      )}

                      {selectedItem.revisada
                        ? "Leída"
                        : "No leída"}
                    </span>
                  </div>


                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                    {selectedItem.mensaje}
                  </p>
                </div>

                {/* Estado + acciones */}
                <div className="flex items-center justify-end gap-3">
                  <div className="flex gap-2">

                    {/* Marcar como leída/no leída */}
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="sm"
                      disabled={Boolean(revisionActionId || deleteActionId)}
                      onClick={(e) =>
                        updateRevision(selectedItem, e)
                      }
                    >
                      {revisionActionId === selectedItem.idConsulta
                        ? <><Loader2 size={14} className="animate-spin" /> Guardando...</>
                        : selectedItem.revisada
                          ? "Marcar no leída"
                          : "Marcar leída"}
                    </Button>

                    {/* Eliminar */}
                    <Button
                      className="cursor-pointer"
                      variant="destructive"
                      size="sm"
                      disabled={Boolean(revisionActionId || deleteActionId)}
                      onClick={(e) => requestDelete(selectedItem.idConsulta, e)}
                    >
                      {deleteActionId === selectedItem.idConsulta ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      {deleteActionId === selectedItem.idConsulta ? "Eliminando..." : "Eliminar"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <DeleteConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="¿Eliminar esta consulta?"
        description="La consulta se eliminará permanentemente. Esta acción no se puede deshacer."
        loading={deleteActionId !== null}
        onConfirm={async () => {
          if (deleteTarget === null) return;
          await deleteConsultation(deleteTarget);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
