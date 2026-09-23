import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceIconPicker from "@/components/admin/ServiceIconPicker";

export default function ServiceHomeOrderStep({ selected, onMove, onIconChange }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-800">Define el orden y los iconos</h3>
        <p className="text-sm text-slate-500">Estos servicios aparecerán de izquierda a derecha en Inicio.</p>
      </div>
      <div className="space-y-3">
        {selected.map((service, index) => (
          <div key={service.idServicio} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1F4C7F] text-sm font-bold text-white">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{service.titulo}</p>
                <p className="truncate text-xs text-[#1F4C7F]">{service.nombreCategoria || "Sin categoría"}</p>
              </div>
              <div className="flex gap-1">
                <Button className={"cursor-pointer"} type="button" variant="outline" size="icon-sm" title="Subir" disabled={index === 0} onClick={() => onMove(index, -1)}>
                  <ArrowUp size={15} />
                </Button>
                <Button className={"cursor-pointer"} type="button" variant="outline" size="icon-sm" title="Bajar" disabled={index === selected.length - 1} onClick={() => onMove(index, 1)}>
                  <ArrowDown size={15} />
                </Button>
              </div>
            </div>
            <ServiceIconPicker value={service.iconoInicio} onChange={(value) => onIconChange(service.idServicio, value)} />
          </div>
        ))}
        {selected.length === 0 &&
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
            Regresa al paso anterior y selecciona al menos un servicio.
          </div>
        }
      </div>
    </div>
  );
}
