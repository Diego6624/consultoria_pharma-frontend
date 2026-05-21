import { useState, useEffect } from "react";
import BannerMain from "./components/BannerMain";
import SearchServices from "./components/SearchServices";
import ServicesList from "@/components/ServicesList";
import { servicesData } from "./data/servicesData";

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Extraer categorías únicas de los datos
  const categories = [...new Set(servicesData.map(service => service.category))];

  // Simular carga
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BannerMain />
      <SearchServices
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      <ServicesList
        services={servicesData}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        isLoading={isLoading}
      />
    </>
  );
};

export default ServicesPage;

