import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function ServiceFilters({ search, category, categories, onSearchChange, onCategoryChange }) {
  return (
    <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px]">
      <Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar por ID, título o descripción" className="h-10 w-full" />
      <Select value={category || "all"} onValueChange={(value) => onCategoryChange(value === "all" ? "" : value)}>
        <SelectTrigger className="!h-10 w-full bg-white">
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)] min-w-[220px]">
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((item) => <SelectItem key={item.idCategoria} value={String(item.idCategoria)}>{item.nombre}</SelectItem>)}
        </SelectContent>
      </Select>
      <Link to="/admin/servicios/nuevo" className="flex w-full md:hidden"><Button className="w-full"><Plus size={16} />Crear servicio</Button></Link>
    </div>
  );
}
