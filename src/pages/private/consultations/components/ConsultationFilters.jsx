import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ConsultationFilters({
  search,
  serviceFilter,
  dateFilter,
  services,
  onSearchChange,
  onServiceChange,
  onDateChange,
}) {
  return (
    <div className="mt-6 grid gap-3 md:grid-cols-[1fr_190px_170px]">
      <Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar por ID, nombre, correo o servicio" className="h-10 w-full" />

      <Select value={serviceFilter || "all"} onValueChange={(value) => onServiceChange(value === "all" ? "" : value)}>
        <SelectTrigger className="!h-10 w-full bg-white"><SelectValue placeholder="Todos los servicios" /></SelectTrigger>
        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
          <SelectItem value="all">Todos los servicios</SelectItem>
          {services.map((service) => <SelectItem key={service} value={service}>{service}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={dateFilter || "all"} onValueChange={(value) => onDateChange(value === "all" ? "" : value)}>
        <SelectTrigger className="!h-10 w-full bg-white"><SelectValue placeholder="Todas las fechas" /></SelectTrigger>
        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
          <SelectItem value="all">Todas las fechas</SelectItem>
          <SelectItem value="week">Esta semana</SelectItem>
          <SelectItem value="month">Este mes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
