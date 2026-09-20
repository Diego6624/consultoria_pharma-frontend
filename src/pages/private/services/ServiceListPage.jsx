import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { listarServiciosAdmin, eliminarServicio } from "@/services/serviciosService";
import { listarCategoriasPorTipo } from "@/services/categoriasService";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import AdminPageHeader from "@/pages/private/components/AdminPageHeader";
import AdminPagination from "@/pages/private/components/AdminPagination";
import { Plus } from "lucide-react";
import ServiceFilters from "./components/ServiceFilters";
import ServiceTable from "./components/ServiceTable";

export default function ServiceListPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await listarServiciosAdmin({ page, size: 10 });
      setServices(data?.content || []);
      setTotal(data?.totalElements ?? 0);
    } catch (error) {
      toast.danger(error.message || "No se pudieron cargar los servicios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadServices(); }, [page]);
  useEffect(() => {
    listarCategoriasPorTipo("SERVICIO").then(setCategories).catch(() => toast.danger("No se pudieron cargar las categorías"));
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await eliminarServicio(id);
      setServices((current) => current.filter((service) => service.idServicio !== id));
      toast.success("Servicio eliminado");
    } catch (error) {
      toast.danger(error.message || "No se pudo eliminar el servicio");
    } finally {
      setDeletingId(null);
    }
  };

  const requestDelete = (service) => setDeleteTarget(service);

  const visibleServices = services.filter((service) => {
    const term = search.trim().toLowerCase();
    return (!term || `${service.idServicio} ${service.titulo} ${service.descripcion}`.toLowerCase().includes(term)) && (!category || String(service.idCategoria) === category);
  });
  const pages = useMemo(() => Array.from({ length: Math.ceil(total / 10) }, (_, index) => index), [total]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
        <div className="mb-6">
          <AdminPageHeader
            title="Servicios"
            description="Administra los servicios que se muestran en el sitio."
            actions={<Link to="/admin/servicios/nuevo" className="hidden md:flex"><Button className="cursor-pointer"><Plus size={16} />Crear servicio</Button></Link>}
          />
        </div>
        <ServiceFilters search={search} category={category} categories={categories} onSearchChange={(value) => { setSearch(value); setPage(0); }} onCategoryChange={(value) => { setCategory(value); setPage(0); }} />
        <ServiceTable services={visibleServices} loading={loading} deletingId={deletingId} onDelete={requestDelete} />
        <AdminPagination pages={pages} currentPage={page} onPageChange={setPage} disabled={loading || Boolean(deletingId)} />
      </div>
      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="¿Eliminar este servicio?"
        description="El servicio se eliminará permanentemente del catálogo público. Esta acción no se puede deshacer."
        loading={Boolean(deletingId)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await handleDelete(deleteTarget.idServicio);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
