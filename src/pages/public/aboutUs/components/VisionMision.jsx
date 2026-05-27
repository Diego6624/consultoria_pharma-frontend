const VisionMision = () => {
    return (
        <section className="p-15 px-8 md:px-16 lg:px-32 2xl:px-44">
            <div className="grid md:grid-cols-2 gap-6">

                {/* MISION */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg bg-[#1F4C7F] flex items-center gap-4 p-8">
                    {/* Imagen decorativa de fondo */}
                    <img
                        src="/images/visionMision.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none select-none"
                        aria-hidden="true"
                    />
                    {/* Contenido */}
                    <img
                        src="/images/diana.png"
                        alt="diana"
                        className="relative z-10 w-20 h-20 object-contain shrink-0"
                    />
                    <div className="relative z-10 flex gap-3 flex-col text-white">
                        <h3 className="text-2xl font-bold">Misión</h3>
                        <p className="text-sm leading-relaxed">
                            Brindar soluciones regulatorias integrales que permitan a nuestros clientes
                            operar con excelencia, ética y cumplimiento total ante DIGEMID y otras entidades de salud.
                        </p>
                    </div>
                </div>

                {/* VISION */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg bg-[#1F4C7F] flex items-center gap-4 ">
                    {/* Imagen decorativa de fondo */}
                    <img
                        src="/images/visionMision.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none select-none"
                        aria-hidden="true"
                    />
                    {/* Contenido */}
                    <img
                        src="/images/eye.png"
                        alt="eye"
                        className="relative z-10 w-20 h-20 object-contain shrink-0"
                    />
                    <div className="relative z-10 flex flex-col gap-3 text-white">
                        <h3 className="text-2xl font-bold">Visión</h3>
                        <p className="text-sm leading-relaxed">
                            Ser la consultora referente en el sector farmacéutico peruano, reconocida por nuestra agilidad,
                            precisión técnica y compromiso inquebrantable con la salud pública.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VisionMision;