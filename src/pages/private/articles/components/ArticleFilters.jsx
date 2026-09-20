import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ArticleFilters({ search, category, categories, onSearchChange, onCategoryChange }) {
  return (
    <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px]">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por título o descripción"
        className="h-10 rounded-md border border-slate-300 px-3 text-sm"
      />
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
      >
        <option value="">Todas las categorías</option>
        {categories.map((item) => (
          <option key={item.idCategoria} value={item.idCategoria}>{item.nombre}</option>
        ))}
      </select>
      <Link to="/admin/noticias/nuevo" className="flex w-full md:hidden">
        <Button className="w-full">Crear artículo</Button>
      </Link>
    </div>
  );
}
