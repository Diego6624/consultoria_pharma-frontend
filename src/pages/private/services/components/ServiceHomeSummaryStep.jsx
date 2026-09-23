import { CheckCircle2 } from "lucide-react";
import { getServiceIconComponent } from "@/components/admin/serviceIconCatalog";

export default function ServiceHomeSummaryStep({ selected }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Revisa tu configuración
        </h3>
        <p className="text-sm text-slate-500">Confirma el resultado antes de finalizar.</p>
      </div>
      <div className="rounded-xl border border-[#0DB3DE]/30 bg-sky-50/60 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1F4C7F]">
          <CheckCircle2 size={18} />
          {selected.length} servicio{selected.length === 1 ? "" : "s"} seleccionado{selected.length === 1 ? "" : "s"}
        </div>
        <p className="text-xs text-slate-600">Se mostrarán en este orden dentro de “Nuestros Servicios Especializados”.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {selected.map((service, index) => {
          const Icon = getServiceIconComponent(service.iconoInicio);
          return <div key={service.idServicio} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <span className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-[#0DB3DE] text-white">
              <Icon size={20} /></span>
            <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#0DB3DE]">Posición {index + 1}</span>
            <p className="line-clamp-2 text-sm font-semibold text-slate-800">
              {service.titulo}
            </p>
            <p className="mt-1 line-clamp-1 text-xs text-slate-500">
              {service.nombreCategoria || "Sin categoría"}
            </p>
          </div>;
        })}
        {selected.length === 0 &&
          <p className="col-span-full rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            No hay servicios seleccionados.
          </p>
        }
      </div>
    </div>
  );
}
