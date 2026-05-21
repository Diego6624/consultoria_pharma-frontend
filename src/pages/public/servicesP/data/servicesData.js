import imageCard from '/public/images/imageCards.jpg';
import imageCard2 from '/public/images/imageCards2.jpg';
import imageCard3 from '/public/images/imageCards3.jpg';

export const servicesData = [
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
    image: imageCard,
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
    image: imageCard2,
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
    image: imageCard3,
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
    image: imageCard2,
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
    image: imageCard,
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
    image: imageCard3,
  },
];
