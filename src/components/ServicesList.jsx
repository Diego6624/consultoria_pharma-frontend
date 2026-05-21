import ServicesCard from "@/components/ServiceCard";

const ServicesList = ({ 
  services, 
  searchTerm, 
  selectedCategory, 
  isLoading 
}) => {
  // Filtrar servicios
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <section className="px-8 md:px-16 lg:px-32 2xl:px-44 py-12">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      </section>
    );
  }

  if (filteredServices.length === 0) {
    return (
      <section className="px-8 md:px-16 lg:px-32 2xl:px-44 py-12">
        <div className="flex flex-col items-center justify-center min-h-96 gap-4">
          <p className="text-lg text-gray-600">No se encontraron servicios que coincidan con tu búsqueda.</p>
          <p className="text-sm text-gray-500">Intenta con otros términos o categorías.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 md:px-16 lg:px-32 2xl:px-44 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <ServicesCard
            key={service.id}
            {...service}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
