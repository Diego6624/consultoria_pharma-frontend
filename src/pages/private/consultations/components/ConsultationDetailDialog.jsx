import { CalendarDays, Check, CheckCheck, EyeOff, Loader2, Mail, Phone, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConsultationDialogSkeleton } from "@/components/admin/AdminSkeletons";
import { initials } from "./consultationUtils";

export default function ConsultationDetailDialog({
  open,
  onOpenChange,
  loading,
  item,
  revisionActionId,
  deleteActionId,
  onUpdateRevision,
  onRequestDelete,
}) {
  const busy = Boolean(revisionActionId || deleteActionId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {loading ? <ConsultationDialogSkeleton /> : item ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#52C7E5]/30 text-lg font-bold text-[#1F4C7F]">{initials(item.nombre)}</span>
                <div className="flex flex-col gap-1">
                  <DialogTitle className="text-[#1F4C7F]">{item.nombre}</DialogTitle>
                  <p className="text-xs text-slate-500">Detalle de la consulta</p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6 rounded-xl p-4 text-sm">
                <ContactField icon={Mail} label="Correo:" value={item.correo} />
                <ContactField icon={Phone} label="Teléfono:" value={item.telefono || "No especificado"} />
                <ContactField icon={CalendarDays} label="Fecha y hora:" value={new Date(item.fecha).toLocaleString("es-PE")} />
                <ContactField icon={Tag} label="Servicio:" value={item.nombreServicio || "Sin preferencia"} />
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Mensaje</p>
                  <StatusBadge revisada={item.revisada} />
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{item.mensaje}</p>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button className="cursor-pointer" variant="outline" size="sm" disabled={busy} onClick={onUpdateRevision}>
                  {revisionActionId === item.idConsulta ? <><Loader2 size={14} className="animate-spin" /> Guardando...</> : <>{item.revisada ? <EyeOff size={14} /> : <CheckCheck size={14} />}{item.revisada ? "Marcar no leída" : "Marcar leída"}</>}
                </Button>
                <Button className="cursor-pointer" variant="destructive" size="sm" disabled={busy} onClick={(event) => onRequestDelete(item.idConsulta, event)}>
                  {deleteActionId === item.idConsulta ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  {deleteActionId === item.idConsulta ? "Eliminando..." : "Eliminar"}
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function ContactField({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col justify-center gap-2 text-slate-700">
      <div className="flex items-center gap-1.5 font-semibold"><Icon size={15} className="shrink-0 text-[#0DB3DE]" /><p>{label}</p></div>
      <span>{value}</span>
    </div>
  );
}

function StatusBadge({ revisada }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${revisada ? "bg-slate-100 text-slate-500" : "bg-[#0DB3DE]/15 text-[#1F4C7F]"}`}>
      {revisada ? <Check size={13} /> : <span className="size-1.5 rounded-full bg-[#0DB3DE]" />}
      {revisada ? "Leída" : "No leída"}
    </span>
  );
}
