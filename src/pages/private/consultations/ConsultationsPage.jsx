import { useEffect, useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import {
  actualizarRevisionConsulta,
  eliminarConsultaAdmin,
  exportarConsultasAdmin,
  listarConsultasAdmin,
  obtenerConsultaAdmin,
} from "@/services/consultasService";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import AdminPageHeader from "@/pages/private/components/AdminPageHeader";
import AdminPagination from "@/pages/private/components/AdminPagination";
import ConsultationFilters from "./components/ConsultationFilters";
import ConsultationTable from "./components/ConsultationTable";
import ConsultationDetailDialog from "./components/ConsultationDetailDialog";
import { csvValue } from "./components/consultationUtils";

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [dialogLoadingId, setDialogLoadingId] = useState(null);
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
      const data = await listarConsultasAdmin({ page: currentPage, size: 10 });
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

  const openDetail = async (item) => {
    setSelectedItem(null);
    setDialogOpen(true);
    setDialogLoading(true);
    setDialogLoadingId(item.idConsulta);
    try {
      setSelectedItem(await obtenerConsultaAdmin(item.idConsulta));
    } catch (error) {
      setDialogOpen(false);
      toast.danger(error.message || "No se pudo cargar el detalle");
    } finally {
      setDialogLoading(false);
      setDialogLoadingId(null);
    }
  };

  const updateRevision = async (item, event) => {
    event?.stopPropagation();
    if (revisionActionId || deleteActionId) return;
    setRevisionActionId(item.idConsulta);
    try {
      const updated = await actualizarRevisionConsulta(item.idConsulta, !item.revisada);
      setConsultations((items) => items.map((current) => current.idConsulta === item.idConsulta ? updated : current));
      if (selectedItem?.idConsulta === item.idConsulta) setSelectedItem(updated);
      toast.success(updated.revisada ? "Marcada como leída" : "Marcada como no leída");
    } catch (error) {
      toast.danger(error.message || "No se pudo actualizar");
    } finally {
      setRevisionActionId(null);
    }
  };

  const deleteConsultation = async (id, event) => {
    event?.stopPropagation();
    setDeleteActionId(id);
    try {
      await eliminarConsultaAdmin(id);
      setConsultations((items) => items.filter((item) => item.idConsulta !== id));
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

  const requestDelete = (id, event) => {
    event?.stopPropagation();
    setDeleteTarget(id);
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const items = await exportarConsultasAdmin();
      const headers = ["Nombre", "Correo", "Teléfono", "Servicio", "Fecha", "Estado", "Mensaje"];
      const rows = items.map((item) => [
        item.nombre,
        item.correo,
        item.telefono,
        item.nombreServicio,
        new Date(item.fecha).toLocaleString("es-PE"),
        item.revisada ? "Leída" : "No leída",
        item.mensaje,
      ]);
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
      toast.danger(error.message || "No se pudieron exportar");
    } finally {
      setExporting(false);
    }
  };

  const services = useMemo(() => [...new Set(consultations.map((item) => item.nombreServicio).filter(Boolean))], [consultations]);

  const filteredConsultations = useMemo(() => consultations.filter((item) => {
    const term = search.trim().toLowerCase();
    const itemDate = new Date(item.fecha);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const matchesText = !term || `${item.idConsulta} ${item.nombre} ${item.correo} ${item.nombreServicio || ""}`.toLowerCase().includes(term);
    const matchesService = !serviceFilter || item.nombreServicio === serviceFilter;
    const matchesDate = !dateFilter || (dateFilter === "week" ? itemDate >= startOfWeek : itemDate >= startOfMonth);
    return matchesText && matchesService && matchesDate;
  }), [consultations, search, serviceFilter, dateFilter]);

  const pages = useMemo(() => Array.from({ length: Math.max(1, Math.ceil(total / 10)) }, (_, index) => index), [total]);
  const busy = Boolean(revisionActionId || deleteActionId);

  const resetPageAnd = (setter) => (value) => {
    setter(value);
    setPage(0);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <AdminPageHeader
          title="Consultas del formulario"
          description="Revisa, filtra y organiza las solicitudes recibidas."
          actions={<Button className="w-full cursor-pointer md:w-auto" onClick={exportCsv} disabled={exporting}>{exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}{exporting ? "Exportando..." : "Exportar CSV"}</Button>}
        />
        <ConsultationFilters
          search={search}
          serviceFilter={serviceFilter}
          dateFilter={dateFilter}
          services={services}
          onSearchChange={resetPageAnd(setSearch)}
          onServiceChange={resetPageAnd(setServiceFilter)}
          onDateChange={resetPageAnd(setDateFilter)}
        />
        <ConsultationTable
          consultations={filteredConsultations}
          loading={loading}
          onOpenDetail={openDetail}
          onRequestDelete={requestDelete}
          dialogLoadingId={dialogLoadingId}
          revisionActionId={revisionActionId}
          deleteActionId={deleteActionId}
          exporting={exporting}
        />
        <AdminPagination pages={pages} currentPage={page} onPageChange={setPage} disabled={loading || busy || exporting} />
      </div>

      <ConsultationDetailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        loading={dialogLoading}
        item={selectedItem}
        revisionActionId={revisionActionId}
        deleteActionId={deleteActionId}
        onUpdateRevision={() => updateRevision(selectedItem)}
        onRequestDelete={requestDelete}
      />

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
