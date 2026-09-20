import ServicesCards from "@/components/ServicesCards";
import { motion } from "framer-motion";

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

  if (filteredServices.length === 0) {
    return (
      <section className="px-8 py-12 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
        <div className="flex flex-col items-center justify-center min-h-96 gap-4">
          <p className="text-lg text-gray-600">No se encontraron servicios que coincidan con tu búsqueda.</p>
          <p className="text-sm text-gray-500">Intenta con otros términos o categorías.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <ServicesCards
              {...service}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
