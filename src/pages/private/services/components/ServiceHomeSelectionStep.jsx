import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getServiceIconComponent } from "@/components/admin/serviceIconCatalog";

const PAGE_SIZE = 10;

export default function ServiceHomeSelectionStep({ services, selectedIds, search, onSearchChange, onToggle }) {
  const [page, setPage] = useState(0);
  const term = search.trim().toLowerCase();
  const visibleServices = services.filter((service) => `${service.titulo} ${service.nombreCategoria || ""}`.toLowerCase().includes(term));
  const totalPages = Math.ceil(visibleServices.length / PAGE_SIZE);
  const pageServices = visibleServices.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    if (totalPages > 0 && page >= totalPages) setPage(totalPages - 1);
  }, [page, totalPages]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-800">Selecciona los servicios</h3>
        <p className="text-sm text-slate-500">Elige hasta 3 servicios para mostrar en la página principal.</p>
      </div>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar por nombre del servicio" className="h-10 pl-9" />
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500"><span>{visibleServices.length} servicios encontrados</span><span>{selectedIds.size}/3 seleccionados</span></div>
      <div className="grid max-h-72 gap-2 overflow-y-auto rounded-xl border border-slate-200 p-2 sm:grid-cols-2">
        {pageServices.map((service) => {
          const isSelected = selectedIds.has(service.idServicio);
          const Icon = getServiceIconComponent(service.iconoInicio);
          return (
            <button key={service.idServicio} type="button" onClick={() => onToggle(service)} className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${isSelected ? "border-[#0DB3DE] bg-sky-50" : "border-transparent hover:bg-slate-50"}`}>
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${isSelected ? "bg-[#0DB3DE] text-white" : "bg-slate-100 text-slate-500"}`}><Icon size={18} /></span>
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-slate-800">{service.titulo}</span><span className="block truncate text-xs text-[#1F4C7F]">{service.nombreCategoria || "Sin categoría"}</span></span>
              {isSelected && <Check size={18} className="shrink-0 text-[#0DB3DE]" />}
            </button>
          );
        })}
        {visibleServices.length === 0 && <p className="col-span-full p-8 text-center text-sm text-slate-500">No se encontraron servicios.</p>}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
          <span className="text-xs text-slate-500">Página {page + 1} de {totalPages}</span>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="icon-sm" title="Página anterior" onClick={() => setPage((current) => Math.max(current - 1, 0))} disabled={page === 0}><ChevronLeft size={16} /></Button>
            <Button type="button" variant="outline" size="icon-sm" title="Página siguiente" onClick={() => setPage((current) => Math.min(current + 1, totalPages - 1))} disabled={page >= totalPages - 1}><ChevronRight size={16} /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
