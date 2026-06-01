import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const SearchNews = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    // Datos de ejemplo de noticias
    const noticias = [
        {
            id: 1,
            titulo: "Conoce el nuevo reglamento para boticas 2026",
            descripcion: "DIGEMID actualiza los requisitos obligatorios para la apertura de nuevas boticas y farmacias a nivel nacional. Evita multas revisando estos cambios.",
            imagen: "images/imageNews2.jpg",
            categoria: "Normativa",
            fecha: "02 Mar 2026"
        },
        {
            id: 2,
            titulo: "Alerta por circulación de lotes falsificados",
            descripcion: "Autoridades advierten sobre el incremento de lotes falsificados en el mercado. Aprende a identificar y reportar estos productos en tu establecimiento.",
            imagen: "images/imageNews3.jpg",
            categoria: "Alerta Sanitaria",
            fecha: "28 Feb 2026"
        },
        {
            id: 3,
            titulo: "Claves principales para superar auditorías BPA",
            descripcion: "Superar una inspección de Buenas Prácticas de Almacenamiento requiere preparación. Conoce los tres errores más comunes que debes evitar.",
            imagen: "images/imageNews4.jpg",
            categoria: "Calidad",
            fecha: "20 Feb 2026"
        },
        {
            id: 4,
            titulo: "Guía para digitalizar tus recetas médicas",
            descripcion: "La receta electrónica avanza en Perú. Descubre cómo adaptar el sistema de tu farmacia para cumplir con este nuevo estándar digital.",
            imagen: "images/imageNews5.jpg",
            categoria: "Tecnología",
            fecha: "15 Feb 2026"
        },
        {
            id: 5,
            titulo: "Evita duras sanciones por publicidad indebida",
            descripcion: "Indecopi y DIGEMID intensifican fiscalización sobre la publicidad de productos farmacéuticos no autorizados. Protege la reputación de tu negocio.",
            imagen: "images/imageNews6.jpg",
            categoria: "Tecnología",
            fecha: "10 Feb 2026"
        },
        {
            id: 6,
            titulo: "Trámites para importar tus dispositivos médicos",
            descripcion: "Guía paso a paso para agilizar los trámites aduaneros y obtener tu registro sanitario de equipos médicos sin demoras ni reprocesos.",
            imagen: "images/imageNews7.jpg",
            categoria: "Tecnología",
            fecha: "05 Feb 2026"
        }
    ];

    // Filtrar noticias según búsqueda y categoría
    const noticiasFiltradas = noticias.filter(noticia => {
        const coincideTexto = noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            noticia.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const coincideCategoria = selectedCategory === 'Todas las categorías' ||
            noticia.categoria.toLowerCase() === selectedCategory.toLowerCase();
        return coincideTexto && coincideCategoria;
    });

    return (<>
        <section className="px-8 md:px-16 lg:px-32 2xl:px-44 py-12">
            {/* Barra de búsqueda y filtros */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="flex-1 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={20} />
                        </div>
                        {/* Input de búsqueda */}
                        <input
                            type="text"
                            placeholder="Busca alguna noticia"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
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
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent min-w-56 bg-white cursor-pointer hover:border-gray-400 transition-colors"
                    >
                        <option>Todas las categorías</option>
                        <option>Normativa</option>
                        <option>Alerta Sanitaria</option>
                        <option>Calidad</option>
                        <option>Tecnología</option>
                        <option>Gestión</option>
                        <option>Comercio</option>
                        <option>Seguridad</option>
                        <option>Manufactura</option>
                        <option>E-commerce</option>
                    </select>
                </div>

                {/* Grid de noticias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {noticiasFiltradas.map((noticia, index) => (
                        <motion.div
                            key={noticia.id}
                            className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: (index % 6) * 0.12, ease: 'easeOut' }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* Imagen con badge superpuesto */}
                            <div className="w-full h-48 bg-gray-300 overflow-hidden relative group">
                                <img
                                    src={noticia.imagen}
                                    alt={noticia.titulo}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Badge de categoría */}
                                <div className="absolute top-4 left-0">
                                    <span className=" bg-[#1699BC] inline-block px-2.5 py-1 text-white font-semibold text-sm shadow-sm">
                                        {noticia.categoria}
                                    </span>
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="flex flex-col flex-1 p-4 gap-5 bg-white">
                                {/* Descripción y título */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">{noticia.titulo}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">{noticia.descripcion}</p>
                                </div>
                                <p className="text-gray-500 text-xs">- {noticia.fecha}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mensaje si no hay noticias */}
                {noticiasFiltradas.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No se encontraron noticias con esos criterios</p>
                    </div>
                )}
            </div>
        </section>
    </>);
};

export default SearchNews;