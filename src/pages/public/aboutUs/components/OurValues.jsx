const OurValues = () => {
    const values = [
        {
            title: "Integridad",
            description: "Garantizamos una transparencia absoluta en cada gestión regulatoria."
        },
        {
            title: "Excelencia",
            description: "Buscamos la máxima perfección técnica sin tolerar errores."
        },
        {
            title: "Agilidad",
            description: "Optimizamos cada proceso para entregarte resultados rápidos siempre."
        },
        {
            title: "Compromiso",
            description: "Asumimos los objetivos de tu empresa como nuestros."
        }
    ];

    return (
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-md">
                        {/* CÍRCULO CELESTE (ATRÁS) */}
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#A5E4F4] rounded-full z-0"></div>

                        {/* IMAGEN */}
                        <img
                            src="/images/imageUs3.png"
                            alt="scientist"
                            className="relative z-10 w-full h-auto object-cover shadow-lg rounded-3xl"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                    {/* Título */}
                    <h2 className="text-4xl font-bold text-gray-900">Nuestros Valores</h2>

                    {/* Lista de Valores */}
                    <div className="flex flex-col gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                {/* Borde izquierdo azul */}
                                <div className="w-1 h-full bg-[#0DB3DE] rounded-full flex-shrink-0" style={{ minHeight: '80px' }}></div>

                                {/* Contenido del valor */}
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {value.title}
                                    </h3>
                                    <p className="text-base text-gray-700">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default OurValues;