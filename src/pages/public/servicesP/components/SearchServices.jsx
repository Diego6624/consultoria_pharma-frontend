
import { Search, X } from "lucide-react";

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
    <section className="py-12 px-8 md:px-16 lg:px-32 2xl:px-44">
      <div className="flex flex-col gap-6">
        {/* Título */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600">
            Encuentra el servicio que necesitas filtrando por categoría o buscando por nombre
          </p>
        </div>

        {/* Controles de búsqueda y filtro */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Input de búsqueda */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Busca un servicio..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Select de categorías */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent min-w-56 bg-white cursor-pointer hover:border-gray-400 transition-colors"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default SearchServices;