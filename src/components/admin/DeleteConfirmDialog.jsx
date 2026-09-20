import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  title = "¿Confirmar eliminación?",
  description = "Esta acción no se puede deshacer.",
  loading = false,
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={loading ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-start gap-2">      
              <DialogTitle className="text-red-500 text-base">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" className="cursor-pointer" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" className="cursor-pointer" onClick={onConfirm} disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? "Eliminando..." : <><Trash2 size={16} />Eliminar</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
