import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SearchServices = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <section className="px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Controles de búsqueda y filtro */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Input de búsqueda */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <Input
              type="text"
              placeholder="Busca un servicio..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-12 rounded-lg border-gray-300 py-0 pl-12 pr-10 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-cyan-400"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Select de categorías */}
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) => onCategoryChange(value === "all" ? "" : value)}
          >
            <SelectTrigger className="!h-12 w-full min-w-56 md:w-auto rounded-lg border-gray-300 bg-white px-4 py-0 hover:border-gray-400 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-cyan-400">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)] min-w-56">
              <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>
    </section>
  );
};

export default SearchServices;
