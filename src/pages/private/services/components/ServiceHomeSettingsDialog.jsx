import { useEffect, useMemo, useState } from "react";
import { Loader2, Settings2 } from "lucide-react";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminStepper from "@/pages/private/components/AdminStepper";
import ServiceHomeSelectionStep from "./ServiceHomeSelectionStep";
import ServiceHomeOrderStep from "./ServiceHomeOrderStep";
import ServiceHomeSummaryStep from "./ServiceHomeSummaryStep";
import { actualizarConfiguracionServiciosInicio, listarConfiguracionServiciosInicio } from "@/services/serviciosService";

const steps = [{ label: "Seleccionar" }, { label: "Personalizar" }, { label: "Confirmar" }];

export default function ServiceHomeSettingsDialog({ open, onOpenChange, onSaved }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setCurrentStep(0);
    setSearch("");
    setLoading(true);
    listarConfiguracionServiciosInicio()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setServices(list);
        setSelected(list.filter((service) => service.mostrarEnInicio).sort((a, b) => (a.ordenInicio || 99) - (b.ordenInicio || 99)));
      })
      .catch((error) => toast.danger(error.message || "No se pudo cargar la configuración de Inicio"))
      .finally(() => setLoading(false));
  }, [open]);

  const selectedIds = useMemo(() => new Set(selected.map((service) => service.idServicio)), [selected]);

  const toggleService = (service) => {
    if (selectedIds.has(service.idServicio)) {
      setSelected((current) => current.filter((item) => item.idServicio !== service.idServicio));
      return;
    }
    if (selected.length >= 3) {
      toast.warning("Solo puedes seleccionar 3 servicios para Inicio");
      return;
    }
    setSelected((current) => [...current, { ...service, iconoInicio: service.iconoInicio || "ClipboardCheck" }]);
  };

  const moveService = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= selected.length) return;
    setSelected((current) => {
      const next = [...current];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const updateIcon = (idServicio, iconoInicio) => {
    setSelected((current) => current.map((service) => service.idServicio === idServicio ? { ...service, iconoInicio } : service));
  };

  const goNext = () => {
    if (currentStep === 0 && selected.length === 0) {
      toast.warning("Selecciona al menos un servicio para continuar");
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await actualizarConfiguracionServiciosInicio(selected.map((service, index) => ({ idServicio: service.idServicio, ordenInicio: index + 1, iconoInicio: service.iconoInicio || "ClipboardCheck" })));
      toast.success("Servicios de Inicio actualizados");
      onOpenChange(false);
      onSaved?.();
    } catch (error) {
      toast.danger(error.message || "No se pudo guardar la configuración");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={saving ? undefined : onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#1F4C7F]">
            <Settings2 size={18} className="text-[#0DB3DE]" />Configurar servicios de Inicio</DialogTitle>
          <DialogDescription>
            Selecciona, personaliza y confirma los servicios que aparecerán en la página principal.
          </DialogDescription>
        </DialogHeader>
        <AdminStepper steps={steps} currentStep={currentStep} />
        {loading ?
          <div className="flex min-h-48 items-center justify-center text-sm text-slate-500">
            <Loader2 size={18} className="mr-2 animate-spin" />
            Cargando servicios...
          </div>
          : currentStep === 0 ?
            <ServiceHomeSelectionStep services={services} selectedIds={selectedIds} search={search} onSearchChange={setSearch} onToggle={toggleService} />
            : currentStep === 1 ?
              <ServiceHomeOrderStep selected={selected} onMove={moveService} onIconChange={updateIcon} />
              :
              <ServiceHomeSummaryStep selected={selected} />}
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end">
          {/* <Button type="button" variant="outline" className="cursor-pointer" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancelar
          </Button> */}
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            {currentStep > 0 && <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setCurrentStep((step) => step - 1)} disabled={saving}>
              Anterior
            </Button>}
            {currentStep < steps.length - 1 ?
              <Button type="button" className="cursor-pointer bg-[#1F4C7F] hover:bg-[#173a63]" onClick={goNext} disabled={loading}>
                Continuar
              </Button>
              : <Button type="button" className="cursor-pointer bg-[#1F4C7F] hover:bg-[#173a63]" onClick={handleSave} disabled={saving}>
                {saving ?
                  <>
                    <Loader2 size={16} className="animate-spin" />Guardando...</>
                  : "Finalizar configuración"
                }
              </Button>
            }
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
