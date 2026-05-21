import { useState } from "react";
import BannerMain from "./components/BannerMain";
import SearchServices from "./components/SearchServices";
import ServicesList from "@/components/ServicesList";
import imageServices1 from "/images/imageServices2.jpg";
import imageServices2 from "/images/imageServices3.jpg";
import imageServices3 from "/images/imageServices4.jpg";
import imageServices4 from "/images/imageServices5.jpg";
import imageServices5 from "/images/imageServices6.jpg";
import imageServices6 from "/images/imageServices7.jpg";

const servicesData = [
  {
    id: 'registros-sanitarios',
    category: 'Regulatorio',
    title: 'Registros Sanitarios',
    description: 'Inscripción y renovación de productos médicos.',
    features: [
      'Inscripción en DIGEMID',
      'Renovación de certificados',
      'Modificaciones técnicas'
    ],
    image: imageServices1,
  },
  {
    id: 'certificaciones-bpa',
    category: 'Calidad',
    title: 'Certificaciones BPA',
    description: 'Implementación de Buenas Prácticas de Almacenamiento.',
    features: [
      'Manuales de calidad',
      'Auditorías preventivas',
      'Capacitación al personal'
    ],
    image: imageServices2,
  },
  {
    id: 'autorizacion-local',
    category: 'Gestión',
    title: 'Autorización de Local',
    description: 'Apertura y traslado de establecimientos farmacéuticos.',
    features: [
      'Revisión de planos',
      'Trámites de apertura',
      'Dirección técnica'
    ],
    image: imageServices3,
  },
  {
    id: 'certificaciones-bpm',
    category: 'Calidad',
    title: 'Certificaciones BPM',
    description: 'Aseguramos las Buenas Prácticas de Manufactura.',
    features: [
      'Control de procesos',
      'Validación de equipos',
      'Gestión de riesgos'
    ],
    image: imageServices4,
  },
  {
    id: 'farmacovigilancia',
    category: 'Regulatorio',
    title: 'Farmacovigilancia',
    description: 'Monitoreo continuo de seguridad en medicamentos.',
    features: [
      'Reporte de reacciones',
      'Planes de gestión',
      'Auditorías de seguridad'
    ],
    image: imageServices5,
  },
  {
    id: 'apertura-drogerias',
    category: 'Gestión',
    title: 'Apertura de Droguerías',
    description: 'Asesoría integral para iniciar operaciones comerciales.',
    features: [
      'Licencias de funcionamiento',
      'Inspecciones previas',
      'Asesoría municipal'
    ],
    image: imageServices6,
  },
];

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Extraer categorías únicas de los datos
  const categories = [...new Set(servicesData.map(service => service.category))];

  return (
    <>
      <BannerMain />
      <div className="py-12 flex flex-col gap-12">
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
      </div>
    </>
  );
};

export default ServicesPage;

