import { CalendarDays, Check, Eye, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminTableSkeleton } from "@/components/admin/AdminSkeletons";
import { initials, relativeDate } from "./consultationUtils";

export default function ConsultationTable({
  consultations,
  loading,
  onOpenDetail,
  onRequestDelete,
  dialogLoadingId,
  revisionActionId,
  deleteActionId,
  exporting,
}) {
  const busy = Boolean(revisionActionId || deleteActionId);

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-[760px] w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="whitespace-nowrap px-4 py-3">ID</th><th className="min-w-[210px] whitespace-nowrap px-4 py-3">Contacto</th>
            <th className="min-w-[170px] whitespace-nowrap px-4 py-3">Servicio</th>
            <th className="min-w-[145px] whitespace-nowrap px-4 py-3">Fecha</th>
            <th className="min-w-[125px] whitespace-nowrap px-4 py-3">Estado</th>
            <th className="min-w-[190px] whitespace-nowrap px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <AdminTableSkeleton columns={6} /> : consultations.length === 0 ? (
            <tr><td colSpan="6" className="px-4 py-8 text-center text-slate-500">No hay consultas que coincidan.</td></tr>
          ) : consultations.map((item) => (
            <tr key={item.idConsulta} className="border-t border-slate-200 transition-colors hover:bg-slate-50">
              <td className="px-4 py-3 font-mono text-xs text-slate-500">{item.idConsulta}</td><td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#52C7E5]/30 font-bold text-[#1F4C7F]">{initials(item.nombre)}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-semibold text-slate-800">{item.nombre}</p>
                      {!item.revisada ? <span className="size-2 shrink-0 rounded-full bg-[#0DB3DE]" /> : null}
                    </div>
                    <p className="truncate text-xs text-slate-500">{item.correo}</p>
                  </div>
                </div>
              </td>
              <td className="min-w-[170px] whitespace-nowrap px-4 py-3">
                {item.nombreServicio ? <span className="inline-block whitespace-nowrap rounded-full bg-[#52C7E5]/25 px-2.5 py-1 text-xs font-semibold text-[#1F4C7F]">{item.nombreServicio}</span> : <span className="whitespace-nowrap text-xs text-slate-400">Sin preferencia</span>}
              </td>
              <td className="min-w-[145px] whitespace-nowrap px-4 py-3">
                <span title={new Date(item.fecha).toLocaleString("es-PE")} className="inline-flex whitespace-nowrap items-center gap-1 text-xs text-slate-600"><CalendarDays size={14} />{relativeDate(item.fecha)}</span>
              </td>
              <td className="min-w-[125px] whitespace-nowrap px-4 py-3">
                <span className={`inline-flex whitespace-nowrap items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.revisada ? "bg-slate-100 text-slate-500" : "bg-[#0DB3DE]/15 text-[#1F4C7F]"}`}>
                  {item.revisada ? <Check size={13} /> : <span className="size-1.5 rounded-full bg-[#0DB3DE]" />}
                  {item.revisada ? "Leída" : "No leída"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <Button className="cursor-pointer" variant="outline" size="sm" title="Ver detalle" disabled={Boolean(dialogLoadingId) || busy || exporting} onClick={() => onOpenDetail(item)}>
                    {dialogLoadingId === item.idConsulta ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}
                    {dialogLoadingId === item.idConsulta ? "Cargando..." : "Ver"}
                  </Button>
                  <Button className="cursor-pointer" variant="destructive" size="sm" title="Eliminar" disabled={busy} onClick={(event) => onRequestDelete(item.idConsulta, event)}>
                    {deleteActionId === item.idConsulta ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    {deleteActionId === item.idConsulta ? "Eliminando..." : "Eliminar"}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
