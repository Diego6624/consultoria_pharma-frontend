import { Input } from "@/components/ui/input";

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
      <Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar por ID, nombre, correo o servicio" />

      <select value={serviceFilter} onChange={(event) => onServiceChange(event.target.value)} className="h-9 rounded-md border border-input bg-white px-3 text-sm">
        <option value="">Todos los servicios</option>
        {services.map((service) => <option key={service} value={service}>{service}</option>)}
      </select>

      <select value={dateFilter} onChange={(event) => onDateChange(event.target.value)} className="h-9 rounded-md border border-input bg-white px-3 text-sm">
        <option value="">Todas las fechas</option>
        <option value="week">Esta semana</option>
        <option value="month">Este mes</option>
      </select>
    </div>
  );
}
